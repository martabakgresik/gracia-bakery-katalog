import { useState, useEffect, useMemo } from 'react';
import { Toaster, toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { Cart } from './components/Cart';
import { Wishlist } from './components/Wishlist';
import { OrderHistory } from './components/OrderHistory';
import { AIChat } from './components/AIChat';
import { Footer } from './components/Footer';
import { PromoBanner } from './components/PromoBanner';
import { CookieBanner } from './components/CookieBanner';
import { About } from './components/About';
import { FAQ } from './components/FAQ';
import { useStore } from './store/useStore';
import { Product, Order } from './types';

const CATEGORIES = ['Semua', 'Roti', 'Jajanan Pasar', 'Kue Kering', 'Donat'];

export default function App() {
  const {
    productList,
    searchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    return productList.filter(p => {
      const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchLower === '' || 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower) ||
        (p.longDescription?.toLowerCase().includes(searchLower) ?? false);
      
      return matchesCategory && matchesSearch;
    });
  }, [productList, selectedCategory, searchQuery]);

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
    <div className="min-h-screen flex flex-col font-sans bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 transition-colors duration-300 overflow-x-hidden">
      <Toaster position="top-center" />
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <PromoBanner />
        <Header />
      </div>
      <div className="h-24 lg:h-32 mb-4"></div> {/* Spacer for fixed wrapper */}
      
      <main className="flex-grow">
        <Hero />
        
        <section id="menu" className="py-20 bg-[#FDFBF7] dark:bg-stone-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-4">
                Menu Spesial Kami
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-80"></div>
              <p className="mt-6 text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
                Pilih aneka jajanan dan kue kering favorit Anda. Dibuat fresh setiap hari dengan bahan berkualitas tinggi.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-primary dark:hover:border-primary-light hover:text-primary dark:hover:text-primary-light'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-stone-500 dark:text-stone-400">
                Belum ada produk yang sesuai dengan pencarian atau kategori ini.
              </div>
            )}
          </div>
        </section>

        <About />
        <FAQ />
      </main>

      <Footer />

      <Cart />
      <Wishlist />
      <ProductModal />
      <OrderHistory />

      <AIChat />
      <CookieBanner />
    </div>
  );
}

