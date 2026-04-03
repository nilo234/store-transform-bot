import { toast } from "sonner";

// Shopify Configuration
export const SHOPIFY_API_VERSION = '2025-07';
export const SHOPIFY_STORE_PERMANENT_DOMAIN = 'lovable-project-99js2.myshopify.com';
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = '5b5117e8b4cd010d1949167ae4d530b9';

// ── Gummies → Strips sanitization ───────────────────────────────────────
// Shopify handles may contain "gummies" but we display/route as "strips"
export function sanitizeHandle(handle: string): string {
  return handle.replace(/[-_]?gummies/gi, '-strips').replace(/--+/g, '-').replace(/-$/, '');
}

export function sanitizeTitle(title: string): string {
  return title.replace(/\bgummies\b/gi, 'Strips');
}

// Convert a clean "strips" handle back to possible Shopify "gummies" handle
export function unsanitizeHandle(handle: string): string {
  return handle.replace(/[-_]?strips/gi, '-gummies').replace(/--+/g, '-').replace(/-$/, '');
}

// ── Image Optimization ───────────────────────────────────────────────────
// Append Shopify CDN width param for responsive images
export function optimizeShopifyImage(url: string, width: number = 400): string {
  if (!url || !url.includes('cdn.shopify.com')) return url;
  try {
    const u = new URL(url);
    u.searchParams.set('width', String(width));
    u.searchParams.set('quality', '80');
    return u.toString();
  } catch {
    return url;
  }
}

// Types
export interface ShopifyProduct {
  node: {
    id: string;
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
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

// GraphQL Queries
const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

// ── Cart Mutations ──────────────────────────────────────────────────────

const CART_QUERY = `
  query cart($id: ID!) {
    cart(id: $id) {
      id
      totalQuantity
      checkoutUrl
      lines(first: 100) {
        edges {
          node {
            id
            merchandise {
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
    }
  }
`;

const CART_DISCOUNT_CODES_UPDATE_MUTATION = `
  mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]!) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;

// API Helper
export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Shopify API access requires an active Shopify billing plan.",
    });
    return null;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`);
  }

  return data;
}

// ── Product Fetching ────────────────────────────────────────────────────

export async function fetchProducts(limit: number = 20, query?: string): Promise<ShopifyProduct[]> {
  try {
    const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: limit, query });
    if (!data) return [];
    return data.data.products.edges;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct['node'] | null> {
  try {
    const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
    if (!data) return null;
    return data.data.productByHandle;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// ── Cart API Functions ──────────────────────────────────────────────────

function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    // Preserve the original domain (tryneuvie.com) for proper Shopify analytics attribution
    // Only add channel param for checkout access without password
    url.searchParams.set('channel', 'online_store');
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

interface UserError {
  field: string[] | null;
  message: string;
}

function isCartNotFoundError(userErrors: UserError[]): boolean {
  return userErrors.some(e =>
    e.message.toLowerCase().includes('cart not found') ||
    e.message.toLowerCase().includes('does not exist')
  );
}

export async function createShopifyCart(variantId: string, quantity: number): Promise<{ cartId: string; checkoutUrl: string; lineId: string } | null> {
  const data = await storefrontApiRequest(CART_CREATE_MUTATION, {
    input: { lines: [{ quantity, merchandiseId: variantId }] },
  });

  if (data?.data?.cartCreate?.userErrors?.length > 0) {
    console.error('Cart creation failed:', data.data.cartCreate.userErrors);
    toast.error("Checkout failed", { description: data.data.cartCreate.userErrors[0].message });
    return null;
  }

  const cart = data?.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl) return null;

  const lineId = cart.lines.edges[0]?.node?.id;
  if (!lineId) return null;

  return { cartId: cart.id, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl), lineId };
}

// Create cart with multiple lines at once (for bundles)
export async function createShopifyCartMultiLines(
  lines: Array<{ variantId: string; quantity: number }>
): Promise<{ cartId: string; checkoutUrl: string; lineIds: Map<string, string> } | null> {
  const data = await storefrontApiRequest(CART_CREATE_MUTATION, {
    input: { lines: lines.map(l => ({ quantity: l.quantity, merchandiseId: l.variantId })) },
  });

  if (data?.data?.cartCreate?.userErrors?.length > 0) {
    console.error('Cart creation failed:', data.data.cartCreate.userErrors);
    toast.error("Checkout failed", { description: data.data.cartCreate.userErrors[0].message });
    return null;
  }

  const cart = data?.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl) return null;

  const lineIds = new Map<string, string>();
  for (const edge of cart.lines.edges) {
    lineIds.set(edge.node.merchandise.id, edge.node.id);
  }

  return { cartId: cart.id, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl), lineIds };
}

