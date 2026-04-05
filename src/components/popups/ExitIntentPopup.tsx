import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, ArrowRight, Copy } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [hasShown, setHasShown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();

  // Only fire on homepage, shop, and product pages
  const allowedPaths = ['/', '/shop', '/bundles'];
  const isAllowedPage = allowedPaths.includes(location.pathname) || location.pathname.startsWith('/product/');

  useEffect(() => {
    if (!isAllowedPage) return;

    const popupShown = sessionStorage.getItem('neuvie_exit_popup_shown');
    if (popupShown) {
      setHasShown(true);
      return;
    }

    const triggerPopup = () => {
      if (hasShown) return;
      setIsOpen(true);
      setHasShown(true);
      sessionStorage.setItem('neuvie_exit_popup_shown', 'true');
    };

    // Desktop: mouse leaves top of viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20) triggerPopup();
    };

    // Mobile: trigger after 40s inactivity
    let inactivityTimer: ReturnType<typeof setTimeout>;
    let activityTimer: ReturnType<typeof setTimeout>;
    
    const resetInactivity = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(triggerPopup, 15000);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', resetInactivity);
    window.addEventListener('scroll', resetInactivity);
    
    // Start mobile inactivity timer
    activityTimer = setTimeout(triggerPopup, 15000);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', resetInactivity);
      window.removeEventListener('scroll', resetInactivity);
      clearTimeout(inactivityTimer);
      clearTimeout(activityTimer);
    };
  }, [hasShown, isAllowedPage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('klaviyo-subscribe', {
        body: { email, source: 'exit-intent-popup' },
      });

      if (error) {
        console.error('Klaviyo subscribe error:', error);
        toast.error('Something went wrong. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      // Copy code to clipboard
      try {
        await navigator.clipboard.writeText('SAVE10');
      } catch {}

      setTimeout(() => setIsOpen(false), 2500);
    } catch (err) {
      console.error('Subscribe error:', err);
      toast.error('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!isAllowedPage) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent hideClose className="max-w-[480px] p-0 gap-0 overflow-hidden border-0 rounded-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Get 10% Off Your First Order</DialogTitle>
        </DialogHeader>

        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          aria-label="Close popup"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative">
          {/* Top Banner */}
          <div className="bg-primary text-primary-foreground p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-16 h-16 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center"
            >
              <Gift className="h-8 w-8 text-accent-foreground" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-2xl md:text-3xl mb-2"
            >
              Before you go — a little something for you 💛
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-primary-foreground/80 text-lg"
            >
              Take 10% off your first order — because choosing yourself deserves to be celebrated. Use code <strong className="text-accent">SAVE10</strong>.
            </motion.p>
          </div>

          {/* Form Section */}
          <div className="p-6 bg-background">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <p className="text-center text-muted-foreground text-sm mb-4">
                    Enter your email and we'll send your welcome discount — valid for 24 hours.
                  </p>

                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 text-base"
                  />

                  <Button
                    type="submit"
                    className="w-full h-12 btn-primary text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                    ) : (
                      <>
                        Yes, I'm Worth It
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Maybe next time
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                    className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center"
                  >
                    <Copy className="h-7 w-7 text-green-600" />
                  </motion.div>
                  <h3 className="font-display text-xl mb-2">Code SAVE10 Copied! 🎉</h3>
                  <p className="text-muted-foreground text-sm">
                    Valid for 24 hours. Your wellness journey starts now!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Trust Points */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex justify-center gap-6 text-xs text-muted-foreground">
                <span>✓ 14-Day Guarantee</span>
                <span>✓ Free Shipping $50+</span>
                <span>✓ Made in USA</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
