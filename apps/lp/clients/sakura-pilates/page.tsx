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
 *   FV → 特典 → お悩み → なぜマシンピラティス×マンツーマンか → 選ばれる5つの理由
 *   → パーソナルだからできること → 初心者でも安心 → 数字で見るSAKURA
 *   → レッスン内容 → お客様の声 → 体験の流れ → FAQ → 店舗一覧 → 予約フォーム
 *
 * 料金と他社比較は顧客判断により一旦非表示（SHOW_PRICE / SHOW_COMPARE）。
 * データは config に残してあるので、フラグを true に戻せば元の位置に復帰する。
 *
 * CTAは 特典直後 / 理由の直後 / 初心者不安の解消直後 / お客様の声の直後 / 流れの直後 の
 * 5箇所＋ヘッダー＋追従フッター。いずれも #form へ送る。
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

/* 特典ブロックの円形アイコン。並び順は config.offer.items と一致させること。 */
const offerIcons: ReactNode[] = [
  /* 丁寧なカウンセリング — 吹き出し */
  <>
    <path d="M4 5.5h16a1 1 0 011 1v8a1 1 0 01-1 1h-9l-4 3v-3H4a1 1 0 01-1-1v-8a1 1 0 011-1z" />
    <circle cx="8.5" cy="10.5" r="0.6" />
    <circle cx="12" cy="10.5" r="0.6" />
    <circle cx="15.5" cy="10.5" r="0.6" />
  </>,
  /* マシンピラティス体験 — リフォーマー */
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
  /* あなたに合うプランのご案内 — カレンダー */
  <>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 9.6h17M8 3.5v3M16 3.5v3" />
    <circle cx="8.4" cy="13.6" r="0.9" />
    <circle cx="12" cy="13.6" r="0.9" />
  </>,
  /* 完全マンツーマン・女性インストラクター — 2人 */
  <>
    <circle cx="8.4" cy="8" r="2.3" />
    <path d="M5 18.5v-1.2a3.4 3.4 0 013.4-3.4 3.4 3.4 0 013.4 3.4v1.2" />
    <circle cx="15.6" cy="8" r="2.3" />
    <path d="M12.2 18.5v-1.2a3.4 3.4 0 013.4-3.4 3.4 3.4 0 013.4 3.4v1.2" />
  </>,
  /* ウェア・靴下 無料レンタル — Tシャツ */
  <>
    <path d="M8.8 4L4 6.7l1.9 3.1L8 8.5V20h8V8.5l2.1 1.3L20 6.7 15.2 4a3.3 3.3 0 01-6.4 0z" />
  </>,
];

function OfferIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke={PINK_DEEP}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
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

/**
 * 一旦非表示にしているブロック（顧客判断、2026-09-03）。
 * config.price / config.compare のデータはそのまま残してあるので、
 * ここを true に戻すだけで復帰する。boolean 型注釈は、リテラル false に
 * 縮まって「到達しない分岐」と判定されるのを避けるため。
 */
const SHOW_PRICE: boolean = false;
const SHOW_COMPARE: boolean = false;

const section: CSSProperties = { padding: "44px 18px" };

