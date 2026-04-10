import { useState, useEffect } from 'react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent');
      if (!consent) setIsVisible(true);
    } catch (e) {
      console.error('Error loading cookie consent:', e);
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('cookie_consent', 'true');
    } catch (e) {
      console.error('Error saving cookie consent:', e);
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-stone-600 dark:text-stone-300 text-center sm:text-left">
          Kami menggunakan cookies untuk meningkatkan pengalaman Anda di situs web kami. Dengan melanjutkan navigasi, Anda menyetujui penggunaan cookies kami.
        </p>
        <div className="flex gap-3 shrink-0">
          <button 
            onClick={handleAccept} 
            className="px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-light transition-colors"
          >
            Mengerti
          </button>
        </div>
      </div>
    </div>
  );
}
