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
import ingCalcium from '@/assets/ingredient-calcium.jpg';
import ingK2 from '@/assets/ingredient-vitamin-k2.jpg';
import ingGinger from '@/assets/ingredient-ginger.jpg';
import ingPrebiotic from '@/assets/ingredient-prebiotic.jpg';
import ingMaca from '@/assets/ingredient-maca.jpg';
import ingShilajit from '@/assets/ingredient-shilajit.jpg';
import ingSaffron from '@/assets/ingredient-saffron.jpg';
import ingChromium from '@/assets/ingredient-chromium.jpg';
import ingIron from '@/assets/ingredient-iron.jpg';

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

const boneConfig: PDPConfig = {
  matchHandles: ['bone'],
  category: 'Bone & Joint Wellness',
  headlineMain: 'Bone Support',
  headlineSuffix: 'Strips',
  subtitle: 'Vitamin D3 + K2 + Calcium · Bone Strength · NEUVIE™',
  productNoun: 'Bone Support Strip',
  topBadge: 'Save up to 20% Today',
  bottomFlavorBadge: 'VANILLA FLAVOR · DAILY BONE CARE',
  bandIngredients: 'VITAMIN D3 · VITAMIN K2 · CALCIUM',
  reviewCount: '(1,284)',
  clinicalStats: [
    { label: 'Reported better daily mobility', value: 81 },
    { label: 'Improved sense of bone strength', value: 76 },
    { label: 'Felt more supported during activity', value: 79 },
  ],
  highlightLead: 'D3 + K2 absorption supported in',
  highlightValue: '15 min',
  clinicalH2A: 'Clinically-paired nutrients for',
  clinicalH2B: 'long-term bone strength',
  clinicalFootnote: '*Based on a self-reported consumer perception study with daily NEUVIE Bone Support Strip use. Individual results vary.',
  benefitsKicker: 'Bone Care, Built In',
  benefitsH2A: 'Move as your',
  benefitsH2B: 'strongest self',
  benefitsLead: 'One small strip. Three nutrients your skeleton actually needs. Daily bone care that finally fits the way you live.',
  benefits: [
    { title: 'Supports bone strength', body: '1,000 IU of Vitamin D3 — a clinically-relevant dose — to support calcium absorption and bone health.' },
    { title: 'Calcium where it belongs', body: 'Vitamin K2 (MK-7) helps direct calcium to bones and away from soft tissue — the classic D3+K2 pairing.' },
    { title: 'Daily calcium top-up', body: 'A bioavailable calcium dose to complement what you’re already getting from food.' },
    { title: '3-second ritual you’ll actually keep', body: 'No water, no horse-pill calcium tablets. One vanilla-flavored strip — taken daily.' },
  ],
  allInOneH2A: 'All-in-One Bone Strip for',
  allInOneH2B: 'lifelong skeletal support',
  allInOneBody: 'Three of the most-studied bone nutrients in one effortless 3-second ritual. No chalky calcium pills, no oily D3 softgels, no separate bottles. Just one strip — daily.',
  ritualLead: 'Trade the giant calcium tablet for a ritual you’ll actually keep. NEUVIE strips are effortless — so caring for your bones finally feels like self-care.',
  competitorName: 'Typical Calcium Tablets',
  pros: [
    'Dissolves in 30 seconds — no water needed',
    'Vitamin D3 + K2 (MK-7) + Calcium, smartly paired',
    'Light vanilla flavor — actually pleasant to take',
    'Travel-friendly: drop a strip in your wallet',
  ],
  cons: [
    'Large chalky pills that are hard to swallow',
    'Often missing K2 — calcium can deposit in the wrong places',
    'Causes constipation and stomach discomfort',
    'Easy to forget — bottle ends up in the medicine cabinet',
  ],
  insideLead: 'Three bone nutrients, precision-dosed. No filler, no shortcuts.',
  ingredients: [
    { name: 'Vitamin D3', tag: 'Absorption', dose: '1,000 IU', desc: 'A clinically-relevant dose of cholecalciferol — supports calcium absorption and bone health.', image: ingD3 },
    { name: 'Vitamin K2 (MK-7)', tag: 'Direction', dose: '45 mcg', desc: 'Helps direct calcium to your bones and teeth — the classic D3+K2 pairing recommended by clinicians.', image: ingK2 },
    { name: 'Calcium', tag: 'Foundation', dose: '100 mg', desc: 'A bioavailable daily top-up to complement the calcium you’re already getting from food.', image: ingCalcium },
  ],
  tastyBody: 'A light, natural vanilla flavor — sweetened with monk fruit and stevia. No chalky calcium aftertaste. Just a 3-second ritual that feels like self-care.',
  fullIngredientList: 'Vitamin D3 as Cholecalciferol (1,000 IU), Vitamin K2 as MK-7 (45 mcg), Calcium (100 mg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Vanilla Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
  howToUseText: 'Place one strip on your tongue daily and let it dissolve. No water needed. For long-term bone health, use consistently.',
  propsText: 'Vegan, gluten-free, non-GMO, lactose-free, no added sugar. Made in the USA in an FDA-registered, GMP-certified facility.',
  supplementFacts: [
    { name: 'Vitamin D3 (Cholecalciferol)', amount: '1,000 IU', dv: '125%' },
    { name: 'Vitamin K2 (MK-7)', amount: '45 mcg', dv: '38%' },
    { name: 'Calcium', amount: '100 mg', dv: '8%' },
  ],
  bundleSubtitle: 'Pair Bone Support with our other wellness strips and save up to 20%.',
  doctors: sharedDoctors(
    {
      headline: 'A clinically-coherent bone stack',
      text: 'The D3+K2 pairing is one of the most well-supported combinations in bone health — D3 supports calcium absorption, K2 helps direct it to bone. A measured, sensible daily approach.',
      tags: ['D3+K2', 'Absorption', 'Daily'],
    },
    {
      headline: 'Compliance over decades',
      text: 'Bone health is a long-game investment — what matters is daily consistency over years. A pleasant-tasting dissolvable strip is much more sustainable than a horse-pill calcium tablet.',
      tags: ['Long Term', 'Compliance', 'Bone Health'],
    },
  ),
  reviewsTeaser: {
    quote: 'My doctor told me at 48 I needed D3 + K2 daily. I tried capsules and quit twice. The strips I’ve taken every day for 5 months.',
    author: 'Patricia M.',
  },
  testimonials: sharedTestimonials(
    { title: 'My new daily habit', quote: 'I was forgetting my calcium pills every single day. With the strips it’s effortless — I take one with my coffee.', author: 'Diane R.' },
    { title: 'Doctor-approved daily', quote: 'My doctor recommended D3+K2 together. The strips are honestly the easiest way I’ve found to actually take them every day.', author: 'Karen P.' },
    { title: 'Easier than swallowing pills', quote: 'Calcium tablets always upset my stomach. The strips dissolve cleanly and I don’t even think about it.', author: 'Rachel T.' },
  ),
  faqs: [
    { q: 'Why D3 + K2 together?', a: 'Vitamin D3 helps your body absorb calcium, while K2 (MK-7) helps direct that calcium to your bones rather than soft tissue. It’s the modern, evidence-aligned pairing.' },
    { q: 'How much calcium will I get?', a: 'Each strip provides 100 mg of bioavailable calcium — a daily top-up designed to complement your diet, not replace it.' },
    { q: 'Can I take it with food?', a: 'Yes. D3 and K2 are fat-soluble, so taking your strip near a meal that contains some fat may modestly improve absorption.' },
    { q: 'What does it taste like?', a: 'Light, natural vanilla flavor — sweetened with monk fruit and stevia. No chalky calcium aftertaste.' },
    { q: 'Is it vegan and gluten-free?', a: 'Yes. Vegan, gluten-free, non-GMO, lactose-free, and made with no added sugar.' },
    { q: 'Where are they made?', a: 'Made in the USA in an FDA-registered, GMP-certified facility. Independently third-party tested.' },
  ],
  descriptionText: 'A daily dissolving bone support strip with 1,000 IU Vitamin D3, 45 mcg Vitamin K2 (MK-7), and 100 mg Calcium. Designed to support long-term bone strength and proper calcium utilization — no chalky pills, no water.',
  ingredientsAccordionText: 'Vitamin D3 (1,000 IU), Vitamin K2 MK-7 (45 mcg), Calcium (100 mg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Vanilla Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
};

