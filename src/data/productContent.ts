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
  // Hangover Strips
  'hangover': {
    handle: 'hangover',
    seoTitle: 'Hangover Strips Mango-Orange | Natürliche Erholung | Neuvie',
    metaDescription: 'Neuvie Hangover Strips mit Kurkuma, Dattelextrakt & Traubenkernextrakt. Unterstützt Leber, Flüssigkeitsbalance & natürliche Erholung. Mango-Orange Geschmack.',
    shortDescription: 'Deine natürliche Unterstützung nach einer langen Nacht. Die Hangover Strips kombinieren bewährte Pflanzenextrakte, die deinen Körper bei der Regeneration unterstützen können.',
    benefits: [
      { headline: 'Natürliche Erholung', description: 'Ausgewählte Pflanzenextrakte können deinen Körper bei der natürlichen Regeneration unterstützen.' },
      { headline: 'Leberunterstützung', description: 'Inhaltsstoffe wie Kurkuma und Phyllanthus können die normale Leberfunktion unterstützen.' },
      { headline: 'Flüssigkeitsbalance', description: 'Kann dazu beitragen, den normalen Flüssigkeitshaushalt zu unterstützen.' },
      { headline: 'Entzündungsreaktion', description: 'Kurkuma kann eine gesunde Entzündungsreaktion fördern.' },
    ],
    longDescription: [
      'Die Neuvie Hangover Strips wurden speziell entwickelt, um deinen Körper nach einer anstrengenden Nacht zu unterstützen. Mit einer einzigartigen Kombination aus traditionellen Pflanzenextrakten bieten sie eine praktische Lösung für unterwegs.',
      'Unsere Formel enthält Kurkuma-Extrakt, der für seine unterstützenden Eigenschaften bekannt ist, sowie Dattelextrakt und Traubenkernextrakt. Ergänzt wird die Rezeptur durch Andrographis, Zichorien-Extrakt und Phyllanthus-Extrakte.',
      'Der erfrischende Mango-Orange Geschmack macht die Einnahme angenehm. Die Strips lösen sich schnell auf der Zunge auf – ganz ohne Wasser.',
      'Ideal für alle, die eine natürliche Unterstützung suchen und dabei auf hochwertige, pflanzliche Inhaltsstoffe setzen möchten.',
    ],
    usage: 'Bei Bedarf 1 Strip auf die Zunge legen und auflösen lassen. Kann nach einer durchfeierten Nacht oder bei Bedarf eingenommen werden.',
    ingredients: [
      'Pullulan', 'Phoenix Dactylifera Extrakt (Dattel)', 'Curcuma Longa Extrakt (Kurkuma)', 
      'Andrographis Paniculata Extrakt', 'Cichorium Intybus Extrakt (Zichorie)', 
      'Vitis Vinifera Extrakt (Traube)', 'Phyllanthus Niruri Extrakt', 
      'Phyllanthus Emblica Extrakt', 'Cellulose', 'Mannitol', 
      'Süßholzextrakt', 'Lecithin', 'Äpfelsäure', 'Mango-Aroma', 
      'Stevia Glycoside', 'Orangen-Aroma'
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

  // Bone Support Strips
  'bone': {
    handle: 'bone',
    seoTitle: 'Bone Support Strips Himbeere | Vitamin D3 + K2 | Neuvie',
    metaDescription: 'Neuvie Bone Support Strips mit Vitamin D3 (2000 IU) & K2 (200 mcg). Unterstützt Knochen, Kalziumaufnahme & Immunsystem. Praktisch für unterwegs.',
    shortDescription: 'Deine tägliche Unterstützung für starke Knochen. Die Kombination aus Vitamin D3 und K2 kann zur Erhaltung normaler Knochen beitragen.',
    benefits: [
      { headline: 'Kalziumtransport', description: 'Vitamin K2 kann dazu beitragen, Kalzium dorthin zu transportieren, wo es gebraucht wird – in die Knochen.' },
      { headline: 'Kalziumaufnahme', description: 'Vitamin D3 unterstützt die normale Aufnahme von Kalzium aus der Nahrung.' },
      { headline: 'Praktisch für unterwegs', description: 'Die Strips sind ideal für alle, die ihre Vitamine auch unterwegs einnehmen möchten.' },
      { headline: 'Immunsystem', description: 'Vitamin D trägt zu einer normalen Funktion des Immunsystems bei.' },
    ],
    longDescription: [
      'Die Neuvie Bone Support Strips kombinieren zwei essentielle Vitamine, die synergistisch zusammenarbeiten können: Vitamin D3 und Vitamin K2.',
      'Vitamin D3 ist bekannt dafür, die Aufnahme von Kalzium zu unterstützen, während Vitamin K2 dazu beitragen kann, das aufgenommene Kalzium zu den Knochen zu transportieren. Diese Kombination macht die Strips zu einer durchdachten Ergänzung für deine Knochengesundheit.',
      'Mit 2000 IU Vitamin D3 und 200 mcg Vitamin K2 pro Strip erhältst du eine sinnvolle Dosierung in einer praktischen Form. Der fruchtige Himbeergeschmack macht die tägliche Einnahme zum Vergnügen.',
      'Besonders in den Wintermonaten, wenn die Sonneneinstrahlung geringer ist, kann eine Ergänzung mit Vitamin D sinnvoll sein.',
    ],
    usage: '1 Strip täglich auf die Zunge legen und auflösen lassen. Idealerweise zu einer Mahlzeit einnehmen.',
    ingredients: ['Vitamin D3 (2000 IU)', 'Vitamin K2 (200 mcg)', 'Pullulan', 'Lecithin', 'Himbeer-Aroma'],
    supplementFacts: [
      { nutrient: 'Vitamin D3', amount: '2000 IU (50 mcg)' },
      { nutrient: 'Vitamin K2 (MK-7)', amount: '200 mcg' },
    ],
    properties: ['Vegan', 'Glutenfrei', 'Non-GMO', 'Laktosefrei', 'Ohne Zuckerzusatz'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Außerhalb der Reichweite von kleinen Kindern aufbewahren.',
  },

  // Cognitive Relax Strips
  'cognitive': {
    handle: 'cognitive',
    seoTitle: 'Cognitive Relax Strips Erdbeere-Minze | L-Theanin + GABA | Neuvie',
    metaDescription: 'Neuvie Cognitive Relax Strips mit L-Theanin (50mg), GABA (25mg) & Vitamin B6. Unterstützt Entspannung, Fokus & Nervensystem. Erdbeere-Minze Geschmack.',
    shortDescription: 'Finde deine innere Ruhe, ohne müde zu werden. Die Cognitive Relax Strips können dich dabei unterstützen, entspannt und fokussiert zu bleiben.',
    benefits: [
      { headline: 'Ruhe & Fokus', description: 'L-Theanin kann dabei helfen, einen Zustand entspannter Aufmerksamkeit zu fördern.' },
      { headline: 'Stressregulation', description: 'GABA ist ein natürlicher Neurotransmitter, der zur Entspannung beitragen kann.' },
      { headline: 'Nervensystem', description: 'Vitamin B6 trägt zu einer normalen Funktion des Nervensystems bei.' },
      { headline: 'Mentale Balance', description: 'Die Kombination der Inhaltsstoffe kann die mentale Balance unterstützen.' },
    ],
    longDescription: [
      'Die Neuvie Cognitive Relax Strips wurden für alle entwickelt, die in stressigen Situationen einen kühlen Kopf bewahren möchten. Die einzigartige Formel kombiniert L-Theanin, GABA und Vitamin B6.',
      'L-Theanin, eine Aminosäure die natürlich in Teeblättern vorkommt, ist bekannt für ihre beruhigenden Eigenschaften, ohne dabei müde zu machen. GABA ist ein wichtiger Neurotransmitter, der natürlicherweise im Gehirn vorkommt.',
      'Vitamin B6 ergänzt die Formel und trägt zu einer normalen Funktion des Nervensystems bei. Die Kombination dieser drei Inhaltsstoffe kann synergistisch wirken.',
      'Der angenehme Erdbeere-Minze Geschmack sorgt für ein erfrischendes Erlebnis. Ideal vor wichtigen Meetings, Prüfungen oder einfach zum Entspannen nach einem langen Tag.',
    ],
    usage: '1-2 Strips bei Bedarf auf die Zunge legen und auflösen lassen. Nicht mehr als 4 Strips pro Tag.',
    ingredients: ['L-Theanin (50 mg)', 'GABA (25 mg)', 'Vitamin B6 (8 mg)', 'Pullulan', 'Lecithin', 'Erdbeer-Aroma', 'Pfefferminz-Aroma'],
    supplementFacts: [
      { nutrient: 'L-Theanin', amount: '50 mg' },
      { nutrient: 'GABA', amount: '25 mg' },
      { nutrient: 'Vitamin B6', amount: '8 mg (571% NRV*)' },
    ],
    properties: ['Vegan', 'Glutenfrei', 'Non-GMO', 'Koffeinfrei', 'Ohne künstliche Süßstoffe'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Außerhalb der Reichweite von kleinen Kindern aufbewahren. *NRV = Nährstoffbezugswerte',
  },

  // Mushroom Focus Strips
  'mushroom': {
    handle: 'mushroom',
    seoTitle: 'Mushroom Focus Strips Schokolade | Lion\'s Mane + Cordyceps | Neuvie',
    metaDescription: 'Neuvie Mushroom Focus Strips mit Lion\'s Mane, Cordyceps, Maitake & Shiitake. Unterstützt Fokus, Energie & kognitive Funktion. Schokoladen-Geschmack.',
    shortDescription: 'Die Kraft der Vitalpilze für deinen Fokus. Unsere Mushroom Focus Strips kombinieren vier kraftvolle Pilzextrakte für mentale Klarheit und Energie.',
    benefits: [
      { headline: 'Fokus & Konzentration', description: 'Lion\'s Mane ist bekannt dafür, die kognitive Funktion und den Fokus unterstützen zu können.' },
      { headline: 'Natürliche Energie', description: 'Cordyceps wird traditionell verwendet, um die natürliche Energie zu fördern.' },
      { headline: 'Immununterstützung', description: 'Maitake und Shiitake können das Immunsystem auf natürliche Weise unterstützen.' },
      { headline: 'Antioxidative Eigenschaften', description: 'Die enthaltenen Pilzextrakte besitzen natürliche antioxidative Eigenschaften.' },
    ],
    longDescription: [
      'Die Neuvie Mushroom Focus Strips bringen die Kraft traditioneller Vitalpilze in eine moderne, praktische Form. Unsere Formel vereint vier der bekanntesten Functional Mushrooms.',
      'Lion\'s Mane (Löwenmähne) wird seit Jahrhunderten in der traditionellen Medizin verwendet und ist bekannt für seine potenziell unterstützende Wirkung auf die kognitive Funktion. Cordyceps wird traditionell für seine energiefördernden Eigenschaften geschätzt.',
      'Ergänzt werden diese durch Maitake und Shiitake – zwei Pilze, die für ihre immununterstützenden und antioxidativen Eigenschaften bekannt sind. Zusammen bilden sie eine kraftvolle Kombination.',
      'Der leckere Schokoladengeschmack macht die tägliche Einnahme zum Genuss. Ideal für alle, die ihre mentale Performance auf natürliche Weise unterstützen möchten.',
    ],
    usage: '1 Strip täglich auf die Zunge legen und auflösen lassen. Kann morgens oder bei Bedarf eingenommen werden.',
    ingredients: ['Lion\'s Mane Extrakt (50 mg)', 'Maitake Extrakt (25 mg)', 'Cordyceps Extrakt (25 mg)', 'Shiitake Extrakt (20 mg)', 'Pullulan', 'Lecithin', 'Kakao-Aroma'],
    supplementFacts: [
      { nutrient: 'Lion\'s Mane Extrakt', amount: '50 mg' },
      { nutrient: 'Maitake Extrakt', amount: '25 mg' },
      { nutrient: 'Cordyceps Extrakt', amount: '25 mg' },
      { nutrient: 'Shiitake Extrakt', amount: '20 mg' },
    ],
    properties: ['Vegan', 'Glutenfrei', 'Non-GMO', 'Ohne künstliche Farbstoffe', 'Bio-Pilzextrakte'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Außerhalb der Reichweite von kleinen Kindern aufbewahren.',
  },

  // Libido Support Strips
  'libido': {
    handle: 'libido',
    seoTitle: 'Libido Support Strips Schokolade | Cordyceps + Shilajit | Neuvie',
    metaDescription: 'Neuvie Libido Support Strips mit Cordyceps, Shilajit & Austernpeptid. Unterstützt Vitalität, Ausdauer & sexuelles Wohlbefinden. Diskret & praktisch.',
    shortDescription: 'Natürliche Unterstützung für deine Vitalität. Die Libido Support Strips kombinieren traditionelle Inhaltsstoffe, die das sexuelle Wohlbefinden unterstützen können.',
    benefits: [
      { headline: 'Ausdauer & Energie', description: 'Cordyceps wird traditionell verwendet, um Ausdauer und körperliche Leistungsfähigkeit zu unterstützen.' },
      { headline: 'Sexuelles Wohlbefinden', description: 'Austernpeptid ist bekannt für seine unterstützende Wirkung auf das sexuelle Wohlbefinden.' },
      { headline: 'Mineralstoffversorgung', description: 'Shilajit ist reich an natürlichen Mineralien und Fulvinsäuren.' },
      { headline: 'Natürliche Vitalität', description: 'Die Kombination kann die natürliche Vitalität auf verschiedene Weise unterstützen.' },
    ],
    longDescription: [
      'Die Neuvie Libido Support Strips wurden entwickelt, um die natürliche Vitalität und das Wohlbefinden zu unterstützen. Unsere Formel kombiniert drei kraftvolle natürliche Inhaltsstoffe.',
      'Cordyceps Militaris ist ein Vitalpilz, der in der traditionellen Medizin für seine energiefördernden und ausdauersteigernden Eigenschaften geschätzt wird. Er kann dazu beitragen, die körperliche Leistungsfähigkeit zu unterstützen.',
      'Shilajit ist ein natürliches Harz aus dem Himalaya, reich an Mineralien und Fulvinsäuren. Es wird traditionell verwendet, um die allgemeine Vitalität zu fördern.',
      'Austernpeptid ergänzt die Formel mit natürlichen Aminosäuren und Spurenelementen. Der dezente Schokoladengeschmack sorgt für eine angenehme Einnahme.',
    ],
    usage: '1-2 Strips bei Bedarf auf die Zunge legen und auflösen lassen. Nicht mehr als 2 Strips pro Tag.',
    ingredients: ['Cordyceps Militaris Extrakt (50 mg)', 'Shilajit Extrakt (50 mg)', 'Austernpeptid (20 mg)', 'Pullulan', 'Lecithin', 'Kakao-Aroma'],
    supplementFacts: [
      { nutrient: 'Cordyceps Militaris Extrakt', amount: '50 mg' },
      { nutrient: 'Shilajit Extrakt', amount: '50 mg' },
      { nutrient: 'Austernpeptid', amount: '20 mg' },
    ],
    properties: ['Glutenfrei', 'Non-GMO', 'Ohne künstliche Farbstoffe', 'Diskrete Einnahme'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Außerhalb der Reichweite von kleinen Kindern aufbewahren. Nicht für Kinder und Jugendliche geeignet.',
  },

  // Probiotic + Metabolism Strips
  'probiotic': {
    handle: 'probiotic',
    seoTitle: 'Probiotic + Metabolism Strips | 10 Mrd. KBE | Neuvie',
    metaDescription: 'Neuvie Probiotic + Metabolism Strips mit 10 Mrd. KBE Bifidobacterium lactis, Polydextrose & Mönchsfrucht. Unterstützt Darmflora & Stoffwechsel.',
    shortDescription: 'Dein täglicher Begleiter für eine gesunde Darmflora. Mit 10 Milliarden koloniebildenden Einheiten und Präbiotika für eine optimale Synergie.',
    benefits: [
      { headline: '10 Milliarden KBE', description: 'Jeder Strip enthält 10 Milliarden koloniebildende Einheiten Bifidobacterium lactis.' },
      { headline: 'Probiotisch-präbiotische Synergie', description: 'Die Kombination aus Pro- und Präbiotika kann die Darmflora optimal unterstützen.' },
      { headline: 'Jederzeit einnehmbar', description: 'Die praktischen Strips können flexibel und ohne Wasser eingenommen werden.' },
      { headline: 'Leckerer Beerengeschmack', description: 'Der fruchtige Mixed Berry Geschmack macht die tägliche Einnahme angenehm.' },
    ],
    longDescription: [
      'Die Neuvie Probiotic + Metabolism Strips bieten eine innovative Möglichkeit, deine Darmgesundheit zu unterstützen. Mit 10 Milliarden KBE Bifidobacterium lactis pro Strip erhältst du eine effektive Dosis probiotischer Kulturen.',
      'Das Besondere an unserer Formel ist die Kombination aus Probiotika und Präbiotika. Polydextrose dient als Nahrung für die guten Darmbakterien und kann so deren Wirkung unterstützen.',
      'Bifidobacterium lactis ist einer der am besten erforschten probiotischen Stämme und kann zur Aufrechterhaltung einer gesunden Darmflora beitragen.',
      'Gesüßt mit natürlichem Mönchsfruchtextrakt – ohne Zucker und ohne künstliche Süßstoffe. Der Mixed Berry Geschmack macht die tägliche Einnahme zum Vergnügen.',
    ],
    usage: '1 Strip täglich auf die Zunge legen und auflösen lassen. Idealerweise morgens auf nüchternen Magen.',
    ingredients: ['Polydextrose (30 mg)', 'Bifidobacterium lactis (10 Mrd. KBE)', 'Mönchsfruchtextrakt', 'Pullulan', 'Lecithin', 'Natürliches Beerenaroma'],
    supplementFacts: [
      { nutrient: 'Bifidobacterium lactis', amount: '10 Mrd. KBE' },
      { nutrient: 'Polydextrose', amount: '30 mg' },
    ],
    properties: ['Vegan', 'Glutenfrei', 'Non-GMO', 'Zuckerfrei', 'Ohne künstliche Süßstoffe'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Außerhalb der Reichweite von kleinen Kindern aufbewahren. Kühl und trocken lagern.',
  },

  // Beauty + Collagen Strips
  'beauty': {
    handle: 'beauty',
    seoTitle: 'Beauty + Collagen Strips Mango | Kollagen + Vitamin E | Neuvie',
    metaDescription: 'Neuvie Beauty + Collagen Strips mit 100mg Kollagenpeptiden & Vitamin E. Unterstützt Hautelastizität, Haare & Nägel. Leckerer Mango-Geschmack.',
    shortDescription: 'Schönheit von innen. Die Beauty + Collagen Strips können Haut, Haare und Nägel mit wertvollen Kollagenpeptiden und Vitamin E unterstützen.',
    benefits: [
      { headline: 'Hautelastizität', description: 'Kollagenpeptide können dazu beitragen, die natürliche Elastizität der Haut zu unterstützen.' },
      { headline: 'Antioxidativer Schutz', description: 'Vitamin E trägt dazu bei, die Zellen vor oxidativem Stress zu schützen.' },
      { headline: 'Haare & Nägel', description: 'Die Formel kann das Wachstum gesunder Haare und Nägel unterstützen.' },
      { headline: 'Praktische Einnahme', description: 'Keine großen Kapseln oder Pulver – einfach auf der Zunge auflösen lassen.' },
    ],
    longDescription: [
      'Die Neuvie Beauty + Collagen Strips wurden entwickelt, um deine natürliche Schönheit von innen zu unterstützen. Mit 100 mg Kollagenpeptiden pro Strip erhältst du eine wertvolle Ergänzung für deine Beauty-Routine.',
      'Kollagen ist das häufigste Protein im menschlichen Körper und ein wichtiger Bestandteil von Haut, Haaren und Nägeln. Mit zunehmendem Alter nimmt die körpereigene Kollagenproduktion ab – hier können Kollagenpeptide unterstützend wirken.',
      'Vitamin E ergänzt die Formel mit seinen antioxidativen Eigenschaften. Es trägt dazu bei, die Zellen vor oxidativem Stress zu schützen.',
      'Der tropische Mango-Geschmack macht die tägliche Einnahme zum Genuss. Ideal als Ergänzung zu deiner täglichen Hautpflege-Routine.',
    ],
    usage: '1 Strip täglich auf die Zunge legen und auflösen lassen. Für optimale Ergebnisse regelmäßig über einen längeren Zeitraum einnehmen.',
    ingredients: ['Kollagenpeptide (100 mg)', 'Vitamin E (6 mg)', 'Pullulan', 'Lecithin', 'Mango-Aroma'],
    supplementFacts: [
      { nutrient: 'Kollagenpeptide', amount: '100 mg' },
      { nutrient: 'Vitamin E', amount: '6 mg (50% NRV*)' },
    ],
    properties: ['Glutenfrei', 'Non-GMO', 'Ohne künstliche Farbstoffe', 'Ohne Zuckerzusatz'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Außerhalb der Reichweite von kleinen Kindern aufbewahren. *NRV = Nährstoffbezugswerte',
  },

  // Hair, Skin & Nails Strips
  'hair': {
    handle: 'hair',
    seoTitle: 'Hair, Skin & Nails Strips Orange | Biotin 5000 mcg | Neuvie',
    metaDescription: 'Neuvie Hair, Skin & Nails Strips mit Biotin (5000 mcg), Folat & Vitamin D3. Unterstützt Haarwachstum, Hautgesundheit & starke Nägel.',
    shortDescription: 'Die Rundum-Versorgung für Haare, Haut und Nägel. Mit hochdosiertem Biotin und weiteren essentiellen Vitaminen für dein strahlendes Äußeres.',
    benefits: [
      { headline: 'Biotin für Haare', description: 'Biotin trägt zur Erhaltung normaler Haare bei.' },
      { headline: 'Zellgesundheit', description: 'Folat hat eine Funktion bei der Zellteilung und kann so die Hauterneuerung unterstützen.' },
      { headline: 'Vitamin D3', description: 'Vitamin D trägt zur Erhaltung normaler Haut bei.' },
      { headline: 'Starke Nägel', description: 'Die Kombination der Vitamine kann zur Festigkeit der Nägel beitragen.' },
    ],
    longDescription: [
      'Die Neuvie Hair, Skin & Nails Strips bieten eine umfassende Versorgung mit wichtigen Vitaminen für dein äußeres Erscheinungsbild. Mit 5000 mcg Biotin pro Strip erhältst du eine hochdosierte Unterstützung.',
      'Biotin, auch bekannt als Vitamin B7 oder Vitamin H, trägt zur Erhaltung normaler Haare und Haut bei. Es ist ein wasserlösliches Vitamin, das täglich zugeführt werden sollte.',
      'Folat (Vitamin B9) hat eine wichtige Funktion bei der Zellteilung und kann so die natürliche Hauterneuerung unterstützen. Vitamin D3 ergänzt die Formel und trägt zur Erhaltung normaler Haut bei.',
      'Der frische Orangengeschmack macht die tägliche Einnahme angenehm. Perfekt für alle, die ihre natürliche Schönheit von innen unterstützen möchten.',
    ],
    usage: '1 Strip täglich auf die Zunge legen und auflösen lassen. Für sichtbare Ergebnisse wird eine regelmäßige Einnahme über mindestens 8-12 Wochen empfohlen.',
    ingredients: ['Biotin (5000 mcg)', 'Vitamin B9 / Folat (400 mcg)', 'Vitamin D3 (200 mcg)', 'Pullulan', 'Lecithin', 'Orangen-Aroma'],
    supplementFacts: [
      { nutrient: 'Biotin', amount: '5000 mcg (10.000% NRV*)' },
      { nutrient: 'Folat (Vitamin B9)', amount: '400 mcg (200% NRV*)' },
      { nutrient: 'Vitamin D3', amount: '200 mcg' },
    ],
    properties: ['Vegan', 'Glutenfrei', 'Non-GMO', 'Laktosefrei', 'Ohne Zuckerzusatz'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Außerhalb der Reichweite von kleinen Kindern aufbewahren. *NRV = Nährstoffbezugswerte',
  },

  // Digestive + Gut Health Strips
  'digestive': {
    handle: 'digestive',
    seoTitle: 'Digestive + Gut Health Strips | Probiotika + Enzyme | Neuvie',
    metaDescription: 'Neuvie Digestive + Gut Health Strips mit Bacillus Coagulans (10 Mrd. KBE), Protease, Papain & Bromelain. Unterstützt Verdauung & Darmgesundheit.',
    shortDescription: 'Deine tägliche Unterstützung für eine gesunde Verdauung. Probiotische Kulturen und natürliche Enzyme arbeiten zusammen für dein Wohlbefinden.',
    benefits: [
      { headline: 'Darmflora-Balance', description: 'Bacillus Coagulans kann zur Aufrechterhaltung einer gesunden Darmflora beitragen.' },
      { headline: 'Verdauungsunterstützung', description: 'Natürliche Enzyme wie Protease, Papain und Bromelain können die Verdauung unterstützen.' },
      { headline: 'Nährstoffaufnahme', description: 'Eine gesunde Verdauung kann die Aufnahme von Nährstoffen optimieren.' },
      { headline: 'Wohlbefinden', description: 'Eine ausgeglichene Darmflora kann zum allgemeinen Wohlbefinden beitragen.' },
    ],
    longDescription: [
      'Die Neuvie Digestive + Gut Health Strips kombinieren probiotische Kulturen mit natürlichen Verdauungsenzymen für eine umfassende Unterstützung deines Verdauungssystems.',
      'Bacillus Coagulans ist ein sporenbildender Probiotikum-Stamm, der besonders resistent gegenüber Magensäure ist. Mit 10 Milliarden KBE pro Strip erhältst du eine effektive Menge dieser wertvollen Bakterien.',
      'Die Enzyme Protease, Papain und Bromelain können die Verdauung von Proteinen unterstützen. Papain stammt aus der Papaya, Bromelain aus der Ananas – beide werden traditionell für ihre verdauungsfördernden Eigenschaften geschätzt.',
      'Der fruchtige Mixed Berry Geschmack macht die tägliche Einnahme angenehm. Ideal nach den Mahlzeiten oder bei Verdauungsbeschwerden.',
    ],
    usage: '1 Strip nach einer Mahlzeit auf die Zunge legen und auflösen lassen. Bei Bedarf bis zu 2 Strips täglich.',
    ingredients: ['Bacillus Coagulans (10 Mrd. KBE)', 'Protease', 'Papain', 'Bromelain', 'Pullulan', 'Lecithin', 'Natürliches Beerenaroma'],
    supplementFacts: [
      { nutrient: 'Bacillus Coagulans', amount: '10 Mrd. KBE' },
      { nutrient: 'Protease', amount: '*' },
      { nutrient: 'Papain', amount: '*' },
      { nutrient: 'Bromelain', amount: '*' },
    ],
    properties: ['Vegan', 'Glutenfrei', 'Non-GMO', 'Laktosefrei', 'Ohne künstliche Farbstoffe'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Außerhalb der Reichweite von kleinen Kindern aufbewahren.',
  },

  // Appetite Balance & Weight Support Strips
  'appetite': {
    handle: 'appetite',
    seoTitle: 'Appetite Balance & Weight Support Strips | Chrom + Safran | Neuvie',
    metaDescription: 'Neuvie Appetite Balance Strips mit Chrom (75 mcg), Molybdän (100 mcg) & Safran. Unterstützt normalen Blutzuckerspiegel & Appetitbalance.',
    shortDescription: 'Natürliche Unterstützung für ein ausgewogenes Essverhalten. Mit Chrom, das zur Aufrechterhaltung eines normalen Blutzuckerspiegels beiträgt.',
    benefits: [
      { headline: 'Blutzuckerbalance', description: 'Chrom trägt zur Aufrechterhaltung eines normalen Blutzuckerspiegels bei.' },
      { headline: 'Stoffwechselunterstützung', description: 'Molybdän trägt zu einem normalen Stoffwechsel von schwefelhaltigen Aminosäuren bei.' },
      { headline: 'Natürliche Balance', description: 'Safranextrakt wird traditionell verwendet, um das emotionale Wohlbefinden zu unterstützen.' },
      { headline: 'Heißhunger-Management', description: 'Die Formel kann dabei helfen, Heißhungerattacken natürlich zu regulieren.' },
    ],
    longDescription: [
      'Die Neuvie Appetite Balance & Weight Support Strips wurden entwickelt, um ein gesundes Essverhalten auf natürliche Weise zu unterstützen. Die einzigartige Formel kombiniert Spurenelemente mit wertvollem Safranextrakt.',
      'Chrom ist ein essentielles Spurenelement, das zur Aufrechterhaltung eines normalen Blutzuckerspiegels beiträgt. Ein stabiler Blutzuckerspiegel kann helfen, Heißhungerattacken zu reduzieren.',
      'Molybdän ist ebenfalls ein essentielles Spurenelement und trägt zu einem normalen Stoffwechsel bei. Safran wird seit Jahrhunderten in der traditionellen Medizin verwendet und kann das emotionale Wohlbefinden unterstützen.',
      'Der fruchtige Mixed Berry Geschmack macht die Einnahme angenehm. Ideal als Teil eines ganzheitlichen Ansatzes für ein gesundes Gewichtsmanagement.',
    ],
    usage: '1 Strip vor einer Mahlzeit auf die Zunge legen und auflösen lassen. Bis zu 2 Strips täglich.',
    ingredients: ['Chrom (75 mcg)', 'Molybdän (100 mcg)', 'Safranextrakt (10 mg)', 'Pullulan', 'Lecithin', 'Natürliches Beerenaroma'],
    supplementFacts: [
      { nutrient: 'Chrom', amount: '75 mcg (188% NRV*)' },
      { nutrient: 'Molybdän', amount: '100 mcg (200% NRV*)' },
      { nutrient: 'Safranextrakt', amount: '10 mg' },
    ],
    properties: ['Vegan', 'Glutenfrei', 'Non-GMO', 'Zuckerfrei', 'Ohne künstliche Süßstoffe'],
    disclaimer: 'Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Die empfohlene tägliche Verzehrmenge nicht überschreiten. Außerhalb der Reichweite von kleinen Kindern aufbewahren. *NRV = Nährstoffbezugswerte. Dieses Produkt ist nicht als Ersatz für eine kalorienreduzierte Ernährung gedacht.',
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
  
  return null;
};
