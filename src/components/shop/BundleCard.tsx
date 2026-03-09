import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Clock, Package, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { Bundle, productInfo } from '@/data/bundles';
import { useBundleImages } from '@/hooks/useBundleImages';
import { optimizeShopifyImage } from '@/lib/shopify';

interface BundleCardProps {
  bundle: Bundle;
  index?: number;
}

// Countdown timer component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 }; // Reset
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-1.5 text-xs font-medium text-destructive">
      <Clock className="h-3.5 w-3.5" />
      <span>
        {String(timeLeft.hours).padStart(2, '0')}:
        {String(timeLeft.minutes).padStart(2, '0')}:
        {String(timeLeft.seconds).padStart(2, '0')}
      </span>
    </div>
  );
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

    const bundleId = `bundle-${bundle.id}-${Date.now()}`;

    // Build all bundle items with bundle metadata
    const bundleItems = bundle.variantIds
      .map((variantId) => {
        const info = productInfo[variantId];
        if (!info) return null;
        return {
          product: {
            node: {
              id: `product-${variantId}`,
              title: info.title,
              description: '',
              handle: info.title.toLowerCase().replace(/\s+/g, '-'),
              priceRange: {
                minVariantPrice: { amount: info.price, currencyCode: 'USD' },
              },
              images: { edges: [] },
              variants: {
                edges: [{
                  node: {
                    id: variantId,
                    title: 'Default Title',
                    price: { amount: info.price, currencyCode: 'USD' },
                    availableForSale: true,
                    selectedOptions: [{ name: 'Title', value: 'Default Title' }],
                  },
                }],
              },
              options: [{ name: 'Title', values: ['Default Title'] }],
            },
          } as import('@/lib/shopify').ShopifyProduct,
          variantId,
          variantTitle: 'Default Title',
          price: { amount: info.price, currencyCode: 'USD' },
          quantity: 1,
          selectedOptions: [{ name: 'Title', value: 'Default Title' }],
          bundleId,
          bundleName: bundle.name,
          bundleDiscountCode: bundle.discountCode,
        };
      })
      .filter(Boolean) as Omit<import('@/stores/cartStore').CartItem, 'lineId'>[];

    // Add all items as a bundle (single Shopify cart operation + auto-apply discount)
    await useCartStore.getState().addBundle(bundleItems, bundle.discountCode);

    toast.success('Bundle added to cart!', {
      description: (
        <div className="space-y-1">
          <p>{bundle.name} - {bundle.packSize}</p>
          <p className="text-xs font-semibold text-primary">
            Discount code "{bundle.discountCode}" auto-applied!
          </p>
        </div>
      ),
      position: 'top-center',
      duration: 5000,
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
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-muted/30 to-card">
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
              className="w-full h-full grid gap-1 p-2"
              style={{
                gridTemplateColumns: shopifyImages.length === 1 ? '1fr' : 
                  shopifyImages.length === 2 ? 'repeat(2, 1fr)' :
                  shopifyImages.length <= 4 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gridTemplateRows: shopifyImages.length <= 2 ? '1fr' :
                  shopifyImages.length <= 4 ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)',
              }}
              animate={{ scale: isHovered ? 1.02 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {shopifyImages.slice(0, 6).map((imgUrl, idx) => (
                <div key={idx} className="relative overflow-hidden rounded-lg bg-white">
                  <img
                    src={optimizeShopifyImage(imgUrl, 200)}
                    alt={`${bundle.name} product ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted/30">
              <span className="text-6xl">{bundle.emoji}</span>
            </div>
          )}

          {/* Countdown Timer - positioned at bottom of image */}
          <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
            <CountdownTimer />
          </div>
        </div>

        {/* Bundle Name with Emoji */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{bundle.emoji}</span>
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

          {/* Tagline */}
          <p className="text-sm italic text-muted-foreground leading-relaxed">
            "{bundle.tagline}"
          </p>
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
