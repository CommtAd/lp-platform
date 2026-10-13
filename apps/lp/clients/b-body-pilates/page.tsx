import type { CSSProperties, ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPCanvas from "@/components/LPCanvas";
import LPForm from "@/components/LPForm";
import StickyFooterCTA from "@/components/StickyFooterCTA";
import ImageSlot from "@/components/ImageSlot";
import FaqList from "./FaqList";
import config from "./config";

/**
 * base BODY — Meta広告用LP。指示書の構成に沿ったブロック構成。
 *
 *   ヘッダー → FV → 悩み → 原因（なぜ身体を知るのか）→ 目指せる未来 → 選ばれる理由
 *   → FMS → 知る・整える・動かす → 体験レッスン → 初めてでも安心
 *   → キャンペーン → 店舗 → FAQ → 最終CTA → 予約フォーム
 *
 * 「お客様の声」「代表について」は顧客指示（2026-10-03）により削除。
 *
 * 守っているルール:
 *   1. 幅390pxの1枚のキャンバス（`<LPCanvas>`）。`vw` / `vh` は使わない
 *      （CLAUDE.md §16-17）。キャンバス外の地色を敷く `100vh` だけが例外。
 *   2. 文字サイズの強弱は `seren-pilates` に合わせる（見出し22〜24／本文13〜14.5／
 *      注記11／CTA 15.5・高さ58）。価格の「1,000」「0」だけを特大にする。
 *   3. テラコッタ（priceColor）は価格の数字専用。見出しやボタンに使わない。
 *   4. CTAは7箇所（FV・原因・選ばれる理由・FMS・体験・キャンペーン・最終）。
 *      すべてページ下部の予約フォーム（#reserve）へのアンカー。
 */

/** hex を白（amt>0）／黒（amt<0）へ寄せる。 */
function shade(hex: string, amt: number): string {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((ch) => ch + ch).join("");
  let r = parseInt(h.slice(0, 2), 16),
    g = parseInt(h.slice(2, 4), 16),
    b = parseInt(h.slice(4, 6), 16);
  const mix = amt < 0 ? 0 : 255,
    t = Math.abs(amt);
  r = Math.round(r + (mix - r) * t);
  g = Math.round(g + (mix - g) * t);
  b = Math.round(b + (mix - b) * t);
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

/** "\n" を <br> にする。改行位置は config 側で指定する。 */
function nl(text: string): ReactNode {
  const parts = text.split("\n");
  return parts.map((p, i) => (
    <span key={i}>
      {p}
      {i < parts.length - 1 && <br />}
    </span>
  ));
}

/** `[[…]]` で囲んだ語だけを強調する（数字を立てるため）。改行も解釈する。 */
function rich(text: string, em: CSSProperties): ReactNode {
  return text.split("\n").map((line, i, arr) => (
    <span key={i}>
      {line.split(/(\[\[.+?\]\])/).map((seg, j) =>
        seg.startsWith("[[") ? (
          <span key={j} style={em}>
            {seg.slice(2, -2)}
          </span>
        ) : (
          <span key={j}>{seg}</span>
        ),
      )}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

const c = config;

/* ── 配色 ─────────────────────────────────────────────── */
const accent = "#2F5560"; // 深いスレートティール。白地 8:1
const accentMid = "#5F8A8C"; // アイコン・番号の中間トーン
const priceColor = "#B0563E"; // 価格の数字専用。白地 4.9:1
const base = "#FBFAF7";
const greige = "#F4F0E8";
const mist = "#EAF1F0";
const accentGrad = `linear-gradient(150deg, ${shade(accent, 0.12)} 0%, ${accent} 50%, ${shade(accent, -0.22)} 100%)`;
const accentSoft = accent + "1A";
const accentGlow = accent + "4D";
const ctaGrad = `linear-gradient(135deg, ${shade(accent, 0.1)} 0%, ${shade(accent, -0.2)} 100%)`;
const ink = "#2E3437";
const inkSoft = "#5A6266";
const inkMute = "#8E979A";
const line = "#E3DED3";

const fontMincho = "'Shippori Mincho', serif";
const fontGothic = "'Zen Kaku Gothic New', sans-serif";
const fontEn = "'Playfair Display', serif";

/** セクション見出し（明朝＋短い下線）。`kicker` は英字／小見出し。 */
function SectionHeading({
  text,
  kicker,
  variant = "accent",
  fontSize = 22,
}: {
  text: string;
  kicker?: string;
  variant?: "accent" | "white";
  fontSize?: number;
}) {
  const color = variant === "white" ? "#FFFFFF" : accent;
  const rule = variant === "white" ? "rgba(255,255,255,0.6)" : accent;
  return (
    <div style={{ textAlign: "center" }}>
      {kicker && (
        <p
          style={{
            fontFamily: fontGothic,
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.16em",
            color: variant === "white" ? "rgba(255,255,255,0.75)" : accentMid,
            margin: "0 0 10px",
          }}
        >
          {kicker}
        </p>
      )}
      <h2
        style={{
          fontFamily: fontMincho,
          fontWeight: 600,
          fontSize,
          letterSpacing: "0.06em",
          color,
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {nl(text)}
      </h2>
      <div style={{ width: 30, height: 2, background: rule, borderRadius: 2, margin: "14px auto 0" }} />
    </div>
  );
}

const CheckIcon = ({ color = accentMid, size = 15 }: { color?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flex: "none", marginTop: 3 }}
  >
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

/** 予約CTA。すべてページ下部のフォームへ。ボタン下に注記1行。 */
function ReserveCta({
  label = c.cta.main,
  variant = "light",
  note = true,
  marginTop = 30,
}: {
  label?: string;
  variant?: "light" | "dark";
  note?: boolean;
  marginTop?: number;
}) {
  const dark = variant === "dark";
  return (
    <div style={{ marginTop }}>
      <a
        href="#reserve"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          height: 58,
          background: dark ? "#FFFFFF" : ctaGrad,
          color: dark ? accent : "#FFFFFF",
          textDecoration: "none",
          fontFamily: fontGothic,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "0.04em",
          borderRadius: 999,
          boxShadow: dark ? "0 10px 22px rgba(0,0,0,0.22)" : "0 10px 22px rgba(25,45,52,0.30)",
        }}
      >
        {label}
        <span style={{ fontSize: 13 }}>›</span>
      </a>
      {note && (
        <p
          style={{
            textAlign: "center",
            fontSize: 11,
            lineHeight: 1.8,
            color: dark ? "rgba(255,255,255,0.78)" : inkMute,
            letterSpacing: "0.02em",
            margin: "12px 0 0",
          }}
        >
          {c.cta.note}
        </p>
      )}
    </div>
  );
}

/** 打ち消し線つきの通常価格。 */
function Regular({ value, size = 15 }: { value: string; size?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: 3, whiteSpace: "nowrap" }}>
      <span style={{ fontSize: size * 0.72, color: inkSoft }}>通常</span>
      <span style={{ position: "relative", fontFamily: fontGothic, fontWeight: 500, fontSize: size, color: inkSoft }}>
        {value}
        <span style={{ fontSize: size * 0.7 }}>円</span>
        <span
          style={{
            position: "absolute",
            left: -2,
            right: -2,
            top: "54%",
            height: 1.5,
            background: inkSoft,
            transform: "rotate(-7deg)",
          }}
        />
      </span>
    </span>
  );
}

/** キャンペーン価格（特大）。数字はテラコッタ、「円」「税込」は小さく。 */
function Now({ value, size, tax = true }: { value: string; size: number; tax?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: 2, whiteSpace: "nowrap", color: priceColor }}>
      <span
        style={{
          fontFamily: fontMincho,
          fontWeight: 700,
          fontSize: size,
          lineHeight: 1,
          letterSpacing: "0.01em",
        }}
      >
        {value}
      </span>
      <span style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: size * 0.42 }}>円</span>
      {tax && <span style={{ fontSize: 10, color: inkMute, marginLeft: 2 }}>税込</span>}
    </span>
  );
}

