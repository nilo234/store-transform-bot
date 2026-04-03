import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  sendShopifyAnalytics,
  getClientBrowserParameters,
  AnalyticsEventName,
  AnalyticsPageType,
  ShopifySalesChannel,
  useShopifyCookies,
  type ShopifyPageViewPayload,
  type ShopifyAddToCartPayload,
} from '@shopify/hydrogen-react';
import { SHOPIFY_STOREFRONT_TOKEN, SHOPIFY_STORE_PERMANENT_DOMAIN } from '@/lib/shopify';

const SHOP_ID = 'gid://shopify/Shop/800582862990';
const STOREFRONT_ID = 'gid://shopify/Channel/1';
const CURRENCY = 'USD';

function getPageType(pathname: string): string {
  if (pathname === '/') return AnalyticsPageType.home;
  if (pathname === '/shop' || pathname === '/bundles') return AnalyticsPageType.collection;
  if (pathname.startsWith('/product/')) return AnalyticsPageType.product;
  if (pathname === '/cart') return AnalyticsPageType.cart;
  if (pathname === '/faqs') return AnalyticsPageType.page;
  if (pathname === '/about') return AnalyticsPageType.page;
  if (pathname === '/science') return AnalyticsPageType.page;
  if (pathname === '/contact') return AnalyticsPageType.page;
  if (pathname === '/shipping') return AnalyticsPageType.page;
  if (pathname === '/returns') return AnalyticsPageType.page;
  if (pathname === '/privacy') return AnalyticsPageType.page;
  if (pathname === '/terms') return AnalyticsPageType.page;
  if (pathname.startsWith('/cart/c/')) return AnalyticsPageType.cart;
  return AnalyticsPageType.page;
}

function buildBasePayload(pathname: string, search: string) {
  return {
    shopId: SHOP_ID,
    shopifySalesChannel: ShopifySalesChannel.headless,
    storefrontId: STOREFRONT_ID,
    currency: CURRENCY,
    acceptedLanguage: 'EN',
    hasUserConsent: true,
    ...getClientBrowserParameters(),
    canonicalUrl: `https://tryneuvie.com${pathname}${search}`,
    pageType: getPageType(pathname),
  };
}

/**
 * Sends a PAGE_VIEW event to Shopify analytics on every route change.
 * Also sets/refreshes Shopify tracking cookies (_shopify_y, _shopify_s, etc.).
 */
export function useShopifyPageAnalytics() {
  const location = useLocation();

  // Set & refresh Shopify cookies
  useShopifyCookies({ hasUserConsent: true, domain: 'tryneuvie.com' });

  useEffect(() => {
    // Small delay to let the page render so browser params are accurate
    const timer = setTimeout(() => {
      const payload = buildBasePayload(location.pathname, location.search) as ShopifyPageViewPayload;
      sendShopifyAnalytics(
        {
          eventName: AnalyticsEventName.PAGE_VIEW,
          payload,
        },
        SHOPIFY_STORE_PERMANENT_DOMAIN,
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);
}

/**
 * Send a product view event to Shopify analytics.
 */
export function sendProductViewEvent(product: {
  id: string;
  title: string;
  vendor?: string;
  variantId: string;
  variantTitle: string;
  price: string;
}) {
  const payload = {
    ...buildBasePayload(`/product/${product.title.toLowerCase().replace(/\s+/g, '-')}`, ''),
    pageType: AnalyticsPageType.product,
    resourceId: product.id,
    products: [
      {
        productGid: product.id,
        name: product.title,
        brand: product.vendor || 'NEUVIE',
        price: product.price,
        variantGid: product.variantId,
        variantName: product.variantTitle,
        quantity: 1,
      },
    ],
  } as ShopifyPageViewPayload;

  sendShopifyAnalytics(
    {
      eventName: AnalyticsEventName.PAGE_VIEW,
      payload,
    },
    SHOPIFY_STORE_PERMANENT_DOMAIN,
  );
}

/**
 * Send an add-to-cart event to Shopify analytics.
 */
export function sendAddToCartEvent(product: {
  id: string;
  title: string;
  variantId: string;
  variantTitle: string;
  price: string;
  quantity: number;
}) {
  const payload = {
    ...buildBasePayload(window.location.pathname, window.location.search),
    cartId: '',
    products: [
      {
        productGid: product.id,
        name: product.title,
        brand: 'NEUVIE',
        price: product.price,
        variantGid: product.variantId,
        variantName: product.variantTitle,
        quantity: product.quantity,
      },
    ],
  } as unknown as ShopifyAddToCartPayload;

  sendShopifyAnalytics(
    {
      eventName: AnalyticsEventName.ADD_TO_CART,
      payload,
    },
    SHOPIFY_STORE_PERMANENT_DOMAIN,
  );
}
