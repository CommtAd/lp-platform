import type { CSSProperties, ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPCanvas from "@/components/LPCanvas";
import StickyFooterCTA from "@/components/StickyFooterCTA";
import ImageSlot from "@/components/ImageSlot";
import FaqAccordion from "./FaqAccordion";
import ReserveTracker from "./ReserveTracker";
import config from "./config";
import type { CtaSpot, Slot } from "./config";

/**
 * パーソナルマシンピラティス SAKURA 青葉台店 — Meta広告の体験予約用LP。
 *
 * 評価軸は「体験予約の完了数」。各ブロックは
 *   悩みに共感 → 理想の未来 → 選ぶ理由 → 安心 → 予約
 * の順で、指示書 §6 のセクション順をそのまま守っている:
 *   ヘッダー → オファーバー → ① FV（キャッチ・体験0円・CTA）→ ② お悩み → ③ 目指せる未来
 *   → ④ 選ばれる4つの理由 → ⑤ 体験レッスン（中間CTA）→ ⑥ パーソナルとは
 *   → ⑦ 体験の流れ（CTA）→ ⑧ 店舗・アクセス → ⑨ FAQ → ⑩ 最終CTA
 *   ＋ 追従フッターCTA
 *
 * CTAはすべてハコモノの青葉台店・体験予約ページへ直接遷移（config.reserve.url）。
 * クリックは ReserveTracker が dataLayer / fbq に送る（data-cta で位置を識別）。
 *
 * ABテストは config.ab の1行で切り替える（FVキャッチ／メインビジュアル／CTA文言）。
 *
 * 見た目の作法は sakura-tokyo と同じ:
 *   1. 地は生成り、カードは白。セクションの切り替えは地色でつける
 *   2. 見出しは明朝（Shippori Mincho）、本文はゴシック。本文は15px以上
 *   3. 小さい文字のアクセントは PINK_DEEP 以上の濃さ（白地で4.5:1以上）
 *   4. 幅は390px固定のキャンバス（LPCanvas）。vw/vh は使わない（CLAUDE.md §16-17）
 */

/* ── palette ───────────────────────────────────────────────── */
const CREAM = "#FDF9F7";
const PALE = "#FBEFF2";
const PALE2 = "#F8E7EC";
const LINE = "#F0DBE1";
const BEIGE = "#F5EFE8";
const PINK = "#E58BA4";
const PINK_DEEP = "#C2557A";
const PINK_INK = "#A8416A";
const INK = "#3E3A3B";
const BODY = "#6E6568";
const MUTED = "#A2969A";
const BTN = "linear-gradient(135deg, #EC8AA6 0%, #C24F71 100%)";
const BTN_SHADOW = "0 10px 22px rgba(194,80,113,0.32)";
/** 白抜き文字を載せる桜色の帯。白字が沈まないよう淡いピンクは使わない。 */
const BAND = "linear-gradient(120deg, #DB7593 0%, #C2557A 55%, #A8416A 100%)";
const PALE_GRAD = `linear-gradient(180deg, ${PALE} 0%, ${PALE2} 100%)`;

const MINCHO = "'Shippori Mincho', 'Hiragino Mincho ProN', serif";
const GOTHIC = "'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif";

/** "\n" を <br /> に開く。 */
function nl(text: string): ReactNode {
  const parts = text.split("\n");
  return parts.map((p, i) => (
    <span key={i}>
      {p}
      {i < parts.length - 1 && <br />}
    </span>
  ));
}

/** AB設定に応じたCTA文言。mixed のときはセクションごとの既定文言。 */
function ctaText(spot: CtaSpot): string {
  const ab = config.ab.cta;
  if (spot === "header") return ab === "B" ? "体験予約はこちら" : config.cta.spots.header;
  return ab === "mixed" ? config.cta.spots[spot] : config.cta.variants[ab];
}

/* ── shared pieces ─────────────────────────────────────────── */

/** 桜のマーク。ブランド記号として見出しの区切りとヘッダーに使う。 */
function SakuraMark({ size = 14, color = PINK }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="12"
          cy="6.4"
          rx="3.1"
          ry="5.1"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
      <circle cx="12" cy="12" r="1.7" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

function Kicker({ children, color = PINK_DEEP }: { children: ReactNode; color?: string }) {
  return (
    <div
      style={{
        textAlign: "center",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.24em",
        color,
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  );
}

function Heading({ text, size = 25, color = INK }: { text: string; size?: number; color?: string }) {
  const onDark = color !== INK;
  return (
    <div style={{ textAlign: "center" }}>
      <h2
        style={{
          margin: 0,
          fontFamily: MINCHO,
          fontWeight: 600,
          fontSize: size,
          lineHeight: 1.55,
          letterSpacing: "0.04em",
          color,
        }}
      >
        {nl(text)}
      </h2>
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 14 }}
        aria-hidden
      >
        <span style={{ width: 26, height: 1, background: onDark ? "rgba(255,255,255,0.6)" : LINE }} />
        <SakuraMark size={14} color={onDark ? "#FFFFFF" : PINK} />
        <span style={{ width: 26, height: 1, background: onDark ? "rgba(255,255,255,0.6)" : LINE }} />
      </div>
    </div>
  );
}

const CheckIcon = ({ color = PINK_DEEP, size = 18 }: { color?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flex: "none" }}
    aria-hidden
  >
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

/** 写真。config の Slot をそのまま受ける。 */
function Photo({ slot, style, radius = 0 }: { slot: Slot; style: CSSProperties; radius?: number }) {
  return (
    <ImageSlot
      src={slot.src}
      placeholder={slot.placeholder}
      alt={slot.placeholder}
      objectPosition={slot.position ?? "center"}
      radius={radius}
      style={style}
    />
  );
}

/** ページ内の主要CTA。すべてハコモノの青葉台店・体験予約ページへ送る。 */
function Cta({ spot, top = 28, dark = false }: { spot: CtaSpot; top?: number; dark?: boolean }) {
  return (
    <div style={{ marginTop: top }}>
      <a
        href={config.reserve.url}
        target="_blank"
        rel="noopener noreferrer"
        data-cta={spot}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          height: 64,
          background: dark ? "#FFFFFF" : BTN,
          color: dark ? PINK_INK : "#FFFFFF",
          textDecoration: "none",
          fontSize: 17.5,
          fontWeight: 700,
          letterSpacing: "0.04em",
          borderRadius: 999,
          boxShadow: dark ? "0 10px 22px rgba(90,30,50,0.28)" : BTN_SHADOW,
        }}
      >
        {ctaText(spot)}
        <span
          style={{
            display: "inline-flex",
            width: 24,
            height: 24,
            borderRadius: 999,
            background: dark ? PALE : "rgba(255,255,255,0.26)",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
          }}
        >
          →
        </span>
      </a>
    </div>
  );
}

