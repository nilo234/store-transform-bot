import { useEffect, useState } from 'react';
import { Eye, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Live-Activity-Counter for PDP — generates realistic numbers based on:
 *  - Time of day (more activity midday, less at night)
 *  - Product handle (so each product has its own stable seed)
 *  - Slight live drift to feel "alive" without being fake-ish
 */
interface LiveActivityCounterProps {
  productHandle?: string;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getViewerCount(handle: string): number {
  const hour = new Date().getHours();
  // Daytime (9-22) → more viewers, night → fewer
  const timeMultiplier = hour >= 9 && hour <= 22 ? 1 : 0.4;
  const seed = handle.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const base = 8 + Math.floor(seededRandom(seed + hour) * 22); // 8–30
  return Math.max(4, Math.round(base * timeMultiplier));
}

function getDissolvedToday(handle: string): number {
  const hour = new Date().getHours();
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const seed = handle.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) + dayOfYear;
  const baseDaily = 1800 + Math.floor(seededRandom(seed) * 1500); // 1800–3300/day
  // Scale by how far through the day we are
  const dayProgress = Math.min(1, (hour + new Date().getMinutes() / 60) / 24);
  return Math.floor(baseDaily * dayProgress);
}

export function LiveActivityCounter({ productHandle = 'default' }: LiveActivityCounterProps) {
  const [viewers, setViewers] = useState(() => getViewerCount(productHandle));
  const [dissolved, setDissolved] = useState(() => getDissolvedToday(productHandle));

  useEffect(() => {
    setViewers(getViewerCount(productHandle));
    setDissolved(getDissolvedToday(productHandle));

    const viewerInterval = setInterval(() => {
      setViewers((v) => {
        const drift = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(4, Math.min(40, v + drift));
      });
    }, 7000);

    const dissolvedInterval = setInterval(() => {
      setDissolved((d) => d + Math.floor(Math.random() * 3) + 1);
    }, 12000);

    return () => {
      clearInterval(viewerInterval);
      clearInterval(dissolvedInterval);
    };
  }, [productHandle]);

  return (
    <div className="flex flex-col sm:flex-row gap-2 text-xs">
      {/* Viewers */}
      <div className="flex items-center gap-2 bg-accent/8 border border-accent/20 rounded-lg px-3 py-2 flex-1">
        <span className="relative flex h-2 w-2 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
        </span>
        <Eye className="h-3.5 w-3.5 text-accent flex-shrink-0" strokeWidth={2} />
        <span className="text-foreground">
          <AnimatePresence mode="wait">
            <motion.strong
              key={viewers}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.25 }}
              className="font-semibold inline-block"
            >
              {viewers}
            </motion.strong>
          </AnimatePresence>
          {' '}people viewing now
        </span>
      </div>

      {/* Dissolved Today */}
      <div className="flex items-center gap-2 bg-primary/5 border border-primary/15 rounded-lg px-3 py-2 flex-1">
        <Sparkles className="h-3.5 w-3.5 text-primary flex-shrink-0" strokeWidth={2} />
        <span className="text-foreground">
          <strong className="font-semibold">{dissolved.toLocaleString('en-US')}</strong>
          {' '}strips dissolved today
        </span>
      </div>
    </div>
  );
}
