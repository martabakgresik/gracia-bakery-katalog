export function Hero() {
  return (
    <div className="relative bg-stone-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-40"
          src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=2000"
          alt="Aneka roti dan kue kering"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
      </div>
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-serif font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Cita Rasa Tradisi dalam Setiap Gigitan
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-stone-200 font-sans font-light">
          Menyajikan aneka roti, lemper, donat, coklat cookies, nastar, dan kue kering premium dengan resep warisan keluarga Gracia.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <a
            href="#menu"
            className="inline-flex items-center px-8 py-3 border-2 border-transparent text-base font-bold rounded-full text-white bg-primary hover:bg-primary-light transition-colors duration-200 shadow-lg"
          >
            Lihat Menu
          </a>
        </div>
      </div>
    </div>
  );
}
