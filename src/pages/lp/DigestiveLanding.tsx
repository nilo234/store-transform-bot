import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Check, ShoppingCart, ShieldCheck, Truck, Leaf, Flag, Loader2, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { PaymentBadges } from '@/components/layout/PaymentBadges';
import { fetchProductByHandle, ShopifyProduct, optimizeShopifyImage } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { PageMeta } from '@/components/seo';
import { StripsVsPillsComparison } from '@/components/product/StripsVsPillsComparison';
import { ProductFAQs } from '@/components/product/ProductFAQs';
import { toast } from 'sonner';
import neuvieLogo from '@/assets/neuvie-navbar-logo.png';

const PRIMARY_HANDLE = 'digestive-gut-health-strips';

export default function DigestiveLanding() {
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(s => s.addItem);
  const setCartOpen = useCartStore(s => s.setOpen);
  const cartCount = useCartStore(s => s.totalItems());

  useEffect(() => {
    fetchProductByHandle(PRIMARY_HANDLE).then(p => {
      setProduct(p);
      setLoading(false);
    });
  }, []);

  const handleAddToCart = async () => {
    if (!product) return;
    const variant = product.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });
    toast.success('Added to cart!', { position: 'top-center' });
  };

  const price = product ? parseFloat(product.priceRange.minVariantPrice.amount) : 29.99;
  const heroImage = product?.images.edges[0]?.node.url;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="Beat the Bloat — Digestive Strips | NEUVIE™"
        description="Reduce bloating, support gut health, no pills needed. NEUVIE Digestive dissolving strips. Free US shipping $50+. 14-day guarantee."
      />

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border/30">
        <div className="container-wide flex items-center justify-between h-20 md:h-24 lg:h-32 px-3 md:px-6">
          <Link to="/" className="flex items-center">
            <img src={neuvieLogo} alt="NEUVIE" className="h-20 md:h-[4.75rem] lg:h-[8.25rem] w-auto" />
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="relative h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-secondary"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-gradient-to-b from-secondary/40 to-background">
          <div className="container-wide py-8 md:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="order-1"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-card shadow-elevated max-w-[460px] mx-auto">
                  <span className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-full">
                    MOST POPULAR
                  </span>
                  {heroImage ? (
                    <img
                      src={optimizeShopifyImage(heroImage, 800)}
                      alt="NEUVIE Digestive dissolving strip — bloating relief"
                      className="w-full h-full object-contain"
                      loading="eager"
                      width={800}
                      height={800}
                    />
                  ) : (
                    <div className="w-full h-full bg-muted animate-pulse" />
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="order-2 text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-2 bg-accent/15 text-accent px-3 py-1.5 rounded-full mb-4 text-xs font-semibold">
                  <Star className="h-3.5 w-3.5 fill-accent" /> Founder-Led · Made in USA
                </div>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.05] mb-4">
                  Beat the Bloat. Feel Light.{' '}
                  <span className="italic text-accent">In Seconds.</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mb-5 max-w-xl mx-auto lg:mx-0">
                  Reduce bloating, support gut health, no pills needed. Just peel, place, and glow from within.
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6 max-w-xl mx-auto lg:mx-0">
                  {['Reduces bloating', 'Supports gut health', 'No pills needed'].map(b => (
                    <li key={b} className="flex items-center gap-2 text-sm font-medium">
                      <Check className="h-4 w-4 text-primary" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="bg-card rounded-2xl border border-border/40 p-4 md:p-5 shadow-soft mb-4">
                  <div className="flex items-baseline gap-3 mb-3 justify-center lg:justify-start">
                    <span className="text-3xl font-bold text-primary">${price.toFixed(2)}</span>
                    <span className="text-lg text-muted-foreground line-through">$49.99</span>
                    <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
                      SAVE ${(49.99 - price).toFixed(0)}
                    </span>
                  </div>
                  <Button
                    onClick={handleAddToCart}
                    disabled={loading || !product}
                    className="w-full h-13 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg gap-2"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5" />
                        Add to Cart — Feel Light Today  ·  ${price.toFixed(2)}
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    ✓ Free US shipping $50+  ·  ✓ 14-day money-back guarantee  ·  ✓ Made in USA
                  </p>
                  <div className="mt-3 pt-3 border-t border-border/30">
                    <PaymentBadges />
                  </div>
                </div>

                {/* TODO: activate WELCOME15 in Shopify Admin */}
                <div className="flex items-center justify-center lg:justify-start gap-2 text-sm">
                  <Gift className="h-4 w-4 text-accent" />
                  <span>
                    New customer? Use code{' '}
                    <strong className="text-accent">WELCOME15</strong> for 15% off
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-primary/5 border-y border-primary/10">
          <div className="container-wide py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { icon: ShieldCheck, label: 'FDA-Registered Facility' },
                { icon: Flag, label: 'Made in USA' },
                { icon: Truck, label: 'Free Shipping $50+' },
                { icon: Leaf, label: '14-Day Guarantee' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  <span className="text-xs font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="container-wide max-w-5xl">
            <h2 className="font-display text-2xl md:text-3xl text-center mb-8">
              Real people. Real relief.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  name: 'Aaliyah R.',
                  text: "I bloat after every meal. These strips actually made a noticeable difference in week one. Game changer.",
                  product: 'Digestive Strips',
                },
                {
                  name: 'Jess T.',
                  text: 'Found these on TikTok. I am genuinely shocked at how much better my gut feels. No more afternoon bloat.',
                  product: 'Digestive Strips',
                },
                {
                  name: 'Mia D.',
                  text: 'Travel ruins my stomach. These saved my last trip — pop one in my mouth and done. Zero hassle.',
                  product: 'Digestive Strips',
                },
              ].map(r => (
                <div key={r.name} className="bg-card rounded-2xl p-5 border border-border/30 shadow-soft">
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-3">"{r.text}"</p>
                  <div className="flex items-center gap-2 pt-3 border-t border-border/30">
                    <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold">{r.name}</p>
                      <p className="text-[10px] text-muted-foreground">Verified · {r.product}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14 bg-secondary/40">
          <div className="container-wide max-w-4xl">
            <h2 className="font-display text-2xl md:text-3xl text-center mb-8">
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: '1', title: 'Open the strip', text: 'Pull one strip from the pouch. No water needed.' },
                { step: '2', title: 'Place on tongue', text: 'Dissolves in 30 seconds — clean taste.' },
                { step: '3', title: 'Feel light', text: 'Daily routine that fits anywhere — home, work, travel.' },
              ].map(s => (
                <div key={s.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-display text-xl flex items-center justify-center mx-auto mb-3">
                    {s.step}
                  </div>
                  <h3 className="font-display text-lg mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <StripsVsPillsComparison />

        <ProductFAQs />

        <section className="py-12 md:py-16 bg-primary/5">
          <div className="container-wide max-w-2xl text-center">
            <h2 className="font-display text-2xl md:text-3xl mb-3">Ready to feel light?</h2>
            <p className="text-muted-foreground mb-6">
              Join the early customers who beat the bloat without pills.
            </p>
            <Button
              onClick={handleAddToCart}
              disabled={loading || !product}
              className="h-13 px-8 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg gap-2"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><ShoppingCart className="h-5 w-5" /> Add to Cart — ${price.toFixed(2)}</>}
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              ✓ Free shipping $50+ · ✓ 14-day money-back · ✓ Made in USA
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
