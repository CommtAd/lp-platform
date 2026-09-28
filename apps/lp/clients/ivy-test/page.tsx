import type { CSSProperties, ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPCanvas from "@/components/LPCanvas";
import LPForm from "@/components/LPForm";
import ImageSlot from "@/components/ImageSlot";
import StickyFooterCTA from "@/components/StickyFooterCTA";
import HeroVideo from "./HeroVideo";
import FaqList from "./FaqList";
import config from "./config";

/**
 * STUDIO IVY 藤沢店 — Meta広告専用LP（指示書の17セクション構成）。
 *
 * 守っているルール:
 *   1. 幅390pxの1枚のキャンバス（`<LPCanvas>`）。中で `vw` / `vh` は使わない
 *      （CLAUDE.md §16-17）。キャンバス外の地色を敷く `100vh` だけが例外。
 *   2. 本文中の予約CTAは4箇所だけ（⑥体験キャンペーン・⑩選ばれる理由・
 *      ⑬体験の流れ・⑰クロージング）＋下部の追従CTA。文言はすべて
 *      「無料体験を予約する」で統一し、CTAの近くに必ず「通常4,500円 → 初回0円」を置く。
 *   3. 配色はブランドの青系4色のみ。ゴールド・ピンク等を装飾目的で足さない。
 *   4. FVは動画だが、**静止画を先に描画して動画を後から重ねる**（`HeroVideo`）。
 *      中盤以降は静止画のみ。動画の埋め込みはFVの1本だけ。
 *   5. 効果を断定する表現は置かない。「目指す」「サポート」で止める（指示書 §21）。
 *
 * PC用の2カラムは作らない。スマホ1カラムのまま中央に置く（指示書 §07）。
 */

const c = config;

/* ── 配色 ────────────────────────────────────────────────────────
   公式サイト（pilates-ivy.jp）の実測値から。詳細は config.ts の冒頭コメント。 */
const ACCENT = "#3C7EA6"; // メイン。見出し・帯・濃色地。白地 4.6:1
const BRAND = "#4E94BF"; // ブランドブルーそのまま。罫・アイコン・装飾のみ
const DEEP = "#2F6B8F"; // 中間トーン。価格・数字・CTAの最濃部。白地 6.0:1
const BASE = "#FDFDFC"; // 基本の地（ほぼ白）
const PALE = "#F3F7FA"; // 淡色の地
const PALE_DEEP = "#E7F0F6";
const SOFT = "rgba(78,148,191,0.16)"; // 淡い枠・チップの地
const INK = "#3E4850";
const INK_SOFT = "#6B757D";
const INK_MUTE = "#9AA4AC";

/** CTA専用色。ページ内で最もコントラストが高い要素にするため最も濃い。 */
const CTA_GRAD = `linear-gradient(135deg, ${ACCENT} 0%, #27577A 100%)`;
const CTA_SHADOW = "rgba(39,87,122,0.34)";

const MINCHO = "'Shippori Mincho', serif";
const GOTHIC = "'Zen Kaku Gothic New', sans-serif";
const BODY = "'Noto Sans JP', sans-serif";

/** 左右の余白。全セクション共通。 */
const PAD = 22;

/** "\n" を <br> にする。改行位置は config 側で組版ルールに沿って決めている。 */
function nl(text: string): ReactNode {
  const parts = text.split("\n");
  return parts.map((p, i) => (
    <span key={i}>
      {p}
      {i < parts.length - 1 && <br />}
    </span>
  ));
}

/* ── 共通パーツ ───────────────────────────────────────────────── */

function Section({
  children,
  background,
  style,
  id,
}: {
  children: ReactNode;
  background?: string;
  style?: CSSProperties;
  id?: string;
}) {
  return (
    <section
      id={id}
      style={{ background, padding: `44px ${PAD}px 46px`, ...style }}
    >
      {children}
    </section>
  );
}

/** セクション見出し。明朝＋下に短い罫。濃色地では白抜きにする。 */
function Heading({
  text,
  variant = "accent",
  size = 23,
  align = "center",
}: {
  text: string;
  variant?: "accent" | "white";
  size?: number;
  align?: "center" | "left";
}) {
  const color = variant === "white" ? "#FFFFFF" : ACCENT;
  const rule = variant === "white" ? "rgba(255,255,255,0.55)" : BRAND;
  return (
    <div style={{ textAlign: align }}>
      <h2
        style={{
          margin: 0,
          fontFamily: MINCHO,
          fontWeight: 600,
          fontSize: size,
          lineHeight: 1.62,
          letterSpacing: "0.04em",
          color,
        }}
      >
        {nl(text)}
      </h2>
      <div
        style={{
          width: 28,
          height: 2,
          borderRadius: 2,
          background: rule,
          margin: align === "center" ? "13px auto 0" : "13px 0 0",
        }}
      />
    </div>
  );
}

const CheckIcon = ({ color = BRAND, size = 15 }: { color?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flex: "none", marginTop: 3 }}
  >
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

/** 下向き矢印。二重価格の「通常 → 0円」の間に置く。 */
const DownArrow = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4.5v14M5.5 12.5L12 19l6.5-6.5" />
  </svg>
);

