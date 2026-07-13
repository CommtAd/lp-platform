import type { ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPForm from "@/components/LPForm";
import ImageSlot from "@/components/ImageSlot";
import FaqLight from "./FaqLight";
import StickyLight from "./StickyLight";
import config from "./config";

/* ── design tokens（白×青ベース、温活のベージュ／グリーンをアクセント） ── */
const blue = "#4E96C8";
const deep = "#23506E";
const ink = "#2E4552";
const dim = "#5D7180";
const tint = "#EFF6FA";
const line = "#DCE7EE";
const gold = "#B58A3C";
const beigeBg = "#FAF6EE";
const beigeLine = "#E7DCC4";
const green = "#6E9E85";
const greenBg = "#F2F7F3";
const pageBg = "#E8EFF4";
const ctaGrad = "linear-gradient(135deg, #D9B569 0%, #B5852F 100%)";

const fontMincho = "'Shippori Mincho', serif";
const fontGothic = "'Zen Kaku Gothic New', sans-serif";
const fontSans = "'Noto Sans JP', sans-serif";
const fontDisplay = "'Playfair Display', serif";

/** Render "\n"-separated text as line breaks. */
function nl(text: string): ReactNode {
  return text.split("\n").map((p, i, arr) => (
    <span key={i}>
      {p}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

/* ── icon library (line icons, 24x24, stroke-only) ────────────────────── */
const iconPaths: Record<string, ReactNode> = {
  check: <path d="M5 12.5l4.2 4.2L19 6.8" />,
  reformer: (
    <>
      <rect x="3" y="14" width="18" height="3" rx="1" />
      <path d="M5 17v3M19 17v3" />
      <path d="M6 14V9a1 1 0 011-1h4" />
    </>
  ),
  hanger: (
    <>
      <path d="M12 3.5a2.2 2.2 0 112.4 2.2c-1.2.3-2.4 1-2.4 2.3v.7" />
      <path d="M12 8.7l8.6 6.1c.9.6.4 2-.7 2H4.1c-1.1 0-1.6-1.4-.7-2z" />
    </>
  ),
  staff: (
    <>
      <circle cx="9" cy="5.5" r="2.2" />
      <path d="M9 7.7v6M6 10.5l3 1.5 3-1.5M9 13.7l-2 6M9 13.7l2 6" />
      <path d="M17.5 8.5c-1.3 0-2 .9-2 1.9 0 1.5 2 3.1 2 3.1s2-1.6 2-3.1c0-1-.7-1.9-2-1.9z" />
    </>
  ),
  monitor: (
    <>
      <rect x="3.5" y="4.5" width="17" height="11.5" rx="1.5" />
      <path d="M12 16v3.5M8.5 19.5h7" />
      <path d="M10.5 8l4 2.2-4 2.2z" />
    </>
  ),
  mirror: (
    <>
      <rect x="4" y="3.5" width="16" height="3.5" rx="1" />
      <path d="M8 9.5l-1 2M16 9.5l1 2" strokeDasharray="1.6 1.6" />
      <circle cx="12" cy="14" r="2" />
      <path d="M8.5 20.5a3.5 3.5 0 017 0" />
    </>
  ),
  yen: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 7l3.5 5 3.5-5M12 12v5M9.5 13.5h5M9.5 16h5" />
    </>
  ),
  document: (
    <>
      <path d="M6 3.5h9l3 3v14H6z" />
      <path d="M15 3.5v3h3" />
      <path d="M9 11h6M9 14h6M9 17h4" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5c2-1 5-1 8 0v13c-3-1-6-1-8 0z" />
      <path d="M20 5.5c-2-1-5-1-8 0v13c3-1 6-1 8 0z" />
    </>
  ),
  steam: (
    <>
      <path d="M8.5 3c-1 1.4.9 2.6 0 4M12 3c-1 1.4.9 2.6 0 4M15.5 3c-1 1.4.9 2.6 0 4" />
      <path d="M5 11h14l-1.6 7.4a2 2 0 01-2 1.6H8.6a2 2 0 01-2-1.6z" />
      <path d="M5 11h14" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M9.5 12l2 2 3-4" />
    </>
  ),
  sparkle: <path d="M12 3l1.2 4.8L18 9l-4.8 1.2L12 15l-1.2-4.8L6 9l4.8-1.2z" />,
  bag: (
    <>
      <path d="M5.5 8h13l-1 12h-11z" />
      <path d="M9 8V6.5a3 3 0 016 0V8" />
    </>
  ),
};

function Icon({ name, size = 24, color = blue }: { name: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {iconPaths[name]}
    </svg>
  );
}

/* ── shared building blocks ────────────────────────────────────────── */

function Eyebrow({ text, color = blue }: { text: string; color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 10 }}>
      <span style={{ width: 22, height: 1, background: color }} />
      <span style={{ fontFamily: fontGothic, fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", color }}>{text}</span>
      <span style={{ width: 22, height: 1, background: color }} />
    </div>
  );
}

function SectionHeading({ text, color = deep, fontSize = 23 }: { text: string; color?: string; fontSize?: number }) {
  return (
    <h2
      style={{
        fontFamily: fontMincho,
        fontWeight: 600,
        fontSize,
        letterSpacing: "0.05em",
        color,
        lineHeight: 1.5,
        margin: 0,
        textAlign: "center",
      }}
    >
      {nl(text)}
    </h2>
  );
}

/** 必須注釈文リスト（最低24px/1080px幅 ≒ 11px/480px幅 を満たすサイズ） */
function Notes({ items, align = "left" }: { items: string[]; align?: "left" | "center" }) {
  return (
    <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 4 }}>
      {items.map((n, i) => (
        <p key={i} style={{ fontSize: 11, lineHeight: 1.7, color: dim, margin: 0, textAlign: align }}>
          {n}
        </p>
      ))}
    </div>
  );
}

/** CTA直上の1周年リマインダー（今すぐ申し込む理由づけ） */
function CtaUrgency() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 26 }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 16px",
          borderRadius: 999,
          background: "#FFFFFF",
          border: `1px solid ${gold}66`,
          fontFamily: fontGothic,
          fontSize: 11.5,
          fontWeight: 700,
          color: gold,
          letterSpacing: "0.02em",
        }}
      >
        ＼ 1周年キャンペーンは8月31日まで ／
      </span>
    </div>
  );
}

