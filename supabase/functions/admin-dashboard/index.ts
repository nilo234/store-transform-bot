import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { create, getNumericDate } from "https://deno.land/x/djwt@v3.0.2/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-password",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

// ---------- Shopify ----------
const SHOPIFY_DOMAIN = "lovable-project-99js2.myshopify.com";
const SHOPIFY_API_VERSION = "2025-07";

async function shopifyAdmin(query: string, variables: Record<string, unknown> = {}) {
  const token = Deno.env.get("SHOPIFY_ACCESS_TOKEN");
  if (!token) throw new Error("SHOPIFY_ACCESS_TOKEN missing");
  const r = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await r.json();
  if (data.errors) throw new Error(JSON.stringify(data.errors));
  return data.data;
}

async function getShopifyOverview() {
  // Last 30 days orders
  const since = new Date(Date.now() - 30 * 86400_000).toISOString();
  const q = `
    query($since: String!) {
      orders(first: 250, query: $since, sortKey: CREATED_AT, reverse: true) {
        edges {
          node {
            id
            name
            createdAt
            displayFinancialStatus
            displayFulfillmentStatus
            currentTotalPriceSet { shopMoney { amount currencyCode } }
            customer { id email firstName lastName }
            lineItems(first: 10) { edges { node { title quantity } } }
          }
        }
      }
    }
  `;
  const data = await shopifyAdmin(q, { since: `created_at:>=${since}` });
  const orders = (data.orders?.edges || []).map((e: any) => e.node);
  const revenue = orders.reduce(
    (s: number, o: any) => s + Number(o.currentTotalPriceSet?.shopMoney?.amount || 0),
    0,
  );
  return {
    orderCount: orders.length,
    revenue,
    aov: orders.length ? revenue / orders.length : 0,
    orders,
  };
}

async function getShopifyCustomers() {
  const q = `
    query {
      customers(first: 250, sortKey: UPDATED_AT, reverse: true) {
        edges {
          node {
            id
            email
            firstName
            lastName
            numberOfOrders
            amountSpent { amount currencyCode }
            createdAt
            updatedAt
            tags
          }
        }
      }
    }
  `;
  const data = await shopifyAdmin(q);
  return (data.customers?.edges || []).map((e: any) => e.node);
}

// ---------- Klaviyo ----------
async function getKlaviyoStats() {
  const key = Deno.env.get("KLAVIYO_API_KEY");
  const listId = Deno.env.get("KLAVIYO_LIST_ID");
  if (!key || !listId) return { error: "Klaviyo not configured" };
  const r = await fetch(`https://a.klaviyo.com/api/lists/${listId}/profiles/?page[size]=1`, {
    headers: {
      Authorization: `Klaviyo-API-Key ${key}`,
      revision: "2024-10-15",
      Accept: "application/json",
    },
  });
  if (!r.ok) return { error: `Klaviyo ${r.status}` };
  const data = await r.json();
  return {
    listId,
    totalSubscribers: data?.meta?.total ?? data?.data?.length ?? 0,
  };
}

// ---------- GA4 ----------
async function getGoogleAccessToken() {
  const raw = Deno.env.get("GA4_SERVICE_ACCOUNT_JSON");
  if (!raw) throw new Error("GA4_SERVICE_ACCOUNT_JSON missing");
  let sa: any;
  try {
    sa = JSON.parse(raw);
  } catch {
    throw new Error("GA4_SERVICE_ACCOUNT_JSON is not valid JSON. Paste the FULL contents of the service-account .json file (including the outer { } braces).");
  }
  if (!sa.client_email || !sa.private_key) {
    throw new Error("GA4_SERVICE_ACCOUNT_JSON missing client_email or private_key fields.");
  }
  const now = getNumericDate(0);
  const payload = {
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: getNumericDate(3600),
  };
  // Import private key
  const pem = sa.private_key.replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "").replace(/\s/g, "");
  const der = Uint8Array.from(atob(pem), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey(
    "pkcs8",
    der,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const jwt = await create({ alg: "RS256", typ: "JWT" }, payload, key);
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) throw new Error("GA4 auth failed: " + JSON.stringify(tokenData));
  return tokenData.access_token;
}