const digestiveConfig: PDPConfig = {
  matchHandles: ['digestive', 'gut'],
  category: 'Digestive Wellness',
  headlineMain: 'Digestive + Gut',
  headlineSuffix: 'Strips',
  subtitle: 'Ginger + Digestive Enzymes + Prebiotic Fiber · Gut Comfort · NEUVIE™',
  productNoun: 'Digestive Strip',
  topBadge: 'Save up to 20% Today',
  bottomFlavorBadge: 'GINGER–LEMON · TAKE BEFORE MEALS',
  bandIngredients: 'GINGER · ENZYMES · PREBIOTICS',
  reviewCount: '(2,047)',
  clinicalStats: [
    { label: 'Less bloating after meals', value: 84 },
    { label: 'Improved digestive comfort', value: 79 },
    { label: 'Felt lighter day-to-day', value: 77 },
  ],
  highlightLead: 'reduced post-meal bloating in',
  highlightValue: '2 weeks',
  clinicalH2A: 'Plant-powered ingredients for',
  clinicalH2B: 'lighter, more comfortable digestion',
  clinicalFootnote: '*Based on a self-reported consumer perception study with daily NEUVIE Digestive + Gut Strip use. Individual results vary.',
  benefitsKicker: 'Digestion, Reset',
  benefitsH2A: 'Feel as your',
  benefitsH2B: 'lightest self',
  benefitsLead: 'One small strip. Ginger, enzymes, and prebiotic fiber. The kind of gut support that doesn’t require choking down a horse pill before lunch.',
  benefits: [
    { title: 'Eases post-meal bloating', body: 'Ginger has been used for centuries to support digestive comfort — paired here with enzymes for a modern format.' },
    { title: 'Helps break down food', body: 'Digestive enzymes support the breakdown of fats, proteins, and carbs — so meals sit easier.' },
    { title: 'Feeds the good bacteria', body: 'Prebiotic fiber acts as fuel for the beneficial bacteria already in your gut.' },
    { title: '3-second ritual before meals', body: 'No water, no capsules at the table. One ginger–lemon strip on your tongue — and you’re good.' },
  ],
  allInOneH2A: 'All-in-One Digestive Strip for',
  allInOneH2B: 'a happier gut',
  allInOneBody: 'Three of the most-trusted digestive nutrients in one effortless 3-second ritual. No big enzyme pills, no chalky fiber drinks, no separate bottles. Just one strip — before meals.',
  ritualLead: 'Trade the post-lunch bloat for a ritual you’ll actually keep. NEUVIE strips are effortless — so gut care finally feels easy.',
  competitorName: 'Typical Digestive Pills',
  pros: [
    'Dissolves in 30 seconds — no water at the table',
    'Ginger + Enzymes + Prebiotic Fiber, smart trio',
    'Light ginger–lemon flavor — actually pleasant',
    'Travel-friendly: airport food, travel meals, hotels',
  ],
  cons: [
    'Large enzyme capsules are hard to swallow with a full stomach',
    'Chalky fiber drinks no one finishes',
    'Often missing prebiotics — only enzymes or only fiber',
    'Easy to forget in the moment you actually need them',
  ],
  insideLead: 'Three digestive nutrients, precision-dosed. No filler, no shortcuts.',
  ingredients: [
    { name: 'Ginger Extract', tag: 'Soothing', dose: '100 mg', desc: 'Traditionally used for centuries to ease digestive discomfort — a warm, grounding ingredient.', image: ingGinger },
    { name: 'Digestive Enzymes', tag: 'Breakdown', dose: '50 mg', desc: 'A blend including amylase, protease, and lipase to support the breakdown of carbs, protein, and fat.', image: ingTurmeric },
    { name: 'Prebiotic Fiber', tag: 'Gut Flora', dose: '200 mg', desc: 'Soluble fiber that acts as fuel for the beneficial bacteria already in your gut.', image: ingPrebiotic },
  ],
  tastyBody: 'A bright, natural ginger–lemon flavor — sweetened with monk fruit and stevia. No chalky enzyme taste. Just a 3-second ritual that fits in right before you eat.',
  fullIngredientList: 'Ginger Root Extract (100 mg), Digestive Enzyme Blend (50 mg: amylase, protease, lipase), Prebiotic Fiber (200 mg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Ginger & Lemon Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
  howToUseText: 'Place one strip on your tongue 10–15 minutes before a meal and let it dissolve. No water needed. Up to 2 strips per day.',
  propsText: 'Vegan, gluten-free, non-GMO, lactose-free, no added sugar. Made in the USA in an FDA-registered, GMP-certified facility.',
  supplementFacts: [
    { name: 'Ginger Root Extract', amount: '100 mg', dv: '*' },
    { name: 'Digestive Enzyme Blend', amount: '50 mg', dv: '*' },
    { name: 'Prebiotic Fiber', amount: '200 mg', dv: '*' },
  ],
  bundleSubtitle: 'Pair Digestive + Gut with our other wellness strips and save up to 20%.',
  doctors: sharedDoctors(
    {
      headline: 'A sensible pre-meal stack',
      text: 'Combining ginger with a basic enzyme blend and prebiotic fiber is a thoughtful, low-risk approach for adults dealing with occasional post-meal bloating or discomfort.',
      tags: ['Bloating', 'Enzymes', 'Prebiotic'],
    },
    {
      headline: 'The right format at the right moment',
      text: 'A digestive supplement only works if it’s taken at the right time. A pleasant strip on your tongue before a meal is far more likely to actually happen than a horse-pill enzyme capsule.',
      tags: ['Pre-Meal', 'Compliance', 'Comfort'],
    },
  ),
  reviewsTeaser: {
    quote: 'I had bloating after almost every dinner. Two weeks of taking one strip before meals and it’s noticeably better. Easier than any pill I’ve tried.',
    author: 'Megan T.',
  },
  testimonials: sharedTestimonials(
    { title: 'No more after-dinner bloat', quote: 'I take one before dinner and the heavy feeling is just… not there. I feel lighter going to bed.', author: 'Rosa K.' },
    { title: 'My travel-meal lifesaver', quote: 'Airline food and hotel breakfasts used to wreck me. The strips fit in my wallet and I’m fine within minutes.', author: 'Janelle P.' },
    { title: 'Gentle and effective', quote: 'I’ve tried harsh detox products that backfired. This is gentle — just real relief without any drama.', author: 'Tara L.' },
  ),
  faqs: [
    { q: 'When should I take it?', a: 'About 10–15 minutes before a meal — that gives the enzymes and ginger time to start working as you eat.' },
    { q: 'Can I take more than one a day?', a: 'Yes — up to 2 strips per day, typically before your two largest meals.' },
    { q: 'Is this a probiotic?', a: 'No — this is a digestive enzyme and prebiotic strip. For a probiotic strip, see our Probiotic + Metabolism Strips.' },
    { q: 'What does it taste like?', a: 'Light, natural ginger–lemon flavor — sweetened with monk fruit and stevia. Warm and pleasant.' },
    { q: 'Is it vegan and gluten-free?', a: 'Yes. Vegan, gluten-free, non-GMO, lactose-free.' },
    { q: 'Where are they made?', a: 'Made in the USA in an FDA-registered, GMP-certified facility. Independently third-party tested.' },
  ],
  descriptionText: 'A pre-meal dissolving digestive strip with 100 mg Ginger extract, a 50 mg blend of digestive enzymes (amylase, protease, lipase), and 200 mg of prebiotic fiber. Designed to support comfortable digestion and reduce occasional bloating — no pills, no powders.',
  ingredientsAccordionText: 'Ginger Root Extract (100 mg), Digestive Enzyme Blend (50 mg), Prebiotic Fiber (200 mg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Ginger & Lemon Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
};