/**
 * 予約CTA。本文中は4箇所だけ。文言は config で統一し、ボタンの下に
 * 「通常4,500円 → 初回0円」を1行だけ添える（指示書 §15）。
 */
function Cta({ variant = "light" }: { variant?: "light" | "dark" }) {
  const noteColor = variant === "dark" ? "rgba(255,255,255,0.86)" : INK_SOFT;
  return (
    <div style={{ marginTop: 26 }}>
      <a
        href={c.cta.anchor}
        style={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 9,
          height: 58,
          borderRadius: 999,
          background: variant === "dark" ? "#FFFFFF" : CTA_GRAD,
          color: variant === "dark" ? DEEP : "#FFFFFF",
          textDecoration: "none",
          fontFamily: GOTHIC,
          fontSize: 16.5,
          fontWeight: 800,
          letterSpacing: "0.06em",
          boxShadow:
            variant === "dark"
              ? "0 8px 20px rgba(20,50,70,0.28)"
              : `0 8px 20px ${CTA_SHADOW}`,
        }}
      >
        <span style={{ position: "relative", zIndex: 1 }}>{c.cta.label}</span>
        <span
          style={{
            position: "relative",
            zIndex: 1,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 23,
            height: 23,
            borderRadius: "50%",
            background:
              variant === "dark" ? "rgba(47,107,143,0.14)" : "rgba(255,255,255,0.24)",
            fontSize: 13,
          }}
        >
          →
        </span>
      </a>
      <p
        style={{
          margin: "11px 0 0",
          textAlign: "center",
          fontFamily: BODY,
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.02em",
          color: noteColor,
        }}
      >
        {c.cta.note}
      </p>
    </div>
  );
}

/** 淡色の丸チップ。FV直下・クロージングで使う。 */
function Chip({ text, variant = "light" }: { text: string; variant?: "light" | "dark" }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "7px 13px",
        borderRadius: 999,
        background: variant === "dark" ? "rgba(255,255,255,0.14)" : "#FFFFFF",
        border:
          variant === "dark" ? "1px solid rgba(255,255,255,0.4)" : `1px solid ${SOFT}`,
        fontFamily: GOTHIC,
        fontSize: 12.5,
        fontWeight: 700,
        letterSpacing: "0.02em",
        color: variant === "dark" ? "#FFFFFF" : DEEP,
      }}
    >
      {text}
    </span>
  );
}

/**
 * 二重価格プレート（通常4,500円 → 0円）。白プレートに置き、「0」を特大にする。
 * ⑥体験キャンペーンと⑰クロージングで共用する。
 */
function CampaignPlate() {
  const cp = c.campaign;
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 20,
        border: `1px solid ${SOFT}`,
        boxShadow: "0 8px 24px rgba(40,80,110,0.12)",
        padding: "22px 18px 24px",
        textAlign: "center",
      }}
    >
      <span
        style={{
          display: "inline-block",
          padding: "5px 14px",
          borderRadius: 999,
          background: ACCENT,
          color: "#FFFFFF",
          fontFamily: GOTHIC,
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: "0.08em",
        }}
      >
        {cp.label}
      </span>

      <p
        style={{
          margin: "16px 0 0",
          fontFamily: GOTHIC,
          fontSize: 15,
          fontWeight: 700,
          color: INK_MUTE,
          letterSpacing: "0.02em",
        }}
      >
        {cp.wasLabel}
        <span style={{ textDecoration: "line-through", marginLeft: 6 }}>{cp.was}</span>
      </p>

      <div style={{ display: "flex", justifyContent: "center", margin: "8px 0 4px" }}>
        <DownArrow color={BRAND} />
      </div>

      <p
        style={{
          margin: 0,
          fontFamily: GOTHIC,
          fontSize: 16,
          fontWeight: 800,
          letterSpacing: "0.1em",
          color: DEEP,
        }}
      >
        {cp.nowLabel}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          gap: 2,
          marginTop: 2,
        }}
      >
        <span
          style={{
            fontFamily: GOTHIC,
            // §17 の「料金・0円など 40〜58px」の上限。FVの0（46px）と
            // 料金プランの28,000（40px）より大きく、ページ内で最大になる。
            fontSize: 58,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: DEEP,
          }}
        >
          {cp.now}
        </span>
        <span
          style={{
            fontFamily: GOTHIC,
            fontSize: 23,
            fontWeight: 800,
            color: DEEP,
          }}
        >
          {cp.nowUnit}
        </span>
      </div>
      <p
        style={{
          margin: "12px 0 0",
          fontFamily: BODY,
          fontSize: 11.5,
          lineHeight: 1.8,
          color: INK_SOFT,
        }}
      >
        {cp.note}
      </p>
    </div>
  );
}

/* ── ページ ──────────────────────────────────────────────────── */

