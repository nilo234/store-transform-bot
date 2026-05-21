import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { PageMeta } from '@/components/seo';
import { getBlogPostBySlug, blogPosts } from '@/data/blogPosts';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  // Related posts (other 3)
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title={`${post.title} | NEUVIE Journal`}
        description={post.metaDescription}
        ogType="article"
      />
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <article className="container-wide max-w-3xl mx-auto px-4">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Journal
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-5">
              <span className="bg-accent/10 text-accent font-semibold px-2.5 py-1 rounded-full">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-5"
            >
              {post.title}
            </motion.h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Content */}
          <div className="prose-content space-y-8">
            {post.content.map((section, i) => (
              <section key={i}>
                {section.heading && (
                  <h2 className="font-display text-2xl md:text-3xl mt-10 mb-4">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="text-base md:text-lg leading-relaxed text-foreground/90 mb-4"
                    dangerouslySetInnerHTML={{
                      __html: p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
                    }}
                  />
                ))}
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 md:p-10 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/15 rounded-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">
              Ready to start?
            </p>
            <h3 className="font-display text-2xl md:text-3xl mb-5">
              Make it your daily routine.
            </h3>
            <Button
              asChild
              size="lg"
              className="h-14 px-10 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link to={post.cta.href}>
                {post.cta.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Related Posts */}
          {related.length > 0 && (
            <section className="mt-20 pt-12 border-t border-border">
              <h3 className="font-display text-2xl mb-6">Keep reading</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="group block bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-all"
                  >
                    <span className="text-xs text-accent font-semibold uppercase tracking-wider">
                      {p.category}
                    </span>
                    <h4 className="font-display text-lg mt-2 mb-2 leading-tight group-hover:text-primary transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {p.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
