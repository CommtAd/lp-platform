import type { ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPForm from "@/components/LPForm";
import ImageSlot from "@/components/ImageSlot";
import FaqDark from "./FaqDark";
import StickyDark from "./StickyDark";
import config from "./config";

const pink = "#FF3D93";
const blue = "#3FA0FF";
const violet = "#8B5CF6";
const bg = "#0A0A10";
const panel = "rgba(255,255,255,0.04)";
const border = "rgba(255,255,255,0.1)";
const textDim = "rgba(255,255,255,0.65)";
const textDim2 = "rgba(255,255,255,0.48)";
const ctaGrad = `linear-gradient(90deg, ${pink} 0%, ${violet} 55%, ${blue} 100%)`;
const duoTextGrad = `linear-gradient(90deg, ${pink} 0%, ${violet} 55%, ${blue} 100%)`;
const pinkTextGrad = `linear-gradient(90deg, ${pink} 0%, #FF8FC4 100%)`;
const fontGothic = "'Zen Kaku Gothic New', sans-serif";
const fontSans = "'Noto Sans JP', sans-serif";
const fontDisplay = "'Playfair Display', serif";
const fontMincho = "'Shippori Mincho', serif";

/** Render "\n"-separated text as line breaks. */
function nl(text: string): ReactNode {
  return text.split("\n").map((p, i, arr) => (
    <span key={i}>
      {p}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

/* ── icon library (hand-drawn line icons, 24x24, stroke-only) ────────── */
const iconPaths: Record<string, ReactNode> = {
  run: (
    <>
      <circle cx="13" cy="5" r="2" />
      <path d="M10 8.5l3 1.5 3.5-1.5M13 10l-2 4 3 4M13 10l3 2.5 2 5.5M10 8.5l-3 3" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M4.5 19.5L19.5 4.5" />
    </>
  ),
  confused: (
    <>
      <circle cx="9" cy="6" r="2" />
      <path d="M9 8v7" />
      <path d="M15 5.5c1.2 0 2 .8 2 1.8 0 1.6-2 1.7-2 3.2M17 13.2h.01" />
    </>
  ),
  posture: (
    <>
      <circle cx="12" cy="4" r="1.6" />
      <path d="M12 7v13" strokeDasharray="2.2 2.2" />
    </>
  ),
  spine: (
    <>
      <circle cx="12" cy="4" r="1.6" />
      <path d="M12 7v13" strokeDasharray="2.2 2.2" />
    </>
  ),
  sparkleScale: (
    <>
      <rect x="4" y="13" width="16" height="7" rx="2" />
      <path d="M12 13v-3" />
      <path d="M18.2 4.5l.9.9M19.7 2.7v2M21.5 5.2h-2" />
    </>
  ),
  moon: <path d="M15 4a8 8 0 108 8 6.3 6.3 0 01-8-8z" />,
  musicNote: (
    <>
      <circle cx="7" cy="18" r="2.3" />
      <circle cx="16" cy="16" r="2.3" />
      <path d="M9.3 18V6l9-2v12" />
    </>
  ),
  reformer: (
    <>
      <rect x="3" y="14" width="18" height="3" rx="1" />
      <path d="M5 17v3M19 17v3" />
      <path d="M6 14V9a1 1 0 011-1h4" />
    </>
  ),
  femaleHeart: (
    <>
      <circle cx="9" cy="5" r="2.2" />
      <path d="M9 7.2v6M6 10l3 1.5 3-1.5" />
      <path d="M17 8.2c-1.4 0-2.2 1-2.2 2.1 0 1.6 2.2 3.4 2.2 3.4s2.2-1.8 2.2-3.4c0-1.1-.8-2.1-2.2-2.1z" />
    </>
  ),
  sparklePerson: (
    <>
      <circle cx="10" cy="5" r="2.2" />
      <path d="M10 7.2v6M7 10l3 1.5 3-1.5" />
      <path d="M18 5l.8.8M19.5 3.5v1.6M21 5.3h-1.6" />
    </>
  ),
  femaleInstructor: (
    <>
      <circle cx="9" cy="5" r="2.2" />
      <path d="M9 7.2v6M6 10l3 1.5 3-1.5" />
      <circle cx="17" cy="16" r="3" />
      <path d="M15.5 16l1 1 2-2" />
    </>
  ),
  group: (
    <>
      <circle cx="8" cy="7" r="2" />
      <path d="M4.5 15c0-2 1.6-3.3 3.5-3.3s3.5 1.3 3.5 3.3" />
      <circle cx="16" cy="7" r="2" />
      <path d="M12.5 15c0-2 1.6-3.3 3.5-3.3s3.5 1.3 3.5 3.3" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5c2-1 5-1 8 0v13c-3-1-6-1-8 0z" />
      <path d="M20 5.5c-2-1-5-1-8 0v13c3-1 6-1 8 0z" />
    </>
  ),
  burst: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" />
    </>
  ),
  heart: (
    <path d="M12 20s-7-4.4-9-9c-1.2-2.8.4-6 3.5-6 2 0 3.2 1.1 4 2.4.8-1.3 2-2.4 4-2.4 3.1 0 4.7 3.2 3.5 6-2 4.6-9 9-9 9z" />
  ),
  flame: (
    <path d="M12 3c1 3-3 4-3 7.5A3.5 3.5 0 0012.5 14 3 3 0 0016 11c1.5 2 1.5 4.5 0 6.5A6 6 0 0112 21 6.5 6.5 0 015.5 14.5C5.5 9.5 12 8 12 3z" />
  ),
  pelvis: (
    <>
      <path d="M6 5v6a6 6 0 0012 0V5" />
      <path d="M6 5h12" />
      <path d="M9 11v3M15 11v3" />
    </>
  ),
  core: (
    <>
      <path d="M8 4c0 3-2 3-2 6s2 4 2 7M16 4c0 3 2 3 2 6s-2 4-2 7" />
      <path d="M7 10h10" />
    </>
  ),
  hipUp: (
    <>
      <path d="M7 20c0-4 1-6 5-6s5 2 5 6" />
      <path d="M12 4v6M9.5 7l2.5-3 2.5 3" />
    </>
  ),
  legs: (
    <>
      <path d="M10 4v9l-2 7M14 4v9l2 7" />
      <path d="M9 4h6" />
    </>
  ),
  shoulder: (
    <>
      <path d="M5 17c0-4 3-6 7-6s7 2 7 6" />
      <circle cx="12" cy="7" r="2.4" />
    </>
  ),
  belly: (
    <>
      <ellipse cx="12" cy="13" rx="5.5" ry="7" />
      <path d="M15 9.5l-2 2M9 16.5l2-2" />
    </>
  ),
  webTap: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M9.5 12l2 2 3-4" />
    </>
  ),
  reception: (
    <>
      <path d="M4 20v-3a2 2 0 012-2h12a2 2 0 012 2v3" />
      <circle cx="9" cy="9" r="2.2" />
      <circle cx="16" cy="10" r="1.8" />
    </>
  ),
  stretchPerson: (
    <>
      <path d="M4 18h9" />
      <circle cx="17" cy="7" r="2" />
      <path d="M17 9l-3 3-4 1M14 12l1 4 3 2" />
    </>
  ),
  consultTable: (
    <>
      <rect x="9" y="14" width="6" height="6" />
      <circle cx="6" cy="9" r="2" />
      <circle cx="18" cy="9" r="2" />
      <path d="M6 11v3M18 11v3" />
    </>
  ),
  sparkleClean: <path d="M12 3l1.2 4.8L18 9l-4.8 1.2L12 15l-1.2-4.8L6 9l4.8-1.2z" />,
  check: <path d="M5 12.5l4.2 4.2L19 6.8" />,
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 9h16M8 3v4M16 3v4" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4" />
    </>
  ),
  infinity: (
    <path d="M8 9a3 3 0 000 6c1.8 0 3-1.5 4-3s2.2-3 4-3a3 3 0 010 6c-1.8 0-3-1.5-4-3s-2.2-3-4-3z" />
  ),
  train: (
    <>
      <rect x="5" y="4" width="14" height="12" rx="3" />
      <path d="M5 12h14" />
      <circle cx="9" cy="17.5" r="1.2" />
      <circle cx="15" cy="17.5" r="1.2" />
    </>
  ),
  dumbbell: (
    <>
      <rect x="1.5" y="9.5" width="3" height="5" rx="1" />
      <rect x="19.5" y="9.5" width="3" height="5" rx="1" />
      <path d="M4.5 12h15" />
      <rect x="6" y="7.5" width="3" height="9" rx="1.2" />
      <rect x="15" y="7.5" width="3" height="9" rx="1.2" />
    </>
  ),
  question: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.3 9.5a2.7 2.7 0 015-1.4c0 2.2-2.7 2.2-2.7 4.4" />
      <path d="M12 16.5h.01" />
    </>
  ),
  forkKnife: (
    <>
      <path d="M6 2.5v7a2 2 0 004 0v-7M8 9.5v12" />
      <path d="M16.5 2.5c-1.4 0-2 2-2 4.5s.6 4.5 2 4.5v10" />
    </>
  ),
};

