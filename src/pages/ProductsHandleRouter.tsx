import { useParams, Navigate } from 'react-router-dom';
import { getDropProduct } from '@/data/dropsProducts';

/**
 * Resolves Shopify-style product URLs (/products/:handle) to the correct
 * internal route. Shopify (and therefore Google Merchant Center) generates
 * product links as /products/{handle}; our site uses /product/{handle} for
 * strips and /drops/{handle} for drops. This component bridges that gap so
 * GMC feed links resolve correctly and products get accepted by Google.
 */
export default function ProductsHandleRouter() {
  const { handle } = useParams<{ handle: string }>();
  if (!handle) return <Navigate to="/shop" replace />;

  // If the handle matches a drops product, route to the drops PDP
  if (getDropProduct(handle)) {
    return <Navigate to={`/drops/${handle}`} replace />;
  }

  // Otherwise treat it as a strips/standard product
  return <Navigate to={`/product/${handle}`} replace />;
}
