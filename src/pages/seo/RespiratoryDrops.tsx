import { SeoLandingLayout, type SeoSection } from '@/components/seo';

const sections: SeoSection[] = [
  {
    h2: 'Respiratory Drops for Everyday Lung Comfort',
    intro:
      'Cold air, dry rooms, smoke, and seasonal changes can leave your chest feeling tight and your breathing less than easy. Daily respiratory support helps you feel clearer, calmer, and more comfortable when you breathe.',
    benefits: [
      'Supports clear, easy breathing day to day',
      'Soothing herbal blend for the throat and chest area',
      'Convenient strip format — no spoons, no syrups',
    ],
    how: 'Respiratory support formulas often combine ingredients like elderberry, mullein, and vitamin C. These traditional botanicals are used to support the body’s natural respiratory and immune function, especially during seasonal changes.',
    bridge:
      'Neuvie Respiratory Strips bring that support into a simple 3-second ritual. Just place one on your tongue and let it dissolve — no mess, no water.',
    faq: {
      q: 'What are respiratory drops used for?',
      a: 'They are typically used to support normal respiratory function and throat comfort, especially during dry seasons, allergy flare-ups, or when air quality is poor.',
    },
  },
  {
    h2: 'Lung Health Supplements That Fit Into Daily Life',
    intro:
      'You don’t have to wait until you feel run-down to think about your lungs. A simple daily routine can help you feel more at ease with every breath — and it doesn’t need to be complicated.',
    benefits: [
      'Daily-use format you’ll actually stick with',
      'Plant-based ingredients with a long history of use',
      'Pocket-friendly strips for travel, work, or the gym',
    ],
    how: 'Lung-friendly formulas focus on antioxidants and traditional herbs that support a healthy inflammatory response. The goal isn’t to override how you feel — it’s to give your body steady, daily nutritional support.',
    bridge:
      'Neuvie keeps it simple. One strip a day, made in the USA in an FDA-registered facility, backed by a 30-day money-back guarantee.',
    faq: {
      q: 'Can I take lung health supplements every day?',
      a: 'Most daily-use respiratory supplements are designed for long-term use at the recommended serving. Always read the label, and check with your healthcare provider if you take other medications.',
    },
  },
  {
    h2: 'Breathe Easier: Natural Support for Sensitive Lungs',
    intro:
      'If smoke, pollen, or city air leave you feeling tight in the chest, gentle daily support can make a real difference in how comfortable your breathing feels. The right strip is the kind you’ll actually remember to take.',
    benefits: [
      'Soothing, non-drowsy daily support',
      'No harsh ingredients or artificial flavors',
      'Quick dissolve — works in about 30 seconds',
    ],
    how: 'Botanicals like mullein and elderberry have been used for generations to support respiratory comfort. Combined with vitamin C and zinc, they form a daily backbone for people who want their lungs to feel a little more at ease.',
    bridge:
      'Neuvie Respiratory Strips are designed for people who want lung comfort without spoons, syrups, or huge capsules. Place. Dissolve. Done.',
    faq: {
      q: 'What is the best supplement for lung and respiratory health?',
      a: 'Look for a blend that combines traditional botanicals such as mullein and elderberry with antioxidants like vitamin C. A daily, easy-to-take format is what most people stick with long term.',
    },
  },
];

export default function RespiratoryDrops() {
  return (
    <SeoLandingLayout
      title="Respiratory Drops & Lung Health Strips | Neuvie"
      description="Daily respiratory and lung support in a strip that dissolves in about 30 seconds. Plant-based, made in the USA, 30-day guarantee."
      h1="Respiratory Drops & Lung Health Support"
      lede="A simple daily ritual for clearer, easier breathing. One strip, plant-based ingredients, 30 seconds — done."
      sections={sections}
      topic="respiratory and lung health drop"
      canonicalPath="/respiratory-drops"
      quickAnswer="Respiratory drops combine botanicals like mullein leaf and quercetin in a fast-absorbing liquid format that supports daily lung and breathing health — without harsh detoxes or smoke."
    />
  );
}
