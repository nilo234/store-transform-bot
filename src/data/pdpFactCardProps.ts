/**
 * PDP Fact-Card props for the 12 remaining products.
 * Cluster-templated, but every prop is product-specific and grounded
 * in real on-page facts from src/data/productContent.ts.
 *
 * NO invented stats. Where no clinical % exists on a PDP, the BenefitFactCard
 * uses concrete dose / format / time facts that already appear on that PDP.
 *
 * Reference implementation already shipped: hair-skin-and-nails (HairSkinNailsPDP.tsx).
 */
import {
  Sparkles, Shield, Heart, Zap, Brain, Target, Sun, Moon, Coffee,
  Clock, Leaf, Droplets, Activity, Flame, Apple, Wind, FlaskConical,
  Pill, type LucideIcon,
} from 'lucide-react';
import type {
  BenefitFact, IngredientFact, RoutineStep, ComparisonRow,
} from '@/components/product/PDPFactCards';

export type Cluster = 'beauty' | 'energy-focus' | 'sleep-calm' | 'gut-immunity';

/**
 * Structured anchor for safe duplicate removal.
 * - 'heading'    → exact <h1|h2|h3> text match
 * - 'copy'       → exact literal copy string
 * - 'component'  → exact component name rendered in the PDP
 * - 'prop'       → exact prop key/value passed to a section component
 * - 'comment'    → exact JSX comment marker
 * - 'todo'       → no exact anchor found in current codebase; leave in place
 */
export type RemoveAnchor =
  | { type: 'heading'; value: string }
  | { type: 'copy'; value: string }
  | { type: 'component'; value: string }
  | { type: 'prop'; value: string }
  | { type: 'comment'; value: string }
  | { type: 'todo'; value: string; reason?: string };

export interface PDPFactCardSet {
  handle: string;
  cluster: Cluster;
  BenefitFactCard: {
    eyebrow: string;
    headline: string;
    facts: [BenefitFact, BenefitFact, BenefitFact];
    footnote?: string;
  };
  IngredientFactCard: {
    headline: string;
    subhead?: string;
    badge?: string;
    ingredients: IngredientFact[];
  };
  StripsVsPillsCard: {
    headline?: string;
    rows?: ComparisonRow[]; // omit → use DEFAULT_ROWS
  };
  RoutineFactCard: {
    eyebrow?: string;
    headline: string;
    mode: 'daily' | 'timeline';
    steps: RoutineStep[];
  };
  removeSections: RemoveAnchor[]; // structured anchors for safe removal
  validation: string[];           // manual review notes
}

/**
 * Safe removal predicate. Returns true ONLY for exact-match anchors that
 * the engineer has wired up in the rendering component. 'todo' is always false.
 * Use in JSX: {!shouldRemove(fx, 'heading', '10 Billion good bacteria + prebiotic fiber') && (...)}
 */
export function shouldRemove(
  fx: PDPFactCardSet | undefined,
  type: RemoveAnchor['type'],
  value: string,
): boolean {
  if (!fx || type === 'todo') return false;
  return fx.removeSections.some(a => a.type === type && a.value === value);
}


