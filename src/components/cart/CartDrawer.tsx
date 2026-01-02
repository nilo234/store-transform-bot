import { Minus, Plus, Trash2, ExternalLink, Loader2, ShoppingCart, RefreshCw, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCartStore } from '@/stores/cartStore';
import { Badge } from '@/components/ui/badge';
import { FreeShippingBar } from './FreeShippingBar';
import { CartUrgencyBanner } from './CartUrgencyBanner';
import { SecureCheckoutBadges } from './SecureCheckoutBadges';
import { CartUpsell } from './CartUpsell';

export function CartDrawer() {
  const { 
    items, 
    isOpen,
    isLoading, 
    setOpen,
    updateQuantity, 
    removeItem, 
    createCheckout,
    totalItems,
    totalPrice,
  } = useCartStore();

  const handleCheckout = async () => {
    try {
      const checkoutUrl = await createCheckout();
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
        setOpen(false);
      }
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  const cartTotal = totalPrice();
  const originalTotal = cartTotal * 1.42; // Show savings
  const totalSavings = originalTotal - cartTotal;

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="font-display text-xl">
            Shopping Cart ({totalItems()})
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center px-6">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">Your cart is empty</p>
                <p className="text-muted-foreground mb-6">Add some products to get started!</p>
                <Button onClick={() => setOpen(false)} className="btn-primary">
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Urgency Banner */}
              <div className="px-6 pt-4">
                <CartUrgencyBanner />
              </div>

              {/* Free Shipping Progress */}
              <div className="px-6 pt-4">
                <FreeShippingBar currentTotal={cartTotal} threshold={50} currencySymbol="$" />
              </div>

              {/* Scrollable items area */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-4 bg-card rounded-xl border border-border/50">
                      <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.product.node.title}</h4>
                        {item.variantTitle !== 'Default Title' && (
                          <p className="text-xs text-muted-foreground mt-1">{item.variantTitle}</p>
                        )}
                        {item.isSubscription && (
                          <Badge variant="secondary" className="mt-1.5 bg-accent/10 text-accent border-accent/20 gap-1">
                            <RefreshCw className="h-3 w-3" />
                            {item.subscriptionFrequency === 'monthly' ? 'Monthly' : 
                             item.subscriptionFrequency === 'bimonthly' ? 'Every 2 Mo' : 'Every 3 Mo'}
                            {item.subscriptionDiscount && ` (-${item.subscriptionDiscount}%)`}
                          </Badge>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-semibold text-primary">
                            ${parseFloat(item.price.amount).toFixed(2)}
                          </span>
                          <span className="text-xs text-muted-foreground line-through">
                            ${(parseFloat(item.price.amount) * 1.42).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.variantId)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        
                        <div className="flex items-center gap-1 bg-muted rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gift Message */}
                <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">
                      FREE wellness guide included with every order!
                    </span>
                  </div>
                </div>

                {/* Customers Also Bought Upsell */}
                <CartUpsell />
              </div>
              
              {/* Fixed checkout section */}
              <div className="flex-shrink-0 px-6 py-6 border-t bg-background space-y-4">
                {/* Savings Highlight */}
                {totalSavings > 0 && (
                  <div className="bg-primary/10 rounded-lg p-3 text-center">
                    <span className="text-sm font-semibold text-primary">
                      🎉 You're saving ${totalSavings.toFixed(2)} on this order!
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-medium">Subtotal</span>
                    <p className="text-xs text-muted-foreground">Shipping calculated at checkout</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">
                      ${cartTotal.toFixed(2)}
                    </span>
                    <p className="text-sm text-muted-foreground line-through">
                      ${originalTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full btn-primary text-base h-14" 
                  size="lg"
                  disabled={items.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Creating Checkout...
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
