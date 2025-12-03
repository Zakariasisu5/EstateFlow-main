/// <reference path="./deno-std.d.ts" />
import { serve } from "https://deno.land/std@0.208.0/http/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Property = { id: string; title?: string; city?: string; country?: string; price?: number };

type Message = { role: string; content: string };

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages = [], properties = [] } = (await req.json()) as {
      messages?: Message[];
      properties?: Property[];
    };

    // Lovable integration removed. Return a local, helpful assistant response.
    const ids = properties.map((p) => p.id).join(", ");
    const reply = ids
      ? `AI integration removed. Available property IDs: ${ids}. How can I help you explore them?`
      : "AI integration removed. No properties available. How can I help?";

    return new Response(JSON.stringify({ role: "assistant", content: reply }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: (err as Error).message ?? "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});