"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import type { CvEventType, FormSubmitPayload } from "@shared/index";
import { FORM_SUBMIT_URL } from "@/lib/form-endpoint";
import { readUtm } from "@/lib/utm";

/* ── field model ────────────────────────────────────────────── */

interface FieldBase {
  name: string;
  label: string;
  required?: boolean;
  optionalTag?: string; // e.g. "任意"
}
export type ToggleField = FieldBase & {
  type: "toggle";
  options: { value: string; label: string }[];
  columns?: number;
};
export type InputField = FieldBase & {
  type: "text" | "tel" | "email" | "date" | "time";
  placeholder?: string;
  /**
   * For type "date"/"time": HTML min/max bound (e.g. "2026-07-10" or "07:00").
   * For type "date" specifically, `min` defaults to tomorrow's local date when
   * omitted — this blocks same-day booking automatically.
   */
  min?: string;
  max?: string;
};
export type TextareaField = FieldBase & {
  type: "textarea";
  placeholder?: string;
  rows?: number;
};
export type LPFormField = ToggleField | InputField | TextareaField;

export interface LPFormProps {
  /** Slug of the owning client — sent with every submission. */
  clientSlug: string;
  fields: LPFormField[];
  /** Accent used for focus / selected states. */
  accent?: string;
  submitLabel?: string;
  submitStyle?: CSSProperties;
  disclaimer?: ReactNode;
  errorMessage?: string;
  /** Optional custom thank-you content (defaults to a simple card). */
  thanks?: ReactNode;
}

/* ── shared network helper ──────────────────────────────────── */

async function postEvent(
  clientSlug: string,
  eventType: CvEventType,
  formData: Record<string, string>,
): Promise<{ ok: boolean; eventId: string }> {
  const eventId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  const payload: FormSubmitPayload = {
    event_id: eventId,
    client_slug: clientSlug,
    event_type: eventType,
    form_data: formData,
    utm: readUtm(),
    referrer: typeof document !== "undefined" ? document.referrer : undefined,
    occurred_at: new Date().toISOString(),
  };

  try {
    const res = await fetch(FORM_SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok, eventId };
  } catch {
    return { ok: false, eventId };
  }
}

/** Fire a Meta Pixel event de-duplicated by event_id (no-op without a pixel). */
function firePixel(event: "Lead", eventId: string) {
  const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
  if (typeof fbq === "function") fbq("track", event, {}, { eventID: eventId });
}

/**
 * Tap tracker for tel:/LINE links. Records to submissions without blocking the
 * navigation. Attach to onClick of tel: and LINE anchors.
 */
export function trackEvent(
  type: Extract<CvEventType, "tel_tap" | "line_tap">,
  clientSlug: string,
): void {
  void postEvent(clientSlug, type, {});
}

/** YYYY-MM-DD for a Date, using local time (avoids UTC off-by-one near midnight). */
function toLocalISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Tomorrow's local date — the default minimum for type "date" fields (blocks same-day booking). */
function tomorrowISODate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return toLocalISODate(d);
}

/* ── default styles (match pattern A design) ────────────────── */

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 700,
  color: "#33352E",
  letterSpacing: "0.04em",
  marginBottom: 10,
};
const inputStyle: CSSProperties = {
  width: "100%",
  height: 50,
  padding: "0 16px",
  border: "1px solid #DDD6C8",
  borderRadius: 8,
  background: "#FFFFFF",
  fontFamily: "inherit",
  fontSize: 15,
  color: "#33352E",
};

