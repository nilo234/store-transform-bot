import { useState } from 'react';
import { X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnnouncementBarProps {
  message?: string;
  linkText?: string;
  linkHref?: string;
}

// TODO: activate WELCOME15 in Shopify Admin
export function AnnouncementBar({
  message = "First order? Use code WELCOME15 for 15% off — today only.",
  linkText = "Shop Routines",
  linkHref = "/bundles",
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-accent text-accent-foreground relative z-50"
      >
        <div className="container-wide py-2.5">
            {/* Desktop */}
            <div className="hidden sm:flex items-center justify-center gap-4 text-sm font-medium">
              <span>{message}</span>
              <span className="text-accent-foreground/70">·</span>
              <span className="font-bold">30-Day Money-Back Guarantee</span>
              <a 
                href={linkHref}
                className="ml-2 underline underline-offset-2 hover:no-underline font-semibold"
              >
                {linkText} →
              </a>
            </div>
            {/* Mobile */}
            <div className="sm:hidden flex items-center justify-center gap-3 text-xs font-medium">
              <span className="font-bold">Code WELCOME15 — 15% off</span>
              <span className="text-accent-foreground/70">·</span>
              <a 
                href={linkHref}
                className="font-bold underline underline-offset-2"
              >
                {linkText} →
              </a>
            </div>
        </div>
        
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-accent-foreground/10 rounded-full transition-colors"
          aria-label="Close announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