export const pdpFactCardProps: Record<string, PDPFactCardSet> = {
  /* ============ BEAUTY CLUSTER ============ */
  'beauty-collagen-strips': {
    handle: 'beauty-collagen-strips',
    cluster: 'beauty',
    BenefitFactCard: {
      eyebrow: 'Why people choose it',
      headline: 'Three building blocks for glow, in one 30-second strip',
      facts: [
        { icon: Sparkles, stat: '100 mg', label: 'Collagen peptides', sublabel: 'per strip' },
        { icon: Shield, stat: '6 mg', label: 'Vitamin E', sublabel: 'antioxidant support' },
        { icon: Clock, stat: '3 sec', label: 'Dissolves on tongue', sublabel: 'no powder, no pills' },
      ],
      footnote: 'Doses per single strip. Use daily for best results. Individual results vary.',
    },
    IngredientFactCard: {
      badge: 'Clean label',
      headline: 'Two beauty actives, clean carrier',
      subhead: 'Mango-flavored strip, no added sugar.',
      ingredients: [
        { role: 'Skin elasticity', name: 'Collagen Peptides', dose: '100 mg' },
        { role: 'Antioxidant', name: 'Vitamin E', dose: '6 mg' },
      ],
    },
    StripsVsPillsCard: { headline: 'Strips vs. collagen powders — at a glance' },
    RoutineFactCard: {
      eyebrow: 'What consistent use looks like',
      headline: 'A 12-week glow ritual',
      mode: 'timeline',
      steps: [
        { when: 'Day 1', title: 'Start the ritual', description: 'Place one strip on your tongue, 3 seconds.', icon: Sparkles },
        { when: 'Week 4', title: 'Build the habit', description: 'Daily use keeps collagen + E topped up.', icon: Heart },
        { when: 'Week 8', title: 'Skin support stacks', description: 'Antioxidant + collagen working with your routine.', icon: Shield },
        { when: 'Week 12', title: 'Stay consistent', description: 'For visible support, NEUVIE recommends daily use.', icon: Sun },
      ],
    },
    removeSections: [
      { type: 'todo', value: 'Inline collagen mg callout', reason: 'No matching inline block in StripPDPTemplate.' },
      { type: 'todo', value: 'Duplicate Vitamin E pill', reason: 'No matching inline block in StripPDPTemplate.' },
    ],
    validation: ['No clinical % on source PDP — Benefit card uses doses only.'],
  },

  /* ============ ENERGY / FOCUS CLUSTER ============ */
  'energy-strips': {
    handle: 'energy-strips',
    cluster: 'energy-focus',
    BenefitFactCard: {
      eyebrow: "What you'll feel",
      headline: 'Clean lift. No crash. 30-second ritual.',
      facts: [
        { icon: Coffee, stat: '50 mg', label: 'Natural caffeine', sublabel: 'per strip' },
        { icon: Brain, stat: '30 mg', label: 'L-Theanine', sublabel: 'smooth focus' },
        { icon: Zap, stat: '50 mcg', label: 'Vitamin B12', sublabel: 'energy metabolism' },
      ],
      footnote: 'Contains caffeine. Not for children or pregnant/nursing mothers.',
    },
    IngredientFactCard: {
      badge: 'Sugar-free · No crash',
      headline: 'Caffeine + L-Theanine, balanced',
      ingredients: [
        { role: 'Stimulant', name: 'Caffeine', dose: '50 mg' },
        { role: 'Calm focus', name: 'L-Theanine', dose: '30 mg' },
        { role: 'Energy metabolism', name: 'Vitamin B12', dose: '50 mcg' },
      ],
    },
    StripsVsPillsCard: {
      headline: 'Strips vs. coffee vs. pills',
      rows: [
        { label: 'How you take it', strip: 'Dissolves on tongue', pill: 'Brew or swallow' },
        { label: 'Time to take', strip: '30 seconds', pill: '3–10 minutes' },
        { label: 'Onset', strip: 'Begins in mouth', pill: 'Stomach only' },
        { label: 'Travel-friendly', strip: 'Slim sachet, no water', pill: 'Cup or bottle needed' },
        { label: 'Sugar / fillers', strip: 'No added sugar', pill: 'Often sweetened' },
      ],
    },
    RoutineFactCard: {
      eyebrow: 'Daily ritual',
      headline: 'Lift when you need it — without the crash',
      mode: 'daily',
      steps: [
        { when: 'Morning', title: 'First lift', description: 'Skip the third coffee — one strip on the tongue.', icon: Sun },
        { when: 'Midday', title: 'Stay sharp', description: 'L-Theanine smooths focus through deep-work blocks.', icon: Brain },
        { when: 'Afternoon', title: '3 PM slump', description: 'A second strip to push past the wall, no jitters.', icon: Zap },
        { when: 'Cap at 3', title: 'Daily max', description: 'Do not exceed 3 strips per day.', icon: Shield },
      ],
    },
    removeSections: [
      { type: 'todo', value: 'Inline "no jitters" callout block', reason: 'No matching inline block in StripPDPTemplate.' },
      { type: 'todo', value: 'Duplicate caffeine mg badge', reason: 'No matching inline block in StripPDPTemplate.' },
    ],
    validation: ['Caffeine warning preserved.'],
  },

  'mushroom-focus-strips': {
    handle: 'mushroom-focus-strips',
    cluster: 'energy-focus',
    BenefitFactCard: {
      eyebrow: "What you'll feel",
      headline: 'Four functional mushrooms, one chocolate strip',
      facts: [
        { icon: Brain, stat: '50 mg', label: "Lion's Mane", sublabel: 'cognitive support' },
        { icon: Activity, stat: '25 mg', label: 'Cordyceps', sublabel: 'natural energy' },
        { icon: Shield, stat: '45 mg', label: 'Maitake + Shiitake', sublabel: 'immune balance' },
      ],
    },
    IngredientFactCard: {
      badge: 'Organic mushroom extracts',
      headline: 'A clean nootropic mushroom stack',
      ingredients: [
        { role: 'Cognitive', name: "Lion's Mane Extract", dose: '50 mg' },
        { role: 'Energy metabolism', name: 'Cordyceps Extract', dose: '25 mg' },
        { role: 'Immune balance', name: 'Maitake Extract', dose: '25 mg' },
        { role: 'Antioxidant', name: 'Shiitake Extract', dose: '20 mg' },
      ],
    },
    StripsVsPillsCard: { headline: 'Strips vs. mushroom capsules' },
    RoutineFactCard: {
      eyebrow: 'Daily ritual',
      headline: 'Show up sharper, every single day',
      mode: 'daily',
      steps: [
        { when: 'Morning', title: 'Tongue, 3 seconds', description: 'Chocolate-flavored strip with your first deep-work block.', icon: Sun },
        { when: 'Midday', title: 'Stay clear', description: 'No caffeine — clarity from the mushroom stack itself.', icon: Brain },
        { when: 'Daily', title: 'Stack daily', description: 'Mushrooms support best with consistent use.', icon: Sparkles },
        { when: 'Evening', title: 'Wind down', description: 'Caffeine-free — safe later in the day.', icon: Moon },
      ],
    },
    removeSections: [
      { type: 'todo', value: 'Inline mushroom mg pill row duplicating IngredientFactCard', reason: 'No matching inline block in StripPDPTemplate.' },
    ],
    validation: ['No crash claim already in source copy.'],
  },

  'iron-strips': {
    handle: 'iron-strips',
    cluster: 'energy-focus',
    BenefitFactCard: {
      eyebrow: 'Why people choose it',
      headline: 'Gentle iron. No stomach upset. 30 seconds.',
      facts: [
        { icon: Droplets, stat: '19 mg', label: 'Gentle iron', sublabel: 'as Ferric Saccharate' },
        { icon: Leaf, stat: '400 mcg', label: 'Folate (B9)', sublabel: 'cell formation' },
        { icon: Clock, stat: '3 sec', label: 'Dissolves on tongue', sublabel: 'no nausea, no metal taste' },
      ],
      footnote: 'Iron form and dose per strip as listed on Supplement Facts panel.',
    },
    IngredientFactCard: {
      badge: 'Gentle iron · Lactose-free',
      headline: 'Two essentials, no stomach upset',
      ingredients: [
        { role: 'Oxygen transport', name: 'Iron (Ferric Saccharate)', dose: '19 mg' },
        { role: 'Cell division', name: 'Folate (Vitamin B9)', dose: '400 mcg' },
      ],
    },
    StripsVsPillsCard: { headline: 'Strips vs. iron pills' },
    RoutineFactCard: {
      eyebrow: 'What consistent use looks like',
      headline: 'Iron support, one strip a day',
      mode: 'timeline',
      steps: [
        { when: 'Day 1', title: 'Start gently', description: 'Raspberry strip, dissolves in 3 seconds.', icon: Sparkles },
        { when: 'Week 2', title: 'Build the habit', description: 'Daily strip without stomach upset.', icon: Heart },
        { when: 'Week 4', title: 'Stay consistent', description: 'Iron support benefits from steady daily use.', icon: Shield },
        { when: 'Week 8', title: 'Check in', description: 'Re-evaluate with your healthcare provider.', icon: Activity },
      ],
    },
    removeSections: [
      { type: 'todo', value: 'Duplicate "no stomach pain" callout', reason: 'No matching inline block in StripPDPTemplate.' },
    ],
    validation: ['Conservative wording — no anti-anemia claim.'],
  },

  /* ============ SLEEP / CALM CLUSTER ============ */
  'sleep-strips': {
    handle: 'sleep-strips',
    cluster: 'sleep-calm',
    BenefitFactCard: {
      eyebrow: 'Wind-down support',
      headline: 'A 30-second wind-down before bed',
      facts: [
        { icon: Moon, stat: '5 mg', label: 'Melatonin', sublabel: 'fall asleep faster' },
        { icon: Leaf, stat: '10 mg', label: 'Valerian extract', sublabel: 'calming botanical' },
        { icon: Wind, stat: '15 mg', label: 'Lavender + Chamomile + Hibiscus', sublabel: 'relaxation blend' },
      ],
      footnote: 'Non-habit forming. Not for children or pregnant/nursing mothers.',
    },
    IngredientFactCard: {
      badge: 'Non-habit forming',
      headline: 'Melatonin + botanical wind-down',
      ingredients: [
        { role: 'Sleep onset', name: 'Melatonin', dose: '5 mg' },
        { role: 'Calming', name: 'Valerian Extract', dose: '10 mg' },
        { role: 'Relaxation', name: 'Lavender', dose: '5 mg' },
        { role: 'Relaxation', name: 'Chamomile', dose: '5 mg' },
        { role: 'Botanical', name: 'Hibiscus Extract', dose: '5 mg' },
      ],
    },
    StripsVsPillsCard: { headline: 'Strips vs. sleep pills' },
    RoutineFactCard: {
      eyebrow: 'Evening ritual',
      headline: 'A quiet 3-second goodnight',
      mode: 'daily',
      steps: [
        { when: '30 min before bed', title: 'Place on tongue', description: 'Let the strip dissolve as you wind down.', icon: Moon },
        { when: 'Lights out', title: 'Settle in', description: 'Melatonin signals sleep, botanicals soften the edges.', icon: Wind },
        { when: 'Overnight', title: 'Rest deeply', description: 'Non-habit forming — safe to use nightly.', icon: Shield },
        { when: 'Morning', title: 'Wake clearer', description: 'No grogginess hangover from heavy capsules.', icon: Sun },
      ],
    },
    removeSections: [
      { type: 'todo', value: 'Inline melatonin mg callout duplicated by Benefit card', reason: 'No matching inline block in StripPDPTemplate.' },
    ],
    validation: ['Drowsiness/medication disclaimer kept.'],
  },

  'cognitive-relax-strips': {
    handle: 'cognitive-relax-strips',
    cluster: 'sleep-calm',
    BenefitFactCard: {
      eyebrow: 'Calm focus',
      headline: 'Calm. Clear. No drowsiness.',
      facts: [
        { icon: Brain, stat: '50 mg', label: 'L-Theanine', sublabel: 'from green tea' },
        { icon: Heart, stat: '25 mg', label: 'GABA', sublabel: 'stress response support' },
        { icon: Sparkles, stat: '8 mg', label: 'Vitamin B6', sublabel: 'nervous system' },
      ],
    },
    IngredientFactCard: {
      badge: 'Caffeine-free · Melatonin-free',
      headline: 'A daytime calm stack',
      ingredients: [
        { role: 'Calm focus', name: 'L-Theanine', dose: '50 mg' },
        { role: 'Stress response', name: 'GABA', dose: '25 mg' },
        { role: 'Nervous system', name: 'Vitamin B6', dose: '8 mg' },
      ],
    },
    StripsVsPillsCard: { headline: 'Strips vs. nootropic capsules' },
    RoutineFactCard: {
      eyebrow: 'When you reach for it',
      headline: 'A 3-second pause, any time of day',
      mode: 'daily',
      steps: [
        { when: 'Morning', title: 'Settle in', description: 'Calm focus before a busy day.', icon: Sun },
        { when: 'Midday', title: 'Reset', description: 'After a stressful call or context switch.', icon: Brain },
        { when: 'Afternoon', title: 'Stay steady', description: 'Caffeine-free — no jitters added.', icon: Heart },
        { when: 'Evening', title: 'Wind down', description: 'No melatonin — safe before bed without sleep effect.', icon: Moon },
      ],
    },
    removeSections: [
      { type: 'todo', value: 'Duplicate "no drowsiness" callout', reason: 'No matching inline block in StripPDPTemplate.' },
    ],
    validation: ['Compliance safe; no anxiolytic claim.'],
  },

  /* ============ GUT / IMMUNITY / GENERAL WELLNESS CLUSTER ============ */
  'hangover-strips': {
    handle: 'hangover-strips',
    cluster: 'gut-immunity',
    BenefitFactCard: {
      eyebrow: 'Daily support, on your terms',
      headline: 'A 3-second safety net before bed',
      facts: [
        { icon: Flame, stat: '5+', label: 'Botanicals per strip', sublabel: 'DHM-style Ayurvedic blend' },
        { icon: Droplets, stat: '0 water', label: 'No water needed', sublabel: 'take it half-asleep' },
        { icon: Clock, stat: '3 sec', label: 'Dissolves on tongue', sublabel: 'pre-bed ritual' },
      ],
      footnote: 'Supports normal recovery processes. Drink responsibly.',
    },
    IngredientFactCard: {
      badge: 'Sugar-free · Vegan',
      headline: 'Ayurvedic-inspired recovery blend',
      ingredients: [
        { role: 'Liver support', name: 'Curcuma Longa Extract', dose: 'Proprietary' },
        { role: 'Recovery', name: 'Date Extract', dose: 'Proprietary' },
        { role: 'Antioxidant', name: 'Grape Seed Extract', dose: 'Proprietary' },
        { role: 'Liver support', name: 'Andrographis', dose: 'Proprietary' },
        { role: 'Liver support', name: 'Phyllanthus', dose: 'Proprietary' },
      ],
    },
    StripsVsPillsCard: { headline: 'Strips vs. pre-drink pills' },
    RoutineFactCard: {
      eyebrow: 'How to use',
      headline: 'Take it the smart way',
      mode: 'daily',
      steps: [
        { when: 'Before bed', title: 'One strip on tongue', description: 'No water needed — even half-asleep.', icon: Moon },
        { when: 'Overnight', title: 'Body recovers', description: 'Botanicals support natural recovery processes.', icon: Shield },
        { when: 'Morning', title: 'Wake easier', description: 'Skip the dusty pill bottle hunt.', icon: Sun },
        { when: 'As needed', title: 'Keep one in your bag', description: 'Slim sachet, travel-friendly.', icon: Sparkles },
      ],
    },
    removeSections: [
      { type: 'todo', value: 'Duplicate ingredient pill grid', reason: 'No matching inline block in StripPDPTemplate.' },
    ],
    validation: ['Doses are proprietary blend on source PDP — kept as "Proprietary" instead of inventing mg.'],
  },

  'bone-support-strips': {
    handle: 'bone-support-strips',
    cluster: 'gut-immunity',
    BenefitFactCard: {
      eyebrow: 'Daily support, on your terms',
      headline: 'D3 + K2 — the bone-health pair',
      facts: [
        { icon: Sun, stat: '2000 IU', label: 'Vitamin D3', sublabel: 'calcium absorption' },
        { icon: Shield, stat: '200 mcg', label: 'Vitamin K2 (MK-7)', sublabel: 'directs calcium to bones' },
        { icon: Clock, stat: '3 sec', label: 'Dissolves on tongue', sublabel: 'raspberry, no pills' },
      ],
    },
    IngredientFactCard: {
      badge: 'D3 2000 IU + K2',
      headline: 'Two synergistic bone nutrients',
      ingredients: [
        { role: 'Bone & immune', name: 'Vitamin D3 (Cholecalciferol)', dose: '2000 IU' },
        { role: 'Calcium routing', name: 'Vitamin K2 (MK-7)', dose: '200 mcg' },
      ],
    },
    StripsVsPillsCard: { headline: 'Strips vs. D3 + K2 capsules' },
    RoutineFactCard: {
      eyebrow: 'What consistent use looks like',
      headline: 'Bone support, every day',
      mode: 'timeline',
      steps: [
        { when: 'Day 1', title: 'Start the ritual', description: 'One raspberry strip, 3 seconds.', icon: Sparkles },
        { when: 'Week 2', title: 'Habit forms', description: 'Daily D3 + K2 in a no-water format.', icon: Heart },
        { when: 'Week 4', title: 'Stay consistent', description: 'Bone support builds with steady use.', icon: Shield },
        { when: 'Week 8', title: 'Long-term care', description: 'Talk to your provider about long-term levels.', icon: Sun },
      ],
    },
    removeSections: [
      { type: 'todo', value: 'Duplicate D3 IU pill grid', reason: 'No matching inline block in StripPDPTemplate.' },
    ],
    validation: ['Bone health structure-function wording kept conservative.'],
  },

  'libido-support-strips': {
    handle: 'libido-support-strips',
    cluster: 'gut-immunity',
    BenefitFactCard: {
      eyebrow: 'Daily support, on your terms',
      headline: 'Vitality stack in a discreet 30-second strip',
      facts: [
        { icon: Activity, stat: '50 mg', label: 'Cordyceps Militaris', sublabel: 'stamina + endurance' },
        { icon: FlaskConical, stat: '50 mg', label: 'Shilajit Extract', sublabel: 'naturally occurring minerals' },
        { icon: Droplets, stat: '20 mg', label: 'Oyster Peptide', sublabel: 'sexual wellness support' },
      ],
      footnote: 'Not for children. Do not exceed 2 strips per day.',
    },
    IngredientFactCard: {
      badge: 'Discreet format',
      headline: 'Three vitality actives',
      ingredients: [
        { role: 'Stamina', name: 'Cordyceps Militaris', dose: '50 mg' },
        { role: 'Mineral support', name: 'Shilajit Extract', dose: '50 mg' },
        { role: 'Marine peptide', name: 'Oyster Peptide', dose: '20 mg' },
      ],
    },
    StripsVsPillsCard: { headline: 'Strips vs. vitality pills' },
    RoutineFactCard: {
      eyebrow: 'How to use',
      headline: 'Take it on your terms',
      mode: 'daily',
      steps: [
        { when: 'As needed', title: 'One strip on tongue', description: '3 seconds, chocolate flavor.', icon: Sparkles },
        { when: 'Daily ritual', title: 'Build vitality', description: 'Cordyceps + Shilajit support steady stamina.', icon: Activity },
        { when: 'Discreet', title: 'No bottle, no water', description: 'Slim sachet — keeps it private.', icon: Shield },
        { when: 'Cap at 2', title: 'Daily max', description: 'Do not exceed 2 strips per day.', icon: Clock },
      ],
    },
    removeSections: [
      { type: 'todo', value: 'Duplicate ingredient pill grid', reason: 'No matching inline block in StripPDPTemplate.' },
    ],
    validation: ['No performance/medical claim. Compliance-safe vitality wording.'],
  },

  'probiotic-metabolism-strips': {
    handle: 'probiotic-metabolism-strips',
    cluster: 'gut-immunity',
    BenefitFactCard: {
      eyebrow: 'Daily support, on your terms',
      headline: 'A 10 Billion CFU synbiotic in 3 seconds',
      facts: [
        { icon: Shield, stat: '10B', label: 'CFU per strip', sublabel: 'Bifidobacterium lactis' },
        { icon: Leaf, stat: '30 mg', label: 'Polydextrose', sublabel: 'prebiotic fiber' },
        { icon: Clock, stat: '3 sec', label: 'No refrigeration', sublabel: 'travel-friendly' },
      ],
    },
    IngredientFactCard: {
      badge: '10B CFU · Sugar-free',
      headline: 'Probiotic + prebiotic, paired',
      ingredients: [
        { role: 'Probiotic', name: 'Bifidobacterium lactis', dose: '10 Billion CFU' },
        { role: 'Prebiotic fiber', name: 'Polydextrose', dose: '30 mg' },
      ],
    },
    StripsVsPillsCard: { headline: 'Strips vs. probiotic capsules' },
    RoutineFactCard: {
      eyebrow: 'What consistent use looks like',
      headline: 'Daily gut balance ritual',
      mode: 'timeline',
      steps: [
        { when: 'Day 1', title: 'Morning strip', description: 'Best on empty stomach.', icon: Sun },
        { when: 'Week 2', title: 'Habit builds', description: 'Daily probiotic + prebiotic combo.', icon: Heart },
        { when: 'Week 4', title: 'Stay consistent', description: 'Microbiome support compounds with consistency.', icon: Shield },
        { when: 'Week 8', title: 'Tune in', description: 'Notice how your gut feels day-to-day.', icon: Sparkles },
      ],
    },
    removeSections: [
      // Exact match exists in ProbioticPDP.tsx (<h2> "10 Billion good bacteria + prebiotic fiber"),
      // but that section is embedded with IngredientTransparencyDrawer + trust badges and
      // cannot be safely isolated. Leaving in place per safety rule.
      { type: 'todo', value: 'Ingredients heading: 10 Billion good bacteria + prebiotic fiber', reason: 'Embedded with IngredientTransparencyDrawer and trust badges in ProbioticPDP.tsx — cannot isolate safely.' },
    ],
    validation: ['No therapeutic gut-disease claim.'],
  },

  'digestive-gut-health-strips': {
    handle: 'digestive-gut-health-strips',
    cluster: 'gut-immunity',
    BenefitFactCard: {
      eyebrow: 'Daily support, on your terms',
      headline: 'Probiotic + triple enzyme, one strip',
      facts: [
        { icon: Shield, stat: '10B', label: 'CFU Bacillus Coagulans', sublabel: 'gut flora support' },
        { icon: Apple, stat: '30 mg', label: 'Triple enzyme blend', sublabel: 'Protease · Papain · Bromelain' },
        { icon: Clock, stat: '3 sec', label: 'After-meal ritual', sublabel: 'no water needed' },
      ],
    },
    IngredientFactCard: {
      badge: 'Vegan · Lactose-free',
      headline: 'Synbiotic + digestive enzymes',
      ingredients: [
        { role: 'Probiotic', name: 'Bacillus Coagulans', dose: '10 Billion CFU' },
        { role: 'Protein digestion', name: 'Protease', dose: '10 mg' },
        { role: 'Protein digestion', name: 'Papain', dose: '10 mg' },
        { role: 'Protein digestion', name: 'Bromelain', dose: '10 mg' },
      ],
    },
    StripsVsPillsCard: { headline: 'Strips vs. digestive enzyme capsules' },
    RoutineFactCard: {
      eyebrow: 'How to use',
      headline: 'After a meal, on your tongue',
      mode: 'daily',
      steps: [
        { when: 'After meals', title: 'One strip', description: 'Mixed-berry, dissolves in 3 seconds.', icon: Apple },
        { when: 'Daily', title: 'Up to 2 strips', description: 'As needed for digestive support.', icon: Heart },
        { when: 'Travel', title: 'No refrigeration', description: 'Slim sachet — pack a few.', icon: Sparkles },
        { when: 'Long-term', title: 'Stay consistent', description: 'Gut comfort builds with steady use.', icon: Shield },
      ],
    },
    removeSections: [
      { type: 'todo', value: 'Duplicate enzyme pill grid', reason: 'No matching inline block in StripPDPTemplate.' },
    ],
    validation: ['Bloating language already on PDP — kept lifestyle, not medical.'],
  },

  'appetite-balance-weight-support-strips': {
    handle: 'appetite-balance-weight-support-strips',
    cluster: 'gut-immunity',
    BenefitFactCard: {
      eyebrow: 'Daily support, on your terms',
      headline: 'Gentle metabolism support before meals',
      facts: [
        { icon: Flame, stat: '75 mcg', label: 'Chromium', sublabel: 'glucose metabolism' },
        { icon: Leaf, stat: '10 mg', label: 'Saffron Extract', sublabel: 'emotional balance' },
        { icon: FlaskConical, stat: '100 mcg', label: 'Molybdenum', sublabel: 'enzyme activity' },
      ],
      footnote: 'Not a substitute for a calorie-reduced diet.',
    },
    IngredientFactCard: {
      badge: 'Sugar-free · Vegan',
      headline: 'Three actives for balance',
      ingredients: [
        { role: 'Blood sugar', name: 'Chromium (Picolinate)', dose: '75 mcg' },
        { role: 'Enzyme cofactor', name: 'Molybdenum', dose: '100 mcg' },
        { role: 'Emotional balance', name: 'Saffron Extract', dose: '10 mg' },
      ],
    },
    StripsVsPillsCard: { headline: 'Strips vs. metabolism capsules' },
    RoutineFactCard: {
      eyebrow: 'How to use',
      headline: 'Before meals, on your tongue',
      mode: 'daily',
      steps: [
        { when: 'Before meal', title: 'One strip', description: 'Mixed-berry, dissolves in 3 seconds.', icon: Apple },
        { when: 'Daily', title: 'Up to 2 strips', description: 'Spread across the day, before meals.', icon: Clock },
        { when: 'Travel', title: 'Slim sachet', description: 'No water, no meal planning required.', icon: Sparkles },
        { when: 'Long-term', title: 'Stay consistent', description: 'Pair with balanced eating.', icon: Shield },
      ],
    },
    removeSections: [
      { type: 'todo', value: 'Duplicate chromium mcg callout', reason: 'No matching inline block in StripPDPTemplate.' },
    ],
    validation: ['Weight-loss claim avoided; "metabolism support" language preserved.'],
  },
};

export type ProductFactHandle = keyof typeof pdpFactCardProps;
