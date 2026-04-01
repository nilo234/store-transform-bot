import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, Clock, Send, Check, Loader2 } from 'lucide-react';
import { PageMeta } from '@/components/seo';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { SocialShareButtons } from '@/components/seo/SocialShareButtons';

const contactMethods = [
  { icon: Mail, title: 'Email Us', description: 'Send us a message anytime', value: 'team@tryneuvie.com' },
  { icon: MessageSquare, title: 'Live Chat Support', description: 'Talk to a real person', value: 'Available 9am – 6pm EST' },
  { icon: Clock, title: 'Average Response Time', description: 'We typically get back to you within', value: '24 hours' },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || '',
          message: formData.message,
        });

      if (error) throw error;

      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error('Contact form error:', err);
      toast.error('Something went wrong. Please try again or email us directly at team@tryneuvie.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="Contact NEUVIE™ – Questions About Our Wellness Strips?"
        description="Have questions about our dissolving wellness strips, your order, or ingredients? Real people, real answers. Email, chat, or use our contact form."
      />
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-28" style={{ background: 'var(--gradient-hero)' }}>
          <div className="container-wide text-center">
            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl mb-6"
              style={{ letterSpacing: '-0.02em' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Contact Us – We're Here to Help
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Whether it's about your wellness strips order, our <Link to="/science" className="text-primary hover:underline">ingredients and science</Link>, 
              or you just want to talk — we're real people who genuinely care about your experience. No scripts, no bots.
            </motion.p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-12">
          <div className="container-wide">
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  className="bg-card rounded-2xl p-6 text-center shadow-soft border border-border/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <method.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-display text-lg mb-1">{method.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                  <p className="text-sm font-medium text-accent">{method.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-12 pb-20">
          <div className="container-wide max-w-2xl">
            <motion.div
              className="bg-card rounded-2xl p-8 md:p-10 shadow-soft border border-border/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-display text-2xl md:text-3xl mb-6 text-center" style={{ letterSpacing: '-0.02em' }}>
                Send Us a Message
              </h2>

              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Your Name</label>
                      <Input placeholder="Jane Doe" className="h-12 rounded-lg" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email Address</label>
                      <Input placeholder="jane@example.com" type="email" className="h-12 rounded-lg" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} required />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input placeholder="What can we help with?" className="h-12 rounded-lg" value={formData.subject} onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea placeholder="Tell us more..." rows={6} className="rounded-lg resize-none" value={formData.message} onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))} required />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg text-base shadow-glow">
                    {isSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* SEO Content + Links */}
            <motion.div
              className="mt-12 text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-muted-foreground leading-relaxed">
                Before reaching out, you might find your answer in our{' '}
                <Link to="/faqs" className="text-primary hover:underline">frequently asked questions</Link>. 
                For information about ingredients and dosages, visit our{' '}
                <Link to="/science" className="text-primary hover:underline">science and transparency page</Link>. 
                Need help with a return? See our{' '}
                <Link to="/returns" className="text-primary hover:underline">14-day return policy</Link>.
              </p>

              <SocialShareButtons 
                url="https://tryneuvie.com/contact" 
                text="Got questions about NEUVIE wellness strips? Reach out to their team." 
                className="justify-center"
              />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
