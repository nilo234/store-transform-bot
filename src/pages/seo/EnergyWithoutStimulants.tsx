import { SeoLandingLayout, type SeoSection } from '@/components/seo';

const sections: SeoSection[] = [
  {
    h2: 'Natural Energy Without Stimulants — Calm, Clear, Sustained',
    intro:
      'You want to feel awake, not wired. Stimulant-free energy gives you focus and drive without the racing heart or the post-coffee dip. It is energy that fits a longer workday and a calmer nervous system.',
    benefits: [
      'No caffeine, no taurine, no harsh stimulants',
      'Supports clear thinking and steady mood',
      'Strips that dissolve fast — no pills, no powders, no water',
    ],
    how: 'Stimulant-free formulas combine B-vitamins, CoQ10, and adaptogens like Rhodiola or Ashwagandha. Together they help your body produce and use energy more efficiently, so you feel naturally awake instead of artificially hyped.',
    bridge:
      'Neuvie Energy Strips were designed for people who tried caffeine pills, pre-workouts, and energy drinks — and want something cleaner. One strip, 3 seconds, no buzz.',
    faq: {
      q: 'What gives you energy without caffeine or other stimulants?',
      a: 'Key nutrients like vitamin B12, B6, CoQ10, and magnesium help your cells make energy. Adaptogens like Rhodiola support your stress response so you stay focused. None of these are stimulants.',
    },
  },
  {
    h2: 'Why Stimulant-Free Beats Another Cup of Coffee',
    intro:
      'Coffee feels like energy, but it’s mostly a borrowed lift. A stimulant-free option gives you something your body can actually use, and you don’t pay for it later with a crash or a bad night of sleep.',
    benefits: [
      'No interference with sleep quality',
      'No spike in cortisol or heart rate',
      'Great for morning, mid-day, or pre-workout',
    ],
    how: 'When you give your body the raw materials for energy — vitamins, minerals, and adaptogens — you fix the actual issue instead of overriding it. That’s why stimulant-free energy feels smoother and lasts longer.',
    bridge:
      'A daily Neuvie strip is an easy upgrade. Keep one in your bag, your car, or your desk drawer for a 3-second reset whenever you need it.',
    faq: {
      q: 'Can I take stimulant-free energy supplements before a workout?',
      a: 'Yes. Many people prefer stimulant-free formulas pre-workout because they support focus and endurance without raising heart rate the way caffeine does.',
    },
  },
  {
    h2: 'Energy Boosters Without Caffeine — Built for Sensitive Bodies',
    intro:
      'If caffeine makes you anxious, gives you stomach issues, or wrecks your sleep, you are not alone. A caffeine-free booster is a kinder way to get through long days without sacrificing how you feel.',
    benefits: [
      'Gentle on the stomach',
      'No heart palpitations or restlessness',
      'Pocket-sized strips you can carry anywhere',
    ],
    how: 'These formulas focus on supporting cellular energy and stress resilience. By targeting the systems that produce energy, they help you feel awake without overstimulating your nervous system.',
    bridge:
      'Neuvie skipped caffeine on purpose. Every strip is made in the USA in an FDA-registered facility, so you know what you’re putting in your body.',
    faq: {
      q: 'Are caffeine-free energy boosters good for people with anxiety?',
      a: 'Many people with anxiety find stimulant-free options easier to tolerate. Without caffeine, there’s less risk of jitters or a racing heartbeat that can mimic or trigger anxious feelings.',
    },
  },
];

export default function EnergyWithoutStimulants() {
  return (
    <SeoLandingLayout
      title="Natural Energy Without Stimulants — Calm Focus | Neuvie"
      description="Stimulant-free energy support in a fast-dissolving strip. Steady focus, no jitters, no crash. Made in the USA."
      h1="Natural Energy Without Stimulants"
      lede="Feel awake, focused, and calm — without caffeine, taurine, or harsh stimulants. One strip. 3 seconds. No crash."
      sections={sections}
      topic="natural energy supplement without stimulants"
      canonicalPath="/energy-without-stimulants"
      quickAnswer={}
    />
  );
}
