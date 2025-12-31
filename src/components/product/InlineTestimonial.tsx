import { Star, BadgeCheck } from 'lucide-react';

interface InlineTestimonialProps {
  quote: string;
  author: string;
  isVerified?: boolean;
}

export const InlineTestimonial = ({ 
  quote, 
  author, 
  isVerified = true 
}: InlineTestimonialProps) => {
  return (
    <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
      <div className="flex gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
        ))}
      </div>
      <p className="text-sm text-foreground italic mb-3">"{quote}"</p>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground">{author}</span>
        {isVerified && (
          <span className="inline-flex items-center gap-1 text-xs text-primary">
            <BadgeCheck className="w-3.5 h-3.5" />
            Verified Buyer
          </span>
        )}
      </div>
    </div>
  );
};
