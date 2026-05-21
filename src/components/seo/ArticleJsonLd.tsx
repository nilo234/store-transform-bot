import { useEffect } from 'react';

interface ArticleJsonLdProps {
  headline: string;
  description: string;
  datePublished: string;
  author: string;
  url: string;
  image?: string;
}

export function ArticleJsonLd({ headline, description, datePublished, author, url, image }: ArticleJsonLdProps) {
  useEffect(() => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline,
      description,
      datePublished,
      dateModified: datePublished,
      author: {
        '@type': 'Organization',
        name: author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'NEUVIE Nutrition',
        logo: {
          '@type': 'ImageObject',
          url: 'https://tryneuvie.com/og-image.png',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      ...(image ? { image } : {}),
    };

    const existing = document.querySelector('script[data-jsonld="article"]');
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-jsonld', 'article');
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.querySelector('script[data-jsonld="article"]')?.remove();
    };
  }, [headline, description, datePublished, author, url, image]);

  return null;
}
