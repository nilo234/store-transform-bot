// Centralized PDP configurations for the strip-template PDP.
// Each entry drives an instance of <StripPDPTemplate />.

import doctorRachelKim from '@/assets/doctor-rachel-kim.jpg';
import doctorMarcusChen from '@/assets/doctor-marcus-chen.jpg';
import testimonialHsn1 from '@/assets/testimonial-hsn-1.jpg';
import testimonialHsn2 from '@/assets/testimonial-hsn-2.jpg';
import testimonialHsn3 from '@/assets/testimonial-hsn-3.jpg';

import ingBiotin from '@/assets/ingredient-biotin.jpg';
import ingFolate from '@/assets/ingredient-folate.jpg';
import ingD3 from '@/assets/ingredient-vitamin-d3.jpg';
import ingGreenTea from '@/assets/ingredient-green-tea.jpg';
import ingLavender from '@/assets/ingredient-lavender.jpg';
import ingCaffeine from '@/assets/ingredient-caffeine.jpg';
import ingLionsMane from '@/assets/ingredient-lions-mane.jpg';
import ingCordyceps from '@/assets/ingredient-cordyceps.jpg';
import ingTurmeric from '@/assets/ingredient-turmeric.jpg';
import ingGrapeSeed from '@/assets/ingredient-grape-seed.jpg';
import ingCollagen from '@/assets/ingredient-collagen.jpg';
import ingVitC from '@/assets/ingredient-vitamin-c.jpg';
import ingValerian from '@/assets/ingredient-valerian.jpg';
import ingMagnesium from '@/assets/ingredient-magnesium.jpg';
import ingHyaluronic from '@/assets/ingredient-hyaluronic.jpg';

export interface PDPIngredient {
  name: string;
  tag: string;
  dose: string;
  desc: string;
  image: string;
}

export interface PDPDoctor {
  name: string;
  specialty: string;
  years: string;
  image: string;
  headline: string;
  text: string;
  tags: string[];
}

export interface PDPTestimonial {
  image: string;
  title: string;
  quote: string;
  author: string;
}

export interface PDPConfig {
  // Identity
  matchHandles: string[];                 // handle substrings to match
  category: string;                       // e.g. "Beauty Wellness"
  headlineMain: string;                   // e.g. "Hair, Skin & Nails"
  headlineSuffix?: string;                // word in accent after main
  subtitle: string;                       // under H1
  productNoun: string;                    // "Beauty Strip" / "Sleep Strip"
  topBadge: string;                       // top-right gallery badge
  bottomFlavorBadge: string;              // gallery bottom strip badge
  bandIngredients: string;                // colored band in All-in-One section
  // Buybox
  reviewCount: string;                    // e.g. "(2,847)"
  // Clinical
  clinicalStats: { label: string; value: number }[];
  highlightLead: string;                  // "hair strength improved by"
  highlightValue: string;                 // "+82%"
  clinicalH2A: string;                    // "Clinically-studied ingredients for"
  clinicalH2B: string;                    // "visibly stronger ..."
  clinicalFootnote: string;
  // Life-changing benefits
  benefitsKicker: string;                 // "Life-Changing Benefits"
  benefitsH2A: string;                    // "Become your"
  benefitsH2B: string;                    // "best self"
  benefitsLead: string;
  benefits: { title: string; body: string }[];
  // All-in-One
  allInOneH2A: string;                    // "All-in-One Beauty Strip for"
  allInOneH2B: string;                    // "Hair, Skin & Nails"
  allInOneBody: string;
  // Ritual comparison
  ritualLead: string;
  competitorName: string;                 // "Typical Biotin Capsules"
  pros: string[];                         // exactly 4
  cons: string[];                         // exactly 4
  // Inside
  insideLead: string;
  ingredients: PDPIngredient[];           // 3
  // Tasty + facts
  tastyBody: string;
  fullIngredientList: string;
  howToUseText: string;
  propsText: string;
  supplementFacts: { name: string; amount: string; dv: string }[];
  // Bundle
  bundleSubtitle: string;                 // "Pair X with our other strips..."
  // Doctors (override headline+text per product)
  doctors: PDPDoctor[];                   // 2
  // Reviews teaser (just one)
  reviewsTeaser: { quote: string; author: string };
  // Customer testimonials
  testimonials: PDPTestimonial[];         // 3
  // FAQ
  faqs: { q: string; a: string }[];
  // Description accordion text
  descriptionText: string;
  ingredientsAccordionText: string;
}

// ---- Shared defaults ----
const sharedDoctors = (override1: { headline: string; text: string; tags: string[] }, override2: { headline: string; text: string; tags: string[] }): PDPDoctor[] => [
  { name: 'Dr. Rachel Kim, MD', specialty: 'Internal Medicine', years: '14', image: doctorRachelKim, ...override1 },
  { name: 'Dr. Marcus Chen, MD', specialty: 'Functional Medicine', years: '17', image: doctorMarcusChen, ...override2 },
];

const sharedTestimonials = (
  t1: { title: string; quote: string; author: string },
  t2: { title: string; quote: string; author: string },
  t3: { title: string; quote: string; author: string },
): PDPTestimonial[] => [
  { image: testimonialHsn1, ...t1 },
  { image: testimonialHsn2, ...t2 },
  { image: testimonialHsn3, ...t3 },
];

// =====================================================
// PRODUCT CONFIGS
// =====================================================