export default function Page() {
  const c = config;

  /* フォーム直前でもう一度出すオファー。特典ブロックと同じ数字を使う。 */
  const formOffers = [
    { label: "体験レッスン", was: c.offer.trialWas, now: `${c.offer.trialNow}${c.offer.trialUnit}` },
    { label: c.offer.perks[0].label, was: c.offer.perks[0].was, now: c.offer.perks[0].now },
  ];

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

          </section>

          {/* ── 2. 特典（MV直下） ──
              参考LPの cp ブロックと同じ積み方:
              「体験で受けられる中身」→「さらに」→「入会時の特典」。
              金額は公式LPのキャンペーンバナー原文どおり（通常5,500円→0円 / 入会金0円 / 専用ソックス）。 */}
          <section
            id="offer"
            style={{
              padding: "34px 18px 40px",
              background: "linear-gradient(180deg, #FBEFF2 0%, #F7E1E7 100%)",
            }}
          >
            <div
              style={{
                borderRadius: 18,
                overflow: "hidden",
                background: "#FFFFFF",
                border: `1.5px solid ${PINK}`,
                boxShadow: "0 10px 28px rgba(194,80,113,0.14)",
              }}
            >
              {/* 見出し＋金額 */}
              <div
                style={{
                  background: "linear-gradient(100deg, #F6BFCD 0%, #E7899F 55%, #D26C88 100%)",
                  color: "#FFFFFF",
                  textAlign: "center",
                  padding: "9px 12px",
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                ＼ {c.offer.note} ／
              </div>
              <div style={{ padding: "18px 15px 4px", textAlign: "center" }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: PINK_INK,
                  }}
                >
                  {c.offer.eyebrow}
                </div>
                <h2
                  style={{
                    margin: "7px 0 0",
                    fontFamily: MINCHO,
                    fontWeight: 600,
                    fontSize: 18,
                    lineHeight: 1.5,
                    letterSpacing: "0.02em",
                    color: INK,
                  }}
                >
                  {c.offer.heading}
                </h2>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 9,
                    padding: "4px 12px",
                    borderRadius: 999,
                    background: PALE,
                    fontSize: 11,
                    fontWeight: 700,
                    color: PINK_INK,
                  }}
                >
                  <SakuraMark size={11} />
                  {c.offer.duration}・カウンセリング込み
                </div>

                <div
                  style={{
                    marginTop: 14,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <div style={{ textAlign: "right", paddingBottom: 8 }}>
                    <div style={{ fontSize: 10.5, color: MUTED, lineHeight: 1.5 }}>通常</div>
                    <div
                      style={{
                        fontSize: 15,
                        color: MUTED,
                        textDecoration: "line-through",
                        lineHeight: 1.3,
                      }}
                    >
                      {c.offer.trialWas}
                    </div>
                  </div>
                  <span style={{ fontSize: 15, color: MUTED, paddingBottom: 12 }}>→</span>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
                    <span
                      style={{
                        fontFamily: MINCHO,
                        fontSize: 74,
                        fontWeight: 700,
                        lineHeight: 0.86,
                        color: PINK_INK,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {c.offer.trialNow}
                    </span>
                    <span
                      style={{
                        fontFamily: MINCHO,
                        fontSize: 26,
                        fontWeight: 700,
                        color: PINK_INK,
                        paddingBottom: 5,
                      }}
                    >
                      {c.offer.trialUnit}
                    </span>
                  </div>
                </div>
              </div>

              {/* 体験60分で受けられる中身 */}
              <div style={{ padding: "16px 12px 4px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 10,
                  }}
                >
                  {c.offer.items.map((item, i) => (
                    <div key={item} style={{ textAlign: "center" }}>
                      <div
                        style={{
                          width: 66,
                          height: 66,
                          margin: "0 auto",
                          borderRadius: 999,
                          border: `1px solid ${LINE}`,
                          background: CREAM,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <OfferIcon>{offerIcons[i]}</OfferIcon>
                      </div>
                      <p
                        style={{
                          margin: "7px 0 0",
                          fontSize: 10,
                          lineHeight: 1.55,
                          color: BODY,
                          fontWeight: 500,
                        }}
                      >
                        {nl(item)}
                      </p>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, margin: "16px 3px 0" }}>
                  {c.offer.photos.map((ph) => (
                    <ImageSlot
                      key={ph.placeholder}
                      src={ph.src}
                      placeholder={ph.placeholder}
                      alt={ph.placeholder}
                      radius={10}
                      style={{ flex: 1, aspectRatio: "4 / 3" }}
                    />
                  ))}
                </div>
              </div>

              {/* さらに → 入会特典 */}
              <div style={{ position: "relative", marginTop: 22 }}>
                <span
                  style={{
                    position: "absolute",
                    top: -14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    width: 62,
                    height: 62,
                    borderRadius: 999,
                    background: "linear-gradient(160deg, #FDF0F3 0%, #F3C6D2 100%)",
                    border: "1px solid rgba(255,255,255,0.9)",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: MINCHO,
                    fontSize: 15,
                    fontWeight: 700,
                    color: PINK_INK,
                    zIndex: 1,
                    boxShadow: "0 4px 12px rgba(194,80,113,0.18)",
                  }}
                >
                  {c.offer.bridge}
                </span>
                {/* パディング上は「さらに」バッジ(高さ62px・top -14px)の下端を避ける値。
                    詰めるとバッジがリード文に重なる。 */}
                <div style={{ background: PALE, padding: "56px 14px 16px" }}>
                  <p
                    style={{
                      margin: 0,
                      textAlign: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      color: PINK_INK,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {c.offer.joinLead}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 11 }}>
                    {c.offer.perks.map((perk) => (
                      <div
                        key={perk.label}
                        style={{
                          background: "#FFFFFF",
                          borderRadius: 12,
                          padding: "11px 13px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 10,
                        }}
                      >
                        <span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: INK }}>
                            {perk.label}
                          </span>
                          {perk.note && (
                            <span
                              style={{
                                display: "block",
                                marginTop: 3,
                                fontSize: 9.5,
                                color: MUTED,
                              }}
                            >
                              {perk.note}
                            </span>
                          )}
                        </span>
                        <span
                          style={{ display: "flex", alignItems: "baseline", gap: 7, flexShrink: 0 }}
                        >
                          {perk.was && (
                            <span
                              style={{
                                fontSize: 11.5,
                                color: MUTED,
                                textDecoration: "line-through",
                              }}
                            >
                              {perk.was}
                            </span>
                          )}
                          <span
                            style={{
                              fontFamily: MINCHO,
                              fontSize: perk.now.length > 3 ? 17 : 26,
                              fontWeight: 700,
                              lineHeight: 1,
                              color: PINK_INK,
                            }}
                          >
                            {perk.now}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                  <p
                    style={{
                      margin: "12px 0 0",
                      fontSize: 10.5,
                      lineHeight: 1.75,
                      color: BODY,
                      textAlign: "center",
                    }}
                  >
                    {c.offer.foot}
                  </p>
                </div>
              </div>
            </div>
            <Cta text={c.offer.ctaText} sub={c.offer.ctaSub} top={18} />
          </section>

          {/* ── 3. こんなお悩みありませんか？ ──
              2列グリッド＋悩みチップの併用は、写真も文字も小さくなって読みづらかった。
              チップは1列リストと内容が重複していたので落とし、写真＋コピー＋補足の
              横並び1列に組み替えている（文字サイズを上げても4件が収まる）。 */}
          <section style={{ ...section, background: "#FFFFFF" }}>
            <Kicker>{c.worry.kicker}</Kicker>
            <Heading text={c.worry.heading} />
            <p
              style={{
                margin: "16px 0 0",
                fontSize: 13,
                lineHeight: 1.95,
                color: BODY,
                textAlign: "center",
              }}
            >
              {nl(c.worry.lead)}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
              {c.worry.cards.map((card, i) => (
                <div
                  key={card.text}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: 11,
                    borderRadius: 14,
                    background: CREAM,
                    border: `1px solid ${LINE}`,
                  }}
                >
                  <ImageSlot
                    src={card.img.src}
                    placeholder={card.img.placeholder}
                    alt={card.text.replace("\n", "")}
                    radius={10}
                    style={{ width: 96, height: 96, flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "2px 8px",
                        borderRadius: 999,
                        background: PALE2,
                        fontSize: 9.5,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: PINK_INK,
                      }}
                    >
                      CASE 0{i + 1}
                    </div>
                    <h3
                      style={{
                        margin: "7px 0 0",
                        fontSize: 14,
                        fontWeight: 700,
                        lineHeight: 1.6,
                        color: INK,
                      }}
                    >
                      {nl(card.text)}
                    </h3>
                    <p
                      style={{
                        margin: "6px 0 0",
                        fontSize: 11,
                        lineHeight: 1.75,
                        color: MUTED,
                      }}
                    >
                      {card.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 22,
                padding: "18px 16px",
                borderRadius: 14,
                background: "linear-gradient(180deg, #FBEFF2 0%, #F7E1E7 100%)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: MINCHO,
                  fontSize: 18,
                  fontWeight: 600,
                  lineHeight: 1.7,
                  color: PINK_INK,
                }}
              >
                {nl(c.worry.closing)}
              </p>
              <p
                style={{
                  margin: "10px 0 0",
                  fontSize: 11.5,
                  lineHeight: 1.8,
                  color: BODY,
                }}
              >
                {c.worry.closingSub}
              </p>
            </div>
          </section>

          {/* ── 4. その悩みにSAKURAがおすすめな理由 ── */}
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

          {/* ── 5. SAKURAの特徴・選ばれる理由（5つ） ──
              「会社の説明」ではなく「見込み客の不安への答え」として出す。
              各カードは insight（本音）→ タイトル（答え）→ 本文（公式の事実）の順。 */}
          <section style={{ ...section, background: "#FFFFFF" }}>
            <Kicker>{c.features.kicker}</Kicker>
            <Heading text={c.features.heading} />
            <p
              style={{
                margin: "16px 0 0",
                fontSize: 12.5,
                lineHeight: 2,
                color: BODY,
                textAlign: "center",
              }}
            >
              {nl(c.features.lead)}
            </p>
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
                        alt={f.title.replace("\n", "")}
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
                    {/* 見込み客の本音。ここに自分を重ねてから答えを読んでもらう。 */}
                    <p
                      style={{
                        margin: 0,
                        display: "flex",
                        gap: 6,
                        fontSize: 11.5,
                        lineHeight: 1.7,
                        color: MUTED,
                      }}
                    >
                      <span style={{ color: PINK, flexShrink: 0 }} aria-hidden>
                        ❝
                      </span>
                      {f.insight}
                    </p>
                    <div
                      style={{ height: 1, background: LINE, margin: "11px 0 12px" }}
                      aria-hidden
                    />
                    <h3
                      style={{
                        margin: 0,
                        fontFamily: MINCHO,
                        fontSize: 16,
                        fontWeight: 600,
                        lineHeight: 1.6,
                        color: INK,
                      }}
                    >
                      {nl(f.title)}
                    </h3>
                    <p
                      style={{
                        margin: "10px 0 0",
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

          {/* ── 6. パーソナルだからできること ── */}
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

          {/* ── 7. 初心者でも安心できる理由 ── */}
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

          {/* ── 8. 実績・数字・信頼要素 ── */}
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

          {/* ── 9. レッスン内容・身体へのアプローチ ── */}
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

          {/* ── 10. お客様の声 ── */}
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
            <Cta text={c.voices.ctaText} sub={c.voices.ctaSub} />
          </section>

          {/* ── 料金（一旦非表示） ──
              顧客判断により 2026-09-03 から非表示。データは config.price に残してあるので
              SHOW_PRICE を true に戻せばそのまま復帰する。 */}
          {SHOW_PRICE && (
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
          )}

          {/* ── 他サービスとの違い（一旦非表示） ──
              顧客判断により 2026-09-03 から非表示。データは config.compare に残してあるので
              SHOW_COMPARE を true に戻せばそのまま復帰する。
              4社を横に並べる表は390px幅だと1列88pxになり読めないため、
              評価軸ごとにカードを立て、その中で4社を縦に並べる形にしてある。 */}
          {SHOW_COMPARE && (
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
          )}

          {/* ── 11. 体験レッスンの流れ ── */}
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

          {/* ── 12. よくある質問 ── */}
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

          {/* ── 13. 店舗情報 ──
              東京都限定LPなので都県のグルーピングは持たず、駅名を2列で並べる。
              「自分の最寄りがあるか」を1画面で確かめられることだけを狙った作り。 */}
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
              {nl(c.studios.lead)}
            </p>
            <ImageSlot
              src={c.studios.photo.src}
              placeholder={c.studios.photo.placeholder}
              alt="SAKURAのスタジオ内観"
              radius={12}
              style={{ width: "100%", aspectRatio: "16 / 10", marginTop: 18 }}
            />
            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
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
                  <div style={{ marginTop: 4, fontSize: 12.5, fontWeight: 700, color: PINK_INK }}>
                    {row.value}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 16,
                borderRadius: 12,
                border: `1px solid ${LINE}`,
                background: CREAM,
                padding: "13px 13px 14px",
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
                東京都
                <span style={{ fontSize: 10, color: MUTED, fontWeight: 400 }}>
                  {c.studios.names.length}店舗
                </span>
              </div>
              <div
                style={{
                  marginTop: 10,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0 8px",
                }}
              >
                {c.studios.names.map((name) => (
                  <div
                    key={name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "7px 2px",
                      borderTop: `1px solid ${LINE}`,
                      fontSize: 11.5,
                      lineHeight: 1.4,
                      color: INK,
                    }}
                  >
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: 999,
                        background: PINK,
                        flexShrink: 0,
                      }}
                      aria-hidden
                    />
                    {name}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: 10,
                borderRadius: 12,
                border: `1px dashed ${PINK}`,
                padding: "12px 13px",
                background: "#FFF7F9",
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: PINK_INK }}>
                {c.studios.upcoming.label}
              </div>
              <p style={{ margin: "8px 0 0", fontSize: 11.5, lineHeight: 1.85, color: BODY }}>
                {c.studios.upcoming.names.join("・")}
              </p>
            </div>
            <p style={{ margin: "14px 0 0", fontSize: 9.5, lineHeight: 1.7, color: MUTED }}>
              {c.studios.note}
            </p>
          </section>

          {/* ── 14. 最終CTA（予約フォーム） ── */}
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
              {formOffers.map((r) => (
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
