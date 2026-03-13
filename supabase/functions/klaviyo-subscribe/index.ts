import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const KLAVIYO_API_KEY = Deno.env.get("KLAVIYO_API_KEY");
  console.log("KLAVIYO_API_KEY prefix:", KLAVIYO_API_KEY ? KLAVIYO_API_KEY.substring(0, 10) + "..." : "NOT SET");
  console.log("KLAVIYO_API_KEY length:", KLAVIYO_API_KEY?.length);
  if (!KLAVIYO_API_KEY) {
    return new Response(
      JSON.stringify({ error: "KLAVIYO_API_KEY is not configured" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const KLAVIYO_LIST_ID = Deno.env.get("KLAVIYO_LIST_ID");
  console.log("KLAVIYO_LIST_ID:", KLAVIYO_LIST_ID);
  if (!KLAVIYO_LIST_ID) {
    return new Response(
      JSON.stringify({ error: "KLAVIYO_LIST_ID is not configured" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const { email, source } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Valid email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 1: Create or update the profile
    const profileRes = await fetch("https://a.klaviyo.com/api/profile-import/", {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        "Content-Type": "application/json",
        revision: "2024-10-15",
      },
      body: JSON.stringify({
        data: {
          type: "profile",
          attributes: {
            email,
            properties: {
              source: source || "website-popup",
              signed_up_at: new Date().toISOString(),
            },
          },
        },
      }),
    });

    if (!profileRes.ok) {
      const errorBody = await profileRes.text();
      console.error(`Klaviyo profile creation failed [${profileRes.status}]:`, errorBody);
      return new Response(
        JSON.stringify({ error: "Failed to create profile in Klaviyo" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const profileData = await profileRes.json();
    const profileId = profileData?.data?.id;

    if (!profileId) {
      return new Response(
        JSON.stringify({ error: "Could not get profile ID from Klaviyo" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 2: Subscribe profile to the list
    const subscribeRes = await fetch(
      `https://a.klaviyo.com/api/lists/${KLAVIYO_LIST_ID}/relationships/profiles/`,
      {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
          "Content-Type": "application/json",
          revision: "2024-10-15",
        },
        body: JSON.stringify({
          data: [{ type: "profile", id: profileId }],
        }),
      }
    );

    if (!subscribeRes.ok) {
      const errorBody = await subscribeRes.text();
      console.error(`Klaviyo list subscribe failed [${subscribeRes.status}]:`, errorBody);
      return new Response(
        JSON.stringify({ error: "Failed to subscribe to list" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Subscribed successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Klaviyo subscribe error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
