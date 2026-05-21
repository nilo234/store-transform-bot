import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star,
  ShoppingCart,
  Truck,
  ShieldCheck,
  Check,
  X,
  ChevronDown,
  Sparkles,
  FlaskConical,
  Flag,
  Leaf,
  Award,
  Heart,
  Stethoscope,
  Plus,
  Minus,
  Clock,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ShopifyProduct, sanitizeTitle, optimizeShopifyImage } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { sendAddToCartEvent } from '@/hooks/useShopifyAnalytics';
import { trackViewContent } from '@/lib/marketingPixels';
import { toast } from 'sonner';
import { ProductReviews } from '@/components/product/ProductReviews';
import { StickyAddToCart } from '@/components/product/StickyAddToCart';

interface Props {
  product: ShopifyProduct['node'];
}

// ---- Brand-locked content for Hair, Skin & Nails Strips ----
const SINGLE_PRICE = 34.99;
const ORIGINAL_PRICE = 49.99;

const clinicalStats = [
  { label: 'Stronger, thicker-looking hair', value: 82 },
  { label: 'Healthier, less brittle nails', value: 78 },
  { label: 'Glowing, clearer-looking skin', value: 74 },
];

const benefits = [
  {
    title: 'Supports hair strength & growth',
    body:
      'Biotin (5,000 mcg) plays a key role in keratin production — the protein behind strong, resilient hair. Daily use over 8–12 weeks helps support visibly fuller-looking strands.',
  },
  {
    title: 'Healthier nails from within',
    body:
      'Biotin and Folate work together to support nail bed health, helping reduce brittleness so nails can grow longer without splitting.',
  },
  {
    title: 'Skin radiance & cellular wellness',
    body:
      'Folate supports healthy cell turnover while Vitamin D3 aids overall skin vitality — for a clearer, more luminous complexion.',
  },
  {
    title: 'A 3-second ritual you’ll actually keep',
    body:
      'No water, no capsules, no aftertaste. One orange-flavored strip dissolves on your tongue in seconds — so consistency finally feels effortless.',
  },
];

const ingredients = [
  {
    name: 'Biotin',
    tag: 'Hair & Nails',
    dose: '5,000 mcg',
    desc: 'The B-vitamin behind keratin. Supports hair strength and nail resilience from within.',
  },
  {
    name: 'Folate (B9)',
    tag: 'Cell Renewal',
    dose: '400 mcg',
    desc: 'Supports healthy cell turnover — essential for skin glow and follicle vitality.',
  },
  {
    name: 'Vitamin D3',
    tag: 'Skin Vitality',
    dose: '200 mcg',
    desc: 'The sunshine vitamin. Supports calcium absorption, immune balance, and skin health.',
  },
];

const faqs = [
  {
    q: 'When will I see results?',
    a: 'Most people notice stronger nails within 4–6 weeks. Visible hair and skin improvements typically appear after 8–12 weeks of consistent daily use.',
  },
  {
    q: 'How do I take it?',
    a: 'Place one strip on your tongue and let it dissolve — about 30 seconds. No water, no swallowing. Once daily, any time of day.',
  },
  {
    q: 'Is it safe to take every day?',
    a: 'Yes. NEUVIE Hair, Skin & Nails Strips are designed for daily use as part of a healthy lifestyle. If you’re pregnant, nursing, or taking medication, consult your healthcare provider first.',
  },
  {
    q: 'What does it taste like?',
    a: 'Light, natural orange flavor — sweetened with monk fruit and stevia. No bitter aftertaste, no chalkiness.',
  },
  {
    q: 'Are these strips vegan and gluten-free?',
    a: 'Yes. Vegan, gluten-free, non-GMO, lactose-free, and made with no added sugar.',
  },
  {
    q: 'Where are they made?',
    a: 'Proudly made in the USA in an FDA-registered, GMP-certified facility. Every batch is independently third-party tested for purity and potency.',
  },
];

