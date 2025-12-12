// English product content for all 13 Neuvie supplement strips
// SEO-optimized, legally compliant product descriptions

export interface ProductContent {
  handle: string;
  seoTitle: string;
  metaDescription: string;
  shortDescription: string;
  benefits: Array<{ headline: string; description: string }>;
  longDescription: string[];
  usage: string;
  ingredients: string[];
  supplementFacts: Array<{ nutrient: string; amount: string }>;
  properties: string[];
  disclaimer: string;
}

export const productContentMap: Record<string, ProductContent> = {
  // 1. Hangover Strips
  'hangover': {
    handle: 'hangover',
    seoTitle: 'Hangover Strips Mango-Orange | Natural Recovery | Neuvie',
    metaDescription: 'Neuvie Hangover Strips with Curcumin, Date Extract & Grape Seed Extract. Supports liver function, hydration & natural recovery. Mango-Orange flavor.',
    shortDescription: 'Our Hangover Strips are formulated with Ayurvedic ingredients to support your body after a night out. For best results, take 1 strip before bed. Supports hydration, restful sleep, and helps reduce occasional discomfort.',
    benefits: [
      { headline: 'Multi-Symptom Support', description: 'Helps address headaches, sleep disruption, and general discomfort after drinking.' },
      { headline: 'Healthy Inflammatory Response', description: 'Curcuma Longa and other botanicals support normal inflammatory processes.' },
      { headline: 'Liver Support', description: 'Andrographis and Phyllanthus may help support normal liver function.' },
      { headline: 'Hydration Balance', description: 'Formulated to maintain hydration and support overall well-being.' },
    ],
    longDescription: [
      'Our Hangover Oral Strips are crafted with a blend of ingredients inspired by traditional Ayurvedic practices, designed to support general wellness after social activities.',
      'Each strip delivers a unique combination of Curcuma Longa (Curcumin), Date Extract, Grape Seed Extract, and other botanicals traditionally valued for supporting the body\'s natural recovery processes.',
      'The formula includes Andrographis and Phyllanthus for liver support, plus natural flavors that make taking your strip a pleasant experience.',
      'Simply place one strip on your tongue before bed and let it dissolve. No water needed, no pills to swallow—just fast-dissolving convenience.',
    ],
    usage: 'Place 1 strip on your tongue before bed and let it dissolve completely.',
    ingredients: [
      'Pullulan', 'Phoenix Dactylifera extract', 'Curcuma Longa extract', 'Andrographis paniculata extract',
      'Cichorium intybus extract', 'Vitis Vinifera extract', 'Phyllanthus Niruri extract',
      'Phyllanthus Emblica extract', 'Cellulose', 'Mannitol', 'Licorice extract',
      'Lecithin', 'Malic acid', 'Mango flavor', 'Stevia glycosides', 'Orange flavor'
    ],
    supplementFacts: [
      { nutrient: 'Phoenix Dactylifera Extract', amount: '*' },
      { nutrient: 'Curcuma Longa Extract', amount: '*' },
      { nutrient: 'Andrographis Paniculata Extract', amount: '*' },
      { nutrient: 'Vitis Vinifera Extract', amount: '*' },
      { nutrient: 'Phyllanthus Extracts', amount: '*' },
    ],
    properties: ['Vegan', 'Gluten-Free', 'Non-GMO', 'No Artificial Colors', 'Sugar-Free'],
    disclaimer: 'These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before use.',
  },

  // 2. Bone Support Strips
  'bone': {
    handle: 'bone',
    seoTitle: 'Bone Support Strips Raspberry | Vitamin D3 + K2 | Neuvie',
    metaDescription: 'Neuvie Bone Support Strips with Vitamin D3 (2000 IU) & K2 (200 mcg). Supports bone health, calcium absorption & immune function. Convenient strip format.',
    shortDescription: 'Bone Support Strips combine Vitamin D3 and K2 in a fast-dissolving, raspberry-flavored strip. Supports normal calcium metabolism, bone strength, and immune function—anytime, anywhere.',
    benefits: [
      { headline: 'Essential for Bone Health', description: 'Vitamin K2 helps direct calcium to bones where it\'s needed.' },
      { headline: 'Supports Bone Strength', description: 'Vitamin D3 aids calcium absorption for stronger bones.' },
      { headline: 'On-the-Go Convenience', description: 'Raspberry-flavored strips you can take anywhere, no water needed.' },
      { headline: 'Immune System Support', description: 'Vitamin D3 also contributes to normal immune function.' },
    ],
    longDescription: [
      'Support your wellness routine with Bone Support Strips, a convenient oral supplement formulated with Vitamin D3 and Vitamin K2.',
      'These essential nutrients work together to support your body\'s natural calcium utilization and bone maintenance. Vitamin D3 aids calcium absorption, while Vitamin K2 helps direct that calcium to your bones.',
      'Each raspberry-flavored strip dissolves quickly on your tongue—no water or pills required. Perfect for busy lifestyles.',
    ],
    usage: 'Place 1 strip on your tongue daily and let it dissolve completely.',
    ingredients: [
      'Vitamin D3 (Cholecalciferol) (2000 IU)', 'Vitamin K2 (Menaquinone) (200 mcg)',
      'Pullulan', 'Cellulose', 'Lecithin', 'Raspberry Flavor', 'Malic Acid',
      'Erythritol', 'Sorbitol Syrup', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Vitamin D3', amount: '2000 IU (50 mcg)' },
      { nutrient: 'Vitamin K2 (MK-7)', amount: '200 mcg' },
    ],
    properties: ['Vegan', 'Gluten-Free', 'Non-GMO', 'Lactose-Free', 'No Added Sugar'],
    disclaimer: 'These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.',
  },

  // 3. Cognitive Relax Strips
  'cognitive': {
    handle: 'cognitive',
    seoTitle: 'Cognitive Relax Strips Strawberry-Mint | L-Theanine + GABA | Neuvie',
    metaDescription: 'Neuvie Cognitive Relax Strips with L-Theanine (50mg), GABA (25mg) & Vitamin B6. Supports relaxation, focus & nervous system. Strawberry-Mint flavor.',
    shortDescription: 'Cognitive Relax Strips combine L-Theanine, GABA, and Vitamin B6 to support stress management, mental clarity, and nervous system wellness. Take 1 strip daily—anytime you need calm focus.',
    benefits: [
      { headline: 'Calm, Focused Mind', description: 'L-Theanine promotes mental relaxation without drowsiness.' },
      { headline: 'Mental Wellbeing', description: 'GABA supports your body\'s natural stress response.' },
      { headline: 'Nervous System Support', description: 'Vitamin B6 contributes to normal nervous system function.' },
      { headline: 'Anytime Convenience', description: 'Fast-dissolving strips—no water needed, take anywhere.' },
    ],
    longDescription: [
      'Find your calm with Cognitive Relax Strips, thoughtfully formulated with L-Theanine from Green Tea, GABA, and Vitamin B6.',
      'L-Theanine, found naturally in green tea, is known for promoting a calm, relaxed state while helping maintain mental clarity—no drowsiness.',
      'GABA supports normal nervous system activity, while Vitamin B6 contributes to energy metabolism and nervous system function. Together, they promote everyday balance.',
      'Simply place one strip on your tongue and let it dissolve. Enjoy the refreshing strawberry-mint flavor.',
    ],
    usage: 'Place 1 strip on your tongue daily and let it dissolve completely.',
    ingredients: [
      'Green Tea L-Theanine (50 mg)', 'GABA (25 mg)', 'Vitamin B6 (8 mg)',
      'Pullulan', 'Mannitol', 'Cellulose', 'Strawberry Flavor', 'Lecithin',
      'Malic Acid', 'Monk Fruit Extract', 'Pectin', 'Erythritol', 'Peppermint Flavor', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'L-Theanine', amount: '50 mg' },
      { nutrient: 'GABA', amount: '25 mg' },
      { nutrient: 'Vitamin B6', amount: '8 mg' },
    ],
    properties: ['Vegan', 'Gluten-Free', 'Non-GMO', 'Caffeine-Free', 'No Artificial Sweeteners'],
    disclaimer: 'These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.',
  },

  // 4. Mushroom Focus Strips
  'mushroom': {
    handle: 'mushroom',
    seoTitle: 'Mushroom Focus Strips Chocolate | Lion\'s Mane + Cordyceps | Neuvie',
    metaDescription: 'Neuvie Mushroom Focus Strips with Lion\'s Mane, Cordyceps, Maitake & Shiitake. Supports focus, energy & cognitive function. Rich chocolate flavor.',
    shortDescription: 'Support your focus, energy & mental wellness with Mushroom Focus Strips. A curated blend of Lion\'s Mane, Maitake, Cordyceps, and Shiitake in a rich chocolate-flavored strip. Zero-fuss, quick-dissolving.',
    benefits: [
      { headline: 'Cognitive Support', description: 'Lion\'s Mane is traditionally used to support focus and mental clarity.' },
      { headline: 'Natural Energy', description: 'Cordyceps supports energy metabolism and stamina.' },
      { headline: 'Immune Balance', description: 'Maitake & Shiitake promote immune function and antioxidant support.' },
      { headline: 'Delicious Convenience', description: 'Rich chocolate flavor, dissolves quickly—no capsules or water needed.' },
    ],
    longDescription: [
      'Sharpen your mental clarity with Mushroom Focus Strips, a convenient and flavorful way to support your cognitive routine.',
      'These smooth, chocolate-flavored strips dissolve on your tongue, delivering a curated blend of functional mushroom extracts traditionally valued for supporting normal cognitive function.',
      'Each strip combines: Lion\'s Mane for focus and cognitive support, Maitake for immune function, Cordyceps for energy and stamina, and Shiitake for immune balance and antioxidant properties.',
      'Perfect for busy days—no water or capsules needed. Just place on your tongue and go.',
    ],
    usage: 'Place 1 strip on your tongue daily and let it dissolve completely.',
    ingredients: [
      'Hericium Erinaceus (Lion\'s Mane) (50 mg)', 'Grifola Frondosa (Maitake) (25 mg)',
      'Cordyceps Sinensis (Cordyceps) (25 mg)', 'Lentinus Edodes (Shiitake) (20 mg)',
      'Pullulan', 'Cellulose', 'Lecithin', 'Chocolate Flavor', 'Monk Fruit Extract',
      'Medium-Chain Triglycerides', 'Xanthan Gum', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Lion\'s Mane Extract', amount: '50 mg' },
      { nutrient: 'Maitake Extract', amount: '25 mg' },
      { nutrient: 'Cordyceps Extract', amount: '25 mg' },
      { nutrient: 'Shiitake Extract', amount: '20 mg' },
    ],
    properties: ['Vegan', 'Gluten-Free', 'Non-GMO', 'No Artificial Colors', 'Organic Mushroom Extracts'],
    disclaimer: 'These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.',
  },

  // 5. Libido Support Strips
  'libido': {
    handle: 'libido',
    seoTitle: 'Libido Support Strips Chocolate | Cordyceps + Shilajit | Neuvie',
    metaDescription: 'Neuvie Libido Support Strips with Cordyceps, Shilajit & Oyster Peptide. Supports vitality, stamina & sexual wellness. Discreet and convenient.',
    shortDescription: 'Libido Support Strips are designed for adults seeking to maintain healthy energy, stamina, and sexual wellness. With Cordyceps, Shilajit, and Oyster Peptide in a rich chocolate-flavored format.',
    benefits: [
      { headline: 'Active Vitality', description: 'Cordyceps traditionally supports stamina and endurance.' },
      { headline: 'Mineral Support', description: 'Shilajit provides naturally occurring minerals for wellness.' },
      { headline: 'Marine-Derived Peptides', description: 'Oyster Peptide supports overall sexual wellness.' },
      { headline: 'Discreet & Convenient', description: 'Rich chocolate flavor, quick-dissolving—no pills or water.' },
    ],
    longDescription: [
      'Add vitality to your wellness routine with Libido Support Strips, specially crafted for adults looking to maintain healthy energy, stamina, and sexual wellness.',
      'Each strip delivers Cordyceps militaris, Shilajit, and Oyster Peptide—ingredients traditionally valued for supporting endurance, energy metabolism, and sexual function.',
      'Cordyceps is associated with promoting stamina and vitality, while Shilajit provides naturally occurring minerals that support wellness.',
      'These chocolate-flavored strips dissolve easily on your tongue, offering a simple, discreet way to support your vitality.',
    ],
    usage: 'Place 1-2 strips on your tongue as needed. Do not exceed 2 strips per day.',
    ingredients: [
      'Cordyceps Militaris (50 mg)', 'Asphaltum Punjabinum (Shilajit) (50 mg)', 'Oyster Peptide (20 mg)',
      'Pullulan', 'Cellulose', 'Monk Fruit Extract', 'Lecithin', 'Chocolate Flavor',
      'Erythritol', 'Sorbitol', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Cordyceps Militaris Extract', amount: '50 mg' },
      { nutrient: 'Shilajit Extract', amount: '50 mg' },
      { nutrient: 'Oyster Peptide', amount: '20 mg' },
    ],
    properties: ['Gluten-Free', 'Non-GMO', 'No Artificial Colors', 'Discreet Format'],
    disclaimer: 'These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Not for children.',
  },

  // 6. Probiotic + Metabolism Strips
  'probiotic': {
    handle: 'probiotic',
    seoTitle: 'Probiotic + Metabolism Strips | 10 Billion CFU | Neuvie',
    metaDescription: 'Neuvie Probiotic + Metabolism Strips with 10 Billion CFU Bifidobacterium lactis, Polydextrose & Monk Fruit. Supports gut health & digestion.',
    shortDescription: 'Probiotic + Metabolism Strips offer easy, delicious support for digestive health. Each strip delivers 10 Billion CFU plus prebiotic fiber to promote a healthy gut microbiome. Mixed-Berry flavor.',
    benefits: [
      { headline: 'Daily Digestive Support', description: '10 Billion CFU support a healthy gut flora and digestion.' },
      { headline: 'Probiotic + Prebiotic Synergy', description: 'Probiotics plus prebiotic fiber work together for enhanced effect.' },
      { headline: 'Anytime Convenience', description: 'Dissolving strips—no capsules, no water, take anywhere.' },
      { headline: 'Refreshing Flavor', description: 'Light mixed berry taste—perfect for your daily routine.' },
    ],
    longDescription: [
      'Make digestive wellness effortless with Probiotic + Metabolism Strips. Each strip contains Bifidobacterium lactis, a probiotic that helps support a healthy balance of gut bacteria.',
      'Combined with prebiotic fiber that fuels beneficial bacteria, these strips work in harmony to promote digestive balance.',
      'The strips dissolve on your tongue in seconds—no water required. Portable and convenient for travel, work, or on-the-go lifestyles.',
      'With a light mixed berry flavor and natural sweeteners like monk fruit, you get a clean-tasting experience without added sugars.',
    ],
    usage: 'Place 1 strip on your tongue daily and let it dissolve. Best taken in the morning on an empty stomach.',
    ingredients: [
      'Polydextrose (30mg)', 'Bifidobacterium lactis 25.7mg (10 Billion CFU)',
      'Pullulan', 'Cellulose', 'Mixed Berry Flavor', 'Sunflower Lecithin',
      'Monk Fruit Extract', 'Erythritol', 'Medium Chain Triglycerides', 'Malic Acid', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Bifidobacterium lactis', amount: '10 Billion CFU' },
      { nutrient: 'Polydextrose', amount: '30 mg' },
    ],
    properties: ['Vegan', 'Gluten-Free', 'Non-GMO', 'Sugar-Free', 'No Artificial Sweeteners'],
    disclaimer: 'These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.',
  },

  // 7. Beauty + Collagen Strips
  'beauty': {
    handle: 'beauty',
    seoTitle: 'Beauty + Collagen Strips Mango | Collagen + Vitamin E | Neuvie',
    metaDescription: 'Neuvie Beauty + Collagen Strips with 100mg Collagen Peptides & Vitamin E. Supports skin elasticity, hair & nails. Delicious mango flavor.',
    shortDescription: 'Beauty + Collagen Strips support your natural collagen production, skin elasticity, and antioxidant protection. Collagen Peptides plus Vitamin E in a fruity mango-flavored strip—perfect for your daily beauty routine.',
    benefits: [
      { headline: 'Skin Elasticity', description: 'Collagen peptides support your skin\'s natural structure.' },
      { headline: 'Antioxidant Protection', description: 'Vitamin E helps protect cells from oxidative stress.' },
      { headline: 'Convenient Beauty Support', description: 'Fruity mango flavor, dissolves on your tongue—no capsules.' },
      { headline: 'Hair & Nail Health', description: 'Collagen provides building blocks for healthy hair and nails.' },
    ],
    longDescription: [
      'Beauty + Collagen Strips offer an easy way to support your daily beauty and wellness routine.',
      'Each strip combines Collagen Peptides (100 mg), which support your body\'s natural collagen structure for skin, hair, and joints, plus Vitamin E for antioxidant protection.',
      'The strips dissolve instantly on your tongue with a pleasant mango flavor. No water needed. Perfect for anyone seeking a quick, convenient beauty solution.',
    ],
    usage: 'Place 1 strip on your tongue daily and let it dissolve. For best results, use consistently over time.',
    ingredients: [
      'Collagen Peptide (100 mg)', 'Vitamin E (6 mg)',
      'Pullulan', 'Cellulose', 'Lecithin', 'Mango Flavor', 'Malic Acid', 'Pectin', 'Monk Fruit Extract', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Collagen Peptides', amount: '100 mg' },
      { nutrient: 'Vitamin E', amount: '6 mg' },
    ],
    properties: ['Gluten-Free', 'Non-GMO', 'No Artificial Colors', 'No Added Sugar'],
    disclaimer: 'These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.',
  },

  // 8. Hair, Skin & Nails Strips
  'hair': {
    handle: 'hair',
    seoTitle: 'Hair, Skin & Nails Strips Orange | Biotin 5000 mcg | Neuvie',
    metaDescription: 'Neuvie Hair, Skin & Nails Strips with Biotin (5000 mcg), Folate & Vitamin D3. Supports hair growth, skin vitality & strong nails. Orange flavor.',
    shortDescription: 'Support your natural glow with Hair, Skin and Nails Strips. Formulated with Biotin, Folate, and Vitamin D3, these fast-dissolving orange-flavored strips support healthy hair, skin, and nail strength. Just 1 strip daily—no water needed.',
    benefits: [
      { headline: 'Biotin for Beauty', description: 'Biotin plays a key role in natural hair, skin & nail health.' },
      { headline: 'Cellular Wellness', description: 'Folate supports healthy cell function and skin vitality.' },
      { headline: 'Daily Sunshine', description: 'Vitamin D3 supports calcium absorption and overall wellness.' },
      { headline: 'On-the-Go Care', description: 'Orange-flavored, dissolves quickly—perfect for mobile beauty routines.' },
    ],
    longDescription: [
      'Nourish your natural beauty from within with Hair, Skin and Nails Strips—a convenient, on-the-go supplement designed to support hair strength, skin vitality, and nail health.',
      'Each strip contains 5,000 mcg of Biotin, a key nutrient known to support the body\'s processes for maintaining healthy hair, skin, and nails.',
      'Paired with Folate (Vitamin B9) and Vitamin D3, this combination helps promote overall wellness and cellular health.',
      'Simply place one strip on your tongue and let it dissolve—no water required. Enjoy the refreshing orange flavor.',
    ],
    usage: 'Place 1 strip on your tongue daily and let it dissolve. For visible results, use consistently for 8-12 weeks.',
    ingredients: [
      'Biotin (5000 mcg)', 'Vitamin B9 (Folate) (400 mcg)', 'Vitamin D3 (Cholecalciferol) (200 mcg)',
      'Pullulan', 'Cellulose', 'Mannitol', 'Monk Fruit Extract', 'Orange Flavor', 'Malic Acid', 'Lecithin', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Biotin', amount: '5000 mcg' },
      { nutrient: 'Folate (Vitamin B9)', amount: '400 mcg' },
      { nutrient: 'Vitamin D3', amount: '200 mcg' },
    ],
    properties: ['Vegan', 'Gluten-Free', 'Non-GMO', 'Lactose-Free', 'No Added Sugar'],
    disclaimer: 'These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.',
  },

  // 9. Digestive + Gut Health Strips
  'digestive': {
    handle: 'digestive',
    seoTitle: 'Digestive + Gut Health Strips | Probiotics + Enzymes | Neuvie',
    metaDescription: 'Neuvie Digestive + Gut Health Strips with Bacillus Coagulans (10 Billion CFU), Protease, Papain & Bromelain. Supports digestion & gut health.',
    shortDescription: 'Digestive + Gut Health Strips support your gut microbiome with a combination of probiotics and digestive enzymes in a fast-dissolving, mixed-berry flavored strip. Perfect for on-the-go digestive support.',
    benefits: [
      { headline: 'Healthy Gut Balance', description: 'Bacillus Coagulans supports a healthy microbiome.' },
      { headline: 'Protein Digestion', description: 'Enzymes like Protease, Papain & Bromelain aid natural digestion.' },
      { headline: 'Fast-Dissolving Convenience', description: 'Dissolves on your tongue in seconds—perfect for travel.' },
      { headline: 'Simple Gut Support', description: 'One strip delivers your daily digestive wellness, portable and easy.' },
    ],
    longDescription: [
      'Support your daily digestive wellness with Digestive + Gut Health Strips, designed for easy, on-the-go use.',
      'Each strip delivers a unique blend of probiotics and digestive enzymes to help maintain normal gut flora balance and support natural digestion.',
      'Bacillus Coagulans, a widely studied probiotic strain, helps maintain healthy gut microflora. Combined with Protease, Papain, and Bromelain, these enzymes assist in protein breakdown and natural digestive processes.',
      'With a refreshing mixed berry flavor and fast-dissolving format, digestive support has never been easier.',
    ],
    usage: 'Place 1 strip on your tongue after a meal and let it dissolve. Up to 2 strips daily as needed.',
    ingredients: [
      'Bacillus Coagulans 10 Billion CFU (50 mg)', 'Digestive Enzymatic Blend (Protease 10 mg, Papain 10 mg, Bromelain 10 mg)',
      'Pullulan', 'Mannitol', 'Monk Fruit Extract', 'Cellulose', 'Lecithin', 'Mixed Berry Flavor', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Bacillus Coagulans', amount: '10 Billion CFU' },
      { nutrient: 'Protease', amount: '10 mg' },
      { nutrient: 'Papain', amount: '10 mg' },
      { nutrient: 'Bromelain', amount: '10 mg' },
    ],
    properties: ['Vegan', 'Gluten-Free', 'Non-GMO', 'Lactose-Free', 'No Artificial Colors'],
    disclaimer: 'These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.',
  },

  // 10. Appetite Balance & Weight Support Strips
  'appetite': {
    handle: 'appetite',
    seoTitle: 'Appetite Balance & Weight Support Strips | Chromium + Saffron | Neuvie',
    metaDescription: 'Neuvie Appetite Balance Strips with Chromium (75 mcg), Molybdenum (100 mcg) & Saffron. Supports normal blood sugar levels & appetite balance.',
    shortDescription: 'Appetite Balance & Weight Support Strips offer easy, quick-dissolving support for nutrition-conscious adults. With Saffron, Chromium, and Molybdenum to support mindful eating habits, metabolism, and daily vitality.',
    benefits: [
      { headline: 'Daily Wellness Support', description: 'Molybdenum supports natural enzyme activity in the body.' },
      { headline: 'Blood Sugar Balance', description: 'Chromium supports glucose metabolism and stable levels.' },
      { headline: 'Botanical Balance', description: 'Saffron extract contributes to emotional balance and wellbeing.' },
      { headline: 'Convenient Format', description: 'Dissolving strip—portable, fast, easy to take anywhere.' },
    ],
    longDescription: [
      'Stay on track with your wellness goals with Appetite Balance & Weight Support Strips.',
      'Each strip contains a thoughtful blend of Saffron extract, Chromium, and Molybdenum to support balanced nutrition and overall well-being.',
      'Saffron has been traditionally used in wellness practices for supporting balance. Chromium supports normal macronutrient metabolism and helps maintain healthy blood sugar levels. Molybdenum contributes to essential nutrient metabolism.',
      'These strips dissolve quickly on the tongue—designed for health-conscious adults, anytime, anywhere.',
    ],
    usage: 'Place 1 strip on your tongue before a meal and let it dissolve. Up to 2 strips daily.',
    ingredients: [
      'Chromium (as Chromium Picolinate) (75 mcg)', 'Molybdenum (as Molybdenum Glycinate 400 mcg) (100 mcg)',
      'Crocus sativus (Saffron) (10 mg)', 'Pullulan', 'Cellulose', 'Malic Acid',
      'Sorbitol Syrup', 'Lecithin', 'Mixed Berry Flavor', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Chromium', amount: '75 mcg' },
      { nutrient: 'Molybdenum', amount: '100 mcg' },
      { nutrient: 'Saffron Extract', amount: '10 mg' },
    ],
    properties: ['Vegan', 'Gluten-Free', 'Non-GMO', 'Sugar-Free', 'No Artificial Sweeteners'],
    disclaimer: 'These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Not a substitute for a calorie-reduced diet.',
  },

  // 11. Iron Strips
  'iron': {
    handle: 'iron',
    seoTitle: 'Iron Strips Raspberry | Iron + Folate | Neuvie',
    metaDescription: 'Neuvie Iron Strips with Iron (19 mg) & Folate (400 mcg). Supports red blood cell formation, oxygen transport & energy. Raspberry flavor.',
    shortDescription: 'Promote your daily wellness with Iron Strips, a raspberry-flavored oral supplement designed to support normal energy and vitality. Easy-to-use, convenient, and no water needed.',
    benefits: [
      { headline: 'Red Blood Cell Formation', description: 'Iron contributes to normal red blood cell production.' },
      { headline: 'Oxygen Transport', description: 'Iron supports normal oxygen transport throughout the body.' },
      { headline: 'Energy Production', description: 'Contributes to normal energy metabolism.' },
      { headline: 'Healthy Cell Formation', description: 'Folate supports normal cell division.' },
    ],
    longDescription: [
      'Support your everyday wellness with Iron Strips, a convenient and gentle way to maintain normal energy levels and overall vitality.',
      'Each strip provides 19 mg of iron, an important mineral for red blood cell production and oxygen transport. Paired with 400 mcg of folate, this formula supports healthy cell formation as part of a balanced diet.',
      'These quick-dissolving, raspberry-flavored strips require no water—perfect for busy lifestyles.',
    ],
    usage: 'Place 1 strip on your tongue daily and let it dissolve completely.',
    ingredients: [
      'Iron (as Ferric Saccharate) (19 mg)', 'Vitamin B9 (Folate) (400 mcg)',
      'Pullulan', 'Cellulose', 'Lecithin', 'Raspberry Flavor', 'Monk Fruit Extract',
      'Citric Acid', 'Medium-Chain Triglycerides', 'Xanthan Gum', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Iron (as Ferric Saccharate)', amount: '19 mg' },
      { nutrient: 'Folate (Vitamin B9)', amount: '400 mcg' },
    ],
    properties: ['Vegan', 'Gluten-Free', 'Non-GMO', 'Lactose-Free', 'No Added Sugar'],
    disclaimer: 'These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.',
  },

  // 12. Energy Strips
  'energy': {
    handle: 'energy',
    seoTitle: 'Energy Strips Cranberry | Caffeine + L-Theanine | Neuvie',
    metaDescription: 'Neuvie Energy Strips with Caffeine (50 mg), L-Theanine (30 mg) & Vitamin B12. Supports focus, endurance & mental clarity. No crash, no jitters.',
    shortDescription: 'Energy Strips are designed for people who need a natural, fast energy boost—without the sugar crash or jitters of energy drinks. Supports focus, endurance, mental clarity, and stable energy.',
    benefits: [
      { headline: 'Enhanced Focus', description: 'Caffeine and L-Theanine together promote focused attention.' },
      { headline: 'Physical Endurance', description: 'Supports physical stamina and performance.' },
      { headline: 'Mental Clarity', description: 'Vitamin B12 contributes to normal cognitive function.' },
      { headline: 'No Crash, No Jitters', description: 'Stable energy release without the typical energy drink crash.' },
    ],
    longDescription: [
      'Energy Strips provide a convenient way to support focus, energy, and daily performance.',
      'These dissolvable cranberry-flavored strips combine caffeine, L-theanine, and vitamin B12 for fast-acting support for mental clarity and endurance.',
      'The formulation is designed for stable, jitter-free energy without the crash associated with sugary drinks.',
      'Perfect for athletes, professionals, students—anyone seeking a fast, controlled energy boost.',
    ],
    usage: 'Place 1 strip on your tongue as needed and let it dissolve. Do not exceed 3 strips per day.',
    ingredients: [
      'Caffeine (50 mg)', 'L-Theanine (30 mg)', 'Vitamin B12 (50 mcg)',
      'Pullulan', 'Mannitol', 'Cellulose', 'Cranberry Flavor', 'Lecithin',
      'Malic Acid', 'Pectin', 'Erythritol', 'Stevia Glycosides', 'Methylcobalamin'
    ],
    supplementFacts: [
      { nutrient: 'Caffeine', amount: '50 mg' },
      { nutrient: 'L-Theanine', amount: '30 mg' },
      { nutrient: 'Vitamin B12', amount: '50 mcg' },
    ],
    properties: ['Vegan', 'Gluten-Free', 'Non-GMO', 'Sugar-Free', 'No Artificial Colors'],
    disclaimer: 'These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Contains caffeine. Not for children, pregnant or nursing mothers.',
  },

  // 13. Sleep Strips
  'sleep': {
    handle: 'sleep',
    seoTitle: 'Sleep Strips Raspberry | Melatonin + Valerian | Neuvie',
    metaDescription: 'Neuvie Sleep Strips with Melatonin (5 mg), Valerian, Chamomile, Lavender & Hibiscus. Supports restful sleep. Non-habit forming.',
    shortDescription: 'This gentle blend of non-habit forming botanical extracts is designed to support a healthy sleep-wake cycle. Helps with restful sleep, stress-related sleep issues, and healthy sleep patterns.',
    benefits: [
      { headline: 'Enhanced Sleep Quality', description: 'Melatonin helps reduce the time it takes to fall asleep.' },
      { headline: 'Stress Reduction', description: 'Valerian and Chamomile may contribute to relaxation.' },
      { headline: 'Deeper Sleep', description: 'Supports deeper sleep phases for true restoration.' },
      { headline: 'Non-Habit Forming', description: 'Gentle, botanical formula without addiction potential.' },
    ],
    longDescription: [
      'Sleep Strips were created to help support relaxation and natural sleep cycles.',
      'The combination of valerian, chamomile, lavender, hibiscus, and melatonin offers a gentle nighttime formula designed to calm the mind and support restful sleep.',
      'These quick-dissolving raspberry-flavored strips are perfect for anyone seeking a natural alternative to traditional sleep aids.',
      'The non-habit forming formula is suitable for consistent nightly use to promote well-being and next-day energy.',
    ],
    usage: 'Place 1 strip on your tongue 30 minutes before bedtime and let it dissolve.',
    ingredients: [
      'Valerian Extract (10 mg)', 'Lavender (5 mg)', 'Chamomile (5 mg)',
      'Hibiscus Extract (5 mg)', 'Melatonin (5 mg)', 'Sorbitol (30 mg)',
      'Medium Chain Triglycerides', 'Steviol Glycosides', 'Xylitol', 'Erythritol',
      'Natural Flavors', 'Pectin', 'Citric Acid'
    ],
    supplementFacts: [
      { nutrient: 'Valerian Extract', amount: '10 mg' },
      { nutrient: 'Lavender', amount: '5 mg' },
      { nutrient: 'Chamomile', amount: '5 mg' },
      { nutrient: 'Hibiscus Extract', amount: '5 mg' },
      { nutrient: 'Melatonin', amount: '5 mg' },
    ],
    properties: ['Vegan', 'Gluten-Free', 'Non-GMO', 'Non-Habit Forming', 'No Artificial Colors'],
    disclaimer: 'These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Not for children, pregnant or nursing mothers. Consult a healthcare provider if taking medications.',
  },
};

