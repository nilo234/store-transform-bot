import { useEffect, useRef } from 'react';

// Judge.me configuration for custom storefront
const SHOP_DOMAIN = 'lovable-project-99js2.myshopify.com';

interface JudgeMeReviewsProps {
  productId: string;
  productHandle: string;
  productTitle?: string;
}

// Judge.me widget component for Shopify reviews
export const JudgeMeReviews = ({ productId, productHandle, productTitle }: JudgeMeReviewsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Extract numeric ID from GraphQL ID
    const numericId = productId.includes('gid://') 
      ? productId.split('/').pop() 
      : productId;

    // Set up Judge.me global configuration
    (window as any).jdgm = (window as any).jdgm || {};
    (window as any).jdgm.SHOP_DOMAIN = SHOP_DOMAIN;
    (window as any).jdgm.PLATFORM = 'shopify';
    (window as any).jdgm.PUBLIC_TOKEN = '';

    // Load the main Judge.me widget script
    const script = document.createElement('script');
    script.src = `https://cdn.judge.me/widget_preloader.js`;
    script.async = true;
    script.setAttribute('data-shop-domain', SHOP_DOMAIN);
    script.setAttribute('data-platform', 'shopify');
    document.head.appendChild(script);

    // Load shop-specific Judge.me assets
    const shopScript = document.createElement('script');
    shopScript.src = `https://cdn.judge.me/shopify_v2.js?shop=${SHOP_DOMAIN}`;
    shopScript.async = true;
    document.head.appendChild(shopScript);

    // Also load the CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://cdn.judge.me/shopify_v2.css?shop=${SHOP_DOMAIN}`;
    document.head.appendChild(link);

    return () => {
      // Cleanup handled by browser
    };
  }, [productId]);

  // Refresh widgets when product changes
  useEffect(() => {
    const refreshTimer = setTimeout(() => {
      if (typeof (window as any).jdgm !== 'undefined' && (window as any).jdgm.refreshWidgets) {
        (window as any).jdgm.refreshWidgets();
      }
    }, 1500);

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
          <h2 className="font-display text-2xl md:text-3xl text-center mb-4" style={{ letterSpacing: '-0.02em' }}>
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

          {/* Judge.me All Reviews Widget as fallback */}
          <div 
            className="jdgm-widget jdgm-all-reviews-widget mt-8"
            data-product-id={numericId}
          />
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
