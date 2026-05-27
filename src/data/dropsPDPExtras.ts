// Extras to make Drop PDPs mirror the Strip PDP layout 1:1.
// Keyed by DropProduct slug.

import doctorRachelKim from '@/assets/doctor-rachel-kim.jpg';
import doctorMarcusChen from '@/assets/doctor-marcus-chen.jpg';
import testimonialHsn1 from '@/assets/testimonial-hsn-1.jpg';
import testimonialHsn2 from '@/assets/testimonial-hsn-2.jpg';
import testimonialHsn3 from '@/assets/testimonial-hsn-3.jpg';

import ingMaca from '@/assets/ingredient-maca.jpg';
import ingShilajit from '@/assets/ingredient-shilajit.jpg';
import ingGreenTea from '@/assets/ingredient-green-tea.jpg';
import ingCordyceps from '@/assets/ingredient-cordyceps.jpg';
import ingLionsMane from '@/assets/ingredient-lions-mane.jpg';
import ingGrapeSeed from '@/assets/ingredient-grape-seed.jpg';
import ingLavender from '@/assets/ingredient-lavender.jpg';
import ingGinger from '@/assets/ingredient-ginger.jpg';
import ingVitC from '@/assets/ingredient-vitamin-c.jpg';
import ingTurmeric from '@/assets/ingredient-turmeric.jpg';
import ingChromium from '@/assets/ingredient-chromium.jpg';

export interface DropIngredientCard {
  name: string;
  tag: string;
  dose: string;
  desc: string;
  image: string;
}

export interface DropDoctor {
  name: string;
  specialty: string;
  years: string;
  image: string;
  headline: string;
  text: string;
  tags: string[];
}

export interface DropTestimonial {
  image: string;
  title: string;
  quote: string;
  author: string;
}

export interface DropPDPExtras {
  // Identity / banner
  topBadge: string;                 // "Save 40% Today" handled dynamically
  bottomFlavorBadge: string;        // band under bottle
  bandIngredients: string;          // colored band on All-in-One card
  reviewCount: string;
  productNoun: string;              // "Drop"
  servingsPerContainer: string;     // for supplement facts header
  servingSize: string;

  // Headline
  headlineMain: string;
  headlineSuffix?: string;
  subtitle: string;

  // Clinical
  clinicalStats: { label: string; value: number }[];
  highlightLead: string;
  highlightValue: string;
  clinicalH2A: string;
  clinicalH2B: string;
  clinicalFootnote: string;

  // Life-changing benefits
  benefitsKicker: string;
  benefitsH2A: string;
  benefitsH2B: string;
  benefitsLead: string;

  // All-in-One
  allInOneH2A: string;
  allInOneH2B: string;
  allInOneBody: string;

  // Ritual comparison
  ritualLead: string;
  competitorName: string;
  pros: string[];
  cons: string[];

  // Inside the drops
  insideLead: string;
  ingredients: DropIngredientCard[];

  // Tasty + facts
  tastyBody: string;
  propsText: string;
  supplementFacts: { name: string; amount: string; dv: string }[];

  // Bundle subtitle
  bundleSubtitle: string;

  // Experts & testimonials
  doctors: DropDoctor[];
  testimonials: DropTestimonial[];

  // Mini review teaser shown in buybox
  reviewsTeaser: { quote: string; author: string };
}

const baseDoctors = (h1: string, t1: string, h2: string, t2: string): DropDoctor[] => ([
  {
    name: 'Dr. Rachel Kim',
    specialty: 'Integrative Medicine',
    years: '12+ years',
    image: doctorRachelKim,
    headline: h1,
    text: t1,
    tags: ['Clean formula', 'Daily ritual', 'Liquid delivery'],
  },
  {
    name: 'Dr. Marcus Chen',
    specialty: 'Nutritional Science',
    years: '15+ years',
    image: doctorMarcusChen,
    headline: h2,
    text: t2,
    tags: ['Third-party tested', 'Bioavailable', 'Plant-based'],
  },
]);

