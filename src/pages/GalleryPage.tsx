import { useStore } from '../store/useStore';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ZoomIn } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export function GalleryPage() {
  const { productList, setSelectedProductId } = useStore();

  return (
    <div className="py-24 bg-stone-50 dark:bg-stone-900 min-h-screen text-stone-900 dark:text-stone-100 transition-colors duration-300">
      <Helmet>
        <title>Galeri Produk | Gracia Bakery</title>
        <meta name="description" content="Lihat foto-foto lezat berbagai macam aneka roti, jajanan pasar masa kini, kue kering, pastry, dan pesanan snack box ala Gracia Bakery." />
        <link rel="canonical" href="https://gracia.bakery.my.id/gallery" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-4">
              Galeri Produk
            </h1>
            <div className="w-24 h-1 bg-primary rounded-full opacity-80 mx-auto md:mx-0"></div>
            <p className="mt-4 text-stone-600 dark:text-stone-400 max-w-lg">
              Kumpulan visual lezat aneka roti, jajanan pasar modern, kue kering, pastry, dan lain-lain racikan istimewa Gracia Bakery.
            </p>
          </div>
          
          <Link 
            to="/" 
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-full font-medium shadow-sm hover:shadow hover:text-primary dark:hover:text-primary-light transition-all duration-300 border border-stone-200 dark:border-stone-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>

        {/* Masonry / Grid Gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {productList.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              onClick={() => setSelectedProductId(product.id)}
              className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer break-inside-avoid border border-stone-100 dark:border-stone-800"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <div className="bg-white/90 dark:bg-stone-800/90 w-10 h-10 rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <ZoomIn className="w-5 h-5 text-stone-800 dark:text-stone-200" />
                </div>
                <h3 className="text-white font-serif font-bold text-xl drop-shadow-md">{product.name}</h3>
                <span className="text-primary-light font-medium text-sm drop-shadow-md mt-1">{product.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
