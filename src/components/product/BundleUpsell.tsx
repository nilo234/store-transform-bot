import { motion } from 'framer-motion';
import { Check, Plus, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useRegion } from '@/hooks/useRegion';
import { bundles as allBundles, type Bundle } from '@/data/bundles';
import { useCartStore, type CartItem } from '@/stores/cartStore';
import { toast } from 'sonner';

interface BundleUpsellProps {
  /** Current product's Shopify variant ID — used to surface bundles that contain it */
  currentVariantId?: string;
  currentProductHandle?: string;
}

export const BundleUpsell = ({ currentVariantId }: BundleUpsellProps) => {
  const { formatPrice } = useRegion();
  const addBundle = useCartStore((s) => s.addBundle);
  const isLoading = useCartStore((s) => s.isLoading);

  // Pick up to 2 best matching bundles for this product (small first, then larger)
  const matched = (currentVariantId
    ? allBundles.filter((b) => b.variantIds.includes(currentVariantId))
    : []
  )
    .sort((a, b) => a.variantIds.length - b.variantIds.length);

  const bundlesToShow: Bundle[] = (matched.length >= 2
    ? matched.slice(0, 2)
    : [...matched, ...allBundles.filter((b) => !matched.includes(b))].slice(0, 2));

  const handleAddBundle = async (bundle: Bundle) => {
    const perVariantPrice = (bundle.salePrice / bundle.variantIds.length).toFixed(2);
    const lineItems: Omit<CartItem, 'lineId'>[] = bundle.variantIds.map((variantId, i) => {
      const productName = bundle.products[i] ?? bundle.name;
      return {
        product: {
          node: {
            id: `bundle-${bundle.id}-${variantId}`,
            title: `${productName} Strips`,
            description: `${bundle.name} bundle item`,
            handle: bundle.id,
            priceRange: { minVariantPrice: { amount: perVariantPrice, currencyCode: 'USD' } },
            images: { edges: [] },
            variants: {
              edges: [{
                node: {
                  id: variantId,
                  title: productName,
                  price: { amount: perVariantPrice, currencyCode: 'USD' },
                  availableForSale: true,
                  selectedOptions: [{ name: 'Title', value: 'Default Title' }],
                },
              }],
            },
            options: [{ name: 'Title', values: ['Default Title'] }],
          },
        } as unknown as CartItem['product'],
        variantId,
        variantTitle: productName,
        price: { amount: perVariantPrice, currencyCode: 'USD' },
        quantity: 1,
        selectedOptions: [{ name: 'Title', value: 'Default Title' }],
        bundleId: `bundle-${bundle.id}`,
        bundleName: bundle.name,
        bundleDiscountCode: bundle.discountCode,
      };
    });

    await addBundle(lineItems, bundle.discountCode);
    toast.success('Bundle added to cart!', {
      description: `${bundle.name} – ${bundle.packSize} · Discount ${bundle.discountCode} applied`,
      position: 'top-center',
    });
  };

  return (
    <section className="py-16">
      <div className="container-wide">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Better together
            </span>
            <h2 className="font-display text-2xl md:text-3xl mt-2 mb-4" style={{ letterSpacing: '-0.02em' }}>
              Build a routine that covers all the bases.
            </h2>
            <p className="text-muted-foreground">
              Combine strips and save up to 20% on curated bundles.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bundlesToShow.map((bundle, index) => (
              <motion.div
                key={bundle.id}
                className="bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{bundle.name}</h3>
                    <p className="text-sm text-muted-foreground">{bundle.tagline}</p>
                  </div>
                  <span className="bg-accent/20 text-accent text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
                    {bundle.discountPercent}% off
                  </span>
                </div>

                <div className="space-y-2 mb-4 flex-1">
                  {bundle.products.map((product, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{product} Strips</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-primary">{formatPrice(bundle.salePrice)}</span>
                  <span className="text-muted-foreground line-through">{formatPrice(bundle.originalPrice)}</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleAddBundle(bundle)}
                    disabled={isLoading}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-1.5"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Add Bundle
                      </>
                    )}
                  </Button>
                  <Button asChild variant="outline" className="px-3">
                    <Link to={`/bundles/${bundle.id}`} aria-label={`View ${bundle.name}`}>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/bundles" className="text-primary hover:underline font-medium">
              Browse all bundles →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
