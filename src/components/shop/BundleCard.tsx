import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Package, Copy, Check, Flower2, Wine, Zap, Leaf, Sparkles, Moon, TrendingUp, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { Bundle } from '@/data/bundles';
import { useBundleImages } from '@/hooks/useBundleImages';
import { optimizeShopifyImage } from '@/lib/shopify';

interface BundleCardProps {
  bundle: Bundle;
  index?: number;
}

const bundleIconMap: Record<string, typeof Zap> = {
  '🌸': Flower2,
  '🍾': Wine,
  '🔥': Zap,
  '⚡': Zap,
  '🌿': Leaf,
  '✨': Sparkles,
  '😴': Moon,
  '💪': TrendingUp,
  '🎁': Gift,
};

function BundleIcon({ emoji, className }: { emoji: string; className?: string }) {
  const Icon = bundleIconMap[emoji] || Sparkles;
  return <Icon className={className} strokeWidth={1.5} />;
}


export function BundleCard({ bundle, index = 0 }: BundleCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const isLoading = useCartStore((state) => state.isLoading);
  const { images: shopifyImages, isLoading: imagesLoading } = useBundleImages(bundle.variantIds);

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(bundle.discountCode);
    setCodeCopied(true);
    toast.success('Discount code copied!', {
      description: `Use "${bundle.discountCode}" at checkout for ${bundle.discountPercent}% off`,
      position: 'top-center',
    });
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const addItem = useCartStore.getState().addItem;

    // Add bundle as a single Shopify product using the bundle's own variant ID
    await addItem({
      product: {
        node: {
          id: `bundle-${bundle.id}`,
          title: `${bundle.name} – ${bundle.packSize}`,
          description: bundle.tagline,
          handle: bundle.id,
          priceRange: {
            minVariantPrice: { amount: bundle.salePrice.toString(), currencyCode: 'USD' },
          },
          images: { edges: [] },
          variants: {
            edges: [{
              node: {
                id: bundle.shopifyBundleVariantId,
                title: 'Default Title',
                price: { amount: bundle.salePrice.toString(), currencyCode: 'USD' },
                availableForSale: true,
                selectedOptions: [{ name: 'Title', value: 'Default Title' }],
              },
            }],
          },
          options: [{ name: 'Title', values: ['Default Title'] }],
        },
      } as import('@/lib/shopify').ShopifyProduct,
      variantId: bundle.shopifyBundleVariantId,
      variantTitle: 'Default Title',
      price: { amount: bundle.salePrice.toString(), currencyCode: 'USD' },
      quantity: 1,
      selectedOptions: [{ name: 'Title', value: 'Default Title' }],
    });

    toast.success('Bundle added to cart!', {
      description: `${bundle.name} – ${bundle.packSize}`,
      position: 'top-center',
      duration: 4000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <div
        className="relative bg-card rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 group cursor-pointer border border-border/50 hover:border-primary/30 hover:shadow-elevated h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Bundle Image - Shopify Product Images Grid */}
        <div className="relative overflow-hidden bg-gradient-to-b from-muted/30 to-card p-3" style={{ minHeight: '220px' }}>
          {/* Badges Row - positioned over image */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-start justify-between">
            {/* Pack Size Badge */}
            <div className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm flex items-center gap-1.5">
              <Package className="h-3.5 w-3.5" />
              {bundle.packSize}
            </div>

            {/* Special Badge */}
            {bundle.badge && (
              <span className="bg-accent text-accent-foreground px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm animate-pulse">
                {bundle.badge}
              </span>
            )}
          </div>

          {/* Product Images Grid */}
          {imagesLoading ? (
            <div className="w-full h-full flex items-center justify-center bg-muted/50">
              <div className="animate-pulse text-muted-foreground">Loading...</div>
            </div>
          ) : shopifyImages.length > 0 ? (
            <motion.div 
              className={`w-full h-full grid gap-1.5 p-3 ${
                shopifyImages.length === 1 ? 'grid-cols-1' :
                shopifyImages.length === 2 ? 'grid-cols-2' :
                shopifyImages.length === 3 ? 'grid-cols-3' :
                shopifyImages.length === 4 ? 'grid-cols-2 grid-rows-2' :
                shopifyImages.length <= 6 ? 'grid-cols-3 grid-rows-2' : 'grid-cols-3 grid-rows-2'
              }`}
              animate={{ scale: isHovered ? 1.02 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {shopifyImages.slice(0, 6).map((imgUrl, idx) => (
                <div key={idx} className="relative overflow-hidden rounded-xl bg-background shadow-sm border border-border/30 aspect-square">
                  <img
                    src={optimizeShopifyImage(imgUrl, 400)}
                    alt={`${bundle.name} – ${bundle.products[idx] || `product ${idx + 1}`}`}
                    className="w-full h-full object-contain p-1"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted/30">
              <BundleIcon emoji={bundle.emoji} className="w-12 h-12 text-primary" />
            </div>
          )}

        </div>

        {/* Bundle Name with Emoji */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <BundleIcon emoji={bundle.emoji} className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground leading-tight" style={{ letterSpacing: '-0.02em' }}>
              {bundle.name}
            </h3>
          </div>
        </div>

        {/* Products List */}
        <div className="px-6 py-4 flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            Includes:
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {bundle.products.map((product, i) => (
              <span
                key={i}
                className="text-xs bg-muted/80 px-2.5 py-1 rounded-full text-foreground font-medium"
              >
                • {product}
              </span>
            ))}
          </div>

          {/* Tagline & Subline */}
          <p className="text-sm italic text-muted-foreground leading-relaxed">
            "{bundle.tagline}"
          </p>
          {bundle.subline && (
            <p className="text-xs text-muted-foreground mt-1.5">
              {bundle.subline}
            </p>
          )}
        </div>

        {/* Price Section */}
        <div className="px-6 pb-4">
          <div className="bg-muted/50 rounded-xl p-4 mb-4">
            {/* Savings Badge */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm font-bold">
                SAVE ${bundle.savings} | {bundle.discountPercent}% OFF
              </span>
            </div>

            {/* Prices */}
            <div className="flex items-baseline justify-center gap-3">
              <span className="text-sm text-muted-foreground line-through">
                ${bundle.originalPrice.toFixed(2)}
              </span>
              <span className="text-3xl font-bold text-primary">
                ${bundle.salePrice.toFixed(2)}
              </span>
            </div>

            {/* Discount Code */}
            <button
              onClick={handleCopyCode}
              className="mt-3 w-full flex items-center justify-center gap-2 bg-background/80 hover:bg-background border border-dashed border-primary/50 rounded-lg py-2 px-3 transition-colors"
            >
              <span className="text-xs text-muted-foreground">Code:</span>
              <span className="font-mono font-bold text-primary">{bundle.discountCode}</span>
              {codeCopied ? (
                <Check className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </button>
          </div>

          {/* Add to Cart Button */}
          <motion.div
            animate={{
              scale: isHovered ? 1.02 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={handleAddToCart}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="h-5 w-5" />
              Add Bundle to Cart
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
