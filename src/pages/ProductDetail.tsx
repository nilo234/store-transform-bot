import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingCart, ChevronLeft, Check, Truck, Shield, RotateCcw, Leaf, AlertCircle } from 'lucide-react';
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
import { WhyNowMicroCopy } from '@/components/product/WhyNowMicroCopy';
import { ProbioticPDP } from '@/components/product/ProbioticPDP';
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

  // Default render: premium editorial PDP
  const onAdd = async () => {
    setPurchaseMode('single');
    await handleAddToCart();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta
        title={productContent?.seoTitle || `${sanitizeTitle(product.title)} – NEUVIE™`}
        description={productContent?.metaDescription || `${sanitizeTitle(product.title)} by NEUVIE™. A fast-dissolving daily wellness strip. Free US shipping on $50+.`}
      />
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <Navbar />

      <main className="flex-1">
        <PremiumPDP
          product={product}
          productContent={productContent}
          testimonial={testimonial}
          onAddToCart={onAdd}
        />
      </main>

      <Footer />
    </div>
  );
}
