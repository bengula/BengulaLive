/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Client for the likes API (Cloudflare Worker + KV, see /worker/index.ts).
 *
 * Counts are global and shared across all visitors. To stop a single device
 * from inflating the count, we remember which articles this browser has liked
 * in localStorage and expose a toggle (like / unlike).
 *
 * Every network call fails soft: if the API isn't reachable (e.g. running the
 * plain `vite dev` server, which doesn't run the Worker), the UI still works
 * optimistically and simply doesn't persist.
 */

const LIKED_KEY = 'bengula-liked';

export function getLikedIds(): Set<string> {
  try {
    const raw = localStorage.getItem(LIKED_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function saveLikedIds(ids: Set<string>): void {
  try {
    localStorage.setItem(LIKED_KEY, JSON.stringify([...ids]));
  } catch {
    /* storage unavailable; ignore */
  }
}

/** Fetch current counts for a batch of article ids. Returns {} on any failure. */
export async function fetchCounts(ids: string[]): Promise<Record<string, number>> {
  if (!ids.length) return {};
  try {
    const res = await fetch(`/api/likes?ids=${encodeURIComponent(ids.join(','))}`);
    if (!res.ok) return {};
    const data = (await res.json()) as { counts?: Record<string, number> };
    return data.counts ?? {};
  } catch {
    return {};
  }
}

/**
 * Toggle this device's like for an article. Updates localStorage immediately and
 * tells the server. Returns the authoritative new count (or null if the request
 * failed) and whether the article is now liked.
 */
export async function toggleLike(id: string): Promise<{ count: number | null; liked: boolean }> {
  const liked = getLikedIds();
  const wasLiked = liked.has(id);
  const op = wasLiked ? 'unlike' : 'like';

  if (wasLiked) liked.delete(id);
  else liked.add(id);
  saveLikedIds(liked);

  try {
    const res = await fetch('/api/likes', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id, op }),
    });
    if (!res.ok) throw new Error(`likes API ${res.status}`);
    const data = (await res.json()) as { count: number };
    return { count: data.count, liked: !wasLiked };
  } catch {
    return { count: null, liked: !wasLiked };
  }
}
