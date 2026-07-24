import type { ReactNode } from "react";
import LPShell from "@/components/LPShell";
import ImageSlot from "@/components/ImageSlot";
import LPForm from "@/components/LPForm";
import Faq from "./Faq";
import Sticky from "./Sticky";
import config from "./config";

/* ── design tokens（白×クリーム基調・上品なゴールド／チャコール） ── */
const ink = "#2E2A24";
const dim = "#7A7364";
const gold = "#A9863A";
const goldSoft = "#C0A15A";
const deep = "#26231D";
const cream = "#FAF6EE";
const creamLine = "#E7DCC4";
const line = "#EAE3D3";
const pageBg = "#EFE8DA";
const ctaGrad = "linear-gradient(135deg, #CBA95E 0%, #9C7C2E 100%)";

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
  posture: (
    <>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7.5c-2 0-3 1.4-3 3.2 0 1.4.7 2.1.7 3.6L9 21M12 7.5c2 0 3 1.4 3 3.2 0 1.4-.7 2.1-.7 3.6L15 21" />
    </>
  ),
  body: (
    <>
      <path d="M12 3.2c-3.5 1.2-5.5 4-5.5 8.3S8.5 19 12 20.8c3.5-1.8 5.5-4.8 5.5-9.3S15.5 4.4 12 3.2z" />
      <path d="M12 3.6v16.8" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20s-6.5-4.2-8.4-8.2C2.2 8.9 3.7 6 6.6 6c1.8 0 3 1 5.4 3.2C14.4 7 15.6 6 17.4 6c2.9 0 4.4 2.9 3 5.8C18.5 15.8 12 20 12 20z" />
    </>
  ),
  run: (
    <>
      <circle cx="14" cy="4.5" r="1.6" />
      <path d="M13 8l-3 2.5 2.5 2 1 5M13 8l3 1.5 2 2M12.5 12.5L9 18M8 9.5l-2 2.5" />
    </>
  ),
  spine: (
    <>
      <path d="M12 3v18" />
      <path d="M9 5h6M8.5 8.5h7M8 12h8M8.5 15.5h7M9 19h6" />
    </>
  ),
  heal: (
    <>
      <path d="M12 20s-6.5-4.2-8.4-8.2C2.2 8.9 3.7 6 6.6 6c1.8 0 3 1 5.4 3.2C14.4 7 15.6 6 17.4 6c2.9 0 4.4 2.9 3 5.8C18.5 15.8 12 20 12 20z" />
      <path d="M8 12h2l1-2 2 4 1-2h2" />
    </>
  ),
  talk: (
    <>
      <path d="M4 5.5h16v10H9l-4 3.5v-3.5H4z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  reformer: (
    <>
      <rect x="3" y="14" width="18" height="3" rx="1" />
      <path d="M5 17v3M19 17v3" />
      <path d="M6 14V9a1 1 0 011-1h4" />
    </>
  ),
  feedback: (
    <>
      <path d="M6 3.5h9l3 3v14H6z" />
      <path d="M15 3.5v3h3" />
      <path d="M9 11l1.5 1.5L13 10M9 15h6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  sparkle: <path d="M12 3l1.2 4.8L18 9l-4.8 1.2L12 15l-1.2-4.8L6 9l4.8-1.2z" />,
  pin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  yen: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 7l3.5 5 3.5-5M12 12v5M9.5 13.5h5M9.5 16h5" />
    </>
  ),
};

function Icon({ name, size = 24, color = gold }: { name: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {iconPaths[name]}
    </svg>
  );
}

/* ── shared building blocks ────────────────────────────────────────── */

function Eyebrow({ text, color = gold }: { text: string; color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
      <span style={{ width: 22, height: 1, background: color }} />
      <span style={{ fontFamily: fontGothic, fontSize: 11, fontWeight: 700, letterSpacing: "0.24em", color }}>{text}</span>
      <span style={{ width: 22, height: 1, background: color }} />
    </div>
  );
}

