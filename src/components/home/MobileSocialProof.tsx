import { Star, Check } from 'lucide-react';

const miniTestimonials = [
  { name: 'Anna', city: 'Berlin', text: 'Endlich ein Supplement, das wirklich wirkt!' },
  { name: 'Lena', city: 'München', text: 'Ich nehme sie jeden Morgen – Mega Energie!' },
  { name: 'Sophie', city: 'Hamburg', text: 'Super praktisch und der Geschmack ist toll.' },
];

export function MobileSocialProof() {
  return (
    <section className="py-6 bg-background border-b border-border/30">
      <div className="container-wide space-y-5">
        {/* Star Rating Row */}
        <div className="flex items-center justify-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-accent text-accent" />
            ))}
          </div>
          <span className="text-sm font-semibold text-foreground">4.9/5</span>
          <span className="text-xs text-muted-foreground">– Über 1.200 Bewertungen</span>
        </div>

        {/* Mini Testimonials */}
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory">
          {miniTestimonials.map((t) => (
            <div
              key={t.name}
              className="flex-shrink-0 w-[260px] snap-start bg-card rounded-xl p-4 border border-border/30"
            >
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-snug mb-2">"{t.text}"</p>
              <p className="text-xs text-muted-foreground font-medium">
                {t.name}, {t.city}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Check className="h-3.5 w-3.5 text-primary" />
            Sicher bezahlen
          </span>
          <span className="flex items-center gap-1">
            <Check className="h-3.5 w-3.5 text-primary" />
            30 Tage Rückgabe
          </span>
          <span className="flex items-center gap-1">
            <Check className="h-3.5 w-3.5 text-primary" />
            Kostenloser Versand ab $30
          </span>
        </div>
      </div>
    </section>
  );
}
