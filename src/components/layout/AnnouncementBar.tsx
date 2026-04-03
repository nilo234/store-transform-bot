import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnnouncementBarProps {
  message?: string;
  linkText?: string;
  linkHref?: string;
}

export function AnnouncementBar({
  message = "⚡ Limited Time — Save 20% When You Subscribe Today",
  linkText = "Start your ritual",
  linkHref = "/shop",
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
              <span className="text-accent-foreground/70">—</span>
              <span className="font-bold">Subscribe & save 20%</span>
              <Link 
                to={linkHref}
                className="ml-2 underline underline-offset-2 hover:no-underline font-semibold"
              >
                {linkText} →
              </Link>
            </div>
            {/* Mobile */}
            <div className="sm:hidden flex items-center justify-center gap-3 text-xs font-medium">
              <span>Free shipping $50+</span>
              <span className="text-accent-foreground/70">·</span>
              <Link 
                to={linkHref}
                className="font-bold underline underline-offset-2"
              >
                Start your ritual →
              </Link>
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
