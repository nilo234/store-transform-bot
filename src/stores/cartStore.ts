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
import { trackAddToCart, trackInitiateCheckout, type PixelProduct } from '@/lib/marketingPixels';

function itemToPixelProduct(item: { product: ShopifyProduct; price: { amount: string }; quantity: number; variantId: string }): PixelProduct {
  return {
    id: item.variantId,
    name: item.product?.node?.title ?? 'Product',
    price: parseFloat(item.price.amount) || 0,
    quantity: item.quantity,
  };
}

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
  recoverCheckoutUrl: () => Promise<string | null>;

  // Computed
  totalItems: () => number;
  totalPrice: () => number;
}

function buildCartLines(items: CartItem[]): Array<{ variantId: string; quantity: number }> {
  const quantityMap = new Map<string, number>();

  for (const item of items) {
    quantityMap.set(item.variantId, (quantityMap.get(item.variantId) || 0) + item.quantity);
  }

  return Array.from(quantityMap.entries()).map(([variantId, quantity]) => ({ variantId, quantity }));
}

function patchItemsWithLineIds(
  items: CartItem[],
  lineIds?: Map<string, string>,
  prices?: Map<string, { amount: string; currencyCode: string }>,
): CartItem[] {
  if (!lineIds && !prices) return items;
  return items.map((item) => {
    const fresh = prices?.get(item.variantId);
    return {
      ...item,
      lineId: lineIds?.get(item.variantId) ?? item.lineId ?? null,
      price: fresh ? { amount: fresh.amount, currencyCode: fresh.currencyCode } : item.price,
    };
  });
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

        // Marketing pixels — fire AddToCart event for Meta + GA4
        try {
          trackAddToCart([itemToPixelProduct(item as never)]);
        } catch {
          /* ignore */
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

        // Marketing pixels — fire AddToCart for the bundle
        try {
          trackAddToCart(bundleItems.map((i) => itemToPixelProduct(i as never)));
        } catch {
          /* ignore */
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
          const url = new URL(checkoutUrl.startsWith('http') ? checkoutUrl : `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}${checkoutUrl}`);
          url.protocol = 'https:';
          url.searchParams.set('channel', 'online_store');

          // Auto-apply stored discount code (e.g. from Quiz funnel)
          if (typeof window !== 'undefined') {
            try {
              const storedDiscount = window.localStorage.getItem('neuvie-discount-code');
              if (storedDiscount && !url.searchParams.has('discount')) {
                url.searchParams.set('discount', storedDiscount);
              }
            } catch {
              // ignore localStorage access errors
            }
          }

          // If Shopify returns a custom checkout domain that is not fully ready,
          // hard-fallback to the permanent myshopify domain with the same cart token.
          if (url.hostname !== SHOPIFY_STORE_PERMANENT_DOMAIN) {
            const fallbackUrl = new URL(`${url.pathname}${url.search}`, `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}`);
            fallbackUrl.searchParams.set('channel', 'online_store');
            return fallbackUrl.toString();
          }

          return url.toString();
        } catch {
          return null;
        }
      },

      recoverCheckoutUrl: async () => {
        const { cartId, clearCart } = get();
        const currentUrl = get().getCheckoutUrl();
        if (currentUrl) return currentUrl;

        const localItems = get().items;
        if (localItems.length === 0) return null;

        set({ isLoading: true });
        try {
          if (cartId) {
            const snapshot = await fetchShopifyCart(cartId);

            if (snapshot.state === 'active' && snapshot.checkoutUrl) {
              set((state) => ({
                checkoutUrl: snapshot.checkoutUrl ?? state.checkoutUrl,
                items: patchItemsWithLineIds(state.items, snapshot.lineIds),
              }));
              return snapshot.checkoutUrl;
            }

            if (snapshot.state === 'empty') {
              clearCart();
              return null;
            }
          }

          const rebuilt = await createShopifyCartMultiLines(buildCartLines(localItems));
          if (!rebuilt) return null;

          set((state) => ({
            cartId: rebuilt.cartId,
            checkoutUrl: rebuilt.checkoutUrl,
            items: patchItemsWithLineIds(state.items, rebuilt.lineIds),
          }));

          return rebuilt.checkoutUrl;
        } catch (error) {
          console.error('Failed to recover checkout URL:', error);
          return null;
        } finally {
          set({ isLoading: false });
        }
      },

      syncCart: async () => {
        const { cartId, isSyncing, clearCart } = get();
        if (!cartId || isSyncing) return;

        set({ isSyncing: true });
        try {
          const snapshot = await fetchShopifyCart(cartId);

          if (snapshot.state === 'active') {
            set((state) => ({
              checkoutUrl: snapshot.checkoutUrl ?? state.checkoutUrl,
              items: patchItemsWithLineIds(state.items, snapshot.lineIds),
            }));
            return;
          }

          if (snapshot.state === 'empty') {
            // User likely completed checkout
            clearCart();
            return;
          }

          if (snapshot.state === 'missing') {
            const localItems = get().items;

            if (localItems.length === 0) {
              clearCart();
              return;
            }

            // Hard fallback: auto-rebuild remote cart from local state
            const rebuilt = await createShopifyCartMultiLines(buildCartLines(localItems));

            if (rebuilt) {
              set((state) => ({
                cartId: rebuilt.cartId,
                checkoutUrl: rebuilt.checkoutUrl,
                items: patchItemsWithLineIds(state.items, rebuilt.lineIds),
              }));
            } else {
              // Keep items visible but reset remote refs so checkout can try another fallback
              set((state) => ({
                cartId: null,
                checkoutUrl: null,
                items: state.items.map((item) => ({ ...item, lineId: null })),
              }));
            }
          }
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
