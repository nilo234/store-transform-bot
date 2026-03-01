// Bundle data for Neuvie™ - 8 High-Converting Bundles with real Shopify products
export type BundleCategory = 'all' | 'performance' | 'wellness' | 'beauty';

// Bundle images
import ultimateFocusImg from '@/assets/bundles/ultimate-focus-stack.jpg';
import athletePerformanceImg from '@/assets/bundles/athlete-performance.jpg';
import completeGutHealthImg from '@/assets/bundles/complete-gut-health.jpg';
import dailyWellnessImg from '@/assets/bundles/daily-wellness.jpg';
import beautyGlowImg from '@/assets/bundles/beauty-glow.jpg';
import sleepRecoverImg from '@/assets/bundles/sleep-recover.jpg';
import bestValueMegaImg from '@/assets/bundles/best-value-mega.jpg';
import newYearResetImg from '@/assets/bundles/new-year-reset.jpg';

// Real Shopify product variant IDs
export const shopifyVariants = {
  mushroomFocus: 'gid://shopify/ProductVariant/48022272737499',
  energy: 'gid://shopify/ProductVariant/48044984664283',
  libidoSupport: 'gid://shopify/ProductVariant/48044984598747',
  probiotic: 'gid://shopify/ProductVariant/48041865248987',
  digestive: 'gid://shopify/ProductVariant/48022270673115',
  iron: 'gid://shopify/ProductVariant/48044984631515',
  boneSupport: 'gid://shopify/ProductVariant/48041863217371',
  appetite: 'gid://shopify/ProductVariant/48041865380059',
  beautyCollagen: 'gid://shopify/ProductVariant/48041865314523',
  hairSkinNails: 'gid://shopify/ProductVariant/48022272573659',
  sleep: 'gid://shopify/ProductVariant/48044984697051',
  cognitiveRelax: 'gid://shopify/ProductVariant/48022272868571',
  hangover: 'gid://shopify/ProductVariant/48044984369371',
};

// Bundle images map
export const bundleImages: Record<string, string> = {
  'ultimate-focus-stack': ultimateFocusImg,
  'athlete-performance': athletePerformanceImg,
  'complete-gut-health': completeGutHealthImg,
  'daily-wellness': dailyWellnessImg,
  'beauty-glow': beautyGlowImg,
  'sleep-recover': sleepRecoverImg,
  'best-value-mega': bestValueMegaImg,
  'new-year-reset': newYearResetImg,
};

// Product info for cart display
export const productInfo: Record<string, { title: string; price: string }> = {
  [shopifyVariants.mushroomFocus]: { title: 'Mushroom Focus Strips', price: '34.99' },
  [shopifyVariants.energy]: { title: 'Energy Strips', price: '34.99' },
  [shopifyVariants.libidoSupport]: { title: 'Libido Support Strips', price: '34.99' },
  [shopifyVariants.probiotic]: { title: 'Probiotic + Metabolism Strips', price: '34.99' },
  [shopifyVariants.digestive]: { title: 'Digestive + Gut Health Strips', price: '34.99' },
  [shopifyVariants.iron]: { title: 'Iron Strips', price: '34.99' },
  [shopifyVariants.boneSupport]: { title: 'Bone Support Strips', price: '34.99' },
  [shopifyVariants.appetite]: { title: 'Appetite Balance & Weight Support Strips', price: '34.99' },
  [shopifyVariants.beautyCollagen]: { title: 'Beauty + Collagen Strips', price: '34.99' },
  [shopifyVariants.hairSkinNails]: { title: 'Hair, Skin & Nails Strips', price: '34.99' },
  [shopifyVariants.sleep]: { title: 'Sleep Strips', price: '34.99' },
  [shopifyVariants.cognitiveRelax]: { title: 'Cognitive Relax Strips', price: '34.99' },
  [shopifyVariants.hangover]: { title: 'Hangover Strips', price: '34.99' },
};

export interface Bundle {
  id: string;
  name: string;
  emoji: string;
  packSize: string;
  category: BundleCategory;
  products: string[];
  variantIds: string[]; // Real Shopify variant IDs
  originalPrice: number;
  salePrice: number;
  savings: number;
  discountPercent: number;
  tagline: string;
  discountCode: string; // Shopify discount code
  badge?: string;
}

