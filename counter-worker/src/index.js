import { DurableObject } from "cloudflare:workers";

const ALLOWED_ORIGINS = new Set([
  "http://xn--erdetsnartlrdag-gub.dk",
  "https://xn--erdetsnartlrdag-gub.dk",
  "http://www.xn--erdetsnartlrdag-gub.dk",
  "https://www.xn--erdetsnartlrdag-gub.dk",
  "https://lobner.github.io",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
  "http://localhost:8787",
  "http://127.0.0.1:8787",
]);

const SEED = 78786;

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : "https://xn--erdetsnartlrdag-gub.dk";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

export class CounterObject extends DurableObject {
  async #getOrInitCount() {
    let count = await this.ctx.storage.get("count");
    if (typeof count === "number") {
      return count;
    }

    const raw = this.env.COUNTER ? await this.env.COUNTER.get("count") : null;
    const parsed = parseInt(raw ?? "", 10);
    count = Number.isFinite(parsed) ? parsed : SEED;
    await this.ctx.storage.put("count", count);
    return count;
  }

  async getCount() {
    return this.#getOrInitCount();
  }

  async increment() {
    const next = (await this.#getOrInitCount()) + 1;
    await this.ctx.storage.put("count", next);
    return next;
  }
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") ?? "";
    const headers = { ...corsHeaders(origin), "Content-Type": "application/json" };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== "GET" && request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers });
    }

    const id = env.COUNTER_DO.idFromName("global");
    const stub = env.COUNTER_DO.get(id);
    const count = request.method === "POST"
      ? await stub.increment()
      : await stub.getCount();

    return new Response(JSON.stringify({ count }), { headers });
  },
};
