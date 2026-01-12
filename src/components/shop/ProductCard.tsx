import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { JudgeMePreviewBadge } from '@/components/reviews/JudgeMeReviews';

interface ProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

// Get category badge based on product title - 13 Neuvie Strips products
const getCategoryBadge = (title: string): { label: string; color: string } => {
  const lowerTitle = title.toLowerCase();
  // Performance & Energy: Mushroom Focus, Libido Support, Energy
  if (lowerTitle.includes('energy') || lowerTitle.includes('mushroom') || lowerTitle.includes('libido')) {
    return { label: 'PERFORMANCE', color: 'text-primary' };
  }
  // Beauty & Skin: Beauty + Collagen, Hair Skin & Nails
  if (lowerTitle.includes('hair') || lowerTitle.includes('skin') || lowerTitle.includes('nail') || lowerTitle.includes('beauty') || lowerTitle.includes('collagen')) {
    return { label: 'BEAUTY', color: 'text-accent' };
  }
  // Sleep & Relax: Cognitive Relax, Sleep
  if (lowerTitle.includes('sleep') || lowerTitle.includes('cognitive') || lowerTitle.includes('relax')) {
    return { label: 'RELAX', color: 'text-purple-600' };
  }
  // Immunity & Health: Everything else
  return { label: 'WELLNESS', color: 'text-primary' };
};

