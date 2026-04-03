import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LiveChatWidget } from "@/components/chat/LiveChatWidget";
import { ExitIntentPopup } from "@/components/popups/ExitIntentPopup";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo";
import { useCartSync } from "@/hooks/useCartSync";
import { useShopifyPageAnalytics } from "@/hooks/useShopifyAnalytics";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Bundles from "./pages/Bundles";
import ProductDetail from "./pages/ProductDetail";
import Science from "./pages/Science";
import About from "./pages/About";
import FAQs from "./pages/FAQs";
import Contact from "./pages/Contact";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import CheckoutRedirect from "./pages/CheckoutRedirect";

const queryClient = new QueryClient();

function AppContent() {
  useCartSync();
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
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/bundles" element={<Bundles />} />
          <Route path="/product/:handle" element={<ProductDetail />} />
          <Route path="/science" element={<Science />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cart/c/:cartToken" element={<CheckoutRedirect />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <LiveChatWidget />
        <ExitIntentPopup />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;