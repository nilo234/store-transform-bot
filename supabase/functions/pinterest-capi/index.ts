// Pinterest Conversions API proxy
// POST { event_name, event_id?, event_source_url?, user_data?, custom_data? }
// Hashes PII (email/phone) with SHA-256 before forwarding.
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const PINTEREST_AD_ACCOUNT_ID = Deno.env.get('PINTEREST_AD_ACCOUNT_ID');
const PINTEREST_CONVERSION_ACCESS_TOKEN = Deno.env.get('PINTEREST_CONVERSION_ACCESS_TOKEN');

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
  client_ip_address?: string;
  client_user_agent?: string;
  external_id?: string[];
  click_id?: string;    // _epik / epik click id
}

interface IncomingPayload {
  event_name: string;        // e.g. "page_visit", "checkout", "add_to_cart", "lead", "signup"
  event_id?: string;
  event_source_url?: string;
  action_source?: 'web' | 'app_android' | 'app_ios' | 'offline';
  user_data?: IncomingUserData;
  custom_data?: Record<string, unknown>;
  test?: boolean;            // when true, send to /events?test=true
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  if (!PINTEREST_AD_ACCOUNT_ID || !PINTEREST_CONVERSION_ACCESS_TOKEN) {
    return new Response(
      JSON.stringify({ error: 'Pinterest CAPI not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }

  let body: IncomingPayload;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (!body?.event_name) {
    return new Response(JSON.stringify({ error: 'event_name is required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    body.user_data?.client_ip_address ||
    undefined;
  const ua = body.user_data?.client_user_agent || req.headers.get('user-agent') || undefined;

  const user_data = {
    em: await hashArray(body.user_data?.em),
    ph: await hashArray(body.user_data?.ph),
    external_id: await hashArray(body.user_data?.external_id),
    client_ip_address: ip,
    client_user_agent: ua,
    click_id: body.user_data?.click_id,
  };

  // Strip undefined keys
  Object.keys(user_data).forEach((k) => {
    if ((user_data as Record<string, unknown>)[k] === undefined) {
      delete (user_data as Record<string, unknown>)[k];
    }
  });

  const event = {
    event_name: body.event_name,
    action_source: body.action_source ?? 'web',
    event_time: Math.floor(Date.now() / 1000),
    event_id: body.event_id,
    event_source_url: body.event_source_url,
    user_data,
    custom_data: body.custom_data,
  };

  const url = `https://api.pinterest.com/v5/ad_accounts/${PINTEREST_AD_ACCOUNT_ID}/events${
    body.test ? '?test=true' : ''
  }`;

  const pinterestRes = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PINTEREST_CONVERSION_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: [event] }),
  });

  const text = await pinterestRes.text();
  let parsed: unknown = text;
  try { parsed = JSON.parse(text); } catch { /* keep raw */ }

  return new Response(
    JSON.stringify({ ok: pinterestRes.ok, status: pinterestRes.status, response: parsed }),
    {
      status: pinterestRes.ok ? 200 : 502,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    },
  );
});