// Get ingredient icons based on product title - all 13 products
const getIngredientIcons = (title: string): string[] => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('hangover')) {
    return ['🌿 Curcuma', '🍇 Grape Extract', '🌱 Phyllanthus'];
  }
  if (lowerTitle.includes('bone')) {
    return ['☀️ Vitamin D3', '💚 Vitamin K2', '🫐 Raspberry'];
  }
  if (lowerTitle.includes('cognitive') || lowerTitle.includes('relax')) {
    return ['🧘 L-Theanine', '💆 GABA', '💊 Vitamin B6'];
  }
  if (lowerTitle.includes('mushroom') || lowerTitle.includes('focus')) {
    return ["🍄 Lion's Mane", '🍄 Cordyceps', '🍄 Maitake'];
  }
  if (lowerTitle.includes('libido')) {
    return ['🍄 Cordyceps', '⛰️ Shilajit', '🦪 Oyster Peptide'];
  }
  if (lowerTitle.includes('probiotic') || lowerTitle.includes('metabolism')) {
    return ['🦠 10B CFU', '🌿 Prebiotic', '🍇 Mixed Berry'];
  }
  if (lowerTitle.includes('beauty') || lowerTitle.includes('collagen')) {
    return ['✨ Collagen', '💊 Vitamin E', '🥭 Mango'];
  }
  if (lowerTitle.includes('hair') || lowerTitle.includes('skin') || lowerTitle.includes('nail')) {
    return ['💊 Biotin 5000mcg', '🌿 Folate', '☀️ Vitamin D3'];
  }
  if (lowerTitle.includes('digestive') || lowerTitle.includes('gut')) {
    return ['🦠 B. Coagulans', '🧬 Protease', '🍍 Bromelain'];
  }
  if (lowerTitle.includes('appetite') || lowerTitle.includes('weight')) {
    return ['🧡 Saffron', '💊 Chromium', '🔬 Molybdenum'];
  }
  if (lowerTitle.includes('iron')) {
    return ['💪 Iron 19mg', '🌿 Folate', '🫐 Raspberry'];
  }
  if (lowerTitle.includes('energy')) {
    return ['⚡ Caffeine', '🧘 L-Theanine', '💊 B12'];
  }
  if (lowerTitle.includes('sleep')) {
    return ['🌙 Melatonin', '🌿 Valerian', '💜 Lavender'];
  }
  return ['🌿 Natural', '✨ Premium', '🔬 Tested'];
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  
  const { node } = product;
  const firstVariant = node.variants.edges[0]?.node;
  const firstImage = node.images.edges[0]?.node;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const originalPrice = price * 1.42; // Show as if 42% off like TryAuri
  const categoryBadge = getCategoryBadge(node.title);
  const ingredientIcons = getIngredientIcons(node.title);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) return;
    
    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions,
    });
    
    toast.success('Added to cart!', {
      description: node.title,
      position: 'top-center',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link to={`/product/${node.handle}`}>
        <div 
          className="bg-card rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 group cursor-pointer border border-border/50 hover:border-border hover:shadow-elevated"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container - Mobile optimized */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-muted/30 to-card">
            {/* Servings Badge - Top Left - Mobile optimized */}
            <div className="absolute top-2 md:top-4 left-2 md:left-4 z-10">
              <div className="bg-background/95 backdrop-blur-sm rounded-md md:rounded-lg px-2 md:px-3 py-1 md:py-2 text-center border border-border/50 shadow-sm">
                <span className="text-sm md:text-lg font-bold text-foreground block leading-none">x30</span>
                <span className="text-[8px] md:text-[10px] font-medium text-muted-foreground uppercase tracking-wide">STRIPS</span>
              </div>
            </div>

            {/* Discount Badge - Top Right - Mobile optimized */}
            <div className="absolute top-2 md:top-4 right-2 md:right-4 z-10">
              <span className="bg-accent text-accent-foreground px-2 md:px-3 py-1 md:py-1.5 rounded-md md:rounded-lg text-xs md:text-sm font-bold shadow-sm">
                42% OFF
              </span>
            </div>

            {/* Product Image */}
            <div className="w-full h-full flex items-center justify-center p-4 md:p-8">
              {firstImage ? (
                <motion.img
                  src={firstImage.url}
                  alt={firstImage.altText || node.title}
                  className="w-full h-full object-contain transition-transform duration-500"
                  animate={{ scale: isHovered ? 1.08 : 1 }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-primary/5 to-accent/5 flex items-center justify-center rounded-lg md:rounded-xl">
                  <span className="text-5xl md:text-7xl">🍬</span>
                </div>
              )}
            </div>

            {/* Quick Add Button - Shows on Hover/Tap */}
            <motion.div 
              className="absolute inset-x-2 md:inset-x-4 bottom-2 md:bottom-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 15 }}
              transition={{ duration: 0.25 }}
            >
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-10 md:h-12 text-sm md:text-base font-semibold rounded-lg flex items-center justify-center gap-1.5 md:gap-2"
              >
                <Plus className="h-4 w-4 md:h-5 md:w-5" />
                <span className="hidden sm:inline">Quick Add</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </motion.div>
          </div>

          {/* Product Info - Mobile optimized */}
          <div className="p-3 md:p-5">
            {/* Category Badge */}
            <span className={`text-[10px] md:text-xs font-bold ${categoryBadge.color} uppercase tracking-wider`}>
              {categoryBadge.label}
            </span>

            {/* Judge.me Star Rating */}
            <div className="mt-1 md:mt-1.5">
              <JudgeMePreviewBadge productId={node.id} />
            </div>

            {/* Title */}
            <h3 className="font-display text-sm md:text-lg font-semibold mt-1 md:mt-1.5 mb-2 md:mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
              {node.title}
            </h3>

            {/* Ingredient Icons - Hidden on mobile, show on larger screens */}
            <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
              {ingredientIcons.slice(0, 3).map((icon, i) => (
                <span 
                  key={i} 
                  className="text-xs bg-muted/80 px-2.5 py-1 rounded-full text-muted-foreground font-medium"
                >
                  {icon}
                </span>
              ))}
            </div>

            {/* Price - Mobile optimized */}
            <div className="flex flex-wrap items-baseline gap-1 md:gap-2.5">
              <span className="text-base md:text-xl font-bold text-primary">
                ${price.toFixed(2)}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
              <span className="hidden sm:inline text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded">
                SAVE ${(originalPrice - price).toFixed(2)}
              </span>
            </div>

            {/* Pack Info - Simplified on mobile */}
            <p className="text-[10px] md:text-xs text-muted-foreground mt-1.5 md:mt-2 font-medium">
              <span className="sm:hidden">30 Strips • Free Ship $50+</span>
              <span className="hidden sm:inline">1 PACK • 30 Servings • Ships Free on $50+</span>
            </p>

            {/* Shop Now Link - Hidden on mobile */}
            <div className="hidden md:block mt-4 pt-4 border-t border-border/50">
              <span className="text-sm font-bold text-primary group-hover:text-accent transition-colors inline-flex items-center gap-1">
                Shop Now
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
