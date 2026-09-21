/**
 * Optional Supabase persistence for quote requests and newsletter sign-ups.
 *
 * Deliberately dependency-free: it talks to Supabase's REST endpoint with
 * fetch, so the site builds and runs even when Supabase is not configured.
 * Set these in .env.local (see .env.example):
 *
 *   SUPABASE_URL=https://<project>.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=<service-role-key>   # server-only
 *
 * Tables expected (SQL in README.md):
 *   quote_requests(id, name, organisation, email, phone, services, quantity,
 *                  deadline, details, created_at)
 *   newsletter_subscribers(id, email, created_at)
 */

export type LeadKind = "quote_requests" | "newsletter_subscribers";

export type SaveLeadResult = {
  persisted: boolean;
  error?: string;
};

export async function saveLead(
  kind: LeadKind,
  payload: Record<string, unknown>
): Promise<SaveLeadResult> {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    // TODO: wire up Supabase (or another provider) before launch. Until then the
    // submission is logged and the front end still confirms receipt, so the
    // WhatsApp/phone routes remain the reliable path.
    console.info(`[promolink] ${kind} (not persisted — Supabase not configured):`, payload);
    return { persisted: false };
  }

  try {
    const response = await fetch(`${url}/rest/v1/${kind}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error(`[promolink] Supabase rejected ${kind}:`, response.status, detail);
      return { persisted: false, error: `supabase_${response.status}` };
    }

    return { persisted: true };
  } catch (error) {
    console.error(`[promolink] Supabase request for ${kind} failed:`, error);
    return { persisted: false, error: "network" };
  }
}

export function isEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function asText(value: unknown, max = 2000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}