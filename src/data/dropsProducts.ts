// Local catalog for liquid-drop wellness products.
// These products are NOT in Shopify yet — pages render from this data only.
// All drops priced at $24.99 with a $39.99 compare-at anchor for consistency.

import dietImg from '@/assets/drops-diet-ultra.jpg';
import methyleneImg from '@/assets/drops-methylene-blue.jpg';
import respiratoryImg from '@/assets/drops-respiratory.jpg';
import bloodSugarImg from '@/assets/drops-blood-sugar.jpg';

export interface DropProduct {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  tagline: string;
  price: number;
  comparePrice: number;
  image: string;
  imageAlt: string;
  size: string;
  weight: string;
  // SEO
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  // Copy
  shortDescription: string;
  longDescription: string[];
  benefits: { title: string; body: string }[];
  ingredientsList: string;
  keyIngredients: { name: string; role: string }[];
  usage: string;
  caution: string;
  warning: string;
  disclaimer: string;
  faqs: { q: string; a: string }[];
}

export const dropsProducts: DropProduct[] = [
  {
    slug: 'diet-drops-ultra',
    name: 'Diet Drops Ultra',
    shortName: 'Diet Drops',
    category: 'Metabolism & Weight Support',
    tagline: 'Proprietary Active-8 & African Mango Complex',
    price: 24.99,
    comparePrice: 39.99,
    image: dietImg,
    imageAlt: 'NEUVIE Diet Drops Ultra — 1oz amber dropper bottle with African Mango Complex',
    size: '1 fl oz (30 ml)',
    weight: '2.9 oz / 0.18 lb / 82 g',
    seoTitle: 'Diet Drops Ultra – African Mango & Active-8 Complex | NEUVIE',
    metaDescription: 'Diet Drops Ultra with African Mango, Maca & Rhodiola. A liquid metabolism support drop for your active lifestyle. Made in USA. Free US shipping $50+.',
    keywords: ['diet drops', 'african mango drops', 'liquid metabolism supplement', 'weight support drops', 'active-8 complex', 'maca rhodiola liquid'],
    shortDescription:
      "Diet Drops Ultra is crafted for people committed to an active lifestyle and balanced nutrition. A liquid Proprietary Active-8 & African Mango Complex that complements your diet and exercise routine — so you feel energized and confident every day.",
    longDescription: [
      "Diet Drops Ultra is crafted for people committed to an active lifestyle and balanced nutrition. Its Proprietary Active-8 & African Mango Complex combines plant extracts, amino acids, and natural botanicals to help support healthy metabolism and overall wellness. Designed to complement your diet and exercise routine, helping you feel energized and confident in your daily activities.",
      "Key ingredients like African Mango Fruit Extract, Maca Root, and Rhodiola Rosea work together to help support natural energy levels and metabolic function, so you can stay active and maintain a healthy routine. Amino acids like L-Arginine, L-Glutamine, and L-Carnitine contribute to cellular energy and nutrient support, helping your body perform at its best.",
      "With natural flavors, Stevia, and Xylitol, Diet Drops Ultra is easy to integrate into your daily wellness routine. By combining these carefully selected ingredients, it provides supportive nutrition that complements your healthy eating and active lifestyle — helping you stay motivated and on track with your weight management journey.*",
    ],
    benefits: [
      { title: 'Active-8 & African Mango Complex', body: 'A proprietary blend of botanicals and amino acids that supports healthy metabolism and overall wellness.' },
      { title: 'Natural energy & metabolic support', body: 'Maca Root and Rhodiola Rosea traditionally used to help maintain steady, natural energy through your day.' },
      { title: 'Amino-acid nutrient support', body: 'L-Arginine, L-Glutamine and L-Carnitine contribute to cellular energy and nutrient delivery.' },
      { title: 'Easy daily ritual', body: 'A simple liquid dropper format — three measured servings a day, mixed in water or taken directly.' },
    ],
    keyIngredients: [
      { name: 'African Mango Fruit Extract', role: 'Traditional metabolism support botanical' },
      { name: 'Maca Root Extract', role: 'Helps support natural energy and stamina' },
      { name: 'Rhodiola Rosea', role: 'Adaptogen for everyday vitality' },
      { name: 'L-Carnitine + L-Arginine + L-Glutamine', role: 'Amino-acid trio for cellular energy support' },
    ],
    ingredientsList:
      'Proprietary Active-8 & African Mango Complex (African Mango Fruit Extract, Maca Root Extract, Astragalus Membranaceus Root Extract, Rhodiola Rosea Root Extract, Pygeum Africanum Root Extract, L-Arginine Base, L-Glutamine, L-Ornithine HCL, L-Carnitine) 200 mg, Deionized Water, Ethanol, Organic Citrus Extract, Stevia Extract, Xylitol.',
    usage:
      'Adults, take 1 ml three times a day or as directed by a health care professional. For children under 18 years of age, consult a physician before use.',
    caution:
      'Do not exceed recommended dose. Pregnant or nursing mothers, children under 18, and individuals with a known medical condition should consult a physician before using this or any dietary supplement.',
    warning: 'Keep out of reach of children. Do not use if the safety seal is damaged or missing. Store in a cool, dry place.',
    disclaimer:
      '*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.',
    faqs: [
      { q: 'How do I take Diet Drops Ultra?', a: 'Adults take 1 ml (one full dropper) three times a day. Drop directly under the tongue or mix into water or a beverage.' },
      { q: 'Will this help me lose weight?', a: 'Diet Drops Ultra is a supportive supplement designed to complement a balanced diet and active lifestyle — not a replacement for them.' },
      { q: 'Is it made in the USA?', a: 'Yes. Diet Drops Ultra is manufactured in the USA in an FDA-registered facility.' },
      { q: 'Does it contain sugar?', a: 'No added sugar. It is naturally sweetened with Stevia and Xylitol.' },
    ],
  },

  {
    slug: 'methylene-blue-drops',
    name: 'Methylene Blue Drops',
    shortName: 'Methylene Blue',
    category: 'Cognitive & Cellular Energy',
    tagline: '10 mg Methylene Blue · Mitochondrial Support',
    price: 24.99,
    comparePrice: 39.99,
    image: methyleneImg,
    imageAlt: 'NEUVIE Methylene Blue Drops — 2oz cobalt blue dropper bottle for cellular energy',
    size: '2 fl oz (60 ml)',
    weight: '2.7 oz / 0.17 lb / 75 g',
    seoTitle: 'Methylene Blue Drops – Cellular Energy & Focus | NEUVIE',
    metaDescription: 'Methylene Blue Drops with 10 mg per serving for mitochondrial support, focus and cellular energy. Made in USA. Free US shipping $50+.',
    keywords: ['methylene blue drops', 'methylene blue supplement', 'liquid methylene blue', 'mitochondrial support', 'biohacker focus drops', 'cellular energy supplement'],
    shortDescription:
      "Methylene Blue Drops are formulated to support normal cellular energy and cognitive wellness. Each serving delivers 10 mg of Methylene Blue Powder — studied for its role in promoting healthy mitochondrial function and normal cellular metabolism.",
    longDescription: [
      "Methylene Blue Drops are formulated to support normal cellular energy and cognitive wellness. Each serving delivers 10 mg of Methylene Blue Powder, an ingredient studied for its role in promoting healthy mitochondrial function and normal cellular metabolism. Provides support for focus and alertness as part of overall cognitive and cellular health.",
      "The liquid drop format makes this supplement highly convenient and easy to incorporate into your daily routine. Adults can take 20 drops orally each day, directly from the dropper or added to a beverage. This simple delivery method ensures consistent daily use without hassle, making it ideal for busy adults with demanding schedules.",
      "This product is particularly suited for biohackers, students, high-stress workers, or anyone looking to support their mental performance and cellular health as part of a balanced lifestyle. By integrating Methylene Blue Drops into a daily wellness regimen, users can help maintain healthy cognitive function and cellular energy over time.*",
    ],
    benefits: [
      { title: 'Mitochondrial support', body: '10 mg per serving — studied for supporting healthy mitochondrial function and cellular metabolism.' },
      { title: 'Focus & alertness', body: 'A measured daily dose to support normal cognitive performance and mental clarity.' },
      { title: 'Simple liquid format', body: 'No capsules to swallow — 20 drops once daily, straight from the dropper or in your favorite beverage.' },
      { title: 'Made for modern routines', body: 'Designed for biohackers, students, and high-stress professionals who care about long-term cellular health.' },
    ],
    keyIngredients: [
      { name: 'Methylene Blue Powder (10 mg)', role: 'Studied for mitochondrial and cognitive support' },
      { name: 'Purified Water', role: 'Clean carrier for precise dosing' },
      { name: 'Potassium Sorbate', role: 'Preservative for shelf stability' },
    ],
    ingredientsList: 'Methylene Blue Powder (10 mg), Water, Potassium Sorbate.',
    usage:
      'Shake well before each use. Adults: take 1 ml (20 drops) orally once daily, preferably in the morning. Fill the dropper and dispense directly into your mouth or add to your preferred beverage. If well tolerated, a second serving may be taken later in the day.',
    caution:
      'The safety of this product has not been determined. Pregnant or nursing women, children under 18, and individuals with known medical conditions should consult a healthcare professional before using this or any dietary supplement.',
    warning: 'Keep out of reach of children. Do not use if safety seal is broken or missing. Store in a cool, dry place. Methylene Blue can stain — handle carefully.',
    disclaimer:
      '*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.',
    faqs: [
      { q: 'What is methylene blue used for?', a: 'It is traditionally studied for supporting mitochondrial function, cellular energy production and cognitive performance.' },
      { q: 'When should I take it?', a: 'Morning is recommended. A second serving later in the day may be taken if well tolerated — but avoid taking it too close to bedtime.' },
      { q: 'Will it stain my mouth?', a: 'Methylene blue can leave a temporary blue color on the tongue and teeth. Many users dilute the drops in a glass of water to minimize this.' },
      { q: 'Is it made in the USA?', a: 'Yes. Manufactured in the USA.' },
    ],
  },

  {
    slug: 'respiratory-lung-health-drops',
    name: 'Respiratory & Lung Health Drops',
    shortName: 'Respiratory Drops',
    category: 'Respiratory Wellness',
    tagline: 'Mullein · Menthol · Peppermint · Lavender in MCT Oil',
    price: 24.99,
    comparePrice: 39.99,
    image: respiratoryImg,
    imageAlt: 'NEUVIE Respiratory & Lung Health Drops — 2oz amber dropper bottle with mullein and peppermint oils',
    size: '2 fl oz (60 ml)',
    weight: '2.7 oz / 0.17 lb / 75 g',
    seoTitle: 'Respiratory & Lung Health Drops – Mullein & Menthol Oil | NEUVIE',
    metaDescription: 'Respiratory & Lung Health Drops with mullein, peppermint, menthol and lavender in MCT oil. Daily respiratory wellness support. Made in USA.',
    keywords: ['respiratory drops', 'lung health drops', 'mullein oil drops', 'menthol peppermint drops', 'lung support supplement', 'breathing wellness oil'],
    shortDescription:
      "Respiratory & Lung Health Drops bring together essential oils and herbal extracts traditionally valued for respiratory wellness — mullein, menthol, peppermint, orange peel and lavender, delivered in a smooth MCT oil base.",
    longDescription: [
      "Respiratory & Lung Health Drops bring together essential oils and herbal extracts traditionally valued for supporting respiratory health and overall wellness. The proprietary blend includes menthol and peppermint, known for their refreshing and uplifting qualities, alongside mullein oil — a botanical historically used in wellness practices. Orange peel and lavender oils add a balancing touch, creating a formula designed for everyday respiratory support.",
      "Delivered in a smooth oil base with MCT oil, this supplement is easy to take daily, either directly with the dropper or mixed into a beverage. The liquid oil format makes it simple to stay consistent with your wellness routine and is especially convenient for those with busy, active lifestyles.",
      "Created for adults seeking to support their respiratory wellness, Respiratory & Lung Health Drops may appeal to athletes, biohackers, and wellness enthusiasts alike. Whether you're focused on performance, everyday energy, or holistic balance, this plant-based oil blend offers a practical way to complement your health-conscious lifestyle.*",
    ],
    benefits: [
      { title: 'Mullein-led botanical blend', body: 'Mullein oil has been historically used in traditional wellness practices to support respiratory comfort.' },
      { title: 'Refreshing menthol & peppermint', body: 'A bright, uplifting profile that feels clean and easy to take every morning.' },
      { title: 'Smooth MCT oil base', body: 'Delivered in MCT oil so the plant extracts mix easily into your routine — drop directly or in a beverage.' },
      { title: 'Made for active lifestyles', body: 'Designed for athletes, biohackers and wellness enthusiasts who care about respiratory wellness.' },
    ],
    keyIngredients: [
      { name: 'Mullein Oil', role: 'Traditional respiratory wellness botanical' },
      { name: 'Peppermint & Menthol', role: 'Bright, refreshing aromatic support' },
      { name: 'Lavender Essential Oil', role: 'Calming, balancing botanical note' },
      { name: 'MCT Oil Base', role: 'Smooth, easy-to-dose carrier oil' },
    ],
    ingredientsList:
      'Proprietary Oil Blend (Menthol USP, Peppermint Essential Oil, Mullein Oil, Citrus Aurantium Dulcis (Orange) Peel Oil, Lavender Essential Oil) 400 mg, MCT Oil.',
    usage:
      'Shake well before use. Adults take 2 ml (40 drops) orally once daily, preferably in the morning. Dispense directly into the mouth or mix with a beverage.',
    caution:
      'Do not exceed the recommended dose. Pregnant or nursing women, children under 18, or individuals with medical conditions should consult a healthcare professional before use.',
    warning: 'Keep out of reach of children. Store in a cool, dry place.',
    disclaimer:
      '*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.',
    faqs: [
      { q: 'How does it taste?', a: 'Bright, herbal and minty from the peppermint and menthol — softened by orange peel and lavender. Mixes well into water or tea.' },
      { q: 'When should I take it?', a: 'Once daily, ideally in the morning. Shake well before each use.' },
      { q: 'Is it vegan?', a: 'Yes — the entire blend is plant-based, suspended in MCT oil.' },
      { q: 'Is it made in the USA?', a: 'Yes. Manufactured in the USA.' },
    ],
  },

  {
    slug: 'normal-blood-sugar-drops',
    name: 'Normal Blood Sugar Drops',
    shortName: 'Blood Sugar Drops',
    category: 'Metabolic Balance',
    tagline: 'Cinnamon · Bitter Melon · Turmeric · Resveratrol',
    price: 24.99,
    comparePrice: 39.99,
    image: bloodSugarImg,
    imageAlt: 'NEUVIE Normal Blood Sugar Drops — 2oz amber dropper bottle with cinnamon and turmeric botanicals',
    size: '2 fl oz (60 ml)',
    weight: '2.7 oz / 0.17 lb / 75 g',
    seoTitle: 'Normal Blood Sugar Drops – Cinnamon & Bitter Melon | NEUVIE',
    metaDescription: 'Normal Blood Sugar Drops with cinnamon, bitter melon, turmeric and resveratrol. Liquid botanical support for metabolic balance. Made in USA.',
    keywords: ['blood sugar drops', 'cinnamon liquid supplement', 'bitter melon drops', 'glucose support supplement', 'metabolic balance drops', 'turmeric resveratrol liquid'],
    shortDescription:
      "Normal Blood Sugar Drops feature a carefully balanced combination of botanicals traditionally used to support normal glucose and carbohydrate metabolism — cinnamon, bitter melon, licorice root, turmeric and resveratrol in one daily liquid ritual.",
    longDescription: [
      "Normal Blood Sugar Drops feature a carefully balanced combination of botanicals traditionally used to support normal glucose and carbohydrate metabolism. Cinnamon and bitter melon are well-known for their role in helping maintain healthy glucose balance, while licorice root and coriander seed have long been valued in traditional wellness practices. Together, these plant extracts offer gentle daily support for those who wish to maintain normal metabolic health as part of an active lifestyle.",
      "Turmeric and resveratrol add antioxidant support, helping protect cells from oxidative stress while contributing to overall wellness. This makes the blend not only supportive of healthy glucose metabolism, but also beneficial for broader metabolic balance. Each ingredient was chosen to complement the others, providing a multifaceted approach to daily nutritional support.",
      "Designed for convenience, the liquid format makes it easy to stay consistent with your supplement routine. Adults can take a daily dose by dropper, directly or mixed into a favorite beverage. With its unflavored profile, Normal Blood Sugar Drops fit seamlessly into your morning ritual or daily wellness practices — practical support without disrupting your lifestyle.*",
    ],
    benefits: [
      { title: 'Cinnamon + bitter melon synergy', body: 'Two of the most-studied traditional botanicals for supporting healthy glucose balance, paired in a single drop.' },
      { title: 'Antioxidant support', body: 'Turmeric and resveratrol help protect cells from everyday oxidative stress.' },
      { title: 'Daily metabolic balance', body: 'Crafted for adults who want to maintain normal metabolic health as part of an active lifestyle.' },
      { title: 'Unflavored & easy to use', body: 'Mix into water, tea or coffee — fits seamlessly into your existing morning ritual.' },
    ],
    keyIngredients: [
      { name: 'Cinnamon (Cinnamomum cassia)', role: 'Traditional glucose balance support' },
      { name: 'Bitter Melon (Momordica charantia)', role: 'Time-honored botanical for metabolic wellness' },
      { name: 'Turmeric (Curcuma longa)', role: 'Antioxidant support for daily wellness' },
      { name: 'Resveratrol (Japanese Knotweed 98%)', role: 'Cellular antioxidant support' },
    ],
    ingredientsList:
      '1:5 Extract of Cinnamon (Cinnamomum cassia) (bark) 500 mg, 1:5 Extract of Licorice Root 174 mg, 1:5 Extract of Turmeric Root (Curcuma longa) 75 mg, 1:5 Extract of Coriander Seed 50 mg, Bitter Melon Extract (Momordica charantia Linn.) (fruit) (4:1) 0.8 mg, Japanese Knotweed Extract (98% Resveratrol) (Polygonum cuspidatum) (root) 0.1 mg, Water, Glycerin, Potassium Sorbate.',
    usage:
      'Shake well before each use. Adults take 2 ml (40 drops) orally once per day, preferably in the morning. Fill the dropper and dispense directly into the mouth or add to your preferred beverage. If desired and well tolerated, an additional serving may be taken later in the day.',
    caution:
      'Do not exceed the recommended dose. Pregnant or nursing women, children under 18, and individuals with a known medical condition should consult a healthcare professional before using this or any dietary supplement.',
    warning: 'Keep out of reach of children. Do not use if safety seal is damaged or missing. Store in a cool, dry place.',
    disclaimer:
      '*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.',
    faqs: [
      { q: 'Is this a replacement for diabetes medication?', a: 'No. This is a dietary supplement intended to support normal metabolic health. If you have a medical condition, consult your healthcare professional before use.' },
      { q: 'When should I take it?', a: 'Once daily, preferably in the morning. A second serving may be added later in the day if well tolerated.' },
      { q: 'Does it taste sweet?', a: 'It is unflavored. Most people mix it into water, tea or coffee.' },
      { q: 'Is it made in the USA?', a: 'Yes. Manufactured in the USA.' },
    ],
  },
];

export function getDropProduct(slug: string): DropProduct | undefined {
  return dropsProducts.find((p) => p.slug === slug);
}
