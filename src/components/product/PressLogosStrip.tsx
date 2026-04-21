import { motion } from 'framer-motion';

const pressLogos = [
  'VOGUE',
  'FORBES',
  'WELL+GOOD',
  'BYRDIE',
  'WOMEN\'S HEALTH',
];

export function PressLogosStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="border-y border-border/40 py-3 -mx-2"
      aria-label="As featured in"
    >
      <p className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/70 uppercase text-center mb-2">
        As Featured In
      </p>
      <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap">
        {pressLogos.map((logo) => (
          <span
            key={logo}
            className="font-display text-xs md:text-sm tracking-[0.15em] text-foreground/60 hover:text-foreground transition-colors"
          >
            {logo}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