async function getGa4Report() {
  const propertyId = Deno.env.get("GA4_PROPERTY_ID");
  if (!propertyId) return { error: "GA4_PROPERTY_ID missing" };
  try {
    const token = await getGoogleAccessToken();
    const r = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
          metrics: [
            { name: "activeUsers" },
            { name: "sessions" },
            { name: "screenPageViews" },
            { name: "conversions" },
            { name: "engagementRate" },
          ],
          dimensions: [{ name: "date" }],
        }),
      },
    );
    const data = await r.json();
    if (!r.ok) return { error: data?.error?.message || "GA4 query failed" };
    const rows = (data.rows || []).map((row: any) => ({
      date: row.dimensionValues[0].value,
      activeUsers: Number(row.metricValues[0].value),
      sessions: Number(row.metricValues[1].value),
      pageViews: Number(row.metricValues[2].value),
      conversions: Number(row.metricValues[3].value),
      engagementRate: Number(row.metricValues[4].value),
    }));
    const totals = rows.reduce(
      (acc: any, r: any) => ({
        activeUsers: acc.activeUsers + r.activeUsers,
        sessions: acc.sessions + r.sessions,
        pageViews: acc.pageViews + r.pageViews,
        conversions: acc.conversions + r.conversions,
      }),
      { activeUsers: 0, sessions: 0, pageViews: 0, conversions: 0 },
    );
    return { rows, totals };
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }
}

// ---------- Handler ----------
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const password = req.headers.get("x-admin-password");
  const expected = Deno.env.get("ADMIN_DASHBOARD_PASSWORD");
  if (!expected || password !== expected) return json({ error: "Unauthorized" }, 401);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const url = new URL(req.url);
  const action = url.searchParams.get("action") || "overview";

  try {
    if (action === "overview") {
      const [shopify, klaviyo, ga4, feedback] = await Promise.all([
        getShopifyOverview().catch((e) => ({ error: String(e) })),
        getKlaviyoStats().catch((e) => ({ error: String(e) })),
        getGa4Report().catch((e) => ({ error: String(e) })),
        supabase
          .from("cart_removal_feedback")
          .select("*", { count: "exact", head: true })
          .then((r) => ({ count: r.count })),
      ]);
      return json({ shopify, klaviyo, ga4, feedbackCount: (feedback as any).count || 0 });
    }

    if (action === "customers") {
      const customers = await getShopifyCustomers();
      return json({ customers });
    }

    if (action === "feedback") {
      const { data, error } = await supabase
        .from("cart_removal_feedback")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) return json({ error: error.message }, 500);
      return json({ data });
    }

    if (action === "notes-list") {
      const scope = url.searchParams.get("scope");
      let q = supabase.from("admin_notes").select("*").order("created_at", { ascending: false });
      if (scope) q = q.eq("scope", scope);
      const { data, error } = await q.limit(500);
      if (error) return json({ error: error.message }, 500);
      return json({ data });
    }

    if (action === "notes-create" && req.method === "POST") {
      const body = await req.json();
      const { scope, scope_id, note, author } = body || {};
      if (!scope || !note) return json({ error: "scope and note required" }, 400);
      const { data, error } = await supabase
        .from("admin_notes")
        .insert({ scope, scope_id: scope_id || null, note, author: author || null })
        .select()
        .single();
      if (error) return json({ error: error.message }, 500);
      return json({ data });
    }

    if (action === "notes-delete" && req.method === "POST") {
      const { id } = await req.json();
      if (!id) return json({ error: "id required" }, 400);
      const { error } = await supabase.from("admin_notes").delete().eq("id", id);
      if (error) return json({ error: error.message }, 500);
      return json({ ok: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : String(e) }, 500);
  }
});
