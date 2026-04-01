import { useState, useEffect } from 'react';
import { X, ShoppingBag, Star, StarHalf, Share2, Heart } from 'lucide-react';
import { Product } from '../types';
import { shareProduct } from '../utils/share';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, variant?: string) => void;
  onRate: (productId: string, rating: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export function ProductModal({ product, isOpen, onClose, onAddToCart, onRate, isWishlisted, onToggleWishlist }: ProductModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [hoverRating, setHoverRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    setHasRated(false);
    setHoverRating(0);
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant('');
    }
  }, [product?.id]);

  if (!isOpen || !product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white dark:bg-stone-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200 border border-stone-200 dark:border-stone-800">
        
        {/* Close button (Mobile - absolute top right) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-stone-800/80 backdrop-blur-md text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-full shadow-sm md:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-stone-100 dark:bg-stone-800 shrink-0">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-stone-800/90 text-stone-800 dark:text-stone-200 backdrop-blur-sm shadow-sm">
              {product.category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 flex flex-col p-6 md:p-8 overflow-y-auto">
          {/* Close button (Desktop) */}
          <div className="hidden md:flex justify-end mb-2">
            <button 
              onClick={onClose}
              className="p-2 text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors rounded-full hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">
              {product.name}
            </h2>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => {
                  const isFull = i < Math.floor(product.rating);
                  const isHalf = !isFull && i === Math.floor(product.rating) && product.rating % 1 >= 0.5;
                  if (isFull) return <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />;
                  if (isHalf) return <StarHalf key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />;
                  return <Star key={i} className="w-4 h-4 text-stone-300 dark:text-stone-600" />;
                })}
              </div>
              <span className="text-sm text-stone-500 dark:text-stone-400">
                {product.rating.toFixed(1)} ({product.reviewCount} ulasan)
              </span>
            </div>

            <p className="text-2xl font-semibold text-primary dark:text-primary-light mb-6">
              {formatPrice(product.price)}
            </p>
            
            <div className="prose prose-stone dark:prose-invert prose-sm mb-8">
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                {product.longDescription || product.description}
              </p>
            </div>

            {/* Variants Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-3">
                  Pilih Varian
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all ${
                        selectedVariant === variant
                          ? 'border-primary bg-primary/5 text-primary dark:text-primary-light dark:border-primary-light dark:bg-primary/10 shadow-sm'
                          : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800'
                      }`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Rating Section */}
          <div className="mb-8 pt-6 border-t border-stone-100 dark:border-stone-800">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-3">
              Beri Penilaian
            </h3>
            {hasRated ? (
              <p className="text-sm text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 p-3 rounded-xl border border-green-100 dark:border-green-800 inline-block">
                Terima kasih atas penilaian Anda!
              </p>
            ) : (
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => {
                      onRate(product.id, star);
                      setHasRated(true);
                    }}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star 
                      className={`w-8 h-8 ${
                        star <= hoverRating 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-stone-200 dark:text-stone-700 hover:text-yellow-200 dark:hover:text-yellow-200'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-6 mt-auto border-t border-stone-100 dark:border-stone-800 flex gap-3">
            <button
              onClick={() => onToggleWishlist(product)}
              className="flex items-center justify-center w-14 h-14 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors duration-200 shrink-0"
              aria-label={isWishlisted ? "Hapus dari wishlist" : "Tambah ke wishlist"}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500 dark:fill-red-400 dark:text-red-400' : ''}`} />
            </button>
            <button
              onClick={() => shareProduct(product)}
              className="flex items-center justify-center w-14 h-14 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors duration-200 shrink-0"
              aria-label="Bagikan produk"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white py-4 px-6 rounded-xl font-medium transition-colors duration-200 shadow-sm"
            >
              <ShoppingBag className="w-5 h-5" />
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
