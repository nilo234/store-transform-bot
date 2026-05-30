// TikTok Events API (CAPI) proxy
// POST { event, event_id?, event_source_url?, user_data?, properties?, test? }
// Hashes PII (email/phone/external_id) with SHA-256 before forwarding.
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const TIKTOK_PIXEL_ID = Deno.env.get('TIKTOK_PIXEL_ID');
const TIKTOK_ACCESS_TOKEN = Deno.env.get('TIKTOK_ACCESS_TOKEN');

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input.trim().toLowerCase());
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function hashArray(values: string[] | undefined): Promise<string[] | undefined> {
  if (!values?.length) return undefined;
  return Promise.all(values.filter(Boolean).map((v) => sha256(v)));
}

interface IncomingUserData {
  em?: string[];        // emails (plain — will be hashed)
  ph?: string[];        // phones (plain — will be hashed)
  external_id?: string[];
  client_ip_address?: string;
  client_user_agent?: string;
  ttclid?: string;      // TikTok click id
  ttp?: string;         // TikTok browser id from cookie
}

interface IncomingPayload {
  event: string;        // e.g. "ViewContent", "AddToCart", "InitiateCheckout", "PlaceAnOrder", "CompletePayment", "Lead"
  event_id?: string;
  event_source_url?: string;
  user_data?: IncomingUserData;
  properties?: Record<string, unknown>;
  test?: boolean;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    if (!TIKTOK_PIXEL_ID || !TIKTOK_ACCESS_TOKEN) {
      return new Response(
        JSON.stringify({ ok: false, error: 'TikTok env vars missing' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const payload = (await req.json()) as IncomingPayload;
    if (!payload?.event) {
      return new Response(
        JSON.stringify({ ok: false, error: 'event is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      undefined;
    const ua = req.headers.get('user-agent') ?? payload.user_data?.client_user_agent;

    const user_data = {
      email: await hashArray(payload.user_data?.em),
      phone: await hashArray(payload.user_data?.ph),
      external_id: await hashArray(payload.user_data?.external_id),
      ip: payload.user_data?.client_ip_address ?? ip,
      user_agent: ua,
      ttclid: payload.user_data?.ttclid,
      ttp: payload.user_data?.ttp,
    };

    const body = {
      event_source: 'web',
      event_source_id: TIKTOK_PIXEL_ID,
      data: [
        {
          event: payload.event,
          event_time: Math.floor(Date.now() / 1000),
          event_id: payload.event_id,
          user: user_data,
          page: { url: payload.event_source_url },
          properties: payload.properties ?? {},
        },
      ],
      ...(payload.test ? { test_event_code: 'TEST' } : {}),
    };

    const res = await fetch('https://business-api.tiktok.com/open_api/v1.3/event/track/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': TIKTOK_ACCESS_TOKEN,
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    return new Response(
      JSON.stringify({ ok: res.ok, status: res.status, response: text }),
      { status: res.ok ? 200 : 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
