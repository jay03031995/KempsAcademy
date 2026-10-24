// Minimal in-memory rate limiter. Fine for a single Node process during
// development; a production deployment behind multiple instances needs a
// shared store (e.g. Redis/Upstash) instead. See SANITY_SETUP.md.

const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > MAX_REQUESTS;
}
