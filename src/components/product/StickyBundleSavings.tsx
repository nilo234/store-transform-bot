import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';

/**
 * Floating "Save 25% with 3-pack" promo that appears on PDPs after the
 * user scrolls past the hero, then can be dismissed.
 */
export function StickyBundleSavings() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('neuvie_bundle_promo_dismissed') === '1') {
      setDismissed(true);
      return;
    }

    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > 600 && y < document.body.scrollHeight - 1200);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('neuvie_bundle_promo_dismissed', '1');
    } catch {
      /* ignore */
    }
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="fixed z-40 left-1/2 -translate-x-1/2 bottom-32 md:bottom-6 w-[calc(100%-1.5rem)] max-w-md"
        >
          <div className="relative rounded-2xl bg-primary text-primary-foreground shadow-2xl px-4 py-3 pr-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight">Save 25% with a 3-Pack</p>
              <p className="text-xs text-primary-foreground/80 leading-tight">
                Curated bundles starting at $89
              </p>
            </div>
            <Link
              to="/bundles"
              className="inline-flex items-center gap-1 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap"
            >
              Shop <ArrowRight className="w-3 h-3" />
            </Link>
            <button
              onClick={handleDismiss}
              className="absolute top-1.5 right-1.5 p-1 rounded-full hover:bg-primary-foreground/10 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
