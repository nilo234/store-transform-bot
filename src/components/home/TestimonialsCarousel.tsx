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
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    content: "The Energy Strips are a game-changer! Clean energy without the jitters or crash. Perfect for my morning workout or afternoon slump.",
    rating: 5,
    product: 'Energy Strips',
    productHandle: 'energy-strips',
    isVerified: true,
  },
  {
    id: '2',
    name: 'James R.',
    content: "I've been using the Mushroom Focus Strips for a month and my concentration has improved dramatically. Love the chocolate flavor!",
    rating: 5,
    product: 'Mushroom Focus Strips',
    productHandle: 'mushroom-focus-strips',
    isVerified: true,
  },
  {
    id: '3',
    name: 'Emily K.',
    content: "The Hair, Skin & Nails Strips are so convenient. My nails are stronger and my hair looks healthier than ever. No more pill-swallowing!",
    rating: 5,
    product: 'Hair, Skin & Nails Strips',
    productHandle: 'hair-skin-nails-strips',
    isVerified: true,
  },
  {
    id: '4',
    name: 'Michael T.',
    content: "Finally, supplements I can actually take on the go! The Sleep Strips have transformed my bedtime routine. Fall asleep faster, wake up refreshed.",
    rating: 5,
    product: 'Sleep Strips',
    productHandle: 'sleep-strips',
    isVerified: true,
  },
  {
    id: '5',
    name: 'Lisa P.',
    content: "At 45, I was skeptical. But the Cognitive Relax Strips help me unwind after work without feeling drowsy. Love the calm focus they provide.",
    rating: 5,
    product: 'Cognitive Relax Strips',
    productHandle: 'cognitive-relax-strips',
    isVerified: true,
  },
  {
    id: '6',
    name: 'David H.',
    content: "The Hangover Strips are a lifesaver! Took one before bed after a night out and woke up feeling surprisingly good. Keep them in my wallet now.",
    rating: 5,
    product: 'Hangover Strips',
    productHandle: 'hangover-strips',
    isVerified: true,
  },
];

export function TestimonialsCarousel() {
  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container-wide">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-4 block">
            Real Results
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            THE REAL STORY FROM OUR NEUVIE LOVERS
          </h2>
          <p className="text-muted-foreground text-lg">
            Join 50,000+ customers who trust Neuvie for their daily wellness.
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
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    {testimonial.isVerified && (
                      <div className="flex items-center gap-1 text-green-600">
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
      
      <div className="container-wide mt-8 text-center">
        <motion.div
          className="inline-flex items-center gap-4 bg-muted/50 rounded-full px-6 py-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-accent text-accent" />
            ))}
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            4.9/5 from 2,400+ reviews
          </span>
        </motion.div>
      </div>
    </section>
  );
}