// Helper function to find product content by title or handle
export function findProductContent(searchTerm: string): ProductContent | null {
  const lowerSearch = searchTerm.toLowerCase();
  
  // Direct handle match
  for (const [key, content] of Object.entries(productContentMap)) {
    if (lowerSearch.includes(key)) {
      return content;
    }
  }
  
  // Keyword-based matching
  if (lowerSearch.includes('hangover') || lowerSearch.includes('recovery')) {
    return productContentMap['hangover'];
  }
  if (lowerSearch.includes('bone') || lowerSearch.includes('d3') || lowerSearch.includes('k2')) {
    return productContentMap['bone'];
  }
  if (lowerSearch.includes('cognitive') || lowerSearch.includes('relax') || lowerSearch.includes('theanine') || lowerSearch.includes('gaba')) {
    return productContentMap['cognitive'];
  }
  if (lowerSearch.includes('mushroom') || lowerSearch.includes('focus') || lowerSearch.includes('lion')) {
    return productContentMap['mushroom'];
  }
  if (lowerSearch.includes('libido') || lowerSearch.includes('shilajit')) {
    return productContentMap['libido'];
  }
  if (lowerSearch.includes('probiotic') || lowerSearch.includes('metabolism')) {
    return productContentMap['probiotic'];
  }
  if (lowerSearch.includes('beauty') || lowerSearch.includes('collagen')) {
    return productContentMap['beauty'];
  }
  if (lowerSearch.includes('hair') || lowerSearch.includes('skin') || lowerSearch.includes('nail') || lowerSearch.includes('biotin')) {
    return productContentMap['hair'];
  }
  if (lowerSearch.includes('digestive') || lowerSearch.includes('gut')) {
    return productContentMap['digestive'];
  }
  if (lowerSearch.includes('appetite') || lowerSearch.includes('weight') || lowerSearch.includes('saffron')) {
    return productContentMap['appetite'];
  }
  if (lowerSearch.includes('iron') || lowerSearch.includes('folate')) {
    return productContentMap['iron'];
  }
  if (lowerSearch.includes('energy') || lowerSearch.includes('caffeine')) {
    return productContentMap['energy'];
  }
  if (lowerSearch.includes('sleep') || lowerSearch.includes('melatonin') || lowerSearch.includes('valerian')) {
    return productContentMap['sleep'];
  }
  
  return null;
}