/** 二重価格（通常5,500円 → 0円）。FV・中間CTA・最終CTAで同じ数字を出す。 */
function PriceLine({ label, size = 88 }: { label: string; size?: number }) {
  const p = config.fv.price;
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <span
          style={{
            background: PINK_DEEP,
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.06em",
            padding: "6px 12px",
            borderRadius: 4,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
        <span style={{ fontSize: 14, color: BODY }}>通常</span>
        <span style={{ fontFamily: MINCHO, fontSize: 22, color: MUTED, textDecoration: "line-through" }}>
          {p.was}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 4,
          marginTop: 6,
          color: PINK_INK,
          fontFamily: MINCHO,
          fontWeight: 700,
        }}
      >
        <span style={{ fontSize: 22, paddingBottom: size * 0.12, color: PINK_DEEP }}>今だけ</span>
        <span style={{ fontSize: size, lineHeight: 0.95, letterSpacing: "-0.02em" }}>{p.now}</span>
        <span style={{ fontSize: size * 0.36, paddingBottom: size * 0.08 }}>{p.unit}</span>
        <span style={{ fontSize: 14, paddingBottom: size * 0.1, color: BODY, fontFamily: GOTHIC, fontWeight: 500 }}>
          （税込）
        </span>
      </div>
    </div>
  );
}

const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={PINK_DEEP} style={{ flex: "none", marginTop: 4 }} aria-hidden>
    <path d="M12 2a7 7 0 00-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 00-7-7zm0 9.6A2.6 2.6 0 1112 6.4a2.6 2.6 0 010 5.2z" />
  </svg>
);

/** セクションの左右余白。本文幅は 390 - 22×2 = 346px。 */
const PAD_X = 22;
const section = (bg: string, pad = "60px"): CSSProperties => ({
  background: bg,
  padding: `${pad} ${PAD_X}px`,
});

