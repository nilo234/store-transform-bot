import { useEffect, useRef } from 'react';

interface JudgeMeReviewsProps {
  productId: string;
  productHandle: string;
}

// Judge.me widget component for Shopify reviews
// Requires Judge.me app to be installed in Shopify admin
export const JudgeMeReviews = ({ productId, productHandle }: JudgeMeReviewsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Judge.me script if not already loaded
    const existingScript = document.querySelector('script[src*="judgeme"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://cdn.judge.me/widget_preloader.js';
      script.async = true;
      document.head.appendChild(script);
    }

    // Trigger widget reload when component mounts
    if (typeof (window as any).jdgm !== 'undefined') {
      (window as any).jdgm.refreshWidgets();
    }
  }, [productId, productHandle]);

  return (
    <section className="py-16 bg-muted/20">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-4">
            Customer Reviews
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Verified purchase reviews from real customers
          </p>
          
          {/* Judge.me Review Widget Placeholder */}
          <div 
            ref={containerRef}
            className="jdgm-widget jdgm-review-widget"
            data-product-title={productHandle}
            data-id={productId}
          >
            {/* Fallback UI while Judge.me loads */}
            <div className="bg-card rounded-2xl p-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">Reviews Coming Soon</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Be the first to share your experience! Reviews from verified customers will appear here once Judge.me is configured.
                </p>
                <div className="pt-4">
                  <a 
                    href="https://apps.shopify.com/judgeme" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Learn about setting up Judge.me →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JudgeMeReviews;
