import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';
import { products } from '../data/products';
import { faqs } from './FAQ';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Halo! Saya Gracia Asisten. Ada yang bisa saya bantu terkait menu atau pesanan?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const productContext = products.map(p => `- ${p.name} (${p.category}): Rp${p.price.toLocaleString('id-ID')}. ${p.description}`).join('\n');
      const faqContext = faqs.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n');
      
      const systemInstruction = `Anda adalah "Gracia Asisten", asisten virtual resmi untuk website Gracia Bakery.
      Toko ini menjual roti, jajanan pasar, kue kering, dan donat.
      Nomor WhatsApp toko: +62 822-3330-9744.
      
      Tentang Gracia Bakery:
      Berdiri sejak tahun 2010, Gracia Bakery bermula dari kecintaan terhadap resep kue tradisional warisan keluarga. Kami berkomitmen menggunakan bahan-bahan premium berkualitas tinggi tanpa bahan pengawet buatan. Semua dibuat fresh setiap hari.
      
      Informasi Website & Fitur:
      - Pelanggan dapat menambahkan produk ke Keranjang Belanja dan melakukan checkout (Pesan via WhatsApp).
      - Terdapat fitur Wishlist (Daftar Keinginan) yang ditandai dengan ikon Hati untuk menyimpan produk favorit.
      - Terdapat fitur Riwayat Pesanan (ikon Jam) untuk melihat pesanan yang sudah pernah dibuat.
      - Pelanggan dapat memberikan rating bintang pada produk di modal detail produk.
      - Kategori produk meliputi: Semua, Roti, Jajanan Pasar, Kue Kering, Donat.
      - Pelanggan dapat mencari produk menggunakan fitur pencarian di bagian atas website.
      
      FAQ (Pertanyaan yang Sering Diajukan):
      ${faqContext}
      
      Daftar produk kami:
      ${productContext}
      
      Tugas Anda:
      Jawab pertanyaan pelanggan dengan ramah, sopan, singkat, dan persuasif. Gunakan bahasa Indonesia yang santai tapi profesional. 
      Jika mereka bertanya cara memesan, arahkan untuk klik tombol "Tambah ke Keranjang" lalu buka keranjang dan klik "Pesan via WhatsApp".
      Jika mereka bertanya tentang pesanan sebelumnya, arahkan ke menu "Riwayat Pesanan" di pojok kanan atas.
      Format jawaban menggunakan Markdown jika perlu (seperti bold untuk nama produk).`;

      const conversationHistory = messages.map(m => ({
        role: m.role,
        content: m.text
      }));
      conversationHistory.push({ role: 'user', content: userText });

      const apiKey = import.meta.env.VITE_POLLINATIONS_API_KEY;
      if (!apiKey) {
        throw new Error('API key not configured');
      }

      const response = await fetch('https://api.pollinations.ai/openai/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'openai',
          messages: [
            { role: 'system', content: systemInstruction },
            ...conversationHistory
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || 'Maaf, saya tidak mengerti.';

      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (error) {
      console.error('[v0] AI Chat Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Maaf, sedang terjadi gangguan pada sistem kami. Silakan coba lagi nanti atau hubungi WhatsApp kami.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary-light transition-transform hover:scale-105 active:scale-95 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Tanya Kami"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-white dark:bg-stone-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-stone-200 dark:border-stone-800"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <h3 className="font-medium">Gracia Asisten</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50 dark:bg-stone-900/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-sm' 
                      : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 rounded-tl-sm shadow-sm'
                  }`}>
                    {msg.role === 'model' ? (
                      <div className="prose prose-sm prose-stone dark:prose-invert max-w-none">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-primary dark:text-primary-light" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ketik pesan..."
                  className="flex-1 bg-stone-100 dark:bg-stone-800 border-transparent focus:bg-white dark:focus:bg-stone-900 focus:border-primary dark:focus:border-primary-light focus:ring-1 focus:ring-primary dark:focus:ring-primary-light rounded-full px-4 py-2 text-sm transition-all text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-primary text-white rounded-full hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