function Icon({ name, size = 26, color = pink }: { name: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      {iconPaths[name]}
    </svg>
  );
}

/* ── shared building blocks ────────────────────────────────────────── */

function Eyebrow() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: pink }} />
      ))}
    </div>
  );
}

function SectionHeading({
  plain,
  highlight,
  fontSize = 24,
}: {
  plain?: string;
  highlight?: string;
  fontSize?: number;
}) {
  return (
    <h2
      style={{
        fontFamily: fontMincho,
        fontWeight: 700,
        fontSize,
        letterSpacing: "0.06em",
        color: "#FFFFFF",
        lineHeight: 1.4,
        margin: 0,
        textAlign: "center",
        textShadow: `0 0 12px ${pink}55, 0 0 4px rgba(255,255,255,0.25)`,
      }}
    >
      {plain && nl(plain)}
      {highlight && (
        <span style={{ background: duoTextGrad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", filter: `drop-shadow(0 0 10px ${pink}66)` }}>
          {highlight}
        </span>
      )}
    </h2>
  );
}

function PillTag({ children, accent = pink, fill = false }: { children: ReactNode; accent?: string; fill?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        flex: fill ? 1 : undefined,
        padding: "8px 14px",
        borderRadius: 999,
        border: `1px solid ${accent}66`,
        background: `${accent}14`,
        color: "#FFFFFF",
        fontSize: 12.5,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function CtaButton({ text }: { text: string }) {
  return (
    <a
      href="#form"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        height: 58,
        marginTop: 30,
        background: ctaGrad,
        color: "#FFFFFF",
        textDecoration: "none",
        fontSize: 15.5,
        fontWeight: 700,
        letterSpacing: "0.04em",
        borderRadius: 999,
        boxShadow: "0 10px 26px rgba(255,61,147,0.32)",
      }}
    >
      {text}
      <span style={{ fontSize: 16 }}>→</span>
    </a>
  );
}

function OfferSection({ topPad = 48 }: { topPad?: number }) {
  const o = config.offer;
  return (
    <section style={{ padding: `${topPad}px 18px 52px`, background: "#0A0A10" }}>
      <h2 style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 25, lineHeight: 1.4, textAlign: "center", color: "#FFFFFF", margin: 0, textShadow: "0 0 14px rgba(255,255,255,0.25)" }}>
        {o.headingParts.map((p, i) =>
          p.hl ? (
            <span key={i} style={{ fontSize: 30, background: pinkTextGrad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", filter: `drop-shadow(0 0 10px ${pink}88)`, padding: "0 4px" }}>
              {p.t}
            </span>
          ) : (
            <span key={i}>{p.t}</span>
          )
        )}
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 26 }}>
        {o.cards.map((card, i) => {
          const accent = i === 1 ? blue : pink;
          return (
            <div key={i} style={{ position: "relative", borderRadius: 18, overflow: "hidden", border: `1px solid ${accent}66`, boxShadow: `0 0 22px ${accent}33` }}>
              <ImageSlot src={card.img.src} placeholder={card.img.placeholder} objectPosition={card.img.position ?? "center"} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "#12121A" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,10,16,0.55) 0%, rgba(10,10,16,0.8) 100%)" }} />
              <div style={{ position: "relative", zIndex: 2, padding: "22px 14px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 20, lineHeight: 1.35, textAlign: "center", color: "#FFFFFF", margin: 0, textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>{nl(card.label)}</p>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", marginTop: 4 }}>
                  <span style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 56, lineHeight: 1, background: pinkTextGrad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", filter: `drop-shadow(0 0 10px ${pink}88)` }}>{card.price}</span>
                  <span style={{ position: "relative", marginLeft: 3 }}>
                    <span style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", fontSize: 10, color: "rgba(255,255,255,0.7)" }}>{card.note}</span>
                    <span style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 28, lineHeight: 1, color: "#FFFFFF" }}>{card.unit}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginTop: 16, padding: "12px 8px", borderRadius: 999, border: `1px solid ${pink}44`, background: "rgba(255,61,147,0.04)", boxShadow: `0 0 16px ${pink}22` }}>
        {o.badges.map((b, i) => {
          const accent = i === 0 ? blue : i === 1 ? pink : violet;
          return (
            <span key={i} style={{ display: "contents" }}>
              {i > 0 && <span style={{ width: 1, height: 20, background: "rgba(255,255,255,0.2)" }} />}
              <span style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: fontGothic, fontWeight: 700, fontSize: 12.5, color: accent, whiteSpace: "nowrap", textShadow: `0 0 8px ${accent}99` }}>{b.label}</span>
              </span>
            </span>
          );
        })}
      </div>
      <CtaButton text={config.why.ctaText} />
    </section>
  );
}