// Add multiple lines at once (for bundles added to existing cart)
export async function addMultipleLinesToShopifyCart(
  cartId: string,
  lines: Array<{ variantId: string; quantity: number }>
): Promise<{ success: boolean; lineIds?: Map<string, string>; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: lines.map(l => ({ quantity: l.quantity, merchandiseId: l.variantId })),
  });

  const userErrors: UserError[] = data?.data?.cartLinesAdd?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) {
    console.error('Add lines failed:', userErrors);
    return { success: false };
  }

  const edges = data?.data?.cartLinesAdd?.cart?.lines?.edges || [];
  const lineIds = new Map<string, string>();
  for (const edge of edges) {
    lineIds.set(edge.node.merchandise.id, edge.node.id);
  }
  return { success: true, lineIds };
}

// Apply discount code to cart
export async function applyDiscountToShopifyCart(
  cartId: string,
  discountCode: string
): Promise<{ success: boolean; checkoutUrl?: string }> {
  const data = await storefrontApiRequest(CART_DISCOUNT_CODES_UPDATE_MUTATION, {
    cartId,
    discountCodes: [discountCode],
  });

  const userErrors: UserError[] = data?.data?.cartDiscountCodesUpdate?.userErrors || [];
  if (userErrors.length > 0) {
    console.error('Discount code failed:', userErrors);
    return { success: false };
  }

  const cart = data?.data?.cartDiscountCodesUpdate?.cart;
  return {
    success: true,
    checkoutUrl: cart?.checkoutUrl ? formatCheckoutUrl(cart.checkoutUrl) : undefined,
  };
}

export async function addLineToShopifyCart(cartId: string, variantId: string, quantity: number): Promise<{ success: boolean; lineId?: string; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ quantity, merchandiseId: variantId }],
  });

  const userErrors: UserError[] = data?.data?.cartLinesAdd?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) {
    console.error('Add line failed:', userErrors);
    return { success: false };
  }

  const lines = data?.data?.cartLinesAdd?.cart?.lines?.edges || [];
  const newLine = lines.find((l: { node: { id: string; merchandise: { id: string } } }) => l.node.merchandise.id === variantId);
  return { success: true, lineId: newLine?.node?.id };
}

export async function updateShopifyCartLine(cartId: string, lineId: string, quantity: number): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });

  const userErrors: UserError[] = data?.data?.cartLinesUpdate?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) {
    console.error('Update line failed:', userErrors);
    return { success: false };
  }
  return { success: true };
}

export async function removeLineFromShopifyCart(cartId: string, lineId: string): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds: [lineId],
  });

  const userErrors: UserError[] = data?.data?.cartLinesRemove?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) {
    console.error('Remove line failed:', userErrors);
    return { success: false };
  }
  return { success: true };
}

export type ShopifyCartFetchState = 'active' | 'empty' | 'missing' | 'unknown';

export async function fetchShopifyCart(
  cartId: string
): Promise<{ state: ShopifyCartFetchState; checkoutUrl?: string; lineIds?: Map<string, string> }> {
  try {
    const data = await storefrontApiRequest(CART_QUERY, { id: cartId });

    if (!data) {
      // API-level issue (e.g. billing), keep local cart intact
      return { state: 'unknown' };
    }

    const cart = data?.data?.cart;

    if (!cart) {
      return { state: 'missing' };
    }

    if (!cart.totalQuantity || cart.totalQuantity <= 0) {
      return { state: 'empty' };
    }

    const lineIds = new Map<string, string>();
    for (const edge of cart.lines?.edges || []) {
      if (edge?.node?.merchandise?.id && edge?.node?.id) {
        lineIds.set(edge.node.merchandise.id, edge.node.id);
      }
    }

    return {
      state: 'active',
      checkoutUrl: cart.checkoutUrl ? formatCheckoutUrl(cart.checkoutUrl) : undefined,
      lineIds,
    };
  } catch {
    // Network issue, keep local cart intact
    return { state: 'unknown' };
  }
}
