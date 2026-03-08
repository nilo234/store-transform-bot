import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnnouncementBarProps {
  message?: string;
  linkText?: string;
  linkHref?: string;
}

export function AnnouncementBar({
  message = "Your body deserves the best — free US shipping on $50+",
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
          <div className="flex items-center justify-center gap-4 text-sm font-medium">
            <span className="hidden sm:inline">{message}</span>
            <span className="sm:hidden text-xs">{message}</span>
            
            <span className="text-accent-foreground/70">—</span>
            
            <span className="font-bold">Subscribe & save 20% — because consistency matters</span>
            
            <a 
              href={linkHref}
              className="ml-2 underline underline-offset-2 hover:no-underline font-semibold"
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
