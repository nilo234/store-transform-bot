import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, ShoppingCart, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { productContentMap, ProductContent } from '@/data/productContent';
import { getBenefitLine } from '@/data/shopFilters';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { formatShopifyMoney } from '@/lib/region';

interface CompareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: ShopifyProduct[];
  onRemoveProduct: (id: string) => void;
}

function getContentForProduct(title: string): ProductContent | undefined {
  const t = title.toLowerCase();
  for (const [key, content] of Object.entries(productContentMap)) {
    if (t.includes(key)) return content;
  }
  return undefined;
}

const comparisonRows = [
  { key: 'price', label: 'Price' },
  { key: 'benefit', label: 'Key Benefit' },
  { key: 'ingredients', label: 'Active Ingredients' },
  { key: 'properties', label: 'Properties' },
  { key: 'usage', label: 'How to Use' },
  { key: 'strips', label: 'Strips per Pack' },
] as const;

export function CompareModal({ open, onOpenChange, products, onRemoveProduct }: CompareModalProps) {
  const addItem = useCartStore((state) => state.addItem);

  const productData = useMemo(() => {
    return products.map(p => {
      const content = getContentForProduct(p.node.title);
      const price = parseFloat(p.node.priceRange.minVariantPrice.amount);
      const currencyCode = p.node.priceRange.minVariantPrice.currencyCode;
      const firstVariant = p.node.variants.edges[0]?.node;
      const firstImage = p.node.images.edges[0]?.node;

      return {
        id: p.node.id,
        handle: p.node.handle,
        title: p.node.title,
        price,
        currencyCode,
        image: firstImage?.url,
        variant: firstVariant,
        product: p,
        benefit: getBenefitLine(p.node.title),
        ingredients: content?.supplementFacts?.map(s => `${s.nutrient} (${s.amount})`) || [],
        properties: content?.properties || [],
        usage: content?.usage || 'Place 1 strip on your tongue and let it dissolve.',
      };
    });
  }, [products]);

  const handleAddToCart = async (data: typeof productData[0]) => {
    if (!data.variant) return;
    await addItem({
      product: data.product,
      variantId: data.variant.id,
      variantTitle: data.variant.title,
      price: data.variant.price,
      quantity: 1,
      selectedOptions: data.variant.selectedOptions,
    });
    toast.success('Added to cart', { description: data.title, position: 'top-center' });
  };

  if (products.length < 2) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent hideClose className="max-w-4xl w-[95vw] max-h-[90vh] p-0 gap-0 overflow-hidden">
        <DialogTitle className="sr-only">Compare Products</DialogTitle>
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-border bg-muted/30">
          <h2 className="font-display text-lg md:text-xl" style={{ letterSpacing: '-0.02em' }}>Compare Strips</h2>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="max-h-[calc(90vh-64px)]">
          <div className="p-4 md:p-6">
            {/* Product Headers with images */}
            <div className={cn(
              "grid gap-3 md:gap-4 mb-6",
              products.length === 2 ? "grid-cols-2" : "grid-cols-3"
            )}>
              {productData.map(p => (
                <div key={p.id} className="text-center relative group">
                  <button
                    onClick={() => onRemoveProduct(p.id)}
                    className="absolute -top-1 -right-1 z-10 w-6 h-6 rounded-full bg-muted hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                    aria-label={`Remove ${p.title}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                  
                  <div className="aspect-square bg-muted/30 rounded-xl overflow-hidden mb-3 mx-auto max-w-[140px] md:max-w-[180px]">
                    {p.image ? (
                      <img src={p.image} alt={p.title} className="w-full h-full object-contain p-3" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">🍬</div>
                    )}
                  </div>
                  
                  <h3 className="font-body ttext-sm font-semibold leading-tight line-clamp-2 mb-1">
                    {p.title}
                  </h3>
                  <span className="text-base md:text-lg font-bold text-primary">{formatShopifyMoney(p.price, p.currencyCode)}</span>
                </div>
              ))}
            </div>

            {/* Comparison Rows */}
            <div className="space-y-0 rounded-xl border border-border overflow-hidden">
              {/* Key Benefit */}
              <CompareRow label="Key Benefit" cols={products.length}>
                {productData.map(p => (
                  <div key={p.id} className="text-xs md:text-sm text-muted-foreground">{p.benefit}</div>
                ))}
              </CompareRow>

              {/* Active Ingredients */}
              <CompareRow label="Active Ingredients" cols={products.length} highlighted>
                {productData.map(p => (
                  <div key={p.id} className="space-y-1">
                    {p.ingredients.length > 0 ? p.ingredients.map((ing, i) => (
                      <div key={i} className="text-[11px] md:text-xs text-foreground flex items-start gap-1">
                        <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                        <span>{ing}</span>
                      </div>
                    )) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </div>
                ))}
              </CompareRow>

              {/* Properties */}
              <CompareRow label="Properties" cols={products.length}>
                {productData.map(p => (
                  <div key={p.id} className="flex flex-wrap gap-1">
                    {p.properties.length > 0 ? p.properties.map((prop, i) => (
                      <span key={i} className="text-[10px] md:text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">
                        {prop}
                      </span>
                    )) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </div>
                ))}
              </CompareRow>

              {/* Usage */}
              <CompareRow label="How to Use" cols={products.length} highlighted>
                {productData.map(p => (
                  <div key={p.id} className="text-[11px] md:text-xs text-muted-foreground leading-relaxed">
                    {p.usage}
                  </div>
                ))}
              </CompareRow>

              {/* Strips */}
              <CompareRow label="Strips / Pack" cols={products.length}>
                {productData.map(p => (
                  <div key={p.id} className="text-sm font-semibold">30 strips</div>
                ))}
              </CompareRow>

              {/* Price per strip */}
              <CompareRow label="Price / Strip" cols={products.length} highlighted>
                {productData.map(p => (
                  <div key={p.id} className="text-sm font-bold text-primary">
                    {formatShopifyMoney(p.price / 30, p.currencyCode)}
                  </div>
                ))}
              </CompareRow>
            </div>

            {/* Action Buttons */}
            <div className={cn(
              "grid gap-3 mt-6",
              products.length === 2 ? "grid-cols-2" : "grid-cols-3"
            )}>
              {productData.map(p => (
                <div key={p.id} className="space-y-2">
                  <Button
                    onClick={() => handleAddToCart(p)}
                    className="w-full h-10 text-xs md:text-sm font-medium rounded-lg"
                    size="sm"
                  >
                    <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                    Add to Cart
                  </Button>
                  <Link to={`/product/${p.handle}`} onClick={() => onOpenChange(false)}>
                    <Button variant="outline" className="w-full h-9 text-xs font-medium rounded-lg" size="sm">
                      View Details
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function CompareRow({ label, children, cols, highlighted }: { label: string; children: React.ReactNode; cols: number; highlighted?: boolean }) {
  return (
    <div className={cn("border-b border-border last:border-b-0", highlighted && "bg-muted/20")}>
      <div className="px-3 md:px-4 pt-3 pb-1">
        <span className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</span>
      </div>
      <div className={cn(
        "grid gap-3 md:gap-4 px-3 md:px-4 pb-3",
        cols === 2 ? "grid-cols-2" : "grid-cols-3"
      )}>
        {children}
      </div>
    </div>
  );
}
