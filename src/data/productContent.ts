// German product content for all Neuvie products
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
    seoTitle: 'Hangover Strips Mango-Orange | Natürliche Erholung | Neuvie',
    metaDescription: 'Neuvie Hangover Strips mit Kurkuma, Dattelextrakt & Traubenkernextrakt. Unterstützt Leber, Flüssigkeitsbalance & natürliche Erholung. Mango-Orange Geschmack.',
    shortDescription: 'Das Produkt wurde mit ayurvedischen Zutaten entwickelt, um den Körper bei den Nachwirkungen einer Nacht zu unterstützen. Bestes Ergebnis: 1 Strip vor dem Schlafengehen. Unterstützt Hydratation, erholsamen Schlaf und Reduzierung gelegentlicher Kopfschmerzen.',
    benefits: [
      { headline: 'Natural rescue for multiple symptoms', description: 'Supports headaches, disturbed sleep, and general discomfort after drinking.' },
      { headline: 'Healthy inflammatory response', description: 'Curcuma Longa, Cichorium Intybus & Phyllanthus Emblica support normal inflammatory processes.' },
      { headline: 'Liver protection and support', description: 'Andrographis Paniculata + Phyllanthus Niruri may help support normal liver function.' },
      { headline: 'Supports normal fluid balance', description: 'Formulated to maintain hydration and support overall well-being.' },
    ],
    longDescription: [
      'Our Hangover Oral Strips are crafted with a blend of ingredients inspired by traditional Ayurvedic practices, designed to support general wellness. These strips are formulated with a focus on the traditional use of each ingredient, aiming to contribute to your overall well-being.',
      'Support for General Wellness: While individual experiences may vary, our strips are formulated with the intent to support aspects of wellness that can be challenged after social activities. They are designed with a focus on traditional, natural ingredients.',
      'Traditionally inspired ingredients: The inclusion of Curcuma Longa (Curcumin), Cichorium Intybus, and Phyllanthus Niruri are also included for their traditional use in supporting general liver health.',
      'Aiming to Support Well-Being: Our product is intended to be a part of your wellness routine, potentially supporting the body\'s natural ability to maintain cognitive clarity, preserve normal fluid levels, and support restoration for restful sleep.',
    ],
    usage: '1 Strip vor dem Schlafengehen auf die Zunge legen und auflösen lassen.',
    ingredients: [
      'Pullulan', 'Phoenix Dactylifera extract', 'Curcuma Longa extract', 'Andrographis paniculata extract',
      'Cichorium intybus extract', 'Vitis Vinifera extract', 'Phyllanthus Niruri extract',
      'Phyllanthus Emblica extract', 'Cellulose', 'Mannitol', 'Licorice extract',
      'Lecithin', 'Malic acid', 'Mango flavor', 'Stevia glycosides', 'Orange flavor'
    ],
    supplementFacts: [
      { nutrient: 'Phoenix Dactylifera Extrakt', amount: '*' },
      { nutrient: 'Curcuma Longa Extrakt', amount: '*' },
      { nutrient: 'Andrographis Paniculata Extrakt', amount: '*' },
      { nutrient: 'Vitis Vinifera Extrakt', amount: '*' },
      { nutrient: 'Phyllanthus Extrakte', amount: '*' },
    ],
    properties: ['Vegan', 'Glutenfrei', 'Non-GMO', 'Ohne künstliche Farbstoffe', 'Zuckerfrei'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Außerhalb der Reichweite von kleinen Kindern aufbewahren. Kühl und trocken lagern.',
  },

  // 2. Bone Support Strips
  'bone': {
    handle: 'bone',
    seoTitle: 'Bone Support Strips Himbeere | Vitamin D3 + K2 | Neuvie',
    metaDescription: 'Neuvie Bone Support Strips mit Vitamin D3 (2000 IU) & K2 (200 mcg). Unterstützt Knochen, Kalziumaufnahme & Immunsystem. Praktisch für unterwegs.',
    shortDescription: 'Bone Support Strips kombinieren Vitamin D3 und Vitamin K2 in einem schnell auflösenden, aromatisierten Strip zur Unterstützung der natürlichen Knochenfunktion. Hilft bei normalem Kalziumstoffwechsel, unterstützt Knochen- & Immunsystem.',
    benefits: [
      { headline: 'Essential for Bone Support', description: 'Vitamin K2 hilft beim Kalziumtransport & stärkt Knochen.' },
      { headline: 'Supports Bone Strength', description: 'Vitamin D3 trägt zur Aufnahme & Verwertung von Kalzium bei.' },
      { headline: 'Perfect for On-the-Go Wellness', description: 'Raspberry-flavored strips, anytime, anywhere.' },
      { headline: 'Helps Maintain Normal Immune Function', description: 'Vitamin D3 unterstützt zusätzlich ein normales Immunsystem.' },
    ],
    longDescription: [
      'Support your wellness routine with Bone Support Strips, a convenient and easy-to-take oral supplement formulated with Vitamin D3 and Vitamin K2. These essential nutrients play complementary roles in helping to maintain normal calcium absorption and supporting the body\'s natural bone health processes.',
      'Vitamin D3 and Vitamin K2 work together to support the body\'s natural calcium utilization and bone maintenance functions. These essential nutrients also play complementary roles in helping to maintain healthy calcium metabolism and contribute to the support of strong bones and teeth.',
    ],
    usage: '1 Strip täglich auf die Zunge legen und auflösen lassen.',
    ingredients: [
      'Vitamin D3 (Cholecalciferol) (2000 IU)', 'Vitamin K2 (Menaquinone) (200 mcg)',
      'Pullulan', 'Cellulose', 'Lecithin', 'Raspberry Flavor', 'Malic Acid',
      'Erythritol', 'Sorbitol Syrup', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Vitamin D3', amount: '2000 IU (50 mcg)' },
      { nutrient: 'Vitamin K2 (MK-7)', amount: '200 mcg' },
    ],
    properties: ['Vegan', 'Glutenfrei', 'Non-GMO', 'Laktosefrei', 'Ohne Zuckerzusatz'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Außerhalb der Reichweite von kleinen Kindern aufbewahren.',
  },

  // 3. Cognitive Relax Strips
  'cognitive': {
    handle: 'cognitive',
    seoTitle: 'Cognitive Relax Strips Erdbeere-Minze | L-Theanin + GABA | Neuvie',
    metaDescription: 'Neuvie Cognitive Relax Strips mit L-Theanin (50mg), GABA (25mg) & Vitamin B6. Unterstützt Entspannung, Fokus & Nervensystem. Erdbeere-Minze Geschmack.',
    shortDescription: 'Cognitive Relax Strips kombinieren L-Theanine, GABA und Vitamin B6 in einem schnell auflösenden, aromatisierten Strip, der den Körper dabei unterstützt Stressreaktionen zu regulieren, mentale Klarheit zu fördern und das Nervensystem zu unterstützen. Einnahme: 1 Strip täglich, jederzeit.',
    benefits: [
      { headline: 'Supports a Calm, Focused Mind', description: 'L-Theanine fördert mentale Ruhe und Klarheit.' },
      { headline: 'Encourages Mental Wellbeing', description: 'GABA unterstützt die körpereigene Stressregulation.' },
      { headline: 'Promotes Nervous System Wellness', description: 'Vitamin B6 trägt zur Funktion des Nervensystems bei.' },
      { headline: 'Quick-Dissolving, Anytime Support', description: 'Einfache Einnahme — unterwegs oder zuhause.' },
    ],
    longDescription: [
      'Find a moment of calm with Cognitive Relax Strips, thoughtfully formulated with L-Theanine from Green Tea, GABA, and Vitamin B6. These oral strips are designed to support your body\'s natural response to occasional stress and promote cognitive wellness as part of a balanced, mindful lifestyle.',
      'L-Theanine, an amino acid found in green tea, is known for supporting a calm, relaxed state while helping to maintain mental clarity.',
      'GABA, a naturally occurring compound in the body, plays a role in supporting normal nervous system activity, combined with Vitamin B6, which contributes to normal energy metabolism and nervous system function.',
      'Together, these nutrients work together to promote everyday balance.',
    ],
    usage: '1 Strip täglich auf die Zunge legen und auflösen lassen.',
    ingredients: [
      'Green Tea L-Theanine (50 mg)', 'GABA (25 mg)', 'Vitamin B6 (8 mg)',
      'Pullulan', 'Mannitol', 'Cellulose', 'Strawberry Flavor', 'Lecithin',
      'Malic Acid', 'Monk Fruit Extract', 'Pectin', 'Erythritol', 'Peppermint Flavor', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'L-Theanin', amount: '50 mg' },
      { nutrient: 'GABA', amount: '25 mg' },
      { nutrient: 'Vitamin B6', amount: '8 mg' },
    ],
    properties: ['Vegan', 'Glutenfrei', 'Non-GMO', 'Koffeinfrei', 'Ohne künstliche Süßstoffe'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Außerhalb der Reichweite von kleinen Kindern aufbewahren.',
  },

  // 4. Mushroom Focus Strips
  'mushroom': {
    handle: 'mushroom',
    seoTitle: 'Mushroom Focus Strips Schokolade | Lion\'s Mane + Cordyceps | Neuvie',
    metaDescription: 'Neuvie Mushroom Focus Strips mit Lion\'s Mane, Cordyceps, Maitake & Shiitake. Unterstützt Fokus, Energie & kognitive Funktion. Schokoladen-Geschmack.',
    shortDescription: 'Support your focus, energy & everyday mental wellness with Mushroom Focus Strips, blending a curated mix of Lion\'s Mane, Maitake, Cordyceps and Shiitake mushroom extracts in a rich chocolate-flavored strip. Zero-fuss, quick-dissolving oral strip.',
    benefits: [
      { headline: 'Cognitive Support from Lion\'s Mane', description: 'Traditionally used to support focus & cognitive wellness.' },
      { headline: 'Stamina-Promoting Cordyceps', description: 'Supports natural energy metabolism and stamina.' },
      { headline: 'Maitake & Shiitake Wellness Boost', description: 'Promotes immune balance & antioxidant support.' },
      { headline: 'Chocolate Flavor, Zero Fuss', description: 'Quick-dissolving oral strips — no capsules, no water needed.' },
    ],
    longDescription: [
      'Sharp your mental clarity and overall wellness with Mushroom Focus Strips, a convenient and flavorful way to support your routine.',
      'These smooth, chocolate-flavored oral strips dissolve easily on your tongue, delivering a curated blend of functional mushroom extracts traditionally valued for their role in promoting normal cognitive function and daily vitality.',
      'Each strip combines: Lion\'s Mane – long history in supporting cognitive function and focus, Maitake – immune support, Cordyceps – stamina, energy metabolism, Shiitake – immune balance, antioxidant support.',
      'Perfect for a busy day, these strips make it easy to incorporate mushroom-powered support into your wellness routine—anytime, no water or capsules needed.',
    ],
    usage: '1 Strip täglich auf die Zunge legen und auflösen lassen.',
    ingredients: [
      'Hericium Erinaceus (Lion\'s Mane) (50 mg)', 'Grifola Frondosa (Maitake) (25 mg)',
      'Cordyceps Sinensis (Cordyceps) (25 mg)', 'Lentinus Edodes (Shiitake) (20 mg)',
      'Pullulan', 'Cellulose', 'Lecithin', 'Chocolate Flavor', 'Monk Fruit Extract',
      'Medium-Chain Triglycerides', 'Xanthan Gum', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Lion\'s Mane Extrakt', amount: '50 mg' },
      { nutrient: 'Maitake Extrakt', amount: '25 mg' },
      { nutrient: 'Cordyceps Extrakt', amount: '25 mg' },
      { nutrient: 'Shiitake Extrakt', amount: '20 mg' },
    ],
    properties: ['Vegan', 'Glutenfrei', 'Non-GMO', 'Ohne künstliche Farbstoffe', 'Bio-Pilzextrakte'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Außerhalb der Reichweite von kleinen Kindern aufbewahren.',
  },

  // 5. Libido Support Strips
  'libido': {
    handle: 'libido',
    seoTitle: 'Libido Support Strips Schokolade | Cordyceps + Shilajit | Neuvie',
    metaDescription: 'Neuvie Libido Support Strips mit Cordyceps, Shilajit & Austernpeptid. Unterstützt Vitalität, Ausdauer & sexuelles Wohlbefinden. Diskret & praktisch.',
    shortDescription: 'Libido Support Strips unterstützen Stamina, Energy, Vitality und das allgemeine Wohlbefinden. Mit Cordyceps militaris, Shilajit und Oyster Peptide — in einem schnell auflösenden, chocolate-flavored Strip. Ideal für tägliche Routine und aktiven Lifestyle.',
    benefits: [
      { headline: 'Cordyceps for Active Vitality', description: 'Traditionally used to support stamina & endurance.' },
      { headline: 'Marine-Derived Peptides', description: 'Support overall sexual wellness & nutrient balance.' },
      { headline: 'Shilajit\'s Natural Support', description: 'Provides minerals that contribute to sexual wellness.' },
      { headline: 'Rich Chocolate Flavor', description: 'Quick-dissolving, enjoyable, no capsules, no water.' },
    ],
    longDescription: [
      'Add a little extra vitality to your wellness routine with our Libido Support Strips, specially crafted for adults looking to maintain healthy energy, stamina, and sexual wellness as part of a balanced lifestyle.',
      'Each strip delivers a blend of Cordyceps militaris, Shilajit, and Oyster Peptide — ingredients traditionally valued for supporting normal endurance, energy metabolism, and sexual function.',
      'Cordyceps militaris is associated with promoting stamina and vitality, while Shilajit provides naturally wellness-supportive minerals.',
      'These chocolate-flavored oral strips dissolve easily on your tongue, offering a simple and discreet way to support your energy, vitality, and overall wellness as part of your healthy lifestyle.',
    ],
    usage: '1-2 Strips bei Bedarf auf die Zunge legen und auflösen lassen. Nicht mehr als 2 Strips pro Tag.',
    ingredients: [
      'Cordyceps Militaris (50 mg)', 'Asphaltum Punjabinum (Shilajit) (50 mg)', 'Oyster Peptide (20 mg)',
      'Pullulan', 'Cellulose', 'Monk Fruit Extract', 'Lecithin', 'Chocolate Flavor',
      'Erythritol', 'Sorbitol', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Cordyceps Militaris Extrakt', amount: '50 mg' },
      { nutrient: 'Shilajit Extrakt', amount: '50 mg' },
      { nutrient: 'Austernpeptid', amount: '20 mg' },
    ],
    properties: ['Glutenfrei', 'Non-GMO', 'Ohne künstliche Farbstoffe', 'Diskrete Einnahme'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Außerhalb der Reichweite von kleinen Kindern aufbewahren. Nicht für Kinder und Jugendliche geeignet.',
  },

  // 6. Probiotic + Metabolism Strips
  'probiotic': {
    handle: 'probiotic',
    seoTitle: 'Probiotic + Metabolism Strips | 10 Mrd. KBE | Neuvie',
    metaDescription: 'Neuvie Probiotic + Metabolism Strips mit 10 Mrd. KBE Bifidobacterium lactis, Polydextrose & Mönchsfrucht. Unterstützt Darmflora & Stoffwechsel.',
    shortDescription: 'Probiotic + Metabolism Strips bieten eine einfache, schnelle und wohlschmeckende Unterstützung für die Verdauungsgesundheit. Jeder Strip liefert 10 Billion CFU Probiotika plus Prebiotic Fiber zur Förderung eines gesunden Gleichgewichts der Darmflora. Mit Mixed-Berry Geschmack.',
    benefits: [
      { headline: 'Daily Digestive Support', description: '10 Billion CFU unterstützen eine gesunde Darmflora & Verdauung.' },
      { headline: 'Probiotic + Prebiotic Synergy', description: 'Probiotische Bakterien + Präbiotische Faser → stärkerer Effekt.' },
      { headline: 'Anytime, Anywhere Convenience', description: 'Dissolving strips – keine Kapseln, kein Wasser nötig.' },
      { headline: 'Refreshing Flavor Experience', description: 'Mixed Berry, leicht und natürlich süß – perfekt für die tägliche Routine.' },
    ],
    longDescription: [
      'Probiotic + Metabolism Strips are designed to make supporting your digestive wellness effortless. Each strip contains Bifidobacterium lactis, a probiotic that helps support a healthy balance of gut bacteria, combined with prebiotic fiber that fuels beneficial bacteria.',
      'Together, they work in harmony to promote digestive balance as part of your overall health routine.',
      'These strips dissolve on your tongue in seconds — no water required. Their portable design makes them a convenient option for travel, work, or on-the-go lifestyles.',
      'With a light mixed berry flavor, you can enjoy daily digestive support in a form that feels fresh and easy to use. Formulated with natural sweeteners like monk fruit extract and stevia, they offer a clean-tasting experience without added sugars.',
    ],
    usage: '1 Strip täglich auf die Zunge legen und auflösen lassen. Idealerweise morgens auf nüchternen Magen.',
    ingredients: [
      'Polydextrose (30mg)', 'Bifidobacterium lactis 25.7mg (10 Billion CFU)',
      'Pullulan', 'Cellulose', 'Mixed Berry Flavor', 'Sunflower Lecithin',
      'Monk Fruit Extract', 'Erythritol', 'Medium Chain Triglycerides', 'Malic Acid', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Bifidobacterium lactis', amount: '10 Mrd. KBE' },
      { nutrient: 'Polydextrose', amount: '30 mg' },
    ],
    properties: ['Vegan', 'Glutenfrei', 'Non-GMO', 'Zuckerfrei', 'Ohne künstliche Süßstoffe'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Außerhalb der Reichweite von kleinen Kindern aufbewahren. Kühl und trocken lagern.',
  },

  // 7. Beauty + Collagen Strips
  'beauty': {
    handle: 'beauty',
    seoTitle: 'Beauty + Collagen Strips Mango | Kollagen + Vitamin E | Neuvie',
    metaDescription: 'Neuvie Beauty + Collagen Strips mit 100mg Kollagenpeptiden & Vitamin E. Unterstützt Hautelastizität, Haare & Nägel. Leckerer Mango-Geschmack.',
    shortDescription: 'Beauty + Collagen Strips unterstützen die natürliche Kollagenproduktion, Hautelastizität und antioxidativen Zellschutz durch Kollagen Peptide und Vitamin E – in einem fruchtigen Mango-Flavor. Schnell auf der Zunge auflösend, ideal für eine tägliche Beauty-Routine.',
    benefits: [
      { headline: 'Promotes Skin Elasticity', description: 'Kollagenpeptide unterstützen die natürliche Hautstruktur.' },
      { headline: 'Antioxidant Support for Skin Wellness', description: 'Vitamin E schützt Zellen vor oxidativem Stress.' },
      { headline: 'Delicious, Mess-Free Beauty Support', description: 'Fruchtiges Mango-Aroma, oral dissolving – keine Kapseln, kein Wasser.' },
      { headline: 'Supports Healthy Hair & Nail Appearance', description: 'Kollagen liefert Bausteine für Haare & Nägel.' },
    ],
    longDescription: [
      'Beauty + Collagen Strips bieten eine einfache Möglichkeit, die tägliche Beauty- und Wellnessroutine zu unterstützen.',
      'Jeder Strip kombiniert: Collagen Peptides (100 mg) – unterstützen die körpereigene Kollagenstruktur und damit Haut, Haare und Gelenke, Vitamin E – wirkt antioxidativ und schützt die Hautzellen.',
      'Die Strips lösen sich ohne Wasser sofort auf und bieten ein angenehmes Mango-Aroma. Ideal für alle, die eine einfache, schnelle und mobile Beauty-Lösung suchen.',
    ],
    usage: '1 Strip täglich auf die Zunge legen und auflösen lassen. Für optimale Ergebnisse regelmäßig über einen längeren Zeitraum einnehmen.',
    ingredients: [
      'Collagen Peptide (100 mg)', 'Vitamin E (6 mg)',
      'Pullulan', 'Cellulose', 'Lecithin', 'Mango Flavor', 'Malic Acid', 'Pectin', 'Monk Fruit Extract', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Kollagenpeptide', amount: '100 mg' },
      { nutrient: 'Vitamin E', amount: '6 mg' },
    ],
    properties: ['Glutenfrei', 'Non-GMO', 'Ohne künstliche Farbstoffe', 'Ohne Zuckerzusatz'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Außerhalb der Reichweite von kleinen Kindern aufbewahren.',
  },

  // 8. Hair, Skin & Nails Strips
  'hair': {
    handle: 'hair',
    seoTitle: 'Hair, Skin & Nails Strips Orange | Biotin 5000 mcg | Neuvie',
    metaDescription: 'Neuvie Hair, Skin & Nails Strips mit Biotin (5000 mcg), Folat & Vitamin D3. Unterstützt Haarwachstum, Hautgesundheit & starke Nägel.',
    shortDescription: 'Support your natural glow with Hair, Skin and Nails Strips – formuliert mit Biotin, Folate und Vitamin D3. Diese schnell auflösenden orange-flavored Strips unterstützen die normale Stärke von Haaren sowie das allgemeine Wohlbefinden von Haut, Haaren und Nägeln. Einfach 1 Strip pro Tag – ohne Wasser.',
    benefits: [
      { headline: 'Tasty, On-the-Go Care', description: 'Orange-flavored, dissolves quickly — perfect for mobile beauty routine.' },
      { headline: 'Folate for Cellular Wellness', description: 'Supports healthy cell function and skin vitality.' },
      { headline: 'Daily Sunshine in a Strip', description: 'Vitamin D3 unterstützt die Calciumaufnahme & das allgemeine Wohlbefinden.' },
      { headline: 'Biotin for Beauty Support', description: 'Biotin spielt eine wichtige Rolle bei natürlicher Haar-, Haut- & Nagelgesundheit.' },
    ],
    longDescription: [
      'Nourish your natural beauty from within with our Hair, Skin and Nails Strips — a convenient, on-the-go supplement designed to support normal hair strength, skin vitality, and nail health.',
      'These quick-dissolving, orange-flavored oral strips provide key nutrients to support your hair, skin and nail wellness as part of your daily routine — all in a simple, easy-to-take format.',
      'Each strip contains 5,000 mcg of Biotin, a key nutrient known to support the body\'s normal processes for maintaining healthy hair, skin, and nails. Paired with Folate (Vitamin B9) and Vitamin D3, this thoughtful combination helps promote overall wellness and supports cellular health as part of a balanced lifestyle.',
      'To use, simply place one strip on your tongue and allow it to dissolve completely — no water required.',
    ],
    usage: '1 Strip täglich auf die Zunge legen und auflösen lassen. Für sichtbare Ergebnisse wird eine regelmäßige Einnahme über mindestens 8-12 Wochen empfohlen.',
    ingredients: [
      'Biotin (5000 mcg)', 'Vitamin B9 (Folate) (400 mcg)', 'Vitamin D3 (Cholecalciferol) (200 mcg)',
      'Pullulan', 'Cellulose', 'Mannitol', 'Monk Fruit Extract', 'Orange Flavor', 'Malic Acid', 'Lecithin', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Biotin', amount: '5000 mcg' },
      { nutrient: 'Folat (Vitamin B9)', amount: '400 mcg' },
      { nutrient: 'Vitamin D3', amount: '200 mcg' },
    ],
    properties: ['Vegan', 'Glutenfrei', 'Non-GMO', 'Laktosefrei', 'Ohne Zuckerzusatz'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Außerhalb der Reichweite von kleinen Kindern aufbewahren.',
  },

  // 9. Digestive + Gut Health Strips
  'digestive': {
    handle: 'digestive',
    seoTitle: 'Digestive + Gut Health Strips | Probiotika + Enzyme | Neuvie',
    metaDescription: 'Neuvie Digestive + Gut Health Strips mit Bacillus Coagulans (10 Mrd. KBE), Protease, Papain & Bromelain. Unterstützt Verdauung & Darmgesundheit.',
    shortDescription: 'Digestive + Gut Health Strips unterstützen die Darmgesundheit mit einer Kombination aus Probiotika und Verdauungsenzymen — in einem schnell auflösenden, mixed-berry flavored Strip. Perfekt für unterwegs, ohne Wasser, leicht einzunehmen.',
    benefits: [
      { headline: 'Supports Normal Gut Balance', description: 'Bacillus Coagulans unterstützt ein gesundes Mikrobiom.' },
      { headline: 'Aids Natural Protein Digestion', description: 'Enzyme wie Protease, Papain & Bromelain fördern die natürliche Eiweißverdauung.' },
      { headline: 'Fast-Dissolving Convenience', description: 'Auf der Zunge in Sekunden — perfekt für unterwegs.' },
      { headline: 'Gut Health Made Simple', description: 'Eine tägliche Portion Verdauungsunterstützung, einfach & portable.' },
    ],
    longDescription: [
      'Support your daily digestive wellness with our Digestive + Gut Health Strips, specially designed for easy, on-the-go use.',
      'Each strip delivers a unique blend of probiotics and digestive enzymes that help maintain normal gut flora balance and support natural digestion.',
      'Featuring Bacillus Coagulans, a widely studied probiotic strain, these strips help maintain healthy gut microflora, supporting normal digestive function. Combined with a blend of enzymes like Protease, Papain, and Bromelain, they assist in the breakdown of proteins and support the body\'s natural digestive processes.',
      'With a refreshing mixed berry flavor and fast-dissolving format, these strips make digestive support easy, mess-free, and enjoyable wherever life takes you.',
    ],
    usage: '1 Strip nach einer Mahlzeit auf die Zunge legen und auflösen lassen. Bei Bedarf bis zu 2 Strips täglich.',
    ingredients: [
      'Bacillus Coagulans 10 Billion CFU (50 mg)', 'Digestive Enzymatic Blend (Protease 10 mg, Papain 10 mg, Bromelain 10 mg)',
      'Pullulan', 'Mannitol', 'Monk Fruit Extract', 'Cellulose', 'Lecithin', 'Mixed Berry Flavor', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Bacillus Coagulans', amount: '10 Mrd. KBE' },
      { nutrient: 'Protease', amount: '10 mg' },
      { nutrient: 'Papain', amount: '10 mg' },
      { nutrient: 'Bromelain', amount: '10 mg' },
    ],
    properties: ['Vegan', 'Glutenfrei', 'Non-GMO', 'Laktosefrei', 'Ohne künstliche Farbstoffe'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Außerhalb der Reichweite von kleinen Kindern aufbewahren.',
  },

  // 10. Appetite Balance & Weight Support Strips
  'appetite': {
    handle: 'appetite',
    seoTitle: 'Appetite Balance & Weight Support Strips | Chrom + Safran | Neuvie',
    metaDescription: 'Neuvie Appetite Balance Strips mit Chrom (75 mcg), Molybdän (100 mcg) & Safran. Unterstützt normalen Blutzuckerspiegel & Appetitbalance.',
    shortDescription: 'Appetite Balance & Weight Support Strips bieten eine einfache, schnell einnehmbare Möglichkeit, die Ernährung und das tägliche Wohlbefinden zu unterstützen. Mit Saffron, Chromium und Molybdenum – für bewusste Essgewohnheiten, Metabolismus-Unterstützung und tägliche Vitalität.',
    benefits: [
      { headline: 'Nutrient Support for Daily Wellness', description: 'Molybdenum unterstützt natürliche Enzymaktivität im Körper.' },
      { headline: 'Helps Maintain Normal Blood Sugar Levels', description: 'Chromium unterstützt Glukosestoffwechsel & stabile Werte.' },
      { headline: 'Botanical Support for Balance', description: 'Saffron trägt zu emotionaler Balance & Wohlbefinden bei.' },
      { headline: 'Convenient On-the-Go Format', description: 'Dissolving strip – portable, schnell, leicht einzunehmen.' },
    ],
    longDescription: [
      'Discover an easy and convenient way to stay on track with your wellness goals through Appetite Balance & Weight Support Strips.',
      'Each strip contains a thoughtful blend of Saffron extract, Chromium, and Molybdenum to support balanced nutrition and overall well-being.',
      'Saffron has been traditionally used in wellness practices and is recognized for supporting balance in part of daily routines. Chromium supports normal macronutrient metabolism and helps maintain healthy blood sugar levels already within the normal range. Molybdenum contributes to essential nutrient metabolism and plays a role in overall wellness.',
      'These strips dissolve quickly on the tongue and are designed for adults who follow a health-conscious, active lifestyle — anytime, anywhere.',
    ],
    usage: '1 Strip vor einer Mahlzeit auf die Zunge legen und auflösen lassen. Bis zu 2 Strips täglich.',
    ingredients: [
      'Chromium (as Chromium Picolinate) (75 mcg)', 'Molybdenum (as Molybdenum Glycinate 400 mcg) (100 mcg)',
      'Crocus sativus (Saffron) (10 mg)', 'Pullulan', 'Cellulose', 'Malic Acid',
      'Sorbitol Syrup', 'Lecithin', 'Mixed Berry Flavor', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Chrom', amount: '75 mcg' },
      { nutrient: 'Molybdän', amount: '100 mcg' },
      { nutrient: 'Safranextrakt', amount: '10 mg' },
    ],
    properties: ['Vegan', 'Glutenfrei', 'Non-GMO', 'Zuckerfrei', 'Ohne künstliche Süßstoffe'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Außerhalb der Reichweite von kleinen Kindern aufbewahren. Dieses Produkt ist nicht als Ersatz für eine kalorienreduzierte Ernährung gedacht.',
  },

  // 11. Iron Strips
  'iron': {
    handle: 'iron',
    seoTitle: 'Iron Strips Himbeere | Eisen + Folat | Neuvie',
    metaDescription: 'Neuvie Iron Strips mit Eisen (19 mg) & Folat (400 mcg). Unterstützt rote Blutkörperchen, Sauerstofftransport & Energieproduktion. Himbeere Geschmack.',
    shortDescription: 'Promote your daily wellness with Iron Strips, a raspberry-flavored oral supplement designed to support normal energy and overall vitality. Easy-to-use, convenient and water-free.',
    benefits: [
      { headline: 'Supports red blood cell formation', description: 'Eisen trägt zur normalen Bildung roter Blutkörperchen bei.' },
      { headline: 'Supports oxygen transport', description: 'Eisen unterstützt den normalen Sauerstofftransport im Körper.' },
      { headline: 'Supports energy production', description: 'Trägt zum normalen Energiestoffwechsel bei.' },
      { headline: 'Supports healthy cell formation', description: 'Folat unterstützt die normale Zellteilung.' },
    ],
    longDescription: [
      'Support your everyday wellness with our iron strips, a convenient and gentle way to maintain normal energy levels and overall vitality. Designed for busy lifestyles, these quick-dissolving, raspberry-flavored oral strips provide key nutrients involved in red blood cell formation in an easy-to-take, water-free format.',
      'Each strip provides 19 mg of iron, an important mineral that plays a role in the body\'s normal red blood cell production and oxygen transport. Paired with 400 mcg of folate, this formula helps support healthy cell formation and general wellness as part of a balanced diet and active lifestyle.',
    ],
    usage: '1 Strip täglich auf die Zunge legen und auflösen lassen.',
    ingredients: [
      'Iron (as Ferric Saccharate) (19 mg)', 'Vitamin B9 (Folate) (400 mcg)',
      'Pullulan', 'Cellulose', 'Lecithin', 'Raspberry Flavor', 'Monk Fruit Extract',
      'Citric Acid', 'Medium-Chain Triglycerides', 'Xanthan Gum', 'Stevia Glycosides'
    ],
    supplementFacts: [
      { nutrient: 'Eisen (als Eisensaccharat)', amount: '19 mg' },
      { nutrient: 'Folat (Vitamin B9)', amount: '400 mcg' },
    ],
    properties: ['Vegan', 'Glutenfrei', 'Non-GMO', 'Laktosefrei', 'Ohne Zuckerzusatz'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Außerhalb der Reichweite von kleinen Kindern aufbewahren.',
  },

  // 12. Energy Strips
  'energy': {
    handle: 'energy',
    seoTitle: 'Energy Strips Cranberry | Koffein + L-Theanin | Neuvie',
    metaDescription: 'Neuvie Energy Strips mit Koffein (50 mg), L-Theanin (30 mg) & Vitamin B12. Unterstützt Fokus, Ausdauer & mentale Klarheit. Ohne Crash.',
    shortDescription: 'Energy Oral Strips sind speziell für Menschen entwickelt, die einen natürlichen, schnellen Energieschub benötigen — ohne Zuckercrash oder Jitter wie bei Energy-Drinks. Unterstützt Fokus, Ausdauer, mentale Klarheit und stabile Energie.',
    benefits: [
      { headline: 'Enhanced Focus', description: 'Die Kombination aus Koffein und L-Theanin fördert konzentrierte Aufmerksamkeit.' },
      { headline: 'Increased Physical Endurance', description: 'Unterstützt die körperliche Ausdauer und Leistungsfähigkeit.' },
      { headline: 'Mental Clarity', description: 'Vitamin B12 trägt zur normalen kognitiven Funktion bei.' },
      { headline: 'No Crashes / No Jitters', description: 'Stabile Energiefreisetzung ohne den typischen Energy-Drink-Crash.' },
    ],
    longDescription: [
      'Energy Strips provide a convenient way to support focus, energy, and daily performance. These dissolvable Cranberry-flavored strips combine caffeine, L-theanine, and vitamin B12 to deliver fast-acting support for mental clarity and endurance.',
      'The formulation is designed to provide stable, jitter-free energy without the typical crash associated with sugary drinks.',
      'Perfect for athletes, professionals, students, and anyone seeking a fast and controlled energy boost.',
    ],
    usage: '1 Strip bei Bedarf auf die Zunge legen und auflösen lassen. Nicht mehr als 3 Strips pro Tag.',
    ingredients: [
      'Caffeine (50 mg)', 'L-Theanine (30 mg)', 'Vitamin B12 (50 mcg)',
      'Pullulan', 'Mannitol', 'Cellulose', 'Cranberry Flavor', 'Lecithin',
      'Malic Acid', 'Pectin', 'Erythritol', 'Stevia Glycosides', 'Methylcobalamin'
    ],
    supplementFacts: [
      { nutrient: 'Koffein', amount: '50 mg' },
      { nutrient: 'L-Theanin', amount: '30 mg' },
      { nutrient: 'Vitamin B12', amount: '50 mcg' },
    ],
    properties: ['Vegan', 'Glutenfrei', 'Non-GMO', 'Zuckerfrei', 'Ohne künstliche Farbstoffe'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Nicht für Kinder, Schwangere und stillende Mütter geeignet. Enthält Koffein.',
  },

  // 13. Sleep Strips
  'sleep': {
    handle: 'sleep',
    seoTitle: 'Sleep Strips Himbeere | Melatonin + Baldrian | Neuvie',
    metaDescription: 'Neuvie Sleep Strips mit Melatonin (5 mg), Baldrian, Kamille, Lavendel & Hibiskus. Unterstützt erholsamen Schlaf. Nicht-abhängig machend.',
    shortDescription: 'Diese sanfte Mischung aus nicht-abhängig machenden Pflanzenextrakten wurde entwickelt, um einen gesunden Schlaf-Wach-Rhythmus zu unterstützen. Hilft bei erholsamem Schlaf, stressbedingten Schlafstörungen und gesundem Schlafzyklus.',
    benefits: [
      { headline: 'Enhanced Sleep Quality', description: 'Melatonin trägt dazu bei, die Einschlafzeit zu verkürzen.' },
      { headline: 'Stress Reduction', description: 'Baldrian und Kamille können zur Entspannung beitragen.' },
      { headline: 'Improved Non-REM Sleep', description: 'Unterstützt die tieferen Schlafphasen für echte Erholung.' },
      { headline: 'Non-Addictive Formula', description: 'Sanfte, pflanzliche Formel ohne Abhängigkeitspotenzial.' },
    ],
    longDescription: [
      'Sleep Strips were created to help support relaxation and natural sleep cycles. The combination of valerian, chamomile, lavender, hibiscus, and melatonin offers a gentle nighttime formula designed to calm the mind and support restful sleep.',
      'These quick-dissolving Raspberry-flavored strips are perfect for busy individuals seeking a natural alternative to traditional sleep aids.',
      'Their non-addictive formula makes them suitable for consistent nightly use to promote well-being and next-day energy.',
    ],
    usage: '1 Strip 30 Minuten vor dem Schlafengehen auf die Zunge legen und auflösen lassen.',
    ingredients: [
      'Valerian Extract (10 mg)', 'Lavender (5 mg)', 'Chamomile (5 mg)',
      'Hibiscus Extract (5 mg)', 'Melatonin (5 mg)', 'Sorbitol (30 mg)',
      'Medium Chain Triglycerides', 'Steviol Glycosides', 'Xylitol', 'Erythritol',
      'Natural Flavors', 'Pectin', 'Citric Acid'
    ],
    supplementFacts: [
      { nutrient: 'Baldrianextrakt', amount: '10 mg' },
      { nutrient: 'Lavendel', amount: '5 mg' },
      { nutrient: 'Kamille', amount: '5 mg' },
      { nutrient: 'Hibiskus-Extrakt', amount: '5 mg' },
      { nutrient: 'Melatonin', amount: '5 mg' },
    ],
    properties: ['Vegan', 'Glutenfrei', 'Non-GMO', 'Nicht-abhängig machend', 'Ohne künstliche Farbstoffe'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Nicht für Kinder, Schwangere und stillende Mütter geeignet. Nicht vor dem Autofahren oder Bedienen von Maschinen einnehmen.',
  },
};

// Helper function to find product content by handle or title
export const findProductContent = (handleOrTitle: string): ProductContent | null => {
  const searchTerm = handleOrTitle.toLowerCase();
  
  // Direct handle match
  for (const [key, content] of Object.entries(productContentMap)) {
    if (searchTerm.includes(key)) {
      return content;
    }
  }
  
  // Try matching by keywords
  if (searchTerm.includes('hangover') || searchTerm.includes('kater')) return productContentMap['hangover'];
  if (searchTerm.includes('bone') || searchTerm.includes('knochen')) return productContentMap['bone'];
  if (searchTerm.includes('cognitive') || searchTerm.includes('relax')) return productContentMap['cognitive'];
  if (searchTerm.includes('mushroom') || searchTerm.includes('focus') || searchTerm.includes('pilz')) return productContentMap['mushroom'];
  if (searchTerm.includes('libido')) return productContentMap['libido'];
  if (searchTerm.includes('probiotic') || searchTerm.includes('metabolism')) return productContentMap['probiotic'];
  if (searchTerm.includes('beauty') || searchTerm.includes('collagen')) return productContentMap['beauty'];
  if (searchTerm.includes('hair') || searchTerm.includes('skin') || searchTerm.includes('nail')) return productContentMap['hair'];
  if (searchTerm.includes('digestive') || searchTerm.includes('gut')) return productContentMap['digestive'];
  if (searchTerm.includes('appetite') || searchTerm.includes('weight')) return productContentMap['appetite'];
  if (searchTerm.includes('iron') || searchTerm.includes('eisen')) return productContentMap['iron'];
  if (searchTerm.includes('energy') || searchTerm.includes('energie')) return productContentMap['energy'];
  if (searchTerm.includes('sleep') || searchTerm.includes('schlaf')) return productContentMap['sleep'];
  
  return null;
};
