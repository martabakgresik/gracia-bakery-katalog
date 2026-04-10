import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Nastar Klasik',
    description: 'Kue kering isi selai nanas asli yang lumer di mulut dengan olesan telur keemasan.',
    longDescription: 'Nastar Klasik Gracia Bakery dibuat menggunakan resep turun-temurun dengan mentega premium (butter) yang membuatnya sangat lumer di mulut. Isian selai nanas dibuat secara homemade dari nanas segar pilihan yang dimasak perlahan hingga karamelisasi sempurna, memberikan perpaduan rasa manis dan asam yang menyegarkan.',
    price: 85000,
    image: '/nastar.webp',
    category: 'Kue Kering',
    variants: [
      { name: 'Toples 250gr', price: 85000 },
      { name: 'Toples 500gr', price: 160000 },
      { name: 'Toples 1kg', price: 310000 }
    ],
    rating: 4.9,
    reviewCount: 128
  },
  {
    id: 'p2',
    name: 'Lemper Ayam',
    description: 'Ketan gurih isi daging ayam cincang berbumbu rempah rahasia, dibungkus daun pisang.',
    longDescription: 'Jajanan pasar favorit sepanjang masa. Ketan putih pilihan dimasak dengan santan kental segar dan daun pandan hingga pulen dan gurih. Diisi dengan suwiran daging ayam kampung asli yang dimasak dengan bumbu rempah rahasia keluarga, kemudian dibungkus dengan daun pisang batu yang memberikan aroma khas saat dikukus.',
    price: 6000,
    image: '/lemper-ayam.webp',
    category: 'Jajanan Pasar',
    variants: [
      { name: 'Per Biji', price: 6000 },
      { name: 'Box isi 5', price: 28000 },
      { name: 'Box isi 10', price: 55000 }
    ],
    rating: 4.7,
    reviewCount: 85
  },
  {
    id: 'p3',
    name: 'Donat Gula Klasik',
    description: 'Donat empuk dengan taburan gula halus yang manisnya pas untuk teman ngopi.',
    longDescription: 'Kembali ke masa lalu dengan Donat Gula Klasik kami. Adonan donat diuleni hingga kalis sempurna, menghasilkan tekstur yang sangat empuk dan ringan. Digoreng dengan suhu yang tepat agar tidak berminyak, lalu ditaburi dengan gula halus berkualitas yang lumer seketika di lidah.',
    price: 5000,
    image: '/donat.webp',
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
    image: '/coklat-cookies.webp',
    category: 'Kue Kering',
    variants: [
      { name: 'Toples 250gr', price: 65000 },
      { name: 'Toples 500gr', price: 125000 },
      { name: 'Toples 1kg', price: 240000 }
    ],
    rating: 4.9,
    reviewCount: 156
  },
  {
    id: 'p5',
    name: 'Roti Sobek Manis',
    description: 'Roti sobek super lembut dengan isian coklat dan keju yang lumer.',
    longDescription: 'Roti sobek andalan Gracia Bakery yang selalu fresh dari oven setiap pagi. Menggunakan metode tangzhong Jepang untuk memastikan kelembutan roti bertahan berhari-hari tanpa pengawet. Tersedia dalam berbagai pilihan isian yang melimpah dan memanjakan lidah.',
    price: 25000,
    image: '/roti-sobek.webp',
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
    image: '/kastangel.webp',
    category: 'Kue Kering',
    variants: [
      { name: 'Toples 250gr', price: 90000 },
      { name: 'Toples 500gr', price: 170000 },
      { name: 'Toples 1kg', price: 330000 }
    ],
    rating: 5.0,
    reviewCount: 94
  },
  {
    id: 'p7',
    name: 'Wajik Ketan',
    description: 'Kue tradisional dari ketan dan gula merah asli dengan aroma pandan yang wangi.',
    longDescription: 'Wajik Ketan Gracia Bakery menggunakan beras ketan kualitas super yang dimasak dengan santan kental dan gula merah pilihan. Teksturnya legit, manisnya pas, dan memiliki aroma pandan yang menggugah selera. Sangat cocok untuk hantaran atau camilan sore.',
    price: 5000,
    image: '/wajik.webp',
    category: 'Jajanan Pasar',
    variants: ['Potongan Standar', 'Loyang Kecil'],
    rating: 4.8,
    reviewCount: 67
  },
  {
    id: 'p8',
    name: 'Lapis Surabaya',
    description: 'Kue lapis lembut dengan selai strawberry di tengahnya, tekstur sangat halus.',
    longDescription: 'Lapis Surabaya atau Spiku kami dibuat dengan banyak kuning telur untuk menghasilkan tekstur yang sangat lembut dan kaya rasa (rich). Terdiri dari lapisan kuning dan coklat yang disatukan dengan selai strawberry premium yang memberikan sedikit rasa asam segar.',
    price: 125000,
    image: '/lapis-surabaya.webp',
    category: 'Roti',
    variants: [
      { name: 'Loyang 20x10', price: 125000 },
      { name: 'Loyang 20x20', price: 240000 }
    ],
    rating: 4.9,
    reviewCount: 112
  },
  {
    id: 'p9',
    name: 'Bolu Marmer',
    description: 'Bolu jadul dengan motif marmer coklat yang cantik dan rasa mentega yang kuat.',
    longDescription: 'Bolu Marmer klasik yang mengingatkan pada masakan rumah. Menggunakan full butter berkualitas tinggi, menghasilkan bolu yang wangi dan tidak seret di tenggorokan. Motif marmer coklatnya dibuat menggunakan pasta coklat premium.',
    price: 95000,
    image: '/bolu-marmer.webp',
    category: 'Roti',
    variants: [
      { name: 'Diameter 20cm', price: 95000 },
      { name: 'Diameter 24cm', price: 145000 }
    ],
    rating: 4.8,
    reviewCount: 89
  },
  {
    id: 'p10',
    name: 'Sus Vanila',
    description: 'Kue sus renyah dengan isian vla vanila yang melimpah dan tidak terlalu manis.',
    longDescription: 'Kue Sus atau Choux Pastry kami memiliki kulit yang renyah dan kopong sempurna. Diisi dengan vla vanila yang dimasak dengan susu segar dan vanila asli, memberikan rasa yang creamy dan lembut di setiap gigitan.',
    price: 7000,
    image: '/sus-vanila.webp',
    category: 'Jajanan Pasar',
    variants: ['Per Biji', 'Box isi 6', 'Box isi 12'],
    rating: 4.7,
    reviewCount: 145
  },
  {
    id: 'p11',
    name: 'Pastel Roghut',
    description: 'Pastel renyah dengan isian sayuran dan ayam yang gurih dan creamy.',
    longDescription: 'Pastel dengan kulit yang renyah dan berlapis (flaky). Isiannya berupa roghut ayam dan sayuran yang dimasak dengan susu dan bumbu spesial, memberikan tekstur yang creamy dan rasa yang sangat gurih.',
    price: 6500,
    image: '/pastel-roghut.webp',
    category: 'Jajanan Pasar',
    variants: ['Per Biji', 'Box isi 10'],
    rating: 4.8,
    reviewCount: 76
  },
  {
    id: 'p12',
    name: 'Putu Ayu',
    description: 'Kue kukus lembut dengan aroma pandan dan taburan kelapa parut gurih.',
    longDescription: 'Putu Ayu klasik yang lembut dan empuk. Menggunakan sari daun suji dan pandan asli untuk warna hijau alami dan aroma yang wangi. Dilengkapi dengan kelapa parut yang sudah dikukus dengan sedikit garam untuk rasa gurih yang seimbang.',
    price: 4000,
    image: '/putu-ayu.webp',
    category: 'Jajanan Pasar',
    variants: ['Per Biji', 'Mika isi 5'],
    rating: 4.6,
    reviewCount: 54
  },
  {
    id: 'p13',
    name: 'Donat Coklat Klasik',
    description: 'Donat empuk dengan balutan coklat ganache premium yang tebal dan lumer.',
    longDescription: 'Donat Coklat Klasik kami menggunakan coklat masak (dark chocolate) berkualitas tinggi yang dicairkan dengan krim segar untuk menghasilkan ganache yang mengkilap dan kaya rasa. Tekstur donat yang empuk berpadu sempurna dengan lapisan coklat yang lumer di setiap gigitan.',
    price: 7000,
    image: '/donat-coklat-klasik.webp',
    category: 'Donat',
    variants: ['Satuan', 'Box isi 6', 'Box isi 12'],
    rating: 4.9,
    reviewCount: 187
  },
  {
    id: 'p14',
    name: 'Donat Coklat Kacang',
    description: 'Donat coklat dengan taburan kacang tanah sangrai yang renyah dan gurih.',
    longDescription: 'Perpaduan klasik yang tak pernah salah. Donat dengan lapisan coklat manis yang kemudian dicelupkan ke dalam remahan kacang tanah sangrai pilihan. Memberikan sensasi tekstur renyah dan rasa gurih yang menyeimbangkan manisnya coklat.',
    price: 7500,
    image: '/donat-klasik-coklat-kacang.webp',
    category: 'Donat',
    variants: ['Satuan', 'Box isi 6'],
    rating: 4.8,
    reviewCount: 132
  },
  {
    id: 'p15',
    name: 'Bomboloni Donat',
    description: 'Donat ala Italia tanpa lubang dengan isian vla melimpah dan taburan gula.',
    longDescription: 'Bomboloni kami dibuat dengan teknik fermentasi lama untuk menghasilkan serat roti yang halus. Diisi dengan berbagai pilihan vla (custard) yang melimpah seperti coklat, vanilla, atau strawberry, kemudian digulingkan di atas gula kastor.',
    price: 8500,
    image: '/bomboloni-donat.webp',
    category: 'Donat',
    variants: ['Isi Coklat', 'Isi Vanilla', 'Isi Strawberry', 'Mix Box isi 6'],
    rating: 4.9,
    reviewCount: 245
  },
  {
    id: 'p16',
    name: 'Donat Mix Topping',
    description: 'Paket donat dengan berbagai pilihan topping kekinian yang cantik dan lezat.',
    longDescription: 'Pilihan tepat untuk berbagi atau hantaran. Paket donat dengan aneka topping mulai dari matcha, tiramisu, taro, hingga red velvet. Setiap donat dihias dengan cantik dan menggunakan bahan topping premium.',
    price: 45000,
    image: '/donat-beragam-toping.webp',
    category: 'Donat',
    variants: ['Box isi 6 Mix', 'Box isi 12 Mix'],
    rating: 4.9,
    reviewCount: 312
  },
  {
    id: 'p17',
    name: 'Bakpao Unti Merah',
    description: 'Bakpao lembut dengan isian kacang merah yang manis dan legit.',
    longDescription: 'Bakpao kukus dengan tekstur kulit yang sangat lembut dan putih bersih. Diisi dengan pasta kacang merah (tausa) buatan sendiri yang dimasak hingga halus dan memiliki rasa manis yang pas.',
    price: 6000,
    image: '/bakpao-unti-merah.webp',
    category: 'Jajanan Pasar',
    variants: ['Per Biji', 'Box isi 6'],
    rating: 4.7,
    reviewCount: 89
  },
  {
    id: 'p18',
    name: 'Semar Mendem',
    description: 'Ketan isi ayam yang dibalut dengan dadar telur tipis yang gurih.',
    longDescription: 'Varian dari lemper yang lebih mewah. Ketan gurih isi ayam cincang yang dibungkus dengan dadar telur tipis. Memberikan perpaduan rasa gurih dari ketan dan telur yang sangat serasi.',
    price: 7000,
    image: '/semar-mendem.webp',
    category: 'Jajanan Pasar',
    variants: ['Per Biji', 'Box isi 5'],
    rating: 4.8,
    reviewCount: 65
  },
  {
    id: 'p19',
    name: 'Lumpur Kentang',
    description: 'Kue lumpur lembut dengan campuran kentang asli dan topping kismis.',
    longDescription: 'Kue basah tradisional yang terbuat dari campuran kentang kukus halus, santan, dan telur. Teksturnya sangat lembut dan lumer di mulut, dengan aroma vanila dan pandan yang wangi.',
    price: 5500,
    image: '/lumpur-kentang.webp',
    category: 'Jajanan Pasar',
    variants: ['Per Biji', 'Mika isi 5'],
    rating: 4.9,
    reviewCount: 124
  },
  {
    id: 'p20',
    name: 'Pie Buah Segar',
    description: 'Kulit pie renyah dengan vla vanila dan topping buah-buahan segar.',
    longDescription: 'Fruit Pie dengan kulit yang renyah dan buttery. Diisi dengan vla vanila yang creamy dan dihiasi dengan potongan buah segar seperti kiwi, jeruk, dan anggur yang dilapisi agar-agar bening.',
    price: 8000,
    image: '/pie-buah.webp',
    category: 'Jajanan Pasar',
    variants: ['Per Biji', 'Box isi 6'],
    rating: 4.8,
    reviewCount: 92
  }
];