export default function LPForm({
  clientSlug,
  fields,
  accent = "#2E4269",
  submitLabel = "この内容で予約する",
  submitStyle,
  disclaimer,
  errorMessage = "必須項目を入力してください。",
  thanks,
}: LPFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const setField = (name: string, value: string) =>
    setValues((v) => ({ ...v, [name]: value }));

  const requiredTag = (f: FieldBase) =>
    f.required ? (
      <span style={{ color: "#C25B4B", fontSize: 11, marginLeft: 6 }}>必須</span>
    ) : f.optionalTag ? (
      <span style={{ color: "#9A9C90", fontSize: 11, marginLeft: 6 }}>
        {f.optionalTag}
      </span>
    ) : null;

  const handleSubmit = async () => {
    const missing = fields.some(
      (f) => f.required && !(values[f.name] ?? "").trim(),
    );
    // Defense in depth: browsers that fall back to a plain text input for
    // type="date" would otherwise let someone type today's date manually,
    // bypassing the native picker's min attribute.
    const invalidDate = fields.some((f) => {
      if (f.type !== "date") return false;
      const v = values[f.name];
      if (!v) return false;
      return v < (f.min ?? tomorrowISODate());
    });
    if (missing || invalidDate) {
      setError(true);
      return;
    }
    setError(false);
    const { ok, eventId } = await postEvent(clientSlug, "form_submit", values);
    if (ok) {
      firePixel("Lead", eventId);
      setSubmitted(true);
    } else {
      setError(true);
    }
  };

  if (submitted) {
    if (thanks) return <>{thanks}</>;
    return (
      <div
        style={{
          marginTop: 34,
          background: `${accent}22`,
          border: `1px solid ${accent}`,
          borderRadius: 16,
          padding: "40px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            margin: "0 auto",
            borderRadius: "50%",
            background: accent,
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
          }}
        >
          ✓
        </div>
        <p
          style={{
            fontFamily: "'Shippori Mincho', serif",
            fontSize: 19,
            letterSpacing: "0.06em",
            color: "#33352E",
            margin: "20px 0 0",
          }}
        >
          ご予約ありがとうございます
        </p>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.9,
            color: "#62655B",
            margin: "12px 0 0",
          }}
        >
          担当より折り返しご連絡いたします。
          <br />
          今しばらくお待ちくださいませ。
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: 34,
        display: "flex",
        flexDirection: "column",
        gap: 22,
      }}
    >
      {fields.map((f) => {
        if (f.type === "toggle") {
          return (
            <div key={f.name}>
              <label style={labelStyle}>
                {f.label}
                {requiredTag(f)}
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${f.columns ?? f.options.length}, 1fr)`,
                  gap: 10,
                }}
              >
                {f.options.map((opt) => {
                  const active = values[f.name] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setField(f.name, opt.value)}
                      style={{
                        height: 48,
                        borderRadius: 8,
                        border: `1.5px solid ${active ? accent : "#DDD6C8"}`,
                        background: active ? accent : "#FFFFFF",
                        color: active ? "#FFFFFF" : "#4C4E45",
                        fontFamily: "inherit",
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        }

        const focusStyle: CSSProperties =
          focused === f.name
            ? { borderColor: accent, outline: "none" }
            : {};

        if (f.type === "textarea") {
          return (
            <div key={f.name}>
              <label style={labelStyle}>
                {f.label}
                {requiredTag(f)}
              </label>
              <textarea
                value={values[f.name] ?? ""}
                onChange={(e) => setField(f.name, e.target.value)}
                onFocus={() => setFocused(f.name)}
                onBlur={() => setFocused(null)}
                placeholder={f.placeholder}
                rows={f.rows ?? 4}
                style={{
                  ...inputStyle,
                  height: "auto",
                  padding: "14px 16px",
                  lineHeight: 1.7,
                  resize: "vertical",
                  ...focusStyle,
                }}
              />
            </div>
          );
        }

        return (
          <div key={f.name}>
            <label style={labelStyle}>
              {f.label}
              {requiredTag(f)}
            </label>
            <input
              type={f.type}
              value={values[f.name] ?? ""}
              onChange={(e) => setField(f.name, e.target.value)}
              onFocus={() => setFocused(f.name)}
              onBlur={() => setFocused(null)}
              placeholder={f.placeholder}
              min={f.type === "date" ? f.min ?? tomorrowISODate() : f.min}
              max={f.max}
              style={{ ...inputStyle, ...focusStyle }}
            />
          </div>
        );
      })}

      {error && (
        <p
          style={{
            fontSize: 12,
            color: "#C25B4B",
            margin: "-6px 0 0",
            textAlign: "center",
          }}
        >
          {errorMessage}
        </p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        style={{
          height: 60,
          background: "linear-gradient(135deg, #E8C877 0%, #C1902F 100%)",
          color: "#FFFFFF",
          border: "none",
          borderRadius: 999,
          fontFamily: "inherit",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "0.1em",
          cursor: "pointer",
          boxShadow: "0 10px 22px rgba(160,120,40,0.4)",
          ...submitStyle,
        }}
      >
        {submitLabel}
      </button>

      {disclaimer && (
        <p
          style={{
            fontSize: 11,
            lineHeight: 1.8,
            color: "#9A9C90",
            margin: "-6px 0 0",
            textAlign: "center",
          }}
        >
          {disclaimer}
        </p>
      )}
    </div>
  );
}
