import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Battery, Moon, Sparkles, Heart, Brain, Leaf } from 'lucide-react';

const categories = [
  { icon: Battery, label: 'Energy', link: '/product/energy-strips-2', color: 'text-amber-500' },
  { icon: Moon, label: 'Sleep', link: '/product/sleep-strips', color: 'text-indigo-400' },
  { icon: Sparkles, label: 'Beauty', link: '/product/beauty-collagen-strips', color: 'text-pink-400' },
  { icon: Brain, label: 'Focus', link: '/product/focus-strips', color: 'text-blue-400' },
  { icon: Heart, label: 'Immunity', link: '/product/immunity-strips', color: 'text-red-400' },
  { icon: Leaf, label: 'Gut Health', link: '/product/digestive-gut-health-strips', color: 'text-emerald-400' },
];

export function QuickCategoryPicker() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="mt-8"
    >
      <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-3 text-center lg:text-left">
        What do you need?
      </p>
      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            to={cat.link}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-background border border-border/60 hover:border-primary hover:bg-primary/5 transition-all duration-200 text-sm font-medium text-foreground group"
          >
            <cat.icon className={`h-3.5 w-3.5 ${cat.color} group-hover:scale-110 transition-transform`} />
            {cat.label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