function SectionHeading({ text, color = ink, fontSize = 23 }: { text: string; color?: string; fontSize?: number }) {
  return (
    <h2
      style={{
        fontFamily: fontMincho,
        fontWeight: 600,
        fontSize,
        letterSpacing: "0.06em",
        color,
        lineHeight: 1.55,
        margin: 0,
        textAlign: "center",
      }}
    >
      {nl(text)}
    </h2>
  );
}

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
        ＼ 2026.8.1 GRAND OPEN・オープン記念キャンペーン実施中 ／
      </span>
    </div>
  );
}

function CtaButton({ text, withUrgency = true }: { text: string; withUrgency?: boolean }) {
  return (
    <>
      {withUrgency && <CtaUrgency />}
      <a
        href={config.sticky.anchor}
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
          boxShadow: "0 10px 22px rgba(160,120,40,0.35)",
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

/** グランドオープン記念バッジ（FVで使用） */
function OpenBadge({ size = 92 }: { size?: number }) {
  const b = config.fv.openBadge;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: deep,
        border: `2px solid ${goldSoft}`,
        boxShadow: "0 6px 16px rgba(38,35,29,0.35)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", inset: 4, borderRadius: "50%", border: `1px solid ${goldSoft}55` }} />
      <span style={{ fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: size * 0.15, lineHeight: 1, color: goldSoft }}>{b.small}</span>
      <span style={{ fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: size * 0.32, lineHeight: 1, color: "#FFFFFF" }}>{b.big}</span>
      <span style={{ fontFamily: fontGothic, fontSize: size * 0.082, fontWeight: 700, letterSpacing: "0.12em", color: goldSoft, marginTop: 2 }}>{b.en}</span>
    </div>
  );
}

