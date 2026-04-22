import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { bundles } from '@/data/bundles';

export type PurchaseMode = 'single' | 'bundle';

interface Props {
  currentVariantId?: string;
  singlePrice: number;
  comparePrice: number;
  selected: PurchaseMode;
  onChange: (mode: PurchaseMode) => void;
}

/**
 * Bundle-First PDP toggle.
 * Lets the user choose between buying a single strip or upgrading to the
 * best matching bundle (4-pack preferred, otherwise 3-pack, then any).
 */
export function PurchaseTypeSelector({
  currentVariantId,
  singlePrice,
  comparePrice,
  selected,
  onChange,
}: Props) {
  const bestBundle = useMemo(() => {
    const matching = bundles.filter(b =>
      currentVariantId ? b.variantIds.includes(currentVariantId) : false
    );
    if (matching.length === 0) return null;
    // Prefer 4-pack, then 3-pack, then anything
    return (
      matching.find(b => b.products.length === 4) ||
      matching.find(b => b.products.length === 3) ||
      matching[0]
    );
  }, [currentVariantId]);

  const singleSavings = comparePrice > singlePrice ? comparePrice - singlePrice : 0;

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Choose how you want to start
      </p>

      {/* SINGLE option */}
      <button
        type="button"
        onClick={() => onChange('single')}
        className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
          selected === 'single'
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/40'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 h-5 w-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
              selected === 'single' ? 'border-primary' : 'border-muted-foreground/40'
            }`}
          >
            {selected === 'single' && (
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="font-semibold text-foreground">Single Strip</span>
              <span className="font-bold text-foreground">
                ${singlePrice.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              30 strips · One goal
              {singleSavings > 0 && ` · Save $${singleSavings.toFixed(2)} vs. retail`}
            </p>
          </div>
        </div>
      </button>

      {/* BUNDLE option (only if a matching bundle exists) */}
      {bestBundle && (
        <button
          type="button"
          onClick={() => onChange('bundle')}
          className={`w-full text-left rounded-xl border-2 p-4 transition-all relative ${
            selected === 'bundle'
              ? 'border-accent bg-accent/5'
              : 'border-accent/40 hover:border-accent bg-gradient-to-br from-accent/5 to-primary/5'
          }`}
        >
          <span className="absolute -top-2 right-3 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
            Best Value · Save {bestBundle.discountPercent}%
          </span>
          <div className="flex items-start gap-3">
            <div
              className={`mt-0.5 h-5 w-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                selected === 'bundle' ? 'border-accent' : 'border-muted-foreground/40'
              }`}
            >
              {selected === 'bundle' && (
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="font-semibold text-foreground inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  {bestBundle.name} ({bestBundle.packSize})
                </span>
                <div className="text-right">
                  <span className="font-bold text-foreground">
                    ${bestBundle.salePrice.toFixed(2)}
                  </span>
                  <span className="ml-1.5 text-xs text-muted-foreground line-through">
                    ${bestBundle.originalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Includes: {bestBundle.products.join(' · ')}
              </p>
              <p className="text-xs font-semibold text-primary mt-1">
                You save ${bestBundle.savings.toFixed(2)} · Free shipping included
              </p>
            </div>
          </div>
          {selected === 'bundle' && (
            <Link
              to="/bundles"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              See bundle details <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </button>
      )}
    </div>
  );
}
