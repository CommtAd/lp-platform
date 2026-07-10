// form-submit Edge Function
//   1. validate payload -> INSERT into submissions
//   2. POST to CommitAd webhook (HMAC-signed). If env unset -> skip + log only.
//   3. on delivery failure -> enqueue into pending_webhooks
//   4. (form_submit のみ) Brevo経由でメール通知: 管理者宛の新規送信通知 +
//      入力者宛の確認メール（form_data.emailがある場合のみ）。
//      いずれも失敗しても本処理は継続する（best-effort、リトライなし）。
// See docs/lp-platform-spec.md §7. CommitAd's receiving side is a separate session.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const COMMITAD_WEBHOOK_URL = Deno.env.get("COMMITAD_WEBHOOK_URL") ?? "";
const COMMITAD_WEBHOOK_SECRET = Deno.env.get("COMMITAD_WEBHOOK_SECRET") ?? "";
const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY") ?? "";
const EMAIL_FROM_ADDRESS = Deno.env.get("EMAIL_FROM_ADDRESS") ?? "no-reply@mail.commitad.com";

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
  /** Full URL of the LP page the form was submitted from. */
  page_url?: string;
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
      page_url: typeof b.page_url === "string" ? b.page_url : undefined,
      occurred_at: typeof b.occurred_at === "string" ? b.occurred_at : new Date().toISOString(),
    },
  };
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Brevo (旧Sendinblue) Transactional Email API 経由でメール送信。失敗時は throw。 */
async function sendBrevoEmail(params: {
  toEmail: string;
  toName?: string;
  fromName: string;
  subject: string;
  htmlContent: string;
}): Promise<void> {
  if (!BREVO_API_KEY) {
    console.log("[form-submit] BREVO_API_KEY not configured — skipping email send");
    return;
  }
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: params.fromName, email: EMAIL_FROM_ADDRESS },
      to: [{ email: params.toEmail, name: params.toName || undefined }],
      subject: params.subject,
      htmlContent: params.htmlContent,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Brevo API responded ${res.status}: ${detail}`);
  }
}

/** "2026-06-01" + "13:00" -> "2026年06月01日 13:00" (zero-padded, no weekday — admin email style). */
function formatJaDateTimeAdmin(dateStr: string, timeStr?: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!m) return dateStr;
  const [, y, mo, d] = m;
  return timeStr ? `${y}年${mo}月${d}日 ${timeStr}` : `${y}年${mo}月${d}日`;
}

/** Fields already rendered explicitly by buildAdminNotificationHtml — anything else is appended as-is so nothing is silently dropped. */
const ADMIN_KNOWN_FORM_KEYS = new Set([
  "name",
  "email",
  "tel",
  "store",
  "date1",
  "time1",
  "date2",
  "time2",
  "note",
]);

function buildAdminNotificationHtml(params: {
  formData: Record<string, string>;
  utm: Record<string, string>;
  meta: ConfirmationMeta;
  pageUrl?: string;
}): string {
  const name = params.formData.name ?? "";
  const email = params.formData.email ?? "";
  const tel = params.formData.tel ?? "";
  const note = params.formData.note ?? "";

  const storeValue = params.formData.store;
  const storeLabel = storeValue ? params.meta.stores?.[storeValue]?.label ?? storeValue : "";

  const dt1 = params.formData.date1
    ? formatJaDateTimeAdmin(params.formData.date1, params.formData.time1)
    : "";
  const dt2 = params.formData.date2
    ? formatJaDateTimeAdmin(params.formData.date2, params.formData.time2)
    : "";

  const extras = Object.entries(params.formData).filter(
    ([k, v]) => !ADMIN_KNOWN_FORM_KEYS.has(k) && v,
  );

  const utmLine = (key: string) => `utm_${key}: ${params.utm[key] ?? ""}`;

  const lines = params.meta.adminSimple
    ? [
        `${name}様から予約申し込みを承りました。担当者はご対応をお願いいたします。`,
        "",
        "===========",
        "",
        "お問い合わせ内容",
        "",
        `お名前：${name} 様`,
        `メールアドレス：${email}`,
        `電話番号：${tel}`,
        `体験日時：${dt1}`,
        `ご質問・ご相談内容: ${note}`,
        ...(extras.length ? ["", ...extras.map(([k, v]) => `${k}: ${v}`)] : []),
        "",
        "===========",
        `このメールは ${params.pageUrl ?? ""} から送信されました`,
      ]
    : [
        `${name}様から予約申し込みを承りました。担当者はご対応をお願いいたします。`,
        "",
        "===========",
        "",
        "お問い合わせ内容",
        "",
        `お名前: ${name} 様`,
        `メールアドレス: ${email}`,
        `電話番号: ${tel}`,
        `店舗名: ${storeLabel}`,
        `体験希望日 第一希望: ${dt1}`,
        `体験希望日 第ニ希望: ${dt2}`,
        `ご質問・ご相談内容: ${note}`,
        ...(extras.length ? ["", ...extras.map(([k, v]) => `${k}: ${v}`)] : []),
        "",
        "===========",
        "アトリビューション情報",
        "",
        utmLine("source"),
        utmLine("medium"),
        utmLine("content"),
        utmLine("creative"),
        utmLine("campaign"),
        utmLine("adset"),
        utmLine("term"),
        utmLine("id"),
        `fbclid: ${params.utm.fbclid ?? ""}`,
        "",
        "===========",
        `このメールは ${params.pageUrl ?? ""} から送信されました`,
      ];

  return `<div style="font-family: sans-serif; font-size: 14px; color: #222; white-space: pre-wrap;">${escapeHtml(
    lines.join("\n"),
  )}</div>`;
}

/** Subject line for the admin notification email. */
function buildAdminNotificationSubject(formData: Record<string, string>): string {
  const name = formData.name;
  return name ? `${name}様から予約申し込みがあります` : "新規のお申し込みがあります";
}

interface ConfirmationMeta {
  menu?: string;
  duration?: string;
  stores?: Record<string, { label?: string; address?: string }>;
  /**
   * Full custom confirmation letter (takes priority over the store/menu/duration
   * rows format above). Prose paragraphs around 持ち物/道案内 are fixed in
   * buildConfirmationHtml — this only carries the parts that vary per booking.
   */
  letter?: {
    menu: string;
    storeLabel: string;
    storeAddressLines: string[];
    items: string[];
    directionsNote: string;
  };
  /** Use a pared-down admin notification (no store line, single date, no UTM block) — for single-location clients where that info is always empty noise. */
  adminSimple?: boolean;
}

/** "2026-06-01" + "12:00" -> "2026年6月1日(月) 12:00" (JST calendar date, no TZ conversion). */
function formatJaDateTime(dateStr: string, timeStr?: string): string | undefined {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!m) return undefined;
  const [, y, mo, d] = m;
  const weekday = ["日", "月", "火", "水", "木", "金", "土"][
    new Date(Number(y), Number(mo) - 1, Number(d)).getDay()
  ];
  const base = `${y}年${Number(mo)}月${Number(d)}日(${weekday})`;
  return timeStr ? `${base} ${timeStr}` : base;
}

function buildConfirmationHtml(params: {
  clientName: string;
  submitterName?: string;
  formData: Record<string, string>;
  meta: ConfirmationMeta;
}): string {
  const letter = params.meta.letter;
  const letterDt1 = params.formData.date1
    ? formatJaDateTime(params.formData.date1, params.formData.time1)
    : undefined;
  if (letter && letterDt1) {
    const name = params.submitterName ? `${params.submitterName}様` : "お客様";
    const lines = [
      name,
      "",
      "この度は、体験レッスンへのお申し込みをいただき誠にありがとうございます。",
      `${name}のご予約を確定させていただきましたのでご案内いたします。`,
      "こちらの内容で確定とさせていただきます。",
      "━━━━━━━━━━━━━━━━━━━━━",
      "■ ご予約内容",
      "━━━━━━━━━━━━━━━━━━━━━",
      `日時：${letterDt1}`,
      `メニュー： ${letter.menu}`,
      "場所：",
      letter.storeLabel,
      ...letter.storeAddressLines,
      "━━━━━━━━━━━━━━━━━━━━━",
      "■ 当日のお持ち物",
      "━━━━━━━━━━━━━━━━━━━━━",
      ...letter.items,
      "",
      "※道に迷われた際のお願い※",
      letter.directionsNote,
      "",
      `当日は、${name}の体調やお悩みに合わせて心地よく身体を動かせるよう、心を込めてサポートさせていただきます。`,
      "ピラティスが初めての場合でも、どうぞリラックスしてお越しくださいませ。",
      "",
      "もし事前にご不明な点や、お身体について相談したいことなどがございましたら、お気軽にお問い合わせください。",
      "",
      "万が一、日時の変更やキャンセルが発生する場合は、お早めにご連絡いただけますようお願いいたします。",
      `それでは、${letterDt1}に${name}にお会いできることを、スタッフ一同楽しみにお待ちしております。`,
      "どうぞよろしくお願いいたします。",
    ];
    return `<div style="font-family: sans-serif; font-size: 14px; color: #222; white-space: pre-wrap;">${escapeHtml(
      lines.join("\n"),
    )}</div>`;
  }

  const greeting = params.submitterName ? `${escapeHtml(params.submitterName)} 様` : "この度は";

  const storeValue = params.formData.store;
  const storeInfo = storeValue ? params.meta.stores?.[storeValue] : undefined;
  const storeLabel = storeInfo?.label
    ? `${params.clientName} ${storeInfo.label}`
    : undefined;

  const date1 = params.formData.date1;
  const dt1 = date1 ? formatJaDateTime(date1, params.formData.time1) : undefined;
  const date2 = params.formData.date2;
  const dt2 = date2 ? formatJaDateTime(date2, params.formData.time2) : undefined;

  // メニュー/所要時間/店舗名が揃っている場合のみ詳細フォーマットを使う。
  // 揃わない（未設定クライアント・想定外のフォーム構成）場合は簡易文言にフォールバック。
  if (storeLabel && dt1 && params.meta.duration && params.meta.menu) {
    const rows: [string, string][] = [["店舗", storeLabel], ["第1希望日時", dt1]];
    if (dt2) rows.push(["第2希望日時", dt2]);
    rows.push(["所要時間", params.meta.duration], ["メニュー", `・${params.meta.menu}`]);

    const rowsHtml = rows
      .map(
        ([label, value]) =>
          `<p style="margin:16px 0 0;color:#666;font-size:12px;">${escapeHtml(label)}</p>` +
          `<p style="margin:2px 0 0;font-size:14px;">${escapeHtml(value)}</p>`,
      )
      .join("");

    const addressHtml = storeInfo?.address
      ? `<p style="margin:20px 0 0;">${escapeHtml(storeLabel)}<br>${escapeHtml(storeInfo.address)}</p>`
      : "";

    return `
      <div style="font-family: sans-serif; font-size: 14px; color: #222;">
        <p>ご予約ありがとうございます</p>
        <p style="margin-top:16px;">${greeting} 以下の内容で予約申込みを承りました。24時間以内に担当者より予約確定についてご連絡いたします。</p>
        ${rowsHtml}
        ${addressHtml}
      </div>
    `;
  }

  return `
    <div style="font-family: sans-serif; font-size: 14px; color: #222;">
      <p>${greeting}</p>
      <p>${escapeHtml(params.clientName)} へのお申し込み・お問い合わせを受け付けました。<br>
      担当より追ってご連絡いたしますので、今しばらくお待ちください。</p>
      <p style="color:#999; font-size:12px; margin-top:24px;">
        ※このメールは送信専用です。返信いただいてもご対応できません。
      </p>
    </div>
  `;
}

/** Subject line for the customer confirmation email — rich format when store/date info is available. */
function buildConfirmationSubject(params: {
  clientName: string;
  formData: Record<string, string>;
  meta: ConfirmationMeta;
}): string {
  const dt1 = params.formData.date1
    ? formatJaDateTime(params.formData.date1, params.formData.time1)
    : undefined;
  if (params.meta.letter && dt1) return `【ご予約完了】${params.meta.letter.storeLabel} ${dt1}`;

  const storeValue = params.formData.store;
  const storeInfo = storeValue ? params.meta.stores?.[storeValue] : undefined;
  const storeLabel = storeInfo?.label ? `${params.clientName}${storeInfo.label}` : undefined;
  if (storeLabel && dt1) return `【ご予約完了】${storeLabel} ${dt1}`;
  return `【${params.clientName}】お申し込みを受け付けました`;
}

/** 管理者宛通知 + 入力者宛確認メールを送信する（form_submit イベントのみ呼ばれる想定）。 */
async function sendNotificationEmails(
  client: { name: string; notify_emails: string[]; confirmation_meta: ConfirmationMeta },
  payload: Payload,
): Promise<void> {
  const tasks: Promise<void>[] = [];
  const clientName = client.name || payload.client_slug;

  // 通知先が複数ある場合、宛先同士がお互いのアドレスを見えないよう
  // 1通のメールにまとめず、宛先ごとに個別送信する。
  for (const notifyEmail of client.notify_emails ?? []) {
    tasks.push(
      sendBrevoEmail({
        toEmail: notifyEmail,
        fromName: `${clientName} LP通知`,
        subject: buildAdminNotificationSubject(payload.form_data),
        htmlContent: buildAdminNotificationHtml({
          formData: payload.form_data,
          utm: payload.utm,
          meta: client.confirmation_meta ?? {},
          pageUrl: payload.page_url,
        }),
      }).catch((e) => console.error(`[form-submit] admin notify email failed (${notifyEmail}): ${e}`)),
    );
  }

  const submitterEmail =
    typeof payload.form_data.email === "string" ? payload.form_data.email.trim() : "";
  if (submitterEmail) {
    const submitterName =
      typeof payload.form_data.name === "string" ? payload.form_data.name : undefined;
    tasks.push(
      sendBrevoEmail({
        toEmail: submitterEmail,
        toName: submitterName,
        fromName: clientName,
        subject: buildConfirmationSubject({
          clientName,
          formData: payload.form_data,
          meta: client.confirmation_meta ?? {},
        }),
        htmlContent: buildConfirmationHtml({
          clientName,
          submitterName,
          formData: payload.form_data,
          meta: client.confirmation_meta ?? {},
        }),
      }).catch((e) => console.error(`[form-submit] confirmation email failed: ${e}`)),
    );
  }

  if (tasks.length > 0) await Promise.all(tasks);
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
    .select("id, name, commitad_client_id, notify_emails, confirmation_meta")
    .eq("slug", payload.client_slug)
    .maybeSingle();

  if (clientErr) return json({ error: "client lookup failed" }, 500);
  if (!client) return json({ error: "unknown client_slug" }, 404);

  // Insert the submission. event_id is the idempotency key (PK), so a retried
  // POST with the same id is ignored rather than double-counted.
  // .select("id") lets us tell a genuine insert apart from an ignored duplicate
  // (ignored rows are omitted from the returned representation) — used below to
  // avoid re-sending notification emails on a retried request.
  const { data: insertedRows, error: insertErr } = await supabase
    .from("submissions")
    .upsert(
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
    )
    .select("id");

  if (insertErr) return json({ error: "insert failed", detail: insertErr.message }, 500);
  const isNewSubmission = (insertedRows?.length ?? 0) > 0;

  // メール通知（form_submitのみ、かつ今回はじめて記録された送信のみ）。
  // 失敗しても本処理（Webhook配送・レスポンス）は継続する。
  if (isNewSubmission && payload.event_type === "form_submit") {
    try {
      await sendNotificationEmails(client, payload);
    } catch (e) {
      console.error(`[form-submit] notification emails threw: ${e}`);
    }
  }

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
