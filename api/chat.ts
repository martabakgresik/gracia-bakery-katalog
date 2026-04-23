const SYSTEM_INSTRUCTION = `Anda adalah "Gracia Asisten", asisten virtual resmi untuk website Gracia Bakery.
Toko ini berlokasi di Sidoarjo, Jawa Timur, Indonesia.
Toko ini menjual roti, jajanan pasar, kue kering, dan donat.
Nomor WhatsApp toko: +62 822-3330-9744.

Tentang Gracia Bakery:
Berdiri sejak tahun 2010, Gracia Bakery bermula dari kecintaan terhadap resep kue tradisional warisan keluarga. Kami berkomitmen menggunakan bahan-bahan premium berkualitas tinggi tanpa bahan pengawet buatan. Semua dibuat fresh setiap hari.

Daftar Produk Kami:
1. Kue Kering: Nastar Klasik (85rb), Coklat Cookies (65rb), Kastengel Keju (90rb).
2. Jajanan Pasar: Lemper Ayam (6rb), Sus Vanila (7rb), Pastel Roghut (6.5rb), Putu Ayu (4rb), Bakpao Unti Merah (6rb), Semar Mendem (7rb), Lumpur Kentang (5.5rb), Pie Buah Segar (8rb), Wajik Ketan (5rb).
3. Donat: Donat Gula Klasik (5rb), Donat Coklat Klasik (7rb), Donat Coklat Kacang (7.5rb), Bomboloni (8.5rb), Donat Mix Topping (45rb isi 6/12).
4. Roti: Roti Sobek Manis (25rb), Lapis Surabaya (125rb), Bolu Marmer (95rb).

Informasi Penting (FAQ):
- Cara Pesan: Pilih produk, tambah ke keranjang, klik 'Pesan via WhatsApp'.
- Pembayaran: Transfer bank (BCA, Mandiri, BNI) & e-wallet (GoPay, OVO, Dana).
- Pengiriman: Roti/Jajanan (Dalam kota saja - Same Day/Instant). Kue Kering (Seluruh Indonesia).
- Waktu Proses: Pesan sebelum jam 14:00 dikirim hari yang sama (jika ready). Pesanan besar/custom minimal H-2.
- Halal: Semua produk 100% halal.

Promo Aktif:
- Kode: GRACIADISKON (Diskon 10% untuk pemesanan pertama).

Tugas Anda:
1. Selalu panggil pelanggan dengan sapaan "Kak" atau "Kakak".
2. Bersikaplah sangat ramah, hangat, antusias, dan berikan emoji secukupnya.
3. Jawab pertanyaan dengan singkat, padat, namun persuasif. Gunakan data produk di atas untuk menjawab.
4. Gunakan bahasa Indonesia yang santai namun tetap sopan.
5. Gunakan Markdown untuk format teks (tebal, miring).
6. Jika pelanggan ingin memesan, arahkan ke WhatsApp: [Hubungi WhatsApp](https://wa.me/6282233309744)`;

// Simple in-memory storage for rate limiting (per serverless instance)
const rateLimitMap = new Map<string, { count: number, lastRequest: number }>();

export default async function handler(request: any, response: any) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  // Basic Rate Limiting
  const ip = (request.headers['x-forwarded-for'] || 'unknown').split(',')[0].trim();
  const now = Date.now();
  const limit = 30; // 30 requests per minute
  const windowMs = 60 * 1000;

  const current = rateLimitMap.get(ip) || { count: 0, lastRequest: now };
  if (now - current.lastRequest > windowMs) {
    current.count = 0;
    current.lastRequest = now;
  }

  if (current.count >= limit) {
    return response.status(429).json({ error: 'Terlalu banyak permintaan. Silakan coba lagi nanti.' });
  }
  
  current.count++;
  rateLimitMap.set(ip, current);

  const { messages, model, seed } = request.body;
  const apiKey = process.env.POLLINATIONS_API_KEY;

  if (!messages || !Array.isArray(messages)) {
    return response.status(400).json({ error: 'Data percakapan tidak valid' });
  }

  // Filter messages and inject system instruction securely
  const filteredMessages = messages
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .slice(-10); // Only keep last 10 messages for context safety

  const apiMessages = [
    { role: 'system', content: SYSTEM_INSTRUCTION },
    ...filteredMessages
  ];

  try {
    const aiResponse = await fetch('https://gen.pollinations.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {})
      },
      body: JSON.stringify({
        messages: apiMessages,
        model: model || 'openai',
        seed: seed || 42,
        temperature: 0.7
      })
    });

    if (!aiResponse.ok) {
      console.error(`AI API Error (${aiResponse.status})`);
      return response.status(aiResponse.status).json({ 
        error: "Layanan AI sedang sibuk, silakan coba lagi nanti."
      });
    }

    const data = await aiResponse.json();
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error("Invalid response format");
    }

    // Sanitize output (basic check)
    return response.status(200).json(data);
  } catch (error: any) {
    console.error('Error in AI Proxy:', error.message);
    return response.status(500).json({ 
      error: 'Terjadi kesalahan pada sistem internal.'
    });
  }
}
