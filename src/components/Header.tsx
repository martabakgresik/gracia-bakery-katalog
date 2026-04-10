import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Phone, Menu, Heart, History, X, CheckCircle2 } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { APP_CONFIG } from '../data/config';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSlim, setIsSlim] = useState(false);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [lastItem, setLastItem] = useState<CartItem | null>(null);
  const prevCartCount = useRef(0);
  
  const { 
    cartItems, 
    wishlistIds, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsHistoryOpen 
  } = useStore();

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistIds.length;

  // Handle Slim Header on Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSlim(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Mini Cart Notification
  useEffect(() => {
    if (cartItemCount > prevCartCount.current) {
      // Find the most recently updated/added item
      const newItem = cartItems[cartItems.length - 1];
      if (newItem) {
        setLastItem(newItem);
        setShowMiniCart(true);
        const timer = setTimeout(() => setShowMiniCart(false), 3000);
        return () => clearTimeout(timer);
      }
    }
    prevCartCount.current = cartItemCount;
  }, [cartItemCount, cartItems]);

  return (
    <header className={`relative z-[100] w-full transition-all duration-300 ${
      isSlim 
        ? 'bg-white/95 dark:bg-stone-900/95 shadow-lg py-2' 
        : 'bg-[#FDFBF7]/90 dark:bg-stone-900/90 py-4'
    } backdrop-blur-md border-b border-stone-200 dark:border-stone-800`}>
      
      {/* Mini Cart Notification */}
      <AnimatePresence>
        {showMiniCart && lastItem && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="absolute top-full left-0 right-0 z-50 flex justify-center px-4 pt-2 pointer-events-none"
          >
            <div className="bg-white dark:bg-stone-800 shadow-2xl rounded-2xl border border-primary/20 dark:border-primary-light/20 p-3 flex items-center gap-4 w-full max-w-sm pointer-events-auto">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img src={lastItem.image} alt={lastItem.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-primary dark:text-primary-light mb-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Berhasil Ditambahkan</span>
                </div>
                <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">{lastItem.name}</h4>
              </div>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-primary-light transition-colors"
              >
                Lihat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${isSlim ? 'h-14' : 'h-20'}`}>
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-stone-600 hover:text-primary dark:text-stone-300 dark:hover:text-primary-light transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center flex-1 sm:flex-none sm:justify-start">
            <h1 className={`font-serif font-bold text-primary tracking-tight transition-all duration-300 ${isSlim ? 'text-2xl' : 'text-3xl'}`}>
              Gracia Bakery
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex ml-8 space-x-8 items-center">
            <a href="#menu" className="text-stone-600 dark:text-stone-300 hover:text-primary dark:hover:text-primary-light font-medium transition-colors">Menu</a>
            <a href="#about" className="text-stone-600 dark:text-stone-300 hover:text-primary dark:hover:text-primary-light font-medium transition-colors">Tentang Kami</a>
            <a href="#faq" className="text-stone-600 dark:text-stone-300 hover:text-primary dark:hover:text-primary-light font-medium transition-colors">FAQ</a>
          </nav>

          {/* Desktop Contact & Cart */}
          <div className="flex items-center space-x-1 md:space-x-4">
            <a 
              href={APP_CONFIG.shopInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:flex items-center text-stone-600 dark:text-stone-300 mr-2 transition-all duration-300 hover:text-primary dark:hover:text-primary-light ${isSlim ? 'opacity-0 scale-95 pointer-events-none w-0 overflow-hidden' : 'opacity-100'}`}
            >
              <Phone className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium whitespace-nowrap">+62 822-3330-9744</span>
            </a>
            
            <div className="flex items-center">
              <ThemeToggle />
            </div>

            <button 
              onClick={() => setIsHistoryOpen(true)}
              className="px-2 py-2 text-stone-600 hover:text-primary dark:text-stone-300 dark:hover:text-primary-light transition-colors"
              aria-label="Riwayat Pesanan"
            >
              <History className="h-6 w-6" />
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-stone-600 hover:text-primary dark:text-stone-300 dark:hover:text-primary-light transition-colors"
              aria-label="Keranjang Belanja"
            >
              <motion.div
                key={cartItemCount}
                animate={showMiniCart ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ShoppingBag className="h-6 w-6" />
              </motion.div>
              {cartItemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={`badge-${cartItemCount}`}
                  className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-orange-600 rounded-full"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="sm:hidden overflow-hidden border-t border-stone-200 dark:border-stone-800 py-4 space-y-4"
            >
              <a 
                href="#menu" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block px-2 text-stone-600 dark:text-stone-300 font-medium hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Menu Spesial
              </a>
              <a 
                href="#about" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block px-2 text-stone-600 dark:text-stone-300 font-medium hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Tentang Kami
              </a>
              <a 
                href="#faq" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block px-2 text-stone-600 dark:text-stone-300 font-medium hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                FAQ
              </a>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsHistoryOpen(true);
                }} 
                className="flex items-center px-2 text-stone-600 dark:text-stone-300 font-medium hover:text-primary dark:hover:text-primary-light transition-colors w-full text-left"
              >
                <History className="h-4 w-4 mr-2" />
                Riwayat Pesanan
              </button>
              <a 
                href={APP_CONFIG.shopInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-2 text-stone-600 dark:text-stone-300 font-medium hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">+62 822-3330-9744</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
