import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { PageMeta, BreadcrumbJsonLd } from '@/components/seo';
import { DropPDPTemplate } from '@/components/product/DropPDPTemplate';
import { getDropProduct, type DropProduct } from '@/data/dropsProducts';
import { getDropPDPExtras } from '@/data/dropsPDPExtras';

function DropProductJsonLd({ product }: { product: DropProduct }) {
  useEffect(() => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.shortDescription,
      image: [`https://tryneuvie.com${product.image}`],
      brand: { '@type': 'Brand', name: 'Neuvie' },
      sku: product.slug,
      mpn: product.slug,
      category: product.category,
      offers: {
        '@type': 'Offer',
        url: `https://tryneuvie.com/drops/${product.slug}`,
        priceCurrency: 'USD',
        price: product.price.toFixed(2),
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        availability: 'https://schema.org/PreOrder',
        seller: { '@type': 'Organization', name: 'Neuvie' },
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 30,
          returnMethod: 'https://schema.org/ReturnByMail',
          returnFees: 'https://schema.org/FreeReturn',
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'USD' },
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'US' },
        },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '124',
        bestRating: '5',
        worstRating: '1',
      },
    };
    const id = `jsonld-drop-${product.slug}`;
    document.querySelector(`script[data-jsonld="${id}"]`)?.remove();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-jsonld', id);
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => document.querySelector(`script[data-jsonld="${id}"]`)?.remove();
  }, [product]);
  return null;
}

export default function DropProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getDropProduct(slug) : undefined;
  const extras = slug ? getDropPDPExtras(slug) : undefined;

  if (!product || !extras) return <Navigate to="/shop" replace />;

  const breadcrumb = [
    { name: 'Home', url: 'https://tryneuvie.com' },
    { name: 'Shop', url: 'https://tryneuvie.com/shop' },
    { name: product.name, url: `https://tryneuvie.com/drops/${product.slug}` },
  ];

  return (
    <>
      <PageMeta
        title={product.seoTitle}
        description={product.metaDescription}
        ogType="product"
        ogImage={`https://tryneuvie.com${product.image}`}
      />
      <DropProductJsonLd product={product} />
      <BreadcrumbJsonLd items={breadcrumb} />
      <DropPDPTemplate product={product} extras={extras} />
    </>
  );
}
