/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Cloudflare Worker for bengula.co.ke.
 *
 * It does two jobs:
 *   1. Serves a tiny "likes" API backed by Workers KV:
 *        GET  /api/likes?id=<article-id>        -> { id, count }
 *        GET  /api/likes?ids=<id1,id2,...>      -> { counts: { id: n } }
 *        POST /api/likes  { id, op:"like"|"unlike" } -> { id, count }
 *   2. Falls through to the static SPA for everything else (the ASSETS
 *      binding applies the single-page-application not_found_handling).
 *
 * Note: KV is eventually consistent and the increment is a read-modify-write,
 * so under heavy concurrent traffic a like could occasionally be lost. That is
 * fine for a low-traffic blog. If counts ever need to be exact, move the
 * counter to a Durable Object.
 */

// Minimal local typings so this compiles under the app's tsconfig without
// pulling in @cloudflare/workers-types. At runtime these are the real bindings.
interface KVNamespaceLike {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}
interface AssetsLike {
  fetch(request: Request): Promise<Response>;
}
interface Env {
  LIKES: KVNamespaceLike;
  ASSETS: AssetsLike;
}

// Article ids are lowercase slugs (see content/<section>/<id>.md).
const ID_RE = /^[a-z0-9-]{1,80}$/;
const KEY = (id: string) => `likes:${id}`;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

async function readCount(env: Env, id: string): Promise<number> {
  const raw = await env.LIKES.get(KEY(id));
  const n = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/likes') {
      if (request.method === 'GET') {
        const idsParam = url.searchParams.get('ids');
        if (idsParam) {
          const ids = idsParam
            .split(',')
            .map((s) => s.trim())
            .filter((s) => ID_RE.test(s))
            .slice(0, 100);
          const counts: Record<string, number> = {};
          await Promise.all(
            ids.map(async (id) => {
              counts[id] = await readCount(env, id);
            })
          );
          return json({ counts });
        }

        const id = (url.searchParams.get('id') ?? '').trim();
        if (!ID_RE.test(id)) return json({ error: 'invalid id' }, 400);
        return json({ id, count: await readCount(env, id) });
      }

      if (request.method === 'POST') {
        let body: { id?: string; op?: string };
        try {
          body = await request.json();
        } catch {
          return json({ error: 'invalid body' }, 400);
        }
        const id = (body.id ?? '').trim();
        if (!ID_RE.test(id)) return json({ error: 'invalid id' }, 400);
        const op = body.op === 'unlike' ? 'unlike' : 'like';

        const current = await readCount(env, id);
        const next = Math.max(0, current + (op === 'like' ? 1 : -1));
        await env.LIKES.put(KEY(id), String(next));
        return json({ id, count: next });
      }

      return json({ error: 'method not allowed' }, 405);
    }

    // Not an API route: serve the static site (SPA fallback included).
    return env.ASSETS.fetch(request);
  },
};