export default function Page() {
  const c = config;
  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div style={{ fontFamily: fontSans, background: bg, minHeight: "100vh", color: "#FFFFFF" }}>
        <div style={{ maxWidth: 480, margin: "0 auto", background: bg, overflow: "hidden", position: "relative" }}>
          {/* ── header ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "14px 20px", borderBottom: `1px solid ${border}` }}>
            {c.header.logo ? (
              <img src={c.header.logo} alt={c.header.logoAlt ?? c.header.brand} style={{ height: 40, width: "auto", display: "block" }} />
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
                  {[3, 8, 13, 10, 5].map((h, i) => (
                    <rect key={i} x={i * 4.5} y={(18 - h) / 2} width="2.4" height={h} rx="1.2" fill={i % 2 === 0 ? pink : blue} />
                  ))}
                </svg>
                <div style={{ lineHeight: 1.15 }}>
                  <div style={{ fontFamily: fontGothic, fontSize: 14, fontWeight: 800, letterSpacing: "0.08em" }}>{c.header.brand}</div>
                  <div style={{ fontSize: 8.5, letterSpacing: "0.18em", color: textDim2 }}>{c.header.brandSub}</div>
                </div>
              </div>
            )}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, fontSize: 10.5, fontWeight: 400, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap" }}>
              {c.hero.access.map((a, i) => (
                <span key={i} style={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
                  {i > 0 && <span style={{ color: textDim2, marginRight: 4 }}>/</span>}
                  {a.station}
                  <span style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 400, textShadow: `0 0 6px ${blue}, 0 0 3px ${blue}, 0 0 1px ${blue}` }}>
                    {a.walk.split(/(\d+)/).map((part, j) =>
                      /^\d+$/.test(part) ? <b key={j} style={{ fontWeight: 700 }}>{part}</b> : part
                    )}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* ── FV / hero ── */}
          <section style={{ position: "relative", minHeight: "clamp(400px, 116.7vw, 560px)", overflow: "hidden", background: "#12121A" }}>
            <ImageSlot
              src={c.hero.hero.src}
              placeholder={c.hero.hero.placeholder}
              objectPosition={c.hero.hero.position ?? "center"}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "#161620" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(100deg, rgba(8,8,13,0.96) 0%, rgba(8,8,13,0.88) 32%, rgba(8,8,13,0.5) 55%, rgba(8,8,13,0.1) 75%, rgba(8,8,13,0) 90%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(8,8,13,0) 55%, rgba(8,8,13,0.85) 100%)",
              }}
            />
            <div style={{ position: "relative", zIndex: 2, padding: "48px 22px 24px" }}>
              <h1
                style={{
                  fontFamily: fontMincho,
                  fontWeight: 700,
                  fontSize: 33,
                  lineHeight: 1.35,
                  letterSpacing: "0.01em",
                  margin: 0,
                  color: "#FFFFFF",
                  textShadow: "0 2px 18px rgba(0,0,0,0.6)",
                }}
              >
                {c.hero.catchLines[0]}
                <br />
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 44,
                    color: "#FFFFFF",
                    textShadow: `0 0 10px ${pink}, 0 0 20px ${pink}CC, 0 0 4px ${pink}`,
                  }}
                >
                  {c.hero.catchLines[1]}
                </span>
              </h1>
              <p
                style={{
                  fontFamily: fontGothic,
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: "0.03em",
                  margin: "12px 0 0",
                  background: `linear-gradient(90deg, ${pink} 0%, #FF8FC4 60%, ${blue} 100%)`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter: `drop-shadow(0 0 10px ${pink}88)`,
                }}
              >
                {c.hero.subCatch}
              </p>
              <p style={{ fontSize: 11, lineHeight: 1.85, color: "rgba(255,255,255,0.8)", margin: "16px 0 0", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}>{nl(c.hero.body)}</p>

              <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "stretch", gap: 22, marginTop: 28 }}>
              <div
                style={{
                  position: "relative",
                  padding: "8px 24px 16px",
                  background:
                    "radial-gradient(120% 130% at 50% 25%, rgba(190,40,130,0.82) 0%, rgba(110,25,90,0.9) 48%, rgba(45,12,45,0.95) 100%)",
                  border: `2px solid ${pink}`,
                  boxShadow: `0 0 34px ${pink}AA, 0 0 10px ${pink}, inset 0 0 22px rgba(255,61,147,0.28)`,
                  clipPath:
                    "polygon(20px 0%, calc(100% - 20px) 0%, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0% calc(100% - 20px), 0% 20px)",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 10 }}>
                  <span
                    style={{
                      flexShrink: 0,
                      fontFamily: fontGothic,
                      fontSize: 17,
                      fontWeight: 800,
                      letterSpacing: "0.04em",
                      color: "#FFFFFF",
                      textShadow: `0 0 8px ${pink}66`,
                    }}
                  >
                    {c.hero.trialBadge.label}
                  </span>
                  <span
                    style={{
                      fontFamily: fontDisplay,
                      fontStyle: "italic",
                      fontWeight: 700,
                      fontSize: 56,
                      lineHeight: 1,
                      color: "#FFFFFF",
                      textShadow: "0 0 22px rgba(255,180,220,0.75), 0 0 6px rgba(255,255,255,0.6)",
                    }}
                  >
                    {c.hero.trialBadge.price}
                    <span style={{ fontFamily: fontMincho, fontStyle: "normal", fontSize: 22 }}>
                      {c.hero.trialBadge.unit}
                    </span>
                  </span>
                </div>

                <div
                  style={{
                    marginTop: 15,
                    padding: "8px 14px",
                    borderRadius: 999,
                    border: `1.5px solid ${pink}`,
                    background: "rgba(20,6,22,0.4)",
                    textAlign: "center",
                    fontFamily: fontGothic,
                    fontSize: 15.5,
                    fontWeight: 800,
                    letterSpacing: "0.02em",
                    color: "#FFFFFF",
                    boxShadow: `0 0 12px ${pink}55, inset 0 0 8px ${pink}22`,
                    whiteSpace: "nowrap",
                  }}
                >
                  今なら
                  <span style={{ color: "#FFE94D", textShadow: "0 0 12px rgba(255,220,60,0.7)" }}>
                    入会金
                    <span style={{ fontSize: 21, marginLeft: 3 }}>{c.hero.joinBadge.value.replace("円", "")}</span>
                    円
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                {c.hero.tags.map((t, i) => (
                  <PillTag key={i} accent={i === 1 ? blue : pink} fill>{t}</PillTag>
                ))}
              </div>
              </div>
            </div>
          </section>

          {/* ── offer (初回体験オファー・FV下) ── */}
          <OfferSection topPad={20} />

          {/* ── worry ── */}
          <section style={{ padding: "34px 22px 12px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "6px 22px",
                  borderRadius: 999,
                  border: `1px solid ${violet}`,
                  background: `${violet}14`,
                  boxShadow: `0 0 14px ${violet}55, inset 0 0 8px ${violet}22`,
                  fontFamily: fontGothic,
                  fontWeight: 800,
                  fontSize: 14,
                  letterSpacing: "0.18em",
                  color: "#FFFFFF",
                  textShadow: `0 0 8px ${violet}88`,
                }}
              >
                {c.worry.eyebrow}
              </span>
              <span style={{ width: 1, height: 18, background: `${violet}88`, boxShadow: `0 0 6px ${violet}` }} />
            </div>
            <h2 style={{ fontFamily: fontMincho, fontWeight: 700, textAlign: "center", margin: "6px 0 0", lineHeight: 1.35, color: "#FFFFFF" }}>
              <span style={{ display: "block", fontSize: 32, textShadow: `0 0 14px ${blue}66, 0 0 4px rgba(255,255,255,0.3)` }}>{c.worry.headingLarge}</span>
              <span style={{ display: "block", fontSize: 24, marginTop: 4, color: "rgba(255,255,255,0.9)" }}>{c.worry.headingSmall}</span>
            </h2>
            <div
              style={{
                marginTop: 30,
                borderRadius: 18,
                border: `1px solid ${blue}44`,
                background: "rgba(63,160,255,0.04)",
                boxShadow: `0 0 22px ${blue}22, inset 0 0 18px rgba(63,160,255,0.05)`,
                padding: "26px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 20 }}>
              {c.worry.items.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: `1.5px solid ${violet}`,
                      boxShadow: `0 0 12px ${violet}88, inset 0 0 6px ${violet}33`,
                    }}
                  >
                    <Icon name="check" size={16} color={violet} />
                  </span>
                  <span style={{ fontFamily: fontGothic, fontSize: 13, fontWeight: 700, lineHeight: 1.5, whiteSpace: "nowrap", color: "rgba(255,255,255,0.92)" }}>
                    {item.parts.map((p, j) =>
                      p.hl ? (
                        <span
                          key={j}
                          style={{
                            color: "#FFFFFF",
                            fontWeight: 800,
                            background: `linear-gradient(transparent 58%, ${pink}66 58%)`,
                            textShadow: `0 0 8px ${pink}99`,
                          }}
                        >
                          {p.t}
                        </span>
                      ) : (
                        <span key={j}>{p.t}</span>
                      )
                    )}
                  </span>
                </div>
              ))}
              </div>
            </div>
          </section>

          {/* ── why (だからBeat Pilates) ── */}
          <section style={{ padding: "12px 22px 54px", background: "#0D0D14" }}>
            <h2 style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 26, letterSpacing: "0.06em", textAlign: "center", margin: 0, color: "#FFFFFF", textShadow: `0 0 12px ${pink}55, 0 0 4px rgba(255,255,255,0.25)` }}>
              {c.why.heading}
              <span style={{ display: "block", fontFamily: fontMincho, fontWeight: 700, fontSize: 34, letterSpacing: "0.04em", background: duoTextGrad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", marginTop: 6, filter: `drop-shadow(0 0 10px ${pink}66)` }}>
                {c.why.headingHighlight}
              </span>
            </h2>
            <p style={{ textAlign: "center", fontSize: 12.5, lineHeight: 1.9, color: textDim, margin: "16px 0 0" }}>{nl(c.why.lead)}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 30 }}>
              {c.why.items.map((item, i) => {
                const accent = i === 1 ? violet : i === 2 ? blue : pink;
                return (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    borderRadius: 20,
                    overflow: "hidden",
                    border: `1px solid ${border}`,
                    background: "#0D0D14",
                  }}
                >
                  <div style={{ position: "relative", height: 200 }}>
                    <ImageSlot
                      src={item.img.src}
                      placeholder={item.img.placeholder}
                      objectPosition={item.img.position ?? "center"}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "#161620" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 0,
                        height: 110,
                        background: "linear-gradient(180deg, rgba(8,8,13,0.8) 0%, rgba(8,8,13,0.4) 55%, rgba(8,8,13,0) 100%)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: 76,
                        background: "linear-gradient(180deg, rgba(13,13,20,0) 0%, #0D0D14 100%)",
                      }}
                    />
                    <h3 style={{ position: "absolute", left: 18, right: 18, top: 16, display: "flex", alignItems: "center", gap: 12, fontFamily: fontMincho, fontWeight: 700, fontSize: 24, letterSpacing: "0.02em", margin: 0, color: "#FFFFFF" }}>
                      <span
                        style={{
                          flexShrink: 0,
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "rgba(10,10,16,0.55)",
                          border: `2px solid ${accent}`,
                          boxShadow: `0 0 16px ${accent}AA, 0 0 4px ${accent}`,
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: fontDisplay,
                            fontStyle: "italic",
                            fontWeight: 700,
                            fontSize: 16,
                            color: accent,
                            textShadow: `0 0 8px ${accent}88`,
                          }}
                        >
                          {item.num}
                        </span>
                      </span>
                      <span style={{ textShadow: `0 0 10px ${accent}, 0 0 4px ${accent}CC, 0 2px 10px rgba(0,0,0,0.7)` }}>{item.title}</span>
                    </h3>
                  </div>
                  <div style={{ padding: "16px 20px 24px" }}>
                    <p style={{ fontSize: 14.5, lineHeight: 1.8, color: "rgba(255,255,255,0.75)", margin: 0 }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              );})}
            </div>
          </section>

          {/* ── about (暗闇マシンピラティスとは) ── */}
          <section style={{ position: "relative", minHeight: 420, overflow: "hidden", background: "#12121A" }}>
            <ImageSlot
              src={c.about.photo.src}
              placeholder={c.about.photo.placeholder}
              objectPosition={c.about.photo.position ?? "center"}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "#161620", transform: "scaleX(-1)" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(100deg, rgba(8,8,13,0.96) 0%, rgba(8,8,13,0.9) 34%, rgba(8,8,13,0.55) 58%, rgba(8,8,13,0.12) 78%, rgba(8,8,13,0) 92%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(8,8,13,0) 60%, rgba(8,8,13,0.85) 100%)",
              }}
            />
            <div style={{ position: "relative", zIndex: 2, minHeight: 420, display: "flex", flexDirection: "column", padding: "10px 22px 44px" }}>
              <h2 style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 24, letterSpacing: "0.04em", lineHeight: 1.5, margin: 0, background: duoTextGrad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", filter: `drop-shadow(0 0 10px ${pink}66) drop-shadow(0 2px 8px rgba(0,0,0,0.85)) drop-shadow(0 0 3px rgba(0,0,0,0.9))` }}>{nl(c.about.heading)}</h2>
              <p style={{ maxWidth: 300, fontSize: 12, lineHeight: 1.7, color: "#FFFFFF", margin: "12px 0 0", textShadow: "0 1px 10px rgba(0,0,0,0.7)" }}>{nl(c.about.body1)}</p>
              <p style={{ maxWidth: 300, fontSize: 11.5, lineHeight: 1.7, color: "rgba(255,255,255,0.8)", margin: "8px 0 0", textShadow: "0 1px 10px rgba(0,0,0,0.7)" }}>{nl(c.about.body2)}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: "auto", paddingTop: 32 }}>
                {c.about.tags.map((t, i) => {
                  const accent = i === 1 ? violet : i === 2 ? blue : pink;
                  return (
                    <span key={i} style={{ display: "contents" }}>
                      {i > 0 && (
                        <span style={{ fontSize: 18, fontWeight: 700, color: "#FFFFFF", flexShrink: 0 }}>×</span>
                      )}
                      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "18px 4px", borderRadius: 14, border: `1px solid ${accent}`, background: "rgba(10,10,16,0.5)", backdropFilter: "blur(4px)", boxShadow: `0 0 14px ${accent}66, inset 0 0 10px ${accent}22` }}>
                        <span
                          style={{
                            fontFamily: fontMincho,
                            fontWeight: 700,
                            fontSize: t.label.length > 3 ? 15 : 20,
                            color: "#FFFFFF",
                            whiteSpace: "nowrap",
                            textShadow: `0 0 10px ${accent}, 0 0 4px ${accent}CC`,
                          }}
                        >
                          {t.label}
                        </span>
                      </div>
                    </span>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── movie (スタジオ紹介ムービー) ── */}
          <section style={{ padding: "34px 22px 52px" }}>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 24, letterSpacing: "0.06em", color: "#FFFFFF", lineHeight: 1.4, margin: 0, textShadow: `0 0 12px ${blue}55` }}>
                {c.movie.heading}
              </h2>
              <div style={{ width: 30, height: 2, background: blue, borderRadius: 2, margin: "14px auto 0", boxShadow: `0 0 8px ${blue}` }} />
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
              <div style={{ width: "100%", maxWidth: 300, borderRadius: 20, overflow: "hidden", border: `1px solid ${blue}55`, boxShadow: `0 0 26px ${blue}33`, background: "#0A0A10" }}>
                <video
                  src={c.movie.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  style={{ display: "block", width: "100%", aspectRatio: "9 / 16", objectFit: "cover", background: "#0A0A10" }}
                />
              </div>
            </div>
          </section>

          {/* ── offer (初回体験オファー) ── */}
          <OfferSection />

          {/* ── reasons (選ばれる3つの理由) ── */}
          <section style={{ padding: "36px 22px 66px", background: "#0D0D14" }}>
            <SectionHeading plain={c.reasons.heading} fontSize={20} />
            {c.reasons.items.map((item, idx) => {
              const accent = idx === 1 ? violet : idx === 2 ? blue : pink;
              return (
                <div key={idx} style={{ marginTop: idx === 0 ? 40 : 48 }}>
                  <div style={{ position: "relative" }}>
                    <ImageSlot
                      src={item.img.src}
                      placeholder={item.img.placeholder}
                      objectPosition={item.img.position ?? "center"}
                      radius={16}
                      style={{ width: "100%", height: 210, background: "#161620" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: -16,
                        right: 16,
                        width: 50,
                        height: 50,
                        transform: "rotate(45deg)",
                        background: "rgba(10,10,16,0.85)",
                        border: `2px solid ${accent}`,
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 0 18px ${accent}AA, 0 0 6px ${accent}`,
                      }}
                    >
                      <span
                        style={{
                          transform: "rotate(-45deg)",
                          fontFamily: fontDisplay,
                          fontStyle: "italic",
                          fontWeight: 700,
                          fontSize: 18,
                          color: accent,
                          textShadow: `0 0 8px ${accent}88`,
                        }}
                      >
                        {item.num}
                      </span>
                    </div>
                  </div>
                  <h3
                    style={{
                      fontFamily: fontMincho,
                      fontWeight: 700,
                      fontSize: 19,
                      lineHeight: 1.6,
                      letterSpacing: "0.02em",
                      margin: "22px 0 0",
                      color: "#FFFFFF",
                      textAlign: "center",
                      textShadow: `0 0 10px ${accent}66`,
                    }}
                  >
                    {nl(item.title)}
                  </h3>
                  <div style={{ width: 40, height: 2, background: `${accent}88`, margin: "14px auto 0", boxShadow: `0 0 8px ${accent}` }} />
                  <p style={{ fontSize: 13.5, lineHeight: 2, color: textDim, margin: item.trio ? "16px 0 20px" : "16px 0 0" }}>{item.body}</p>
                  {item.trio && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                      {item.trio.map((t, i) => (
                        <div key={i} style={{ borderRadius: 12, border: `1px solid ${accent}55`, background: `${accent}12`, minHeight: 54, padding: "12px 4px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                          <span style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: 11, lineHeight: 1.4, color: "#FFFFFF", whiteSpace: "nowrap", textShadow: `0 0 10px ${accent}, 0 0 4px ${accent}CC` }}>{t.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <CtaButton text={c.reasons.ctaText} />
            <p style={{ textAlign: "center", fontSize: 12, color: textDim2, margin: "12px 0 0" }}>{c.reasons.ctaSub}</p>
          </section>

          {/* ── trainers (インストラクター紹介) ── */}
          <section style={{ padding: "34px 0 52px" }}>
            <div style={{ textAlign: "center", padding: "0 22px" }}>
              <h2 style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 24, letterSpacing: "0.06em", color: "#FFFFFF", lineHeight: 1.4, margin: 0, textShadow: `0 0 12px ${pink}55` }}>
                {c.trainers.heading}
              </h2>
              <div style={{ width: 30, height: 2, background: pink, borderRadius: 2, margin: "14px auto 0", boxShadow: `0 0 8px ${pink}` }} />
              <p style={{ fontSize: 12.5, lineHeight: 1.9, color: textDim, margin: "18px 0 0" }}>{nl(c.trainers.lead)}</p>
            </div>
            <div
              className="no-scrollbar"
              style={{ display: "flex", gap: 16, overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", padding: "30px 22px 8px" }}
            >
              {c.trainers.items.map((t, i) => {
                const accent = i === 1 ? violet : i === 2 ? blue : pink;
                return (
                  <div key={i} style={{ flex: "none", width: 244, scrollSnapAlign: "center", background: panel, borderRadius: 18, overflow: "hidden", border: `1px solid ${accent}55`, boxShadow: `0 0 20px ${accent}33` }}>
                    <ImageSlot src={t.img.src} placeholder={t.img.placeholder} style={{ width: "100%", height: 264, background: "#161620" }} />
                    <div style={{ padding: "18px 20px 22px" }}>
                      <div style={{ fontSize: 11, letterSpacing: "0.14em", color: accent }}>{t.role}</div>
                      <div style={{ fontFamily: fontMincho, fontSize: 20, letterSpacing: "0.04em", color: "#FFFFFF", marginTop: 6 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: textDim2, marginTop: 2 }}>{t.nameEn}</div>
                      <p style={{ fontSize: 12.5, lineHeight: 1.9, color: textDim, margin: "12px 0 0" }}>{t.body}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                        {t.tags.map((tag, ti) => (
                          <span key={ti} style={{ fontSize: 10.5, letterSpacing: "0.02em", color: "#FFFFFF", border: `1px solid ${accent}66`, background: `${accent}18`, borderRadius: 999, padding: "4px 10px" }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 20 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.1em", color: textDim2 }}>{c.trainers.swipeHint}</span>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section style={{ padding: "34px 22px 54px", background: "#0D0D14" }}>
            <SectionHeading plain={c.faq.heading} />
            <div style={{ marginTop: 28 }}>
              <FaqDark items={c.faq.items} pink={pink} />
            </div>
          </section>

          {/* ── pricing (料金プラン) ── */}
          <section style={{ padding: "34px 22px 54px", background: "#0D0D14" }}>
            <h2 style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 25, letterSpacing: "0.04em", textAlign: "center", margin: 0, color: "#FFFFFF" }}>
              {c.pricing.heading}
              <span style={{ background: pinkTextGrad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", filter: `drop-shadow(0 0 10px ${pink}66)` }}>{c.pricing.headingHighlight}</span>
            </h2>
            <div style={{ marginTop: 28, borderRadius: 16, border: `1px solid ${pink}44`, background: "rgba(255,61,147,0.04)", boxShadow: `0 0 20px ${pink}22, inset 0 0 16px rgba(255,61,147,0.05)`, overflow: "hidden" }}>
              {c.pricing.plans.map((p, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderTop: i === 0 ? "none" : `1px solid ${border}`,
                  }}
                >
                  <div style={{ flex: 1, padding: "16px 16px" }}>
                    <div style={{ fontFamily: fontGothic, fontWeight: 700, fontSize: 15, color: "#FFFFFF" }}>{p.label}</div>
                    {p.sublabel && <div style={{ fontSize: 10.5, color: textDim2, marginTop: 3 }}>{p.sublabel}</div>}
                  </div>
                  <div style={{ flex: 1, padding: "16px 16px", borderLeft: `1px solid ${border}`, textAlign: "center" }}>
                    <span
                      style={{
                        fontFamily: fontGothic,
                        fontWeight: 800,
                        fontSize: 22,
                        letterSpacing: "0.01em",
                        background: pinkTextGrad,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        filter: `drop-shadow(0 0 8px ${pink}77)`,
                      }}
                    >
                      {p.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, color: textDim2, margin: "16px 0 0", textAlign: "center" }}>{c.pricing.note}</p>
          </section>

          {/* ── voices (お客様の声) ── */}
          <section style={{ padding: "34px 0 52px", background: "#0D0D14" }}>
            <div style={{ textAlign: "center", padding: "0 22px" }}>
              <h2 style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 24, letterSpacing: "0.06em", color: "#FFFFFF", lineHeight: 1.4, margin: 0, textShadow: `0 0 12px ${pink}55` }}>
                {c.voices.heading}
              </h2>
              <div style={{ width: 30, height: 2, background: pink, borderRadius: 2, margin: "14px auto 0", boxShadow: `0 0 8px ${pink}` }} />
            </div>
            <div
              className="no-scrollbar"
              style={{ display: "flex", gap: 16, overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", padding: "30px 22px 8px" }}
            >
              {c.voices.items.map((v, i) => {
                const accent = i === 1 ? violet : i === 2 ? blue : pink;
                return (
                  <div key={i} style={{ flex: "none", width: 288, maxWidth: "84vw", scrollSnapAlign: "center", background: panel, borderRadius: 18, border: `1px solid ${accent}55`, boxShadow: `0 0 20px ${accent}33`, padding: "24px 22px 26px", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ flexShrink: 0, width: 46, height: 46, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fontMincho, fontSize: 18, color: "#FFFFFF", border: `1.5px solid ${accent}`, background: `${accent}1A`, boxShadow: `0 0 12px ${accent}66, inset 0 0 8px ${accent}22` }}>
                        {v.name.charAt(0)}
                      </span>
                      <div>
                        <div style={{ fontFamily: fontGothic, fontWeight: 700, fontSize: 14.5, color: "#FFFFFF" }}>{v.name}</div>
                        <div style={{ fontSize: 11.5, color: textDim2, marginTop: 2 }}>{v.meta}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 2, marginTop: 14, color: accent }}>
                      {Array.from({ length: v.rating }).map((_, si) => (
                        <span key={si} style={{ fontSize: 15, textShadow: `0 0 8px ${accent}99` }}>★</span>
                      ))}
                    </div>
                    <p style={{ fontSize: 13, lineHeight: 1.95, color: textDim, margin: "14px 0 0" }}>{v.comment}</p>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 20 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.1em", color: textDim2 }}>{c.voices.swipeHint}</span>
            </div>
          </section>

          {/* ── access (店舗のご案内) ── */}
          <section id="access" style={{ padding: "34px 22px 54px" }}>
            <SectionHeading plain={c.access.heading} />
            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 30 }}>
              {c.access.stores.map((store, i) => {
                const accent = blue;
                return (
                <div key={i} style={{ borderRadius: 16, overflow: "hidden", border: `1.5px solid ${accent}`, background: panel, boxShadow: `0 0 14px ${accent}66, inset 0 0 10px ${accent}22` }}>
                  <ImageSlot src={store.img.src} placeholder={store.img.placeholder} style={{ width: "100%", height: 160, background: "#161620" }} />
                  <div style={{ padding: 20 }}>
                    <h3 style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: 17, letterSpacing: "0.04em", margin: 0, color: "#FFFFFF" }}>{store.name}</h3>
                    <p style={{ fontSize: 12, lineHeight: 1.9, color: textDim, margin: "8px 0 0" }}>
                      {store.address}
                      <br />
                      <span style={{ color: blue, fontWeight: 700 }}>{store.hours}</span>
                      <br />
                      {nl(store.route)}
                    </p>
                  </div>
                </div>
                );
              })}
            </div>
          </section>

          {/* ── form ── */}
          <section id="form" style={{ padding: "34px 22px 54px", background: "linear-gradient(160deg, #0B1030 0%, #171436 55%, #2A1A47 100%)" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 20px", borderRadius: 999, border: `1px solid ${pink}`, background: `${pink}14`, color: "#FFFFFF", fontSize: 12, fontWeight: 800, letterSpacing: "0.04em", boxShadow: `0 0 14px ${pink}55, inset 0 0 8px ${pink}22`, textShadow: `0 0 8px ${pink}` }}>
                ＼ 今なら初回体験0円 ／
              </span>
            </div>
            <SectionHeading plain={c.form.heading} />
            <p style={{ textAlign: "center", fontSize: 12.5, lineHeight: 1.9, color: textDim, margin: "16px 0 0" }}>{nl(c.form.lead)}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, margin: "18px 0 0" }}>
              {c.sticky.offers.map((o, i) => {
                const accent = i % 2 === 0 ? pink : blue;
                return (
                  <span key={o.label} style={{ display: "inline-flex", alignItems: "baseline", gap: 6, padding: "8px 18px", borderRadius: 12, border: `1.5px solid ${accent}`, background: `${accent}12`, boxShadow: `0 0 12px ${accent}44, inset 0 0 8px ${accent}18` }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>{o.label}</span>
                    <span style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: 18, color: "#FFFFFF", textShadow: `0 0 8px ${accent}, 0 0 3px ${accent}` }}>{o.value}</span>
                  </span>
                );
              })}
            </div>
            {/* LPForm's <label> text is styled dark (for pattern A's light background); override
                to white here since this section sits on the dark theme's near-black background. */}
            <style>{`
              #form label { color: #FFFFFF !important; }
              #form .lpform-required-tag { color: ${pink} !important; font-weight: 700; }
              #form .lpform-disclaimer { font-size: 9.5px !important; letter-spacing: -0.01em; white-space: nowrap; }
              @keyframes beatCtaPulse {
                0%, 100% { transform: scale(1); box-shadow: 0 10px 26px rgba(255,61,147,0.32); }
                50% { transform: scale(1.02); box-shadow: 0 12px 32px rgba(255,61,147,0.55), 0 0 24px rgba(63,160,255,0.42); }
              }
            `}</style>
            <LPForm
              clientSlug={c.slug}
              accent={pink}
              fields={c.form.fields}
              submitLabel={c.form.submitLabel}
              errorMessage={c.form.errorMessage}
              disclaimer={c.form.disclaimer}
              submitStyle={{ background: ctaGrad, boxShadow: "0 10px 26px rgba(255,61,147,0.32)", letterSpacing: "0.06em", whiteSpace: "nowrap", animation: "beatCtaPulse 1.8s ease-in-out infinite" }}
            />
          </section>
        </div>
      </div>

      <StickyDark
        anchor={c.sticky.anchor}
        buttonText={c.sticky.buttonText}
        gradient={ctaGrad}
        showAfter={0}
        offers={c.sticky.offers.map((o) => (
          <span key={o.label} style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
            <span style={{ fontSize: 11, color: textDim }}>{o.label}</span>
            <span style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: 16, color: pink }}>{o.value}</span>
          </span>
        ))}
      />
    </LPShell>
  );
}
