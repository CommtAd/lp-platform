import type { CSSProperties, ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPCanvas from "@/components/LPCanvas";
import StickyFooterCTA from "@/components/StickyFooterCTA";
import ImageSlot from "@/components/ImageSlot";
import FaqAccordion from "./FaqAccordion";
import config from "./config";

/**
 * BEAT PILATES 豊田店 — Meta広告用LP。指示書の心理の順番どおりに並べている。
 *
 *   楽しそう（FV）→ 私のことかも（悩み）→ 続かないのは方法のせい（理由・考え方）
 *   → 暗闇×音楽×マシン（特徴）→ 目指せる未来 → 始めやすい5つの理由 → 身体の悩み
 *   → インストラクター → 体験4STEP → 初めての方の不安 → キャンペーン → 店舗 → FAQ → 最終CTA
 *
 * 守っているルール:
 *   1. 幅390pxの1枚のキャンバス（`<LPCanvas>`）。`vw` / `vh` は使わない（CLAUDE.md §16-17）。
 *   2. 地は白・淡いラベンダーが基本。暗い地＋ネオン紫は「特徴」「キャンペーン」「最終CTA」の
 *      3か所だけ（指示書 §25：全体を黒にしない）。
 *   3. 文字の強弱: 価格「1,000」が最大 → FVコピー → 見出し(23〜25) → 強調 → 本文(13.5〜15) → 注記(11)。
 *   4. ピンクは価格の数字とCTAに寄せる。見出しの地の色には使わない。
 *   5. CTAは6か所（FV・特徴・理由・体験の流れ・キャンペーン・最終）＋追従フッター。
 *      すべて hacomono の体験予約（新規タブ）。
 */

const c = config;

/* ── 配色 ─────────────────────────────────────────────── */
const purple = "#6C3FD1"; // メイン。白地 6.4:1
const purpleDeep = "#3B1E86";
const violet = "#9D6BF0";
const pink = "#FF2E8B";
const priceColor = "#E0137A"; // 白地の価格。4.6:1
const priceOnDark = "#FF6FB5";
const ink = "#231A35";
const inkSoft = "#554B6B";
const inkMute = "#8B84A0";
const lav = "#F5F1FD";
const grey = "#F7F6FA";
const line = "#E7E1F3";
const dark = "#150C26";
const purpleSoft = purple + "17";
const ctaGrad = `linear-gradient(100deg, #FF4A9E 0%, ${pink} 55%, #E0186F 100%)`;
const duoGrad = `linear-gradient(90deg, ${purple} 0%, #A04BE0 55%, ${pink} 100%)`;
const darkGrad = `radial-gradient(120% 80% at 50% 0%, #3A1D72 0%, ${dark} 62%)`;

const fontGothic = "'Zen Kaku Gothic New', sans-serif";
const fontEn = "'Playfair Display', serif";

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

const gradText = (grad: string): CSSProperties => ({
  background: grad,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
});

const Confirm = () => <span style={{ color: "#D4145A", fontWeight: 700 }}>【要確認】</span>;

/** セクション見出し。`kicker` は英字。 */
function SectionHeading({
  text,
  kicker,
  dark: onDark = false,
  fontSize = 24,
}: {
  text: string;
  kicker?: string;
  dark?: boolean;
  fontSize?: number;
}) {
  return (
    <div style={{ textAlign: "center" }}>
      {kicker && (
        <p
          style={{
            fontFamily: fontGothic,
            fontWeight: 800,
            fontSize: 11.5,
            letterSpacing: "0.22em",
            margin: "0 0 10px",
            color: onDark ? priceOnDark : pink,
          }}
        >
          {kicker}
        </p>
      )}
      <h2
        style={{
          fontFamily: fontGothic,
          fontWeight: 800,
          fontSize,
          lineHeight: 1.55,
          letterSpacing: "0.03em",
          margin: 0,
          color: onDark ? "#FFFFFF" : ink,
        }}
      >
        {nl(text)}
      </h2>
      <div
        style={{ width: 36, height: 3, borderRadius: 3, margin: "16px auto 0", background: duoGrad }}
      />
    </div>
  );
}

/** 予約CTA。すべて hacomono の体験予約（新規タブ）。ボタン下に注記1行。 */
function ReserveCta({
  label = c.cta.main,
  onDark = false,
  marginTop = 30,
}: {
  label?: string;
  onDark?: boolean;
  marginTop?: number;
}) {
  return (
    <div style={{ marginTop }}>
      <a
        href={c.reserve.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          height: 62,
          background: ctaGrad,
          color: "#FFFFFF",
          textDecoration: "none",
          fontFamily: fontGothic,
          fontSize: 17,
          fontWeight: 800,
          letterSpacing: "0.04em",
          borderRadius: 999,
          boxShadow: onDark ? `0 0 26px ${pink}88` : "0 10px 22px rgba(224,24,111,0.32)",
        }}
      >
        <span>{label}</span>
        <span style={{ fontSize: 14 }}>›</span>
      </a>
      <p
        style={{
          textAlign: "center",
          fontSize: 11.5,
          lineHeight: 1.8,
          color: onDark ? "rgba(255,255,255,0.78)" : inkMute,
          letterSpacing: "0.04em",
          margin: "10px 0 0",
        }}
      >
        {c.cta.sub}
      </p>
    </div>
  );
}