const sleepConfig: PDPConfig = {
  matchHandles: ['sleep'],
  category: 'Sleep & Recovery',
  headlineMain: 'Sleep',
  headlineSuffix: 'Strips',
  subtitle: 'Melatonin + Valerian + L-Theanine · Sleep Support · NEUVIE™',
  productNoun: 'Sleep Strip',
  topBadge: 'Save up to 20% Today',
  bottomFlavorBadge: 'BERRY FLAVOR · NON-HABIT FORMING',
  bandIngredients: 'MELATONIN · VALERIAN · L-THEANINE',
  reviewCount: '(2,431)',
  clinicalStats: [
    { label: 'Fell asleep faster', value: 86 },
    { label: 'Slept through the night', value: 79 },
    { label: 'Woke up more refreshed', value: 81 },
  ],
  highlightLead: 'time to fall asleep dropped by',
  highlightValue: '-42%',
  clinicalH2A: 'Plant-powered ingredients for',
  clinicalH2B: 'deeper, more restorative sleep',
  clinicalFootnote: '*Based on a self-reported 4-week consumer perception study of nightly NEUVIE Sleep Strip use. Individual results vary.',
  benefitsKicker: 'A Better Night, Naturally',
  benefitsH2A: 'Wake up as your',
  benefitsH2B: 'rested self',
  benefitsLead: 'One small strip. Three calming sleep nutrients. A wind-down ritual that finally fits the way you actually live.',
  benefits: [
    { title: 'Helps you fall asleep faster', body: '0.3 mg Melatonin works with your circadian rhythm — a low, considered dose so you drift off without the morning grog.' },
    { title: 'Quieter mind, calmer body', body: 'Valerian root and L-Theanine have been traditionally used to support relaxation, so racing thoughts ease before bed.' },
    { title: 'Deeper, more restorative sleep', body: 'Designed to support the kind of sleep you actually feel — not the kind you just survive.' },
    { title: 'A 3-second ritual you’ll actually keep', body: 'No water, no capsules. One berry-flavored strip dissolves on your tongue — so winding down feels like self-care, not another task.' },
  ],
  allInOneH2A: 'All-in-One Sleep Strip for',
  allInOneH2B: 'restful, easy nights',
  allInOneBody: 'Three of the most-studied sleep nutrients in one effortless 3-second ritual. No melatonin overload, no chalky teas, no group-chat of pills. Just one berry-flavored strip — taken consistently — to help you actually rest.',
  ritualLead: 'Trade the bottle of melatonin pills for a ritual you’ll actually look forward to. NEUVIE strips are effortless — so good sleep finally feels like self-care.',
  competitorName: 'Typical Melatonin Pills',
  pros: [
    'Dissolves in 30 seconds — no water needed',
    'Low-dose Melatonin + Valerian + L-Theanine, smartly blended',
    'Light berry flavor — actually pleasant to take',
    'Travel-friendly: drop a strip on a hotel pillow, go anywhere',
  ],
  cons: [
    'Often over-dosed at 5–10 mg, leaving you groggy',
    'Hard to swallow when you’re already half-asleep',
    'Sticky liquids and powders — not bedtime-friendly',
    'Easy to forget — bottle ends up in the back of a drawer',
  ],
  insideLead: 'Three sleep nutrients, precision-dosed. No filler, no shortcuts.',
  ingredients: [
    { name: 'Melatonin', tag: 'Sleep Onset', dose: '0.3 mg', desc: 'A low, biologically-considered dose to support your natural sleep–wake rhythm.', image: ingLavender },
    { name: 'Valerian Root', tag: 'Calm & Relax', dose: '100 mg', desc: 'A traditional herbal extract used for centuries to support relaxation before bed.', image: ingValerian },
    { name: 'L-Theanine', tag: 'Quiet Mind', dose: '50 mg', desc: 'An amino acid from green tea that helps quiet a racing mind without sedation.', image: ingGreenTea },
  ],
  tastyBody: 'A light, natural berry flavor — sweetened with monk fruit and stevia. No chalky aftertaste, no melatonin bitterness. Just a 3-second bedtime ritual that feels like a treat.',
  fullIngredientList: 'Melatonin (0.3 mg), Valerian Root Extract (100 mg), L-Theanine (50 mg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Berry Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
  howToUseText: 'Place one strip on your tongue 20–30 minutes before bed and let it dissolve. No water needed. Use as part of a healthy sleep routine.',
  propsText: 'Vegan, gluten-free, non-GMO, non-habit forming, lactose-free, no added sugar. Made in the USA in an FDA-registered, GMP-certified facility.',
  supplementFacts: [
    { name: 'Melatonin', amount: '0.3 mg', dv: '*' },
    { name: 'Valerian Root Extract', amount: '100 mg', dv: '*' },
    { name: 'L-Theanine', amount: '50 mg', dv: '*' },
  ],
  bundleSubtitle: 'Pair Sleep Strips with our other wellness strips and save up to 20%.',
  doctors: sharedDoctors(
    {
      headline: 'A smart, low-dose nighttime formula',
      text: 'A 0.3 mg melatonin dose paired with Valerian and L-Theanine reflects current clinical thinking — many over-the-counter sleep aids are over-dosed, which can cause next-day grogginess. This is a more measured approach for adults who want to support sleep without sedation.',
      tags: ['Sleep Onset', 'Non-Habit', 'Calm'],
    },
    {
      headline: 'Compliance that supports better sleep',
      text: 'Consistency is what makes any sleep-support routine work. A pleasant-tasting dissolvable strip removes the friction patients cite when they stop a nightly routine, which is meaningful for nutrients that benefit from regular use.',
      tags: ['Nightly Routine', 'Compliance', 'Recovery'],
    },
  ),
  reviewsTeaser: {
    quote: 'I was skeptical because melatonin usually leaves me foggy. The low dose plus the valerian is exactly right — I fall asleep faster and wake up actually rested.',
    author: 'Daniel R.',
  },
  testimonials: sharedTestimonials(
    { title: 'I sleep through the night now', quote: 'After two weeks I was sleeping through 7 hours without waking up. The berry flavor is honestly the easiest part of my evening.', author: 'Megan H.' },
    { title: 'No more 3am scrolling', quote: 'I used to lie awake for an hour. One strip 30 minutes before bed and I’m out. And I don’t feel groggy in the morning.', author: 'Sofia L.' },
    { title: 'My favorite bedtime ritual', quote: 'I’ve tried every sleep product. This is the only one that didn’t leave me hungover the next day. Calm, deep, and actually restful.', author: 'Emily T.' },
  ),
  faqs: [
    { q: 'Will I feel groggy in the morning?', a: 'Most people don’t. We use a low 0.3 mg dose of Melatonin — much lower than typical 5–10 mg pills — to support natural sleep onset without next-day fog.' },
    { q: 'How do I take it?', a: 'Place one strip on your tongue 20–30 minutes before bed and let it dissolve — about 30 seconds. No water, no swallowing.' },
    { q: 'Is it habit forming?', a: 'No. NEUVIE Sleep Strips are non-habit forming. You can use nightly as part of a healthy sleep routine.' },
    { q: 'What does it taste like?', a: 'Light, natural berry flavor — sweetened with monk fruit and stevia. No bitter melatonin aftertaste.' },
    { q: 'Are these strips vegan and gluten-free?', a: 'Yes. Vegan, gluten-free, non-GMO, lactose-free, and made with no added sugar.' },
    { q: 'Where are they made?', a: 'Proudly made in the USA in an FDA-registered, GMP-certified facility. Every batch is independently third-party tested.' },
  ],
  descriptionText: 'A nightly dissolving sleep strip with 0.3 mg Melatonin, 100 mg Valerian Root, and 50 mg L-Theanine. Designed to help you fall asleep faster, sleep more deeply, and wake up without grogginess — no capsules, no water, no aftertaste.',
  ingredientsAccordionText: 'Melatonin (0.3 mg), Valerian Root Extract (100 mg), L-Theanine (50 mg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Berry Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
};

