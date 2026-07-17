import type { ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPForm from "@/components/LPForm";
import ImageSlot from "@/components/ImageSlot";
import Faq from "./Faq";
import Sticky from "./Sticky";
import config from "./config";

/* ── design tokens（森グリーン × ゴールド × 生成り。見出し明朝、本文ゴシック） ── */
const forest = "#1E3B29";
const forest2 = "#274B34";
const green = "#3F6B4C";
const greenDeep = "#2C5138";
const sage = "#EAF1EA";
const sageOuter = "#DDE7DD";
const sageLine = "#CBDACE";
const gold = "#B08A3C";
const goldLight = "#DCC07E";
const goldGrad = "linear-gradient(135deg, #E2CB8B 0%, #B08A3C 100%)";
const cream = "#FBF7EE";
const creamAlt = "#F4ECD9";
const ink = "#33352E";
const dim = "#6E7266";
const red = "#C4603F";
const white = "#FFFFFF";

const fontMincho = "'Shippori Mincho', serif";
const fontGothic = "'Zen Kaku Gothic New', sans-serif";
const fontSans = "'Noto Sans JP', sans-serif";

const c = config;

/** Render "\n"-separated text as line breaks. */
function nl(text: string): ReactNode {
  return text.split("\n").map((p, i, arr) => (
    <span key={i}>
      {p}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

/* ── icon library (24x24 stroke line icons) ─────────────────────────── */
const iconPaths: Record<string, ReactNode> = {
  check: <path d="M5 12.5l4.2 4.2L19 6.8" />,
  hand: (
    <>
      <path d="M3.5 13.5c2-1.5 4-1.2 6 .2 1.2.9 2.4 1.3 3.8 1.3" />
      <path d="M7 12.2l4-3.4c.9-.8 2.2.5 1.4 1.5l-1.8 2.2" />
      <path d="M20.5 10.5c-1.8-1.4-3.6-1.1-5.4.2" />
    </>
  ),
  group: (
    <>
      <circle cx="9" cy="8" r="2.4" />
      <circle cx="16" cy="9" r="1.9" />
      <path d="M4.5 18c0-2.6 2-4.2 4.5-4.2S13.5 15.4 13.5 18" />
      <path d="M14.5 13.8c2.2-.2 4 .9 4 3.2" />
    </>
  ),
  dumbbell: (
    <>
      <path d="M4 9v6M7 8v8M17 8v8M20 9v6" />
      <path d="M7 12h10" />
    </>
  ),
  care: (
    <>
      <path d="M12 8.3c-1.1-1.6-3.6-1.5-4.5.3-.7 1.4 0 2.9 1.2 3.9L12 15l3.3-2.5c1.2-1 1.9-2.5 1.2-3.9-.9-1.8-3.4-1.9-4.5-.3z" />
      <path d="M4 17c1.6 1.3 3.6 2 5.8 2h4.4c2.2 0 4.2-.7 5.8-2" />
    </>
  ),
  handshake: (
    <>
      <path d="M12 8.5L9.5 6.5 4 10.5v5l2 1.5" />
      <path d="M12 8.5l2.5-2L20 10.5v5l-2 1.5" />
      <path d="M8 14l2.5 2c.7.6 1.6.6 2.3 0l.7-.6" />
      <path d="M11 12.5l2 1.6c.7.6 1.7.5 2.3-.2" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="6" r="2.2" />
      <path d="M12 8.4v6M12 10.5l-4-3M12 10.5l4-3M12 14.4l-3 5M12 14.4l3 5" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3.5v3M12 17.5v3M4.5 12h3M16.5 12h3M6.7 6.7l2.1 2.1M15.2 15.2l2.1 2.1M17.3 6.7l-2.1 2.1M8.8 15.2l-2.1 2.1" />
      <circle cx="12" cy="12" r="2.4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21c4-4 6-7 6-10a6 6 0 10-12 0c0 3 2 6 6 10z" />
      <circle cx="12" cy="11" r="2.2" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5.5" y="4.5" width="13" height="16" rx="2" />
      <path d="M9 4.5h6v2.5H9z" />
      <path d="M8.5 11h7M8.5 14.5h7M8.5 18h4" />
    </>
  ),
  posture: (
    <>
      <circle cx="12" cy="5" r="1.8" />
      <path d="M12 7v6M12 9l-3 2M12 9l3 2M12 13l-2.5 6M12 13l2.5 6" />
      <path d="M4 4v16" strokeDasharray="2 2" />
    </>
  ),
  massage: (
    <>
      <path d="M3.5 16c2.5-1.8 5-1.4 7.5.3 1.5 1 3 1.4 4.7 1.4H20" />
      <path d="M8 14.5l3.5-3c1-.9 2.4.6 1.5 1.7L11 15" />
      <path d="M13 6.5c.5-1 2-1 2.5 0M16 5.5c.5-1 2-1 2.5 0" />
    </>
  ),
  reformer: (
    <>
      <rect x="3" y="13" width="18" height="3" rx="1" />
      <path d="M5 16v3M19 16v3" />
      <path d="M6 13V9a1 1 0 011-1h4" />
      <path d="M15 8l2.5 2.5" />
    </>
  ),
  document: (
    <>
      <path d="M6.5 3.5h7l4 4v13h-11z" />
      <path d="M13.5 3.5v4h4" />
      <path d="M9 12h6M9 15h6M9 18h4" />
    </>
  ),
  train: (
    <>
      <rect x="6" y="4" width="12" height="12" rx="2.5" />
      <path d="M6 10h12" />
      <circle cx="9.2" cy="13" r="0.9" />
      <circle cx="14.8" cy="13" r="0.9" />
      <path d="M8 20l2-3M16 20l-2-3" />
    </>
  ),
  bus: (
    <>
      <rect x="4.5" y="4.5" width="15" height="12" rx="2.5" />
      <path d="M4.5 11h15" />
      <path d="M8 4.5v6.5M16 4.5v6.5" />
      <circle cx="8.5" cy="19" r="1.3" />
      <circle cx="15.5" cy="19" r="1.3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  car: (
    <>
      <path d="M4 16v-3l2-4.5c.3-.7 1-1 1.7-1h8.6c.7 0 1.4.3 1.7 1L20 13v3" />
      <path d="M4 16h16v2.5h-2.5V16M6.5 18.5V16H4" />
      <circle cx="7.5" cy="13" r="0.9" />
      <circle cx="16.5" cy="13" r="0.9" />
    </>
  ),
};

function Icon({ name, size = 24, color = green, strokeWidth = 1.5 }: { name: string; size?: number; color?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {iconPaths[name]}
    </svg>
  );
}

/* ── shared blocks ──────────────────────────────────────────────────── */

function Eyebrow({ text, color = gold }: { text: string; color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 10 }}>
      <span style={{ width: 20, height: 1, background: color }} />
      <span style={{ fontFamily: fontGothic, fontSize: 11, fontWeight: 700, letterSpacing: "0.24em", color }}>{text}</span>
      <span style={{ width: 20, height: 1, background: color }} />
    </div>
  );
}

function SectionHeading({ text, color = forest, size = 25 }: { text: string; color?: string; size?: number }) {
  return (
    <h2 style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: size, letterSpacing: "0.06em", color, lineHeight: 1.5, margin: 0, textAlign: "center" }}>
      {nl(text)}
    </h2>
  );
}