const bodyText: CSSProperties = { margin: 0, fontSize: 15.5, lineHeight: 1.95, color: BODY };

export default function Page() {
  const c = config;
  const catchLines = c.fv.catchVariants[c.ab.fv];
  const hero = c.fv.heroVariants[c.ab.hero];

  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <ReserveTracker reserveUrl={c.reserve.url} ab={c.ab} />
      <div
        style={{
          fontFamily: GOTHIC,
          color: INK,
          background: "#EFE4E6",
          minHeight: "100vh",
          /* 長音符・小書き仮名が行頭に来ないよう禁則処理を厳密に。 */
          lineBreak: "strict",
        }}
      >
        <LPCanvas style={{ background: CREAM }} boxShadow="0 0 60px rgba(120,80,92,0.16)">
          {/* ── ヘッダー（追従。予約ボタンを常に画面上に置く） ── */}
          <header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 14px",
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(8px)",
              borderBottom: `1px solid ${LINE}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <SakuraMark size={24} />
              <div style={{ lineHeight: 1.25 }}>
                <div
                  style={{
                    fontFamily: MINCHO,
                    fontSize: 19,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: INK,
                  }}
                >
                  {c.header.brand}
                </div>
                <div style={{ fontSize: 9.5, letterSpacing: "0.03em", color: BODY }}>{c.header.brandSub}</div>
              </div>
            </div>
            <a
              href={c.reserve.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="header"
              style={{
                display: "flex",
                alignItems: "center",
                height: 38,
                padding: "0 15px",
                borderRadius: 999,
                background: BTN,
                color: "#FFFFFF",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.04em",
                textDecoration: "none",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 12px rgba(194,80,113,0.28)",
              }}
            >
              {ctaText("header")}
            </a>
          </header>

          {/* ── オファーバー ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              padding: "12px 16px",
              background: BAND,
            }}
          >
            <span
              style={{
                flex: "none",
                fontSize: 14,
                fontWeight: 700,
                lineHeight: 1.2,
                color: PINK_INK,
                background: "#FFFFFF",
                borderRadius: 6,
                padding: "6px 11px",
              }}
            >
              {c.offerBar.badgeText}
            </span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.03em",
                lineHeight: 1.2,
                color: "#FFFFFF",
                textShadow: "0 1px 4px rgba(90,30,50,0.35)",
              }}
            >
              {c.offerBar.text}
            </span>
          </div>

          {/* ── ① FV：写真全面＋縦書きキャッチ＋円形バッジ ──
              写真の上にはキャッチとバッジしか置かない（サブコピーは下の帯へ）。 */}
          <section style={{ position: "relative", height: 430, overflow: "hidden", background: PALE }}>
            <Photo slot={hero} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(60,30,40,0.04) 0%, rgba(60,30,40,0) 45%, rgba(60,30,40,0.2) 100%)",
                pointerEvents: "none",
              }}
            />
            {/* 縦書きメインコピー。配列の先頭が右に来る。 */}
            <h1
              style={{
                margin: 0,
                position: "absolute",
                top: 24,
                left: 16,
                zIndex: 2,
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "flex-start",
                gap: 7,
              }}
            >
              {catchLines.map((line) => (
                <span
                  key={line}
                  style={{
                    writingMode: "vertical-rl",
                    fontFamily: MINCHO,
                    fontWeight: 600,
                    fontSize: 23,
                    letterSpacing: "0.12em",
                    lineHeight: 1.35,
                    color: INK,
                    background: "#FFFFFF",
                    padding: "14px 6px",
                    borderRadius: 4,
                    boxShadow: "0 4px 14px rgba(0,0,0,0.16)",
                  }}
                >
                  {line}
                </span>
              ))}
            </h1>
            {/* 右下の円形バッジ */}
            <div
              style={{
                position: "absolute",
                right: 16,
                bottom: 18,
                zIndex: 2,
                width: 116,
                height: 116,
                borderRadius: "50%",
                background: BAND,
                border: "2px solid rgba(255,255,255,0.8)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1.15,
                color: "#FFFFFF",
                boxShadow: "0 6px 16px rgba(90,30,50,0.3)",
              }}
            >
              <span style={{ fontSize: 12.5, fontWeight: 700 }}>{c.fv.badge.small}</span>
              <span style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 38, lineHeight: 1.05 }}>
                {c.fv.badge.big}
              </span>
              <span style={{ fontSize: 10.5, opacity: 0.92, textDecoration: "line-through" }}>{c.fv.badge.foot}</span>
            </div>
          </section>

          {/* FV下の桜色の帯：サブコピー */}
          <div style={{ background: BAND, padding: "20px 16px 20px", textAlign: "center" }}>
            {c.fv.subVariants[c.ab.fv].map((line) => (
              <p
                key={line}
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                  lineHeight: 1.7,
                  color: "#FFFFFF",
                }}
              >
                {line}
              </p>
            ))}
            <p style={{ margin: "10px 0 0", fontSize: 13.5, lineHeight: 1.75, color: "rgba(255,255,255,0.92)" }}>
              {nl(c.fv.support)}
            </p>
          </div>

          {/* 目立たせる4要素 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              background: "#FFFFFF",
              borderBottom: `1px solid ${LINE}`,
            }}
          >
            {c.fv.points.map((pt, i) => (
              <div
                key={pt.bottom}
                style={{
                  textAlign: "center",
                  padding: "14px 2px 13px",
                  borderLeft: i === 0 ? "none" : `1px solid ${LINE}`,
                  lineHeight: 1.35,
                }}
              >
                <div style={{ fontSize: 11, color: BODY, whiteSpace: "nowrap" }}>{pt.top}</div>
                <div style={{ marginTop: 3, fontSize: 15, fontWeight: 700, color: PINK_INK, whiteSpace: "nowrap" }}>
                  {pt.bottom}
                </div>
              </div>
            ))}
          </div>

          {/* FV内の体験オファー＋CTA 1 */}
          <section style={section(CREAM, "28px")}>
            <PriceLine label={c.fv.price.label} />
            <Cta spot="fv" top={22} />
          </section>

          {/* ── ② お悩み ── */}
          <section style={section(PALE_GRAD)}>
            <Kicker>TROUBLES</Kicker>
            <Heading text={c.worry.heading} />
            <div
              style={{
                marginTop: 28,
                background: "#FFFFFF",
                borderRadius: 16,
                padding: "8px 18px",
                boxShadow: "0 6px 16px rgba(120,80,92,0.08)",
              }}
            >
              {c.worry.items.map((item, i) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "15px 0",
                    borderTop: i === 0 ? "none" : `1px dashed ${LINE}`,
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      display: "flex",
                      width: 26,
                      height: 26,
                      borderRadius: 6,
                      background: PALE,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckIcon size={16} />
                  </span>
                  <span style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.6, color: INK }}>{nl(item)}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", margin: "20px 0 0", color: PINK, fontSize: 22, lineHeight: 1 }}>▼</div>
            <p
              style={{
                margin: "16px 0 0",
                textAlign: "center",
                fontFamily: MINCHO,
                fontSize: 19,
                fontWeight: 600,
                lineHeight: 1.75,
                color: INK,
              }}
            >
              {nl(c.worry.closing)}
            </p>
          </section>

          {/* ── ③ SAKURAで目指せる未来 ── */}
          <section style={section(CREAM)}>
            <Kicker>{c.future.kicker}</Kicker>
            <Heading text={c.future.heading} />
            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 30 }}>
              {c.future.items.map((it) => (
                <div
                  key={it.num}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 6px 16px rgba(120,80,92,0.08)",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <Photo slot={it.img} style={{ width: "100%", aspectRatio: "3 / 2" }} />
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        background: "rgba(255,255,255,0.94)",
                        borderTopRightRadius: 14,
                        padding: "7px 16px 4px",
                        fontFamily: MINCHO,
                        fontSize: 26,
                        fontWeight: 700,
                        color: PINK_DEEP,
                        lineHeight: 1,
                      }}
                    >
                      {it.num}
                    </span>
                  </div>
                  <div style={{ padding: "16px 18px 20px" }}>
                    <h3
                      style={{
                        margin: 0,
                        fontFamily: MINCHO,
                        fontSize: 20,
                        fontWeight: 700,
                        lineHeight: 1.5,
                        color: INK,
                      }}
                    >
                      {it.title}
                    </h3>
                    <p style={{ ...bodyText, marginTop: 8, fontSize: 15 }}>{it.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p
              style={{
                margin: "30px 0 0",
                textAlign: "center",
                fontFamily: MINCHO,
                fontSize: 19,
                fontWeight: 600,
                lineHeight: 1.75,
                color: PINK_INK,
              }}
            >
              {nl(c.future.closing)}
            </p>
          </section>

          {/* ── ④ 選ばれる4つの理由 ── */}
          <section style={section(PALE_GRAD)}>
            <Kicker>{c.reasons.kicker}</Kicker>
            <Heading text={c.reasons.heading} />
            <div style={{ display: "flex", flexDirection: "column", gap: 34, marginTop: 32 }}>
              {c.reasons.items.map((it) => (
                <div key={it.num}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", color: PINK_DEEP }}>
                      REASON
                    </span>
                    <span style={{ fontFamily: MINCHO, fontSize: 36, fontWeight: 700, lineHeight: 1, color: PINK }}>
                      {it.num}
                    </span>
                  </div>
                  <Photo slot={it.img} radius={14} style={{ width: "100%", aspectRatio: "3 / 2" }} />
                  <h3
                    style={{
                      margin: "16px 0 0",
                      fontFamily: MINCHO,
                      fontSize: 20.5,
                      fontWeight: 700,
                      lineHeight: 1.55,
                      color: INK,
                      paddingLeft: 12,
                      borderLeft: `3px solid ${PINK}`,
                    }}
                  >
                    {nl(it.title)}
                  </h3>
                  <p style={{ ...bodyText, marginTop: 10 }}>{it.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── ⑤ 体験レッスン（中間CTA）── */}
          <section id="offer" style={section(CREAM, "56px")}>
            <Kicker>TRIAL LESSON</Kicker>
            <Heading text={c.offer.heading} />
            <p style={{ ...bodyText, marginTop: 18, textAlign: "center", fontSize: 16 }}>{nl(c.offer.lead)}</p>
            <div
              style={{
                marginTop: 26,
                background: "#FFFFFF",
                border: `1.5px solid ${PINK}`,
                borderRadius: 18,
                padding: "24px 16px 20px",
                boxShadow: "0 8px 22px rgba(194,85,122,0.1)",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 14 }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "5px 14px",
                    borderRadius: 999,
                    background: PALE,
                    fontSize: 13.5,
                    fontWeight: 700,
                    color: PINK_INK,
                  }}
                >
                  <SakuraMark size={13} />
                  {c.offer.duration}・カウンセリング込み
                </span>
              </div>
              <PriceLine label={c.offer.label} size={80} />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 8,
                  marginTop: 20,
                }}
              >
                {c.offer.points.map((pt) => (
                  <div
                    key={pt}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: PALE,
                      borderRadius: 10,
                      padding: "11px 10px",
                      minHeight: 54,
                    }}
                  >
                    <CheckIcon size={16} />
                    <span style={{ fontSize: 14.5, fontWeight: 700, lineHeight: 1.4, color: INK }}>{nl(pt)}</span>
                  </div>
                ))}
              </div>
              <Photo
                slot={c.offer.photo}
                radius={12}
                style={{ width: "100%", aspectRatio: "3 / 2", marginTop: 16 }}
              />
              {/* 入会特典 */}
              <div style={{ marginTop: 18, background: BEIGE, borderRadius: 12, padding: "14px 12px" }}>
                <p
                  style={{
                    margin: 0,
                    textAlign: "center",
                    fontSize: 14.5,
                    fontWeight: 700,
                    color: PINK_INK,
                    letterSpacing: "0.04em",
                  }}
                >
                  ＼ {c.offer.joinLead} ／
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
                  {c.offer.perks.map((perk) => (
                    <div
                      key={perk.label}
                      style={{
                        background: "#FFFFFF",
                        borderRadius: 10,
                        padding: "12px 12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 8,
                        }}
                      >
                        <span style={{ fontSize: 14.5, fontWeight: 700, color: INK }}>{perk.label}</span>
                        <span style={{ display: "flex", alignItems: "baseline", gap: 6, flexShrink: 0 }}>
                          {perk.was && (
                            <span style={{ fontSize: 13, color: MUTED, textDecoration: "line-through" }}>
                              {perk.was}
                            </span>
                          )}
                          <span
                            style={{
                              fontFamily: MINCHO,
                              fontSize: perk.now.length > 3 ? 18 : 28,
                              fontWeight: 700,
                              lineHeight: 1,
                              color: PINK_INK,
                            }}
                          >
                            {perk.now}
                          </span>
                        </span>
                      </div>
                      {perk.note && (
                        <p style={{ margin: "6px 0 0", fontSize: 11.5, color: BODY }}>※{perk.note}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Cta spot="offer" />
          </section>

          {/* ── ⑥ SAKURAのパーソナルピラティスとは ── */}
          <section style={section(PALE_GRAD)}>
            <Kicker>{c.personal.kicker}</Kicker>
            <Heading text={c.personal.heading} size={22} />
            <Photo
              slot={c.personal.photo}
              radius={16}
              style={{ width: "100%", aspectRatio: "3 / 2", marginTop: 28 }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
              {c.personal.body.map((p) => (
                <p key={p} style={bodyText}>
                  {p}
                </p>
              ))}
            </div>
            <div
              style={{
                marginTop: 22,
                background: "#FFFFFF",
                borderRadius: 14,
                padding: "18px 18px 16px",
              }}
            >
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: PINK_INK, textAlign: "center" }}>
                {c.personal.approachLabel}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
                {c.personal.approaches.map((a) => (
                  <div key={a} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                    <span style={{ marginTop: 5 }}>
                      <CheckIcon size={16} />
                    </span>
                    <span style={{ fontSize: 15.5, lineHeight: 1.65, color: INK }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── ⑦ 体験レッスンの流れ ＋ CTA ── */}
          <section style={section(CREAM)}>
            <Kicker>{c.flow.kicker}</Kicker>
            <Heading text={c.flow.heading} />
            <div style={{ marginTop: 30, position: "relative" }}>
              {/* 縦の線（番号の中心を通す） */}
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: 21,
                  top: 20,
                  bottom: 20,
                  width: 2,
                  background: LINE,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {c.flow.steps.map((s) => (
                  <div key={s.num} style={{ display: "flex", gap: 12, position: "relative" }}>
                    <div
                      style={{
                        flex: "none",
                        width: 44,
                        height: 44,
                        borderRadius: 999,
                        background: BAND,
                        color: "#FFFFFF",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        lineHeight: 1,
                        boxShadow: "0 3px 8px rgba(194,85,122,0.25)",
                      }}
                    >
                      <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.08em" }}>STEP</span>
                      <span style={{ fontFamily: MINCHO, fontSize: 17, fontWeight: 700, marginTop: 1 }}>{s.num}</span>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                        background: "#FFFFFF",
                        borderRadius: 14,
                        padding: "14px 14px",
                      }}
                    >
                      {/* 見出しは1行で通し、本文の横にだけ写真を添える（見出しが写真に押されて折れないように）。 */}
                      <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: INK }}>{s.title}</h3>
                      <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginTop: 6 }}>
                        <p style={{ flex: 1, minWidth: 0, margin: 0, fontSize: 14, lineHeight: 1.75, color: BODY }}>
                          {s.body}
                        </p>
                        {s.img && (
                          <Photo
                            slot={s.img}
                            radius={8}
                            style={{ flex: "none", width: 96, aspectRatio: "3 / 2", marginTop: 3 }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Cta spot="flow" />
          </section>

          {/* ── ⑧ 店舗・アクセス ── 写真はすべて青葉台店の実写真 */}
          <section id="access" style={section(PALE_GRAD)}>
            <Kicker>{c.access.kicker}</Kicker>
            <Heading text={c.access.heading} size={22} />
            <Photo
              slot={c.access.photo}
              radius={16}
              style={{ width: "100%", aspectRatio: "4 / 3", marginTop: 28 }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 6,
                marginTop: 6,
              }}
            >
              {c.access.gallery.map((g) => (
                <div key={g.placeholder}>
                  <Photo slot={g} radius={8} style={{ width: "100%", aspectRatio: "4 / 3" }} />
                  <p style={{ margin: "4px 0 0", fontSize: 11, color: BODY, textAlign: "center" }}>{g.placeholder}</p>
                </div>
              ))}
            </div>
            <p style={{ ...bodyText, marginTop: 20 }}>{c.access.lead}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
              {c.access.points.map((p) => (
                <div
                  key={p}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    background: "#FFFFFF",
                    borderRadius: 10,
                    padding: "11px 12px",
                  }}
                >
                  <PinIcon />
                  <span style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.6, color: INK }}>{nl(p)}</span>
                </div>
              ))}
            </div>

            {/* 店舗情報 */}
            <div style={{ marginTop: 24, background: "#FFFFFF", borderRadius: 16, padding: "20px 18px" }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: MINCHO,
                  fontSize: 17,
                  fontWeight: 700,
                  lineHeight: 1.5,
                  color: INK,
                  textAlign: "center",
                }}
              >
                {c.access.name}
              </p>
              <dl style={{ margin: "14px 0 0" }}>
                {c.access.rows.map((r) => (
                  <div
                    key={r.label}
                    style={{
                      display: "flex",
                      gap: 10,
                      padding: "11px 0",
                      borderTop: `1px solid ${LINE}`,
                      fontSize: 14.5,
                      lineHeight: 1.7,
                    }}
                  >
                    <dt style={{ flex: "none", width: 64, fontWeight: 700, color: PINK_INK }}>{r.label}</dt>
                    <dd style={{ margin: 0, color: INK }}>{nl(r.value)}</dd>
                  </div>
                ))}
              </dl>
              <p
                style={{
                  margin: "6px 0 0",
                  padding: "12px 12px",
                  background: PALE,
                  borderRadius: 10,
                  fontSize: 13.5,
                  lineHeight: 1.8,
                  color: BODY,
                }}
              >
                <strong style={{ color: PINK_INK }}>駅からの道順</strong>
                <br />
                {c.access.route}
              </p>
              <iframe
                title="ピラティスSAKURA 青葉台店の地図"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(c.access.mapQuery)}&z=17&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{
                  display: "block",
                  width: "100%",
                  aspectRatio: "4 / 3",
                  border: 0,
                  borderRadius: 10,
                  marginTop: 14,
                }}
              />
            </div>
          </section>

          {/* ── ⑨ FAQ ── */}
          <section style={section(BAND)}>
            <Kicker color="#FFFFFF">{c.faq.kicker}</Kicker>
            <Heading text={c.faq.heading} color="#FFFFFF" />
            <div style={{ marginTop: 28 }}>
              <FaqAccordion items={c.faq.items} accent={PINK_DEEP} ink={INK} body={BODY} line={LINE} />
            </div>
          </section>

          {/* ── ⑩ 最終CTA ── */}
          <section id="reserve" style={section(CREAM, "60px")}>
            <Heading text={c.closing.heading} size={21} />
            <p
              style={{
                margin: "22px 0 0",
                textAlign: "center",
                fontSize: 16,
                fontWeight: 700,
                lineHeight: 1.9,
                color: BODY,
              }}
            >
              {nl(c.closing.sub)}
            </p>
            <div
              style={{
                marginTop: 26,
                background: "#FFFFFF",
                border: `1.5px solid ${PINK}`,
                borderRadius: 18,
                padding: "22px 14px 20px",
              }}
            >
              <PriceLine label={c.closing.offerLabel} size={80} />
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
                {c.closing.chips.map((chip) => (
                  <span
                    key={chip}
                    style={{
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: PINK_INK,
                      background: PALE,
                      borderRadius: 999,
                      padding: "6px 13px",
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <Cta spot="closing" />
          </section>

          <footer
            style={{
              padding: "28px 20px 32px",
              textAlign: "center",
              background: "#FFFFFF",
              borderTop: `1px solid ${LINE}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
              <SakuraMark size={16} />
              <span style={{ fontFamily: MINCHO, fontSize: 17, fontWeight: 700, letterSpacing: "0.18em", color: INK }}>
                {c.header.brand}
              </span>
            </div>
            <p style={{ margin: "8px 0 0", fontSize: 11.5, color: BODY }}>{c.access.name}</p>
            <p style={{ margin: "12px 0 0", fontSize: 11, color: MUTED }}>© {new Date().getFullYear()} SAKURA</p>
          </footer>
        </LPCanvas>
      </div>

      <StickyFooterCTA
        href={c.reserve.url}
        buttonText={ctaText("sticky")}
        showAfter={420}
        buttonGradient={BTN}
        shadowColor="rgba(194,80,113,0.4)"
        borderColor="rgba(229,139,164,0.45)"
        offers={c.sticky.offers.map((o) => (
          <span key={o} style={{ fontSize: 14, fontWeight: 700, color: PINK_INK }}>
            {o}
          </span>
        ))}
      />
    </LPShell>
  );
}
