import { useState, useEffect } from 'react';
import { storefrontApiRequest } from '@/lib/shopify';

const PRODUCTS_BY_IDS_QUERY = `
  query GetProductsByVariantIds($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on ProductVariant {
        id
        product {
          title
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

interface BundleImageData {
  images: string[];
  isLoading: boolean;
}

// Cache to avoid refetching
const imageCache = new Map<string, string[]>();

export function useBundleImages(variantIds: string[]): BundleImageData {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cacheKey = variantIds.join(',');
    
    // Check cache first
    if (imageCache.has(cacheKey)) {
      setImages(imageCache.get(cacheKey)!);
      setIsLoading(false);
      return;
    }

    async function fetchImages() {
      try {
        const data = await storefrontApiRequest(PRODUCTS_BY_IDS_QUERY, {
          ids: variantIds,
        });

        if (data?.data?.nodes) {
          // IMPORTANT: keep array index aligned with variantIds so Step N renders the correct strip image.
          // Use empty string as placeholder when an image is missing instead of filtering it out.
          const fetchedImages: string[] = data.data.nodes.map(
            (node: any) => node?.product?.images?.edges?.[0]?.node?.url ?? ''
          );

          imageCache.set(cacheKey, fetchedImages);
          setImages(fetchedImages);
        }
      } catch (error) {
        console.error('Error fetching bundle images:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, [variantIds]);

  return { images, isLoading };
}