const Arrow = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: "none" }} aria-hidden>
    <path d="M6 4l10 8-10 8z" fill={accentMid} />
  </svg>
);

/**
 * 横並びの二重価格（FV・最終CTA用）。左にラベル、中央に通常価格、右に特大価格。
 * 「通常価格は小さく・キャンペーン価格は大きく」を1行で見せる。
 */
function PriceRow({
  label,
  condition,
  regular,
  now,
  nowSize,
}: {
  label: string;
  condition?: string;
  regular: string;
  now: string;
  nowSize: number;
}) {
  return (
    <div>
      {condition && (
        <p style={{ fontSize: 12, fontWeight: 700, color: ink, margin: "0 0 6px", letterSpacing: "0.04em" }}>
          {condition}
        </p>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            flex: "none",
            width: 54,
            textAlign: "center",
            background: accent,
            color: "#FFFFFF",
            fontFamily: fontGothic,
            fontWeight: 700,
            fontSize: 11.5,
            letterSpacing: "0.02em",
            padding: "5px 0",
            borderRadius: 4,
          }}
        >
          {label}
        </span>
        <Regular value={regular} size={13} />
        <Arrow size={12} />
        <span style={{ marginLeft: "auto" }}>
          <Now value={now} size={nowSize} tax={false} />
        </span>
      </div>
    </div>
  );
}

/** 期限の帯。日付だけ大きくして「いつまでか」を一瞬で読ませる。 */
function DeadlineStrip({ dark = false }: { dark?: boolean }) {
  const d = c.deadline;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        background: dark ? accent : accentSoft,
        color: dark ? "#FFFFFF" : accent,
        borderRadius: 999,
        padding: "6px 14px",
        fontFamily: fontGothic,
        fontWeight: 700,
        fontSize: 12.5,
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" strokeLinecap="round" />
      </svg>
      <span>
        <span style={{ fontFamily: fontMincho, fontSize: 17 }}>{d.date}</span>（{d.dow}）までの期間限定
      </span>
    </div>
  );
}

/** 「＋さらに」の区切り線。価格カード内で特典を1つずつ足すときに使う。 */
function PlusDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "14px 0 12px" }}>
      <span style={{ flex: 1, height: 1, background: line }} />
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: accent,
          border: `1px solid ${accent}`,
          borderRadius: 999,
          padding: "2px 10px",
          letterSpacing: "0.08em",
        }}
      >
        ＋さらに
      </span>
      <span style={{ flex: 1, height: 1, background: line }} />
    </div>
  );
}

/** プレゼント特典の1行。淡い地のプレートに、ギフトアイコン＋品名を大きく置く。 */
function GiftRow({ itemSize = 18 }: { itemSize?: number }) {
  const g = c.gift;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        background: accentSoft,
        borderRadius: 10,
        padding: "12px 12px",
      }}
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={priceColor} strokeWidth="1.7" style={{ flex: "none" }} aria-hidden>
        <rect x="3.5" y="9" width="17" height="11.5" rx="1.2" />
        <path d="M2.5 9h19v-3h-19zM12 6v14.5" strokeLinejoin="round" />
        <path d="M12 6c-1.5-3-5-3.6-5-1.4C7 6 10 6 12 6zM12 6c1.5-3 5-3.6 5-1.4C17 6 14 6 12 6z" strokeLinejoin="round" />
      </svg>
      <div style={{ minWidth: 0 }}>
        <p style={{ margin: 0, lineHeight: 1.3, color: ink, fontWeight: 700, whiteSpace: "nowrap" }}>
          <span style={{ fontFamily: fontMincho, fontSize: itemSize, color: priceColor }}>{g.item}</span>
          <span style={{ fontSize: itemSize * 0.72, marginLeft: 3 }}>{g.post}</span>
        </p>
      </div>
    </div>
  );
}

