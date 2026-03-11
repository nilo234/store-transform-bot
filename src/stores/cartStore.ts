import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  ShopifyProduct,
  SHOPIFY_STORE_PERMANENT_DOMAIN,
  createShopifyCart,
  addLineToShopifyCart,
  updateShopifyCartLine,
  removeLineFromShopifyCart,
  fetchShopifyCart,
  createShopifyCartMultiLines,
  addMultipleLinesToShopifyCart,
  applyDiscountToShopifyCart,
} from '@/lib/shopify';

export interface CartItem {
  lineId: string | null; // Shopify cart line ID, null until synced
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
  // Bundle fields
  bundleId?: string;
  bundleName?: string;
  bundleDiscountCode?: string;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isOpen: boolean;
  isLoading: boolean;
  isSyncing: boolean;

  // Actions
  addItem: (item: Omit<CartItem, 'lineId'>) => Promise<void>;
  addBundle: (items: Omit<CartItem, 'lineId'>[], discountCode: string) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  removeBundle: (bundleId: string) => Promise<void>;
  clearCart: () => void;
  setOpen: (open: boolean) => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;

  // Computed
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isOpen: false,
      isLoading: false,
      isSyncing: false,

      addItem: async (item) => {
        const { items, cartId, clearCart } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);

        set({ isLoading: true });
        try {
          if (!cartId) {
            // No cart yet – create one
            const result = await createShopifyCart(item.variantId, item.quantity);
            if (result) {
              set({
                cartId: result.cartId,
                checkoutUrl: result.checkoutUrl,
                items: [{ ...item, lineId: result.lineId }],
              });
            }
          } else if (existingItem) {
            // Item already in cart – update quantity
            const newQuantity = existingItem.quantity + item.quantity;
            if (!existingItem.lineId) {
              console.error('Cannot update item without lineId');
              return;
            }
            const result = await updateShopifyCartLine(cartId, existingItem.lineId, newQuantity);
            if (result.success) {
              const currentItems = get().items;
              set({
                items: currentItems.map(i =>
                  i.variantId === item.variantId ? { ...i, quantity: newQuantity } : i
                ),
              });
            } else if (result.cartNotFound) {
              clearCart();
            }
          } else {
            // New item – add line
            const result = await addLineToShopifyCart(cartId, item.variantId, item.quantity);
            if (result.success) {
              const currentItems = get().items;
              set({ items: [...currentItems, { ...item, lineId: result.lineId ?? null }] });
            } else if (result.cartNotFound) {
              clearCart();
            }
          }
        } catch (error) {
          console.error('Failed to add item:', error);
        } finally {
          set({ isLoading: false });
        }

      // Open cart drawer
        set({ isOpen: true });
      },

      addBundle: async (bundleItems, discountCode) => {
        const { cartId, clearCart } = get();

        set({ isLoading: true });
        try {
          const lines = bundleItems.map(item => ({ variantId: item.variantId, quantity: item.quantity }));

          if (!cartId) {
            // Create new cart with all bundle items
            const result = await createShopifyCartMultiLines(lines);
            if (result) {
              const newItems: CartItem[] = bundleItems.map(item => ({
                ...item,
                lineId: result.lineIds.get(item.variantId) ?? null,
              }));
              set({
                cartId: result.cartId,
                checkoutUrl: result.checkoutUrl,
                items: newItems,
              });

              // Apply discount code
              const discountResult = await applyDiscountToShopifyCart(result.cartId, discountCode);
              if (discountResult.checkoutUrl) {
                set({ checkoutUrl: discountResult.checkoutUrl });
              }
            }
          } else {
            // Add all bundle items to existing cart
            const result = await addMultipleLinesToShopifyCart(cartId, lines);
            if (result.success && result.lineIds) {
              const currentItems = get().items;
              const newItems: CartItem[] = bundleItems.map(item => ({
                ...item,
                lineId: result.lineIds!.get(item.variantId) ?? null,
              }));
              set({ items: [...currentItems, ...newItems] });

              // Apply discount code
              const discountResult = await applyDiscountToShopifyCart(cartId, discountCode);
              if (discountResult.checkoutUrl) {
                set({ checkoutUrl: discountResult.checkoutUrl });
              }
            } else if (result.cartNotFound) {
              clearCart();
            }
          }
        } catch (error) {
          console.error('Failed to add bundle:', error);
        } finally {
          set({ isLoading: false });
        }

        set({ isOpen: true });
      },

      updateQuantity: async (variantId, quantity) => {
        if (quantity <= 0) {
          await get().removeItem(variantId);
          return;
        }

        const { items, cartId, clearCart } = get();
        const item = items.find(i => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;

        set({ isLoading: true });
        try {
          const result = await updateShopifyCartLine(cartId, item.lineId, quantity);
          if (result.success) {
            const currentItems = get().items;
            set({ items: currentItems.map(i => i.variantId === variantId ? { ...i, quantity } : i) });
          } else if (result.cartNotFound) {
            clearCart();
          }
        } catch (error) {
          console.error('Failed to update quantity:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (variantId) => {
        const { items, cartId, clearCart } = get();
        const item = items.find(i => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;

        set({ isLoading: true });
        try {
          const result = await removeLineFromShopifyCart(cartId, item.lineId);
          if (result.success) {
            const currentItems = get().items;
            const newItems = currentItems.filter(i => i.variantId !== variantId);
            newItems.length === 0 ? clearCart() : set({ items: newItems });
          } else if (result.cartNotFound) {
            clearCart();
          }
        } catch (error) {
          console.error('Failed to remove item:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      removeBundle: async (bundleId) => {
        const { items, cartId, clearCart } = get();
        const bundleItems = items.filter(i => i.bundleId === bundleId);
        if (!cartId || bundleItems.length === 0) return;

        set({ isLoading: true });
        try {
          for (const item of bundleItems) {
            if (item.lineId) {
              await removeLineFromShopifyCart(cartId, item.lineId);
            }
          }
          const currentItems = get().items;
          const remaining = currentItems.filter(i => i.bundleId !== bundleId);
          remaining.length === 0 ? clearCart() : set({ items: remaining });
        } catch (error) {
          console.error('Failed to remove bundle:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: () => set({ items: [], cartId: null, checkoutUrl: null }),

      setOpen: (isOpen) => set({ isOpen }),

      getCheckoutUrl: () => {
        const checkoutUrl = get().checkoutUrl;
        if (!checkoutUrl) return null;

        try {
          const url = new URL(checkoutUrl);
          url.searchParams.set('channel', 'online_store');
          return url.toString();
        } catch {
          return checkoutUrl;
        }
      },

      syncCart: async () => {
        const { cartId, isSyncing, clearCart } = get();
        if (!cartId || isSyncing) return;

        set({ isSyncing: true });
        try {
          const { exists } = await fetchShopifyCart(cartId);
          if (!exists) clearCart();
        } catch (error) {
          console.error('Failed to sync cart:', error);
        } finally {
          set({ isSyncing: false });
        }
      },

      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0),
    }),
    {
      name: 'neuvie-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        cartId: state.cartId,
        checkoutUrl: state.checkoutUrl,
      }),
    }
  )
);
