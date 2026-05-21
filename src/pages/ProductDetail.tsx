import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingCart, ChevronLeft, Check, Truck, Shield, RotateCcw, Leaf } from 'lucide-react';
import { StickyAddToCart } from '@/components/product/StickyAddToCart';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { fetchProductByHandle, ShopifyProduct, sanitizeTitle, sanitizeHandle, unsanitizeHandle, optimizeShopifyImage } from '@/lib/shopify';
import { useRegion } from '@/hooks/useRegion';
import { formatShopifyMoney } from '@/lib/region';
import { useCartStore } from '@/stores/cartStore';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { findProductContent, ProductContent } from '@/data/productContent';
import { sendProductViewEvent, sendAddToCartEvent } from '@/hooks/useShopifyAnalytics';
import { trackViewContent } from '@/lib/marketingPixels';
import { ProductReviews } from '@/components/product/ProductReviews';
import { PurchaseTypeSelector, PurchaseMode } from '@/components/product/PurchaseTypeSelector';
import { InlineTestimonial } from '@/components/product/InlineTestimonial';


import { ClinicalResults } from '@/components/product/ClinicalResults';
import { ComparisonTable } from '@/components/product/ComparisonTable';
import { IngredientSpotlight } from '@/components/product/IngredientSpotlight';

import { ProductFAQs } from '@/components/product/ProductFAQs';
import { GuaranteeSection } from '@/components/product/GuaranteeSection';
import { FirstOrderDiscountBanner } from '@/components/product/FirstOrderDiscountBanner';
import { ProbioticPDP } from '@/components/product/ProbioticPDP';
import { HairSkinNailsPDP } from '@/components/product/HairSkinNailsPDP';
import { detectAdTraffic } from '@/lib/adTraffic';
import { ProductJsonLd, BreadcrumbJsonLd, PageMeta } from '@/components/seo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Testimonials per product category
const productTestimonials: Record<string, { quote: string; author: string }> = {
  mushroom: {
    quote: "I bought these because I wanted to be sharper at work. What surprised me was the feeling — like I was finally doing something intentional for myself. That mattered more than the focus.",
    author: "Michael R."
  },
  energy: {
    quote: "I used to run on coffee and guilt. Now I take an Energy Strip in the morning and it feels like a tiny promise I keep with myself. The energy is great — but the routine is what changed me.",
    author: "Sarah K."
  },
  sleep: {
    quote: "For years I told myself I'd figure out my sleep 'eventually.' These strips were the first time I actually did something about it. I wake up feeling like I actually took care of myself.",
    author: "David L."
  },
  cognitive: {
    quote: "After giving all day to everyone else, I take a Cognitive Relax Strip and it's like saying: this moment is mine. That feeling of calm isn't just physical — it's permission to breathe.",
    author: "Emma T."
  },
  immunity: {
    quote: "I take these because my body does so much for me — the least I can do is give it something good in return. Knowing every batch is tested makes me feel like I'm making a real choice.",
    author: "James P."
  },
  default: {
    quote: "I never stuck with supplements before. But this is different — it's not a chore, it's a choice. 30 seconds to remind myself that I matter. And I do it every single day now.",
    author: "Lisa M."
  }
};

// Get product type for matching components
const getProductType = (handle: string): string => {
  if (handle?.includes('mushroom') || handle?.includes('focus')) return 'mushroom';
  if (handle?.includes('energy') || handle?.includes('b12')) return 'energy';
  if (handle?.includes('sleep') || handle?.includes('melatonin')) return 'sleep';
  if (handle?.includes('cognitive') || handle?.includes('relax')) return 'cognitive';
  if (handle?.includes('immunity') || handle?.includes('vitamin-c')) return 'immunity';
  return 'default';
};

