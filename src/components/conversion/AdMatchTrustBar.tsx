import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Truck, Star, Sparkles, X } from 'lucide-react';
import { detectAdTraffic, getSourceLabel } from '@/lib/adTraffic';

const DISMISS_KEY = 'neuvie_admatch_dismissed';

/**
 * Ad-Continuity Trust Bar.
 * Shown directly under the Navbar when a user arrives from a paid social ad.
 * Mirrors ad-promise messaging ("Seen on TikTok/Instagram") + key trust signals
 * to reduce bounce rate from cold paid traffic.
 */
export function AdMatchTrustBar() {
  const [show, setShow] = useState(false);
  const [sourceLabel, setSourceLabel] = useState('Social');

  useEffect(() => {
    const info = detectAdTraffic();
    if (!info.isPaidSocial) return;

    try {
      if (sessionStorage.getItem(DISMISS_KEY) === '1') return;
    } catch { /* ignore */ }

    setSourceLabel(getSourceLabel(info.source));
    setShow(true);
  }, []);

  const handleDismiss = () => {
    try { sessionStorage.setItem(DISMISS_KEY, '1'); } catch { /* ignore */ }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="overflow-hidden bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b border-primary/20"
          role="region"
          aria-label="Welcome from social"
        >
          <div className="container-wide py-2 md:py-2.5">
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary whitespace-nowrap">
                  As seen on {sourceLabel}
                </span>
              </div>

              <div className="flex-1 min-w-0 flex items-center gap-3 md:gap-5 overflow-x-auto scrollbar-none">
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                  <span className="text-[11px] md:text-xs font-medium text-foreground whitespace-nowrap">
                    Loved by early customers
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Truck className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[11px] md:text-xs font-medium text-foreground whitespace-nowrap">
                    Free US shipping $50+
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[11px] md:text-xs font-medium text-foreground whitespace-nowrap">
                    30-day money-back
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss banner"
                className="flex-shrink-0 h-7 w-7 rounded-full hover:bg-foreground/5 flex items-center justify-center transition-colors"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
