import type { ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPCanvas from "@/components/LPCanvas";
import LPForm from "@/components/LPForm";
import ImageSlot from "@/components/ImageSlot";
import StickyFooterCTA from "@/components/StickyFooterCTA";
import FaqAccordion from "./FaqAccordion";
import config from "./config";

/**
 * Pilates isM 麻布十番店 — 韓国式パーソナルマシンピラティス。
 *
 * セクション構成は soelu-togoshiginza のレイアウトを参考にしているが、
 * 文言・注釈・条件はすべて isM のヒアリングシートから起こしている（ソエルの規約は持ち込まない）。
 *
 * 設計ルール:
 *   1. 幅390pxの1枚のキャンバス（<LPCanvas>）。vw/vh は使わない（CLAUDE.md §16-17）。
 *      キャンバス外の地色を敷く `minHeight: "100vh"` だけが例外。
 *   2. CVはページ内の LPForm（#form）。CTAはすべて #form へのアンカー。
 *   3. NGワード: 「ダイエット」「痩せる」など体重重視の表現は使わない（ヒアリングQ28）。
 */

/* ── design tokens（ロゴのモーヴグレー × ブラッシュピンクから展開） ──
   MAIN  深いプラムチャコール: 見出し・濃色セクションの地
   ROSE  深いローズ: 白地の強調文字（白地で約5:1）
   BLUSH ロゴのピンク: 帯・面の地色（文字は載せずに地として使う） */
const MAIN = "#4A3F43";
const ROSE = "#9E5F5A";
const ROSE_SOFT = "#C98F88";
const BLUSH = "#EBD6D4";
const PALE = "#F8F1EF";
const CREAM = "#FBF8F5";
const MAUVE = "#A79DA2";
const INK = "#3A3335";
const DIM = "#6E6467";
const LINE = "#EDE3E1";
const PAGE_BG = "#EFE7E5";
const CTA_GRAD = `linear-gradient(135deg, ${ROSE_SOFT} 0%, ${ROSE} 100%)`;
const CTA_SHADOW = "rgba(158,95,90,0.35)";

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
  camera: (
    <>
      <path d="M4 8h3l1.5-2.5h7L17 8h3v11H4z" />
      <circle cx="12" cy="13" r="3.3" />
    </>
  ),
  reformer: (
    <>
      <rect x="3" y="14" width="18" height="3" rx="1" />
      <path d="M5 17v3M19 17v3" />
      <path d="M6 14V9a1 1 0 011-1h4" />
    </>
  ),
  chart: (
    <>
      <rect x="3.5" y="4.5" width="7" height="15" rx="1" />
      <rect x="13.5" y="4.5" width="7" height="15" rx="1" />
      <path d="M7 4.5v15M17 4.5v15M3.5 12h7M13.5 12h7" strokeDasharray="1.4 1.4" />
    </>
  ),
  online: (
    <>
      <rect x="3.5" y="4.5" width="17" height="11.5" rx="1.5" />
      <path d="M12 16v3.5M8.5 19.5h7" />
      <path d="M10.5 8l4 2.2-4 2.2z" />
    </>
  ),
  line: (
    <>
      <path d="M12 4c-4.7 0-8.5 3-8.5 6.8 0 3.4 3 6.2 7.1 6.7l-.6 2.8c-.1.4.3.6.6.4l3.6-2.9c3.6-.6 6.3-3.6 6.3-7C20.5 7 16.7 4 12 4z" />
      <path d="M8 9.5v3h2M12 9.5v3M14.5 12.5v-3l2 3v-3" />
    </>
  ),
  hanger: (
    <>
      <path d="M12 3.5a2.2 2.2 0 112.4 2.2c-1.2.3-2.4 1-2.4 2.3v.7" />
      <path d="M12 8.7l8.6 6.1c.9.6.4 2-.7 2H4.1c-1.1 0-1.6-1.4-.7-2z" />
    </>
  ),
  spring: <path d="M4 12h2l1.5-5 2 10 2-10 2 10 2-10 1.5 5h3" />,
  list: (
    <>
      <path d="M9 6.5h11M9 12h11M9 17.5h11" />
      <circle cx="5" cy="6.5" r="1.2" />
      <circle cx="5" cy="12" r="1.2" />
      <circle cx="5" cy="17.5" r="1.2" />
    </>
  ),
  medical: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  bag: (
    <>
      <path d="M5.5 8h13l-1 12h-11z" />
      <path d="M9 8V6.5a3 3 0 016 0V8" />
    </>
  ),
};

