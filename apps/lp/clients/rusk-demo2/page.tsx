import type { CSSProperties, ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPForm from "@/components/LPForm";
import LPCanvas from "@/components/LPCanvas";
import ImageSlot from "@/components/ImageSlot";
import FaqAccordion from "./FaqAccordion";
import LineLink from "./LineLink";
import BottomBar from "./BottomBar";
import config, { type DesignSchoolConfig, type Rich } from "./config";

/* ── palette / type ─────────────────────────────────────────── */

const C = {
  pink: "#BF7286",
  rose: "#B4506B",
  roseText: "#B4586F",
  text: "#383A42",
  navy: "#2F3A4E",
  navy2: "#3A4559",
  cream: "#F4F0EB",
  marker: "#F3E7CF",
  champagne: "#E9D3A4",
  gold: "#C9A24B",
};
const mincho = "'Shippori Mincho', 'Noto Serif JP', serif";
const gothic = "'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif";
const script = "'Playfair Display', serif";
const pinkGrad = `linear-gradient(90deg, ${C.pink} 0%, #D49AA8 100%)`;

/* ── text helpers ───────────────────────────────────────────── */

/**
 * `[[...]]` → アクセント色、`{{...}}` → 黄色マーカー、`\n` → 改行。
 * `marker: "text"` のときは `{{...}}` を黄色文字にする（濃い地の上で使う）。
 */
function rich(text: Rich, opts: { accent?: string; marker?: "box" | "text" } = {}): ReactNode {
  const accent = opts.accent ?? C.roseText;
  const parts = text.split(/(\{\{.*?\}\}|\[\[.*?\]\]|\n)/);
  return parts.map((p, i) => {
    if (p === "\n") return <br key={i} />;
    if (p.startsWith("{{") && p.endsWith("}}")) {
      const inner = rich(p.slice(2, -2), opts);
      return opts.marker === "text" ? (
        <span key={i} style={{ color: C.champagne }}>
          {inner}
        </span>
      ) : (
        <span
          key={i}
          style={{
            background: C.marker,
            padding: "1px 2px",
            boxDecorationBreak: "clone",
            WebkitBoxDecorationBreak: "clone",
          }}
        >
          {inner}
        </span>
      );
    }
    if (p.startsWith("[[") && p.endsWith("]]")) {
      return (
        <span key={i} style={{ color: accent, fontWeight: 700 }}>
          {rich(p.slice(2, -2), opts)}
        </span>
      );
    }
    return p;
  });
}

/** セクション背後の大きな英字。 */
function BgWord({ children, color = "rgba(255,255,255,0.55)", top = 18 }: { children: string; color?: string; top?: number }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        textAlign: "center",
        fontFamily: gothic,
        fontWeight: 800,
        fontSize: 62,
        letterSpacing: "0.04em",
        lineHeight: 1,
        color,
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
}

/* ── icons ──────────────────────────────────────────────────── */

type IconName = "doc" | "yen" | "career" | "chat" | "office" | "hand";

function Icon({ name, size = 30 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "#fff",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "doc":
      return (
        <svg {...common}>
          <path d="M9 5h11l4 4v18H9z" />
          <path d="M20 5v4h4M13 13h7M13 17h7M13 21h5" />
        </svg>
      );
    case "yen":
      return (
        <svg {...common}>
          <circle cx="16" cy="11" r="6" />
          <path d="M13.5 8.5 16 11.5l2.5-3M16 11.5V15M14 12.5h4" />
          <path d="M4 22h5l5 2h6a2 2 0 0 0 0-4h-4M9 26l5 1h7l7-5a2 2 0 0 0-3-2.5L20 22" />
        </svg>
      );
    case "career":
      return (
        <svg {...common}>
          <rect x="4" y="6" width="24" height="16" rx="1" />
          <path d="M12 26h8M16 22v4M8 18l5-5 3 3 3-3 5 5" />
          <circle cx="11" cy="10.5" r="1.2" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M9 7h17v13H15l-5 4v-4H9z" />
          <path d="M13 12h9M13 15.5h7" />
          <path d="M6 11v12l3-2" />
        </svg>
      );
    case "office":
      return (
        <svg {...common}>
          <path d="M8 27V6h12v21M20 13h5v14M5 27h23" />
          <path d="M11 10h2M15 10h2M11 14h2M15 14h2M11 18h2M15 18h2M13 27v-4h2v4" />
        </svg>
      );
    case "hand":
      return (
        <svg {...common}>
          <path d="M3 12l5-3 5 2 3-1 5 1 5 3 3-1" />
          <path d="M8 9l-3 9 3 2M26 13l-2 8-3 2M13 11l-3 4c1 1 2.5 1 3.5 0l2-2 6 6" />
          <path d="M12 21l2 2M15 19l3 3M18 18l2.5 2.5M10 23l1.5 1.5" />
        </svg>
      );
  }
}

/** 白い丸に「›」。CTAボタンの右端。 */
function ArrowDot({ color }: { color: string }) {
  return (
    <span
      style={{
        position: "absolute",
        right: 22,
        top: "50%",
        transform: "translateY(-50%)",
        width: 20,
        height: 20,
        borderRadius: 999,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10">
        <path d="M3.5 2 6.5 5l-3 3" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>
    </span>
  );
}

const ctaBase: CSSProperties = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 56,
  borderRadius: 999,
  color: "#fff",
  fontFamily: gothic,
  fontSize: 15.5,
  fontWeight: 700,
  letterSpacing: "0.1em",
  textDecoration: "none",
};

function CtaPair({ c }: { c: DesignSchoolConfig }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "0 20px" }}>
      <a
        href="#form"
        style={{
          ...ctaBase,
          background: "linear-gradient(180deg,#C9667F 0%,#B4506B 55%,#A84862 100%)",
          boxShadow: "0 4px 0 #8A3850, 0 10px 18px rgba(138,56,80,0.3)",
        }}
      >
        <span>{rich(c.consult.ctaText, { marker: "text" })}</span>
        <ArrowDot color={C.rose} />
      </a>
      <LineLink
        clientSlug={c.slug}
        href={c.lineUrl}
        style={{
          ...ctaBase,
          background: "linear-gradient(180deg,#2FCB3A 0%,#0DB705 55%,#0AA804 100%)",
          boxShadow: "0 4px 0 #0A8F04, 0 10px 18px rgba(10,143,4,0.25)",
        }}
      >
        <span>
          <span style={{ color: C.champagne }}>LINE</span>
          {c.consult.lineText.replace(/^LINE/, "")}
        </span>
        <ArrowDot color="#0DB705" />
      </LineLink>
    </div>
  );
}

