import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useState, useRef, useEffect } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-stone-600 hover:text-primary dark:text-stone-300 dark:hover:text-primary-light transition-colors rounded-full flex items-center justify-center"
        aria-label="Toggle theme"
      >
        <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-xl shadow-lg bg-white dark:bg-stone-800 ring-1 ring-black ring-opacity-5 z-50 overflow-hidden border border-stone-100 dark:border-stone-700">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={() => { setTheme("light"); setIsOpen(false); }}
              className={`flex items-center w-full px-4 py-2.5 text-sm ${theme === 'light' ? 'text-primary bg-stone-50 dark:bg-stone-700/50' : 'text-stone-700 dark:text-stone-300'} hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors`}
            >
              <Sun className="mr-3 h-4 w-4" />
              Terang
            </button>
            <button
              onClick={() => { setTheme("dark"); setIsOpen(false); }}
              className={`flex items-center w-full px-4 py-2.5 text-sm ${theme === 'dark' ? 'text-primary bg-stone-50 dark:bg-stone-700/50' : 'text-stone-700 dark:text-stone-300'} hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors`}
            >
              <Moon className="mr-3 h-4 w-4" />
              Gelap
            </button>
            <button
              onClick={() => { setTheme("system"); setIsOpen(false); }}
              className={`flex items-center w-full px-4 py-2.5 text-sm ${theme === 'system' ? 'text-primary bg-stone-50 dark:bg-stone-700/50' : 'text-stone-700 dark:text-stone-300'} hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors`}
            >
              <Laptop className="mr-3 h-4 w-4" />
              Sistem
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
