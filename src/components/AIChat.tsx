import { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Maximize2, Minimize2, Phone, MessageSquare, Store, Trash2 } from 'lucide-react';
import { products } from '../data/products';
import { faqs } from './FAQ';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Halo Kak! 😊 Saya Gracia Asisten. Ada roti atau kue favorit yang sedang Kakak cari hari ini?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleClearChat = () => {
    setMessages([
      { role: 'assistant', text: 'Halo Kak! 😊 Saya Gracia Asisten. Ada roti atau kue favorit yang sedang Kakak cari hari ini?' }
    ]);
  };

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.min(newHeight, 150)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [input]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setLoadingTime(0);
      interval = setInterval(() => {
        setLoadingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

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
      
      const systemInstruction = `Anda adalah "Gracia Asisten", asisten virtual resmi untuk website Gracia Bakery.
      Toko ini menjual roti, jajanan pasar, kue kering, dan donat.
      Nomor WhatsApp toko: +62 822-3330-9744.
      Jika pelanggan ingin memesan atau menghubungi via WhatsApp, berikan tautan dalam format: [Hubungi WhatsApp](https://wa.me/6282233309744?text=Halo%20Gracia%20Bakery,%20saya%20ingin%20bertanya%20tentang...)
      Jika memberikan nomor telepon, gunakan format: [0822-3330-9744](tel:+6282233309744)
      
      Tentang Gracia Bakery:
      Berdiri sejak tahun 2010, Gracia Bakery bermula dari kecintaan terhadap resep kue tradisional warisan keluarga. Kami berkomitmen menggunakan bahan-bahan premium berkualitas tinggi tanpa bahan pengawet buatan. Semua dibuat fresh setiap hari.
      
      Daftar produk kami:
      ${productContext}
      
      Tugas Anda:
      1. Selalu panggil pelanggan dengan sapaan "Kak" atau "Kakak".
      2. Bersikaplah sangat ramah, hangat, antusias, dan berikan emoji secukupnya agar percakapan terasa natural.
      3. Jawab pertanyaan dengan singkat, padat, namun persuasif. 
      4. Selalu lakukan trik "Upselling" dengan halus. Contoh: Jika Kakak memesan/bertanya tentang Roti Sobek, rekomendasikan juga sekalian Nastar Lumer atau minuman pendampingnya untuk melengkapi pesanan. 
      5. Gunakan bahasa Indonesia yang santai namun tetap sopan dan profesional.
      6. Wajib gunakan format Markdown tekstual untuk memikat bacaan: gunakan **tebal** (bold) untuk nama produk, harga, atau highlight penting, gunakan *miring* (italic) untuk penekanan rasa/upselling, dan gunakan ~~coret~~ (strikethrough) jika sedang mempromosikan diskon "harga coret".
      7. Gunakan Markdown URL untuk link WhatsApp (opsional namun sangat disarankan jika pelanggan ingin beli).`;

      const apiKey = import.meta.env.VITE_POLLINATIONS_API_KEY;

      const apiMessages = [
        { role: 'system', content: systemInstruction },
        ...messages.map(m => ({ role: m.role, content: m.text })),
        { role: 'user', content: userText }
      ];

      const response = await fetch('https://gen.pollinations.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {})
        },
        body: JSON.stringify({
          messages: apiMessages,
          model: 'openai',
          seed: 42
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.choices?.[0]?.message?.content;
      
      if (!responseText) throw new Error('Empty response');

      setMessages(prev => [...prev, { role: 'assistant', text: responseText }]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', text: 'Maaf, Gracia sedang beristirahat sejenak. Silakan coba lagi sebentar lagi atau hubungi kami via WhatsApp.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 px-4 py-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary-light transition-all hover:scale-105 active:scale-95 ${isOpen ? 'hidden' : 'flex'} items-center gap-2 group`}
        aria-label="Tanya Kami"
      >
        <div className="relative">
          <Store className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-primary rounded-full animate-pulse"></span>
        </div>
        <span className="font-medium text-sm whitespace-nowrap">Tanya Kami</span>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              width: isMaximized ? 'min(1000px, calc(100vw - 2rem))' : 'min(350px, calc(100vw - 2rem))',
              height: isMaximized ? 'min(800px, calc(100vh - 4rem))' : 'min(500px, calc(100vh - 4rem))',
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-stone-200 dark:border-stone-800 transition-all duration-300 ease-in-out"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/20">
                  <Store className="w-6 h-6 text-white" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-primary rounded-full"></span>
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="font-semibold leading-tight truncate">Gracia Asisten</h3>
                  <div className="flex items-center gap-1.5">
                    {isLoading ? (
                      <span className="text-[10px] text-white/80 flex items-center gap-1">
                        <span className="flex gap-0.5">
                          <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-1 h-1 bg-white rounded-full animate-bounce"></span>
                        </span>
                        Sedang mengetik...
                      </span>
                    ) : (
                      <span className="text-[10px] text-white/80">Online</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-2 shrink-0">
                <button 
                  onClick={handleClearChat} 
                  className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                  title="Hapus Percakapan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsMaximized(!isMaximized)} 
                  className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                  title={isMaximized ? "Kecilkan" : "Besarkan"}
                >
                  {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>
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
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm prose-stone dark:prose-invert max-w-none">
                        <ReactMarkdown
                          components={{
                            a: ({ node, ...props }) => {
                              const isWhatsApp = props.href?.includes('wa.me');
                              const isTel = props.href?.startsWith('tel:');
                              
                              if (isWhatsApp) {
                                return (
                                  <a
                                    {...props}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-xl font-medium no-underline my-2 transition-colors shadow-sm"
                                  >
                                    <MessageSquare className="w-4 h-4" />
                                    WhatsApp Kami
                                  </a>
                                );
                              }
                              
                              if (isTel) {
                                return (
                                  <a
                                    {...props}
                                    className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl font-medium no-underline my-2 transition-colors shadow-sm"
                                  >
                                    <Phone className="w-4 h-4" />
                                    Hubungi Telepon
                                    </a>
                                );
                              }
                              
                              return <a {...props} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" />;
                            }
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-primary dark:text-primary-light">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-xs font-medium animate-pulse">Gracia sedang berpikir...</span>
                    </div>
                    <span className="text-[10px] text-stone-400 dark:text-stone-500 ml-6">
                      Waktu tunggu: {loadingTime} detik
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800">
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ketik pesan..."
                  className="flex-1 bg-stone-100 dark:bg-stone-800 border-transparent focus:bg-white dark:focus:bg-stone-900 focus:border-primary dark:focus:border-primary-light focus:ring-1 focus:ring-primary dark:focus:ring-primary-light rounded-2xl px-4 py-2.5 text-sm transition-all text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 resize-none max-h-[150px] overflow-y-auto scrollbar-thin"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 bg-primary text-white rounded-full hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-[2px]"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
