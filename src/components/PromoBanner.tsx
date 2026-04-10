import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { APP_CONFIG } from '../data/config';

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const isDismissed = sessionStorage.getItem('promo_dismissed');
      if (!isDismissed) setIsVisible(true);
    } catch (e) {
      console.error('Error loading promo status:', e);
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem('promo_dismissed', 'true');
    } catch (e) {
      console.error('Error saving promo status:', e);
    }
  };

  return (
    <div className="bg-primary dark:bg-primary-dark text-white px-4 py-2 flex justify-between items-center text-sm z-50 relative">
      <div className="flex-1 text-center font-medium">
        {APP_CONFIG.activePromo.bannerText}
      </div>
      <button 
        onClick={handleClose} 
        className="p-1 hover:bg-white/20 rounded-full transition-colors shrink-0 ml-4"
        aria-label="Tutup promo"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
