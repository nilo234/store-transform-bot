import { motion } from 'framer-motion';
import {
  Sparkles,
  Check,
  X,
  Clock,
  Zap,
  Sun,
  Moon,
  Coffee,
  type LucideIcon,
} from 'lucide-react';

/* =============================================================
   PDP FACT CARDS — Flat Fact-Card visual system
   Reusable, data-driven modules for all 13 product pages.
   Brand: Cream #f7f3ec · Forest #2e4a3c · Terracotta #c8794a
   All colors come from semantic tokens (primary / accent / etc.)
   ============================================================= */

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
};

/* -------------------------------------------------------------
   1. BENEFIT FACT CARD — 3 core outcomes, big numbers
   ------------------------------------------------------------- */
export interface BenefitFact {
  icon: LucideIcon;
  stat: string;      // "+82%" / "12 wk" / "30 sec"
  label: string;     // "Stronger hair"
  sublabel?: string; // "self-reported"
}

interface BenefitFactCardProps {
  eyebrow?: string;
  headline: string;
  facts: [BenefitFact, BenefitFact, BenefitFact];
  footnote?: string;
}

export function BenefitFactCard({
  eyebrow = 'Why people choose it',
  headline,
  facts,
  footnote,
}: BenefitFactCardProps) {
  return (
    <section className="bg-secondary/40 py-12 sm:py-16">
      <div className="container-wide max-w-5xl">
        <motion.div {...fadeUp} className="text-center mb-8 sm:mb-10">
          <p className="text-xs uppercase tracking-[0.18em] text-accent font-medium mb-3">
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground text-balance">
            {headline}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
          {facts.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-background rounded-2xl p-6 sm:p-7 border border-border flex flex-col items-start"
              >
                <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                </span>
                <p className="font-display text-4xl sm:text-5xl font-bold text-primary leading-none mb-2">
                  {f.stat}
                </p>
                <p className="font-semibold text-foreground text-base">{f.label}</p>
                {f.sublabel && (
                  <p className="text-xs text-muted-foreground mt-1">{f.sublabel}</p>
                )}
              </motion.div>
            );
          })}
        </div>

        {footnote && (
          <p className="text-[11px] text-muted-foreground text-center mt-6 max-w-xl mx-auto">
            {footnote}
          </p>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------
   2. INGREDIENT FACT CARD — premium fact-grid (no photos)
   ------------------------------------------------------------- */
export interface IngredientFact {
  name: string;
  dose: string;
  role: string; // 2–4 words: "Hair growth co-factor"
}

interface IngredientFactCardProps {
  headline: string;
  subhead?: string;
  ingredients: IngredientFact[]; // 3–6 items
  badge?: string; // "Clean label" / "Vegan"
}

export function IngredientFactCard({
  headline,
  subhead,
  ingredients,
  badge,
}: IngredientFactCardProps) {
  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="container-wide max-w-5xl">
        <motion.div {...fadeUp} className="mb-8 sm:mb-10 text-center">
          {badge && (
            <span className="inline-block text-[11px] uppercase tracking-[0.18em] bg-accent/10 text-accent px-3 py-1 rounded-full mb-4 font-medium">
              {badge}
            </span>
          )}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground text-balance mb-3">
            {headline}
          </h2>
          {subhead && (
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              {subhead}
            </p>
          )}
        </motion.div>

        <div className="bg-secondary/50 rounded-3xl p-3 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ingredients.map((ing, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-background rounded-2xl p-5 border border-border/60 flex flex-col"
              >
                <p className="text-[10px] uppercase tracking-[0.16em] text-accent font-semibold mb-2">
                  {ing.role}
                </p>
                <p className="font-display text-xl text-foreground font-semibold leading-tight mb-1">
                  {ing.name}
                </p>
                <p className="text-sm text-muted-foreground font-medium">{ing.dose}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------
   3. STRIPS VS PILLS FACT CARD — side-by-side comparison
   ------------------------------------------------------------- */
export interface ComparisonRow {
  label: string;
  strip: string;
  pill: string;
}

interface StripsVsPillsCardProps {
  headline?: string;
  rows?: ComparisonRow[];
}

const DEFAULT_ROWS: ComparisonRow[] = [
  { label: 'How you take it', strip: 'Dissolves on tongue', pill: 'Swallow with water' },
  { label: 'Time to take', strip: '30 seconds', pill: '1–2 minutes' },
  { label: 'Absorption start', strip: 'Begins in mouth', pill: 'Stomach only' },
  { label: 'Travel-friendly', strip: 'Slim sachet, no water', pill: 'Bottle + water needed' },
  { label: 'Sugar / fillers', strip: 'No added sugar', pill: 'Often coated, bulked' },
];

export function StripsVsPillsCard({
  headline = 'Strips vs. pills — at a glance',
  rows = DEFAULT_ROWS,
}: StripsVsPillsCardProps) {
  return (
    <section className="bg-secondary/40 py-12 sm:py-16">
      <div className="container-wide max-w-4xl">
        <motion.h2
          {...fadeUp}
          className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground text-balance text-center mb-8 sm:mb-10"
        >
          {headline}
        </motion.h2>

        <motion.div
          {...fadeUp}
          className="bg-background rounded-3xl border border-border overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-primary text-primary-foreground">
            <div className="p-4 sm:p-5 text-xs sm:text-sm font-semibold" />
            <div className="p-4 sm:p-5 text-center">
              <p className="text-[10px] sm:text-xs uppercase tracking-wider opacity-80">
                NEUVIE
              </p>
              <p className="font-display text-base sm:text-xl font-bold leading-tight">
                Strip
              </p>
            </div>
            <div className="p-4 sm:p-5 text-center border-l border-primary-foreground/15">
              <p className="text-[10px] sm:text-xs uppercase tracking-wider opacity-70">
                Typical
              </p>
              <p className="font-display text-base sm:text-xl leading-tight opacity-80">
                Pills
              </p>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 ${
                i !== rows.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className="p-3 sm:p-5 text-xs sm:text-sm font-medium text-foreground bg-secondary/40 flex items-center">
                {row.label}
              </div>
              <div className="p-3 sm:p-5 flex items-start gap-2">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" strokeWidth={2.25} />
                <span className="text-xs sm:text-sm text-foreground font-medium">
                  {row.strip}
                </span>
              </div>
              <div className="p-3 sm:p-5 flex items-start gap-2 border-l border-border">
                <X className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" strokeWidth={2} />
                <span className="text-xs sm:text-sm text-muted-foreground">{row.pill}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------
   4. ROUTINE / EXPECTED RESULTS — visual timeline
   ------------------------------------------------------------- */
export interface RoutineStep {
  when: string;        // "Day 1" / "Week 4" / "Morning"
  title: string;       // "Place on tongue"
  description: string; // short copy
  icon?: LucideIcon;
}

interface RoutineFactCardProps {
  eyebrow?: string;
  headline: string;
  steps: RoutineStep[]; // 3–4 items
  mode?: 'daily' | 'timeline'; // daily = ritual (sun/moon), timeline = weeks
}

export function RoutineFactCard({
  eyebrow,
  headline,
  steps,
  mode = 'timeline',
}: RoutineFactCardProps) {
  const fallbackIcons = mode === 'daily'
    ? [Coffee, Sun, Moon, Sparkles]
    : [Zap, Sparkles, Sun, Clock];

  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="container-wide max-w-5xl">
        <motion.div {...fadeUp} className="text-center mb-10">
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.18em] text-accent font-medium mb-3">
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground text-balance">
            {headline}
          </h2>
        </motion.div>

        <div className="relative">
          {/* connector line — desktop only */}
          <div className="hidden md:block absolute top-7 left-[10%] right-[10%] h-px bg-border" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 relative">
            {steps.map((step, i) => {
              const Icon = step.icon ?? fallbackIcons[i] ?? Sparkles;
              return (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <span className="w-14 h-14 rounded-full bg-background border-2 border-primary flex items-center justify-center mb-4 relative z-10">
                    <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
                  </span>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-accent font-semibold mb-1.5">
                    {step.when}
                  </p>
                  <p className="font-display text-lg font-bold text-foreground leading-tight mb-1.5">
                    {step.title}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-snug">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
