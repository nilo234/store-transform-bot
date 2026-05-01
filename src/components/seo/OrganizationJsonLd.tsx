import { useEffect } from 'react';

export function OrganizationJsonLd() {
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Neuvie",
      "alternateName": "Neuvie Nutrition",
      "url": "https://tryneuvie.com",
      "logo": "https://tryneuvie.com/neuvie-logo.png",
      "description": "Premium oral supplement strips designed for maximum bioavailability and convenience. Fast-dissolving, science-backed wellness solutions.",
      "foundingDate": "2024",
      "sameAs": [
        "https://instagram.com/neuvie",
        "https://facebook.com/neuvie",
        "https://twitter.com/neuvie",
        "https://tiktok.com/@neuvie"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-800-NEUVIE",
        "contactType": "customer service",
        "email": "team@tryneuvie.com",
        "availableLanguage": ["English", "German"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      }
    };

    const existingScript = document.querySelector('script[data-jsonld="organization"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-jsonld', 'organization');
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-jsonld="organization"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null;
}
