import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingCart, ChevronLeft, Check, Truck, Shield, RotateCcw, Leaf, AlertCircle } from 'lucide-react';
import { StickyAddToCart } from '@/components/product/StickyAddToCart';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { fetchProductByHandle, ShopifyProduct, sanitizeTitle, sanitizeHandle, unsanitizeHandle, optimizeShopifyImage } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { findProductContent, ProductContent } from '@/data/productContent';
import { sendProductViewEvent, sendAddToCartEvent } from '@/hooks/useShopifyAnalytics';
import { ProductReviews } from '@/components/product/ProductReviews';
import { PurchaseTypeSelector, PurchaseMode } from '@/components/product/PurchaseTypeSelector';
import { StockIndicator } from '@/components/product/StockIndicator';
import { ValueProposition } from '@/components/product/ValueProposition';
import { InlineTestimonial } from '@/components/product/InlineTestimonial';
import { ClinicalResults } from '@/components/product/ClinicalResults';
import { ComparisonTable } from '@/components/product/ComparisonTable';
import { IngredientSpotlight } from '@/components/product/IngredientSpotlight';
import { BundleUpsell } from '@/components/product/BundleUpsell';
import { ProductFAQs } from '@/components/product/ProductFAQs';
import { GuaranteeSection } from '@/components/product/GuaranteeSection';
import { FirstOrderDiscountBanner } from '@/components/product/FirstOrderDiscountBanner';
import { BundleCrossSellBanner } from '@/components/product/BundleCrossSellBanner';
import { StripsVsPillsComparison } from '@/components/product/StripsVsPillsComparison';
import { PressLogosStrip } from '@/components/product/PressLogosStrip';
import { LiveActivityCounter } from '@/components/product/LiveActivityCounter';
import { ResultPromiseTimeline } from '@/components/product/ResultPromiseTimeline';
import { IngredientTransparencyDrawer } from '@/components/product/IngredientTransparencyDrawer';
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
    quote: "I used to run on coffee and guilt. Now I take an Energy Strip in the morning and it feels like a tiny promise I keep with myself. The energy is great — but the ritual is what changed me.",
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
  const [purchaseMode, setPurchaseMode] = useState<PurchaseMode>('single');
  const addToCartButtonRef = useRef<HTMLDivElement>(null);

  const addItem = useCartStore((state) => state.addItem);
  const addBundle = useCartStore((state) => state.addBundle);

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
          const info = productInfo[vid] ?? { title: 'NEUVIE Strip', price: '34.99' };
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
  const originalPrice = 49.99; // Standard compare-at price
  const images = product.images.edges;
  const productType = getProductType(handle || '');
  const testimonial = productTestimonials[productType] || productTestimonials.default;
  
  // Get product content
  const productContent = findProductContent(product.title) || findProductContent(product.handle);

  // Breadcrumb items for JSON-LD
  const breadcrumbItems = [
    { name: 'Home', url: 'https://tryneuvie.com' },
    { name: 'Shop', url: 'https://tryneuvie.com/shop' },
    { name: sanitizeTitle(product.title), url: `https://tryneuvie.com/product/${sanitizeHandle(product.handle)}` }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* SEO */}
      <PageMeta
        title={productContent?.seoTitle || `${sanitizeTitle(product.title)} – NEUVIE™`}
        description={productContent?.metaDescription || `${sanitizeTitle(product.title)} by NEUVIE™. Fast-dissolving wellness strip. No water, no pills. Free US shipping on $50+.`}
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
                    SAVE ${(originalPrice - price).toFixed(0)}
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
              {/* Title & Subtitle */}
              <div>
                <h1 className="font-display text-3xl md:text-4xl">{sanitizeTitle(product.title)}</h1>
               <p className="text-muted-foreground mt-1">
                  {product.description?.split('.')[0] || productContent?.shortDescription?.split('.')[0] || 'Fast-dissolving wellness strip'}
                </p>
              </div>

              {/* Price Block - US Market Optimized */}
              <div className="bg-secondary/60 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-primary">${price.toFixed(2)}</span>
                    <span className="text-lg text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
                  </div>
                  <span className="bg-accent text-accent-foreground text-sm font-bold px-3 py-1 rounded-full">
                    SAVE ${(originalPrice - price).toFixed(2)}
                  </span>
                </div>
                
                {/* Stock Indicator */}
                <StockIndicator />
              </div>

              {/* Live Activity Counter — social proof in real time */}
              <LiveActivityCounter productHandle={handle} />


              {/* Quantity & Add to Cart */}
              <div ref={addToCartButtonRef} className="flex flex-col gap-3 pt-2">
                {/* First-order discount banner — shown only to new visitors */}
                <FirstOrderDiscountBanner />

                {/* PURCHASE TYPE SELECTOR — Single vs. Bundle (Bundle-First CRO) */}
                <PurchaseTypeSelector
                  currentVariantId={product.variants.edges[0]?.node.id}
                  singlePrice={price}
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
                  <span className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-primary" />Free shipping $50+</span>
                </div>

                {/* Press Logos — trust signal under shipping info */}
                <PressLogosStrip />

                {/* Bundle cross-sell — Better Together */}
                <BundleCrossSellBanner currentVariantId={product.variants.edges[0]?.node.id} />
              </div>

              {/* Value Proposition Block */}
              <ValueProposition 
                servings={30} 
                subscriptionPrice="$27.99" 
              />

              {/* Inline Testimonial */}
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
                  <p className="text-xs text-muted-foreground">Free shipping<br />on $50+</p>
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

        {/* Detailed Product Information */}
        {productContent && (
          <section className="py-16 bg-secondary/30">
            <div className="container-wide">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-2xl md:text-3xl text-center mb-12">
                  Everything you want to know — because you deserve to feel sure.
                </h2>

                <Accordion type="single" collapsible className="space-y-4">
                  {/* Benefits */}
                  <AccordionItem value="benefits" className="bg-card rounded-xl border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-semibold text-lg">What you'll feel</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <ul className="space-y-3">
                        {productContent.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-medium">{benefit.headline}:</span>{' '}
                              <span className="text-muted-foreground">{benefit.description}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Product Description */}
                  <AccordionItem value="description-full" className="bg-card rounded-xl border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-semibold text-lg">The full story</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-4 text-muted-foreground">
                        {productContent.longDescription.map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Usage */}
                  <AccordionItem value="usage" className="bg-card rounded-xl border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-semibold text-lg">How to take it</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <p className="text-muted-foreground">{productContent.usage}</p>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Supplement Facts */}
                  <AccordionItem value="supplement-facts" className="bg-card rounded-xl border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-semibold text-lg">What's in each strip</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-2 font-semibold">Nutrient</th>
                              <th className="text-right py-2 font-semibold">Amount per Strip</th>
                            </tr>
                          </thead>
                          <tbody>
                            {productContent.supplementFacts.map((fact, index) => (
                              <tr key={index} className="border-b border-border/50">
                                <td className="py-2 text-muted-foreground">{fact.nutrient}</td>
                                <td className="py-2 text-right">{fact.amount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <p className="text-xs text-muted-foreground mt-3">* Daily value not established</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Disclaimer */}
                <div className="mt-8 p-6 bg-card rounded-xl">
                  <div className="flex gap-4">
                    <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground italic">
                      {productContent.disclaimer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

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

        {/* Bundle Upsell */}
        <BundleUpsell currentProductHandle={handle} />

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
