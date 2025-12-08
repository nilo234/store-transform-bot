import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container-wide max-w-2xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-center">Contact Us</h1>
          <p className="text-muted-foreground text-center mb-12">Have questions? We'd love to hear from you.</p>
          <form className="space-y-6 bg-card p-8 rounded-2xl shadow-soft">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input placeholder="Your Name" />
              <Input placeholder="Email Address" type="email" />
            </div>
            <Input placeholder="Subject" />
            <Textarea placeholder="Your Message" rows={5} />
            <Button className="w-full btn-primary">Send Message</Button>
          </form>
          <div className="flex justify-center gap-8 mt-12 text-muted-foreground">
            <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@neuvie.com</span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}