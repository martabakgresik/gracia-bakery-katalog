import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('promo_dismissed');
    if (!isDismissed) setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('promo_dismissed', 'true');
  };

  return (
    <div className="bg-primary dark:bg-primary-dark text-white px-4 py-3 flex justify-between items-center text-sm z-50 relative shadow-sm">
      <div className="flex-1 text-center font-semibold">
        🎉 Promo Spesial! Diskon 10% untuk pemesanan pertama via WhatsApp.
      </div>
      <button 
        onClick={handleClose} 
        className="p-1 hover:bg-white/30 rounded-full transition-colors shrink-0 ml-4"
        aria-label="Tutup promo"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