const libidoConfig: PDPConfig = {
  matchHandles: ['libido', 'vitality'],
  category: 'Vitality & Drive',
  headlineMain: 'Libido + Vitality',
  headlineSuffix: 'Strips',
  subtitle: 'Maca + Shilajit + Cordyceps · Vitality Support · NEUVIE™',
  productNoun: 'Vitality Strip',
  topBadge: 'Save up to 20% Today',
  bottomFlavorBadge: 'CACAO–VANILLA · DAILY VITALITY',
  bandIngredients: 'MACA · SHILAJIT · CORDYCEPS',
  reviewCount: '(1,648)',
  clinicalStats: [
    { label: 'Reported more daily drive', value: 79 },
    { label: 'Felt steadier energy throughout the day', value: 82 },
    { label: 'Noticed improved sense of vitality', value: 76 },
  ],
  highlightLead: 'reported renewed vitality in',
  highlightValue: '4 weeks',
  clinicalH2A: 'Adaptogens and botanicals for',
  clinicalH2B: 'renewed energy and drive',
  clinicalFootnote: '*Based on a self-reported 4-week consumer perception study with daily NEUVIE Libido + Vitality Strip use. Individual results vary.',
  benefitsKicker: 'Vitality, Reawakened',
  benefitsH2A: 'Show up as your',
  benefitsH2B: 'most vital self',
  benefitsLead: 'One small strip. Three of the most-trusted adaptogenic botanicals. Daily vitality support that doesn’t need a prescription or a pill.',
  benefits: [
    { title: 'Supports daily vitality', body: 'Maca root has been used in traditional Andean practice for centuries to support vitality and stamina.' },
    { title: 'Sustained, natural energy', body: 'Shilajit is a mineral-rich resin traditionally valued for supporting energy at the cellular level.' },
    { title: 'Stamina without stimulants', body: 'Cordyceps supports stamina and oxygen efficiency — a steadier kind of drive that doesn’t crash.' },
    { title: '3-second daily ritual', body: 'No water, no awkward bottles in the bathroom drawer. One cacao–vanilla strip — taken daily, discreetly.' },
  ],
  allInOneH2A: 'All-in-One Vitality Strip for',
  allInOneH2B: 'renewed drive',
  allInOneBody: 'Three of the most-trusted vitality botanicals in one effortless 3-second ritual. No gritty maca powder, no awkward shilajit jars, no separate capsules. Just one strip — daily.',
  ritualLead: 'Trade the bottle in the back of the drawer for a ritual you actually keep. NEUVIE strips are effortless — so daily vitality finally feels easy.',
  competitorName: 'Typical Vitality Pills',
  pros: [
    'Dissolves in 30 seconds — no water needed',
    'Maca + Shilajit + Cordyceps, classic adaptogen stack',
    'Light cacao–vanilla flavor — actually pleasant',
    'Discreet: fits in any pocket or bag',
  ],
  cons: [
    'Large capsules and awkward packaging',
    'Bitter maca/shilajit powders mixed in drinks',
    'Hit-or-miss formulas with under-dosed ingredients',
    'Easy to skip when life gets busy',
  ],
  insideLead: 'Three vitality botanicals, precision-dosed. No filler, no shortcuts.',
  ingredients: [
    { name: 'Maca Root', tag: 'Vitality', dose: '300 mg', desc: 'A traditional Andean root used for centuries to support daily vitality and stamina.', image: ingMaca },
    { name: 'Shilajit', tag: 'Cellular Energy', dose: '100 mg', desc: 'A mineral-rich resin traditionally valued for supporting energy at the cellular level.', image: ingShilajit },
    { name: 'Cordyceps', tag: 'Stamina', dose: '150 mg', desc: 'A functional mushroom traditionally used to support stamina and oxygen efficiency.', image: ingCordyceps },
  ],
  tastyBody: 'A smooth, natural cacao–vanilla flavor — sweetened with monk fruit and stevia. No earthy maca bite, no shilajit tar taste. Just a 3-second ritual that feels like a small luxury.',
  fullIngredientList: 'Maca Root Extract (300 mg), Shilajit Extract (100 mg), Cordyceps Extract (150 mg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Cacao & Vanilla Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
  howToUseText: 'Place one strip on your tongue daily and let it dissolve. No water needed. For best results, use consistently for 4–8 weeks.',
  propsText: 'Vegan, gluten-free, non-GMO, lactose-free, no added sugar. Made in the USA in an FDA-registered, GMP-certified facility.',
  supplementFacts: [
    { name: 'Maca Root Extract', amount: '300 mg', dv: '*' },
    { name: 'Shilajit Extract', amount: '100 mg', dv: '*' },
    { name: 'Cordyceps Extract', amount: '150 mg', dv: '*' },
  ],
  bundleSubtitle: 'Pair Libido + Vitality with our other wellness strips and save up to 20%.',
  doctors: sharedDoctors(
    {
      headline: 'A traditional, sensible adaptogen stack',
      text: 'Maca, shilajit, and cordyceps each have long traditions of use for vitality and stamina. As a daily, low-risk adaptogenic blend, this is a reasonable option for adults looking to support general energy and drive.',
      tags: ['Adaptogen', 'Vitality', 'Daily'],
    },
    {
      headline: 'Consistency drives results',
      text: 'Adaptogens work over weeks, not minutes. A pleasant-tasting strip is significantly more likely to be taken every day for the 4–8 week window where benefits typically become noticeable.',
      tags: ['4–8 Weeks', 'Compliance', 'Routine'],
    },
  ),
  reviewsTeaser: {
    quote: 'I’m 47 and just feel a little more like myself. Calmer energy, steadier mood, and yes — more drive. Took about 5 weeks of daily use.',
    author: 'Marco D.',
  },
  testimonials: sharedTestimonials(
    { title: 'Steadier through my week', quote: 'I’m not jacked up — I just feel more like the version of me from 5 years ago. Steady, present, and actually interested.', author: 'Jordan A.' },
    { title: 'Doesn’t feel like a pill', quote: 'I hated taking maca capsules — felt clinical. This feels like a small ritual I look forward to with my morning coffee.', author: 'Liam P.' },
    { title: 'My wife noticed first', quote: 'My wife asked what I was doing differently before I even said anything. That said it all.', author: 'Andre B.' },
  ),
  faqs: [
    { q: 'Is this just for men?', a: 'No — the formula supports vitality and energy for adults regardless of gender. Maca, shilajit, and cordyceps have traditional uses across all genders.' },
    { q: 'How long until I notice it?', a: 'Adaptogens build over time. Most people report noticeable changes between weeks 3–6 of daily use.' },
    { q: 'Will it interact with my medications?', a: 'If you take prescription medication — especially for blood pressure, mood, or hormones — please consult your healthcare provider before starting.' },
    { q: 'What does it taste like?', a: 'Light, natural cacao–vanilla flavor — sweetened with monk fruit and stevia. Smooth, never bitter.' },
    { q: 'Is it vegan?', a: 'Yes. Vegan, gluten-free, non-GMO, lactose-free, and made with no added sugar.' },
    { q: 'Where are they made?', a: 'Made in the USA in an FDA-registered, GMP-certified facility. Independently third-party tested.' },
  ],
  descriptionText: 'A daily dissolving vitality strip with 300 mg Maca, 100 mg Shilajit, and 150 mg Cordyceps extract. Designed to support daily energy, stamina, and a renewed sense of vitality — no pills, no powders, no awkward bottles.',
  ingredientsAccordionText: 'Maca Root Extract (300 mg), Shilajit Extract (100 mg), Cordyceps Extract (150 mg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Cacao & Vanilla Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
};

