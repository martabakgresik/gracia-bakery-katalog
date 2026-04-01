import { MapPin, Phone, Clock, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-white mb-6">Gracia Bakery</h2>
            <p className="text-stone-300 leading-relaxed mb-6">
              Menyajikan aneka jajanan pastry tradisional, roti, lemper, donat, coklat cookies, nastar, dan kue kering dengan resep otentik dan bahan premium.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary hover:bg-primary-light flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider text-sm">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-light shrink-0 mt-0.5" />
                <span className="text-stone-300"><br/><span className="text-sm text-stone-400">(WhatsApp & Telepon)</span></span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-light shrink-0 mt-0.5" />
                <span className="text-stone-300">Jl. Roti Manis No. 123<br/>Jakarta Selatan, 12345</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider text-sm">Jam Buka</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary-light shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Senin - Sabtu</p>
                  <p className="text-stone-300">07:00 - 20:00 WIB</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 shrink-0" />
                <div>
                  <p className="text-white font-semibold">Minggu</p>
                  <p className="text-stone-300">08:00 - 17:00 WIB</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="mt-16 pt-8 border-t border-stone-800 text-center text-sm text-stone-400 flex flex-col items-center gap-2">
          <p>&copy; {new Date().getFullYear()} Gracia Bakery. All rights reserved.</p>
          <p>
            Didesain dengan <span className="text-red-500">♥</span> oleh{' '}
            <a 
              href="https://ariftirtana.my.id" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-light hover:text-primary-light transition-colors font-semibold"
            >
              Arif Tirtana
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
