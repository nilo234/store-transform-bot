import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShopifyProduct, sanitizeHandle, sanitizeTitle, optimizeShopifyImage } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { JudgeMePreviewBadge } from '@/components/reviews/JudgeMeReviews';
import { getBenefitLine } from '@/data/shopFilters';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: ShopifyProduct;
  index?: number;
  showCompare?: boolean;
  isCompared?: boolean;
  onToggleCompare?: () => void;
}

// Category badge — calm labeling, no hype
const getCategoryBadge = (title: string): string => {
  const t = title.toLowerCase();
  if (t.includes('energy') || t.includes('mushroom') || t.includes('libido')) return 'PERFORMANCE';
  if (t.includes('hair') || t.includes('skin') || t.includes('nail') || t.includes('beauty') || t.includes('collagen')) return 'BEAUTY';
  if (t.includes('sleep') || t.includes('cognitive') || t.includes('relax')) return 'RELAX';
  return 'WELLNESS';
};

export function ProductCard({ product, index = 0, showCompare, isCompared, onToggleCompare }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const { node } = product;
  const firstVariant = node.variants.edges[0]?.node;
  const firstImage = node.images.edges[0]?.node;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const badge = getCategoryBadge(node.title);
  const benefitLine = getBenefitLine(node.title);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;

    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions,
    });

    toast.success('Added to cart', {
      description: sanitizeTitle(node.title),
      position: 'top-center',
    });
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleCompare?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <Link to={`/product/${sanitizeHandle(node.handle)}`}>
        <div
          className="bg-card rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 group cursor-pointer border border-border/50 hover:border-border hover:shadow-elevated relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Compare checkbox */}
          {showCompare && (
            <button
              onClick={handleCompareClick}
              className={cn(
                "absolute top-2 md:top-3 left-2 md:left-3 z-20 w-7 h-7 rounded-full flex items-center justify-center transition-all border",
                isCompared
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background/90 text-muted-foreground border-border hover:border-primary"
              )}
            >
              <Scale className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-muted/30 to-card">
            {/* Strips count */}
            <div className={cn("absolute top-2 md:top-4 z-10", showCompare ? "left-10 md:left-12" : "left-2 md:left-4")}>
              <div className="bg-background/95 backdrop-blur-sm rounded-md px-2 py-1 md:px-3 md:py-1.5 text-center border border-border/50 shadow-sm">
                <span className="text-xs md:text-sm font-bold text-foreground block leading-none">30</span>
                <span className="text-[7px] md:text-[9px] font-medium text-muted-foreground uppercase tracking-wide">strips</span>
              </div>
            </div>

            <div className="w-full h-full flex items-center justify-center p-4 md:p-8">
              {firstImage ? (
                <motion.img
                  src={firstImage.url}
                  alt={firstImage.altText || node.title}
                  className="w-full h-full object-contain"
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                  transition={{ duration: 0.4 }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-primary/5 to-accent/5 flex items-center justify-center rounded-xl">
                  <span className="text-5xl md:text-7xl">🍬</span>
                </div>
              )}
            </div>

            {/* Quick Add — hover only */}
            <motion.div
              className="absolute inset-x-2 md:inset-x-4 bottom-2 md:bottom-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-9 md:h-11 text-xs md:text-sm font-medium rounded-lg flex items-center justify-center gap-1.5"
              >
                <Plus className="h-4 w-4" />
                Add to cart
              </Button>
            </motion.div>
          </div>

          {/* Info */}
          <div className="p-3 md:p-5">
            <span className="text-[9px] md:text-[11px] font-semibold text-primary uppercase tracking-widest">
              {badge}
            </span>

            <div className="mt-1">
              <JudgeMePreviewBadge productId={node.id} />
            </div>

            <h3 className="font-body text-sm md:text-base font-semibold mt-1 mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
              {sanitizeTitle(node.title)}
            </h3>

            {/* Short benefit line — compliant, no hype */}
            <p className="text-[11px] md:text-xs text-muted-foreground leading-snug mb-2 md:mb-3 line-clamp-1">
              {benefitLine}
            </p>

            {/* Price — clean, no fake discounts */}
            <div className="flex items-baseline gap-2">
              <span className="text-base md:text-lg font-bold text-foreground">
                ${price.toFixed(2)}
              </span>
              <span className="text-[10px] md:text-xs text-muted-foreground">
                / 30 strips
              </span>
            </div>

            <p className="text-[10px] md:text-xs text-muted-foreground mt-1.5 font-medium">
              Free shipping on $50+
            </p>

            {/* View details link */}
            <div className="hidden md:block mt-3 pt-3 border-t border-border/50">
              <span className="text-xs font-medium text-primary group-hover:text-accent transition-colors inline-flex items-center gap-1">
                View details
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
