export interface QuizOption {
  label: string;
  /** Tag mapping to bundle / product categories */
  tags: string[];
  emoji?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  subtitle?: string;
  multi?: boolean;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'goal',
    question: "What's your #1 wellness goal right now?",
    subtitle: 'Pick the one that matters most this season.',
    options: [
      { label: 'More energy, less crash', tags: ['energy', 'b12'] },
      { label: 'Better sleep & recovery', tags: ['sleep', 'recover'] },
      { label: 'Glowing skin, hair & nails', tags: ['beauty', 'glow'] },
      { label: 'Calm focus & clear mind', tags: ['focus', 'cognitive', 'mushroom'] },
      { label: 'Gut & digestive health', tags: ['digestive', 'gut'] },
      { label: 'Strong immunity', tags: ['immunity', 'vitamin-c'] },
    ],
  },
  {
    id: 'lifestyle',
    question: 'Which sounds most like your week?',
    options: [
      { label: 'Always on the go — barely sit down', tags: ['energy', 'daily'] },
      { label: 'Desk all day, screen-tired by 5 PM', tags: ['focus', 'beauty'] },
      { label: 'Workouts 3–5x a week', tags: ['recover', 'energy'] },
      { label: 'Late nights, social weekends', tags: ['hangover', 'sleep'] },
      { label: 'Quiet & routine — just want to feel my best', tags: ['daily', 'beauty'] },
    ],
  },
  {
    id: 'biggest_struggle',
    question: "What's your biggest daily struggle?",
    options: [
      { label: 'Afternoon energy crash', tags: ['energy'] },
      { label: 'Trouble falling or staying asleep', tags: ['sleep'] },
      { label: 'Bloating or sluggish digestion', tags: ['digestive'] },
      { label: 'Skin that feels dull or tired', tags: ['beauty', 'glow'] },
      { label: 'Brain fog, can\'t focus', tags: ['focus', 'mushroom'] },
      { label: 'Catching every bug going around', tags: ['immunity'] },
    ],
  },
  {
    id: 'pill_pain',
    question: 'How do you feel about pills & capsules?',
    subtitle: 'Be honest — there\'s no wrong answer.',
    options: [
      { label: 'Hate them. I gag every time.', tags: ['easy', 'daily'] },
      { label: 'I forget to take them most days', tags: ['easy', 'daily'] },
      { label: 'They\'re fine, I just want better absorption', tags: ['daily'] },
      { label: 'I\'ve tried 10 brands. Nothing sticks.', tags: ['easy', 'daily'] },
    ],
  },
  {
    id: 'commitment',
    question: 'How ready are you to make this a daily ritual?',
    options: [
      { label: 'All in — I want my best self', tags: ['bundle', 'subscribe'] },
      { label: 'Open, but want to start small', tags: ['single'] },
      { label: 'Just exploring for now', tags: ['single'] },
    ],
  },
];

/**
 * Single-product recommendation. Each tag maps to ONE strip the customer
 * can start with. Handles match the routes used across the site (see
 * src/components/home/QuickCategoryPicker.tsx and ProductDetail routes).
 */
export interface SingleProductPick {
  handle: string;
  name: string;
  reason: string;
}

const singleProductMap: Record<string, SingleProductPick> = {
  energy: {
    handle: 'energy-strips-2',
    name: 'Energy Strips',
    reason: 'Caffeine + L-Theanine for clean, sustained energy — no jitters, no crash.',
  },
  b12: {
    handle: 'energy-strips-2',
    name: 'Energy Strips',
    reason: 'B12-powered support to keep your energy steady from morning to night.',
  },
  sleep: {
    handle: 'sleep-strips-1',
    name: 'Sleep Strips',
    reason: 'Melatonin + Valerian to help you fall asleep faster and wake up rested.',
  },
  recover: {
    handle: 'sleep-strips-1',
    name: 'Sleep Strips',
    reason: 'Overnight recovery support so your body bounces back by morning.',
  },
  beauty: {
    handle: 'beauty-collagen-strips',
    name: 'Beauty + Collagen Strips',
    reason: 'Collagen peptides for skin, hair and nails — visible results in 4–6 weeks.',
  },
  glow: {
    handle: 'hair-skin-and-nails-strips',
    name: 'Hair, Skin & Nails Strips',
    reason: 'Biotin 5,000 mcg for that lit-from-within glow you\'ve been chasing.',
  },
  focus: {
    handle: 'mushroom-focus-strips',
    name: 'Mushroom Focus Strips',
    reason: 'Lion\'s Mane + Cordyceps for sharp, calm focus when it matters most.',
  },
  mushroom: {
    handle: 'mushroom-focus-strips',
    name: 'Mushroom Focus Strips',
    reason: 'Mushroom-powered clarity without the caffeine spike.',
  },
  cognitive: {
    handle: 'cognitive-relax-strips',
    name: 'Cognitive Relax Strips',
    reason: 'L-Theanine + GABA for a calm, focused mind — ideal for overthinkers.',
  },
  digestive: {
    handle: 'digestive-gut-health-strips',
    name: 'Digestive + Gut Health Strips',
    reason: 'Probiotics + enzymes to feel lighter, less bloated, more regular.',
  },
  gut: {
    handle: 'probiotic-metabolism-strips',
    name: 'Probiotic + Metabolism Strips',
    reason: '10B CFU for daily digestive balance from the inside out.',
  },
  immunity: {
    handle: 'iron-strips',
    name: 'Iron Strips',
    reason: 'Iron 19 mg + Folate for steady energy and resilient daily wellness.',
  },
  hangover: {
    handle: 'hangover-strips',
    name: 'Hangover Strips',
    reason: 'Built for the morning after — hydration, electrolytes and recovery support.',
  },
  daily: {
    handle: 'energy-strips-2',
    name: 'Energy Strips',
    reason: 'A simple, daily 3-second ritual to start your NEUVIE routine.',
  },
  easy: {
    handle: 'energy-strips-2',
    name: 'Energy Strips',
    reason: '30-second strips you\'ll actually remember to take. No pills, ever.',
  },
  single: {
    handle: 'energy-strips-2',
    name: 'Energy Strips',
    reason: 'A great place to start — small, daily, no overwhelm.',
  },
  bundle: {
    handle: 'energy-strips-2',
    name: 'Energy Strips',
    reason: 'Add this to your bundle for daily clean energy support.',
  },
  subscribe: {
    handle: 'energy-strips-2',
    name: 'Energy Strips',
    reason: 'Subscribe & save 20% on your daily energy ritual.',
  },
};

