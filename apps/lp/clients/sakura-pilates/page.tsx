import type { CSSProperties, ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPCanvas from "@/components/LPCanvas";
import LPForm from "@/components/LPForm";
import StickyFooterCTA from "@/components/StickyFooterCTA";
import ImageSlot from "@/components/ImageSlot";
import FaqAccordion from "./FaqAccordion";
import config from "./config";

/**
 * パーソナルマシンピラティス SAKURA — ブランド全体の広告集客用LP。
 *
 * 設計の起点は「Meta広告をクリックした人が、体験を予約する理由をこのページで
 * 作れているか」。ブランド紹介ではないので、各ブロックは
 * 「不安を1つ潰す → その場で予約できる」の順に並べている。
 *
 * ブロック順（CVRを意図した並び。入れ替えると理由づけの流れが壊れる）:
 *   FV → お悩み → なぜマシンピラティス×マンツーマンか → 選ばれる5つの理由
 *   → パーソナルだからできること → 初心者でも安心 → 数字で見るSAKURA
 *   → レッスン内容 → お客様の声 → 料金 → 他社比較 → 体験の流れ → FAQ
 *   → 店舗一覧 → 予約フォーム
 *
 * CTAは FV / 理由の直後 / 初心者不安の解消直後 / 料金直後 / 流れの直後 の5箇所＋
 * 追従フッター。いずれも #form へ送る。
 *
 * 見た目の作法:
 *   1. 地は生成り #FDF9F7、カードは白。セクションの切り替えは地色でつける
 *   2. 見出しは明朝（Shippori Mincho）、本文はゴシック
 *   3. アクセントは桜色。小さい文字は必ず PINK_DEEP（白地で4.5:1以上）を使う。
 *      薄い PINK は罫・地色・大きい装飾数字だけに使う
 *   4. 幅は390px固定のキャンバス（LPCanvas）。vw/vh は使わない（CLAUDE.md §16-17）
 */

/* ── palette ───────────────────────────────────────────────── */
const CREAM = "#FDF9F7";
const PALE = "#FBEFF2";
const PALE2 = "#F8E7EC";
const LINE = "#F0DBE1";
const PINK = "#E58BA4";
const PINK_DEEP = "#C2557A";
const PINK_INK = "#A8416A";
const INK = "#3E3A3B";
const BODY = "#6E6568";
const MUTED = "#A2969A";
const BTN = "linear-gradient(135deg, #EC8AA6 0%, #C24F71 100%)";
const BTN_SHADOW = "0 10px 22px rgba(194,80,113,0.32)";

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

function Kicker({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        textAlign: "center",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.22em",
        color: PINK_DEEP,
        marginBottom: 8,
      }}
    >
      {children}
    </div>
  );
}

function Heading({
  text,
  size = 21,
  color = INK,
}: {
  text: string;
  size?: number;
  color?: string;
}) {
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
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 7,
          margin: "12px 0 0",
        }}
        aria-hidden
      >
        <span style={{ width: 22, height: 1, background: LINE }} />
        <SakuraMark size={12} />
        <span style={{ width: 22, height: 1, background: LINE }} />
      </div>
    </div>
  );
}