const energyConfig: PDPConfig = {
  matchHandles: ['energy', 'caffeine'],
  category: 'Energy & Focus',
  headlineMain: 'Energy',
  headlineSuffix: 'Strips',
  subtitle: 'Caffeine 100 mg + L-Theanine + B12 · Clean Energy · NEUVIE™',
  productNoun: 'Energy Strip',
  topBadge: 'Save up to 20% Today',
  bottomFlavorBadge: 'CITRUS FLAVOR · NO JITTERS, NO CRASH',
  bandIngredients: 'CAFFEINE · L-THEANINE · B12',
  reviewCount: '(3,194)',
  clinicalStats: [
    { label: 'Felt energy within 10 minutes', value: 91 },
    { label: 'Reported no jitters', value: 84 },
    { label: 'Avoided the afternoon crash', value: 78 },
  ],
  highlightLead: 'time to peak alertness in just',
  highlightValue: '10 min',
  clinicalH2A: 'Clean, clinically-paired ingredients for',
  clinicalH2B: 'steady, focused energy',
  clinicalFootnote: '*Based on a self-reported consumer perception study with daily NEUVIE Energy Strip use. Individual results vary.',
  benefitsKicker: 'Clean Energy You Can Feel',
  benefitsH2A: 'Show up as your',
  benefitsH2B: 'sharper self',
  benefitsLead: 'One small strip. 100 mg of clean caffeine, balanced by L-Theanine and B12. The kind of energy that doesn’t backfire at 3 PM.',
  benefits: [
    { title: 'Smooth, focused energy', body: '100 mg of caffeine paired with 100 mg of L-Theanine — the classic clinical pairing for alertness without the edge.' },
    { title: 'No jitters, no crash', body: 'L-Theanine smooths caffeine’s sharp edges, and B12 supports steady energy metabolism so you don’t fall off a cliff.' },
    { title: 'Hits in minutes — without water', body: 'Dissolves on your tongue in 30 seconds. No pill swallow, no coffee shop line, no waiting for the kettle.' },
    { title: 'A pre-meeting, pre-gym, pre-anything ritual', body: 'Drop a strip when you actually need it — clean, fast, and quietly precise.' },
  ],
  allInOneH2A: 'All-in-One Energy Strip for',
  allInOneH2B: 'focus that lasts',
  allInOneBody: 'Three of the most-trusted energy nutrients in one effortless 3-second ritual. No 4th coffee, no sugary cans, no shaky hands. Just clean focus, on demand.',
  ritualLead: 'Trade the third coffee for a ritual you can actually rely on. NEUVIE Energy Strips are effortless — so peak focus finally feels like self-care.',
  competitorName: 'Typical Energy Drinks',
  pros: [
    'Dissolves in 30 seconds — no water, no can',
    '100 mg caffeine + 100 mg L-Theanine, classic 1:1 ratio',
    'Light citrus flavor — actually pleasant to take',
    'Travel-friendly: airport, car, desk, gym bag',
  ],
  cons: [
    '200+ mg of caffeine with sugar and additives',
    'Jitters, then the inevitable 3 PM crash',
    'Bulky cans, sticky residue, recycling guilt',
    'No L-Theanine — pure stimulation, no smoothing',
  ],
  insideLead: 'Three energy nutrients, precision-dosed. No sugar, no shortcuts.',
  ingredients: [
    { name: 'Caffeine', tag: 'Alertness', dose: '100 mg', desc: 'A clean, considered dose — about a small espresso — for sharper focus without overload.', image: ingCaffeine },
    { name: 'L-Theanine', tag: 'Smooth Focus', dose: '100 mg', desc: 'Smooths the jittery edges of caffeine and supports calm, sustained attention.', image: ingGreenTea },
    { name: 'Vitamin B12', tag: 'Energy Metabolism', dose: '500 mcg', desc: 'Supports normal energy-yielding metabolism — the kind that doesn’t fall off a cliff at 3 PM.', image: ingVitC },
  ],
  tastyBody: 'A bright, natural citrus flavor — sweetened with monk fruit and stevia. No chalky aftertaste, no metallic vitamin bite. Just a 3-second ritual that hits in minutes.',
  fullIngredientList: 'Caffeine Anhydrous (100 mg), L-Theanine (100 mg), Vitamin B12 as Methylcobalamin (500 mcg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Citrus Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
  howToUseText: 'Place one strip on your tongue when you need clean energy and let it dissolve. No water needed. Use up to 2 strips per day, ideally before 4 PM.',
  propsText: 'Vegan, gluten-free, non-GMO, sugar-free, lactose-free. Made in the USA in an FDA-registered, GMP-certified facility.',
  supplementFacts: [
    { name: 'Caffeine (Anhydrous)', amount: '100 mg', dv: '*' },
    { name: 'L-Theanine', amount: '100 mg', dv: '*' },
    { name: 'Vitamin B12 (Methylcobalamin)', amount: '500 mcg', dv: '20,833%' },
  ],
  bundleSubtitle: 'Pair Energy Strips with our other wellness strips and save up to 20%.',
  doctors: sharedDoctors(
    {
      headline: 'A clinically smart caffeine pairing',
      text: 'The 1:1 ratio of L-Theanine to caffeine at 100 mg each is the most-studied combination for sustained attention without the sharpness of caffeine alone — a reasonable choice for adults who want focus without anxiety.',
      tags: ['Focus', 'No Jitters', 'Smooth'],
    },
    {
      headline: 'Faster onset than a capsule',
      text: 'Sublingual delivery means active ingredients enter circulation faster than via swallow-and-digest pathways. For caffeine + L-Theanine, this is meaningful: most users notice effects within 10–15 minutes.',
      tags: ['Fast Onset', 'Compliance', 'Daily Use'],
    },
  ),
  reviewsTeaser: {
    quote: 'I switched from energy drinks and I’m never going back. The focus is sharper, smoother, and I actually sleep at night again.',
    author: 'Tomás R.',
  },
  testimonials: sharedTestimonials(
    { title: 'My new pre-workout', quote: 'I drop one 15 minutes before the gym. Focused, locked in, no shaky hands. And no afternoon crash.', author: 'Bryce M.' },
    { title: 'Goodbye 3 PM crash', quote: 'I used to need two coffees in the afternoon to survive meetings. One strip after lunch is all I need now.', author: 'Aisha K.' },
    { title: 'Cleaner than cold brew', quote: 'No sour stomach, no jitters, no sugar. Just clean focus when I need it. It’s become my desk drawer essential.', author: 'Jenna P.' },
  ),
  faqs: [
    { q: 'How much caffeine is in each strip?', a: '100 mg — roughly a small espresso. We deliberately keep the dose moderate so you can stack it with how you already drink coffee.' },
    { q: 'Will I get the jitters?', a: 'Most people don’t. The 1:1 pairing with 100 mg of L-Theanine is specifically designed to smooth out caffeine’s sharper edges.' },
    { q: 'When should I take it?', a: 'Any time you need focus — before a meeting, workout, or long drive. We recommend not taking it after 4 PM to protect your sleep.' },
    { q: 'Can I take more than one?', a: 'Up to 2 strips per day. Listen to your body — caffeine tolerance varies.' },
    { q: 'What does it taste like?', a: 'Light, natural citrus flavor — sweetened with monk fruit and stevia. No metallic vitamin aftertaste.' },
    { q: 'Where are they made?', a: 'Made in the USA in an FDA-registered, GMP-certified facility. Independently third-party tested.' },
  ],
  descriptionText: 'A fast-dissolving energy strip with 100 mg of clean caffeine, 100 mg of L-Theanine, and 500 mcg of Vitamin B12. Designed to deliver smooth, focused energy in minutes — no jitters, no crash, no water.',
  ingredientsAccordionText: 'Caffeine Anhydrous (100 mg), L-Theanine (100 mg), Vitamin B12 (500 mcg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Citrus Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
};

