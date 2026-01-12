import { useEffect } from 'react';

export function WebsiteJsonLd() {
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Neuvie",
      "alternateName": "Neuvie Nutrition",
      "url": "https://neuvie.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://neuvie.com/shop?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };

    const existingScript = document.querySelector('script[data-jsonld="website"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-jsonld', 'website');
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-jsonld="website"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null;
}
