import { useState, useEffect } from 'react';
import { X, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnnouncementBarProps {
  message?: string;
  linkText?: string;
  linkHref?: string;
  showCountdown?: boolean;
  endDate?: Date;
}

const DEFAULT_END_DATE = new Date(new Date().setDate(new Date().getDate() + 3));

export function AnnouncementBar({
  message = "NEW YEAR SALE",
  linkText = "SHOP NOW",
  linkHref = "/shop",
  showCountdown = true,
  endDate = DEFAULT_END_DATE,
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!showCountdown) return;

    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24) + Math.floor(difference / (1000 * 60 * 60 * 24)) * 24,
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate, showCountdown]);

  if (!isVisible) return null;

  const formatTime = (num: number) => num.toString().padStart(2, '0');

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
            
            <span className="font-bold">UP TO 29% OFF</span>
            
            {showCountdown && (
              <>
                <span className="text-accent-foreground/70 hidden sm:inline">—</span>
                <div className="hidden sm:flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <div className="flex items-center gap-1 font-mono">
                    <span className="bg-accent-foreground/10 px-1.5 py-0.5 rounded text-xs">
                      {formatTime(timeLeft.hours)}
                    </span>
                    <span>:</span>
                    <span className="bg-accent-foreground/10 px-1.5 py-0.5 rounded text-xs">
                      {formatTime(timeLeft.minutes)}
                    </span>
                    <span>:</span>
                    <span className="bg-accent-foreground/10 px-1.5 py-0.5 rounded text-xs">
                      {formatTime(timeLeft.seconds)}
                    </span>
                  </div>
                </div>
              </>
            )}
            
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