const appetiteConfig: PDPConfig = {
  matchHandles: ['appetite'],
  category: 'Metabolic Balance',
  headlineMain: 'Appetite Balance',
  headlineSuffix: 'Strips',
  subtitle: 'Saffron + Chromium + Green Tea · Appetite Support · NEUVIE™',
  productNoun: 'Appetite Balance Strip',
  topBadge: 'Save up to 20% Today',
  bottomFlavorBadge: 'BERRY–MINT · TAKE BEFORE MEALS',
  bandIngredients: 'SAFFRON · CHROMIUM · GREEN TEA',
  reviewCount: '(1,762)',
  clinicalStats: [
    { label: 'Felt fewer between-meal cravings', value: 81 },
    { label: 'Reported better appetite control', value: 78 },
    { label: 'Felt more in tune with hunger cues', value: 74 },
  ],
  highlightLead: 'fewer between-meal cravings in',
  highlightValue: '3 weeks',
  clinicalH2A: 'Plant-powered ingredients for',
  clinicalH2B: 'a calmer relationship with food',
  clinicalFootnote: '*Based on a self-reported 3-week consumer perception study with daily NEUVIE Appetite Balance Strip use. Individual results vary.',
  benefitsKicker: 'Calm With Food',
  benefitsH2A: 'Eat as your',
  benefitsH2B: 'most balanced self',
  benefitsLead: 'One small strip. Three of the most-studied appetite-balance nutrients. Daily support that doesn’t feel like punishment.',
  benefits: [
    { title: 'Supports normal appetite', body: 'Saffron extract has been studied for its support of mood and a balanced relationship with food.' },
    { title: 'Helps with cravings', body: 'Chromium picolinate supports normal carbohydrate metabolism and may help reduce sugar cravings.' },
    { title: 'Gentle metabolic support', body: 'Green tea catechins (EGCG) support a healthy metabolic rate as part of a balanced lifestyle.' },
    { title: '3-second ritual before meals', body: 'No water, no shaker bottle. One berry–mint strip on your tongue — and you’re ready.' },
  ],
  allInOneH2A: 'All-in-One Appetite Strip for',
  allInOneH2B: 'a calmer way of eating',
  allInOneBody: 'Three of the most-studied appetite-balance nutrients in one effortless 3-second ritual. No bulky thermogenic capsules, no jittery weight-loss drinks, no separate bottles. Just one strip — before meals.',
  ritualLead: 'Trade the diet-pill chaos for a ritual you’ll actually keep. NEUVIE strips are effortless — so a calmer relationship with food finally feels possible.',
  competitorName: 'Typical Diet Pills',
  pros: [
    'Dissolves in 30 seconds — no water needed',
    'Saffron + Chromium + Green Tea, gentle stack',
    'Light berry–mint flavor — actually pleasant',
    'Travel-friendly: drop a strip in your bag',
  ],
  cons: [
    'Often loaded with high-dose stimulants',
    'Jitters, anxiety, and a brutal crash',
    'Big bottles and aggressive marketing',
    'Hard to keep up with — usually quit within weeks',
  ],
  insideLead: 'Three appetite nutrients, precision-dosed. No filler, no shortcuts.',
  ingredients: [
    { name: 'Saffron Extract', tag: 'Mood + Appetite', dose: '15 mg', desc: 'A well-studied dose of saffron extract — supports a balanced mood and relationship with food.', image: ingSaffron },
    { name: 'Chromium', tag: 'Craving Support', dose: '200 mcg', desc: 'Chromium picolinate supports normal carbohydrate metabolism and may help with sugar cravings.', image: ingChromium },
    { name: 'Green Tea (EGCG)', tag: 'Metabolism', dose: '100 mg', desc: 'A standardized green tea extract rich in EGCG — supports a healthy metabolic rate.', image: ingGreenTea },
  ],
  tastyBody: 'A bright, natural berry–mint flavor — sweetened with monk fruit and stevia. No bitter green-tea aftertaste. Just a 3-second ritual that fits in before a meal.',
  fullIngredientList: 'Saffron Extract (15 mg), Chromium Picolinate (200 mcg), Green Tea Extract (100 mg, std. to EGCG), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Berry & Mint Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
  howToUseText: 'Place one strip on your tongue 10–15 minutes before a meal and let it dissolve. No water needed. Up to 2 strips per day.',
  propsText: 'Vegan, gluten-free, non-GMO, sugar-free, lactose-free, low-caffeine. Made in the USA in an FDA-registered, GMP-certified facility.',
  supplementFacts: [
    { name: 'Saffron Extract', amount: '15 mg', dv: '*' },
    { name: 'Chromium (Picolinate)', amount: '200 mcg', dv: '571%' },
    { name: 'Green Tea Extract', amount: '100 mg', dv: '*' },
  ],
  bundleSubtitle: 'Pair Appetite Balance with our other wellness strips and save up to 20%.',
  doctors: sharedDoctors(
    {
      headline: 'A gentler approach to appetite',
      text: 'Saffron at 15 mg has interesting data for supporting mood and a balanced relationship with food. Combined with chromium and standardized green tea, this is a measured, low-stimulant approach rather than the typical aggressive diet-pill route.',
      tags: ['Saffron', 'Low-Stim', 'Mood'],
    },
    {
      headline: 'Sustainable beats aggressive',
      text: 'The supplements that actually work for appetite are the ones people stick with. A pleasant strip taken before meals is a far more sustainable habit than a stimulant-heavy capsule taken in fits and starts.',
      tags: ['Sustainable', 'Compliance', 'Daily'],
    },
  ),
  reviewsTeaser: {
    quote: 'I’ve tried diet pills before and quit because of the jitters. The strips are gentle — I just notice I’m not snacking at 3 PM anymore.',
    author: 'Hannah B.',
  },
  testimonials: sharedTestimonials(
    { title: 'My 3 PM snack reset', quote: 'I used to raid the kitchen at 3 PM. Now I take one before lunch and the urge just isn’t there. No drama, no shakiness.', author: 'Claire D.' },
    { title: 'Calmer with food', quote: 'It’s less about “appetite suppression” and more about not being on edge about meals. I feel more in control.', author: 'Yasmin R.' },
    { title: 'Finally something gentle', quote: 'Other appetite products made me anxious. This is gentle, calm, and I’ve actually stuck with it.', author: 'Olivia M.' },
  ),
  faqs: [
    { q: 'Is this a weight-loss product?', a: 'No — it’s designed to support a balanced appetite as part of a healthy lifestyle. It’s not a magic fix, and it’s not aggressive.' },
    { q: 'Does it contain stimulants?', a: 'Only a very small amount of natural caffeine from green tea — low enough not to cause jitters for most people.' },
    { q: 'When should I take it?', a: 'About 10–15 minutes before your two largest meals — up to 2 strips per day.' },
    { q: 'What does it taste like?', a: 'Light, natural berry–mint flavor — sweetened with monk fruit and stevia. Refreshing.' },
    { q: 'Is it vegan and gluten-free?', a: 'Yes. Vegan, gluten-free, non-GMO, lactose-free, no added sugar.' },
    { q: 'Where are they made?', a: 'Made in the USA in an FDA-registered, GMP-certified facility. Independently third-party tested.' },
  ],
  descriptionText: 'A pre-meal dissolving appetite-balance strip with 15 mg Saffron extract, 200 mcg Chromium picolinate, and 100 mg standardized Green Tea (EGCG). Designed to support a balanced appetite and a calmer relationship with food — gently, without stimulant overload.',
  ingredientsAccordionText: 'Saffron Extract (15 mg), Chromium Picolinate (200 mcg), Green Tea Extract (100 mg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Berry & Mint Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
};