/** 価格。数字は特大、「円」「税込」は小さく。 */
function Price({ value, size, onDark = false }: { value: string; size: number; onDark?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: 2,
        whiteSpace: "nowrap",
        color: onDark ? priceOnDark : priceColor,
        fontFamily: fontGothic,
        fontWeight: 800,
      }}
    >
      <span style={{ fontSize: size, lineHeight: 1, letterSpacing: "-0.01em" }}>{value}</span>
      <span style={{ fontSize: size * 0.4 }}>円</span>
      <span style={{ fontSize: 10, fontWeight: 500, color: onDark ? "rgba(255,255,255,0.7)" : inkMute, marginLeft: 3 }}>
        税込
      </span>
    </span>
  );
}

/** 価格カード（FV・キャンペーン・最終CTA）。体験 1,000円を最大に、入会金 0円をその下に。 */
function OfferCard({ trialSize = 64, admissionSize = 40 }: { trialSize?: number; admissionSize?: number }) {
  const p = c.prices;
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 20,
        padding: "20px 20px 16px",
        boxShadow: "0 12px 30px rgba(60,30,120,0.16)",
        border: `1.5px solid ${pink}33`,
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <span
          style={{
            fontFamily: fontGothic,
            fontWeight: 800,
            fontSize: 15,
            color: "#FFFFFF",
            background: purple,
            borderRadius: 999,
            padding: "4px 14px",
            letterSpacing: "0.06em",
          }}
        >
          {p.trialLabel}
        </span>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: inkSoft }}>{p.trialNote}</span>
      </div>
      <div style={{ marginTop: 6 }}>
        <Price value={p.trial} size={trialSize} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          marginTop: 10,
          paddingTop: 12,
          borderTop: `1px dashed ${line}`,
        }}
      >
        <span
          style={{
            fontFamily: fontGothic,
            fontWeight: 800,
            fontSize: 14,
            color: purple,
            border: `1.5px solid ${purple}`,
            borderRadius: 999,
            padding: "3px 12px",
          }}
        >
          さらに{p.admissionLabel}
        </span>
        <Price value={p.admission} size={admissionSize} />
      </div>
    </div>
  );
}

/* ── アイコン（線画・24px基準） ─────────────────────────── */
const iconPaths: Record<string, ReactNode> = {
  hip: (
    <>
      <path d="M7 3c-.8 4-1.6 7-1.6 10.5C5.4 18 8 21 12 21s6.6-3 6.6-7.5C18.6 10 17.8 7 17 3" />
      <path d="M12 13.5V21" />
    </>
  ),
  camera: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M8.5 7l1.5-3h4l1.5 3" />
      <circle cx="12" cy="13.5" r="3.5" />
    </>
  ),
  waist: (
    <>
      <path d="M7 3c1.2 3 1.2 6 0 9s-1.2 6 0 9" />
      <path d="M17 3c-1.2 3-1.2 6 0 9s1.2 6 0 9" />
      <circle cx="12" cy="13" r="1" />
    </>
  ),
  sofa: (
    <>
      <path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3" />
      <path d="M3 12a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v5H3z" />
      <path d="M5 17v2M19 17v2" />
    </>
  ),
  gym: (
    <>
      <path d="M6 8v8M3.5 10v4M18 8v8M20.5 10v4M6 12h12" />
    </>
  ),
  question: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7" />
      <path d="M12 17h.01" />
    </>
  ),
  leg: (
    <>
      <path d="M9 3v8.5c0 2-1 4.5-1 6.5v3h3" />
      <path d="M15 3v8.5c0 2 .5 4.5.5 6.5v3H18" />
    </>
  ),
  posture: (
    <>
      <circle cx="12" cy="4.5" r="2" />
      <path d="M12 7v8M8 10.5h8M12 15l-3 6M12 15l3 6" />
    </>
  ),
  energy: <path d="M13 2L5 13.5h6L10 22l8-11.5h-6z" />,
  dark: (
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z" />
  ),
  music: (
    <>
      <path d="M9 18V5l11-2v13" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="16" r="2.5" />
    </>
  ),
  machine: (
    <>
      <rect x="2.5" y="12" width="19" height="4" rx="1.5" />
      <path d="M5 16v4M19 16v4M8 12V9h4v3M17 12V6" />
    </>
  ),
};

