import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import {
  Heart,
  Zap,
  Shield,
  Leaf,
  Droplets,
  TrendingUp,
  Clock,
  CheckCircle,
  Award,
  Users,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Lock,
  Microscope,
  Flame,
  Brain,
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

// ─── COLOR SYSTEM ─────────────────────────────────────────────────────────
const NEUVIE = {
  bg: "#faf9f7",
  dark: "#1a1a1a",
  green: "#2e4a3c",
  accent: "#c8794a",
  light: "#f5f3f0",
  white: "#ffffff",
  text: "#1a1a1a",
  muted: "#8a8a8a",
};

// ─── LIVE STATS COUNTER ────────────────────────────────────────────────────
function LiveStats() {
  const [stripsToday, setStripsToday] = useState(2020);
  const [viewingNow, setViewingNow] = useState(30);

  useEffect(() => {
    const stripInterval = setInterval(() => {
      setStripsToday((prev) => prev + Math.floor(Math.random() * 10) + 3);
    }, 5000);

    const viewInterval = setInterval(() => {
      setViewingNow((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(15, Math.min(50, prev + change));
      });
    }, 3000);

    return () => {
      clearInterval(stripInterval);
      clearInterval(viewInterval);
    };
  }, []);

  return (
    <motion.div
      className="flex items-center gap-6 text-sm font-medium"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      <div className="flex items-center gap-2">
        <motion.div
          className="w-2 h-2 bg-green-500 rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-gray-600">
          <span className="font-bold text-green-600">{viewingNow}</span> people viewing
        </span>
      </div>
      <div className="w-px h-4 bg-gray-300" />
      <div className="flex items-center gap-2">
        <Zap size={16} style={{ color: NEUVIE.accent }} />
        <span className="text-gray-600">
          <span className="font-bold" style={{ color: NEUVIE.accent }}>
            {stripsToday.toLocaleString()}
          </span>{" "}
          dissolved today
        </span>
      </div>
    </motion.div>
  );
}

// ─── HERO: EMOTIONAL OPENING ──────────────────────────────────────────────
function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 80]);

  return (
    <motion.section style={{ y }} className="relative min-h-screen flex items-center pt-20 pb-12 md:pb-0">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#faf9f7] via-white to-[#f5f3f0] opacity-60 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Emotional Copy */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Problem Validation */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            <p className="text-base md:text-lg font-medium text-gray-600 leading-relaxed">You know that feeling.</p>
            <p className="text-base md:text-lg font-medium text-gray-600 leading-relaxed mt-2">
              That uncomfortable <span className="italic">bloat</span> after eating. The{" "}
              <span className="italic">heaviness</span> that follows you through the afternoon. The gut issues you've
              learned to just <span className="italic font-semibold text-gray-800">"deal with."</span>
            </p>
          </motion.div>

          {/* The Hook */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            But here's the truth:
            <br />
            <span style={{ color: NEUVIE.accent }}>you shouldn't have to</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-xl text-gray-700 leading-relaxed mb-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Your digestive system deserves real support. Not another capsule you'll forget by Wednesday.
          </motion.p>

          {/* Live Stats */}
          <LiveStats />
        </motion.div>

        {/* Right: Product Showcase */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
        >
          <motion.div
            className="relative w-full aspect-square max-w-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute -inset-8 rounded-3xl opacity-30 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, ${NEUVIE.accent}40 0%, transparent 70%)`,
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Product Image */}
            <div className="relative aspect-square bg-white rounded-3xl p-8 shadow-2xl flex items-center justify-center overflow-hidden border border-gray-100">
              <motion.img
                src="https://images.unsplash.com/photo-1576091160550-112173f7f869?w=600&h=600&fit=crop"
                alt="NEUVIE Digestive Strips"
                className="w-full h-full object-cover rounded-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              />

              {/* Badge */}
              <motion.div
                className="absolute top-6 right-6 bg-white shadow-lg px-4 py-3 rounded-full text-sm font-bold flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <Zap size={16} style={{ color: NEUVIE.accent }} />
                <span style={{ color: NEUVIE.accent }}>BEST SELLER 2026</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Key Feature Callouts */}
          <motion.div
            className="grid grid-cols-3 gap-4 w-full mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {[
              { icon: Clock, label: "Dissolves in", value: "3 seconds" },
              { icon: Zap, label: "Absorbs", value: "5x faster" },
              { icon: Droplets, label: "Contains", value: "10B CFU" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl p-4 text-center border border-gray-100 hover:border-gray-300 transition-colors"
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
              >
                <motion.div
                  className="flex justify-center mb-2"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <item.icon size={20} style={{ color: NEUVIE.green }} />
                </motion.div>
                <p className="text-xs text-gray-600 mb-1">{item.label}</p>
                <p className="font-bold text-sm">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// ─── SOLUTION SECTION: WHAT NEUVIE DOES ────────────────────────────────────
function SolutionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    {
      icon: Flame,
      title: "Bacillus Coagulans 10B CFU",
      desc: "Clinically-proven probiotic strain. Supports gut flora balance and restores healthy digestive ecosystem.",
    },
    {
      icon: Microscope,
      title: "Triple Enzyme Blend",
      desc: "Protease, Papain, Bromelain. Breaks down food efficiently so your body can absorb nutrients faster.",
    },
    {
      icon: Brain,
      title: "Absorbs 5x Faster",
      desc: "Dissolves on your tongue in 3 seconds. No water. No planning. One strip after meals — that's it.",
    },
  ];

  return (
    <section ref={ref} className="max-w-5xl mx-auto px-4 md:px-8 py-20 md:py-32">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">What NEUVIE Does</h2>
        <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          NEUVIE combines scientific precision with real-world simplicity. It's the only digestive strip that tackles
          bloating, discomfort, and poor digestion <span className="font-semibold">from two angles at once.</span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefits.map((benefit, i) => (
          <motion.div
            key={i}
            className="p-8 rounded-2xl bg-white border border-gray-100 hover:border-gray-300 transition-colors relative overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: i * 0.15,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -8 }}
          >
            {/* Hover gradient */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: `linear-gradient(135deg, ${NEUVIE.accent}08 0%, ${NEUVIE.green}08 100%)`,
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              <motion.div
                className="mb-4 inline-block p-3 rounded-lg"
                style={{ backgroundColor: `${NEUVIE.green}15` }}
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <benefit.icon size={24} style={{ color: NEUVIE.green }} />
              </motion.div>
              <h3 className="font-black text-lg mb-3">{benefit.title}</h3>
              <p className="text-gray-700 leading-relaxed text-sm">{benefit.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── PRICING & MAIN CTA ────────────────────────────────────────────────────
function PricingSection() {
  const [isSubscription, setIsSubscription] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setOpen);
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);

  useEffect(() => {
    fetchProductByHandle(PRIMARY_HANDLE).then((p) => {
      setProduct(p);
    });
  }, []);

  const handleAddToCart = async () => {
    if (!product) return;
    const variant = product.variants.edges[0]?.node;
    if (!variant) return;

    const price = isSubscription ? "23.99" : "29.99";

    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: { amount: price, currencyCode: "USD" },
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });
    setCartOpen(true);
    toast.success("Added to cart!");
  };

  return (
    <section ref={ref} className="max-w-5xl mx-auto px-4 md:px-8 py-20 md:py-32">
      <motion.div
        className="bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-12 shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Pricing Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <div className="mb-8">
              <p className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-4">
                Digestive + Gut Health Strips
              </p>
              <motion.div
                className="text-5xl md:text-6xl font-black mb-3"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
              >
                <span style={{ color: NEUVIE.green }}>${isSubscription ? "23.99" : "29.99"}</span>
                <span className="text-2xl text-gray-500 line-through ml-3">$49.99</span>
              </motion.div>
              <motion.p
                className="text-lg font-semibold mb-8"
                style={{ color: NEUVIE.accent }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.25 }}
              >
                {isSubscription ? "Save 52% with subscription" : "One-time purchase"}
              </motion.p>

              <p className="text-gray-700 mb-6 font-medium">
                30 strips per pack · One full month · Ships within 1–2 business days
              </p>

              {/* Toggle */}
              <motion.div
                className="flex gap-3 mb-8"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  onClick={() => setIsSubscription(true)}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all ${
                    isSubscription ? "bg-gray-900 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe & Save
                </motion.button>
                <motion.button
                  onClick={() => setIsSubscription(false)}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all ${
                    !isSubscription ? "bg-gray-900 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Buy Once
                </motion.button>
              </motion.div>

              {/* CTA Button */}
              <motion.button
                onClick={handleAddToCart}
                className="w-full py-4 px-6 rounded-xl font-black text-lg text-white shadow-lg relative overflow-hidden group"
                style={{
                  background: `linear-gradient(135deg, ${NEUVIE.green} 0%, ${NEUVIE.accent} 100%)`,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35, duration: 0.6 }}
              >
                <motion.span
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                  style={{ background: "white" }}
                />
                <span className="relative flex items-center justify-center gap-2">
                  Add to Cart
                  <ChevronRight size={20} />
                </span>
              </motion.button>

              {/* Trust Elements */}
              <motion.div
                className="mt-6 space-y-2"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                {["✓ 14-day money-back guarantee", "✓ Free shipping on $50+", "✓ Cancel subscription anytime"].map(
                  (item, i) => (
                    <p key={i} className="text-sm text-gray-700">
                      {item}
                    </p>
                  ),
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Bundle Upsell */}
          <motion.div
            className="bg-gradient-to-br from-[#faf9f7] to-[#f5f3f0] rounded-2xl p-8 border-2 border-gray-200 relative overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="absolute top-4 right-4 bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold text-xs"
              initial={{ scale: 0, rotate: -180 }}
              animate={inView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              SAVE $25.19
            </motion.div>

            <h3 className="font-black text-2xl mb-3">Better Together</h3>
            <p className="text-gray-700 mb-6 font-medium">
              The Gut Feeling Bundle includes 4 premium formulations designed to work synergistically.
            </p>

            <div className="space-y-3 mb-8">
              {[
                "Digestive + Gut Health Strips",
                "Probiotic Support Formula",
                "Iron Absorption Enhancer",
                "Appetite Balance Strips",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                >
                  <CheckCircle size={18} style={{ color: NEUVIE.green }} />
                  <span className="text-gray-700 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-4xl font-black mb-4"
              style={{ color: NEUVIE.green }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              $114.77
            </motion.div>
            <p className="text-gray-600 text-sm mb-6 font-medium">Regularly $139.96 • Save 18%</p>

            <motion.button
              className="w-full py-3 px-6 rounded-lg font-bold text-white transition-all"
              style={{ backgroundColor: NEUVIE.accent }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Upgrade to Bundle
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── 6-WEEK TIMELINE ───────────────────────────────────────────────────────
function TimelineSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const timeline = [
    {
      week: "Week 1–2",
      title: "Your Routine Locks In",
      desc: "Easier than coffee. One strip after meals. Simple consistency.",
      icon: Clock,
    },
    {
      week: "Week 3–4",
      title: "Subtle Shifts Begin",
      desc: "Better mood. More energy. Improved digestion consistency.",
      icon: TrendingUp,
    },
    {
      week: "Week 5–6",
      title: "Visible, Lasting Results",
      desc: "You feel it. You see it. The bloat is gone.",
      icon: CheckCircle,
    },
  ];

  return (
    <section ref={ref} className="max-w-5xl mx-auto px-4 md:px-8 py-20 md:py-32">
      <motion.h2
        className="text-4xl md:text-5xl font-black text-center mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        What to Expect
      </motion.h2>
      <motion.p
        className="text-xl text-gray-700 text-center mb-16 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.1, duration: 0.8 }}
      >
        Lighter digestion & a happier gut in 6 weeks — or your money back.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {timeline.map((stage, i) => {
          const Icon = stage.icon;
          return (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.15,
                duration: 0.8,
              }}
            >
              {/* Timeline connector */}
              {i < timeline.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-12 left-[60%] w-[40%] h-0.5"
                  style={{ backgroundColor: NEUVIE.green }}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: i * 0.15 + 0.4, duration: 0.8 }}
                />
              )}

              {/* Card */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 relative">
                {/* Icon circle */}
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${NEUVIE.green}15` }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon size={28} style={{ color: NEUVIE.green }} />
                </motion.div>

                <p className="text-sm font-black text-gray-600 uppercase mb-2 tracking-widest">{stage.week}</p>
                <h3 className="font-black text-xl mb-3">{stage.title}</h3>
                <p className="text-gray-700 leading-relaxed">{stage.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom guarantee */}
      <motion.div
        className="mt-16 p-8 rounded-2xl border-2"
        style={{ borderColor: NEUVIE.accent, backgroundColor: `${NEUVIE.accent}08` }}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="flex gap-4 items-start">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <Shield size={24} style={{ color: NEUVIE.accent }} />
          </motion.div>
          <div>
            <p className="font-black text-lg mb-2">Don't feel a difference?</p>
            <p className="text-gray-700">
              Email us within 14 days for a full refund — no questions asked. We're that confident.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── INGREDIENTS SECTION ──────────────────────────────────────────────────
function IngredientsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const ingredients = [
    {
      name: "Bacillus Coagulans",
      dose: "10 Billion CFU (50 mg)",
      why: "Clinically-proven probiotic strain that restores healthy gut flora, improves digestion, and supports overall gut ecosystem balance.",
    },
    {
      name: "Protease",
      dose: "10 mg",
      why: "Breaks down proteins into amino acids. Prevents undigested protein from causing bloating and discomfort.",
    },
    {
      name: "Papain",
      dose: "10 mg",
      why: "Enzyme from papaya. Accelerates protein breakdown. Reduces post-meal bloating and heaviness.",
    },
    {
      name: "Bromelain",
      dose: "10 mg",
      why: "Enzyme from pineapple. Aids fat and carbohydrate digestion. Promotes nutrient absorption.",
    },
  ];

  return (
    <section ref={ref} className="max-w-5xl mx-auto px-4 md:px-8 py-20 md:py-32">
      <motion.h2
        className="text-4xl md:text-5xl font-black text-center mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Engineered Science
      </motion.h2>
      <motion.p
        className="text-xl text-gray-700 text-center mb-16 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.1, duration: 0.8 }}
      >
        Every ingredient chosen for clinical efficacy. Nothing unnecessary.
      </motion.p>

      <div className="space-y-4">
        {ingredients.map((ingredient, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-300 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              delay: i * 0.1,
              duration: 0.6,
            }}
            whileHover={{ x: 8 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
              <div>
                <p className="font-black text-lg">{ingredient.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">DOSAGE</p>
                <p className="font-bold" style={{ color: NEUVIE.green }}>
                  {ingredient.dose}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600 mb-1">WHY WE CHOSE IT</p>
                <p className="text-gray-700 leading-relaxed">{ingredient.why}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional certifications */}
      <motion.div
        className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {["Vegan", "Gluten-Free", "Non-GMO", "Lactose-Free", "3rd Party Tested"].map((cert, i) => (
          <motion.div
            key={i}
            className="text-center py-4 px-3 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <CheckCircle size={18} className="mx-auto mb-2" style={{ color: NEUVIE.green }} />
            <p className="font-bold text-sm">{cert}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── TESTIMONIAL CAROUSEL ─────────────────────────────────────────────────
function TestimonialCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      quote:
        "I never stuck with supplements before. But this is different — it's not a chore, it's a choice. 30 seconds to remind myself that I matter. And I do it every single day now.",
      author: "Lisa M.",
      role: "Verified Customer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
    {
      quote:
        "The bloating I've had for years just… stopped. Within a week. I felt like my body was finally working the way it should. This isn't hype, this is real relief.",
      author: "Marcus K.",
      role: "Verified Customer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    },
    {
      quote:
        "As someone who travels constantly, this is a lifesaver. No water needed, no mess, no planning. One strip and I'm good. Best $30 I spend every month.",
      author: "Sophie T.",
      role: "Verified Customer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    },
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="max-w-5xl mx-auto px-4 md:px-8 py-20 md:py-32">
      <motion.h2
        className="text-4xl md:text-5xl font-black text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Real People, Real Results
      </motion.h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-12 border border-gray-200 text-center"
        >
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill={NEUVIE.accent} color={NEUVIE.accent} />
            ))}
          </div>

          {/* Quote */}
          <p className="text-2xl md:text-3xl font-black mb-8 leading-tight">"{testimonials[activeSlide].quote}"</p>

          {/* Author */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <img
              src={testimonials[activeSlide].image}
              alt={testimonials[activeSlide].author}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-200"
            />
            <div className="text-left">
              <p className="font-black">{testimonials[activeSlide].author}</p>
              <p className="text-sm text-gray-600">{testimonials[activeSlide].role}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4">
            <motion.button
              onClick={prevSlide}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={20} style={{ color: NEUVIE.green }} />
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`h-2 rounded-full transition-all ${i === activeSlide ? "w-8" : "w-2"}`}
                  style={{
                    backgroundColor: i === activeSlide ? NEUVIE.green : NEUVIE.accent,
                  }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextSlide}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={20} style={{ color: NEUVIE.green }} />
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function NEUVIELanding() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductByHandle(PRIMARY_HANDLE).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: NEUVIE.bg, color: NEUVIE.text }}>
      <PageMeta
        title="NEUVIE™ Digestive + Gut Health Strips | Premium Probiotic Support"
        description="Beat the bloat. NEUVIE combines 10B CFU Bacillus Coagulans with digestive enzymes. Dissolves in 3 seconds. 14-day guarantee."
      />
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <SolutionSection />
        <PricingSection />
        <TimelineSection />
        <IngredientsSection />
        <TestimonialCarousel />
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
