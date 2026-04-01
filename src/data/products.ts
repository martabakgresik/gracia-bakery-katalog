import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Nastar Klasik',
    description: 'Kue kering isi selai nanas asli yang lumer di mulut dengan olesan telur keemasan.',
    longDescription: 'Nastar Klasik Gracia Bakery dibuat menggunakan resep turun-temurun dengan mentega premium (butter) yang membuatnya sangat lumer di mulut. Isian selai nanas dibuat secara homemade dari nanas segar pilihan yang dimasak perlahan hingga karamelisasi sempurna, memberikan perpaduan rasa manis dan asam yang menyegarkan.',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=800',
    category: 'Kue Kering',
    variants: ['Toples 250gr', 'Toples 500gr (+Rp 75.000)'],
    rating: 4.9,
    reviewCount: 128
  },
  {
    id: 'p2',
    name: 'Lemper Ayam',
    description: 'Ketan gurih isi daging ayam cincang berbumbu rempah rahasia, dibungkus daun pisang.',
    longDescription: 'Jajanan pasar favorit sepanjang masa. Ketan putih pilihan dimasak dengan santan kental segar dan daun pandan hingga pulen dan gurih. Diisi dengan suwiran daging ayam kampung asli yang dimasak dengan bumbu rempah rahasia keluarga, kemudian dibungkus dengan daun pisang batu yang memberikan aroma khas saat dikukus.',
    price: 6000,
    image: 'https://images.unsplash.com/photo-1548943487-a2e4f43b4850?auto=format&fit=crop&q=80&w=800',
    category: 'Jajanan Pasar',
    variants: ['Biasa', 'Pedas Manis'],
    rating: 4.7,
    reviewCount: 85
  },
  {
    id: 'p3',
    name: 'Donat Gula Klasik',
    description: 'Donat empuk dengan taburan gula halus yang manisnya pas untuk teman ngopi.',
    longDescription: 'Kembali ke masa lalu dengan Donat Gula Klasik kami. Adonan donat diuleni hingga kalis sempurna, menghasilkan tekstur yang sangat empuk dan ringan. Digoreng dengan suhu yang tepat agar tidak berminyak, lalu ditaburi dengan gula halus berkualitas yang lumer seketika di lidah.',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800',
    category: 'Donat',
    variants: ['Gula Halus', 'Gula Kayu Manis'],
    rating: 4.8,
    reviewCount: 210
  },
  {
    id: 'p4',
    name: 'Coklat Cookies',
    description: 'Kue kering renyah dengan taburan choco chips premium yang melimpah.',
    longDescription: 'Bagi para pecinta coklat, cookies ini adalah pilihan sempurna. Dibuat dengan dark chocolate powder premium dan dipenuhi dengan choco chips Belgia di setiap gigitannya. Teksturnya renyah di luar namun sedikit chewy di bagian tengah.',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800',
    category: 'Kue Kering',
    variants: ['Toples 250gr', 'Toples 500gr (+Rp 60.000)'],
    rating: 4.9,
    reviewCount: 156
  },
  {
    id: 'p5',
    name: 'Roti Sobek Manis',
    description: 'Roti sobek super lembut dengan isian coklat dan keju yang lumer.',
    longDescription: 'Roti sobek andalan Gracia Bakery yang selalu fresh dari oven setiap pagi. Menggunakan metode tangzhong Jepang untuk memastikan kelembutan roti bertahan berhari-hari tanpa pengawet. Tersedia dalam berbagai pilihan isian yang melimpah dan memanjakan lidah.',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    category: 'Roti',
    variants: ['Coklat Keju', 'Coklat Kacang', 'Full Keju', 'Srikaya'],
    rating: 4.8,
    reviewCount: 342
  },
  {
    id: 'p6',
    name: 'Kastengel Keju',
    description: 'Kue kering gurih dengan taburan keju edam pilihan yang renyah dan wangi.',
    longDescription: 'Kastengel premium yang dibuat khusus bagi pecinta keju sejati. Kami menggunakan campuran keju Edam dan Gouda berkualitas tinggi di dalam adonan, serta taburan keju Cheddar renyah di atasnya. Menghasilkan aroma keju yang sangat kuat dan tekstur yang renyah ngeprul.',
    price: 90000,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800',
    category: 'Kue Kering',
    variants: ['Toples 250gr', 'Toples 500gr (+Rp 80.000)'],
    rating: 5.0,
    reviewCount: 94
  }
];
