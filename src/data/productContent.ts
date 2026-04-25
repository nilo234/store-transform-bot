// English product content for all 13 Neuvie supplement strips
// SEO-optimized, emotionally rich, US-market product descriptions

export interface ProductContent {
  handle: string;
  seoTitle: string;
  metaDescription: string;
  seoKeywords: string[];
  shortDescription: string;
  benefits: Array<{ headline: string; description: string }>;
  longDescription: string[];
  usage: string;
  ingredients: string[];
  supplementFacts: Array<{ nutrient: string; amount: string }>;
  properties: string[];
  disclaimer: string;
  relatedProducts: Array<{ handle: string; anchor: string }>;
}

export const productContentMap: Record<string, ProductContent> = {
  // 1. Hangover Strips
  'hangover': {
    handle: 'hangover',
    seoTitle: 'Hangover Relief Strips – Fast Recovery | NEUVIE',
    metaDescription: 'DHM, Curcumin & Grape Seed in one dissolving strip. Recover from a night out fast – no pills needed. Shop NEUVIE Hangover Strips.',
    seoKeywords: ['hangover relief strip', 'dissolving hangover supplement', 'fast hangover recovery strip', 'DHM supplement strip', 'hangover cure no pills', 'best hangover supplement 2026'],
    shortDescription: "You had a great night — you deserve a great morning too. Our dissolving hangover strips absorb up to 5x faster than capsules, delivering Curcumin, Date Extract, and Grape Seed to support your body's natural recovery. Because you are worth more than a pill you keep forgetting. Wake up feeling like yourself again.",
    benefits: [
      { headline: 'Multi-Symptom Support', description: 'This fast hangover recovery strip helps address headaches, sleep disruption, and general discomfort after drinking.' },
      { headline: 'Healthy Inflammatory Response', description: 'Curcuma Longa and other botanicals in this dissolving hangover supplement support normal inflammatory processes.' },
      { headline: 'Liver Support', description: 'Andrographis and Phyllanthus may help support normal liver function — the best hangover supplement 2026 has to offer.' },
      { headline: 'Hydration Balance', description: 'Formulated as a hangover cure without pills, maintaining hydration and supporting overall well-being.' },
    ],
    longDescription: [
      "We've all been there — you wake up and immediately regret last night. The headache, the fatigue, the \"why did I do this to myself\" feeling. You deserve better than that. Our NEUVIE Hangover Relief Strips are your 3-second safety net — a dissolving hangover supplement crafted with a powerful Ayurvedic-inspired blend that supports your body when it needs it most.",
      "Each fast hangover recovery strip delivers Curcuma Longa (Curcumin), Date Extract, Grape Seed Extract, Andrographis, and Phyllanthus — ingredients traditionally valued for supporting liver function, hydration, and the body's natural recovery processes. Unlike traditional hangover cures with pills, these dissolve on your tongue and absorb up to 5x faster than capsules. It's the best hangover supplement 2026 for people who refuse to waste their mornings.",
      "Just place one DHM supplement strip on your tongue before bed. No water needed. No pills to choke down at 2 AM. That's it. Because taking care of yourself should be the easiest thing you do — even on your worst morning.",
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
    relatedProducts: [
      { handle: 'energy-strips', anchor: 'NEUVIE Energy Strips for clean morning energy' },
      { handle: 'digestive-gut-health-strips', anchor: 'Digestive Strips for gut recovery support' },
      { handle: 'sleep-strips', anchor: 'Sleep Strips for deep restorative rest' },
    ],
  },

  // 2. Bone Support Strips
  'bone': {
    handle: 'bone',
    seoTitle: 'Bone Support Strips – Calcium & Vitamin D | NEUVIE',
    metaDescription: 'Vitamin D3 2000 IU + K2 in one dissolving strip. Support bone strength daily – no capsules needed. Shop NEUVIE Bone Strips.',
    seoKeywords: ['dissolving bone support supplement', 'calcium strip supplement', 'vitamin D dissolving strip', 'bone health supplement no pills', 'vitamin K2 D3 strip', 'fast dissolving bone support'],
    shortDescription: "Your bones carry you through everything — isn't it time you carried them? These dissolving bone support strips absorb up to 5x faster, delivering 2000 IU of Vitamin D3 and 200 mcg of K2 where your body needs it most. Because you are worth more than a pill you keep forgetting. Feel strong from the inside out.",
    benefits: [
      { headline: 'Essential for Bone Health', description: 'This vitamin K2 D3 strip helps direct calcium to bones where it\'s needed most.' },
      { headline: 'Supports Bone Strength', description: 'Our vitamin D dissolving strip aids calcium absorption for stronger, healthier bones.' },
      { headline: 'On-the-Go Convenience', description: 'A fast dissolving bone support in raspberry flavor you can take anywhere — no water, no capsules.' },
      { headline: 'Immune System Support', description: 'Vitamin D3 also contributes to normal immune function in this calcium strip supplement.' },
    ],
    longDescription: [
      "You don't think about your bones — until they remind you. The ache after a long day. The worry that you're not doing enough. Your body holds you up through everything, and it deserves more than a dusty bottle of calcium pills. That's why NEUVIE created this dissolving bone support supplement — a bone health supplement with no pills required.",
      "Our vitamin K2 D3 strip delivers 2000 IU of Vitamin D3 and 200 mcg of Vitamin K2 in a raspberry-flavored calcium strip supplement that dissolves on your tongue in 3 seconds — absorbing up to 5x faster than traditional supplements. This vitamin D dissolving strip helps your body absorb calcium, while K2 directs it to your bones where it actually belongs.",
      "No water. No capsules. Just a daily moment of fast dissolving bone support you can feel good about. Because taking care of your foundation should be effortless.",
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
    relatedProducts: [
      { handle: 'iron-strips', anchor: 'Iron Strips for daily energy and vitality' },
      { handle: 'hair-skin-and-nails-strips', anchor: 'Hair, Skin & Nails Strips with Biotin + D3' },
      { handle: 'appetite-balance-weight-support-strips', anchor: 'Appetite Balance Strips with Chromium' },
    ],
  },

  // 3. Cognitive Relax Strips
  'cognitive': {
    handle: 'cognitive',
    seoTitle: 'Brain Focus Strips – Mental Clarity & Focus | NEUVIE',
    metaDescription: "L-Theanine, GABA & B6 in one dissolving strip. Boost focus and mental clarity fast – no pills. Try NEUVIE Brain Strips.",
    seoKeywords: ['brain focus dissolving strip', 'nootropic strip supplement', 'focus supplement no pills', "lion's mane strip", 'ginkgo biloba strip', 'fast dissolving nootropic'],
    shortDescription: "Your mind races all day — it deserves a moment of calm. These fast dissolving nootropic strips combine L-Theanine, GABA, and Vitamin B6 for focused relaxation without drowsiness. A brain focus dissolving strip for people who need clarity without pills. Because you are worth more than a pill you keep forgetting. Find your calm in 3 seconds.",
    benefits: [
      { headline: 'Calm, Focused Mind', description: 'L-Theanine in this nootropic strip supplement promotes mental relaxation without drowsiness.' },
      { headline: 'Mental Wellbeing', description: 'GABA supports your body\'s natural stress response — a true focus supplement with no pills.' },
      { headline: 'Nervous System Support', description: 'Vitamin B6 contributes to normal nervous system function in this brain focus dissolving strip.' },
      { headline: 'Anytime Convenience', description: 'This fast dissolving nootropic needs no water — take it anywhere, anytime.' },
    ],
    longDescription: [
      "You give so much of yourself to everyone else — your job, your family, your responsibilities. By the end of the day, your mind is still running even when your body begs to stop. You deserve a moment of calm that actually works. That's where a brain focus dissolving strip makes all the difference.",
      "NEUVIE Cognitive Relax Strips are a nootropic strip supplement that combines L-Theanine from Green Tea, GABA, and Vitamin B6 in a refreshing strawberry-mint strip. This focus supplement with no pills dissolves in 3 seconds and absorbs up to 5x faster than capsules. L-Theanine promotes relaxation without making you drowsy, GABA supports your natural stress response, and B6 keeps your nervous system balanced.",
      "No pills. No water. No complicated evening routine. Just 3 seconds of peace with this fast dissolving nootropic — because the person who takes care of everyone else deserves to be taken care of too.",
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
    relatedProducts: [
      { handle: 'mushroom-focus-strips', anchor: "Mushroom Focus Strips with Lion's Mane" },
      { handle: 'sleep-strips', anchor: 'Sleep Strips for restful nights' },
      { handle: 'energy-strips', anchor: 'Energy Strips for clean daytime focus' },
    ],
  },

  // 4. Mushroom Focus Strips
  'mushroom': {
    handle: 'mushroom',
    seoTitle: "Mushroom Focus Strips – Lion's Mane + Cordyceps | NEUVIE",
    metaDescription: "Lion's Mane, Cordyceps & Maitake in one dissolving strip. Boost focus and mental clarity – no pills. Shop NEUVIE Focus Strips.",
    seoKeywords: ["lion's mane dissolving strip", 'mushroom supplement strip', 'cordyceps focus strip', 'nootropic mushroom strip', 'fast dissolving focus supplement', "best lion's mane supplement 2026"],
    shortDescription: "Brain fog steals your best hours. Take them back. These Lion's Mane dissolving strips absorb up to 5x faster, delivering Lion's Mane, Cordyceps, Maitake, and Shiitake in a rich chocolate-flavored mushroom supplement strip. Because you are worth more than a pill you keep forgetting. Show up sharper, every single day.",
    benefits: [
      { headline: 'Cognitive Support', description: "This Lion's Mane dissolving strip is traditionally used to support focus and mental clarity." },
      { headline: 'Natural Energy', description: 'Cordyceps in this mushroom supplement strip supports energy metabolism and stamina.' },
      { headline: 'Immune Balance', description: 'Maitake & Shiitake in this nootropic mushroom strip promote immune function and antioxidant support.' },
      { headline: 'Delicious Convenience', description: "Rich chocolate flavor — the best Lion's Mane supplement 2026 that dissolves quickly without capsules or water." },
    ],
    longDescription: [
      "You know that feeling — you're staring at your screen, but nothing clicks. The fog rolls in and your sharpest self disappears. You've tried coffee, energy drinks, willpower. But what if the answer was a Lion's Mane dissolving strip — something actually good for you?",
      "NEUVIE Mushroom Focus Strips are a premium mushroom supplement strip combining Lion's Mane for cognitive clarity, Cordyceps for natural energy, Maitake for immune balance, and Shiitake for antioxidant support. This cordyceps focus strip dissolves in 3 seconds and absorbs up to 5x faster than capsules. It's the fast dissolving focus supplement designed for people who demand mental clarity without pills.",
      "This isn't about pushing harder. It's about showing up as the clearest version of yourself — in 3 seconds, no water, no effort. This nootropic mushroom strip gives your mind what it needs. Because your brain deserves better than brain fog. It's the best Lion's Mane supplement 2026.",
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
    relatedProducts: [
      { handle: 'cognitive-relax-strips', anchor: 'Cognitive Relax Strips for calm focus' },
      { handle: 'energy-strips', anchor: 'Energy Strips with Caffeine + L-Theanine' },
      { handle: 'beauty-collagen-strips', anchor: 'Beauty Collagen Strips for skin glow' },
    ],
  },

  // 5. Libido Support Strips
  'libido': {
    handle: 'libido',
    seoTitle: 'Libido Support Strips – Cordyceps + Shilajit | NEUVIE',
    metaDescription: 'Cordyceps, Shilajit & Oyster Peptide in one dissolving strip. Support vitality and stamina naturally – no pills. Shop NEUVIE.',
    seoKeywords: ['libido support strip', 'dissolving libido supplement', 'cordyceps stamina strip', 'shilajit supplement strip', 'natural vitality strip', 'libido supplement no pills'],
    shortDescription: "Feeling disconnected from your own vitality? You're not alone — and you don't have to stay there. These dissolving libido strips absorb up to 5x faster, with Cordyceps, Shilajit, and Oyster Peptide for natural stamina. A libido supplement with no pills. Because you are worth more than a pill you keep forgetting. Reclaim what's yours.",
    benefits: [
      { headline: 'Active Vitality', description: 'Cordyceps in this libido support strip traditionally supports stamina and endurance.' },
      { headline: 'Mineral Support', description: 'Shilajit provides naturally occurring minerals in this dissolving libido supplement.' },
      { headline: 'Marine-Derived Peptides', description: 'Oyster Peptide in this natural vitality strip supports overall sexual wellness.' },
      { headline: 'Discreet & Convenient', description: 'Rich chocolate flavor — a cordyceps stamina strip that dissolves quickly without pills or water.' },
    ],
    longDescription: [
      "This one's personal — because vitality isn't just physical, it's how you feel about yourself. When your energy dips and your drive fades, it affects everything. You deserve a libido support strip that helps you feel fully alive, not just going through the motions.",
      "Our dissolving libido supplement delivers Cordyceps militaris for stamina, Shilajit for naturally occurring minerals, and Oyster Peptide to support sexual wellness — in a discreet, chocolate-flavored cordyceps stamina strip that dissolves in 3 seconds and absorbs up to 5x faster than traditional supplements. It's a natural vitality strip for people who want a libido supplement with no pills.",
      "No awkward bottles on your nightstand. No pills to remember. Just 3 seconds of intention with this shilajit supplement strip — and the confidence that comes with actually taking care of yourself.",
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
    relatedProducts: [
      { handle: 'energy-strips', anchor: 'Energy Strips for all-day stamina' },
      { handle: 'mushroom-focus-strips', anchor: 'Mushroom Focus Strips with Cordyceps' },
      { handle: 'iron-strips', anchor: 'Iron Strips for daily vitality support' },
    ],
  },

  // 6. Probiotic + Metabolism Strips
  'probiotic': {
    handle: 'probiotic',
    seoTitle: 'Probiotic + Metabolism Strips – Gut & Energy | NEUVIE',
    metaDescription: 'Probiotics 10B CFU & metabolism support in one dissolving strip. Improve gut health daily – no capsules. Shop NEUVIE.',
    seoKeywords: ['probiotic metabolism strip', 'gut health supplement strip', 'probiotic dissolving strip', 'fast dissolving probiotic', 'digestive supplement strip', 'gut microbiome supplement strip'],
    shortDescription: "Your gut is the foundation of everything — your energy, your mood, your skin. This probiotic dissolving strip absorbs up to 5x faster, delivering 10 Billion CFU plus prebiotic fiber. A gut health supplement strip for real digestive balance. Because you are worth more than a pill you keep forgetting. Feel good from the inside out.",
    benefits: [
      { headline: 'Daily Digestive Support', description: '10 Billion CFU in this probiotic metabolism strip support healthy gut flora and digestion.' },
      { headline: 'Probiotic + Prebiotic Synergy', description: 'This gut health supplement strip combines probiotics plus prebiotic fiber for enhanced effect.' },
      { headline: 'Anytime Convenience', description: 'A fast dissolving probiotic — no capsules, no water, take anywhere as a digestive supplement strip.' },
      { headline: 'Refreshing Flavor', description: 'Light mixed berry taste — the best gut microbiome supplement strip for your daily routine.' },
    ],
    longDescription: [
      "That bloated, sluggish feeling that follows you through the day? It's your gut asking for help. You've probably tried everything — capsules that upset your stomach, powders that taste terrible, routines you couldn't keep up with. You deserve a probiotic dissolving strip that actually works and fits your life.",
      "Each probiotic metabolism strip delivers 10 Billion CFU of Bifidobacterium lactis plus prebiotic fiber — a synbiotic combination in this gut health supplement strip that supports your gut microbiome from both sides. And because it's a fast dissolving probiotic that dissolves on your tongue in 3 seconds, it absorbs up to 5x faster than traditional capsules. It's the digestive supplement strip designed for real results.",
      "Mixed-berry flavor. No water needed. No refrigeration required. Just one gut microbiome supplement strip every morning and a gut that finally feels balanced. That's self-care that actually makes sense.",
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
    relatedProducts: [
      { handle: 'digestive-gut-health-strips', anchor: 'Digestive Strips with probiotics + enzymes' },
      { handle: 'appetite-balance-weight-support-strips', anchor: 'Appetite Balance Strips for metabolism' },
      { handle: 'beauty-collagen-strips', anchor: 'Beauty Collagen Strips for skin from within' },
    ],
  },

  // 7. Beauty + Collagen Strips
  'beauty': {
    handle: 'beauty',
    seoTitle: 'Beauty Collagen Strips – Skin Glow from Within | NEUVIE',
    metaDescription: 'Collagen, Vitamin C & Vitamin E in one dissolving strip. Support your skin daily – no pills, no powder. Shop NEUVIE Beauty Strips.',
    seoKeywords: ['dissolving collagen strips', 'collagen strips for skin', 'beauty supplement strips', 'collagen without pills', 'skin glow supplement', 'hyaluronic acid strip', 'vitamin c collagen strip', 'best collagen supplement 2026'],
    shortDescription: "You look in the mirror and you want to see the best version of yourself looking back. These dissolving collagen strips absorb up to 5x faster, delivering 100mg Collagen Peptides and Vitamin E. A skin glow supplement that's also collagen without pills. Because you are worth more than a pill you keep forgetting. Glow from within.",
    benefits: [
      { headline: 'Skin Elasticity', description: 'Collagen peptides in these collagen strips for skin support your skin\'s natural structure and glow.' },
      { headline: 'Antioxidant Protection', description: 'Vitamin E in these beauty supplement strips helps protect cells from oxidative stress.' },
      { headline: 'Convenient Beauty Support', description: 'A skin glow supplement in mango flavor that dissolves on your tongue — collagen without pills, no powder.' },
      { headline: 'Hair & Nail Health', description: 'These dissolving collagen strips provide building blocks for healthy hair and nails — the best collagen supplement 2026.' },
    ],
    longDescription: [
      "Real beauty starts from within — and you know it. But the collagen powders are messy, the pills are huge, and the routines feel like a full-time job. You deserve dissolving collagen strips that make your beauty routine as effortless as you want to feel. That's collagen without pills, designed for real life.",
      "NEUVIE Beauty + Collagen Strips deliver 100mg of Collagen Peptides and Vitamin E in a fruity mango-flavored beauty supplement strip that dissolves on your tongue in 3 seconds — absorbing up to 5x faster than traditional supplements. These collagen strips for skin support your skin's elasticity, while Vitamin E provides antioxidant protection. It's the skin glow supplement and best collagen supplement 2026 you've been looking for.",
      "No mixing. No measuring. No forgetting. Just one vitamin C collagen strip a day and the confidence of knowing you're nourishing your natural glow from the inside out. Because the best beauty routine is one you'll actually stick to.",
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
    relatedProducts: [
      { handle: 'hair-skin-and-nails-strips', anchor: 'Hair, Skin & Nails Strips with Biotin 5000 mcg' },
      { handle: 'probiotic-metabolism-strips', anchor: 'Probiotic Strips for gut-skin connection' },
      { handle: 'iron-strips', anchor: 'Iron Strips for energy and healthy skin' },
    ],
  },

  // 8. Hair, Skin & Nails Strips
  'hair': {
    handle: 'hair',
    seoTitle: 'Hair Skin & Nails Strips – Biotin + Collagen | NEUVIE',
    metaDescription: 'Biotin 5000 mcg, Folate & D3 in one dissolving strip. Strengthen hair and nails from within – no capsules. Shop NEUVIE.',
    seoKeywords: ['biotin dissolving strip', 'hair growth supplement strip', 'hair skin nails supplement no pills', 'fast dissolving biotin', 'nail strength supplement strip', 'collagen biotin strip'],
    shortDescription: "Watching your hair thin, your nails break, your skin lose its life — it's more than cosmetic. It's personal. This biotin dissolving strip absorbs up to 5x faster, with 5,000 mcg Biotin, Folate, and Vitamin D3. A hair skin nails supplement with no pills. Because you are worth more than a pill you keep forgetting. See the difference you deserve.",
    benefits: [
      { headline: 'Biotin for Beauty', description: 'This biotin dissolving strip plays a key role in natural hair, skin & nail health.' },
      { headline: 'Cellular Wellness', description: 'Folate in this hair growth supplement strip supports healthy cell function and skin vitality.' },
      { headline: 'Daily Sunshine', description: 'Vitamin D3 supports calcium absorption in this collagen biotin strip for overall wellness.' },
      { headline: 'On-the-Go Care', description: 'Orange-flavored fast dissolving biotin — a nail strength supplement strip perfect for mobile beauty routines.' },
    ],
    longDescription: [
      "This is the one that started it all. Because watching your hair fall out in the shower, seeing your nails split before they can grow, feeling like your skin has lost its light — that's not just frustrating. It's heartbreaking. And every capsule you forgot to take felt like giving up on yourself. You need a biotin dissolving strip that actually works — a hair skin nails supplement with no pills.",
      "NEUVIE Hair, Skin & Nails Strips deliver 5,000 mcg of Biotin, Folate, and Vitamin D3 — the trifecta your body craves for hair strength, skin vitality, and nail resilience. This fast dissolving biotin and hair growth supplement strip dissolves on your tongue in 3 seconds and absorbs up to 5x faster than traditional biotin pills. This collagen biotin strip needs no water and no routine to remember. It's the nail strength supplement strip designed for real results.",
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
    relatedProducts: [
      { handle: 'beauty-collagen-strips', anchor: 'Beauty Collagen Strips for radiant skin' },
      { handle: 'iron-strips', anchor: 'Iron Strips for energy and hair health' },
      { handle: 'bone-support-strips', anchor: 'Bone Support Strips with Vitamin D3' },
    ],
  },

  // 9. Digestive + Gut Health Strips
  'digestive': {
    handle: 'digestive',
    seoTitle: 'Digestive Gut Health Strips – Probiotics | NEUVIE',
    metaDescription: 'Probiotics 10B CFU + digestive enzymes in one dissolving strip. Support gut health daily – no capsules. Shop NEUVIE Digestive Strips.',
    seoKeywords: ['dissolving digestive strip', 'gut health probiotic strip', 'digestive enzyme strip', 'fast dissolving gut supplement', 'probiotic strip for bloating', 'best digestive supplement 2026'],
    shortDescription: "Bloating, discomfort, that heavy feeling after every meal — you've tried to ignore it long enough. This dissolving digestive strip absorbs up to 5x faster, combining probiotics and digestive enzymes for real relief. A gut health probiotic strip with no pills required. Because you are worth more than a pill you keep forgetting. Your gut will thank you.",
    benefits: [
      { headline: 'Healthy Gut Balance', description: 'Bacillus Coagulans in this gut health probiotic strip supports a healthy microbiome.' },
      { headline: 'Protein Digestion', description: 'Enzymes like Protease, Papain & Bromelain in this digestive enzyme strip aid natural digestion.' },
      { headline: 'Fast-Dissolving Convenience', description: 'This fast dissolving gut supplement dissolves on your tongue in seconds — perfect for travel.' },
      { headline: 'Simple Gut Support', description: 'One probiotic strip for bloating delivers your daily digestive wellness, portable and easy — the best digestive supplement 2026.' },
    ],
    longDescription: [
      "You know the feeling — that uncomfortable bloat after eating, the heaviness that follows you through the afternoon, the gut issues you've learned to just \"deal with.\" But here's the truth: you shouldn't have to. Your digestive system deserves a dissolving digestive strip — real support, not another capsule you'll forget by Wednesday.",
      "NEUVIE Digestive + Gut Health Strips are a gut health probiotic strip combining 10 Billion CFU of Bacillus Coagulans with a triple digestive enzyme strip blend of Protease, Papain, and Bromelain — supporting both your gut flora and your body's natural digestive processes. This fast dissolving gut supplement dissolves on your tongue in 3 seconds and absorbs up to 5x faster. It's the probiotic strip for bloating you've been searching for — and the best digestive supplement 2026.",
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
    relatedProducts: [
      { handle: 'probiotic-metabolism-strips', anchor: 'Probiotic Strips for metabolism and gut balance' },
      { handle: 'appetite-balance-weight-support-strips', anchor: 'Appetite Balance Strips with Saffron' },
      { handle: 'beauty-collagen-strips', anchor: 'Beauty Collagen Strips for the gut-skin axis' },
    ],
  },

  // 10. Appetite Balance & Weight Support Strips
  'appetite': {
    handle: 'appetite',
    seoTitle: 'Metabolism Strips – Daily Metabolism Support | NEUVIE',
    metaDescription: 'Saffron, Chromium & Molybdenum in one dissolving strip. Reset your metabolism naturally – no pills. Shop NEUVIE Metabolism Strips.',
    seoKeywords: ['metabolism supplement strips', 'dissolving metabolism supplement', 'appetite control strip', 'saffron appetite strip', 'metabolism boost no pills', 'chromium weight support strip'],
    shortDescription: "The cravings. The guilt. The cycle that never ends. These metabolism supplement strips absorb up to 5x faster, delivering Saffron, Chromium, and Molybdenum. A dissolving metabolism supplement for balanced blood sugar and mindful eating — metabolism boost with no pills. Because you are worth more than a pill you keep forgetting. Take control — gently, on your terms.",
    benefits: [
      { headline: 'Daily Wellness Support', description: 'Molybdenum in these metabolism supplement strips supports natural enzyme activity in the body.' },
      { headline: 'Blood Sugar Balance', description: 'Chromium in this dissolving metabolism supplement supports glucose metabolism and stable levels.' },
      { headline: 'Botanical Balance', description: 'This saffron appetite strip contributes to emotional balance and wellbeing.' },
      { headline: 'Convenient Format', description: 'A chromium weight support strip — portable, fast, easy to take anywhere. Metabolism boost with no pills.' },
    ],
    longDescription: [
      "You're not weak. The cravings, the constant hunger, the frustration with your own body — none of that is a character flaw. It's your biology asking for support. You deserve metabolism supplement strips that actually work, not another fad product that makes you feel worse about yourself.",
      "NEUVIE Appetite Balance Strips are a dissolving metabolism supplement combining Saffron extract for emotional balance, Chromium for healthy blood sugar metabolism, and Molybdenum for essential nutrient processing. This saffron appetite strip dissolves in 3 seconds and absorbs up to 5x faster than capsules. It's a chromium weight support strip designed for metabolism boost with no pills. No water needed. No meal planning required.",
      "This isn't about restriction. It's about balance — the kind that comes from finally giving your body what it's been asking for. One metabolism supplement strip. 3 seconds. A gentler relationship with yourself.",
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
    relatedProducts: [
      { handle: 'probiotic-metabolism-strips', anchor: 'Probiotic Strips for gut and metabolism' },
      { handle: 'energy-strips', anchor: 'Energy Strips for clean daily energy' },
      { handle: 'digestive-gut-health-strips', anchor: 'Digestive Strips for gut health balance' },
    ],
  },

  // 11. Iron Strips
  'iron': {
    handle: 'iron',
    seoTitle: 'Iron Strips – Daily Iron Without Stomach Issues | NEUVIE',
    metaDescription: 'Gentle iron 19mg + Vitamin C in one dissolving strip. No stomach upset, no pills – support energy levels daily. Shop NEUVIE.',
    seoKeywords: ['iron supplement strip', 'dissolving iron supplement', 'iron no stomach pain', 'gentle iron supplement strip', 'iron vitamin C strip', 'iron supplement women 2026'],
    shortDescription: "That bone-deep tiredness that coffee can't fix? It might be your iron. This dissolving iron supplement absorbs up to 5x faster, delivering 19mg of gentle iron plus Folate — iron with no stomach pain. A gentle iron supplement strip for women who need real energy support. Because you are worth more than a pill you keep forgetting. Feel alive again.",
    benefits: [
      { headline: 'Red Blood Cell Formation', description: 'This iron supplement strip contributes to normal red blood cell production.' },
      { headline: 'Oxygen Transport', description: 'This dissolving iron supplement supports normal oxygen transport throughout the body — iron with no stomach pain.' },
      { headline: 'Energy Production', description: 'This gentle iron supplement strip contributes to normal energy metabolism for women.' },
      { headline: 'Healthy Cell Formation', description: 'Folate in this iron vitamin C strip supports normal cell division — the iron supplement women 2026 trust.' },
    ],
    longDescription: [
      "You're exhausted — and not the \"I need more sleep\" kind. It's deeper than that. The fatigue that sits in your bones, the brain fog that won't lift, the feeling that your body is running on empty no matter what you do. If that sounds familiar, your iron levels might be trying to tell you something. You need an iron supplement strip that actually works.",
      "Our dissolving iron supplement delivers 19mg of iron in a gentle, raspberry-flavored format that dissolves in 3 seconds and absorbs up to 5x faster than traditional iron pills — this gentle iron supplement strip avoids the nausea, constipation, or metallic taste that made you quit last time. It's iron with no stomach pain, paired with 400 mcg of Folate for healthy cell formation. This iron vitamin C strip is the iron supplement women 2026 have been waiting for.",
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
    relatedProducts: [
      { handle: 'energy-strips', anchor: 'Energy Strips for clean daily energy boost' },
      { handle: 'hair-skin-and-nails-strips', anchor: 'Hair, Skin & Nails Strips with Biotin' },
      { handle: 'bone-support-strips', anchor: 'Bone Support Strips with Vitamin D3 + K2' },
    ],
  },

  // 12. Energy Strips
  'energy': {
    handle: 'energy',
    seoTitle: 'Energy Strips – Clean Energy Without Coffee | NEUVIE',
    metaDescription: 'Natural caffeine + B vitamins in one dissolving strip. Beat the 3PM slump fast – no crash, no pills. Try NEUVIE Energy Strips.',
    seoKeywords: ['dissolving energy strips', 'energy supplement no pills', 'fast dissolving caffeine strip', 'natural energy boost strip', 'no crash energy supplement', 'caffeine strip alternative to coffee'],
    shortDescription: "You're running on empty and another cup of coffee isn't the answer. These dissolving energy strips absorb up to 5x faster, delivering clean Caffeine, L-Theanine, and B12. A fast dissolving caffeine strip with no crash — the natural energy boost strip that feels like you. A caffeine strip alternative to coffee. Because you are worth more than a pill you keep forgetting.",
    benefits: [
      { headline: 'Enhanced Focus', description: 'Caffeine and L-Theanine in these dissolving energy strips together promote focused attention.' },
      { headline: 'Physical Endurance', description: 'This natural energy boost strip supports physical stamina and performance.' },
      { headline: 'Mental Clarity', description: 'Vitamin B12 in this fast dissolving caffeine strip contributes to normal cognitive function.' },
      { headline: 'No Crash, No Jitters', description: 'This no crash energy supplement delivers stable energy release — a caffeine strip alternative to coffee.' },
    ],
    longDescription: [
      "Three cups of coffee by noon and you're still dragging. The energy drinks leave you jittery and then crash you harder. You deserve dissolving energy strips that actually feel good — a natural energy boost strip that lifts you up without the payback.",
      "NEUVIE Energy Strips are a fast dissolving caffeine strip combining 50mg of Caffeine with 30mg of L-Theanine and Vitamin B12 — a proven stack for smooth, focused energy without jitters or crashes. This energy supplement with no pills dissolves in 3 seconds and absorbs up to 5x faster. It's the no crash energy supplement and caffeine strip alternative to coffee that respects your body.",
      "Keep a pack in your bag, your desk, your car. Whenever you need a lift, it's 3 seconds away. No sugar, no crash, no excuses. Just clean dissolving energy strips that respect your body as much as you do.",
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
    relatedProducts: [
      { handle: 'mushroom-focus-strips', anchor: "Mushroom Focus Strips with Lion's Mane" },
      { handle: 'cognitive-relax-strips', anchor: 'Cognitive Relax Strips for calm focus' },
      { handle: 'iron-strips', anchor: 'Iron Strips for natural energy support' },
    ],
  },

  // 13. Sleep Strips
  'sleep': {
    handle: 'sleep',
    seoTitle: 'Sleep Strips – Fall Asleep Faster Naturally | NEUVIE',
    metaDescription: 'Melatonin + Valerian in one dissolving strip under your tongue. Fall asleep naturally – no pills. Try NEUVIE Sleep Strips tonight.',
    seoKeywords: ['dissolving sleep strips', 'melatonin strip supplement', 'fast dissolving sleep aid', 'magnesium sleep strip', 'natural sleep supplement strip', 'sleep aid without capsules'],
    shortDescription: "You lie awake replaying the day, and tomorrow starts before you've even recovered from today. These dissolving sleep strips absorb up to 5x faster, combining Melatonin, Valerian, Chamomile, Lavender, and Hibiscus. A natural sleep supplement strip for deep, restorative rest — a sleep aid without capsules. Because you are worth more than a pill you keep forgetting. You carried the whole day — let tonight carry you.",
    benefits: [
      { headline: 'Enhanced Sleep Quality', description: 'Melatonin in this melatonin strip supplement helps reduce the time it takes to fall asleep.' },
      { headline: 'Stress Reduction', description: 'Valerian and Chamomile in these dissolving sleep strips may contribute to relaxation.' },
      { headline: 'Deeper Sleep', description: 'This fast dissolving sleep aid supports deeper sleep phases for true restoration.' },
      { headline: 'Non-Habit Forming', description: 'A natural sleep supplement strip with a gentle, botanical formula — a sleep aid without capsules and zero addiction potential.' },
    ],
    longDescription: [
      "Your body is exhausted but your mind won't stop. You replay conversations, worry about tomorrow, count the hours of sleep you're losing in real time. You've earned rest — real rest. The kind where you wake up and actually feel like a different person. You need dissolving sleep strips that work.",
      "NEUVIE Sleep Strips are a melatonin strip supplement combining 5mg of Melatonin with a calming botanical blend of Valerian, Chamomile, Lavender, and Hibiscus — nature's gentlest sleep support. This fast dissolving sleep aid dissolves on your tongue in 3 seconds and absorbs up to 5x faster than traditional supplements. It's a natural sleep supplement strip that's non-habit forming — a sleep aid without capsules you can use every night without worry.",
      "No water. No pills on your nightstand. Just a quiet 3-second routine that tells your body: you did enough today. Rest now. Because the person who gives everything to everyone else deserves a night of deep, peaceful sleep with these dissolving sleep strips.",
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
    relatedProducts: [
      { handle: 'cognitive-relax-strips', anchor: 'Cognitive Relax Strips for daytime calm' },
      { handle: 'mushroom-focus-strips', anchor: 'Mushroom Focus Strips for morning clarity' },
      { handle: 'beauty-collagen-strips', anchor: 'Beauty Collagen Strips for overnight repair' },
    ],
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
