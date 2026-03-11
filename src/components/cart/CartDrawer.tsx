import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { sanitizeTitle } from '@/lib/shopify';
import { Minus, Plus, Trash2, ExternalLink, Loader2, ShoppingCart, RefreshCw, Gift, X, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useCartStore, CartItem } from '@/stores/cartStore';
import { Badge } from '@/components/ui/badge';
import { FreeShippingBar } from './FreeShippingBar';
import { CartUrgencyBanner } from './CartUrgencyBanner';
import { SecureCheckoutBadges } from './SecureCheckoutBadges';
import { CartUpsell } from './CartUpsell';
import { bundles as bundleDefinitions } from '@/data/bundles';

// Group items into bundles and standalone items
function useGroupedItems(items: CartItem[]) {
  return useMemo(() => {
    const bundles = new Map<string, { name: string; discountCode: string; items: CartItem[] }>();
    const standalone: CartItem[] = [];

    for (const item of items) {
      if (item.bundleId) {
        if (!bundles.has(item.bundleId)) {
          bundles.set(item.bundleId, {
            name: item.bundleName || 'Bundle',
            discountCode: item.bundleDiscountCode || '',
            items: [],
          });
        }
        bundles.get(item.bundleId)!.items.push(item);
      } else {
        standalone.push(item);
      }
    }

    return { bundles: Array.from(bundles.entries()), standalone };
  }, [items]);
}