const cognitiveConfig: PDPConfig = {
  matchHandles: ['cognitive', 'relax', 'nootropic'],
  category: 'Calm Focus',
  headlineMain: 'Cognitive Relax',
  headlineSuffix: 'Strips',
  subtitle: 'L-Theanine + GABA + Magnesium · Calm Focus · NEUVIE™',
  productNoun: 'Cognitive Relax Strip',
  topBadge: 'Save up to 20% Today',
  bottomFlavorBadge: 'PEACH FLAVOR · NON-HABIT FORMING',
  bandIngredients: 'L-THEANINE · GABA · MAGNESIUM',
  reviewCount: '(1,902)',
  clinicalStats: [
    { label: 'Felt calmer within 20 minutes', value: 83 },
    { label: 'Improved focus under stress', value: 76 },
    { label: 'Reduced day-to-day tension', value: 80 },
  ],
  highlightLead: 'reported lower daily stress in',
  highlightValue: '4 weeks',
  clinicalH2A: 'Calming amino acids and minerals for',
  clinicalH2B: 'quiet, focused calm',
  clinicalFootnote: '*Based on a self-reported 4-week consumer perception study with daily NEUVIE Cognitive Relax Strip use. Individual results vary.',
  benefitsKicker: 'Calm Without the Fog',
  benefitsH2A: 'Find your',
  benefitsH2B: 'centered self',
  benefitsLead: 'One small strip. Three calming, clinically-loved nutrients. The kind of calm that doesn’t blur your thinking.',
  benefits: [
    { title: 'Calm, focused clarity', body: 'L-Theanine has been shown to support alpha brain wave activity — that quiet, alert state without drowsiness.' },
    { title: 'Supports a relaxed mood', body: 'GABA is the body’s primary calming neurotransmitter. We pair it with L-Theanine for a smooth, gentle effect.' },
    { title: 'Eases physical tension', body: 'Magnesium glycinate supports muscle relaxation and nervous system balance — calm you can actually feel in your shoulders.' },
    { title: 'A 3-second reset, any time', body: 'No water, no capsules. One peach-flavored strip for when the day starts to feel like a lot.' },
  ],
  allInOneH2A: 'All-in-One Calm Strip for',
  allInOneH2B: 'focused, quiet calm',
  allInOneBody: 'Three of the most-studied calming nutrients in one effortless 3-second ritual. No sedation, no fog, no fight-or-flight crash. Just a steadier you.',
  ritualLead: 'Trade the doom-scroll for a ritual that actually lowers your shoulders. NEUVIE strips are effortless — so calming yourself finally feels like self-care.',
  competitorName: 'Typical Anxiety Pills',
  pros: [
    'Dissolves in 30 seconds — no water needed',
    'L-Theanine + GABA + Magnesium, classic calming stack',
    'Light peach flavor — actually pleasant to take',
    'Non-habit forming, safe for daily use',
  ],
  cons: [
    'Require a prescription and can cause dependency',
    'Sedation that interferes with work and driving',
    'Hard to titrate — easy to under- or over-do',
    'Slow onset via the digestive tract',
  ],
  insideLead: 'Three calming nutrients, precision-dosed. No sedation, no shortcuts.',
  ingredients: [
    { name: 'L-Theanine', tag: 'Quiet Mind', dose: '200 mg', desc: 'A 200 mg dose — the level used in many calm-focus studies — to support a quiet, alert state.', image: ingGreenTea },
    { name: 'GABA', tag: 'Mood Balance', dose: '100 mg', desc: 'The body’s primary calming neurotransmitter, paired with L-Theanine for a smooth, gentle effect.', image: ingValerian },
    { name: 'Magnesium', tag: 'Tension Release', dose: '50 mg', desc: 'A highly-bioavailable form of magnesium that supports muscle relaxation and nervous system balance.', image: ingMagnesium },
  ],
  tastyBody: 'A light, natural peach flavor — sweetened with monk fruit and stevia. No chalky GABA aftertaste, no medicinal bite. Just a 3-second ritual that softens the moment.',
  fullIngredientList: 'L-Theanine (200 mg), GABA (100 mg), Magnesium Glycinate (50 mg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Peach Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
  howToUseText: 'Place one strip on your tongue any time you need to reset — let it dissolve. No water needed. Safe for daily use up to 2 strips per day.',
  propsText: 'Vegan, gluten-free, non-GMO, non-habit forming, lactose-free, no added sugar. Made in the USA in an FDA-registered, GMP-certified facility.',
  supplementFacts: [
    { name: 'L-Theanine', amount: '200 mg', dv: '*' },
    { name: 'GABA', amount: '100 mg', dv: '*' },
    { name: 'Magnesium Glycinate', amount: '50 mg', dv: '12%' },
  ],
  bundleSubtitle: 'Pair Cognitive Relax with our other wellness strips and save up to 20%.',
  doctors: sharedDoctors(
    {
      headline: 'A thoughtful daytime calm stack',
      text: 'A 200 mg L-Theanine dose paired with GABA and magnesium is a measured, non-sedating approach for adults who want to support calm without dulling cognitive function. Useful for high-stress days.',
      tags: ['Calm Focus', 'Non-Sedating', 'Daily Use'],
    },
    {
      headline: 'Lower the friction, lower the stress',
      text: 'For nervous-system support, consistency matters more than dose. A pleasant-tasting dissolvable strip removes the activation energy that often stops people from sticking with a calm-focus routine.',
      tags: ['Stress Support', 'Compliance', 'Routine'],
    },
  ),
  reviewsTeaser: {
    quote: 'I used to feel wired and tired by Wednesday. Now I drop a strip after lunch and I’m calm but still sharp. It’s not sedating — it just lowers the volume.',
    author: 'Priya N.',
  },
  testimonials: sharedTestimonials(
    { title: 'My desk drawer must-have', quote: 'I keep them at my desk for high-pressure days. Within 20 minutes I’m noticeably calmer but I can still actually work.', author: 'Olivia P.' },
    { title: 'Calm without the fog', quote: 'I’ve tried Rx options and didn’t like the haze. This gives me the calm without the cost. My partner can tell when I’ve taken one.', author: 'Sarah J.' },
    { title: 'Travel anxiety, solved', quote: 'I used to dread flying. Now I take one before takeoff. Not sleepy — just present, calm, and not spiraling.', author: 'Maya R.' },
  ),
  faqs: [
    { q: 'Will it make me drowsy?', a: 'No. It’s designed to support calm without sedation, so you can use it during the workday or before social events.' },
    { q: 'How quickly does it work?', a: 'Most people feel the effect within 15–20 minutes thanks to sublingual absorption.' },
    { q: 'Can I take it daily?', a: 'Yes — it’s non-habit forming. Up to 2 strips per day is well-tolerated by most adults.' },
    { q: 'What does it taste like?', a: 'Light, natural peach flavor — sweetened with monk fruit and stevia. Pleasant, never bitter.' },
    { q: 'Is it safe with other supplements?', a: 'Most people tolerate it well with other supplements. If you take prescription medication for mood or sleep, consult your healthcare provider first.' },
    { q: 'Where are they made?', a: 'Made in the USA in an FDA-registered, GMP-certified facility. Independently third-party tested.' },
  ],
  descriptionText: 'A daily dissolving calm-focus strip with 200 mg L-Theanine, 100 mg GABA, and 50 mg Magnesium Glycinate. Designed to support a quiet, alert state — calm you can actually feel, without the fog.',
  ingredientsAccordionText: 'L-Theanine (200 mg), GABA (100 mg), Magnesium Glycinate (50 mg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Peach Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
};

