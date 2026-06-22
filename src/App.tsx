import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo";
import { useCartSync } from "@/hooks/useCartSync";
import { useShopifyPageAnalytics } from "@/hooks/useShopifyAnalytics";
import { ScrollToTop } from "@/components/ScrollToTop";
import { autoDetectRegionFromIP } from "@/lib/region";
import Index from "./pages/Index";

// Defer non-critical route bundles to keep initial JS small (improves TBT/LCP on mobile)
const Shop = lazy(() => import("./pages/Shop"));
const Bundles = lazy(() => import("./pages/Bundles"));
const BundleDetail = lazy(() => import("./pages/BundleDetail"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Science = lazy(() => import("./pages/Science"));
const About = lazy(() => import("./pages/About"));
const FAQs = lazy(() => import("./pages/FAQs"));
const Contact = lazy(() => import("./pages/Contact"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Returns = lazy(() => import("./pages/Returns"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CheckoutRedirect = lazy(() => import("./pages/CheckoutRedirect"));
const DropProductDetail = lazy(() => import("./pages/DropProductDetail"));
const GlowProtocolLanding = lazy(() => import("./pages/lp/GlowProtocolLanding"));
const DigestiveLanding = lazy(() => import("./pages/lp/DigestiveLanding"));
const NightOutLanding = lazy(() => import("./pages/lp/NightOutLanding"));
const QuietDownLanding = lazy(() => import("./pages/lp/QuietDownLanding"));
const GutFeelingLanding = lazy(() => import("./pages/lp/GutFeelingLanding"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AdminCartFeedback = lazy(() => import("./pages/AdminCartFeedback"));
const CaffeineFreeEnergy = lazy(() => import("./pages/seo/CaffeineFreeEnergy"));
const EnergyWithoutStimulants = lazy(() => import("./pages/seo/EnergyWithoutStimulants"));
const CaffeinePillAlternatives = lazy(() => import("./pages/seo/CaffeinePillAlternatives"));
const RespiratoryDrops = lazy(() => import("./pages/seo/RespiratoryDrops"));
const SeoClusterPage = lazy(() => import("./pages/seo/SeoClusterPage"));
const GuidesHub = lazy(() => import("./pages/seo/GuidesHub"));
const ComparisonPage = lazy(() => import("./pages/seo/ComparisonPage"));
import { SEO_CLUSTERS } from "./pages/seo/clusters";
import { COMPARISONS } from "./pages/seo/comparisons";

// Defer non-critical widgets (chat + exit popup) — they should never block first paint
const LiveChatWidget = lazy(() =>
  import("@/components/chat/LiveChatWidget").then((m) => ({ default: m.LiveChatWidget }))
);
const ExitIntentPopup = lazy(() =>
  import("@/components/popups/ExitIntentPopup").then((m) => ({ default: m.ExitIntentPopup }))
);

const queryClient = new QueryClient();

function AppContent() {
  useCartSync();
  useShopifyPageAnalytics();
  useEffect(() => {
    // Run once on first load: if no explicit region override, detect via IP
    autoDetectRegionFromIP();
  }, []);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <BrowserRouter>
        <AppContent />
        <ScrollToTop />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/bundles" element={<Bundles />} />
            <Route path="/bundles/:id" element={<BundleDetail />} />
            <Route path="/product/:handle" element={<ProductDetail />} />
            <Route path="/drops/:slug" element={<DropProductDetail />} />
            <Route path="/science" element={<Science />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cart/c/:cartToken" element={<CheckoutRedirect />} />
            <Route path="/lp/glow-protocol" element={<GlowProtocolLanding />} />
            <Route path="/lp/digestive" element={<DigestiveLanding />} />
            <Route path="/lp/night-out" element={<NightOutLanding />} />
            <Route path="/lp/quiet-down" element={<QuietDownLanding />} />
            <Route path="/lp/gut-feeling" element={<GutFeelingLanding />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin/cart-feedback" element={<AdminCartFeedback />} />
            <Route path="/caffeine-free-energy" element={<CaffeineFreeEnergy />} />
            <Route path="/energy-without-stimulants" element={<EnergyWithoutStimulants />} />
            <Route path="/caffeine-pill-alternatives" element={<CaffeinePillAlternatives />} />
            <Route path="/respiratory-drops" element={<RespiratoryDrops />} />
            {SEO_CLUSTERS.map((c) => (
              <Route key={c.slug} path={`/${c.slug}`} element={<SeoClusterPage />} />
            ))}
            <Route path="/guides" element={<GuidesHub />} />
            {COMPARISONS.map((c) => (
              <Route key={c.slug} path={`/compare/${c.slug}`} element={<ComparisonPage />} />
            ))}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Suspense fallback={null}>
          <LiveChatWidget />
          <ExitIntentPopup />
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