export function CartDrawer() {
  const {
    items,
    isOpen,
    isLoading,
    isSyncing,
    setOpen,
    updateQuantity,
    removeItem,
    removeBundle,
    getCheckoutUrl,
    syncCart,
    totalItems,
    totalPrice,
  } = useCartStore();

  const { bundles, standalone } = useGroupedItems(items);

  // Sync cart with Shopify when drawer opens
  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();

    if (!checkoutUrl) {
      toast.error('Checkout currently unavailable', {
        description: 'Please add your product again and retry checkout.',
      });
      return;
    }

    const normalizedCheckoutUrl = (() => {
      try {
        const url = new URL(checkoutUrl);
        // Always force the permanent Shopify domain to avoid custom-domain 404s
        const { SHOPIFY_STORE_PERMANENT_DOMAIN } = await import('@/lib/shopify');
        url.hostname = SHOPIFY_STORE_PERMANENT_DOMAIN;
        url.searchParams.set('channel', 'online_store');
        return url.toString();
      } catch {
        return checkoutUrl;
      }
    })();

    const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;

    if (isMobileViewport) {
      window.location.assign(normalizedCheckoutUrl);
      setOpen(false);
      return;
    }

    const win = window.open(normalizedCheckoutUrl, '_blank', 'noopener,noreferrer');
    if (!win) {
      window.location.assign(normalizedCheckoutUrl);
    }
    setOpen(false);
  };

  const cartTotal = totalPrice();

  // Calculate bundle savings from actual bundle data
  const bundleSavings = bundles.reduce((sum, [, bundle]) => {
    const itemsTotal = bundle.items.reduce((s, item) => s + parseFloat(item.price.amount) * item.quantity, 0);
    // Find matching bundle definition for savings info
    const bundleDef = bundleDefinitions.find(b => b.name === bundle.name);
    if (bundleDef) {
      return sum + bundleDef.savings;
    }
    return sum;
  }, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full p-0">
        <SheetHeader className="px-4 md:px-6 py-3 md:py-4 border-b flex flex-row items-center justify-between">
          <div>
            <SheetTitle className="font-body text-lg md:text-xl font-semibold">
              Cart ({totalItems()})
            </SheetTitle>
            <SheetDescription className="sr-only">
              Your shopping cart items
            </SheetDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </SheetHeader>

        <div className="flex flex-col flex-1 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center px-4 md:px-6">
                <ShoppingCart className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground mx-auto mb-3 md:mb-4" />
                <p className="text-base md:text-lg font-medium text-foreground mb-2">Your cart is waiting for you</p>
                <p className="text-sm text-muted-foreground mb-5 md:mb-6">You deserve something good today. Let's find it.</p>
                <Button onClick={() => setOpen(false)} className="btn-primary h-11 md:h-12">
                  Explore Strips
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Urgency Banner */}
              <div className="px-4 md:px-6 pt-3 md:pt-4">
                <CartUrgencyBanner />
              </div>

              {/* Free Shipping Progress */}
              <div className="px-4 md:px-6 pt-3 md:pt-4">
                <FreeShippingBar currentTotal={cartTotal} threshold={50} currencySymbol="$" />
              </div>

              {/* Scrollable items area */}
              <div className="flex-1 overflow-y-auto px-4 md:px-6 py-3 md:py-4">
                <div className="space-y-3 md:space-y-4">
                  {/* Bundle Groups */}
                  {bundles.map(([bundleId, bundle]) => {
                    const bundleDef = bundleDefinitions.find(b => b.name === bundle.name);
                    const bundleItemsTotal = bundle.items.reduce((s, item) => s + parseFloat(item.price.amount) * item.quantity, 0);
                    
                    return (
                    <div key={bundleId} className="bg-primary/5 rounded-xl border border-primary/20 overflow-hidden">
                      {/* Bundle Header */}
                      <div className="flex items-center justify-between px-3 md:px-4 py-2.5 bg-primary/10">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-primary" />
                          <span className="text-xs md:text-sm font-bold text-foreground">{bundle.name}</span>
                          <Badge variant="secondary" className="bg-accent/20 text-accent text-[10px] border-0">
                            {bundle.items.length}-Pack
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          onClick={() => removeBundle(bundleId)}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      {/* Bundle Pricing Summary */}
                      {bundleDef && (
                        <div className="px-3 md:px-4 py-2 bg-accent/5 flex items-center justify-between">
                          <span className="text-[10px] md:text-xs text-muted-foreground">
                            Bundle total: <span className="line-through">${bundleItemsTotal.toFixed(2)}</span>
                          </span>
                          <span className="text-xs md:text-sm font-bold text-primary">
                            ${bundleDef.salePrice.toFixed(2)} <span className="text-[10px] font-normal text-accent">(-{bundleDef.discountPercent}%)</span>
                          </span>
                        </div>
                      )}
                      {/* Discount Code Applied */}
                      {bundle.discountCode && (
                        <div className="px-3 md:px-4 py-1.5 bg-accent/10 text-center">
                          <span className="text-[10px] md:text-xs font-medium text-accent">
                            ✅ Discount code "{bundle.discountCode}" auto-applied at checkout
                          </span>
                        </div>
                      )}
                      {/* Bundle Items */}
                      <div className="divide-y divide-border/30">
                        {bundle.items.map((item) => (
                          <CartItemRow key={item.variantId} item={item} isLoading={isLoading} updateQuantity={updateQuantity} removeItem={removeItem} compact />
                        ))}
                      </div>
                    </div>
                    );
                  })}

                  {/* Standalone Items */}
                  {standalone.map((item) => (
                    <CartItemRow key={item.variantId} item={item} isLoading={isLoading} updateQuantity={updateQuantity} removeItem={removeItem} />
                  ))}
                </div>

                {/* Gift Message */}
                <div className="mt-3 md:mt-4 p-2.5 md:p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="flex items-center gap-2">
                    <Gift className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent flex-shrink-0" />
                    <span className="text-xs md:text-sm font-medium text-foreground">
                      FREE wellness guide included!
                    </span>
                  </div>
                </div>

                {/* Customers Also Bought Upsell */}
                <CartUpsell />
              </div>

              {/* Fixed checkout section */}
              <div className="flex-shrink-0 px-4 md:px-6 py-4 md:py-6 pb-[calc(1rem+env(safe-area-inset-bottom))] md:pb-6 border-t bg-background space-y-3 md:space-y-4 relative z-50">
                {/* Savings Highlight */}
                {bundleSavings > 0 && (
                  <div className="bg-primary/10 rounded-lg p-2.5 md:p-3 text-center">
                    <span className="text-xs md:text-sm font-semibold text-primary">
                      🎉 Bundle discount saves you ${bundleSavings.toFixed(2)}!
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-base md:text-lg font-medium">Subtotal</span>
                    {bundleSavings > 0 && (
                      <p className="text-[10px] md:text-xs text-muted-foreground">Bundle discount applied at checkout</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-xl md:text-2xl font-bold text-primary">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full btn-primary text-sm md:text-base h-12 md:h-14 touch-manipulation active:scale-[0.98] transition-transform select-none"
                  size="lg"
                  disabled={items.length === 0 || isLoading || isSyncing}
                  type="button"
                >
                  {isLoading || isSyncing ? (
                    <>
                      <Loader2 className="w-4 h-4 md:w-5 md:h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Secure Checkout
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                {/* Secure Checkout Badges */}
                <SecureCheckoutBadges />
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Extracted cart item row component
function CartItemRow({
  item,
  isLoading,
  updateQuantity,
  removeItem,
  compact = false,
}: {
  item: CartItem;
  isLoading: boolean;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  compact?: boolean;
}) {
  return (
    <div className={`flex gap-3 md:gap-4 ${compact ? 'px-3 md:px-4 py-2.5' : 'p-3 md:p-4 bg-card rounded-lg md:rounded-xl border border-border/50'}`}>
      <div className={`${compact ? 'w-12 h-12 md:w-14 md:h-14' : 'w-16 h-16 md:w-20 md:h-20'} bg-muted rounded-lg overflow-hidden flex-shrink-0`}>
        {item.product.node.images?.edges?.[0]?.node && (
          <img
            src={item.product.node.images.edges[0].node.url}
            alt={item.product.node.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className={`font-medium ${compact ? 'text-[11px] md:text-xs' : 'text-xs md:text-sm'} truncate`}>{sanitizeTitle(item.product.node.title)}</h4>
        {item.variantTitle !== 'Default Title' && (
          <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">{item.variantTitle}</p>
        )}
        {item.isSubscription && (
          <Badge variant="secondary" className="mt-1 bg-accent/10 text-accent border-accent/20 gap-1 text-[10px] py-0.5">
            <RefreshCw className="h-2.5 w-2.5" />
            {item.subscriptionFrequency === 'monthly' ? 'Monthly' :
             item.subscriptionFrequency === 'bimonthly' ? '2 Mo' : '3 Mo'}
            {item.subscriptionDiscount && ` -${item.subscriptionDiscount}%`}
          </Badge>
        )}
        <div className="flex items-center gap-1.5 mt-1">
          <span className={`font-semibold ${compact ? 'text-xs' : 'text-sm md:text-base'} text-primary`}>
            ${parseFloat(item.price.amount).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        {!compact && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={() => removeItem(item.variantId)}
            disabled={isLoading}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        )}

        <div className="flex items-center gap-0.5 bg-muted rounded-lg">
          <Button variant="ghost" size="icon" className="h-6 w-6 md:h-7 md:w-7" onClick={() => updateQuantity(item.variantId, item.quantity - 1)} disabled={isLoading}>
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-6 text-center text-xs font-medium">{item.quantity}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6 md:h-7 md:w-7" onClick={() => updateQuantity(item.variantId, item.quantity + 1)} disabled={isLoading}>
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
