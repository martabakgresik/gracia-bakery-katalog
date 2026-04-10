import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { Loader2, ShoppingBag, ArrowUp } from 'lucide-react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { ProductModal } from './components/ProductModal';
import { Cart } from './components/Cart';
import { OrderHistory } from './components/OrderHistory';
import { AIChat } from './components/AIChat';
import { Footer } from './components/Footer';
import { PromoBanner } from './components/PromoBanner';
import { CookieBanner } from './components/CookieBanner';
import { useStore } from './store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { formatPrice } from './utils/format';

export default function App() {
  const { cartItems, setIsCartOpen } = useStore();

  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex flex-col items-center justify-center transition-colors duration-300">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">Gracia Bakery</h2>
        <p className="text-stone-500 dark:text-stone-400 font-medium animate-pulse">Mohon Tunggu beberapa detik...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 transition-colors duration-300 overflow-x-hidden">
        <Toaster position="top-center" />
        <div className="sticky top-0 left-0 right-0 z-[60]">
          <PromoBanner />
          <Header />
        </div>
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </main>

        <Footer />

        <Cart />
        <ProductModal />
        <OrderHistory />
        <AIChat />
        
        {/* Floating UI Elements */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
          {/* Floating Cart Button */}
          <AnimatePresence>
            {cartItemCount > 0 && (
              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                onClick={() => setIsCartOpen(true)}
                className="pointer-events-auto flex items-center gap-3 bg-stone-900 dark:bg-stone-800 text-white px-4 py-3 rounded-2xl shadow-2xl hover:bg-stone-800 dark:hover:bg-stone-700 transition-all active:scale-95 group border border-stone-700/50"
              >
                <div className="relative">
                  <ShoppingBag className="w-6 h-6" />
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-stone-900 dark:border-stone-800">
                    {cartItemCount}
                  </span>
                </div>
                <div className="flex flex-col items-start leading-tight pr-1">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Keranjang</span>
                  <span className="text-sm font-bold">{formatPrice(cartTotal)}</span>
                </div>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Back to Top Button */}
          <AnimatePresence>
            {showBackToTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="pointer-events-auto w-12 h-12 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-full shadow-lg flex items-center justify-center hover:bg-stone-50 dark:hover:bg-stone-700 transition-all border border-stone-200 dark:border-stone-700"
                aria-label="Kembali ke atas"
              >
                <ArrowUp className="w-6 h-6" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <CookieBanner />
      </div>
    </Router>
  );
}

