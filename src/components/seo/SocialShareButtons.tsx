import { Facebook, Twitter, Share2 } from 'lucide-react';

interface SocialShareButtonsProps {
  url: string;
  text: string;
  className?: string;
}

export function SocialShareButtons({ url, text, className = '' }: SocialShareButtonsProps) {
  const encoded = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-sm text-muted-foreground font-medium">Share:</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-muted/60 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-muted/60 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Share on X (Twitter)"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        href={`https://pinterest.com/pin/create/button/?url=${encoded}&description=${encodedText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-muted/60 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Share on Pinterest"
      >
        <Share2 className="h-4 w-4" />
      </a>
    </div>
  );
}
