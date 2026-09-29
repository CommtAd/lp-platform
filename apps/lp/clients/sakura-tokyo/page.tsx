import type { CSSProperties, ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPCanvas from "@/components/LPCanvas";
import LPForm from "@/components/LPForm";
import StickyFooterCTA from "@/components/StickyFooterCTA";
import ImageSlot from "@/components/ImageSlot";
import FaqAccordion from "./FaqAccordion";
import config from "./config";
import type { Slot } from "./config";

/**
 * パーソナルマシンピラティス SAKURA — ブランド全体の広告集客用LP。
 *
 * 設計の起点は「Meta広告をクリックした人が、体験を予約する理由をこのページで
 * 作れているか」。ブランド紹介ではないので、各ブロックは
 * 「不安を1つ潰す → その場で予約できる」の順に並べている。
 *
 * ブロック順（2026-09-29 に seren-pilates の構成へ寄せて組み直した）:
 *   ヘッダー → オファーバー → FV（縦書きキャッチ＋円形バッジ）→ 桜色の帯（サブコピー＋悩みチップ）
 *   → 体験キャンペーン → お悩み → マシンピラティス×マンツーマンで変わること
 *   → 選ばれる6つの理由 → 料金 → 体験キャンペーン再掲 → パーソナルだからできること
 *   → 体験レッスンの流れ → はじめてでも大丈夫 → 店舗 → FAQ → クロージング
 *
 * 組み直しの方針は「文字を大きく、写真を多く」。本文は15px以上。
 * 写真は21枚すべて別の素材で、頭・顔が枠で切れるものは使わない（素材の出典は config.ts）。
 * 体験の流れの 01・03・05・06 は割り当てる素材が無いのでテキストのみ。
 *
 * 数字で見るSAKURA・レッスン内容・お客様の声・パーソナルの比較表は、この構成では
 * 出していない（データは config に残してある）。他社比較・予約フォームは
 * 顧客判断により一旦非表示（SHOW_FORM）。料金は 2026-09-03 に顧客判断で非表示に
 * していたが、2026-09-29 の組み直しで表として再掲した（公開前に顧客確認を取ること）。
 *
 * CTAは 体験キャンペーン / 選ばれる理由 / 体験の流れ / クロージング の4箇所＋
 * ヘッダー＋追従フッター。**いずれもSAKURA公式の予約サイト（hacomono）へ
 * 外部遷移する**（config.reserve.url）。
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
  /* 姿勢分析 — 横向きの人体＋垂直の基準線と計測目盛り */
  <>
    <path d="M6 2.5v19" strokeDasharray="2 2.2" />
    <circle cx="13.2" cy="5.6" r="2.1" />
    <path d="M13.2 7.7v6.1M13.2 13.8l-2.4 6.4M13.2 13.8l2.6 6.4M10.4 10.2l5.6-.9" />
    <path d="M4.6 7.3H6M4.6 12H6M4.6 16.7H6" />
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

/** SAKURA専用ソックス特典に添えるイラスト。 */
function SocksIcon({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M11 4.5h7.4v10.2c0 1.7.7 2.6 2.1 3.7l2.6 2c2.2 1.7 2.4 4.7.6 6.6-1.8 1.9-4.8 1.9-6.7.1l-4.6-4.4c-1.5-1.4-2.4-3.1-2.4-5V4.5z"
        fill="#FBEFF2"
        stroke={PINK_DEEP}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M11 8.6h7.4" stroke={PINK_DEEP} strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M13.6 20.4c1.5-1 3.6-.9 5 .3"
        stroke={PINK}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

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

function Heading({
  text,
  size = 26,
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
          gap: 8,
          margin: "14px 0 0",
        }}
        aria-hidden
      >
        <span style={{ width: 26, height: 1, background: color === INK ? LINE : "rgba(255,255,255,0.6)" }} />
        <SakuraMark size={14} color={color === INK ? PINK : "#FFFFFF"} />
        <span style={{ width: 26, height: 1, background: color === INK ? LINE : "rgba(255,255,255,0.6)" }} />
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
    style={{ flex: "none", marginTop: 4 }}
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

/** ページ内の主要CTA。すべて予約サイト（hacomono）へ送る。 */
function Cta({
  text,
  sub,
  top = 32,
  dark = false,
}: {
  text: string;
  sub?: string;
  top?: number;
  dark?: boolean;
}) {
  return (
    <div style={{ marginTop: top }}>
      <a
        href={config.reserve.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          height: 64,
          background: BTN,
          color: "#FFFFFF",
          textDecoration: "none",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "0.05em",
          borderRadius: 999,
          boxShadow: BTN_SHADOW,
        }}
      >
        {text}
        <span
          style={{
            display: "inline-flex",
            width: 24,
            height: 24,
            borderRadius: 999,
            background: "rgba(255,255,255,0.26)",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
          }}
        >
          →
        </span>
      </a>
      {sub && (
        <p
          style={{
            margin: "12px 0 0",
            textAlign: "center",
            fontSize: 13,
            letterSpacing: "0.04em",
            color: dark ? "rgba(255,255,255,0.85)" : MUTED,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/**
 * 体験キャンペーンのブロック（MV直下・理由の後・クロージングで使い回す）。
 *   full    … 見出し＋価格＋受けられる中身（アイコン・写真）＋入会特典
 *   repeat  … 見出し＋価格＋入会特典（中身は省く）
 *   compact … 期限バッジ＋価格＋入会特典だけ（クロージング用）
 * 金額は公式LPのキャンペーンバナー原文どおり（通常5,500円→0円 / 入会金0円 / 専用ソックス）。
 */
function CampaignBlock({ mode = "full" }: { mode?: "full" | "repeat" | "compact" }) {
  const o = config.offer;
  return (
    <>
      <div style={{ textAlign: "center" }}>
        {/* 対象エリア。期限バッジの上に置き、広告の配信エリア（東京都）と揃える。 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: 12,
            fontFamily: MINCHO,
            fontSize: 21,
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: PINK_INK,
          }}
        >
          <SakuraMark size={16} />
          {o.area}
          <SakuraMark size={16} />
        </div>
        <span
          style={{
            display: "inline-block",
            background: PINK_DEEP,
            color: "#FFFFFF",
            fontSize: 14.5,
            fontWeight: 700,
            letterSpacing: "0.08em",
            padding: "8px 18px",
            borderRadius: 6,
          }}
        >
          {o.note}
        </span>
        {mode !== "compact" && (
          <>
            <div
              style={{
                marginTop: 18,
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: PINK_INK,
              }}
            >
              {o.eyebrow}
            </div>
            <h3
              style={{
                margin: "6px 0 0",
                fontFamily: MINCHO,
                fontWeight: 600,
                fontSize: 23,
                lineHeight: 1.5,
                letterSpacing: "0.02em",
                color: INK,
                display: "inline-block",
                padding: "0 4px",
                background: `linear-gradient(transparent 66%, ${PALE2} 66%)`,
              }}
            >
              {o.heading}
            </h3>
            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 12,
                  padding: "5px 14px",
                  borderRadius: 999,
                  background: PALE,
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: PINK_INK,
                }}
              >
                <SakuraMark size={13} />
                {o.duration}・カウンセリング込み
              </span>
            </div>
            <p style={{ margin: "18px 0 0", fontSize: 16, lineHeight: 1.95, color: BODY }}>
              {nl(o.lead)}
            </p>
          </>
        )}
      </div>

      {/* 二重価格。通常価格を上段、↓ をはさんで「0円」を特大で置く。 */}
      <div style={{ marginTop: mode === "compact" ? 20 : 26, textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              background: PINK_DEEP,
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.06em",
              padding: "6px 13px",
              borderRadius: 4,
              whiteSpace: "nowrap",
            }}
          >
            体験レッスン
          </span>
          <span style={{ fontSize: 14, color: BODY }}>通常</span>
          <span
            style={{
              fontFamily: MINCHO,
              fontSize: 23,
              color: MUTED,
              textDecoration: "line-through",
            }}
          >
            {o.trialWas}
          </span>
        </div>
        <div style={{ fontSize: 22, lineHeight: 1, color: PINK, margin: "10px 0 0" }}>↓</div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 2,
            color: PINK_INK,
            fontFamily: MINCHO,
            fontWeight: 700,
          }}
        >
          <span style={{ fontSize: 104, lineHeight: 0.95, letterSpacing: "-0.02em" }}>
            {o.trialNow}
          </span>
          <span style={{ fontSize: 36, paddingBottom: 8 }}>{o.trialUnit}</span>
        </div>
      </div>

      {mode === "full" && (
        <>
          {/* 体験60分で受けられる中身 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 10,
              marginTop: 28,
            }}
          >
            {o.items.map((item, i) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  background: PALE,
                  borderRadius: 14,
                  padding: "16px 8px 14px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 58,
                    height: 58,
                    flex: "none",
                    borderRadius: 999,
                    background: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <OfferIcon>{offerIcons[i]}</OfferIcon>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: INK,
                    fontWeight: 700,
                  }}
                >
                  {nl(item)}
                </p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
            {o.photos.map((ph) => (
              <Photo key={ph.placeholder} slot={ph} radius={14} style={{ width: "100%", aspectRatio: "3 / 2" }} />
            ))}
          </div>
        </>
      )}

      {/* さらに → 入会特典 */}
      <div style={{ position: "relative", marginTop: 44 }}>
        <span
          style={{
            position: "absolute",
            top: -24,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            width: 70,
            height: 70,
            borderRadius: 999,
            background: "linear-gradient(160deg, #FDF0F3 0%, #F3C6D2 100%)",
            border: "1px solid rgba(255,255,255,0.9)",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: MINCHO,
            fontSize: 17,
            fontWeight: 700,
            color: PINK_INK,
            zIndex: 1,
            boxShadow: "0 4px 12px rgba(194,80,113,0.18)",
          }}
        >
          {o.bridge}
        </span>
        {/* パディング上は「さらに」バッジ(高さ70px・top -24px)の下端を避ける値。 */}
        <div style={{ background: PALE, borderRadius: 16, padding: "60px 14px 18px" }}>
          <p
            style={{
              margin: 0,
              textAlign: "center",
              fontSize: 15,
              fontWeight: 700,
              color: PINK_INK,
              letterSpacing: "0.04em",
            }}
          >
            {o.joinLead}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
            {o.perks.map((perk) => (
              <div
                key={perk.label}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 12,
                  padding: "14px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  {perk.icon === "socks" && <SocksIcon size={32} />}
                  <span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: INK, whiteSpace: "nowrap" }}>
                      {perk.label}
                    </span>
                    {perk.note && (
                      <span style={{ display: "block", marginTop: 3, fontSize: 11, color: BODY, whiteSpace: "nowrap" }}>
                        {perk.note}
                      </span>
                    )}
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "baseline", gap: 7, flexShrink: 0 }}>
                  {perk.was && (
                    <span style={{ fontSize: 13.5, color: MUTED, textDecoration: "line-through" }}>
                      {perk.was}
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: MINCHO,
                      fontSize: perk.now.length > 3 ? 18 : 32,
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
          {mode === "full" && (
            <p
              style={{
                margin: "14px 0 0",
                fontSize: 13,
                lineHeight: 1.8,
                color: BODY,
                textAlign: "center",
              }}
            >
              {nl(o.foot)}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

/**
 * 予約はSAKURA公式の予約サイト（hacomono）で受けるため、ページ内フォームは非表示
 * （2026-09-07 の顧客判断）。CTAはすべて config.reserve.url へ外部遷移する。
 *
 * LPForm のコード自体は残してある（`check-rules` の LPForm 必須要件も満たしたまま）。
 * 自社フォームに戻すときは、ここを true にして各CTAの href を "#form" へ戻せばよい。
 * **注意: フォームを止めている間、基盤側のCV（form_submit）は発火しない。**
 * Meta広告のコンバージョンは予約サイト側の計測に依存する。
 */
const SHOW_FORM: boolean = false;

/** セクションの左右余白。本文幅は 390 - 22×2 = 346px。 */
const PAD_X = 22;
const section = (bg: string, pad = "60px"): CSSProperties => ({
  background: bg,
  padding: `${pad} ${PAD_X}px`,
});

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
          /* 長音符・小書き仮名が行頭に来ないよう禁則処理を厳密に。 */
          lineBreak: "strict",
        }}
      >
        <LPCanvas
          style={{ background: CREAM }}
          boxShadow="0 0 60px rgba(120,80,92,0.16)"
        >
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
                <div style={{ fontSize: 9.5, letterSpacing: "0.04em", color: BODY }}>
                  {c.header.brandSub}
                </div>
              </div>
            </div>
            <a
              href={c.reserve.url}
              target="_blank"
              rel="noopener noreferrer"
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
                boxShadow: "0 4px 12px rgba(194,80,113,0.28)",
              }}
            >
              {c.header.ctaText}
            </a>
          </header>

          {/* ── オファーバー（左に期限バッジ、中央にオファー文） ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 16px",
              background: BAND,
              boxShadow: "0 3px 10px rgba(120,60,80,0.18)",
            }}
          >
            <span
              style={{
                flex: "none",
                fontSize: 15,
                fontWeight: 700,
                lineHeight: 1.2,
                whiteSpace: "nowrap",
                color: PINK_INK,
                background: "#FFFFFF",
                borderRadius: 8,
                padding: "7px 12px",
                boxShadow: "0 2px 6px rgba(90,30,50,0.24)",
              }}
            >
              {c.offerBar.badgeText}
            </span>
            <span
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 18.5,
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

          {/* ── FV：写真全面＋縦書きキャッチ（白い札）＋円形バッジ ──
              写真の領域には縦書きキャッチとバッジしか置かない。サブコピーを重ねると
              縦書きの真下へ回り込んで文字が被るため、下の帯に分けている。 */}
          <section style={{ position: "relative", height: 500, overflow: "hidden", background: PALE }}>
            <Photo
              slot={c.fv.hero}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(60,30,40,0.04) 0%, rgba(60,30,40,0) 40%, rgba(60,30,40,0.22) 100%)",
                pointerEvents: "none",
              }}
            />
            {/* 縦書きメインコピー。配列の先頭が右に来る。 */}
            <h1
              style={{
                margin: 0,
                position: "absolute",
                top: 26,
                left: 16,
                zIndex: 2,
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "flex-start",
                gap: 7,
              }}
            >
              {c.fv.catchLines.map((line) => (
                <span
                  key={line}
                  style={{
                    writingMode: "vertical-rl",
                    fontFamily: MINCHO,
                    fontWeight: 600,
                    fontSize: 22,
                    letterSpacing: "0.12em",
                    /* 札の幅＝行送り。広げると受講者の顔に札が掛かる（写真の切り抜き位置と連動）。 */
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
            {/* 右下の円形バッジ（右上は講師の顔に掛かるため下に置く） */}
            <div
              style={{
                position: "absolute",
                right: 16,
                bottom: 20,
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {c.fv.chips.map((chip) => (
                <div
                  key={chip.big}
                  style={{
                    width: 104,
                    height: 104,
                    borderRadius: "50%",
                    background: BAND,
                    border: "2px solid rgba(255,255,255,0.75)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1.2,
                    color: "#FFFFFF",
                    boxShadow: "0 6px 16px rgba(90,30,50,0.3)",
                  }}
                >
                  <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.02em" }}>
                    {chip.small}
                  </span>
                  <span style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 34, lineHeight: 1.1 }}>
                    {chip.big}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ── FV下の桜色の帯（サブコピー＋悩みワードの丸チップ） ── */}
          <div style={{ background: BAND, padding: "28px 20px 30px", textAlign: "center" }}>
            {c.fv.subLines.map((line) => (
              <p
                key={line}
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  lineHeight: 1.75,
                  color: "#FFFFFF",
                }}
              >
                {line}
              </p>
            ))}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 7,
                marginTop: 16,
              }}
            >
              {c.fv.notes.map((n) => (
                <span
                  key={n}
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    background: "rgba(255,255,255,0.16)",
                    border: "1px solid rgba(255,255,255,0.5)",
                    borderRadius: 999,
                    padding: "6px 13px",
                  }}
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          {/* 信頼バッジ（出典: 公式店舗LP・公式 /studios/） */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              background: "#FFFFFF",
              borderBottom: `1px solid ${LINE}`,
            }}
          >
            {c.fv.stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  textAlign: "center",
                  padding: "16px 2px 14px",
                  borderLeft: i === 0 ? "none" : `1px solid ${LINE}`,
                }}
              >
                <div style={{ color: PINK_INK, fontFamily: MINCHO, fontWeight: 700, lineHeight: 1 }}>
                  <span style={{ fontSize: /\d/.test(s.num) ? 30 : 22 }}>{s.num}</span>
                  <span style={{ fontSize: s.unit.length > 1 ? 11.5 : 13, marginLeft: 1 }}>{s.unit}</span>
                </div>
                <div style={{ marginTop: 7, fontSize: 10.5, lineHeight: 1.4, color: BODY }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* ── 体験キャンペーン ＋ CTA 1/4 ── */}
          <section id="offer" style={section(CREAM, "48px")}>
            <CampaignBlock />
            <Cta text={c.offer.ctaText} sub={c.offer.ctaSub} />
          </section>

          {/* ── お悩み ── 写真＋コピーの横並びで積む（出典: 公式トップ） */}
          <section style={section(PALE_GRAD)}>
            <Kicker>{c.worry.kicker}</Kicker>
            <Heading text={c.worry.heading} />
            <p
              style={{
                margin: "20px 0 0",
                textAlign: "center",
                fontSize: 16,
                lineHeight: 1.9,
                color: BODY,
              }}
            >
              {nl(c.worry.lead)}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 28 }}>
              {c.worry.cards.map((card) => (
                <div
                  key={card.text}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 6px 16px rgba(120,80,92,0.08)",
                  }}
                >
                  {/* 元写真と同じ 3:2 で出して上下を切らない（顔が写真の上端ぎりぎりにあるため）。 */}
                  <Photo slot={card.img} style={{ width: "100%", aspectRatio: "3 / 2" }} />
                  <div style={{ padding: "16px 18px 18px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <CheckIcon />
                      <p
                        style={{
                          margin: 0,
                          fontSize: 18,
                          fontWeight: 700,
                          lineHeight: 1.6,
                          color: INK,
                        }}
                      >
                        {nl(card.text)}
                      </p>
                    </div>
                    <p style={{ margin: "8px 0 0 26px", fontSize: 14.5, lineHeight: 1.85, color: BODY }}>
                      {card.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* 受けの一文。白カードと同化しないよう、桜色の地に白抜き明朝で反転させる。 */}
            <div
              style={{
                marginTop: 34,
                background: BAND,
                borderRadius: 18,
                padding: "30px 18px",
                textAlign: "center",
                boxShadow: "0 10px 24px rgba(194,80,113,0.28)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: MINCHO,
                  fontWeight: 600,
                  fontSize: 23,
                  lineHeight: 1.7,
                  letterSpacing: "0.04em",
                  color: "#FFFFFF",
                }}
              >
                {nl(c.worry.closing)}
              </p>
              <p
                style={{
                  margin: "14px 0 0",
                  fontSize: 15,
                  lineHeight: 1.85,
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                {nl(c.worry.closingSub)}
              </p>
            </div>
          </section>

          {/* ── マシンピラティス×マンツーマンで変わること ──
              出典: 公式トップ Concept / 公式店舗LP Benefits 01-03 */}
          <section style={section(CREAM)}>
            <Kicker>{c.bridge.kicker}</Kicker>
            <Heading text={c.bridge.heading} />
            <p style={{ margin: "22px 0 0", fontSize: 15.5, lineHeight: 2, color: BODY }}>
              {c.bridge.lead}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 30 }}>
              {c.bridge.items.map((item) => (
                <div
                  key={item.num}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 16,
                    overflow: "hidden",
                    border: `1px solid ${LINE}`,
                  }}
                >
                  {item.img && <Photo slot={item.img} style={{ width: "100%", aspectRatio: "3 / 2" }} />}
                  <div style={{ padding: "18px 18px 20px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span
                        style={{
                          fontFamily: MINCHO,
                          fontWeight: 700,
                          fontSize: 26,
                          lineHeight: 1.1,
                          color: PINK,
                        }}
                      >
                        {item.num}
                      </span>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: 18.5,
                          fontWeight: 700,
                          lineHeight: 1.55,
                          color: INK,
                        }}
                      >
                        {nl(item.title)}
                      </h3>
                    </div>
                    <p style={{ margin: "12px 0 0", fontSize: 15, lineHeight: 1.9, color: BODY }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p
              style={{
                margin: "34px 0 0",
                textAlign: "center",
                fontFamily: MINCHO,
                fontWeight: 600,
                fontSize: 22,
                lineHeight: 1.75,
                letterSpacing: "0.04em",
                color: INK,
              }}
            >
              {nl(c.bridge.closing)}
            </p>
          </section>

          {/* ── 選ばれる6つの理由 ＋ CTA 2/4 ──
              出典: 公式店舗LP「『SAKURA』のマシンピラティス 5つの特徴」＋公式トップ System */}
          <section style={section(PALE_GRAD)}>
            <Kicker>{c.features.kicker}</Kicker>
            <Heading text={c.features.heading} />
            <p
              style={{
                margin: "20px 0 0",
                textAlign: "center",
                fontSize: 15,
                lineHeight: 1.9,
                color: BODY,
              }}
            >
              {nl(c.features.lead)}
            </p>
            {c.features.items.map((item, idx) => (
              <div key={item.num} style={{ marginTop: idx === 0 ? 46 : 54 }}>
                <div style={{ position: "relative" }}>
                  {item.img && <Photo slot={item.img} radius={16} style={{ width: "100%", height: 240 }} />}
                  {/* 右上の菱形バッジ */}
                  <div
                    style={{
                      position: "absolute",
                      top: -18,
                      right: 16,
                      width: 54,
                      height: 54,
                      transform: "rotate(45deg)",
                      background: BAND,
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 6px 14px rgba(194,80,113,0.35)",
                    }}
                  >
                    <span
                      style={{
                        transform: "rotate(-45deg)",
                        fontFamily: MINCHO,
                        fontWeight: 700,
                        fontSize: 21,
                        color: "#FFFFFF",
                      }}
                    >
                      {item.num}
                    </span>
                  </div>
                  {item.badge && (
                    <span
                      style={{
                        position: "absolute",
                        left: 12,
                        bottom: 12,
                        background: "#FFFFFF",
                        color: PINK_INK,
                        fontSize: 14,
                        fontWeight: 700,
                        padding: "6px 12px",
                        borderRadius: 999,
                        boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                {/* 見込み客の本音 → SAKURAの答え */}
                <p
                  style={{
                    margin: "22px 0 0",
                    textAlign: "center",
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: PINK_INK,
                    textWrap: "balance",
                  }}
                >
                  「{item.insight}」
                </p>
                <h3
                  style={{
                    margin: "8px 0 0",
                    textAlign: "center",
                    fontSize: 18.5,
                    fontWeight: 700,
                    lineHeight: 1.6,
                    letterSpacing: "0.01em",
                    color: INK,
                  }}
                >
                  {nl(item.title)}
                </h3>
                <div style={{ width: 40, height: 2, background: PINK, margin: "14px auto 0", borderRadius: 2 }} />
                <p style={{ margin: "16px 0 0", fontSize: 15.5, lineHeight: 2, color: BODY }}>
                  {item.body}
                </p>
              </div>
            ))}
            <Cta text={c.offer.ctaText} sub={c.offer.ctaSub} top={40} />
          </section>

          {/* ── 料金（表） ── 出典: 公式 /price/（税込）
              プランは「名前・内容」と「1回あたりの金額」の2列の表で並べる。
              月額・総額は出さず、1回あたりの金額だけを載せる（2026-09-29 の指示）。
              金額は公式の表記どおり（config.price.plans[].per）。変えるときは必ず顧客確認を取ること。 */}
          <section id="price" style={section("#FFFFFF")}>
            <Kicker>{c.price.kicker}</Kicker>
            <Heading text={c.price.heading} />
            <p style={{ margin: "22px 0 0", fontSize: 15.5, lineHeight: 2, color: BODY }}>
              {c.price.lead}
            </p>

            {/* 入会金（キャンペーンで0円） */}
            <div
              style={{
                marginTop: 26,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                background: BAND,
                borderRadius: 14,
                padding: "16px 18px",
                color: "#FFFFFF",
              }}
            >
              <div>
                <div style={{ fontSize: 17, fontWeight: 700 }}>{c.price.join.label}</div>
                <div style={{ marginTop: 3, fontSize: 12, opacity: 0.92 }}>{c.price.join.note}</div>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexShrink: 0 }}>
                <span style={{ fontSize: 14, textDecoration: "line-through", opacity: 0.85 }}>
                  {c.price.join.was}
                </span>
                <span style={{ fontFamily: MINCHO, fontSize: 34, fontWeight: 700, lineHeight: 1 }}>
                  {c.price.join.now}
                </span>
              </div>
            </div>

            {/* プラン表 */}
            <table
              style={{
                width: "100%",
                marginTop: 18,
                borderCollapse: "separate",
                borderSpacing: 0,
                background: "#FFFFFF",
                border: `1px solid ${LINE}`,
                borderRadius: 14,
                overflow: "hidden",
                tableLayout: "fixed",
              }}
            >
              <thead>
                <tr style={{ background: PALE }}>
                  <th
                    style={{
                      width: "54%",
                      padding: "11px 14px",
                      textAlign: "left",
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: PINK_INK,
                    }}
                  >
                    プラン
                  </th>
                  <th
                    style={{
                      padding: "11px 14px",
                      textAlign: "right",
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: PINK_INK,
                    }}
                  >
                    1回あたり（税込）
                  </th>
                </tr>
              </thead>
              <tbody>
                {c.price.plans.map((plan) => (
                  <tr key={plan.name}>
                    <td
                      style={{
                        padding: "16px 8px 16px 14px",
                        borderTop: `1px solid ${LINE}`,
                        verticalAlign: "top",
                      }}
                    >
                      {plan.badge && (
                        <span
                          style={{
                            display: "inline-block",
                            marginBottom: 5,
                            background: PINK_DEEP,
                            color: "#FFFFFF",
                            fontSize: 11.5,
                            fontWeight: 700,
                            padding: "2px 9px",
                            borderRadius: 999,
                          }}
                        >
                          {plan.badge}
                        </span>
                      )}
                      <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.45, color: INK }}>
                        {plan.name}
                      </div>
                      <div style={{ marginTop: 4, fontSize: 12.5, lineHeight: 1.6, color: BODY }}>
                        {plan.desc}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "16px 14px 16px 4px",
                        borderTop: `1px solid ${LINE}`,
                        borderLeft: `1px solid ${LINE}`,
                        textAlign: "right",
                        verticalAlign: "middle",
                      }}
                    >
                      {/* per は「1回あたり8,250円」の形。見出しに「1回あたり」があるので数字だけ出す。 */}
                      <div style={{ color: PINK_INK, fontWeight: 700, lineHeight: 1.1 }}>
                        <span style={{ fontFamily: MINCHO, fontSize: 28 }}>
                          {plan.per.replace(/^1回あたり/, "").replace(/円$/, "")}
                        </span>
                        <span style={{ fontSize: 14, marginLeft: 2 }}>円</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ul style={{ margin: "16px 0 0", padding: 0, listStyle: "none" }}>
              {c.price.notes.map((n) => (
                <li key={n} style={{ fontSize: 12.5, lineHeight: 1.85, color: BODY }}>
                  {n}
                </li>
              ))}
            </ul>
          </section>

          {/* ── 体験キャンペーン再掲（CTAは置かない） ── */}
          <section style={section(CREAM, "54px")}>
            <CampaignBlock mode="repeat" />
          </section>

          {/* ── パーソナルだから、できること ── */}
          <section style={{ ...section(CREAM), paddingTop: 10 }}>
            <Kicker>{c.personal.kicker}</Kicker>
            <Heading text={c.personal.heading} />
            {c.personal.photo && (
              <Photo slot={c.personal.photo} radius={16} style={{ width: "100%", height: 240, marginTop: 30 }} />
            )}
            <p style={{ margin: "22px 0 0", fontSize: 15.5, lineHeight: 2, color: BODY }}>
              {c.personal.lead}
            </p>
            <div
              style={{
                marginTop: 24,
                background: PALE,
                borderRadius: 16,
                padding: "22px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              {c.personal.items.map((item) => (
                <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                  <CheckIcon />
                  <div>
                    <p style={{ margin: 0, fontSize: 17, fontWeight: 700, lineHeight: 1.6, color: INK }}>
                      {item.title}
                    </p>
                    <p style={{ margin: "5px 0 0", fontSize: 14.5, lineHeight: 1.85, color: BODY }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 体験レッスンの流れ ＋ CTA 3/4 ── 出典: 公式店舗LP「体験予約の流れ」 */}
          <section style={section(PALE_GRAD)}>
            <Kicker>{c.flow.kicker}</Kicker>
            <Heading text={c.flow.heading} />
            <p
              style={{
                margin: "20px 0 0",
                fontSize: 15,
                lineHeight: 1.9,
                color: BODY,
              }}
            >
              {nl(c.flow.lead)}
            </p>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 32 }}>
              {c.flow.steps.map((step, i) => {
                const last = i === c.flow.steps.length - 1;
                return (
                  <div key={step.num} style={{ display: "flex", gap: 14 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
                      <span
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: "50%",
                          background: BAND,
                          color: "#FFFFFF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: MINCHO,
                          fontWeight: 700,
                          fontSize: 18,
                          flex: "none",
                        }}
                      >
                        {step.num}
                      </span>
                      {!last && <span style={{ width: 2, flex: 1, background: "#EBC9D3" }} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0, paddingBottom: last ? 0 : 30 }}>
                      <h3
                        style={{
                          margin: "9px 0 0",
                          fontSize: 18.5,
                          fontWeight: 700,
                          lineHeight: 1.5,
                          color: INK,
                        }}
                      >
                        {step.title}
                      </h3>
                      <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.9, color: BODY }}>
                        {step.body}
                      </p>
                      {step.img && (
                        <Photo slot={step.img} radius={12} style={{ width: "100%", aspectRatio: "3 / 2", marginTop: 12 }} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <Cta text={c.flow.ctaText} sub={c.flow.ctaSub} top={38} />
          </section>

          {/* ── はじめてでも大丈夫 ── 出典: 公式店舗LP・公式FAQ */}
          <section style={section(CREAM)}>
            <Kicker>{c.beginner.kicker}</Kicker>
            <Heading text={c.beginner.heading} />
            {c.beginner.photo && (
              <Photo slot={c.beginner.photo} radius={16} style={{ width: "100%", height: 240, marginTop: 30 }} />
            )}
            <p style={{ margin: "22px 0 0", fontSize: 15.5, lineHeight: 2, color: BODY }}>
              {c.beginner.lead}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
              {c.beginner.items.map((item) => (
                <div
                  key={item.title}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 9,
                    background: PALE,
                    borderRadius: 14,
                    padding: "16px 16px",
                  }}
                >
                  <CheckIcon />
                  <div>
                    <p style={{ margin: 0, fontSize: 16.5, fontWeight: 700, lineHeight: 1.6, color: INK }}>
                      {item.title}
                    </p>
                    <p style={{ margin: "5px 0 0", fontSize: 14.5, lineHeight: 1.85, color: BODY }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 店舗 ── 出典: 公式 /studios/（2026年9月時点・東京都内のみ） */}
          <section id="stores" style={section(PALE_GRAD)}>
            <Kicker>{c.studios.kicker}</Kicker>
            <Heading text={c.studios.heading} />
            <p
              style={{
                margin: "20px 0 0",
                textAlign: "center",
                fontSize: 15.5,
                lineHeight: 1.9,
                color: BODY,
              }}
            >
              {nl(c.studios.lead)}
            </p>
            <div
              style={{
                marginTop: 28,
                background: "#FFFFFF",
                borderRadius: 18,
                overflow: "hidden",
                boxShadow: "0 6px 16px rgba(120,80,92,0.10)",
              }}
            >
              <Photo slot={c.studios.photo} style={{ width: "100%", height: 250 }} />
              <div style={{ padding: "20px 18px 22px" }}>
                <div style={{ background: PALE, borderRadius: 12, padding: "6px 16px" }}>
                  {[
                    { label: "営業時間", value: c.studios.hours },
                    { label: "定休日", value: c.studios.holiday },
                  ].map((r, i) => (
                    <div
                      key={r.label}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 14,
                        padding: "10px 0",
                        borderTop: i === 0 ? "none" : `1px solid ${LINE}`,
                      }}
                    >
                      <span style={{ width: 64, flex: "none", fontSize: 13.5, color: BODY }}>{r.label}</span>
                      <span style={{ fontSize: 15.5, fontWeight: 700, color: PINK_INK }}>{r.value}</span>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    margin: "22px 0 0",
                    fontSize: 16,
                    fontWeight: 700,
                    color: PINK_INK,
                  }}
                >
                  <SakuraMark size={15} />
                  東京都
                  <span style={{ fontSize: 13, fontWeight: 500, color: BODY }}>
                    {c.studios.names.length}店舗
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    columnGap: 14,
                    marginTop: 8,
                  }}
                >
                  {c.studios.names.map((n) => (
                    <div
                      key={n}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                        padding: "10px 0",
                        borderBottom: `1px solid ${LINE}`,
                        fontSize: 15,
                        color: INK,
                      }}
                    >
                      <span style={{ width: 5, height: 5, borderRadius: 999, background: PINK, flex: "none" }} />
                      {n}
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: 20,
                    background: PALE,
                    border: `1px dashed ${PINK}`,
                    borderRadius: 12,
                    padding: "14px 14px",
                  }}
                >
                  <p style={{ margin: 0, fontSize: 14.5, fontWeight: 700, color: PINK_INK }}>
                    {c.studios.upcoming.label}
                  </p>
                  <ul style={{ margin: "8px 0 0", padding: 0, listStyle: "none" }}>
                    {c.studios.upcoming.names.map((n) => (
                      <li key={n} style={{ fontSize: 15, lineHeight: 1.9, color: INK }}>
                        ・{n}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ── FAQ ── 出典: 公式 /faq/ */}
          <section style={section(BAND)}>
            <Kicker color="#FFFFFF">{c.faq.kicker}</Kicker>
            <Heading text={c.faq.heading} color="#FFFFFF" />
            <div style={{ marginTop: 28 }}>
              <FaqAccordion items={c.faq.items} accent={PINK_DEEP} ink={INK} body={BODY} line={LINE} />
            </div>
          </section>

          {/* ── クロージング ＋ CTA 4/4 ── */}
          <section id="reserve" style={section(CREAM, "60px")}>
            <Heading text={c.closing.heading} size={20} />
            <p
              style={{
                margin: "22px 0 0",
                textAlign: "center",
                fontFamily: MINCHO,
                fontWeight: 600,
                fontSize: 18,
                lineHeight: 1.85,
                letterSpacing: "0.03em",
                color: INK,
              }}
            >
              {nl(c.closing.lead)}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 8,
                marginTop: 20,
              }}
            >
              {c.closing.chips.map((chip) => (
                <span
                  key={chip}
                  style={{
                    fontSize: 13.5,
                    fontWeight: 700,
                    color: PINK_INK,
                    background: PALE,
                    border: `1px solid ${LINE}`,
                    borderRadius: 999,
                    padding: "6px 13px",
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 30 }}>
              <CampaignBlock mode="compact" />
            </div>
            <Cta text={c.closing.ctaText} sub={c.closing.ctaSub} />
          </section>

          {/* ── 最終CTA・予約フォーム（一旦非表示） ──
              予約はSAKURA公式の予約サイト（hacomono）で受ける方針のため非表示
              （2026-09-07）。SHOW_FORM を true に戻せばそのまま復帰する。
              その場合は各CTAの href を "#form" に戻すこと。 */}
          {SHOW_FORM && (
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
          )}

          <footer
            style={{
              padding: "24px 18px 28px",
              background: "#FFFFFF",
              borderTop: `1px solid ${LINE}`,
              textAlign: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
              <SakuraMark size={16} />
              <span
                style={{
                  fontFamily: MINCHO,
                  fontSize: 17,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: INK,
                }}
              >
                {c.header.brand}
              </span>
            </div>
            <p style={{ margin: "8px 0 0", fontSize: 11.5, color: BODY }}>{c.header.brandSub}</p>
            <p style={{ margin: "12px 0 0", fontSize: 11, color: MUTED }}>
              © {new Date().getFullYear()} SAKURA
            </p>
          </footer>
        </LPCanvas>
      </div>

      <StickyFooterCTA
        href={c.reserve.url}
        buttonText={c.sticky.buttonText}
        showAfter={520}
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
