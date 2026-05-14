import { useEffect, useState } from 'react';
import { Gift, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const STORAGE_KEY = 'neuvie_first_order_seen';

/**
 * First-order discount banner shown to NEW visitors only (cookie-gated).
 * Sits directly above/near Add to Cart on PDP.
 * Code: WELCOME10 (10% off, once per customer, configured in Shopify).
 */
export function FirstOrderDiscountBanner() {
  const [isReturning, setIsReturning] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    setIsReturning(!!seen);
    if (!seen) {
      localStorage.setItem(STORAGE_KEY, '1');
    }
  }, []);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText('WELCOME10');
      setCopied(true);
      toast.success('Code WELCOME10 copied!', { position: 'top-center' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy. Code is WELCOME10.', { position: 'top-center' });
    }
  };

  // Show to everyone for 30 days; we just track that we've seen them.
  // The banner stays useful for returning visitors who haven't bought yet.
  if (isReturning) return null;

  return (
    <div className="rounded-xl border border-accent/30 bg-accent/10 p-3 flex items-center gap-3">
      <div className="h-9 w-9 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
        <Gift className="h-4 w-4 text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground leading-tight">
          New here? Take 10% off your first order
        </p>
        <p className="text-xs text-muted-foreground">
          Use code at checkout — applied automatically to first orders.
        </p>
      </div>
      <button
        onClick={copyCode}
        className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-bold hover:bg-accent/90 transition-colors"
        aria-label="Copy discount code WELCOME10"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        WELCOME10
      </button>
    </div>
  );
}