/**
 * Map dominant tags to a bundle slug (matches src/data/bundles.ts).
 * Bundle IDs match the live bundles in src/data/bundles.ts.
 */
export function pickBundleFromTags(tagCounts: Record<string, number>): {
  bundleId: string;
  bundleName: string;
  reason: string;
} {
  const top = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'daily';

  const map: Record<string, { bundleId: string; bundleName: string; reason: string }> = {
    energy: {
      bundleId: 'before-you-leave',
      bundleName: 'Before You Leave the House',
      reason: 'Energy + Mushroom Focus — the 2-strip morning stack for sustained, clean energy.',
    },
    b12: {
      bundleId: 'the-foundation',
      bundleName: 'The Foundation',
      reason: 'Foundational nutrients to keep your energy and resilience steady all day.',
    },
    sleep: {
      bundleId: 'quiet-down',
      bundleName: 'Quiet Down',
      reason: 'Sleep + Cognitive Relax — fall asleep faster, wake up actually rested.',
    },
    recover: {
      bundleId: 'quiet-down',
      bundleName: 'Quiet Down',
      reason: 'Overnight recovery stack so your body and mind reset properly.',
    },
    beauty: {
      bundleId: 'the-glow-protocol',
      bundleName: 'The Glow Protocol',
      reason: 'Beauty + Collagen, Hair/Skin/Nails and Bone Support — visible results in 4–6 weeks.',
    },
    glow: {
      bundleId: 'the-glow-protocol',
      bundleName: 'The Glow Protocol',
      reason: 'For that lit-from-within glow — backed by collagen, biotin and bone support.',
    },
    focus: {
      bundleId: 'deep-work-stack',
      bundleName: 'The Deep Work Stack',
      reason: 'Mushroom Focus + Energy + Cognitive Relax — show up sharp, stay there.',
    },
    mushroom: {
      bundleId: 'deep-work-stack',
      bundleName: 'The Deep Work Stack',
      reason: 'Mushroom-powered focus + full-day clarity for deep work days.',
    },
    cognitive: {
      bundleId: 'deep-work-stack',
      bundleName: 'The Deep Work Stack',
      reason: 'Calm focus + sharp cognition for high-output days.',
    },
    digestive: {
      bundleId: 'gut-feeling',
      bundleName: 'The Gut Feeling Bundle',
      reason: 'Probiotic + Digestive + Iron + Appetite — the full gut-reset stack.',
    },
    gut: {
      bundleId: 'gut-feeling',
      bundleName: 'The Gut Feeling Bundle',
      reason: 'Built for the girl who bloats and finally wants to trust her gut again.',
    },
    immunity: {
      bundleId: 'the-foundation',
      bundleName: 'The Foundation',
      reason: 'Bone, Probiotic, Iron and Appetite Balance — your daily resilience stack.',
    },
    hangover: {
      bundleId: 'night-out-survival-kit',
      bundleName: 'The Night Out Survival Kit',
      reason: 'Hangover + Energy + Cognitive Relax — for the night out and the morning after.',
    },
    daily: {
      bundleId: 'the-foundation',
      bundleName: 'The Foundation',
      reason: 'The boring, essential stack — the reason everything else works.',
    },
    bundle: {
      bundleId: 'the-full-you',
      bundleName: 'The Full You',
      reason: 'You\'re ready for the full ritual — every part of you, covered.',
    },
    single: {
      bundleId: 'before-you-leave',
      bundleName: 'Before You Leave the House',
      reason: 'A small 2-strip starter — easy to commit to, easy to feel.',
    },
    easy: {
      bundleId: 'before-you-leave',
      bundleName: 'Before You Leave the House',
      reason: '30-second strips you\'ll actually remember. No pills, ever.',
    },
    subscribe: {
      bundleId: 'the-full-you',
      bundleName: 'The Full You',
      reason: 'Best value + biggest impact — the complete ritual upgrade.',
    },
  };

  return map[top] || map.daily;
}

/**
 * Pick a single starter product based on the dominant quiz tag.
 * Used alongside pickBundleFromTags so the result page can show BOTH:
 * a complete bundle AND a lower-friction single-strip option.
 */
export function pickSingleProductFromTags(tagCounts: Record<string, number>): SingleProductPick {
  const top = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'daily';
  return singleProductMap[top] || singleProductMap.daily;
}
