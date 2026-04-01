import { useState } from 'react';
import { X, Minus, Plus, MessageCircle, Tag, Ticket } from 'lucide-react';
import { CartItem, PromoCode } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemove: (cartItemId: string) => void;
  onCheckout: () => void;
  appliedPromo: PromoCode | null;
  onApplyPromo: (code: string) => boolean;
  onRemovePromo: () => void;
}

export function Cart({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove, 
  onCheckout,
  appliedPromo,
  onApplyPromo,
  onRemovePromo
}: CartProps) {
  const [promoInput, setPromoInput] = useState('');
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discountPercent) / 100 : 0;
  const total = subtotal - discountAmount;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleCheckout = () => {
    if (items.length === 0) return;

    const phoneNumber = '6282233309744';
    
    let message = 'Halo Gracia Bakery, saya ingin memesan:\n\n';
    items.forEach(item => {
      const variantName = typeof item.selectedVariant === 'string' 
        ? item.selectedVariant 
        : item.selectedVariant?.name;
      const variantText = variantName ? ` (${variantName})` : '';
      message += `- ${item.quantity}x ${item.name}${variantText} - ${formatPrice(item.price * item.quantity)}\n`;
    });
    
    if (appliedPromo) {
      message += `\nSubtotal: ${formatPrice(subtotal)}\n`;
      message += `Diskon (${appliedPromo.code}): -${formatPrice(discountAmount)}\n`;
    }
    
    message += `\n*Total: ${formatPrice(total)}*\n\n`;
    message += 'Mohon info untuk pembayaran dan pengiriman. Terima kasih!';

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onCheckout();
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    if (onApplyPromo(promoInput)) {
      setPromoInput('');
    }
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
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">Pesanan Saya</h2>
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
                <MessageCircle className="w-10 h-10 text-stone-300 dark:text-stone-600" />
              </div>
              <p className="text-lg font-medium text-stone-900 dark:text-stone-200">Keranjang masih kosong</p>
              <p className="text-sm text-center">Silakan pilih aneka roti dan kue kering kami terlebih dahulu.</p>
              <button 
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-light transition-colors"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.li 
                    key={item.cartItemId}
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
                            onClick={() => onRemove(item.cartItemId)}
                            className="text-stone-400 hover:text-red-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        {item.selectedVariant && (
                          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                            {typeof item.selectedVariant === 'string' ? item.selectedVariant : item.selectedVariant.name}
                          </p>
                        )}
                        <p className="text-primary dark:text-primary-light font-medium text-sm mt-1">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-full mt-2 w-fit border border-stone-200 dark:border-stone-700 shadow-sm">
                        <button 
                          onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                          className="w-9 h-9 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-primary dark:hover:text-primary-light hover:bg-stone-200 dark:hover:bg-stone-700 rounded-l-full transition-all active:scale-90 active:bg-stone-300 dark:active:bg-stone-600"
                          aria-label="Kurangi jumlah"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-bold w-8 text-center text-stone-900 dark:text-stone-100 select-none">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                          className="w-9 h-9 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-primary dark:hover:text-primary-light hover:bg-stone-200 dark:hover:bg-stone-700 rounded-r-full transition-all active:scale-90 active:bg-stone-300 dark:active:bg-stone-600"
                          aria-label="Tambah jumlah"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-stone-100 dark:border-stone-800 p-6 bg-stone-50 dark:bg-stone-900/50">
            {/* Promo Code Section */}
            <div className="mb-6">
              {appliedPromo ? (
                <div className="flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm font-bold text-primary">{appliedPromo.code}</p>
                      <p className="text-[10px] text-primary/70">{appliedPromo.description}</p>
                    </div>
                  </div>
                  <button 
                    onClick={onRemovePromo}
                    className="text-primary hover:text-primary-dark p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Kode Promo"
                      className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-stone-900 dark:bg-stone-700 text-white rounded-xl text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-600 transition-colors"
                  >
                    Pakai
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-center text-stone-600 dark:text-stone-400">
                <span className="text-sm">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between items-center text-primary">
                  <span className="text-sm">Diskon ({appliedPromo.discountPercent}%)</span>
                  <span className="font-medium">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-stone-200 dark:border-stone-800">
                <span className="font-medium text-stone-900 dark:text-stone-100">Total Akhir</span>
                <span className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">{formatPrice(total)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-4 px-6 rounded-xl font-medium transition-colors duration-200 shadow-sm"
            >
              <MessageCircle className="w-5 h-5" />
              Pesan via WhatsApp
            </button>
            <p className="text-xs text-center text-stone-500 dark:text-stone-400 mt-4">
              Anda akan diarahkan ke WhatsApp untuk menyelesaikan pesanan.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
