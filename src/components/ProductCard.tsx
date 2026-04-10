import { Plus, Star, StarHalf, Share2, Heart, ZoomIn } from 'lucide-react';
import { Product } from '../types';
import { shareProduct } from '../utils/share';
import { formatPrice } from '../utils/format';
import { useStore } from '../store/useStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { wishlistIds, toggleWishlist, addToCart, setSelectedProductId } = useStore();
  const isWishlisted = wishlistIds.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleCardClick = () => {
    setSelectedProductId(product.id);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    shareProduct(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group flex flex-col bg-white dark:bg-stone-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-stone-100 dark:border-stone-700 cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-900">
        <img
          src={product.image}
          alt={`${product.name} - ${product.category} Gracia Bakery`}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        {/* Watermark Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-60 group-hover:opacity-10 transition-opacity duration-500 z-10">
          <img src="/og-gracia-bakery.webp" alt="watermark" className="w-2/3 max-w-[150px] object-contain drop-shadow-md" />
        </div>
        
        {/* Zoom Overlay (Hover Effect) */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-20">
          <div className="w-12 h-12 rounded-full bg-white/90 dark:bg-stone-800/90 flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl backdrop-blur-sm">
            <ZoomIn className="w-6 h-6 text-stone-700 dark:text-stone-300" />
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 dark:bg-stone-800/90 text-stone-800 dark:text-stone-200 backdrop-blur-sm shadow-sm">
            {product.category}
          </span>
        </div>
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm shadow-sm text-stone-400 dark:text-stone-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          aria-label={isWishlisted ? "Hapus dari wishlist" : "Tambah ke wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500 dark:fill-red-400 dark:text-red-400' : ''}`} />
        </button>
      </div>
      
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-xl font-serif font-semibold text-stone-900 dark:text-stone-100 mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2 mb-3 flex-1">
          {product.description}
        </p>

        <div className="flex items-center gap-1 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => {
              const isFull = i < Math.floor(product.rating);
              const isHalf = !isFull && i === Math.floor(product.rating) && product.rating % 1 >= 0.5;
              if (isFull) return <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />;
              if (isHalf) return <StarHalf key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />;
              return <Star key={i} className="w-4 h-4 text-stone-300" />;
            })}
          </div>
          <span className="text-xs text-stone-500 ml-1">({product.reviewCount})</span>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100 dark:border-stone-700">
          <div className="flex flex-col">
            {product.variants && product.variants.length > 1 && product.variants.some(v => typeof v !== 'string' && v.price && v.price !== product.price) && (
              <span className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500 font-bold mb-0.5">Mulai dari</span>
            )}
            <span className="text-lg font-semibold text-primary dark:text-primary-light">
              {formatPrice(product.price)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShareClick}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-stone-50 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors duration-200"
              aria-label={`Bagikan ${product.name}`}
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-200 hover:bg-primary dark:hover:bg-primary hover:text-white transition-colors duration-200"
              aria-label={`Tambah ${product.name} ke keranjang`}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
