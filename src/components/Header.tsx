import { useState } from 'react';
import { ShoppingBag, Phone, Menu, Search, X, Heart, History } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenHistory: () => void;
}

export function Header({ cartItemCount, onOpenCart, searchQuery, onSearchChange, wishlistCount, onOpenWishlist, onOpenHistory }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FDFBF7]/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-stone-600 hover:text-primary-light dark:text-stone-300 dark:hover:text-primary-light transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center flex-1 sm:flex-none sm:justify-start">
            <h1 className="font-serif text-3xl font-bold text-[#6B3410] dark:text-primary-light tracking-tight">
              Gracia Bakery
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex ml-8 space-x-6 items-center">
            <a href="#menu" className="text-stone-700 dark:text-stone-300 hover:text-primary-light dark:hover:text-primary-light font-medium transition-colors">Menu</a>
            <a href="#about" className="text-stone-700 dark:text-stone-300 hover:text-primary-light dark:hover:text-primary-light font-medium transition-colors">Tentang Kami</a>
            <a href="#faq" className="text-stone-700 dark:text-stone-300 hover:text-primary-light dark:hover:text-primary-light font-medium transition-colors">FAQ</a>
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-stone-400 dark:text-stone-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari roti, kue..."
              className="block w-full pl-11 pr-4 py-2.5 border border-stone-200 dark:border-stone-700 rounded-full leading-5 bg-stone-50 dark:bg-stone-800 placeholder-stone-400 dark:placeholder-stone-500 text-stone-900 dark:text-stone-100 focus:outline-none focus:bg-white dark:focus:bg-stone-900 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-200"
              />
            </div>
          </div>

          {/* Desktop Contact & Cart */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden sm:flex items-center text-stone-600 dark:text-stone-300 mr-2">
              <Phone className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">+62 822-3330-9744</span>
            </div>
            
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            <button 
              onClick={onOpenWishlist}
              className="relative p-2 text-stone-700 hover:text-primary-light dark:text-stone-300 dark:hover:text-primary-light transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button 
              onClick={onOpenHistory}
              className="relative p-2 text-stone-700 hover:text-primary-light dark:text-stone-300 dark:hover:text-primary-light transition-colors"
              aria-label="Riwayat Pesanan"
            >
              <History className="h-6 w-6" />
            </button>

            <button 
              onClick={onOpenCart}
              className="relative p-2 text-stone-700 hover:text-primary-light dark:text-stone-300 dark:hover:text-primary-light transition-colors"
              aria-label="Keranjang Belanja"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-orange-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-stone-400 dark:text-stone-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari roti, kue..."
              className="block w-full pl-11 pr-4 py-2.5 border border-stone-200 dark:border-stone-700 rounded-full leading-5 bg-stone-50 dark:bg-stone-800 placeholder-stone-400 dark:placeholder-stone-500 text-stone-900 dark:text-stone-100 focus:outline-none focus:bg-white dark:focus:bg-stone-900 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-200"
            />
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-stone-200 dark:border-stone-800 py-4 space-y-4 animate-in slide-in-from-top-2">
            <a 
              href="#menu" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block px-2 text-stone-700 dark:text-stone-300 font-medium hover:text-primary-light dark:hover:text-primary-light transition-colors"
            >
              Menu Spesial
            </a>
            <a 
              href="#about" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block px-2 text-stone-700 dark:text-stone-300 font-medium hover:text-primary-light dark:hover:text-primary-light transition-colors"
            >
              Tentang Kami
            </a>
            <a 
              href="#faq" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block px-2 text-stone-700 dark:text-stone-300 font-medium hover:text-primary-light dark:hover:text-primary-light transition-colors"
            >
              FAQ
            </a>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenHistory();
              }} 
              className="flex items-center px-2 text-stone-700 dark:text-stone-300 font-medium hover:text-primary-light dark:hover:text-primary-light transition-colors w-full text-left"
            >
              <History className="h-4 w-4 mr-2" />
              Riwayat Pesanan
            </button>
            <div className="flex items-center px-2 text-stone-700 dark:text-stone-300">
              <Phone className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">+62 822-3330-9744</span>
            </div>
            <div className="flex items-center justify-between px-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <span className="text-stone-700 dark:text-stone-300 font-medium">Tema Tampilan</span>
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
