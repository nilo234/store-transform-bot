// Drop PDP template — mirrors StripPDPTemplate 1:1 in section structure
// but driven by local DropProduct + DropPDPExtras data.
// CTA = "Notify Me When Available" (drops aren't in Shopify yet).

import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star,
  ShoppingCart,
  Truck,
  ShieldCheck,
  Check,
  X,
  Sparkles,
  FlaskConical,
  Flag,
  Award,
  Stethoscope,
  Plus,
  Minus,
  Wheat,
  Leaf,
  Calendar,
  ArrowRight,
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
import { toast } from 'sonner';
import type { DropProduct } from '@/data/dropsProducts';
import type { DropPDPExtras } from '@/data/dropsPDPExtras';

const SINGLE_PRICE = 24.99;
const ORIGINAL_PRICE = 39.99;

interface Props {
  product: DropProduct;
  extras: DropPDPExtras;
}

export function DropPDPTemplate({ product, extras }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [packSize, setPackSize] = useState<1 | 2 | 3>(1);
  const addToCartRef = useRef<HTMLDivElement>(null);

  const title = product.name;

  const packPrice = (pack: 1 | 2 | 3) => {
    const base = SINGLE_PRICE * pack;
    if (pack === 2) return +(base * 0.9).toFixed(2);
    if (pack === 3) return +(base * 0.8).toFixed(2);
    return +base.toFixed(2);
  };
  const packOriginal = (pack: 1 | 2 | 3) => +(ORIGINAL_PRICE * pack).toFixed(2);
  const packSavings = (pack: 1 | 2 | 3) =>
    Math.round(((packOriginal(pack) - packPrice(pack)) / packOriginal(pack)) * 100);

  const handleNotify = () => {
    toast.success("You're on the list!", {
      description: `We'll email you the moment ${product.shortName} goes live (${packSize}-Bottle, qty ${quantity}).`,
      position: 'top-center',
    });
  };

  const matchSlug = product.slug;

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
                <div className="absolute top-5 left-5 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md z-10">
                  Coming Soon
                </div>
                <div className="absolute top-5 right-5 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md z-10">
                  Save {packSavings(packSize)}% Today
                </div>

                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="w-full h-full object-contain p-8"
                  loading="eager"
                  fetchPriority="high"
                  width={900}
                  height={900}
                />

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold tracking-wider px-3 py-1.5 rounded whitespace-nowrap">
                  {extras.bottomFlavorBadge}
                </div>
              </motion.div>
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
                <span className="text-muted-foreground">{extras.reviewCount}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">10,000+ happy customers</span>
              </div>

              <p className="text-muted-foreground text-sm font-medium mb-1">{product.category}</p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-3 text-foreground">
                {extras.headlineMain}
                {extras.headlineSuffix && <> <span className="italic text-accent">{extras.headlineSuffix}</span></>}
                <span className="text-accent">.</span>
              </h1>
              <p className="text-muted-foreground text-sm mb-6">{extras.subtitle}</p>

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
                    <p className="font-bold text-sm">{p}-Bottle</p>
                    <p className="text-[11px] text-muted-foreground">
                      {p === 1 ? '1 month' : `${p} months`}
                    </p>
                    <p className="text-sm font-semibold text-accent mt-1">
                      ${packPrice(p).toFixed(2)}
                    </p>
                  </button>
                ))}
              </div>

              {/* Quantity + CTA */}
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
                    onClick={handleNotify}
                    className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-wide shadow-lg whitespace-nowrap"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" strokeWidth={2} />
                    Notify Me When Available
                  </Button>
                </div>
              </div>

              {/* Here's what you'll get */}
              <div className="border-2 border-primary/20 bg-primary/5 rounded-xl p-5 mb-3">
                <h4 className="font-semibold text-sm mb-3 text-foreground">Here’s what you’ll get:</h4>
                <ul className="space-y-2.5">
                  {[
                    { icon: Sparkles, text: `${packSize} bottle${packSize > 1 ? 's' : ''} — ${packSize === 1 ? '1 month supply' : `${packSize} months supply`} (${product.size} each)` },
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
                    Fast 3–5 day<br />US delivery
                  </span>
                </div>
                <div className="bg-card border border-border rounded-xl px-3 py-2.5 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0" strokeWidth={1.75} />
                  <span className="text-[11px] font-semibold leading-tight text-foreground">
                    30-day money<br />back guarantee
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center mb-5 italic">
                For best results, use consistently for 4–12 weeks.
              </p>

              {/* Mini testimonial */}
              <div className="bg-card rounded-2xl p-5 border border-border mb-6">
                <div className="flex items-center gap-0.5 text-accent mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent" strokeWidth={1.5} />
                  ))}
                </div>
                <p className="italic text-[14px] text-foreground leading-relaxed mb-3">
                  “{extras.reviewsTeaser.quote}”
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
                    {extras.reviewsTeaser.author.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">{extras.reviewsTeaser.author}</p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Check className="h-3 w-3 text-primary" strokeWidth={2.5} /> Verified Buyer
                    </p>
                  </div>
                </div>
              </div>

              {/* Description tabs */}
              <Accordion type="multiple" defaultValue={['description']} className="space-y-2">
                <AccordionItem value="description" className="bg-card rounded-xl border border-border px-4">
                  <AccordionTrigger className="py-4 hover:no-underline font-semibold text-sm">Description</AccordionTrigger>
                  <AccordionContent className="pb-4 text-[13px] text-muted-foreground leading-relaxed">
                    {product.shortDescription}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="ingredients" className="bg-card rounded-xl border border-border px-4">
                  <AccordionTrigger className="py-4 hover:no-underline font-semibold text-sm">Ingredients</AccordionTrigger>
                  <AccordionContent className="pb-4 text-[13px] text-muted-foreground leading-relaxed">
                    {product.ingredientsList}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping" className="bg-card rounded-xl border border-border px-4">
                  <AccordionTrigger className="py-4 hover:no-underline font-semibold text-sm">Shipping & Guarantee</AccordionTrigger>
                  <AccordionContent className="pb-4 text-[13px] text-muted-foreground leading-relaxed">
                    Ships within 1 business day. Free US shipping on orders $50+. Most orders arrive in 3–5 business days. 30-day money-back guarantee on your first order.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* ============ CLINICAL RESULTS ============ */}
        <section className="bg-secondary/30 py-14 sm:py-20">
          <div className="container-wide">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl mb-12 max-w-3xl text-balance text-foreground"
            >
              {extras.clinicalH2A}{' '}
              <span className="italic text-accent">{extras.clinicalH2B}</span>*
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Self-reported results</p>
                <p className="text-xs text-muted-foreground mb-8">% of users</p>

                <div className="space-y-6">
                  {extras.clinicalStats.map((s, i) => (
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
                        <span className="font-display font-bold text-lg text-primary">{s.value}%</span>
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

                <p className="text-[10px] text-muted-foreground mt-8">{extras.clinicalFootnote}</p>
              </div>

              <div className="bg-card rounded-3xl p-8 border border-border">
                <p className="text-sm font-semibold mb-2 text-foreground">In the first weeks,</p>
                <p className="text-sm mb-1 text-foreground">{extras.highlightLead}</p>
                <p className="font-display text-6xl font-bold text-accent mb-6">{extras.highlightValue}</p>

                <svg viewBox="0 0 400 200" className="w-full">
                  <defs>
                    <linearGradient id={`grad-${matchSlug}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 180 Q 80 175 120 155 T 240 100 T 360 45 L 400 30 L 400 200 L 0 200 Z"
                    fill={`url(#grad-${matchSlug})`}
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
                  <text x="360" y="20" fill="hsl(var(--primary))" fontSize="10" fontWeight="bold">{extras.highlightValue}</text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ============ THIRD-PARTY TESTING ============ */}
        <section className="bg-background py-12 sm:py-16">
          <div className="container-wide">
            <div className="bg-card rounded-3xl p-8 lg:p-10 border border-border flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6 flex-1">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <FlaskConical className="h-8 w-8 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold mb-1 text-foreground">Tested. Verified. Clean.</h3>
                  <p className="text-sm text-muted-foreground">
                    Every batch of NEUVIE drops is independently third-party tested for purity, potency, and heavy metals — in an FDA-registered, GMP-certified US facility.
                  </p>
                </div>
              </div>
              <Link to="/science" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm transition whitespace-nowrap">
                View Test Results
              </Link>
            </div>
          </div>
        </section>

        {/* ============ LIFE-CHANGING BENEFITS ============ */}
        <section className="bg-background py-12 sm:py-16">
          <div className="container-wide grid lg:grid-cols-2 gap-10 items-start">
            <div className="aspect-square rounded-3xl overflow-hidden bg-card border border-border relative">
              <img
                src={product.image}
                alt={`${product.name} — daily wellness drop`}
                className="w-full h-full object-contain p-12"
                loading="lazy"
                width={1000}
                height={1000}
              />
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider font-semibold">
                {extras.benefitsKicker}
              </p>
              <h2 className="font-display text-5xl mb-3 text-foreground">
                {extras.benefitsH2A} <span className="italic text-accent">{extras.benefitsH2B}</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">{extras.benefitsLead}</p>

              <Accordion type="single" collapsible defaultValue="b0" className="space-y-1">
                {product.benefits.map((b, i) => (
                  <AccordionItem key={i} value={`b${i}`} className="border-b border-border last:border-b-0">
                    <AccordionTrigger className="hover:no-underline text-foreground">
                      <span className="font-semibold flex items-center gap-2 text-left">
                        <Plus className="h-4 w-4 text-accent shrink-0" strokeWidth={2} />
                        {b.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{b.body}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ============ ALL-IN-ONE ============ */}
        <section className="bg-secondary/30 py-12 sm:py-16">
          <div className="container-wide grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-5 text-balance text-foreground">
                {extras.allInOneH2A} <span className="italic text-accent">{extras.allInOneH2B}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">{extras.allInOneBody}</p>
            </div>
            <div className="aspect-square rounded-3xl overflow-hidden relative bg-card border border-border">
              <img
                src={product.image}
                alt={`${product.name} bottle`}
                className="w-full h-full object-contain p-16"
                loading="lazy"
                width={1000}
                height={1000}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground text-center py-3 text-xs font-bold tracking-widest">
                {extras.bandIngredients}
              </div>
            </div>
          </div>
        </section>

        {/* ============ RITUAL THAT FEELS GOOD ============ */}
        <section className="bg-background py-12 sm:py-16">
          <div className="container-wide">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-3 text-balance text-foreground">
              A Ritual That <span className="italic text-accent">Feels Good</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-2xl">{extras.ritualLead}</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-7">
                <h3 className="font-semibold mb-5 flex items-center gap-2 text-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  NEUVIE {title}
                </h3>
                <ul className="space-y-3 text-sm">
                  {extras.pros.map((t, i) => (
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
                  {extras.competitorName}
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {extras.cons.map((t, i) => (
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
                onClick={handleNotify}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-3.5 h-auto rounded-full font-semibold text-sm transition"
              >
                Notify Me When Available
              </Button>
              <p className="text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                30-Day Money-Back Guarantee
              </p>
            </div>
          </div>
        </section>

        {/* ============ INSIDE THE DROPS ============ */}
        <section className="bg-secondary/30 py-12 sm:py-16">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-3 text-foreground">
                Inside the <span className="italic text-accent">Drops</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{extras.insideLead}</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
              {extras.ingredients.map((ing, i) => (
                <motion.div
                  key={ing.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-card rounded-2xl p-5 sm:p-6 text-center border border-border hover:shadow-soft transition"
                >
                  <div className="aspect-square w-full max-w-[180px] mx-auto rounded-2xl overflow-hidden bg-secondary/40 mb-4">
                    <img
                      src={ing.image}
                      alt={`${ing.name} — natural source`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={400}
                      height={400}
                    />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">{ing.name}</h3>
                  <p className="text-xs text-accent uppercase tracking-wider font-semibold mb-1">{ing.tag}</p>
                  <p className="text-sm font-semibold text-foreground mb-3">{ing.dose}</p>
                  <p className="text-[13px] text-muted-foreground leading-snug">{ing.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ TASTY + SUPPLEMENT FACTS ============ */}
        <section className="bg-background py-12 sm:py-16">
          <div className="container-wide grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-4 text-balance text-foreground">
                Easy & <span className="italic text-accent">Effortless</span>
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">{extras.tastyBody}</p>

              <Accordion type="single" collapsible className="space-y-1">
                <AccordionItem value="ing" className="border-b border-border">
                  <AccordionTrigger className="font-semibold text-sm hover:no-underline text-foreground">Full ingredient list</AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground">{product.ingredientsList}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="howto" className="border-b border-border">
                  <AccordionTrigger className="font-semibold text-sm hover:no-underline text-foreground">How to use</AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground">{product.usage}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="props" className="border-b border-border">
                  <AccordionTrigger className="font-semibold text-sm hover:no-underline text-foreground">Vegan · Gluten-Free · Non-GMO</AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground">{extras.propsText}</AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-8 grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[
                  { icon: Wheat, label: 'Gluten Free' },
                  { icon: Leaf, label: 'Plant Based' },
                  { icon: Sparkles, label: 'Liquid Format' },
                  { icon: FlaskConical, label: 'Third-Party Tested' },
                  { icon: Award, label: 'GMP Certified' },
                  { icon: Calendar, label: '30-Day Supply' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center text-center gap-1.5 bg-card border border-border rounded-xl p-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                    </div>
                    <span className="text-[10px] font-semibold leading-tight text-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border-2 border-foreground/80 rounded-2xl p-6">
              <h3 className="font-display text-2xl font-black uppercase border-b-4 border-foreground pb-2 mb-3 text-foreground">Supplement Facts</h3>
              <p className="text-xs text-muted-foreground mb-1">Serving Size: {extras.servingSize}</p>
              <p className="text-xs text-muted-foreground border-b border-foreground/40 pb-3 mb-3">Servings Per Container: {extras.servingsPerContainer}</p>

              <div className="border-b-2 border-foreground/60 pb-1 mb-2 flex justify-between text-xs font-bold text-foreground">
                <span></span>
                <span>Amount Per Serving</span>
              </div>

              {extras.supplementFacts.map((r, i) => (
                <div key={i} className="flex justify-between border-b border-foreground/15 py-2 text-sm">
                  <span className="font-semibold text-foreground">{r.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-foreground">{r.amount}</span>
                    <span className="font-bold w-10 text-right text-foreground">{r.dv}</span>
                  </div>
                </div>
              ))}

              <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
                † Daily Value not established. Other Ingredients: see full ingredient list above.
              </p>
              <p className="text-[10px] text-muted-foreground mt-3 italic">
                These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
              </p>
            </div>
          </div>
        </section>

        {/* ============ EXPERT EVALUATIONS ============ */}
        <section className="bg-background py-12 sm:py-16">
          <div className="container-wide max-w-5xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary mb-3">
                <Stethoscope className="h-4 w-4" strokeWidth={2} />
                Expert Reviews
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-3 text-foreground">
                Independent Clinician <span className="italic text-accent">Evaluations</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Verified clinicians review NEUVIE formulations independently. They are not compensated to submit evaluations.
              </p>
            </div>

            <div className="space-y-4">
              {extras.doctors.map((c) => (
                <div key={c.name} className="bg-card rounded-2xl p-5 sm:p-6 border border-border grid md:grid-cols-[180px_1fr] gap-5 sm:gap-6">
                  <div className="text-center">
                    <div className="aspect-square w-24 sm:w-28 mx-auto rounded-full overflow-hidden bg-primary/10 mb-3">
                      <img src={c.image} alt={`Portrait of ${c.name}`} className="w-full h-full object-cover" loading="lazy" width={256} height={256} />
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
                    <h3 className="font-display text-lg sm:text-xl font-bold mb-3 text-foreground">{c.headline}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.text}</p>
                    <div className="flex flex-wrap gap-2 text-[11px] items-center mb-4">
                      <span className="text-muted-foreground">Highlights</span>
                      {c.tags.map((t) => (
                        <span key={t} className="bg-secondary/60 text-foreground px-2 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                    <Link to="/science" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition">
                      Read the science behind this formula
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ DON'T TAKE OUR WORD ============ */}
        <section className="bg-secondary/30 py-14 sm:py-20">
          <div className="container-wide">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-3 text-foreground text-balance">
                Don’t Take Our <span className="italic text-accent">Word</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                Over 10,000 customers have made NEUVIE part of their daily ritual.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" id="reviews">
              {extras.testimonials.map((t, i) => (
                <motion.div
                  key={t.author}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card rounded-2xl border border-border shadow-soft flex flex-col"
                >
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-0.5 text-accent mb-3">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="h-4 w-4 fill-accent" strokeWidth={1.5} />
                      ))}
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold mb-2 text-foreground leading-snug">{t.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{t.quote}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-sm font-semibold text-foreground">{t.author}</span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-primary font-semibold">
                        <Check className="h-3 w-3" strokeWidth={2.5} />
                        Verified Buyer
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="bg-secondary/30 py-12 sm:py-16">
          <div className="container-wide max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-3 text-foreground">FAQs</h2>
              <p className="text-sm text-muted-foreground">
                Still need help? Email us at{' '}
                <a href="mailto:team@tryneuvie.com" className="text-primary underline underline-offset-2">team@tryneuvie.com</a>
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-2">
              {product.faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-5">
                  <AccordionTrigger className="text-sm font-semibold hover:no-underline text-left text-foreground">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
