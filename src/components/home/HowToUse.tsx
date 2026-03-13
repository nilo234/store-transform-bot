import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import howToUse1 from '@/assets/how-to-use-1.png';
import howToUse2 from '@/assets/how-to-use-2.png';
import howToUse3 from '@/assets/how-to-use-3.png';
import howToUse4 from '@/assets/how-to-use-4.png';

const steps = [
  {
    number: '01',
    image: howToUse1,
    alt: 'Hand opening NEUVIE tin and reaching for a sachet',
    title: 'Open Your Tin',
    description: 'Lift the lid and pick up one strip from your NEUVIE™ tin.',
  },
  {
    number: '02',
    image: howToUse2,
    alt: 'Hand peeling sachet open at Peel Here tab',
    title: 'Peel the Strip',
    description: 'Tear open the sachet at the Peel Here tab to reveal your strip.',
  },
  {
    number: '03',
    image: howToUse3,
    alt: 'Hand holding oral strip up toward camera',
    title: 'Hold & Ready',
    description: 'Hold the thin strip between your fingers — it dissolves in seconds.',
  },
  {
    number: '04',
    image: howToUse4,
    alt: 'Woman placing oral strip on tongue',
    title: 'Place on Tongue',
    description: 'Gently press the strip onto your tongue and let it dissolve. No water needed.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

// Arrow component — right on desktop, down on mobile
function StepArrow() {
  return (
    <div className="hidden md:flex items-center justify-center px-2 self-center">
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none" className="text-[#E8752A]">
        <path d="M0 8h28m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function MobileArrow() {
  return (
    <div className="flex md:hidden items-center justify-center py-3">
      <svg width="16" height="32" viewBox="0 0 16 32" fill="none" className="text-[#E8752A]">
        <path d="M8 0v28m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function HowToUse() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: '#FAF8F5' }}>
      <div className="container-wide">
        {/* Header */}
        <motion.div className="text-center mb-14 md:mb-20" {...fadeUp}>
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#E8752A' }}>
            THE RITUAL
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4 text-foreground">
            How To Use
          </h2>
          <p className="font-body text-base md:text-lg font-light max-w-md mx-auto" style={{ color: '#888880' }}>
            Four simple steps. No water. No effort. Just results.
          </p>
        </motion.div>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="flex flex-col md:flex-row md:items-stretch md:justify-center max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col md:flex-row md:items-stretch">
              {/* Card */}
              <motion.div
                className="rounded-xl overflow-hidden flex flex-col md:w-56 lg:w-64"
                style={{
                  backgroundColor: '#FAF8F5',
                  border: '1px solid #E8E4DF',
                }}
                {...fadeUp}
                transition={{ delay: i * 0.12 }}
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden rounded-t-xl">
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Text */}
                <div className="p-5 flex-1">
                  <span className="font-display text-sm mb-2 block" style={{ color: '#E8752A' }}>
                    {step.number}
                  </span>
                  <h3 className="font-display text-lg mb-1 text-foreground">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm font-light leading-relaxed" style={{ color: '#888880' }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>

              {/* Arrow between cards (not after last) */}
              {i < steps.length - 1 && (
                <>
                  <StepArrow />
                  <MobileArrow />
                </>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div className="text-center mt-14 md:mt-20" {...fadeUp} transition={{ delay: 0.5 }}>
          <Link to="/shop">
            <button
              className="inline-flex items-center justify-center font-body font-medium text-sm px-10 py-4 transition-all duration-300 hover:opacity-90 active:scale-[0.98] w-full sm:w-auto"
              style={{
                backgroundColor: '#1a1a1a',
                color: '#FAF8F5',
                borderRadius: '4px',
              }}
            >
              Shop All Strips
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
