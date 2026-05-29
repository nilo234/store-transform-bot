/**
 * Pinterest Conversions API (CAPI) client helper.
 * Forwards events to the `pinterest-capi` edge function, which hashes PII
 * and signs the request with the server-side access token.
 *
 * Browser-side Pinterest tag (pintrk) continues to fire from marketingPixels.ts;
 * CAPI events are sent in parallel with the same `event_id` for dedupe.
 */
import { supabase } from '@/integrations/supabase/client';

export type PinterestEventName =
  | 'page_visit'
  | 'view_category'
  | 'search'
  | 'add_to_cart'
  | 'checkout'
  | 'lead'
  | 'signup'
  | 'watch_video'
  | 'custom';

export interface PinterestLineItem {
  product_name?: string;
  product_id?: string;
  product_category?: string;
  product_brand?: string;
  product_price?: number;
  product_quantity?: number;
  product_variant?: string;
}

export interface PinterestCustomData {
  currency?: string;
  value?: string | number;
  order_id?: string;
  order_quantity?: number;
  content_ids?: string[];
  content_name?: string;
  content_category?: string;
  num_items?: number;
  search_string?: string;
  line_items?: PinterestLineItem[];
  [key: string]: unknown;
}

export interface PinterestEventInput {
  event_name: PinterestEventName | string;
  event_id?: string;
  event_source_url?: string;
  custom_data?: PinterestCustomData;
  /** Plain email — will be SHA-256 hashed in the edge function. */
  email?: string;
  /** Plain phone (digits only) — will be hashed in the edge function. */
  phone?: string;
  external_id?: string;
  test?: boolean;
}

function getEpik(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const m = document.cookie.match(/(?:^|;\s*)_epik=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : undefined;
}

/**
 * Send a Pinterest CAPI event. Fire-and-forget — never throws into callers.
 */
export async function sendPinterestEvent(input: PinterestEventInput): Promise<void> {
  try {
    if (typeof window === 'undefined') return;

    const payload = {
      event_name: input.event_name,
      event_id: input.event_id,
      event_source_url: input.event_source_url ?? window.location.href,
      action_source: 'web' as const,
      test: input.test,
      user_data: {
        em: input.email ? [input.email] : undefined,
        ph: input.phone ? [input.phone.replace(/\D/g, '')] : undefined,
        external_id: input.external_id ? [input.external_id] : undefined,
        client_user_agent: navigator.userAgent,
        click_id: getEpik(),
      },
      custom_data: input.custom_data,
    };

    await supabase.functions.invoke('pinterest-capi', { body: payload });
  } catch {
    /* swallow — analytics must never break the app */
  }
}
