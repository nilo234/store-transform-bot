import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

export function StickyMobileCTA() {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (!isMobile) return null;

  const show = isVisible && !footerVisible;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-3"
        >
          <Link to="/shop" className="block">
            <Button className="w-full h-12 text-base font-semibold rounded-xl gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
              <ShoppingCart className="h-4 w-4" />
              Shop Now — Free Shipping $50+
            </Button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
