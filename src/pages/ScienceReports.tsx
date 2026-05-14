import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageMeta } from '@/components/seo';
import { Button } from '@/components/ui/button';

const reports = [
  { title: 'Oral Strip Bioavailability vs. Capsules', summary: '95%+ buccal absorption outperforms traditional capsules by 2–3x. Faster onset, fewer fillers.', tag: 'Bioavailability' },
  { title: 'Biotin 5,000mcg Clinical Evidence', summary: 'Multiple peer-reviewed studies support hair density and nail strength improvements within 90 days of daily supplementation.', tag: 'Hair & Nails' },
  { title: 'Ashwagandha KSM-66 Cortisol Study', summary: '27.9% cortisol reduction after 8 weeks of KSM-66 supplementation in a randomized peer-reviewed trial.', tag: 'Stress' },
];

export default function ScienceReports() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta title="Research & Reports | NEUVIE™" description="Peer-reviewed research backing every NEUVIE ingredient. Bioavailability, biotin, ashwagandha studies and more." />
      <Navbar />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-secondary/30 text-center">
          <div className="container-wide max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-6xl font-semibold mb-4" style={{ letterSpacing: '-0.02em' }}>The Science Behind NEUVIE Strips</h1>
            <p className="text-lg text-muted-foreground">Every ingredient backed by published research.</p>
          </div>
        </section>
        <section className="py-16">
          <div className="container-wide max-w-4xl mx-auto space-y-6">
            {reports.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-card border border-border/30 rounded-2xl p-8 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs uppercase tracking-wider text-accent font-semibold">{r.tag}</span>
                    <h2 className="font-display text-2xl mt-1 mb-3">{r.title}</h2>
                    <p className="text-muted-foreground mb-4">{r.summary}</p>
                    <Link to="/science" className="text-primary font-semibold hover:underline inline-flex items-center gap-1">Read the Study <ArrowRight className="w-4 h-4" /></Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="py-16 text-center">
          <Button asChild size="lg"><Link to="/shop">Shop the Strips →</Link></Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
