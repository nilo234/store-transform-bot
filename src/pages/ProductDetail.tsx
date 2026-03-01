import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingCart, ChevronLeft, Check, Truck, Shield, RotateCcw, Leaf, AlertCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { fetchProductByHandle, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { findProductContent, ProductContent } from '@/data/productContent';
import { JudgeMeReviews } from '@/components/reviews/JudgeMeReviews';
import { SubscriptionToggle, PurchaseType } from '@/components/shop/SubscriptionToggle';
import { StockIndicator } from '@/components/product/StockIndicator';
import { ValueProposition } from '@/components/product/ValueProposition';
import { InlineTestimonial } from '@/components/product/InlineTestimonial';
import { ClinicalResults } from '@/components/product/ClinicalResults';
import { ComparisonTable } from '@/components/product/ComparisonTable';
import { IngredientSpotlight } from '@/components/product/IngredientSpotlight';
import { BundleUpsell } from '@/components/product/BundleUpsell';
import { ProductFAQs } from '@/components/product/ProductFAQs';
import { GuaranteeSection } from '@/components/product/GuaranteeSection';
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
    quote: "I've made the Mushroom Focus Strips part of my daily work routine. Love the chocolate flavor and how easy they are to take.",
    author: "Michael R."
  },
  energy: {
    quote: "The Energy Strips are perfect for my morning routine—clean energy without the jitters. So much easier than swallowing pills.",
    author: "Sarah K."
  },
  sleep: {
    quote: "The Sleep Strips have become part of my nightly routine. Easy to take, great flavor, and I love the dissolving format.",
    author: "David L."
  },
  cognitive: {
    quote: "Perfect for after a long workday. I enjoy the strawberry-mint flavor and love how convenient the strip format is.",
    author: "Emma T."
  },
  immunity: {
    quote: "I've been taking these daily for months. Love that they're third-party tested and made in the USA. Great quality.",
    author: "James P."
  },
  default: {
    quote: "These strips are so convenient and taste great. I've never been more consistent with my supplement routine!",
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

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [purchaseSelection, setPurchaseSelection] = useState<{
    type: PurchaseType;
    frequency?: string;
    discount: number;
    finalPrice: number;
  } | null>(null);
  
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function loadProduct() {
      if (!handle) return;
      setIsLoading(true);
      const data = await fetchProductByHandle(handle);
      setProduct(data);
      setIsLoading(false);
    }
    loadProduct();
  }, [handle]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    const firstVariant = product.variants.edges[0]?.node;
    if (!firstVariant) return;
    
    const basePrice = parseFloat(firstVariant.price.amount);
    const isSubscription = purchaseSelection?.type === 'subscribe';
    const finalPrice = isSubscription && purchaseSelection?.finalPrice 
      ? purchaseSelection.finalPrice 
      : basePrice;
    
    await addItem({
      product: { node: product },
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: {
        amount: finalPrice.toString(),
        currencyCode: 'USD',
      },
      quantity,
      selectedOptions: firstVariant.selectedOptions,
      isSubscription,
      subscriptionFrequency: purchaseSelection?.frequency,
      subscriptionDiscount: purchaseSelection?.discount,
    });
    
    const subscriptionLabel = isSubscription 
      ? ` (${purchaseSelection?.frequency} subscription)` 
      : '';
    
    toast.success('Added to Cart!', {
      description: `${quantity}x ${product.title}${subscriptionLabel}`,
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
    { name: 'Home', url: 'https://neuvie.com' },
    { name: 'Shop', url: 'https://neuvie.com/shop' },
    { name: product.title, url: `https://neuvie.com/product/${product.handle}` }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* SEO */}
      <PageMeta
        title={`${product.title} – Fast-Dissolving Strip | NEUVIE™`}
        description={`${product.description?.slice(0, 120) || `Shop ${product.title} by NEUVIE™. Premium dissolving wellness strip with clinically studied ingredients. $34.99. Free shipping $50+.`}`}
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
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-muted/50 to-card relative">
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
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-contain"
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
                        src={img.node.url}
                        alt={img.node.altText || `${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
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
                <h1 className="font-display text-3xl md:text-4xl font-bold">{product.title}</h1>
                <p className="text-muted-foreground mt-1">
                  {productContent?.shortDescription?.split('.')[0] || 'Premium oral strip'}
                </p>
              </div>

              {/* Price Block - US Market Optimized */}
              <div className="bg-muted/30 rounded-xl p-4 space-y-3">
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

              {/* Subscription Toggle */}
              <div className="pt-2">
                <SubscriptionToggle 
                  basePrice={price} 
                  onSelectionChange={setPurchaseSelection}
                />
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col gap-3 pt-2">
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
                    {purchaseSelection?.type === 'subscribe' ? 'Subscribe & Save' : 'Add to Cart'}
                  </Button>
                </div>
                
                <p className="text-center text-sm text-muted-foreground">
                  ✓ Ships FREE today • ✓ Fast 2-5 day US delivery
                </p>
              </div>

              {/* Value Proposition Block */}
              <ValueProposition 
                servings={30} 
                subscriptionPrice={purchaseSelection?.finalPrice ? `$${purchaseSelection.finalPrice.toFixed(2)}` : "$27.99"} 
              />

              {/* Inline Testimonial */}
              <InlineTestimonial 
                quote={testimonial.quote}
                author={testimonial.author}
                isVerified={true}
              />

              {/* Quick Info Accordions */}
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="description" className="bg-muted/30 rounded-xl border-none px-4">
                  <AccordionTrigger className="py-3 hover:no-underline">
                    <span className="font-medium">Description</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-sm text-muted-foreground">
                    {productContent?.longDescription?.[0] || product.description}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ingredients" className="bg-muted/30 rounded-xl border-none px-4">
                  <AccordionTrigger className="py-3 hover:no-underline">
                    <span className="font-medium">Ingredients</span>
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

                <AccordionItem value="shipping" className="bg-muted/30 rounded-xl border-none px-4">
                  <AccordionTrigger className="py-3 hover:no-underline">
                    <span className="font-medium">Shipping & Guarantee</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-sm text-muted-foreground space-y-2">
                    <p><strong>Shipping:</strong> Orders ship within 1–2 business days. Delivery typically 3–5 business days.</p>
                    <p><strong>14-Day Guarantee:</strong> Not satisfied? Contact hello@neuvie.com for a full refund on your first order — no questions asked.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">Free Shipping<br />on $50+</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">Third-Party<br />Tested</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">14-Day<br />Guarantee</p>
                </div>
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
          <section className="py-16 bg-muted/30">
            <div className="container-wide">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">
                  Product Details
                </h2>

                <Accordion type="single" collapsible className="space-y-4">
                  {/* Benefits */}
                  <AccordionItem value="benefits" className="bg-card rounded-xl border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-semibold text-lg">Benefits</span>
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
                      <span className="font-semibold text-lg">Full Description</span>
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
                      <span className="font-semibold text-lg">How to Use</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <p className="text-muted-foreground">{productContent.usage}</p>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Supplement Facts */}
                  <AccordionItem value="supplement-facts" className="bg-card rounded-xl border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-semibold text-lg">Supplement Facts</span>
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

        {/* Guarantee Section */}
        <GuaranteeSection />

        {/* Bundle Upsell */}
        <BundleUpsell currentProductHandle={handle} />

        {/* Product FAQs */}
        <ProductFAQs productHandle={productType} />

        {/* Judge.me Reviews Section */}
        <JudgeMeReviews 
          productId={product.id} 
          productHandle={product.handle}
          productTitle={product.title}
        />
      </main>

      <Footer />
    </div>
  );
}
