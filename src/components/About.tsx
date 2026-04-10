export function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-stone-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-stone-100 dark:bg-stone-700 rounded-3xl transform -rotate-3 transition-colors duration-300"></div>
            <img 
              src="/og-gracia-bakery.webp" 
              alt="Tentang Gracia Bakery" 
              className="relative rounded-2xl shadow-lg object-cover h-[400px] w-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-6">
              Tentang Gracia Bakery
            </h2>
            <div className="w-20 h-1 bg-primary rounded-full opacity-80 mb-6"></div>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
              Berdiri sejak tahun 2010, Gracia Bakery bermula dari kecintaan kami terhadap resep kue tradisional warisan keluarga. Kami percaya bahwa setiap gigitan roti dan kue harus membawa kehangatan dan kebahagiaan.
            </p>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
              Kami berkomitmen untuk selalu menggunakan bahan-bahan premium berkualitas tinggi, tanpa bahan pengawet buatan. Mulai dari jajanan pasar yang autentik hingga kue kering modern, semuanya dibuat fresh setiap hari oleh tangan-tangan pembuat roti kami yang berpengalaman.
            </p>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-medium">
              Terima kasih telah menjadikan Gracia Bakery bagian dari momen spesial Anda.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
