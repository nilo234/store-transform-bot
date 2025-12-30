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
      { headline: 'Natural Rescue for Multiple Symptoms', description: 'Supports headaches, disturbed sleep, and general discomfort after drinking.' },
      { headline: 'Healthy Inflammatory Response', description: 'Curcuma Longa, Cichorium Intybus & Phyllanthus Emblica support normal inflammatory processes.' },
      { headline: 'Liver Protection and Support', description: 'Andrographis Paniculata + Phyllanthus Niruri may help support normal liver function.' },
      { headline: 'Supports Normal Fluid Balance', description: 'Formulated to maintain hydration and support overall well-being.' },
    ],
    longDescription: [
      'Our Hangover Oral Strips are crafted with a blend of ingredients inspired by traditional Ayurvedic practices, designed to support general wellness.',
      'While individual experiences may vary, our strips are formulated with the intent to support aspects of wellness that can be challenged after social activities. They are designed with a focus on traditional, natural ingredients.',
      'The inclusion of Curcuma Longa (Curcumin), Cichorium Intybus, and Phyllanthus Niruri are included for their traditional use in supporting general liver health.',
      'Our product is intended to be a part of your wellness routine, potentially supporting the body\'s natural ability to maintain cognitive clarity, preserve normal fluid levels, and support restoration for restful sleep.',
    ],
    usage: 'Place 1 strip on your tongue before bed and let it dissolve completely. Maximum 1 strip per day.',
    ingredients: [
      'Pullulan', 'Phoenix Dactylifera extract', 'Curcuma Longa extract', 'Andrographis paniculata extract',
      'Cichorium intybus extract', 'Vitis Vinifera extract', 'Phyllanthus Niruri extract',
      'Phyllanthus Emblica extract', 'Cellulose', 'Mannitol', 'Licorice extract',
      'Lecithin', 'Malic acid', 'Mango flavor', 'Stevia glycosides', 'Orange flavor'
    ],
    supplementFacts: [
      { nutrient: 'Phoenix Dactylifera Extract', amount: '36 mg' },
      { nutrient: 'Curcuma Longa Extract', amount: '13.5 mg' },
      { nutrient: 'Andrographis Paniculata Extract', amount: '9 mg' },
      { nutrient: 'Cichorium Intybus Extract', amount: '6 mg' },
      { nutrient: 'Vitis Vinifera Extract', amount: '6 mg' },
      { nutrient: 'Phyllanthus Niruri Extract', amount: '5 mg' },
      { nutrient: 'Phyllanthus Emblica Extract', amount: '4 mg' },
    ],
    properties: ['Gluten-Free', 'Vegan', 'Allergen-Free', 'Lactose-Free', 'Non-GMO', 'Halal Certified', 'No Fillers', 'No Artificial Colors'],
    disclaimer: 'These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.',
  },

  // 2. Bone Support Strips
  'bone': {
    handle: 'bone',
    seoTitle: 'Bone Support Strips Raspberry | Vitamin D3 + K2 | Neuvie',
    metaDescription: 'Neuvie Bone Support Strips with Vitamin D3 (2000 IU) & K2 (200 mcg). Supports bone health, calcium absorption & immune function. Convenient strip format.',
    shortDescription: 'Bone Support Strips combine Vitamin D3 and K2 in a fast-dissolving, raspberry-flavored strip. Supports normal calcium metabolism, bone strength, and immune function—anytime, anywhere.',
    benefits: [
      { headline: 'Essential for Bone Support', description: 'Vitamin K2 helps direct calcium to bones and supports bone strength.' },
      { headline: 'Supports Bone Strength', description: 'Vitamin D3 aids calcium absorption and utilization.' },
      { headline: 'Perfect for On-the-Go Wellness', description: 'Raspberry-flavored strips you can take anywhere, anytime.' },
      { headline: 'Helps Maintain Normal Immune Function', description: 'Vitamin D3 additionally supports a normal immune system.' },
    ],
    longDescription: [
      'Support your wellness routine with Bone Support Strips, a convenient and easy-to-take oral supplement formulated with Vitamin D3 and Vitamin K2.',
      'These essential nutrients play complementary roles in helping to maintain normal calcium absorption and supporting the body\'s natural bone health processes.',
      'Vitamin D3 and Vitamin K2 work together to support the body\'s natural calcium utilization and bone maintenance functions. These essential nutrients also play complementary roles in helping to maintain healthy calcium metabolism and contribute to the support of strong bones and teeth.',
    ],
    usage: 'Take 1 strip daily. Place on tongue and let dissolve completely. Maximum 1 strip per day.',
    ingredients: [
      'Vitamin D3 (Cholecalciferol) (2000 IU)', 'Vitamin K2 (Menaquinone) (200 mcg)',
      'Pullulan', 'Cellulose', 'Lecithin', 'Raspberry Flavor', 'Malic Acid',
      'Erythritol', 'Sorbitol Syrup', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Vitamin D3', amount: '2000 IU' },
      { nutrient: 'Vitamin K2', amount: '200 mcg' },
    ],
    properties: ['Bone Health', 'Cardiovascular Health', 'Immune Health', '50+', 'Sugar-Free', 'Gluten-Free', 'Vegan', 'Lactose-Free', 'Allergen-Free', 'Natural', 'No Fillers', 'Non-GMO', 'Halal Certified'],
    disclaimer: 'These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.',
  },

  // 3. Cognitive Relax Strips
  'cognitive': {
    handle: 'cognitive',
    seoTitle: 'Cognitive Relax Strips Strawberry-Mint | L-Theanine + GABA | Neuvie',
    metaDescription: 'Neuvie Cognitive Relax Strips with L-Theanine (50mg), GABA (25mg) & Vitamin B6. Supports relaxation, focus & nervous system. Strawberry-Mint flavor.',
    shortDescription: 'Cognitive Relax Strips combine L-Theanine, GABA, and Vitamin B6 in a fast-dissolving strip that supports stress management, mental clarity, and nervous system wellness. Take 1 strip daily—anytime you need calm focus.',
    benefits: [
      { headline: 'Supports a Calm, Focused Mind', description: 'L-Theanine promotes mental relaxation and clarity.' },
      { headline: 'Encourages Mental Wellbeing', description: 'GABA supports the body\'s natural stress regulation.' },
      { headline: 'Promotes Nervous System Wellness', description: 'Vitamin B6 contributes to nervous system function.' },
      { headline: 'Quick-Dissolving, Anytime Support', description: 'Easy to take—at home or on-the-go.' },
    ],
    longDescription: [
      'Find a moment of calm with Cognitive Relax Strips, thoughtfully formulated with L-Theanine from Green Tea, GABA, and Vitamin B6.',
      'These oral strips are designed to support your body\'s natural response to occasional stress and promote cognitive wellness as part of a balanced, mindful lifestyle.',
      'L-Theanine, an amino acid found in green tea, is known for supporting a calm, relaxed state while helping to maintain mental clarity.',
      'GABA, a naturally occurring compound in the body, plays a role in supporting normal nervous system activity, combined with Vitamin B6, which contributes to normal energy metabolism and nervous system function. Together, these nutrients work together to promote everyday balance.',
    ],
    usage: 'Place 1 strip on your tongue daily and let it dissolve. Maximum 1 strip per day.',
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
    properties: ['Gluten-Free', 'Vegan', 'Lactose-Free', 'Allergen-Free', 'Non-GMO', 'Natural', 'No Fillers', 'No Artificial Colors', 'Halal Certified', 'Sugar-Free', '50+', 'Mental Wellness'],
    disclaimer: 'These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.',
  },

  // 4. Mushroom Focus Strips
  'mushroom': {
    handle: 'mushroom',
    seoTitle: 'Mushroom Focus Strips Chocolate | Lion\'s Mane + Cordyceps | Neuvie',
    metaDescription: 'Neuvie Mushroom Focus Strips with Lion\'s Mane, Cordyceps, Maitake & Shiitake. Supports focus, energy & cognitive function. Rich chocolate flavor.',
    shortDescription: 'Support your focus, energy & mental wellness with Mushroom Focus Strips. A curated blend of Lion\'s Mane, Maitake, Cordyceps, and Shiitake in a rich chocolate-flavored strip. Zero-fuss, quick-dissolving.',
    benefits: [
      { headline: 'Cognitive Support from Lion\'s Mane', description: 'Traditionally used to support focus and cognitive wellness.' },
      { headline: 'Stamina-Promoting Cordyceps', description: 'Supports natural energy metabolism and stamina.' },
      { headline: 'Maitake & Shiitake Wellness Boost', description: 'Promotes immune balance and antioxidant support.' },
      { headline: 'Chocolate Flavor, Zero Fuss', description: 'Quick-dissolving oral strips—no capsules, no water needed.' },
    ],
    longDescription: [
      'Sharp your mental clarity and overall wellness with Mushroom Focus Strips, a convenient and flavorful way to support your routine.',
      'These smooth, chocolate-flavored oral strips dissolve easily on your tongue, delivering a curated blend of functional mushroom extracts traditionally valued for their role in promoting normal cognitive function and daily vitality.',
      'Each strip combines: Lion\'s Mane – long history in supporting cognitive function and focus, Maitake – immune support, Cordyceps – stamina and energy metabolism, Shiitake – immune balance and antioxidant support.',
      'Perfect for a busy day, these strips make it easy to incorporate mushroom-powered support into your wellness routine—anytime, no water or capsules needed.',
    ],
    usage: 'Place 1 strip on your tongue daily and let it dissolve completely. Maximum 1 strip per day.',
    ingredients: [
      'Hericium Erinaceus (Lion\'s Mane) (50 mg)', 'Grifola Frondosa (Maitake) (25 mg)',
      'Cordyceps Sinensis (Cordyceps) (25 mg)', 'Lentinus Edodes (Shiitake) (20 mg)',
      'Pullulan', 'Cellulose', 'Lecithin', 'Chocolate Flavor', 'Monk Fruit Extract',
      'Medium-Chain Triglycerides', 'Xanthan Gum', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Lion\'s Mane', amount: '50 mg' },
      { nutrient: 'Maitake', amount: '25 mg' },
      { nutrient: 'Cordyceps', amount: '25 mg' },
      { nutrient: 'Shiitake', amount: '20 mg' },
    ],
    properties: ['Gluten-Free', 'Vegan', 'Lactose-Free', 'Allergen-Free', 'Non-GMO', 'Natural', 'No Fillers', 'No Artificial Colors', 'Sugar-Free', 'Halal Certified', 'Energy & Focus', 'Mental Wellness'],
    disclaimer: 'These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.',
  },

  // 5. Libido Support Strips
  'libido': {
    handle: 'libido',
    seoTitle: 'Libido Support Strips Chocolate | Cordyceps + Shilajit | Neuvie',
    metaDescription: 'Neuvie Libido Support Strips with Cordyceps, Shilajit & Oyster Peptide. Supports vitality, stamina & sexual wellness. Discreet and convenient.',
    shortDescription: 'Libido Support Strips support Stamina, Energy, Vitality and overall well-being. With Cordyceps militaris, Shilajit and Oyster Peptide—in a fast-dissolving, chocolate-flavored strip. Ideal for daily routine and active lifestyle.',
    benefits: [
      { headline: 'Cordyceps for Active Vitality', description: 'Traditionally used to support stamina and endurance.' },
      { headline: 'Marine-Derived Peptides', description: 'Support overall sexual wellness and nutrient balance.' },
      { headline: 'Shilajit\'s Natural Support', description: 'Provides minerals that contribute to sexual wellness.' },
      { headline: 'Rich Chocolate Flavor', description: 'Quick-dissolving, enjoyable, no capsules, no water.' },
    ],
    longDescription: [
      'Add a little extra vitality to your wellness routine with our Libido Support Strips, specially crafted for adults looking to maintain healthy energy, stamina, and sexual wellness as part of a balanced lifestyle.',
      'Each strip delivers a blend of Cordyceps militaris, Shilajit, and Oyster Peptide—ingredients traditionally valued for supporting normal endurance, energy metabolism, and sexual function.',
      'Cordyceps militaris is associated with promoting stamina and vitality, while Shilajit provides naturally wellness-supportive minerals.',
      'These chocolate-flavored oral strips dissolve easily on your tongue, offering a simple and discreet way to support your energy, vitality, and overall wellness as part of your healthy lifestyle.',
    ],
    usage: 'Place 1 strip on your tongue daily and let it dissolve. Maximum 1 strip per day.',
    ingredients: [
      'Cordyceps Militaris (50 mg)', 'Asphaltum Punjabinum (Shilajit) (50 mg)', 'Oyster Peptide (20 mg)',
      'Pullulan', 'Cellulose', 'Monk Fruit Extract', 'Lecithin', 'Chocolate Flavor',
      'Erythritol', 'Sorbitol', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Cordyceps Militaris', amount: '50 mg' },
      { nutrient: 'Shilajit', amount: '50 mg' },
      { nutrient: 'Oyster Peptide', amount: '20 mg' },
    ],
    properties: ['Gluten-Free', 'Vegan', 'Lactose-Free', 'Allergen-Free', 'Non-GMO', 'Hormone-Free', 'No Fillers', 'No Artificial Colors', 'Alcohol-Free', 'Sugar-Free'],
    disclaimer: 'These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease. Not for children under 18.',
  },

  // 6. Probiotic + Metabolism Strips
  'probiotic': {
    handle: 'probiotic',
    seoTitle: 'Probiotic + Metabolism Strips | 10 Billion CFU | Neuvie',
    metaDescription: 'Neuvie Probiotic + Metabolism Strips with 10 Billion CFU Bifidobacterium lactis & Prebiotic Fiber. Supports gut health & digestion.',
    shortDescription: 'Probiotic + Metabolism Strips offer easy, delicious support for digestive health. Each strip delivers 10 Billion CFU probiotics plus Prebiotic Fiber to promote a healthy gut microbiome. Mixed-Berry flavor, ideal for on-the-go—without water.',
    benefits: [
      { headline: 'Daily Digestive Support', description: '10 Billion CFU support a healthy gut flora and digestion.' },
      { headline: 'Probiotic + Prebiotic Synergy', description: 'Probiotic bacteria + Prebiotic Fiber for stronger effect.' },
      { headline: 'Anytime, Anywhere Convenience', description: 'Dissolving strips—no capsules, no water needed.' },
      { headline: 'Refreshing Flavor Experience', description: 'Mixed Berry, light and naturally sweet—perfect for daily routine.' },
    ],
    longDescription: [
      'Probiotic + Metabolism Strips are designed to make supporting your digestive wellness effortless.',
      'Each strip contains Bifidobacterium lactis, a probiotic that helps support a healthy balance of gut bacteria, combined with prebiotic fiber that fuels beneficial bacteria.',
      'Together, they work in harmony to promote digestive balance as part of your overall health routine.',
      'These strips dissolve on your tongue in seconds—no water required. Their portable design makes them a convenient option for travel, work, or on-the-go lifestyles.',
      'With a light mixed berry flavor, you can enjoy daily digestive support in a form that feels fresh and easy to use. Formulated with natural sweeteners like monk fruit extract and stevia, they offer a clean-tasting experience without added sugars.',
    ],
    usage: 'Place 1 strip on your tongue daily and let it dissolve. Maximum 1 strip per day.',
    ingredients: [
      'Polydextrose (30mg)', 'Bifidobacterium lactis 25.7mg (10 Billion CFU)',
      'Pullulan', 'Cellulose', 'Mixed Berry Flavor', 'Sunflower Lecithin',
      'Monk Fruit Extract', 'Erythritol', 'Medium Chain Triglycerides', 'Malic Acid', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Probiotic (Bifidobacterium lactis)', amount: '10 Billion CFU' },
      { nutrient: 'Prebiotic Fiber (Polydextrose)', amount: '30 mg' },
    ],
    properties: ['Gluten-Free', 'Vegan', 'Lactose-Free', 'Hormone-Free', 'Non-GMO', 'Natural', 'No Artificial Colors', 'No Fillers', 'Alcohol-Free', 'Sugar-Free'],
    disclaimer: 'These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.',
  },

  // 7. Beauty + Collagen Strips
  'beauty': {
    handle: 'beauty',
    seoTitle: 'Beauty + Collagen Strips Mango | Collagen + Vitamin E | Neuvie',
    metaDescription: 'Neuvie Beauty + Collagen Strips with 100mg Collagen Peptides & Vitamin E. Supports skin elasticity, hair & nails. Delicious mango flavor.',
    shortDescription: 'Beauty + Collagen Strips support natural collagen production, skin elasticity, and antioxidant cell protection through Collagen Peptides and Vitamin E—in a fruity Mango-Flavor. Fast-dissolving, easy for on-the-go, ideal for a daily beauty routine.',
    benefits: [
      { headline: 'Promotes Skin Elasticity', description: 'Collagen peptides support the natural skin structure.' },
      { headline: 'Antioxidant Support for Skin Wellness', description: 'Vitamin E protects cells from oxidative stress.' },
      { headline: 'Delicious, Mess-Free Beauty Support', description: 'Fruity mango flavor, oral dissolving—no capsules, no water.' },
      { headline: 'Supports Healthy Hair & Nail Appearance', description: 'Collagen provides building blocks for hair and nails.' },
    ],
    longDescription: [
      'Beauty + Collagen Strips offer an easy way to support your daily beauty and wellness routine.',
      'Each strip combines: Collagen Peptides (100 mg) – support the body\'s own collagen structure for skin, hair, and joints, Vitamin E – has antioxidant effects and protects skin cells.',
      'The strips dissolve instantly on the tongue without water and offer a pleasant mango aroma. Perfect for anyone looking for a simple, quick, and mobile beauty solution.',
    ],
    usage: 'Place 1 strip on your tongue daily and let it dissolve. Maximum 1 strip per day.',
    ingredients: [
      'Collagen Peptide (100 mg)', 'Vitamin E (6 mg)',
      'Pullulan', 'Cellulose', 'Lecithin', 'Mango Flavor', 'Malic Acid', 'Pectin', 'Monk Fruit Extract', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Collagen Peptide', amount: '100 mg' },
      { nutrient: 'Vitamin E', amount: '6 mg' },
    ],
    properties: ['Gluten-Free', 'Vegan', 'Lactose-Free', 'Hormone-Free', 'Non-GMO', 'Natural', 'No Fillers', 'No Artificial Colors', 'Sugar-Free'],
    disclaimer: 'These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.',
  },

  // 8. Hair, Skin & Nails Strips
  'hair': {
    handle: 'hair',
    seoTitle: 'Hair, Skin & Nails Strips Orange | Biotin 5000 mcg | Neuvie',
    metaDescription: 'Neuvie Hair, Skin & Nails Strips with Biotin (5000 mcg), Folate & Vitamin D3. Supports hair growth, skin vitality & strong nails. Orange flavor.',
    shortDescription: 'Support your natural glow with Hair, Skin and Nails Strips—formulated with Biotin, Folate and Vitamin D3. These fast-dissolving orange-flavored Strips support normal hair strength and overall well-being of skin, hair and nails. Just 1 strip daily—without water.',
    benefits: [
      { headline: 'Tasty, On-the-Go Care', description: 'Orange-flavored, dissolves quickly—perfect for mobile beauty routine.' },
      { headline: 'Folate for Cellular Wellness', description: 'Supports healthy cell function and skin vitality.' },
      { headline: 'Daily Sunshine in a Strip', description: 'Vitamin D3 supports calcium absorption and overall well-being.' },
      { headline: 'Biotin for Beauty Support', description: 'Biotin plays an important role in natural hair, skin, and nail health.' },
    ],
    longDescription: [
      'Nourish your natural beauty from within with our Hair, Skin and Nails Strips—a convenient, on-the-go supplement designed to support normal hair strength, skin vitality, and nail health.',
      'These quick-dissolving, orange-flavored oral strips provide key nutrients to support your hair, skin and nail wellness as part of your daily routine—all in a simple, easy-to-take format.',
      'Each strip contains 5,000 mcg of Biotin, a key nutrient known to support the body\'s normal processes for maintaining healthy hair, skin, and nails. Paired with Folate (Vitamin B9) and Vitamin D3, this thoughtful combination helps promote overall wellness and supports cellular health as part of a balanced lifestyle.',
      'To use, simply place one strip on your tongue and allow it to dissolve completely—no water required.',
    ],
    usage: 'Place 1 strip on your tongue daily and let it dissolve. Maximum 1 strip per day.',
    ingredients: [
      'Biotin (5000 mcg)', 'Vitamin B9 (Folate) (400 mcg)', 'Vitamin D3 (Cholecalciferol) (200 mcg)',
      'Pullulan', 'Cellulose', 'Mannitol', 'Monk Fruit Extract', 'Orange Flavor', 'Malic Acid', 'Lecithin', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Biotin', amount: '5000 mcg' },
      { nutrient: 'Vitamin D3', amount: '200 mcg' },
      { nutrient: 'Folate (Vitamin B9)', amount: '400 mcg' },
    ],
    properties: ['Gluten-Free', 'Vegan', 'Lactose-Free', 'Hormone-Free', 'Non-GMO', 'Natural', 'No Fillers', 'No Artificial Colors', 'Sugar-Free'],
    disclaimer: 'These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.',
  },

  // 9. Digestive + Gut Health Strips
  'digestive': {
    handle: 'digestive',
    seoTitle: 'Digestive + Gut Health Strips | Probiotics + Enzymes | Neuvie',
    metaDescription: 'Neuvie Digestive + Gut Health Strips with Bacillus Coagulans (10 Billion CFU), Protease, Papain & Bromelain. Supports digestion & gut health.',
    shortDescription: 'Digestive + Gut Health Strips support gut health with a combination of probiotics and digestive enzymes—in a fast-dissolving, mixed-berry flavored Strip. Perfect for on-the-go, without water, easy to take.',
    benefits: [
      { headline: 'Supports Normal Gut Balance', description: 'Bacillus Coagulans supports a healthy microbiome.' },
      { headline: 'Aids Natural Protein Digestion', description: 'Enzymes like Protease, Papain & Bromelain promote natural protein digestion.' },
      { headline: 'Fast-Dissolving Convenience', description: 'Dissolves on your tongue in seconds—perfect for travel.' },
      { headline: 'Gut Health Made Simple', description: 'One daily serving of digestive support, simple and portable.' },
    ],
    longDescription: [
      'Support your daily digestive wellness with our Digestive + Gut Health Strips, specially designed for easy, on-the-go use.',
      'Each strip delivers a unique blend of probiotics and digestive enzymes that help maintain normal gut flora balance and support natural digestion.',
      'Featuring Bacillus Coagulans, a widely studied probiotic strain, these strips help maintain healthy gut microflora, supporting normal digestive function. Combined with a blend of enzymes like Protease, Papain, and Bromelain, they assist in the breakdown of proteins and support the body\'s natural digestive processes.',
      'With a refreshing mixed berry flavor and fast-dissolving format, these strips make digestive support easy, mess-free, and enjoyable wherever life takes you.',
    ],
    usage: 'Place 1 strip on your tongue daily and let it dissolve. Maximum 1 strip per day.',
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
    properties: ['Gluten-Free', 'Vegan', 'Lactose-Free', 'Allergen-Free', 'Hormone-Free', 'Non-GMO', 'Natural', 'No Fillers', 'No Artificial Colors', 'Alcohol-Free', 'Sugar-Free'],
    disclaimer: 'These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.',
  },

  // 10. Appetite Balance & Weight Support Strips
  'appetite': {
    handle: 'appetite',
    seoTitle: 'Appetite Balance & Weight Support Strips | Chromium + Saffron | Neuvie',
    metaDescription: 'Neuvie Appetite Balance Strips with Chromium (75 mcg), Molybdenum (100 mcg) & Saffron. Supports normal blood sugar levels & appetite balance.',
    shortDescription: 'Appetite Balance & Weight Support Strips offer an easy, fast-dissolving way to support nutrition and daily well-being. With Saffron, Chromium and Molybdenum—for mindful eating habits, metabolism support and daily vitality.',
    benefits: [
      { headline: 'Nutrient Support for Daily Wellness', description: 'Molybdenum supports natural enzyme activity in the body.' },
      { headline: 'Helps Maintain Normal Blood Sugar Levels', description: 'Chromium supports glucose metabolism and stable levels.' },
      { headline: 'Botanical Support for Balance', description: 'Saffron contributes to emotional balance and well-being.' },
      { headline: 'Convenient On-the-Go Format', description: 'Dissolving strip—portable, fast, easy to take.' },
    ],
    longDescription: [
      'Discover an easy and convenient way to stay on track with your wellness goals through Appetite Balance & Weight Support Strips.',
      'Each strip contains a thoughtful blend of Saffron extract, Chromium, and Molybdenum to support balanced nutrition and overall well-being.',
      'Saffron has been traditionally used in wellness practices and is recognized for supporting balance in part of daily routines.',
      'Chromium supports normal macronutrient metabolism and helps maintain healthy blood sugar levels already within the normal range.',
      'Molybdenum contributes to essential nutrient metabolism and plays a role in overall wellness.',
      'These strips dissolve quickly on the tongue and are designed for adults who follow a health-conscious, active lifestyle—anytime, anywhere.',
    ],
    usage: 'Place 1 strip on your tongue daily and let it dissolve. Maximum 1 strip per day.',
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
    properties: ['Gluten-Free', 'Vegan', 'Lactose-Free', 'Non-GMO', 'Natural', 'No Fillers', 'No Artificial Colors', 'Hormone-Free', 'Alcohol-Free', 'Allergen-Free'],
    disclaimer: 'These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.',
  },

  // 11. Iron Strips
  'iron': {
    handle: 'iron',
    seoTitle: 'Iron Strips Raspberry | Iron + Folate | Neuvie',
    metaDescription: 'Neuvie Iron Strips with Iron (19 mg) & Folate (400 mcg). Supports red blood cell formation, oxygen transport & energy. Raspberry flavor.',
    shortDescription: 'Promote your daily wellness with Iron Strips, a raspberry-flavored oral supplement designed to support normal energy and overall vitality. Easy-to-use, convenient and water-free.',
    benefits: [
      { headline: 'Iron for Everyday Energy', description: 'Supports oxygen transport and red blood cell production.' },
      { headline: 'Folate for Healthy Cell Support', description: 'Helps maintain normal cellular function and red blood cell formation.' },
      { headline: 'Delicious Raspberry Flavor', description: 'Refreshing taste—no pills required.' },
      { headline: 'Gentle, Convenient Format', description: 'Easy-to-take oral strip format offers a quick, water-free way to incorporate key nutrients.' },
    ],
    longDescription: [
      'Support your everyday wellness with our iron strips, a convenient and gentle way to maintain normal energy levels and overall vitality.',
      'Designed for busy lifestyles, these quick-dissolving, raspberry-flavored oral strips provide key nutrients involved in red blood cell formation in an easy-to-take, water-free format.',
      'Each strip provides 19 mg of iron, an important mineral that plays a role in the body\'s normal red blood cell production and oxygen transport. Paired with 400 mcg of folate, this formula helps support healthy cell formation and general wellness as part of a balanced diet and active lifestyle.',
    ],
    usage: 'Place 1 strip on your tongue daily and let it dissolve completely.',
    ingredients: [
      'Iron (as Ferric Saccharate) (19 mg)', 'Vitamin B9 (Folate) (400 mcg)',
      'Pullulan', 'Cellulose', 'Lecithin', 'Raspberry Flavor', 'Monk Fruit Extract',
      'Citric Acid', 'Medium-Chain Triglycerides', 'Xanthan Gum', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Iron', amount: '19 mg' },
      { nutrient: 'Folate', amount: '400 mcg' },
    ],
    properties: ['Vegan', 'Sugar-Free', 'Gluten-Free', 'Lactose-Free', 'Allergen-Free', 'Non-GMO', 'Alcohol-Free', 'No Artificial Colors', 'Plastic-Free'],
    disclaimer: 'These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.',
  },

  // 12. Energy Strips
  'energy': {
    handle: 'energy',
    seoTitle: 'Energy Strips Cranberry | Caffeine + L-Theanine | Neuvie',
    metaDescription: 'Neuvie Energy Strips with Caffeine (50 mg), L-Theanine (30 mg) & Vitamin B12. Supports focus, endurance & mental clarity. No crash, no jitters.',
    shortDescription: 'Energy Oral Strips are designed for people who need a natural, fast energy boost—without the sugar crash or jitters of energy drinks. Supports focus, endurance, mental clarity, and stable energy.',
    benefits: [
      { headline: 'Enhanced Focus', description: 'Improved concentration for sports, training, or productive work.' },
      { headline: 'Increased Physical Endurance', description: 'Combination of caffeine and L-Theanine provides long-lasting energy.' },
      { headline: 'Mental Clarity', description: 'Promotes clear decision-making and improved thinking.' },
      { headline: 'No Crashes, No Jitters', description: 'Stable energy without shaking, without sugar, without crash.' },
    ],
    longDescription: [
      'Energy Strips provide a convenient way to support focus, energy, and daily performance.',
      'These dissolvable cranberry-flavored strips combine caffeine, L-theanine, and vitamin B12 for fast-acting support for mental clarity and endurance.',
      'The formulation is designed for stable, jitter-free energy without the crash associated with sugary drinks.',
      'Perfect for athletes, professionals, students—anyone seeking a fast, controlled energy boost.',
    ],
    usage: 'Place 1 strip on your tongue 15-30 minutes before activity or work. Maximum 1 strip per day.',
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
    properties: ['Gluten-Free', 'Vegetarian', 'Lactose-Free', 'Allergen-Free', 'Hormone-Free', 'Non-GMO', 'Vegan', 'Halal Certified'],
    disclaimer: 'These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease. Contains caffeine. Not for children under 18, pregnant or nursing mothers.',
  },

  // 13. Sleep Strips
  'sleep': {
    handle: 'sleep',
    seoTitle: 'Sleep Strips Raspberry | Melatonin + Valerian | Neuvie',
    metaDescription: 'Neuvie Sleep Strips with Melatonin (5 mg), Valerian, Chamomile, Lavender & Hibiscus. Supports restful sleep. Non-habit forming.',
    shortDescription: 'This gentle blend of non-habit forming botanical extracts was developed to support a healthy sleep-wake rhythm. Helps with restful sleep, stress-related sleep issues, and healthy sleep patterns.',
    benefits: [
      { headline: 'Enhanced Sleep Quality', description: 'The blend of lavender, chamomile, valerian, and melatonin promotes relaxation and improves sleep quality.' },
      { headline: 'Overall Well-Being', description: 'Synergistic effects improve mental and physical health.' },
      { headline: 'Increased Energy Levels', description: 'Better sleep leads to more energy the next day.' },
      { headline: 'Non-Addictive', description: 'Non-habit forming, gentle alternative to sleep medications.' },
    ],
    longDescription: [
      'Sleep Strips were created to help support relaxation and natural sleep cycles.',
      'The combination of valerian, chamomile, lavender, hibiscus, and melatonin offers a gentle nighttime formula designed to calm the mind and support restful sleep.',
      'These quick-dissolving raspberry-flavored strips are perfect for anyone seeking a natural alternative to traditional sleep aids.',
      'The non-habit forming formula is suitable for consistent nightly use to promote well-being and next-day energy.',
    ],
    usage: 'Place 1 strip on your tongue 30 minutes before bedtime and let it dissolve. Maximum 2 strips per day.',
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
    properties: ['Gluten-Free', 'Vegetarian', 'Lactose-Free', 'Allergen-Free', 'Hormone-Free', 'Non-GMO', 'Vegan', 'Halal Certified'],
    disclaimer: 'These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease. Not for children under 18, pregnant or nursing mothers. Consult a healthcare provider if taking medications.',
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
