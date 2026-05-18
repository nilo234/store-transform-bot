import { Check, Truck, RotateCcw } from 'lucide-react';

interface Props {
  /** Compact one-line variant (used inside the sticky bar). */
  compact?: boolean;
}

/**
 * Three trust micro-bullets shown directly under the Add to Cart button.
 * Removes friction in the critical purchase moment.
 */
export function WhyNowMicroCopy({ compact = false }: Props) {
  const items = [
    { icon: Truck, text: 'Ships today if ordered before 2pm EST' },
    { icon: RotateCcw, text: 'Free returns · Cancel anytime' },
    { icon: Check, text: '14-day money-back guarantee' },
  ];

  if (compact) {
    return (
      <p className="text-[10px] text-muted-foreground text-center mt-1.5 leading-tight">
        <span className="inline-flex items-center gap-1">
          <Truck className="h-2.5 w-2.5 text-primary" />
          Ships today
        </span>
        <span className="mx-1.5 text-muted-foreground/50">·</span>
        <span className="inline-flex items-center gap-1">
          <RotateCcw className="h-2.5 w-2.5 text-primary" />
          Free returns
        </span>
        <span className="mx-1.5 text-muted-foreground/50">·</span>
        <span className="inline-flex items-center gap-1">
          <Check className="h-2.5 w-2.5 text-primary" />
          14-day guarantee
        </span>
      </p>
    );
  }

  return (
    <ul
      className="flex flex-col sm:flex-row sm:flex-wrap gap-1.5 sm:gap-x-4 sm:gap-y-1.5 mt-1"
      aria-label="Purchase reassurance"
    >
      {items.map((item) => (
        <li
          key={item.text}
          className="flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <item.icon className="h-3.5 w-3.5 text-primary flex-shrink-0" />
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}
