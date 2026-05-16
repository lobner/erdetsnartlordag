const ALLOWED_ORIGINS = new Set([
  "http://xn--erdetsnartlrdag-gub.dk",
  "https://xn--erdetsnartlrdag-gub.dk",
  "https://lobner.github.io",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
]);

const SEED = 78786;

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : "https://lobner.github.io";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

async function readCount(env) {
  const raw = await env.COUNTER.get("count");
  const parsed = parseInt(raw ?? "", 10);
  return Number.isFinite(parsed) ? parsed : SEED;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") ?? "";
    const headers = { ...corsHeaders(origin), "Content-Type": "application/json" };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (request.method === "POST") {
      const next = (await readCount(env)) + 1;
      await env.COUNTER.put("count", next.toString());
      return new Response(JSON.stringify({ count: next }), { headers });
    }

    if (request.method === "GET") {
      const count = await readCount(env);
      return new Response(JSON.stringify({ count }), { headers });
    }

    return new Response("Method Not Allowed", { status: 405, headers });
  },
};