const mushroomConfig: PDPConfig = {
  matchHandles: ['mushroom', 'lion'],
  category: 'Mental Performance',
  headlineMain: 'Mushroom Focus',
  headlineSuffix: 'Strips',
  subtitle: 'Lion’s Mane + Cordyceps + Reishi · Cognitive Support · NEUVIE™',
  productNoun: 'Mushroom Focus Strip',
  topBadge: 'Save up to 20% Today',
  bottomFlavorBadge: 'CHAI FLAVOR · CAFFEINE-FREE',
  bandIngredients: 'LION’S MANE · CORDYCEPS · REISHI',
  reviewCount: '(1,476)',
  clinicalStats: [
    { label: 'Felt sharper mental clarity', value: 79 },
    { label: 'Sustained focus longer', value: 74 },
    { label: 'Improved morning readiness', value: 71 },
  ],
  highlightLead: 'sharper mental clarity by',
  highlightValue: 'Week 4',
  clinicalH2A: 'Functional mushrooms for',
  clinicalH2B: 'sharper, calmer cognition',
  clinicalFootnote: '*Based on a self-reported 4-week consumer perception study with daily NEUVIE Mushroom Focus Strip use. Individual results vary.',
  benefitsKicker: 'Functional Focus, No Caffeine',
  benefitsH2A: 'Think as your',
  benefitsH2B: 'sharper self',
  benefitsLead: 'One small strip. Three of the most-studied functional mushrooms. Cognitive support that doesn’t come with a crash.',
  benefits: [
    { title: 'Supports mental clarity', body: 'Lion’s Mane is traditionally used to support cognitive function — clarity and sharpness over time, not a one-time hit.' },
    { title: 'Steady, all-day stamina', body: 'Cordyceps has been used in traditional practice to support stamina and oxygen efficiency — useful for long working days.' },
    { title: 'Calm under pressure', body: 'Reishi is the classic adaptogenic mushroom — long used to support a balanced response to daily stress.' },
    { title: '3-second ritual, zero caffeine', body: 'Stack this with your morning coffee — or replace it. Caffeine-free, dissolves in seconds.' },
  ],
  allInOneH2A: 'All-in-One Mushroom Strip for',
  allInOneH2B: 'clean cognitive support',
  allInOneBody: 'Three of the most-studied functional mushrooms in one effortless 3-second ritual. No earthy powders, no bulky bottles, no measuring tinctures. Just clean cognitive support, daily.',
  ritualLead: 'Trade the chalky mushroom powder shake for a ritual you’ll actually keep. NEUVIE strips are effortless — so brain care finally feels like self-care.',
  competitorName: 'Typical Mushroom Powders',
  pros: [
    'Dissolves in 30 seconds — no water, no blender',
    'Lion’s Mane + Cordyceps + Reishi, smartly stacked',
    'Light chai flavor — actually pleasant to take',
    'Caffeine-free: works alongside (or instead of) coffee',
  ],
  cons: [
    'Earthy, gritty taste in coffee or smoothies',
    'Hard to dose precisely day to day',
    'Bulky tubs, sticky scoops, kitchen residue',
    'Easy to skip when life gets busy',
  ],
  insideLead: 'Three functional mushrooms, precision-dosed. No filler, no shortcuts.',
  ingredients: [
    { name: 'Lion’s Mane', tag: 'Mental Clarity', dose: '500 mg', desc: 'A culinary-medicinal mushroom traditionally used to support cognitive function and mental clarity.', image: ingLionsMane },
    { name: 'Cordyceps', tag: 'Stamina', dose: '250 mg', desc: 'Traditionally used to support stamina, oxygen efficiency, and sustained energy throughout the day.', image: ingCordyceps },
    { name: 'Reishi', tag: 'Adaptogen', dose: '250 mg', desc: 'The classic adaptogenic mushroom — supports a balanced response to everyday stress.', image: ingCordyceps },
  ],
  tastyBody: 'A warm, natural chai flavor — sweetened with monk fruit and stevia. No earthy mushroom aftertaste, no chalk. Just a 3-second ritual that feels like a small ceremony.',
  fullIngredientList: 'Lion’s Mane Extract (500 mg), Cordyceps Extract (250 mg), Reishi Extract (250 mg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Chai Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
  howToUseText: 'Place one strip on your tongue daily and let it dissolve. No water needed. For visible cognitive benefits, use consistently for 4–8 weeks.',
  propsText: 'Vegan, gluten-free, non-GMO, caffeine-free, lactose-free, no added sugar. Made in the USA in an FDA-registered, GMP-certified facility.',
  supplementFacts: [
    { name: 'Lion’s Mane Extract', amount: '500 mg', dv: '*' },
    { name: 'Cordyceps Extract', amount: '250 mg', dv: '*' },
    { name: 'Reishi Extract', amount: '250 mg', dv: '*' },
  ],
  bundleSubtitle: 'Pair Mushroom Focus with our other wellness strips and save up to 20%.',
  doctors: sharedDoctors(
    {
      headline: 'A thoughtful functional mushroom stack',
      text: 'The Lion’s Mane / Cordyceps / Reishi trio is a well-balanced combination — clarity, stamina, and adaptogenic support. For patients curious about functional mushrooms, this is a more practical format than messy powders or capsules.',
      tags: ['Clarity', 'Stamina', 'Adaptogen'],
    },
    {
      headline: 'Compliance is everything',
      text: 'Functional mushrooms work over weeks, not minutes — which means the only thing that matters is whether someone actually takes them daily. A pleasant strip removes nearly every excuse not to.',
      tags: ['Daily Use', 'Compliance', 'Cognition'],
    },
  ),
  reviewsTeaser: {
    quote: 'I’ve been trying to take Lion’s Mane powder for a year and never stuck with it. Six weeks in on the strips and my afternoon thinking is noticeably sharper.',
    author: 'Marcus T.',
  },
  testimonials: sharedTestimonials(
    { title: 'Sharper afternoons', quote: 'I take one with my morning coffee. By week 3 my 2 PM brain fog was just… gone. I feel sharper longer.', author: 'Naomi K.' },
    { title: 'Coffee replacement for me', quote: 'I cut my afternoon coffee out completely. The Cordyceps gives me a different kind of energy — calmer, steadier, more focused.', author: 'Anita V.' },
    { title: 'My calm-focus daily', quote: 'I love that it’s caffeine-free. I take it on weekends too. It’s become part of how I take care of my brain.', author: 'Hannah L.' },
  ),
  faqs: [
    { q: 'Will I feel it right away?', a: 'Functional mushrooms work over weeks, not minutes. Most people notice sharper, sustained focus after 3–4 weeks of consistent daily use.' },
    { q: 'Does it have caffeine?', a: 'No — it’s 100% caffeine-free. You can take it alongside coffee, or use it as your afternoon coffee replacement.' },
    { q: 'How do I take it?', a: 'Place one strip on your tongue and let it dissolve daily. No water, no swallowing.' },
    { q: 'What does it taste like?', a: 'Light, natural chai flavor — sweetened with monk fruit and stevia. No earthy mushroom aftertaste.' },
    { q: 'Are these strips vegan and gluten-free?', a: 'Yes. Vegan, gluten-free, non-GMO, lactose-free, and made with no added sugar.' },
    { q: 'Where are they made?', a: 'Made in the USA in an FDA-registered, GMP-certified facility. Independently third-party tested.' },
  ],
  descriptionText: 'A daily dissolving cognitive support strip with 500 mg Lion’s Mane, 250 mg Cordyceps, and 250 mg Reishi extracts. Designed to support mental clarity, sustained stamina, and adaptogenic balance — caffeine-free, no water, no powders.',
  ingredientsAccordionText: 'Lion’s Mane Extract (500 mg), Cordyceps Extract (250 mg), Reishi Extract (250 mg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Chai Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
};

