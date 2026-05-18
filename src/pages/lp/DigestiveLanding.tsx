import { useEffect, useState } from "react";
import {
  Star,
  Check,
  ChevronDown,
  ChevronUp,
  Package,
  BookOpen,
  Truck,
  Gift,
  Sparkles,
  ShieldCheck,
  Leaf,
  FlaskConical,
  Stethoscope,
  UserRound,
  WheatOff,
  Nut,
  Cherry,
  Microscope,
  CircleDot,
  Wind,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { fetchProductByHandle, ShopifyProduct, optimizeShopifyImage } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { PageMeta } from "@/components/seo";
import { toast } from "sonner";

const PRIMARY_HANDLE = "digestive-gut-health-strips";

// Brand tokens (Luxury Wellness): Forest primary, Cream bg, Terracotta accent
const AURI_BG = "#f7f3ec";
const AURI_GREEN = "#2e4a3c";
const AURI_RED = "#c8794a";
const AURI_TEXT = "#2A2A2A";

export default function DigestiveLanding() {
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);

  // States
  const [isSubscription, setIsSubscription] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  // Accordion states mapped exactly like Auri
  const [openHeroAcc, setOpenHeroAcc] = useState<string | null>(null);
  const [openBenefitAcc, setOpenBenefitAcc] = useState<string>("focus");
  const [openDetailAcc, setOpenDetailAcc] = useState<string>("ingredients");
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setOpen);
  const cartCount = useCartStore((s) => s.totalItems());

  useEffect(() => {
    fetchProductByHandle(PRIMARY_HANDLE).then((p) => {
      setProduct(p);
      setLoading(false);
    });
  }, []);

  const normalPrice = 49.99;
  const subPrice = 31.99;
  const currentPrice = isSubscription ? subPrice : normalPrice;

  const handleAddToCart = async () => {
    if (!product) return;
    const variant = product.variants.edges[0]?.node;
    if (!variant) return;

    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: { amount: currentPrice.toString(), currencyCode: "USD" },
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });
    setCartOpen(true);
    toast.success("Added to cart!");
  };

  const images = product?.images.edges.map((e) => e.node.url) || [null, null, null, null, null];

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: AURI_BG, color: AURI_TEXT }}>
      <PageMeta
        title="Super Digestive Daily Strips | NEUVIE™"
        description="Beat the bloat. Clinical gut health support."
      />

      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="max-w-[1200px] mx-auto py-8 md:py-12 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Gallery */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square bg-white rounded-lg p-8 relative flex justify-center items-center">
              <span className="absolute top-4 right-4 bg-[#F2D7D8] text-[#9F2228] text-[10px] font-bold uppercase tracking-wider px-2 py-1">
                SUMMER SALE - 36% OFF
              </span>
              {images[activeImage] ? (
                <img
                  src={optimizeShopifyImage(images[activeImage] as string, 800)}
                  alt="NEUVIE"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 animate-pulse" />
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {images.map(
                (img, i) =>
                  img && (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-20 h-20 bg-white border ${activeImage === i ? "border-gray-800" : "border-transparent"} p-1`}
                    >
                      <img
                        src={optimizeShopifyImage(img, 200)}
                        alt={`Thumb ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ),
              )}
            </div>
          </div>

          {/* Right: Buy Box */}
          <div className="flex flex-col">
            {/* Reviews */}
            <div className="flex items-center gap-1 mb-2">
              <div className="flex" style={{ color: AURI_GREEN }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold underline ml-1">4.9/5.0 (7076) | 1M+ Customers</span>
            </div>

            <h1 className="font-serif text-[42px] leading-tight mb-1 text-black">Super Digestive</h1>
            <h2 className="text-[28px] font-serif text-black mb-2">Daily Strips®</h2>
            <p className="text-[13px] text-gray-500 mb-6">Wild Berry | Bloat Relief + Digestion | NEUVIE Nutrition™</p>

            {/* Price Line */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-bold uppercase text-gray-500">Sale Price</span>
              <span className="text-[28px] font-bold" style={{ color: AURI_RED }}>
                ${currentPrice}
              </span>
              <span className="text-xs font-bold uppercase text-gray-500 ml-2">Regular Price</span>
              <span className="text-lg text-gray-400 line-through">${normalPrice}</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#F2D7D8] text-[#9F2228] text-xs font-bold px-2 py-1">36% OFF TODAY</span>
              <span className="bg-[#F6E9CC] text-[#8C6D1F] text-xs font-bold px-2 py-1">Low Stock — 90% Sold</span>
            </div>

            {/* Green Box */}
            <div className="border border-green-800 bg-[#E8EFEA] p-4 mb-6 rounded text-sm relative">
              <div className="font-bold text-center mb-3 flex items-center justify-center gap-1.5" style={{ color: AURI_GREEN }}>
                <Check className="h-4 w-4" strokeWidth={3} /> 36% OFF AUTO-APPLIED TODAY
              </div>
              <p className="font-bold mb-2">Here's what you'll get:</p>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 shrink-0" style={{ color: AURI_GREEN }} strokeWidth={1.75} />
                  30 Servings of Strips
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 shrink-0" style={{ color: AURI_GREEN }} strokeWidth={1.75} />
                  FREE gut health guide
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 shrink-0" style={{ color: AURI_GREEN }} strokeWidth={1.75} />
                  FREE US shipping
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 shrink-0" style={{ color: AURI_GREEN }} strokeWidth={1.75} />
                  FREE mystery gifts — <span className="underline text-xs">View Gifts</span>
                </div>
              </div>
            </div>

            {/* Subscription Toggle */}
            <div className="space-y-0 mb-6 border border-gray-300 rounded overflow-hidden">
              <label
                className={`flex flex-col p-4 cursor-pointer border-b border-gray-200 ${isSubscription ? "bg-[#F2F8F4]" : "bg-white"}`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={isSubscription}
                    onChange={() => setIsSubscription(true)}
                    className="w-4 h-4 accent-green-800"
                  />
                  <span className="font-bold text-sm">Auto-refill every 4 weeks at ${subPrice}</span>
                </div>
                {isSubscription && (
                  <p className="text-[11px] text-gray-600 mt-2 pl-7">
                    3 days before your next shipment is set to go through, we'll email you a reminder. By default, it'll
                    be another 30 servings delivered to you, and you can easily adjust or cancel at anytime.
                  </p>
                )}
              </label>

              <label
                className={`flex items-center justify-between p-4 cursor-pointer ${!isSubscription ? "bg-[#F2F8F4]" : "bg-white"}`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={!isSubscription}
                    onChange={() => setIsSubscription(false)}
                    className="w-4 h-4 accent-green-800"
                  />
                  <div>
                    <span className="font-bold text-sm block">Buy Once</span>
                    <span className="text-[11px] text-gray-500">Does not include free gifts.</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sm block">${normalPrice}</span>
                  <span className="text-[11px] text-gray-500">+ $6.95 Shipping</span>
                </div>
              </label>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full h-14 text-[15px] font-bold tracking-wide uppercase"
              style={{ backgroundColor: AURI_GREEN, color: "white" }}
            >
              Add to Cart →
            </Button>

            <p className="text-center text-xs font-bold mt-3 mb-6">
              3-6 months of consistent use recommended to see results.
            </p>

            {/* Trust Quote */}
            <div className="bg-white p-4 border border-gray-200 rounded text-center mb-6">
              <div className="flex justify-center gap-1 mb-2" style={{ color: AURI_GREEN }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </div>
              <p className="text-[13px] italic mb-2">
                "Its digestive benefits really come to light after the first week with my bloating disappearing and an
                overall sense of increased well being."
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center text-[10px] font-bold text-pink-800">
                  R
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold">Rebecca R.</p>
                  <p className="text-[9px] text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-gray-200">
              {[
                {
                  id: "desc",
                  title: "Description",
                  content:
                    "Our Daily Digestive Strips are designed to melt on your tongue and deliver clinical ingredients directly into your system, bypassing harsh stomach acids.",
                },
                {
                  id: "ing",
                  title: "Ingredients",
                  content:
                    "Probiotic Blend (50B CFU), Prebiotic Fiber, Ginger Root Extract, Peppermint. Vegan, Gluten-Free.",
                },
                {
                  id: "ship",
                  title: "Shipping & Guarantee",
                  content: "Free shipping on subscription. 60-Day money back guarantee.",
                },
                {
                  id: "sub",
                  title: "Subscriber Perks",
                  content:
                    "Subscribers get 36% off, free shipping, free mystery gifts, and our digital gut health guide.",
                },
              ].map((acc) => (
                <div key={acc.id} className="border-b border-gray-200">
                  <button
                    onClick={() => setOpenHeroAcc(openHeroAcc === acc.id ? null : acc.id)}
                    className="w-full py-4 flex justify-between items-center font-serif text-[15px]"
                  >
                    {acc.title}
                    {openHeroAcc === acc.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  {openHeroAcc === acc.id && <div className="pb-4 text-[13px] text-gray-600">{acc.content}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLINICAL GRAPH SECTION */}
        <section className="bg-white py-12 md:py-16">
          <div className="max-w-[1000px] mx-auto px-4">
            <h2 className="font-serif text-[32px] text-center mb-8">Clinically shown to reduce bloating*</h2>
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              {/* Left Table */}
              <div className="border border-gray-200 rounded p-6 bg-[#FBF9F6]">
                <div className="flex justify-between items-end border-b border-gray-200 pb-2 mb-4">
                  <span className="text-[11px] font-bold uppercase text-gray-500">Results in 60 days</span>
                  <span className="text-[11px] font-bold uppercase text-gray-500">% of users</span>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Reduced bloating", value: "78%" },
                    { label: "Better digestion", value: "74%" },
                    { label: "Lighter stomach", value: "70%" },
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div style={{ color: AURI_GREEN }}>
                          <Check className="h-4 w-4" strokeWidth={3} />
                        </div>
                        <span className="font-bold text-[15px]">{stat.label}</span>
                      </div>
                      <span className="font-bold text-xl">{stat.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[9px] text-gray-400 mt-6">
                  *Based on a 60-day consumer study. Individual results may vary.
                </p>
              </div>

              {/* Right Graph (Simulated) */}
              <div className="border border-gray-200 rounded p-6 bg-white relative flex flex-col">
                <h3 className="font-bold text-[15px] mb-2">
                  In the first 60 days,
                  <br />
                  bloating reduced by
                </h3>
                <p className="text-[54px] font-serif mb-8">64%</p>
                {/* Fake Graph Area */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-tr from-[#E8D1B5] to-transparent opacity-40 rounded-b" />
                <div className="mt-auto relative z-10 w-full border-b-2 border-dashed border-[#C19B6C] flex items-end justify-between px-4 pb-2">
                  <span className="text-[10px] font-bold">Day 1</span>
                  <span className="text-[10px] font-bold">Day 30</span>
                  <span className="text-[10px] font-bold">Day 60</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EUROFINS BANNER */}
        <section className="border-y border-gray-200 bg-white py-4">
          <div className="max-w-[1000px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="text-[#00529B] font-bold text-xl tracking-tighter">eurofins</div>
              <div>
                <p className="font-bold text-[15px]">Tested. Verified. Clean.</p>
                <p className="text-[11px] text-gray-500">
                  NEUVIE is 3rd-party tested by Eurofins to ensure safety, potency, and purity.
                </p>
              </div>
            </div>
            <button className="border border-black px-4 py-2 text-[11px] font-bold uppercase tracking-wider">
              View Recent Results →
            </button>
          </div>
        </section>

        {/* LIFE CHANGING BENEFITS */}
        <section className="max-w-[1000px] mx-auto py-16 px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden aspect-[4/3] bg-gray-100">
              {/* Fallback image if product image isn't available */}
              {images[0] && (
                <img src={optimizeShopifyImage(images[0]!, 600)} className="w-full h-full object-cover" alt="Benefits" />
              )}
            </div>
            <div>
              <h2 className="font-serif text-[32px] mb-2">Life-Changing Benefits</h2>
              <p className="text-gray-500 text-[13px] mb-8">Become your best self</p>

              <div className="space-y-0 border-t border-gray-200">
                {[
                  {
                    id: "focus",
                    title: "Reduce Daily Bloating*",
                    content:
                      "Prebiotic fibers and natural extracts target trapped gas and soothe the stomach lining almost instantly.",
                  },
                  {
                    id: "inf",
                    title: "Improve Inflammatory Response*",
                    content:
                      "The blend of ginger and peppermint is rich in anti-inflammatory components shown to support a normal inflammatory response in the gut.",
                  },
                  {
                    id: "gut",
                    title: "Improve Gut Health*",
                    content:
                      "Our 50B CFU Probiotic blend contains nutrients to support healthy gut bacteria. It helps balance good microbes while supporting cellular energy.",
                  },
                  {
                    id: "imm",
                    title: "Immune System Support*",
                    content:
                      "Since 70% of your immune system lives in your gut, daily support with our bioactive strips strengthens your natural defenses.",
                  },
                ].map((acc) => (
                  <div key={acc.id} className="border-b border-gray-200">
                    <button
                      onClick={() => setOpenBenefitAcc(openBenefitAcc === acc.id ? "" : acc.id)}
                      className="w-full py-5 flex justify-between items-center font-bold text-[14px]"
                    >
                      <div className="flex items-center gap-3">
                        <Sparkles className="h-4 w-4" style={{ color: AURI_GREEN }} strokeWidth={1.75} /> {acc.title}
                      </div>
                      {openBenefitAcc === acc.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                    {openBenefitAcc === acc.id && (
                      <div className="pb-5 pl-8 text-[13px] text-gray-600 leading-relaxed">{acc.content}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ALL IN ONE BANNER */}
        <section className="bg-[#F8EAE5] py-12 px-4 text-center">
          <h2 className="font-serif text-[32px] mb-2">All-in-One Strip for Superior Health</h2>
          <p className="text-[14px] text-gray-700 max-w-2xl mx-auto">
            An all-natural and effective dissolving supplement that targets bloating, immunity, gut health, and mood.
            Made to take everyday, just like a multivitamin.
          </p>
        </section>

        {/* A RITUAL THAT FEELS GOOD (COMPARISON) */}
        <section className="max-w-[1000px] mx-auto py-16 px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="font-serif text-[32px] mb-4">A Ritual That Feels Good</h2>
              <p className="text-[13px] text-gray-600 leading-relaxed">
                Skip bitter powders and hard-to-swallow capsules. NEUVIE strips are crafted to be easy to use,
                delicious, and designed for your daily wellness routine.
              </p>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-6 bg-[#F2F8F4]">
                <h3 className="font-bold text-[13px] mb-4 text-[#143C2B]">NEUVIE Digestive Strips</h3>
                <ul className="space-y-4">
                  {[
                    "Tastes great—something you'll want to take",
                    "Absorbs 5x faster in the mouth",
                    "No mixing, no water—just place on tongue",
                    "Built for your daily rhythm: simple and smooth",
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-2 text-[12px] font-bold">
                      <div className="mt-0.5 rounded-full bg-[#143C2B] p-0.5">
                        <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} />
                      </div>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-white">
                <h3 className="font-bold text-[13px] mb-4 text-gray-500">Typical Capsules & Powders</h3>
                <ul className="space-y-4">
                  {[
                    "Bitter, hard-to-mask taste",
                    "Can upset sensitive stomachs",
                    "Often packed with fillers",
                    "Easy to forget or skip",
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-2 text-[12px] text-gray-500">
                      <div className="mt-0.5 rounded-full bg-red-100 h-4 w-4 flex items-center justify-center shrink-0">
                        <span className="text-red-600 text-[10px] font-bold leading-none">×</span>
                      </div>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button
              onClick={handleAddToCart}
              className="h-12 px-8 text-[13px] font-bold uppercase tracking-wider"
              style={{ backgroundColor: AURI_GREEN, color: "white" }}
            >
              Try NEUVIE Risk-Free →
            </Button>
            <p className="text-[11px] font-bold mt-2">🛡️ 60-Day Moneyback Guarantee***</p>
          </div>
        </section>

        {/* INSIDE THE STRIPS */}
        <section className="bg-white py-16 border-t border-gray-200">
          <div className="max-w-[1000px] mx-auto px-4 text-center">
            <h2 className="font-serif text-[32px] mb-2">Inside the Strips</h2>
            <p className="text-[14px] text-gray-600 mb-12">
              Our Daily Strips have 4 clinical ingredients, highlighting these heavy hitters for your best health:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
              {[
                {
                  name: "Probiotics",
                  tag: "Gut-Health*",
                  desc: "Contains 50B CFU to support cellular energy and microbiome balance*",
                  Icon: CircleDot,
                },
                {
                  name: "Prebiotics",
                  tag: "Digestion*",
                  desc: "Fibers that feed the good bacteria and help regulate daily digestion*",
                  Icon: Sparkles,
                },
                {
                  name: "Ginger Root",
                  tag: "Soothing*",
                  desc: "Revered for its ability to calm the stomach lining and reduce nausea*",
                  Icon: Leaf,
                },
                {
                  name: "Peppermint",
                  tag: "Relief*",
                  desc: "Contains natural antispasmodic properties to alleviate trapped gas*",
                  Icon: Wind,
                },
              ].map((ing, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="w-20 h-20 rounded-full border border-gray-200 mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "#EFF3EE" }}
                  >
                    <ing.Icon className="h-8 w-8" style={{ color: AURI_GREEN }} strokeWidth={1.5} />
                  </div>
                  <h4 className="font-bold text-[15px]">{ing.name}</h4>
                  <span
                    className="text-white text-[9px] uppercase font-bold px-2 py-0.5 mt-1 mb-2"
                    style={{ backgroundColor: AURI_GREEN }}
                  >
                    {ing.tag}
                  </span>
                  <p className="text-[11px] text-gray-500 leading-relaxed px-2">{ing.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TASTY & DELICIOUS / SUPPLEMENT FACTS */}
        <section className="max-w-[1000px] mx-auto py-16 px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-[32px] mb-4">Tasty & Delicious</h2>
              <p className="text-[13px] text-gray-600 mb-8">
                Supplements have never tasted THIS good before. Get the relief you need and benefit from, without the
                nasty taste from powders and oils.
              </p>

              <div className="border-t border-gray-200 mb-8">
                {[
                  { id: "ingredients", title: "Ingredients", content: "Probiotics, Prebiotics, Ginger, Peppermint." },
                  {
                    id: "directions",
                    title: "Directions",
                    content: "Take one strip daily. Place on tongue and let dissolve for 30 seconds. No water needed.",
                  },
                  { id: "taste", title: "Taste", content: "Wild Raspberry" },
                ].map((acc) => (
                  <div key={acc.id} className="border-b border-gray-200">
                    <button
                      onClick={() => setOpenDetailAcc(openDetailAcc === acc.id ? "" : acc.id)}
                      className="w-full py-4 flex justify-between items-center font-bold text-[13px]"
                    >
                      {acc.title}
                      {openDetailAcc === acc.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                    {openDetailAcc === acc.id && <div className="pb-4 text-[12px] text-gray-600">{acc.content}</div>}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { icon: "🌾", label: "Gluten\nFree" },
                  { icon: "🥜", label: "Allergen\nFree" },
                  { icon: "🍓", label: "Naturally\nFlavored" },
                  { icon: "🔬", label: "Third-Party\nTested" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="text-2xl">{item.icon}</div>
                    <span className="text-[10px] font-bold whitespace-pre-line">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fake Supplement Facts Panel */}
            <div className="border border-gray-300 rounded p-6 bg-white shadow-sm">
              <div className="bg-[#143C2B] text-white text-center py-1 font-bold text-[10px] tracking-widest uppercase mb-4 rounded-sm">
                Super Digestive Daily Strips
              </div>
              <h3 className="font-bold text-3xl border-b-[8px] border-black pb-1 mb-2">Supplement Facts</h3>
              <div className="flex justify-between text-[11px] font-bold border-b border-gray-400 pb-1 mb-1">
                <span>Serving Size: 1 Strip</span>
                <span>Servings Per Container: 30</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold border-b-[4px] border-black pb-1 mb-2">
                <span>Amount per serving</span>
                <span>% Daily Value</span>
              </div>

              <div className="space-y-1 text-[11px] border-b-[4px] border-black pb-2 mb-2">
                <div className="flex justify-between border-b border-gray-300 pb-1">
                  <span>Calories</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-1">
                  <span>Total Carbohydrates</span>
                  <span>0g</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-1">
                  <span>Total Sugars</span>
                  <span>0g</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-1 font-bold">
                  <span>Proprietary Digestive Blend</span>
                  <span>150mg</span>
                </div>
                <div className="pl-2 text-[10px] text-gray-600 leading-tight">
                  Probiotic Blend (50B CFU), Prebiotic Inulin Fiber, Ginger Root Extract, Peppermint Leaf Extract.
                </div>
              </div>
              <p className="text-[9px] text-gray-500 leading-tight">
                * Daily Value not established.
                <br />
                <strong>Other Ingredients:</strong> Pullulan, Cellulose, Natural Raspberry Flavor, Stevia Extract.
              </p>
            </div>
          </div>
        </section>

        {/* DON'T TAKE OUR WORD (REVIEWS) */}
        <section className="bg-white py-16 border-t border-gray-200">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <h2 className="font-serif text-[32px] mb-2">Don't Take Our Word...</h2>
            <p className="text-[13px] text-gray-500 mb-10">
              Over 50,000 customers have experienced extraordinary results
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Ronald O.",
                  title: "Spectacular Product",
                  text: "The bloat has lifted. I find myself with a flat stomach. Great supplement for anybody looking.",
                },
                {
                  name: "Meki R.",
                  title: "First Thing I Take When I Wake Up!",
                  text: "I take it immediately after I wake up and I do not have stomach issues for the rest of the day.",
                },
                {
                  name: "Catherine L.",
                  title: "Nature at its finest!",
                  text: "This product boosts my mood and digestion. I noticed the improvements within the first week!",
                },
              ].map((rev, i) => (
                <div key={i} className="text-left">
                  <div className="aspect-[4/3] bg-gray-200 mb-4 rounded" /> {/* Placeholder for user photo/video */}
                  <div className="flex mb-2" style={{ color: AURI_GREEN }}>
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <h4 className="font-bold text-[14px] mb-2">{rev.title}</h4>
                  <p className="text-[12px] text-gray-600 mb-4 min-h-[60px]">{rev.text}</p>
                  <p className="text-[12px] font-bold">{rev.name}</p>
                  <p className="text-[10px] text-green-700 font-bold flex items-center gap-1">
                    <Check className="h-3 w-3" /> Verified Buyer
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR PROMISE & GUARANTEE */}
        <section className="py-12 bg-white text-center">
          <h3 className="font-serif text-[24px] mb-8">Our Promise</h3>
          <div className="flex justify-center gap-12 md:gap-24 mb-12">
            {[
              { icon: "✨", label: "Feels & tastes like\nclarity" },
              { icon: "🌿", label: "Crafted with premium\ningredients" },
              { icon: "🔬", label: "Rigorously lab tested" },
            ].map((p, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-3xl mb-3">{p.icon}</div>
                <p className="text-[12px] font-bold whitespace-pre-line leading-tight">{p.label}</p>
              </div>
            ))}
          </div>
          <p className="text-[12px] font-bold mb-8">🛡️ 60-Day Moneyback Guarantee***</p>

          <div className="max-w-[800px] mx-auto bg-[#F4F9F5] border border-green-200 p-6 rounded flex flex-col md:flex-row items-center gap-6 text-left">
            <div className="bg-[#143C2B] text-white p-3 rounded font-bold text-center leading-tight shrink-0">
              <span className="block text-2xl">60</span>DAY
            </div>
            <div>
              <h4 className="font-bold text-[15px] mb-1">60-Day Money Back Guarantee Protection</h4>
              <p className="text-[12px] text-gray-600">
                In the unlikely event that you are unhappy with our product, email us at{" "}
                <a href="mailto:hello@tryneuvie.com" className="underline font-bold">
                  hello@tryneuvie.com
                </a>{" "}
                and we'll return every dollar you paid on your first order, less shipping costs.
              </p>
            </div>
          </div>
        </section>

        {/* CLINICIAN REVIEWS */}
        <section className="bg-white py-16 border-t border-gray-200">
          <div className="max-w-[800px] mx-auto px-4">
            <div className="text-center mb-10">
              <span className="text-[20px]">🩺</span>
              <h2 className="font-serif text-[28px] mt-2 mb-2">Independent Clinician Evaluations</h2>
              <p className="text-[12px] text-gray-500">
                Effective review of products and claims by independent medical professionals.{" "}
                <span className="underline">Learn more</span>.
              </p>
            </div>

            <div className="border border-gray-200 rounded p-6 flex gap-6">
              <div className="shrink-0 text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2" />
                <p className="text-[11px] font-bold">Dr. Sarah Jenkins, MD</p>
                <p className="text-[9px] text-gray-500 mb-1">Verified Reviewer</p>
                <div className="text-[10px] text-left">
                  <p>
                    Specialty: <span className="font-bold">Gastroenterology</span>
                  </p>
                  <p>
                    Years in practice: <span className="font-bold">12</span>
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-[14px] mb-2">
                  Safely formulated with clinical ingredients to promote gut wellness
                </h4>
                <p className="text-[12px] text-gray-600 mb-4 leading-relaxed">
                  "Most supplements are destroyed by stomach acid. The sublingual delivery of NEUVIE strips allows the
                  active compounds to bypass the harsh gastric environment. It's an elegant, highly effective solution
                  for chronic bloating."
                </p>
                <p className="text-[11px] font-bold text-gray-800">
                  Highlights:{" "}
                  <span className="font-normal text-gray-600">✓ Gut Health ✓ Fast Acting ✓ Sublingual Delivery</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="bg-white py-16 border-t border-gray-200">
          <div className="max-w-[800px] mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="font-serif text-[32px] mb-2">FAQs</h2>
              <p className="text-[13px] text-gray-500">
                Use the below FAQ topics to find an answer! Still need help? Please email us at hello@tryneuvie.com :)
              </p>
            </div>

            <div className="border-t border-gray-200">
              {[
                {
                  q: "When is the best time to take these strips?",
                  a: "We recommend taking one strip in the morning to kick-start your digestion for the day, or immediately after a heavy meal if you feel bloated.",
                },
                {
                  q: "Will I actually feel a difference?",
                  a: "Many customers report feeling lighter and less bloated within the first 30 minutes of use.",
                },
                {
                  q: "Why are strips better than powders or capsules?",
                  a: "Powders can taste bitter and capsules get destroyed by stomach acid. Strips dissolve in your mouth, allowing ingredients to absorb up to 5x faster directly into your system.",
                },
                {
                  q: "Are these made with real ingredients?",
                  a: "Yes. We use premium, clinically-backed extracts and 50 Billion CFU of probiotics. No fillers, no junk.",
                },
              ].map((faq, i) => (
                <div key={i} className="border-b border-gray-200">
                  <button
                    onClick={() => setOpenFaq(openFaq === i.toString() ? null : i.toString())}
                    className="w-full py-5 flex justify-between items-center text-left"
                  >
                    <span className="font-bold text-[13px] uppercase tracking-wide text-gray-600">{faq.q}</span>
                    {openFaq === i.toString() ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                  {openFaq === i.toString() && (
                    <div className="pb-5 text-[13px] text-gray-600 leading-relaxed pr-8">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <button className="text-[11px] font-bold uppercase tracking-widest border border-gray-300 px-6 py-2 rounded-full hover:bg-gray-50">
                Load More
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
