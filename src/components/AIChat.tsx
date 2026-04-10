import { useState, useRef, useEffect } from 'react';
import { Store } from 'lucide-react';
import { products } from '../data/products';
import { APP_CONFIG } from '../data/config';
import { motion, AnimatePresence } from 'motion/react';
import { ChatHeader } from './AIChat/ChatHeader';
import { MessageList } from './AIChat/MessageList';
import { ChatInput } from './AIChat/ChatInput';

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
    let interval: any;
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
      const apiMessages = [
        ...messages.map(m => ({ role: m.role, content: m.text })),
        { role: 'user', content: userText }
      ];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: apiMessages,
          model: 'openai',
          seed: 42
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API Error: ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.choices?.[0]?.message?.content;

      if (!responseText) throw new Error('Format respons tidak valid');

      setMessages(prev => [...prev, { role: 'assistant', text: responseText }]);
    } catch (error: any) {
      console.error('AI Chat Error:', error);
      const errorMessage = error.message.includes('API Error') 
        ? 'Maaf, layanan AI kami sedang mengalami gangguan teknis. Mohon hubungi WhatsApp kami untuk bantuan segera.'
        : 'Maaf, Gracia sedang beristirahat sejenak. Silakan coba lagi sebentar lagi atau hubungi kami via WhatsApp.';
      
      setMessages(prev => [...prev, { role: 'assistant', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className={`fixed bottom-6 left-6 z-40 ${isOpen ? 'hidden' : 'flex'} flex-col items-center gap-1.5`}>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary-light transition-all hover:scale-105 active:scale-95 group"
          aria-label="Tanya Kami"
        >
          <div className="relative">
            <Store className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-primary rounded-full animate-pulse"></span>
          </div>
        </button>
        <span className="font-bold text-[10px] uppercase tracking-widest text-stone-600 dark:text-stone-400 bg-white/90 dark:bg-stone-800/90 px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm border border-stone-200 dark:border-stone-700">👋 Tanya Kami</span>
      </div>

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
            className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[130] bg-white dark:bg-stone-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-stone-200 dark:border-stone-800 transition-all duration-300 ease-in-out"
          >
            <ChatHeader 
              isLoading={isLoading}
              isMaximized={isMaximized}
              setIsMaximized={setIsMaximized}
              onClear={handleClearChat}
              onClose={() => setIsOpen(false)}
            />

            <MessageList 
              messages={messages}
              isLoading={isLoading}
              loadingTime={loadingTime}
              messagesEndRef={messagesEndRef}
            />

            <ChatInput 
              input={input}
              setInput={setInput}
              isLoading={isLoading}
              onSend={handleSend}
              textareaRef={textareaRef}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
