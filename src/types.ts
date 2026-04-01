export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  image: string;
  category: 'Roti' | 'Jajanan Pasar' | 'Kue Kering' | 'Donat';
  variants?: string[];
  rating: number;
  reviewCount: number;
}

export interface CartItem extends Product {
  cartItemId: string;
  quantity: number;
  selectedVariant?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Menunggu Konfirmasi' | 'Diproses' | 'Selesai';
}