export default function Page() {
  return (
    <LPShell clientSlug={c.slug} fallback={{ name: "STUDIO IVY 藤沢店", status: c.status }}>
      {/* キャンバスの外側。地色を画面いっぱいに敷くためのビューポート高さは、
          キャンバス外なので拡大縮小の影響を受けない唯一の例外（CLAUDE.md §17）。 */}
      <div style={{ background: PALE_DEEP, minHeight: "100vh" }}>
        <LPCanvas background={BASE} boxShadow="0 0 40px rgba(40,80,110,0.10)">
          {/* ─ ① ヘッダー ───────────────────────────────── */}
          <header
            style={{
              background: "#FFFFFF",
              padding: "13px 20px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 11,
              borderBottom: `1px solid ${PALE_DEEP}`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.header.logo.src ?? ""}
              alt="STUDIO IVY"
              style={{ width: 126, height: "auto", display: "block" }}
            />
            <span
              style={{
                paddingLeft: 11,
                borderLeft: `1px solid ${PALE_DEEP}`,
                fontFamily: GOTHIC,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: INK,
              }}
            >
              {c.header.store}
            </span>
          </header>

          {/* ─ ② オファーバー ─────────────────────────────── */}
          <div
            style={{
              background: ACCENT,
              padding: "9px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 9,
            }}
          >
            {c.offerBar.badge && (
              <span
                style={{
                  flex: "none",
                  padding: "3px 9px",
                  borderRadius: 999,
                  background: "#FFFFFF",
                  color: ACCENT,
                  fontFamily: GOTHIC,
                  fontSize: 10.5,
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                }}
              >
                {c.offerBar.badge}
              </span>
            )}
            <span
              style={{
                fontFamily: GOTHIC,
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: "0.03em",
                color: "#FFFFFF",
              }}
            >
              {c.offerBar.lead}
            </span>
            <span
              style={{
                fontFamily: GOTHIC,
                fontSize: 11.5,
                fontWeight: 500,
                color: "rgba(255,255,255,0.78)",
                textDecoration: "line-through",
              }}
            >
              {c.offerBar.was}
            </span>
            <span
              style={{
                fontFamily: GOTHIC,
                fontSize: 17,
                fontWeight: 800,
                letterSpacing: "0.02em",
                color: "#FFFFFF",
              }}
            >
              {c.offerBar.now}
            </span>
          </div>

          {/* ─ ③ 特徴バー ─────────────────────────────────── */}
          <div
            style={{
              background: PALE,
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            {c.featureBar.map((f, i) => (
              <span key={f} style={{ display: "contents" }}>
                {i > 0 && (
                  <span style={{ width: 1, height: 13, background: SOFT }} />
                )}
                <span
                  style={{
                    fontFamily: GOTHIC,
                    fontSize: 12.5,
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    color: DEEP,
                  }}
                >
                  {f}
                </span>
              </span>
            ))}
          </div>

          {/* ─ ④ FV ───────────────────────────────────────── */}
          <div style={{ position: "relative", height: 528, overflow: "hidden" }}>
            <HeroVideo
              src={c.fv.video}
              poster={c.fv.poster}
              alt="STUDIO IVY 藤沢店のマンツーマンレッスンの様子"
            />
            {/* 文字の可読性のための暗幕。暗くしすぎない（指示書 §12）。 */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(20,45,62,0.34) 0%, rgba(20,45,62,0.16) 32%, rgba(18,42,58,0.62) 74%, rgba(16,38,54,0.82) 100%)",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: `0 ${PAD}px 20px`,
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontFamily: MINCHO,
                  fontWeight: 600,
                  // 2行目「パーソナルピラティスを、」が12字。390px幅から左右の
                  // 余白を引いた 346px に3行とも収まるよう 27px に決めている
                  // （30pxだと2行目だけ折り返し、「を、」が単独行に落ちる）。
                  fontSize: 27,
                  lineHeight: 1.58,
                  letterSpacing: "0.005em",
                  color: "#FFFFFF",
                  textShadow: "0 2px 14px rgba(10,30,45,0.5)",
                }}
              >
                {nl(c.fv.catch)}
              </h1>

              {/* 価格・立地。FVに載せる情報はここまでに絞る。 */}
              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  alignItems: "baseline",
                  gap: 7,
                }}
              >
                <span
                  style={{
                    fontFamily: GOTHIC,
                    fontSize: 38,
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: "-0.01em",
                    color: "#FFFFFF",
                    textShadow: "0 2px 12px rgba(10,30,45,0.45)",
                  }}
                >
                  {c.fv.facts.price}
                </span>
                <span
                  style={{
                    fontFamily: GOTHIC,
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#FFFFFF",
                  }}
                >
                  {c.fv.facts.priceUnit}
                </span>
              </div>
              <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
                <Chip text={c.fv.facts.style} variant="dark" />
                <Chip text={c.fv.facts.access} variant="dark" />
              </div>

              {/* キャンペーン。FVでは横1行に収め、詳細は⑥に預ける。 */}
              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "11px 14px",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.94)",
                  boxShadow: "0 6px 18px rgba(10,30,45,0.28)",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: GOTHIC,
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: "0.04em",
                      color: DEEP,
                    }}
                  >
                    {c.fv.campaign.label}
                  </p>
                  <p
                    style={{
                      margin: "2px 0 0",
                      fontFamily: GOTHIC,
                      fontSize: 12,
                      fontWeight: 500,
                      color: INK_MUTE,
                      textDecoration: "line-through",
                    }}
                  >
                    {c.fv.campaign.was}
                  </p>
                </div>
                <DownArrow color={BRAND} />
                <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                  <span
                    style={{
                      fontFamily: GOTHIC,
                      fontSize: 46,
                      fontWeight: 800,
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      color: DEEP,
                    }}
                  >
                    {c.fv.campaign.now}
                  </span>
                  <span
                    style={{
                      fontFamily: GOTHIC,
                      fontSize: 19,
                      fontWeight: 800,
                      color: DEEP,
                    }}
                  >
                    {c.fv.campaign.nowUnit}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ─ ⑤ FV直下 ───────────────────────────────────── */}
          <Section background={BASE}>
            <Heading text={c.intro.heading} size={22} />
            <p
              style={{
                margin: "18px 0 0",
                textAlign: "center",
                fontFamily: BODY,
                fontSize: 14,
                lineHeight: 2.05,
                color: INK_SOFT,
              }}
            >
              {nl(c.intro.body)}
            </p>
            {/* 4つのチップは2列グリッドで組む。flex-wrap だと幅の都合で
                3＋1になり、最後の1つだけが浮いて見える。 */}
            <div
              style={{
                marginTop: 20,
                display: "grid",
                gridTemplateColumns: "repeat(2, max-content)",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {c.intro.chips.map((t) => (
                <Chip key={t} text={t} />
              ))}
            </div>
          </Section>

          {/* ─ ⑥ 体験キャンペーン（CTA 1/4）───────────────── */}
          <Section background={PALE}>
            <Heading text={c.campaign.heading} size={21} />
            <p
              style={{
                margin: "17px 0 22px",
                textAlign: "center",
                fontFamily: BODY,
                fontSize: 13.5,
                lineHeight: 2,
                color: INK_SOFT,
              }}
            >
              {nl(c.campaign.lead)}
            </p>
            <CampaignPlate />
            <Cta />
          </Section>

          {/* ─ ⑦ お悩み ───────────────────────────────────── */}
          <Section background={BASE}>
            <Heading text={c.worry.heading} size={22} />
            <ul
              style={{
                listStyle: "none",
                margin: "22px 0 0",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {c.worry.items.map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    gap: 10,
                    padding: "13px 15px",
                    borderRadius: 12,
                    background: PALE,
                    fontFamily: BODY,
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: INK,
                  }}
                >
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p
              style={{
                margin: "24px 0 0",
                textAlign: "center",
                fontFamily: MINCHO,
                fontWeight: 600,
                fontSize: 18.5,
                lineHeight: 1.75,
                letterSpacing: "0.03em",
                color: ACCENT,
              }}
            >
              {nl(c.worry.closing)}
            </p>
          </Section>

          {/* ─ ⑧ STUDIO IVYなら ───────────────────────────── */}
          <Section background={PALE}>
            <Heading text={c.points.heading} size={22} />
            <div
              style={{
                marginTop: 24,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {c.points.items.map((item) => (
                <div
                  key={item.num}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 16,
                    border: `1px solid ${SOFT}`,
                    overflow: "hidden",
                    boxShadow: "0 3px 12px rgba(40,80,110,0.07)",
                  }}
                >
                  {item.img && (
                    <ImageSlot
                      src={item.img.src}
                      alt={item.img.placeholder}
                      placeholder={item.img.placeholder}
                      objectPosition={item.img.position ?? "center"}
                      style={{ aspectRatio: "4 / 3" }}
                    />
                  )}
                  <div style={{ padding: "16px 17px 18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <span
                        style={{
                          fontFamily: GOTHIC,
                          fontSize: 12,
                          fontWeight: 800,
                          letterSpacing: "0.1em",
                          color: BRAND,
                        }}
                      >
                        {item.num}
                      </span>
                      <span style={{ width: 16, height: 1, background: SOFT }} />
                      <h3
                        style={{
                          margin: 0,
                          fontFamily: GOTHIC,
                          fontSize: 17,
                          fontWeight: 800,
                          letterSpacing: "0.02em",
                          color: DEEP,
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p
                      style={{
                        margin: "9px 0 0",
                        fontFamily: BODY,
                        fontSize: 13.5,
                        lineHeight: 1.92,
                        color: INK_SOFT,
                      }}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ─ ⑨ 目指せる未来 ─────────────────────────────── */}
          <Section background={BASE}>
            <Heading text={c.future.heading} size={22} />
            <ImageSlot
              src={c.future.img.src}
              alt={c.future.img.placeholder}
              placeholder={c.future.img.placeholder}
              objectPosition={c.future.img.position ?? "center"}
              radius={16}
              style={{ aspectRatio: "3 / 2", marginTop: 22 }}
            />
            <div
              style={{
                marginTop: 16,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {c.future.items.map((item) => (
                <div
                  key={item.num}
                  style={{
                    padding: "15px 13px 16px",
                    borderRadius: 14,
                    background: PALE,
                    border: `1px solid ${SOFT}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: GOTHIC,
                      fontSize: 11.5,
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      color: BRAND,
                    }}
                  >
                    {item.num}
                  </span>
                  <p
                    style={{
                      margin: "6px 0 0",
                      fontFamily: GOTHIC,
                      fontSize: 14,
                      fontWeight: 700,
                      lineHeight: 1.62,
                      color: INK,
                    }}
                  >
                    {nl(item.title)}
                  </p>
                </div>
              ))}
            </div>
            <p
              style={{
                margin: "16px 0 0",
                fontFamily: BODY,
                fontSize: 11.5,
                lineHeight: 1.8,
                color: INK_MUTE,
              }}
            >
              {c.future.note}
            </p>
          </Section>

          {/* ─ ⑩ 選ばれる理由（CTA 2/4）───────────────────── */}
          <Section background={PALE}>
            <Heading text={c.reasons.heading} size={22} />
            <div
              style={{
                marginTop: 24,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {c.reasons.items.map((item) => (
                <div
                  key={item.num}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 16,
                    border: `1px solid ${SOFT}`,
                    overflow: "hidden",
                    boxShadow: "0 3px 12px rgba(40,80,110,0.07)",
                  }}
                >
                  {item.img && (
                    <ImageSlot
                      src={item.img.src}
                      alt={item.img.placeholder}
                      placeholder={item.img.placeholder}
                      objectPosition={item.img.position ?? "center"}
                      style={{ aspectRatio: "16 / 10" }}
                    />
                  )}
                  <div style={{ padding: "16px 17px 18px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "3px 10px",
                        borderRadius: 999,
                        background: PALE,
                        fontFamily: GOTHIC,
                        fontSize: 10.5,
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        color: BRAND,
                      }}
                    >
                      REASON {item.num}
                    </span>
                    <h3
                      style={{
                        margin: "10px 0 0",
                        fontFamily: GOTHIC,
                        fontSize: 17.5,
                        fontWeight: 800,
                        lineHeight: 1.55,
                        letterSpacing: "0.02em",
                        color: DEEP,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        margin: "9px 0 0",
                        fontFamily: BODY,
                        fontSize: 13.5,
                        lineHeight: 1.92,
                        color: INK_SOFT,
                      }}
                    >
                      {item.body}
                    </p>

                    {/* 03だけ価格を大きく見せる（指示書 §10）。 */}
                    {item.price && (
                      <div
                        style={{
                          marginTop: 14,
                          padding: "14px 16px",
                          borderRadius: 14,
                          background: PALE,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <span style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
                        <span
                          style={{
                            fontFamily: GOTHIC,
                            fontSize: 44,
                            fontWeight: 800,
                            lineHeight: 1,
                            letterSpacing: "-0.02em",
                            color: DEEP,
                          }}
                        >
                          {item.price.value}
                        </span>
                        <span
                          style={{
                            fontFamily: GOTHIC,
                            fontSize: 19,
                            fontWeight: 800,
                            color: DEEP,
                          }}
                        >
                          {item.price.unit}
                        </span>
                        </span>
                        {/* キャプションは数字と同じ行に置くと幅が足りず折り返すので、
                            数字の下に1行で置く。 */}
                        <span
                          style={{
                            fontFamily: BODY,
                            fontSize: 11.5,
                            color: INK_SOFT,
                          }}
                        >
                          {item.price.caption}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Cta />
          </Section>

          {/* ─ ⑪ 料金プラン ───────────────────────────────── */}
          <Section background={BASE}>
            <Heading text={c.price.heading} size={22} />
            <p
              style={{
                margin: "17px 0 0",
                textAlign: "center",
                fontFamily: BODY,
                fontSize: 13.5,
                lineHeight: 1.95,
                color: INK_SOFT,
              }}
            >
              {c.price.lead}
            </p>
            <div
              style={{
                marginTop: 22,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {c.price.plans.map((p) => (
                <div
                  key={p.name}
                  style={{
                    position: "relative",
                    borderRadius: 16,
                    padding: p.featured ? "22px 18px 20px" : "16px 18px",
                    background: p.featured ? PALE : "#FFFFFF",
                    border: p.featured
                      ? `2px solid ${ACCENT}`
                      : `1px solid ${PALE_DEEP}`,
                    boxShadow: p.featured
                      ? "0 8px 22px rgba(40,80,110,0.14)"
                      : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 9,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: GOTHIC,
                        fontSize: p.featured ? 14 : 12.5,
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        color: p.featured ? ACCENT : INK_MUTE,
                      }}
                    >
                      {p.name}
                    </span>
                    <span
                      style={{
                        fontFamily: GOTHIC,
                        fontSize: p.featured ? 16 : 14,
                        fontWeight: 700,
                        color: INK,
                      }}
                    >
                      {p.freq}
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: p.featured ? 10 : 6,
                      display: "flex",
                      alignItems: "baseline",
                      gap: 3,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: GOTHIC,
                        fontSize: p.featured ? 40 : 27,
                        fontWeight: 800,
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                        color: p.featured ? DEEP : INK,
                      }}
                    >
                      {p.monthly}
                    </span>
                    <span
                      style={{
                        fontFamily: GOTHIC,
                        fontSize: p.featured ? 17 : 14,
                        fontWeight: 800,
                        color: p.featured ? DEEP : INK,
                      }}
                    >
                      円
                    </span>
                    <span
                      style={{
                        marginLeft: 4,
                        fontFamily: BODY,
                        fontSize: 11.5,
                        color: INK_MUTE,
                      }}
                    >
                      / 月（税込）
                    </span>
                  </div>

                  {/* 1回あたりを主訴求にする（指示書 §05）。 */}
                  <div
                    style={{
                      marginTop: p.featured ? 12 : 8,
                      display: "flex",
                      alignItems: "baseline",
                      gap: 7,
                      padding: p.featured ? "11px 14px" : "8px 12px",
                      borderRadius: 11,
                      background: p.featured ? "#FFFFFF" : PALE,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: GOTHIC,
                        fontSize: 11.5,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        color: INK_SOFT,
                      }}
                    >
                      1回あたり
                    </span>
                    <span
                      style={{
                        fontFamily: GOTHIC,
                        fontSize: p.featured ? 30 : 21,
                        fontWeight: 800,
                        lineHeight: 1,
                        letterSpacing: "-0.01em",
                        color: DEEP,
                      }}
                    >
                      {p.per}
                    </span>
                    <span
                      style={{
                        fontFamily: GOTHIC,
                        fontSize: p.featured ? 15 : 13,
                        fontWeight: 800,
                        color: DEEP,
                      }}
                    >
                      円
                    </span>
                  </div>

                  <p
                    style={{
                      margin: "10px 0 0",
                      fontFamily: BODY,
                      fontSize: 12.5,
                      lineHeight: 1.75,
                      color: INK_SOFT,
                    }}
                  >
                    {p.note}
                  </p>
                </div>
              ))}
            </div>
            <p
              style={{
                margin: "14px 0 0",
                fontFamily: BODY,
                fontSize: 11.5,
                color: INK_MUTE,
              }}
            >
              {c.price.note}
            </p>
          </Section>

          {/* ─ ⑫ グループレッスンとの違い ─────────────────── */}
          <Section background={PALE}>
            <Heading text={c.compare.heading} size={21} />
            <div
              style={{
                marginTop: 24,
                display: "flex",
                flexDirection: "column",
                gap: 11,
              }}
            >
              <div
                style={{
                  padding: "16px 17px",
                  borderRadius: 14,
                  background: "#FFFFFF",
                  border: `1px solid ${PALE_DEEP}`,
                }}
              >
                <span
                  style={{
                    fontFamily: GOTHIC,
                    fontSize: 13.5,
                    fontWeight: 800,
                    letterSpacing: "0.04em",
                    color: INK_MUTE,
                  }}
                >
                  {c.compare.group.label}
                </span>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontFamily: BODY,
                    fontSize: 13.5,
                    lineHeight: 1.92,
                    color: INK_SOFT,
                  }}
                >
                  {c.compare.group.body}
                </p>
              </div>

              <div
                style={{
                  padding: "18px 17px 19px",
                  borderRadius: 14,
                  background: ACCENT,
                  boxShadow: "0 6px 18px rgba(40,80,110,0.2)",
                }}
              >
                <span
                  style={{
                    fontFamily: GOTHIC,
                    fontSize: 14.5,
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    color: "#FFFFFF",
                  }}
                >
                  {c.compare.ivy.label}
                </span>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontFamily: BODY,
                    fontSize: 13.5,
                    lineHeight: 1.92,
                    color: "rgba(255,255,255,0.94)",
                  }}
                >
                  {c.compare.ivy.body}
                </p>
              </div>
            </div>
            <p
              style={{
                margin: "24px 0 0",
                textAlign: "center",
                fontFamily: MINCHO,
                fontWeight: 600,
                fontSize: 18,
                lineHeight: 1.78,
                letterSpacing: "0.02em",
                color: ACCENT,
              }}
            >
              {nl(c.compare.closing)}
            </p>
          </Section>

          {/* ─ ⑬ 体験レッスンの流れ（CTA 3/4）─────────────── */}
          <Section background={BASE}>
            <Heading text={c.flow.heading} size={22} />
            <div
              style={{
                marginTop: 24,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {c.flow.steps.map((step, i) => (
                <div key={step.num} style={{ position: "relative" }}>
                  <div
                    style={{
                      borderRadius: 14,
                      border: `1px solid ${SOFT}`,
                      background: "#FFFFFF",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ padding: "15px 16px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span
                          style={{
                            flex: "none",
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            background: ACCENT,
                            color: "#FFFFFF",
                            fontFamily: GOTHIC,
                            fontSize: 12.5,
                            fontWeight: 800,
                            lineHeight: "30px",
                            textAlign: "center",
                          }}
                        >
                          {step.num}
                        </span>
                        <h3
                          style={{
                            margin: 0,
                            fontFamily: GOTHIC,
                            fontSize: 16.5,
                            fontWeight: 800,
                            letterSpacing: "0.02em",
                            color: DEEP,
                          }}
                        >
                          {step.title}
                        </h3>
                      </div>
                      <p
                        style={{
                          margin: "9px 0 0",
                          fontFamily: BODY,
                          fontSize: 13.5,
                          lineHeight: 1.92,
                          color: INK_SOFT,
                        }}
                      >
                        {step.body}
                      </p>
                    </div>
                    {step.img && (
                      <ImageSlot
                        src={step.img.src}
                        alt={step.img.placeholder}
                        placeholder={step.img.placeholder}
                        objectPosition={step.img.position ?? "center"}
                        style={{ aspectRatio: "16 / 10" }}
                      />
                    )}
                  </div>
                  {i < c.flow.steps.length - 1 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 4,
                      }}
                    >
                      <DownArrow color={SOFT} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Cta />
          </Section>

          {/* ─ ⑭ 初めてでも大丈夫 ─────────────────────────── */}
          <Section background={PALE}>
            <Heading text={c.beginner.heading} size={22} />
            <div
              style={{
                marginTop: 22,
                padding: "18px 17px 20px",
                borderRadius: 16,
                background: "#FFFFFF",
                border: `1px solid ${SOFT}`,
              }}
            >
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 11,
                }}
              >
                {c.beginner.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      gap: 10,
                      fontFamily: BODY,
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: INK,
                    }}
                  >
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p
              style={{
                margin: "22px 0 0",
                textAlign: "center",
                fontFamily: BODY,
                fontSize: 13.5,
                lineHeight: 2,
                color: INK_SOFT,
              }}
            >
              {nl(c.beginner.closing)}
            </p>
          </Section>

          {/* ─ ⑮ 店舗情報 ─────────────────────────────────── */}
          <Section background={BASE}>
            <Heading text={c.store.heading} size={22} />

            <ImageSlot
              src={c.store.img.src}
              alt={c.store.img.placeholder}
              placeholder={c.store.img.placeholder}
              objectPosition={c.store.img.position ?? "center"}
              radius={16}
              style={{ aspectRatio: "16 / 10", marginTop: 22 }}
            />

            <h3
              style={{
                margin: "18px 0 0",
                textAlign: "center",
                fontFamily: MINCHO,
                fontWeight: 600,
                fontSize: 19,
                letterSpacing: "0.04em",
                color: ACCENT,
              }}
            >
              {c.store.name}
            </h3>
            <p
              style={{
                margin: "7px 0 0",
                textAlign: "center",
                fontFamily: GOTHIC,
                fontSize: 13.5,
                fontWeight: 700,
                color: DEEP,
              }}
            >
              {c.store.access}
            </p>

            <dl
              style={{
                margin: "18px 0 0",
                padding: "4px 0",
                borderTop: `1px solid ${PALE_DEEP}`,
                fontFamily: BODY,
              }}
            >
              {[
                { k: "住所", v: c.store.address },
                { k: "営業時間", v: c.store.hours },
                { k: "レッスン", v: c.store.lesson },
              ].map((row) => (
                <div
                  key={row.k}
                  style={{
                    display: "flex",
                    gap: 14,
                    padding: "13px 2px",
                    borderBottom: `1px solid ${PALE_DEEP}`,
                  }}
                >
                  <dt
                    style={{
                      flex: "none",
                      width: 64,
                      fontFamily: GOTHIC,
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: INK_MUTE,
                      lineHeight: 1.9,
                    }}
                  >
                    {row.k}
                  </dt>
                  <dd
                    style={{
                      margin: 0,
                      fontSize: 13.5,
                      lineHeight: 1.9,
                      color: INK,
                    }}
                  >
                    {nl(row.v)}
                  </dd>
                </div>
              ))}
            </dl>

            <p
              style={{
                margin: "12px 0 0",
                fontFamily: BODY,
                fontSize: 11.5,
                lineHeight: 1.8,
                color: INK_MUTE,
              }}
            >
              {c.store.note}
            </p>

            <div
              style={{
                marginTop: 16,
                borderRadius: 14,
                overflow: "hidden",
                border: `1px solid ${PALE_DEEP}`,
                height: 210,
              }}
            >
              <iframe
                src={c.store.mapEmbedSrc}
                title={`${c.store.name}の地図`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ width: "100%", height: "100%", border: 0, display: "block" }}
              />
            </div>

            <ImageSlot
              src={c.store.subImg.src}
              alt={c.store.subImg.placeholder}
              placeholder={c.store.subImg.placeholder}
              objectPosition={c.store.subImg.position ?? "center"}
              radius={14}
              style={{ aspectRatio: "4 / 3", marginTop: 12 }}
            />
            <p
              style={{
                margin: "7px 0 0",
                textAlign: "center",
                fontFamily: BODY,
                fontSize: 11.5,
                color: INK_MUTE,
              }}
            >
              {c.store.subImgCaption}
            </p>
          </Section>

          {/* ─ ⑯ FAQ ──────────────────────────────────────── */}
          <Section background={PALE}>
            <Heading text={c.faq.heading} size={22} />
            <div style={{ marginTop: 22 }}>
              <FaqList
                items={c.faq.items}
                accent={ACCENT}
                accentSoft={SOFT}
                ink={INK}
                inkSoft={INK_SOFT}
              />
            </div>
          </Section>

          {/* ─ ⑰ クロージング（CTA 4/4）───────────────────── */}
          <Section
            style={{
              background: `linear-gradient(165deg, ${ACCENT} 0%, #2A5F80 100%)`,
              paddingTop: 48,
              paddingBottom: 50,
            }}
          >
            <Heading text={c.closing.heading} variant="white" size={23} />
            <p
              style={{
                margin: "20px 0 0",
                textAlign: "center",
                fontFamily: BODY,
                fontSize: 13.5,
                lineHeight: 2.05,
                color: "rgba(255,255,255,0.93)",
              }}
            >
              {nl(c.closing.body)}
            </p>
            <div
              style={{
                margin: "20px 0 24px",
                display: "grid",
                gridTemplateColumns: "repeat(2, max-content)",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {c.closing.chips.map((t) => (
                <Chip key={t} text={t} variant="dark" />
              ))}
            </div>
            <CampaignPlate />
            <Cta variant="dark" />
          </Section>

          {/* ─ 予約フォーム ───────────────────────────────── */}
          <Section background={BASE} id="form" style={{ scrollMarginTop: 0 }}>
            <p
              style={{
                margin: 0,
                textAlign: "center",
                fontFamily: GOTHIC,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.22em",
                color: BRAND,
              }}
            >
              {c.form.kicker}
            </p>
            <div style={{ marginTop: 10 }}>
              <Heading text={c.form.heading} size={22} />
            </div>
            <p
              style={{
                margin: "17px 0 22px",
                textAlign: "center",
                fontFamily: BODY,
                fontSize: 13.5,
                lineHeight: 1.95,
                color: INK_SOFT,
              }}
            >
              {nl(c.form.lead)}
            </p>

            {/*
              LPForm は全LP共通なので、入力欄の枠（#DDD6C8）と必須タグ（#C25B4B）が
              パターンA由来の暖色で固定されている。共通側は触らず、このLPの中だけ
              青系に寄せる（beat-pilates-nagoyafushimi と同じやり方）。
              枠色はインラインスタイルなので !important でしか上書きできない。
            */}
            <style>{`
              #form input, #form textarea, #form select { border-color: ${PALE_DEEP} !important; }
              /* トグルは未選択のときだけ中立色にする。選択時は accent のまま。 */
              #form .lpform-toggle[data-selected="false"] { border-color: ${PALE_DEEP} !important; }
              #form .lpform-required-tag { color: ${DEEP} !important; }
              #form .lpform-optional-tag { color: ${INK_MUTE} !important; }
            `}</style>

            <div
              style={{
                background: "#FFFFFF",
                borderRadius: 16,
                border: `1px solid ${SOFT}`,
                padding: "18px 15px 20px",
                boxShadow: "0 6px 20px rgba(40,80,110,0.09)",
              }}
            >
              <LPForm
                clientSlug={c.slug}
                fields={c.form.fields}
                accent={ACCENT}
                submitLabel={c.form.submitLabel}
                submitStyle={{ background: CTA_GRAD, boxShadow: `0 8px 20px ${CTA_SHADOW}` }}
                microcopy={
                  <span style={{ color: DEEP, fontSize: 12.5, fontWeight: 700 }}>
                    {c.form.microcopy}
                  </span>
                }
                disclaimer={nl(c.form.disclaimer)}
                errorMessage={c.form.errorMessage}
              />
            </div>
          </Section>

          {/* ─ フッター ───────────────────────────────────── */}
          <footer
            style={{
              background: "#FFFFFF",
              borderTop: `1px solid ${PALE_DEEP}`,
              padding: "22px 20px 26px",
              textAlign: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.header.logo.src ?? ""}
              alt="STUDIO IVY"
              style={{ width: 132, height: "auto", display: "inline-block" }}
            />
            <p
              style={{
                margin: "6px 0 0",
                fontFamily: GOTHIC,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: INK_SOFT,
              }}
            >
              {c.footer.brandSub}
            </p>
            <p style={{ margin: "14px 0 0", fontSize: 10, color: INK_MUTE }}>
              © {new Date().getFullYear()} STUDIO IVY
            </p>
          </footer>
        </LPCanvas>
      </div>

      {/* ─ 追従CTA ─────────────────────────────────────── */}
      <StickyFooterCTA
        anchor={c.cta.anchor}
        buttonText={c.sticky.buttonText}
        showAfter={560}
        buttonGradient={CTA_GRAD}
        shadowColor={CTA_SHADOW}
        borderColor="rgba(78,148,191,0.35)"
        offers={[
          <span
            key="offer"
            style={{
              display: "inline-flex",
              alignItems: "baseline",
              gap: 5,
              fontFamily: GOTHIC,
              color: DEEP,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700 }}>
              {c.sticky.offerLabel}
            </span>
            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.01em" }}>
              {c.sticky.offerValue}
            </span>
          </span>,
          <span
            key="was"
            style={{
              fontFamily: GOTHIC,
              fontSize: 11.5,
              fontWeight: 500,
              color: INK_MUTE,
              textDecoration: "line-through",
            }}
          >
            通常4,500円
          </span>,
        ]}
      />
    </LPShell>
  );
}
