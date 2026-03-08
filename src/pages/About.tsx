import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Check, Leaf, Heart, Award, Users, Quote, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageMeta } from '@/components/seo';

const values = [
  {
    icon: Leaf,
    title: 'Intentional Sourcing',
    description: 'Every ingredient is traceable, independently verified, and chosen for what it does — not how it looks on a label.',
  },
  {
    icon: Award,
    title: 'Real Dosages',
    description: 'Formulated at levels that are studied to work. No pixie-dusting, no filler ingredients, no shortcuts.',
  },
  {
    icon: Heart,
    title: 'Tested, Then Tested Again',
    description: 'Every batch goes through independent third-party testing for purity, potency, and safety before it ships.',
  },
  {
    icon: Users,
    title: 'Built Around You',
    description: 'Your routine should be easy to keep. We designed every detail — format, flavor, packaging — with that in mind.',
  },
];

const stats = [
  { number: '50,000+', label: 'People Who Chose Themselves' },
  { number: '99%', label: 'Felt Good About Their Choice' },
  { number: '13', label: 'Ways to Show Up for You' },
  { number: '14 Days', label: 'To Feel Sure — Guaranteed' },
];

const team = [
  { name: 'Alex M.', role: 'Co-Founder & CEO', bio: 'Believes wellness should fit your life — not the other way around.', gradient: 'from-primary to-accent' },
  { name: 'Jordan L.', role: 'Head of Product', bio: 'Obsessed with finding the right ingredients in the right format.', gradient: 'from-blue-500 to-indigo-500' },
  { name: 'Priya S.', role: 'Lead Scientist', bio: 'Makes sure every formula is backed by real research and effective dosages.', gradient: 'from-rose-400 to-pink-500' },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="About NEUVIE™ – Built for People Who Believe They're Worth It"
        description="NEUVIE™ exists because taking care of yourself should be effortless, not optional. Learn our story, our values, and why we do what we do."
      />
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-muted/50 to-background">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                className="font-body text-4xl md:text-5xl lg:text-6xl font-semibold mb-6"
                style={{ letterSpacing: '-0.02em' }}
                animate={{ opacity: 1, y: 0 }}
              >
                ABOUT NEUVIE
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                We started Neuvie because we believed something simple: you're worth taking care of. Not in a complicated, time-consuming way. In a way that fits your actual life — and makes you feel good about the choice you're making for yourself.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Founder Quote */}
        <section className="py-16 bg-muted/20">
          <div className="container-wide">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Quote className="h-12 w-12 text-primary/30 mx-auto mb-6" />
              <blockquote className="font-body text-2xl md:text-3xl font-medium text-foreground leading-relaxed mb-6" style={{ letterSpacing: '-0.01em' }}>
                "We built Neuvie for the person who always puts everyone else first — and forgets that they deserve the same care."
              </blockquote>
              <p className="text-muted-foreground font-medium">&mdash; The Neuvie Team</p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-body text-3xl md:text-4xl font-semibold mb-6" style={{ letterSpacing: '-0.02em' }}>
                  OUR STORY
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    It started with a question: why do most people stop taking their supplements?
                  </p>
                  <p>
                    Not because they stopped caring about their health. Because the routine was too much. Too many pills, too much effort, too easy to forget. We wanted to create something that doesn't feel like a chore — something that feels like a small act of kindness toward yourself.
                  </p>
                  <p>
                    Today, Neuvie offers 13 fast-dissolving strips — from Energy and Focus to Sleep and Beauty. Each one is a 30-second ritual that says: I matter. My body matters. And I'm going to show up for myself today.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-gradient-to-br from-muted/60 to-muted/30 rounded-3xl aspect-square flex items-center justify-center"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-8xl">💊</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container-wide">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label} 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="font-body text-4xl md:text-5xl font-semibold mb-2" style={{ letterSpacing: '-0.02em' }}>{stat.number}</p>
                  <p className="text-primary-foreground/70 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="py-20">
          <div className="container-wide">
            <motion.h2 
              className="font-body text-3xl md:text-4xl font-semibold text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              MEET THE TEAM
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="bg-card rounded-2xl p-8 text-center shadow-soft border border-border/50"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-5 shadow-md`}>
                    <span className="text-2xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg text-foreground">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container-wide">
            <motion.h2 
              className="font-body text-3xl md:text-4xl font-semibold text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              WHAT WE BELIEVE IN
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="bg-card rounded-2xl p-8 text-center shadow-soft"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="py-20">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <motion.h2 
                className="font-body text-3xl md:text-4xl font-semibold text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                OUR PROMISE
              </motion.h2>
              
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {[
                  'Every batch independently tested for purity and potency',
                  'Clinically studied ingredients at meaningful dosages',
                  'Fast-dissolving strip format — no water, no pills',
                  'No artificial colors, no preservatives, no fillers',
                  'Non-GMO and ethically sourced ingredients',
                  '14-day money-back guarantee — no questions asked',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-card p-4 rounded-xl shadow-soft">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-muted/30">
          <div className="container-wide text-center">
            <motion.h2 
              className="font-body text-3xl md:text-4xl font-semibold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to feel the difference?
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Start with one strip. See how it fits your day.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button className="btn-primary h-14 px-10 text-lg font-semibold gap-2" asChild>
                <Link to="/shop">
                  Shop Our Strips
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