/** 無料個別相談会ブロック（FV直後とサポート後の2回使う）。 */
function Consult({ c }: { c: DesignSchoolConfig }) {
  const k = c.consult;
  return (
    <section
      style={{
        background: "linear-gradient(100deg,#E8E0D8 0%,#E6D8D6 50%,#DEDBE2 100%)",
        padding: "40px 0 36px",
      }}
    >
      <div style={{ position: "relative", margin: "0 18px", background: "#fff", borderRadius: 10, padding: 6 }}>
        <div
          style={{
            border: `1px solid ${C.pink}88`,
            borderRadius: 6,
            padding: "30px 0 24px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: -14,
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              background: pinkGrad,
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
              padding: "6px 20px",
              borderRadius: 999,
              border: "2px solid #fff",
            }}
          >
            {k.pill}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 16px" }}>
            <span style={{ flex: 1, height: 1, background: C.text }} />
            <span style={{ fontFamily: mincho, fontSize: 21, fontWeight: 600, color: C.text, letterSpacing: "0.08em" }}>
              {k.lead.replace("無料の", "")}
              <span style={{ fontSize: 26 }}>無料</span>の
            </span>
            <span style={{ flex: 1, height: 1, background: C.text }} />
          </div>
          <div style={{ marginTop: 6, fontFamily: mincho, fontWeight: 700, letterSpacing: "0.06em" }}>
            <span
              style={{
                fontSize: 41,
                color: C.roseText,
                backgroundImage: "linear-gradient(transparent 62%, rgba(180,88,111,0.18) 62%)",
              }}
            >
              {k.heading}
            </span>
            <span style={{ fontSize: 30, color: C.text }}>へ</span>
          </div>
          <div style={{ height: 1, background: C.text, margin: "12px 16px 0" }} />
          <p style={{ margin: "18px 0 0", fontSize: 12.5, lineHeight: 2.25, letterSpacing: "0.08em", color: C.text }}>
            {rich(k.body)}
          </p>
          <div style={{ position: "relative", height: 150, margin: "22px -12px 0" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 200, border: "3px solid #fff", boxShadow: "0 6px 16px rgba(0,0,0,0.15)" }}>
              <ImageSlot src={k.photos[0].src} placeholder={k.photos[0].placeholder} style={{ width: "100%", aspectRatio: "16 / 10.5" }} />
            </div>
            <div style={{ position: "absolute", right: 0, top: 18, width: 200, border: "3px solid #fff", boxShadow: "0 6px 16px rgba(0,0,0,0.15)" }}>
              <ImageSlot src={k.photos[1].src} placeholder={k.photos[1].placeholder} style={{ width: "100%", aspectRatio: "16 / 10.5" }} />
            </div>
          </div>
          <p style={{ margin: "26px 0 0", fontFamily: mincho, fontSize: 16, letterSpacing: "0.08em", color: C.text }}>
            <span style={{ color: C.text, opacity: 0.6, marginRight: 6 }}>＼</span>
            {k.topicsHeading}
            <span style={{ color: C.text, opacity: 0.6, marginLeft: 6 }}>／</span>
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "0 4px", marginTop: 14 }}>
            {k.topics.map((t) => (
              <div key={t.label} style={{ width: 84, textAlign: "center" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    margin: "0 auto",
                    borderRadius: 999,
                    background: "linear-gradient(135deg,#C98597 0%,#AE6479 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name={t.icon} />
                </div>
                <p style={{ margin: "8px 0 0", fontSize: 10, lineHeight: 1.5, letterSpacing: 0, whiteSpace: "nowrap", color: C.text }}>
                  {rich(t.label)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 30 }}>
        <CtaPair c={c} />
      </div>
    </section>
  );
}

/* ── page ───────────────────────────────────────────────────── */

export default function Page() {
  const c = config;

  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div style={{ background: "#ECE8E4", minHeight: "100vh", fontFamily: gothic, color: C.text }}>
        <LPCanvas background="#fff" boxShadow="0 0 60px rgba(120,60,80,0.14)">
          {/* ── header ── */}
          <header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 40,
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 8px",
              background: "rgba(255,255,255,0.96)",
            }}
          >
            <ImageSlot
              src={c.brand.logo.src}
              placeholder={c.brand.logo.placeholder}
              objectFit="contain"
              style={{ width: 108, height: 36, flex: "none" }}
            />
            <LineLink
              clientSlug={c.slug}
              href={c.lineUrl}
              style={{
                flex: "none",
                height: 34,
                padding: "0 12px",
                display: "flex",
                alignItems: "center",
                borderRadius: 4,
                background: "#0DB705",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            >
              {c.header.lineText}
            </LineLink>
            <a
              href="#form"
              style={{
                flex: 1,
                height: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
                background: C.rose,
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              {c.header.ctaText}
            </a>
          </header>

          {/* ── offer bar ── */}
          <div
            style={{
              background: `linear-gradient(90deg,${C.navy} 0%,#3D4A62 100%)`,
              padding: "10px 0",
              textAlign: "center",
              fontFamily: mincho,
              fontSize: 14.5,
              fontWeight: 600,
              lineHeight: 1.6,
              letterSpacing: "0.1em",
              color: "#fff",
            }}
          >
            {rich(c.offerBar, { marker: "text" })}
          </div>

          {/* ── FV ── */}
          <section
            style={{
              position: "relative",
              background: "linear-gradient(180deg,#F6F2EE 0%,#F1EAE6 45%,#FAF8F5 75%,#EEF0F3 100%)",
              padding: "20px 0 26px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  display: "inline-block",
                  transform: "rotate(-2deg)",
                  background: "rgba(79,63,63,0.92)",
                  color: "#fff",
                  fontFamily: mincho,
                  fontSize: 19,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  padding: "4px 14px",
                }}
              >
                {c.fv.label}
              </span>
            </div>
            <h1 style={{ margin: "10px 0 0", fontFamily: mincho, fontWeight: 700, color: C.navy, lineHeight: 1.15 }}>
              <span style={{ display: "block", paddingLeft: 22, transform: "skewX(-6deg)" }}>
                <span
                  style={{
                    fontSize: 46,
                    color: "#B4586F",
                    backgroundImage: "linear-gradient(transparent 82%, rgba(180,88,111,0.55) 82%, rgba(180,88,111,0.55) 88%, transparent 88%)",
                  }}
                >
                  {c.fv.titleAccent}
                </span>
                <span style={{ display: "inline-block", fontSize: 48, marginLeft: 6, borderBottom: `1.5px solid ${C.navy}`, paddingRight: 4, lineHeight: 1.1 }}>
                  {c.fv.titleRest}
                </span>
              </span>
              <span
                style={{
                  display: "block",
                  marginTop: 4,
                  paddingLeft: 38,
                  fontSize: 40,
                  transform: "skewX(-8deg)",
                }}
              >
                <span style={{ display: "inline-block", borderBottom: `1.5px solid ${C.navy}`, paddingRight: 6, lineHeight: 1.1, whiteSpace: "nowrap" }}>
                  {c.fv.titleLine2}
                </span>
              </span>
            </h1>
            <div style={{ position: "relative", marginTop: 6, marginLeft: 18 }}>
              <ImageSlot
                src={c.fv.photo.src}
                placeholder={c.fv.photo.placeholder}
                objectPosition={c.fv.photo.position}
                style={{ width: "100%", aspectRatio: "372 / 245", borderRadius: "36px 0 0 18px" }}
              />
              <div
                style={{
                  position: "absolute",
                  right: 6,
                  bottom: -16,
                  width: 108,
                  height: 108,
                  borderRadius: 999,
                  background: "radial-gradient(circle at 35% 30%, #F3DC98 0%, #D8B35E 45%, #B88E36 100%)",
                  boxShadow: "0 6px 14px rgba(120,90,30,0.35)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontFamily: mincho,
                  transform: "rotate(-8deg)",
                }}
              >
                <span style={{ fontSize: 9, letterSpacing: "0.3em" }}>★★★★★</span>
                <span style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, fontStyle: "italic" }}>{c.fv.badge.big}</span>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{c.fv.badge.small}</span>
                <span style={{ fontSize: 9, letterSpacing: "0.3em" }}>★★★★★</span>
              </div>
            </div>
            <p style={{ margin: "26px 0 0", textAlign: "center", fontSize: 14, letterSpacing: "0.18em" }}>
              <span style={{ marginRight: 10 }}>［</span>
              {c.fv.kicker}
              <span style={{ marginLeft: 10 }}>］</span>
            </p>
            <h2 style={{ margin: "6px 0 0", textAlign: "center", fontFamily: mincho, fontSize: 23, fontWeight: 700, letterSpacing: "0.08em" }}>
              {c.fv.heading}
            </h2>
            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 14 }}>
              {c.fv.skills.map((s) => (
                <span
                  key={s}
                  style={{
                    background: C.pink,
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    padding: "5px 9px",
                    borderRadius: 4,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, padding: "0 20px", marginTop: 18 }}>
              {c.fv.points.map((p) => (
                <div
                  key={p}
                  style={{
                    flex: 1,
                    background: "#fff",
                    borderRadius: 6,
                    boxShadow: "0 4px 14px rgba(47,58,78,0.10)",
                    padding: "14px 0",
                    textAlign: "center",
                    fontFamily: mincho,
                    fontSize: 13.5,
                    fontWeight: 600,
                    lineHeight: 1.55,
                    letterSpacing: "0.06em",
                  }}
                >
                  <span style={{ fontSize: 13.5 }}>{rich(p.split("\n")[0])}</span>
                  <br />
                  <span style={{ fontSize: 17 }}>{rich(p.split("\n")[1] ?? "")}</span>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                margin: "14px 20px 0",
                padding: "10px 0",
                background: C.navy,
                color: "#fff",
                textAlign: "center",
                fontFamily: mincho,
                fontSize: 14,
                fontWeight: 600,
                lineHeight: 1.6,
                letterSpacing: "0.08em",
              }}
            >
              <span style={{ color: C.champagne, fontSize: 12 }}>✦</span>
              <span>{rich(c.fv.authority, { accent: C.champagne })}</span>
              <span style={{ color: C.champagne, fontSize: 12 }}>✦</span>
            </div>
          </section>

          <Consult c={c} />

          {/* ── problem ── */}
          <section style={{ position: "relative", background: "#F5F5F5", paddingBottom: 40 }}>
            <div
              style={{
                position: "absolute",
                inset: "0 0 auto 0",
                height: 290,
                background: C.navy,
                clipPath: "polygon(0 0,100% 0,100% 70%,0 100%)",
              }}
            />
            <BgWord color="rgba(255,255,255,0.05)" top={24}>
              PROBLEM
            </BgWord>
            <div style={{ position: "relative", paddingTop: 52, textAlign: "center", color: "#fff", fontFamily: mincho }}>
              <p style={{ margin: 0, fontSize: 19, letterSpacing: "0.18em" }}>{c.problem.lead}</p>
              <p style={{ margin: "8px 0 0", letterSpacing: "0.1em" }}>
                <span style={{ fontSize: 34, fontWeight: 700, borderBottom: "3px double rgba(255,255,255,0.7)" }}>
                  {c.problem.headingAccent}
                </span>
                <span style={{ fontSize: 19 }}>{c.problem.headingRest}</span>
              </p>
            </div>
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 10, padding: "0 22px", marginTop: 30 }}>
              {c.problem.items.map((it, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    zIndex: i >= 4 ? 0 : 1,
                    background: "#fff",
                    borderRadius: 4,
                    boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
                    padding: "15px 16px",
                    display: "flex",
                    gap: 10,
                    fontSize: 13,
                    lineHeight: 1.65,
                    letterSpacing: "0.08em",
                  }}
                >
                  <svg width="20" height="18" viewBox="0 0 20 18" style={{ flex: "none", marginTop: 2 }}>
                    <rect x="1" y="3" width="13" height="13" fill="none" stroke={C.roseText} strokeWidth="1.4" />
                    <path d="M4 9l4 4 10-11" fill="none" stroke={C.roseText} strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span>{rich(it)}</span>
                </div>
              ))}
              <div style={{ position: "absolute", right: 0, bottom: -10, width: 140, zIndex: 2 }}>
                <ImageSlot
                  src={c.problem.illustration.src}
                  placeholder={c.problem.illustration.placeholder}
                  objectFit="contain"
                  style={{ width: "100%", aspectRatio: "140 / 160", background: c.problem.illustration.src ? "transparent" : "#EDE8DE" }}
                />
              </div>
            </div>
            <p style={{ margin: "34px 0 0", textAlign: "center", fontFamily: mincho, fontSize: 15, letterSpacing: "0.12em" }}>
              {c.problem.goalLead}
            </p>
            <div
              style={{
                margin: "8px 26px 0",
                background: C.marker,
                padding: "8px 0",
                textAlign: "center",
                fontFamily: mincho,
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            >
              {c.problem.goal}
            </div>
          </section>

          {/* ── gap ── */}
          <section
            style={{
              position: "relative",
              background: "linear-gradient(180deg,#fff 0%,#F8F6F3 55%,#EFF0F3 100%)",
              padding: "30px 0 30px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "inline-block",
                border: `1px solid ${C.text}`,
                borderRadius: 12,
                background: "#fff",
                padding: "9px 30px",
                fontFamily: mincho,
                fontSize: 14,
                letterSpacing: "0.14em",
              }}
            >
              {c.gap.bubble}
              <span
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: -8,
                  width: 14,
                  height: 14,
                  background: "#fff",
                  borderRight: `1px solid ${C.text}`,
                  borderBottom: `1px solid ${C.text}`,
                  transform: "translateX(-50%) rotate(45deg)",
                }}
              />
            </div>
            <div style={{ marginTop: 26, fontFamily: mincho, fontWeight: 700, letterSpacing: "0.08em", lineHeight: 1.45 }}>
              <p style={{ margin: 0, fontSize: 22 }}>
                {c.gap.line1.split(/(「.*?」)/).map((t, i) =>
                  t.startsWith("「") ? (
                    <span key={i} style={{ fontSize: 32 }}>
                      {t}
                    </span>
                  ) : (
                    t
                  ),
                )}
              </p>
              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: 33,
                  color: C.roseText,
                }}
              >
                <span style={{ backgroundImage: "linear-gradient(transparent 70%, rgba(180,88,111,0.2) 70%)" }}>{c.gap.line2}</span>
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 27 }}>{c.gap.line3}</p>
            </div>
            <div
              style={{
                display: "inline-block",
                marginTop: 18,
                background: C.navy2,
                color: "#fff",
                fontSize: 14,
                letterSpacing: "0.12em",
                padding: "6px 18px",
              }}
            >
              {c.gap.band}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 18 }}>
              {c.gap.pillars.map((p) => (
                <div key={p.label} style={{ width: 106 }}>
                  <ImageSlot
                    src={p.image.src}
                    placeholder={p.image.placeholder}
                    radius={999}
                    style={{ width: 92, height: 92, margin: "0 auto", border: "3px solid #fff", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                  />
                  <div
                    style={{
                      marginTop: -8,
                      position: "relative",
                      background: p.color,
                      color: "#fff",
                      fontSize: 13.5,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      padding: "5px 0",
                      borderRadius: 999,
                    }}
                  >
                    {p.label}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ margin: "14px 0 0", fontFamily: mincho, fontSize: 17, letterSpacing: "0.14em" }}>{c.gap.after}</p>
            <div
              style={{
                margin: "10px 22px 0",
                background: "#fff",
                boxShadow: "0 4px 14px rgba(0,0,0,0.07)",
                padding: "10px 0",
                fontFamily: mincho,
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            >
              {rich(c.gap.power)}
            </div>
            <p style={{ margin: "26px 0 0", fontSize: 14, lineHeight: 1.9, letterSpacing: "0.14em" }}>
              {rich(c.gap.worry)}
            </p>
            <div style={{ width: 1, height: 56, background: C.text, margin: "22px auto 0" }} />
          </section>

          {/* ── intro ── */}
          <section style={{ position: "relative", padding: "0 0 26px", background: "#F2F3F5" }}>
            <ImageSlot
              src={c.intro.bg.src}
              placeholder={c.intro.bg.placeholder}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(255,255,255,0.85) 0%,rgba(255,255,255,0.4) 40%,rgba(255,255,255,0.2) 100%)" }} />
            <div style={{ position: "relative", textAlign: "center", paddingTop: 10 }}>
              <span
                style={{
                  display: "inline-block",
                  transform: "rotate(-4deg)",
                  background: pinkGrad,
                  color: "#fff",
                  fontFamily: mincho,
                  fontSize: 17,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  padding: "6px 14px",
                }}
              >
                {c.intro.tag}
              </span>
              <div
                style={{
                  margin: "16px 40px 0",
                  borderBottom: `1px solid ${C.text}`,
                  paddingBottom: 4,
                  fontFamily: mincho,
                  fontSize: 44,
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: C.navy,
                  letterSpacing: "0.02em",
                }}
              >
                {c.brand.name}
              </div>
            </div>
            <div style={{ position: "relative", height: 300, marginTop: 14 }}>
              <div style={{ position: "absolute", right: 0, top: 0, width: 230 }}>
                <ImageSlot
                  src={c.intro.photo.src}
                  placeholder={c.intro.photo.placeholder}
                  style={{ width: "100%", height: 300 }}
                />
              </div>
              <div style={{ position: "absolute", left: 38, top: 10, display: "flex", gap: 10, alignItems: "flex-start" }}>
                {[...c.intro.vertical].reverse().map((v) => (
                  <span
                    key={v}
                    style={{
                      writingMode: "vertical-rl",
                      background: "#F7F2E9",
                      boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
                      padding: "10px 7px",
                      fontFamily: gothic,
                      fontSize: 18,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: C.navy,
                    }}
                  >
                    {rich(v)}
                  </span>
                ))}
              </div>
            </div>
            <div
              style={{
                position: "relative",
                margin: "-10px 20px 0",
                background: "#fff",
                border: `1px solid ${C.pink}88`,
                borderRadius: 12,
                padding: "18px 10px",
                textAlign: "center",
                fontSize: 12.5,
                lineHeight: 2.1,
                letterSpacing: "0.06em",
                boxShadow: "0 0 0 4px rgba(255,255,255,0.7)",
              }}
            >
              {rich(c.intro.body.replace("〇〇〇〇〇", c.brand.name))}
            </div>
          </section>

          {/* ── authority ── */}
          <section style={{ position: "relative", background: "#fff", padding: "40px 0 40px" }}>
            <BgWord color="rgba(47,58,78,0.05)" top={30}>
              {c.authority.eyebrow}
            </BgWord>
            <div style={{ position: "relative", textAlign: "center", paddingTop: 20 }}>
              <p style={{ margin: 0, color: C.roseText, fontSize: 12, fontWeight: 700, letterSpacing: "0.24em" }}>{c.authority.eyebrow}</p>
              <h2 style={{ margin: "6px 0 0", fontFamily: mincho, fontSize: 27, fontWeight: 700, letterSpacing: "0.14em" }}>
                {c.authority.lead}
              </h2>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-end", margin: "24px 22px 0" }}>
              <ImageSlot
                src={c.authority.photo.src}
                placeholder={c.authority.photo.placeholder}
                objectPosition={c.authority.photo.position}
                style={{ width: 140, flex: "none", aspectRatio: "3 / 4" }}
              />
              <div style={{ flex: 1, paddingBottom: 4 }}>
                <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.06em", color: "#6B6D76" }}>{c.authority.role}</p>
                <p style={{ margin: "6px 0 0", fontFamily: mincho, fontSize: 26, fontWeight: 700, letterSpacing: "0.14em", lineHeight: 1.2 }}>
                  {c.authority.name}
                </p>
                <p style={{ margin: "2px 0 0", fontFamily: script, fontStyle: "italic", fontSize: 13, color: C.roseText }}>
                  {c.authority.nameEn}
                </p>
                <div style={{ marginTop: 14, borderTop: `1px solid ${C.navy}`, borderBottom: `1px solid ${C.navy}`, padding: "8px 0", textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.12em" }}>{c.authority.stat.label}</p>
                  <p style={{ margin: "2px 0 0", fontFamily: mincho, fontWeight: 700, color: C.navy, lineHeight: 1.2 }}>
                    <span style={{ fontSize: 34, letterSpacing: "0.04em" }}>{c.authority.stat.value}</span>
                    <span style={{ fontSize: 14, marginLeft: 2 }}>{c.authority.stat.unit}</span>
                  </p>
                </div>
              </div>
            </div>
            <p style={{ margin: "20px 22px 0", fontSize: 12.5, lineHeight: 2.1, letterSpacing: "0.06em" }}>
              {rich(c.authority.body)}
            </p>
          </section>

          {/* ── features ── */}
          <section
            style={{
              position: "relative",
              background: "linear-gradient(180deg,#EFE9E2 0%,#F4F0EB 40%,#F8F6F2 100%)",
              padding: "28px 0 40px",
            }}
          >
            <BgWord color="rgba(255,255,255,0.45)" top={24}>
              FEATURE
            </BgWord>
            <div style={{ position: "relative", textAlign: "center", fontFamily: mincho, paddingTop: 30 }}>
              <p style={{ margin: 0, fontSize: 19, fontWeight: 600, letterSpacing: "0.06em" }}>
                {c.brand.name}
                <span style={{ fontSize: 15 }}>が</span>
              </p>
              <h2 style={{ margin: "4px 0 0", fontSize: 36, fontWeight: 700, letterSpacing: "0.12em" }}>
                <span style={{ color: C.roseText, fontSize: 42 }}>{c.features.heading.slice(0, 1)}</span>
                {c.features.heading.slice(1)}
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 30 }}>
              {c.features.items.map((f, i) => {
                const right = i % 2 === 0;
                return (
                  <div key={i} style={{ position: "relative", margin: "0 18px", background: "#fff", padding: 6, boxShadow: "0 4px 18px rgba(170,120,90,0.1)" }}>
                    <div style={{ border: `1px solid ${C.pink}99`, padding: "14px 14px 22px" }}>
                      <span
                        style={{
                          position: "absolute",
                          top: -16,
                          [right ? "right" : "left"]: 4,
                          fontFamily: script,
                          fontStyle: "italic",
                          fontWeight: 700,
                          color: C.roseText,
                          zIndex: 2,
                          whiteSpace: "nowrap",
                        }}
                      >
                        <span style={{ fontSize: 17 }}>Feature </span>
                        <span style={{ fontSize: 34 }}>{String(i + 1).padStart(2, "0")}</span>
                      </span>
                      <ImageSlot
                        src={f.image.src}
                        placeholder={f.image.placeholder}
                        objectPosition={f.image.position}
                        style={{ width: "100%", aspectRatio: "16 / 9" }}
                      />
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6, margin: "-26px 0 0 -26px", position: "relative" }}>
                        {f.title.map((t) => (
                          <span
                            key={t}
                            style={{
                              background: "linear-gradient(90deg,#BF7286 0%,#D49AA8 100%)",
                              color: "#fff",
                              fontFamily: mincho,
                              fontSize: 19,
                              fontWeight: 600,
                              letterSpacing: "0.06em",
                              padding: "5px 16px 5px 18px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <p style={{ margin: "16px 6px 0", fontSize: 12.5, lineHeight: 2.15, letterSpacing: "0.08em" }}>
                        {rich(f.body)}
                      </p>
                      {f.note && (
                        <p style={{ margin: "6px 6px 0", fontSize: 10, lineHeight: 1.7, letterSpacing: "0.04em", color: "#8A7F7F" }}>
                          {rich(f.note)}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── gallery ── */}
          <section
            style={{
              position: "relative",
              background: "#fff",
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
              padding: "40px 0 40px",
              clipPath: "polygon(0 18px, 50% 0, 100% 18px, 100% 100%, 0 100%)",
              marginTop: -18,
            }}
          >
            <BgWord color="rgba(180,88,111,0.07)" top={36}>
              GALLERY
            </BgWord>
            <div style={{ position: "relative", textAlign: "center", fontFamily: mincho, paddingTop: 22 }}>
              <p style={{ margin: 0, fontSize: 19, letterSpacing: "0.14em" }}>{c.gallery.lead}</p>
              <h2 style={{ margin: "2px 0 0", fontSize: 32, fontWeight: 700, letterSpacing: "0.1em" }}>
                <span style={{ color: C.roseText, fontSize: 40 }}>{c.gallery.heading.slice(0, 1)}</span>
                {c.gallery.heading.slice(1)}
              </h2>
            </div>
            {[c.gallery.banners, c.gallery.lps].map((g, gi) => (
              <div key={gi} style={{ marginTop: gi === 0 ? 24 : 30 }}>
                <div style={{ textAlign: "center" }}>
                  <span
                    style={{
                      display: "inline-block",
                      background: "linear-gradient(90deg,#BF7286 0%,#D49AA8 100%)",
                      color: "#fff",
                      fontSize: 14,
                      lineHeight: 1.4,
                      letterSpacing: "0.1em",
                      padding: "6px 32px",
                      borderRadius: 999,
                    }}
                  >
                    {rich(g.label)}
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, padding: "0 28px", marginTop: 16 }}>
                  {g.items.map((it) => (
                    <ImageSlot
                      key={it.placeholder}
                      src={it.src}
                      placeholder={it.placeholder}
                      style={{ width: "100%", aspectRatio: gi === 0 ? "1 / 1" : "220 / 460" }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* ── comparison ── */}
          <section
            style={{
              position: "relative",
              background: "linear-gradient(180deg,#F4F1EE 0%,#F6F4F2 100%)",
              padding: "34px 0 36px",
              clipPath: "ellipse(140% 100% at 50% 100%)",
            }}
          >
            <BgWord color="rgba(255,255,255,0.75)" top={34}>
              COMPARISON
            </BgWord>
            <div style={{ position: "relative", textAlign: "center", fontFamily: mincho, paddingTop: 22 }}>
              <p style={{ margin: 0, fontSize: 18, letterSpacing: "0.14em" }}>{c.comparison.lead}</p>
              <h2 style={{ margin: "4px 0 0", fontSize: 29, fontWeight: 700, letterSpacing: "0.08em" }}>
                {c.comparison.headingRest.replace("との", "")}
                <span style={{ fontSize: 22 }}>との</span>
                <span style={{ color: C.roseText, fontSize: 34 }}>{c.comparison.headingAccent}</span>
              </h2>
            </div>
            <div style={{ margin: "26px 14px 0", background: "#fff", borderRadius: 8, overflow: "hidden", boxShadow: "0 4px 18px rgba(170,100,120,0.1)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div style={{ background: pinkGrad, color: "#fff", height: 54, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mincho, fontSize: 24, fontWeight: 700, borderRadius: "8px 8px 0 0", marginTop: -4 }}>
                  {c.brand.name}
                </div>
                <div style={{ background: "#8F8B8B", color: "#fff", height: 50, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontSize: 12.5, lineHeight: 1.5, letterSpacing: "0.1em" }}>
                  {rich(c.comparison.otherLabel)}
                </div>
              </div>
              <div style={{ position: "relative", padding: "14px 12px 16px" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "50%", background: "linear-gradient(180deg,#F3EDE3 0%,#F7F2E9 100%)" }} />
                <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 10 }}>
                  {c.comparison.rows.map((r) => (
                    <div key={r.label} style={{ display: "grid", gridTemplateColumns: "1fr 26px 1fr", minHeight: 72 }}>
                      <div
                        style={{
                          background: "#fff",
                          borderRadius: "6px 0 0 6px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          color: C.roseText,
                          fontSize: 14,
                          fontWeight: 700,
                          lineHeight: 1.45,
                          letterSpacing: "0.04em",
                        }}
                      >
                        <span style={{ backgroundImage: `linear-gradient(transparent 60%, ${C.marker} 60%)` }}>{rich(r.ours)}</span>
                      </div>
                      <div
                        style={{
                          background: C.navy2,
                          color: "#fff",
                          writingMode: "vertical-rl",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 13,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          borderRadius: 4,
                          margin: "-4px 0",
                        }}
                      >
                        {r.label}
                      </div>
                      <div
                        style={{
                          background: "#F3F2F2",
                          borderRadius: "0 6px 6px 0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          fontSize: 12,
                          lineHeight: 1.6,
                          letterSpacing: "0.06em",
                        }}
                      >
                        {rich(r.other)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── target ── */}
          <section style={{ position: "relative", background: "#fff", padding: "40px 0 36px" }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: 0, color: C.roseText, fontSize: 12, fontWeight: 700, letterSpacing: "0.24em" }}>{c.target.eyebrow}</p>
              <h2 style={{ margin: "8px 0 0", fontFamily: mincho, fontSize: 23, fontWeight: 700, letterSpacing: "0.1em" }}>
                {c.target.heading}
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "22px 20px 0" }}>
              {c.target.personas.map((p, i) => (
                <div key={p.title} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#F6F4F1", padding: "14px 14px" }}>
                  <span style={{ flex: "none", fontFamily: script, fontStyle: "italic", fontWeight: 700, fontSize: 24, lineHeight: 1, color: C.roseText }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, letterSpacing: "0.06em", color: C.navy }}>{p.title}</p>
                    <p style={{ margin: "4px 0 0", fontSize: 11.5, lineHeight: 1.8, letterSpacing: "0.04em" }}>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ margin: "22px 20px 0", border: `1.5px solid ${C.navy}`, background: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.navy, color: "#fff", padding: "10px 14px" }}>
                <span style={{ flex: "none", background: C.rose, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", padding: "2px 8px" }}>
                  {c.target.requirement.label}
                </span>
                <span style={{ fontSize: 14.5, fontWeight: 700, letterSpacing: "0.06em" }}>{c.target.requirement.title}</span>
              </div>
              <p style={{ margin: 0, padding: "10px 14px 12px", fontSize: 11.5, lineHeight: 1.8, letterSpacing: "0.04em" }}>
                {c.target.requirement.body}
              </p>
            </div>
            <div style={{ margin: "14px 20px 0", background: "#F6F4F1", padding: "16px 16px 14px" }}>
              <p style={{ margin: 0, fontFamily: mincho, fontSize: 17, fontWeight: 700, letterSpacing: "0.08em", color: C.navy }}>
                {c.target.beginner.heading}
              </p>
              <p style={{ margin: "6px 0 0", fontSize: 11.5, lineHeight: 1.8, letterSpacing: "0.04em" }}>{c.target.beginner.lead}</p>
              <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                {c.target.beginner.items.map((it) => (
                  <li key={it} style={{ display: "flex", gap: 8, alignItems: "center", background: "#fff", padding: "8px 10px", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.04em" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" style={{ flex: "none" }}>
                      <circle cx="8" cy="8" r="7.5" fill={C.roseText} />
                      <path d="M4.5 8.2 7 10.5l4.5-5" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                    </svg>
                    {it}
                  </li>
                ))}
              </ul>
              <p style={{ margin: "8px 0 0", fontSize: 10, letterSpacing: "0.04em", color: "#6B6D76" }}>{c.target.beginner.note}</p>
            </div>
          </section>

          {/* ── pricing ── */}
          <section style={{ background: "linear-gradient(180deg,#F6F4F2 0%,#F4F4F3 50%,#EEF1F5 100%)", padding: "40px 0 44px" }}>
            <p style={{ margin: 0, textAlign: "center", color: C.roseText, fontSize: 12, fontWeight: 700, letterSpacing: "0.24em" }}>
              {c.pricing.eyebrow}
            </p>
            <h2 style={{ margin: "8px 0 0", textAlign: "center", fontFamily: mincho, fontSize: 29, fontWeight: 700, letterSpacing: "0.1em" }}>
              {c.pricing.heading}
            </h2>
            <div style={{ margin: "22px 20px 0", background: "#fff", boxShadow: "0 6px 20px rgba(47,58,78,0.08)" }}>
              <p style={{ margin: 0, background: C.navy, color: "#fff", textAlign: "center", padding: "9px 0", fontSize: 13.5, fontWeight: 700, letterSpacing: "0.14em" }}>
                {c.pricing.valueLead}
              </p>
              <div style={{ padding: "6px 16px" }}>
                {c.pricing.values.map((v, i) => (
                  <div
                    key={v.title}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "11px 0",
                      borderTop: i === 0 ? "none" : "1px dashed #D6D2CC",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 16 16" style={{ flex: "none" }}>
                      <circle cx="8" cy="8" r="7.5" fill={C.roseText} />
                      <path d="M4.5 8.2 7 10.5l4.5-5" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                    </svg>
                    <div>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 700, letterSpacing: "0.04em", color: C.navy }}>{v.title}</p>
                      <p style={{ margin: "1px 0 0", fontSize: 11, letterSpacing: "0.04em", color: "#6B6D76" }}>{v.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: `1px solid ${C.navy}`, margin: "0 16px", padding: "14px 0 18px", textAlign: "center" }}>
                <p style={{ margin: 0, fontSize: 12, letterSpacing: "0.14em" }}>{c.pricing.price.label}</p>
                <p style={{ margin: "2px 0 0", fontFamily: mincho, fontWeight: 700, color: C.roseText, lineHeight: 1.1 }}>
                  <span style={{ fontSize: 44, letterSpacing: "0.02em" }}>{c.pricing.price.amount}</span>
                  <span style={{ fontSize: 20, marginLeft: 2 }}>{c.pricing.price.unit}</span>
                  <span style={{ fontSize: 11, marginLeft: 4, color: C.text, fontFamily: gothic, fontWeight: 400 }}>{c.pricing.price.tax}</span>
                </p>
                {c.pricing.price.note && (
                  <p style={{ margin: "6px 0 0", fontSize: 10, color: "#6B6D76" }}>{c.pricing.price.note}</p>
                )}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, margin: "18px 20px 0" }}>
              {c.pricing.rows.map((r) => (
                <div key={r.label} style={{ display: "flex", minHeight: 36, border: "1px solid #D6D3D0", background: "#fff" }}>
                  <div
                    style={{
                      width: 76,
                      flex: "none",
                      background: C.navy2,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      lineHeight: 1.5,
                      letterSpacing: "0.08em",
                      padding: "8px 0",
                    }}
                  >
                    {rich(r.label)}
                  </div>
                  <div style={{ flex: 1, padding: "9px 12px 9px 16px", display: "flex", flexDirection: "column", justifyContent: "center", fontSize: 11.5, lineHeight: 1.7, letterSpacing: "0.06em" }}>
                    {r.list ? (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 2 }}>
                        {r.list.map((l) => (
                          <span key={l}>▪︎{l}</span>
                        ))}
                      </div>
                    ) : (
                      <span>{rich(r.value)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── barrier ── */}
          <section style={{ position: "relative", zIndex: 1, color: "#fff" }}>
            <div style={{ padding: "28px 0 22px", textAlign: "center", background: C.navy2 }}>
              <span
                style={{
                  display: "inline-block",
                  background: "#fff",
                  color: C.text,
                  borderRadius: 999,
                  padding: "7px 18px",
                  fontFamily: mincho,
                  fontSize: 15,
                  letterSpacing: "0.12em",
                }}
              >
                {c.barrier.pill}
              </span>
              <div style={{ fontSize: 8, lineHeight: 0.9, marginTop: 6, opacity: 0.9 }}>
                ▼<br />▼
              </div>
              <p style={{ margin: "8px 0 0", fontFamily: mincho, fontSize: 22, fontWeight: 600, letterSpacing: "0.12em" }}>
                {c.barrier.lead}
              </p>
              <p style={{ margin: "2px 0 0", fontFamily: mincho, fontWeight: 700, letterSpacing: "0.06em", color: C.champagne }}>
                <span style={{ fontSize: 38 }}>{c.barrier.heading.split("が")[0]}</span>
                <span style={{ fontSize: 26, color: "#fff" }}>が</span>
                <span style={{ fontSize: 38 }}>{c.barrier.heading.split("が")[1]}</span>
              </p>
              <svg width="240" height="8" viewBox="0 0 240 8" style={{ display: "block", margin: "8px auto 0" }}>
                <path
                  d={`M0 4 ${"q2.5 -3 5 0 t5 0 ".repeat(24)}`}
                  stroke="#E9C77B"
                  strokeWidth="1.2"
                  fill="none"
                />
              </svg>
            </div>
            <div style={{ position: "relative", background: "#fff", color: C.text, padding: "28px 0 28px 24px" }}>
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 170 }}>
                <ImageSlot src={c.barrier.photo.src} placeholder={c.barrier.photo.placeholder} style={{ width: "100%", height: "100%" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,#fff 0%,rgba(255,255,255,0.5) 40%,rgba(255,255,255,0) 100%)" }} />
              </div>
              <p style={{ position: "relative", margin: 0, fontSize: 12.5, lineHeight: 2.35, letterSpacing: "0.08em", textShadow: "0 0 6px #fff" }}>
                {rich(c.barrier.body, { accent: "#B4586F" })}
              </p>
            </div>
            <div style={{ padding: "26px 0 48px", textAlign: "center", clipPath: "polygon(0 0,100% 0,100% calc(100% - 22px),50% 100%,0 calc(100% - 22px))", background: C.navy2 }}>
              <p style={{ margin: 0, fontFamily: mincho, fontSize: 17, lineHeight: 1.9, letterSpacing: "0.14em" }}>
                {rich(c.barrier.closingLead)}
              </p>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginTop: 12 }}>
                {c.barrier.closing.map((l) => (
                  <span
                    key={l}
                    style={{
                      background: "#F7F2E9",
                      color: C.text,
                      fontFamily: mincho,
                      fontSize: 22,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      padding: "5px 14px",
                    }}
                  >
                    {rich(l)}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ── support ── */}
          <section style={{ position: "relative", background: "linear-gradient(180deg,#EFE9E2 0%,#F8F6F2 100%)", padding: "16px 0 40px", marginTop: -22 }}>
            <BgWord color="rgba(255,255,255,0.6)" top={22}>
              SUPPORT
            </BgWord>
            <div style={{ position: "relative", textAlign: "center", fontFamily: mincho, paddingTop: 22 }}>
              <p style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
                {c.brand.name}
                <span style={{ fontSize: 15 }}>は</span>
              </p>
              <h2 style={{ margin: "4px 0 0", fontSize: 34, fontWeight: 700, letterSpacing: "0.12em" }}>
                <span style={{ color: C.gold, fontSize: 14, marginRight: 12, verticalAlign: "middle" }}>✦</span>
                {c.support.heading.replace("安心", "")}
                <span style={{ color: C.roseText }}>安心</span>
                <span style={{ color: C.gold, fontSize: 14, marginLeft: 12, verticalAlign: "middle" }}>✦</span>
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "22px 14px 0 10px" }}>
              {c.support.items.map((s) => (
                <div key={s.title} style={{ position: "relative", marginLeft: 16, background: "#fff", border: "1px solid #E5D7A9", borderRadius: 10, padding: 4 }}>
                  <div style={{ border: "1px solid #EEE3C2", borderRadius: 8, padding: "16px 12px 16px 76px" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: -16,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 76,
                        height: 76,
                        borderRadius: 999,
                        background: "linear-gradient(135deg,#C98597 0%,#AE6479 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon name={s.icon} size={40} />
                    </div>
                    <h3 style={{ margin: 0, fontFamily: mincho, fontSize: 18, fontWeight: 700, color: C.roseText, letterSpacing: "0.1em" }}>{s.title}</h3>
                    <div style={{ borderTop: "1px dashed #CDB5BC", margin: "8px 0" }} />
                    <p style={{ margin: 0, fontSize: 11, lineHeight: 1.95, letterSpacing: "0.06em" }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Consult c={c} />

          {/* ── faq ── */}
          <section style={{ position: "relative", background: "#fff", padding: "36px 0 44px" }}>
            <BgWord color="rgba(180,88,111,0.07)" top={34}>
              FAQ
            </BgWord>
            <h2 style={{ position: "relative", margin: "28px 0 0", textAlign: "center", fontFamily: mincho, fontSize: 28, fontWeight: 700, letterSpacing: "0.14em" }}>
              {c.faq.heading}
            </h2>
            <div style={{ margin: "26px 14px 0" }}>
              <FaqAccordion items={c.faq.items} accent={C.roseText} text={C.text} />
            </div>
          </section>

          {/* ── challenge ── */}
          <section style={{ position: "relative", background: "linear-gradient(170deg,#F4F1EE 0%,#F1EEEE 50%,#EEF1F5 75%,#F4F1EE 100%)", paddingBottom: 40, textAlign: "center" }}>
            <ImageSlot src={c.challenge.photo.src} placeholder={c.challenge.photo.placeholder} style={{ width: "100%", aspectRatio: "640 / 370" }} />
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: 8,
                top: 230,
                writingMode: "vertical-rl",
                fontFamily: gothic,
                fontWeight: 800,
                fontSize: 52,
                letterSpacing: "0.04em",
                color: "rgba(255,255,255,0.6)",
                pointerEvents: "none",
              }}
            >
              CHANGE LIFE
            </div>
            <div style={{ position: "relative", marginTop: -22 }}>
              <span
                style={{
                  display: "inline-block",
                  background: "#fff",
                  borderRadius: 999,
                  padding: "4px 18px",
                  fontFamily: mincho,
                  fontSize: 24,
                  fontWeight: 700,
                  color: C.navy,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              >
                {c.brand.name}
              </span>
            </div>
            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 12, padding: "0 20px", marginTop: 22 }}>
              <span style={{ flex: 1, height: 1, background: "#C2B4B8" }} />
              <span style={{ fontFamily: mincho, fontSize: 17, letterSpacing: "0.12em" }}>{c.challenge.lead}</span>
              <span style={{ flex: 1, height: 1, background: "#C2B4B8" }} />
            </div>
            <h2 style={{ position: "relative", margin: "14px 0 0", fontFamily: mincho, fontSize: 21, fontWeight: 700, lineHeight: 1.6, letterSpacing: "0.1em" }}>
              {c.challenge.heading.split("\n").map((line, i) => (
                <span key={i} style={{ display: "block", fontSize: i === 0 ? 21 : 28 }}>
                  {rich(line)}
                </span>
              ))}
            </h2>
            <div style={{ height: 1, background: "#C2B4B8", margin: "16px 20px 0" }} />
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 20, marginTop: 22, fontSize: 13, lineHeight: 2.05, letterSpacing: "0.1em" }}>
              {c.challenge.body.map((b, i) => (
                <p key={i} style={{ margin: 0 }}>
                  {rich(b)}
                </p>
              ))}
            </div>
          </section>

          {/* ── form ── */}
          <section id="form" style={{ position: "relative", background: C.cream, padding: "34px 0 40px" }}>
            <BgWord color="rgba(255,255,255,0.75)" top={26}>
              FORM
            </BgWord>
            <div style={{ position: "relative", textAlign: "center", paddingTop: 22 }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, letterSpacing: "0.08em" }}>{c.form.pill}</p>
              <h2 style={{ margin: "4px 0 0", fontFamily: mincho, fontWeight: 700, letterSpacing: "0.04em" }}>
                <span style={{ fontSize: 27, color: C.roseText }}>{c.form.headingAccent}</span>
                <span style={{ fontSize: 25 }}>{c.form.headingRest}</span>
              </h2>
            </div>
            <div style={{ margin: "20px 24px 0", background: "#fff", padding: "20px 16px 24px" }}>
              <LPForm
                clientSlug={c.slug}
                accent={C.rose}
                fields={c.form.fields}
                submitLabel={c.form.submitLabel}
                errorMessage={c.form.errorMessage}
                disclaimer={c.form.disclaimer}
                submitStyle={{
                  background: "linear-gradient(180deg,#C9667F 0%,#B4506B 55%,#A84862 100%)",
                  boxShadow: "0 4px 0 #8A3850, 0 10px 18px rgba(138,56,80,0.3)",
                  borderRadius: 999,
                  fontSize: 17,
                  letterSpacing: "0.2em",
                }}
              />
            </div>
          </section>

          <footer style={{ background: C.navy2, color: "#fff", textAlign: "center", fontSize: 12, letterSpacing: "0.1em", padding: "12px 0" }}>
            {c.brand.copyright}
          </footer>
        </LPCanvas>
      </div>

      <BottomBar clientSlug={c.slug} lineUrl={c.lineUrl} lineText={c.bottomBar.lineText} ctaText={c.bottomBar.ctaText} />
    </LPShell>
  );
}
