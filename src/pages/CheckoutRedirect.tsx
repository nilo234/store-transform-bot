import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SHOPIFY_STORE_PERMANENT_DOMAIN } from '@/lib/shopify';
import { useLocation } from 'react-router-dom';

const CheckoutRedirect = () => {
  const location = useLocation();
  const checkoutUrl = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}${location.pathname}${location.search}`;

  useEffect(() => {
    window.location.replace(checkoutUrl);
  }, [checkoutUrl]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center space-y-4">
        <div className="inline-flex items-center justify-center rounded-full bg-secondary p-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
        <h1 className="font-display text-2xl text-foreground">Redirecting to secure checkout…</h1>
        <p className="text-sm text-muted-foreground">If nothing happens, use the button below.</p>
        <Button asChild className="w-full btn-primary">
          <a href={checkoutUrl} rel="noopener noreferrer">Go to Checkout</a>
        </Button>
      </div>
    </main>
  );
};

export default CheckoutRedirect;
