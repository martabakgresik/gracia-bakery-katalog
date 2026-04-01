import { X, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export function Wishlist({ isOpen, onClose, items, onRemove, onAddToCart }: WishlistProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-stone-900 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-stone-200 dark:border-stone-800">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800">
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500 fill-red-500 dark:text-red-400 dark:fill-red-400" />
            Wishlist
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors rounded-full hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-stone-500 dark:text-stone-400 space-y-4">
              <div className="w-24 h-24 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-stone-300 dark:text-stone-600" />
              </div>
              <p className="text-lg font-medium text-stone-900 dark:text-stone-200">Wishlist kosong</p>
              <p className="text-sm text-center">Simpan produk favorit Anda di sini untuk dibeli nanti.</p>
              <button 
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-light transition-colors"
              >
                Jelajahi Menu
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.li 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex gap-4"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-stone-900 dark:text-stone-100 line-clamp-1">{item.name}</h3>
                          <button 
                            onClick={() => onRemove(item.id)}
                            className="text-stone-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-primary dark:text-primary-light font-medium text-sm mt-1">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <button 
                          onClick={() => onAddToCart(item)}
                          className="flex-1 flex items-center justify-center gap-2 bg-stone-100 dark:bg-stone-800 hover:bg-primary dark:hover:bg-primary text-stone-700 dark:text-stone-300 hover:text-white dark:hover:text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Tambah
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