/** ゴールドの月桂冠見出し（キャンペーン等） */
function Laurel({ children }: { children: ReactNode }) {
  const leaf = (dir: 1 | -1) => (
    <svg width="26" height="40" viewBox="0 0 26 40" fill="none" style={{ transform: dir === -1 ? "scaleX(-1)" : undefined }}>
      <path d="M20 4C10 8 6 16 8 34" stroke={gold} strokeWidth="1.4" strokeLinecap="round" />
      {[8, 14, 20, 26].map((y, i) => (
        <path key={i} d={`M${11 - i} ${y}c-4 0-6 2-7 5 3 .5 6-.5 7-5z`} fill={`${gold}66`} stroke={gold} strokeWidth="0.8" />
      ))}
    </svg>
  );
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
      {leaf(1)}
      <span style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 23, letterSpacing: "0.04em", color: forest, whiteSpace: "nowrap" }}>{children}</span>
      {leaf(-1)}
    </div>
  );
}

/** ゴールドの円形バッジ（整体 × マシンピラティス） */
function CrownCircle({ label }: { label: string }) {
  return (
    <div style={{ position: "relative", width: 128, height: 128, borderRadius: "50%", background: goldGrad, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 22px rgba(176,138,60,0.35)" }}>
      <svg width="30" height="20" viewBox="0 0 30 20" fill="none" style={{ position: "absolute", top: -10 }}>
        <path d="M3 17L1 5l7 5 7-8 7 8 7-5-2 12z" fill={goldLight} stroke="#9C7729" strokeWidth="1" strokeLinejoin="round" />
      </svg>
      <span style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 20, color: white, textAlign: "center", lineHeight: 1.35, letterSpacing: "0.04em", textShadow: "0 1px 3px rgba(120,90,20,0.4)" }}>
        {nl(label)}
      </span>
    </div>
  );
}