/** ページ内の主要CTA。すべて #form へ送る。 */
function Cta({ text, sub, top = 26 }: { text: string; sub?: string; top?: number }) {
  return (
    <div style={{ marginTop: top }}>
      <a
        href="#form"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          height: 58,
          background: BTN,
          color: "#FFFFFF",
          textDecoration: "none",
          fontSize: 15.5,
          fontWeight: 700,
          letterSpacing: "0.06em",
          borderRadius: 999,
          boxShadow: BTN_SHADOW,
        }}
      >
        {text}
        <span
          style={{
            display: "inline-flex",
            width: 21,
            height: 21,
            borderRadius: 999,
            background: "rgba(255,255,255,0.26)",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
          }}
        >
          →
        </span>
      </a>
      {sub && (
        <p
          style={{
            margin: "10px 0 0",
            textAlign: "center",
            fontSize: 11,
            letterSpacing: "0.06em",
            color: MUTED,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

const section: CSSProperties = { padding: "44px 18px" };

export default function Page() {
  const c = config;

  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div
        style={{
          fontFamily: GOTHIC,
          color: INK,
          background: "#EFE4E6",
          minHeight: "100vh",
        }}
      >
        <LPCanvas
          style={{ background: CREAM }}
          boxShadow="0 0 60px rgba(120,80,92,0.16)"
        >
          {/* ── header（追従。予約ボタンを常に画面上に置く） ── */}
          <header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "9px 14px",
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(8px)",
              borderBottom: `1px solid ${LINE}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <SakuraMark size={20} />
              <div style={{ lineHeight: 1.2 }}>
                <div
                  style={{
                    fontFamily: MINCHO,
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: INK,
                  }}
                >
                  {c.header.brand}
                </div>
                <div style={{ fontSize: 8.5, letterSpacing: "0.06em", color: MUTED }}>
                  {c.header.brandSub}
                </div>
              </div>
            </div>
            <a
              href="#form"
              style={{
                display: "flex",
                alignItems: "center",
                height: 33,
                padding: "0 14px",
                borderRadius: 999,
                background: BTN,
                color: "#FFFFFF",
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: "0.04em",
                textDecoration: "none",
                boxShadow: "0 4px 12px rgba(194,80,113,0.28)",
              }}
            >
              {c.header.ctaText}
            </a>
          </header>

          {/* ── offer bar ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 9,
              padding: "9px 14px",
              background: "linear-gradient(100deg, #F6BFCD 0%, #E7899F 55%, #D26C88 100%)",
              color: "#FFFFFF",
            }}
          >
            <span style={{ fontSize: 10.5, letterSpacing: "0.04em", opacity: 0.95 }}>
              {c.offerBar.note}
            </span>
            <span style={{ width: 1, height: 15, background: "rgba(255,255,255,0.5)" }} />
            <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.02em" }}>
              {c.offerBar.text}
            </span>
            <span
              style={{
                fontFamily: MINCHO,
                fontSize: 20,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "0.02em",
              }}
            >
              {c.offerBar.badge}
            </span>
          </div>

          {/* ── 1. FV ──
              広告からの流入者が最初の1画面で「誰向け／どうなれる／なぜSAKURA／
              今なら何が」を掴めるよう、写真の上には縦書きキャッチとサブコピーだけを
              置き、数字とキャンペーンは写真の直下に分けている。 */}
          <section>
            <div style={{ position: "relative" }}>
              <ImageSlot
                src={c.fv.hero.src}
                placeholder={c.fv.hero.placeholder}
                objectPosition={c.fv.hero.position ?? "center"}
                alt="女性インストラクターによるマンツーマンのマシンピラティスレッスン"
                style={{ width: "100%", aspectRatio: "390 / 404" }}
              />
              {/* 下方向のグラデーション。サブコピーの可読性を担保する。 */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 32%, rgba(62,58,59,0.06) 58%, rgba(62,58,59,0.62) 100%)",
                }}
                aria-hidden
              />
              {/* 縦書きキャッチ（白プレート・明朝） */}
              <div
                style={{
                  position: "absolute",
                  top: 18,
                  left: 14,
                  display: "flex",
                  flexDirection: "row-reverse",
                  gap: 6,
                }}
              >
                {c.fv.catchLines.map((line) => (
                  <span
                    key={line}
                    style={{
                      writingMode: "vertical-rl",
                      background: "rgba(255,255,255,0.93)",
                      color: INK,
                      fontFamily: MINCHO,
                      fontWeight: 600,
                      fontSize: 21,
                      letterSpacing: "0.12em",
                      padding: "12px 5px",
                      boxShadow: "0 2px 10px rgba(120,80,92,0.16)",
                    }}
                  >
                    {line}
                  </span>
                ))}
              </div>
              <p
                style={{
                  position: "absolute",
                  left: 16,
                  right: 16,
                  bottom: 14,
                  margin: 0,
                  color: "#FFFFFF",
                  fontSize: 12.5,
                  lineHeight: 1.85,
                  letterSpacing: "0.02em",
                  textShadow: "0 1px 6px rgba(62,58,59,0.5)",
                }}
              >
                {nl(c.fv.sub)}
              </p>
            </div>

            {/* 信頼につながる数字 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                background: PALE,
                borderBottom: `1px solid ${LINE}`,
              }}
            >
              {c.fv.stats.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    padding: "11px 2px 12px",
                    textAlign: "center",
                    borderLeft: i === 0 ? "none" : `1px solid ${LINE}`,
                  }}
                >
                  <div style={{ lineHeight: 1 }}>
                    <span
                      style={{
                        fontFamily: MINCHO,
                        fontSize: s.num.length > 3 ? 17 : 22,
                        fontWeight: 700,
                        color: PINK_INK,
                        letterSpacing: "0.01em",
                      }}
                    >
                      {s.num}
                    </span>
                    <span
                      style={{ fontSize: 10, fontWeight: 700, color: PINK_INK, marginLeft: 1 }}
                    >
                      {s.unit}
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: 5,
                      fontSize: 8.5,
                      lineHeight: 1.35,
                      color: BODY,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* 体験キャンペーン */}
            <div style={{ padding: "18px 18px 26px" }}>
              <div
                style={{
                  border: `1.5px solid ${PINK}`,
                  borderRadius: 14,
                  background: "#FFFFFF",
                  overflow: "hidden",
                  boxShadow: "0 6px 18px rgba(194,80,113,0.10)",
                }}
              >
                <div
                  style={{
                    background: PALE2,
                    padding: "7px 12px",
                    textAlign: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: PINK_INK,
                  }}
                >
                  ＼ {c.fv.campaign.note} ／
                </div>
                <div style={{ padding: "12px 14px 13px" }}>
                  {c.fv.campaign.rows.map((r, i) => (
                    <div
                      key={r.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 8,
                        padding: "7px 0",
                        borderTop: i === 0 ? "none" : `1px dashed ${LINE}`,
                      }}
                    >
                      <span style={{ fontSize: 13, fontWeight: 700, color: INK }}>
                        {r.label}
                      </span>
                      <span style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                        <span
                          style={{
                            fontSize: 12,
                            color: MUTED,
                            textDecoration: "line-through",
                          }}
                        >
                          {r.was}
                        </span>
                        <span style={{ fontSize: 12, color: MUTED }}>→</span>
                        <span
                          style={{
                            fontFamily: MINCHO,
                            fontSize: 27,
                            fontWeight: 700,
                            lineHeight: 1,
                            color: PINK_INK,
                          }}
                        >
                          {r.now}
                        </span>
                      </span>
                    </div>
                  ))}
                  <p
                    style={{
                      margin: "9px 0 0",
                      fontSize: 10.5,
                      lineHeight: 1.7,
                      color: BODY,
                      textAlign: "center",
                    }}
                  >
                    {c.fv.campaign.foot}
                  </p>
                </div>
              </div>
              <Cta text={c.fv.ctaText} sub={c.fv.ctaSub} top={16} />
            </div>
          </section>

          {/* ── 2. こんなお悩みありませんか？ ── */}
          <section style={{ ...section, background: "#FFFFFF" }}>
            <Kicker>{c.worry.kicker}</Kicker>
            <Heading text={c.worry.heading} />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 6,
                marginTop: 22,
              }}
            >
              {c.worry.chips.map((chip) => (
                <span
                  key={chip}
                  style={{
                    padding: "6px 11px",
                    borderRadius: 999,
                    background: PALE,
                    border: `1px solid ${LINE}`,
                    fontSize: 11,
                    lineHeight: 1.4,
                    color: PINK_INK,
                    fontWeight: 500,
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginTop: 20,
              }}
            >
              {c.worry.cards.map((card) => (
                <div
                  key={card.text}
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    background: CREAM,
                    border: `1px solid ${LINE}`,
                  }}
                >
                  <ImageSlot
                    src={card.img.src}
                    placeholder={card.img.placeholder}
                    alt={card.text.replace("\n", "")}
                    style={{ width: "100%", aspectRatio: "1 / 1" }}
                  />
                  <p
                    style={{
                      margin: 0,
                      padding: "10px 9px 12px",
                      fontSize: 11.5,
                      lineHeight: 1.65,
                      textAlign: "center",
                      color: INK,
                      fontWeight: 500,
                    }}
                  >
                    {nl(card.text)}
                  </p>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 22,
                padding: "16px 14px",
                borderRadius: 14,
                background: PALE,
                textAlign: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: MINCHO,
                  fontSize: 17,
                  fontWeight: 600,
                  lineHeight: 1.7,
                  color: PINK_INK,
                }}
              >
                {nl(c.worry.closing)}
              </p>
            </div>
          </section>

          {/* ── 3. その悩みにSAKURAがおすすめな理由 ── */}
          <section style={{ ...section, background: CREAM }}>
            <Kicker>{c.bridge.kicker}</Kicker>
            <Heading text={c.bridge.heading} size={19} />
            <ImageSlot
              src={c.bridge.photo.src}
              placeholder={c.bridge.photo.placeholder}
              alt="リフォーマーを使ったマシンピラティスのレッスン"
              radius={12}
              style={{ width: "100%", aspectRatio: "16 / 10", marginTop: 20 }}
            />
            <p
              style={{
                margin: "16px 0 0",
                fontSize: 12.5,
                lineHeight: 2,
                color: BODY,
              }}
            >
              {c.bridge.lead}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
              {c.bridge.items.map((item, i) => (
                <div
                  key={item.title}
                  style={{
                    background: "#FFFFFF",
                    border: `1px solid ${LINE}`,
                    borderRadius: 12,
                    padding: "15px 14px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span
                      style={{
                        flexShrink: 0,
                        display: "flex",
                        width: 26,
                        height: 26,
                        borderRadius: 999,
                        background: PALE,
                        color: PINK_INK,
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: MINCHO,
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      {i + 1}
                    </span>
                    <h3
                      style={{
                        margin: 0,
                        fontFamily: MINCHO,
                        fontSize: 15,
                        fontWeight: 600,
                        lineHeight: 1.55,
                        color: INK,
                      }}
                    >
                      {nl(item.title)}
                    </h3>
                  </div>
                  <p
                    style={{
                      margin: "10px 0 0",
                      fontSize: 12,
                      lineHeight: 1.95,
                      color: BODY,
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
            <Cta text={c.bridge.ctaText} sub={c.bridge.ctaSub} />
          </section>

          {/* ── 4. SAKURAの特徴・選ばれる理由（5つ） ── */}
          <section style={{ ...section, background: "#FFFFFF" }}>
            <Kicker>{c.features.kicker}</Kicker>
            <Heading text={c.features.heading} />
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 22 }}>
              {c.features.items.map((f) => (
                <div
                  key={f.num}
                  style={{
                    borderRadius: 14,
                    overflow: "hidden",
                    border: `1px solid ${LINE}`,
                    background: CREAM,
                  }}
                >
                  <div style={{ position: "relative" }}>
                    {f.img && (
                      <ImageSlot
                        src={f.img.src}
                        placeholder={f.img.placeholder}
                        alt={f.title}
                        style={{ width: "100%", aspectRatio: "16 / 9" }}
                      />
                    )}
                    <span
                      style={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "4px 10px 4px 8px",
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.94)",
                        color: PINK_INK,
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                      }}
                    >
                      <SakuraMark size={11} />
                      {f.num}
                    </span>
                  </div>
                  <div style={{ padding: "14px 14px 16px" }}>
                    <h3
                      style={{
                        margin: 0,
                        fontFamily: MINCHO,
                        fontSize: 16,
                        fontWeight: 600,
                        lineHeight: 1.55,
                        color: INK,
                      }}
                    >
                      {f.title}
                    </h3>
                    <p
                      style={{
                        margin: "9px 0 0",
                        fontSize: 12,
                        lineHeight: 1.95,
                        color: BODY,
                      }}
                    >
                      {f.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 5. パーソナルだからできること ── */}
          <section style={{ ...section, background: PALE }}>
            <Kicker>{c.personal.kicker}</Kicker>
            <Heading text={c.personal.heading} />
            <p
              style={{
                margin: "16px 0 0",
                fontSize: 12.5,
                lineHeight: 2,
                color: BODY,
                textAlign: "center",
              }}
            >
              {c.personal.lead}
            </p>
            <ImageSlot
              src={c.personal.photo.src}
              placeholder={c.personal.photo.placeholder}
              alt="女性インストラクターによるマンツーマン指導"
              radius={12}
              style={{ width: "100%", aspectRatio: "16 / 10", marginTop: 18 }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 18 }}>
              {c.personal.items.map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 12,
                    padding: "13px 14px",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      fontSize: 13.5,
                      fontWeight: 700,
                      lineHeight: 1.5,
                      color: PINK_INK,
                    }}
                  >
                    <SakuraMark size={12} />
                    {item.title}
                  </h3>
                  <p
                    style={{ margin: "7px 0 0", fontSize: 12, lineHeight: 1.9, color: BODY }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            {/* グループレッスンとの対比 */}
            <div
              style={{
                marginTop: 18,
                borderRadius: 12,
                overflow: "hidden",
                border: `1px solid ${LINE}`,
                background: "#FFFFFF",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "62px 1fr 1fr",
                  background: PALE2,
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: PINK_INK,
                  textAlign: "center",
                }}
              >
                <span style={{ padding: "8px 4px" }} />
                <span style={{ padding: "8px 4px", color: BODY }}>グループ</span>
                <span style={{ padding: "8px 4px" }}>SAKURA</span>
              </div>
              {c.personal.versus.map((v) => (
                <div
                  key={v.label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "62px 1fr 1fr",
                    borderTop: `1px solid ${LINE}`,
                    fontSize: 10.5,
                    lineHeight: 1.55,
                  }}
                >
                  <span
                    style={{
                      padding: "10px 5px",
                      background: CREAM,
                      fontWeight: 700,
                      color: INK,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {v.label}
                  </span>
                  <span style={{ padding: "10px 7px", color: MUTED }}>{v.group}</span>
                  <span
                    style={{
                      padding: "10px 7px",
                      color: PINK_INK,
                      fontWeight: 700,
                      background: "#FFF7F9",
                    }}
                  >
                    {v.sakura}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ── 6. 初心者でも安心できる理由 ── */}
          <section style={{ ...section, background: "#FFFFFF" }}>
            <Kicker>{c.beginner.kicker}</Kicker>
            <Heading text={c.beginner.heading} />
            <p
              style={{
                margin: "16px 0 0",
                fontSize: 12.5,
                lineHeight: 2,
                color: BODY,
                textAlign: "center",
              }}
            >
              {c.beginner.lead}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 18 }}>
              {c.beginner.photos.map((p) => (
                <ImageSlot
                  key={p.placeholder}
                  src={p.src}
                  placeholder={p.placeholder}
                  alt={p.placeholder}
                  radius={10}
                  style={{ width: "100%", aspectRatio: "4 / 3" }}
                />
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 18 }}>
              {c.beginner.items.map((item) => (
                <div
                  key={item.title}
                  style={{
                    display: "flex",
                    gap: 10,
                    padding: "13px 13px",
                    borderRadius: 12,
                    background: CREAM,
                    border: `1px solid ${LINE}`,
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      display: "flex",
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      background: PINK_DEEP,
                      color: "#FFFFFF",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      marginTop: 1,
                    }}
                    aria-hidden
                  >
                    ✓
                  </span>
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 13.5,
                        fontWeight: 700,
                        lineHeight: 1.5,
                        color: INK,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{ margin: "6px 0 0", fontSize: 12, lineHeight: 1.9, color: BODY }}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Cta text={c.beginner.ctaText} sub={c.beginner.ctaSub} />
          </section>

          {/* ── 7. 実績・数字・信頼要素 ── */}
          <section
            style={{
              ...section,
              background: "linear-gradient(180deg, #FBEFF2 0%, #F6E2E8 100%)",
            }}
          >
            <Kicker>{c.proof.kicker}</Kicker>
            <Heading text={c.proof.heading} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 8,
                marginTop: 22,
              }}
            >
              {c.proof.stats.map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 12,
                    padding: "14px 6px 12px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ lineHeight: 1 }}>
                    <span
                      style={{
                        fontFamily: MINCHO,
                        fontSize: s.num.length > 3 ? 18 : 26,
                        fontWeight: 700,
                        color: PINK_INK,
                      }}
                    >
                      {s.num}
                    </span>
                    <span
                      style={{
                        fontSize: 10.5,
                        fontWeight: 700,
                        color: PINK_INK,
                        marginLeft: 1,
                      }}
                    >
                      {s.unit}
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: 7,
                      fontSize: 9,
                      lineHeight: 1.45,
                      color: BODY,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 16 }}>
              {c.proof.badges.map((b) => (
                <div
                  key={b}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 12px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.86)",
                    border: `1px solid ${LINE}`,
                    fontSize: 11.5,
                    fontWeight: 700,
                    lineHeight: 1.5,
                    color: PINK_INK,
                  }}
                >
                  <SakuraMark size={13} />
                  {b}
                </div>
              ))}
            </div>
            <p style={{ margin: "14px 0 0", fontSize: 9.5, lineHeight: 1.7, color: MUTED }}>
              {c.proof.note}
            </p>
          </section>

          {/* ── 8. レッスン内容・身体へのアプローチ ── */}
          <section style={{ ...section, background: "#FFFFFF" }}>
            <Kicker>{c.program.kicker}</Kicker>
            <Heading text={c.program.heading} />
            <p
              style={{
                margin: "16px 0 0",
                fontSize: 12.5,
                lineHeight: 2,
                color: BODY,
                textAlign: "center",
              }}
            >
              {c.program.lead}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
              {c.program.groups.map((g) => (
                <div key={g.label}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: 999,
                        background: PINK_DEEP,
                        color: "#FFFFFF",
                        fontSize: 10.5,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {g.label}
                    </span>
                    <span style={{ flex: 1, height: 1, background: LINE }} aria-hidden />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {g.items.map((it) => (
                      <div
                        key={it.en}
                        style={{
                          borderRadius: 10,
                          background: CREAM,
                          border: `1px solid ${LINE}`,
                          padding: "11px 12px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            color: PINK_INK,
                          }}
                        >
                          {it.en}
                        </div>
                        <div
                          style={{
                            marginTop: 4,
                            fontSize: 11.5,
                            lineHeight: 1.7,
                            color: BODY,
                          }}
                        >
                          {it.ja}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ margin: "14px 0 0", fontSize: 9.5, lineHeight: 1.7, color: MUTED }}>
              {c.program.note}
            </p>
          </section>

          {/* ── 9. お客様の声 ── */}
          <section style={{ ...section, background: CREAM }}>
            <Kicker>{c.voices.kicker}</Kicker>
            <Heading text={c.voices.heading} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 22 }}>
              {c.voices.items.map((v) => (
                <div
                  key={v.title}
                  style={{
                    background: "#FFFFFF",
                    border: `1px solid ${LINE}`,
                    borderRadius: 12,
                    padding: "14px 14px 13px",
                  }}
                >
                  <div style={{ display: "flex", gap: 2, marginBottom: 7 }} aria-hidden>
                    {[0, 1, 2, 3, 4].map((n) => (
                      <span key={n} style={{ fontSize: 11, color: PINK }}>
                        ★
                      </span>
                    ))}
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: MINCHO,
                      fontSize: 14.5,
                      fontWeight: 600,
                      lineHeight: 1.55,
                      color: PINK_INK,
                    }}
                  >
                    {v.title}
                  </h3>
                  <p style={{ margin: "8px 0 0", fontSize: 12, lineHeight: 1.95, color: BODY }}>
                    {v.body}
                  </p>
                  <p
                    style={{
                      margin: "9px 0 0",
                      textAlign: "right",
                      fontSize: 11,
                      color: MUTED,
                    }}
                  >
                    {v.who}
                  </p>
                </div>
              ))}
            </div>
            <p style={{ margin: "14px 0 0", fontSize: 9.5, lineHeight: 1.7, color: MUTED }}>
              {c.voices.note}
            </p>
          </section>

          {/* ── 10. 料金 ── */}
          <section style={{ ...section, background: "#FFFFFF" }}>
            <Kicker>{c.price.kicker}</Kicker>
            <Heading text={c.price.heading} />
            <p
              style={{
                margin: "16px 0 0",
                fontSize: 12.5,
                lineHeight: 2,
                color: BODY,
                textAlign: "center",
              }}
            >
              {c.price.lead}
            </p>

            {/* 入会金（キャンペーン） */}
            <div
              style={{
                marginTop: 18,
                border: `1.5px solid ${PINK}`,
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: PALE2,
                  padding: "6px 12px",
                  textAlign: "center",
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: PINK_INK,
                }}
              >
                ＼ {c.price.join.note} ／
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  background: "#FFFFFF",
                }}
              >
                <span style={{ fontSize: 13.5, fontWeight: 700, color: INK }}>
                  {c.price.join.label}
                </span>
                <span style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span
                    style={{ fontSize: 12.5, color: MUTED, textDecoration: "line-through" }}
                  >
                    {c.price.join.was}
                  </span>
                  <span style={{ fontSize: 12, color: MUTED }}>→</span>
                  <span
                    style={{
                      fontFamily: MINCHO,
                      fontSize: 28,
                      fontWeight: 700,
                      lineHeight: 1,
                      color: PINK_INK,
                    }}
                  >
                    {c.price.join.now}
                  </span>
                </span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 14 }}>
              {c.price.plans.map((p) => (
                <div
                  key={p.name}
                  style={{
                    position: "relative",
                    borderRadius: 12,
                    border: `1px solid ${p.badge === "人気No.1" ? PINK : LINE}`,
                    background: p.badge === "人気No.1" ? "#FFF7F9" : CREAM,
                    padding: "14px 14px 13px",
                  }}
                >
                  {p.badge && (
                    <span
                      style={{
                        position: "absolute",
                        top: -9,
                        left: 12,
                        padding: "3px 10px",
                        borderRadius: 999,
                        background: p.badge === "人気No.1" ? BTN : PINK_DEEP,
                        color: "#FFFFFF",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {p.badge}
                    </span>
                  )}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      gap: 10,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: INK }}>
                        {p.name}
                      </div>
                      <div
                        style={{
                          marginTop: 4,
                          fontSize: 10.5,
                          lineHeight: 1.6,
                          color: MUTED,
                        }}
                      >
                        {p.desc}
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ lineHeight: 1 }}>
                        <span
                          style={{
                            fontFamily: MINCHO,
                            fontSize: 23,
                            fontWeight: 700,
                            color: PINK_INK,
                          }}
                        >
                          {p.amount}
                        </span>
                        <span
                          style={{ fontSize: 11, fontWeight: 700, color: PINK_INK, marginLeft: 1 }}
                        >
                          {p.unit}
                        </span>
                      </div>
                      <div style={{ marginTop: 5, fontSize: 10, color: BODY }}>{p.per}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12 }}>
              {c.price.notes.map((n) => (
                <p key={n} style={{ margin: "2px 0", fontSize: 9.5, lineHeight: 1.7, color: MUTED }}>
                  {n}
                </p>
              ))}
            </div>
            <Cta text={c.price.ctaText} sub={c.price.ctaSub} />
          </section>

          {/* ── 11. 他サービスとの違い ──
              4社を横に並べる表は390px幅だと1列88pxになり読めない。
              評価軸ごとにカードを立て、その中で4社を縦に並べている。 */}
          <section style={{ ...section, background: CREAM }}>
            <Kicker>{c.compare.kicker}</Kicker>
            <Heading text={c.compare.heading} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 22 }}>
              {c.compare.axes.map((axis) => (
                <div
                  key={axis.label}
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    border: `1px solid ${LINE}`,
                    background: "#FFFFFF",
                  }}
                >
                  <div
                    style={{
                      padding: "8px 13px",
                      background: PALE2,
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      color: PINK_INK,
                    }}
                  >
                    {axis.label}
                  </div>
                  {axis.rows.map((row, i) => {
                    const isSakura = i === 0;
                    return (
                      <div
                        key={row.name}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "104px 1fr",
                          gap: 8,
                          padding: "10px 12px",
                          borderTop: i === 0 ? "none" : `1px solid ${LINE}`,
                          background: isSakura ? "#FFF7F9" : "#FFFFFF",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10.5,
                            fontWeight: 700,
                            lineHeight: 1.5,
                            color: isSakura ? PINK_INK : MUTED,
                          }}
                        >
                          {isSakura ? <>◎ {nl(row.name)}</> : nl(row.name)}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            lineHeight: 1.65,
                            color: isSakura ? INK : BODY,
                            fontWeight: isSakura ? 500 : 400,
                          }}
                        >
                          {row.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </section>

          {/* ── 12. 体験レッスンの流れ ── */}
          <section style={{ ...section, background: "#FFFFFF" }}>
            <Kicker>{c.flow.kicker}</Kicker>
            <Heading text={c.flow.heading} />
            <p
              style={{
                margin: "16px 0 0",
                fontSize: 12.5,
                lineHeight: 2,
                color: BODY,
                textAlign: "center",
              }}
            >
              {c.flow.lead}
            </p>
            <div style={{ marginTop: 20, position: "relative" }}>
              {/* ステップを繋ぐ縦線 */}
              <span
                style={{
                  position: "absolute",
                  left: 15,
                  top: 12,
                  bottom: 12,
                  width: 1,
                  background: LINE,
                }}
                aria-hidden
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {c.flow.steps.map((s) => (
                  <div key={s.num} style={{ display: "flex", gap: 12, position: "relative" }}>
                    <span
                      style={{
                        flexShrink: 0,
                        display: "flex",
                        width: 31,
                        height: 31,
                        borderRadius: 999,
                        background: BTN,
                        color: "#FFFFFF",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11.5,
                        fontWeight: 700,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {s.num}
                    </span>
                    <div
                      style={{
                        flex: 1,
                        background: CREAM,
                        border: `1px solid ${LINE}`,
                        borderRadius: 12,
                        padding: "12px 13px",
                      }}
                    >
                      <h3
                        style={{
                          margin: 0,
                          fontSize: 13.5,
                          fontWeight: 700,
                          lineHeight: 1.5,
                          color: INK,
                        }}
                      >
                        {s.title}
                      </h3>
                      <p
                        style={{ margin: "6px 0 0", fontSize: 11.5, lineHeight: 1.9, color: BODY }}
                      >
                        {s.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Cta text={c.flow.ctaText} sub={c.flow.ctaSub} />
          </section>

          {/* ── 13. よくある質問 ── */}
          <section style={{ ...section, background: PALE }}>
            <Kicker>{c.faq.kicker}</Kicker>
            <Heading text={c.faq.heading} />
            <div style={{ marginTop: 22 }}>
              <FaqAccordion
                items={c.faq.items}
                accent={PINK_DEEP}
                ink={INK}
                body={BODY}
                line={LINE}
              />
            </div>
          </section>

          {/* ── 14. 店舗情報 ── */}
          <section style={{ ...section, background: "#FFFFFF" }}>
            <Kicker>{c.studios.kicker}</Kicker>
            <Heading text={c.studios.heading} />
            <p
              style={{
                margin: "16px 0 0",
                fontSize: 12.5,
                lineHeight: 2,
                color: BODY,
                textAlign: "center",
              }}
            >
              {c.studios.lead}
            </p>
            <ImageSlot
              src={c.studios.photo.src}
              placeholder={c.studios.photo.placeholder}
              alt="SAKURAのスタジオ内観"
              radius={12}
              style={{ width: "100%", aspectRatio: "16 / 10", marginTop: 18 }}
            />
            <div
              style={{
                marginTop: 16,
                display: "flex",
                gap: 8,
              }}
            >
              {[
                { label: "営業時間", value: c.studios.hours },
                { label: "定休日", value: c.studios.holiday },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    flex: 1,
                    borderRadius: 10,
                    background: PALE,
                    padding: "10px 10px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 9.5, color: MUTED, letterSpacing: "0.06em" }}>
                    {row.label}
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: PINK_INK,
                    }}
                  >
                    {row.value}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              {c.studios.areas.map((area) => (
                <div
                  key={area.pref}
                  style={{
                    borderRadius: 12,
                    border: `1px solid ${LINE}`,
                    padding: "12px 13px",
                    background: CREAM,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      fontSize: 12,
                      fontWeight: 700,
                      color: PINK_INK,
                    }}
                  >
                    <SakuraMark size={11} />
                    {area.pref}
                    <span style={{ fontSize: 10, color: MUTED, fontWeight: 400 }}>
                      {area.names.length}店舗
                    </span>
                  </div>
                  <p
                    style={{
                      margin: "8px 0 0",
                      fontSize: 11.5,
                      lineHeight: 1.85,
                      color: BODY,
                    }}
                  >
                    {area.names.join("・")}
                  </p>
                </div>
              ))}
              <div
                style={{
                  borderRadius: 12,
                  border: `1px dashed ${PINK}`,
                  padding: "12px 13px",
                  background: "#FFF7F9",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: PINK_INK }}>
                  {c.studios.upcoming.label}
                </div>
                <p
                  style={{ margin: "8px 0 0", fontSize: 11.5, lineHeight: 1.85, color: BODY }}
                >
                  {c.studios.upcoming.names.join("・")}
                </p>
              </div>
            </div>
            <p style={{ margin: "14px 0 0", fontSize: 9.5, lineHeight: 1.7, color: MUTED }}>
              {c.studios.note}
            </p>
          </section>

          {/* ── 15. 最終CTA（予約フォーム） ── */}
          <section
            id="form"
            style={{
              padding: "44px 18px 40px",
              background: "linear-gradient(180deg, #FBEFF2 0%, #F4DDE4 100%)",
            }}
          >
            <Kicker>{c.form.kicker}</Kicker>
            <Heading text={c.form.heading} size={20} />
            <p
              style={{
                margin: "16px 0 0",
                fontSize: 12.5,
                lineHeight: 2,
                color: BODY,
                textAlign: "center",
              }}
            >
              {nl(c.form.lead)}
            </p>

            {/* 送信直前にオファーをもう一度出す。ここが一番迷いが出る位置なので、
                「いくらかかるのか」を目に入れてからボタンを押してもらう。 */}
            <div
              style={{
                marginTop: 18,
                display: "flex",
                gap: 8,
              }}
            >
              {c.fv.campaign.rows.map((r) => (
                <div
                  key={r.label}
                  style={{
                    flex: 1,
                    background: "#FFFFFF",
                    border: `1px solid ${PINK}`,
                    borderRadius: 12,
                    padding: "11px 8px 10px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 700, color: INK }}>{r.label}</div>
                  <div style={{ marginTop: 5, lineHeight: 1 }}>
                    <span
                      style={{ fontSize: 11, color: MUTED, textDecoration: "line-through" }}
                    >
                      {r.was}
                    </span>
                    <span
                      style={{
                        fontFamily: MINCHO,
                        fontSize: 24,
                        fontWeight: 700,
                        color: PINK_INK,
                        marginLeft: 6,
                      }}
                    >
                      {r.now}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 14,
                background: "#FFFFFF",
                borderRadius: 16,
                padding: "18px 15px 20px",
                boxShadow: "0 8px 24px rgba(120,80,92,0.10)",
              }}
            >
              <LPForm
                clientSlug={c.slug}
                fields={c.form.fields}
                accent={PINK_DEEP}
                submitLabel={c.form.submitLabel}
                submitStyle={{ background: BTN, boxShadow: BTN_SHADOW }}
                microcopy={
                  <span style={{ color: PINK_INK, fontSize: 12 }}>{c.form.microcopy}</span>
                }
                disclaimer={nl(c.form.disclaimer)}
                errorMessage={c.form.errorMessage}
              />
            </div>
          </section>

          <footer
            style={{
              padding: "18px 18px 22px",
              background: "#FFFFFF",
              borderTop: `1px solid ${LINE}`,
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <SakuraMark size={13} />
              <span
                style={{
                  fontFamily: MINCHO,
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: INK,
                }}
              >
                {c.header.brand}
              </span>
            </div>
            <p style={{ margin: "6px 0 0", fontSize: 9.5, color: MUTED }}>
              {c.header.brandSub}
            </p>
            <p style={{ margin: "12px 0 0", fontSize: 9.5, color: MUTED }}>
              © {new Date().getFullYear()} SAKURA
            </p>
          </footer>
        </LPCanvas>
      </div>

      <StickyFooterCTA
        anchor={c.sticky.anchor}
        buttonText={c.sticky.buttonText}
        showAfter={520}
        buttonGradient={BTN}
        shadowColor="rgba(194,80,113,0.4)"
        borderColor="rgba(229,139,164,0.45)"
        offers={c.sticky.offers.map((o) => (
          <span key={o} style={{ fontSize: 12.5, fontWeight: 700, color: PINK_INK }}>
            {o}
          </span>
        ))}
      />
    </LPShell>
  );
}
