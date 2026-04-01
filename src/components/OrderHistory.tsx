import { X, History, Package, Clock } from 'lucide-react';
import { Order } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface OrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export function OrderHistory({ isOpen, onClose, orders }: OrderHistoryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
            <History className="w-6 h-6 text-primary dark:text-primary-light" />
            Riwayat Pesanan
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors rounded-full hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-stone-50/50 dark:bg-stone-900/50">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-stone-500 dark:text-stone-400 space-y-4">
              <div className="w-24 h-24 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center">
                <Package className="w-10 h-10 text-stone-300 dark:text-stone-600" />
              </div>
              <p className="text-lg font-medium text-stone-900 dark:text-stone-200">Belum ada pesanan</p>
              <p className="text-sm text-center">Pesanan yang Anda buat akan muncul di sini.</p>
              <button 
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-light transition-colors"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              <AnimatePresence>
                {orders.map((order) => (
                  <motion.li 
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl p-5 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-4 border-b border-stone-50 dark:border-stone-700 pb-4">
                      <div>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">{formatDate(order.date)}</p>
                        <p className="font-medium text-stone-900 dark:text-stone-100">{order.id}</p>
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium border border-orange-100 dark:border-orange-800/30">
                        <Clock className="w-3 h-3" />
                        {order.status}
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <div className="flex gap-2 text-stone-600 dark:text-stone-300">
                            <span className="font-medium text-stone-900 dark:text-stone-100">{item.quantity}x</span>
                            <span className="line-clamp-1">{item.name} {item.selectedVariant ? `(${item.selectedVariant})` : ''}</span>
                          </div>
                          <span className="text-stone-900 dark:text-stone-100 font-medium whitespace-nowrap ml-4">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-stone-50 dark:border-stone-700">
                      <span className="text-sm font-medium text-stone-500 dark:text-stone-400">Total Belanja</span>
                      <span className="text-lg font-bold text-primary dark:text-primary-light">{formatPrice(order.total)}</span>
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
