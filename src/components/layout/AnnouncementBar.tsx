import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const messages = [
  {
    emoji: '🎉',
    text: (
      <>
        <span className="font-bold">WELCOME15</span> — Save 15% on your first order
      </>
    ),
  },
  {
    emoji: '🚚',
    text: <>Free Shipping on all orders over $50</>,
  },
  {
    emoji: '💚',
    text: <>30-Day Money-Back Guarantee — No questions asked</>,
  },
];

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  if (!isVisible) return null;

  const current = messages[index];

  return (
    <div className="bg-primary text-primary-foreground relative z-50">
      <div className="container-wide py-2 px-10 sm:px-12">
        <div className="flex items-center justify-center min-h-[24px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2 text-[12px] sm:text-sm font-body tracking-wide"
            >
              <span className="text-base sm:text-lg flex-shrink-0" aria-hidden="true">{current.emoji}</span>
              <span className="text-center">{current.text}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-primary-foreground/10 rounded-full transition-colors"
        aria-label="Close announcement"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
