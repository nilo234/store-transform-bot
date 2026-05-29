/**
 * Centralized marketing pixel events for Meta Pixel & Google Analytics 4.
 * Pixels are initialized in index.html (PageView only).
 * This module fires conversion events that the ad algorithms need to optimize.
 *
 * IMPORTANT: Without these events, Meta Ads cannot optimize for purchases
 * — the algorithm will just spend budget on traffic that won't convert.
 */

import { sendPinterestEvent } from './pinterestCapi';

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

/** ISO 4217 currency — single source of truth for all client-side pixels. */
const CURRENCY = 'USD' as const;

/** Round to 2 decimals as a Number (Meta requires numeric value, not string). */
function money(n: number): number {
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.round(n * 100) / 100;
}

/** Sanitize a product list: drop items with invalid price/qty, coerce numbers. */
function sanitizeProducts(products: PixelProduct[]): PixelProduct[] {
  return (products ?? [])
    .map((p) => ({
      ...p,
      price: money(Number(p?.price)),
      quantity: Math.max(1, Math.floor(Number(p?.quantity) || 1)),
    }))
    .filter((p) => p.id && p.price > 0);
}

/** Generate a unique eventID for browser-pixel ↔ CAPI deduplication. */
function makeEventId(prefix: string): string {
  const rand =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `${prefix}_${rand}`;
}

/** Fired when user views a product detail page. */
export function trackViewContent(product: PixelProduct) {
  const price = money(Number(product?.price));
  if (!product?.id || price <= 0) return;

  const eventID = makeEventId('vc');

  safeFbq(
    'track',
    'ViewContent',
    {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: price,
      currency: CURRENCY,
    },
    { eventID },
  );

  safeGtag('event', 'view_item', {
    currency: CURRENCY,
    value: price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price,
        quantity: 1,
      },
    ],
  });

  // Pinterest CAPI (server-side, dedupe via event_id)
  sendPinterestEvent({
    event_name: 'page_visit',
    event_id: eventID,
    custom_data: {
      currency: CURRENCY,
      value: String(price),
      content_ids: [product.id],
      content_name: product.name,
      line_items: [{ product_id: product.id, product_name: product.name, product_price: price, product_quantity: 1 }],
    },
  });
}

/** Fired when user adds an item to the cart. */

export function trackAddToCart(products: PixelProduct[]) {
  const clean = sanitizeProducts(products);
  if (clean.length === 0) return;

  const value = money(clean.reduce((s, p) => s + p.price * p.quantity, 0));
  if (value <= 0) return;

  const ids = clean.map((p) => p.id);
  const eventID = makeEventId('atc');

  safeFbq(
    'track',
    'AddToCart',
    {
      content_ids: ids,
      content_type: 'product',
      contents: clean.map((p) => ({ id: p.id, quantity: p.quantity, item_price: p.price })),
      value,
      currency: CURRENCY,
    },
    { eventID },
  );

  safeGtag('event', 'add_to_cart', {
    currency: CURRENCY,
    value,
    items: clean.map((p) => ({
      item_id: p.id,
      item_name: p.name,
      price: p.price,
      quantity: p.quantity,
    })),
  });

  sendPinterestEvent({
    event_name: 'add_to_cart',
    event_id: eventID,
    custom_data: {
      currency: CURRENCY,
      value: String(value),
      content_ids: ids,
      num_items: clean.reduce((s, p) => s + p.quantity, 0),
      line_items: clean.map((p) => ({
        product_id: p.id,
        product_name: p.name,
        product_price: p.price,
        product_quantity: p.quantity,
      })),
    },
  });
}

/** Fired when user clicks "Checkout" — Meta Ads' #1 optimization signal. */

