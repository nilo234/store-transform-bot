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
 * Map dominant tags to a bundle slug (matches src/data/bundles.ts)
 * If no strong match, return null to fall back to "single best strip" recommendation.
 */
export function pickBundleFromTags(tagCounts: Record<string, number>): {
  bundleId: string;
  bundleName: string;
  reason: string;
} {
  const top = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'daily';

  const map: Record<string, { bundleId: string; bundleName: string; reason: string }> = {
    energy: {
      bundleId: 'daily-wellness',
      bundleName: 'Daily Wellness Bundle',
      reason: 'Built for sustained energy + foundational nutrients without the crash.',
    },
    b12: {
      bundleId: 'daily-wellness',
      bundleName: 'Daily Wellness Bundle',
      reason: 'B12 + foundational support to keep your energy steady all day.',
    },
    sleep: {
      bundleId: 'sleep-recover',
      bundleName: 'Sleep & Recover Bundle',
      reason: 'Helps you fall asleep faster and wake up actually rested.',
    },
    recover: {
      bundleId: 'sleep-recover',
      bundleName: 'Sleep & Recover Bundle',
      reason: 'Recovery-focused stack so your body bounces back overnight.',
    },
    beauty: {
      bundleId: 'beauty-glow',
      bundleName: 'Beauty & Glow Bundle',
      reason: 'Hair, skin & nails support — visible results in 4–6 weeks.',
    },
    glow: {
      bundleId: 'beauty-glow',
      bundleName: 'Beauty & Glow Bundle',
      reason: 'For that lit-from-within glow you\'ve been chasing.',
    },
    focus: {
      bundleId: 'best-value-mega',
      bundleName: 'Best Value Mega Bundle',
      reason: 'Cognitive + foundational support so you stay sharp all day.',
    },
    mushroom: {
      bundleId: 'best-value-mega',
      bundleName: 'Best Value Mega Bundle',
      reason: 'Mushroom-powered focus + full-day wellness support.',
    },
    cognitive: {
      bundleId: 'best-value-mega',
      bundleName: 'Best Value Mega Bundle',
      reason: 'Calm focus + the daily essentials your brain craves.',
    },
    digestive: {
      bundleId: 'daily-wellness',
      bundleName: 'Daily Wellness Bundle',
      reason: 'Gut-friendly daily essentials to feel lighter and more regular.',
    },
    gut: {
      bundleId: 'daily-wellness',
      bundleName: 'Daily Wellness Bundle',
      reason: 'Gut-friendly daily essentials to feel lighter and more regular.',
    },
    immunity: {
      bundleId: 'daily-wellness',
      bundleName: 'Daily Wellness Bundle',
      reason: 'Immune-supporting vitamins to keep you resilient year-round.',
    },
    hangover: {
      bundleId: 'sleep-recover',
      bundleName: 'Sleep & Recover Bundle',
      reason: 'Recovery essentials for late nights and busy weekends.',
    },
    daily: {
      bundleId: 'daily-wellness',
      bundleName: 'Daily Wellness Bundle',
      reason: 'The foundational stack — your daily 3-second ritual, sorted.',
    },
    bundle: {
      bundleId: 'best-value-mega',
      bundleName: 'Best Value Mega Bundle',
      reason: 'You\'re ready for the full ritual — this is the complete stack.',
    },
    single: {
      bundleId: 'daily-wellness',
      bundleName: 'Daily Wellness Bundle',
      reason: 'A great place to start — small, daily, no overwhelm.',
    },
    easy: {
      bundleId: 'daily-wellness',
      bundleName: 'Daily Wellness Bundle',
      reason: '30-second strips you\'ll actually remember to take. No pills, ever.',
    },
    subscribe: {
      bundleId: 'best-value-mega',
      bundleName: 'Best Value Mega Bundle',
      reason: 'Best value + biggest impact — the ritual upgrade you deserve.',
    },
  };

  return map[top] || map.daily;
}
