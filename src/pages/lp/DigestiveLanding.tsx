import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Check,
  ShoppingCart,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Package,
  RefreshCw,
  Zap,
  Brain,
  Moon,
  Shield,
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
  const [isSubscription, setIsSubscription] = useState(true); // Default to Auto-Refill like Auri

  // Accordion states
  const [openAcc, setOpenAcc] = useState<string | null>("benefits");

  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setOpen);
  const cartCount = useCartStore((s) => s.totalItems());

  useEffect(() => {
    fetchProductByHandle(PRIMARY_HANDLE).then((p) => {
      setProduct(p);
      setLoading(false);
    });
  }, []);

  const handleAddToCart = async () => {
    if (!product) return;
    const variant = product.variants.edges[0]?.node;
    if (!variant) return;

    // In a real app, you would pass subscription vs one-time selling plan ID here
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: isSubscription ? (parseFloat(variant.price) * 0.85).toString() : variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });
    setCartOpen(true);
    toast.success("Added to cart!");
  };

  const normalPrice = product ? parseFloat(product.priceRange.minVariantPrice.amount) : 49.99;
  const subPrice = (normalPrice * 0.85).toFixed(2); // 15% off for sub
  const heroImage = product?.images.edges[0]?.node.url;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#2D2A26]">
      <PageMeta
        title="Beat the Bloat — Digestive Strips | NEUVIE™"
        description="Reduce bloating, support gut health, no pills needed. NEUVIE Digestive dissolving strips. Free US shipping."
      />

      {/* Top Banner (Like Auri) */}
      <div className="bg-[#2D2A26] text-white text-xs font-medium text-center py-2">
        Summer Sale: Up to <span className="font-bold text-[#E5B585]">15% OFF</span>
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center">
            <img src={neuvieLogo} alt="NEUVIE" className="h-8 w-auto" />
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <Link to="/shop" className="hover:text-[#E5B585]">
              Gummies
            </Link>
            <Link to="/elixirs" className="hover:text-[#E5B585]">
              Elixirs
            </Link>
            <Link to="/science" className="hover:text-[#E5B585]">
              Science
            </Link>
          </div>
          <button onClick={() => setCartOpen(true)} className="relative p-2">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-[#E5B585] text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION (Split like Auri) */}
        <section className="max-w-7xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl p-8 border border-gray-100 flex items-center justify-center relative">
              <span className="absolute top-4 left-4 bg-[#8C2A3C] text-white text-[10px] font-bold px-2 py-1 rounded">
                SUMMER SALE - 15% OFF
              </span>
              {heroImage ? (
                <img
                  src={optimizeShopifyImage(heroImage, 800)}
                  alt="NEUVIE Digestive Strips"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl" />
              )}
            </div>
            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-20 h-20 bg-white border border-gray-200 rounded-lg shrink-0 flex items-center justify-center cursor-pointer hover:border-[#2D2A26]"
                >
                  {heroImage && (
                    <img
                      src={optimizeShopifyImage(heroImage, 200)}
                      alt={`Thumb ${i}`}
                      className="w-16 h-16 object-contain opacity-70 hover:opacity-100"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Buy Box */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-[#2D2A26] text-[#2D2A26]" />
              ))}
              <span className="text-sm font-medium underline ml-1">4.9/5.0 (2,143)</span>
              <span className="text-sm text-gray-500 ml-1">| 50k+ Customers</span>
            </div>

            <h1 className="font-serif text-4xl mb-2 text-[#2D2A26]">Digestive Gut Health</h1>
            <p className="text-xl font-medium mb-1 text-[#2D2A26]">Daily Strips™</p>
            <p className="text-sm text-gray-500 mb-6">Wild Berry | Beat the Bloat + Digestion | NEUVIE™</p>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-[#8C2A3C]">${isSubscription ? subPrice : normalPrice}</span>
              <span className="text-lg text-gray-400 line-through">${normalPrice}</span>
              <span className="bg-[#8C2A3C] text-white text-xs font-bold px-2 py-1 rounded">15% OFF TODAY</span>
            </div>

            <div className="bg-[#F0F5F2] border border-[#C5D9CE] rounded-xl p-4 mb-6">
              <p className="text-sm font-bold text-[#2D5A43] text-center mb-3">15% OFF AUTO-APPLIED TODAY ✅</p>
              <p className="text-sm font-bold mb-2">Here's what you'll get:</p>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#2D5A43]" /> 30 Servings of Strips
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#2D5A43]" /> 100% natural wild berry flavoring
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#2D5A43]" /> FREE US shipping
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#2D5A43]" /> FREE 3-Month App Membership
                </li>
              </ul>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={loading}
              className="w-full h-14 text-lg font-bold rounded-full bg-[#2D5A43] hover:bg-[#204230] text-white shadow-lg mb-4"
            >
              Add to Cart →
            </Button>

            {/* Subscribe vs One-time Toggle (Auri style) */}
            <div className="space-y-3 mb-8">
              <label
                className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${isSubscription ? "border-[#2D5A43] bg-[#F0F5F2]" : "border-gray-200 bg-white"}`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={isSubscription}
                    onChange={() => setIsSubscription(true)}
                    className="w-4 h-4 text-[#2D5A43]"
                  />
                  <span className="font-bold text-sm">Auto-refill every 4 weeks at ${subPrice}</span>
                </div>
              </label>

              <label
                className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${!isSubscription ? "border-[#2D5A43] bg-[#F0F5F2]" : "border-gray-200 bg-white"}`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={!isSubscription}
                    onChange={() => setIsSubscription(false)}
                    className="w-4 h-4 text-[#2D5A43]"
                  />
                  <span className="font-bold text-sm">Buy Once</span>
                </div>
                <span className="text-sm font-bold">${normalPrice}</span>
              </label>
            </div>

            {/* Single Review callout */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center mb-8">
              <div className="flex justify-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-[#2D2A26] text-[#2D2A26]" />
                ))}
              </div>
              <p className="text-sm italic mb-4">
                "The bloating relief really comes to light after the first week. My stomach feels flat and my overall
                digestion is completely reset."
              </p>
              <p className="text-xs font-bold">
                — Sarah M. <span className="text-gray-400 font-normal">Verified Buyer</span>
              </p>
            </div>

            {/* Accordions */}
            <div className="border-t border-gray-200">
              {[
                { id: "benefits", title: "Life-Changing Benefits" },
                { id: "ingredients", title: "Ingredients" },
                { id: "shipping", title: "Shipping & Guarantee" },
              ].map((acc) => (
                <div key={acc.id} className="border-b border-gray-200">
                  <button
                    onClick={() => setOpenAcc(openAcc === acc.id ? null : acc.id)}
                    className="w-full py-4 flex justify-between items-center font-bold text-sm"
                  >
                    {acc.title}
                    {openAcc === acc.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  {openAcc === acc.id && (
                    <div className="pb-4 text-sm text-gray-600">
                      {acc.id === "benefits" &&
                        "Reduces bloating instantly. Supports a healthy gut microbiome with probiotics that actually survive to reach your gut."}
                      {acc.id === "ingredients" &&
                        "Probiotic Blend (50 Billion CFU), Prebiotic Fiber, Ginger Extract, Peppermint Extract. 100% Vegan, Sugar-Free."}
                      {acc.id === "shipping" &&
                        "Free shipping on orders over $50. 14-day money-back guarantee. If you don't love it, we'll refund you."}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLINICAL GRAPH SECTION */}
        <section className="bg-[#F8EFE6] py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">Clinically shown to reduce bloating*</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E5B585]/30">
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-bold">Results in 30 days</span>
                    <span className="text-xs text-gray-500">% of users</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-[#2D5A43]" /> <span>Reduced Bloating</span>
                    </div>
                    <span className="font-bold text-2xl">82%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-[#2D5A43]" /> <span>Better Digestion</span>
                    </div>
                    <span className="font-bold text-2xl">76%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-[#2D5A43]" /> <span>More Energy</span>
                    </div>
                    <span className="font-bold text-2xl">68%</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E5B585]/30 text-center flex flex-col justify-center h-full">
                <h3 className="font-bold text-xl mb-2">In the first 30 days, bloating reduced by</h3>
                <p className="text-6xl font-serif text-[#E5B585]">74%</p>
                {/* Optional: Add an SVG line chart here like Auri */}
              </div>
            </div>
          </div>
        </section>

        {/* STRIPS VS PILLS (The "A Ritual That Feels Good" section) */}
        <section className="py-16 max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl mb-4">A Ritual That Feels Good</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Skip bitter powders and hard-to-swallow capsules. NEUVIE Strips are crafted to be easy to use, delicious,
              and designed for your daily wellness routine.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-0 border border-gray-200 rounded-2xl overflow-hidden">
            <div className="bg-[#F0F5F2] p-8">
              <h3 className="font-bold text-lg mb-6">NEUVIE Fast-Dissolving Strips</h3>
              <ul className="space-y-4">
                {[
                  "Tastes great—something you'll want to take",
                  "Absorbs 5x faster through oral tissue",
                  "No water needed—just place on tongue",
                  "Built for your daily rhythm: simple and smooth",
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-[#2D5A43] p-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm font-medium">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8">
              <h3 className="font-bold text-lg mb-6">Typical Capsules & Powders</h3>
              <ul className="space-y-4">
                {[
                  "Bitter, hard-to-mask taste",
                  "Must pass through harsh stomach acid",
                  "Often packed with useless fillers",
                  "Easy to forget or skip",
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-red-100 p-0.5">
                      <div className="h-3 w-3 flex items-center justify-center text-red-600 text-xs font-bold">✕</div>
                    </div>
                    <span className="text-sm text-gray-600">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button
              onClick={handleAddToCart}
              className="h-12 px-8 rounded-full bg-[#2D5A43] hover:bg-[#204230] text-white"
            >
              Try NEUVIE Risk-Free →
            </Button>
            <p className="text-xs text-gray-500 mt-3">🛡️ 14-Day Moneyback Guarantee</p>
          </div>
        </section>

        {/* INSIDE THE STRIPS (Ingredient Circles) */}
        <section className="bg-white py-16 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl mb-4">Inside the Strips</h2>
            <p className="text-gray-600 mb-12">
              Our Digestive Strips have 4 clinical ingredients, highlighting these heavy hitters for your gut health:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "Probiotics", tag: "Gut-Health", desc: "50B CFU to support microbiome balance." },
                { name: "Prebiotics", tag: "Digestion", desc: "Feeds good bacteria to reduce bloating." },
                { name: "Ginger Root", tag: "Soothing", desc: "Naturally calms the stomach lining." },
                { name: "Peppermint", tag: "Relief", desc: "Eases gas and digestive discomfort." },
              ].map((ing, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-[#F8EFE6] border-2 border-[#E5B585] mb-4 flex items-center justify-center text-[#2D2A26] font-bold">
                    Image
                  </div>
                  <h4 className="font-bold">{ing.name}</h4>
                  <span className="bg-[#2D2A26] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded my-2">
                    {ing.tag}
                  </span>
                  <p className="text-xs text-gray-500 px-2">{ing.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF / REVIEWS GRID */}
        <section className="bg-[#FAF9F6] py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl mb-2">Don't Take Our Word...</h2>
              <p className="text-gray-600">Over 50,000 customers have experienced extraordinary results</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Jessica T.",
                  title: "Spectacular Product",
                  text: "The bloat has lifted. I find myself with a flat stomach all day. Great supplement for anybody looking.",
                },
                {
                  name: "Maria L.",
                  title: "First Thing I Take When I Wake Up!",
                  text: "I take it immediately after I wake up and my digestion is perfect for the rest of the day.",
                },
                {
                  name: "Amanda R.",
                  title: "Nature at its finest!",
                  text: "This product boosts my gut health. I noticed the improvements within the first week!",
                },
              ].map((rev, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4" /> {/* Image placeholder */}
                  <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-3 w-3 fill-[#2D2A26] text-[#2D2A26]" />
                    ))}
                  </div>
                  <h4 className="font-bold text-sm mb-2">{rev.title}</h4>
                  <p className="text-xs text-gray-600 mb-4 h-16">{rev.text}</p>
                  <p className="text-xs font-bold">{rev.name}</p>
                  <p className="text-[10px] text-gray-400">Verified Buyer</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