export function trackInitiateCheckout(products: PixelProduct[]) {
  const clean = sanitizeProducts(products);
  if (clean.length === 0) return;

  const value = money(clean.reduce((s, p) => s + p.price * p.quantity, 0));
  if (value <= 0) return;

  const numItems = clean.reduce((s, p) => s + p.quantity, 0);
  const eventID = makeEventId('ic');

  safeFbq(
    'track',
    'InitiateCheckout',
    {
      content_ids: clean.map((p) => p.id),
      content_type: 'product',
      contents: clean.map((p) => ({ id: p.id, quantity: p.quantity, item_price: p.price })),
      num_items: numItems,
      value,
      currency: CURRENCY,
    },
    { eventID },
  );

  safeGtag('event', 'begin_checkout', {
    currency: CURRENCY,
    value,
    items: clean.map((p) => ({
      item_id: p.id,
      item_name: p.name,
      price: p.price,
      quantity: p.quantity,
    })),
  });

  sendPinterestEvent({
    event_name: 'checkout',
    event_id: eventID,
    custom_data: {
      currency: CURRENCY,
      value: String(value),
      content_ids: clean.map((p) => p.id),
      num_items: numItems,
      order_quantity: numItems,
      line_items: clean.map((p) => ({
        product_id: p.id,
        product_name: p.name,
        product_price: p.price,
        product_quantity: p.quantity,
      })),
    },
  });
}

/** Fired when a user submits an email (newsletter / popup / quiz). */
export function trackLead(source: string) {
  safeFbq('track', 'Lead', { content_name: source });
  safeGtag('event', 'generate_lead', { source });
  sendPinterestEvent({ event_name: 'lead', custom_data: { content_name: source } });
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

/** Per-session guard so a Purchase is never sent twice for the same order. */
const PURCHASE_GUARD_KEY = 'neuvie:purchase-fired';
function alreadyFired(orderId: string): boolean {
  try {
    if (typeof window === 'undefined' || !window.sessionStorage) return false;
    const raw = window.sessionStorage.getItem(PURCHASE_GUARD_KEY);
    const set = new Set<string>(raw ? JSON.parse(raw) : []);
    if (set.has(orderId)) return true;
    set.add(orderId);
    window.sessionStorage.setItem(PURCHASE_GUARD_KEY, JSON.stringify([...set]));
    return false;
  } catch {
    return false;
  }
}

/**
 * Fired on the order-confirmation / thank-you page.
 * Sends a Purchase event to Meta Pixel (with eventID for CAPI dedupe),
 * GA4 (`purchase`), and Pinterest (`checkout`).
 *
 * Safe to call multiple times: a per-session guard keyed on orderId prevents duplicates.
 * NOTE: Shopify checkout/thank-you lives on *.myshopify.com and does NOT load this bundle.
 * Install the Shopify Custom Web Pixel for thank-you tracking — this helper is only
 * used if a custom in-app order confirmation page is ever added.
 */
export function trackPurchase({
  orderId,
  products,
  value,
  currency = 'USD',
  eventId,
}: PurchasePayload) {
  // Validate inputs — never fire with empty/invalid data
  const safeOrderId = String(orderId ?? '').trim();
  const safeValue = Number(value);
  const safeCurrency = (currency || 'USD').toUpperCase();
  if (!safeOrderId || !Number.isFinite(safeValue) || safeValue < 0 || !products?.length) {
    return;
  }
  if (alreadyFired(safeOrderId)) return;

  const contentIds = products.map((p) => p.id);
  const numItems = products.reduce((s, p) => s + p.quantity, 0);
  const dedupId = eventId || `purchase_${safeOrderId}`;

  // Meta Pixel — Purchase (eventID matches CAPI for dedupe)
  safeFbq(
    'track',
    'Purchase',
    {
      content_ids: contentIds,
      content_type: 'product',
      contents: products.map((p) => ({ id: p.id, quantity: p.quantity, item_price: p.price })),
      num_items: numItems,
      value: safeValue,
      currency: safeCurrency,
      order_id: safeOrderId,
    },
    { eventID: dedupId },
  );

  // GA4 — purchase
  safeGtag('event', 'purchase', {
    transaction_id: safeOrderId,
    currency: safeCurrency,
    value: safeValue,
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
    value: safeValue,
    order_quantity: numItems,
    currency: safeCurrency,
    order_id: safeOrderId,
    line_items: products.map((p) => ({
      product_name: p.name,
      product_id: p.id,
      product_price: p.price,
      product_quantity: p.quantity,
      product_category: p.category,
    })),
  });
}