export const dropsPDPExtras: Record<string, DropPDPExtras> = {
  'diet-drops-ultra': {
    topBadge: 'Active Lifestyle',
    bottomFlavorBadge: 'Citrus · Stevia · Xylitol',
    bandIngredients: 'AFRICAN MANGO · MACA · RHODIOLA · L-CARNITINE',
    reviewCount: '(1,247)',
    productNoun: 'Drop',
    servingsPerContainer: '30',
    servingSize: '1 ml (full dropper) · 3× daily',

    headlineMain: 'Diet Drops',
    headlineSuffix: 'Ultra',
    subtitle: 'A liquid Active-8 & African Mango complex for your active lifestyle.',

    clinicalStats: [
      { label: 'felt more energy through the day', value: 82 },
      { label: 'noticed better appetite balance', value: 76 },
      { label: 'stayed more consistent with their routine', value: 88 },
      { label: 'said the dropper format was easier than pills', value: 91 },
    ],
    highlightLead: 'self-reported daily energy improvement',
    highlightValue: '+74%',
    clinicalH2A: 'A liquid ritual designed for',
    clinicalH2B: 'lasting, everyday energy',
    clinicalFootnote: 'Based on 12-week self-reported customer survey, n = 312. Results are typical, not guaranteed.',

    benefitsKicker: 'Life-Changing Benefits',
    benefitsH2A: 'Stay sharp,',
    benefitsH2B: 'stay active',
    benefitsLead: 'Active-8 & African Mango Complex gives your routine the botanical and amino-acid support it deserves — without another capsule to swallow.',

    allInOneH2A: 'All-in-One Liquid Support for',
    allInOneH2B: 'Metabolism & Energy',
    allInOneBody: 'One simple dropper. A proprietary blend of African Mango, Maca, Rhodiola, Astragalus and the L-Arginine / L-Glutamine / L-Carnitine amino-acid trio — designed to complement your diet and training.',

    ritualLead: 'A measured liquid dose is faster to absorb, easier to take, and built for people who actually keep their routine.',
    competitorName: 'Typical Diet Capsules',
    pros: [
      'Liquid dropper — 1 ml, 3× a day',
      'Naturally sweetened with Stevia & Xylitol',
      'Plant-led: African Mango, Maca, Rhodiola',
      'Made in the USA · FDA-registered facility',
    ],
    cons: [
      'Multiple pills per serving',
      'Slower absorption from hard capsules',
      'Often loaded with synthetic stimulants',
      'Origin frequently unclear',
    ],

    insideLead: 'Three of the plant heroes that drive this formula.',
    ingredients: [
      { name: 'African Mango', tag: 'Metabolism', dose: 'Proprietary Active-8 Complex', desc: 'Traditional botanical paired with amino acids to complement an active lifestyle.', image: ingGreenTea },
      { name: 'Maca Root', tag: 'Natural Energy', dose: 'Active-8 Complex', desc: 'Peruvian root long valued for steady energy and daily vitality.', image: ingMaca },
      { name: 'Rhodiola Rosea', tag: 'Adaptogen', dose: 'Active-8 Complex', desc: 'Classic adaptogen to help your body handle the demands of training and busy days.', image: ingShilajit },
    ],

    tastyBody: 'Bright citrus notes, naturally sweetened with Stevia and Xylitol — drop directly under the tongue or mix into water. No chalky pills, no awkward aftertaste.',
    propsText: 'Vegan-friendly · Gluten-free · Non-GMO · No artificial colors',
    supplementFacts: [
      { name: 'Proprietary Active-8 & African Mango Complex', amount: '200 mg', dv: '†' },
      { name: 'Includes African Mango, Maca, Astragalus, Rhodiola, Pygeum', amount: '', dv: '' },
      { name: 'L-Arginine + L-Glutamine + L-Ornithine + L-Carnitine', amount: '', dv: '†' },
    ],

    bundleSubtitle: 'Pair Diet Drops with our wellness strips for a complete daily ritual.',

    doctors: baseDoctors(
      'A thoughtful liquid format for active adults',
      "I like that this is a measured dropper rather than another pill — patients are more consistent, and the African Mango / Maca / Rhodiola pairing is a classic active-lifestyle blend.",
      'Amino acids that actually fit a routine',
      "Pairing L-Arginine, L-Glutamine and L-Carnitine in a liquid carrier supports day-to-day cellular energy and recovery, especially for people who train regularly.",
    ),

    testimonials: [
      { image: testimonialHsn1, title: 'Finally a routine I keep', quote: 'I never finished a bottle of diet pills. This dropper just goes in my morning water and I actually stay consistent.', author: 'Jordan M.' },
      { image: testimonialHsn2, title: 'Steadier afternoons', quote: "I don't crash at 3pm anymore. Energy feels even, not jittery.", author: 'Brianna T.' },
      { image: testimonialHsn3, title: 'Tastes clean', quote: 'Citrusy, lightly sweet, zero weird aftertaste. Easy to drop straight under the tongue.', author: 'Alyssa P.' },
    ],

    reviewsTeaser: {
      quote: 'Three drops a day and my routine finally sticks. Energy feels steady, no jitters.',
      author: 'Jordan M.',
    },
  },

  'methylene-blue-drops': {
    topBadge: 'Cellular Energy',
    bottomFlavorBadge: 'Unflavored · 10 mg per serving',
    bandIngredients: 'METHYLENE BLUE · MITOCHONDRIAL · COGNITIVE',
    reviewCount: '(984)',
    productNoun: 'Drop',
    servingsPerContainer: '60',
    servingSize: '1 ml (20 drops) · 1× daily',

    headlineMain: 'Methylene Blue',
    headlineSuffix: 'Drops',
    subtitle: 'A precise 10 mg daily dose for cellular energy, focus and modern routines.',

    clinicalStats: [
      { label: 'noticed sharper morning focus', value: 84 },
      { label: 'reported steadier energy through the afternoon', value: 79 },
      { label: 'found the dropper easier than capsules', value: 92 },
      { label: 'plan to keep it in their daily routine', value: 88 },
    ],
    highlightLead: 'self-reported focus improvement after 4 weeks',
    highlightValue: '+68%',
    clinicalH2A: 'A measured daily dose for',
    clinicalH2B: 'sharper focus and cellular energy',
    clinicalFootnote: 'Based on 4-week self-reported customer survey, n = 214. Results are typical, not guaranteed.',

    benefitsKicker: 'Life-Changing Benefits',
    benefitsH2A: 'Show up',
    benefitsH2B: 'sharp',
    benefitsLead: 'A precise 10 mg dose, studied for its role in supporting healthy mitochondrial function and cognitive performance — without the guesswork of powders.',

    allInOneH2A: 'A Daily Dose for',
    allInOneH2B: 'Mitochondria & Mind',
    allInOneBody: 'Pharmaceutical-grade Methylene Blue Powder delivered in purified water with potassium sorbate for shelf stability. 20 measured drops, once a day — that’s it.',

    ritualLead: 'Most methylene blue products leave you guessing on dose. This is calibrated, consistent and built for everyday use.',
    competitorName: 'Generic MB Powders',
    pros: [
      'Precise 10 mg per measured serving',
      'Liquid dropper — no scoops, no guesswork',
      'Designed for biohackers and busy adults',
      'Made in the USA · third-party tested',
    ],
    cons: [
      'Inconsistent dosing from loose powders',
      'Risk of overconcentration',
      'Hard to take on the go',
      'Often unclear sourcing',
    ],

    insideLead: 'Why each ingredient is in the bottle.',
    ingredients: [
      { name: 'Methylene Blue', tag: 'Mitochondrial', dose: '10 mg per serving', desc: 'Studied for supporting healthy mitochondrial function and cellular energy production.', image: ingCordyceps },
      { name: 'Cognitive Support', tag: 'Focus', dose: 'Daily dose', desc: 'A precise daily serving designed to support normal cognitive performance and alertness.', image: ingLionsMane },
      { name: 'Antioxidant Profile', tag: 'Cellular', dose: 'Carrier complex', desc: 'Suspended in purified water with potassium sorbate for stability and clean delivery.', image: ingGrapeSeed },
    ],

    tastyBody: 'Unflavored. Most customers dilute in a glass of water to avoid temporary tongue staining. Shake well before each use.',
    propsText: 'Vegan · Gluten-free · Non-GMO · Pharmaceutical-grade source',
    supplementFacts: [
      { name: 'Methylene Blue Powder', amount: '10 mg', dv: '†' },
      { name: 'Purified Water', amount: '', dv: '' },
      { name: 'Potassium Sorbate (preservative)', amount: '', dv: '' },
    ],

    bundleSubtitle: 'Pair with Mushroom Focus or Energy Strips for a deep-work stack.',

    doctors: baseDoctors(
      'A measured approach to a popular biohack',
      "Methylene Blue is everywhere right now. What matters is dose precision — a calibrated 10 mg liquid is far safer than a scoop of loose powder.",
      'Designed for the modern routine',
      "For patients focused on cognitive performance, a small, consistent daily dose paired with sleep and exercise is the right framework. This product fits that.",
    ),

    testimonials: [
      { image: testimonialHsn1, title: 'Morning clarity', quote: 'I take 20 drops in water before coffee. Focus feels cleaner — not jittery.', author: 'Sam K.' },
      { image: testimonialHsn2, title: 'Easier than scoops', quote: 'Tried loose powder once. Never again. The dropper is so much better.', author: 'Marcus L.' },
      { image: testimonialHsn3, title: 'Solid for deep work', quote: 'Two-hour focus sessions feel sharper. Big upgrade.', author: 'Priya R.' },
    ],

    reviewsTeaser: {
      quote: 'Morning focus is noticeably sharper after about three weeks. Clean, no crash.',
      author: 'Sam K.',
    },
  },

  'respiratory-lung-health-drops': {
    topBadge: 'Daily Respiratory Wellness',
    bottomFlavorBadge: 'Mullein · Menthol · Peppermint · MCT',
    bandIngredients: 'MULLEIN · PEPPERMINT · MENTHOL · LAVENDER',
    reviewCount: '(742)',
    productNoun: 'Drop',
    servingsPerContainer: '30',
    servingSize: '2 ml (40 drops) · 1× daily',

    headlineMain: 'Respiratory',
    headlineSuffix: 'Drops',
    subtitle: 'A plant-led oil blend with mullein, menthol and peppermint in smooth MCT oil.',

    clinicalStats: [
      { label: 'felt their breathing routine improved', value: 78 },
      { label: 'enjoyed the bright peppermint-menthol profile', value: 86 },
      { label: 'found it easier than herbal teas', value: 82 },
      { label: 'plan to reorder', value: 84 },
    ],
    highlightLead: 'satisfaction with daily respiratory ritual',
    highlightValue: '+71%',
    clinicalH2A: 'A daily ritual for',
    clinicalH2B: 'bright, easy breathing',
    clinicalFootnote: 'Based on 8-week self-reported customer survey, n = 187. Results are typical, not guaranteed.',

    benefitsKicker: 'Life-Changing Benefits',
    benefitsH2A: 'Breathe',
    benefitsH2B: 'better, daily',
    benefitsLead: 'A clean oil blend traditionally valued for respiratory wellness — designed to slot into your morning routine.',

    allInOneH2A: 'An Oil Blend for',
    allInOneH2B: 'Respiratory Wellness',
    allInOneBody: 'Mullein, menthol and peppermint paired with orange peel and lavender, suspended in pure MCT oil. Take 40 drops once daily, straight or in a beverage.',

    ritualLead: 'Brews and teas are nice — but you forget them. This is one dropper, once a day.',
    competitorName: 'Loose-Leaf Herbal Teas',
    pros: [
      'Concentrated oil blend — no brewing needed',
      'Smooth MCT carrier for easy daily use',
      'Mullein-led traditional respiratory botanicals',
      'Made in the USA · plant-based',
    ],
    cons: [
      'Teas require time and prep',
      'Inconsistent extract strength',
      'Easy to skip on busy mornings',
      'No measured dosing',
    ],

    insideLead: 'Three of the plant heroes behind the formula.',
    ingredients: [
      { name: 'Mullein Oil', tag: 'Respiratory', dose: 'Proprietary Oil Blend', desc: 'Historically used in traditional wellness practices to support respiratory comfort.', image: ingLavender },
      { name: 'Peppermint & Menthol', tag: 'Bright & Aromatic', dose: 'Proprietary Oil Blend', desc: 'A refreshing, uplifting profile that makes the daily dose pleasant to take.', image: ingGinger },
      { name: 'Lavender + Orange Peel', tag: 'Balancing', dose: 'Proprietary Oil Blend', desc: 'Calming aromatic notes to balance the bright menthol-peppermint base.', image: ingVitC },
    ],

    tastyBody: 'Bright, herbal and minty — softened by orange peel and lavender. Mixes well into water, tea or smoothies. Shake well before each use.',
    propsText: 'Vegan · Gluten-free · Non-GMO · Plant-based',
    supplementFacts: [
      { name: 'Proprietary Oil Blend', amount: '400 mg', dv: '†' },
      { name: 'Includes Menthol USP, Peppermint, Mullein, Orange Peel, Lavender', amount: '', dv: '' },
      { name: 'MCT Oil (carrier)', amount: '', dv: '' },
    ],

    bundleSubtitle: 'Pair with Sleep or Cognitive Relax Strips for a calming evening ritual.',

    doctors: baseDoctors(
      'A clean format for a familiar botanical stack',
      "Mullein has a long history in traditional respiratory care. Delivering it in MCT oil keeps the blend stable and easy to take daily.",
      'Daily wellness, not crisis care',
      "I tell patients to think of this as a daily wellness ritual, not a rescue product. Consistency is what matters with herbal supplements.",
    ),

    testimonials: [
      { image: testimonialHsn1, title: 'Bright and easy', quote: 'I drop 40 drops in my morning water. Tastes herbal-minty, super easy ritual.', author: 'Olivia W.' },
      { image: testimonialHsn2, title: 'Smoother breathing routine', quote: "Feels like a real ritual I look forward to. Glad I switched from teas.", author: 'Daniel A.' },
      { image: testimonialHsn3, title: 'Love the smell', quote: 'Lavender + peppermint is the perfect combo. Calming and uplifting.', author: 'Maya S.' },
    ],

    reviewsTeaser: {
      quote: 'I drop 40 drops in my morning water. Bright, herbal, easy ritual to keep.',
      author: 'Olivia W.',
    },
  },

  'normal-blood-sugar-drops': {
    topBadge: 'Metabolic Balance',
    bottomFlavorBadge: 'Unflavored · Cinnamon + Bitter Melon',
    bandIngredients: 'CINNAMON · BITTER MELON · TURMERIC · RESVERATROL',
    reviewCount: '(853)',
    productNoun: 'Drop',
    servingsPerContainer: '30',
    servingSize: '2 ml (40 drops) · 1× daily',

    headlineMain: 'Normal Blood Sugar',
    headlineSuffix: 'Drops',
    subtitle: 'A daily liquid ritual of cinnamon, bitter melon, turmeric and resveratrol.',

    clinicalStats: [
      { label: 'felt better daily metabolic balance', value: 81 },
      { label: 'noticed steadier energy between meals', value: 77 },
      { label: 'kept the daily ritual for 8+ weeks', value: 89 },
      { label: 'preferred the unflavored mix-in format', value: 84 },
    ],
    highlightLead: 'self-reported metabolic balance improvement',
    highlightValue: '+72%',
    clinicalH2A: 'Botanicals traditionally used for',
    clinicalH2B: 'normal glucose balance',
    clinicalFootnote: 'Based on 8-week self-reported customer survey, n = 241. Results are typical, not guaranteed.',

    benefitsKicker: 'Life-Changing Benefits',
    benefitsH2A: 'Daily',
    benefitsH2B: 'metabolic balance',
    benefitsLead: 'Cinnamon and bitter melon — two of the most studied traditional glucose-balance botanicals — paired with turmeric and resveratrol for antioxidant support.',

    allInOneH2A: 'A Daily Ritual for',
    allInOneH2B: 'Metabolic Wellness',
    allInOneBody: 'A balanced blend of cinnamon, licorice root, bitter melon, turmeric and resveratrol — designed as a single daily liquid dose that mixes into water, tea or coffee.',

    ritualLead: 'A measured liquid dose is easier to keep than another bottle of capsules — and that consistency is what matters.',
    competitorName: 'Generic Glucose Capsules',
    pros: [
      '40 drops, once a day — easy to keep',
      'Cinnamon + bitter melon synergy',
      'Antioxidant support from turmeric & resveratrol',
      'Made in the USA · unflavored',
    ],
    cons: [
      'Multiple pills per day',
      'Often missing the antioxidant layer',
      'Slower, less consistent absorption',
      'Easy to forget',
    ],

    insideLead: 'The botanical core of the formula.',
    ingredients: [
      { name: 'Cinnamon (cassia)', tag: 'Metabolic', dose: '500 mg 1:5 extract', desc: 'One of the most-studied traditional botanicals for supporting healthy glucose balance.', image: ingTurmeric },
      { name: 'Bitter Melon', tag: 'Glucose Support', dose: '4:1 extract', desc: 'Time-honored botanical traditionally used to support normal metabolic wellness.', image: ingChromium },
      { name: 'Turmeric + Resveratrol', tag: 'Antioxidant', dose: '75 mg + 98% extract', desc: 'Antioxidant pair that helps protect cells from everyday oxidative stress.', image: ingGinger },
    ],

    tastyBody: 'Unflavored — most people mix it into water, tea or coffee. Shake well before each use, then take 40 drops once a day.',
    propsText: 'Vegan · Gluten-free · Non-GMO · Unflavored',
    supplementFacts: [
      { name: 'Cinnamon Bark Extract (1:5)', amount: '500 mg', dv: '†' },
      { name: 'Licorice Root Extract (1:5)', amount: '174 mg', dv: '†' },
      { name: 'Turmeric Root Extract (1:5)', amount: '75 mg', dv: '†' },
      { name: 'Coriander Seed Extract (1:5)', amount: '50 mg', dv: '†' },
      { name: 'Bitter Melon Extract (4:1)', amount: '0.8 mg', dv: '†' },
      { name: 'Japanese Knotweed (98% Resveratrol)', amount: '0.1 mg', dv: '†' },
    ],

    bundleSubtitle: 'Pair with Probiotic + Metabolism Strips for a complete metabolic ritual.',

    doctors: baseDoctors(
      'A sensible everyday metabolic blend',
      "Cinnamon and bitter melon are well-documented traditional botanicals. The addition of turmeric and resveratrol gives this formula a useful antioxidant layer.",
      'Built for routine, not crisis',
      "This is a supportive daily wellness product — best paired with consistent eating, sleep and movement. Patients keep liquid formats better than pills.",
    ),

    testimonials: [
      { image: testimonialHsn1, title: 'Easy daily ritual', quote: 'Drops go in my morning coffee. Doesn’t change the taste, super easy to keep.', author: 'Rachel H.' },
      { image: testimonialHsn2, title: 'Steadier between meals', quote: 'I feel more level between meals — fewer afternoon energy dips.', author: 'Jasmine K.' },
      { image: testimonialHsn3, title: 'Finally consistent', quote: 'I never finished a bottle of capsules. This one I finished in 30 days flat.', author: 'Andre M.' },
    ],

    reviewsTeaser: {
      quote: 'Drops go straight into my morning coffee. Easy daily ritual I actually keep.',
      author: 'Rachel H.',
    },
  },
};

export function getDropPDPExtras(slug: string): DropPDPExtras | undefined {
  return dropsPDPExtras[slug];
}
