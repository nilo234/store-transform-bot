import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
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

const AURI_BG = "#f7f3ec";
const AURI_GREEN = "#2e4a3c";
const AURI_RED = "#c8794a";
const AURI_TEXT = "#2A2A2A";

// ─── Reusable FadeIn wrapper ───────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────
function AnimatedBar({ value, delay = 0 }: { value: number; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: AURI_GREEN }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
      />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────

export default function DigestiveLanding() {
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubscription, setIsSubscription] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [openHeroAcc, setOpenHeroAcc] = useState<string | null>(null);
  const [openBenefitAcc, setOpenBenefitAcc] = useState<string>("focus");
  const [openDetailAcc, setOpenDetailAcc] = useState<string>("ingredients");
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setOpen);

  useEffect(() => {
    fetchProductByHandle(PRIMARY_HANDLE).then((p) => {
      setProduct(p);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const handler = () => setShowStickyBar(window.scrollY > 700);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
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

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="max-w-[1200px] mx-auto py-8 md:py-12 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left: Gallery */}
          <FadeIn>
            <div className="flex flex-col gap-4">
              <div className="aspect-square bg-white rounded-2xl p-8 relative flex justify-center items-center overflow-hidden shadow-sm">
                <motion.span
                  className="absolute top-4 right-4 bg-[#F2D7D8] text-[#9F2228] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  SUMMER SALE · 36% OFF
                </motion.span>
                <AnimatePresence mode="wait">
                  {images[activeImage] ? (
                    <motion.img
                      key={activeImage}
                      src={optimizeShopifyImage(images[activeImage] as string, 800)}
                      alt="NEUVIE"
                      className="w-full h-full object-contain"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.03 }}
                      transition={{ duration: 0.38 }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl" />
                  )}
                </AnimatePresence>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map(
                  (img, i) =>
                    img && (
                      <motion.button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-20 h-20 bg-white border-2 rounded-xl p-1 shrink-0 transition-colors ${
                          activeImage === i ? "border-[#2e4a3c]" : "border-transparent"
                        }`}
                      >
                        <img
                          src={optimizeShopifyImage(img, 200)}
                          alt={`Thumb ${i}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </motion.button>
                    )
                )}
              </div>
            </div>
          </FadeIn>

          {/* Right: Buy Box */}
          <FadeIn delay={0.1}>
            <div className="flex flex-col">
              {/* Stars */}
              <div className="flex items-center gap-1 mb-3">
                <div className="flex" style={{ color: AURI_GREEN }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} 