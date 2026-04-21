import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageMeta } from '@/components/seo';
import { blogPosts } from '@/data/blogPosts';

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="The NEUVIE Journal — Wellness, Science & Daily Rituals"
        description="Honest, research-backed articles on vitamins, sleep, recovery, beauty and the science of dissolving wellness strips. New posts weekly."
      />
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-secondary/40 to-background py-16 md:py-24">
          <div className="container-wide text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              The NEUVIE Journal
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
              Wellness, decoded.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No fluff, no hype. Just the science behind your daily ritual — and why
              it matters for how you actually feel.
            </p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16 md:py-20">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block bg-card border border-border rounded-2xl p-6 md:p-8 h-full hover:border-primary/40 hover:shadow-soft transition-all"
                  >
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                      <span className="bg-accent/10 text-accent font-semibold px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl md:text-3xl mb-3 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-5">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
