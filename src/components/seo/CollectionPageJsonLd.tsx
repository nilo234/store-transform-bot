import { useEffect } from 'react';

interface CollectionPageJsonLdProps {
  name: string;
  description: string;
  url: string;
  numberOfItems?: number;
}

export function CollectionPageJsonLd({ name, description, url, numberOfItems }: CollectionPageJsonLdProps) {
  useEffect(() => {
    const jsonLd: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name,
      description,
      url,
    };
    if (typeof numberOfItems === 'number') {
      jsonLd.mainEntity = {
        '@type': 'ItemList',
        numberOfItems,
      };
    }

    const existing = document.querySelector('script[data-jsonld="collection"]');
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-jsonld', 'collection');
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.querySelector('script[data-jsonld="collection"]')?.remove();
    };
  }, [name, description, url, numberOfItems]);

  return null;
}
