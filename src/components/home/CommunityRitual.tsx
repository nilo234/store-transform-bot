import { motion } from 'framer-motion';
import { Users, Heart, Repeat, Sparkles, Sunrise, Moon, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

const routineMoments: { icon: LucideIcon; title: string; quote: string; author: string }[] = [
  {
    icon: Sunrise,
    title: 'Morning intention',
    quote: '"I place a strip on my tongue and tell myself: today, I choose me."',
    author: 'Neuvie community member',
  },
  {
    icon: Moon,
    title: 'Evening wind-down',
    quote: '"It\'s become the part of my night I actually protect. My 30 seconds."',
    author: 'Neuvie community member',
  },
  {
    icon: TrendingUp,
    title: 'Pre-workout focus',
    quote: '"No shaker, no mixing. I just peel, place, and go. It fits my life."',
    author: 'Neuvie community member',
  },
];

const stats = [
  { value: '30s', label: 'Your daily routine' },
  { value: '2,400+', label: 'People who chose themselves' },
  { value: '4.9', label: 'Average rating' },
];

export function CommunityRoutine() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-warm)' }} />
      
      <div className="container-wide relative z-10">
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
            <Heart className="h-4 w-4" />
            <span className="text-sm font-semibold">Join the routine</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-5">
            You're not just buying a product.
            <span className="block text-accent italic mt-1">You're joining a community.</span>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Thousands of people wake up every morning and choose themselves — 
            with one small, intentional act. This is what that looks like.
          </p>
        </motion.div>

        {/* Routine moments */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {routineMoments.map((moment, i) => (
            <motion.div
              key={moment.title}
              className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-soft hover:shadow-card transition-all duration-500 hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <moment.icon className="w-9 h-9 text-primary mb-4" strokeWidth={1.5} />
              <h3 className="font-display text-xl mb-3 text-foreground">{moment.title}</h3>
              <p className="text-muted-foreground italic leading-relaxed mb-4">{moment.quote}</p>
              <span className="text-xs text-muted-foreground/70">— {moment.author}</span>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          className="bg-primary rounded-2xl p-8 md:p-10 text-primary-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-3 gap-6 md:gap-10 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl lg:text-5xl mb-1">{stat.value}</p>
                <p className="text-primary-foreground/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/shop">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground h-13 px-8 text-base font-semibold rounded-xl shadow-lg">
                Start your routine today
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}