import { useMemo } from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { About } from '../components/About';
import { FAQ } from '../components/FAQ';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = ['Semua', 'Roti', 'Jajanan Pasar', 'Kue Kering', 'Donat'];

export function HomePage() {
  const {
    productList,
    searchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useStore();

  const filteredProducts = useMemo(() => {
    return productList.filter((p) => {
      const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchLower === '' || 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower) ||
        (p.longDescription?.toLowerCase().includes(searchLower) ?? false);
      
      return matchesCategory && matchesSearch;
    });
  }, [productList, selectedCategory, searchQuery]);

  return (
    <>
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
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-stone-500 dark:text-stone-400">
              Belum ada produk yang sesuai dengan pencarian atau kategori ini.
            </div>
          )}
        </div>
      </section>

      <About />
      <FAQ />
    </>
  );
}
