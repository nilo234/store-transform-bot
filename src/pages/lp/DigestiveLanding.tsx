import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import {
  Star,
  Check,
  ChevronDown,
  Package,
  Truck,
  Gift,
  Sparkles,
  ShieldCheck,
  Leaf,
  ArrowRight,
  Shield,
  TrendingUp,
  Award,
  Users,
  Heart,
  Zap,
  ChevronLeft,
  ChevronRight,
  Clock,
  Lock,
  Eye,
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
const AURI_LIGHT = "#faf8f5";

// ─── COUNTDOWN TIMER ──────────────────────────────────────────────────────
function CountdownTimer() {
  const [time, setTime] = useState(36000); // 10 hours

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 36000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      className="flex flex-col items-center"
      key={`${label}-${value}`}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 0.3, when: "beforeChildren" }}
    >
      <div className="bg-gradient-to-br from-[#c8794a] to-[#a85a2f] text-white rounded-lg px-3 py-2 min-w-12 font-bold text-lg tabular-nums shadow-lg">
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-xs font-semibold mt-1 text-gray-600">{label}</span>
    </motion.div>
  );

  return (
    <div className="flex gap-2 items-end">
      <TimeUnit value={hours} label="HOURS" />
      <span className="text-2xl font-black text-gray-400 mb-2">:</span>
      <TimeUnit value={minutes} label="MINS" />
      <span className="text-2xl font-black text-gray-400 mb-2">:</span>
      <TimeUnit value={seconds} label="SECS" />
    </div>
  );
}

