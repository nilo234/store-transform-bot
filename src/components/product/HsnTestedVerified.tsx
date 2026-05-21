import { ShieldCheck, FlaskConical, Leaf, BadgeCheck } from 'lucide-react';

const seals = [
  { icon: FlaskConical, label: 'Third-Party Tested', sub: 'Independent US labs' },
  { icon: ShieldCheck, label: 'FDA-Registered Facility', sub: 'cGMP certified' },
  { icon: Leaf, label: 'Clean Label', sub: 'No artificial colors or sweeteners' },
  { icon: BadgeCheck, label: 'Made in the USA', sub: 'Formulated & produced stateside' },
];

export const HsnTestedVerified = () => {
  return (
    <section className="py-16 bg-card">
      <div className="container-wide">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Tested. Verified. Clean.
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              What's on the label is in the strip.
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
              Every batch of NEUVIE Hair, Skin &amp; Nails Strips is independently tested for potency, purity, and heavy metals in an FDA-registered facility. We share results because trust shouldn't be optional.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {seals.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-secondary/40 p-5 text-center hover:border-primary/40 transition-colors"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-3">
                    <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
                  </div>
                  <p className="font-semibold text-sm text-foreground leading-tight">{s.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Need a copy of our latest Certificate of Analysis? Email{' '}
            <a href="mailto:team@tryneuvie.com" className="text-primary font-medium hover:underline">
              team@tryneuvie.com
            </a>{' '}
            and we'll send it over.
          </p>
        </div>
      </div>
    </section>
  );
};