function Icon({ name, size = 24, color = ROSE }: { name: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {iconPaths[name]}
    </svg>
  );
}

/* ── shared building blocks ────────────────────────────────────────── */

function Eyebrow({ text, color = MAUVE }: { text: string; color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 10 }}>
      <span style={{ width: 22, height: 1, background: color }} />
      <span style={{ fontFamily: fontDisplay, fontStyle: "italic", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color }}>{text}</span>
      <span style={{ width: 22, height: 1, background: color }} />
    </div>
  );
}

function SectionHeading({ text, color = MAIN, fontSize = 23 }: { text: string; color?: string; fontSize?: number }) {
  return (
    <h2 style={{ fontFamily: fontMincho, fontWeight: 600, fontSize, letterSpacing: "0.05em", color, lineHeight: 1.5, margin: 0, textAlign: "center" }}>
      {nl(text)}
    </h2>
  );
}

function Notes({ items, align = "left", color = DIM }: { items: string[]; align?: "left" | "center"; color?: string }) {
  return (
    <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 4 }}>
      {items.map((n) => (
        <p key={n} style={{ fontSize: 11, lineHeight: 1.7, color, margin: 0, textAlign: align }}>
          {n}
        </p>
      ))}
    </div>
  );
}

function CtaButton({ text, sub }: { text: string; sub?: string }) {
  return (
    <>
      <a
        href="#form"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          height: 58,
          marginTop: 24,
          background: CTA_GRAD,
          color: "#FFFFFF",
          textDecoration: "none",
          fontFamily: fontGothic,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "0.05em",
          borderRadius: 999,
          boxShadow: `0 10px 22px ${CTA_SHADOW}`,
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
      {sub && <p style={{ textAlign: "center", fontSize: 11.5, color: DIM, margin: "10px 0 0" }}>{sub}</p>}
    </>
  );
}

/** 「通常5,000円」の打ち消し表記 */
function Was({ text, color = DIM, fontSize = 12 }: { text: string; color?: string; fontSize?: number }) {
  return <span style={{ fontSize, color, textDecoration: "line-through", textDecorationColor: `${ROSE}AA` }}>{text}</span>;
}

