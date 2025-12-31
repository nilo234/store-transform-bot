import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { JudgeMePreviewBadge } from '@/components/reviews/JudgeMeReviews';
import { findProductContent } from '@/data/productContent';
import { getFlavorIcon } from '@/lib/flavorIcons';

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
  const productContent = findProductContent(node.title) || findProductContent(node.handle);

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
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/product/${node.handle}`}>
        <div 
          className="bg-white rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-1 group cursor-pointer border border-[hsl(40,20%,88%)] hover:shadow-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container - Auri Style */}
          <div className="relative aspect-square overflow-hidden bg-[hsl(40,30%,97%)]">
            {/* Servings Badge - Top Left - Auri Style */}
            <div className="absolute top-3 left-3 z-10">
              <div className="bg-white rounded px-2.5 py-1.5 text-center border border-[hsl(40,20%,88%)] shadow-sm">
                <span className="text-base font-bold text-[hsl(150,30%,15%)] block leading-none">x30</span>
                <span className="text-[9px] font-medium text-[hsl(150,15%,45%)] uppercase tracking-wide">SERVINGS</span>
              </div>
            </div>

            {/* Discount Badge - Top Right - Auri Style Red */}
            <div className="absolute top-3 right-3 z-10">
              <span className="bg-[hsl(0,70%,55%)] text-white px-2.5 py-1 rounded text-xs font-bold shadow-sm">
                42% OFF
              </span>
            </div>

            {/* Product Image */}
            <div className="w-full h-full flex items-center justify-center p-6">
              {firstImage ? (
                <motion.img
                  src={firstImage.url}
                  alt={firstImage.altText || node.title}
                  className="w-full h-full object-contain transition-transform duration-500"
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-[hsl(40,30%,97%)] to-[hsl(40,25%,94%)] flex items-center justify-center rounded">
                  <span className="text-6xl">💊</span>
                </div>
              )}
            </div>

            {/* Quick Add Button - Shows on Hover - Auri Style */}
            <motion.div 
              className="absolute inset-x-3 bottom-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-[hsl(43,30%,75%)] hover:bg-[hsl(43,30%,70%)] text-[hsl(150,35%,12%)] h-11 font-bold rounded-sm flex items-center justify-center gap-2 border-0"
              >
                <Plus className="h-4 w-4" />
                Quick Add
              </Button>
            </motion.div>
          </div>

          {/* Product Info - Auri Style */}
          <div className="p-4">
            {/* Category Badge */}
            <span className="text-[10px] font-bold text-[hsl(150,35%,15%)] uppercase tracking-wider">
              {categoryBadge.label}
            </span>

            {/* Judge.me Star Rating */}
            <div className="mt-1">
              <JudgeMePreviewBadge productId={node.id} />
            </div>

            {/* Title */}
            <h3 className="font-semibold text-base mt-1.5 mb-2 text-[hsl(150,30%,15%)] group-hover:text-[hsl(150,35%,25%)] transition-colors line-clamp-2 leading-snug">
              {node.title}
            </h3>

            {/* Flavor Badge - Auri Style */}
            {productContent?.flavor && (() => {
              const flavorStyle = getFlavorIcon(productContent.flavor);
              return (
                <div className="mb-2.5">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-[hsl(40,30%,95%)] text-[hsl(150,30%,25%)]">
                    <span className="text-xs">{flavorStyle.emoji}</span>
                    {productContent.flavor}
                  </span>
                </div>
              );
            })()}

            {/* Ingredient Icons - Auri Style */}
            <div className="flex flex-wrap gap-1 mb-3">
              {ingredientIcons.slice(0, 3).map((icon, i) => (
                <span 
                  key={i} 
                  className="text-[10px] bg-[hsl(40,25%,94%)] px-2 py-0.5 rounded text-[hsl(150,15%,40%)] font-medium"
                >
                  {icon}
                </span>
              ))}
            </div>

            {/* Price - Auri Style */}
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-[hsl(150,35%,15%)]">
                ${price.toFixed(2)}
              </span>
              <span className="text-sm text-[hsl(150,15%,55%)] line-through">
                ${originalPrice.toFixed(2)}
              </span>
            </div>

            {/* Pack Info */}
            <p className="text-[10px] text-[hsl(150,15%,50%)] mt-1.5 font-medium uppercase tracking-wide">
              1 PACK • 30 Servings
            </p>

            {/* Shop Now Link - Auri Style */}
            <div className="mt-3 pt-3 border-t border-[hsl(40,20%,90%)]">
              <span className="text-xs font-bold text-[hsl(150,35%,15%)] group-hover:text-[hsl(43,35%,50%)] transition-colors inline-flex items-center gap-1">
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