function CtaButton({ text, withUrgency = true }: { text: string; withUrgency?: boolean }) {
  return (
    <>
      {withUrgency && <CtaUrgency />}
      <a
        href="#form"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          height: 58,
          marginTop: 10,
          background: ctaGrad,
          color: "#FFFFFF",
          textDecoration: "none",
          fontSize: 15.5,
          fontWeight: 700,
          letterSpacing: "0.04em",
          borderRadius: 999,
          boxShadow: "0 10px 22px rgba(180,135,60,0.35)",
        }}
      >
        {text}
        <span
          style={{
            display: "inline-flex",
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.25)",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
          }}
        >
          →
        </span>
      </a>
    </>
  );
}

/** 1周年記念バッジ（FV・キャンペーンで使用） */
function AnniversaryBadge({ size = 92 }: { size?: number }) {
  const b = config.fv.anniversaryBadge;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#FFFFFF",
        border: `2px solid ${gold}`,
        boxShadow: "0 4px 14px rgba(180,135,60,0.3)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 4,
          borderRadius: "50%",
          border: `1px solid ${gold}55`,
        }}
      />
      <span style={{ fontFamily: fontMincho, fontSize: size * 0.12, color: gold, letterSpacing: "0.2em" }}>{b.small}</span>
      <span style={{ fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: size * 0.3, lineHeight: 1, color: gold }}>
        {b.big}
      </span>
      <span style={{ fontFamily: fontGothic, fontSize: size * 0.085, fontWeight: 700, letterSpacing: "0.14em", color: gold }}>{b.en}</span>
    </div>
  );
}

