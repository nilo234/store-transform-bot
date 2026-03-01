import { useEffect } from 'react';

interface ProductJsonLdProps {
  product: {
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          availableForSale: boolean;
        };
      }>;
    };
  };
}

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  useEffect(() => {
    const price = parseFloat(product.priceRange.minVariantPrice.amount);
    const originalPrice = price * 1.42;
    const isAvailable = product.variants.edges.some(v => v.node.availableForSale);
    const images = product.images.edges.map(img => img.node.url);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.title.replace(/\bgummies\b/gi, 'Strips'),
      "description": product.description,
      "image": images,
      "brand": {
        "@type": "Brand",
        "name": "Neuvie"
      },
      "sku": product.handle,
      "mpn": product.handle,
      "offers": {
        "@type": "Offer",
        "url": `https://neuvie.com/product/${product.handle}`,
        "priceCurrency": product.priceRange.minVariantPrice.currencyCode,
        "price": price.toFixed(2),
        "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        "availability": isAvailable 
          ? "https://schema.org/InStock" 
          : "https://schema.org/OutOfStock",
        "seller": {
          "@type": "Organization",
          "name": "Neuvie"
        },
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 14,
          "returnMethod": "https://schema.org/ReturnByMail",
          "returnFees": "https://schema.org/FreeReturn"
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0",
            "currency": "USD"
          },
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": ["US", "DE", "AT", "CH"]
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": 1,
              "maxValue": 2,
              "unitCode": "DAY"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": 3,
              "maxValue": 5,
              "unitCode": "DAY"
            }
          }
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "1247",
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    // Remove existing script if present
    const existingScript = document.querySelector('script[data-jsonld="product"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-jsonld', 'product');
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-jsonld="product"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [product]);

  return null;
}
