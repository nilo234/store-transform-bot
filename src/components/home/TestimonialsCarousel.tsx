import { motion } from 'framer-motion';
import { Star, BadgeCheck, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  product: string;
  productHandle: string;
  isVerified: boolean;
  gradient: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    content: "I've tried every supplement brand out there. I was skeptical. But the Energy Strips actually stuck — not because I force myself, because I actually feel the difference.",
    rating: 5,
    product: 'Energy Strips',
    productHandle: 'energy-strips',
    isVerified: true,
    gradient: 'from-rose-400 to-pink-500',
  },
  {
    id: '2',
    name: 'James R.',
    content: "One month in and these are just sitting on my desk now. The chocolate flavor is genuinely good. And the focus? I stop checking my phone every 10 minutes.",
    rating: 5,
    product: 'Mushroom Focus Strips',
    productHandle: 'mushroom-focus-strips',
    isVerified: true,
    gradient: 'from-blue-400 to-indigo-500',
  },
  {
    id: '3',
    name: 'Emily K.',
    content: "It's the first supplement I've ever been consistent with. That says everything. The strip format just removes every excuse.",
    rating: 5,
    product: 'Hair, Skin & Nails Strips',
    productHandle: 'hair-skin-nails-strips',
    isVerified: true,
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    id: '4',
    name: 'Michael T.',
    content: "Some nights my brain just won't stop. These help me land. Not like a sleeping pill — more like a gentle dimmer switch.",
    rating: 5,
    product: 'Sleep Strips',
    productHandle: 'sleep-strips',
    isVerified: true,
    gradient: 'from-violet-400 to-purple-500',
  },
  {
    id: '5',
    name: 'Lisa P.',
    content: "I didn't expect to love a supplement. But the Cognitive Relax Strips after a long day? It's become my favorite 30 seconds.",
    rating: 5,
    product: 'Cognitive Relax Strips',
    productHandle: 'cognitive-relax-strips',
    isVerified: true,
    gradient: 'from-teal-400 to-emerald-500',
  },
  {
    id: '6',
    name: 'David H.',
    content: "I keep a few in my wallet for nights out. They dissolve fast, taste good, and I actually remember to take them. That's the whole point, right?",
    rating: 5,
    product: 'Hangover Strips',
    productHandle: 'hangover-strips',
    isVerified: true,
    gradient: 'from-cyan-400 to-blue-500',
  },
];

export function TestimonialsCarousel() {
  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container-wide">
        {/* Review Summary Bar */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-6 block">
            Customer Reviews
          </span>
          
          <div className="mb-6">
            <span className="font-display text-5xl md:text-6xl text-foreground">
              4.9
            </span>
            <span className="text-2xl text-muted-foreground font-medium ml-1">/ 5</span>
          </div>
          
          <div className="flex justify-center gap-1.5 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-7 w-7 fill-accent text-accent" />
            ))}
          </div>
          
          <p className="text-muted-foreground text-lg">
            From <strong className="text-foreground">2,400+</strong> people who tried it, felt it, and stayed.
          </p>
        </motion.div>
      </div>

      {/* Scrolling testimonials */}
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-6 px-6 md:px-12 scrollbar-hide snap-x snap-mandatory">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="flex-shrink-0 w-[340px] md:w-[400px] snap-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-card rounded-2xl p-6 shadow-soft h-full border border-border/50 hover:shadow-card transition-shadow">
                {/* Quote icon */}
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-foreground leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
                
                {/* Product link */}
                <Link 
                  to={`/product/${testimonial.productHandle}`}
                  className="text-sm text-primary hover:text-accent transition-colors font-medium mb-4 block"
                >
                  Product: {testimonial.product}
                </Link>
                
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center shadow-sm`}>
                    <span className="text-sm font-bold text-white">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    {testimonial.isVerified && (
                      <div className="flex items-center gap-1 text-primary">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        <span className="text-xs font-medium">Verified Buyer</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-6 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
