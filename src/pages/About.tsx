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
        description="The story behind NEUVIE™: born from hair loss, frustration, and the belief that wellness should take 3 seconds — not 30 minutes. You are worth it. Not someday. Today."
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
                A story about hair loss, frustration, and the 3-second solution we wished existed.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Founder Story */}
        <section className="py-20 md:py-28">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <motion.div
                className="space-y-6 text-lg text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p>
                  It started with a mirror — and the kind of frustration that builds up quietly over years. 
                  Thinning hair. Brittle nails that split before they could grow. Dull, tired skin that no 
                  cream could fix from the outside. She tried everything. Capsules that sat forgotten in a 
                  drawer. Powders that tasted like chalk and took ten minutes to mix. Routines that felt 
                  like a medical obligation instead of self-care. Nothing worked consistently — because she 
                  kept forgetting, or hated swallowing pills, or the products just felt like another chore 
                  on an already overwhelming list.
                </p>
                <p>
                  Then came the moment that changed everything. Not a breakthrough in a lab — a breakthrough 
                  in perspective. <span className="text-foreground font-medium">What if wellness didn't have to feel hard?</span> What if 
                  taking care of yourself could be as simple as placing a strip on your tongue — 3 seconds, 
                  no water, no excuses — and getting on with your day knowing you just did something beautiful 
                  for yourself? That question became NEUVIE.
                </p>
                <p>
                  Today, NEUVIE is a brand built on one belief: <span className="text-foreground font-medium">you deserve to feel beautiful 
                  from the inside out, every single day.</span> Not when you have more time. Not when life 
                  slows down. Right now. Our 13 fast-dissolving strips are formulated with clinically studied 
                  ingredients at real dosages — because your body deserves more than a label claim. Every 
                  batch is independently tested. Every formula is designed for your real life. Because 
                  wellness should feel like a gift you give yourself — not a task you keep putting off.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 md:py-28 bg-secondary/40">
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
                becomes the easiest decision you make all day. Because when wellness fits your life, 
                you actually do it. And when you do it, everything changes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Emotional Closing */}
        <section className="py-24 md:py-36 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'var(--gradient-warm)' }} />
          <div className="container-wide text-center relative z-10">
            <motion.h2 
              className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              You are worth it.
              <span className="block text-accent mt-2 italic">Not someday. Today.</span>
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
