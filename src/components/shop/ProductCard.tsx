import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

interface ProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

// Get category badge based on product title
const getCategoryBadge = (title: string): string | null => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('energy') || lowerTitle.includes('focus') || lowerTitle.includes('mushroom')) {
    return 'Performance';
  }
  if (lowerTitle.includes('hair') || lowerTitle.includes('skin') || lowerTitle.includes('nail')) {
    return 'Beauty';
  }
  if (lowerTitle.includes('sleep') || lowerTitle.includes('relax') || lowerTitle.includes('cognitive')) {
    return 'Relax';
  }
  if (lowerTitle.includes('digestive') || lowerTitle.includes('gut') || lowerTitle.includes('immune') || lowerTitle.includes('bone') || lowerTitle.includes('iron') || lowerTitle.includes('hangover')) {
    return 'Wellness';
  }
  return null;
};

// Get ingredient icons based on product title
const getIngredientIcons = (title: string): string[] => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('digestive') || lowerTitle.includes('gut')) {
    return ['🦠 Probiotic', '🧬 Enzymes', '🌿 Ginger'];
  }
  if (lowerTitle.includes('hair') || lowerTitle.includes('skin')) {
    return ['💊 Biotin', '🍊 Vitamin C', '✨ Vitamin E'];
  }
  if (lowerTitle.includes('mushroom') || lowerTitle.includes('focus')) {
    return ["🍄 Lion's Mane", '🍄 Reishi', '🍄 Cordyceps'];
  }
  if (lowerTitle.includes('cognitive') || lowerTitle.includes('relax')) {
    return ['🧘 L-Theanine', '🌿 Ashwagandha', '💆 GABA'];
  }
  if (lowerTitle.includes('bone')) {
    return ['☀️ Vitamin D3', '💚 Vitamin K2', '🦴 Calcium'];
  }
  if (lowerTitle.includes('hangover')) {
    return ['🌿 Milk Thistle', '🧬 Electrolytes', '🌿 Ginger'];
  }
  if (lowerTitle.includes('iron')) {
    return ['💪 Iron', '🍊 Vitamin C', '💊 Folate'];
  }
  if (lowerTitle.includes('sleep')) {
    return ['🌙 Melatonin', '🧘 L-Theanine', '🌸 Passionflower'];
  }
  if (lowerTitle.includes('energy')) {
    return ['⚡ Caffeine', '🧘 L-Theanine', '💊 B12'];
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/product/${node.handle}`}>
        <div 
          className="card-product group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-muted/50 to-card">
            {/* Discount Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="badge-discount">42% OFF</span>
            </div>

            {/* Servings Badge */}
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-background/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-bold border border-border/50">
                x30<br />
                <span className="text-[10px] font-normal text-muted-foreground">SERVINGS</span>
              </div>
            </div>

            {/* Product Image */}
            {firstImage && (
              <motion.img
                src={firstImage.url}
                alt={firstImage.altText || node.title}
                className="w-full h-full object-cover transition-transform duration-500"
                animate={{ scale: isHovered ? 1.05 : 1 }}
              />
            )}

            {/* Quick Add Button - Shows on Hover */}
            <motion.div 
              className="absolute inset-x-4 bottom-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                onClick={handleAddToCart}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Quick Add
              </Button>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="p-5">
            {/* Category Badge */}
            {categoryBadge && (
              <span className="text-xs font-medium text-accent uppercase tracking-wider">
                {categoryBadge}
              </span>
            )}

            {/* Title */}
            <h3 className="font-display text-lg font-semibold mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {node.title}
            </h3>

            {/* Ingredient Icons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {ingredientIcons.slice(0, 3).map((icon, i) => (
                <span key={i} className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                  {icon}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-primary">
                ${price.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            </div>

            {/* Pack Info */}
            <p className="text-xs text-muted-foreground mt-2">
              1 PACK • 30 Servings
            </p>

            {/* CTA */}
            <div className="mt-4">
              <span className="text-sm font-semibold text-primary group-hover:text-accent transition-colors inline-flex items-center gap-1">
                Shop Now →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}