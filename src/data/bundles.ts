// Bundle data for Neuvie™ - 8 High-Converting Bundles
export interface Bundle {
  id: string;
  name: string;
  emoji: string;
  packSize: string;
  products: string[];
  originalPrice: number;
  salePrice: number;
  savings: number;
  discountPercent: number;
  tagline: string;
  badge?: string;
}

export const bundles: Bundle[] = [
  {
    id: 'ultimate-focus-stack',
    name: 'ULTIMATE FOCUS STACK',
    emoji: '🔥',
    packSize: '3-Pack',
    products: ['Mushroom Focus', 'Energy', 'Libido Support Strips'],
    originalPrice: 104.97,
    salePrice: 79.99,
    savings: 25,
    discountPercent: 24,
    tagline: 'Max Focus + Energy + Drive All Day',
    badge: 'BEST SELLER',
  },
  {
    id: 'athlete-performance',
    name: 'ATHLETE PERFORMANCE',
    emoji: '⚡',
    packSize: '2-Pack',
    products: ['Mushroom Focus', 'Energy Strips'],
    originalPrice: 69.98,
    salePrice: 54.99,
    savings: 15,
    discountPercent: 21,
    tagline: 'Pre-Workout Focus & Energy Boost',
  },
  {
    id: 'complete-gut-health',
    name: 'COMPLETE GUT HEALTH',
    emoji: '🌿',
    packSize: '4-Pack',
    products: ['Probiotic', 'Metabolism', 'Digestive', 'Iron Strips'],
    originalPrice: 139.92,
    salePrice: 99.99,
    savings: 40,
    discountPercent: 29,
    tagline: 'Full Gut Reset + Nutrient Absorption',
    badge: 'POPULAR',
  },
  {
    id: 'daily-wellness',
    name: 'DAILY WELLNESS',
    emoji: '💪',
    packSize: '4-Pack',
    products: ['Bone Support', 'Probiotic', 'Appetite', 'Iron'],
    originalPrice: 129.92,
    salePrice: 94.99,
    savings: 35,
    discountPercent: 27,
    tagline: 'Daily Foundation for Optimal Health',
  },
  {
    id: 'beauty-glow',
    name: 'BEAUTY GLOW',
    emoji: '✨',
    packSize: '3-Pack',
    products: ['Beauty Collagen', 'Hair Skin Nails', 'Bone Support'],
    originalPrice: 99.97,
    salePrice: 74.99,
    savings: 25,
    discountPercent: 25,
    tagline: 'Inside-Out Beauty Transformation',
  },
  {
    id: 'sleep-recover',
    name: 'SLEEP & RECOVER',
    emoji: '😴',
    packSize: '2-Pack',
    products: ['Sleep', 'Cognitive Relax Strips'],
    originalPrice: 69.98,
    salePrice: 54.99,
    savings: 15,
    discountPercent: 21,
    tagline: 'Deep Sleep + Morning Recovery',
  },
  {
    id: 'best-value-mega',
    name: 'BEST VALUE MEGA',
    emoji: '🎁',
    packSize: '6-Pack',
    products: ['Any 6 Strips', '(Performance/Wellness/Beauty mix)'],
    originalPrice: 209.94,
    salePrice: 149.99,
    savings: 60,
    discountPercent: 29,
    tagline: '6-Month Supply - Best Deal!',
    badge: 'BEST VALUE',
  },
  {
    id: 'new-year-reset',
    name: 'NEW YEAR RESET',
    emoji: '🍾',
    packSize: '5-Pack',
    products: ['Hangover', 'Sleep', 'Probiotic', 'Energy', 'Mushroom Focus'],
    originalPrice: 174.95,
    salePrice: 124.99,
    savings: 50,
    discountPercent: 29,
    tagline: 'Party Recovery + Fresh Start 2026',
    badge: 'LIMITED',
  },
];
