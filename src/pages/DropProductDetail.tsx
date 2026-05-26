import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Minus, Plus, ShoppingCart, Truck, ShieldCheck, Leaf, Flag, Check } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PageMeta, BreadcrumbJsonLd } from '@/components/seo';
import { GuaranteeSection } from '@/components/product/GuaranteeSection';
import { toast } from 'sonner';
import { getDropProduct, type DropProduct } from '@/data/dropsProducts';

interface JsonLdProps {
  product: DropProduct;
}

function DropProductJsonLd({ product }: JsonLdProps) {
  useEffect(() => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.shortDescription,
      image: [`https://tryneuvie.com${product.image}`],
      brand: { '@type': 'Brand', name: 'Neuvie' },
      sku: product.slug,
      mpn: product.slug,
      category: product.category,
      offers: {
        '@type': 'Offer',
        url: `https://tryneuvie.com/drops/${product.slug}`,
        priceCurrency: 'USD',
        price: product.price.toFixed(2),
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        availability: 'https://schema.org/PreOrder',
        seller: { '@type': 'Organization', name: 'Neuvie' },
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 30,
          returnMethod: 'https://schema.org/ReturnByMail',
          returnFees: 'https://schema.org/FreeReturn',
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'USD' },
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'US' },
        },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '124',
        bestRating: '5',
        worstRating: '1',
      },
    };
    const id = `jsonld-drop-${product.slug}`;
    document.querySelector(`script[data-jsonld="${id}"]`)?.remove();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-jsonld', id);
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => document.querySelector(`script[data-jsonld="${id}"]`)?.remove();
  }, [product]);
  return null;
}

