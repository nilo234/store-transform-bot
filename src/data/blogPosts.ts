export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: string;
  content: { heading?: string; paragraphs: string[] }[];
  cta: { label: string; href: string };
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'best-vitamin-strips-for-hangover',
    title: 'Best Vitamin Strips for Hangover Recovery (2025 Guide)',
    excerpt:
      'A no-nonsense guide to what actually works for hangovers — and why dissolving vitamin strips outperform pills the morning after.',
    metaDescription:
      'Discover the best vitamin strips for hangover recovery in 2025. Fast-dissolving B-complex, electrolytes, and antioxidants — no water, no nausea.',
    category: 'Recovery',
    readTime: '5 min read',
    publishedAt: '2025-04-08',
    author: 'NEUVIE Team',
    content: [
      {
        paragraphs: [
          "If you've ever tried to swallow a multivitamin the morning after a night out, you know the feeling: nausea, gag reflex, and the pill that just won't go down. There's a better way.",
          "Dissolving vitamin strips are quietly becoming the go-to recovery hack for people who don't want to choke down capsules with water they can barely keep down. Here's why — and what to look for.",
        ],
      },
      {
        heading: 'Why hangovers happen (the short version)',
        paragraphs: [
          'Alcohol depletes B vitamins (especially B1, B6, and B12), drains electrolytes, dehydrates you, and floods your system with acetaldehyde — the toxic byproduct your liver is scrambling to break down.',
          "That's the science. The feeling is: pounding head, queasy stomach, low energy, brain fog. The fix isn't more coffee — it's replacing what alcohol stripped out.",
        ],
      },
      {
        heading: 'What to look for in a recovery strip',
        paragraphs: [
          '1. **B-Complex (especially B1, B6, B12).** Replaces what alcohol depleted and supports liver function.',
          '2. **Electrolytes (sodium, potassium, magnesium).** Rehydrates you faster than water alone.',
          '3. **Antioxidants (Vitamin C, NAC, glutathione).** Help your liver process leftover toxins.',
          '4. **Fast absorption.** Dissolving strips bypass the gut and absorb sublingually — meaning relief in minutes, not hours.',
        ],
      },
      {
        heading: 'Why strips beat pills for hangovers',
        paragraphs: [
          "When you're nauseous, your stomach is the last place you want to send anything. Sublingual absorption — through the tissue under your tongue — bypasses the digestive tract entirely.",
          "That means: no gag reflex, no water needed, and noticeable relief in 10–15 minutes instead of 45+. It's the same reason emergency teams use sublingual delivery for fast-acting meds.",
        ],
      },
      {
        heading: 'Our pick: NEUVIE Hangover Strips',
        paragraphs: [
          "We built NEUVIE Hangover Strips with exactly the stack above — high-dose B-complex, electrolytes, and antioxidants — in a single 30-second strip. Take one before bed and one when you wake up. That's the routine.",
          "30 strips, $29.99. Free shipping over $50. 30-day money-back guarantee — if it doesn't help, you don't pay.",
        ],
      },
    ],
    cta: {
      label: 'Shop Hangover Strips',
      href: '/product/hangover-strips-2',
    },
  },
  {
    slug: 'how-long-does-melatonin-take-to-work',
    title: 'How Long Does Melatonin Take to Work? (And Why Most People Get It Wrong)',
    excerpt:
      "The honest answer about melatonin timing, dosage, and why dissolving strips kick in faster than the pill version you've been taking.",
    metaDescription:
      'How long does melatonin take to work? Pills take 30–60 min. Dissolving strips work in 10–15. Full timing, dosage, and absorption guide.',
    category: 'Sleep',
    readTime: '4 min read',
    publishedAt: '2025-04-05',
    author: 'NEUVIE Team',
    content: [
      {
        paragraphs: [
          "Short answer: melatonin pills take **30 to 60 minutes** to kick in. Dissolving strips work in **10 to 15 minutes** because they absorb under the tongue, bypassing your digestive system entirely.",
          "But there's more to it than timing. Most people take the wrong dose at the wrong time and wonder why they're still wide awake at 2 AM.",
        ],
      },
      {
        heading: 'How melatonin actually works',
        paragraphs: [
          "Melatonin isn't a sedative — it's a signal. Your body produces it naturally as it gets dark, telling your brain: it's sleep time. Supplemental melatonin reinforces that signal, especially when your natural rhythm is off (jet lag, late-night screens, shift work).",
          "That means timing matters more than dosage. Take it 30 minutes before you want to sleep — not when you're already in bed staring at the ceiling.",
        ],
      },
      {
        heading: 'The dosage myth',
        paragraphs: [
          "More isn't better. Studies consistently show that **0.3 to 1 mg** is more effective than the 5–10 mg doses sold in most stores. High doses can leave you groggy in the morning and disrupt your natural production over time.",
          'NEUVIE Sleep Strips use a balanced 1 mg melatonin dose paired with L-Theanine and Magnesium — designed to help you fall asleep without the morning hangover.',
        ],
      },
      {
        heading: 'Why dissolving strips win for sleep',
        paragraphs: [
          "Pills have to dissolve in your stomach, get absorbed through your gut wall, and travel through your liver before reaching your bloodstream. That's a 30–60 minute delay — sometimes longer if you ate dinner late.",
          'Sublingual strips skip all of that. Place on tongue, dissolve in 30 seconds, absorbed in minutes. By the time your head hits the pillow, melatonin is already doing its job.',
        ],
      },
    ],
    cta: {
      label: 'Try NEUVIE Sleep Strips',
      href: '/product/sleep-strips',
    },
  },
  {
    slug: 'glutathione-vs-vitamin-c-for-skin',
    title: 'Glutathione vs Vitamin C for Skin: Which Actually Works?',
    excerpt:
      "Both are antioxidant superstars. But for glow, brightness, and anti-aging — which one deserves your daily routine? We break it down.",
    metaDescription:
      'Glutathione vs Vitamin C for skin: a no-fluff comparison of benefits, absorption, and the smart way to combine both for glow.',
    category: 'Beauty',
    readTime: '6 min read',
    publishedAt: '2025-04-02',
    author: 'NEUVIE Team',
    content: [
      {
        paragraphs: [
          "If you've spent any time on skincare TikTok, you've seen the hype: glutathione for glow, vitamin C for brightness, and a thousand creators swearing by one or the other.",
          "Here's the truth: they do different things, they work better together, and how you take them matters more than which brand you pick.",
        ],
      },
      {
        heading: "What vitamin C does for skin",
        paragraphs: [
          "Vitamin C is the workhorse antioxidant. It neutralizes free radicals from UV and pollution, supports collagen production, and gently brightens by inhibiting melanin overproduction.",
          "The catch: oral vitamin C has limited bioavailability. Most of what you swallow gets excreted before it ever reaches your skin. That's why sublingual or topical delivery beats pills for visible results.",
        ],
      },
      {
        heading: 'What glutathione does',
        paragraphs: [
          "Glutathione is your body's master antioxidant — it actively recycles other antioxidants (including vitamin C) and supports liver detoxification, which shows up as clearer, brighter skin.",
          "It's also the antioxidant your skin uses to defend against oxidative stress from sun, stress, and environmental damage. Lower glutathione = duller skin and faster visible aging.",
        ],
      },
      {
        heading: 'The smart approach: stack them',
        paragraphs: [
          "Glutathione and vitamin C aren't competitors — they're teammates. Vitamin C regenerates oxidized glutathione, and glutathione boosts vitamin C's effectiveness in the body.",
          "NEUVIE Beauty + Collagen Strips combine glutathione, vitamin C, biotin, and marine collagen in one daily strip — designed for sublingual absorption so your skin actually gets the nutrients you're paying for.",
        ],
      },
    ],
    cta: {
      label: 'Shop Beauty + Collagen Strips',
      href: '/product/beauty-collagen-strips',
    },
  },
  {
    slug: 'why-vitamin-strips-beat-pills',
    title: "Why Vitamin Strips Beat Pills (It's Not Just Convenience)",
    excerpt:
      "Spoiler: it's about absorption. Up to 5x more of the nutrients you actually paid for end up in your bloodstream. Here's the science.",
    metaDescription:
      'Vitamin strips vs pills: dissolving strips deliver up to 5x faster absorption via sublingual delivery. The science, the studies, the real difference.',
    category: 'Science',
    readTime: '5 min read',
    publishedAt: '2025-03-28',
    author: 'NEUVIE Team',
    content: [
      {
        paragraphs: [
          "If you've ever wondered whether your daily vitamin is actually doing anything — you're not paranoid. You're paying attention.",
          "Most pill-based supplements lose **50 to 70%** of their active ingredients in the digestive process before they ever reach your bloodstream. Dissolving strips are different. Here's why.",
        ],
      },
      {
        heading: 'The first-pass problem',
        paragraphs: [
          "When you swallow a pill, it travels: stomach → small intestine → liver → bloodstream. That liver step is called **first-pass metabolism**, and it's where the majority of your vitamins get broken down before they can do anything useful.",
          "For some nutrients (like B12 and CoQ10), the loss is dramatic. Studies show oral B12 absorption can be as low as 1–2% in some adults.",
        ],
      },
      {
        heading: 'How sublingual absorption changes the math',
        paragraphs: [
          "The tissue under your tongue is rich with capillaries that connect directly to your bloodstream. Anything absorbed there bypasses the gut and the liver entirely — no first-pass loss, no waiting on digestion.",
          "Result: faster onset (minutes, not hours), and significantly higher absorption. Clinical research on sublingual B12 shows absorption rates **5x higher** than equivalent oral doses.",
        ],
      },
      {
        heading: "Why it matters for your daily routine",
        paragraphs: [
          "If you're going to take a daily vitamin, you want the dose on the label to actually reach your cells. Strips deliver more of what you paid for — and they do it in 30 seconds, no water, no pill-anxiety.",
          "That's the entire reason NEUVIE exists. Same nutrients you've heard of for years. Better delivery system. Daily routine you'll actually keep.",
        ],
      },
    ],
    cta: {
      label: 'Shop All Strips',
      href: '/shop',
    },
  },
  {
    slug: 'best-supplements-for-women-2026',
    title: 'Top 10 Supplements for Women in 2026 (Ranked)',
    excerpt:
      'A dietitian-informed ranking of the supplements actually worth taking in 2026 — from energy and sleep to hair, skin, and hormones.',
    metaDescription:
      'The 10 best supplements for women in 2026 — ranked by science, absorption, and real-life results. Strips, capsules, and what to skip.',
    category: 'Guides',
    readTime: '7 min read',
    publishedAt: '2026-01-12',
    author: 'NEUVIE Team',
    content: [
      {
        paragraphs: [
          "Walk into any wellness aisle in 2026 and you'll see hundreds of options. Most of them are repackaging the same handful of ingredients. Here's the short list women actually need — and the format that gets it into your bloodstream.",
        ],
      },
      {
        heading: 'The ranking (quick answer)',
        paragraphs: [
          '1. **Daily Multivitamin Strip** — the non-negotiable base layer.',
          '2. **Hair, Skin & Nails (biotin + zinc + antioxidants)** — visible results in 4–6 weeks.',
          '3. **Beauty / Glutathione + Vitamin C** — skin glow and antioxidant defense.',
          '4. **Energy (B-complex + natural caffeine)** — steady energy, no crash.',
          '5. **Sleep (melatonin + L-theanine)** — fall asleep faster, wake clear.',
          '6. **Iron (bioavailable, gentle)** — most women under 50 are low.',
          '7. **Magnesium / Relax (ashwagandha + magnesium)** — stress and recovery.',
          '8. **Probiotic + Digestive Enzymes** — bloating, regularity, gut.',
          '9. **Focus (lion\'s mane + L-theanine)** — clean cognitive support.',
          '10. **Hangover / Recovery (B-complex + electrolytes)** — for life that happens.',
        ],
      },
      {
        heading: 'Why format matters more than brand',
        paragraphs: [
          "A vitamin you forget to take is a vitamin that doesn't work. The reason most women quit supplements isn't price — it's friction. Pills are big, gummies are sugar, powders are messy.",
          "Dissolving strips solved that. 30 seconds on the tongue, no water, sublingual absorption that bypasses first-pass metabolism. That's why NEUVIE built every product in this list as a strip.",
        ],
      },
      {
        heading: 'What to skip',
        paragraphs: [
          'Mega-dose vitamin C (anything over 1000mg — your body excretes the rest). Generic "fat burner" stacks. Anything that won\'t show third-party test results. Anything with proprietary blends that hide doses.',
        ],
      },
    ],
    cta: { label: 'Shop All Strips', href: '/shop' },
  },
  {
    slug: 'neuvie-vs-olly-vs-ritual',
    title: 'NEUVIE vs Olly vs Ritual: Honest 2026 Comparison',
    excerpt:
      'Side-by-side: format, absorption, price-per-day, and ingredient transparency across three of the most-searched US vitamin brands.',
    metaDescription:
      'NEUVIE vs Olly vs Ritual compared head-to-head: format, absorption, dosing, sugar, price, and which is best for your routine.',
    category: 'Comparison',
    readTime: '6 min read',
    publishedAt: '2026-02-04',
    author: 'NEUVIE Team',
    content: [
      {
        paragraphs: [
          "Three of the most-searched US vitamin brands in 2026: NEUVIE, Olly, and Ritual. They look similar on Instagram. They're not the same in your body. Here's the honest breakdown.",
        ],
      },
      {
        heading: 'Quick answer',
        paragraphs: [
          '**NEUVIE** — dissolving strips, sublingual absorption, no sugar, third-party tested. Best for: people who want fastest absorption and zero pill-friction.',
          '**Olly** — chewable gummies. Best for: people who want a sweet treat and don\'t mind 2–4g of added sugar per serving.',
          '**Ritual** — delayed-release capsules. Best for: people who don\'t mind swallowing 2 large pills daily and want a minimalist formula.',
        ],
      },
      {
        heading: 'Format & absorption',
        paragraphs: [
          'NEUVIE dissolves in ~30 seconds on the tongue and absorbs sublingually — bypassing the gut entirely. Clinical research on sublingual B12 shows up to 5x higher absorption than oral capsules.',
          'Olly gummies have to be chewed and digested. The added sugar (typically 2–4g) is part of the cost of making them palatable.',
          'Ritual uses a delayed-release capsule designed to dissolve in the small intestine — better than a standard pill, but still subject to first-pass liver metabolism.',
        ],
      },
      {
        heading: 'Price per day (typical)',
        paragraphs: [
          'NEUVIE: ~$1.00/day on subscription, $1.17/day one-time.',
          'Olly: ~$0.50–$0.80/day depending on product.',
          'Ritual: ~$1.10/day (subscription only).',
        ],
      },
      {
        heading: 'Bottom line',
        paragraphs: [
          "If absorption and a routine you'll actually stick with matter most, NEUVIE wins. If you want the cheapest gummy and don't care about sugar, Olly. If you want a clean minimalist capsule and don't mind swallowing pills, Ritual.",
        ],
      },
    ],
    cta: { label: 'Try NEUVIE Risk-Free', href: '/shop' },
  },
  {
    slug: 'are-vitamin-strips-better-than-pills',
    title: 'Are Vitamin Strips Better Than Pills? (Science Explained)',
    excerpt:
      'The short answer: yes, for most nutrients. The long answer involves first-pass metabolism, sublingual capillaries, and a 5x absorption gap.',
    metaDescription:
      'Are dissolving vitamin strips better than pills? Clinical research on sublingual absorption, first-pass metabolism, and what it means for your daily vitamin.',
    category: 'Science',
    readTime: '5 min read',
    publishedAt: '2026-02-20',
    author: 'NEUVIE Team',
    content: [
      {
        paragraphs: [
          "Short answer: for most fat-soluble and B-vitamin nutrients, yes — dissolving strips deliver significantly more of the dose to your bloodstream than equivalent pills. Here's why.",
        ],
      },
      {
        heading: 'The pill problem: first-pass metabolism',
        paragraphs: [
          "Swallow a pill and it travels: stomach → small intestine → liver → bloodstream. The liver step breaks down a large fraction of the nutrient before it ever reaches your cells. For B12, oral absorption can drop as low as 1–2% in some adults.",
        ],
      },
      {
        heading: 'How strips change the math',
        paragraphs: [
          "The tissue under your tongue is rich with capillaries that connect directly to circulation. Anything absorbed there bypasses the gut and the liver — no first-pass loss. Clinical research shows sublingual B12 delivers ~5x higher absorption than the equivalent oral dose.",
        ],
      },
      {
        heading: 'When pills are still fine',
        paragraphs: [
          'For minerals like calcium and iron in large doses (>20mg), pills or strips both work — the bottleneck there is transporter saturation in the gut, not delivery format. For everything else — B-complex, melatonin, biotin, glutathione — strips win on absorption and on compliance.',
        ],
      },
      {
        heading: 'The compliance factor nobody talks about',
        paragraphs: [
          "The best supplement is the one you actually take. Surveys show 60%+ of pill-based vitamin users quit within 90 days. The #1 reason: friction. Strips remove the friction — 30 seconds, no water, tastes good.",
        ],
      },
    ],
    cta: { label: 'See How Strips Work', href: '/science' },
  },
  {
    slug: 'best-supplements-for-energy-without-caffeine',
    title: 'Best Supplements for Energy Without Caffeine (2026 Guide)',
    excerpt:
      'B-complex, CoQ10, iron, magnesium and adaptogens — the science-backed stack for steady, all-day energy without jitters, crashes, or a fourth cup of coffee.',
    metaDescription:
      'The best supplements for energy without caffeine in 2026: B-complex, CoQ10, iron, magnesium, rhodiola, ashwagandha. Doses, formats, routines that actually work.',
    category: 'Energy',
    readTime: '9 min read',
    publishedAt: '2026-03-05',
    author: 'NEUVIE Team',
    content: [
      {
        paragraphs: [
          "If you've been chasing energy with a fourth cup of coffee, the problem usually isn't caffeine — it's what's underneath. Most adults who feel tired during the day are not running low on stimulants. They're running low on the nutrients and hormonal balance their cells need to actually produce energy in the first place.",
          "This guide breaks down the supplements that actually move the needle on daily energy without caffeine, the doses worth looking for, and the format choices that decide whether you'll still be taking them on day 90.",
        ],
      },
      {
        heading: 'Why caffeine alone stops working',
        paragraphs: [
          "Caffeine blocks adenosine, the molecule that builds up in your brain and tells you you're tired. It doesn't create energy — it hides the tiredness. As soon as it wears off, adenosine floods back in, often worse than before. That's the crash.",
          "Over weeks and months, your body adapts by making more adenosine receptors. The same cup of coffee does less, so you drink more — and you start losing sleep quality, which makes the underlying tiredness even bigger. This is the loop most people are stuck in by their mid-thirties.",
          "Supplementing the underlying systems — mitochondria, B-vitamin pathways, iron status, adaptogen-supported cortisol — is what changes the baseline. Caffeine then becomes optional rather than required.",
        ],
      },
      {
        heading: 'The four-ingredient stack that actually works',
        paragraphs: [
          "1. **B-Complex (B1, B6, B12, folate).** B-vitamins are cofactors in the Krebs cycle, the chemical pathway that turns food into ATP — your cells' usable energy currency. Most adults run mildly low on at least one B-vitamin, and vegans, vegetarians, and anyone on a PPI or metformin are at higher risk for low B12 specifically. Look for a methylated B-complex with at least 100% of the daily value for the main Bs.",
          "2. **CoQ10 (100–200 mg).** CoQ10 sits inside the mitochondria — the tiny power plants in every cell — and is part of the electron-transport chain that produces ATP. Your body makes its own CoQ10, but production drops with age and on statin medication. Ubiquinol is the more bioavailable form for adults over 40.",
          "3. **Iron (bioavailable form, 18–25 mg).** Iron carries oxygen on hemoglobin. Without enough oxygen reaching your tissues, you feel exhausted even after a full night's sleep. Most menstruating women run low; bloodwork (ferritin under 50 is a yellow flag) tells you whether you actually need it. If you do, pick a gentle form — chelated iron or low-dose ferrous bisglycinate — to avoid the constipation that ferrous sulfate is famous for.",
          "4. **Adaptogens (rhodiola 200–400 mg or ashwagandha 300–600 mg).** Adaptogens are plants studied for helping the body adapt to stress, mostly by smoothing out cortisol — your main stress hormone. Steadier cortisol means steadier energy. Rhodiola is the better daytime pick because it leans slightly stimulating; ashwagandha is calmer and pairs well with sleep.",
        ],
      },
      {
        heading: 'Magnesium: the quiet fifth pillar',
        paragraphs: [
          "Magnesium is involved in more than 300 enzyme reactions in the body, including ATP production. National survey data suggests roughly half of US adults don't get the recommended daily amount from food. Low magnesium shows up as muscle cramps, restless sleep, and stubborn fatigue.",
          "For energy and sleep, magnesium glycinate (200–400 mg) is the most useful form — well absorbed and easy on the stomach. Magnesium oxide, the cheapest form in most multivitamins, is the worst absorbed and most likely to cause loose stools.",
        ],
      },
      {
        heading: 'What about a small amount of natural caffeine?',
        paragraphs: [
          "A small dose of natural caffeine (40–80 mg, about half a cup of coffee) paired with L-theanine gives you a noticeable lift without the jitters or crash. L-theanine, an amino acid from green tea, smooths out caffeine's edges. This is why a matcha or a green tea often feels steadier than a black coffee — even though the caffeine doses are roughly comparable.",
          "If you can tolerate caffeine, a low-caffeine + L-theanine strip in the morning works well alongside the underlying nutrient stack. If you're caffeine-sensitive or trying to avoid it, the stack above does the heavy lifting on its own.",
        ],
      },
      {
        heading: 'Format matters more than people admit',
        paragraphs: [
          "Surveys consistently show that more than half of people who start a daily supplement quit within 90 days. The number-one reason isn't side effects or cost. It's friction.",
          "Capsules need water and a moment of focus. Powders need a scoop, a shaker, and counter space. Gummies come with 2–3 grams of sugar per serving, which compounds over a year. Dissolvable strips work in about 30 seconds on your tongue, with no water and no sugar — which is why people actually stick with them.",
          "NEUVIE Energy Strips were built around exactly this: a low-caffeine option with L-theanine and a B-complex in a sublingual format that absorbs quickly. For the rest of the stack, our Iron, Magnesium, and Sleep Strips cover the underlying systems without adding a single pill to your routine.",
        ],
      },
      {
        heading: 'A simple daily routine that compounds',
        paragraphs: [
          "Energy Strip in the morning (with or without coffee). Iron Strip with breakfast — vitamin C from food helps absorption, and taking it away from coffee or tea avoids tannin-related blocking. A B-complex with lunch if it isn't already covered. Magnesium or a Relax Strip in the evening to support recovery and deeper sleep.",
          "That's the loop. Give it four weeks before judging — most of these ingredients build their effect through consistent daily use, not single doses. The people who feel the biggest change are usually the ones who were quietly running low on two or three of these nutrients at the same time.",
        ],
      },
      {
        heading: 'Common mistakes to avoid',
        paragraphs: [
          "**Stacking ten things at once.** Start with one or two daily essentials, give them a real 4-week window, then add more. Otherwise you can't tell what is actually helping.",
          "**Skipping sleep and water.** No supplement compensates for chronic 5-hour nights or dehydration. The stack above is a multiplier, not a replacement.",
          "**Buying bargain bottles.** Many low-cost supplements use the cheapest form of each ingredient — magnesium oxide, ferrous sulfate, cyanocobalamin — at fractional doses. The label looks right and the result is nothing.",
          "**Ignoring bloodwork.** Iron is the one supplement worth checking before adding daily. Too much iron is a real problem, especially for men and post-menopausal women. A ferritin test is cheap and answers it in one number.",
        ],
      },
      {
        heading: 'Who this stack is for',
        paragraphs: [
          "People who feel a 3 PM crash even on 7+ hours of sleep. Anyone with caffeine sensitivity, heart palpitations from coffee, or sleep that gets thinner after a second cup. Menstruating women whose energy tracks their cycle. Anyone over 35 watching their CoQ10 levels naturally drop. Travelers, parents, and shift workers who need steadier baseline energy.",
          "If you're pregnant, nursing, on prescription medication, or managing a chronic condition, talk to your healthcare provider before starting any new supplement — especially iron and adaptogens.",
        ],
      },
      {
        heading: 'Bottom line',
        paragraphs: [
          "The best supplements for energy without caffeine aren't exotic. They're the four to five nutrients your cells actually use to make ATP, taken consistently, in a format you'll still be using three months from now. Skip the bargain bottles. Pick clinically studied doses. Cover the basics — sleep, water, food — first. And give it four weeks before you decide it isn't working.",
        ],
      },
    ],
    cta: { label: 'Shop NEUVIE Energy Strips', href: '/shop' },
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
