import { motion } from 'framer-motion';

// Customer initials for avatar placeholders
const customerAvatars = [
  { initials: 'SM', color: 'from-primary/30 to-accent/30' },
  { initials: 'JR', color: 'from-accent/30 to-primary/30' },
  { initials: 'EK', color: 'from-purple-400/30 to-pink-400/30' },
  { initials: 'MT', color: 'from-green-400/30 to-teal-400/30' },
  { initials: 'LP', color: 'from-orange-400/30 to-red-400/30' },
  { initials: 'DH', color: 'from-blue-400/30 to-indigo-400/30' },
  { initials: 'AC', color: 'from-pink-400/30 to-purple-400/30' },
  { initials: 'RS', color: 'from-teal-400/30 to-green-400/30' },
];

export function SocialProofPhotos() {
  return (
    <section className="py-12 bg-background overflow-hidden">
      <div className="container-wide">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-body text-2xl md:text-3xl font-semibold mb-2" style={{ letterSpacing: '-0.02em' }}>
            <span className="text-primary">50,000+</span> Happy Customers!
          </h2>
        </motion.div>
      </div>

      {/* Scrolling customer photos */}
      <div className="relative">
        <div className="flex gap-4 animate-marquee-slow">
          {[...customerAvatars, ...customerAvatars, ...customerAvatars].map((avatar, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${avatar.color} border-2 border-background shadow-lg flex items-center justify-center`}
            >
              <span className="text-sm md:text-base font-bold text-foreground/70">
                {avatar.initials}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="container-wide mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Join thousands who've made Neuvie part of their daily wellness routine
        </p>
      </div>
    </section>
  );
}
