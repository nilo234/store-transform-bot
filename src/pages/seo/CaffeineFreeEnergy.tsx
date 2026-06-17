import { SeoLandingLayout, type SeoSection } from '@/components/seo';

const sections: SeoSection[] = [
  {
    h2: 'Caffeine-Free Energy Supplements That Actually Work',
    intro:
      'Tired of the 3 PM crash, jittery hands, and a racing heart from another cup of coffee? You can feel awake, sharp, and steady without a single milligram of caffeine. The right supplement supports your body’s own energy production instead of forcing it.',
    benefits: [
      'No jitters, no anxiety, no afternoon crash',
      'Clean, steady energy that lasts for hours',
      'Dissolvable strips that work in about 30 seconds — no pills, no water',
    ],
    how: 'Caffeine-free energy formulas use ingredients like B-vitamins, CoQ10, and adaptogens to help your cells turn food into usable fuel. Instead of stimulating your nervous system, they support the natural process that already makes you feel energized.',
    bridge:
      'Neuvie Energy Strips were built for people who want lift without the wired feeling. Just place one on your tongue in the morning — it dissolves in seconds and gets to work fast.',
    faq: {
      q: 'What is the best caffeine-free energy supplement for sensitive people?',
      a: 'Look for a stimulant-free formula with B-vitamins, CoQ10, and an adaptogen like Rhodiola. Strips and drops absorb faster than pills, which helps if you have a sensitive stomach or react badly to caffeine.',
    },
  },
  {
    h2: 'Energy Without Caffeine: A Smarter Daily Routine',
    intro:
      'Caffeine borrows energy from later in the day and charges interest. If you are done with the cycle of coffee, crash, and another coffee, a caffeine-free routine can give you a calmer, more reliable kind of focus.',
    benefits: [
      'Stable mood and steady focus all morning',
      'No interference with sleep, even if used in the afternoon',
      'Pocket-sized format you can use anywhere',
    ],
    how: 'A caffeine-free energy boost works at the cellular level. Vitamins and natural plant compounds help your mitochondria — the tiny power plants in every cell — do their job more efficiently. The result feels less like a spike and more like simply waking up.',
    bridge:
      'Neuvie’s 3-second daily ritual fits into the moments you already have: before a workout, before a meeting, before the school run. One strip, no water, you’re good.',
    faq: {
      q: 'Can I get real energy without caffeine or sugar?',
      a: 'Yes. Caffeine and sugar only mask tiredness for a short time. A stimulant-free supplement with B-vitamins and adaptogens supports your body’s own energy systems, so you feel awake without the spike-and-crash pattern.',
    },
  },
  {
    h2: 'Natural Energy Without Stimulants',
    intro:
      'Stimulants push your body harder. Natural energy support helps it run better. If caffeine leaves you anxious, dehydrated, or wired and tired, going stimulant-free is one of the simplest upgrades you can make.',
    benefits: [
      'Gentle lift you can feel within minutes',
      'Works with your body — not against it',
      'Friendly for people with caffeine sensitivity, heart palpitations, or anxiety',
    ],
    how: 'Stimulant-free energy formulas focus on nutrient gaps that quietly drain you: low B12, low CoQ10, low magnesium, or low adaptogen support. Filling those gaps often does more for daily energy than another cup of coffee ever could.',
    bridge:
      'Neuvie Energy Strips skip caffeine completely. You get a clean, focused lift in a format you can carry in any pocket.',
    faq: {
      q: 'Is natural energy without stimulants safe to take every day?',
      a: 'Daily-use formulas are designed for it. Stick to the serving size on the label, and choose products made in an FDA-registered facility for added quality assurance.',
    },
  },
];

export default function CaffeineFreeEnergy() {
  return (
    <SeoLandingLayout
      title="Caffeine-Free Energy Supplements | No Jitters, No Crash | Neuvie"
      description="Clean, caffeine-free energy in a 30-second strip. No jitters, no crash, no anxiety. Made in the USA, free shipping over $50."
      h1="Caffeine-Free Energy Supplements"
      lede="Steady, stimulant-free energy in a strip that dissolves in about 30 seconds. No jitters. No crash. Just a clean lift you can feel."
      sections={sections}
    />
  );
}