export const bundles: Bundle[] = [
  {
    id: 'ultimate-focus-stack',
    name: 'ULTIMATE FOCUS STACK',
    emoji: '🔥',
    packSize: '3-Pack',
    category: 'performance',
    products: ['Mushroom Focus', 'Energy', 'Libido Support Strips'],
    variantIds: [shopifyVariants.mushroomFocus, shopifyVariants.energy, shopifyVariants.libidoSupport],
    originalPrice: 104.97,
    salePrice: 84.99,
    savings: 19.98,
    discountPercent: 19,
    tagline: 'Max Focus + Energy + Drive All Day',
    discountCode: 'FOCUS19',
    badge: 'BEST SELLER',
  },
  {
    id: 'athlete-performance',
    name: 'ATHLETE PERFORMANCE',
    emoji: '⚡',
    packSize: '2-Pack',
    category: 'performance',
    products: ['Mushroom Focus', 'Energy Strips'],
    variantIds: [shopifyVariants.mushroomFocus, shopifyVariants.energy],
    originalPrice: 69.98,
    salePrice: 59.99,
    savings: 9.99,
    discountPercent: 14,
    tagline: 'Pre-Workout Focus & Energy Boost',
    discountCode: 'ATHLETE14',
  },
  {
    id: 'complete-gut-health',
    name: 'COMPLETE GUT HEALTH',
    emoji: '🌿',
    packSize: '4-Pack',
    category: 'wellness',
    products: ['Probiotic', 'Digestive', 'Iron', 'Appetite Balance'],
    variantIds: [shopifyVariants.probiotic, shopifyVariants.digestive, shopifyVariants.iron, shopifyVariants.appetite],
    originalPrice: 139.96,
    salePrice: 114.99,
    savings: 24.97,
    discountPercent: 18,
    tagline: 'Full Gut Reset + Nutrient Absorption',
    discountCode: 'GUT18',
    badge: 'POPULAR',
  },
  {
    id: 'daily-wellness',
    name: 'DAILY WELLNESS',
    emoji: '💪',
    packSize: '4-Pack',
    category: 'wellness',
    products: ['Bone Support', 'Probiotic', 'Appetite Balance', 'Iron'],
    variantIds: [shopifyVariants.boneSupport, shopifyVariants.probiotic, shopifyVariants.appetite, shopifyVariants.iron],
    originalPrice: 139.96,
    salePrice: 114.99,
    savings: 24.97,
    discountPercent: 18,
    tagline: 'Daily Foundation for Optimal Health',
    discountCode: 'WELLNESS18',
  },
  {
    id: 'beauty-glow',
    name: 'BEAUTY GLOW',
    emoji: '✨',
    packSize: '3-Pack',
    category: 'beauty',
    products: ['Beauty Collagen', 'Hair Skin Nails', 'Bone Support'],
    variantIds: [shopifyVariants.beautyCollagen, shopifyVariants.hairSkinNails, shopifyVariants.boneSupport],
    originalPrice: 104.97,
    salePrice: 84.99,
    savings: 19.98,
    discountPercent: 19,
    tagline: 'Inside-Out Beauty Transformation',
    discountCode: 'BEAUTY19',
  },
  {
    id: 'sleep-recover',
    name: 'SLEEP & RECOVER',
    emoji: '😴',
    packSize: '2-Pack',
    category: 'wellness',
    products: ['Sleep', 'Cognitive Relax Strips'],
    variantIds: [shopifyVariants.sleep, shopifyVariants.cognitiveRelax],
    originalPrice: 69.98,
    salePrice: 59.99,
    savings: 9.99,
    discountPercent: 14,
    tagline: 'Deep Sleep + Morning Recovery',
    discountCode: 'SLEEP14',
  },
  {
    id: 'best-value-mega',
    name: 'BEST VALUE MEGA',
    emoji: '🎁',
    packSize: '6-Pack',
    category: 'wellness',
    products: ['Focus', 'Energy', 'Probiotic', 'Sleep', 'Beauty', 'Iron'],
    variantIds: [
      shopifyVariants.mushroomFocus,
      shopifyVariants.energy,
      shopifyVariants.probiotic,
      shopifyVariants.sleep,
      shopifyVariants.beautyCollagen,
      shopifyVariants.iron,
    ],
    originalPrice: 209.94,
    salePrice: 169.99,
    savings: 39.95,
    discountPercent: 19,
    tagline: 'Our Best Deal — 6 Strips, Maximum Savings',
    discountCode: 'MEGA19',
    badge: 'BEST VALUE',
  },
  {
    id: 'new-year-reset',
    name: 'NEW YEAR RESET',
    emoji: '🍾',
    packSize: '5-Pack',
    category: 'performance',
    products: ['Hangover', 'Sleep', 'Probiotic', 'Energy', 'Mushroom Focus'],
    variantIds: [
      shopifyVariants.hangover,
      shopifyVariants.sleep,
      shopifyVariants.probiotic,
      shopifyVariants.energy,
      shopifyVariants.mushroomFocus,
    ],
    originalPrice: 174.95,
    salePrice: 139.99,
    savings: 34.96,
    discountPercent: 20,
    tagline: 'Party Recovery + Fresh Start 2026',
    discountCode: 'NEWYEAR20',
    badge: 'LIMITED',
  },
];
