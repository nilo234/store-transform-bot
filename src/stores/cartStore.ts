import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ShopifyProduct, createStorefrontCheckout } from '@/lib/shopify';

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  // Subscription fields
  isSubscription?: boolean;
  subscriptionFrequency?: string;
  subscriptionDiscount?: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  checkoutUrl: string | null;
  
  // Actions
  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  setOpen: (open: boolean) => void;
  createCheckout: () => Promise<string | null>;
  
  // Computed
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isLoading: false,
      checkoutUrl: null,

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);
        
        if (existingItem) {
          set({
            items: items.map(i =>
              i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          });
        } else {
          set({ items: [...items, item] });
        }
        
        // Open cart drawer when item is added
        set({ isOpen: true });
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.variantId === variantId ? { ...item, quantity } : item
          )
        });
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter(item => item.variantId !== variantId)
        });
      },

      clearCart: () => {
        set({ items: [], checkoutUrl: null });
      },

      setOpen: (isOpen) => set({ isOpen }),

      createCheckout: async () => {
        const { items } = get();
        if (items.length === 0) return null;

        set({ isLoading: true });
        try {
          const cartItems = items.map(item => ({
            variantId: item.variantId,
            quantity: item.quantity,
          }));
          
          const checkoutUrl = await createStorefrontCheckout(cartItems);
          set({ checkoutUrl });
          return checkoutUrl;
        } catch (error) {
          console.error('Failed to create checkout:', error);
          return null;
        } finally {
          set({ isLoading: false });
        }
      },

      totalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce((sum, item) => 
          sum + (parseFloat(item.price.amount) * item.quantity), 0
        );
      },
    }),
    {
      name: 'neuvie-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);