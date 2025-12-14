import { useEffect, useRef } from 'react';

// Judge.me configuration for custom storefront
const SHOP_DOMAIN = 'lovable-project-99js2.myshopify.com';

interface JudgeMeReviewsProps {
  productId: string;
  productHandle: string;
  productTitle?: string;
}

// Judge.me widget component for Shopify reviews
// Works with custom React storefronts
export const JudgeMeReviews = ({ productId, productHandle, productTitle }: JudgeMeReviewsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Extract numeric ID from GraphQL ID (gid://shopify/Product/123456789 -> 123456789)
    const numericId = productId.includes('gid://') 
      ? productId.split('/').pop() 
      : productId;

    // Load Judge.me scripts if not already loaded
    if (!scriptLoaded.current) {
      // Main Judge.me widget script
      const widgetScript = document.createElement('script');
      widgetScript.src = `https://cdn.judge.me/widget_preloader.js`;
      widgetScript.async = true;
      document.head.appendChild(widgetScript);

      // Shop-specific configuration script
      const shopScript = document.createElement('script');
      shopScript.src = `https://cdn.judge.me/assets/installed.js`;
      shopScript.async = true;
      shopScript.setAttribute('data-shop-domain', SHOP_DOMAIN);
      document.head.appendChild(shopScript);

      scriptLoaded.current = true;
    }

    // Set up Judge.me configuration on window
    (window as any).jdgmSettings = {
      shop_domain: SHOP_DOMAIN,
    };

    // Refresh widgets when component updates
    const refreshTimer = setTimeout(() => {
      if (typeof (window as any).jdgm !== 'undefined') {
        (window as any).jdgm.SHOP_DOMAIN = SHOP_DOMAIN;
        (window as any).jdgm.refreshWidgets();
      }
    }, 1000);

    return () => clearTimeout(refreshTimer);
  }, [productId, productHandle]);

  // Extract numeric ID for widget
  const numericId = productId.includes('gid://') 
    ? productId.split('/').pop() 
    : productId;

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
          
          {/* Judge.me Review Widget */}
          <div 
            ref={containerRef}
            className="jdgm-widget jdgm-review-widget"
            data-id={numericId}
            data-product-title={productTitle || productHandle}
            data-handle={productHandle}
          />

          {/* Judge.me Preview Badge (shows star rating) */}
          <div 
            className="jdgm-preview-badge mt-8 text-center"
            data-id={numericId}
          />

          {/* Fallback message while Judge.me initializes */}
          <noscript>
            <div className="bg-card rounded-2xl p-8 text-center">
              <p className="text-muted-foreground">
                Please enable JavaScript to view customer reviews.
              </p>
            </div>
          </noscript>
        </div>
      </div>
    </section>
  );
};

// Star rating badge for product cards/listings
export const JudgeMePreviewBadge = ({ productId }: { productId: string }) => {
  const numericId = productId.includes('gid://') 
    ? productId.split('/').pop() 
    : productId;

  return (
    <div 
      className="jdgm-preview-badge" 
      data-id={numericId}
    />
  );
};

export default JudgeMeReviews;
