import { Check, X, Minus } from 'lucide-react';

/**
 * Quick comparison block: Strips vs Pills vs Powders.
 * Sits above the fold on PDP to justify why a strip > traditional formats.
 */
export function StripsVsPillsComparison() {
  const rows: Array<{
    feature: string;
    strips: 'yes' | 'no' | 'mid';
    pills: 'yes' | 'no' | 'mid';
    powders: 'yes' | 'no' | 'mid';
  }> = [
    { feature: 'Works in seconds', strips: 'yes', pills: 'no', powders: 'mid' },
    { feature: 'No water needed', strips: 'yes', pills: 'no', powders: 'no' },
    { feature: 'Easy to remember', strips: 'yes', pills: 'mid', powders: 'no' },
    { feature: 'Travel friendly', strips: 'yes', pills: 'mid', powders: 'no' },
    { feature: 'No aftertaste', strips: 'yes', pills: 'mid', powders: 'no' },
  ];

  const Icon = ({ v }: { v: 'yes' | 'no' | 'mid' }) => {
    if (v === 'yes') return <Check className="h-4 w-4 text-primary mx-auto" strokeWidth={2.5} />;
    if (v === 'no') return <X className="h-4 w-4 text-muted-foreground/50 mx-auto" strokeWidth={2} />;
    return <Minus className="h-4 w-4 text-muted-foreground/60 mx-auto" strokeWidth={2} />;
  };

  return (
    <section className="py-12 md:py-16 bg-secondary/40">
      <div className="container-wide max-w-3xl">
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-2">
            Why a strip
          </span>
          <h2 className="font-display text-2xl md:text-3xl">Strips vs Pills vs Powders</h2>
        </div>

        <div className="bg-card rounded-2xl border border-border/40 overflow-hidden shadow-soft">
          <div className="grid grid-cols-4 bg-primary/5 border-b border-border/40">
            <div className="p-3 md:p-4 text-xs md:text-sm font-semibold text-muted-foreground" />
            <div className="p-3 md:p-4 text-center">
              <span className="text-xs md:text-sm font-bold text-primary">NEUVIE Strips</span>
            </div>
            <div className="p-3 md:p-4 text-center">
              <span className="text-xs md:text-sm font-medium text-muted-foreground">Pills</span>
            </div>
            <div className="p-3 md:p-4 text-center">
              <span className="text-xs md:text-sm font-medium text-muted-foreground">Powders</span>
            </div>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-4 items-center ${i !== rows.length - 1 ? 'border-b border-border/30' : ''}`}
            >
              <div className="p-3 md:p-4 text-xs md:text-sm font-medium text-foreground">
                {row.feature}
              </div>
              <div className="p-3 md:p-4 bg-primary/5">
                <Icon v={row.strips} />
              </div>
              <div className="p-3 md:p-4">
                <Icon v={row.pills} />
              </div>
              <div className="p-3 md:p-4">
                <Icon v={row.powders} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