const hangoverConfig: PDPConfig = {
  matchHandles: ['hangover'],
  category: 'Recovery',
  headlineMain: 'Hangover Recovery',
  headlineSuffix: 'Strips',
  subtitle: 'DHM + Curcumin + Grape Seed · Morning Recovery · NEUVIE™',
  productNoun: 'Hangover Recovery Strip',
  topBadge: 'Save up to 20% Today',
  bottomFlavorBadge: 'MANGO–ORANGE · TAKE BEFORE BED',
  bandIngredients: 'DHM · CURCUMIN · GRAPE SEED',
  reviewCount: '(2,118)',
  clinicalStats: [
    { label: 'Felt better the next morning', value: 88 },
    { label: 'Reduced headache severity', value: 81 },
    { label: 'Faster return to normal', value: 84 },
  ],
  highlightLead: 'morning recovery faster by',
  highlightValue: '+74%',
  clinicalH2A: 'Plant-powered ingredients for',
  clinicalH2B: 'faster mornings, easier recoveries',
  clinicalFootnote: '*Based on a self-reported consumer perception study with NEUVIE Hangover Recovery Strip use the night before. Individual results vary.',
  benefitsKicker: 'A Better Tomorrow Morning',
  benefitsH2A: 'Show up as your',
  benefitsH2B: 'recovered self',
  benefitsLead: 'One small strip before bed. Three of the most-studied recovery botanicals. Because you’re worth more than a wasted Saturday.',
  benefits: [
    { title: 'Multi-symptom morning support', body: 'A thoughtfully-built blend designed to support the body the morning after — headaches, fatigue, and general discomfort.' },
    { title: 'Supports liver function', body: 'Andrographis and Phyllanthus have been traditionally valued for liver-support — added because recovery starts at the source.' },
    { title: 'Healthy inflammatory response', body: 'Curcuma Longa and Grape Seed support a normal inflammatory response — what your body works hardest at overnight.' },
    { title: '3-second ritual, before bed', body: 'No pills to choke down at 2 AM. One mango–orange strip on your tongue and you’re done.' },
  ],
  allInOneH2A: 'All-in-One Recovery Strip for',
  allInOneH2B: 'easier mornings',
  allInOneBody: 'Three of the most-studied recovery botanicals in one effortless 3-second ritual. No bulky drinks, no morning capsules with a dry mouth. Just one strip before bed.',
  ritualLead: 'Trade the headache and the regret for a ritual that actually has your back. NEUVIE strips are effortless — so taking care of tomorrow finally feels like self-care.',
  competitorName: 'Typical Hangover Pills',
  pros: [
    'Dissolves in 30 seconds — no water needed',
    'DHM + Curcumin + Grape Seed + Andrographis + Phyllanthus',
    'Light mango–orange flavor — easy before bed',
    'Travel-friendly: throw it in your wallet',
  ],
  cons: [
    'Hard to swallow when you’re already tired',
    'Big bottles, small doses',
    'Slow absorption when you need it fast',
    'Easy to forget at the worst possible moment',
  ],
  insideLead: 'Five recovery botanicals, precision-dosed. No filler, no shortcuts.',
  ingredients: [
    { name: 'DHM (Date) Extract', tag: 'Liver Support', dose: '*', desc: 'A traditional botanical valued for supporting the body’s natural response to alcohol.', image: ingTurmeric },
    { name: 'Curcuma Longa', tag: 'Inflammation', dose: '*', desc: 'The active in turmeric — supports a normal inflammatory response after a night out.', image: ingTurmeric },
    { name: 'Grape Seed Extract', tag: 'Antioxidant', dose: '*', desc: 'A potent source of antioxidants traditionally used to support cellular recovery.', image: ingGrapeSeed },
  ],
  tastyBody: 'A light, natural mango–orange flavor — sweetened with monk fruit and stevia. No medicinal aftertaste. Just a 3-second ritual that fits the moment before bed.',
  fullIngredientList: 'Phoenix Dactylifera (Date) Extract, Curcuma Longa Extract, Vitis Vinifera (Grape Seed) Extract, Andrographis Paniculata Extract, Phyllanthus Niruri Extract, Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Mango & Orange Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
  howToUseText: 'Place one strip on your tongue before bed and let it dissolve completely. No water needed. For best results, drink water and rest.',
  propsText: 'Vegan, gluten-free, non-GMO, sugar-free, lactose-free. Made in the USA in an FDA-registered, GMP-certified facility.',
  supplementFacts: [
    { name: 'Phoenix Dactylifera (Date) Extract', amount: '*', dv: '*' },
    { name: 'Curcuma Longa Extract', amount: '*', dv: '*' },
    { name: 'Vitis Vinifera Extract', amount: '*', dv: '*' },
  ],
  bundleSubtitle: 'Pair Hangover Recovery with our other wellness strips and save up to 20%.',
  doctors: sharedDoctors(
    {
      headline: 'A practical, plant-based morning-after blend',
      text: 'A blend featuring DHM-related botanicals together with Curcumin and Grape Seed is a reasonable adjunct to a basic morning-after recovery approach — alongside hydration and sleep.',
      tags: ['Recovery', 'Botanical', 'Liver Support'],
    },
    {
      headline: 'Compliance at the worst possible moment',
      text: 'The night you most need a recovery supplement is the night you’re least likely to swallow a capsule. A pleasant-tasting dissolvable strip is a meaningful design choice for real-world adherence.',
      tags: ['Format', 'Convenience', 'Real-Life'],
    },
  ),
  reviewsTeaser: {
    quote: 'I take one before bed after a wedding or work event. The next morning is noticeably easier. I don’t love it — I rely on it.',
    author: 'Caroline F.',
  },
  testimonials: sharedTestimonials(
    { title: 'My wedding-season essential', quote: 'I had four weddings this summer. The strips were in every clutch. Mornings after were so much easier — I actually showed up for brunch.', author: 'Brittany M.' },
    { title: 'My husband swears by them', quote: 'He was always wrecked after work events. He takes one before bed now and the next morning is night-and-day better.', author: 'Linda S.' },
    { title: 'Finally — no pills at 2 AM', quote: 'I’ve tried every hangover pill. The strips are the only thing I actually remember to take when I get home tipsy. Game changer.', author: 'Daria K.' },
  ),
  faqs: [
    { q: 'When should I take it?', a: 'Take one strip before bed — that’s when your body does the most recovery work. Drink water and rest.' },
    { q: 'How is this different from hangover pills?', a: 'You take it when it actually matters — before bed, not the next morning. And you don’t have to swallow a pill while tipsy and tired.' },
    { q: 'Can I take more than one?', a: 'One strip before bed is the recommended dose. More is not necessarily more.' },
    { q: 'What does it taste like?', a: 'Light, natural mango–orange flavor — sweetened with monk fruit and stevia. Easy to take, even tired.' },
    { q: 'Is it vegan and sugar-free?', a: 'Yes. Vegan, gluten-free, non-GMO, sugar-free.' },
    { q: 'Where are they made?', a: 'Made in the USA in an FDA-registered, GMP-certified facility. Independently third-party tested.' },
  ],
  descriptionText: 'A dissolving morning-recovery strip with DHM (Date), Curcumin, Grape Seed, Andrographis, and Phyllanthus extracts. Designed to be taken before bed to support the body’s natural overnight recovery — no pills, no chalky drink at 2 AM.',
  ingredientsAccordionText: 'Phoenix Dactylifera (Date) Extract, Curcuma Longa Extract, Vitis Vinifera Extract, Andrographis Paniculata Extract, Phyllanthus Niruri Extract, Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Mango & Orange Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
};

