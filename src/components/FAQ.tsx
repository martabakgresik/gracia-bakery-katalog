import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const faqs = [
  {
    question: "Bagaimana cara memesan produk?",
    answer: "Anda dapat memilih produk yang diinginkan, menambahkannya ke keranjang, lalu klik 'Pesan via WhatsApp' di menu keranjang. Tim kami akan segera memproses pesanan Anda."
  },
  {
    question: "Metode pembayaran apa saja yang diterima?",
    answer: "Saat ini kami menerima pembayaran melalui transfer bank (BCA, Mandiri, BNI) dan e-wallet (GoPay, OVO, Dana). Detail pembayaran akan diberikan via WhatsApp setelah Anda mengonfirmasi pesanan."
  },
  {
    question: "Apakah melayani pengiriman ke luar kota?",
    answer: "Untuk roti basah dan jajanan pasar, kami hanya melayani pengiriman dalam kota (Same Day/Instant). Untuk kue kering, kami dapat mengirim ke seluruh Indonesia menggunakan ekspedisi reguler."
  },
  {
    question: "Berapa lama pesanan saya akan diproses?",
    answer: "Pesanan yang masuk sebelum jam 14:00 akan diproses dan dikirim pada hari yang sama (untuk produk ready stock). Untuk pemesanan dalam jumlah besar atau custom, mohon pesan minimal H-2."
  },
  {
    question: "Apakah produk Gracia Bakery halal?",
    answer: "Ya, seluruh produk kami dibuat menggunakan bahan-bahan yang 100% halal dan berkualitas."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-stone-50 dark:bg-stone-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-4">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-80"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-stone-900 dark:text-stone-100 pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-stone-500 dark:text-stone-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-stone-500 dark:text-stone-400 shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-stone-600 dark:text-stone-300 text-sm leading-relaxed animate-in slide-in-from-top-2">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
