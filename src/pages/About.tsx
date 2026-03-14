import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageMeta } from '@/components/seo';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="About NEUVIE™ – We Built This Because You Are Worth It"
        description="The story behind NEUVIE™: born from frustration, simplicity, and a 3-second solution we wish existed sooner. You are worth it. Not someday. Today."
      />
      <Navbar />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-24 md:py-36 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                className="font-display text-4xl md:text-5xl lg:text-6xl mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                We Built NEUVIE Because You Are Worth It.
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                A story about frustration, simplicity, and a 3-second solution we wish existed sooner.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Section 1 — The Problem */}
        <section className="py-20 md:py-28">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-2xl md:text-3xl mb-6 text-center">The Problem</h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    We kept buying supplements with the best intentions — and watching them collect dust in a drawer. 
                    The pills were too big, the powders were too messy, and the routines felt like another item on an 
                    already endless to-do list.
                  </p>
                  <p>
                    It wasn't that we didn't care about our health. We cared deeply. But nothing was built for the way 
                    we actually live — busy, on the go, and juggling a hundred things at once. Wellness felt like 
                    something we'd get to "someday." And someday never came.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2 — The Realization */}
        <section className="py-20 md:py-28 bg-secondary/40">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-2xl md:text-3xl mb-6 text-center">The Realization</h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    The supplement industry wasn't broken because the ingredients were bad. It was broken because the 
                    <span className="text-foreground font-medium"> experience</span> was bad. Too many steps. Too many products. 
                    Too much friction between wanting to feel better and actually doing something about it.
                  </p>
                  <p>
                    We realized that the biggest barrier to wellness wasn't motivation — it was simplicity. If taking 
                    care of yourself could happen in 3 seconds, without water, without a routine to remember, 
                    people wouldn't just start. They'd never stop.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 3 — The Solution */}
        <section className="py-20 md:py-28">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-2xl md:text-3xl mb-6 text-center">The Solution</h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    So we built NEUVIE from the ground up — not as another supplement company, but as a brand that 
                    believes self-care should feel effortless. Not like an obligation. Not like a medical routine. 
                    Like a small act of kindness you give yourself every single day.
                  </p>
                  <p>
                    Today, NEUVIE offers 13 fast-dissolving strips formulated with clinically studied ingredients at 
                    real dosages. Every batch is independently tested. Every formula is designed for your real life. 
                    Because you deserve more than good intentions sitting in a drawer.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 md:py-20 bg-secondary/40">
          <div className="container-wide">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Heart className="h-10 w-10 text-accent mx-auto mb-6" />
              <h2 className="font-display text-3xl md:text-4xl mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                To make self-care so effortless that you never skip it again. To create supplements 
                that dissolve in 3 seconds and absorb up to 5x faster — so taking care of yourself 
                becomes the easiest decision you make all day.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Emotional Closing */}
        <section className="py-24 md:py-36 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'var(--gradient-warm)' }} />
          <div className="container-wide text-center relative z-10">
            <motion.h2 
              className="font-display text-3xl md:text-4xl lg:text-5xl mb-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              You are worth more than a pill you keep forgetting.
              <span className="block text-accent mt-3 italic">You are worth NEUVIE.</span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              3 seconds. That's all it takes to choose yourself. Every single day.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-10 text-lg font-semibold rounded-xl shadow-lg gap-2" asChild>
                <Link to="/shop">
                  Start Your Ritual
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
