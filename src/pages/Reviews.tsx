import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageMeta } from '@/components/seo';
import { Button } from '@/components/ui/button';

const reviews = [
  { name: 'Marcus K.', product: 'Energy Strip', rating: 5, text: 'No crash, no jitters. I haven\'t touched capsules since.' },
  { name: 'Priya S.', product: 'Beauty + Collagen Strip', rating: 5, text: 'After 3 weeks my skin is visibly more hydrated and people keep asking what I changed.' },
  { name: 'Tyler R.', product: 'Focus & Cognitive Strip', rating: 5, text: 'I drive long shifts. Focus strip keeps me sharp all day. No more 4 coffees.' },
  { name: 'Sophie M.', product: 'Hair, Skin & Nails Strip', rating: 5, text: 'My nails stopped breaking after 2 weeks. Genuinely shocked.' },
  { name: 'James T.', product: 'Sleep & Relax Strip', rating: 5, text: 'I fall asleep within 20 minutes now. Life changing.' },
  { name: 'Amelia P.', product: 'Gut Health & Probiotic Strip', rating: 5, text: 'Bloating gone within a week. The strips actually work.' },
  { name: 'David L.', product: 'Immunity Strip', rating: 5, text: 'Haven\'t been sick all winter. Daily ritual now.' },
  { name: 'Rachel B.', product: 'Ashwagandha Calm Strip', rating: 5, text: 'Cortisol meltdowns are a thing of the past. Highly recommend.' },
  { name: 'Chris H.', product: 'Daily Wellness Strip', rating: 5, text: 'Replaced 6 capsules with 1 strip. Effortless.' },
  { name: 'Nina W.', product: 'Beauty + Collagen Strip', rating: 5, text: 'Tastes great, dissolves instantly. My new morning ritual.' },
  { name: 'Jordan F.', product: 'Energy Strip', rating: 5, text: 'Clean focus all morning, no afternoon crash.' },
  { name: 'Olivia G.', product: 'Sleep & Relax Strip', rating: 5, text: 'Best sleep I\'ve had in years. Worth every cent.' },
];

const products = ['All', 'Energy Strip', 'Beauty + Collagen Strip', 'Hair, Skin & Nails Strip', 'Gut Health & Probiotic Strip', 'Sleep & Relax Strip', 'Immunity Strip', 'Focus & Cognitive Strip', 'Ashwagandha Calm Strip', 'Daily Wellness Strip'];

export default function Reviews() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? reviews : reviews.filter(r => r.product === filter);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta title="Customer Reviews | NEUVIE™" description="Read 50,000+ verified customer reviews of NEUVIE wellness strips. Real results, real stories." />
      <Navbar />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-wide text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-6xl font-semibold mb-4" style={{ letterSpacing: '-0.02em' }}>What Our Customers Say</h1>
            <div className="flex items-center justify-center gap-2 mb-2">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-accent text-accent" />)}
              <span className="ml-2 font-display text-2xl">4.9 / 5</span>
            </div>
            <p className="text-muted-foreground">Based on 50,000+ verified customer reviews</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container-wide">
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {products.map(p => (
                <Button key={p} variant={filter === p ? 'default' : 'outline'} size="sm" onClick={() => setFilter(p)}>{p}</Button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filtered.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="bg-card border border-border/30 rounded-2xl p-6 shadow-soft">
                  <div className="flex gap-1 mb-3">{[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-accent text-accent" />)}</div>
                  <p className="text-foreground mb-4 leading-relaxed">"{r.text}"</p>
                  <div className="text-sm">
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-muted-foreground">{r.product}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