export default function Page() {
  const c = config;
  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div style={{ fontFamily: fontSans, background: pageBg, minHeight: "100vh", color: ink }}>
        <div style={{ maxWidth: 480, margin: "0 auto", background: "#FFFFFF", overflow: "hidden", position: "relative", boxShadow: "0 0 30px rgba(35,80,110,0.08)" }}>
          {/* ── header ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "13px 18px", background: "#FFFFFF", borderBottom: `1px solid ${line}` }}>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontFamily: fontMincho, fontSize: 17, fontWeight: 600, letterSpacing: "0.1em", color: deep }}>{c.header.brand}</div>
              <div style={{ fontSize: 9, letterSpacing: "0.08em", color: dim, marginTop: 2 }}>{c.header.brandSub}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2, fontSize: 10.5, color: dim, whiteSpace: "nowrap" }}>
              {c.header.access.map((a) => (
                <span key={a.station}>
                  {a.station}
                  <b style={{ color: deep, marginLeft: 4 }}>{a.walk}</b>
                </span>
              ))}
            </div>
          </div>

          {/* ── 1周年キャンペーン帯 ── */}
          <div style={{ background: deep, textAlign: "center", padding: "10px 16px" }}>
            <p style={{ fontFamily: fontGothic, fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", color: "#F3D89A", margin: 0 }}>{c.offerBar.text}</p>
            <p style={{ fontSize: 10.5, letterSpacing: "0.06em", color: "rgba(255,255,255,0.85)", margin: "3px 0 0" }}>{c.offerBar.sub}</p>
          </div>

          {/* ── FV ── */}
          <section style={{ position: "relative", overflow: "hidden", background: tint }}>
            <div style={{ position: "relative", height: 300 }}>
              <ImageSlot
                src={c.fv.hero.src}
                placeholder={c.fv.hero.placeholder}
                objectPosition={c.fv.hero.position ?? "center"}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "#DDE9F1" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(239,246,250,0) 55%, rgba(239,246,250,0.9) 88%, #EFF6FA 100%)" }} />
              <div style={{ position: "absolute", top: 14, right: 14 }}>
                <AnniversaryBadge size={88} />
              </div>
            </div>
            <div style={{ position: "relative", padding: "0 22px 30px", marginTop: -34 }}>
              <span
                style={{
                  display: "inline-flex",
                  padding: "5px 14px",
                  borderRadius: 999,
                  background: deep,
                  color: "#FFFFFF",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                {c.fv.catchTop}
              </span>
              <h1 style={{ fontFamily: fontMincho, fontWeight: 600, fontSize: 22.5, lineHeight: 1.55, letterSpacing: "0.02em", color: deep, margin: "12px 0 0", whiteSpace: "nowrap" }}>
                {c.fv.catchLines[0]}
                <br />
                <span style={{ fontSize: 28, color: blue }}>{c.fv.catchLines[1]}</span>
              </h1>

              {/* 体験0円カード */}
              <div
                style={{
                  marginTop: 18,
                  background: "#FFFFFF",
                  border: `1.5px solid ${blue}55`,
                  borderRadius: 16,
                  boxShadow: "0 8px 22px rgba(35,80,110,0.1)",
                  padding: "16px 18px 14px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ padding: "4px 12px", borderRadius: 999, background: `${blue}18`, color: deep, fontSize: 12, fontWeight: 700 }}>{c.fv.trial.label}</span>
                  <span style={{ padding: "4px 12px", borderRadius: 999, background: `${green}20`, color: "#48705C", fontSize: 12, fontWeight: 700 }}>{c.fv.trial.time}</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 6, marginTop: 8 }}>
                  <span style={{ fontFamily: fontMincho, fontSize: 19, fontWeight: 600, color: deep, marginBottom: 10 }}>いつでも</span>
                  <span style={{ fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: 72, lineHeight: 1, color: blue }}>{c.fv.trial.price}</span>
                  <span style={{ fontFamily: fontMincho, fontSize: 26, fontWeight: 600, color: deep, marginBottom: 6 }}>
                    {c.fv.trial.unit}
                    <span style={{ fontSize: 11, color: dim, marginLeft: 4 }}>（税込）</span>
                  </span>
                </div>
              </div>

              {/* よもぎ蒸しフック */}
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: beigeBg,
                  border: `1px solid ${beigeLine}`,
                  borderRadius: 14,
                  padding: "12px 14px",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "#FFFFFF",
                    border: `1px solid ${beigeLine}`,
                  }}
                >
                  <Icon name="steam" size={24} color={gold} />
                </span>
                <div>
                  <span style={{ display: "inline-flex", padding: "2px 10px", borderRadius: 999, background: gold, color: "#FFFFFF", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em" }}>
                    {c.fv.yomogiBadge.label}
                  </span>
                  <p style={{ fontFamily: fontGothic, fontSize: 13, fontWeight: 700, lineHeight: 1.55, color: "#7A5E28", margin: "5px 0 0" }}>{nl(c.fv.yomogiBadge.text)}</p>
                </div>
              </div>

              {/* tags */}
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                {c.fv.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      flex: 1,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "8px 4px",
                      borderRadius: 999,
                      border: `1px solid ${blue}55`,
                      background: "#FFFFFF",
                      color: deep,
                      fontSize: 11.5,
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <CtaButton text={c.fv.ctaText} withUrgency={false} />
              <Notes items={c.fv.notes} />
            </div>
          </section>

          {/* ── 実績 ── */}
          <section style={{ background: deep, padding: "26px 22px 20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {c.stats.items.map((s) => (
                <div key={s.num} style={{ textAlign: "center", padding: "14px 6px", borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" }}>
                  <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.85)" }}>{s.pre}</div>
                  <div style={{ marginTop: 2 }}>
                    <span style={{ fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: 36, lineHeight: 1, color: "#F3D89A" }}>{s.num}</span>
                    <span style={{ fontFamily: fontMincho, fontSize: 16, color: "#FFFFFF", marginLeft: 3 }}>{s.unit}</span>
                    <span style={{ fontFamily: fontMincho, fontSize: 13, color: "rgba(255,255,255,0.9)", marginLeft: 2 }}>{s.post}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 3 }}>
              {c.stats.items.map((s) => (
                <p key={s.note} style={{ fontSize: 11, lineHeight: 1.6, color: "rgba(255,255,255,0.65)", margin: 0 }}>
                  {s.note}
                </p>
              ))}
            </div>
          </section>

          {/* ── worry ── */}
          <section style={{ padding: "44px 22px 40px", background: "#FFFFFF" }}>
            <SectionHeading text={c.worry.heading} />
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
              {c.worry.items.map((w) => (
                <div key={w} style={{ display: "flex", alignItems: "center", gap: 12, background: tint, borderRadius: 12, padding: "13px 16px" }}>
                  <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: "50%", background: blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="check" size={14} color="#FFFFFF" />
                  </span>
                  <span style={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.6, color: ink }}>{w}</span>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", fontFamily: fontMincho, fontSize: 19, fontWeight: 600, lineHeight: 1.7, color: deep, margin: "26px 0 0" }}>
              {c.worry.closingPre}
              <br />
              <span style={{ fontSize: 18, whiteSpace: "nowrap", color: blue, background: `linear-gradient(transparent 62%, ${blue}22 62%)` }}>{c.worry.closingHighlight}</span>
            </p>
          </section>

          {/* ── 体験オファー ── */}
          <section style={{ padding: "44px 22px 46px", background: tint }}>
            <Eyebrow text={c.trial.eyebrow} />
            <h2 style={{ fontFamily: fontMincho, fontWeight: 600, fontSize: 23, letterSpacing: "0.04em", lineHeight: 1.5, color: deep, margin: 0, textAlign: "center" }}>
              {c.trial.headingPre}
              <br />
              <span style={{ fontSize: 30, color: blue }}>{c.trial.headingHighlight}</span>
            </h2>
            <p style={{ textAlign: "center", fontSize: 12.5, lineHeight: 1.95, color: dim, margin: "16px 0 0" }}>{nl(c.trial.lead)}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 22 }}>
              {c.trial.photos.map((p, i) => (
                <ImageSlot key={i} src={p.src} placeholder={p.placeholder} objectPosition={p.position ?? "center"} radius={14} style={{ width: "100%", height: 130, background: "#DDE9F1" }} />
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 18 }}>
              {c.trial.items.map((item) => (
                <div key={item.title} style={{ display: "flex", gap: 14, background: "#FFFFFF", borderRadius: 14, border: `1px solid ${line}`, padding: "16px 16px" }}>
                  <span style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 46, height: 46, borderRadius: "50%", background: `${blue}14`, border: `1px solid ${blue}33` }}>
                    <Icon name={item.icon} size={24} color={blue} />
                  </span>
                  <div>
                    <h3 style={{ fontFamily: fontGothic, fontSize: 14.5, fontWeight: 700, color: deep, margin: 0 }}>{item.title}</h3>
                    <p style={{ fontSize: 12.5, lineHeight: 1.8, color: dim, margin: "5px 0 0" }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <Notes items={c.trial.notes} />
            <CtaButton text={c.trial.ctaText} />
          </section>

          {/* ── 1周年キャンペーン ── */}
          <section style={{ padding: "0 0 46px", background: beigeBg }}>
            {/* リボン */}
            <div style={{ background: `linear-gradient(135deg, #C9A254 0%, ${gold} 100%)`, textAlign: "center", padding: "16px 20px 14px" }}>
              <div style={{ fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: 26, color: "#FFFFFF", lineHeight: 1.1 }}>{c.campaign.ribbonEn}</div>
              <div style={{ fontFamily: fontMincho, fontSize: 14, fontWeight: 600, letterSpacing: "0.14em", color: "#FFF7E6", marginTop: 5 }}>{c.campaign.ribbonJa}</div>
            </div>

            <div style={{ padding: "26px 22px 0" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 18px", borderRadius: 999, background: "#FFFFFF", border: `1px solid ${beigeLine}` }}>
                  <Icon name="clock" size={15} color={gold} />
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: "#7A5E28" }}>{c.campaign.period}</span>
                </span>
              </div>
              <p style={{ textAlign: "center", fontSize: 11.5, color: "#9B824F", margin: "8px 0 0" }}>{c.campaign.periodNote}</p>

              <h2 style={{ fontFamily: fontMincho, fontWeight: 600, fontSize: 22, letterSpacing: "0.04em", lineHeight: 1.55, color: "#6B4F1D", margin: "20px 0 0", textAlign: "center" }}>
                {nl(c.campaign.heading)}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
                {c.campaign.mains.map((m) => (
                  <div key={m.label} style={{ display: "flex", alignItems: "center", gap: 14, background: "#FFFFFF", border: `1.5px solid ${gold}66`, borderRadius: 14, padding: "16px 18px", boxShadow: "0 4px 14px rgba(180,135,60,0.12)" }}>
                    <span style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg, #C9A254 0%, ${gold} 100%)`, color: "#FFFFFF", fontFamily: fontMincho, fontSize: 15, fontWeight: 600 }}>
                      {m.label}
                    </span>
                    <span style={{ fontFamily: fontGothic, fontSize: 21, fontWeight: 800, color: "#6B4F1D", letterSpacing: "0.01em" }}>
                      {m.value}
                      {m.suffix && <span style={{ fontSize: 11, fontWeight: 500, color: "#9B824F", marginLeft: 4 }}>{m.suffix}</span>}
                    </span>
                  </div>
                ))}
              </div>

              <p style={{ textAlign: "center", fontFamily: fontMincho, fontSize: 15, fontWeight: 600, color: "#6B4F1D", margin: "26px 0 0" }}>{c.campaign.benefitsHeading}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
                {c.campaign.benefits.map((b) => (
                  <div key={b.title} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#FFFFFF", borderRadius: 12, border: `1px solid ${beigeLine}`, padding: "13px 14px" }}>
                    <span style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 10, background: beigeBg, border: `1px solid ${beigeLine}` }}>
                      <Icon name={b.icon} size={20} color={gold} />
                    </span>
                    <div>
                      <h3 style={{ fontFamily: fontGothic, fontSize: 13.5, fontWeight: 700, color: "#6B4F1D", margin: 0 }}>{b.title}</h3>
                      <p style={{ fontSize: 11.5, lineHeight: 1.7, color: "#8A754C", margin: "3px 0 0" }}>{b.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Notes items={c.campaign.notes} />
              <CtaButton text={c.campaign.ctaText} withUrgency={false} />
            </div>
          </section>

          {/* ── メソッド1: 動画×スタッフサポート ── */}
          <section style={{ padding: "44px 22px 44px", background: "#FFFFFF" }}>
            <Eyebrow text={c.method1.eyebrow} />
            <SectionHeading text={c.method1.heading} />
            <ImageSlot src={c.method1.img.src} placeholder={c.method1.img.placeholder} objectPosition={c.method1.img.position ?? "center"} radius={16} style={{ width: "100%", height: 200, background: "#DDE9F1", marginTop: 22 }} />
            <p style={{ fontSize: 13, lineHeight: 2, color: ink, margin: "18px 0 0" }}>{c.method1.body}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
              {c.method1.points.map((p) => (
                <div key={p.label} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: tint, borderRadius: 12, padding: "13px 14px" }}>
                  <span style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", background: "#FFFFFF", border: `1px solid ${blue}44` }}>
                    <Icon name={p.icon} size={21} color={blue} />
                  </span>
                  <div>
                    <h3 style={{ fontFamily: fontGothic, fontSize: 13.5, fontWeight: 700, color: deep, margin: 0 }}>{p.label}</h3>
                    <p style={{ fontSize: 11.5, lineHeight: 1.7, color: dim, margin: "3px 0 0" }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* スタッフメッセージ */}
            <div style={{ marginTop: 18, borderRadius: 14, border: `1px solid ${line}`, background: "#FFFFFF", boxShadow: "0 4px 14px rgba(35,80,110,0.06)", padding: "18px 18px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name="sparkle" size={16} color={blue} />
                <span style={{ fontFamily: fontGothic, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: blue }}>{c.method1.message.title}</span>
              </div>
              <p style={{ fontFamily: fontMincho, fontSize: 13.5, fontWeight: 500, lineHeight: 2, color: ink, margin: "10px 0 0" }}>{c.method1.message.body}</p>
              <p style={{ fontSize: 11, lineHeight: 1.7, color: dim, margin: "10px 0 0" }}>{c.method1.message.from}</p>
            </div>

            <Notes items={[c.method1.note]} />
          </section>

          {/* ── メソッド2: よもぎ蒸し ── */}
          <section style={{ padding: "44px 22px 44px", background: greenBg }}>
            <Eyebrow text={c.method2.eyebrow} color={green} />
            <SectionHeading text={c.method2.heading} color="#3F6350" />
            <div style={{ position: "relative", marginTop: 22 }}>
              <ImageSlot src={c.method2.img.src} placeholder={c.method2.img.placeholder} objectPosition={c.method2.img.position ?? "center"} radius={16} style={{ width: "100%", height: 200, background: "#E2ECE4" }} />
              <span
                style={{
                  position: "absolute",
                  top: -12,
                  left: 14,
                  display: "inline-flex",
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: gold,
                  color: "#FFFFFF",
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  boxShadow: "0 4px 10px rgba(180,135,60,0.35)",
                }}
              >
                {c.method2.badge}
              </span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 2, color: "#42584C", margin: "18px 0 0" }}>{c.method2.body}</p>
            <Notes items={[c.method2.note]} />
          </section>

          {/* ── 手ぶら訴求 ── */}
          <section style={{ padding: "44px 22px 44px", background: "#FFFFFF" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: "50%", background: `${green}1A`, border: `1px solid ${green}55` }}>
                <Icon name="bag" size={26} color={green} />
              </span>
            </div>
            <SectionHeading text={c.tebura.heading} />
            <p style={{ fontSize: 13, lineHeight: 2, color: ink, margin: "16px 0 0", textAlign: "center" }}>{c.tebura.body}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "center" }}>
              {c.tebura.scenes.map((s) => (
                <span key={s} style={{ padding: "8px 14px", borderRadius: 999, background: greenBg, border: `1px solid ${green}44`, color: "#48705C", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
                  {s}
                </span>
              ))}
            </div>
            <ImageSlot src={c.tebura.img.src} placeholder={c.tebura.img.placeholder} objectPosition={c.tebura.img.position ?? "center"} radius={16} style={{ width: "100%", height: 170, background: "#E2ECE4", marginTop: 18 }} />
          </section>

          {/* ── 選ばれる5つの理由 ── */}
          <section style={{ padding: "44px 22px 50px", background: tint }}>
            <Eyebrow text="REASON" />
            <SectionHeading text={c.reasons.heading} />
            {c.reasons.items.map((item) => (
              <div key={item.num} style={{ marginTop: 34 }}>
                <div style={{ position: "relative" }}>
                  <ImageSlot src={item.img.src} placeholder={item.img.placeholder} objectPosition={item.img.position ?? "center"} radius={16} style={{ width: "100%", height: 190, background: "#DDE9F1" }} />
                  <span
                    style={{
                      position: "absolute",
                      top: -12,
                      left: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: deep,
                      border: "2px solid #FFFFFF",
                      boxShadow: "0 4px 10px rgba(35,80,110,0.3)",
                    }}
                  >
                    <span style={{ fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: 16, color: "#F3D89A" }}>{item.num}</span>
                  </span>
                </div>
                <h3 style={{ fontFamily: fontMincho, fontWeight: 600, fontSize: 18, lineHeight: 1.65, letterSpacing: "0.02em", margin: "16px 0 0", color: deep, textAlign: "center" }}>
                  {nl(item.title)}
                </h3>
                <div style={{ width: 36, height: 2, background: blue, margin: "12px auto 0", borderRadius: 2 }} />
                <p style={{ fontSize: 12.5, lineHeight: 1.95, color: ink, margin: "14px 0 0" }}>{item.body}</p>
              </div>
            ))}
            <CtaButton text={c.reasons.ctaText} />
            <p style={{ textAlign: "center", fontSize: 11.5, color: dim, margin: "10px 0 0" }}>{c.reasons.ctaSub}</p>
          </section>

          {/* ── お客様の声 ── */}
          <section style={{ padding: "44px 22px 44px", background: "#FFFFFF" }}>
            <Eyebrow text="VOICE" />
            <SectionHeading text={c.voices.heading} />
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 24 }}>
              {c.voices.items.map((v) => (
                <div key={v.meta} style={{ background: tint, borderRadius: 16, padding: "20px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ padding: "4px 12px", borderRadius: 999, background: deep, color: "#FFFFFF", fontSize: 11, fontWeight: 700 }}>{v.meta}</span>
                    <span style={{ fontSize: 11.5, color: dim }}>お悩み：{v.worry}</span>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 2, color: ink, margin: "12px 0 0" }}>{v.comment}</p>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: deep, margin: "22px 0 0" }}>{c.voices.chipsHeading}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 10, justifyContent: "center", flexWrap: "wrap" }}>
              {c.voices.chips.map((chip) => (
                <span key={chip} style={{ padding: "7px 13px", borderRadius: 999, background: "#FFFFFF", border: `1px solid ${blue}44`, color: deep, fontSize: 11.5, fontWeight: 500 }}>
                  「{chip}」
                </span>
              ))}
            </div>
            <Notes items={c.voices.notes} align="center" />
          </section>

          {/* ── 体験の流れ ── */}
          <section style={{ padding: "44px 22px 44px", background: tint }}>
            <Eyebrow text="FLOW" />
            <SectionHeading text={c.flow.heading} />
            <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 26 }}>
              {c.flow.steps.map((s, i) => (
                <div key={s.num} style={{ display: "flex", gap: 16 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", background: deep, color: "#FFFFFF", fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: 17 }}>
                      {s.num}
                    </span>
                    {i < c.flow.steps.length - 1 && <span style={{ width: 2, flex: 1, background: `${blue}44`, margin: "6px 0" }} />}
                  </div>
                  <div style={{ paddingBottom: i < c.flow.steps.length - 1 ? 24 : 0 }}>
                    <h3 style={{ fontFamily: fontGothic, fontSize: 15, fontWeight: 700, color: deep, margin: "8px 0 0" }}>{s.title}</h3>
                    <p style={{ fontSize: 12.5, lineHeight: 1.85, color: dim, margin: "6px 0 0" }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <Notes items={[c.flow.note]} />
          </section>

          {/* ── FAQ ── */}
          <section style={{ padding: "44px 22px 44px", background: "#FFFFFF" }}>
            <Eyebrow text="FAQ" />
            <SectionHeading text={c.faq.heading} />
            <div style={{ marginTop: 24 }}>
              <FaqLight items={c.faq.items} accent={blue} />
            </div>
          </section>

          {/* ── 店舗案内 ── */}
          <section id="access" style={{ padding: "44px 22px 46px", background: tint }}>
            <Eyebrow text="ACCESS" />
            <SectionHeading text={c.access.heading} />
            <div style={{ marginTop: 24, borderRadius: 16, overflow: "hidden", background: "#FFFFFF", border: `1px solid ${line}`, boxShadow: "0 4px 16px rgba(35,80,110,0.08)" }}>
              <ImageSlot src={c.access.store.img.src} placeholder={c.access.store.img.placeholder} style={{ width: "100%", height: 180, background: "#DDE9F1" }} />
              <div style={{ padding: "20px 20px 22px" }}>
                <h3 style={{ fontFamily: fontMincho, fontWeight: 600, fontSize: 18, letterSpacing: "0.06em", margin: 0, color: deep }}>{c.access.store.name}</h3>
                <p style={{ fontSize: 12.5, lineHeight: 2, color: ink, margin: "10px 0 0" }}>
                  {c.access.store.address}
                  <br />
                  <b style={{ color: deep }}>{c.access.store.hours}</b>｜{c.access.store.holiday}
                  <br />
                  {c.access.store.route}
                </p>
                <p style={{ fontSize: 11, lineHeight: 1.7, color: dim, margin: "8px 0 0" }}>{c.access.store.lessonNote}</p>
              </div>
            </div>
          </section>

          {/* ── form ── */}
          <section id="form" style={{ padding: "44px 22px 50px", background: "#FFFFFF" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 18px", borderRadius: 999, background: `${gold}14`, border: `1px solid ${gold}55`, color: gold, fontSize: 12, fontWeight: 700, letterSpacing: "0.02em" }}>
                ＼ 1周年キャンペーンは8月31日まで ／
              </span>
            </div>
            <Eyebrow text="RESERVATION" />
            <SectionHeading text={c.form.heading} />
            <p style={{ textAlign: "center", fontSize: 12.5, lineHeight: 2, color: dim, margin: "16px 0 0" }}>{nl(c.form.lead)}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, margin: "18px 0 0" }}>
              {c.sticky.offers.map((o) => (
                <span key={o.label} style={{ display: "inline-flex", alignItems: "baseline", gap: 6, padding: "8px 18px", borderRadius: 12, border: `1.5px solid ${blue}66`, background: tint }}>
                  <span style={{ fontSize: 11, color: dim }}>{o.label}</span>
                  <span style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: 18, color: deep }}>{o.value}</span>
                </span>
              ))}
            </div>
            <LPForm
              clientSlug={c.slug}
              accent={blue}
              fields={c.form.fields}
              submitLabel={c.form.submitLabel}
              errorMessage={c.form.errorMessage}
              disclaimer={c.form.disclaimer}
              submitStyle={{ background: ctaGrad, boxShadow: "0 10px 22px rgba(180,135,60,0.35)", letterSpacing: "0.06em", whiteSpace: "nowrap" }}
            />
          </section>

          {/* ── footer ── */}
          <footer style={{ background: deep, padding: "26px 22px 30px", textAlign: "center" }}>
            {c.footer.lines.map((l, i) => (
              <p key={l} style={{ fontSize: i === 0 ? 14 : 11, fontFamily: i === 0 ? fontMincho : fontSans, letterSpacing: i === 0 ? "0.12em" : "0.03em", color: i === 0 ? "#FFFFFF" : "rgba(255,255,255,0.7)", lineHeight: 1.8, margin: i === 0 ? 0 : "4px 0 0" }}>
                {l}
              </p>
            ))}
          </footer>
        </div>
      </div>

      <StickyLight
        offers={c.sticky.offers}
        buttonText={c.sticky.buttonText}
        anchor={c.sticky.anchor}
        accent={deep}
        gradient={ctaGrad}
        showAfter={0}
      />
    </LPShell>
  );
}