const ironConfig: PDPConfig = {
  matchHandles: ['iron'],
  category: 'Energy & Vitality',
  headlineMain: 'Iron + Folate',
  headlineSuffix: 'Strips',
  subtitle: 'Iron 19 mg + Folate + Vitamin C · Energy Support · NEUVIE™',
  productNoun: 'Iron + Folate Strip',
  topBadge: 'Save up to 20% Today',
  bottomFlavorBadge: 'BERRY FLAVOR · GENTLE ON YOUR STOMACH',
  bandIngredients: 'IRON · FOLATE · VITAMIN C',
  reviewCount: '(1,394)',
  clinicalStats: [
    { label: 'Reported more daily energy', value: 83 },
    { label: 'Felt less afternoon fatigue', value: 79 },
    { label: 'Tolerated it well (no upset stomach)', value: 92 },
  ],
  highlightLead: 'reported more daily energy in',
  highlightValue: '4 weeks',
  clinicalH2A: 'Bioavailable nutrients for',
  clinicalH2B: 'steady, daily energy',
  clinicalFootnote: '*Based on a self-reported 4-week consumer perception study with daily NEUVIE Iron + Folate Strip use. Individual results vary.',
  benefitsKicker: 'Energy at the Source',
  benefitsH2A: 'Move as your',
  benefitsH2B: 'most energized self',
  benefitsLead: 'One small strip. 19 mg of gentle iron, plus Folate and Vitamin C. Daily support that doesn’t upset your stomach.',
  benefits: [
    { title: 'Supports red blood cell health', body: '19 mg of bisglycinate iron — a bioavailable, gentler form — to support healthy oxygen delivery throughout the body.' },
    { title: 'Folate for cell function', body: 'Methylfolate is a body-ready form of folate that supports normal cell division and energy metabolism.' },
    { title: 'Vitamin C boosts absorption', body: 'Pairing iron with Vitamin C is the classic clinical move — it supports iron absorption.' },
    { title: 'Gentle on your stomach', body: 'Traditional iron pills cause nausea and constipation. A sublingual strip is meaningfully easier on your gut.' },
  ],
  allInOneH2A: 'All-in-One Iron Strip for',
  allInOneH2B: 'gentle daily energy',
  allInOneBody: 'Three of the most-essential energy nutrients in one effortless 3-second ritual. No nausea-inducing iron pills, no separate folate capsule, no Vitamin C tablet. Just one strip — daily.',
  ritualLead: 'Trade the stomach-churning iron pill for a ritual you’ll actually keep. NEUVIE strips are effortless — so caring for your energy at the source finally feels easy.',
  competitorName: 'Typical Iron Pills',
  pros: [
    'Dissolves in 30 seconds — no water needed',
    'Iron Bisglycinate + Methylfolate + Vitamin C',
    'Light berry flavor — actually pleasant',
    'Gentle on the stomach — no nausea or constipation',
  ],
  cons: [
    'Cause nausea, cramping, and constipation',
    'Bitter metallic aftertaste',
    'Often missing Vitamin C — much lower absorption',
    'Easy to quit within a week because of side effects',
  ],
  insideLead: 'Three energy nutrients, precision-dosed. No filler, no shortcuts.',
  ingredients: [
    { name: 'Iron (Bisglycinate)', tag: 'Oxygen Delivery', dose: '19 mg', desc: 'A gentler, more bioavailable form of iron — designed to be easier on the digestive system.', image: ingIron },
    { name: 'Methylfolate', tag: 'Cell Function', dose: '400 mcg', desc: 'A body-ready form of folate that supports normal cell division and energy metabolism.', image: ingFolate },
    { name: 'Vitamin C', tag: 'Absorption', dose: '60 mg', desc: 'The classic iron co-factor — pairing iron with Vitamin C supports its absorption.', image: ingVitC },
  ],
  tastyBody: 'A light, natural berry flavor — sweetened with monk fruit and stevia. No bitter metallic iron taste. Just a 3-second ritual that fits anywhere in your day.',
  fullIngredientList: 'Iron as Ferrous Bisglycinate (19 mg), Folate as L-Methylfolate (400 mcg DFE), Vitamin C as L-Ascorbic Acid (60 mg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Berry Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
  howToUseText: 'Place one strip on your tongue daily and let it dissolve. No water needed. Taking it away from coffee or tea may improve absorption.',
  propsText: 'Vegan, gluten-free, non-GMO, lactose-free, no added sugar. Made in the USA in an FDA-registered, GMP-certified facility.',
  supplementFacts: [
    { name: 'Iron (Bisglycinate)', amount: '19 mg', dv: '106%' },
    { name: 'Folate (L-Methylfolate)', amount: '400 mcg DFE', dv: '100%' },
    { name: 'Vitamin C (L-Ascorbic Acid)', amount: '60 mg', dv: '67%' },
  ],
  bundleSubtitle: 'Pair Iron + Folate with our other wellness strips and save up to 20%.',
  doctors: sharedDoctors(
    {
      headline: 'A gentler, more absorbable iron form',
      text: 'Iron bisglycinate at 19 mg paired with methylfolate and Vitamin C is a clinically-sensible combination. Bisglycinate is generally better tolerated than traditional ferrous sulfate, and the C improves uptake.',
      tags: ['Bisglycinate', 'Tolerated', 'Absorption'],
    },
    {
      headline: 'A format people actually tolerate',
      text: 'The biggest reason adults stop iron supplementation is GI side effects. A sublingual strip with a gentler iron form addresses both compliance and tolerance — the two limiters of real-world iron status.',
      tags: ['Tolerance', 'Compliance', 'Daily'],
    },
  ),
  reviewsTeaser: {
    quote: 'I’ve been told to take iron for years and always quit within a week — too rough on my stomach. The strips have been the first thing I’ve actually kept up with.',
    author: 'Alicia P.',
  },
  testimonials: sharedTestimonials(
    { title: 'No more iron-pill nausea', quote: 'Every iron pill I’ve ever taken made me feel sick within an hour. The strips are completely different — I don’t feel anything in my stomach.', author: 'Ines G.' },
    { title: 'Energy is finally back', quote: 'I was dragging by 2 PM every day. About 4 weeks in I noticed I just had more in the tank. It’s subtle but real.', author: 'Beth R.' },
    { title: 'Easiest iron I’ve ever taken', quote: 'I’ve been on prescription iron and OTC iron. This is the only one I can imagine actually taking long term.', author: 'Naomi C.' },
  ),
  faqs: [
    { q: 'Will it upset my stomach?', a: 'Most people tolerate the bisglycinate form much better than traditional iron pills. Side effects like nausea are uncommon.' },
    { q: 'When should I take it?', a: 'Daily — ideally away from coffee, tea, or calcium-rich foods, which can reduce iron absorption.' },
    { q: 'Is this safe if I’m not deficient?', a: 'A 19 mg daily dose is appropriate for most adults with normal iron needs, but if you don’t know your iron status, please consult your healthcare provider — especially for men.' },
    { q: 'What does it taste like?', a: 'Light, natural berry flavor — sweetened with monk fruit and stevia. No metallic iron aftertaste.' },
    { q: 'Is it vegan?', a: 'Yes. Vegan, gluten-free, non-GMO, lactose-free, and made with no added sugar.' },
    { q: 'Where are they made?', a: 'Made in the USA in an FDA-registered, GMP-certified facility. Independently third-party tested.' },
  ],
  descriptionText: 'A daily dissolving iron strip with 19 mg of gentle Iron Bisglycinate, 400 mcg of bioavailable Methylfolate, and 60 mg of Vitamin C to support absorption. Designed to support steady daily energy — without the nausea or constipation of traditional iron pills.',
  ingredientsAccordionText: 'Iron Bisglycinate (19 mg), Methylfolate (400 mcg DFE), Vitamin C (60 mg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Berry Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
};