export default function Page() {
  const c = config;
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(c.access.store.mapQuery)}&output=embed`;

  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div style={{ fontFamily: fontSans, background: pageBg, minHeight: "100vh", color: ink }}>
        <div style={{ maxWidth: 480, margin: "0 auto", background: "#FFFFFF", overflow: "hidden", position: "relative", boxShadow: "0 0 30px rgba(120,95,40,0.08)" }}>
          {/* ── header ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "13px 18px", background: "#FFFFFF", borderBottom: `1px solid ${line}` }}>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontFamily: fontDisplay, fontStyle: "italic", fontSize: 19, fontWeight: 700, letterSpacing: "0.04em", color: deep }}>{c.header.brand}</div>
              <div style={{ fontSize: 9, letterSpacing: "0.06em", color: dim, marginTop: 2 }}>{c.header.brandSub}</div>
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

          {/* ── オープン記念オファー帯 ── */}
          <div style={{ background: deep, textAlign: "center", padding: "10px 16px" }}>
            <p style={{ fontFamily: fontGothic, fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", color: goldSoft, margin: 0 }}>{c.offerBar.text}</p>
            <p style={{ fontSize: 10.5, letterSpacing: "0.04em", color: "rgba(255,255,255,0.85)", margin: "3px 0 0" }}>{c.offerBar.sub}</p>
          </div>

          {/* ── FV ── */}
          <section style={{ position: "relative", overflow: "hidden", background: cream }}>
            <div style={{ position: "relative", height: 320 }}>
              <ImageSlot
                src={c.fv.hero.src}
                placeholder={c.fv.hero.placeholder}
                objectPosition={c.fv.hero.position ?? "center"}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "#E4DCCB" }}
              />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(250,246,238,0) 52%, rgba(250,246,238,0.9) 86%, ${cream} 100%)` }} />
              <div style={{ position: "absolute", top: 14, right: 14 }}>
                <OpenBadge size={88} />
              </div>
              <div style={{ position: "absolute", left: 18, bottom: 44 }}>
                <span style={{ display: "inline-flex", padding: "5px 14px", borderRadius: 999, background: deep, color: "#FFFFFF", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>
                  {c.fv.catchTop}
                </span>
              </div>
            </div>
            <div style={{ position: "relative", padding: "0 22px 30px", marginTop: -20 }}>
              <h1 style={{ fontFamily: fontMincho, fontWeight: 600, fontSize: 58, lineHeight: 1.28, letterSpacing: "0.16em", color: deep, margin: "0" }}>
                {c.fv.catchLines[0]}
                <br />
                {c.fv.catchLines[1]}
                <br />
                <span style={{ color: gold }}>{c.fv.catchLines[2]}</span>
              </h1>
              <p style={{ fontSize: 13, lineHeight: 1.95, color: dim, margin: "14px 0 0" }}>{c.fv.lead}</p>

              {/* 体験オープン記念価格カード */}
              <div
                style={{
                  marginTop: 18,
                  background: "#FFFFFF",
                  border: `1.5px solid ${gold}55`,
                  borderRadius: 16,
                  boxShadow: "0 8px 22px rgba(120,95,40,0.12)",
                  padding: "16px 18px 14px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ padding: "4px 12px", borderRadius: 999, background: `${gold}18`, color: "#7A5E28", fontSize: 12, fontWeight: 700 }}>{c.fv.trial.label}</span>
                  <span style={{ padding: "4px 12px", borderRadius: 999, background: deep, color: "#FFFFFF", fontSize: 12, fontWeight: 700 }}>{c.fv.trial.time}</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 6, marginTop: 10 }}>
                  <span style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 11, color: dim }}>通常</span>
                    <span style={{ fontFamily: fontMincho, fontSize: 17, color: dim, textDecoration: "line-through", textDecorationColor: `${dim}99`, whiteSpace: "nowrap" }}>{c.fv.trial.normal}円</span>
                  </span>
                  <span style={{ fontSize: 20, color: gold, marginBottom: 18 }}>→</span>
                  <span style={{ fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: 60, lineHeight: 0.9, color: gold }}>{c.fv.trial.price}</span>
                  <span style={{ fontFamily: fontMincho, fontSize: 22, fontWeight: 600, color: deep, marginBottom: 6, whiteSpace: "nowrap" }}>
                    {c.fv.trial.unit}
                    <span style={{ fontSize: 10, color: dim, marginLeft: 3 }}>{c.fv.trial.priceNote}</span>
                  </span>
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
                      border: `1px solid ${gold}55`,
                      background: "#FFFFFF",
                      color: "#6B5A34",
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

          {/* ── コンセプト ── */}
          <section style={{ background: deep, padding: "48px 24px 46px", textAlign: "center" }}>
            <Eyebrow text={c.philosophy.eyebrow} color={goldSoft} />
            <h2 style={{ fontFamily: fontMincho, fontWeight: 600, fontSize: 21, letterSpacing: "0.03em", lineHeight: 1.75, color: "#FFFFFF", margin: 0 }}>
              {nl(c.philosophy.heading)}
            </h2>
            <div style={{ width: 40, height: 1, background: goldSoft, margin: "20px auto" }} />
            <p style={{ fontSize: 13, lineHeight: 2.1, color: "rgba(255,255,255,0.82)", margin: 0, textAlign: "left" }}>{c.philosophy.body}</p>
          </section>

          {/* ── 悩み共感 ── */}
          <section style={{ padding: "46px 22px 42px", background: "#FFFFFF" }}>
            <SectionHeading text={c.worry.heading} />
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
              {c.worry.items.map((w) => (
                <div key={w.text} style={{ display: "flex", alignItems: "center", gap: 12, background: cream, borderRadius: 12, padding: "13px 16px", border: `1px solid ${creamLine}` }}>
                  <span style={{ flexShrink: 0, width: 40, height: 40, borderRadius: "50%", background: "#FFFFFF", border: `1px solid ${gold}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={w.icon} size={22} color={gold} />
                  </span>
                  <span style={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.6, color: ink }}>{w.text}</span>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", fontFamily: fontMincho, fontSize: 19, fontWeight: 600, lineHeight: 1.7, color: deep, margin: "26px 0 0" }}>
              {c.worry.closingPre}
              <br />
              <span style={{ fontSize: 20, whiteSpace: "nowrap", color: gold, background: `linear-gradient(transparent 62%, ${gold}26 62%)` }}>{c.worry.closingHighlight}</span>
            </p>
          </section>

          {/* ── パーソナルピラティスとは ── */}
          <section style={{ padding: "46px 22px 46px", background: cream }}>
            <Eyebrow text={c.about.eyebrow} />
            <SectionHeading text={c.about.heading} />
            <ImageSlot src={c.about.img.src} placeholder={c.about.img.placeholder} objectPosition={c.about.img.position ?? "center"} radius={16} style={{ width: "100%", height: 200, background: "#E4DCCB", marginTop: 22 }} />
            <p style={{ fontSize: 13, lineHeight: 2.05, color: ink, margin: "18px 0 0" }}>{c.about.body}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
              {c.about.points.map((p) => (
                <div key={p.label} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#FFFFFF", borderRadius: 12, border: `1px solid ${creamLine}`, padding: "14px 16px" }}>
                  <span style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: "50%", background: `${gold}12`, border: `1px solid ${gold}33` }}>
                    <Icon name={p.icon} size={23} color={gold} />
                  </span>
                  <div>
                    <h3 style={{ fontFamily: fontGothic, fontSize: 14.5, fontWeight: 700, color: deep, margin: 0 }}>{p.label}</h3>
                    <p style={{ fontSize: 12.5, lineHeight: 1.8, color: dim, margin: "5px 0 0" }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 体験オファー ── */}
          <section style={{ padding: "46px 22px 48px", background: "#FFFFFF" }}>
            <Eyebrow text={c.trial.eyebrow} />
            <h2 style={{ fontFamily: fontMincho, fontWeight: 600, fontSize: 22, letterSpacing: "0.04em", lineHeight: 1.55, color: deep, margin: 0, textAlign: "center" }}>
              {c.trial.headingPre}
              <br />
              <span style={{ fontSize: 29, color: gold }}>{c.trial.headingHighlight}</span>
            </h2>
            <p style={{ textAlign: "center", fontSize: 12.5, lineHeight: 1.95, color: dim, margin: "16px 0 0" }}>{nl(c.trial.lead)}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 22 }}>
              {c.trial.photos.map((p, i) => (
                <ImageSlot key={i} src={p.src} placeholder={p.placeholder} objectPosition={p.position ?? "center"} radius={14} style={{ width: "100%", height: 130, background: "#E4DCCB" }} />
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 18 }}>
              {c.trial.steps.map((item, i) => (
                <div key={item.title} style={{ display: "flex", gap: 14, background: cream, borderRadius: 14, border: `1px solid ${creamLine}`, padding: "16px 16px", alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 46, height: 46, borderRadius: "50%", background: "#FFFFFF", border: `1px solid ${gold}44` }}>
                    <Icon name={item.icon} size={24} color={gold} />
                    <span style={{ position: "absolute", top: -8, left: -8, width: 22, height: 22, borderRadius: "50%", background: deep, color: goldSoft, fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <h3 style={{ fontFamily: fontGothic, fontSize: 14.5, fontWeight: 700, color: deep, margin: 0 }}>{item.title}</h3>
                      <span style={{ fontSize: 10.5, fontWeight: 700, color: gold, background: `${gold}14`, borderRadius: 999, padding: "2px 9px" }}>{item.min}</span>
                    </div>
                    <p style={{ fontSize: 12.5, lineHeight: 1.8, color: dim, margin: "5px 0 0" }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 当日入会特典（入会金0円） */}
            <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, background: deep, borderRadius: 14, padding: "16px 18px" }}>
              <span style={{ fontFamily: fontGothic, fontSize: 12.5, fontWeight: 700, color: goldSoft, textAlign: "center", lineHeight: 1.5 }}>{nl(c.trial.joinBenefit.label)}</span>
              <span style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                <span style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>{c.trial.joinBenefit.note}</span>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", textDecoration: "line-through" }}>{c.trial.joinBenefit.normal}円</span>
                </span>
                <span style={{ fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: 40, lineHeight: 0.9, color: "#FFFFFF" }}>{c.trial.joinBenefit.value}</span>
                <span style={{ fontFamily: fontMincho, fontSize: 18, color: "#FFFFFF", marginBottom: 3 }}>円</span>
              </span>
            </div>

            <Notes items={c.trial.notes} />
            <CtaButton text={c.trial.ctaText} />
          </section>

          {/* ── 選ばれる5つの理由 ── */}
          <section style={{ padding: "46px 22px 50px", background: cream }}>
            <Eyebrow text="REASON" />
            <SectionHeading text={c.reasons.heading} />
            {c.reasons.items.map((item) => (
              <div key={item.num} style={{ marginTop: 34 }}>
                <div style={{ position: "relative" }}>
                  <ImageSlot src={item.img.src} placeholder={item.img.placeholder} objectPosition={item.img.position ?? "center"} radius={16} style={{ width: "100%", height: 190, background: "#E4DCCB" }} />
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
                      boxShadow: "0 4px 10px rgba(38,35,29,0.3)",
                    }}
                  >
                    <span style={{ fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: 16, color: goldSoft }}>{item.num}</span>
                  </span>
                </div>
                <h3 style={{ fontFamily: fontMincho, fontWeight: 600, fontSize: 18, lineHeight: 1.65, letterSpacing: "0.02em", margin: "16px 0 0", color: deep, textAlign: "center" }}>
                  {nl(item.title)}
                </h3>
                <div style={{ width: 36, height: 2, background: gold, margin: "12px auto 0", borderRadius: 2 }} />
                <p style={{ fontSize: 12.5, lineHeight: 1.95, color: ink, margin: "14px 0 0" }}>{item.body}</p>
              </div>
            ))}
            <CtaButton text={c.reasons.ctaText} />
            <p style={{ textAlign: "center", fontSize: 11.5, color: dim, margin: "10px 0 0" }}>{c.reasons.ctaSub}</p>
          </section>

          {/* ── 料金 ── */}
          <section style={{ padding: "46px 22px 46px", background: "#FFFFFF" }}>
            <Eyebrow text={c.pricing.eyebrow} />
            <SectionHeading text={c.pricing.heading} />
            <p style={{ textAlign: "center", fontSize: 12.5, lineHeight: 1.95, color: dim, margin: "16px 0 0" }}>{nl(c.pricing.lead)}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 22 }}>
              {c.pricing.plans.map((p) => (
                <div key={p.name} style={{ background: cream, borderRadius: 16, border: `1.5px solid ${gold}55`, padding: "20px 20px", textAlign: "center" }}>
                  <h3 style={{ fontFamily: fontMincho, fontWeight: 600, fontSize: 18, letterSpacing: "0.04em", color: deep, margin: 0 }}>{p.name}</h3>
                  <p style={{ fontSize: 11.5, color: dim, margin: "4px 0 0" }}>{p.note}</p>
                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 4, marginTop: 10 }}>
                    <span style={{ fontFamily: fontMincho, fontSize: 14, color: deep, marginBottom: 8 }}>1回あたり</span>
                    <span style={{ fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: 44, lineHeight: 0.9, color: gold }}>{p.perLesson}</span>
                    <span style={{ fontFamily: fontMincho, fontSize: 18, color: deep, marginBottom: 4 }}>円</span>
                  </div>
                  <p style={{ fontSize: 11, color: dim, margin: "6px 0 0" }}>{p.genderNote}</p>
                </div>
              ))}

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: deep, borderRadius: 14, padding: "16px 20px" }}>
                <span style={{ fontFamily: fontGothic, fontSize: 14, fontWeight: 700, color: goldSoft }}>{c.pricing.joinFee.label}</span>
                <span style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                  <span style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", textDecoration: "line-through", marginBottom: 4 }}>{c.pricing.joinFee.normal}円</span>
                  <span style={{ fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: 34, lineHeight: 0.9, color: "#FFFFFF" }}>{c.pricing.joinFee.value}</span>
                  <span style={{ fontFamily: fontMincho, fontSize: 16, color: "#FFFFFF", marginBottom: 2 }}>円</span>
                </span>
              </div>
              <p style={{ fontSize: 11, color: dim, margin: 0, textAlign: "center" }}>{c.pricing.joinFee.note}</p>
            </div>

            <Notes items={c.pricing.notes} />
          </section>

          {/* ── 継続の目安 ── */}
          <section style={{ padding: "46px 22px 46px", background: cream }}>
            <Eyebrow text={c.progress.eyebrow} />
            <SectionHeading text={c.progress.heading} />
            <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 26 }}>
              {c.progress.steps.map((s, i) => (
                <div key={s.count} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 62, height: 62, borderRadius: "50%", background: "#FFFFFF", border: `1.5px solid ${gold}66` }}>
                      <span style={{ fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: 22, lineHeight: 1, color: gold }}>{s.count.replace("回", "")}</span>
                      <span style={{ fontSize: 9, color: dim }}>回</span>
                    </span>
                    {i < c.progress.steps.length - 1 && <span style={{ width: 2, height: 22, background: `${gold}44`, margin: "4px 0" }} />}
                  </div>
                  <div style={{ paddingBottom: i < c.progress.steps.length - 1 ? 22 : 0 }}>
                    <p style={{ fontFamily: fontMincho, fontSize: 18, fontWeight: 600, color: deep, margin: 0, letterSpacing: "0.04em" }}>{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <Notes items={[c.progress.note]} />
          </section>

          {/* ── インストラクター ── */}
          <section style={{ padding: "46px 22px 46px", background: "#FFFFFF" }}>
            <Eyebrow text={c.instructors.eyebrow} />
            <SectionHeading text={c.instructors.heading} />
            <div style={{ textAlign: "center", margin: "16px 0 0" }}>
              <span style={{ fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: 40, lineHeight: 1, color: gold }}>{c.instructors.count.num}</span>
              <span style={{ fontFamily: fontMincho, fontSize: 18, color: deep, margin: "0 4px" }}>{c.instructors.count.unit}</span>
              <span style={{ fontSize: 12.5, color: dim }}>{c.instructors.count.post}</span>
            </div>
            <ImageSlot src={c.instructors.img.src} placeholder={c.instructors.img.placeholder} objectPosition={c.instructors.img.position ?? "center"} radius={16} style={{ width: "100%", height: 200, background: "#E4DCCB", marginTop: 18 }} />
            <p style={{ fontSize: 13, lineHeight: 2.05, color: ink, margin: "18px 0 0" }}>{c.instructors.lead}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
              {c.instructors.points.map((p) => (
                <div key={p} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="check" size={13} color="#FFFFFF" />
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: ink }}>{p}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 18, borderRadius: 14, border: `1px solid ${creamLine}`, background: cream, padding: "18px 18px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name="sparkle" size={16} color={gold} />
                <span style={{ fontFamily: fontGothic, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: gold }}>{c.instructors.message.title}</span>
              </div>
              <p style={{ fontFamily: fontMincho, fontSize: 13.5, fontWeight: 500, lineHeight: 2, color: ink, margin: "10px 0 0" }}>{c.instructors.message.body}</p>
            </div>
          </section>

          {/* ── 体験の流れ ── */}
          <section style={{ padding: "46px 22px 46px", background: cream }}>
            <Eyebrow text="FLOW" />
            <SectionHeading text={c.flow.heading} />
            <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 26 }}>
              {c.flow.steps.map((s, i) => (
                <div key={s.num} style={{ display: "flex", gap: 16 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", background: deep, color: goldSoft, fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: 17 }}>
                      {s.num}
                    </span>
                    {i < c.flow.steps.length - 1 && <span style={{ width: 2, flex: 1, background: `${gold}44`, margin: "6px 0" }} />}
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
          <section style={{ padding: "46px 22px 46px", background: "#FFFFFF" }}>
            <Eyebrow text="FAQ" />
            <SectionHeading text={c.faq.heading} />
            <div style={{ marginTop: 24 }}>
              <Faq items={c.faq.items} accent={gold} />
            </div>
          </section>

          {/* ── 店舗案内 ── */}
          <section id="access" style={{ padding: "46px 22px 46px", background: cream }}>
            <Eyebrow text="ACCESS" />
            <SectionHeading text={c.access.heading} />
            <div style={{ marginTop: 24, borderRadius: 16, overflow: "hidden", background: "#FFFFFF", border: `1px solid ${line}`, boxShadow: "0 4px 16px rgba(120,95,40,0.08)" }}>
              <ImageSlot src={c.access.store.img.src} placeholder={c.access.store.img.placeholder} style={{ width: "100%", height: 180, background: "#E4DCCB" }} />
              <div style={{ padding: "20px 20px 8px" }}>
                <h3 style={{ fontFamily: fontMincho, fontWeight: 600, fontSize: 18, letterSpacing: "0.04em", margin: 0, color: deep }}>{c.access.store.name}</h3>
                <p style={{ fontSize: 12.5, lineHeight: 2, color: ink, margin: "10px 0 0" }}>
                  {c.access.store.address}
                  <br />
                  <b style={{ color: deep }}>{c.access.store.hours}</b>｜{c.access.store.holiday}
                  <br />
                  {c.access.store.route}
                </p>
              </div>
              <div style={{ width: "100%", aspectRatio: "16 / 10", marginTop: 12 }}>
                <iframe
                  title="Beê 恵比寿店 地図"
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>

          {/* ── 予約フォーム ── */}
          <section id="form" style={{ padding: "48px 22px 50px", background: "#FFFFFF" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 18px", borderRadius: 999, background: `${gold}14`, border: `1px solid ${gold}55`, color: gold, fontSize: 12, fontWeight: 700, letterSpacing: "0.02em" }}>
                ＼ オープン記念 体験500円・入会金0円 ／
              </span>
            </div>
            <Eyebrow text="RESERVATION" />
            <SectionHeading text={c.form.heading} />
            <p style={{ textAlign: "center", fontSize: 12.5, lineHeight: 2, color: dim, margin: "16px 0 0" }}>{nl(c.form.lead)}</p>
            <LPForm
              clientSlug={c.slug}
              accent={gold}
              fields={c.form.fields}
              submitLabel={c.form.submitLabel}
              errorMessage={c.form.errorMessage}
              disclaimer={nl(c.form.disclaimer)}
            />
          </section>

          {/* ── footer ── */}
          <footer style={{ background: deep, padding: "26px 22px 30px", textAlign: "center" }}>
            {c.footer.lines.map((l, i) => (
              <p key={l} style={{ fontSize: i === 0 ? 16 : 11, fontFamily: i === 0 ? fontDisplay : fontSans, fontStyle: i === 0 ? "italic" : "normal", letterSpacing: i === 0 ? "0.06em" : "0.03em", color: i === 0 ? "#FFFFFF" : "rgba(255,255,255,0.7)", lineHeight: 1.8, margin: i === 0 ? 0 : "4px 0 0" }}>
                {l}
              </p>
            ))}
          </footer>
        </div>
      </div>

      <Sticky
        offers={c.sticky.offers}
        buttonText={c.sticky.buttonText}
        anchor={c.sticky.anchor}
        accent={gold}
        gradient={ctaGrad}
        showAfter={0}
      />
    </LPShell>
  );
}
