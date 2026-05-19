import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { Star, Check, ChevronDown, Package, Truck, Gift, Sparkles, ShieldCheck, Leaf, ArrowRight } from "lucide-react";
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
const AURI_LIGHT = "#faf8f5";

// ─── Advanced Parallax Hero Image ──────────────────────────────────────────
function ParallaxHeroImage({ src, isLoading }: { src: string | null; isLoading: boolean }) {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 100]);
  const rotateZ = useTransform(scrollY, [0, 500], [0, 3]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.97]);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale }}
      className="aspect-square bg-white rounded-3xl p-8 relative flex justify-center items-center overflow-hidden shadow-2xl"
    >
      <motion.div style={{ rotateZ }} className="w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {src && !isLoading ? (
            <motion.img
              key={src}
              src={optimizeShopifyImage(src, 800)}
              alt="NEUVIE Product"
              className="w-full h-full object-contain filter drop-shadow-lg"
              initial={{ opacity: 0, scale: 0.85, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotateY: -90 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-50 animate-pulse rounded-2xl" />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 30% 40%, ${AURI_GREEN}10 0%, transparent 50%)`,
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Sale Badge with Animation */}
      <motion.div
        className="absolute top-6 right-6 bg-gradient-to-r from-[#F2D7D8] to-[#FFE5E0] text-[#9F2228] text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg backdrop-blur-sm"
        initial={{ opacity: 0, y: -20, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5, bounce: 0.4 }}
      >
        ⚡ SUMMER SALE · 36% OFF
      </motion.div>
    </motion.div>
  );
}

// ─── Animated Counter with Blur Reveal ────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
  duration = 2.5,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const step = 16;
    const increment = target / ((duration * 1000) / step);

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
  }, [inView, target, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="text-4xl md:text-5xl font-black"
      style={{ color: AURI_GREEN }}
    >
      {count}
      {suffix}
    </motion.span>
  );
}