/** FV・最終CTAの価格カード（体験＋入会金＋プレゼントの3行）。 */
function OfferCard() {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        padding: "18px 18px 16px",
        boxShadow: "0 8px 24px rgba(30,50,58,0.12)",
        border: `1px solid ${line}`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", margin: "0 0 14px" }}>
        <DeadlineStrip dark />
      </div>
      <PriceRow {...c.prices.trial} nowSize={44} />
      <PlusDivider />
      <PriceRow {...c.prices.admission} nowSize={40} />
      <PlusDivider />
      <GiftRow />
    </div>
  );
}

/** キャンペーンセクションの縦積み価格。通常価格 → ↓ → 特大価格。 */
function PriceStack({
  label,
  condition,
  regular,
  now,
}: {
  label: string;
  condition?: string;
  regular: string;
  now: string;
}) {
  return (
    <div style={{ textAlign: "center" }}>
      {condition && (
        <p style={{ fontSize: 14, fontWeight: 700, color: ink, margin: "0 0 10px", letterSpacing: "0.04em" }}>
          {condition}
        </p>
      )}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <span
          style={{
            background: accent,
            color: "#FFFFFF",
            fontFamily: fontGothic,
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "0.06em",
            padding: "6px 13px",
            borderRadius: 4,
          }}
        >
          {label}
        </span>
        <Regular value={regular} size={20} />
      </div>
      <div style={{ fontSize: 18, lineHeight: 1, color: accentMid, margin: "12px 0 6px" }}>▼</div>
      <Now value={now} size={72} />
    </div>
  );
}

