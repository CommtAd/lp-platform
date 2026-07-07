// form-submit Edge Function
//   1. validate payload -> INSERT into submissions
//   2. POST to CommitAd webhook (HMAC-signed). If env unset -> skip + log only.
//   3. on delivery failure -> enqueue into pending_webhooks
// See docs/lp-platform-spec.md §7. CommitAd's receiving side is a separate session.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const COMMITAD_WEBHOOK_URL = Deno.env.get("COMMITAD_WEBHOOK_URL") ?? "";
const COMMITAD_WEBHOOK_SECRET = Deno.env.get("COMMITAD_WEBHOOK_SECRET") ?? "";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const EVENT_TYPES = ["form_submit", "tel_tap", "line_tap"] as const;
type EventType = (typeof EVENT_TYPES)[number];

interface Payload {
  event_id: string;
  client_slug: string;
  event_type: EventType;
  form_data: Record<string, string>;
  utm: Record<string, string>;
  referrer?: string;
  occurred_at: string;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...CORS },
  });
}

/** Hex HMAC-SHA256 of `body` keyed by the shared secret. */
async function sign(body: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function validate(p: unknown): { ok: true; value: Payload } | { ok: false; error: string } {
  if (typeof p !== "object" || p === null) return { ok: false, error: "body must be an object" };
  const b = p as Record<string, unknown>;
  if (typeof b.event_id !== "string" || !b.event_id) return { ok: false, error: "event_id required" };
  if (typeof b.client_slug !== "string" || !b.client_slug) return { ok: false, error: "client_slug required" };
  if (!EVENT_TYPES.includes(b.event_type as EventType)) return { ok: false, error: "invalid event_type" };
  if (typeof b.form_data !== "object" || b.form_data === null) return { ok: false, error: "form_data required" };
  return {
    ok: true,
    value: {
      event_id: b.event_id,
      client_slug: b.client_slug,
      event_type: b.event_type as EventType,
      form_data: b.form_data as Record<string, string>,
      utm: (b.utm as Record<string, string>) ?? {},
      referrer: typeof b.referrer === "string" ? b.referrer : undefined,
      occurred_at: typeof b.occurred_at === "string" ? b.occurred_at : new Date().toISOString(),
    },
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "method not allowed" }, 405);

  let parsed: unknown;
  try {
    parsed = await req.json();
  } catch {
    return json({ error: "invalid JSON" }, 400);
  }

  const result = validate(parsed);
  if (!result.ok) return json({ error: result.error }, 400);
  const payload = result.value;

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  // Resolve the client by slug.
  const { data: client, error: clientErr } = await supabase
    .from("clients")
    .select("id, commitad_client_id")
    .eq("slug", payload.client_slug)
    .maybeSingle();

  if (clientErr) return json({ error: "client lookup failed" }, 500);
  if (!client) return json({ error: "unknown client_slug" }, 404);

  // Insert the submission. event_id is the idempotency key (PK), so a retried
  // POST with the same id is ignored rather than double-counted.
  const { error: insertErr } = await supabase.from("submissions").upsert(
    {
      id: payload.event_id,
      client_id: client.id,
      event_type: payload.event_type,
      form_data: payload.form_data,
      utm: payload.utm,
      user_agent: req.headers.get("user-agent"),
      referrer: payload.referrer ?? null,
      occurred_at: payload.occurred_at,
    },
    { onConflict: "id", ignoreDuplicates: true },
  );

  if (insertErr) return json({ error: "insert failed", detail: insertErr.message }, 500);

  // Build the CommitAd webhook payload (spec §7).
  const webhookPayload = {
    submission_id: payload.event_id,
    commitad_client_id: client.commitad_client_id,
    lp_slug: payload.client_slug,
    event_type: payload.event_type,
    form_data: payload.form_data,
    utm: payload.utm,
    occurred_at: payload.occurred_at,
  };

  // If the webhook is not configured, skip delivery and only log.
  if (!COMMITAD_WEBHOOK_URL || !COMMITAD_WEBHOOK_SECRET) {
    console.log(
      `[form-submit] webhook not configured — skipped delivery for submission ${payload.event_id}`,
    );
    return json({ ok: true, submission_id: payload.event_id, webhook: "skipped" });
  }

  // Attempt delivery; on any failure enqueue for cron-driven retry.
  const body = JSON.stringify(webhookPayload);
  let delivered = false;
  try {
    const signature = await sign(body, COMMITAD_WEBHOOK_SECRET);
    const res = await fetch(COMMITAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json", "X-Signature": signature },
      body,
    });
    delivered = res.ok;
    if (!res.ok) console.error(`[form-submit] webhook responded ${res.status}`);
  } catch (e) {
    console.error(`[form-submit] webhook delivery threw: ${e}`);
  }

  if (!delivered) {
    await supabase.from("pending_webhooks").insert({
      submission_id: payload.event_id,
      payload: webhookPayload,
      attempts: 1,
      next_retry_at: new Date(Date.now() + 60_000).toISOString(),
      status: "pending",
    });
    return json({ ok: true, submission_id: payload.event_id, webhook: "queued" });
  }

  return json({ ok: true, submission_id: payload.event_id, webhook: "delivered" });
});
