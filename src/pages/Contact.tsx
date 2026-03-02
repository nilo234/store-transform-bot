import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, Clock, Send } from 'lucide-react';
import { PageMeta } from '@/components/seo';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send us an email anytime',
    value: 'hello@neuvie.com',
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Chat with our team',
    value: 'Available 9am - 6pm EST',
  },
  {
    icon: Clock,
    title: 'Response Time',
    description: 'We typically respond within',
    value: '24 hours',
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="Contact Us – Get Help Fast | NEUVIE™"
        description="Questions about your order or our wellness strips? Reach NEUVIE™ support via email or live chat. We respond within 24 hours. We're here to help."
      />
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-muted/50 to-background">
          <div className="container-wide text-center">
            <motion.h1 
              className="font-body text-4xl md:text-5xl lg:text-6xl font-semibold mb-6"
              style={{ letterSpacing: '-0.02em' }}
              animate={{ opacity: 1, y: 0 }}
            >
              CONTACT US
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Have questions about our strips or your order? We're here to help. Send us a message and we'll respond as soon as possible.
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
                  className="bg-card rounded-2xl p-6 text-center shadow-soft"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <method.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{method.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                  <p className="text-sm font-medium text-primary">{method.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-12 pb-20">
          <div className="container-wide max-w-2xl">
            <motion.div
              className="bg-card rounded-2xl p-8 md:p-10 shadow-soft"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-body text-2xl font-semibold mb-6 text-center" style={{ letterSpacing: '-0.02em' }}>
                Send Us a Message
              </h2>
              
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Name</label>
                    <Input 
                      placeholder="John Doe" 
                      className="h-12 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email Address</label>
                    <Input 
                      placeholder="john@example.com" 
                      type="email" 
                      className="h-12 rounded-lg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Input 
                    placeholder="How can we help you?" 
                    className="h-12 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea 
                    placeholder="Tell us more about your inquiry..." 
                    rows={6} 
                    className="rounded-lg resize-none"
                  />
                </div>
                
                <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg text-base">
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
