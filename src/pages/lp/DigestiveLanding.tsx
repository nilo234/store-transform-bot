import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Star,
  Check,
  ShoppingCart,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Activity,
  Leaf,
  Shield,
  Truck,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { fetchProductByHandle, ShopifyProduct, optimizeShopifyImage } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { PageMeta } from "@/components/seo";
import { toast } from "sonner";
import neuvieLogo from "@/assets/neuvie-navbar-logo.png";

const PRIMARY_HANDLE = "digestive-gut-health-strips";

export default function DigestiveLanding() {
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubscription, setIsSubscription] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<string | null>("benefits");

  // For Sticky Mobile Bottom Bar
  const { scrollY } = useScroll();
  const showStickyBar = useTransform(scrollY, [600, 700], [0, 1]);

  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setOpen);
  const cartCount = useCartStore((s) => s.totalItems());

  useEffect(() => {
    fetchProductByHandle(PRIMARY_HANDLE).then((p) => {
      setProduct(p);
      setLoading(false);
    });
  }, []);

  const normalPrice = 49.99; // Standard retail
  const subPrice = 31.99; // Subscription price
  const oneTimePrice = 39.99; // One time price

  const currentPrice = isSubscription ? subPrice : oneTimePrice;
  const savings = normalPrice - currentPrice;

  const handleAddToCart = async () => {
    if (!product) return;
    const variant = product.variants.edges[0]?.node;
    if (!variant) return;

    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: currentPrice.toString(),
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });
    setCartOpen(true);
    toast.success("Added to cart!", { icon: "🛒" });
  };

  const images = product?.images.edges.map((e) => e.node.url) || [null, null, null, null];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] text-[#1A1A1A] font-sans">
      <PageMeta
        title="Beat the Bloat — Digestive Strips | NEUVIE™"
        description="Reduce bloating, support gut health, no pills needed. NEUVIE Digestive dissolving strips. Clinically backed."
      />

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#1A1A1A] text-white text-xs font-semibold tracking-wider text-center py-2.5 px-4 flex justify-center items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        SUMMER SALE: UP TO 36% OFF + FREE SHIPPING
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20 px-4 md:px-8">
          <Link to="/" className="flex items-center">
            <img src={neuvieLogo} alt="NEUVIE" className="h-8 md:h-10 w-auto" />
          </Link>
          <button onClick={() => setCartOpen(true)} className="relative p-2 hover:bg-gray-50 rounded-full transition">
            <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-gray-800" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 md:h-5 md:w-5 rounded-full bg-[#D44638] text-white text-[10px] md:text-xs font-bold flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SPLIT SECTION */}
        <section className="max-w-7xl mx-auto py-6 md:py-12 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* LEFT: Product Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square md:aspect-[4/5] bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative flex items-center justify-center group overflow-hidden">
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <span className="bg-[#D44638] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                  🔥 Best Seller
                </span>
              </div>

              {images[activeImage] ? (
                <img
                  src={optimizeShopifyImage(images[activeImage] as string, 800)}
                  alt="NEUVIE Digestive Strips"
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gray-50 animate-pulse rounded-2xl" />
              )}
            </div>

            <div className="grid grid-cols-4 gap-3">
              {images.map(
                (img, i) =>
                  img && (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`aspect-square bg-white border-2 rounded-xl overflow-hidden transition-all ${activeImage === i ? "border-[#234F32]" : "border-gray-100 hover:border-gray-300"}`}
                    >
                      <img
                        src={optimizeShopifyImage(img, 200)}
                        alt={`Thumbnail ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ),
              )}
            </div>
          </div>

          {/* RIGHT: Buy Box (Conversion Engine) */}
          <div className="lg:col-span-6 flex flex-col pt-2 md:pt-4">
            {/* Reviews Trust Signal */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-[#FFB800]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <a
                href="#reviews"
                className="text-sm font-semibold underline decoration-gray-300 hover:decoration-gray-600 transition"
              >
                4.9/5.0 (2,143 Reviews)
              </a>
              <span className="text-gray-300">|</span>
              <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-green-600" /> 50k+ Customers
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-2 text-[#1A1A1A]">
              Super Digestive
            </h1>
            <h2 className="text-2xl font-light text-gray-600 mb-2">Daily Strips™</h2>
            <p className="text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
              Wild Berry | Beat the Bloat + Digestion | NEUVIE™
            </p>

            {/* Price & Scarcity */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-[#D44638]">${currentPrice}</span>
                <div className="flex flex-col">
                  <span className="text-lg text-gray-400 line-through leading-none">${normalPrice}</span>
                  <span className="text-sm font-bold text-green-700 leading-none mt-1">Save ${savings.toFixed(2)}</span>
                </div>
              </div>
              <div className="bg-orange-50 text-orange-800 text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-2 border border-orange-100">
                <Activity className="h-4 w-4" /> Low Stock: 90% Sold
              </div>
            </div>

            {/* Subscription Toggle */}
            <div className="space-y-3 mb-6">
              {/* Subscribe Option */}
              <label
                className={`relative flex flex-col p-4 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${isSubscription ? "border-[#234F32] bg-[#F4F8F5]" : "border-gray-200 bg-white hover:border-gray-300"}`}
              >
                {isSubscription && (
                  <div className="absolute -top-3 left-4 bg-[#234F32] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSubscription ? "border-[#234F32]" : "border-gray-300"}`}
                    >
                      {isSubscription && <div className="w-2.5 h-2.5 bg-[#234F32] rounded-full" />}
                    </div>
                    <span className="font-bold text-[#1A1A1A]">Subscribe & Save 36%</span>
                  </div>
                  <span className="font-bold text-lg">${subPrice}</span>
                </div>

                <div
                  className={`pl-8 space-y-1.5 overflow-hidden transition-all ${isSubscription ? "h-auto opacity-100 mt-2" : "h-0 opacity-0"}`}
                >
                  <p className="text-xs font-semibold text-green-700 mb-2">42% OFF AUTO-APPLIED TODAY ✅</p>
                  <ul className="text-sm text-gray-600 space-y-1.5">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" /> 30 Servings of Strips
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" /> <strong>FREE</strong> US Shipping
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" /> Cancel or skip anytime
                    </li>
                  </ul>
                </div>
              </label>

              {/* One-time Option */}
              <label
                className={`flex items-center justify-between p-4 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${!isSubscription ? "border-[#234F32] bg-[#F4F8F5]" : "border-gray-200 bg-white hover:border-gray-300"}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${!isSubscription ? "border-[#234F32]" : "border-gray-300"}`}
                  >
                    {!isSubscription && <div className="w-2.5 h-2.5 bg-[#234F32] rounded-full" />}
                  </div>
                  <span className="font-semibold text-gray-700">One-time purchase</span>
                </div>
                <span className="font-semibold text-gray-700">${oneTimePrice}</span>
              </label>
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleAddToCart}
              disabled={loading}
              className="w-full h-16 text-lg font-bold rounded-2xl bg-[#234F32] hover:bg-[#1A3A25] text-white shadow-xl shadow-green-900/20 transform transition active:scale-[0.98] flex items-center justify-center gap-2 mb-4"
            >
              {loading ? "Loading..." : `Add to Cart — ${isSubscription ? "Save 36%" : "Try Today"}`}
              <ArrowRight className="h-5 w-5" />
            </Button>

            {/* Trust Badges under CTA */}
            <div className="flex items-center justify-center gap-6 text-xs font-medium text-gray-500 mb-8 pb-8 border-b border-gray-200">
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-gray-400" /> 60-Day Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-gray-400" /> Ships in 24h
              </span>
            </div>

            {/* Accordions */}
            <div className="space-y-0 border border-gray-200 rounded-2xl overflow-hidden bg-white">
              {[
                {
                  id: "benefits",
                  title: "Life-Changing Benefits",
                  content:
                    "Clinically studied to reduce bloating instantly. Supports a healthy gut microbiome with probiotics that actually survive stomach acid to reach your gut alive.",
                },
                {
                  id: "ingredients",
                  title: "Ingredients & Nutrition",
                  content:
                    "Probiotic Blend (50 Billion CFU), Prebiotic Fiber, Ginger Root Extract, Peppermint Extract. 100% Vegan, Sugar-Free, Non-GMO. Made in FDA registered facility.",
                },
                {
                  id: "shipping",
                  title: "Shipping & Guarantee",
                  content:
                    'Free US shipping on all subscriptions. Protected by our 60-Day "Bottom of the Bag" Money-Back Guarantee. If you don\'t feel the difference, we refund you.',
                },
              ].map((acc, index) => (
                <div key={acc.id} className={`${index !== 2 ? "border-b border-gray-100" : ""}`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === acc.id ? null : acc.id)}
                    className="w-full p-5 flex justify-between items-center bg-white hover:bg-gray-50 transition"
                  >
                    <span className="font-bold text-sm text-gray-800">{acc.title}</span>
                    <div className="bg-gray-100 p-1.5 rounded-full text-gray-600">
                      {openFaq === acc.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </button>
                  {openFaq === acc.id && (
                    <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{acc.content}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST BANNER */}
        <section className="border-y border-gray-200 bg-white py-6">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12">
            <p className="font-serif italic text-lg text-gray-500">Tested. Verified. Clean.</p>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Award className="h-5 w-5 text-[#234F32]" />
              3rd-party tested by <span className="font-bold border-b-2 border-[#234F32]">Eurofins</span>
            </div>
          </div>
        </section>

        {/* CLINICAL DATA SECTION */}
        <section className="bg-[#FAF9F7] py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-12 text-[#1A1A1A]">
              Clinically shown to heal your gut*
            </h2>

            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-gray-100">
                <div className="flex justify-between items-end border-b border-gray-100 pb-4 mb-6">
                  <span className="font-bold text-gray-800">Results in 30 days</span>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">% of users</span>
                </div>

                <div className="space-y-8">
                  {[
                    { label: "Reduced daily bloating", value: "82%" },
                    { label: "Improved digestion", value: "76%" },
                    { label: "Felt lighter & more energetic", value: "68%" },
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="bg-[#F4F8F5] p-2 rounded-full">
                          <Check className="h-5 w-5 text-[#234F32]" strokeWidth={3} />
                        </div>
                        <span className="font-medium text-gray-700">{stat.label}</span>
                      </div>
                      <span className="font-bold text-2xl text-[#1A1A1A]">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#234F32] text-white p-8 md:p-10 rounded-[2rem] shadow-xl flex flex-col justify-center relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                <h3 className="font-medium text-xl opacity-90 mb-4">
                  In the first 30 days, severe bloating was reduced by
                </h3>
                <p className="text-7xl md:text-8xl font-serif font-light mb-4">
                  74<span className="text-5xl">%</span>
                </p>
                <p className="text-sm opacity-70 border-t border-white/20 pt-4 mt-auto">
                  *Based on a 30-day consumer study of 120 participants.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CLINICIAN EVALUATION */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#234F32] mb-2 block">
                Expert Backed
              </span>
              <h2 className="font-serif text-3xl">Independent Clinician Evaluation</h2>
            </div>

            <div className="bg-[#FAF9F7] p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-center md:items-start border border-gray-100">
              <div className="w-24 h-24 shrink-0 bg-gray-200 rounded-full border-4 border-white shadow-md overflow-hidden">
                <img
                  src="https://i.pravatar.cc/150?img=32"
                  alt="Dr. Sarah Jenkins"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1 mb-2 text-[#FFB800]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <h3 className="font-bold text-lg">"The most efficient probiotic delivery I've seen."</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">
                  "Most probiotic capsules are destroyed by stomach acid before they ever reach the gut. The sublingual
                  delivery of NEUVIE strips allows the active compounds to bypass the harsh gastric environment. It's an
                  elegant, highly effective solution for chronic bloating."
                </p>
                <div className="text-sm">
                  <p className="font-bold text-[#1A1A1A]">Dr. Sarah Jenkins, MD</p>
                  <p className="text-gray-500">Board Certified Gastroenterologist</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON */}
        <section className="py-16 md:py-24 max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">A Ritual That Actually Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stop swallowing giant pills that upset your stomach. NEUVIE Strips are crafted to be easy, delicious, and
              up to 5x more bioavailable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-0 border border-gray-200 rounded-[2rem] overflow-hidden shadow-lg">
            {/* Our Product */}
            <div className="bg-[#234F32] p-8 md:p-12 text-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full" />
              <div className="flex items-center gap-4 mb-8">
                <img src={neuvieLogo} alt="NEUVIE" className="h-6 brightness-0 invert" />
                <span className="font-serif text-xl border-l border-white/20 pl-4">Daily Strips™</span>
              </div>
              <ul className="space-y-6 relative z-10">
                {[
                  "Absorbs 5x faster through oral tissue",
                  "100% survives past stomach acid",
                  "Delicious wild berry taste you crave",
                  "No water needed—just place on tongue",
                  "Clean ingredients, zero fillers",
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 rounded-full bg-white/20 p-1 backdrop-blur-sm">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-base font-medium">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Competitor */}
            <div className="bg-white p-8 md:p-12 relative">
              <h3 className="font-bold text-gray-400 text-xl mb-8 uppercase tracking-widest">
                Typical Pills & Powders
              </h3>
              <ul className="space-y-6">
                {[
                  "Slow digestion, low bioavailability",
                  "Up to 80% destroyed by stomach acid",
                  "Bitter, hard-to-mask chalky taste",
                  "Inconvenient, messy, requires water",
                  "Often packed with synthetic binders",
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 rounded-full bg-red-50 p-1">
                      <div className="h-4 w-4 flex items-center justify-center text-red-500 font-bold">✕</div>
                    </div>
                    <span className="text-base text-gray-500">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* STICKY BOTTOM BAR FOR MOBILE */}
      <motion.div
        style={{ opacity: showStickyBar, y: useTransform(showStickyBar, [0, 1], [50, 0]) }}
        className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 pb-safe z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] md:hidden pointer-events-auto"
      >
        <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#D44638]">SAVE 36%</span>
            <span className="font-bold text-lg">${subPrice}</span>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={loading}
            className="flex-1 h-12 text-base font-bold rounded-xl bg-[#234F32] text-white shadow-md active:scale-95 transition"
          >
            Add to Cart
          </Button>
        </div>
      </motion.div>

      <Footer />
      <CartDrawer />
    </div>
  );
}