/* ── page ───────────────────────────────────────────────────────────── */

export default function WpsPilatesPage() {
  const sectionPad = "52px 22px";

  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.header.brand, status: c.status }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes wpsStickyUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
@keyframes wpsSheen { 0% { left: -60%; } 55%,100% { left: 130%; } }
.wps-root a { -webkit-tap-highlight-color: transparent; }
`,
        }}
      />

      <div className="wps-root" style={{ background: sageOuter, minHeight: "100vh", fontFamily: fontGothic, color: ink }}>
        <div style={{ maxWidth: 500, margin: "0 auto", background: cream, boxShadow: "0 0 60px rgba(30,59,41,0.12)", overflow: "hidden" }}>

          {/* ── header ── */}
          <header style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(251,247,238,0.95)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${sageLine}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontFamily: fontMincho, fontWeight: 700, fontStyle: "italic", fontSize: 24, color: green, letterSpacing: "0.02em" }}>{c.header.brandEn}</span>
              <span style={{ fontSize: 9, letterSpacing: "0.12em", color: dim, lineHeight: 1.3 }}>{nl("WAKATA\nPHYSIO STUDIO")}</span>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {c.header.badges.map((b) => (
                <span key={b} style={{ fontSize: 10.5, fontWeight: 700, color: forest, background: white, border: `1px solid ${green}55`, borderRadius: 6, padding: "5px 9px", whiteSpace: "nowrap" }}>{b}</span>
              ))}
            </div>
          </header>

          {/* ── offer bar ── */}
          <div style={{ background: forest, color: white, textAlign: "center", padding: "13px 12px" }}>
            <span style={{ fontSize: 11, letterSpacing: "0.14em", color: goldLight }}>{c.offerBar.pre}</span>
            <p style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 17, letterSpacing: "0.01em", margin: "3px 0 0", whiteSpace: "nowrap" }}>
              <span style={{ color: gold, marginRight: 3 }}>＼</span>
              {c.offerBar.text}
              <span style={{ color: goldLight, fontSize: 22, margin: "0 1px" }}>{c.offerBar.highlight}</span>
              {c.offerBar.post}
              <span style={{ color: gold, marginLeft: 3 }}>／</span>
            </p>
          </div>

          {/* ── FV / hero ── */}
          <section>
            <div style={{ position: "relative" }}>
              <ImageSlot src={c.fv.hero.src} placeholder={c.fv.hero.placeholder} objectPosition={c.fv.hero.position} style={{ width: "100%", height: 340, background: sage }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(251,247,238,0.94) 0%, rgba(251,247,238,0.7) 42%, rgba(251,247,238,0) 70%)" }} />
              <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "72%", padding: "26px 20px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: green, letterSpacing: "0.04em", position: "relative", paddingTop: 8 }}>
                  <span style={{ position: "absolute", top: 0, left: 2, letterSpacing: "0.3em", color: gold, fontSize: 9 }}>● ● ● ● ●</span>
                  {c.fv.eyebrow}
                </div>
                <h1 style={{ fontFamily: fontMincho, fontWeight: 700, margin: "8px 0 0", lineHeight: 1.28, letterSpacing: "0.02em" }}>
                  <span style={{ fontSize: 34, color: forest }}>{c.fv.catchTop}</span>
                  <br />
                  <span style={{ fontSize: 40, color: gold }}>{c.fv.catchLines[0]}</span>
                  <span style={{ fontSize: 26, color: forest }}>{c.fv.catchLines[1]}</span>
                  <br />
                  <span style={{ fontSize: 21, color: forest }}>{c.fv.catchTail}</span>
                </h1>
              </div>
            </div>

            {/* punch block */}
            <div style={{ padding: "26px 22px 40px", textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                {c.fv.tags.map((t) => (
                  <span key={t} style={{ fontSize: 13, fontWeight: 700, color: white, background: forest, borderRadius: 999, padding: "7px 16px" }}>{t}</span>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: "18px 0 6px" }}>
                <span style={{ width: 28, height: 1, background: gold }} />
                <span style={{ fontSize: 14, letterSpacing: "0.1em", color: green, fontWeight: 700 }}>{c.fv.band}</span>
                <span style={{ width: 28, height: 1, background: gold }} />
              </div>
              <p style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 34, color: forest, letterSpacing: "0.04em", margin: 0 }}>{c.fv.punch}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 24 }}>
                <CrownCircle label={c.fv.duo[0]} />
                <span style={{ fontFamily: fontMincho, fontSize: 26, color: gold, fontWeight: 700 }}>×</span>
                <CrownCircle label={c.fv.duo[1]} />
              </div>
            </div>
          </section>

          {/* ── campaign ── */}
          <section id="campaign">
            <div style={{ background: forest, padding: "26px 22px 30px", textAlign: "center" }}>
              <span style={{ display: "inline-block", background: white, color: forest, fontSize: 12, fontWeight: 700, borderRadius: 999, padding: "6px 18px", letterSpacing: "0.04em" }}>{c.campaign.ribbon}</span>
              <p style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 24, color: white, margin: "14px 0 0", letterSpacing: "0.03em" }}>
                初回体験<span style={{ color: goldLight }}>0円</span>キャンペーン！
              </p>
            </div>
            <div style={{ background: forest, padding: "0 18px 34px" }}>
              <div style={{ background: white, borderRadius: 16, border: `2px solid ${goldLight}`, padding: "28px 20px 30px" }}>
                <Laurel>{c.campaign.trialTitle}</Laurel>
                {/* price */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 20 }}>
                  <div style={{ textAlign: "right", lineHeight: 1.3 }}>
                    <div style={{ fontSize: 12, color: dim }}>{c.campaign.regularLabel}</div>
                    <div style={{ fontSize: 22, color: dim, textDecoration: "line-through", fontWeight: 700 }}>
                      {c.campaign.regularPrice}<span style={{ fontSize: 12 }}>円</span>
                      <span style={{ fontSize: 10, marginLeft: 2 }}>税込</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 20, color: dim }}>→</span>
                  <div style={{ display: "flex", alignItems: "baseline" }}>
                    <span style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 76, color: gold, lineHeight: 1 }}>{c.campaign.freeLabel}</span>
                    <span style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 30, color: gold }}>円</span>
                  </div>
                </div>
                <p style={{ fontSize: 11, color: dim, textAlign: "center", margin: "10px 0 0" }}>{c.campaign.note}</p>

                {/* items */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 24 }}>
                  {c.campaign.items.map((item, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 74, height: 74, borderRadius: "50%", background: sage, border: `1px solid ${sageLine}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon name={["clipboard", "posture", "massage", "reformer", "document"][i]} size={32} color={greenDeep} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: forest, textAlign: "center", lineHeight: 1.4 }}>{nl(item)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* bonus */}
              <div style={{ display: "flex", justifyContent: "center", margin: "22px 0 0" }}>
                <span style={{ width: 62, height: 62, borderRadius: "50%", background: goldGrad, color: white, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fontMincho, fontWeight: 700, fontSize: 16, boxShadow: "0 8px 18px rgba(176,138,60,0.4)" }}>さらに</span>
              </div>
              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
                {c.campaign.bonuses.map((b) => (
                  <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ flex: "0 0 auto", position: "relative", background: greenDeep, color: white, fontSize: 15, fontWeight: 700, padding: "12px 20px 12px 16px", clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)", minWidth: 168 }}>{b.label}</span>
                    <span style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 30, color: goldLight }}>{b.value}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", textAlign: "right", margin: "10px 4px 0" }}>{c.campaign.bonusNote}</p>

              <a href="#form" style={{ marginTop: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, height: 62, background: goldGrad, color: white, textDecoration: "none", fontSize: 17, fontWeight: 700, letterSpacing: "0.06em", borderRadius: 999, boxShadow: "0 10px 24px rgba(176,138,60,0.4)" }}>
                {c.campaign.ctaText}
                <span style={{ display: "inline-flex", width: 24, height: 24, borderRadius: "50%", background: "rgba(255,255,255,0.25)", alignItems: "center", justifyContent: "center", fontSize: 14 }}>→</span>
              </a>
            </div>
          </section>

          {/* ── about (WPSとは) ── */}
          <section>
            <div style={{ background: forest, padding: "26px 22px 24px", textAlign: "center" }}>
              <div style={{ fontFamily: fontGothic, fontSize: 12, letterSpacing: "0.24em", color: "rgba(255,255,255,0.6)" }}>{c.about.eyebrow}</div>
              <h2 style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 30, letterSpacing: "0.06em", margin: "4px 0 0" }}>
                <span style={{ color: goldLight }}>WPS</span>
                <span style={{ color: white }}>とは？</span>
              </h2>
            </div>
            <div style={{ padding: "30px 22px 44px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                {c.about.tags.map((t) => (
                  <span key={t} style={{ fontSize: 13, fontWeight: 700, color: white, background: greenDeep, borderRadius: 999, padding: "6px 15px" }}>{t}</span>
                ))}
                <span style={{ fontSize: 14, color: ink, fontWeight: 700 }}>{c.about.tagTail}</span>
              </div>
              <p style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 24, color: gold, textAlign: "center", margin: "12px 0 0", letterSpacing: "0.04em" }}>パーソナルピラティススタジオ</p>

              <div style={{ marginTop: 22, borderRadius: 16, overflow: "hidden", boxShadow: "0 10px 26px rgba(30,59,41,0.14)" }}>
                <ImageSlot src={c.about.photo.src} placeholder={c.about.photo.placeholder} objectPosition={c.about.photo.position} style={{ width: "100%", height: 210, background: sage }} />
              </div>

              <p style={{ fontSize: 15, lineHeight: 2, color: ink, textAlign: "center", margin: "22px 0 0" }}>
                {c.about.leadPre}
                <span style={{ color: red, fontWeight: 700 }}>{c.about.leadHighlight}</span>
                {c.about.leadPost}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24 }}>
                {c.about.features.map((f) => (
                  <div key={f.label} style={{ background: white, borderRadius: 12, boxShadow: "0 4px 14px rgba(30,59,41,0.08)", padding: "20px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <Icon name={f.icon} size={34} color={greenDeep} strokeWidth={1.4} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: forest }}>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── worry ── */}
          <section style={{ background: sage, padding: sectionPad }}>
            <SectionHeading text={c.worry.heading} size={22} />
            <div style={{ marginTop: 22, background: white, borderRadius: 16, border: `1px solid ${sageLine}`, padding: "24px 22px", boxShadow: "0 6px 18px rgba(30,59,41,0.06)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                {c.worry.checks.map((ck, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 15.5, lineHeight: 1.5, color: ink }}>
                    <span style={{ flexShrink: 0, marginTop: 2 }}><Icon name="check" size={20} color={green} strokeWidth={2.2} /></span>
                    <span>
                      {i < 3 ? (
                        <>
                          <span style={{ color: red, fontWeight: 700 }}>{ck.hi}</span>
                          {ck.text}
                        </>
                      ) : (
                        <>
                          {ck.text}
                          <span style={{ color: red, fontWeight: 700 }}>{ck.hi}</span>
                        </>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: 40 }}>
              <h3 style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 24, color: forest, letterSpacing: "0.04em", margin: 0 }}>
                {c.worry.whyHeading}
                <span style={{ color: gold }}>{c.worry.whyHi}</span>
                のか？
              </h3>
              <span style={{ display: "block", width: 60, height: 2, background: forest, margin: "14px auto 0" }} />
              <p style={{ fontSize: 14, lineHeight: 2, color: ink, margin: "16px 0 0" }}>{c.worry.whyBody}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 22 }}>
              {c.worry.traps.map((t) => (
                <div key={t.label} style={{ borderRadius: 12, overflow: "hidden", background: white, border: `1px solid ${sageLine}` }}>
                  <div style={{ background: greenDeep, color: white, fontSize: 11.5, fontWeight: 700, textAlign: "center", padding: "8px 4px", lineHeight: 1.4 }}>{nl(t.label)}</div>
                  <ImageSlot src={t.img.src} placeholder={t.img.placeholder} style={{ width: "100%", height: 92, background: sage }} />
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 26 }}>
              <div style={{ color: green, fontSize: 20 }}>❯❯</div>
              <p style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 22, color: forest, lineHeight: 1.6, margin: "6px 0 0", letterSpacing: "0.03em" }}>
                {c.worry.closingPre}
                <br />
                <span style={{ color: red }}>{c.worry.closingHi}</span>
                {c.worry.closingPost}
              </p>
            </div>
          </section>

          {/* ── solution ── */}
          <section style={{ padding: "44px 22px 48px", background: creamAlt }}>
            <p style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 21, color: forest, textAlign: "center", lineHeight: 1.7, margin: 0, letterSpacing: "0.03em" }}>
              {nl(c.solution.leadTop)}
            </p>
            <div style={{ marginTop: 22, borderRadius: 16, overflow: "hidden", boxShadow: "0 10px 26px rgba(30,59,41,0.16)" }}>
              <ImageSlot src={c.solution.photo.src} placeholder={c.solution.photo.placeholder} objectPosition={c.solution.photo.position} style={{ width: "100%", height: 230, background: sage }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 28 }}>
              <CrownCircle label={c.solution.duo[0]} />
              <span style={{ fontFamily: fontMincho, fontSize: 26, color: gold, fontWeight: 700 }}>×</span>
              <CrownCircle label={c.solution.duo[1]} />
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: ink, textAlign: "center", margin: "26px 0 0", fontWeight: 700 }}>
              {c.solution.subPre}
              <span style={{ color: green }}>{c.solution.subHi}</span>
              {c.solution.subPost}
            </p>
            <div style={{ marginTop: 20, background: white, borderRadius: 14, padding: "20px 20px", border: `1px solid ${creamAlt}`, boxShadow: "0 6px 18px rgba(30,59,41,0.08)" }}>
              <p style={{ fontSize: 14.5, lineHeight: 1.95, color: ink, margin: 0, textAlign: "center" }}>
                {c.solution.bodyPre}
                <span style={{ color: red, fontWeight: 700 }}>{c.solution.bodyHi}</span>
                {c.solution.bodyPost}
              </p>
            </div>
            <div style={{ marginTop: 18, background: forest, borderRadius: 12, padding: "16px 18px", textAlign: "center" }}>
              <p style={{ fontSize: 13.5, lineHeight: 1.8, color: white, margin: 0 }}>
                一人一人に合わせた<span style={{ color: goldLight, fontWeight: 700 }}>オーダーメイドのプログラム</span>をご提供します。
              </p>
            </div>
          </section>

          {/* ── method ── */}
          <section style={{ padding: sectionPad, background: cream }}>
            <Eyebrow text={c.method.eyebrow} />
            <SectionHeading text={c.method.heading} />
            <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 26 }}>
              {c.method.steps.map((s) => (
                <div key={s.no} style={{ background: white, borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 22px rgba(30,59,41,0.1)" }}>
                  <div style={{ background: green, color: white, display: "inline-block", fontFamily: fontGothic, fontWeight: 700, fontSize: 12, letterSpacing: "0.14em", padding: "8px 22px 8px 16px", clipPath: "polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)" }}>
                    METHOD {s.no}
                  </div>
                  <div style={{ padding: "16px 20px 24px" }}>
                    <div style={{ fontFamily: fontGothic, fontSize: 10.5, letterSpacing: "0.18em", color: gold, fontWeight: 700 }}>{s.en}</div>
                    <h3 style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 24, color: forest, letterSpacing: "0.04em", margin: "4px 0 0" }}>{s.title}</h3>
                    <div style={{ marginTop: 16, borderRadius: 12, overflow: "hidden" }}>
                      <ImageSlot src={s.photo.src} placeholder={s.photo.placeholder} objectPosition={s.photo.position} style={{ width: "100%", height: 180, background: sage }} />
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.95, color: ink, margin: "16px 0 0", textAlign: "center" }}>
                      {s.body.map((b, i) => (
                        <span key={i}>{b.hi ? <span style={{ color: red, fontWeight: 700 }}>{b.hi}</span> : null}{b.text}</span>
                      ))}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 16 }}>
                      {s.chips.map((chip) => (
                        <span key={chip} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 700, color: greenDeep, background: sage, borderRadius: 999, padding: "6px 13px" }}>
                          <Icon name="check" size={14} color={green} strokeWidth={2.4} />{chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── reasons ── */}
          <section style={{ padding: sectionPad, background: creamAlt }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
              <span style={{ background: forest, color: white, fontSize: 12, fontWeight: 700, borderRadius: 999, padding: "7px 18px", letterSpacing: "0.02em" }}>{c.reasons.brandLabel}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <span style={{ color: gold, fontSize: 22 }}>＼</span>
              <h2 style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 28, color: forest, letterSpacing: "0.05em", margin: 0 }}>{c.reasons.heading}</h2>
              <span style={{ color: gold, fontSize: 22 }}>／</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24 }}>
              {c.reasons.items.map((r) => (
                <div key={r.title} style={{ background: white, borderRadius: 12, boxShadow: "0 5px 16px rgba(30,59,41,0.08)", padding: "22px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                  <Icon name={r.icon} size={38} color={greenDeep} strokeWidth={1.4} />
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: forest, textAlign: "center", lineHeight: 1.5 }}>{nl(r.title)}</span>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 18, color: forest, textAlign: "center", margin: "28px 0 0", lineHeight: 1.7 }}>
              初心者の方でも<span style={{ background: `linear-gradient(transparent 60%, ${goldLight} 60%)` }}>安心して通える環境</span>を整えています。
            </p>
          </section>

          {/* ── flow ── */}
          <section style={{ padding: sectionPad, background: sage }}>
            <Eyebrow text={c.flow.eyebrow} />
            <SectionHeading text={c.flow.heading} />
            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 16 }}>
              {c.flow.steps.map((s, i) => (
                <div key={s.no} style={{ display: "flex", gap: 14 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: "50%", background: greenDeep, color: white, lineHeight: 1 }}>
                      <span style={{ fontSize: 8, letterSpacing: "0.1em" }}>STEP</span>
                      <span style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 20 }}>{s.no}</span>
                    </span>
                    {i < c.flow.steps.length - 1 && <span style={{ width: 2, flex: 1, background: sageLine, margin: "6px 0" }} />}
                  </div>
                  <div style={{ flex: 1, background: white, borderRadius: 14, overflow: "hidden", border: `1px solid ${sageLine}`, marginBottom: 4 }}>
                    <div style={{ display: "flex", gap: 12, padding: 12, alignItems: "center" }}>
                      <div style={{ width: 96, flexShrink: 0, borderRadius: 10, overflow: "hidden" }}>
                        <ImageSlot src={s.photo.src} placeholder={s.photo.placeholder} objectPosition={s.photo.position} style={{ width: "100%", height: 76, background: sage }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 16, color: forest, margin: 0, letterSpacing: "0.02em" }}>{s.title}</h3>
                        <p style={{ fontSize: 12, lineHeight: 1.7, color: dim, margin: "6px 0 0" }}>{s.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── gallery ── */}
          <section style={{ padding: sectionPad, background: cream }}>
            <Eyebrow text={c.gallery.eyebrow} />
            <SectionHeading text={c.gallery.heading} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24 }}>
              {c.gallery.photos.map((p, i) => (
                <div key={i} style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 6px 16px rgba(30,59,41,0.1)" }}>
                  <ImageSlot src={p.src} placeholder={p.placeholder} style={{ width: "100%", height: 130, background: sage }} />
                </div>
              ))}
            </div>
          </section>

          {/* ── access ── */}
          <section id="access">
            <div style={{ background: forest, padding: "26px 22px 24px", textAlign: "center" }}>
              <div style={{ fontFamily: fontGothic, fontSize: 12, letterSpacing: "0.24em", color: "rgba(255,255,255,0.6)" }}>{c.access.eyebrow}</div>
              <h2 style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 26, letterSpacing: "0.08em", margin: "4px 0 0", color: white }}>{c.access.heading}</h2>
            </div>
            <div style={{ padding: "30px 22px 44px", background: creamAlt }}>
              {/* train */}
              <AccessBlock icon="train" title="電車でお越しの場合" rows={c.access.train} />
              <div style={{ height: 24 }} />
              <AccessBlock icon="bus" title="バスでお越しの場合" rows={c.access.bus} />

              {/* hours */}
              <div style={{ marginTop: 34, textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}><Icon name="clock" size={26} color={green} /></div>
                <h3 style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 20, color: forest, margin: 0, letterSpacing: "0.06em" }}>営業時間</h3>
                <div style={{ maxWidth: 280, margin: "16px auto 0", display: "flex", flexDirection: "column", gap: 2 }}>
                  {c.access.hours.map((h) => (
                    <div key={h.day} style={{ display: "flex", justifyContent: "center", gap: 12, fontSize: 16, color: ink, padding: "6px 0", borderBottom: `1px dashed ${sageLine}` }}>
                      <span style={{ fontWeight: 700 }}>【{h.day}】</span>
                      <span>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: greenDeep, color: white, borderRadius: 999, padding: "12px 26px", fontSize: 15, fontWeight: 700 }}>
                  <Icon name="car" size={20} color={white} />{c.access.parking}
                </span>
              </div>

              <p style={{ textAlign: "center", fontSize: 14, lineHeight: 1.9, color: ink, margin: "22px 0 0" }}>
                {c.access.postal}
                <br />
                {c.access.address}
              </p>
              <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.access.mapQuery)}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: green, textDecoration: "none", borderBottom: `1px solid ${green}` }}>
                  <Icon name="pin" size={16} color={green} />Googleマップで見る
                </a>
              </div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section style={{ padding: sectionPad, background: cream }}>
            <Eyebrow text={c.faq.eyebrow} />
            <SectionHeading text={c.faq.heading} />
            <div style={{ marginTop: 26 }}>
              <Faq items={c.faq.items} accent={green} />
            </div>
          </section>

          {/* ── form ── */}
          <section id="form" style={{ background: sage, padding: "48px 20px 54px" }}>
            <Eyebrow text={c.form.eyebrow} />
            <SectionHeading text={c.form.heading} />
            <p style={{ textAlign: "center", fontSize: 13, lineHeight: 1.9, color: dim, margin: "16px 0 0" }}>{c.form.lead}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, margin: "20px 0 0" }}>
              {c.sticky.offers.map((o) => (
                <span key={o.label} style={{ display: "inline-flex", alignItems: "baseline", gap: 6, padding: "9px 18px", borderRadius: 12, border: `1.5px solid ${green}55`, background: white }}>
                  <span style={{ fontSize: 11, color: dim }}>{o.label}</span>
                  <span style={{ fontFamily: fontMincho, fontWeight: 800, fontSize: 20, color: gold }}>{o.value}</span>
                </span>
              ))}
            </div>
            <div style={{ background: white, borderRadius: 18, padding: "10px 22px 30px", marginTop: 22, boxShadow: "0 10px 30px rgba(30,59,41,0.1)" }}>
              <LPForm
                clientSlug={c.slug}
                fields={c.form.fields}
                accent={green}
                submitLabel={c.form.submitLabel}
                submitStyle={{ background: goldGrad, boxShadow: "0 10px 22px rgba(176,138,60,0.4)" }}
                disclaimer={c.form.disclaimer}
                errorMessage={c.form.errorMessage}
              />
            </div>
          </section>

          {/* ── footer ── */}
          <footer style={{ background: forest, padding: "30px 22px 34px", textAlign: "center" }}>
            <div style={{ fontFamily: fontMincho, fontWeight: 700, fontStyle: "italic", fontSize: 22, color: goldLight }}>{c.header.brandEn}</div>
            <p style={{ fontSize: 13, letterSpacing: "0.12em", color: white, margin: "6px 0 0", fontFamily: fontMincho }}>WAKATA PHYSIO STUDIO</p>
            <p style={{ fontSize: 11, lineHeight: 1.8, color: "rgba(255,255,255,0.7)", margin: "12px 0 0" }}>
              {c.access.postal} {c.access.address}
            </p>
            <p style={{ fontSize: 10.5, color: "rgba(255,255,255,0.5)", margin: "14px 0 0", letterSpacing: "0.06em" }}>© WAKATA PHYSIO STUDIO</p>
          </footer>
        </div>
      </div>

      <Sticky offers={c.sticky.offers} buttonText={c.sticky.buttonText} anchor={c.sticky.anchor} gradient={goldGrad} showAfter={560} />
    </LPShell>
  );
}

/* ── access sub-block ───────────────────────────────────────────────── */
function AccessBlock({ icon, title, rows }: { icon: string; title: string; rows: { line: string; time: string }[] }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, borderBottom: `1px solid ${sageLine}`, paddingBottom: 10 }}>
        <Icon name={icon} size={22} color={greenDeep} />
        <span style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 17, color: forest, letterSpacing: "0.04em" }}>{title}</span>
      </div>
      <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ textAlign: "center", fontSize: 13.5, lineHeight: 1.7, color: ink }}>
            {r.line}
            <br />
            <b style={{ color: greenDeep, fontSize: 15 }}>{r.time}</b>
          </div>
        ))}
      </div>
    </div>
  );
}