export default function Page() {
  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div
        style={{
          fontFamily: "'Noto Sans JP', sans-serif",
          lineBreak: "strict",
          background: "#E4E8E6",
          minHeight: "100vh",
          color: ink,
        }}
      >
        <LPCanvas style={{ background: base }} boxShadow="0 0 60px rgba(40,60,66,0.16)">
          {/* ── ヘッダー ── */}
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 18px",
              background: "#FFFFFF",
            }}
          >
            <div style={{ lineHeight: 1.25 }}>
              <div
                style={{
                  fontFamily: fontGothic,
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: accent,
                }}
              >
                {c.header.brand}
              </div>
              <div style={{ fontSize: 9, letterSpacing: "0.08em", color: inkMute }}>{c.header.brandSub}</div>
            </div>
            <div style={{ textAlign: "right", lineHeight: 1.2 }}>
              <div style={{ fontSize: 11, color: inkSoft, letterSpacing: "0.04em" }}>{c.header.station}</div>
              <div style={{ fontFamily: fontGothic, fontWeight: 700, color: ink, fontSize: 12 }}>
                {c.header.walkPre}
                <span style={{ fontSize: 20, color: accent, margin: "0 1px" }}>{c.header.walkNum}</span>
                {c.header.walkPost}
              </div>
            </div>
          </header>

          {/* ── オファーバー ── */}
          <div
            style={{
              position: "relative",
              zIndex: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              background: accentGrad,
              padding: "10px 18px",
            }}
          >
            <span
              style={{
                flex: "none",
                fontFamily: fontGothic,
                fontWeight: 700,
                fontSize: 12.5,
                color: accent,
                background: "#FFFFFF",
                borderRadius: 4,
                padding: "4px 9px",
                letterSpacing: "0.06em",
              }}
            >
              {c.offerBar.badge}
            </span>
            <span style={{ fontFamily: fontGothic, fontWeight: 700, fontSize: 15, color: "#FFFFFF", letterSpacing: "0.05em" }}>
              {c.offerBar.pre}
              <span style={{ fontFamily: fontMincho, fontSize: 24, margin: "0 2px 0 6px", lineHeight: 1 }}>
                {c.offerBar.num}
              </span>
              {c.offerBar.post}
            </span>
          </div>

          {/* ── FV：写真＋メインコピー（写真下部のグラデーション上） ── */}
          <section style={{ position: "relative", height: 440, overflow: "hidden", background: accent }}>
            <ImageSlot
              src={c.fv.hero.src}
              placeholder={c.fv.hero.placeholder}
              objectPosition={c.fv.hero.position}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(18,36,42,0) 34%, rgba(18,36,42,0.55) 62%, rgba(18,36,42,0.88) 100%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "absolute", left: 22, right: 22, bottom: 24, color: "#FFFFFF" }}>
              <h1
                style={{
                  fontFamily: fontMincho,
                  fontWeight: 700,
                  fontSize: 33,
                  lineHeight: 1.42,
                  letterSpacing: "0.06em",
                  margin: 0,
                  textShadow: "0 2px 12px rgba(0,0,0,0.35)",
                }}
              >
                {c.fv.catchLines.map((l) => (
                  <span key={l} style={{ display: "block" }}>
                    {l}
                  </span>
                ))}
              </h1>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.85,
                  letterSpacing: "0.03em",
                  margin: "12px 0 0",
                  textShadow: "0 1px 6px rgba(0,0,0,0.4)",
                }}
              >
                {rich(c.fv.sub, { fontFamily: fontMincho, fontWeight: 700, fontSize: 20, lineHeight: 1 })}
              </p>
            </div>
          </section>

          {/* ── FV下：専門性（3本柱）→ 価格 → CTA① ── */}
          <section style={{ background: mist, padding: "18px 20px 30px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {c.fv.features.map((f, i) => (
                <div key={f} style={{ display: "contents" }}>
                  {i > 0 && <span style={{ flex: "none", fontSize: 14, color: accentMid, fontWeight: 700 }}>×</span>}
                  <span
                    style={{
                      flex: i === 2 ? 1.5 : 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      height: 50,
                      background: "#FFFFFF",
                      border: `1.5px solid ${accent}`,
                      borderRadius: 8,
                      fontFamily: fontGothic,
                      fontWeight: 700,
                      fontSize: i === 2 ? 12 : 14,
                      lineHeight: 1.3,
                      color: accent,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span>{nl(f)}</span>
                  </span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18 }}>
              <OfferCard />
            </div>
            <ReserveCta marginTop={20} />
          </section>

          {/* ── 悩み ── */}
          <section style={{ background: base, padding: "54px 26px" }}>
            <SectionHeading text={c.worry.heading} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 30 }}>
              {c.worry.items.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 9,
                    background: "#FFFFFF",
                    border: `1px solid ${line}`,
                    borderRadius: 12,
                    padding: "14px 14px",
                  }}
                >
                  <CheckIcon />
                  <span style={{ fontSize: 14.5, lineHeight: 1.7, color: "#3F474A", fontWeight: 500 }}>{nl(item)}</span>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 34,
                background: accentGrad,
                borderRadius: 16,
                padding: "28px 20px 30px",
                boxShadow: `0 10px 24px ${accentGlow}`,
                textAlign: "center",
                color: "#FFFFFF",
              }}
            >
              <p style={{ fontSize: 14, margin: 0, letterSpacing: "0.04em" }}>{c.worry.closing.lead}</p>
              <p
                style={{
                  fontSize: 14,
                  margin: "10px 0 0",
                  color: "rgba(255,255,255,0.62)",
                  textDecoration: "line-through",
                  textDecorationThickness: 1,
                }}
              >
                {c.worry.closing.not}
              </p>
              <p style={{ fontSize: 13, margin: "4px 0 0", color: "rgba(255,255,255,0.8)" }}>ではなく、</p>
              <p
                style={{
                  fontFamily: fontMincho,
                  fontWeight: 700,
                  fontSize: 23,
                  lineHeight: 1.6,
                  letterSpacing: "0.05em",
                  margin: "8px 0 0",
                }}
              >
                {nl(c.worry.closing.but)}
              </p>
              <p style={{ fontSize: 14, margin: "6px 0 0", letterSpacing: "0.04em" }}>{c.worry.closing.tail}</p>
            </div>
          </section>

          {/* ── 原因：なぜ身体を知ることが大切か ＋ CTA② ── */}
          <section style={{ background: greige, padding: "56px 26px 60px" }}>
            <SectionHeading text={c.reason.heading} kicker={c.reason.kicker} />
            <p
              style={{
                textAlign: "center",
                fontSize: 14.5,
                lineHeight: 1.95,
                color: inkSoft,
                margin: "24px 0 0",
              }}
            >
              {nl(c.reason.lead)}
            </p>

            <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "22px 18px", marginTop: 26 }}>
              <p
                style={{
                  textAlign: "center",
                  fontFamily: fontGothic,
                  fontWeight: 700,
                  fontSize: 15,
                  color: accent,
                  margin: 0,
                  letterSpacing: "0.04em",
                }}
              >
                {c.reason.factorsTitle}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 16 }}>
                {c.reason.factors.map((f) => (
                  <div
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 52,
                      borderRadius: 10,
                      background: mist,
                      fontFamily: fontGothic,
                      fontWeight: 700,
                      fontSize: 13,
                      color: ink,
                      textAlign: "center",
                    }}
                  >
                    {f}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 18, borderTop: `1px dashed ${line}`, paddingTop: 16 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: accent,
                    background: accentSoft,
                    borderRadius: 4,
                    padding: "3px 8px",
                    letterSpacing: "0.06em",
                  }}
                >
                  {c.reason.example.label}
                </span>
                <p style={{ fontSize: 14, lineHeight: 1.9, color: inkSoft, margin: "10px 0 0" }}>
                  {c.reason.example.body}
                </p>
              </div>
            </div>

            <p
              style={{
                textAlign: "center",
                fontFamily: fontMincho,
                fontWeight: 600,
                fontSize: 17,
                lineHeight: 1.9,
                letterSpacing: "0.03em",
                color: ink,
                margin: "32px 0 0",
              }}
            >
              {nl(c.reason.conclusion)}
            </p>

            {/* 始め方の比較（競合を否定せず、順番の違いだけを見せる） */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 26 }}>
              {c.reason.compare.map((row) => (
                <div
                  key={row.label}
                  style={{
                    borderRadius: 12,
                    padding: "14px 14px",
                    background: row.strong ? accentGrad : "#FFFFFF",
                    border: row.strong ? "none" : `1px solid ${line}`,
                    color: row.strong ? "#FFFFFF" : inkSoft,
                  }}
                >
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", margin: 0, opacity: 0.85 }}>
                    {row.label}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                    {row.steps.map((s, i) => (
                      <span key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {i > 0 && <span style={{ fontSize: 12, opacity: 0.8 }}>→</span>}
                        <span
                          style={{
                            fontFamily: fontGothic,
                            fontWeight: 700,
                            fontSize: row.strong ? 16 : 14,
                            padding: row.strong ? "4px 10px" : 0,
                            borderRadius: 6,
                            background: row.strong ? "rgba(255,255,255,0.16)" : "transparent",
                          }}
                        >
                          {s}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 評価シート（書類なので切らずに全体を見せる） */}
            <ImageSlot
              src={c.reason.sheet.src}
              alt={c.reason.sheet.alt}
              objectFit="contain"
              radius={8}
              style={{
                width: "100%",
                aspectRatio: "842 / 595",
                marginTop: 18,
                background: "#FFFFFF",
                border: `1px solid ${line}`,
                boxShadow: "0 6px 16px rgba(25,45,52,0.08)",
              }}
            />
            <ReserveCta label={c.cta.sub} />
          </section>

          {/* ── 目指せる未来 ── */}
          <section style={{ background: base, padding: "56px 26px 60px" }}>
            <SectionHeading text={c.future.heading} />
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 32 }}>
              {c.future.items.map((item) => (
                <div
                  key={item.num}
                  style={{
                    display: "flex",
                    alignItems: "stretch",
                    minHeight: 128,
                    background: greige,
                    borderRadius: 14,
                    overflow: "hidden",
                  }}
                >
                  <ImageSlot
                    src={item.img.src}
                    placeholder={item.img.placeholder}
                    objectPosition={item.img.position}
                    style={{ width: 124, flex: "none", alignSelf: "stretch" }}
                  />
                  <div style={{ flex: 1, padding: "15px 15px 15px 14px" }}>
                    <span
                      style={{
                        fontFamily: fontEn,
                        fontStyle: "italic",
                        fontWeight: 700,
                        fontSize: 18,
                        lineHeight: 1,
                        color: accentMid,
                      }}
                    >
                      {item.num}
                    </span>
                    <h3
                      style={{
                        fontFamily: fontGothic,
                        fontWeight: 700,
                        fontSize: 15.5,
                        lineHeight: 1.5,
                        letterSpacing: "0.02em",
                        margin: "6px 0 0",
                        color: ink,
                      }}
                    >
                      {nl(item.title)}
                    </h3>
                    <p style={{ fontSize: 13, lineHeight: 1.8, color: inkSoft, margin: "8px 0 0" }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p
              style={{
                textAlign: "center",
                fontFamily: fontMincho,
                fontWeight: 600,
                fontSize: 21,
                lineHeight: 1.75,
                letterSpacing: "0.04em",
                color: accent,
                margin: "36px 0 0",
              }}
            >
              {nl(c.future.closing)}
            </p>
            <p style={{ textAlign: "center", fontSize: 13.5, lineHeight: 1.9, color: inkSoft, margin: "12px 0 0" }}>
              {nl(c.future.closingSub)}
            </p>
          </section>

          {/* ── 選ばれる理由 01〜05 ＋ CTA③ ── */}
          <section style={{ background: greige, padding: "58px 26px 64px" }}>
            <SectionHeading text={c.reasons.heading} fontSize={24} />
            {c.reasons.items.map((item, idx) => (
              <div key={item.num} style={{ marginTop: idx === 0 ? 44 : 50 }}>
                <div style={{ position: "relative" }}>
                  <ImageSlot
                    src={item.img.src}
                    placeholder={item.img.placeholder}
                    objectPosition={item.img.position}
                    radius={16}
                    style={{ width: "100%", height: 210 }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: -16,
                      right: 16,
                      width: 50,
                      height: 50,
                      transform: "rotate(45deg)",
                      background: accent,
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 6px 14px ${accentGlow}`,
                    }}
                  >
                    <span
                      style={{
                        transform: "rotate(-45deg)",
                        fontFamily: fontGothic,
                        fontWeight: 700,
                        fontSize: 19,
                        color: "#FFFFFF",
                      }}
                    >
                      {item.num}
                    </span>
                  </div>
                </div>
                <h3
                  style={{
                    fontFamily: fontGothic,
                    fontWeight: 700,
                    fontSize: 19,
                    lineHeight: 1.6,
                    letterSpacing: "0.03em",
                    margin: "22px 0 0",
                    color: ink,
                    textAlign: "center",
                  }}
                >
                  {nl(item.title)}
                </h3>
                <div style={{ width: 40, height: 2, background: "#D3CCBD", margin: "12px auto 0" }} />
                <p style={{ fontSize: 14.5, lineHeight: 2, color: inkSoft, margin: "16px 0 0" }}>{item.body}</p>
              </div>
            ))}
            <ReserveCta />
          </section>

          {/* ── FMS ＋ CTA④ ── */}
          <section style={{ background: base, padding: "58px 26px 62px" }}>
            <SectionHeading text={c.fms.heading} kicker={c.fms.kicker} />
            <p
              style={{
                textAlign: "center",
                fontFamily: fontMincho,
                fontWeight: 600,
                fontSize: 16,
                color: ink,
                margin: "22px 0 0",
                letterSpacing: "0.04em",
              }}
            >
              {c.fms.lead}
            </p>
            <ImageSlot
              src={c.fms.photo.src}
              placeholder={c.fms.photo.placeholder}
              objectPosition={c.fms.photo.position}
              radius={16}
              style={{ width: "100%", height: 220, marginTop: 24 }}
            />
            <p style={{ fontSize: 14.5, lineHeight: 2, color: inkSoft, margin: "22px 0 0" }}>{c.fms.body}</p>

            {/* 7つの動き */}
            <div style={{ background: mist, borderRadius: 16, padding: "22px 16px 18px", marginTop: 24 }}>
              <p style={{ textAlign: "center", margin: 0, fontFamily: fontGothic, fontWeight: 700, color: accent }}>
                <span style={{ fontFamily: fontMincho, fontSize: 34, lineHeight: 1 }}>7</span>
                <span style={{ fontSize: 16 }}>つの動きでチェック</span>
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 16 }}>
                {c.fms.moves.map((m, i) => (
                  <div
                    key={m.num}
                    style={{
                      gridColumn: i === c.fms.moves.length - 1 ? "1 / -1" : undefined,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "#FFFFFF",
                      borderRadius: 10,
                      padding: "10px 10px",
                    }}
                  >
                    <span
                      style={{
                        flex: "none",
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: accent,
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: fontGothic,
                        fontWeight: 700,
                        fontSize: 12,
                      }}
                    >
                      {m.num}
                    </span>
                    <span style={{ lineHeight: 1.3, minWidth: 0 }}>
                      <span style={{ display: "block", fontFamily: fontGothic, fontWeight: 700, fontSize: 14.5, color: ink, whiteSpace: "nowrap" }}>
                        {m.verb}
                      </span>
                      <span style={{ display: "block", fontSize: 9, color: inkMute, letterSpacing: "0.02em" }}>{m.en}</span>
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
                {c.fms.subPhotos.map((p) => (
                  <figure key={p.caption} style={{ margin: 0 }}>
                    <ImageSlot
                      src={p.img.src}
                      placeholder={p.img.placeholder}
                      objectPosition={p.img.position}
                      radius={10}
                      style={{ width: "100%", height: 110 }}
                    />
                    <figcaption style={{ fontSize: 11, color: inkSoft, textAlign: "center", marginTop: 6 }}>
                      {p.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            {/* 確認すること */}
            <div style={{ marginTop: 24 }}>
              <p
                style={{
                  fontFamily: fontGothic,
                  fontWeight: 700,
                  fontSize: 15,
                  color: accent,
                  margin: "0 0 12px",
                  letterSpacing: "0.04em",
                }}
              >
                {c.fms.checkTitle}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {c.fms.checks.map((q) => (
                  <div key={q} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <CheckIcon />
                    <span style={{ fontSize: 14.5, lineHeight: 1.7, color: "#3F474A" }}>{q}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 気づきの体験価値 */}
            <div
              style={{
                marginTop: 24,
                background: greige,
                borderLeft: `4px solid ${accent}`,
                borderRadius: "0 12px 12px 0",
                padding: "16px 16px 16px 16px",
              }}
            >
              <p style={{ fontSize: 12, fontWeight: 700, color: accent, margin: 0, letterSpacing: "0.06em" }}>
                {c.fms.discovery.label}
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.9, color: inkSoft, margin: "8px 0 0" }}>{c.fms.discovery.body}</p>
            </div>

            <div style={{ textAlign: "center", marginTop: 30 }}>
              <p
                style={{
                  fontFamily: fontMincho,
                  fontWeight: 600,
                  fontSize: 17,
                  lineHeight: 1.8,
                  color: ink,
                  margin: 0,
                  letterSpacing: "0.03em",
                }}
              >
                {nl(c.fms.purpose.heading)}
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.9, color: inkSoft, margin: "12px 0 0" }}>{nl(c.fms.purpose.body)}</p>
              <p style={{ fontSize: 11, lineHeight: 1.7, color: inkMute, margin: "14px 0 0" }}>{nl(c.fms.note)}</p>
            </div>
            <ReserveCta label={c.cta.sub} />
          </section>

          {/* ── 知る → 整える → 動かす（LPの中心ビジュアル） ── */}
          <section style={{ background: accentGrad, padding: "58px 26px 60px" }}>
            <SectionHeading text={c.steps.heading} kicker={c.steps.kicker} variant="white" fontSize={25} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", marginTop: 34 }}>
              {c.steps.items.map((s, i) => (
                <div key={s.num}>
                  {i > 0 && (
                    <div style={{ display: "flex", justifyContent: "center", padding: "10px 0" }}>
                      <svg width="26" height="18" viewBox="0 0 26 18" aria-hidden>
                        <path d="M2 2l11 12L24 2" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="2.4" />
                      </svg>
                    </div>
                  )}
                  <div style={{ background: "#FFFFFF", borderRadius: 16, overflow: "hidden" }}>
                    <ImageSlot
                      src={s.img.src}
                      placeholder={s.img.placeholder}
                      objectPosition={s.img.position}
                      style={{ width: "100%", height: 170 }}
                    />
                    <div style={{ padding: "16px 18px 18px" }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                        <span style={{ fontFamily: fontGothic, fontWeight: 700, fontSize: 11, color: accentMid, letterSpacing: "0.1em" }}>
                          STEP {s.num}
                        </span>
                        <span
                          style={{
                            fontFamily: fontEn,
                            fontStyle: "italic",
                            fontWeight: 700,
                            fontSize: 22,
                            lineHeight: 1,
                            color: accent,
                            letterSpacing: "0.02em",
                          }}
                        >
                          {s.en}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontFamily: fontMincho,
                          fontWeight: 700,
                          fontSize: 21,
                          lineHeight: 1.5,
                          letterSpacing: "0.04em",
                          margin: "8px 0 0",
                          color: ink,
                        }}
                      >
                        {s.title}
                      </h3>
                      <p style={{ fontSize: 14, lineHeight: 1.85, color: inkSoft, margin: "8px 0 0" }}>{s.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p
              style={{
                textAlign: "center",
                fontFamily: fontMincho,
                fontWeight: 600,
                fontSize: 18,
                lineHeight: 1.85,
                letterSpacing: "0.04em",
                color: "#FFFFFF",
                margin: "32px 0 0",
              }}
            >
              {nl(c.steps.closing)}
            </p>
          </section>

          {/* ── 体験レッスン ＋ CTA⑤ ── */}
          <section style={{ background: greige, padding: "56px 26px 60px" }}>
            <SectionHeading text={c.trial.heading} kicker={c.trial.kicker} fontSize={21} />
            <div style={{ position: "relative", marginTop: 28 }}>
              <ImageSlot
                src={c.trial.photo.src}
                placeholder={c.trial.photo.placeholder}
                objectPosition={c.trial.photo.position}
                radius={16}
                style={{ width: "100%", height: 210 }}
              />
              <div
                style={{
                  position: "absolute",
                  right: 12,
                  bottom: -22,
                  width: 98,
                  height: 98,
                  borderRadius: "50%",
                  background: accent,
                  color: "#FFFFFF",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1.2,
                  border: "2px solid #FFFFFF",
                  boxShadow: `0 6px 14px ${accentGlow}`,
                }}
              >
                <span style={{ fontSize: 10.5, letterSpacing: "0.06em" }}>{c.trial.duration.label}</span>
                <span style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 26 }}>{c.trial.duration.value}</span>
                {c.trial.duration.note && (
                  <span style={{ fontSize: 9, opacity: 0.85 }}>{c.trial.duration.note}</span>
                )}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 40 }}>
              {c.trial.items.map((step, i) => {
                const last = i === c.trial.items.length - 1;
                return (
                  <div key={step.num} style={{ display: "flex", gap: 14 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
                      <span
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background: accent,
                          color: "#FFFFFF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: fontGothic,
                          fontWeight: 700,
                          fontSize: 16,
                          flex: "none",
                        }}
                      >
                        {step.num}
                      </span>
                      {!last && <span style={{ width: 2, flex: 1, background: "#D6CFC0" }} />}
                    </div>
                    <div style={{ paddingBottom: last ? 0 : 18, paddingTop: 6 }}>
                      <h3
                        style={{
                          fontFamily: fontGothic,
                          fontWeight: 700,
                          fontSize: 16,
                          lineHeight: 1.5,
                          letterSpacing: "0.02em",
                          margin: 0,
                          color: ink,
                        }}
                      >
                        {nl(step.title)}
                      </h3>
                      {step.sub && (
                        <p style={{ fontSize: 13, lineHeight: 1.7, color: inkSoft, margin: "4px 0 0" }}>{step.sub}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                marginTop: 28,
                background: "#FFFFFF",
                borderRadius: 14,
                padding: "18px 16px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: fontMincho,
                  fontWeight: 600,
                  fontSize: 16,
                  lineHeight: 1.85,
                  color: ink,
                  margin: 0,
                  letterSpacing: "0.03em",
                }}
              >
                {nl(c.trial.closing)}
              </p>
              <div style={{ marginTop: 12 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                  <DeadlineStrip />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: ink, marginRight: 6 }}>初回体験</span>
                <Regular value={c.prices.trial.regular} size={14} />
                <span style={{ margin: "0 6px", display: "inline-block", verticalAlign: "middle" }}>
                  <Arrow size={12} />
                </span>
                <Now value={c.prices.trial.now} size={34} />
              </div>
            </div>
            <ReserveCta />
          </section>

          {/* ── 初めてでも安心 ── */}
          <section style={{ background: base, padding: "56px 26px" }}>
            <SectionHeading text={c.beginner.heading} />
            <ImageSlot
              src={c.beginner.photo.src}
              placeholder={c.beginner.photo.placeholder}
              objectPosition={c.beginner.photo.position}
              radius={16}
              style={{ width: "100%", height: 210, marginTop: 28 }}
            />
            <p style={{ fontSize: 14.5, lineHeight: 2, color: inkSoft, margin: "22px 0 0" }}>{c.beginner.body}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 22 }}>
              {c.beginner.items.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 6,
                    background: mist,
                    borderRadius: 10,
                    padding: "12px 10px",
                  }}
                >
                  <CheckIcon color={accent} size={14} />
                  <span style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.6, color: ink }}>{item}</span>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 22,
                background: greige,
                borderRadius: 14,
                padding: "16px 16px",
                display: "flex",
                gap: 10,
              }}
            >
              <span style={{ fontFamily: fontMincho, fontSize: 30, lineHeight: 1, color: accentMid }}>“</span>
              <p style={{ fontSize: 13.5, lineHeight: 1.85, color: inkSoft, margin: 0 }}>{c.beginner.voice}</p>
            </div>
          </section>

          {/* ── キャンペーン ＋ CTA⑥ ── */}
          <section style={{ background: greige, padding: "56px 20px 60px" }}>
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: 20,
                padding: "30px 20px 30px",
                border: `2px solid ${accent}`,
                boxShadow: "0 12px 30px rgba(30,50,58,0.12)",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <DeadlineStrip dark />
                </div>
                <h2
                  style={{
                    fontFamily: fontMincho,
                    fontWeight: 700,
                    fontSize: 30,
                    letterSpacing: "0.08em",
                    color: ink,
                    margin: "14px 0 0",
                  }}
                >
                  {c.campaign.heading}
                </h2>
              </div>
              <div style={{ marginTop: 22 }}>
                <PriceStack {...c.prices.trial} label="通常体験" />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "26px 0 22px" }}>
                <span style={{ flex: 1, height: 1, background: line }} />
                <span
                  style={{
                    fontFamily: fontMincho,
                    fontWeight: 700,
                    fontSize: 17,
                    color: accent,
                    letterSpacing: "0.1em",
                  }}
                >
                  さらに
                </span>
                <span style={{ flex: 1, height: 1, background: line }} />
              </div>
              <PriceStack {...c.prices.admission} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "26px 0 16px" }}>
                <span style={{ flex: 1, height: 1, background: line }} />
                <span
                  style={{
                    fontFamily: fontMincho,
                    fontWeight: 700,
                    fontSize: 17,
                    color: accent,
                    letterSpacing: "0.1em",
                  }}
                >
                  さらに
                </span>
                <span style={{ flex: 1, height: 1, background: line }} />
              </div>
              <GiftRow />
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 6,
                  marginTop: 26,
                }}
              >
                {c.campaign.values.map((v) => (
                  <span
                    key={v}
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: accent,
                      background: accentSoft,
                      borderRadius: 999,
                      padding: "5px 12px",
                    }}
                  >
                    {v}
                  </span>
                ))}
              </div>
              <ReserveCta label={c.cta.campaign} marginTop={22} />
            </div>
          </section>

          {/* ── 店舗情報 ── */}
          <section style={{ background: base, padding: "56px 26px" }}>
            <SectionHeading text={c.store.heading} fontSize={24} />
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 6px 16px rgba(30,50,58,0.10)",
                marginTop: 30,
              }}
            >
              <ImageSlot
                src={c.store.img.src}
                placeholder={c.store.img.placeholder}
                objectPosition={c.store.img.position}
                style={{ width: "100%", height: 230 }}
              />
              <div style={{ padding: 20 }}>
                <h3
                  style={{
                    fontFamily: fontGothic,
                    fontWeight: 700,
                    fontSize: 21,
                    letterSpacing: "0.06em",
                    margin: 0,
                    color: accent,
                  }}
                >
                  {c.store.name}
                </h3>
                <p style={{ fontFamily: fontGothic, fontWeight: 700, color: ink, fontSize: 15, margin: "8px 0 0" }}>
                  {c.store.walkPre}
                  <span style={{ fontFamily: fontMincho, fontSize: 28, color: accent, margin: "0 2px", lineHeight: 1 }}>
                    {c.store.walkNum}
                  </span>
                  {c.store.walkPost}
                </p>
                <div style={{ height: 1, background: "#EEE9DE", margin: "14px 0" }} />
                <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "64px 1fr", rowGap: 10, fontSize: 14 }}>
                  <dt style={{ color: inkMute, fontSize: 12.5 }}>住所</dt>
                  <dd style={{ margin: 0, color: inkSoft, lineHeight: 1.7 }}>{nl(c.store.address)}</dd>
                  <dt style={{ color: inkMute, fontSize: 12.5 }}>営業時間</dt>
                  <dd style={{ margin: 0, color: ink, fontWeight: 700 }}>{c.store.hours}</dd>
                  <dt style={{ color: inkMute, fontSize: 12.5 }}>定休日</dt>
                  <dd style={{ margin: 0, color: inkSoft }}>{c.store.closed}</dd>
                </dl>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 7, marginTop: 14 }}>
                  <CheckIcon />
                  <span style={{ fontSize: 13, lineHeight: 1.75, color: inkSoft }}>{c.store.route}</span>
                </div>
                <iframe
                  src={c.store.mapEmbedSrc}
                  title={`${c.store.name}の地図`}
                  loading="lazy"
                  style={{ width: "100%", height: 160, marginTop: 16, border: 0, borderRadius: 10 }}
                />
              </div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section style={{ background: accentGrad, padding: "54px 26px" }}>
            <SectionHeading text={c.faq.heading} variant="white" fontSize={24} />
            <div style={{ marginTop: 28 }}>
              <FaqList
                items={c.faq.items.map((f) => ({ q: f.q, a: f.confirm ? `【要確認】${f.a}` : f.a }))}
                accent={accent}
                accentSoft={accentSoft}
              />
            </div>
          </section>

          {/* ── 最終CTA ＋ CTA⑦ ── */}
          <section style={{ background: base, padding: "60px 22px 56px" }}>
            <h2
              style={{
                textAlign: "center",
                fontFamily: fontMincho,
                fontWeight: 700,
                fontSize: 31,
                lineHeight: 1.5,
                letterSpacing: "0.06em",
                color: accent,
                margin: 0,
              }}
            >
              {nl(c.closing.heading)}
            </h2>
            <p
              style={{
                textAlign: "center",
                fontSize: 15,
                lineHeight: 1.85,
                color: ink,
                margin: "18px 0 0",
                letterSpacing: "0.04em",
              }}
            >
              {nl(c.closing.lead)}
            </p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginTop: 22 }}>
              {c.closing.chips.map((chip, i) => (
                <div key={chip} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  {i > 0 && <span style={{ fontSize: 13, color: accentMid, fontWeight: 700, lineHeight: 1 }}>×</span>}
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: accent,
                      background: accentSoft,
                      borderRadius: 999,
                      padding: "6px 16px",
                    }}
                  >
                    {chip}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24 }}>
              <OfferCard />
            </div>
            <ReserveCta label={c.cta.final} marginTop={22} />
          </section>

          {/* ── 予約フォーム ── */}
          <section id="reserve" style={{ background: greige, padding: "54px 22px 60px" }}>
            <SectionHeading text={c.form.heading} kicker={c.form.kicker} fontSize={22} />
            <p style={{ textAlign: "center", fontSize: 13.5, lineHeight: 1.85, color: inkSoft, margin: "18px 0 0" }}>
              {nl(c.form.lead)}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                margin: "16px 0 0",
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: accent }}>{c.deadline.short}</span>
              <Regular value={c.prices.trial.regular} size={13} />
              <Arrow size={11} />
              <span style={{ fontSize: 12, fontWeight: 700, color: ink }}>初回体験</span>
              <Now value={c.prices.trial.now} size={28} />
            </div>
            <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "24px 18px", marginTop: 20 }}>
              <LPForm
                clientSlug={c.slug}
                accent={accent}
                fields={c.form.fields}
                submitLabel={c.form.submitLabel}
                submitStyle={{ background: ctaGrad, boxShadow: "0 10px 22px rgba(25,45,52,0.30)", borderRadius: 999 }}
                microcopy={c.form.microcopy}
                disclaimer={c.form.disclaimer}
              />
            </div>
          </section>

          <footer
            style={{
              background: accent,
              color: "rgba(255,255,255,0.8)",
              fontSize: 11,
              textAlign: "center",
              padding: "14px 0",
              letterSpacing: "0.06em",
            }}
          >
            {c.footer.copyright}
          </footer>
        </LPCanvas>
      </div>

      {/* ── 追従フッターCTA ── */}
      <StickyFooterCTA
        anchor="#reserve"
        buttonText={c.sticky.buttonText}
        showAfter={c.sticky.showAfter}
        buttonGradient={ctaGrad}
        shadowColor="rgba(25,45,52,0.35)"
        borderColor={`${accent}59`}
        note={
          <span style={{ fontSize: 11.5, fontWeight: 700, color: accent, letterSpacing: "0.04em" }}>
            {c.deadline.date}（{c.deadline.dow}）までの期間限定
          </span>
        }
        offers={[
          <span key="trial" style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontSize: 11, color: inkSoft }}>初回体験</span>
            <span style={{ fontSize: 11, color: inkMute, textDecoration: "line-through" }}>{c.prices.trial.regular}円</span>
            <span style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 18, lineHeight: 1, color: priceColor }}>
              {c.prices.trial.now}<span style={{ fontSize: 11 }}>円</span>
            </span>
          </span>,
          <span key="adm" style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontSize: 11, color: inkSoft }}>当日入会で入会金</span>
            <span style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 18, lineHeight: 1, color: priceColor }}>
              {c.prices.admission.now}<span style={{ fontSize: 11 }}>円</span>
            </span>
          </span>,
        ]}
      />
    </LPShell>
  );
}
