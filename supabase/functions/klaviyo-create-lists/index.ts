import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const KLAVIYO_API_KEY = Deno.env.get("KLAVIYO_API_KEY");
  if (!KLAVIYO_API_KEY) {
    return new Response(
      JSON.stringify({ error: "KLAVIYO_API_KEY is not configured" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const listNames = ["Newsletter", "Popup-Registration"];
    const results: Record<string, string> = {};

    for (const name of listNames) {
      const res = await fetch("https://a.klaviyo.com/api/lists/", {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
          "Content-Type": "application/json",
          revision: "2024-10-15",
        },
        body: JSON.stringify({
          data: {
            type: "list",
            attributes: { name },
          },
        }),
      });

      const data = await res.json();
      if (res.ok) {
        results[name] = data?.data?.id || "created";
        console.log(`Created list "${name}" with ID: ${data?.data?.id}`);
      } else {
        console.error(`Failed to create list "${name}":`, JSON.stringify(data));
        results[name] = `error: ${JSON.stringify(data?.errors?.[0]?.detail || data)}`;
      }
    }

    return new Response(
      JSON.stringify({ success: true, lists: results }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating lists:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
