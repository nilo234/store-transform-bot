// English product content for all 13 Neuvie supplement strips
// SEO-optimized, emotionally rich, US-market product descriptions

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
    shortDescription: "You had a great night — you deserve a great morning too. Our Hangover Strips dissolve in 3 seconds and absorb up to 5x faster than capsules, delivering Curcumin, Date Extract, and Grape Seed to support your body's natural recovery. Because you are worth more than a pill you keep forgetting. Wake up feeling like yourself again.",
    benefits: [
      { headline: 'Multi-Symptom Support', description: 'Helps address headaches, sleep disruption, and general discomfort after drinking.' },
      { headline: 'Healthy Inflammatory Response', description: 'Curcuma Longa and other botanicals support normal inflammatory processes.' },
      { headline: 'Liver Support', description: 'Andrographis and Phyllanthus may help support normal liver function.' },
      { headline: 'Hydration Balance', description: 'Formulated to maintain hydration and support overall well-being.' },
    ],
    longDescription: [
      "We've all been there — you wake up and immediately regret last night. The headache, the fatigue, the \"why did I do this to myself\" feeling. You deserve better than that. Our Hangover Strips are your 3-second safety net, crafted with a powerful Ayurvedic-inspired blend that supports your body when it needs it most.",
      "Each strip delivers Curcuma Longa (Curcumin), Date Extract, Grape Seed Extract, Andrographis, and Phyllanthus — ingredients traditionally valued for supporting liver function, hydration, and the body's natural recovery processes. And because they dissolve on your tongue, they absorb up to 5x faster than traditional capsules.",
      "Just place one strip on your tongue before bed. No water needed. No pills to choke down at 2 AM. That's it. Because taking care of yourself should be the easiest thing you do — even on your worst morning.",
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
    shortDescription: "Your bones carry you through everything — isn't it time you carried them? Bone Support Strips dissolve in 3 seconds and absorb up to 5x faster, delivering 2000 IU of Vitamin D3 and 200 mcg of K2 where your body needs it most. Because you are worth more than a pill you keep forgetting. Feel strong from the inside out.",
    benefits: [
      { headline: 'Essential for Bone Health', description: 'Vitamin K2 helps direct calcium to bones where it\'s needed.' },
      { headline: 'Supports Bone Strength', description: 'Vitamin D3 aids calcium absorption for stronger bones.' },
      { headline: 'On-the-Go Convenience', description: 'Raspberry-flavored strips you can take anywhere, no water needed.' },
      { headline: 'Immune System Support', description: 'Vitamin D3 also contributes to normal immune function.' },
    ],
    longDescription: [
      "You don't think about your bones — until they remind you. The ache after a long day. The worry that you're not doing enough. Your body holds you up through everything, and it deserves more than a dusty bottle of calcium pills on your counter.",
      "Our Bone Support Strips deliver 2000 IU of Vitamin D3 and 200 mcg of Vitamin K2 in a raspberry-flavored strip that dissolves on your tongue in 3 seconds — absorbing up to 5x faster than traditional supplements. D3 helps your body absorb calcium, while K2 directs it to your bones where it actually belongs.",
      "No water. No capsules. Just a daily moment of strength you can feel good about. Because taking care of your foundation should be effortless.",
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
    shortDescription: "Your mind races all day — it deserves a moment of calm. Cognitive Relax Strips dissolve in 3 seconds and absorb up to 5x faster, combining L-Theanine, GABA, and Vitamin B6 for focused relaxation without drowsiness. Because you are worth more than a pill you keep forgetting. Find your calm in 3 seconds.",
    benefits: [
      { headline: 'Calm, Focused Mind', description: 'L-Theanine promotes mental relaxation without drowsiness.' },
      { headline: 'Mental Wellbeing', description: 'GABA supports your body\'s natural stress response.' },
      { headline: 'Nervous System Support', description: 'Vitamin B6 contributes to normal nervous system function.' },
      { headline: 'Anytime Convenience', description: 'Fast-dissolving strips—no water needed, take anywhere.' },
    ],
    longDescription: [
      "You give so much of yourself to everyone else — your job, your family, your responsibilities. By the end of the day, your mind is still running even when your body begs to stop. You deserve a moment of calm that actually works.",
      "Cognitive Relax Strips combine L-Theanine from Green Tea, GABA, and Vitamin B6 in a refreshing strawberry-mint strip that dissolves in 3 seconds and absorbs up to 5x faster than capsules. L-Theanine promotes relaxation without making you drowsy, GABA supports your natural stress response, and B6 keeps your nervous system balanced.",
      "No pills. No water. No complicated evening routine. Just 3 seconds of peace — because the person who takes care of everyone else deserves to be taken care of too.",
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
    shortDescription: "Brain fog steals your best hours. Take them back. Mushroom Focus Strips dissolve in 3 seconds and absorb up to 5x faster, delivering Lion's Mane, Cordyceps, Maitake, and Shiitake in a rich chocolate-flavored strip. Because you are worth more than a pill you keep forgetting. Show up sharper, every single day.",
    benefits: [
      { headline: 'Cognitive Support', description: 'Lion\'s Mane is traditionally used to support focus and mental clarity.' },
      { headline: 'Natural Energy', description: 'Cordyceps supports energy metabolism and stamina.' },
      { headline: 'Immune Balance', description: 'Maitake & Shiitake promote immune function and antioxidant support.' },
      { headline: 'Delicious Convenience', description: 'Rich chocolate flavor, dissolves quickly—no capsules or water needed.' },
    ],
    longDescription: [
      "You know that feeling — you're staring at your screen, but nothing clicks. The fog rolls in and your sharpest self disappears. You've tried coffee, energy drinks, willpower. But what if the answer was actually something good for you?",
      "Mushroom Focus Strips combine Lion's Mane for cognitive clarity, Cordyceps for natural energy, Maitake for immune balance, and Shiitake for antioxidant support — all in a rich chocolate-flavored strip that dissolves in 3 seconds and absorbs up to 5x faster than capsules.",
      "This isn't about pushing harder. It's about showing up as the clearest version of yourself — in 3 seconds, no water, no effort. Because your mind deserves better than brain fog.",
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
    shortDescription: "Feeling disconnected from your own vitality? You're not alone — and you don't have to stay there. Libido Support Strips dissolve in 3 seconds and absorb up to 5x faster, with Cordyceps, Shilajit, and Oyster Peptide for natural stamina and energy. Because you are worth more than a pill you keep forgetting. Reclaim what's yours.",
    benefits: [
      { headline: 'Active Vitality', description: 'Cordyceps traditionally supports stamina and endurance.' },
      { headline: 'Mineral Support', description: 'Shilajit provides naturally occurring minerals for wellness.' },
      { headline: 'Marine-Derived Peptides', description: 'Oyster Peptide supports overall sexual wellness.' },
      { headline: 'Discreet & Convenient', description: 'Rich chocolate flavor, quick-dissolving—no pills or water.' },
    ],
    longDescription: [
      "This one's personal — because vitality isn't just physical, it's how you feel about yourself. When your energy dips and your drive fades, it affects everything. You deserve to feel fully alive, not just going through the motions.",
      "Our Libido Support Strips deliver Cordyceps militaris for stamina, Shilajit for naturally occurring minerals, and Oyster Peptide to support sexual wellness — in a discreet, chocolate-flavored strip that dissolves in 3 seconds and absorbs up to 5x faster than traditional supplements.",
      "No awkward bottles on your nightstand. No pills to remember. Just 3 seconds of intention — and the confidence that comes with actually taking care of yourself.",
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
    shortDescription: "Your gut is the foundation of everything — your energy, your mood, your skin. Probiotic + Metabolism Strips dissolve in 3 seconds and absorb up to 5x faster, delivering 10 Billion CFU plus prebiotic fiber in a refreshing mixed-berry strip. Because you are worth more than a pill you keep forgetting. Feel good from the inside out.",
    benefits: [
      { headline: 'Daily Digestive Support', description: '10 Billion CFU support a healthy gut flora and digestion.' },
      { headline: 'Probiotic + Prebiotic Synergy', description: 'Probiotics plus prebiotic fiber work together for enhanced effect.' },
      { headline: 'Anytime Convenience', description: 'Dissolving strips—no capsules, no water, take anywhere.' },
      { headline: 'Refreshing Flavor', description: 'Light mixed berry taste—perfect for your daily routine.' },
    ],
    longDescription: [
      "That bloated, sluggish feeling that follows you through the day? It's your gut asking for help. And you've probably tried everything — capsules that upset your stomach, powders that taste terrible, routines you couldn't keep up with. You deserve something that actually works and actually fits your life.",
      "Each Probiotic + Metabolism Strip delivers 10 Billion CFU of Bifidobacterium lactis plus prebiotic fiber — a synbiotic combination that supports your gut microbiome from both sides. And because it dissolves on your tongue in 3 seconds, it absorbs up to 5x faster than traditional probiotic capsules.",
      "Mixed-berry flavor. No water needed. No refrigeration required. Just one strip, every morning, and a gut that finally feels balanced. That's self-care that actually makes sense.",
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
    shortDescription: "You look in the mirror and you want to see the best version of yourself looking back. Beauty + Collagen Strips dissolve in 3 seconds and absorb up to 5x faster, delivering 100mg Collagen Peptides and Vitamin E for radiant skin, stronger hair, and healthier nails. Because you are worth more than a pill you keep forgetting. Glow from within.",
    benefits: [
      { headline: 'Skin Elasticity', description: 'Collagen peptides support your skin\'s natural structure.' },
      { headline: 'Antioxidant Protection', description: 'Vitamin E helps protect cells from oxidative stress.' },
      { headline: 'Convenient Beauty Support', description: 'Fruity mango flavor, dissolves on your tongue—no capsules.' },
      { headline: 'Hair & Nail Health', description: 'Collagen provides building blocks for healthy hair and nails.' },
    ],
    longDescription: [
      "Real beauty starts from within — and you know it. But the collagen powders are messy, the pills are huge, and the routines feel like a full-time job. You deserve a beauty ritual that's as effortless as you want to feel.",
      "Beauty + Collagen Strips deliver 100mg of Collagen Peptides and Vitamin E in a fruity mango-flavored strip that dissolves on your tongue in 3 seconds — absorbing up to 5x faster than traditional collagen supplements. Collagen supports your skin's elasticity, while Vitamin E provides antioxidant protection.",
      "No mixing. No measuring. No forgetting. Just one strip a day and the confidence of knowing you're nourishing your natural glow from the inside out.",
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
    shortDescription: "Watching your hair thin, your nails break, your skin lose its life — it's more than cosmetic. It's personal. Hair, Skin & Nails Strips dissolve in 3 seconds and absorb up to 5x faster, with 5,000 mcg Biotin, Folate, and Vitamin D3. Because you are worth more than a pill you keep forgetting. See the difference you deserve.",
    benefits: [
      { headline: 'Biotin for Beauty', description: 'Biotin plays a key role in natural hair, skin & nail health.' },
      { headline: 'Cellular Wellness', description: 'Folate supports healthy cell function and skin vitality.' },
      { headline: 'Daily Sunshine', description: 'Vitamin D3 supports calcium absorption and overall wellness.' },
      { headline: 'On-the-Go Care', description: 'Orange-flavored, dissolves quickly—perfect for mobile beauty routines.' },
    ],
    longDescription: [
      "This is the one that started it all. Because watching your hair fall out in the shower, seeing your nails split before they can grow, feeling like your skin has lost its light — that's not just frustrating. It's heartbreaking. And every capsule you forgot to take felt like giving up on yourself a little more.",
      "Hair, Skin & Nails Strips deliver 5,000 mcg of Biotin, Folate, and Vitamin D3 — the trifecta your body craves for hair strength, skin vitality, and nail resilience. They dissolve on your tongue in 3 seconds and absorb up to 5x faster than traditional biotin pills. No water needed. No routine to remember.",
      "This is the strip that says: I'm not giving up on myself. Not today. Not ever. 3 seconds of intention, and your body gets exactly what it needs to shine from within.",
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
    shortDescription: "Bloating, discomfort, that heavy feeling after every meal — you've tried to ignore it long enough. Digestive + Gut Health Strips dissolve in 3 seconds and absorb up to 5x faster, combining probiotics and digestive enzymes for real relief. Because you are worth more than a pill you keep forgetting. Your gut will thank you.",
    benefits: [
      { headline: 'Healthy Gut Balance', description: 'Bacillus Coagulans supports a healthy microbiome.' },
      { headline: 'Protein Digestion', description: 'Enzymes like Protease, Papain & Bromelain aid natural digestion.' },
      { headline: 'Fast-Dissolving Convenience', description: 'Dissolves on your tongue in seconds—perfect for travel.' },
      { headline: 'Simple Gut Support', description: 'One strip delivers your daily digestive wellness, portable and easy.' },
    ],
    longDescription: [
      "You know the feeling — that uncomfortable bloat after eating, the heaviness that follows you through the afternoon, the gut issues you've learned to just \"deal with.\" But here's the truth: you shouldn't have to. Your digestive system deserves real support, not another capsule you'll forget by Wednesday.",
      "Digestive + Gut Health Strips combine 10 Billion CFU of Bacillus Coagulans with a triple-enzyme blend of Protease, Papain, and Bromelain — supporting both your gut flora and your body's natural digestive processes. They dissolve on your tongue in 3 seconds and absorb up to 5x faster than traditional gut supplements.",
      "Mixed-berry flavor. No water. No planning. Just one strip after a meal and the relief of knowing you're finally doing something about it.",
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
    shortDescription: "The cravings. The guilt. The cycle that never ends. Appetite Balance Strips dissolve in 3 seconds and absorb up to 5x faster, delivering Saffron, Chromium, and Molybdenum to support balanced blood sugar and mindful eating. Because you are worth more than a pill you keep forgetting. Take control — gently, on your terms.",
    benefits: [
      { headline: 'Daily Wellness Support', description: 'Molybdenum supports natural enzyme activity in the body.' },
      { headline: 'Blood Sugar Balance', description: 'Chromium supports glucose metabolism and stable levels.' },
      { headline: 'Botanical Balance', description: 'Saffron extract contributes to emotional balance and wellbeing.' },
      { headline: 'Convenient Format', description: 'Dissolving strip—portable, fast, easy to take anywhere.' },
    ],
    longDescription: [
      "You're not weak. The cravings, the constant hunger, the frustration with your own body — none of that is a character flaw. It's your biology asking for support. And you deserve support that actually works, not another fad product that makes you feel worse about yourself.",
      "Appetite Balance Strips combine Saffron extract for emotional balance, Chromium for healthy blood sugar metabolism, and Molybdenum for essential nutrient processing — in a strip that dissolves in 3 seconds and absorbs up to 5x faster than capsules. No water needed. No meal planning required.",
      "This isn't about restriction. It's about balance — the kind that comes from finally giving your body what it's been asking for. One strip. 3 seconds. A gentler relationship with yourself.",
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
    shortDescription: "That bone-deep tiredness that coffee can't fix? It might be your iron. Iron Strips dissolve in 3 seconds and absorb up to 5x faster, delivering 19mg of gentle iron plus Folate — without the nausea or constipation of traditional iron pills. Because you are worth more than a pill you keep forgetting. Feel alive again.",
    benefits: [
      { headline: 'Red Blood Cell Formation', description: 'Iron contributes to normal red blood cell production.' },
      { headline: 'Oxygen Transport', description: 'Iron supports normal oxygen transport throughout the body.' },
      { headline: 'Energy Production', description: 'Contributes to normal energy metabolism.' },
      { headline: 'Healthy Cell Formation', description: 'Folate supports normal cell division.' },
    ],
    longDescription: [
      "You're exhausted — and not the \"I need more sleep\" kind. It's deeper than that. The fatigue that sits in your bones, the brain fog that won't lift, the feeling that your body is running on empty no matter what you do. If that sounds familiar, your iron levels might be trying to tell you something.",
      "Our Iron Strips deliver 19mg of iron in a gentle, raspberry-flavored format that dissolves in 3 seconds and absorbs up to 5x faster than traditional iron pills — without the nausea, constipation, or metallic taste that made you quit last time. Paired with 400 mcg of Folate for healthy cell formation.",
      "No stomach upset. No huge pills. Just a tiny strip on your tongue and the energy your body has been begging for. You deserve to feel alive — not just awake.",
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
    shortDescription: "You're running on empty and another cup of coffee isn't the answer. Energy Strips dissolve in 3 seconds and absorb up to 5x faster, delivering clean Caffeine, L-Theanine, and B12 for jitter-free focus and all-day stamina. Because you are worth more than a pill you keep forgetting. Energy that feels like you.",
    benefits: [
      { headline: 'Enhanced Focus', description: 'Caffeine and L-Theanine together promote focused attention.' },
      { headline: 'Physical Endurance', description: 'Supports physical stamina and performance.' },
      { headline: 'Mental Clarity', description: 'Vitamin B12 contributes to normal cognitive function.' },
      { headline: 'No Crash, No Jitters', description: 'Stable energy release without the typical energy drink crash.' },
    ],
    longDescription: [
      "Three cups of coffee by noon and you're still dragging. The energy drinks leave you jittery and then crash you harder. You deserve energy that actually feels good — the kind that lifts you up without the payback.",
      "Energy Strips combine 50mg of Caffeine with 30mg of L-Theanine and Vitamin B12 — a proven stack for smooth, focused energy without jitters or crashes. Each cranberry-flavored strip dissolves in 3 seconds and absorbs up to 5x faster than energy supplements in capsule form.",
      "Keep a pack in your bag, your desk, your car. Whenever you need a lift, it's 3 seconds away. No sugar, no crash, no excuses. Just clean energy that respects your body as much as you do.",
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
    shortDescription: "You lie awake replaying the day, and tomorrow starts before you've even recovered from today. Sleep Strips dissolve in 3 seconds and absorb up to 5x faster, combining Melatonin, Valerian, Chamomile, Lavender, and Hibiscus for deep, restorative rest. Because you are worth more than a pill you keep forgetting. You carried the whole day — let tonight carry you.",
    benefits: [
      { headline: 'Enhanced Sleep Quality', description: 'Melatonin helps reduce the time it takes to fall asleep.' },
      { headline: 'Stress Reduction', description: 'Valerian and Chamomile may contribute to relaxation.' },
      { headline: 'Deeper Sleep', description: 'Supports deeper sleep phases for true restoration.' },
      { headline: 'Non-Habit Forming', description: 'Gentle, botanical formula without addiction potential.' },
    ],
    longDescription: [
      "Your body is exhausted but your mind won't stop. You replay conversations, worry about tomorrow, count the hours of sleep you're losing in real time. You've earned rest — real rest. The kind where you wake up and actually feel like a different person.",
      "Sleep Strips combine 5mg of Melatonin with a calming botanical blend of Valerian, Chamomile, Lavender, and Hibiscus — nature's gentlest sleep support. Each raspberry-flavored strip dissolves on your tongue in 3 seconds and absorbs up to 5x faster than traditional sleep supplements. Non-habit forming, so you can use them every night without worry.",
      "No water. No pills on your nightstand. Just a quiet 3-second ritual that tells your body: you did enough today. Rest now. Because the person who gives everything to everyone else deserves a night of deep, peaceful sleep.",
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
