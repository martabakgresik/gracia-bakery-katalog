import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useStore } from '../store/useStore';

export function Hero() {
  const [isFocused, setIsFocused] = useState(false);
  const { searchQuery, setSearchQuery } = useStore();

  return (
    <div className="relative bg-stone-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-40"
          src="./hero-bg.webp"
          alt="Aneka roti dan kue kering"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
      </div>
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-serif font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Kehangatan Premium dari Oven Kami ke Tangan Anda
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl mx-auto text-xl text-stone-200 font-sans font-light"
        >
          Nikmati kelembutan roti sobek, nastar lumer, hingga otentiknya lemper ayam. Dibuat fresh setiap pagi menggunakan bahan premium dan resep rahasia Gracia Bakery.
        </motion.p>
        
        <div className="mt-10 flex flex-col items-center gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative w-full max-w-md"
          >
            <motion.div
              animate={{ 
                width: isFocused ? '100%' : '80%',
                maxWidth: isFocused ? '600px' : '400px'
              }}
              className="relative mx-auto"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-stone-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Cari roti, kue kering favorit Anda..."
                className="block w-full pl-12 pr-4 py-4 border-none rounded-full leading-5 bg-white/10 backdrop-blur-md placeholder-stone-400 text-white focus:outline-none focus:bg-white/20 focus:ring-2 focus:ring-primary sm:text-base transition-all duration-300 shadow-xl"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a
              href="#menu"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary-light transition-colors duration-200 shadow-lg"
            >
              Lihat Menu
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