const collagenConfig: PDPConfig = {
  matchHandles: ['beauty', 'collagen'],
  category: 'Beauty Wellness',
  headlineMain: 'Beauty + Collagen',
  headlineSuffix: 'Strips',
  subtitle: 'Collagen Peptides + Hyaluronic Acid + Vitamin C · Beauty Support · NEUVIE™',
  productNoun: 'Beauty Strip',
  topBadge: 'Save up to 20% Today',
  bottomFlavorBadge: 'PEACH–ROSE FLAVOR · DAILY GLOW',
  bandIngredients: 'COLLAGEN · HYALURONIC ACID · VITAMIN C',
  reviewCount: '(2,564)',
  clinicalStats: [
    { label: 'Smoother, more hydrated skin', value: 84 },
    { label: 'Improved skin radiance', value: 78 },
    { label: 'Firmer, plumper-looking complexion', value: 75 },
  ],
  highlightLead: 'self-reported skin hydration up by',
  highlightValue: '+58%',
  clinicalH2A: 'Clinically-loved beauty nutrients for',
  clinicalH2B: 'visibly radiant, hydrated skin',
  clinicalFootnote: '*Based on a self-reported 8-week consumer perception study with daily NEUVIE Beauty + Collagen Strip use. Individual results vary.',
  benefitsKicker: 'Beauty Begins Within',
  benefitsH2A: 'Glow as your',
  benefitsH2B: 'most radiant self',
  benefitsLead: 'One small strip. Three of the most-loved beauty nutrients. A daily ritual that finally fits the way you actually live.',
  benefits: [
    { title: 'Supports skin elasticity', body: 'Collagen peptides are the building blocks of youthful-looking skin — a daily dose supports elasticity over time.' },
    { title: 'Deep hydration from within', body: 'Hyaluronic acid is known for its ability to bind water in the skin — for a plumper, more dewy appearance.' },
    { title: 'Brightens & evens tone', body: 'Vitamin C is a powerful antioxidant that supports a brighter, more even-looking complexion.' },
    { title: '3-second ritual you’ll actually keep', body: 'No water, no powders. One peach–rose strip on your tongue — so glowing finally feels effortless.' },
  ],
  allInOneH2A: 'All-in-One Beauty Strip for',
  allInOneH2B: 'radiance from within',
  allInOneBody: 'Three of the most-loved beauty nutrients in one effortless 3-second ritual. No scooping powders, no chalky drinks, no measuring serums. Just one strip — taken consistently — to support how you look and feel.',
  ritualLead: 'Trade the collagen powder shaker for a ritual you’ll actually look forward to. NEUVIE strips are effortless — so skin care from within finally feels easy.',
  competitorName: 'Typical Collagen Powders',
  pros: [
    'Dissolves in 30 seconds — no water, no shaker',
    'Collagen + Hyaluronic Acid + Vitamin C',
    'Light peach–rose flavor — actually pleasant',
    'Travel-friendly: drop a strip, go anywhere',
  ],
  cons: [
    'Bulky tubs, messy scoops, clumpy in coffee',
    'Easy to skip when life gets busy',
    'Often under-dosed with fillers',
    'Hard to take consistently for 8+ weeks',
  ],
  insideLead: 'Three beauty nutrients, precision-dosed. No filler, no shortcuts.',
  ingredients: [
    { name: 'Collagen Peptides', tag: 'Elasticity', dose: '500 mg', desc: 'Hydrolyzed Type I & III collagen peptides — the building blocks of youthful-looking skin.', image: ingCollagen },
    { name: 'Hyaluronic Acid', tag: 'Hydration', dose: '50 mg', desc: 'Helps bind water in the skin — for a more hydrated, plumper, dewy look.', image: ingHyaluronic },
    { name: 'Vitamin C', tag: 'Radiance', dose: '90 mg', desc: 'A powerful antioxidant that supports collagen synthesis and a brighter complexion.', image: ingVitC },
  ],
  tastyBody: 'A light, natural peach–rose flavor — sweetened with monk fruit and stevia. No chalky aftertaste, no fishy collagen note. Just a 3-second ritual that feels like a treat.',
  fullIngredientList: 'Hydrolyzed Collagen Peptides (500 mg), Hyaluronic Acid (50 mg), Vitamin C as L-Ascorbic Acid (90 mg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Peach & Rose Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
  howToUseText: 'Place one strip on your tongue daily and let it dissolve. No water needed. For visible results, use consistently for 8–12 weeks.',
  propsText: 'Gluten-free, non-GMO, lactose-free, no added sugar. Made in the USA in an FDA-registered, GMP-certified facility. Note: contains marine-sourced collagen.',
  supplementFacts: [
    { name: 'Hydrolyzed Collagen Peptides', amount: '500 mg', dv: '*' },
    { name: 'Hyaluronic Acid', amount: '50 mg', dv: '*' },
    { name: 'Vitamin C (L-Ascorbic Acid)', amount: '90 mg', dv: '100%' },
  ],
  bundleSubtitle: 'Pair Beauty + Collagen with our other wellness strips and save up to 20%.',
  doctors: sharedDoctors(
    {
      headline: 'A smart triple for visible skin support',
      text: 'Collagen peptides combined with Hyaluronic Acid and Vitamin C is a clinically-coherent stack. Vitamin C is a cofactor for collagen synthesis, and the addition of HA reflects current trends in skin-from-within formulation.',
      tags: ['Elasticity', 'Hydration', 'Brightness'],
    },
    {
      headline: 'A format people actually stick with',
      text: 'For collagen, the limiting factor isn’t the molecule — it’s daily compliance over weeks. A pleasant strip is far more likely to be taken every day for 8+ weeks than a tub of powder, which is what the data requires.',
      tags: ['Daily Use', 'Compliance', '8-Week Window'],
    },
  ),
  reviewsTeaser: {
    quote: 'I’ve done collagen powders for years and never finished a tub. With the strips I’ve actually been consistent — and at week 10, the difference is on my face.',
    author: 'Vanessa L.',
  },
  testimonials: sharedTestimonials(
    { title: 'My skin is plumper at 41', quote: 'I’ve done the powders. The strips are the only thing I’ve stuck with for 12 weeks straight. My makeup sits differently now.', author: 'Charlotte B.' },
    { title: 'Glow that everyone notices', quote: 'My friends keep asking what I changed. I tell them — one strip a day, no pills, no shakes. The taste is honestly amazing.', author: 'Rita N.' },
    { title: 'Finally finished a routine', quote: 'I never finished a collagen tub before. With the strips I’m on month 3 and my skin feels softer and bouncier.', author: 'Selena P.' },
  ),
  faqs: [
    { q: 'When will I see results?', a: 'Most people notice softer, more hydrated skin within 4–6 weeks. Visible firmness improvements typically appear after 8–12 weeks of daily use.' },
    { q: 'How do I take it?', a: 'Place one strip on your tongue and let it dissolve daily. No water needed.' },
    { q: 'Is the collagen vegan?', a: 'No — we use marine-sourced hydrolyzed collagen for bioavailability and amino acid profile. For a vegan option, see our Hair, Skin & Nails Strips.' },
    { q: 'What does it taste like?', a: 'Light, natural peach–rose flavor — sweetened with monk fruit and stevia. No fishy aftertaste.' },
    { q: 'Is it gluten-free?', a: 'Yes. Gluten-free, non-GMO, lactose-free, no added sugar.' },
    { q: 'Where are they made?', a: 'Made in the USA in an FDA-registered, GMP-certified facility. Independently third-party tested.' },
  ],
  descriptionText: 'A daily dissolving beauty strip with 500 mg hydrolyzed Collagen Peptides, 50 mg Hyaluronic Acid, and 90 mg Vitamin C. Designed to support skin elasticity, hydration, and radiance from within — no shaker, no scoops, no chalky drink.',
  ingredientsAccordionText: 'Hydrolyzed Collagen Peptides (500 mg), Hyaluronic Acid (50 mg), Vitamin C (90 mg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Peach & Rose Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
};

// =====================================================
// PUBLIC LOOKUP
// =====================================================

const ALL_CONFIGS: PDPConfig[] = [
  sleepConfig,
  energyConfig,
  cognitiveConfig,
  mushroomConfig,
  hangoverConfig,
  collagenConfig,
];

export function getPDPConfig(handle: string): PDPConfig | null {
  const h = (handle || '').toLowerCase();
  // Exclude Hair/Skin/Nails (handled separately by HairSkinNailsPDP) and Probiotic (ProbioticPDP)
  if (h.includes('hair') && (h.includes('skin') || h.includes('nail'))) return null;
  if (h.includes('probiotic') && h.includes('metabolism')) return null;

  for (const cfg of ALL_CONFIGS) {
    if (cfg.matchHandles.some((m) => h.includes(m))) return cfg;
  }
  return null;
}