// Outcome promise per product category — drives the 6-week timeline copy
const getOutcomePromise = (handle: string): string => {
  const h = handle?.toLowerCase() || '';
  if (h.includes('hair') || h.includes('skin') || h.includes('nail') || h.includes('biotin') || h.includes('collagen')) return 'Visibly healthier hair, skin & nails';
  if (h.includes('sleep') || h.includes('melatonin')) return 'Deeper, more restorative sleep';
  if (h.includes('energy') || h.includes('b12')) return 'Steady, all-day natural energy';
  if (h.includes('mushroom') || h.includes('focus') || h.includes('cognitive')) return 'Sharper focus & calmer clarity';
  if (h.includes('relax') || h.includes('calm') || h.includes('stress')) return 'A calmer, more centered you';
  if (h.includes('immunity') || h.includes('vitamin-c') || h.includes('immune')) return 'Stronger daily immune resilience';
  if (h.includes('gut') || h.includes('digest') || h.includes('probiotic')) return 'Lighter digestion & a happier gut';
  if (h.includes('hangover') || h.includes('recovery')) return 'Faster mornings, easier recoveries';
  if (h.includes('vitality') || h.includes('shilajit') || h.includes('testo')) return 'Renewed vitality & drive';
  return 'Real, visible results';
};

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  // Bundle-Preselect for paid social ad traffic — lifts AOV by defaulting
  // to the bundle when visitors arrive from FB/IG/TikTok ads.
  const [purchaseMode, setPurchaseMode] = useState<PurchaseMode>(() => {
    if (typeof window === 'undefined') return 'single';
    const params = new URLSearchParams(window.location.search);
    if (params.get('bundle') === '1') return 'bundle';
    return detectAdTraffic().isPaidSocial ? 'bundle' : 'single';
  });
  const addToCartButtonRef = useRef<HTMLDivElement>(null);

  const addItem = useCartStore((state) => state.addItem);
  const addBundle = useCartStore((state) => state.addBundle);
  const { isUK } = useRegion();

  useEffect(() => {
    async function loadProduct() {
      if (!handle) return;
      setIsLoading(true);
      // Try the handle as-is first, then try the "gummies" variant
      let data = await fetchProductByHandle(handle);
      if (!data) {
        const gummiesHandle = unsanitizeHandle(handle);
        if (gummiesHandle !== handle) {
          data = await fetchProductByHandle(gummiesHandle);
        }
      }
      setProduct(data);
      setIsLoading(false);

      // Send product view event to Shopify analytics
      if (data) {
        const firstVariant = data.variants.edges[0]?.node;
        if (firstVariant) {
          sendProductViewEvent({
            id: data.id,
            title: data.title,
            variantId: firstVariant.id,
            variantTitle: firstVariant.title,
            price: firstVariant.price.amount,
          });
          // Meta Pixel + GA4 ViewContent — critical for retargeting & DPA
          trackViewContent({
            id: firstVariant.id,
            name: data.title,
            price: parseFloat(firstVariant.price.amount) || 0,
            quantity: 1,
          });
        }
      }
    }
    loadProduct();
  }, [handle]);

  const handleAddToCart = async () => {
    if (!product) return;

    const firstVariant = product.variants.edges[0]?.node;
    if (!firstVariant) return;

    // BUNDLE PATH — find best matching bundle for this variant
    if (purchaseMode === 'bundle') {
      const { bundles: bundleList, productInfo } = await import('@/data/bundles');
      const matching = bundleList.filter(b => b.variantIds.includes(firstVariant.id));
      const bestBundle =
        matching.find(b => b.products.length === 4) ||
        matching.find(b => b.products.length === 3) ||
        matching[0];

      if (bestBundle) {
        const bundleItems = bestBundle.variantIds.map(vid => {
          const info = productInfo[vid] ?? { title: 'NEUVIE Strip', price: '29.99' };
          return {
            product: { node: product },
            variantId: vid,
            variantTitle: info.title,
            price: { amount: info.price, currencyCode: 'USD' },
            quantity: 1,
            selectedOptions: [],
            bundleId: bestBundle.id,
            bundleName: bestBundle.name,
            bundleDiscountCode: bestBundle.discountCode,
          };
        });

        await addBundle(bundleItems, bestBundle.discountCode);

        sendAddToCartEvent({
          id: product.id,
          title: bestBundle.name,
          variantId: firstVariant.id,
          variantTitle: bestBundle.packSize,
          price: bestBundle.salePrice.toString(),
          quantity: 1,
        });

        toast.success('Bundle added to Cart!', {
          description: `${bestBundle.name} · Save $${bestBundle.savings.toFixed(2)}`,
          position: 'top-center',
        });
        return;
      }
      // fall through to single if no bundle was found
    }

    // SINGLE PATH
    const basePrice = parseFloat(firstVariant.price.amount);

    await addItem({
      product: { node: product },
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: { amount: basePrice.toString(), currencyCode: 'USD' },
      quantity,
      selectedOptions: firstVariant.selectedOptions,
    });

    sendAddToCartEvent({
      id: product.id,
      title: product.title,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: basePrice.toString(),
      quantity,
    });

    toast.success('Added to Cart!', {
      description: `${quantity}x ${sanitizeTitle(product.title)}`,
      position: 'top-center',
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Skeleton className="aspect-square rounded-2xl" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Link to="/shop" className="text-primary hover:underline">
              ← Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currencyCode = product.priceRange.minVariantPrice.currencyCode;
  const originalPrice = 49.99; // Standard compare-at price (display in active region currency)
  const images = product.images.edges;
  const productType = getProductType(handle || '');
  const fmtMoney = (n: number) => formatShopifyMoney(n, currencyCode);
  const testimonial = productTestimonials[productType] || productTestimonials.default;
  
  // Get product content
  const productContent = findProductContent(product.title) || findProductContent(product.handle);

  // Breadcrumb items for JSON-LD
  const breadcrumbItems = [
    { name: 'Home', url: 'https://tryneuvie.com' },
    { name: 'Shop', url: 'https://tryneuvie.com/shop' },
    { name: sanitizeTitle(product.title), url: `https://tryneuvie.com/product/${sanitizeHandle(product.handle)}` }
  ];

  // ============ OPTIMIZED PDP for Probiotic + Metabolism Strips ============
  const normalizedHandle = (handle || product.handle || '').toLowerCase();

  // ============ DEDICATED PDP for Hair, Skin & Nails Strips ============
  if (normalizedHandle.includes('hair') && (normalizedHandle.includes('skin') || normalizedHandle.includes('nail'))) {
    return <HairSkinNailsPDP product={product} />;
  }

  if (normalizedHandle.includes('probiotic') && normalizedHandle.includes('metabolism')) {
    const firstVariant = product.variants.edges[0]?.node;
    const onAddSingle = async () => {
      if (!firstVariant) return;
      await addItem({
        product: { node: product },
        variantId: firstVariant.id,
        variantTitle: firstVariant.title,
        price: { amount: parseFloat(firstVariant.price.amount).toString(), currencyCode: 'USD' },
        quantity: 1,
        selectedOptions: firstVariant.selectedOptions,
      });
      sendAddToCartEvent({
        id: product.id,
        title: product.title,
        variantId: firstVariant.id,
        variantTitle: firstVariant.title,
        price: firstVariant.price.amount,
        quantity: 1,
      });
      toast.success('Added to Cart!', {
        description: sanitizeTitle(product.title),
        position: 'top-center',
      });
    };
    const onAddBundle = async () => {
      const { bundles: bundleList, productInfo } = await import('@/data/bundles');
      const gutBundle = bundleList.find(b => b.id === 'gut-feeling');
      if (!gutBundle || !firstVariant) return;
      const items = gutBundle.variantIds.map(vid => {
        const info = productInfo[vid] ?? { title: 'NEUVIE Strip', price: '29.99' };
        return {
          product: { node: product },
          variantId: vid,
          variantTitle: info.title,
          price: { amount: info.price, currencyCode: 'USD' },
          quantity: 1,
          selectedOptions: [],
          bundleId: gutBundle.id,
          bundleName: gutBundle.name,
          bundleDiscountCode: gutBundle.discountCode,
        };
      });
      await addBundle(items, gutBundle.discountCode);
      toast.success('Bundle added to Cart!', {
        description: `${gutBundle.name} · Save $${gutBundle.savings.toFixed(2)}`,
        position: 'top-center',
      });
    };
    return <ProbioticPDP product={product} onAddSingle={onAddSingle} onAddBundle={onAddBundle} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* SEO */}
      <PageMeta
        title={productContent?.seoTitle || `${sanitizeTitle(product.title)} – NEUVIE™`}
        description={productContent?.metaDescription || `${sanitizeTitle(product.title)} by NEUVIE™. Fast-dissolving wellness strip. No water, no pills. Free US shipping on $50+.`}
        ogType="product"
      />
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      
      <Navbar />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container-wide py-4">
          <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>

        {/* Product Section */}
        <section className="container-wide pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Images */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Main Image */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-secondary/50 to-card relative shadow-soft">
                {/* Servings Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/50">
                    <span className="text-2xl font-bold text-foreground">x30</span>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Strips</p>
                  </div>
                </div>
                
                {/* Sale Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-primary text-primary-foreground text-sm font-semibold px-3 py-1.5 rounded-full">
                    SAVE {fmtMoney(originalPrice - price)}
                  </span>
                </div>

                {images[selectedImage] ? (
                  <img
                    src={optimizeShopifyImage(images[selectedImage].node.url, 800)}
                    alt={images[selectedImage].node.altText || `NEUVIE ${sanitizeTitle(product.title)} Dissolving Strip – wellness supplement`}
                    className="w-full h-full object-contain"
                    loading={selectedImage === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    width={800}
                    height={800}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted/20">
                    <span className="text-6xl">💊</span>
                  </div>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        selectedImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={optimizeShopifyImage(img.node.url, 100)}
                        alt={img.node.altText || `NEUVIE ${sanitizeTitle(product.title)} dissolving strip view ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        width={100}
                        height={100}
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div 
              className="space-y-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Reviews row */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="text-accent tracking-widest">★★★★★</span>
                <a href="#reviews" className="font-semibold text-foreground underline underline-offset-2">4.9/5.0</a>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">10,000+ happy customers</span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <p className="text-primary font-semibold tracking-wider text-xs uppercase mb-1.5">
                  {productContent?.properties?.[0] || 'Daily Wellness Strip'}
                </p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-foreground">
                  {sanitizeTitle(product.title)}
                </h1>
                <p className="text-muted-foreground mt-3 text-base">
                  {productContent?.shortDescription?.split('.')[0] || product.description?.split('.')[0] || 'Fast-dissolving wellness strip · 30-second daily ritual'}
                </p>
              </div>

              {/* Price Block — Auri style */}
              <div className="space-y-3">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl font-bold text-accent">{fmtMoney(price)}</span>
                  <span className="text-xl text-muted-foreground line-through">{fmtMoney(originalPrice)}</span>
                  <span className="bg-accent/10 text-accent text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    {Math.round(((originalPrice - price) / originalPrice) * 100)}% off today
                  </span>
                </div>

                {/* Low-stock progress bar with gradient */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-sm font-semibold text-accent">Selling fast</span>
                    <span className="text-sm text-muted-foreground">82% claimed today</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-accent to-primary rounded-full" style={{ width: '82%' }} />
                  </div>
                </div>
              </div>







              {/* Quantity & Add to Cart */}
              <div ref={addToCartButtonRef} className="flex flex-col gap-3 pt-2">
                {/* First-order discount banner — shown only to new visitors */}
                <FirstOrderDiscountBanner />

                {/* PURCHASE TYPE SELECTOR — Single vs. Bundle (Bundle-First CRO) */}
                <PurchaseTypeSelector
                  currentVariantId={product.variants.edges[0]?.node.id}
                  singlePrice={price}
                  singleCurrencyCode={product.variants.edges[0]?.node.price.currencyCode}
                  comparePrice={originalPrice}
                  selected={purchaseMode}
                  onChange={setPurchaseMode}
                />

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 bg-muted rounded-full p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={handleAddToCart}
                    className="flex-1 btn-primary text-lg gap-2 h-12"
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </Button>
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-foreground/80 font-medium">
                  <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" />14-day money back</span>
                  {!isUK && (
                    <span className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-primary" />Free shipping $50+</span>
                  )}
                </div>

              </div>

              {/* Inline Testimonial — directly under CTA (Auri pattern) */}
              <InlineTestimonial 
                quote={testimonial.quote}
                author={testimonial.author}
                isVerified={true}
              />


              {/* Quick Info Accordions */}
              <Accordion type="multiple" defaultValue={["description", "ingredients"]} className="space-y-2">
                <AccordionItem value="description" className="bg-muted/30 rounded-xl border-none px-4 data-[state=open]:bg-muted/50">
                  <AccordionTrigger className="py-3 hover:no-underline">
                    <span className="font-medium">What it does</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-sm text-muted-foreground space-y-3">
                    {productContent?.longDescription ? (
                      productContent.longDescription.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))
                    ) : product.descriptionHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                    ) : (
                      <p>{product.description}</p>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ingredients" className="bg-muted/30 rounded-xl border-none px-4 data-[state=open]:bg-muted/50">
                  <AccordionTrigger className="py-3 hover:no-underline">
                    <span className="font-medium">What's inside</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {productContent?.ingredients?.map((ingredient, index) => (
                        <span key={index} className="px-2 py-1 bg-background rounded text-xs text-muted-foreground">
                          {ingredient}
                        </span>
                      )) || <span className="text-sm text-muted-foreground">See product packaging for full ingredient list.</span>}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="shipping" className="bg-muted/30 rounded-xl border-none px-4 data-[state=open]:bg-muted/50">
                  <AccordionTrigger className="py-3 hover:no-underline">
                    <span className="font-medium">Shipping & returns</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-sm text-muted-foreground space-y-2">
                    <p><strong>Shipping:</strong> Orders ship within 1–2 business days. Most US orders arrive in 3–5 days.</p>
                    <p><strong>Our promise:</strong> If it's not right for you, email team@tryneuvie.com within 14 days. Full refund — because you should feel completely sure about what you put in your body.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Trust Badges */}
              <div className="grid grid-cols-4 gap-3 pt-4 border-t border-border/40">
                <div className="text-center p-3 bg-secondary/40 rounded-xl">
                  <Truck className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">{isUK ? 'International\nshipping' : <>Free shipping<br />on $50+</>}</p>
                </div>
                <div className="text-center p-3 bg-secondary/40 rounded-xl">
                  <Shield className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">Third-Party<br />Tested</p>
                </div>
                <div className="text-center p-3 bg-secondary/40 rounded-xl">
                  <RotateCcw className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">14-day<br />money back</p>
                </div>
                <div className="text-center p-3 bg-secondary/40 rounded-xl">
                  <Leaf className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">Made in<br />the USA</p>
                </div>
              </div>

              {/* Quality Promise */}
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                <p className="text-sm text-muted-foreground leading-relaxed text-center">
                  <span className="font-semibold text-foreground">Our Quality Promise:</span> Every batch goes through independent third-party testing. Because the things you put in your body deserve nothing less.
                </p>
              </div>

              {/* Properties/Badges */}
              {productContent && (
                <div className="flex flex-wrap gap-2">
                  {productContent.properties.map((prop, index) => (
                    <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-sm">
                      <Leaf className="h-3.5 w-3.5 text-primary" />
                      {prop}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Clinical Results Section */}
        <ClinicalResults productType={productType} />

        {/* Comparison Table */}
        <ComparisonTable onCtaClick={scrollToTop} />

        {/* Ingredient Spotlight */}
        <IngredientSpotlight productHandle={productType} />

        {/* You Might Also Like */}
        {productContent?.relatedProducts && productContent.relatedProducts.length > 0 && (
          <section className="py-16">
            <div className="container-wide">
              <h2 className="font-display text-2xl md:text-3xl text-center mb-8">
                You might also like
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {productContent.relatedProducts.map((related, index) => (
                  <Link
                    key={index}
                    to={`/product/${sanitizeHandle(related.handle)}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all text-sm font-medium text-foreground"
                  >
                    {related.anchor}
                    <ChevronLeft className="h-4 w-4 rotate-180" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Guarantee Section */}
        <GuaranteeSection />

        {/* Product FAQs */}
        <ProductFAQs productHandle={productType} />

        {/* Customer Reviews Section */}
        <ProductReviews
          productHandle={product.handle}
          productTitle={sanitizeTitle(product.title)}
        />
      </main>

      {/* Sticky Add to Cart Bar */}
      <StickyAddToCart
        productTitle={sanitizeTitle(product.title)}
        price={price}
        originalPrice={originalPrice}
        onAddToCart={handleAddToCart}
        isSubscription={false}
        addToCartRef={addToCartButtonRef}
      />

      <Footer />
    </div>
  );
}
