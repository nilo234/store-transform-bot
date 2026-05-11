// Meta Conversions API — Purchase event
// Receives Shopify "orders/create" webhook → forwards hashed Purchase event to Meta CAPI.
// Configure in Shopify Admin → Settings → Notifications → Webhooks:
//   Event: Order creation | Format: JSON
//   URL: https://<project>.functions.supabase.co/meta-capi-purchase
import { createHmac, createHash } from "node:crypto";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-shopify-hmac-sha256, x-shopify-topic, x-shopify-shop-domain",
};

const META_PIXEL_ID = "964196575993350";
const META_API_VERSION = "v21.0";

const sha256 = (v: string) =>
  createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

const normalizePhone = (p: string) => p.replace(/[^0-9]/g, "");

// Built-in sample order for the test endpoint (?test=1).
const SAMPLE_ORDER = {
  id: 9999000001,
  email: "test@tryneuvie.com",
  phone: "+1 415 555 0199",
  created_at: new Date().toISOString(),
  currency: "USD",
  total_price: "59.98",
  order_status_url: "https://tryneuvie.com/orders/test",
  customer: { first_name: "Jane", last_name: "Tester", email: "test@tryneuvie.com" },
  shipping_address: {
    first_name: "Jane", last_name: "Tester",
    city: "San Francisco", zip: "94110",
    province_code: "CA", country_code: "US",
    phone: "+1 415 555 0199",
  },
  client_details: { browser_ip: "203.0.113.42", user_agent: "Mozilla/5.0 (Test) MetaCAPI/1.0" },
  line_items: [
    { product_id: 8000001, variant_id: 9000001, quantity: 2, price: "29.99" },
  ],
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const url = new URL(req.url);
  const isTest = url.searchParams.get("test") === "1";

  try {
    // TEST MODE: skip HMAC, use sample order if no body provided.
    // Usage:
    //   GET  /meta-capi-purchase?test=1                  → uses built-in sample order
    //   POST /meta-capi-purchase?test=1  + JSON body     → uses your own order JSON
    // Add &test_event_code=TEST12345 to route into Meta Events Manager → Test Events.
    let rawBody = "";
    if (isTest && req.method === "GET") {
      rawBody = JSON.stringify(SAMPLE_ORDER);
    } else {
      rawBody = await req.text();
      if (isTest && !rawBody) rawBody = JSON.stringify(SAMPLE_ORDER);
    }


    // Optional HMAC verification (recommended) — set SHOPIFY_WEBHOOK_SECRET
    const webhookSecret = Deno.env.get("SHOPIFY_WEBHOOK_SECRET");
    if (webhookSecret && !isTest) {
      const hmacHeader = req.headers.get("x-shopify-hmac-sha256") ?? "";
      const digest = createHmac("sha256", webhookSecret).update(rawBody).digest("base64");
      if (digest !== hmacHeader) {
        console.warn("Invalid Shopify HMAC signature");
        return new Response(JSON.stringify({ error: "Invalid signature" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const accessToken = Deno.env.get("META_CAPI_ACCESS_TOKEN");
    if (!accessToken) {
      return new Response(JSON.stringify({ error: "META_CAPI_ACCESS_TOKEN not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const order = JSON.parse(rawBody);

    const eventTime = Math.floor(new Date(order.created_at ?? Date.now()).getTime() / 1000);
    const value = String(order.total_price ?? order.current_total_price ?? "0");
    const currency = order.currency ?? "USD";

    const email: string | undefined = order.email ?? order.customer?.email;
    const phone: string | undefined = order.phone ?? order.customer?.phone ?? order.shipping_address?.phone;
    const firstName: string | undefined = order.customer?.first_name ?? order.shipping_address?.first_name;
    const lastName: string | undefined = order.customer?.last_name ?? order.shipping_address?.last_name;
    const city: string | undefined = order.shipping_address?.city;
    const zip: string | undefined = order.shipping_address?.zip;
    const country: string | undefined = order.shipping_address?.country_code;
    const state: string | undefined = order.shipping_address?.province_code;

    // fbp / fbc are typically passed by the storefront via cart note_attributes
    // (recommended pattern). They can also arrive via cookies on the request.
    const noteAttrs: Array<{ name: string; value: string }> = order.note_attributes ?? [];
    const noteAttr = (k: string) =>
      noteAttrs.find((a) => a?.name?.toLowerCase() === k.toLowerCase())?.value;
    const cookieHeader = req.headers.get("cookie") ?? "";
    const cookieVal = (k: string) => {
      const m = cookieHeader.match(new RegExp(`(?:^|; )${k}=([^;]+)`));
      return m ? decodeURIComponent(m[1]) : undefined;
    };
    const fbp = noteAttr("fbp") ?? cookieVal("_fbp");
    const fbc = noteAttr("fbc") ?? cookieVal("_fbc");

    // Build raw → hashed mapping for debug
    type FieldMap = { src: string; raw?: string; normalized?: string; hashed?: string };
    const fields: Record<string, FieldMap> = {
      em: { src: "order.email | customer.email", raw: email, normalized: email?.trim().toLowerCase() },
      ph: { src: "order.phone | customer.phone | shipping_address.phone", raw: phone, normalized: phone ? normalizePhone(phone) : undefined },
      fn: { src: "customer.first_name | shipping_address.first_name", raw: firstName, normalized: firstName?.trim().toLowerCase() },
      ln: { src: "customer.last_name | shipping_address.last_name", raw: lastName, normalized: lastName?.trim().toLowerCase() },
      ct: { src: "shipping_address.city", raw: city, normalized: city?.trim().toLowerCase() },
      zp: { src: "shipping_address.zip", raw: zip, normalized: zip?.trim().toLowerCase() },
      country: { src: "shipping_address.country_code", raw: country, normalized: country?.trim().toLowerCase() },
      st: { src: "shipping_address.province_code", raw: state, normalized: state?.trim().toLowerCase() },
    };

    const userData: Record<string, unknown> = {};
    for (const [k, f] of Object.entries(fields)) {
      if (f.normalized) {
        f.hashed = sha256(f.normalized);
        userData[k] = [f.hashed];
      }
    }
    if (order.client_details?.browser_ip) userData.client_ip_address = order.client_details.browser_ip;
    if (order.client_details?.user_agent) userData.client_user_agent = order.client_details.user_agent;
    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;

    const contents = (order.line_items ?? []).map((li: Record<string, unknown>) => ({
      id: String(li.product_id ?? li.variant_id ?? ""),
      quantity: li.quantity ?? 1,
      item_price: Number(li.price ?? 0),
    }));

    const eventId = String(order.id ?? `${eventTime}`);

    const payload = {
      data: [
        {
          event_name: "Purchase",
          event_time: eventTime,
          event_id: eventId, // dedupe with browser pixel — must match the `eventID` sent to fbq('track', 'Purchase', {...}, { eventID })
          action_source: "website",
          event_source_url: order.order_status_url ?? `https://tryneuvie.com`,
          user_data: userData,
          custom_data: {
            currency,
            value,
            content_type: "product",
            contents,
            order_id: String(order.id ?? ""),
            num_items: contents.reduce((s: number, c: { quantity: number }) => s + (c.quantity ?? 0), 0),
          },
        },
      ],
    };

    // Optional: route to Meta Test Events tab. Pass ?test_event_code=TESTxxxxx
    const testEventCode = url.searchParams.get("test_event_code");
    if (testEventCode) {
      (payload.data[0] as Record<string, unknown>).test_event_code = testEventCode;
      (payload as Record<string, unknown>).test_event_code = testEventCode;
    }


    // Build debug bundle (only attached in test mode)
    const debug = isTest ? {
      pixel_id: META_PIXEL_ID,
      api_version: META_API_VERSION,
      meta_api_url: metaUrl_redacted(accessToken),
      computed: {
        event_id: eventId,
        event_id_source: order.id ? "order.id" : "fallback:event_time",
        event_time: eventTime,
        event_time_iso: new Date(eventTime * 1000).toISOString(),
        event_time_source: order.created_at ? "order.created_at" : "now()",
        value,
        value_source: order.total_price ? "order.total_price" : (order.current_total_price ? "order.current_total_price" : "fallback:0"),
        currency,
        contents_count: contents.length,
        num_items: contents.reduce((s: number, c: { quantity: number }) => s + (c.quantity ?? 0), 0),
      },
      user_data_mapping: fields, // raw → normalized → hashed for each PII field
      tracking_ids: {
        fbp: fbp ?? null,
        fbp_source: fbp ? (noteAttr("fbp") ? "note_attributes.fbp" : "_fbp cookie") : null,
        fbc: fbc ?? null,
        fbc_source: fbc ? (noteAttr("fbc") ? "note_attributes.fbc" : "_fbc cookie") : null,
        client_ip_address: order.client_details?.browser_ip ?? null,
        client_user_agent: order.client_details?.user_agent ?? null,
      },
      hmac: {
        secret_configured: !!Deno.env.get("SHOPIFY_WEBHOOK_SECRET"),
        verified: !!Deno.env.get("SHOPIFY_WEBHOOK_SECRET") && !isTest,
        skipped_reason: isTest ? "test mode" : (!Deno.env.get("SHOPIFY_WEBHOOK_SECRET") ? "no SHOPIFY_WEBHOOK_SECRET set" : null),
      },
      browser_pixel_dedup_hint: `On the Thank-You page, fire fbq('track','Purchase',{...},{eventID:'${eventId}'}) with the SAME event_id to deduplicate.`,
    } : undefined;

    const metaUrl = `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(accessToken)}`;
    const metaRes = await fetch(metaUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const metaJson = await metaRes.json();

    if (!metaRes.ok) {
      console.error("Meta CAPI error", metaJson);
      return new Response(JSON.stringify({ error: "Meta CAPI error", details: metaJson, sent_payload: isTest ? payload : undefined, debug }, null, 2), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Meta CAPI Purchase sent", { order_id: order.id, value, currency, test: isTest, meta: metaJson });

    return new Response(
      JSON.stringify({
        success: true,
        test_mode: isTest,
        meta: metaJson,
        sent_payload: isTest ? payload : undefined,
        debug,
      }, null, 2),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("meta-capi-purchase error", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
