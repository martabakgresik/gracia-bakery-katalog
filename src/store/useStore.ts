import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, CartItem, Order, PromoCode, ProductVariant } from '../types';
import { products as initialProducts } from '../data/products';
import { APP_CONFIG } from '../data/config';

interface State {
  cartItems: CartItem[];
  wishlistIds: string[];
  orders: Order[];
  productList: Product[];
  appliedPromo: PromoCode | null;
  
  // UI States
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isHistoryOpen: boolean;
  searchQuery: string;
  selectedCategory: string;
  selectedProductId: string | null;

  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedProductId: (id: string | null) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  setIsWishlistOpen: (isOpen: boolean) => void;
  setIsHistoryOpen: (isOpen: boolean) => void;

  addToCart: (product: Product, variant?: string | ProductVariant) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  
  toggleWishlist: (product: Product) => void;
  
  addOrder: (order: Order) => void;
  
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  
  rateProduct: (productId: string, rating: number) => void;
  checkout: (finalTotal: number, discountAmount: number) => void;
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      cartItems: [],
      wishlistIds: [],
      orders: [],
      productList: initialProducts,
      appliedPromo: null,
      
      isCartOpen: false,
      isWishlistOpen: false,
      isHistoryOpen: false,
      searchQuery: '',
      selectedCategory: 'Semua',
      selectedProductId: null,

      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setSelectedProductId: (id) => set({ selectedProductId: id }),
      setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      setIsWishlistOpen: (isOpen) => set({ isWishlistOpen: isOpen }),
      setIsHistoryOpen: (isOpen) => set({ isHistoryOpen: isOpen }),

      addToCart: (product, variant) => {
        const finalVariant = variant || (product.variants && product.variants.length > 0 ? product.variants[0] : undefined);
        const variantName = typeof finalVariant === 'string' ? finalVariant : finalVariant?.name;
        const variantPrice = (typeof finalVariant !== 'string' && finalVariant?.price) ? finalVariant.price : product.price;
        const cartItemId = variantName ? `${product.id}-${variantName}` : product.id;

        set((state) => {
          const existingItem = state.cartItems.find(item => item.cartItemId === cartItemId);
          if (existingItem) {
            return {
              cartItems: state.cartItems.map(item =>
                item.cartItemId === cartItemId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          }
          return {
            cartItems: [...state.cartItems, {
              ...product,
              price: variantPrice,
              quantity: 1,
              selectedVariant: finalVariant,
              cartItemId
            }]
          };
        });
      },

      removeFromCart: (cartItemId) => {
        set((state) => ({
          cartItems: state.cartItems.filter(item => item.cartItemId !== cartItemId)
        }));
      },

      updateCartQuantity: (cartItemId, delta) => {
        set((state) => ({
          cartItems: state.cartItems.map(item => {
            if (item.cartItemId === cartItemId) {
              const newQuantity = Math.max(0, item.quantity + delta);
              return { ...item, quantity: newQuantity };
            }
            return item;
          }).filter(item => item.quantity > 0)
        }));
      },

      clearCart: () => set({ cartItems: [], appliedPromo: null }),

      toggleWishlist: (product) => {
        set((state) => ({
          wishlistIds: state.wishlistIds.includes(product.id)
            ? state.wishlistIds.filter(id => id !== product.id)
            : [...state.wishlistIds, product.id]
        }));
      },

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders]
        }));
      },

      applyPromo: (code) => {
        const promo = APP_CONFIG.activePromo.code.toLowerCase() === code.toLowerCase() 
          ? APP_CONFIG.activePromo 
          : null;
        
        if (promo) {
          set({ appliedPromo: promo });
          return true;
        }
        return false;
      },

      removePromo: () => set({ appliedPromo: null }),

      rateProduct: (productId, rating) => {
        set((state) => ({
          productList: state.productList.map(p => {
            if (p.id === productId) {
              const newCount = p.reviewCount + 1;
              const newRating = ((p.rating * p.reviewCount) + rating) / newCount;
              return { ...p, rating: newRating, reviewCount: newCount };
            }
            return p;
          })
        }));
      },

      checkout: (finalTotal, discountAmount) => {
        const { cartItems, appliedPromo, addOrder, clearCart, setIsCartOpen } = get();
        
        const newOrder: Order = {
          id: `ORD-${Date.now()}`,
          date: new Date().toISOString(),
          items: [...cartItems],
          total: finalTotal,
          discount: discountAmount,
          promoCode: appliedPromo?.code,
          status: 'Menunggu Konfirmasi'
        };
        
        addOrder(newOrder);
        clearCart();
        setIsCartOpen(false);
      }
    }),
    {
      name: 'gracia-bakery-storage',
      partialize: (state) => ({ 
        cartItems: state.cartItems, 
        wishlistIds: state.wishlistIds, 
        orders: state.orders 
      }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);
