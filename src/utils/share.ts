import { Product } from '../types';

export const shareProduct = async (product: Product) => {
  // Use the current origin as the base URL
  const url = window.location.origin;
  
  const formatPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(product.price);

  const text = `Coba lihat ${product.name} dari Gracia Bakery!\n\n${product.description}\n\nHarga: ${formatPrice}\n\nPesan sekarang di: ${url}`;
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: product.name,
        text: text,
      });
    } catch (error) {
      // User cancelled or share failed, fallback to WhatsApp silently if needed, 
      // but usually we just ignore AbortError from user cancellation.
      console.log('Share cancelled or failed:', error);
    }
  } else {
    // Fallback to WhatsApp if Web Share API is not supported (e.g., desktop browsers)
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }
};
