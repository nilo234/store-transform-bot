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
    if (webhookSecret) {
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

    const userData: Record<string, unknown> = {};
    if (email) userData.em = [sha256(email)];
    if (phone) userData.ph = [sha256(normalizePhone(phone))];
    if (firstName) userData.fn = [sha256(firstName)];
    if (lastName) userData.ln = [sha256(lastName)];
    if (city) userData.ct = [sha256(city)];
    if (zip) userData.zp = [sha256(zip)];
    if (country) userData.country = [sha256(country)];
    if (state) userData.st = [sha256(state)];
    // Shopify includes the customer IP & UA in the order payload
    if (order.client_details?.browser_ip) userData.client_ip_address = order.client_details.browser_ip;
    if (order.client_details?.user_agent) userData.client_user_agent = order.client_details.user_agent;

    const contents = (order.line_items ?? []).map((li: Record<string, unknown>) => ({
      id: String(li.product_id ?? li.variant_id ?? ""),
      quantity: li.quantity ?? 1,
      item_price: Number(li.price ?? 0),
    }));

    const payload = {
      data: [
        {
          event_name: "Purchase",
          event_time: eventTime,
          event_id: String(order.id ?? `${eventTime}`), // dedupe with browser pixel
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

    const url = `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(accessToken)}`;
    const metaRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const metaJson = await metaRes.json();

    if (!metaRes.ok) {
      console.error("Meta CAPI error", metaJson);
      return new Response(JSON.stringify({ error: "Meta CAPI error", details: metaJson }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Meta CAPI Purchase sent", { order_id: order.id, value, currency, meta: metaJson });

    return new Response(JSON.stringify({ success: true, meta: metaJson }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("meta-capi-purchase error", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