export default function Page() {
  const c = config;
  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div style={{ fontFamily: fontSans, background: PAGE_BG, minHeight: "100vh", color: INK }}>
        <LPCanvas background="#FFFFFF" boxShadow="0 0 30px rgba(74,63,67,0.10)">
          {/* ── header ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "12px 18px", background: "#FFFFFF", borderBottom: `1px solid ${LINE}` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.header.logo} alt={c.header.brand} style={{ display: "block", height: 26, width: "auto" }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2, fontSize: 10.5, color: DIM, whiteSpace: "nowrap" }}>
              {c.header.access.map((a) => (
                <span key={a.station}>
                  {a.station}
                  <b style={{ color: MAIN, marginLeft: 4 }}>{a.walk}</b>
                </span>
              ))}
            </div>
          </div>

          {/* ── オファー帯 ── */}
          <div style={{ background: MAIN, textAlign: "center", padding: "10px 16px" }}>
            <p style={{ fontFamily: fontGothic, fontSize: 13.5, fontWeight: 700, letterSpacing: "0.04em", color: BLUSH, margin: 0 }}>{c.offerBar.text}</p>
            <p style={{ fontSize: 11, letterSpacing: "0.04em", color: "rgba(255,255,255,0.88)", margin: "3px 0 0" }}>{c.offerBar.sub}</p>
          </div>

          {/* ── FV ── */}
          <section style={{ position: "relative", background: PALE }}>
            <div style={{ position: "relative", height: 300 }}>
              <ImageSlot
                src={c.fv.hero.src}
                placeholder={c.fv.hero.placeholder}
                objectPosition={c.fv.hero.position ?? "center"}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: BLUSH }}
              />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(248,241,239,0) 55%, rgba(248,241,239,0.9) 88%, ${PALE} 100%)` }} />
            </div>
            <div style={{ position: "relative", padding: "0 22px 30px", marginTop: -34 }}>
              <span style={{ display: "inline-flex", padding: "5px 14px", borderRadius: 999, background: MAIN, color: "#FFFFFF", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>
                {c.fv.catchTop}
              </span>
              <h1 style={{ fontFamily: fontMincho, fontWeight: 600, fontSize: 22, lineHeight: 1.55, letterSpacing: "0.02em", color: MAIN, margin: "12px 0 0", whiteSpace: "nowrap" }}>
                {c.fv.catchLines[0]}
                <br />
                <span style={{ fontSize: 26, color: ROSE }}>{c.fv.catchLines[1]}</span>
              </h1>
              <p style={{ fontSize: 12.5, lineHeight: 1.85, color: DIM, margin: "10px 0 0" }}>{nl(c.fv.lead)}</p>

              {/* 体験0円カード */}
              <div style={{ marginTop: 16, background: "#FFFFFF", border: `1.5px solid ${ROSE_SOFT}77`, borderRadius: 16, boxShadow: "0 8px 22px rgba(74,63,67,0.10)", padding: "16px 18px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <span style={{ padding: "4px 12px", borderRadius: 999, background: PALE, color: MAIN, fontSize: 12, fontWeight: 700 }}>{c.fv.trial.label}</span>
                  <span style={{ padding: "4px 12px", borderRadius: 999, background: `${MAUVE}22`, color: MAIN, fontSize: 12, fontWeight: 700 }}>{c.fv.trial.sub}</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 10, marginTop: 8 }}>
                  <span style={{ marginBottom: 14 }}>
                    <Was text={c.fv.trial.was} fontSize={13} />
                    <span style={{ fontSize: 14, color: ROSE, marginLeft: 6 }}>▶</span>
                  </span>
                  <span style={{ fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: 72, lineHeight: 1, color: ROSE }}>{c.fv.trial.price}</span>
                  <span style={{ fontFamily: fontMincho, fontSize: 26, fontWeight: 600, color: MAIN, marginBottom: 6 }}>{c.fv.trial.unit}</span>
                </div>
              </div>

              {/* 会員特典フック */}
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12, background: "#FFFFFF", border: `1px solid ${LINE}`, borderRadius: 14, padding: "12px 14px" }}>
                <span style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: "50%", background: PALE }}>
                  <Icon name="online" size={24} color={ROSE} />
                </span>
                <div>
                  <span style={{ display: "inline-flex", padding: "2px 10px", borderRadius: 999, background: MAIN, color: "#FFFFFF", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em" }}>
                    {c.fv.hook.label}
                  </span>
                  <p style={{ fontFamily: fontGothic, fontSize: 13, fontWeight: 700, lineHeight: 1.55, color: MAIN, margin: "5px 0 0" }}>{nl(c.fv.hook.text)}</p>
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
                      border: `1px solid ${MAUVE}88`,
                      background: "#FFFFFF",
                      color: MAIN,
                      fontSize: 12,
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <CtaButton text={c.fv.ctaText} />
              <Notes items={c.fv.notes} />
            </div>
          </section>

          {/* ── 運営実績 ── */}
          <section style={{ background: MAIN, padding: "28px 22px 22px" }}>
            <p style={{ textAlign: "center", fontFamily: fontMincho, fontSize: 15, fontWeight: 600, letterSpacing: "0.08em", color: "#FFFFFF", margin: 0 }}>{c.stats.heading}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
              {c.stats.items.map((s) => (
                <div key={s.pre} style={{ textAlign: "center", padding: "14px 6px", borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.16)" }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap" }}>{s.pre}</div>
                  <div style={{ marginTop: 4 }}>
                    <span style={{ fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: 36, lineHeight: 1, color: BLUSH }}>{s.num}</span>
                    <span style={{ fontFamily: fontMincho, fontSize: 16, color: "#FFFFFF", marginLeft: 3 }}>{s.unit}</span>
                    <span style={{ fontFamily: fontMincho, fontSize: 13, color: "rgba(255,255,255,0.9)", marginLeft: 2 }}>{s.post}</span>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: "#FFFFFF", margin: "14px 0 0", padding: "9px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.22)" }}>{c.stats.media}</p>
            <Notes items={c.stats.notes} color="rgba(255,255,255,0.7)" />
          </section>

          {/* ── worry ── */}
          <section style={{ padding: "44px 22px 40px", background: "#FFFFFF" }}>
            <SectionHeading text={c.worry.heading} />
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
              {c.worry.items.map((w) => (
                <div key={w} style={{ display: "flex", alignItems: "center", gap: 12, background: PALE, borderRadius: 12, padding: "13px 16px" }}>
                  <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: "50%", background: ROSE_SOFT, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="check" size={14} color="#FFFFFF" />
                  </span>
                  <span style={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.6, color: INK }}>{w}</span>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", fontFamily: fontMincho, fontSize: 19, fontWeight: 600, lineHeight: 1.7, color: MAIN, margin: "26px 0 0" }}>
              {c.worry.closingPre}
              <br />
              <span style={{ whiteSpace: "nowrap", color: ROSE, background: `linear-gradient(transparent 62%, ${BLUSH} 62%)` }}>{c.worry.closingHighlight}</span>
            </p>
          </section>

          {/* ── 体験オファー ── */}
          <section style={{ padding: "44px 22px 46px", background: PALE }}>
            <Eyebrow text={c.trial.eyebrow} />
            <h2 style={{ fontFamily: fontMincho, fontWeight: 600, fontSize: 23, letterSpacing: "0.04em", lineHeight: 1.5, color: MAIN, margin: 0, textAlign: "center" }}>
              {c.trial.headingPre}
              <br />
              <Was text={c.trial.was} fontSize={14} />
              <span style={{ fontSize: 14, color: ROSE, margin: "0 6px" }}>▶</span>
              <span style={{ fontSize: 32, color: ROSE }}>{c.trial.headingHighlight}</span>
            </h2>
            <p style={{ textAlign: "center", fontSize: 12.5, lineHeight: 1.95, color: DIM, margin: "16px 0 0" }}>{nl(c.trial.lead)}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 22 }}>
              {c.trial.photos.map((p) => (
                <ImageSlot key={p.placeholder} src={p.src} placeholder={p.placeholder} objectPosition={p.position ?? "center"} radius={14} style={{ width: "100%", height: 130, background: BLUSH }} />
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 18 }}>
              {c.trial.items.map((item) => (
                <div key={item.title} style={{ display: "flex", gap: 14, background: "#FFFFFF", borderRadius: 14, border: `1px solid ${LINE}`, padding: "16px 16px" }}>
                  <span style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 46, height: 46, borderRadius: "50%", background: PALE, border: `1px solid ${BLUSH}` }}>
                    <Icon name={item.icon} size={24} />
                  </span>
                  <div>
                    <h3 style={{ fontFamily: fontGothic, fontSize: 14.5, fontWeight: 700, color: MAIN, margin: 0 }}>{item.title}</h3>
                    <p style={{ fontSize: 12.5, lineHeight: 1.8, color: DIM, margin: "5px 0 0" }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <Notes items={c.trial.notes} />
            <CtaButton text={c.trial.ctaText} />
          </section>

          {/* ── 当日入会特典 ── */}
          <section style={{ padding: "0 0 46px", background: CREAM }}>
            <div style={{ background: MAIN, textAlign: "center", padding: "16px 20px 14px" }}>
              <div style={{ fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: 26, color: BLUSH, lineHeight: 1.1 }}>{c.campaign.ribbonEn}</div>
              <div style={{ fontFamily: fontMincho, fontSize: 14, fontWeight: 600, letterSpacing: "0.14em", color: "#FFFFFF", marginTop: 5 }}>{c.campaign.ribbonJa}</div>
            </div>

            <div style={{ padding: "26px 22px 0" }}>
              <h2 style={{ fontFamily: fontMincho, fontWeight: 600, fontSize: 22, letterSpacing: "0.04em", lineHeight: 1.55, color: MAIN, margin: 0, textAlign: "center" }}>
                {nl(c.campaign.heading)}
              </h2>

              {/* 入会金 */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 20, background: "#FFFFFF", border: `1.5px solid ${ROSE_SOFT}77`, borderRadius: 14, padding: "16px 16px", boxShadow: "0 4px 14px rgba(158,95,90,0.10)" }}>
                <span style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: "50%", background: CTA_GRAD, color: "#FFFFFF", fontFamily: fontMincho, fontSize: 14, fontWeight: 600 }}>
                  {c.campaign.entry.label}
                </span>
                <div style={{ flex: 1 }}>
                  <Was text={c.campaign.entry.was} fontSize={12.5} />
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 2 }}>
                    <span style={{ fontFamily: fontGothic, fontSize: 26, fontWeight: 800, color: ROSE, lineHeight: 1.1 }}>{c.campaign.entry.now}</span>
                    <span style={{ padding: "3px 9px", borderRadius: 6, background: MAIN, color: "#FFFFFF", fontSize: 12, fontWeight: 700 }}>{c.campaign.entry.off}</span>
                  </div>
                </div>
              </div>

              {/* プラン料金（初月） */}
              <p style={{ textAlign: "center", fontFamily: fontMincho, fontSize: 15, fontWeight: 600, color: MAIN, margin: "24px 0 0" }}>{c.campaign.plansHeading}</p>
              <div style={{ marginTop: 12, background: "#FFFFFF", borderRadius: 14, border: `1px solid ${LINE}`, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr 1.1fr", background: PALE, fontSize: 11, fontWeight: 700, color: DIM, padding: "8px 14px" }}>
                  <span>プラン</span>
                  <span style={{ textAlign: "right" }}>通常</span>
                  <span style={{ textAlign: "right" }}>初月</span>
                </div>
                {c.campaign.plans.map((p) => (
                  <div
                    key={p.name}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.15fr 1fr 1.1fr",
                      alignItems: "center",
                      padding: "13px 14px",
                      borderTop: `1px solid ${LINE}`,
                      background: p.recommend ? `${BLUSH}66` : "#FFFFFF",
                    }}
                  >
                    <span style={{ fontFamily: fontGothic, fontSize: 13.5, fontWeight: 700, color: MAIN, display: "flex", flexDirection: "column", gap: 3 }}>
                      {p.name}
                      {p.recommend && (
                        <span style={{ alignSelf: "flex-start", padding: "1px 8px", borderRadius: 999, background: ROSE, color: "#FFFFFF", fontSize: 10, fontWeight: 700 }}>おすすめ</span>
                      )}
                    </span>
                    <span style={{ textAlign: "right" }}>
                      <Was text={p.was} fontSize={12} />
                    </span>
                    <span style={{ textAlign: "right", fontFamily: fontGothic, fontSize: 17, fontWeight: 800, color: ROSE }}>{p.now}</span>
                  </div>
                ))}
              </div>

              {/* 1回あたり */}
              <div style={{ marginTop: 14, borderRadius: 14, background: MAIN, padding: "16px 16px 14px", textAlign: "center" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: BLUSH, margin: 0 }}>{c.campaign.perLesson.label}</p>
                <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.88)", margin: "4px 0 0" }}>{c.campaign.perLesson.formula}</p>
                <div style={{ marginTop: 6, display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4 }}>
                  <span style={{ fontSize: 13, color: "#FFFFFF" }}>1回あたり</span>
                  <span style={{ display: "inline-flex", alignItems: "baseline", padding: "2px 12px", borderRadius: 8, background: "#FFFFFF", marginLeft: 4 }}>
                    <span style={{ fontFamily: fontGothic, fontSize: 30, fontWeight: 800, color: ROSE, lineHeight: 1.15 }}>{c.campaign.perLesson.price}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: ROSE, marginLeft: 2 }}>{c.campaign.perLesson.unit}</span>
                  </span>
                </div>
                <p style={{ fontSize: 10.5, color: "rgba(255,255,255,0.75)", margin: "8px 0 0" }}>※オンラインレッスンを含めた回数・価格です</p>
              </div>

              <p style={{ textAlign: "center", fontFamily: fontMincho, fontSize: 15, fontWeight: 600, color: MAIN, margin: "26px 0 0" }}>{c.campaign.benefitsHeading}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
                {c.campaign.benefits.map((b) => (
                  <div key={b.title} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#FFFFFF", borderRadius: 12, border: `1px solid ${LINE}`, padding: "13px 14px" }}>
                    <span style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 10, background: PALE }}>
                      <Icon name={b.icon} size={20} />
                    </span>
                    <div>
                      <h3 style={{ fontFamily: fontGothic, fontSize: 13.5, fontWeight: 700, color: MAIN, margin: 0 }}>{b.title}</h3>
                      <p style={{ fontSize: 11.5, lineHeight: 1.7, color: DIM, margin: "3px 0 0" }}>{b.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Notes items={c.campaign.notes} />
              <CtaButton text={c.campaign.ctaText} />
            </div>
          </section>

          {/* ── メソッド: 韓国式マシンピラティス ── */}
          <section style={{ padding: "44px 22px 44px", background: "#FFFFFF" }}>
            <Eyebrow text={c.method1.eyebrow} />
            <SectionHeading text={c.method1.heading} />
            <ImageSlot src={c.method1.img.src} placeholder={c.method1.img.placeholder} objectPosition={c.method1.img.position ?? "center"} radius={16} style={{ width: "100%", height: 210, background: BLUSH, marginTop: 22 }} />
            <p style={{ fontSize: 13, lineHeight: 2, color: INK, margin: "18px 0 0" }}>{c.method1.body}</p>

            {/* お悩みTOP3 */}
            <p style={{ textAlign: "center", fontFamily: fontMincho, fontSize: 15, fontWeight: 600, color: MAIN, margin: "24px 0 0" }}>{c.method1.focusHeading}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 12 }}>
              {c.method1.focus.map((f) => (
                <div key={f.title} style={{ textAlign: "center", background: PALE, borderRadius: 14, padding: "14px 4px 12px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: "50%", background: MAIN, color: BLUSH, fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: 13 }}>
                    {f.rank}
                  </span>
                  <div style={{ fontFamily: fontMincho, fontSize: 16, fontWeight: 700, color: ROSE, marginTop: 6 }}>{f.title}</div>
                  <div style={{ fontSize: 10.5, lineHeight: 1.5, color: DIM, marginTop: 3 }}>{f.area}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
              {c.method1.points.map((p) => (
                <div key={p.label} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#FFFFFF", border: `1px solid ${LINE}`, borderRadius: 12, padding: "13px 14px" }}>
                  <span style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", background: PALE }}>
                    <Icon name={p.icon} size={21} />
                  </span>
                  <div>
                    <h3 style={{ fontFamily: fontGothic, fontSize: 13.5, fontWeight: 700, color: MAIN, margin: 0 }}>{p.label}</h3>
                    <p style={{ fontSize: 11.5, lineHeight: 1.7, color: DIM, margin: "3px 0 0" }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Notes items={[c.method1.note]} />
          </section>

          {/* ── 代表メッセージ ── */}
          <section style={{ padding: "44px 22px 44px", background: MAIN }}>
            <Eyebrow text={c.message.eyebrow} color={BLUSH} />
            <p style={{ textAlign: "center", fontFamily: fontMincho, fontSize: 26, fontWeight: 600, letterSpacing: "0.1em", color: "#FFFFFF", margin: 0 }}>{c.message.quote}</p>
            <p style={{ fontFamily: fontMincho, fontSize: 13.5, lineHeight: 2.1, color: "rgba(255,255,255,0.92)", margin: "18px 0 0" }}>{c.message.body}</p>
            <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.2)" }}>
              {c.message.titles.map((t) => (
                <p key={t} style={{ fontSize: 11, lineHeight: 1.7, color: "rgba(255,255,255,0.75)", margin: 0 }}>
                  {t}
                </p>
              ))}
              <p style={{ fontFamily: fontMincho, fontSize: 18, fontWeight: 600, letterSpacing: "0.16em", color: "#FFFFFF", margin: "6px 0 0" }}>{c.message.name}</p>
              <p style={{ fontSize: 11, lineHeight: 1.7, color: BLUSH, margin: "8px 0 0" }}>{c.message.license}</p>
            </div>
          </section>

          {/* ── オンライン特典 ── */}
          <section style={{ padding: "44px 22px 44px", background: PALE }}>
            <Eyebrow text={c.method2.eyebrow} />
            <SectionHeading text={c.method2.heading} />
            <div style={{ position: "relative", marginTop: 26 }}>
              <ImageSlot src={c.method2.img.src} placeholder={c.method2.img.placeholder} objectPosition={c.method2.img.position ?? "center"} radius={16} style={{ width: "100%", height: 190, background: BLUSH }} />
              <span
                style={{
                  position: "absolute",
                  top: -12,
                  left: 14,
                  display: "inline-flex",
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: CTA_GRAD,
                  color: "#FFFFFF",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  boxShadow: `0 4px 10px ${CTA_SHADOW}`,
                }}
              >
                {c.method2.badge}
              </span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 2, color: INK, margin: "18px 0 0" }}>{c.method2.body}</p>
            <Notes items={[c.method2.note]} />
          </section>

          {/* ── 手ぶら訴求 ── */}
          <section style={{ padding: "44px 22px 44px", background: "#FFFFFF" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: "50%", background: PALE }}>
                <Icon name="bag" size={26} />
              </span>
            </div>
            <SectionHeading text={c.tebura.heading} />
            <p style={{ fontSize: 13, lineHeight: 2, color: INK, margin: "16px 0 0", textAlign: "center" }}>{c.tebura.body}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "center" }}>
              {c.tebura.scenes.map((s) => (
                <span key={s} style={{ padding: "8px 14px", borderRadius: 999, background: PALE, color: MAIN, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
                  {s}
                </span>
              ))}
            </div>
            <ImageSlot src={c.tebura.img.src} placeholder={c.tebura.img.placeholder} objectPosition={c.tebura.img.position ?? "center"} radius={16} style={{ width: "100%", height: 180, background: BLUSH, marginTop: 18 }} />
          </section>

          {/* ── 選ばれる5つの理由 ── */}
          <section style={{ padding: "44px 22px 50px", background: PALE }}>
            <Eyebrow text="REASON" />
            <SectionHeading text={c.reasons.heading} fontSize={22} />
            {c.reasons.items.map((item) => (
              <div key={item.num} style={{ marginTop: 34 }}>
                <div style={{ position: "relative" }}>
                  <ImageSlot src={item.img.src} placeholder={item.img.placeholder} objectPosition={item.img.position ?? "center"} radius={16} style={{ width: "100%", height: 200, background: BLUSH }} />
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
                      background: MAIN,
                      border: "2px solid #FFFFFF",
                      boxShadow: "0 4px 10px rgba(74,63,67,0.3)",
                    }}
                  >
                    <span style={{ fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: 16, color: BLUSH }}>{item.num}</span>
                  </span>
                </div>
                <h3 style={{ fontFamily: fontMincho, fontWeight: 600, fontSize: 18, lineHeight: 1.65, letterSpacing: "0.02em", margin: "16px 0 0", color: MAIN, textAlign: "center" }}>
                  {nl(item.title)}
                </h3>
                <div style={{ width: 36, height: 2, background: ROSE_SOFT, margin: "12px auto 0", borderRadius: 2 }} />
                <p style={{ fontSize: 12.5, lineHeight: 1.95, color: INK, margin: "14px 0 0" }}>{item.body}</p>
                {item.note && <p style={{ fontSize: 11, lineHeight: 1.7, color: DIM, margin: "8px 0 0" }}>{item.note}</p>}
              </div>
            ))}
            <CtaButton text={c.reasons.ctaText} sub={c.reasons.ctaSub} />
          </section>

          {/* ── お客様の声 ── */}
          <section style={{ padding: "44px 22px 44px", background: "#FFFFFF" }}>
            <Eyebrow text="VOICE" />
            <SectionHeading text={c.voices.heading} />
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 24 }}>
              {c.voices.items.map((v) => (
                <div key={v.meta} style={{ background: PALE, borderRadius: 16, padding: "20px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ padding: "4px 12px", borderRadius: 999, background: MAIN, color: "#FFFFFF", fontSize: 11, fontWeight: 700 }}>{v.meta}</span>
                    <span style={{ fontSize: 11.5, color: DIM }}>お悩み：{v.worry}</span>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 2, color: INK, margin: "12px 0 0" }}>{v.comment}</p>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", fontSize: 12.5, fontWeight: 700, color: MAIN, margin: "24px 0 0" }}>{c.voices.chipsHeading}</p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginTop: 10 }}>
              {c.voices.chips.map((chip) => (
                <span key={chip} style={{ padding: "7px 14px", borderRadius: 999, background: "#FFFFFF", border: `1px solid ${ROSE_SOFT}77`, color: MAIN, fontSize: 12, fontWeight: 500 }}>
                  「{chip}」
                </span>
              ))}
            </div>
            <Notes items={c.voices.notes} align="center" />
          </section>

          {/* ── 体験の流れ ── */}
          <section style={{ padding: "44px 22px 44px", background: PALE }}>
            <Eyebrow text="FLOW" />
            <SectionHeading text={c.flow.heading} />
            <div style={{ display: "flex", flexDirection: "column", marginTop: 26 }}>
              {c.flow.steps.map((s, i) => (
                <div key={s.num} style={{ display: "flex", gap: 16 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", background: MAIN, color: BLUSH, fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 700, fontSize: 17 }}>
                      {s.num}
                    </span>
                    {i < c.flow.steps.length - 1 && <span style={{ width: 2, flex: 1, background: `${ROSE_SOFT}55`, margin: "6px 0" }} />}
                  </div>
                  <div style={{ paddingBottom: i < c.flow.steps.length - 1 ? 24 : 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                      <h3 style={{ fontFamily: fontGothic, fontSize: 15, fontWeight: 700, color: MAIN, margin: 0 }}>{s.title}</h3>
                      <span style={{ padding: "2px 9px", borderRadius: 999, background: "#FFFFFF", border: `1px solid ${ROSE_SOFT}77`, color: ROSE, fontSize: 11, fontWeight: 700 }}>{s.time}</span>
                    </div>
                    <p style={{ fontSize: 12.5, lineHeight: 1.85, color: DIM, margin: "6px 0 0" }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <Notes items={[c.flow.note]} />
          </section>

          {/* ── FAQ ── */}
          <section style={{ padding: "44px 22px 44px", background: CREAM }}>
            <Eyebrow text="FAQ" />
            <SectionHeading text={c.faq.heading} />
            <div style={{ marginTop: 24 }}>
              <FaqAccordion items={c.faq.items} accent={MAIN} dim={DIM} />
            </div>
          </section>

          {/* ── 店舗案内 ── */}
          <section id="access" style={{ padding: "44px 22px 46px", background: PALE }}>
            <Eyebrow text="ACCESS" />
            <SectionHeading text={c.access.heading} />
            <div style={{ marginTop: 24, borderRadius: 16, overflow: "hidden", background: "#FFFFFF", border: `1px solid ${LINE}`, boxShadow: "0 4px 16px rgba(74,63,67,0.08)" }}>
              <ImageSlot src={c.access.store.img.src} placeholder={c.access.store.img.placeholder} style={{ width: "100%", height: 190, background: BLUSH }} />
              <div style={{ padding: "20px 20px 22px" }}>
                <h3 style={{ fontFamily: fontMincho, fontWeight: 600, fontSize: 18, letterSpacing: "0.06em", margin: 0, color: MAIN }}>{c.access.store.name}</h3>
                <p style={{ fontSize: 12.5, lineHeight: 2, color: INK, margin: "10px 0 0" }}>
                  {c.access.store.address}
                  <br />
                  <b style={{ color: MAIN }}>{c.access.store.hours}</b>｜{c.access.store.holiday}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 8 }}>
                  {c.access.store.routes.map((r) => (
                    <p key={r} style={{ fontSize: 12, lineHeight: 1.7, color: DIM, margin: 0 }}>
                      {r}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── 予約フォーム ── */}
          <section id="form" style={{ padding: "44px 22px 50px", background: "#FFFFFF" }}>
            <Eyebrow text="RESERVATION" />
            <SectionHeading text={c.form.heading} />
            <p style={{ textAlign: "center", fontSize: 12.5, lineHeight: 2, color: DIM, margin: "16px 0 0" }}>{nl(c.form.lead)}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, margin: "18px 0 0" }}>
              {c.sticky.offers.map((o) => (
                <span key={o.label} style={{ display: "inline-flex", alignItems: "baseline", gap: 6, padding: "8px 16px", borderRadius: 12, border: `1.5px solid ${ROSE_SOFT}88`, background: PALE }}>
                  <span style={{ fontSize: 11, color: DIM }}>{o.label}</span>
                  <span style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: 18, color: ROSE }}>{o.value}</span>
                </span>
              ))}
            </div>
            <LPForm
              clientSlug={c.slug}
              accent={ROSE}
              fields={c.form.fields}
              submitLabel={c.form.submitLabel}
              submitStyle={{ background: CTA_GRAD, boxShadow: `0 10px 22px ${CTA_SHADOW}` }}
              microcopy={c.form.microcopy}
              errorMessage={c.form.errorMessage}
              disclaimer={c.form.disclaimer}
              thanksHref={`/${c.slug}/thanks`}
            />
          </section>

          {/* ── footer ── */}
          <footer style={{ background: MAIN, padding: "26px 22px 30px", textAlign: "center" }}>
            {c.footer.lines.map((l, i) => (
              <p
                key={l}
                style={{
                  fontSize: i === 0 ? 14 : 11,
                  fontFamily: i === 0 ? fontMincho : fontSans,
                  letterSpacing: i === 0 ? "0.12em" : "0.03em",
                  color: i === 0 ? "#FFFFFF" : "rgba(255,255,255,0.72)",
                  lineHeight: 1.8,
                  margin: i === 0 ? 0 : "4px 0 0",
                }}
              >
                {l}
              </p>
            ))}
          </footer>
        </LPCanvas>
      </div>

      <StickyFooterCTA
        anchor={c.sticky.anchor}
        buttonText={c.sticky.buttonText}
        showAfter={560}
        buttonGradient={CTA_GRAD}
        shadowColor={CTA_SHADOW}
        borderColor="rgba(201,143,136,0.4)"
        offers={c.sticky.offers.map((o) => (
          <span key={o.label} style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
            <span style={{ fontSize: 11, color: DIM }}>{o.label}</span>
            <span style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: 16, lineHeight: 1, color: ROSE }}>{o.value}</span>
          </span>
        ))}
      />
    </LPShell>
  );
}
