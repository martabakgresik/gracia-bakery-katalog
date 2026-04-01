import { useState, useEffect } from 'react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setIsVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white dark:bg-stone-900 border-t-2 border-primary dark:border-[#C85A3A] p-6 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-stone-700 dark:text-stone-200 text-center sm:text-left font-medium">
          Kami menggunakan cookies untuk meningkatkan pengalaman Anda di situs web kami. Dengan melanjutkan navigasi, Anda menyetujui penggunaan cookies kami.
        </p>
        <div className="flex gap-3 shrink-0">
          <button 
            onClick={handleAccept} 
            className="px-8 py-2.5 bg-primary hover:bg-primary-light text-white rounded-full text-sm font-bold transition-colors duration-200 shadow-md"
          >
            Mengerti
          </button>
        </div>
      </div>
    </div>
  );
}
