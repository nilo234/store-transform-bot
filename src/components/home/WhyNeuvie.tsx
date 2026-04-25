import { motion } from 'framer-motion';
import { Droplet, Pill, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import hairSkinNailsImg from '@/assets/neuvie-hair-skin-nails-new.png';

const benefits = [
  {
    icon: Droplet,
    title: 'No water needed',
    description: 'Dissolves on your tongue in seconds.',
  },
  {
    icon: Pill,
    title: 'No pills to swallow',
    description: 'Forget the capsules. Forget the powders.',
  },
  {
    icon: Sparkles,
    title: 'Premium support, faster',
    description: 'Clinically dosed. Made to fit real life.',
  },
];

export function WhyNeuvie() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Visual */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-3xl overflow-hidden shadow-soft">
              <img
                src={hairSkinNailsImg}
                alt="NEUVIE dissolving wellness strip"
                className="w-full h-[420px] md:h-[560px] object-cover object-center"
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-5 block">
              Why women choose NEUVIE
            </span>
            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-6"
              style={{ letterSpacing: '-0.02em' }}
            >
              Made for real life — <span className="italic text-accent">not forgotten routines.</span>
            </h2>
            <div className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 space-y-3 max-w-xl">
              <p>Most supplements get left behind.</p>
              <p>
                NEUVIE strips were designed to be different: easy to carry, simple to take, and made to fit into your day in seconds.
              </p>
            </div>

            {/* Benefit cards */}
            <div className="space-y-3 mb-10">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="flex items-center gap-4 bg-card rounded-2xl p-4 md:p-5 border border-border/40 shadow-soft"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.08, duration: 0.45 }}
                >
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground text-base leading-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link to="/science">
              <Button
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground h-12 px-6 rounded-xl"
              >
                See why women switch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