function Icon({ name, size = 26, color = purple, strokeWidth = 1.8 }: { name: string; size?: number; color?: string; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ flex: "none" }}
    >
      {iconPaths[name]}
    </svg>
  );
}

const pillarIcon = ["dark", "music", "machine"];

const Check = ({ color = pink }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden style={{ flex: "none" }}>
    <circle cx="12" cy="12" r="11" fill={color} />
    <path d="M7 12.5l3.2 3.2L17 9" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Page() {
  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div
        style={{
          fontFamily: "'Noto Sans JP', sans-serif",
          lineBreak: "strict",
          background: "#ECE7F6",
          minHeight: "100vh",
          color: ink,
        }}
      >
        <LPCanvas style={{ background: "#FFFFFF" }} boxShadow="0 0 60px rgba(60,30,120,0.16)">
          {/* ── ヘッダー ── */}
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              background: dark,
            }}
          >
            <img src={c.header.logo} alt={c.header.logoAlt} style={{ height: 34, width: "auto", display: "block" }} />
            <div style={{ textAlign: "right", lineHeight: 1.2, color: "#FFFFFF" }}>
              <div style={{ fontSize: 10.5, letterSpacing: "0.04em", color: "rgba(255,255,255,0.75)" }}>
                {c.header.station}
              </div>
              <div style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: 12 }}>
                {c.header.walkPre}
                <span style={{ fontSize: 20, color: priceOnDark, margin: "0 1px" }}>{c.header.walkNum}</span>
                {c.header.walkPost}
              </div>
            </div>
          </header>

          {/* ── オファーバー ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              background: duoGrad,
              color: "#FFFFFF",
              padding: "8px 16px",
              fontFamily: fontGothic,
              fontWeight: 800,
            }}
          >
            <span style={{ fontSize: 13, display: "flex", alignItems: "baseline", gap: 4 }}>
              {c.offerBar.trialLabel}
              <span style={{ fontSize: 22, lineHeight: 1 }}>{c.offerBar.trial}</span>円
            </span>
            <span style={{ width: 1, height: 18, background: "rgba(255,255,255,0.5)" }} />
            <span style={{ fontSize: 13, display: "flex", alignItems: "baseline", gap: 4 }}>
              {c.offerBar.admissionLabel}
              <span style={{ fontSize: 22, lineHeight: 1 }}>{c.offerBar.admission}</span>円
            </span>
          </div>

          {/* ── FV：レッスン動画＋メインコピー ── */}
          <section style={{ position: "relative", height: 500, overflow: "hidden", background: dark }}>
            <ImageSlot
              src={c.fv.hero.src}
              poster={c.fv.hero.poster}
              placeholder={c.fv.hero.placeholder}
              objectPosition={c.fv.hero.position}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: dark }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(21,12,38,0.15) 0%, rgba(21,12,38,0) 26%, rgba(21,12,38,0.35) 52%, rgba(21,12,38,0.92) 100%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "absolute", left: 20, right: 20, bottom: 26, color: "#FFFFFF" }}>
              <span
                style={{
                  display: "inline-block",
                  fontFamily: fontGothic,
                  fontWeight: 800,
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  background: "rgba(255,255,255,0.16)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  borderRadius: 999,
                  padding: "4px 12px",
                }}
              >
                {c.fv.eyebrow}
              </span>
              <h1
                style={{
                  fontFamily: fontGothic,
                  fontWeight: 800,
                  lineHeight: 1.3,
                  letterSpacing: "0.02em",
                  margin: "12px 0 0",
                  textShadow: "0 2px 16px rgba(20,8,50,0.55)",
                }}
              >
                <span style={{ display: "block", fontSize: 28 }}>{c.fv.catchLines[0]}</span>
                <span style={{ display: "block", fontSize: 33, letterSpacing: 0, whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: 24 }}>でも、</span>
                  <span style={{ color: "#FF8CC5", textShadow: `0 0 18px ${pink}88, 0 2px 12px rgba(20,8,50,0.6)` }}>
                    身体は変えたい。
                  </span>
                </span>
              </h1>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  lineHeight: 1.7,
                  letterSpacing: "0.04em",
                  margin: "12px 0 0",
                  textShadow: "0 1px 8px rgba(20,8,50,0.6)",
                }}
              >
                {nl(c.fv.sub)}
              </p>
            </div>
          </section>

          {/* ── FV下：暗闇×音楽×マシン → 安心チップ → 価格 → CTA① ── */}
          <section style={{ background: `linear-gradient(180deg, ${dark} 0%, #2A1652 38%, ${lav} 38%)`, padding: "16px 18px 34px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {c.fv.pillars.map((p, i) => (
                <div key={p.en} style={{ display: "contents" }}>
                  {i > 0 && <span style={{ flex: "none", fontSize: 16, fontWeight: 800, color: priceOnDark }}>×</span>}
                  <div
                    style={{
                      flex: 1,
                      height: 92,
                      borderRadius: 14,
                      background: "rgba(255,255,255,0.06)",
                      border: `1px solid ${violet}88`,
                      boxShadow: `inset 0 0 18px ${violet}33`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 4,
                      color: "#FFFFFF",
                    }}
                  >
                    <Icon name={pillarIcon[i]} size={22} color="#E7D6FF" />
                    <span style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: i === 2 ? 12.5 : 16, lineHeight: 1.25, textAlign: "center" }}>
                      {nl(p.label)}
                    </span>
                    <span style={{ fontSize: 8.5, letterSpacing: "0.2em", color: "rgba(255,255,255,0.6)" }}>{p.en}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
              {c.fv.chips.map((chip) => (
                <span
                  key={chip}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    background: "rgba(255,255,255,0.14)",
                    borderRadius: 999,
                    padding: "6px 10px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ color: priceOnDark }}>✓</span>
                  {chip}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 22 }}>
              <OfferCard />
            </div>
            <ReserveCta marginTop={20} />
          </section>

          {/* ── SECTION 01 悩み ── */}
          <section style={{ background: "#FFFFFF", padding: "60px 20px 56px" }}>
            <SectionHeading text={c.worry.heading} kicker="CHECK" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 30 }}>
              {c.worry.items.map((item) => (
                <div
                  key={item.text}
                  style={{
                    background: lav,
                    borderRadius: 14,
                    padding: "16px 12px 14px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name={item.icon} size={24} />
                  </span>
                  <span style={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.55, color: ink }}>{nl(item.text)}</span>
                </div>
              ))}
            </div>
            <p
              style={{
                textAlign: "center",
                fontFamily: fontGothic,
                fontWeight: 800,
                fontSize: 17,
                lineHeight: 1.7,
                margin: "30px 0 0",
                color: purple,
              }}
            >
              {nl(c.worry.closing)}
            </p>
            <div style={{ textAlign: "center", fontSize: 20, color: pink, lineHeight: 1, marginTop: 8 }}>▼</div>
          </section>

          {/* ── SECTION 02 続かない理由 ── */}
          <section style={{ background: grey, padding: "58px 22px 60px" }}>
            <SectionHeading text={c.reason.heading} kicker={c.reason.kicker} fontSize={25} />
            <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "20px 16px", marginTop: 30, textAlign: "center" }}>
              <p style={{ fontSize: 12.5, fontWeight: 700, color: inkMute, margin: 0, letterSpacing: "0.04em" }}>
                これまで、こんなことを試してきませんでしたか？
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 14 }}>
                {c.reason.tried.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: inkSoft,
                      background: grey,
                      border: `1px solid ${line}`,
                      borderRadius: 999,
                      padding: "6px 13px",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: ink, margin: "16px 0 0" }}>{c.reason.triedNote}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 30, textAlign: "center" }}>
              {c.reason.lines.map((l, i) => (
                <p
                  key={l}
                  style={{
                    margin: 0,
                    fontSize: i === 0 ? 15 : 17,
                    fontWeight: i === 0 ? 500 : 800,
                    fontFamily: i === 0 ? undefined : fontGothic,
                    lineHeight: 1.85,
                    color: i === 0 ? inkSoft : ink,
                  }}
                >
                  {nl(l)}
                </p>
              ))}
            </div>
          </section>

          {/* ── SECTION 03 考え方 ── */}
          <section style={{ background: "#FFFFFF", padding: "60px 22px 62px" }}>
            <h2
              style={{
                textAlign: "center",
                fontFamily: fontGothic,
                fontWeight: 800,
                fontSize: 23,
                lineHeight: 1.6,
                margin: 0,
                color: ink,
              }}
            >
              {nl(c.mindset.heading)}
            </h2>
            <p
              style={{
                textAlign: "center",
                fontFamily: fontGothic,
                fontWeight: 800,
                fontSize: 28,
                lineHeight: 1.45,
                letterSpacing: "0.02em",
                margin: "18px 0 0",
                ...gradText(duoGrad),
              }}
            >
              {nl(c.mindset.emphasis)}
            </p>
            <ImageSlot
              src={c.mindset.img.src}
              placeholder={c.mindset.img.placeholder}
              objectPosition={c.mindset.img.position}
              radius={18}
              style={{ width: "100%", height: 230, marginTop: 28 }}
            />
            <p style={{ textAlign: "center", fontSize: 14.5, lineHeight: 1.95, color: inkSoft, margin: "24px 0 0" }}>
              {nl(c.mindset.body)}
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 20 }}>
              {c.mindset.formula.map((f, i) => (
                <div key={f} style={{ display: "contents" }}>
                  {i > 0 && <span style={{ fontWeight: 800, color: pink, fontSize: 18 }}>×</span>}
                  <span
                    style={{
                      width: 76,
                      height: 76,
                      borderRadius: "50%",
                      background: lav,
                      border: `1.5px solid ${purple}44`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                      fontFamily: fontGothic,
                      fontWeight: 800,
                      fontSize: 15,
                      color: purple,
                    }}
                  >
                    <Icon name={pillarIcon[i]} size={20} />
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ── SECTION 04 BEATの特徴（暗い地＋ネオン）＋ CTA② ── */}
          <section style={{ background: darkGrad, padding: "62px 20px 60px", color: "#FFFFFF" }}>
            <SectionHeading text={c.features.heading} kicker={c.features.kicker} dark fontSize={22} />
            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 34 }}>
              {c.features.items.map((f) => (
                <div
                  key={f.num}
                  style={{
                    borderRadius: 18,
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${violet}66`,
                    boxShadow: `0 0 24px ${purple}40`,
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <ImageSlot
                      src={f.img.src}
                      placeholder={f.img.placeholder}
                      objectPosition={f.img.position}
                      style={{ width: "100%", height: 190, background: "#2C1A36" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to bottom, rgba(21,12,38,0) 50%, rgba(21,12,38,0.75) 100%)",
                      }}
                    />
                    <div style={{ position: "absolute", left: 16, bottom: 12, display: "flex", alignItems: "baseline", gap: 10 }}>
                      <span style={{ fontFamily: fontEn, fontStyle: "italic", fontWeight: 700, fontSize: 30, lineHeight: 1, color: priceOnDark }}>
                        {f.num}
                      </span>
                      <span style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: 24, lineHeight: 1 }}>{f.label}</span>
                      <span style={{ fontSize: 10, letterSpacing: "0.22em", color: "rgba(255,255,255,0.7)" }}>{f.en}</span>
                    </div>
                  </div>
                  <div style={{ padding: "16px 18px 20px" }}>
                    <h3 style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: 19, margin: 0, color: "#FFFFFF" }}>{f.title}</h3>
                    <p style={{ fontSize: 13.5, lineHeight: 1.85, color: "rgba(255,255,255,0.82)", margin: "8px 0 0" }}>{nl(f.body)}</p>
                  </div>
                </div>
              ))}
            </div>
            <ReserveCta onDark marginTop={34} />
          </section>

          {/* ── SECTION 05 目指せる未来 ── */}
          <section style={{ background: lav, padding: "60px 22px 58px" }}>
            <SectionHeading text={c.future.heading} kicker="FUTURE" fontSize={22} />
            <ImageSlot
              src={c.future.img.src}
              placeholder={c.future.img.placeholder}
              objectPosition={c.future.img.position}
              radius={18}
              style={{ width: "100%", height: 200, marginTop: 28 }}
            />
            <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "8px 18px", marginTop: -26, marginInline: 10, position: "relative", boxShadow: "0 10px 24px rgba(60,30,120,0.10)" }}>
              {c.future.items.map((item, i) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "13px 0",
                    borderTop: i === 0 ? "none" : `1px solid ${line}`,
                  }}
                >
                  <Check />
                  <span style={{ fontSize: 14.5, fontWeight: 700, color: ink, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <p
              style={{
                textAlign: "center",
                fontFamily: fontGothic,
                fontWeight: 800,
                fontSize: 19,
                lineHeight: 1.7,
                margin: "30px 0 0",
                color: purple,
              }}
            >
              {nl(c.future.closing)}
            </p>
          </section>

          {/* ── SECTION 06 始めやすい5つの理由 ＋ CTA③ ── */}
          <section style={{ background: "#FFFFFF", padding: "62px 20px 60px" }}>
            <SectionHeading text={c.reasons.heading} kicker="REASON" fontSize={24} />
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 32 }}>
              {c.reasons.items.map((r) => (
                <div
                  key={r.num}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    border: `1px solid ${line}`,
                    background: "#FFFFFF",
                    boxShadow: "0 6px 18px rgba(60,30,120,0.06)",
                  }}
                >
                  {r.img && (
                    <ImageSlot
                      src={r.img.src}
                      placeholder={r.img.placeholder}
                      objectPosition={r.img.position}
                      style={{ width: "100%", height: 150 }}
                    />
                  )}
                  <div style={{ display: "flex", gap: 12, padding: "16px 16px 18px" }}>
                    <span
                      style={{
                        flex: "none",
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: duoGrad,
                        color: "#FFFFFF",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        lineHeight: 1,
                      }}
                    >
                      <span style={{ fontSize: 8, letterSpacing: "0.12em", fontWeight: 700 }}>POINT</span>
                      <span style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: 18, marginTop: 2 }}>{r.num}</span>
                    </span>
                    <div>
                      <h3 style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: 17, lineHeight: 1.45, margin: 0, color: ink }}>{r.title}</h3>
                      <p style={{ fontSize: 13.5, lineHeight: 1.8, color: inkSoft, margin: "6px 0 0" }}>{r.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <ReserveCta label={c.cta.try} marginTop={32} />
          </section>

          {/* ── SECTION 07 身体のお悩み ── */}
          <section style={{ background: grey, padding: "60px 20px 56px" }}>
            <SectionHeading text={c.body.heading} kicker="BODY" fontSize={22} />
            <p style={{ textAlign: "center", fontSize: 14, lineHeight: 1.85, color: inkSoft, margin: "20px 0 0" }}>{nl(c.body.lead)}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 24 }}>
              {c.body.items.map((b) => (
                <div
                  key={b.label}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 14,
                    padding: "14px 6px 12px",
                    textAlign: "center",
                    border: `1px solid ${line}`,
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: lav,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name={b.icon} size={22} />
                  </span>
                  <p style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: 16, margin: "6px 0 0", color: purple }}>{b.label}</p>
                  <p style={{ fontSize: 11.5, lineHeight: 1.55, color: inkSoft, margin: "4px 0 0" }}>{nl(b.text)}</p>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "right", fontSize: 10.5, color: inkMute, margin: "10px 0 0" }}>{c.body.note}</p>
          </section>

          {/* ── インストラクター（控えめ） ── */}
          <section style={{ background: "#FFFFFF", padding: "56px 0 54px" }}>
            <div style={{ padding: "0 20px" }}>
              <SectionHeading text={c.instructors.heading} kicker="INSTRUCTOR" fontSize={22} />
              <p style={{ textAlign: "center", fontSize: 13.5, lineHeight: 1.85, color: inkSoft, margin: "18px 0 0" }}>
                {nl(c.instructors.lead)}
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "22px 20px 6px", scrollbarWidth: "none" }}>
              {c.instructors.items.map((t) => (
                <div key={t.name} style={{ flex: "none", width: 116, textAlign: "center" }}>
                  <ImageSlot
                    src={t.img.src}
                    placeholder={t.img.placeholder}
                    objectPosition={t.img.position}
                    radius={14}
                    style={{ width: 116, height: 146 }}
                  />
                  <p style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: 12.5, letterSpacing: "0.1em", margin: "8px 0 0", color: ink }}>
                    {t.name}
                  </p>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", fontSize: 11, color: inkMute, margin: "8px 0 0" }}>← スワイプ →</p>
          </section>

          {/* ── 体験の流れ 4STEP ＋ CTA④ ── */}
          <section style={{ background: lav, padding: "60px 22px 60px" }}>
            <SectionHeading text={c.flow.heading} kicker="FLOW" fontSize={22} />
            <div style={{ position: "relative", marginTop: 32 }}>
              <div style={{ position: "absolute", left: 23, top: 20, bottom: 20, width: 2, background: `${purple}33` }} />
              {c.flow.steps.map((s, i) => (
                <div key={s.num} style={{ position: "relative", display: "flex", gap: 14, marginTop: i === 0 ? 0 : 14 }}>
                  <span
                    style={{
                      flex: "none",
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: i === c.flow.steps.length - 1 ? ctaGrad : duoGrad,
                      color: "#FFFFFF",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      lineHeight: 1,
                      boxShadow: `0 0 0 4px ${lav}`,
                    }}
                  >
                    <span style={{ fontSize: 8, letterSpacing: "0.1em", fontWeight: 700 }}>STEP</span>
                    <span style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: 17, marginTop: 2 }}>{s.num}</span>
                  </span>
                  <div style={{ flex: 1, background: "#FFFFFF", borderRadius: 14, padding: "14px 16px" }}>
                    <h3 style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: 16.5, margin: 0, color: ink }}>{s.title}</h3>
                    <p style={{ fontSize: 13.5, lineHeight: 1.8, color: inkSoft, margin: "6px 0 0" }}>
                      {s.confirm && <Confirm />}
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, lineHeight: 1.7, color: inkMute, margin: "14px 0 0" }}>
              <Confirm />
              {c.flow.note}
            </p>
            <ReserveCta label={c.cta.reserve} marginTop={28} />
          </section>

          {/* ── 初めての方の不安（Q&Aカード） ── */}
          <section style={{ background: "#FFFFFF", padding: "60px 20px 58px" }}>
            <SectionHeading text={c.qa.heading} kicker="FOR BEGINNERS" fontSize={22} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 30 }}>
              {c.qa.items.map((q) => (
                <div key={q.q} style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${line}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, background: purpleSoft, padding: "12px 16px" }}>
                    <span
                      style={{
                        flex: "none",
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: purple,
                        color: "#FFFFFF",
                        fontFamily: fontGothic,
                        fontWeight: 800,
                        fontSize: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Q
                    </span>
                    <span style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: 15.5, color: ink }}>{q.q}</span>
                  </div>
                  <div style={{ display: "flex", gap: 10, padding: "14px 16px 16px" }}>
                    <span
                      style={{
                        flex: "none",
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: pink,
                        color: "#FFFFFF",
                        fontFamily: fontGothic,
                        fontWeight: 800,
                        fontSize: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      A
                    </span>
                    <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.85, color: inkSoft }}>{q.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── キャンペーン（ブランド動画の上）＋ CTA⑤ ── */}
          <section style={{ position: "relative", overflow: "hidden", background: dark, padding: "64px 20px 60px", color: "#FFFFFF" }}>
            <ImageSlot
              src={c.campaign.bg.src}
              poster={c.campaign.bg.poster}
              placeholder={c.campaign.bg.placeholder}
              objectPosition={c.campaign.bg.position}
              style={{ position: "absolute", left: 0, right: 0, top: 0, height: 300, background: dark }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(to bottom, rgba(21,12,38,0.62) 0px, rgba(21,12,38,0.85) 200px, ${dark} 300px)`,
              }}
            />
            <div style={{ position: "relative" }}>
              <p style={{ textAlign: "center", fontSize: 15, fontWeight: 700, lineHeight: 1.8, margin: 0, textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>
                {nl(c.campaign.value)}
              </p>
              <p style={{ textAlign: "center", fontFamily: fontGothic, fontWeight: 800, fontSize: 11.5, letterSpacing: "0.22em", color: priceOnDark, margin: "26px 0 0" }}>
                {c.campaign.kicker}
              </p>
              <h2 style={{ textAlign: "center", fontFamily: fontGothic, fontWeight: 800, fontSize: 30, lineHeight: 1.4, margin: "8px 0 0" }}>
                {c.campaign.heading}
              </h2>
              <div style={{ marginTop: 24 }}>
                <OfferCard trialSize={78} admissionSize={46} />
              </div>
              <p style={{ fontSize: 11, lineHeight: 1.7, color: "rgba(255,255,255,0.72)", margin: "12px 0 0" }}>
                {c.campaign.confirm && <span style={{ color: priceOnDark, fontWeight: 700 }}>【要確認】</span>}
                {c.campaign.note}
              </p>
              <ReserveCta label={c.cta.reserve} onDark marginTop={22} />
            </div>
          </section>

          {/* ── 店舗情報 ── */}
          <section style={{ background: "#FFFFFF", padding: "58px 20px 56px" }}>
            <SectionHeading text={c.store.heading} kicker="ACCESS" fontSize={24} />
            <div style={{ borderRadius: 18, overflow: "hidden", border: `1px solid ${line}`, marginTop: 30 }}>
              <ImageSlot
                src={c.store.img.src}
                placeholder={c.store.img.placeholder}
                objectPosition={c.store.img.position}
                style={{ width: "100%", height: 210 }}
              />
              <div style={{ padding: "20px 18px 18px" }}>
                <h3 style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: 20, margin: 0, color: ink }}>{c.store.name}</h3>
                <p style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: 15, margin: "8px 0 0", color: ink }}>
                  豊田市駅から徒歩
                  <span style={{ fontSize: 30, color: priceColor, margin: "0 2px", lineHeight: 1 }}>3</span>分
                </p>
                <div style={{ height: 1, background: line, margin: "14px 0" }} />
                <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "64px 1fr", rowGap: 12, fontSize: 13.5 }}>
                  <dt style={{ color: inkMute, fontSize: 12.5 }}>住所</dt>
                  <dd style={{ margin: 0, color: inkSoft, lineHeight: 1.7 }}>{nl(c.store.address)}</dd>
                  <dt style={{ color: inkMute, fontSize: 12.5 }}>アクセス</dt>
                  <dd style={{ margin: 0, color: inkSoft, lineHeight: 1.7 }}>
                    {c.store.access.map((a) => (
                      <span key={a} style={{ display: "block" }}>
                        {a}
                      </span>
                    ))}
                  </dd>
                  <dt style={{ color: inkMute, fontSize: 12.5 }}>駐車場</dt>
                  <dd style={{ margin: 0, color: ink, fontWeight: 700 }}>{c.store.parking}</dd>
                  <dt style={{ color: inkMute, fontSize: 12.5 }}>営業時間</dt>
                  <dd style={{ margin: 0, color: inkSoft }}>{c.store.hours}</dd>
                </dl>
                <iframe
                  src={c.store.mapEmbedSrc}
                  title={`${c.store.name}の地図`}
                  loading="lazy"
                  style={{ width: "100%", height: 170, marginTop: 16, border: 0, borderRadius: 12 }}
                />
              </div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section style={{ background: lav, padding: "58px 20px 58px" }}>
            <SectionHeading text={c.faq.heading} kicker="FAQ" fontSize={24} />
            <div style={{ marginTop: 28 }}>
              <FaqAccordion items={c.faq.items} accent={purple} accentSoft={purpleSoft} ink={ink} inkSoft={inkSoft} />
            </div>
          </section>

          {/* ── 最終CTA ＋ CTA⑥ ── */}
          <section style={{ position: "relative", overflow: "hidden", background: dark, color: "#FFFFFF" }}>
            <ImageSlot
              src={c.closing.bg.src}
              placeholder={c.closing.bg.placeholder}
              objectPosition={c.closing.bg.position}
              style={{ position: "absolute", left: 0, right: 0, top: 0, height: 360 }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(to bottom, rgba(21,12,38,0.35) 0px, rgba(21,12,38,0.85) 260px, ${dark} 360px)`,
              }}
            />
            <div style={{ position: "relative", padding: "70px 20px 56px" }}>
              <h2
                style={{
                  textAlign: "center",
                  fontFamily: fontGothic,
                  fontWeight: 800,
                  fontSize: 25,
                  lineHeight: 1.55,
                  margin: 0,
                  textShadow: "0 2px 14px rgba(0,0,0,0.6)",
                }}
              >
                {nl(c.closing.heading)}
              </h2>
              <p
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: 700,
                  lineHeight: 1.8,
                  margin: "18px 0 0",
                  color: "#FFD3EA",
                  textShadow: "0 1px 8px rgba(0,0,0,0.6)",
                }}
              >
                {nl(c.closing.lead)}
              </p>
              <div style={{ marginTop: 28 }}>
                <OfferCard trialSize={60} admissionSize={38} />
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
                {c.closing.chips.map((chip) => (
                  <span
                    key={chip}
                    style={{
                      fontSize: 12.5,
                      fontWeight: 700,
                      background: "rgba(255,255,255,0.14)",
                      borderRadius: 999,
                      padding: "6px 14px",
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <ReserveCta onDark marginTop={22} />
              <p style={{ textAlign: "center", fontFamily: fontGothic, fontWeight: 800, fontSize: 14, letterSpacing: "0.1em", margin: "22px 0 0" }}>
                {c.closing.storeName}
              </p>
            </div>
          </section>

          <footer
            style={{
              background: dark,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)",
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

      {/* ── 追従フッターCTA（外部予約なので最後まで表示） ── */}
      <StickyFooterCTA
        href={c.reserve.url}
        buttonText={c.sticky.buttonText}
        showAfter={c.sticky.showAfter}
        buttonGradient={ctaGrad}
        shadowColor="rgba(224,24,111,0.35)"
        borderColor={`${purple}40`}
        offers={[
          <span key="trial" style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontSize: 11, color: inkSoft }}>初回体験</span>
            <span style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: 18, lineHeight: 1, color: priceColor }}>
              {c.prices.trial}
              <span style={{ fontSize: 11 }}>円</span>
            </span>
          </span>,
          <span key="adm" style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontSize: 11, color: inkSoft }}>入会金</span>
            <span style={{ fontFamily: fontGothic, fontWeight: 800, fontSize: 18, lineHeight: 1, color: priceColor }}>
              {c.prices.admission}
              <span style={{ fontSize: 11 }}>円</span>
            </span>
          </span>,
        ]}
      />
    </LPShell>
  );
}
