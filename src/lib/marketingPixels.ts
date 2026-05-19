/**
 * Centralized marketing pixel events for Meta Pixel & Google Analytics 4.
 * Pixels are initialized in index.html (PageView only).
 * This module fires conversion events that the ad algorithms need to optimize.
 *
 * IMPORTANT: Without these events, Meta Ads cannot optimize for purchases
 * — the algorithm will just spend budget on traffic that won't convert.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    pintrk?: (...args: unknown[]) => void;
  }
}

export interface PixelProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
}

const safeFbq = (...args: unknown[]) => {
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq(...args);
    }
  } catch {
    /* ignore */
  }
};

const safeGtag = (...args: unknown[]) => {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag(...args);
    }
  } catch {
    /* ignore */
  }
};

/** Fired when user views a product detail page. */
export function trackViewContent(product: PixelProduct) {
  safeFbq('track', 'ViewContent', {
    content_ids: [product.id],
    content_name: product.name,
    content_type: 'product',
    value: product.price,
    currency: 'USD',
  });

  safeGtag('event', 'view_item', {
    currency: 'USD',
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: 1,
      },
    ],
  });
}

/** Fired when user adds an item to the cart. */
export function trackAddToCart(products: PixelProduct[]) {
  const value = products.reduce((s, p) => s + p.price * p.quantity, 0);
  const ids = products.map((p) => p.id);

  safeFbq('track', 'AddToCart', {
    content_ids: ids,
    content_type: 'product',
    contents: products.map((p) => ({ id: p.id, quantity: p.quantity })),
    value,
    currency: 'USD',
  });

  safeGtag('event', 'add_to_cart', {
    currency: 'USD',
    value,
    items: products.map((p) => ({
      item_id: p.id,
      item_name: p.name,
      price: p.price,
      quantity: p.quantity,
    })),
  });
}

/** Fired when user clicks "Checkout" — Meta Ads' #1 optimization signal. */
export function trackInitiateCheckout(products: PixelProduct[]) {
  const value = products.reduce((s, p) => s + p.price * p.quantity, 0);
  const numItems = products.reduce((s, p) => s + p.quantity, 0);

  safeFbq('track', 'InitiateCheckout', {
    content_ids: products.map((p) => p.id),
    content_type: 'product',
    contents: products.map((p) => ({ id: p.id, quantity: p.quantity })),
    num_items: numItems,
    value,
    currency: 'USD',
  });

  safeGtag('event', 'begin_checkout', {
    currency: 'USD',
    value,
    items: products.map((p) => ({
      item_id: p.id,
      item_name: p.name,
      price: p.price,
      quantity: p.quantity,
    })),
  });
}

/** Fired when a user submits an email (newsletter / popup / quiz). */
export function trackLead(source: string) {
  safeFbq('track', 'Lead', { content_name: source });
  safeGtag('event', 'generate_lead', { source });
}

const safePintrk = (...args: unknown[]) => {
  try {
    if (typeof window !== 'undefined' && typeof window.pintrk === 'function') {
      window.pintrk(...args);
    }
  } catch {
    /* ignore */
  }
};

export interface PurchasePayload {
  orderId: string;
  products: PixelProduct[];
  value: number;
  currency?: string;
  /** Pass the same event_id used server-side in Meta CAPI to deduplicate. */
  eventId?: string;
}

/**
 * Fired on the order-confirmation / thank-you page.
 * Sends a properly-formatted Purchase event to Meta Pixel (with eventID for CAPI dedupe),
 * GA4 (`purchase`), and Pinterest (`checkout`).
 */
export function trackPurchase({
  orderId,
  products,
  value,
  currency = 'USD',
  eventId,
}: PurchasePayload) {
  const contentIds = products.map((p) => p.id);
  const numItems = products.reduce((s, p) => s + p.quantity, 0);

  // Meta Pixel — Purchase (with CAPI dedupe via eventID)
  safeFbq(
    'track',
    'Purchase',
    {
      content_ids: contentIds,
      content_type: 'product',
      contents: products.map((p) => ({ id: p.id, quantity: p.quantity, item_price: p.price })),
      num_items: numItems,
      value,
      currency,
      order_id: orderId,
    },
    eventId ? { eventID: eventId } : undefined,
  );

  // GA4 — purchase
  safeGtag('event', 'purchase', {
    transaction_id: orderId,
    currency,
    value,
    items: products.map((p) => ({
      item_id: p.id,
      item_name: p.name,
      item_category: p.category,
      price: p.price,
      quantity: p.quantity,
    })),
  });

  // Pinterest — checkout conversion
  safePintrk('track', 'checkout', {
    value,
    order_quantity: numItems,
    currency,
    order_id: orderId,
    line_items: products.map((p) => ({
      product_name: p.name,
      product_id: p.id,
      product_price: p.price,
      product_quantity: p.quantity,
      product_category: p.category,
    })),
  });
}
