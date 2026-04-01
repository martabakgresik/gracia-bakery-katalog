export interface ProductVariant {
  name: string;
  price?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  image: string;
  category: 'Roti' | 'Jajanan Pasar' | 'Kue Kering' | 'Donat';
  variants?: (string | ProductVariant)[];
  rating: number;
  reviewCount: number;
}

export interface CartItem extends Omit<Product, 'variants'> {
  cartItemId: string;
  quantity: number;
  selectedVariant?: string | ProductVariant;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  discount?: number;
  promoCode?: string;
  status: 'Menunggu Konfirmasi' | 'Diproses' | 'Selesai';
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  description: string;
}
