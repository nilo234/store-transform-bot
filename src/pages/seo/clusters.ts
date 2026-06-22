import type { SeoSection } from '@/components/seo';

export interface SeoCluster {
  slug: string;
  title: string;
  description: string;
  h1: string;
  lede: string;
  sections: SeoSection[];
  quickAnswer?: string;
  topic?: string;
  extraFaqs?: { q: string; a: string }[];
}

export const SEO_CLUSTERS: SeoCluster[] = [
  {
    slug: 'natural-sleep-aid-without-melatonin',
    title: 'Natural Sleep Aid Without Melatonin | Calm, Deep Rest | Neuvie',
    description: 'A gentle, non-melatonin sleep formula in a strip that dissolves in about 30 seconds. No grogginess, no dependency, made in the USA.',
    h1: 'Natural Sleep Aid Without Melatonin',
    lede: 'A non-hormonal way to wind down at night — using magnesium, L-theanine, and calming botanicals instead of melatonin.',
    sections: [
      {
        h2: 'A Non-Melatonin Way to Fall Asleep',
        intro: 'Melatonin works for some people and backfires for others — vivid dreams, morning grogginess, or a feeling that it just stops working. A non-hormonal sleep aid skips melatonin and instead helps your nervous system relax on its own.',
        benefits: ['No hormones, no morning grogginess', 'Calms a racing mind in minutes', 'Pocket-sized strip — no water, no big pill to swallow'],
        how: 'Magnesium glycinate, L-theanine, and botanicals like chamomile and lemon balm support GABA activity in the brain. That is the same calming pathway your body uses naturally when it is time to sleep.',
        bridge: 'Neuvie Sleep Strips are designed for this exact moment — pull one out, place it on your tongue, and let your body slow down on its own.',
        faq: { q: 'What can I take instead of melatonin to sleep?', a: 'Magnesium glycinate, L-theanine, chamomile, and lemon balm are gentle, non-hormonal options that support relaxation without affecting your circadian rhythm.' },
      },
      {
        h2: 'Sleep Support That Will Not Leave You Groggy',
        intro: 'Many sleep aids knock you out at night and weigh you down in the morning. A well-formulated non-melatonin strip is meant to leave you clear-headed at sunrise.',
        benefits: ['Wake up clear, not foggy', 'Friendly for nightly use', 'No habit-forming ingredients'],
        how: 'Instead of sedating you, the formula nudges your body into its natural wind-down mode. By the time you wake up, the active ingredients are already metabolized.',
        bridge: 'One Neuvie Sleep Strip about 20 minutes before bed fits into the routine you already have — brush teeth, set alarm, strip on tongue, lights out.',
        faq: { q: 'Is non-melatonin sleep support safe every night?', a: 'Ingredients like magnesium, L-theanine, and chamomile are well tolerated for nightly use at standard serving sizes. Always follow the label.' },
      },
    ],
  },
  {
    slug: 'melatonin-strips',
    title: 'Melatonin Strips That Dissolve in Seconds | Neuvie',
    description: 'Fast-dissolving melatonin strips for travel, jet lag, and restless nights. No water, no pills, made in the USA.',
    h1: 'Melatonin Strips',
    lede: 'A precise dose of melatonin in a thin strip that dissolves on your tongue in about 30 seconds.',
    sections: [
      {
        h2: 'Why Strips Beat Melatonin Pills and Gummies',
        intro: 'Pills can sit in your stomach for an hour. Gummies are loaded with sugar. A dissolvable strip starts absorbing the moment it hits your tongue, with no extra sweeteners or fillers.',
        benefits: ['Starts dissolving in about 30 seconds', 'Sugar-free format', 'Perfect for travel and red-eye flights'],
        how: 'Oral dissolvable strips deliver melatonin through the soft tissue of the mouth, which can support faster onset compared with capsules that have to be broken down in the stomach.',
        bridge: 'Neuvie Sleep Strips are easy to slip into a passport sleeve or pocket — exactly where you want them on a long travel day.',
        faq: { q: 'Are melatonin strips better than melatonin pills?', a: 'Many people prefer strips because they dissolve quickly, are easy to carry, and contain no sugar — unlike many gummies.' },
      },
    ],
  },
  {
    slug: 'hangover-prevention-supplements',
    title: 'Hangover Prevention Supplements | Before-You-Drink Strips | Neuvie',
    description: 'A pocket-sized strip to take before drinks — supports hydration, liver, and morning-after recovery. Made in the USA.',
    h1: 'Hangover Prevention Supplements',
    lede: 'The best hangover strategy is the one you start before the first drink — with nutrients that support hydration and your liver.',
    sections: [
      {
        h2: 'What to Take Before You Drink',
        intro: 'Once a hangover starts, you are already playing catch-up. Taking the right nutrients before and during a night out gives your body what it needs to process alcohol more smoothly.',
        benefits: ['Supports hydration and electrolyte balance', 'B-vitamins and DHM for next-day clarity', 'Fits in a clutch, a wallet, or a back pocket'],
        how: 'Ingredients like DHM (dihydromyricetin), milk thistle, and B-vitamins support the liver pathways that break down alcohol byproducts — the same byproducts that cause many hangover symptoms.',
        bridge: 'Neuvie Hangover Strips are made for the moment right before the first round. One strip, no water, no awkward shot of brown liquid.',
        faq: { q: 'When should I take a hangover prevention supplement?', a: 'Most people get the best results taking it shortly before drinking and again before bed, paired with plenty of water.' },
      },
    ],
  },
  {
    slug: 'best-supplements-for-gut-health',
    title: 'Best Supplements for Gut Health | Bloating & Digestion | Neuvie',
    description: 'Daily gut health support in a 30-second strip. Probiotics, enzymes, and prebiotics for digestion and less bloating.',
    h1: 'Best Supplements for Gut Health',
    lede: 'A daily, dissolvable strip that brings together probiotics, prebiotics, and digestive enzymes for steadier digestion.',
    sections: [
      {
        h2: 'Less Bloating, More Comfort',
        intro: 'Gut issues rarely come from one cause. The most useful daily formulas combine probiotics, prebiotics that feed them, and enzymes that help you actually break down food.',
        benefits: ['Targets bloating after meals', 'Supports a balanced microbiome', 'No big pills, no chalky powders'],
        how: 'Probiotic strains add helpful bacteria. Prebiotics feed those bacteria. Enzymes like amylase and lipase support the breakdown of carbs and fats — together they give the gut a more complete daily routine.',
        bridge: 'Neuvie Digestive Strips bundle these into a single 30-second ritual you can take with or without food.',
        faq: { q: 'What is the best daily supplement for bloating?', a: 'Look for a formula that combines a multi-strain probiotic with digestive enzymes and a prebiotic fiber — that combination addresses bloating from multiple angles.' },
      },
    ],
  },
  {
    slug: 'collagen-strips-for-skin',
    title: 'Collagen Strips for Skin, Hair & Nails | Neuvie',
    description: 'Daily collagen support without the giant scoop. A strip that dissolves in seconds — sugar-free, made in the USA.',
    h1: 'Collagen Strips for Skin, Hair & Nails',
    lede: 'Collagen support in a tiny strip — no scoop, no shake, no clumpy powder in your coffee.',
    sections: [
      {
        h2: 'Collagen Without the Powder',
        intro: 'Most collagen comes as a big scoop of powder you are supposed to remember every morning. A dissolvable strip simplifies the whole routine.',
        benefits: ['Supports skin elasticity, hair, and nails', 'Sugar-free, no flavored mix-ins required', 'Easy to take while traveling'],
        how: 'Hydrolyzed collagen peptides give your body building blocks it uses to maintain skin, hair, and connective tissue. Pairing with vitamin C supports the way your body actually puts those peptides to work.',
        bridge: 'Neuvie Beauty Collagen Strips fit into the smallest morning routine — one strip, water optional.',
        faq: { q: 'Do collagen strips work as well as collagen powder?', a: 'For daily maintenance, dissolvable formats work well when taken consistently. Consistency is the real driver of visible results.' },
      },
    ],
  },
  {
    slug: 'biotin-strips-for-hair-growth',
    title: 'Biotin Strips for Hair Growth | Neuvie',
    description: 'Biotin and key hair nutrients in a fast-dissolving strip. No giant capsules, no breakouts from gummy sugar.',
    h1: 'Biotin Strips for Hair Growth',
    lede: 'Daily hair, skin, and nail support in a strip — no horse pills, no sugary gummies.',
    sections: [
      {
        h2: 'A Smarter Format for Hair Vitamins',
        intro: 'Hair routines work when you stick with them. A dissolvable strip removes the friction of swallowing a giant capsule or chewing through sweet gummies.',
        benefits: ['Biotin plus complementary nutrients', 'No added sugar', 'Pocket-sized and travel-friendly'],
        how: 'Biotin supports keratin production, the protein that makes up hair and nails. Pairing it with zinc and a B-complex covers more of the nutrients hair growth actually relies on.',
        bridge: 'Neuvie Hair, Skin and Nails Strips bring those nutrients into one daily 30-second ritual.',
        faq: { q: 'How long until biotin shows results?', a: 'Most people notice changes after 8 to 12 weeks of consistent daily use. Hair grows slowly, so patience matters.' },
      },
    ],
  },
  {
    slug: 'iron-supplements-without-constipation',
    title: 'Iron Supplements Without Constipation | Gentle Iron Strips | Neuvie',
    description: 'A gentle, easy-to-take iron strip that supports energy without the stomach discomfort of harsh iron pills.',
    h1: 'Iron Supplements Without Constipation',
    lede: 'An easier, gentler iron format — no metallic aftertaste, no harsh stomach side effects.',
    sections: [
      {
        h2: 'Iron That Is Easy on Your Stomach',
        intro: 'Traditional iron pills can be rough — constipation, nausea, and that metallic taste. A dissolvable strip with a gentler form of iron is much friendlier for daily use.',
        benefits: ['Designed to be gentle on the stomach', 'No giant pill to swallow', 'Supports energy and oxygen transport'],
        how: 'Iron is essential for hemoglobin, which carries oxygen through your blood. Lower-dose, well-tolerated forms of iron can support healthy levels without the harsh GI effects of high-dose ferrous sulfate.',
        bridge: 'Neuvie Iron Strips are made for people who want the benefits of iron without dreading their daily dose.',
        faq: { q: 'What is the gentlest form of iron supplement?', a: 'Low-dose, slow-release, or chelated iron formats are generally easier on digestion than standard ferrous sulfate.' },
      },
    ],
  },
  {
    slug: 'natural-libido-boosters',
    title: 'Natural Libido Boosters | Daily Strips for Drive | Neuvie',
    description: 'A daily strip that supports natural libido, energy, and circulation — for him and her. Made in the USA.',
    h1: 'Natural Libido Boosters',
    lede: 'Daily support for desire, energy, and confidence — without prescriptions or stimulants.',
    sections: [
      {
        h2: 'Support Drive From the Inside Out',
        intro: 'Libido is tied to sleep, stress, circulation, and hormones. A daily blend of adaptogens and circulation-friendly botanicals supports the foundations.',
        benefits: ['Adaptogens for stress and balance', 'Supports healthy circulation', 'Discreet, pocket-sized format'],
        how: 'Botanicals like maca, tribulus, and ginseng have a long history of use for vitality. Supporting circulation and stress response builds a base that desire can grow from.',
        bridge: 'Neuvie Libido Support Strips are designed for steady, daily use — not a single spike.',
        faq: { q: 'Do natural libido supplements really work?', a: 'They work best as part of a routine that also covers sleep and stress. Consistency over weeks tends to matter more than any single dose.' },
      },
    ],
  },
  {
    slug: 'focus-supplements-without-adderall',
    title: 'Focus Supplements Without Adderall | Clean Cognitive Strips | Neuvie',
    description: 'Stimulant-light focus support with mushrooms, L-theanine, and B-vitamins. No prescriptions, no jitters.',
    h1: 'Focus Supplements Without Adderall',
    lede: 'Sharper focus from natural nootropics, not prescriptions or megadoses of caffeine.',
    sections: [
      {
        h2: 'A Cleaner Way to Lock In',
        intro: 'You do not need a prescription to focus better at work. A blend of nootropic mushrooms, L-theanine, and B-vitamins supports calm concentration without the wired feeling.',
        benefits: ['Calm focus, not jittery focus', 'Supports memory and clarity', 'Easy to use before deep work'],
        how: 'Lion\'s mane is studied for its support of cognitive function. L-theanine balances stimulation so you can focus without anxiety. B-vitamins keep your brain\'s energy systems supplied.',
        bridge: 'Neuvie Mushroom Focus Strips give you the option of a clean, daily focus boost — without the prescription paperwork.',
        faq: { q: 'Are there real alternatives to Adderall for focus?', a: 'Nootropic blends with lion\'s mane, L-theanine, and B-vitamins can support concentration, especially when combined with sleep and a consistent routine.' },
      },
    ],
  },
  {
    slug: 'nootropic-strips',
    title: 'Nootropic Strips for Memory & Focus | Neuvie',
    description: 'Nootropic strips with lion\'s mane, L-theanine, and B-vitamins. Clean focus that dissolves in 30 seconds.',
    h1: 'Nootropic Strips',
    lede: 'A pocket-sized way to support memory, mood, and focus — built for busy days.',
    sections: [
      {
        h2: 'Daily Nootropics in a Strip',
        intro: 'Nootropics are most useful when you take them every day. A strip format removes the excuses — no water, no pills, no scoops.',
        benefits: ['Supports memory and processing speed', 'Caffeine-free option for sensitive users', 'Travel-friendly format'],
        how: 'Studied nootropics like lion\'s mane support BDNF, a protein involved in learning and memory. L-theanine smooths out the experience so the boost feels calm, not pushy.',
        bridge: 'Neuvie Mushroom Focus Strips bring nootropics into the same effortless 30-second ritual as the rest of the line.',
        faq: { q: 'What is the most effective nootropic for memory?', a: 'Lion\'s mane is one of the most well-studied natural nootropics for cognitive support and is a common base ingredient in modern formulas.' },
      },
    ],
  },
  {
    slug: 'magnesium-for-sleep-and-anxiety',
    title: 'Magnesium for Sleep & Anxiety | Daily Calm Strip | Neuvie',
    description: 'A daily strip with magnesium and calming botanicals — supports relaxation, sleep, and a steadier mood.',
    h1: 'Magnesium for Sleep and Anxiety',
    lede: 'Magnesium is one of the most underrated nutrients for calm and rest. Here is how to actually take it consistently.',
    sections: [
      {
        h2: 'Why Magnesium Matters for Calm',
        intro: 'Magnesium plays a role in hundreds of processes — including the ones that keep your nervous system steady. Many people simply do not get enough from diet alone.',
        benefits: ['Supports relaxation and sleep quality', 'Helps ease everyday stress', 'No giant capsules'],
        how: 'Forms like magnesium glycinate are absorbed well and easier on the stomach than magnesium oxide. Pairing with L-theanine or chamomile rounds out the calming effect.',
        bridge: 'Neuvie Cognitive Relax Strips and Sleep Strips both feature magnesium-led blends designed for nightly use.',
        faq: { q: 'When should I take magnesium for sleep?', a: 'Most people take magnesium 30 to 60 minutes before bed for the most noticeable effect on relaxation and sleep quality.' },
      },
    ],
  },
  {
    slug: 'probiotic-strips-for-bloating',
    title: 'Probiotic Strips for Bloating | Neuvie',
    description: 'A multi-strain probiotic in a dissolvable strip. No refrigeration drama, no giant pills, just a daily 30-second ritual.',
    h1: 'Probiotic Strips for Bloating',
    lede: 'A daily probiotic strip designed for people who want less bloating and a simpler routine.',
    sections: [
      {
        h2: 'A Probiotic You Will Actually Take Every Day',
        intro: 'The best probiotic is the one you remember. A dissolvable strip removes the friction of pills and refrigerated capsules.',
        benefits: ['Multi-strain support for a balanced gut', 'Easy daily ritual', 'No refrigeration required for the strip format'],
        how: 'Probiotic strains support a balanced microbiome, which is closely tied to digestion, bloating, and how comfortable you feel after meals.',
        bridge: 'Neuvie Probiotic Metabolism Strips bring those benefits into one simple morning step.',
        faq: { q: 'How long does it take a probiotic to reduce bloating?', a: 'Many people notice changes within 2 to 4 weeks of daily use. Consistency is more important than a single high dose.' },
      },
    ],
  },
  {
    slug: 'immune-support-supplements',
    title: 'Daily Immune Support Supplements | Neuvie',
    description: 'Daily immune support with vitamin C, zinc, and elderberry in a fast-dissolving strip.',
    h1: 'Daily Immune Support Supplements',
    lede: 'A daily strip that keeps your immune basics covered — without juggling three different bottles.',
    sections: [
      {
        h2: 'Cover the Basics Every Day',
        intro: 'Strong immune support is not about megadosing during a cold. It is about covering vitamin C, zinc, and key botanicals every single day.',
        benefits: ['Vitamin C, zinc, and elderberry in one strip', 'No water required', 'Easy to take while traveling'],
        how: 'Vitamin C and zinc are central to normal immune function. Elderberry adds plant compounds traditionally used to support seasonal wellness.',
        bridge: 'Many Neuvie strips include immune-friendly nutrients as part of broader daily formulas.',
        faq: { q: 'What is the best daily supplement for immune support?', a: 'A simple combination of vitamin C, zinc, and vitamin D covers the basics. Add elderberry during seasonal changes.' },
      },
    ],
  },
  {
    slug: 'methylene-blue-drops-benefits',
    title: 'Methylene Blue Drops: Benefits & How to Use | Neuvie',
    description: 'A clean, US-made methylene blue drop. Learn what it is, how it is used, and how to take it daily.',
    h1: 'Methylene Blue Drops',
    lede: 'A precise, pharmaceutical-grade drop format for people exploring methylene blue as part of a wellness routine.',
    sections: [
      {
        h2: 'A Modern Look at a Classic Compound',
        intro: 'Methylene blue has a long scientific history. Today it is being explored for its role in cellular energy and oxidative balance.',
        benefits: ['Drop format for precise serving control', 'Easy to add to a daily routine', 'Made in an FDA-registered US facility'],
        how: 'Methylene blue is studied for its interaction with mitochondrial energy production. As with any new addition, start low, follow the label, and consult your provider if you take medication.',
        bridge: 'Neuvie Methylene Blue Drops are built around clean sourcing and clear labeling for people new to the category.',
        faq: { q: 'How do you take methylene blue drops?', a: 'Place the labeled serving under the tongue or in a glass of water, once per day. Always follow product instructions and consult your healthcare provider.' },
      },
    ],
  },
  {
    slug: 'blood-sugar-support-supplements',
    title: 'Blood Sugar Support Supplements | Daily Drops | Neuvie',
    description: 'Daily blood sugar support with botanicals like berberine and cinnamon, in a precise drop format.',
    h1: 'Blood Sugar Support Supplements',
    lede: 'A daily, drop-based way to support healthy blood sugar already within a normal range.',
    sections: [
      {
        h2: 'Daily Support for Steady Energy',
        intro: 'Blood sugar swings show up as cravings, energy dips, and afternoon crashes. The right botanicals can help support more even levels day to day.',
        benefits: ['Botanicals studied for healthy glucose metabolism', 'Drop format for precise serving', 'Designed for daily use'],
        how: 'Ingredients like berberine, cinnamon, and chromium have research behind their role in glucose metabolism within a normal range.',
        bridge: 'Neuvie Normal Blood Sugar Drops are built for people who want a simple, consistent daily addition.',
        faq: { q: 'Do natural supplements help blood sugar?', a: 'Botanicals like berberine, cinnamon, and chromium are studied for support of glucose metabolism. They are most effective alongside diet and movement.' },
      },
    ],
  },
  {
    slug: 'weight-loss-drops-natural',
    title: 'Natural Weight Loss Drops | Appetite & Metabolism | Neuvie',
    description: 'Drops that support appetite balance and metabolism — no stimulants, no prescriptions, made in the USA.',
    h1: 'Natural Weight Loss Drops',
    lede: 'A clean drop format that supports appetite balance and metabolism as part of a healthy routine.',
    sections: [
      {
        h2: 'Support That Works With Your Routine',
        intro: 'No supplement replaces real food and movement. The right botanicals can support appetite balance and energy so the rest of your routine is easier to stick with.',
        benefits: ['Supports appetite balance', 'Supports daily energy and metabolism', 'No stimulants, no prescriptions'],
        how: 'Plant-based extracts can support satiety signaling and metabolic activity — useful when paired with a steady eating pattern.',
        bridge: 'Neuvie Diet Drops Ultra are designed to fit into the morning routine you already have.',
        faq: { q: 'Do weight loss drops actually work?', a: 'They support — not replace — diet and movement. Best results come from using them consistently alongside a healthy eating pattern.' },
      },
    ],
  },
  {
    slug: 'lung-cleanse-supplements',
    title: 'Lung Cleanse Supplements & Respiratory Drops | Neuvie',
    description: 'Daily respiratory support with botanicals like mullein and quercetin. A drop format that fits any routine.',
    h1: 'Lung Cleanse Supplements',
    lede: 'A daily drop for people who want gentle, consistent respiratory support from time-tested botanicals.',
    sections: [
      {
        h2: 'Everyday Respiratory Support',
        intro: 'Air quality changes. Seasons shift. A simple daily routine that supports your respiratory system can be worth more than any one-off cleanse.',
        benefits: ['Mullein, quercetin, and supporting botanicals', 'Drop format for easy daily use', 'No smoke, no harsh detoxes'],
        how: 'Botanicals like mullein have a long history of traditional use for the respiratory system. Quercetin adds antioxidant support to the routine.',
        bridge: 'Neuvie Respiratory and Lung Health Drops bring these into one consistent daily ritual.',
        faq: { q: 'Do lung cleanse supplements really work?', a: 'They are best thought of as daily support, not a quick fix. Combined with hydration and avoiding irritants, they can be a meaningful part of a routine.' },
      },
    ],
  },
  {
    slug: 'vitamin-strips-vs-pills',
    title: 'Vitamin Strips vs Pills: Which Is Better? | Neuvie',
    description: 'How dissolvable vitamin strips compare to capsules and gummies on absorption, convenience, and daily use.',
    h1: 'Vitamin Strips vs Pills',
    lede: 'A clear comparison of dissolvable strips, capsules, and gummies — and why format actually matters.',
    sections: [
      {
        h2: 'Format Changes How You Take Vitamins',
        intro: 'The best supplement is the one you actually take. Format quietly drives adherence — and adherence drives results.',
        benefits: ['Strips dissolve in about 30 seconds', 'No water and no horse pills', 'Easier to carry than a bottle of capsules'],
        how: 'Dissolvable strips deliver nutrients through the mouth tissue and stomach. Gummies are easy but often loaded with sugar. Capsules work but require water and can be hard to swallow.',
        bridge: 'Every Neuvie product was built as a strip or drop for one simple reason: people stick with formats that fit their day.',
        faq: { q: 'Are vitamin strips better than pills?', a: 'They are better for people who struggle with swallowing pills, want a sugar-free alternative to gummies, or need a portable option.' },
      },
    ],
  },
  {
    slug: 'best-supplements-for-women-over-30',
    title: 'Best Supplements for Women Over 30 | Neuvie',
    description: 'The daily essentials that actually matter in your 30s — collagen, iron, magnesium, and gut support, all in strip format.',
    h1: 'Best Supplements for Women Over 30',
    lede: 'A practical list of daily essentials for women in their 30s — built around format, consistency, and what your body actually needs.',
    sections: [
      {
        h2: 'The Daily Essentials',
        intro: 'In your 30s, the basics matter more than ever — and stacking three bottles never lasts. A strip-based routine is easier to keep.',
        benefits: ['Collagen for skin, hair, and nails', 'Iron for energy and oxygen transport', 'Magnesium for sleep and stress'],
        how: 'A simple routine — collagen, iron, magnesium, plus a gut support — covers a lot of the gaps that show up in your 30s without overwhelming you.',
        bridge: 'Many women build a small Neuvie stack with Beauty Collagen, Iron, and Sleep Strips for exactly this reason.',
        faq: { q: 'What supplements should a woman in her 30s take daily?', a: 'A practical starter stack is collagen, iron (if levels run low), magnesium, and a probiotic — adjusted with help from your provider based on bloodwork.' },
      },
    ],
  },
  {
    slug: 'travel-supplements-no-water',
    title: 'Travel Supplements You Can Take Without Water | Neuvie',
    description: 'No-water vitamin strips and drops for flights, road trips, and hotel mornings. Pocket-sized and TSA-friendly.',
    h1: 'Travel Supplements You Can Take Without Water',
    lede: 'A travel-friendly routine in formats designed for airports, road trips, and hotel rooms — no water required.',
    sections: [
      {
        h2: 'Built for the Way You Travel',
        intro: 'Pills need water. Powders need a shaker. Strips and drops do not. That is a real difference at 30,000 feet.',
        benefits: ['Take strips with no water', 'Pocket-sized and lightweight', 'TSA-friendly format'],
        how: 'Dissolvable strips and drops are designed for fast onset and zero prep. Slip them into a passport sleeve or carry-on for the whole trip.',
        bridge: 'A small Neuvie travel stack — Energy, Sleep, Hangover, and Immune — covers most of the things travel throws at you.',
        faq: { q: 'What supplements are best for travel?', a: 'Look for no-water formats: dissolvable strips and oral drops. They are easier to take in transit and through long airport days.' },
      },
    ],
  },
];