// ─── Glasmorphic Benefit Card ──────────────────────────────────────────────
function BenefitCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotateX: 20 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <motion.div
        className="relative p-6 rounded-2xl backdrop-blur-md bg-white/40 border border-white/60 hover:border-white/80 transition-all duration-300 overflow-hidden"
        whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(46, 74, 60, 0.15)" }}
      >
        {/* Animated gradient background on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#2e4a3c]/5 via-transparent to-[#c8794a]/5 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        />

        {/* Icon with scaling animation */}
        <motion.div
          className="relative mb-4 inline-block p-3 rounded-xl bg-gradient-to-br from-[#2e4a3c] to-[#1a2d24] text-white"
          whileHover={{ scale: 1.15, rotate: 10 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Icon size={24} />
        </motion.div>

        {/* Content */}
        <h3 className="relative text-lg font-bold text-[#2A2A2A] mb-2">{title}</h3>
        <p className="relative text-sm text-gray-600 leading-relaxed">{description}</p>

        {/* Floating accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#2e4a3c] to-[#c8794a]"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Staggered Features Section ────────────────────────────────────────────
function FeaturesList({ features }: { features: Array<{ icon: React.ComponentType<any>; text: string }> }) {
  return (
    <div className="space-y-3">
      {features.map((feature, i) => {
        const ref = useRef(null);
        const inView = useInView(ref, { once: true, margin: "-100px" });

        return (
          <motion.div
            key={i}
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              delay: i * 0.08,
              duration: 0.5,
              ease: "easeOut",
            }}
            className="flex items-center gap-3 text-sm md:text-base"
          >
            <motion.div
              className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Check size={14} style={{ color: AURI_GREEN }} />
            </motion.div>
            <span className="text-gray-700">{feature.text}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Floating Badge Component ──────────────────────────────────────────────
function FloatingBadge({
  text,
  icon: Icon,
  position,
}: {
  text: string;
  icon: React.ComponentType<any>;
  position: { top?: string; right?: string; bottom?: string; left?: string };
}) {
  return (
    <motion.div
      className="absolute hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg border border-gray-100"
      style={position}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Icon size={16} style={{ color: AURI_GREEN }} />
      <span className="text-xs font-semibold text-gray-700">{text}</span>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function DigestiveLanding() {
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubscription, setIsSubscription] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setOpen);
  const { scrollY } = useScroll();

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

  const heroY = useTransform(scrollY, [0, 300], [0, -50]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.7]);

  // ─── Benefit Cards Data ────────────────────────────────────────────────
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Clinical Strength",
      description: "Backed by 15+ peer-reviewed studies. Proven digestive support.",
    },
    {
      icon: Sparkles,
      title: "Natural Formula",
      description: "Zero synthetic ingredients. Plant-based gut microbiome support.",
    },
    {
      icon: Leaf,
      title: "Eco-Conscious",
      description: "Biodegradable strips. Sustainable sourcing from regenerative farms.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: AURI_BG, color: AURI_TEXT }}>
      <PageMeta
        title="NEUVIE™ Digestive Strips | Beat the Bloat"
        description="Clinical gut health support. 36% OFF this summer."
      />
      <Navbar />

      <main className="flex-1">
        {/* ━━━━━━━━━━ HERO SECTION ━━━━━━━━━━ */}
        <motion.section
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-[1400px] mx-auto py-12 md:py-20 px-4 md:px-8 relative"
        >
          {/* Floating badges */}
          <FloatingBadge text="Doctor Approved" icon={ShieldCheck} position={{ top: "20%", right: "5%" }} />
          <FloatingBadge text="Fast Shipping" icon={Truck} position={{ bottom: "20%", left: "5%" }} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Product Gallery with Enhanced Animations */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <ParallaxHeroImage src={images[activeImage] as string} isLoading={loading} />

              {/* Thumbnail Gallery with Stagger */}
              <motion.div
                className="flex gap-3 mt-6 overflow-x-auto pb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {images.map(
                  (img, i) =>
                    img && (
                      <motion.button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`relative w-24 h-24 rounded-2xl border-2 p-2 shrink-0 transition-all ${
                          activeImage === i ? "border-[#2e4a3c] shadow-lg" : "border-gray-200 hover:border-gray-300"
                        }`}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <img
                          src={optimizeShopifyImage(img, 200)}
                          alt={`View ${i}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </motion.button>
                    ),
                )}
              </motion.div>
            </motion.div>

            {/* Right: Buy Box with Staggered Content */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              {/* Stars */}
              <motion.div
                className="flex items-center gap-2 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex" style={{ color: AURI_GREEN }}>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                    >
                      <Star size={18} fill="currentColor" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-600">4.9 (2,847 reviews)</span>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4">
                  Beat the{" "}
                  <span className="relative inline-block" style={{ color: AURI_RED }}>
                    Bloat
                    <motion.span
                      className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#c8794a] to-[#e8a878] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    />
                  </span>
                </h1>
              </motion.div>

              {/* Subheading */}
              <motion.p
                className="text-lg text-gray-600 mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Clinical-strength digestive support in convenient daily strips. Noticed results in as little as 3 days.
              </motion.p>

              {/* Price Section with Animation */}
              <motion.div
                className="mb-8 p-5 rounded-2xl bg-white/50 border border-white/80 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <motion.span
                    className="text-3xl md:text-4xl font-black"
                    style={{ color: AURI_GREEN }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    ${currentPrice.toFixed(2)}
                  </motion.span>
                  {isSubscription && (
                    <motion.span
                      className="text-lg line-through text-gray-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.42 }}
                    >
                      ${normalPrice.toFixed(2)}
                    </motion.span>
                  )}
                  {isSubscription && (
                    <motion.span
                      className="text-sm font-bold px-3 py-1 rounded-full bg-green-100 text-green-700"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.44, type: "spring", stiffness: 200 }}
                    >
                      Save 36%
                    </motion.span>
                  )}
                </div>

                {/* Subscription Toggle */}
                <motion.div
                  className="flex gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    onClick={() => setIsSubscription(true)}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      isSubscription
                        ? "bg-[#2e4a3c] text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Subscribe & Save
                  </motion.button>
                  <motion.button
                    onClick={() => setIsSubscription(false)}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      !isSubscription
                        ? "bg-[#2e4a3c] text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Buy Once
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
              >
                <motion.button
                  onClick={handleAddToCart}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#2e4a3c] to-[#1a2d24] text-white font-bold text-lg shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-[#c8794a] to-transparent opacity-0 group-hover:opacity-20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    Add to Cart
                    <ArrowRight size={20} />
                  </span>
                </motion.button>
              </motion.div>

              {/* Trust Badges */}
              <FeaturesList
                features={[
                  { icon: ShieldCheck, text: "30-day money-back guarantee" },
                  { icon: Truck, text: "Free shipping on orders over $50" },
                  { icon: Package, text: "Discreet, packaging included" },
                ]}
              />
            </motion.div>
          </div>
        </motion.section>

        {/* ━━━━━━━━━━ BENEFITS SECTION ━━━━━━━━━━ */}
        <section className="max-w-[1400px] mx-auto py-20 md:py-32 px-4 md:px-8 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">Why NEUVIE™?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Formulated by digestive specialists. Trusted by 50,000+ users worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <BenefitCard
                key={i}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━ STATS SECTION ━━━━━━━━━━ */}
        <section
          className="max-w-[1400px] mx-auto py-20 md:py-32 px-4 md:px-8 relative"
          style={{ backgroundColor: AURI_LIGHT, borderRadius: "24px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { value: 50000, suffix: "+", label: "Users Worldwide" },
              { value: 95, suffix: "%", label: "Would Recommend" },
              { value: 3, suffix: "", label: "Days to Feel Results" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2.5} />
                <p className="text-gray-600 font-medium mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━ STICKY CTA BAR ━━━━━━━━━━ */}
        <AnimatePresence>
          {showStickyBar && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 max-w-md w-full mx-4"
            >
              <motion.div
                className="p-5 rounded-2xl bg-white shadow-2xl border border-gray-100 backdrop-blur-md flex items-center justify-between gap-4"
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <p className="font-bold text-sm">${currentPrice.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">{isSubscription ? "Subscribe & Save 36%" : "Buy Once"}</p>
                </div>
                <motion.button
                  onClick={handleAddToCart}
                  className="px-6 py-2 rounded-lg bg-[#2e4a3c] text-white font-bold text-sm whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Cart
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
