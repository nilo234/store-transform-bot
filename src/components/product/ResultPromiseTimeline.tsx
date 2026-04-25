import { motion } from 'framer-motion';
import { Shield, Sparkles } from 'lucide-react';

interface ResultPromiseTimelineProps {
  /** e.g. "visibly healthier hair", "deeper sleep", "calmer focus" */
  outcome?: string;
  weeks?: { week: string; label: string }[];
}

const defaultWeeks = [
  { week: 'Week 1–2', label: 'Your ritual locks in. Easier than coffee.' },
  { week: 'Week 3–4', label: 'Subtle shifts — mood, energy, consistency.' },
  { week: 'Week 5–6', label: 'Visible, lasting results you can feel & see.' },
];

export function ResultPromiseTimeline({
  outcome = 'visible results',
  weeks = defaultWeeks,
}: ResultPromiseTimelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5 p-5 md:p-6"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-1">
            Our promise
          </p>
          <h3 className="font-display text-lg md:text-xl text-foreground leading-tight" style={{ letterSpacing: '-0.01em' }}>
            {outcome} in 6 weeks — or your money back.
          </h3>
        </div>
      </div>

      <ol className="relative space-y-3 pl-1">
        {weeks.map((w, i) => (
          <li key={w.week} className="flex gap-3 items-start">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">
                {i + 1}
              </div>
              {i < weeks.length - 1 && (
                <div className="w-0.5 h-6 bg-primary/20 mt-1" aria-hidden />
              )}
            </div>
            <div className="pb-1">
              <p className="text-xs font-semibold text-foreground">{w.week}</p>
              <p className="text-sm text-muted-foreground leading-snug">{w.label}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/40">
        <Shield className="h-4 w-4 text-primary flex-shrink-0" />
        <p className="text-xs text-muted-foreground">
          Don't feel a difference? Email us within 14 days for a full refund — no questions.
        </p>
      </div>
    </motion.div>
  );
}
