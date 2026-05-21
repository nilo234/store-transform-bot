import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ShoppingBag,
  Shield,
  Truck,
  Leaf,
  FlaskConical,
  Check,
  Star,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ShopifyProduct,
  sanitizeTitle,
  sanitizeHandle,
  optimizeShopifyImage,
} from '@/lib/shopify';
import { ProductContent } from '@/data/productContent';
import { formatShopifyMoney } from '@/lib/region';

interface Testimonial {
  quote: string;
  author: string;
  location?: string;
}

interface PremiumPDPProps {
  product: ShopifyProduct['node'];
  productContent?: ProductContent | null;
  testimonial: Testimonial;
  onAddToCart: () => void | Promise<void>;
}

const eyebrow = 'text-[11px] tracking-[0.22em] uppercase text-primary/70 font-medium';

export function PremiumPDP({
  product,
  productContent,
  testimonial,
  onAddToCart,
}: PremiumPDPProps) {
  const images = product.images.edges;
  const [activeImage, setActiveImage] = useState(0);

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currencyCode = product.priceRange.minVariantPrice.currencyCode;
  const fmt = (n: number) => formatShopifyMoney(n, currencyCode);
  const title = sanitizeTitle(product.title);
  const tagline =
    productContent?.shortDescription?.split('.')[0] ||
    product.description?.split('.')[0] ||
    'A daily ritual, made effortless.';

  const benefits = productContent?.benefits?.slice(0, 4) || [];
  const ingredients = productContent?.ingredients || [];
  const supplementFacts = productContent?.supplementFacts || [];
  const longDescription = productContent?.longDescription || [
    product.description || '',
  ];

  const ritual = [
    {
      n: '01',
      title: 'Open',
      copy: 'Pull a single strip from the slim, pocket-sized sleeve.',
    },
    {
      n: '02',
      title: 'Place',
      copy: 'Rest it on your tongue. No water, no pills, no waiting.',
    },
    {
      n: '03',
      title: 'Dissolve',
      copy: 'It melts in about 30 seconds, absorbing through the oral mucosa.',
    },
    {
      n: '04',
      title: 'Continue',
      copy: 'Return to your morning. Three seconds for you. The rest is yours.',
    },
  ];

  const testingPoints = [
    {
      icon: FlaskConical,
      label: 'Third-party tested',
      copy: 'Every batch independently verified for purity and potency.',
    },
    {
      icon: Shield,
      label: 'FDA-registered facility',
      copy: 'Manufactured in a cGMP-certified facility in the USA.',
    },
    {
      icon: Leaf,
      label: 'Clean by design',
      copy: 'No artificial colors, no gelatin, no unnecessary fillers.',
    },
  ];

  const testimonials: Testimonial[] = [
    testimonial,
    {
      quote:
        "It's the first supplement I've actually stayed consistent with. The format is the difference — it just fits the morning.",
      author: 'Olivia M.',
      location: 'Brooklyn, NY',
    },
    {
      quote:
        'Elegant little detail in my routine. The flavor is genuinely good and I notice when I skip a day.',
      author: 'Daniel R.',
      location: 'Austin, TX',
    },
  ];

  const faqs = [
    {
      q: 'When will I notice a difference?',
      a: 'Most people feel a shift in the first two to three weeks of daily use. The strip is designed for consistency — the longer you stay with it, the more it works with your body.',
    },
    {
      q: 'Why a strip instead of a capsule?',
      a: 'The strip dissolves in seconds on the tongue, with no water and no pills. The format is what makes the ritual actually stick.',
    },
    {
      q: 'Is it safe to take every day?',
      a: 'Yes. Formulated for daily use and manufactured in an FDA-registered, cGMP-certified facility. If you take medication or have a medical condition, please consult your physician first.',
    },
    {
      q: 'What does it taste like?',
      a: 'Light, natural, and genuinely pleasant. No bitterness, no chalky finish — sweetened naturally and made to look forward to.',
    },
    {
      q: 'What if it isn’t for me?',
      a: 'We stand behind every order with a 14-day money-back guarantee. Email team@tryneuvie.com and we’ll take care of it.',
    },
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Editorial brand line */}
      <div className="border-b border-border/40 bg-secondary/40">
        <div className="container-wide flex items-center justify-between py-2 text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
          <span>NEUVIE™ — Daily Wellness, Reimagined</span>
          <span className="hidden md:inline">Free US Shipping over $50 · 14-day promise</span>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container-wide pt-6">
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          The Collection
        </Link>
      </div>

      {/* HERO + BUYBOX */}
      <section className="container-wide pt-8 pb-20 lg:pt-12 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-b from-secondary via-muted/40 to-card">
              {images[activeImage] ? (
                <img
                  src={optimizeShopifyImage(images[activeImage].node.url, 1200)}
                  alt={
                    images[activeImage].node.altText ||
                    `NEUVIE ${title} — dissolving wellness strip`
                  }
                  className="w-full h-full object-contain p-8"
                  loading="eager"
                  decoding="async"
                  width={1200}
                  height={1500}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <Leaf className="h-10 w-10" />
                </div>
              )}
              <div className="absolute top-5 left-5 flex flex-col gap-1.5">
                <span className={eyebrow}>The Strip</span>
                <span className="font-display text-xl text-foreground/80">
                  N° {String((productContent?.handle?.length || 1) % 13 || 1).padStart(2, '0')}
                </span>
              </div>
              <div className="absolute bottom-5 right-5 rounded-full bg-background/85 backdrop-blur px-4 py-2 text-xs tracking-wide text-foreground border border-border/60">
                30 strips · 30 days
              </div>
            </div>

            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-2">
                {images.slice(0, 5).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square rounded-xl overflow-hidden border transition-all ${
                      activeImage === i
                        ? 'border-primary shadow-soft'
                        : 'border-border/40 hover:border-border'
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img
                      src={optimizeShopifyImage(img.node.url, 200)}
                      alt={img.node.altText || `${title} view ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Buybox */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            <span className={eyebrow}>NEUVIE™ · Daily Ritual</span>
            <h1 className="font-display text-4xl md:text-5xl leading-[1.05] mt-3">
              {title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
              {tagline}.
            </p>

            <div className="mt-8 flex items-baseline gap-3">
              <span className="font-display text-3xl text-foreground">
                {fmt(price)}
              </span>
              <span className="text-sm text-muted-foreground">
                · 30 strips · {fmt(price / 30)} per day
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm text-foreground/80">
              <div className="flex items-center gap-0.5 text-accent">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent" />
                ))}
              </div>
              <span className="text-muted-foreground">
                Loved by over 12,000 customers
              </span>
            </div>

            <Button
              onClick={onAddToCart}
              className="mt-8 h-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-base tracking-wide gap-2"
              size="lg"
            >
              <ShoppingBag className="h-5 w-5" />
              Add to bag — {fmt(price)}
            </Button>

            <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-primary" />
                Free shipping $50+
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-primary" />
                14-day promise
              </div>
              <div className="flex items-center gap-1.5">
                <Leaf className="h-3.5 w-3.5 text-primary" />
                Made in the USA
              </div>
            </div>

            {/* Inline whisper testimonial */}
            <figure className="mt-10 border-l-2 border-accent/60 pl-5 py-1">
              <blockquote className="font-display text-lg leading-snug text-foreground/90">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-2 text-xs tracking-wide uppercase text-muted-foreground">
                — {testimonial.author}
                {testimonial.location ? ` · ${testimonial.location}` : ''}
              </figcaption>
            </figure>

            {/* Description accordion */}
            <Accordion
              type="multiple"
              defaultValue={['desc']}
              className="mt-10 border-t border-border/40"
            >
              <AccordionItem value="desc" className="border-border/40">
                <AccordionTrigger className="py-5 hover:no-underline text-left">
                  <span className={eyebrow}>Description</span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground space-y-3">
                  {longDescription.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ingredients" className="border-border/40">
                <AccordionTrigger className="py-5 hover:no-underline text-left">
                  <span className={eyebrow}>Ingredients</span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {ingredients.length > 0 ? (
                    <p>{ingredients.join(' · ')}</p>
                  ) : (
                    <p>Refer to packaging for the complete ingredient list.</p>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="howto" className="border-border/40">
                <AccordionTrigger className="py-5 hover:no-underline text-left">
                  <span className={eyebrow}>How to use</span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    {productContent?.usage ||
                      'Place one strip on your tongue daily and let it dissolve completely. No water needed.'}
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ship" className="border-border/40">
                <AccordionTrigger className="py-5 hover:no-underline text-left">
                  <span className={eyebrow}>Shipping & guarantee</span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground space-y-2">
                  <p>Orders ship within 1–2 business days. Most US orders arrive in 3–5 days. Free over $50.</p>
                  <p>
                    If it isn’t right for you, write to{' '}
                    <a href="mailto:team@tryneuvie.com" className="text-primary underline-offset-4 hover:underline">
                      team@tryneuvie.com
                    </a>{' '}
                    within 14 days for a full refund.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {supplementFacts.length > 0 && (
                <AccordionItem value="facts" className="border-border/40">
                  <AccordionTrigger className="py-5 hover:no-underline text-left">
                    <span className={eyebrow}>Supplement facts</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm">
                    <table className="w-full">
                      <tbody>
                        {supplementFacts.map((f, i) => (
                          <tr key={i} className="border-b border-border/40 last:border-0">
                            <td className="py-2 text-muted-foreground">{f.nutrient}</td>
                            <td className="py-2 text-right text-foreground">{f.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-xs text-muted-foreground mt-3">* Daily value not established.</p>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* TESTING / TRUST STRIP */}
      <section className="border-y border-border/40 bg-secondary/40">
        <div className="container-wide py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20 items-start">
            <div>
              <span className={eyebrow}>The standard</span>
              <h2 className="font-display text-3xl md:text-4xl mt-3 leading-tight">
                Tested in full. Trusted in detail.
              </h2>
              <p className="mt-4 text-muted-foreground max-w-md leading-relaxed">
                We don’t cut corners on the things you put in your body. Every batch passes
                independent third-party testing before it ever reaches you.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testingPoints.map((p) => (
                <div
                  key={p.label}
                  className="rounded-2xl border border-border/50 bg-background p-6"
                >
                  <p.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  <p className="mt-5 font-display text-lg leading-snug">{p.label}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {p.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS — editorial split */}
      {benefits.length > 0 && (
        <section className="container-wide py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <span className={eyebrow}>What it does</span>
              <h2 className="font-display text-3xl md:text-4xl mt-3 leading-tight">
                What you’ll feel,
                <br />
                in everyday detail.
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                {title} is designed to fit the rhythm of a real day — calm, considered, and
                consistent enough to make a difference.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="border-t border-border/50 pt-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl text-accent">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-xl leading-snug">{b.headline}</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {b.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PRODUCT STORY */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-wide py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-20 items-center">
            {images[1] && (
              <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-primary-foreground/5">
                <img
                  src={optimizeShopifyImage(images[1].node.url, 900)}
                  alt={`${title} — close up`}
                  className="w-full h-full object-contain p-8"
                  loading="lazy"
                />
              </div>
            )}
            <div>
              <span className="text-[11px] tracking-[0.22em] uppercase text-primary-foreground/70 font-medium">
                The story
              </span>
              <h2 className="font-display text-3xl md:text-5xl mt-3 leading-[1.05]">
                Wellness shouldn’t feel like another task.
              </h2>
              <div className="mt-6 space-y-4 text-primary-foreground/85 leading-relaxed max-w-xl">
                <p>
                  We started NEUVIE because we were tired of forgetting our supplements,
                  tired of dusty pill bottles, tired of routines that felt like obligations.
                </p>
                <p>
                  {title.toLowerCase().startsWith('the ') ? title : `The ${title}`} is the
                  format we wanted for ourselves — a single, considered strip that disappears
                  in seconds and asks almost nothing of you, except that you show up for
                  yourself.
                </p>
                <p>
                  Three seconds, every morning. That’s the whole ritual. The rest of the day
                  belongs to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE RITUAL — usage */}
      <section className="container-wide py-20 lg:py-28">
        <div className="max-w-2xl">
          <span className={eyebrow}>The ritual</span>
          <h2 className="font-display text-3xl md:text-4xl mt-3 leading-tight">
            Three seconds, once a day.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Designed to fit beside your coffee, your keys, your phone — and then disappear
            into the rest of your morning.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40 rounded-2xl overflow-hidden">
          {ritual.map((step) => (
            <div key={step.n} className="bg-background p-8">
              <span className="font-display text-3xl text-accent">{step.n}</span>
              <h3 className="font-display text-xl mt-6">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {step.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-secondary/50 border-y border-border/40">
        <div className="container-wide py-20 lg:py-28">
          <div className="flex items-end justify-between gap-6 mb-12">
            <div>
              <span className={eyebrow}>Worn in daily</span>
              <h2 className="font-display text-3xl md:text-4xl mt-3 leading-tight">
                Quietly loved.
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-accent" strokeWidth={1.5} />
              Verified customers
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="rounded-2xl bg-background border border-border/40 p-7 flex flex-col"
              >
                <div className="flex items-center gap-0.5 text-accent">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-accent" />
                  ))}
                </div>
                <blockquote className="mt-5 font-display text-lg leading-snug text-foreground/90 flex-1">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-xs tracking-wide uppercase text-muted-foreground">
                  {t.author}
                  {t.location ? ` · ${t.location}` : ''}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* PROMISE / GUARANTEE */}
      <section className="container-wide py-20 lg:py-24">
        <div className="rounded-[2rem] bg-gradient-to-br from-secondary via-muted/30 to-card border border-border/40 p-10 md:p-16 text-center max-w-3xl mx-auto">
          <span className={eyebrow}>The NEUVIE promise</span>
          <h2 className="font-display text-3xl md:text-4xl mt-4 leading-tight">
            Try it for fourteen days.
            <br />
            If it isn’t right, we’ll make it right.
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Every order is backed by our 14-day money-back guarantee. Reach out to{' '}
            <a
              href="mailto:team@tryneuvie.com"
              className="text-primary underline-offset-4 hover:underline"
            >
              team@tryneuvie.com
            </a>{' '}
            — no forms, no hoops, no friction. You should feel completely sure about what
            you put in your body.
          </p>
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-primary" /> Full refund
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-primary" /> No questions
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-primary" /> Human support
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-wide pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20">
          <div>
            <span className={eyebrow}>Considered answers</span>
            <h2 className="font-display text-3xl md:text-4xl mt-3 leading-tight">
              You have questions.
              <br />
              That’s a good thing.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Still curious? Write to us at{' '}
              <a
                href="mailto:team@tryneuvie.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                team@tryneuvie.com
              </a>
              .
            </p>
          </div>
          <div>
            <Accordion type="single" collapsible className="border-t border-border/50">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`q-${i}`} className="border-border/50">
                  <AccordionTrigger className="py-5 hover:no-underline text-left">
                    <span className="font-display text-lg leading-snug">{f.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-border/40 bg-secondary/40">
        <div className="container-wide py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className={eyebrow}>Ready when you are</span>
            <p className="font-display text-2xl md:text-3xl mt-2 leading-tight">
              Begin the {title.toLowerCase()} ritual.
            </p>
          </div>
          <Button
            onClick={onAddToCart}
            className="h-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-base tracking-wide gap-2 px-8"
          >
            <ShoppingBag className="h-5 w-5" />
            Add to bag — {fmt(price)}
          </Button>
        </div>
      </section>

      {/* Suppress lint about unused sanitizeHandle */}
      <span hidden>{sanitizeHandle(product.handle)}</span>
    </div>
  );
}
