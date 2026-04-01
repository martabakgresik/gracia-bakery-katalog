import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { Cart } from './components/Cart';
import { Wishlist } from './components/Wishlist';
import { OrderHistory } from './components/OrderHistory';
import { AIChat } from './components/AIChat';
import { Footer } from './components/Footer';
import { PromoBanner } from './components/PromoBanner';
import { CookieBanner } from './components/CookieBanner';
import { About } from './components/About';
import { FAQ } from './components/FAQ';
import { products } from './data/products';
import { Product, CartItem, Order } from './types';

const CATEGORIES = ['Semua', 'Roti', 'Jajanan Pasar', 'Kue Kering', 'Donat'];

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productList, setProductList] = useState<Product[]>(products);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('gracia_orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching products or background operations
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleRateProduct = (productId: string, rating: number) => {
    setProductList(prev => prev.map(p => {
      if (p.id === productId) {
        const newCount = p.reviewCount + 1;
        const newRating = ((p.rating * p.reviewCount) + rating) / newCount;
        return { ...p, rating: newRating, reviewCount: newCount };
      }
      return p;
    }));
  };

  const toggleWishlist = (product: Product) => {
    setWishlistIds(prev => {
      if (prev.includes(product.id)) {
        toast('Dihapus dari Wishlist', { 
          description: `${product.name} telah dihapus dari wishlist Anda.` 
        });
        return prev.filter(id => id !== product.id);
      } else {
        toast.success('Ditambahkan ke Wishlist', { 
          description: `${product.name} telah ditambahkan ke wishlist Anda.` 
        });
        return [...prev, product.id];
      }
    });
  };

  const handleAddToCart = (product: Product, variant?: string) => {
    // If product has variants but none was selected (e.g. from direct card click), default to the first variant
    const finalVariant = variant || (product.variants && product.variants.length > 0 ? product.variants[0] : undefined);
    const cartItemId = finalVariant ? `${product.id}-${finalVariant}` : product.id;

    setCartItems(prev => {
      const existingItem = prev.find(item => item.cartItemId === cartItemId);
      if (existingItem) {
        return prev.map(item => 
          item.cartItemId === cartItemId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedVariant: finalVariant, cartItemId }];
    });
    
    toast.success('Berhasil ditambahkan', { 
      description: `${product.name} ${finalVariant ? `(${finalVariant})` : ''} masuk ke keranjang.` 
    });
    // setIsCartOpen(true); // Optional: you can keep this or remove it since we have toasts now. Let's remove it for a smoother experience.
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleRemoveItem = (cartItemId: string) => {
    const itemToRemove = cartItems.find(item => item.cartItemId === cartItemId);
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
    if (itemToRemove) {
      toast('Item dihapus', { 
        description: `${itemToRemove.name} telah dihapus dari keranjang.` 
      });
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckoutSuccess = () => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items: [...cartItems],
      total: cartTotal,
      status: 'Menunggu Konfirmasi'
    };
    
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('gracia_orders', JSON.stringify(updatedOrders));
    
    setCartItems([]);
    setIsCartOpen(false);
    toast.success('Pesanan Berhasil', { 
      description: 'Pesanan Anda telah dicatat di riwayat pesanan.' 
    });
  };

  const filteredProducts = productList.filter(p => {
    const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchLower === '' || 
      p.name.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower) ||
      (p.longDescription?.toLowerCase().includes(searchLower) ?? false);
    
    return matchesCategory && matchesSearch;
  });

  const currentSelectedProduct = selectedProduct 
    ? productList.find(p => p.id === selectedProduct.id) || null 
    : null;

  const wishlistProducts = productList.filter(p => wishlistIds.includes(p.id));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex flex-col items-center justify-center transition-colors duration-300">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">Gracia Bakery</h2>
        <p className="text-stone-500 dark:text-stone-400 font-medium animate-pulse">Menyiapkan hidangan segar...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 transition-colors duration-300">
      <Toaster position="top-center" />
      <PromoBanner />
      <Header 
        cartItemCount={totalItems} 
        onOpenCart={() => setIsCartOpen(true)} 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />
      
      <main className="flex-grow">
        <Hero />
        
        <section id="menu" className="py-20 bg-[#FDFBF7] dark:bg-stone-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-4">
                Menu Spesial Kami
              </h2>
              <div className="w-24 h-1 bg-primary dark:bg-primary-light mx-auto rounded-full"></div>
              <p className="mt-6 text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
                Pilih aneka jajanan dan kue kering favorit Anda. Dibuat fresh setiap hari dengan bahan berkualitas tinggi.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-2 border-stone-300 dark:border-stone-700 hover:border-primary dark:hover:border-primary-light hover:text-primary dark:hover:text-primary-light'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={(p) => handleAddToCart(p)} 
                  onClick={() => setSelectedProduct(product)}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-stone-500 dark:text-stone-400">
                Belum ada produk yang sesuai dengan pencarian atau kategori ini.
              </div>
            )}
          </div>
        </section>

        <About />
        <FAQ />
      </main>

      <Footer />

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
        onCheckout={handleCheckoutSuccess}
      />

      <Wishlist
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlistProducts}
        onRemove={(id) => {
          const product = productList.find(p => p.id === id);
          if (product) toggleWishlist(product);
        }}
        onAddToCart={(p) => handleAddToCart(p)}
      />

      <ProductModal
        product={currentSelectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onRate={handleRateProduct}
        isWishlisted={currentSelectedProduct ? wishlistIds.includes(currentSelectedProduct.id) : false}
        onToggleWishlist={toggleWishlist}
      />

      <OrderHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        orders={orders}
      />

      <AIChat />
      <CookieBanner />
    </div>
  );
}

