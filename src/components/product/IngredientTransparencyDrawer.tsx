import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Beaker, Leaf, BadgeCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet';

interface SupplementFact {
  nutrient: string;
  amount: string;
}

interface IngredientTransparencyDrawerProps {
  productTitle: string;
  supplementFacts: SupplementFact[];
}

// "Why we chose it" rationales for known ingredients (clean, science-grounded copy)
const ingredientRationale: Record<string, { why: string; sourceNote?: string }> = {
  // Sleep
  'Melatonin': { why: 'Clinically studied to shorten the time it takes to fall asleep. We use a low, gentle dose to support — not override — your natural rhythm.' },
  'L-Theanine': { why: 'Calming amino acid from green tea. Promotes alpha brain waves linked to relaxed focus, without sedation.' },
  'GABA': { why: 'Your brain\'s primary "off-switch" neurotransmitter. Supports a calm, settled state of mind.' },
  // Energy / B-Vits
  'Vitamin B12': { why: 'Critical for cellular energy production. The methylated form we use absorbs faster than synthetic cyanocobalamin.' },
  'Vitamin B6': { why: 'Cofactor in 100+ reactions, including neurotransmitter synthesis for steady mood and energy.' },
  'Vitamin D3': { why: 'The form your body actually makes from sunlight. Pairs with K2 to direct calcium where it belongs — bones, not arteries.' },
  'Vitamin K2 (MK-7)': { why: 'Long-acting K2 form that works synergistically with D3 for bone & cardiovascular support.' },
  // Hair / Beauty
  'Biotin': { why: 'A foundational B-vitamin for keratin production — the protein that builds hair, skin and nails.' },
  'Collagen Peptides': { why: 'Hydrolyzed for maximum bioavailability. Supports skin elasticity and hair structure from within.' },
  'Folate (Vitamin B9)': { why: 'Active folate (not folic acid) for cellular renewal and healthy hair growth cycles.' },
  'Vitamin E': { why: 'Lipid-soluble antioxidant that protects skin and scalp from oxidative stress.' },
  // Mushroom / Cognitive
  "Lion's Mane Extract": { why: 'Studied for nerve growth factor (NGF) support — linked to focus, memory and mental clarity.' },
  'Cordyceps Extract': { why: 'Adaptogenic mushroom traditionally used for stamina and oxygen utilization.' },
  'Cordyceps Militaris Extract': { why: 'High-cordycepin variety, prized for clean energy and endurance support.' },
  'Maitake Extract': { why: 'Beta-glucan rich mushroom with traditional immune-modulating properties.' },
  'Shiitake Extract': { why: 'Source of bioactive polysaccharides (lentinan) studied for immune support.' },
  // Recovery
  'Curcuma Longa Extract': { why: 'Turmeric\'s active curcumin compounds — traditionally used to support the body\'s normal inflammatory response.' },
  'Phoenix Dactylifera Extract': { why: 'Date extract rich in natural sugars and electrolytes for fast hydration.' },
  'Andrographis Paniculata Extract': { why: 'Adaptogenic herb traditionally used to support liver function and recovery.' },
  'Vitis Vinifera Extract': { why: 'Grape seed proanthocyanidins — powerful antioxidants for cellular protection.' },
  'Phyllanthus Extracts': { why: 'Traditional herb used in Ayurveda to support liver health.' },
  // Gut
  'Bifidobacterium lactis': { why: 'A clinically-studied probiotic strain that survives stomach acid and supports gut barrier health.' },
  'Bacillus Coagulans': { why: 'Spore-forming probiotic — extremely shelf-stable and survives the journey to your gut.' },
  'Polydextrose': { why: 'Soluble prebiotic fiber that feeds your beneficial gut bacteria.' },
  'Protease': { why: 'Enzyme that breaks down protein for easier digestion and reduced bloating.' },
  'Papain': { why: 'Plant enzyme from papaya — supports protein digestion and a comfortable stomach.' },
  'Bromelain': { why: 'Pineapple-derived enzyme that aids digestion and supports a normal inflammatory response.' },
  // Vitality
  'Shilajit Extract': { why: 'Mineral-rich resin from the Himalayas — traditionally used for vitality, stamina and mineral repletion.' },
  'Oyster Peptide': { why: 'Concentrated source of zinc and amino acids supporting hormonal balance.' },
};

function getRationale(nutrient: string): { why: string; sourceNote?: string } {
  // Exact match first, then partial
  if (ingredientRationale[nutrient]) return ingredientRationale[nutrient];
  const key = Object.keys(ingredientRationale).find(k =>
    nutrient.toLowerCase().includes(k.toLowerCase()) ||
    k.toLowerCase().includes(nutrient.toLowerCase())
  );
  if (key) return ingredientRationale[key];
  return {
    why: 'Carefully selected for its role in this formula — third-party tested for purity and potency.',
  };
}

export function IngredientTransparencyDrawer({
  productTitle,
  supplementFacts,
}: IngredientTransparencyDrawerProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!supplementFacts || supplementFacts.length === 0) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between h-auto py-4 px-5 border-primary/30 bg-card hover:bg-primary/5 group"
        >
          <span className="flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Beaker className="h-4 w-4 text-primary" />
            </div>
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">See every ingredient</span>
              <span className="text-xs text-muted-foreground font-normal">
                Dosages · Why we chose each one · Third-party tested
              </span>
            </span>
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors -rotate-90" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto p-0 flex flex-col">
        {/* Sticky header with always-visible close (X) — critical for mobile UX */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 px-6 pt-6 pb-4 bg-background/95 backdrop-blur-sm border-b border-border/60">
          <SheetHeader className="text-left space-y-2 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-primary" />
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-primary">
                Full Transparency
              </span>
            </div>
            <SheetTitle className="font-display text-xl md:text-2xl leading-tight" style={{ letterSpacing: '-0.02em' }}>
              What's actually inside {productTitle}
            </SheetTitle>
            <SheetDescription className="text-sm">
              Every ingredient. Every dosage. And exactly why we chose it.
            </SheetDescription>
          </SheetHeader>
          <SheetClose asChild>
            <button
              type="button"
              aria-label="Close ingredients panel"
              className="flex-shrink-0 -mt-1 -mr-1 h-10 w-10 rounded-full bg-muted hover:bg-muted/70 active:bg-muted/50 flex items-center justify-center text-foreground transition-colors touch-manipulation"
            >
              <X className="h-5 w-5" />
            </button>
          </SheetClose>
        </div>

        <div className="px-6 pb-6 pt-2 flex-1">
        <div className="mt-6 space-y-2">
          {supplementFacts.map((fact, i) => {
            const isOpen = openIndex === i;
            const rationale = getRationale(fact.nutrient);
            return (
              <div
                key={`${fact.nutrient}-${i}`}
                className="rounded-xl border border-border/60 bg-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-muted/40 transition-colors text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Leaf className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-semibold text-foreground truncate">
                      {fact.nutrient}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {fact.amount}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 border-t border-border/40">
                        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-primary mb-1.5">
                          Why we chose it
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {rationale.why}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/15">
          <div className="flex items-start gap-2.5">
            <BadgeCheck className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-foreground mb-1">
                Every batch third-party tested
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tested for potency, purity, and contaminants in independent US labs. No artificial colors, no fillers, no proprietary blends.
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
