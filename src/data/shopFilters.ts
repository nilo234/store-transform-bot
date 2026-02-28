// Shop filter/sort configuration for 13 Neuvie wellness strips

export interface FilterOption {
  id: string;
  label: string;
  shortLabel?: string;
}

export const goalFilters: FilterOption[] = [
  { id: 'all', label: 'All Strips', shortLabel: 'All' },
  { id: 'energy-focus', label: 'Energy & Focus', shortLabel: 'Energy' },
  { id: 'beauty', label: 'Beauty & Skin', shortLabel: 'Beauty' },
  { id: 'sleep-relax', label: 'Sleep & Relax', shortLabel: 'Sleep' },
  { id: 'gut-health', label: 'Gut Health', shortLabel: 'Gut' },
  { id: 'immunity', label: 'Immunity & Vitality', shortLabel: 'Immunity' },
];

export const tagFilters: FilterOption[] = [
  { id: 'caffeine-free', label: 'Caffeine-Free' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'sugar-free', label: 'Sugar-Free' },
  { id: 'non-habit-forming', label: 'Non-Habit Forming' },
];

export const sortOptions: FilterOption[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'name-asc', label: 'Name: A–Z' },
  { id: 'name-desc', label: 'Name: Z–A' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
];

// Short, compliant benefit line for each product (no exaggerated claims)
export const productBenefitLine: Record<string, string> = {
  hangover: 'Supports recovery after a night out',
  bone: 'Vitamin D3 + K2 for bone support',
  cognitive: 'L-Theanine + GABA for calm focus',
  mushroom: "Lion's Mane + Cordyceps for mental clarity",
  libido: 'Cordyceps + Shilajit for vitality',
  probiotic: '10B CFU for digestive balance',
  beauty: 'Collagen peptides for skin support',
  hair: 'Biotin 5,000 mcg for hair & nails',
  digestive: 'Probiotics + enzymes for gut health',
  appetite: 'Saffron + Chromium for balance',
  iron: 'Iron 19 mg + Folate for energy',
  energy: 'Caffeine + L-Theanine, no jitters',
  sleep: 'Melatonin + Valerian for restful sleep',
};

// Map product title → goal category
export function getProductGoal(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('energy') || t.includes('mushroom') || t.includes('focus')) return 'energy-focus';
  if (t.includes('beauty') || t.includes('collagen') || t.includes('hair') || t.includes('skin') || t.includes('nail')) return 'beauty';
  if (t.includes('sleep') || t.includes('cognitive') || t.includes('relax')) return 'sleep-relax';
  if (t.includes('probiotic') || t.includes('digestive') || t.includes('gut')) return 'gut-health';
  return 'immunity';
}

// Map product title → tag set for filtering
export function getProductTags(title: string): string[] {
  const t = title.toLowerCase();
  const tags: string[] = ['vegan']; // all are vegan

  // Only Energy strips contain caffeine
  if (!t.includes('energy')) tags.push('caffeine-free');

  // Sugar-free products
  if (t.includes('probiotic') || t.includes('appetite') || t.includes('energy') || t.includes('hangover')) {
    tags.push('sugar-free');
  }

  // Non-habit forming
  if (t.includes('sleep') || t.includes('cognitive') || t.includes('relax')) {
    tags.push('non-habit-forming');
  }

  return tags;
}

// Get the benefit line for a product by matching its title to a handle key
export function getBenefitLine(title: string): string {
  const t = title.toLowerCase();
  for (const [key, line] of Object.entries(productBenefitLine)) {
    if (t.includes(key)) return line;
  }
  return 'Fast-dissolving wellness strip';
}