export default function DropProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getDropProduct(slug) : undefined;
  const [quantity, setQuantity] = useState(1);

  if (!product) return <Navigate to="/shop" replace />;

  const breadcrumb = [
    { name: 'Home', url: 'https://tryneuvie.com' },
    { name: 'Shop', url: 'https://tryneuvie.com/shop' },
    { name: product.name, url: `https://tryneuvie.com/drops/${product.slug}` },
  ];

  const handleNotify = () => {
    toast.success("You're on the list!", {
      description: `We'll email you the moment ${product.shortName} goes live.`,
      position: 'top-center',
    });
  };

  const savings = (product.comparePrice - product.price).toFixed(2);

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta
        title={product.seoTitle}
        description={product.metaDescription}
        ogType="product"
        ogImage={`https://tryneuvie.com${product.image}`}
      />
      <DropProductJsonLd product={product} />
      <BreadcrumbJsonLd items={breadcrumb} />

      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container-wide py-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>

        {/* Hero / Buybox */}
        <section className="container-wide pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-3xl border border-border/50 overflow-hidden shadow-soft relative"
            >
              <div className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground text-[11px] font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full">
                Coming Soon
              </div>
              <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
                Save ${savings}
              </div>
              <img
                src={product.image}
                alt={product.imageAlt}
                className="w-full h-full object-contain aspect-square"
                width={1024}
                height={1024}
                loading="eager"
                fetchPriority="high"
              />
            </motion.div>

            {/* Buybox */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
                {product.category}
              </p>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-3" style={{ letterSpacing: '-0.02em' }}>
                {product.name}
              </h1>
              <p className="text-muted-foreground mb-6">{product.tagline}</p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-display text-3xl text-foreground">${product.price.toFixed(2)}</span>
                <span className="text-muted-foreground line-through">${product.comparePrice.toFixed(2)}</span>
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                  Save ${savings}
                </span>
              </div>

              <p className="text-foreground/85 leading-relaxed mb-6">{product.shortDescription}</p>

              {/* Bullets */}
              <ul className="space-y-2 mb-8">
                {product.benefits.slice(0, 4).map((b) => (
                  <li key={b.title} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/85">
                      <span className="font-semibold text-foreground">{b.title}</span> — {b.body}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Qty + CTA */}
              <div className="flex items-stretch gap-3 mb-4">
                <div className="flex items-center border border-border rounded-xl bg-card">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-12 h-14 flex items-center justify-center text-muted-foreground hover:text-foreground"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-semibold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-12 h-14 flex items-center justify-center text-muted-foreground hover:text-foreground"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Button
                  onClick={handleNotify}
                  className="h-14 flex-1 text-sm font-semibold whitespace-nowrap"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Notify Me When Available
                </Button>
              </div>

              {/* Trust row */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-6 border-t border-border">
                <div className="flex flex-col items-center text-center gap-1.5">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="text-[11px] text-muted-foreground">Free US shipping $50+</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="text-[11px] text-muted-foreground">30-day money back</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <Flag className="h-5 w-5 text-primary" />
                  <span className="text-[11px] text-muted-foreground">Made in USA</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Long description */}
        <section className="bg-secondary/30 py-16">
          <div className="container-wide max-w-4xl">
            <h2 className="font-display text-2xl md:text-3xl mb-6" style={{ letterSpacing: '-0.02em' }}>
              Why {product.shortName}
            </h2>
            <div className="space-y-4 text-foreground/85 leading-relaxed">
              {product.longDescription.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Key ingredients */}
        <section className="py-16">
          <div className="container-wide max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl md:text-3xl mb-3" style={{ letterSpacing: '-0.02em' }}>
                What's inside — and why it matters
              </h2>
              <p className="text-muted-foreground">Every ingredient is here for a reason. No fillers. No fluff.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.keyIngredients.map((ing) => (
                <div
                  key={ing.name}
                  className="bg-card rounded-2xl p-6 border border-border shadow-soft"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-primary bg-primary/10 px-2 py-1 rounded-full">
                      Key Ingredient
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Leaf className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{ing.name}</h3>
                  <p className="text-sm text-muted-foreground">{ing.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Details accordion */}
        <section className="bg-secondary/30 py-16">
          <div className="container-wide max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl mb-6 text-center" style={{ letterSpacing: '-0.02em' }}>
              Product details
            </h2>
            <Accordion type="single" collapsible className="bg-card rounded-2xl border border-border shadow-soft px-6">
              <AccordionItem value="usage" className="border-border">
                <AccordionTrigger className="font-semibold">Suggested Use</AccordionTrigger>
                <AccordionContent className="text-foreground/85 leading-relaxed">{product.usage}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="ingredients" className="border-border">
                <AccordionTrigger className="font-semibold">Full Ingredients</AccordionTrigger>
                <AccordionContent className="text-foreground/85 leading-relaxed text-sm">
                  {product.ingredientsList}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="size" className="border-border">
                <AccordionTrigger className="font-semibold">Size & Weight</AccordionTrigger>
                <AccordionContent className="text-foreground/85 leading-relaxed text-sm">
                  <p><strong>Amount:</strong> {product.size}</p>
                  <p><strong>Gross weight:</strong> {product.weight}</p>
                  <p><strong>Manufactured in:</strong> USA</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="caution" className="border-border">
                <AccordionTrigger className="font-semibold">Caution & Warnings</AccordionTrigger>
                <AccordionContent className="text-foreground/85 leading-relaxed text-sm space-y-2">
                  <p>{product.caution}</p>
                  <p>{product.warning}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="disclaimer" className="border-none">
                <AccordionTrigger className="font-semibold">FDA Disclaimer</AccordionTrigger>
                <AccordionContent className="text-muted-foreground italic text-sm">
                  {product.disclaimer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16">
          <div className="container-wide max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl mb-8 text-center" style={{ letterSpacing: '-0.02em' }}>
              Frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {product.faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card rounded-2xl border border-border shadow-soft px-6"
                >
                  <AccordionTrigger className="font-semibold text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-foreground/85 leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <GuaranteeSection />
      </main>

      <Footer />
    </div>
  );
}
