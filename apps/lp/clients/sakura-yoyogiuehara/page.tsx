import type { ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPForm from "@/components/LPForm";
import StickyFooterCTA from "@/components/StickyFooterCTA";
import ImageSlot from "@/components/ImageSlot";
import FaqList from "./FaqList";
import config from "./config";

/* Derive navy tones from the accent, mirroring the design's renderVals(). */
function shade(hex: string, amt: number): string {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
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

/** Render "\n"-separated text as line breaks. */
function nl(text: string): ReactNode {
  const parts = text.split("\n");
  return parts.map((p, i) => (
    <span key={i}>
      {p}
      {i < parts.length - 1 && <br />}
    </span>
  ));
}

const accent = config.accent;
const navyGrad = `linear-gradient(158deg, ${shade(accent, 0.14)} 0%, ${accent} 52%, ${shade(accent, -0.18)} 100%)`;
const accentSoft = accent + "22";
const accentGlow = accent + "55";
/* SAKURA palette — sakura-pink × cream 載せ替え（パターンAのゴールドを桜色に）。 */
const goldGrad = "linear-gradient(160deg, #F2AEC0 0%, #C2557A 100%)";
const goldBtn = "linear-gradient(135deg, #EC8AA6 0%, #C24F71 100%)";
const creamGrad = "linear-gradient(180deg, #FBF2F1 0%, #F4E5E2 100%)";
/* 桜色の淡いトーン（丸バッジ・小見出しの装飾に使用）。 */
const sakuraPale = "#F7DBE2";
const sakuraSoftText = "#F6D6DD";
const fontMincho = "'Shippori Mincho', serif";
const fontGothic = "'Zen Kaku Gothic New', serif";

/* Line icons for the six offer items — each drawn to match its label (order = config). */
const offerIcons: ReactNode[] = [
  /* 丁寧なカウンセリング — 吹き出し（会話） */
  <>
    <path d="M4 5.5h16a1 1 0 011 1v8a1 1 0 01-1 1h-9l-4 3v-3H4a1 1 0 01-1-1v-8a1 1 0 011-1z" />
    <circle cx="8.5" cy="10.5" r="0.6" />
    <circle cx="12" cy="10.5" r="0.6" />
    <circle cx="15.5" cy="10.5" r="0.6" />
  </>,
  /* マシンピラティス体験 — リフォーマー（マシン） */
  <>
    <rect x="3" y="12.5" width="18" height="2.6" rx="1" />
    <path d="M5 15.1v2.4M19 15.1v2.4" />
    <rect x="5.5" y="9.4" width="8" height="3.1" rx="1" />
    <path d="M17 12.5V8M15.2 8h3.6" />
  </>,
  /* 専門的なフィードバック — チェック付きレポート */
  <>
    <rect x="5" y="3.5" width="14" height="17" rx="2" />
    <path d="M9 3.5h6v2.5H9z" />
    <path d="M8.7 12.3l2.3 2.2 4.3-4.6" />
  </>,
  /* 完全個室でマンツーマン — 2人（1対1） */
  <>
    <circle cx="8.4" cy="8" r="2.3" />
    <path d="M5 18.5v-1.2a3.4 3.4 0 013.4-3.4 3.4 3.4 0 013.4 3.4v1.2" />
    <circle cx="15.6" cy="8" r="2.3" />
    <path d="M12.2 18.5v-1.2a3.4 3.4 0 013.4-3.4 3.4 3.4 0 013.4 3.4v1.2" />
  </>,
  /* 全員女性のスタッフ — 女性記号 */
  <>
    <circle cx="12" cy="8" r="4.3" />
    <path d="M12 12.3V20M8.7 16.4h6.6" />
  </>,
  /* ウェア・靴下 無料レンタル — Tシャツ */
  <>
    <path d="M8.8 4L4 6.7l1.9 3.1L8 8.5V20h8V8.5l2.1 1.3L20 6.7 15.2 4a3.3 3.3 0 01-6.4 0z" />
  </>,
];

const Icon = ({ children }: { children: ReactNode }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke={accent}
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

/** Accent (or white) heading with a short underline rule. */
function SectionHeading({
  text,
  variant = "accent",
  fontSize = 24,
}: {
  text: string;
  variant?: "accent" | "white";
  fontSize?: number;
}) {
  const color = variant === "white" ? "#FFFFFF" : accent;
  const rule = variant === "white" ? "rgba(255,255,255,0.55)" : accent;
  return (
    <div style={{ textAlign: "center" }}>
      <h2
        style={{
          fontFamily: fontMincho,
          fontWeight: 600,
          fontSize,
          letterSpacing: "0.08em",
          color,
          lineHeight: 1.4,
          margin: 0,
        }}
      >
        {nl(text)}
      </h2>
      <div
        style={{
          width: 30,
          height: 2,
          background: rule,
          borderRadius: 2,
          margin: "14px auto 0",
        }}
      />
    </div>
  );
}

const GoldCta = ({ text, sub }: { text: string; sub?: string }) => (
  <div style={{ marginTop: 28 }}>
    <a
      href="#form"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        background: goldBtn,
        color: "#FFFFFF",
        textDecoration: "none",
        fontSize: 16,
        fontWeight: 700,
        letterSpacing: "0.1em",
        borderRadius: 999,
        boxShadow: "0 10px 22px rgba(194,80,113,0.34)",
      }}
    >
      {text}
    </a>
    {sub && (
      <p
        style={{
          textAlign: "center",
          fontSize: 11,
          color: "#9A9C90",
          letterSpacing: "0.1em",
          margin: "12px 0 0",
        }}
      >
        {sub}
      </p>
    )}
  </div>
);

export default function Page() {
  const c = config;
  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div
        style={{
          fontFamily: "'Noto Sans JP', sans-serif",
          background: "#E4DFD5",
          minHeight: "100vh",
          color: "#3B3D36",
        }}
      >
        <div
          style={{
            maxWidth: 480,
            margin: "0 auto",
            background: "#FCFBF7",
            boxShadow: "0 0 60px rgba(70,72,60,0.16)",
            overflow: "hidden",
          }}
        >
          {/* ── header ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "13px 18px",
              background: "#FFFFFF",
            }}
          >
            {c.header.logo ? (
              <div style={{ lineHeight: 1.25 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.header.logo}
                  alt={c.header.logoAlt ?? c.header.brand}
                  style={{ height: 34, width: "auto", display: "block" }}
                />
                {c.header.hours && (
                  <div style={{ fontSize: 9, letterSpacing: "0.14em", color: "#3B3D36", marginTop: 4, marginLeft: 3 }}>
                    {c.header.hours}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ lineHeight: 1.25 }}>
                <div
                  style={{
                    fontFamily: fontGothic,
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: "#3B3D36",
                  }}
                >
                  {c.header.brand}
                </div>
                <div style={{ fontSize: 9, letterSpacing: "0.14em", color: "#9A9C90" }}>
                  {c.header.brandSub}
                </div>
              </div>
            )}
            <div style={{ textAlign: "right", lineHeight: 1.55, marginTop: 5 }}>
              {c.header.access.map((a, i) => (
                <div key={i} style={{ fontSize: 13, color: "#3B3D36", letterSpacing: "0.03em" }}>
                  {a.station} <span style={{ color: accent }}>{a.walk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── offer bar ── */}
          <div
            style={{
              position: "relative",
              zIndex: 5,
              display: "flex",
              alignItems: "center",
              background: "linear-gradient(120deg, #F2BCCB 0%, #E58BA4 55%, #D97C95 100%)",
              padding: "14px 18px",
              boxShadow: "0 3px 10px rgba(70,72,60,0.18)",
            }}
          >
            {c.showMonitorBadge && (
              <div
                style={{
                  position: "absolute",
                  left: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 68,
                  height: 68,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 38% 32%, #E36A8C 0%, #B23F65 100%)",
                  boxShadow: "0 3px 8px rgba(150,50,80,0.30)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    lineHeight: 1.2,
                    transform: "rotate(-9deg)",
                  }}
                >
                  {c.offerBar.badgeLines.map((l, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: c.offerBar.badgeFontFamily === "mincho" ? fontMincho : fontGothic,
                        fontWeight: c.offerBar.badgeFontWeight ?? 700,
                        fontSize: c.offerBar.badgeFontSize ?? 12.5,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div style={{ flex: "none", width: c.showMonitorBadge ? 78 : 0 }} />
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div
                style={{
                  fontFamily: fontGothic,
                  fontWeight: 700,
                  fontSize: 20,
                  letterSpacing: "0.06em",
                  color: "#FFFFFF",
                  textShadow: "0 1px 5px rgba(180,110,30,0.5)",
                  lineHeight: 1.2,
                  textAlign: "center",
                }}
              >
                {c.offerBar.text}
              </div>
            </div>
          </div>

          {/* ── achievement bar ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              background: "#FFFFFF",
              color: "#3B3D36",
              padding: "7px 18px",
              boxShadow: "0 2px 6px rgba(70,72,60,0.08)",
            }}
          >
            <span style={{ fontSize: 13, letterSpacing: "0.03em" }}>{c.achievement.pre}</span>
            <span style={{ fontWeight: 700, fontSize: 16, lineHeight: 1, color: accent }}>
              {c.achievement.num}
            </span>
            <span style={{ fontSize: 13, letterSpacing: "0.03em" }}>{c.achievement.post}</span>
          </div>

          {/* ── ① FV ── */}
          <section style={{ position: "relative", minHeight: 560, overflow: "hidden", background: "#33352E" }}>
            <ImageSlot
              src={c.fv.hero.src}
              placeholder={c.fv.hero.placeholder}
              objectPosition={c.fv.hero.position ?? "center"}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(30,31,26,0.10) 0%, rgba(30,31,26,0) 20%, rgba(30,31,26,0) 100%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 22,
                left: 20,
                zIndex: 2,
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "flex-start",
                gap: 5,
                pointerEvents: "none",
              }}
            >
              {c.fv.catchLines.map((line, i) => (
                <div
                  key={i}
                  style={{
                    writingMode: "vertical-rl",
                    fontFamily: fontGothic,
                    fontWeight: 500,
                    fontSize: 17,
                    letterSpacing: "0.08em",
                    lineHeight: 1.4,
                    color: "#3B3D36",
                    background: "rgba(255,255,255,0.94)",
                    padding: "9px 5px",
                    borderRadius: 4,
                    boxShadow: "0 4px 14px rgba(0,0,0,0.16)",
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
            <div
              style={{
                position: "relative",
                zIndex: 2,
                minHeight: 560,
                display: "flex",
                flexDirection: "column",
                padding: "40px 28px 34px",
                pointerEvents: "none",
              }}
            >
              <div style={{ marginTop: "auto" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4 }}>
                  <div
                    style={{
                      flex: 1,
                      background: accent,
                      border: "1px solid rgba(255,255,255,0.25)",
                      borderRadius: 6,
                      padding: "20px 8px",
                      textAlign: "center",
                      color: "#FFFFFF",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.16)",
                    }}
                  >
                    <div style={{ fontSize: 15, letterSpacing: "0.08em", color: sakuraSoftText }}>
                      {c.fv.leftCard.small}
                    </div>
                    <div style={{ fontFamily: fontGothic, fontWeight: 500, fontSize: 16, letterSpacing: "0.02em", marginTop: 3 }}>
                      {c.fv.leftCard.big}
                    </div>
                  </div>
                  <div
                    style={{
                      position: "relative",
                      zIndex: 3,
                      margin: "0 -18px",
                      fontFamily: fontGothic,
                      fontWeight: 400,
                      fontSize: 44,
                      color: "#FFFFFF",
                      textShadow: "0 1px 6px rgba(0,0,0,0.35)",
                    }}
                  >
                    ×
                  </div>
                  <div
                    style={{
                      flex: 1,
                      background: accent,
                      border: "1px solid rgba(255,255,255,0.25)",
                      borderRadius: 6,
                      padding: "20px 8px",
                      textAlign: "center",
                      color: "#FFFFFF",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.16)",
                    }}
                  >
                    <div style={{ fontSize: 15, letterSpacing: "0.08em", color: sakuraSoftText }}>
                      {c.fv.rightCard.small}
                    </div>
                    <div style={{ fontFamily: fontGothic, fontWeight: 500, fontSize: 16, letterSpacing: "0.02em", marginTop: 3 }}>
                      {c.fv.rightCard.big}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── ⑦ offer / plan ── */}
          <section style={{ background: "#FCFBF7", padding: "54px 24px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: fontMincho, fontSize: 14, letterSpacing: "0.12em", color: "#4A4E57" }}>
                {c.offer.eyebrow}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8 }}>
                <span style={{ display: "inline-block", width: 14, height: 1, flex: "none", background: "linear-gradient(90deg, transparent, #CE7C97)", position: "relative" }}>
                  <span style={{ position: "absolute", right: -2, top: -2, width: 4, height: 4, borderRadius: "50%", background: "#CE7C97" }} />
                </span>
                <h2
                  style={{
                    fontFamily: fontMincho,
                    fontWeight: 600,
                    fontSize: 29,
                    letterSpacing: "0.04em",
                    color: "#33352E",
                    margin: 0,
                    whiteSpace: "nowrap",
                    background: "linear-gradient(transparent 66%, #F7DBE2 66%)",
                    padding: "0 4px",
                  }}
                >
                  {c.offer.heading}
                </h2>
                <span style={{ display: "inline-block", width: 14, height: 1, flex: "none", background: "linear-gradient(90deg, #CE7C97, transparent)", position: "relative" }}>
                  <span style={{ position: "absolute", left: -2, top: -2, width: 4, height: 4, borderRadius: "50%", background: "#CE7C97" }} />
                </span>
              </div>
            </div>

            {/* 0円 hero */}
            <div style={{ marginTop: 24, textAlign: "center" }}>
              <span style={{ display: "inline-flex", background: "#4A4E57", color: "#FFFFFF", fontSize: 11, fontWeight: 700, letterSpacing: "0.02em", padding: "7px 14px", borderRadius: 4, whiteSpace: "nowrap" }}>
                {c.offer.trialBadge}
              </span>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 14 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span style={{ fontSize: 11, color: "#62655B" }}>通常価格</span>
                  <span style={{ position: "relative", fontFamily: fontMincho, fontSize: 20, color: "#4A4E57" }}>
                    {c.offer.trialRegular}
                    <span style={{ fontSize: 11 }}>円</span>
                    <span style={{ position: "absolute", left: -2, right: -2, top: "55%", height: 1.5, background: "#C25B4B", transform: "rotate(-8deg)" }} />
                  </span>
                  <span style={{ fontSize: 10, color: "#9A9C90" }}>税込</span>
                  <span style={{ fontSize: 18, color: "#CE7C97", marginLeft: 2 }}>→</span>
                </div>
                <div style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 112, lineHeight: 0.9, letterSpacing: "0.02em", background: goldGrad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", whiteSpace: "nowrap" }}>
                  0<span style={{ fontSize: 58 }}>円</span>
                </div>
              </div>
            </div>

            {/* six items */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px 8px", marginTop: 34 }}>
              {c.offer.items.map((label, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: "1",
                    borderRadius: "50%",
                    background: "#FFFFFF",
                    border: "1px solid #E6E1D5",
                    boxShadow: "0 4px 12px rgba(70,72,60,0.06)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 7,
                    textAlign: "center",
                    padding: 8,
                  }}
                >
                  <span style={{ fontSize: 12, lineHeight: 1.4, color: "#4C4E45" }}>{nl(label)}</span>
                  <Icon>{offerIcons[i]}</Icon>
                </div>
              ))}
            </div>

            {/* photos */}
            <div style={{ display: "flex", gap: 10, marginTop: 24, alignItems: "flex-start" }}>
              <ImageSlot src={c.offer.photos[0].src} placeholder={c.offer.photos[0].placeholder} radius={8} style={{ flex: 1, height: 180 }} />
              <ImageSlot src={c.offer.photos[1].src} placeholder={c.offer.photos[1].placeholder} radius={8} style={{ flex: 1, height: 180, marginTop: 22 }} />
            </div>

            {/* さらに */}
            <div style={{ display: "flex", justifyContent: "center", margin: "30px 0 20px" }}>
              <div style={{ width: 66, height: 66, borderRadius: "50%", background: "#F7DBE2", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fontMincho, fontSize: 16, color: "#4A4E57", boxShadow: "0 4px 12px rgba(194,90,120,0.18)" }}>
                さらに
              </div>
            </div>

            {/* 入会金0円（体験当日のご入会限定・先着10名様） */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <span style={{ display: "inline-flex", alignItems: "center", background: accent, color: "#FFFFFF", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.04em", padding: "8px 18px", borderRadius: 999, boxShadow: `0 4px 12px ${accentGlow}`, whiteSpace: "nowrap" }}>
                体験当日のご入会限定・先着10名様
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: 8 }}>
                <span style={{ display: "block", textAlign: "center", background: "#4A4E57", color: "#FFFFFF", fontSize: 21, fontWeight: 700, letterSpacing: "0.34em", padding: "7px 16px 7px 22px", borderRadius: 4, whiteSpace: "nowrap" }}>
                  {c.offer.joinLabel}
                </span>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span style={{ fontSize: 11, color: "#62655B" }}>通常</span>
                  <span style={{ position: "relative", fontFamily: fontMincho, fontSize: 19, color: "#4A4E57" }}>
                    {c.offer.joinRegular}
                    <span style={{ fontSize: 11 }}>円</span>
                    <span style={{ position: "absolute", left: -2, right: -2, top: "55%", height: 1.5, background: "#C25B4B", transform: "rotate(-8deg)" }} />
                  </span>
                  <span style={{ fontSize: 10, color: "#9A9C90" }}>税込</span>
                  <span style={{ fontSize: 17, color: "#CE7C97", marginLeft: 2 }}>→</span>
                </div>
              </div>
              <div style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 112, lineHeight: 0.9, letterSpacing: "0.02em", background: goldGrad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                0<span style={{ fontSize: 56 }}>円</span>
              </div>
            </div>

            <GoldCta text={c.offer.ctaText} />
          </section>

          {/* ── ② about ── */}
          <section style={{ background: navyGrad, padding: "54px 26px" }}>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontFamily: fontMincho, fontWeight: 600, fontSize: 22, letterSpacing: "0.08em", color: "#FFFFFF", lineHeight: 1.5, margin: 0 }}>
                {nl(c.about.heading)}
              </h2>
              <div style={{ width: 30, height: 2, background: "rgba(255,255,255,0.55)", borderRadius: 2, margin: "14px auto 0" }} />
            </div>
            <div style={{ position: "relative", margin: "40px 8px 0" }}>
              <div style={{ position: "absolute", inset: "-12px -12px 12px 12px", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 4, pointerEvents: "none" }} />
              <ImageSlot src={c.about.photo.src} placeholder={c.about.photo.placeholder} radius={4} style={{ position: "relative", zIndex: 1, width: "100%", height: 300 }} />
              <div style={{ position: "absolute", zIndex: 2, bottom: 16, left: 16, background: "rgba(20,21,18,0.55)", backdropFilter: "blur(4px)", color: "#FFFFFF", padding: "8px 14px", borderRadius: 2 }}>
                <div style={{ fontFamily: fontMincho, fontSize: 13, letterSpacing: "0.14em" }}>{c.about.caption}</div>
              </div>
            </div>
            <p style={{ fontFamily: fontMincho, fontWeight: 600, fontSize: 21, lineHeight: 1.9, letterSpacing: "0.04em", textAlign: "center", margin: "40px 0 0", color: "#FFFFFF" }}>
              {nl(c.about.lead)}
            </p>
            <p style={{ fontSize: 13.5, lineHeight: 2.1, color: "rgba(255,255,255,0.78)", margin: "20px 0 0", textAlign: "center" }}>
              {c.about.body}
            </p>
          </section>

          {/* ── ③ worry ── */}
          <section style={{ background: creamGrad, padding: "54px 26px" }}>
            <SectionHeading text={c.worry.heading} fontSize={20} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 30 }}>
              {c.worry.cards.map((card, i) => (
                <div key={i} style={{ background: "#FCFBF7", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 14px rgba(70,72,60,0.07)" }}>
                  <ImageSlot src={card.img.src} placeholder={card.img.placeholder} style={{ width: "100%", height: 110 }} />
                  <p style={{ fontSize: 12.5, lineHeight: 1.7, color: "#4C4E45", margin: 0, padding: "16px 12px", textAlign: "center" }}>{nl(card.text)}</p>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", fontFamily: fontMincho, fontWeight: 600, fontSize: 20, letterSpacing: "0.06em", margin: "34px 0 0", color: "#33352E" }}>
              {c.worry.closingPre}
              <span style={{ display: "inline-block", background: accent, color: "#FFFFFF", padding: "4px 12px", borderRadius: 4, boxShadow: `0 4px 12px ${accentGlow}` }}>
                {c.worry.closingHighlight}
              </span>
            </p>
          </section>

          {/* ── ④ reasons ── */}
          <section style={{ background: "#FCFBF7", padding: "58px 26px 74px" }}>
            <SectionHeading text={c.reasons.heading} />
            {c.reasons.items.map((item, idx) => (
              <div key={idx} style={{ marginTop: idx === 0 ? 44 : 48 }}>
                <div style={{ position: "relative" }}>
                  <ImageSlot src={item.img.src} placeholder={item.img.placeholder} radius={16} style={{ width: "100%", height: 210 }} />
                  <div style={{ position: "absolute", top: -16, right: 16, width: 50, height: 50, transform: "rotate(45deg)", background: accent, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 6px 14px ${accentGlow}` }}>
                    <span style={{ transform: "rotate(-45deg)", fontFamily: fontGothic, fontWeight: 700, fontSize: 19, color: "#FFFFFF" }}>{item.num}</span>
                  </div>
                </div>
                <h3 style={{ fontFamily: fontGothic, fontWeight: 700, fontSize: 18, lineHeight: 1.6, letterSpacing: "0.04em", margin: "22px 0 0", color: "#33352E", textAlign: "center" }}>
                  {nl(item.title)}
                </h3>
                <div style={{ width: 40, height: 2, background: "#DAD5C9", margin: "12px auto 0" }} />
                <p style={{ fontSize: 13, lineHeight: 2, color: "#62655B", margin: item.trio ? "16px 0 20px" : "16px 0 0" }}>{item.body}</p>
                {item.trio && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                    {item.trio.map((t, i) => (
                      <div key={i} style={{ background: "#ECE8E0", borderRadius: 12, padding: "18px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" }}>
                        <span style={{ fontFamily: fontGothic, fontWeight: 700, fontSize: 16, color: accent }}>{t.label}</span>
                        <span style={{ fontSize: 9.3, lineHeight: 1.7, color: "#62655B" }}>{nl(t.desc)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <GoldCta text={c.reasons.ctaText} sub={c.reasons.ctaSub} />
          </section>

          {/* ── ④.5 trainers ── */}
          <section style={{ background: navyGrad, padding: "40px 0 48px" }}>
            <div style={{ textAlign: "center", padding: "0 26px" }}>
              <h2 style={{ fontFamily: fontMincho, fontWeight: 600, fontSize: 24, letterSpacing: "0.08em", color: "#FFFFFF", lineHeight: 1.4, margin: 0 }}>
                {c.trainers.heading}
              </h2>
              <div style={{ width: 30, height: 2, background: "rgba(255,255,255,0.55)", borderRadius: 2, margin: "14px auto 0" }} />
              <p style={{ fontSize: 13, lineHeight: 1.9, color: "rgba(255,255,255,0.78)", margin: "18px 0 0" }}>{nl(c.trainers.lead)}</p>
            </div>
            <div
              id="trainer-track"
              className="no-scrollbar"
              style={{ display: "flex", gap: 16, overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", padding: "30px 26px 8px" }}
            >
              {c.trainers.items.map((t, i) => (
                <div key={i} style={{ flex: "none", width: 244, scrollSnapAlign: "center", background: "#FFFFFF", borderRadius: 18, overflow: "hidden", boxShadow: "0 8px 22px rgba(70,72,60,0.10)" }}>
                  <ImageSlot src={t.img.src} placeholder={t.img.placeholder} style={{ width: "100%", height: 264 }} />
                  <div style={{ padding: "18px 20px 22px" }}>
                    <div style={{ fontSize: 11, letterSpacing: "0.14em", color: accent }}>{t.role}</div>
                    <div style={{ fontFamily: fontMincho, fontSize: 20, letterSpacing: "0.04em", color: "#33352E", marginTop: 6 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#9A9C90", marginTop: 2 }}>{t.nameEn}</div>
                    <p style={{ fontSize: 12.5, lineHeight: 1.9, color: "#62655B", margin: "12px 0 0" }}>{t.body}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                      {t.tags.map((tag, ti) => (
                        <span key={ti} style={{ fontSize: 10.5, letterSpacing: "0.02em", color: accent, border: `1px solid ${accentSoft}`, background: accentSoft, borderRadius: 999, padding: "4px 10px" }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 20 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "rgba(255,255,255,0.65)" }}>{c.trainers.swipeHint}</span>
            </div>
          </section>

          {/* ── ⑤ scenes ── */}
          <section style={{ background: creamGrad, padding: "54px 26px" }}>
            <SectionHeading text={c.scenes.heading} fontSize={20} />
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 32 }}>
              {c.scenes.items.map((s, i) => (
                <div key={i} style={{ background: "#FCFBF7", borderRadius: 16, overflow: "hidden", boxShadow: "0 6px 16px rgba(70,72,60,0.08)" }}>
                  <ImageSlot src={s.img.src} placeholder={s.img.placeholder} style={{ width: "100%", height: 180 }} />
                  <div style={{ padding: "18px 20px 20px" }}>
                    <p style={{ fontFamily: fontGothic, fontWeight: 700, fontSize: 16, letterSpacing: "0.03em", margin: 0, color: "#33352E" }}>{s.title}</p>
                    <p style={{ fontSize: 12.5, lineHeight: 1.9, color: "#62655B", margin: "7px 0 0" }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── ⑥ flow ── */}
          <section style={{ background: "#FCFBF7", padding: "54px 26px" }}>
            <SectionHeading text={c.flow.heading} />
            <div style={{ display: "flex", flexDirection: "column", marginTop: 34 }}>
              {c.flow.steps.map((step, i) => {
                const last = i === c.flow.steps.length - 1;
                return (
                  <div key={i} style={{ display: "flex", gap: 16 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
                      <span style={{ width: 44, height: 44, borderRadius: "50%", background: accent, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fontGothic, fontWeight: 700, fontSize: 18 }}>{step.num}</span>
                      {!last && <span style={{ width: 2, flex: 1, background: "#E1DCD0" }} />}
                    </div>
                    <div style={{ paddingBottom: last ? 0 : 28 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                        <h3 style={{ fontFamily: fontGothic, fontWeight: 700, fontSize: 16, letterSpacing: "0.03em", margin: 0, color: "#33352E" }}>{step.title}</h3>
                        <span style={{ fontSize: 11, color: "#9A9C90" }}>{step.time}</span>
                      </div>
                      <p style={{ fontSize: 12.5, lineHeight: 1.9, color: "#62655B", margin: "8px 0 0" }}>{step.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── ⑧ FAQ ── */}
          <section style={{ background: navyGrad, padding: "54px 26px" }}>
            <SectionHeading text={c.faq.heading} variant="white" />
            <FaqList items={c.faq.items} accent={accent} accentSoft={accentSoft} />
          </section>

          {/* ── ⑨ access ── */}
          <section id="access" style={{ background: creamGrad, padding: "54px 26px 64px" }}>
            <SectionHeading text={c.access.heading} />
            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 30 }}>
              {c.access.stores.map((store, i) => (
                <div key={i} style={{ background: "#FCFBF7", borderRadius: 16, overflow: "hidden", boxShadow: "0 6px 16px rgba(70,72,60,0.10)" }}>
                  <ImageSlot src={store.img.src} placeholder={store.img.placeholder} style={{ width: "100%", height: 160 }} />
                  <div style={{ padding: 20 }}>
                    <h3 style={{ fontFamily: fontGothic, fontWeight: 700, fontSize: 17, letterSpacing: "0.05em", margin: 0, color: "#33352E" }}>{store.name}</h3>
                    <p style={{ fontSize: 12, lineHeight: 1.9, color: "#62655B", margin: "8px 0 0" }}>
                      {store.address}
                      <br />
                      <span style={{ color: accent, fontWeight: 700 }}>{store.hours}</span>
                      {nl(store.route)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── ⑩ form ── */}
          <section id="form" style={{ background: "#FCFBF7", padding: "54px 26px" }}>
            <SectionHeading text={c.form.heading} />
            <p style={{ textAlign: "center", fontSize: 13, lineHeight: 1.9, color: "#62655B", margin: "18px 0 0" }}>{nl(c.form.lead)}</p>
            <LPForm
              clientSlug={c.slug}
              accent={accent}
              fields={c.form.fields}
              submitLabel={c.form.submitLabel}
              errorMessage={c.form.errorMessage}
              disclaimer={c.form.disclaimer ? nl(c.form.disclaimer) : undefined}
              thanksHref={`/${c.slug}/thanks`}
            />
          </section>
        </div>
      </div>

      <StickyFooterCTA
        anchor={c.sticky.anchor}
        buttonText={c.sticky.buttonText}
        showAfter={c.sticky.showAfter}
        buttonGradient={goldBtn}
        shadowColor="rgba(194,80,113,0.4)"
        borderColor="rgba(224,140,165,0.4)"
        offers={c.sticky.offers.map((o) => (
          <span key={o.label} style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
            <span style={{ fontSize: 11, color: "#62655B", letterSpacing: "0.02em" }}>{o.label}</span>
            <span style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 17, lineHeight: 1, color: "#C24F71" }}>{o.value}</span>
          </span>
        ))}
      />
    </LPShell>
  );
}
