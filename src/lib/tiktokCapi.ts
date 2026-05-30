/**
 * TikTok Events API (CAPI) client helper.
 * Forwards events to the `tiktok-capi` edge function, which hashes PII
 * and signs the request with the server-side access token.
 *
 * Browser-side ttq fires from index.html / marketingPixels.ts; CAPI events
 * are sent in parallel with the same `event_id` for dedupe.
 */
import { supabase } from '@/integrations/supabase/client';

export type TikTokEventName =
  | 'ViewContent'
  | 'AddToCart'
  | 'InitiateCheckout'
  | 'PlaceAnOrder'
  | 'CompletePayment'
  | 'Lead'
  | 'CompleteRegistration'
  | 'Search'
  | 'AddToWishlist';

export interface TikTokContent {
  content_id?: string;
  content_name?: string;
  content_category?: string;
  content_type?: 'product' | 'product_group';
  price?: number;
  quantity?: number;
  brand?: string;
}

export interface TikTokProperties {
  currency?: string;
  value?: number | string;
  content_type?: 'product' | 'product_group';
  contents?: TikTokContent[];
  order_id?: string;
  query?: string;
  [key: string]: unknown;
}

export interface TikTokEventInput {
  event: TikTokEventName | string;
  event_id?: string;
  event_source_url?: string;
  properties?: TikTokProperties;
  email?: string;
  phone?: string;
  external_id?: string;
  test?: boolean;
}

function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const m = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[1]) : undefined;
}

/**
 * Fire-and-forget TikTok CAPI event — never throws into callers.
 */
export async function sendTikTokEvent(input: TikTokEventInput): Promise<void> {
  try {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const ttclid = urlParams.get('ttclid') ?? readCookie('ttclid');
    const ttp = readCookie('_ttp');

    const payload = {
      event: input.event,
      event_id: input.event_id,
      event_source_url: input.event_source_url ?? window.location.href,
      test: input.test,
      user_data: {
        em: input.email ? [input.email] : undefined,
        ph: input.phone ? [input.phone.replace(/\D/g, '')] : undefined,
        external_id: input.external_id ? [input.external_id] : undefined,
        client_user_agent: navigator.userAgent,
        ttclid,
        ttp,
      },
      properties: input.properties,
    };

    await supabase.functions.invoke('tiktok-capi', { body: payload });
  } catch {
    /* swallow — analytics must never break the app */
  }
}
