import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signed, stateless form tokens — spam protection that works on serverless
 * (no shared memory needed) and costs nothing.
 *
 * The enquiry page fetches a token when it opens; the API only accepts
 * submissions carrying a valid token that is at least MIN_AGE_MS old.
 * Scripts that POST straight to /api/enquire have no token, and nobody fills
 * the form in under three seconds.
 */
export const MIN_AGE_MS = 3_000;
export const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function secret(): string | null {
  const raw = process.env.ENQUIRE_TOKEN_SECRET || process.env.RESEND_API_KEY;
  return raw ? `marit-form-token:${raw}` : null;
}

function sign(ts: string, key: string) {
  return createHmac("sha256", key).update(ts).digest("base64url");
}

/** Null when no secret is configured (local dev) — verification is then skipped. */
export function issueFormToken(now = Date.now()): string | null {
  const key = secret();
  if (!key) return null;
  const ts = String(now);
  return `${ts}.${sign(ts, key)}`;
}

export type TokenCheck =
  | { status: "disabled" }
  | { status: "ok" }
  | { status: "missing" | "invalid" | "too_fast" | "expired" };

export function checkFormToken(token: string | null | undefined, now = Date.now()): TokenCheck {
  const key = secret();
  if (!key) return { status: "disabled" };
  if (!token) return { status: "missing" };

  const [ts, sig] = token.split(".");
  if (!ts || !sig || !/^\d{13}$/.test(ts)) return { status: "invalid" };

  const expected = Buffer.from(sign(ts, key));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
    return { status: "invalid" };
  }

  const age = now - Number(ts);
  if (age < MIN_AGE_MS) return { status: "too_fast" };
  if (age > MAX_AGE_MS) return { status: "expired" };
  return { status: "ok" };
}