const reviewsTeaser = {
  quote:
    'My nails stopped peeling after about 5 weeks, and by week 10 my hair felt noticeably thicker. The fact that I just put it on my tongue and go is the only reason I actually kept it up.',
  author: 'Jessica M.',
};

export function HairSkinNailsPDP({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [packSize, setPackSize] = useState<1 | 2 | 3>(1);
  const addToCartRef = useRef<HTMLDivElement>(null);

  const addItem = useCartStore((s) => s.addItem);
  const images = product.images.edges;
  const firstVariant = product.variants.edges[0]?.node;
  const title = sanitizeTitle(product.title);

  useEffect(() => {
    if (firstVariant) {
      trackViewContent({
        id: firstVariant.id,
        name: product.title,
        price: parseFloat(firstVariant.price.amount) || SINGLE_PRICE,
        quantity: 1,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  const packPrice = (pack: 1 | 2 | 3) => {
    // 1-pack standard, 2-pack 10% off, 3-pack 20% off (no subscription)
    const base = SINGLE_PRICE * pack;
    if (pack === 2) return +(base * 0.9).toFixed(2);
    if (pack === 3) return +(base * 0.8).toFixed(2);
    return +base.toFixed(2);
  };
  const packOriginal = (pack: 1 | 2 | 3) => +(ORIGINAL_PRICE * pack).toFixed(2);
  const packSavings = (pack: 1 | 2 | 3) =>
    Math.round(((packOriginal(pack) - packPrice(pack)) / packOriginal(pack)) * 100);

  const handleAdd = async (qty: number) => {
    if (!firstVariant) return;
    await addItem({
      product: { node: product },
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: { amount: SINGLE_PRICE.toString(), currencyCode: 'USD' },
      quantity: qty,
      selectedOptions: firstVariant.selectedOptions,
    });
    sendAddToCartEvent({
      id: product.id,
      title: product.title,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: SINGLE_PRICE.toString(),
      quantity: qty,
    });
    toast.success('Added to Cart!', {
      description: `${qty}× ${title}`,
      position: 'top-center',
    });
  };

  const handleMainAdd = () => handleAdd(quantity * packSize);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* ============ PRODUCT MAIN ============ */}
        <section className="bg-background pt-4 lg:pt-8 pb-12">
          <div className="container-wide grid lg:grid-cols-2 gap-8 lg:gap-14">
            {/* LEFT: Gallery */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-square bg-card rounded-3xl overflow-hidden border border-border/50"
              >
                <div className="absolute top-5 right-5 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md z-10">
                  Save {packSavings(packSize)}% Today
                </div>

                {images[selectedImage] ? (
                  <img
                    src={optimizeShopifyImage(images[selectedImage].node.url, 900)}
                    alt={
                      images[selectedImage].node.altText ||
                      `NEUVIE ${title} — Biotin + Folate + D3 dissolving wellness strip`
                    }
                    className="w-full h-full object-contain p-8"
                    loading="eager"
                    fetchPriority="high"
                    width={900}
                    height={900}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Sparkles className="h-20 w-20 text-muted-foreground" strokeWidth={1.5} />
                  </div>
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold tracking-wider px-3 py-1.5 rounded whitespace-nowrap">
                  ORANGE FLAVOR · ZERO AFTERTASTE
                </div>
              </motion.div>

              {images.length > 1 && (
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {images.slice(0, 5).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`aspect-square bg-card rounded-xl overflow-hidden border-2 transition ${
                        selectedImage === i ? 'border-primary' : 'border-transparent'
                      }`}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img
                        src={optimizeShopifyImage(img.node.url, 200)}
                        alt={img.node.altText || `${title} view ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width={200}
                        height={200}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Buybox */}
            <div>
              {/* Reviews row */}
              <div className="flex items-center gap-2 text-[13px] mb-3">
                <div className="flex items-center gap-0.5 text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent" strokeWidth={1.5} />
                  ))}
                </div>
                <a href="#reviews" className="font-semibold underline underline-offset-2 text-foreground">
                  4.9/5.0
                </a>
                <span className="text-muted-foreground">(2,847)</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">10,000+ happy customers</span>
              </div>

              <p className="text-muted-foreground text-sm font-medium mb-1">Beauty Wellness</p>
              <h1 className="font-display text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-3 text-foreground">
                Hair, Skin & Nails
                <span className="text-accent">.</span>
              </h1>
              <p className="text-muted-foreground text-sm mb-6">
                Biotin 5,000 mcg + Folate + D3 · Beauty Support · NEUVIE™
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5 flex-wrap">
                <span className="text-4xl font-bold text-accent">
                  ${packPrice(packSize).toFixed(2)}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ${packOriginal(packSize).toFixed(2)}
                </span>
                <span className="bg-accent text-accent-foreground text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded">
                  {packSavings(packSize)}% Off Today
                </span>
              </div>

              {/* Pack picker */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {([1, 2, 3] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPackSize(p)}
                    className={`relative rounded-xl border-2 p-3 text-left transition ${
                      packSize === p
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-primary/40'
                    }`}
                  >
                    {p === 2 && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                        Best Value
                      </span>
                    )}
                    <p className="font-bold text-sm">{p}-Pack</p>
                    <p className="text-[11px] text-muted-foreground">
                      {p === 1 ? '1 month' : `${p} months`}
                    </p>
                    <p className="text-sm font-semibold text-accent mt-1">
                      ${packPrice(p).toFixed(2)}
                    </p>
                  </button>
                ))}
              </div>

              {/* Quantity + Add to Cart */}
              <div ref={addToCartRef} className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-2 bg-muted rounded-full p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" strokeWidth={2} />
                    </Button>
                    <span className="w-8 text-center font-semibold">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full"
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" strokeWidth={2} />
                    </Button>
                  </div>
                  <Button
                    onClick={handleMainAdd}
                    className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-wide shadow-lg whitespace-nowrap"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" strokeWidth={2} />
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* "Here's what you'll get" — gifts/subscription removed */}
              <div className="border-2 border-primary/20 bg-primary/5 rounded-xl p-5 mb-3">
                <h4 className="font-semibold text-sm mb-3 text-foreground">Here’s what you’ll get:</h4>
                <ul className="space-y-2.5">
                  {[
                    { icon: Sparkles, text: `${packSize === 1 ? '30 strips' : `${packSize * 30} strips`} — ${packSize === 1 ? '1 month supply' : `${packSize} months supply`}` },
                    { icon: Truck, text: 'Free US shipping on orders $50+' },
                    { icon: ShieldCheck, text: '30-day money-back guarantee' },
                    { icon: Flag, text: 'Made in the USA · FDA-registered facility' },
                    { icon: FlaskConical, text: 'Third-party tested for purity & potency' },
                  ].map(({ icon: Icon, text }, i) => (
                    <li key={i} className="flex items-center gap-3 text-[13px] text-foreground">
                      <div className="w-7 h-7 rounded bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                      </div>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust row */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-card border border-border rounded-xl px-3 py-2.5 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary shrink-0" strokeWidth={1.75} />
                  <span className="text-[11px] font-semibold leading-tight text-foreground">
                    Fast 3–5 day
                    <br />
                    US delivery
                  </span>
                </div>
                <div className="bg-card border border-border rounded-xl px-3 py-2.5 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0" strokeWidth={1.75} />
                  <span className="text-[11px] font-semibold leading-tight text-foreground">
                    30-day money
                    <br />
                    back guarantee
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center mb-5 italic">
                For best results, use consistently for 8–12 weeks.
              </p>

              {/* Mini testimonial */}
              <div className="bg-card rounded-2xl p-5 border border-border mb-6">
                <div className="flex items-center gap-0.5 text-accent mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent" strokeWidth={1.5} />
                  ))}
                </div>
                <p className="italic text-[14px] text-foreground leading-relaxed mb-3">
                  “{reviewsTeaser.quote}”
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
                    {reviewsTeaser.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">{reviewsTeaser.author}</p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Check className="h-3 w-3 text-primary" strokeWidth={2.5} /> Verified Buyer
                    </p>
                  </div>
                </div>
              </div>

              {/* Description tabs */}
              <Accordion
                type="multiple"
                defaultValue={['description']}
                className="space-y-2"
              >
                <AccordionItem
                  value="description"
                  className="bg-card rounded-xl border border-border px-4"
                >
                  <AccordionTrigger className="py-4 hover:no-underline font-semibold text-sm">
                    Description
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-[13px] text-muted-foreground leading-relaxed">
                    A daily dissolving beauty strip with 5,000 mcg Biotin, 400 mcg Folate, and
                    200 mcg Vitamin D3. Designed to support hair strength, nail resilience, and
                    skin radiance from within — no capsules, no water, no aftertaste.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="ingredients"
                  className="bg-card rounded-xl border border-border px-4"
                >
                  <AccordionTrigger className="py-4 hover:no-underline font-semibold text-sm">
                    Ingredients
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-[13px] text-muted-foreground leading-relaxed">
                    Biotin (5,000 mcg), Folate as Vitamin B9 (400 mcg), Vitamin D3 as
                    Cholecalciferol (200 mcg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract,
                    Natural Orange Flavor, Malic Acid, Lecithin, Stevia Glycosides.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="shipping"
                  className="bg-card rounded-xl border border-border px-4"
                >
                  <AccordionTrigger className="py-4 hover:no-underline font-semibold text-sm">
                    Shipping & Guarantee
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-[13px] text-muted-foreground leading-relaxed">
                    Ships within 1 business day. Free US shipping on orders $50+. Most orders
                    arrive in 3–5 business days. 30-day money-back guarantee on your first order.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* ============ CLINICAL RESULTS ============ */}
        <section className="bg-secondary/30 py-20">
          <div className="container-wide">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl lg:text-5xl mb-12 max-w-3xl text-balance text-foreground"
            >
              Clinically-studied ingredients for{' '}
              <span className="italic text-accent">visibly stronger hair, skin & nails</span>*
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left: progress bars */}
              <div>
                <p className="text-sm text-muted-foreground mb-1">Self-reported results after 12 weeks</p>
                <p className="text-xs text-muted-foreground mb-8">% of users</p>

                <div className="space-y-6">
                  {clinicalStats.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check className="h-3 w-3 text-primary-foreground" strokeWidth={2.5} />
                          </span>
                          <span className="font-semibold text-foreground">{s.label}</span>
                        </div>
                        <span className="font-display font-bold text-lg text-primary">
                          {s.value}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <p className="text-[10px] text-muted-foreground mt-8">
                  *Based on a 12-week consumer perception study with daily NEUVIE Hair, Skin &
                  Nails Strip use. Individual results vary.
                </p>
              </div>

              {/* Right: highlight card */}
              <div className="bg-card rounded-3xl p-8 border border-border">
                <p className="text-sm font-semibold mb-2 text-foreground">In the first 12 weeks,</p>
                <p className="text-sm mb-1 text-foreground">hair strength improved by</p>
                <p className="font-display text-6xl font-bold text-accent mb-6">+82%</p>

                <svg viewBox="0 0 400 200" className="w-full">
                  <defs>
                    <linearGradient id="hsn-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 180 Q 80 175 120 155 T 240 100 T 360 45 L 400 30 L 400 200 L 0 200 Z"
                    fill="url(#hsn-grad)"
                  />
                  <path
                    d="M 0 180 Q 80 175 120 155 T 240 100 T 360 45 L 400 30"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="3"
                  />
                  <circle cx="400" cy="30" r="6" fill="hsl(var(--card))" stroke="hsl(var(--accent))" strokeWidth="3" />
                  <line x1="0" y1="180" x2="400" y2="180" stroke="hsl(var(--border))" strokeWidth="1" />
                  <line x1="0" y1="135" x2="400" y2="135" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="2" />
                  <line x1="0" y1="90" x2="400" y2="90" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="2" />
                  <text x="0" y="195" fill="hsl(var(--muted-foreground))" fontSize="9">Week 0</text>
                  <text x="350" y="195" fill="hsl(var(--muted-foreground))" fontSize="9">Week 12</text>
                  <text x="370" y="20" fill="hsl(var(--primary))" fontSize="10" fontWeight="bold">+82%</text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ============ THIRD-PARTY TESTING ============ */}
        <section className="bg-background py-16">
          <div className="container-wide">
            <div className="bg-card rounded-3xl p-8 lg:p-10 border border-border flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6 flex-1">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <FlaskConical className="h-8 w-8 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold mb-1 text-foreground">
                    Tested. Verified. Clean.
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Every batch of NEUVIE strips is independently third-party tested for purity,
                    potency, and heavy metals — in an FDA-registered, GMP-certified US facility.
                  </p>
                </div>
              </div>
              <Link
                to="/science"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm transition whitespace-nowrap"
              >
                View Test Results
              </Link>
            </div>
          </div>
        </section>

        {/* ============ LIFE-CHANGING BENEFITS ============ */}
        <section className="bg-background py-16">
          <div className="container-wide grid lg:grid-cols-2 gap-10 items-start">
            <div className="aspect-square rounded-3xl overflow-hidden bg-card border border-border relative">
              {images[0] && (
                <img
                  src={optimizeShopifyImage(images[0].node.url, 1000)}
                  alt={`${title} — beauty wellness strip`}
                  className="w-full h-full object-contain p-12"
                  loading="lazy"
                  width={1000}
                  height={1000}
                />
              )}
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider font-semibold">
                Life-Changing Benefits
              </p>
              <h2 className="font-display text-5xl mb-3 text-foreground">
                Become your <span className="italic text-accent">best self</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                One small strip. Three powerhouse beauty nutrients. A ritual that finally fits
                your life — so you can actually stick with it long enough to see the change.
              </p>

              <Accordion type="single" collapsible defaultValue="b0" className="space-y-1">
                {benefits.map((b, i) => (
                  <AccordionItem
                    key={i}
                    value={`b${i}`}
                    className="border-b border-border last:border-b-0"
                  >
                    <AccordionTrigger className="hover:no-underline text-foreground">
                      <span className="font-semibold flex items-center gap-2 text-left">
                        <Plus className="h-4 w-4 text-accent shrink-0" strokeWidth={2} />
                        {b.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                      {b.body}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ============ ALL-IN-ONE ============ */}
        <section className="bg-secondary/30 py-16">
          <div className="container-wide grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display text-4xl lg:text-5xl mb-5 text-balance text-foreground">
                All-in-One Beauty Strip for{' '}
                <span className="italic text-accent">Hair, Skin & Nails</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Three of the most-studied beauty nutrients in one effortless 3-second ritual.
                No stacking capsules, no chalky powders, no swallowing five different pills.
                Just one orange-flavored strip — taken consistently — to support the way you
                look and feel from within.
              </p>
            </div>
            <div className="aspect-square rounded-3xl overflow-hidden relative bg-card border border-border">
              {images[0] && (
                <img
                  src={optimizeShopifyImage(images[0].node.url, 1000)}
                  alt={`${title} packaging`}
                  className="w-full h-full object-contain p-16"
                  loading="lazy"
                  width={1000}
                  height={1000}
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground text-center py-3 text-xs font-bold tracking-widest">
                BIOTIN · FOLATE · VITAMIN D3
              </div>
            </div>
          </div>
        </section>

        {/* ============ A RITUAL THAT FEELS GOOD ============ */}
        <section className="bg-background py-16">
          <div className="container-wide">
            <h2 className="font-display text-4xl lg:text-5xl mb-3 text-balance text-foreground">
              A Ritual That <span className="italic text-accent">Feels Good</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-2xl">
              Skip the bottle of capsules and the daily power struggle. NEUVIE strips are
              designed to be effortless — so consistency finally feels like self-care, not a chore.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-7">
                <h3 className="font-semibold mb-5 flex items-center gap-2 text-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  NEUVIE Hair, Skin & Nails Strips
                </h3>
                <ul className="space-y-3 text-sm">
                  {[
                    'Dissolves in 30 seconds — no water needed',
                    '5,000 mcg Biotin + Folate + D3, clinically dosed',
                    'Light orange flavor — actually pleasant to take',
                    'Travel-friendly: drop a strip, go anywhere',
                  ].map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-foreground">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" strokeWidth={2.5} />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-accent/5 border border-accent/20 rounded-2xl p-7">
                <h3 className="font-semibold mb-5 flex items-center gap-2 text-accent">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  Typical Biotin Capsules
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {[
                    'Hard to swallow, especially on the go',
                    'Often under-dosed or stuffed with fillers',
                    'Easy to forget — bottle hides in a drawer',
                    'Slower absorption through the digestive system',
                  ].map((t, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <X className="h-4 w-4 text-accent mt-0.5 shrink-0" strokeWidth={2.5} />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Button
                onClick={handleMainAdd}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-3.5 h-auto rounded-full font-semibold text-sm transition"
              >
                Try Risk-Free
              </Button>
              <p className="text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                30-Day Money-Back Guarantee
              </p>
            </div>
          </div>
        </section>

        {/* ============ INSIDE THE STRIPS ============ */}
        <section className="bg-secondary/30 py-16">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl lg:text-5xl mb-3 text-foreground">
                Inside the <span className="italic text-accent">Strips</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Three beauty nutrients, precision-dosed. No filler, no shortcuts.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              {ingredients.map((ing, i) => (
                <motion.div
                  key={ing.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-card rounded-2xl p-6 text-center border border-border hover:shadow-soft transition"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Leaf className="h-9 w-9 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">{ing.name}</h3>
                  <p className="text-xs text-accent uppercase tracking-wider font-semibold mb-1">
                    {ing.tag}
                  </p>
                  <p className="text-sm font-semibold text-foreground mb-3">{ing.dose}</p>
                  <p className="text-[13px] text-muted-foreground leading-snug">{ing.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ TASTY + SUPPLEMENT FACTS ============ */}
        <section className="bg-background py-16">
          <div className="container-wide grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="font-display text-4xl lg:text-5xl mb-4 text-balance text-foreground">
                Tasty & <span className="italic text-accent">Effortless</span>
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                A light, natural orange flavor — sweetened with monk fruit and stevia. No chalky
                aftertaste, no bitter pill struggle. Just a 3-second ritual that feels like a treat.
              </p>

              <Accordion type="single" collapsible className="space-y-1">
                <AccordionItem value="ing" className="border-b border-border">
                  <AccordionTrigger className="font-semibold text-sm hover:no-underline text-foreground">
                    Full ingredient list
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground">
                    Biotin (5,000 mcg), Folate as Vitamin B9 (400 mcg), Vitamin D3 as
                    Cholecalciferol (200 mcg), Pullulan, Cellulose, Mannitol, Monk Fruit Extract,
                    Natural Orange Flavor, Malic Acid, Lecithin, Stevia Glycosides.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="howto" className="border-b border-border">
                  <AccordionTrigger className="font-semibold text-sm hover:no-underline text-foreground">
                    How to use
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground">
                    Place one strip on your tongue daily and let it dissolve. No water needed.
                    For visible results, use consistently for 8–12 weeks.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="props" className="border-b border-border">
                  <AccordionTrigger className="font-semibold text-sm hover:no-underline text-foreground">
                    Vegan · Gluten-Free · Non-GMO
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground">
                    Vegan, gluten-free, non-GMO, lactose-free, no added sugar. Made in the USA
                    in an FDA-registered, GMP-certified facility.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Supplement facts panel */}
            <div className="bg-card border-2 border-foreground/80 rounded-2xl p-6">
              <h3 className="font-display text-2xl font-black uppercase border-b-4 border-foreground pb-2 mb-3 text-foreground">
                Supplement Facts
              </h3>
              <p className="text-xs text-muted-foreground mb-1">Serving Size: 1 Strip</p>
              <p className="text-xs text-muted-foreground border-b border-foreground/40 pb-3 mb-3">
                Servings Per Container: 30
              </p>

              <div className="border-b-2 border-foreground/60 pb-1 mb-2 flex justify-between text-xs font-bold text-foreground">
                <span></span>
                <span>Amount Per Serving</span>
              </div>

              {[
                { name: 'Biotin', amount: '5,000 mcg', dv: '16,667%' },
                { name: 'Folate (as Vitamin B9)', amount: '400 mcg DFE', dv: '100%' },
                { name: 'Vitamin D3 (as Cholecalciferol)', amount: '200 mcg', dv: '1,000%' },
              ].map((r) => (
                <div
                  key={r.name}
                  className="flex justify-between border-b border-foreground/15 py-2 text-sm"
                >
                  <span className="font-semibold text-foreground">{r.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-foreground">{r.amount}</span>
                    <span className="font-bold w-16 text-right text-foreground">{r.dv}</span>
                  </div>
                </div>
              ))}

              <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
                % Daily Value (DV) based on a 2,000 calorie diet. Other Ingredients: Pullulan,
                Cellulose, Mannitol, Monk Fruit Extract, Natural Orange Flavor, Malic Acid,
                Lecithin, Stevia Glycosides.
              </p>
              <p className="text-[10px] text-muted-foreground mt-3 italic">
                These statements have not been evaluated by the FDA. This product is not intended
                to diagnose, treat, cure, or prevent any disease.
              </p>
            </div>
          </div>
        </section>

        {/* ============ PACK PICKER ============ */}
        <section className="bg-secondary/30 py-16">
          <div className="container-wide">
            <div className="text-center mb-10">
              <h2 className="font-display text-4xl lg:text-5xl mb-3 text-foreground">
                Choose Your <span className="italic text-accent">Routine</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                The longer you commit, the more you save — and the more visible your results.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {([1, 2, 3] as const).map((p) => {
                const isBest = p === 2;
                return (
                  <div
                    key={p}
                    className={`bg-card rounded-3xl p-6 relative border-2 transition ${
                      isBest ? 'border-primary shadow-elegant' : 'border-border'
                    }`}
                  >
                    {isBest && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                        Best Value
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      {packSavings(p)}% Off
                    </div>

                    <div className="aspect-square mb-4 flex items-center justify-center bg-secondary/40 rounded-2xl p-6">
                      {images[0] && (
                        <img
                          src={optimizeShopifyImage(images[0].node.url, 400)}
                          alt={`${p}-pack of ${title}`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          width={400}
                          height={400}
                        />
                      )}
                    </div>

                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                      Beauty Wellness
                    </p>
                    <h3 className="font-display text-xl font-bold mb-1 text-foreground">
                      Hair, Skin & Nails
                    </h3>
                    <p className="text-[11px] text-muted-foreground mb-4">
                      {p} PACK · {p * 30} STRIPS · {p === 1 ? '1 MONTH' : `${p} MONTHS`}
                    </p>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-xl font-bold text-accent">
                        ${packPrice(p).toFixed(2)}
                      </span>
                      <span className="text-xs text-muted-foreground line-through">
                        ${packOriginal(p).toFixed(2)}
                      </span>
                    </div>

                    <Button
                      onClick={() => handleAdd(p)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-full text-sm transition"
                    >
                      Add to Cart
                      <ShoppingCart className="h-4 w-4 ml-2" strokeWidth={2} />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ EXPERT EVALUATIONS ============ */}
        <section className="bg-background py-16">
          <div className="container-wide max-w-5xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary mb-3">
                <Stethoscope className="h-4 w-4" strokeWidth={2} />
                Expert Reviews
              </div>
              <h2 className="font-display text-4xl lg:text-5xl mb-3 text-foreground">
                Independent Clinician{' '}
                <span className="italic text-accent">Evaluations</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Verified clinicians review NEUVIE formulations independently. They are not
                compensated to submit evaluations.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: 'Dr. Rachel Kim, MD',
                  specialty: 'Dermatology',
                  years: '14',
                  headline: 'A smart, well-dosed daily beauty formula',
                  text:
                    'The combination of 5,000 mcg of Biotin with Folate and Vitamin D3 is a thoughtful, clinically-relevant trio for patients reporting concerns with hair thinning and brittle nails. Sublingual delivery may also help patients who struggle with capsule compliance.',
                  tags: ['Hair Strength', 'Skin Glow', 'Nail Health'],
                },
                {
                  name: 'Dr. Marcus Chen, MD',
                  specialty: 'Internal Medicine',
                  years: '17',
                  headline: 'Convenience that drives consistency',
                  text:
                    'Compliance is the single biggest predictor of supplement outcomes. A pleasant-tasting dissolvable strip removes most of the friction patients cite when stopping a daily routine, which is meaningful for nutrients like Biotin that require sustained use.',
                  tags: ['Daily Routine', 'Compliance', 'Beauty Wellness'],
                },
              ].map((c) => (
                <div
                  key={c.name}
                  className="bg-card rounded-2xl p-6 border border-border grid md:grid-cols-[180px_1fr] gap-6"
                >
                  <div className="text-center">
                    <div className="aspect-square w-28 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <Stethoscope className="h-10 w-10 text-primary" strokeWidth={1.5} />
                    </div>
                    <p className="font-semibold text-sm text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-0.5">
                      <Check className="h-3 w-3 text-primary" strokeWidth={2.5} /> Verified Clinician
                    </p>
                    <div className="mt-3 text-xs text-left">
                      <p className="text-muted-foreground">Specialty</p>
                      <p className="font-semibold text-foreground mb-2">{c.specialty}</p>
                      <p className="text-muted-foreground">Years in practice</p>
                      <p className="font-semibold text-foreground">{c.years}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold mb-3 text-foreground">
                      {c.headline}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.text}</p>
                    <div className="flex flex-wrap gap-2 text-[11px] items-center">
                      <span className="text-muted-foreground">Highlights</span>
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="bg-secondary/60 text-foreground px-2 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CUSTOMER REVIEWS (live Judge.me via existing component) ============ */}
        <div id="reviews">
          <ProductReviews productHandle={product.handle} productTitle={title} />
        </div>

        {/* ============ FAQ ============ */}
        <section className="bg-secondary/30 py-16">
          <div className="container-wide max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="font-display text-4xl lg:text-5xl mb-3 text-foreground">FAQs</h2>
              <p className="text-sm text-muted-foreground">
                Still need help? Email us at{' '}
                <a
                  href="mailto:team@tryneuvie.com"
                  className="text-primary underline underline-offset-2"
                >
                  team@tryneuvie.com
                </a>
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card rounded-xl border border-border px-5"
                >
                  <AccordionTrigger className="text-sm font-semibold hover:no-underline text-left text-foreground">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <StickyAddToCart
        productTitle={title}
        price={packPrice(packSize)}
        originalPrice={packOriginal(packSize)}
        onAddToCart={handleMainAdd}
        isSubscription={false}
        addToCartRef={addToCartRef}
      />

      <Footer />
    </div>
  );
}