const probioticConfig: PDPConfig = {
  matchHandles: ['probiotic'],
  category: 'Gut & Metabolism',
  headlineMain: 'Probiotic + Metabolism',
  headlineSuffix: 'Strips',
  subtitle: '10B CFU Probiotics + Prebiotic + Green Tea · Gut & Metabolism · NEUVIE™',
  productNoun: 'Probiotic Strip',
  topBadge: 'Save up to 20% Today',
  bottomFlavorBadge: 'MIXED BERRY · NO REFRIGERATION NEEDED',
  bandIngredients: 'PROBIOTICS · PREBIOTIC · GREEN TEA',
  reviewCount: '(2,184)',
  clinicalStats: [
    { label: 'Felt less bloated within 2 weeks', value: 82 },
    { label: 'Reported steadier daily energy', value: 76 },
    { label: 'Improved regularity', value: 79 },
  ],
  highlightLead: 'noticeable gut comfort in just',
  highlightValue: '14 days',
  clinicalH2A: 'Shelf-stable strains for',
  clinicalH2B: 'a calmer gut and steadier metabolism',
  clinicalFootnote: '*Based on a self-reported consumer perception study with daily NEUVIE Probiotic + Metabolism Strip use. Individual results vary.',
  benefitsKicker: 'Gut Balance, Reset',
  benefitsH2A: 'Feel as your',
  benefitsH2B: 'lightest self',
  benefitsLead: 'One small strip. 10 billion CFU of shelf-stable probiotics, prebiotic fuel, and green tea — the kind of gut support that doesn’t live in your fridge.',
  benefits: [
    { title: 'Less bloating, more comfort', body: 'A balanced multi-strain probiotic blend supports a calmer gut so meals sit lighter — no chalky drinks required.' },
    { title: 'Feeds the good bacteria', body: 'Prebiotic fiber acts as fuel for the beneficial bacteria already in your gut, helping the new strains actually settle in.' },
    { title: 'Supports a steady metabolism', body: 'Green tea extract has been traditionally studied for its role in healthy metabolism — quietly working in the background.' },
    { title: 'No fridge. No drama.', body: 'Shelf-stable strains in a 3-second dissolving strip. Travel-friendly, desk-friendly, hotel-friendly — gut care that fits real life.' },
  ],
  allInOneH2A: 'All-in-One Probiotic Strip for',
  allInOneH2B: 'a balanced gut & metabolism',
  allInOneBody: 'Three of the most-trusted gut nutrients in one effortless 3-second ritual. No refrigerated bottles, no chalky powders, no horse-pill capsules. Just one mixed-berry strip — taken daily — to help your gut find its balance.',
  ritualLead: 'Trade the fridge-bound probiotic bottle for a ritual you’ll actually keep. NEUVIE strips are effortless — so gut care finally feels easy.',
  competitorName: 'Typical Probiotic Capsules',
  pros: [
    'Dissolves in 30 seconds — no water needed',
    '10 billion CFU + Prebiotic + Green Tea, smart trio',
    'Mixed-berry flavor — actually pleasant to take',
    'Shelf-stable: travel, desk, hotel — anywhere',
  ],
  cons: [
    'Capsules often lose potency without refrigeration',
    'Many strains don’t survive stomach acid intact',
    'Bulky bottles, easy to forget on the road',
    'Frequently miss the prebiotic “food” strains need',
  ],
  insideLead: 'Three gut nutrients, precision-dosed. No filler, no shortcuts.',
  ingredients: [
    { name: 'Probiotic Blend', tag: 'Gut Flora', dose: '10B CFU', desc: 'A multi-strain blend designed to support a balanced gut microbiome — shelf-stable, no refrigeration required.', image: ingPrebiotic },
    { name: 'Prebiotic Fiber', tag: 'Strain Fuel', dose: '150 mg', desc: 'Soluble fiber that feeds the beneficial bacteria already in your gut so the new strains actually take hold.', image: ingPrebiotic },
    { name: 'Green Tea Extract', tag: 'Metabolism', dose: '100 mg', desc: 'A gentle plant extract traditionally studied for its role in supporting a healthy metabolism.', image: ingGreenTea },
  ],
  tastyBody: 'A bright, natural mixed-berry flavor — sweetened with monk fruit and stevia. No chalky probiotic aftertaste, no vitamin smell. Just a 3-second daily ritual that fits anywhere.',
  fullIngredientList: 'Probiotic Blend (10 billion CFU), Prebiotic Fiber (150 mg), Green Tea Extract (100 mg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Mixed Berry Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
  howToUseText: 'Place one strip on your tongue once daily and let it dissolve. No water needed. For best results, take consistently for at least 4–6 weeks.',
  propsText: 'Vegan, gluten-free, non-GMO, lactose-free, no added sugar, no refrigeration required. Made in the USA in an FDA-registered, GMP-certified facility.',
  supplementFacts: [
    { name: 'Probiotic Blend', amount: '10B CFU', dv: '*' },
    { name: 'Prebiotic Fiber', amount: '150 mg', dv: '*' },
    { name: 'Green Tea Extract', amount: '100 mg', dv: '*' },
  ],
  bundleSubtitle: 'Pair Probiotic + Metabolism with our other wellness strips and save up to 20%.',
  doctors: sharedDoctors(
    {
      headline: 'A practical, shelf-stable approach',
      text: 'Pairing a 10 billion CFU multi-strain probiotic with prebiotic fiber reflects current thinking on gut support — the strains benefit from a fuel source. A dissolving format that doesn’t need refrigeration removes one of the biggest reasons people stop taking probiotics.',
      tags: ['Microbiome', 'Prebiotic', 'Shelf-Stable'],
    },
    {
      headline: 'Compliance is the quiet variable',
      text: 'Probiotics only work if they’re taken consistently for several weeks. A pleasant, no-water strip is far more likely to actually happen daily than a refrigerated capsule routine — and that consistency is what tends to move the needle.',
      tags: ['Daily Routine', 'Compliance', 'Gut Health'],
    },
  ),
  reviewsTeaser: {
    quote: 'I’ve taken capsule probiotics for years with mediocre results. These strips work way better — I think because they bypass stomach acid. Bloating gone, regularity perfect.',
    author: 'Amanda S.',
  },
  testimonials: sharedTestimonials(
    { title: 'My gut transformed', quote: 'Within two weeks the bloating I’d had for years was just… gone. And I love that I don’t have to refrigerate them.', author: 'Amanda S.' },
    { title: 'No fridge required', quote: 'Travel-friendly, taste good, and my digestion is the best it’s been in years. This is the format probiotics should have always been.', author: 'Brandon F.' },
    { title: 'Less bloat, more energy', quote: 'Three weeks in and my energy is up too — I think the gut connection is real. Easiest supplement I’ve ever kept up with.', author: 'Christina R.' },
  ),
  faqs: [
    { q: 'Do I need to refrigerate these?', a: 'No. Unlike most probiotics, NEUVIE Probiotic Strips are shelf-stable and don’t require refrigeration. Travel-friendly and stable at room temperature.' },
    { q: 'How long until I feel results?', a: 'Most customers notice less bloating within 7–14 days. Real regularity and energy improvements typically hit around week 3–4, with the full benefits by week 6.' },
    { q: 'Are these better than capsule probiotics?', a: 'They’re designed to be more reliable. Strips dissolve sublingually so the strains bypass stomach acid, and the format makes it far easier to take consistently — which is what actually matters with probiotics.' },
    { q: 'What does it taste like?', a: 'Light, natural mixed-berry flavor — sweetened with monk fruit and stevia. No chalky probiotic aftertaste.' },
    { q: 'Is it vegan and gluten-free?', a: 'Yes. Vegan, gluten-free, non-GMO, lactose-free, and made with no added sugar.' },
    { q: 'Where are they made?', a: 'Made in the USA in an FDA-registered, GMP-certified facility. Every batch is independently third-party tested.' },
  ],
  descriptionText: 'A daily dissolving probiotic strip with 10 billion CFU of shelf-stable probiotic strains, 150 mg of prebiotic fiber, and 100 mg of green tea extract. Designed to support a balanced gut, ease occasional bloating, and quietly support a healthy metabolism — no refrigeration, no capsules.',
  ingredientsAccordionText: 'Probiotic Blend (10 billion CFU), Prebiotic Fiber (150 mg), Green Tea Extract (100 mg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract, Natural Mixed Berry Flavor, Malic Acid, Lecithin, Stevia Glycosides.',
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
  boneConfig,
  digestiveConfig,
  libidoConfig,
  appetiteConfig,
  ironConfig,
  probioticConfig,
];

export function getPDPConfig(handle: string): PDPConfig | null {
  const h = (handle || '').toLowerCase();
  // Exclude Hair/Skin/Nails (handled separately by HairSkinNailsPDP)
  if (h.includes('hair') && (h.includes('skin') || h.includes('nail'))) return null;

  for (const cfg of ALL_CONFIGS) {
    if (cfg.matchHandles.some((m) => h.includes(m))) return cfg;
  }
  return null;
}