// ─── LIVE ACTIVITY FEED ────────────────────────────────────────────────────
function LiveActivityFeed() {
  const activities = [
    { name: "Sarah M.", action: "just purchased", time: "2 min ago" },
    { name: "John D.", action: "left a 5-star review", time: "5 min ago" },
    { name: "Emma L.", action: "just purchased", time: "8 min ago" },
    { name: "Michael P.", action: "left a 5-star review", time: "12 min ago" },
    { name: "Jessica K.", action: "just purchased", time: "15 min ago" },
  ];

  return (
    <motion.div
      className="fixed bottom-24 right-6 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-30 hidden lg:block"
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-xs font-bold text-gray-600">LIVE ACTIVITY</span>
      </div>
      <div className="space-y-2 max-h-48 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {activities.map((activity, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="text-xs p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <p className="font-semibold text-gray-800">{activity.name}</p>
              <p className="text-gray-500">{activity.action}</p>
              <p className="text-gray-400 text-[10px]">{activity.time}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── BEFORE/AFTER SLIDER ──────────────────────────────────────────────────
function BeforeAfterSlider() {
  const [slider, setSlider] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSlider(Math.min(100, Math.max(0, percentage)));
  };

  return (
    <motion.div
      className="relative w-full h-96 rounded-3xl overflow-hidden cursor-col-resize bg-gray-100"
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      {/* Before Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1576091160550-112173f7f869?w=800&h=600&fit=crop"
          alt="Before"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent" />
        <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
          BEFORE
        </div>
      </div>

      {/* After Image */}
      <motion.div className="absolute inset-0 w-full h-full overflow-hidden" style={{ width: `${slider}%` }}>
        <img
          src="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop"
          alt="After"
          className="w-full h-full object-cover"
          style={{ width: `calc(100% / (${slider} / 100))` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-green-500/20" />
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm">
          AFTER
        </div>
      </motion.div>

      {/* Slider Handle */}
      <motion.div className="absolute top-0 bottom-0 w-1.5 bg-white shadow-2xl" style={{ left: `${slider}%` }}>
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-xl p-2"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronLeft className="absolute right-1" size={16} />
          <ChevronRight className="absolute left-1" size={16} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── TESTIMONIAL CARD ─────────────────────────────────────────────────────
function TestimonialCard({
  name,
  image,
  rating,
  text,
  index,
}: {
  name: string;
  image: string;
  rating: number;
  text: string;
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
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <motion.div
        className="p-6 rounded-2xl backdrop-blur-md bg-white/50 border border-white/80 relative overflow-hidden h-full"
        whileHover={{ y: -12, boxShadow: "0 25px 50px rgba(46, 74, 60, 0.2)" }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#2e4a3c]/5 via-transparent to-[#c8794a]/5 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        />

        {/* Stars with animation */}
        <div className="flex gap-1 mb-4 relative z-10">
          {[...Array(rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ delay: index * 0.1 + i * 0.05 }}
            >
              <Star size={16} fill={AURI_GREEN} color={AURI_GREEN} />
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <p className="text-gray-700 font-medium mb-5 relative z-10 line-clamp-4">"{text}"</p>

        {/* Author */}
        <div className="flex items-center gap-3 relative z-10">
          <motion.img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
            whileHover={{ scale: 1.15, rotate: 360 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          <div>
            <p className="font-bold text-sm text-gray-800">{name}</p>
            <p className="text-xs text-gray-500">Verified Customer</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── ANIMATED GUARANTEE BOX ───────────────────────────────────────────────
function GuaranteeBox() {
  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2e4a3c] to-[#1a2d24] p-8 text-white"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-64 h-64 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #c8794a 0%, transparent 70%)",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10">
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <Shield size={32} />
          </motion.div>
          <h3 className="text-3xl font-black">100% RISK-FREE</h3>
        </motion.div>

        <motion.p
          className="text-lg leading-relaxed mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Try NEUVIE™ for 30 days completely risk-free. If you're not seeing results, we'll refund every penny. No
          questions asked.
        </motion.p>

        <motion.div
          className="flex gap-4 text-sm font-bold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <Check size={20} />
            <span>30-Day Money Back</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock size={20} />
            <span>Secure Checkout</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── SCIENCE STATS SECTION ────────────────────────────────────────────────
function ScienceStat({ stat, description, index }: { stat: string; description: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.7,
      }}
      className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80"
    >
      <motion.div
        className="text-4xl md:text-5xl font-black mb-2"
        style={{ color: AURI_GREEN }}
        animate={inView ? { scale: [1, 1.05, 1] } : {}}
        transition={{
          delay: index * 0.15 + 0.3,
          duration: 0.6,
        }}
      >
        {stat}
      </motion.div>
      <p className="text-gray-600 text-sm font-medium">{description}</p>
    </motion.div>
  );
}

// ─── TESTIMONIAL CAROUSEL ─────────────────────────────────────────────────
function TestimonialCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    {
      name: "Sarah Mitchell",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 5,
      text: "I was skeptical at first, but after 3 days I noticed less bloating. After 2 weeks, my energy levels changed completely. This is a game-changer.",
    },
    {
      name: "Michael Chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 5,
      text: "As someone with chronic digestive issues, this is the first product that actually works. No more mid-day crashes. Highly recommend.",
    },
    {
      name: "Jessica Rodriguez",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      rating: 5,
      text: "The convenience factor alone is worth it. These strips dissolve in seconds and I can take them anywhere. Results in 5 days for me.",
    },
    {
      name: "David Park",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      rating: 5,
      text: "Been using for 3 months. My digestion has never been better. Great customer service too when I had questions.",
    },
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <TestimonialCard {...testimonials[activeSlide]} index={activeSlide} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-center gap-4 mt-8">
        <motion.button
          onClick={prevSlide}
          className="p-3 rounded-full bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={20} style={{ color: AURI_GREEN }} />
        </motion.button>

        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === activeSlide ? "bg-[#2e4a3c] w-8" : "bg-gray-300"
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

        <motion.button
          onClick={nextSlide}
          className="p-3 rounded-full bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight size={20} style={{ color: AURI_GREEN }} />
        </motion.button>
      </div>

      {/* Dot indicators */}
      <motion.div
        className="text-center text-sm text-gray-500 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {activeSlide + 1} / {testimonials.length} verified customers
      </motion.div>
    </motion.div>
  );
}

// ─── AS SEEN IN LOGOS ──────────────────────────────────────────────────────
function AsSeenIn() {
  const logos = [
    { name: "Forbes", icon: "📰" },
    { name: "TechCrunch", icon: "⚡" },
    { name: "Vogue", icon: "💎" },
    { name: "NPR", icon: "🎙️" },
    { name: "Health", icon: "🏥" },
  ];

  return (
    <motion.div
      className="py-12 border-y border-gray-200"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <p className="text-center text-sm font-bold text-gray-500 mb-8 uppercase tracking-widest">As Seen In</p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
        {logos.map((logo, i) => (
          <motion.div
            key={i}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="text-4xl mb-2">{logo.icon}</div>
            <p className="text-xs font-semibold text-gray-600">{logo.name}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── ANIMATED FAQ ─────────────────────────────────────────────────────────
function AnimatedFAQ({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
      }}
      className="border border-gray-200 rounded-xl overflow-hidden"
    >
      <motion.button
        onClick={() => setOpen(!open)}
        className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
        whileHover={{ backgroundColor: "rgba(46, 74, 60, 0.02)" }}
      >
        <span className="font-semibold text-left text-gray-800">{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={20} style={{ color: AURI_GREEN }} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 bg-gray-50/50"
          >
            <p className="p-6 text-gray-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
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

  const faqs = [
    {
      question: "How long until I see results?",
      answer:
        "Most users notice results within 3-5 days. Full benefits are typically felt after 2-3 weeks of consistent use as your gut microbiome adjusts. Results may vary based on individual digestive health.",
    },
    {
      question: "Are the strips safe? Any side effects?",
      answer:
        "NEUVIE™ is made from natural, clinically-tested ingredients. Side effects are rare but may include mild bloating during the first 2-3 days as your gut adjusts. This is actually a sign it's working.",
    },
    {
      question: "Can I take this with medications?",
      answer:
        "While NEUVIE™ is natural, we recommend consulting your doctor if you're on prescription medications, especially digestive or blood-thinning medications.",
    },
    {
      question: "How often should I take them?",
      answer:
        "Take one strip daily, ideally with food. You can take it anytime during the day. Consistency is key for best results.",
    },
    {
      question: "What if I don't see results?",
      answer:
        "We offer a 100% 30-day money-back guarantee. No questions asked. If NEUVIE™ doesn't work for you, we'll refund your entire purchase.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: AURI_BG, color: AURI_TEXT }}>
      <PageMeta
        title="NEUVIE™ Digestive Strips | Beat the Bloat"
        description="Clinical gut health support with 100% risk-free guarantee."
      />
      <Navbar />

      <main className="flex-1">
        {/* ━━━━━━━━━━ HERO WITH COUNTDOWN ━━━━━━━━━━ */}
        <motion.div
          className="bg-gradient-to-b from-[#fff9f5] to-[#f7f3ec] py-6 border-b border-gray-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <p className="text-sm font-bold text-gray-600">⚡ SUMMER SALE ENDS IN</p>
            </motion.div>
            <CountdownTimer />
          </div>
        </motion.div>

        {/* ━━━━━━━━━━ HERO SECTION ━━━━━━━━━━ */}
        <motion.section
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-[1400px] mx-auto py-12 md:py-20 px-4 md:px-8 relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Product Gallery */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="aspect-square bg-white rounded-3xl p-8 relative flex justify-center items-center overflow-hidden shadow-2xl">
                <motion.span
                  className="absolute top-6 right-6 bg-gradient-to-r from-[#F2D7D8] to-[#FFE5E0] text-[#9F2228] text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg"
                  initial={{ opacity: 0, y: -20, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  ⚡ 36% OFF
                </motion.span>
                <AnimatePresence mode="wait">
                  {images[activeImage] ? (
                    <motion.img
                      key={activeImage}
                      src={optimizeShopifyImage(images[activeImage] as string, 800)}
                      alt="NEUVIE"
                      className="w-full h-full object-contain filter drop-shadow-lg"
                      initial={{ opacity: 0, scale: 0.85, rotateY: 90 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 1.1, rotateY: -90 }}
                      transition={{ duration: 0.6 }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-50 animate-pulse rounded-2xl" />
                  )}
                </AnimatePresence>
              </div>

              <motion.div
                className="flex gap-3 mt-6 overflow-x-auto pb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {images.map(
                  (img, i) =>
                    img && (
                      <motion.button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`relative w-24 h-24 rounded-2xl border-2 p-2 shrink-0 transition-all ${
                          activeImage === i ? "border-[#2e4a3c] shadow-lg" : "border-gray-200"
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

            {/* Right: Buy Box */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Social Proof Stats */}
              <motion.div
                className="flex gap-6 mb-6 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <div>
                  <p className="font-black text-2xl" style={{ color: AURI_GREEN }}>
                    50K+
                  </p>
                  <p className="text-gray-600">Happy Customers</p>
                </div>
                <div>
                  <p className="font-black text-2xl" style={{ color: AURI_GREEN }}>
                    4.9★
                  </p>
                  <p className="text-gray-600">2,847 Reviews</p>
                </div>
                <div>
                  <p className="font-black text-2xl" style={{ color: AURI_GREEN }}>
                    #1
                  </p>
                  <p className="text-gray-600">Trending Product</p>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="text-5xl lg:text-6xl font-black leading-tight mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Beat the{" "}
                <span style={{ color: AURI_RED }}>
                  Bloat
                  <motion.span
                    className="block h-1 bg-gradient-to-r from-[#c8794a] to-[#e8a878] rounded-full mt-2"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />
                </span>
              </motion.h1>

              <motion.p
                className="text-lg text-gray-600 mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                Clinically-proven digestive support. Results in 3-5 days.
              </motion.p>

              {/* Price Section */}
              <motion.div
                className="mb-8 p-6 rounded-2xl bg-white/60 border border-white/80 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <motion.span className="text-4xl font-black" style={{ color: AURI_GREEN }}>
                    ${currentPrice.toFixed(2)}
                  </motion.span>
                  {isSubscription && (
                    <>
                      <span className="text-lg line-through text-gray-400">${normalPrice.toFixed(2)}</span>
                      <span className="text-sm font-bold px-3 py-1 rounded-full bg-green-100 text-green-700">
                        Save 36%
                      </span>
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    onClick={() => setIsSubscription(true)}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      isSubscription ? "bg-[#2e4a3c] text-white shadow-lg" : "bg-gray-100 text-gray-600"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Subscribe & Save
                  </motion.button>
                  <motion.button
                    onClick={() => setIsSubscription(false)}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      !isSubscription ? "bg-[#2e4a3c] text-white shadow-lg" : "bg-gray-100 text-gray-600"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Buy Once
                  </motion.button>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.button
                onClick={handleAddToCart}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#2e4a3c] to-[#1a2d24] text-white font-bold text-lg shadow-lg mb-4 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-[#c8794a] to-transparent opacity-0 group-hover:opacity-20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.4 }}
                />
                <span className="relative flex items-center justify-center gap-2">
                  Add to Cart <ArrowRight size={20} />
                </span>
              </motion.button>

              {/* Trust Elements */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {[
                  { icon: Shield, text: "30-day money-back guarantee" },
                  { icon: Truck, text: "Free shipping on orders over $50" },
                  { icon: Lock, text: "Secure checkout" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <item.icon size={16} style={{ color: AURI_GREEN }} />
                    </motion.div>
                    <span className="text-gray-600">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* ━━━━━━━━━━ AS SEEN IN ━━━━━━━━━━ */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
          <AsSeenIn />
        </section>

        {/* ━━━━━━━━━━ BEFORE/AFTER SLIDER ━━━━━━━━━━ */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-20">
          <motion.h2
            className="text-4xl md:text-5xl font-black text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            Real Results, Real People
          </motion.h2>
          <BeforeAfterSlider />
        </section>

        {/* ━━━━━━━━━━ SCIENCE STATS ━━━━━━━━━━ */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-20">
          <motion.h2
            className="text-4xl md:text-5xl font-black text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            Backed by Science
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScienceStat stat="15+" description="Peer-reviewed studies" index={0} />
            <ScienceStat stat="73%" description="Users feel better in 3 days" index={1} />
            <ScienceStat stat="95%" description="Would recommend to a friend" index={2} />
          </div>
        </section>

        {/* ━━━━━━━━━━ TESTIMONIAL CAROUSEL ━━━━━━━━━━ */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-20">
          <motion.h2
            className="text-4xl md:text-5xl font-black text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            Loved by 50K+ Users
          </motion.h2>
          <TestimonialCarousel />
        </section>

        {/* ━━━━━━━━━━ GUARANTEE SECTION ━━━━━━━━━━ */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-20">
          <GuaranteeBox />
        </section>

        {/* ━━━━━━━━━━ FAQ SECTION ━━━━━━━━━━ */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-20">
          <motion.h2
            className="text-4xl md:text-5xl font-black text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedFAQ key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━ FINAL CTA ━━━━━━━━━━ */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">Don't Let Bloating Control Your Life</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join 50,000+ people who've reclaimed their gut health. With our 30-day guarantee, you have nothing to
              lose.
            </p>
            <motion.button
              onClick={handleAddToCart}
              className="px-8 py-4 bg-gradient-to-r from-[#2e4a3c] to-[#1a2d24] text-white font-bold text-lg rounded-xl shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today - ${currentPrice.toFixed(2)}
            </motion.button>
          </motion.div>
        </section>

        {/* ━━━━━━━━━━ STICKY CTA BAR ━━━━━━━━━━ */}
        <AnimatePresence>
          {showStickyBar && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 max-w-md w-full mx-4"
            >
              <motion.div
                className="p-5 rounded-2xl bg-white shadow-2xl border border-gray-100 flex items-center justify-between gap-4"
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <p className="font-bold text-sm">${currentPrice.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">{isSubscription ? "Subscribe & Save 36%" : "One Time"}</p>
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
      <LiveActivityFeed />
    </div>
  );
}
