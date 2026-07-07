import { NextResponse } from "next/server";

/**
 * Local dev fallback for the form-submit Edge Function.
 * Used only when NEXT_PUBLIC_SUPABASE_URL is unset (see lib/form-endpoint.ts).
 * Logs the payload and reports the webhook as skipped, mirroring the Edge
 * Function's "not configured" branch so the submit flow can be exercised
 * without a Supabase project.
 */
export async function POST(req: Request) {
  const payload = await req.json().catch(() => null);
  if (!payload?.event_id || !payload?.client_slug) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }
  console.log("[form-submit-local] received submission (no Supabase configured):", {
    event_id: payload.event_id,
    client_slug: payload.client_slug,
    event_type: payload.event_type,
    form_data: payload.form_data,
    utm: payload.utm,
  });
  console.log("[form-submit-local] webhook not configured — skipped delivery");
  return NextResponse.json({ ok: true, submission_id: payload.event_id, webhook: "skipped" });
}
