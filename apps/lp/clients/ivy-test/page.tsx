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
 * STUDIO IVY 藤沢店 — Meta広告専用LP / **B案（デザイン刷新版）**。
 *
 * A案（`ivy-test`）と訴求・事実・CV導線は同じ。**違うのは見せ方だけ**。
 * B案で徹底していること:
 *
 *   1. **カードを並べない。** 枠と影の箱をやめ、ヘアラインと余白で区切る。
 *      「選ばれる理由」は4項目すべて別レイアウト（写真大 / 写真大・順序反転 /
 *      タイポグラフィのみ / 導線図）。指示書 §11-10。
 *   2. **地色を切り替えない。** ほぼ白で通し、淡色は⑦⑫⑭⑰だけ。
 *      色ではなく余白・写真・文字組みで見せる（同 §6）。
 *   3. **写真は全幅で大きく。** ⑨⑩-01⑬⑮は左右の余白を取り払って
 *      キャンバス端まで出し、リズムの変化点にする。
 *   4. **FVに白札を重ねない。** 価格もキャンペーンもタイポグラフィで置く（同 §11-04）。
 *   5. 見出しは明朝、英字キッカーは細い字送りのゴシック。
 *      明朝は Shippori Mincho 600 で、細すぎないものを使う（同 §7）。
 *
 * 共通の制約はA案と同じ:
 *   - 幅390pxの1枚のキャンバス（`<LPCanvas>`）。中で `vw` / `vh` は使わない
 *     （CLAUDE.md §16-17）。キャンバス外の地色を敷くぶんだけが例外。
 *   - CTA文言は「無料体験を予約する」で統一。CTA周辺に必ず
 *     「通常4,500円 → 初回0円」を置く。
 *   - 効果を断定する表現は置かない（指示書 §16）。
 *
 * CTAの数はA案より1つ多い5箇所。指示書 §11-04 がFVにもCTAを求めているため
 * （④FV・⑥体験キャンペーン・⑩選ばれる理由・⑬体験の流れ・⑰クロージング）。
 */

const c = config;

/* ── 配色 ────────────────────────────────────────────────────────
   A案と同じブランド青系。ただしB案は濃色の面をほぼ使わないので、
   色は見出し・キッカー・細い罫・数字・CTAにしか乗らない。 */
const HEAD = "#2B4B5E"; // 見出し。ブランドブルーを暗くしたもの。白地 9.4:1
const ACCENT = "#3C7EA6"; // キッカー・番号・強調。白地 4.6:1
const BRAND = "#4E94BF"; // ブランドブルーそのまま。細い装飾罫だけ
const BASE = "#FFFFFF";
const PALE = "#F5F9FB"; // 淡色の地。⑦⑫⑭⑰だけで使う
const RULE = "rgba(43,75,94,0.13)"; // ヘアライン。箱の代わりにこれで区切る
const INK = "#414A52";
const INK_SOFT = "#6E7880";
const INK_MUTE = "#A4AEB6";

/** CTA専用色。ページ内で最もコントラストが高い要素にする。 */
const CTA_GRAD = `linear-gradient(135deg, ${ACCENT} 0%, #27577A 100%)`;
const CTA_SHADOW = "rgba(39,87,122,0.28)";

const MINCHO = "'Shippori Mincho', serif";
const GOTHIC = "'Zen Kaku Gothic New', sans-serif";
const BODY = "'Noto Sans JP', sans-serif";

/** 左右の余白。A案（22）より広く取り、軽やかに見せる。 */
const PAD = 26;

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
  background = BASE,
  style,
  id,
  /** 写真を全幅で出すセクションは左右の余白を自前で管理する。 */
  flush = false,
}: {
  children: ReactNode;
  background?: string;
  style?: CSSProperties;
  id?: string;
  flush?: boolean;
}) {
  return (
    <section
      id={id}
      style={{
        background,
        padding: flush ? "64px 0 66px" : `64px ${PAD}px 66px`,
        ...style,
      }}
    >
      {children}
    </section>
  );
}

/** 英字キッカー。細い字送りのゴシックで、見出しの上に小さく置く。 */
function Kicker({
  text,
  align = "center",
  color = ACCENT,
}: {
  text: string;
  align?: "center" | "left";
  color?: string;
}) {
  return (
    <p
      style={{
        margin: 0,
        textAlign: align,
        fontFamily: GOTHIC,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.34em",
        // letter-spacing は最後の1字の後ろにも入るので、中央寄せのときは
        // その分だけ左に戻さないと、見た目が右にずれる。
        textIndent: align === "center" ? "0.34em" : 0,
        color,
      }}
    >
      {text}
    </p>
  );
}

/** セクション見出し。明朝。B案は罫を敷かず、余白だけで見出しを立てる。 */
function Head({
  text,
  align = "center",
  size = 24,
  color = HEAD,
}: {
  text: string;
  align?: "center" | "left";
  size?: number;
  color?: string;
}) {
  return (
    <h2
      style={{
        margin: "14px 0 0",
        textAlign: align,
        fontFamily: MINCHO,
        fontWeight: 600,
        fontSize: size,
        lineHeight: 1.72,
        letterSpacing: "0.045em",
        color,
      }}
    >
      {nl(text)}
    </h2>
  );
}

const Check = ({ color = ACCENT }: { color?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flex: "none", marginTop: 4 }}
  >
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

/** 下向き矢印。二重価格の「通常 → 0円」の間に置く。 */
const DownArrow = ({ color = BRAND, size = 15 }: { color?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 4.5v14M5.5 12.5L12 19l6.5-6.5" />
  </svg>
);

/**
 * 予約CTA。④⑥⑩⑬⑰の5箇所。文言は config で統一し、
 * ボタンの下に「通常4,500円 → 初回0円」を1行だけ添える（指示書 §12）。
 */
function Cta({
  variant = "solid",
  marginTop = 30,
}: {
  variant?: "solid" | "onPhoto";
  marginTop?: number;
}) {
  const onPhoto = variant === "onPhoto";
  return (
    <div style={{ marginTop }}>
      <a
        href={c.cta.anchor}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          height: 58,
          borderRadius: 999,
          background: onPhoto ? "#FFFFFF" : CTA_GRAD,
          color: onPhoto ? HEAD : "#FFFFFF",
          textDecoration: "none",
          fontFamily: GOTHIC,
          fontSize: 16,
          fontWeight: 800,
          letterSpacing: "0.08em",
          boxShadow: onPhoto
            ? "0 6px 20px rgba(12,32,46,0.3)"
            : `0 8px 22px ${CTA_SHADOW}`,
        }}
      >
        {c.cta.label}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: onPhoto ? "rgba(43,75,94,0.12)" : "rgba(255,255,255,0.22)",
            fontSize: 12,
          }}
        >
          →
        </span>
      </a>
      {!onPhoto && (
        <p
          style={{
            margin: "12px 0 0",
            textAlign: "center",
            fontFamily: BODY,
            fontSize: 12,
            color: INK_SOFT,
          }}
        >
          {c.cta.note}
        </p>
      )}
    </div>
  );
}

/**
 * 二重価格（通常4,500円 → 完全無料 0円）のタイポグラフィ。
 * 白プレートに載せず、上下のヘアラインだけで囲う（指示書 §4「カードを並べない」）。
 * ⑥体験キャンペーンと⑰クロージングで共用する。
 */
function OfferType({
  label,
  was,
  nowLabel,
  now,
  nowUnit,
  note,
}: {
  label: string;
  was: string;
  nowLabel: string;
  now: string;
  nowUnit: string;
  note?: string;
}) {
  return (
    <div
      style={{
        marginTop: 30,
        padding: "26px 0 28px",
        borderTop: `1px solid ${RULE}`,
        borderBottom: `1px solid ${RULE}`,
        textAlign: "center",
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: GOTHIC,
          fontSize: 12.5,
          fontWeight: 700,
          letterSpacing: "0.14em",
          color: ACCENT,
        }}
      >
        {label}
      </p>
      <p
        style={{
          margin: "14px 0 0",
          fontFamily: GOTHIC,
          fontSize: 15,
          fontWeight: 500,
          color: INK_MUTE,
          textDecoration: "line-through",
        }}
      >
        {was}
      </p>
      <div style={{ display: "flex", justifyContent: "center", margin: "9px 0 7px" }}>
        <DownArrow />
      </div>
      <p
        style={{
          margin: 0,
          fontFamily: MINCHO,
          fontWeight: 600,
          fontSize: 19,
          letterSpacing: "0.12em",
          color: HEAD,
        }}
      >
        {nowLabel}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          gap: 2,
          marginTop: 4,
        }}
      >
        {/* §17 の「料金・0円など 40〜58px」の上限。ページ内で最大の文字。 */}
        <span
          style={{
            fontFamily: GOTHIC,
            fontSize: 58,
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            color: HEAD,
          }}
        >
          {now}
        </span>
        <span
          style={{ fontFamily: GOTHIC, fontSize: 23, fontWeight: 800, color: HEAD }}
        >
          {nowUnit}
        </span>
      </div>
      {note && (
        <p
          style={{
            margin: "14px 0 0",
            fontFamily: BODY,
            fontSize: 11.5,
            lineHeight: 1.85,
            color: INK_SOFT,
          }}
        >
          {note}
        </p>
      )}
    </div>
  );
}

/** 小さな丸印つきの項目。チップの代わりに使い、枠を持たせない。 */
function DotItem({ text, color = BRAND }: { text: string; color?: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontFamily: GOTHIC,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.02em",
        color: INK,
      }}
    >
      <span
        style={{
          flex: "none",
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: color,
        }}
      />
      {text}
    </span>
  );
}

/** セクション内で写真を左右いっぱいに出す。リズムの変化点に使う。 */
function FullBleed({
  img,
  ratio = "16 / 10",
  style,
  /** 文字が焼き込まれた画像では、読み上げ用に中身の文言を渡す。 */
  alt,
}: {
  img: { src?: string | null; placeholder: string; position?: string };
  ratio?: string;
  style?: CSSProperties;
  alt?: string;
}) {
  return (
    <ImageSlot
      src={img.src}
      alt={alt ?? img.placeholder}
      placeholder={img.placeholder}
      objectPosition={img.position ?? "center"}
      style={{ aspectRatio: ratio, ...style }}
    />
  );
}

/* ── ページ ──────────────────────────────────────────────────── */

export default function Page() {
  const r = c.reasons;

  return (
    <LPShell
      clientSlug={c.slug}
      fallback={{ name: "STUDIO IVY 藤沢店（B案）", status: c.status }}
    >
      {/* キャンバスの外側。地色を画面いっぱいに敷くためのビューポート高さは、
          キャンバス外なので拡大縮小の影響を受けない唯一の例外（CLAUDE.md §17）。 */}
      <div style={{ background: "#EAF1F6", minHeight: "100vh" }}>
        <LPCanvas background={BASE} boxShadow="0 0 40px rgba(30,70,95,0.10)">
          {/* ─ ① ヘッダー ───────────────────────────────── */}
          <header
            style={{
              background: BASE,
              padding: "15px 22px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.header.logo.src ?? ""}
              alt="STUDIO IVY"
              style={{ width: 120, height: "auto", display: "block" }}
            />
            <span
              style={{
                paddingLeft: 12,
                borderLeft: `1px solid ${RULE}`,
                fontFamily: GOTHIC,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: INK,
              }}
            >
              {c.header.store}
            </span>
          </header>

          {/* ─ ② オファーバー ─────────────────────────────
              セールバナーにしない。淡色地＋細字で、静かに事実だけ置く。 */}
          <div
            style={{
              background: PALE,
              padding: "9px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {c.offerBar.badge && (
              <span
                style={{
                  fontFamily: GOTHIC,
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: ACCENT,
                }}
              >
                {c.offerBar.badge}
              </span>
            )}
            <span style={{ width: 1, height: 11, background: RULE }} />
            <span
              style={{
                fontFamily: GOTHIC,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.03em",
                color: HEAD,
              }}
            >
              {c.offerBar.lead}
            </span>
            <span
              style={{
                fontFamily: GOTHIC,
                fontSize: 11,
                fontWeight: 500,
                color: INK_MUTE,
                textDecoration: "line-through",
              }}
            >
              {c.offerBar.was}
            </span>
            <span
              style={{
                fontFamily: GOTHIC,
                fontSize: 15,
                fontWeight: 800,
                color: ACCENT,
              }}
            >
              {c.offerBar.now}
            </span>
          </div>

          {/* ─ ③ 特徴バー ─────────────────────────────────
              白地にヘアラインだけ。細く、静かに。 */}
          <div
            style={{
              background: BASE,
              borderBottom: `1px solid ${RULE}`,
              padding: "11px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            {c.featureBar.map((f, i) => (
              <span key={f} style={{ display: "contents" }}>
                {i > 0 && <span style={{ width: 1, height: 11, background: RULE }} />}
                <span
                  style={{
                    fontFamily: GOTHIC,
                    fontSize: 11.5,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: INK,
                  }}
                >
                  {f}
                </span>
              </span>
            ))}
          </div>

          {/* ─ ④ FV ───────────────────────────────────────
              白札を重ねず、タイポグラフィと余白だけで組む。文字は左寄せ。 */}
          {/*
            FVの高さ。**被写体と文字の間隔はここでは決まらない**（高さを増やすと
            そのぶん切り抜きが減って相殺される）。間隔は `HeroVideo` の
            `ZOOM` 側で作っているので、ここは「FV内のCTAを折り返しに収める」
            ためだけの値。

            600pxだと、ヘッダー＋オファーバー＋特徴バーを足したFV内CTAの下端が
            設計731px。390px幅の実機（iPhone 14 は可視域およそ750px）で
            CTAが画面内に収まる。660pxでは791pxになり、CTAが切れていた。
          */}
          <div style={{ position: "relative", height: 578, overflow: "hidden" }}>
            <HeroVideo
              src={c.fv.video}
              poster={c.fv.poster}
              alt="STUDIO IVY 藤沢店のマンツーマンレッスンの様子"
            />
            {/* 可読性のための暗幕。下半分だけ効かせ、上は写真をそのまま見せる。 */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  // 実測の文字位置（FV高578pxに対する割合）:
                  //   キッカー 22〜25% / キャッチ 27〜50% / 価格 57〜63%
                  //   CTA 86〜96%
                  // 特典をFVの外へ出して文字が下がったので、上14%は薄いまま
                  // 写真を見せ、25%から文字の帯に合わせて厚くしている
                  // （指示書「暗くしすぎない」）。
                  "linear-gradient(180deg, rgba(14,36,50,0.26) 0%, rgba(14,36,50,0.14) 14%, rgba(13,34,48,0.40) 25%, rgba(13,34,48,0.52) 40%, rgba(12,32,46,0.62) 58%, rgba(11,30,44,0.78) 78%, rgba(10,28,42,0.92) 100%)",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: `0 ${PAD}px 24px`,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: GOTHIC,
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: "0.34em",
                  color: "rgba(255,255,255,0.92)",
                  // 細い字なので、明るい背景に重なると暗幕だけでは負ける。
                  // 影を付けて輪郭を残す（キャッチと同じ考え方）。
                  textShadow: "0 1px 10px rgba(8,26,38,0.75)",
                }}
              >
                {c.fv.kicker}
              </p>

              <h1
                style={{
                  // 2行目「パーソナルピラティスを、」が12字。390pxから左右の
                  // 余白52pxを引いた338pxに収まるよう27pxで固定している。
                  margin: "14px 0 0",
                  fontFamily: MINCHO,
                  fontWeight: 600,
                  fontSize: 27,
                  lineHeight: 1.64,
                  letterSpacing: "0.005em",
                  color: "#FFFFFF",
                  textShadow: "0 2px 16px rgba(8,26,38,0.45)",
                }}
              >
                {nl(c.fv.catch)}
              </h1>

              <div
                style={{
                  width: 34,
                  height: 1,
                  background: "rgba(255,255,255,0.7)",
                  margin: "20px 0 16px",
                }}
              />

              {/* 価格。白札を置かず、文字だけで見せる。
                  「地域最安級」は比較表示なので、根拠の扱いは config 側の
                  `priceBadge` のコメントを参照すること。 */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: GOTHIC,
                    fontSize: 13,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  1回
                </span>
                <span
                  style={{
                    fontFamily: GOTHIC,
                    fontSize: 36,
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: "-0.01em",
                    color: "#FFFFFF",
                    textShadow: "0 2px 12px rgba(8,26,38,0.4)",
                  }}
                >
                  {c.fv.price.value}
                </span>
                <span
                  style={{
                    fontFamily: GOTHIC,
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#FFFFFF",
                  }}
                >
                  {c.fv.price.unit}
                </span>
                {c.fv.priceBadge && (
                  <span
                    style={{
                      marginLeft: 4,
                      alignSelf: "center",
                      padding: "4px 10px",
                      border: "1px solid rgba(255,255,255,0.85)",
                      borderRadius: 999,
                      fontFamily: GOTHIC,
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: "0.04em",
                      color: "#FFFFFF",
                      textShadow: "0 1px 8px rgba(8,26,38,0.55)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.fv.priceBadge}
                  </span>
                )}
              </div>
              {c.fv.priceBadgeNote && (
                <p
                  style={{
                    margin: "7px 0 0",
                    fontFamily: BODY,
                    fontSize: 10,
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.8)",
                    textShadow: "0 1px 6px rgba(8,26,38,0.6)",
                  }}
                >
                  {c.fv.priceBadgeNote}
                </p>
              )}

              <p
                style={{
                  margin: "9px 0 0",
                  fontFamily: GOTHIC,
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  color: "rgba(255,255,255,0.88)",
                }}
              >
                {c.fv.facts.join("　｜　")}
              </p>

              {/* キャンペーン。1行のタイポグラフィで置く。 */}
              <div
                style={{
                  marginTop: 18,
                  paddingTop: 16,
                  borderTop: "1px solid rgba(255,255,255,0.28)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: GOTHIC,
                      fontSize: 11.5,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.92)",
                    }}
                  >
                    {c.fv.campaign.label}
                  </p>
                  <p
                    style={{
                      margin: "3px 0 0",
                      fontFamily: GOTHIC,
                      fontSize: 12,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.62)",
                      textDecoration: "line-through",
                    }}
                  >
                    {c.fv.campaign.was}
                  </p>
                </div>
                <DownArrow color="rgba(255,255,255,0.75)" size={16} />
                <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                  <span
                    style={{
                      fontFamily: GOTHIC,
                      fontSize: 48,
                      fontWeight: 800,
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                      color: "#FFFFFF",
                      textShadow: "0 2px 14px rgba(8,26,38,0.45)",
                    }}
                  >
                    {c.fv.campaign.now}
                  </span>
                  <span
                    style={{
                      fontFamily: GOTHIC,
                      fontSize: 19,
                      fontWeight: 800,
                      color: "#FFFFFF",
                    }}
                  >
                    {c.fv.campaign.nowUnit}
                  </span>
                </div>
              </div>

              <Cta variant="onPhoto" marginTop={18} />
            </div>
          </div>

          {/* ─ ④-b 特典バンド ─────────────────────────────
              FV内に置くとトレーナーの顔と文字が重なりすぎるため、FVの外へ出した
              （顧客判断 2026-09-29）。写真の上ではないので、白抜き＋影ではなく
              淡色地に素で置ける。 */}
          <div
            style={{
              background: PALE,
              borderTop: `1px solid ${RULE}`,
              borderBottom: `1px solid ${RULE}`,
              padding: "18px 26px 19px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                flex: "none",
                marginTop: 2,
                padding: "4px 11px",
                borderRadius: 3,
                background: ACCENT,
                fontFamily: GOTHIC,
                fontSize: 11.5,
                fontWeight: 800,
                letterSpacing: "0.1em",
                color: "#FFFFFF",
              }}
            >
              特典
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {c.fv.bonuses.map((b) => (
                <span
                  key={b}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: GOTHIC,
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: "0.01em",
                    lineHeight: 1.45,
                    color: HEAD,
                  }}
                >
                  <Check />
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* ─ ⑤ FV直下 ───────────────────────────────────── */}
          <Section>
            <Kicker text={c.intro.kicker} />
            <Head text={c.intro.heading} size={23} />
            <p
              style={{
                margin: "22px 0 0",
                textAlign: "center",
                fontFamily: BODY,
                fontSize: 14,
                lineHeight: 2.15,
                color: INK_SOFT,
              }}
            >
              {nl(c.intro.body)}
            </p>
            {/* 顧客支給の写真（2026-09-29 AUN #2）。指示どおり正方形で挟む。 */}
            <FullBleed img={c.intro.img} ratio="1 / 1" style={{ marginTop: 26 }} />

            {/* チップは枠を持たせず、小さな丸印だけで並べる（指示書 §11-05）。 */}
            <div
              style={{
                marginTop: 26,
                display: "grid",
                gridTemplateColumns: "repeat(2, max-content)",
                justifyContent: "center",
                gap: "13px 26px",
              }}
            >
              {c.intro.chips.map((t) => (
                <DotItem key={t} text={t} />
              ))}
            </div>
          </Section>

          {/* ─ ⑥ 体験キャンペーン（CTA 2/5）───────────────── */}
          <Section>
            <Kicker text={c.campaign.kicker} />
            <Head text={c.campaign.heading} size={22} />
            <p
              style={{
                margin: "20px 0 0",
                textAlign: "center",
                fontFamily: BODY,
                fontSize: 13.5,
                lineHeight: 2.05,
                color: INK_SOFT,
              }}
            >
              {nl(c.campaign.lead)}
            </p>
            <OfferType
              label={c.campaign.label}
              was={c.campaign.was}
              nowLabel={c.campaign.nowLabel}
              now={c.campaign.now}
              nowUnit={c.campaign.nowUnit}
              note={c.campaign.note}
            />
            <Cta />
          </Section>

          {/* ─ ⑦ お悩み ─────────────────────────────────────
              見出しと悩み項目は顧客支給の画像に焼き込まれている（AUN #6）。
              そのためキッカー・見出し・リストは置かず、画像を全幅で出して
              締めの一文だけをLP側で持つ。画像の比率は原寸（1092x1440）と
              一致させてあるので、`cover` でも切り取られない。 */}
          <Section background={PALE} flush style={{ padding: "0 0 62px" }}>
            <FullBleed img={c.worry.img} ratio="1092 / 1440" alt={c.worry.imgAlt} />
            <p
              style={{
                margin: "34px 0 0",
                padding: `0 ${PAD}px`,
                textAlign: "center",
                fontFamily: MINCHO,
                fontWeight: 600,
                fontSize: 19,
                lineHeight: 1.85,
                letterSpacing: "0.04em",
                color: HEAD,
              }}
            >
              {nl(c.worry.closing)}
            </p>
          </Section>

          {/* ─ ⑧ STUDIO IVYなら ─────────────────────────────
              大きな写真1枚＋番号つきのリスト。小カード4枚では並べない。 */}
          <Section flush>
            <div style={{ padding: `0 ${PAD}px` }}>
              <Kicker text={c.points.kicker} />
              <Head text={c.points.heading} size={23} />
            </div>

            <FullBleed img={c.points.photo} ratio="4 / 3" style={{ margin: "30px 0 0" }} />

            <div style={{ padding: `0 ${PAD}px` }}>
              <div style={{ marginTop: 30, borderTop: `1px solid ${RULE}` }}>
                {c.points.items.map((item) => (
                  <div
                    key={item.num}
                    style={{
                      display: "flex",
                      gap: 16,
                      padding: "20px 2px",
                      borderBottom: `1px solid ${RULE}`,
                    }}
                  >
                    <span
                      style={{
                        flex: "none",
                        width: 24,
                        fontFamily: GOTHIC,
                        fontSize: 13,
                        fontWeight: 800,
                        letterSpacing: "0.04em",
                        lineHeight: 1.7,
                        color: BRAND,
                      }}
                    >
                      {item.num}
                    </span>
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          margin: 0,
                          fontFamily: MINCHO,
                          fontWeight: 600,
                          fontSize: 18,
                          letterSpacing: "0.04em",
                          color: HEAD,
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          margin: "8px 0 0",
                          fontFamily: BODY,
                          fontSize: 13.5,
                          lineHeight: 1.95,
                          color: INK_SOFT,
                        }}
                      >
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* ─ ⑨ 目指せる未来 ───────────────────────────────
              写真を先に全幅で出し、見出しを後ろに置く。ここだけ順序が逆。 */}
          <Section flush style={{ paddingTop: 0 }}>
            <FullBleed img={c.future.img} ratio="3 / 2" />
            <div style={{ padding: `34px ${PAD}px 0` }}>
              <Kicker text={c.future.kicker} align="left" />
              <Head text={c.future.heading} align="left" size={23} />
              <ol
                style={{
                  listStyle: "none",
                  margin: "26px 0 0",
                  padding: 0,
                  borderTop: `1px solid ${RULE}`,
                }}
              >
                {c.future.items.map((item, i) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 14,
                      padding: "16px 2px",
                      borderBottom: `1px solid ${RULE}`,
                    }}
                  >
                    <span
                      style={{
                        flex: "none",
                        fontFamily: GOTHIC,
                        fontSize: 11.5,
                        fontWeight: 800,
                        letterSpacing: "0.08em",
                        color: BRAND,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: MINCHO,
                        fontWeight: 600,
                        fontSize: 17,
                        letterSpacing: "0.04em",
                        color: HEAD,
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
              <p
                style={{
                  margin: "18px 0 0",
                  fontFamily: BODY,
                  fontSize: 11.5,
                  lineHeight: 1.85,
                  color: INK_MUTE,
                }}
              >
                {c.future.note}
              </p>
            </div>
          </Section>

          {/* ─ ⑩ 選ばれる理由（CTA 3/5）─────────────────────
              **4項目とも別レイアウト。** 写真大 → 文章先行＋縦写真 →
              タイポグラフィのみ → 導線図、の順で見え方を変える。 */}
          <Section flush>
            <div style={{ padding: `0 ${PAD}px` }}>
              <Kicker text={r.kicker} />
              <Head text={r.heading} size={23} />
            </div>

            {/* 01 完全個室 — 内観写真を全幅で大きく。 */}
            <FullBleed img={r.privateRoom.img} ratio="4 / 3" style={{ marginTop: 32 }} />
            <div style={{ padding: `22px ${PAD}px 0` }}>
              <ReasonLabel num={r.privateRoom.num} />
              <h3 style={reasonTitleStyle}>{nl(r.privateRoom.title)}</h3>
              <p style={reasonBodyStyle}>{r.privateRoom.body}</p>
            </div>

            {/* 02 マンツーマン — 先に文章、後ろに縦位置の写真。01と順序を逆にする。 */}
            <div style={{ padding: `44px ${PAD}px 0` }}>
              <ReasonLabel num={r.oneOnOne.num} />
              <h3 style={reasonTitleStyle}>{nl(r.oneOnOne.title)}</h3>
              <p style={reasonBodyStyle}>{r.oneOnOne.body}</p>
            </div>
            <FullBleed img={r.oneOnOne.img} ratio="4 / 5" style={{ marginTop: 22 }} />

            {/* 03 1回7,000円〜 — 写真を置かず、数字を主役にする。 */}
            <div style={{ padding: `44px ${PAD}px 0` }}>
              <ReasonLabel num={r.price.num} />
              <h3 style={reasonTitleStyle}>{nl(r.price.title)}</h3>
              <p style={reasonBodyStyle}>{r.price.body}</p>
              <div
                style={{
                  marginTop: 22,
                  padding: "24px 0 22px",
                  borderTop: `1px solid ${RULE}`,
                  borderBottom: `1px solid ${RULE}`,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "center",
                    gap: 3,
                  }}
                >
                  <span
                    style={{
                      fontFamily: GOTHIC,
                      fontSize: 52,
                      fontWeight: 800,
                      lineHeight: 1,
                      letterSpacing: "-0.025em",
                      color: HEAD,
                    }}
                  >
                    {r.price.value}
                  </span>
                  <span
                    style={{
                      fontFamily: GOTHIC,
                      fontSize: 21,
                      fontWeight: 800,
                      color: HEAD,
                    }}
                  >
                    {r.price.unit}
                  </span>
                </div>
                <p
                  style={{
                    margin: "10px 0 0",
                    fontFamily: BODY,
                    fontSize: 11.5,
                    color: INK_SOFT,
                  }}
                >
                  {r.price.caption}
                </p>
              </div>
            </div>

            {/* 04 徒歩5分 — 写真ではなく、駅からの導線を細い縦線で見せる。 */}
            <div style={{ padding: `44px ${PAD}px 0` }}>
              <ReasonLabel num={r.access.num} />
              <h3 style={reasonTitleStyle}>{nl(r.access.title)}</h3>
              <p style={reasonBodyStyle}>{r.access.body}</p>
              <div style={{ marginTop: 22, paddingLeft: 4 }}>
                {r.access.route.map((step, i) => {
                  const last = i === r.access.route.length - 1;
                  const middle = i === 1;
                  return (
                    <div key={step.label} style={{ display: "flex", gap: 14 }}>
                      {/* 縦の導線と丸印。中間（徒歩5分）は小さい丸にする。 */}
                      <div
                        style={{
                          flex: "none",
                          width: 9,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            width: middle ? 5 : 9,
                            height: middle ? 5 : 9,
                            marginTop: middle ? 9 : 7,
                            borderRadius: "50%",
                            background: middle ? BRAND : ACCENT,
                          }}
                        />
                        {!last && (
                          <span style={{ flex: 1, width: 1, background: RULE }} />
                        )}
                      </div>
                      <div style={{ paddingBottom: last ? 0 : 18 }}>
                        <p
                          style={{
                            margin: 0,
                            fontFamily: GOTHIC,
                            fontSize: middle ? 13 : 15.5,
                            fontWeight: middle ? 700 : 800,
                            letterSpacing: "0.04em",
                            color: middle ? ACCENT : HEAD,
                          }}
                        >
                          {step.label}
                        </p>
                        {step.sub && (
                          <p
                            style={{
                              margin: "3px 0 0",
                              fontFamily: BODY,
                              fontSize: 11.5,
                              color: INK_MUTE,
                            }}
                          >
                            {step.sub}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ padding: `0 ${PAD}px` }}>
              <Cta marginTop={38} />
            </div>
          </Section>

          {/* ─ ⑪ 料金プラン ─────────────────────────────────
              表にしない。月4回だけタイポグラフィで大きく、他2つは細い行で添える。 */}
          <Section background={PALE}>
            <Kicker text={c.price.kicker} />
            <Head text={c.price.heading} size={23} />
            <p
              style={{
                margin: "20px 0 0",
                textAlign: "center",
                fontFamily: BODY,
                fontSize: 13.5,
                lineHeight: 2,
                color: INK_SOFT,
              }}
            >
              {c.price.lead}
            </p>

            {/* 主役。月4回プラン。 */}
            <div
              style={{
                marginTop: 28,
                padding: "26px 20px 24px",
                background: BASE,
                border: `1px solid ${RULE}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span
                  style={{
                    fontFamily: GOTHIC,
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: "0.18em",
                    color: ACCENT,
                  }}
                >
                  {c.price.main.name}
                </span>
                <span
                  style={{
                    fontFamily: GOTHIC,
                    fontSize: 16,
                    fontWeight: 700,
                    color: HEAD,
                  }}
                >
                  {c.price.main.freq}
                </span>
              </div>

              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  alignItems: "baseline",
                  gap: 3,
                }}
              >
                <span
                  style={{
                    fontFamily: GOTHIC,
                    fontSize: 34,
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: HEAD,
                  }}
                >
                  {c.price.main.monthly}
                </span>
                <span
                  style={{ fontFamily: GOTHIC, fontSize: 16, fontWeight: 800, color: HEAD }}
                >
                  円
                </span>
                <span
                  style={{
                    marginLeft: 5,
                    fontFamily: BODY,
                    fontSize: 11.5,
                    color: INK_MUTE,
                  }}
                >
                  / 月（税込）
                </span>
              </div>

              {/* 1回あたりを主訴求にする（指示書 §9）。 */}
              <div
                style={{
                  marginTop: 16,
                  paddingTop: 16,
                  borderTop: `1px solid ${RULE}`,
                  display: "flex",
                  alignItems: "baseline",
                  gap: 9,
                }}
              >
                <span
                  style={{
                    fontFamily: GOTHIC,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: INK_SOFT,
                  }}
                >
                  1回あたり
                </span>
                <span
                  style={{
                    fontFamily: GOTHIC,
                    fontSize: 40,
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: HEAD,
                  }}
                >
                  {c.price.main.per}
                </span>
                <span
                  style={{ fontFamily: GOTHIC, fontSize: 17, fontWeight: 800, color: HEAD }}
                >
                  円
                </span>
              </div>

              <p
                style={{
                  margin: "14px 0 0",
                  fontFamily: BODY,
                  fontSize: 12.5,
                  lineHeight: 1.8,
                  color: INK_SOFT,
                }}
              >
                {c.price.main.note}
              </p>
            </div>

            {/* 脇の2プラン。箱にせず、細い行で比較できるようにする。 */}
            <div style={{ marginTop: 22, borderTop: `1px solid ${RULE}` }}>
              {c.price.others.map((p) => (
                <div
                  key={p.name}
                  style={{
                    padding: "16px 2px",
                    borderBottom: `1px solid ${RULE}`,
                    display: "flex",
                    alignItems: "baseline",
                    gap: 10,
                  }}
                >
                  <div style={{ flex: "none", width: 96 }}>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: GOTHIC,
                        fontSize: 10.5,
                        fontWeight: 800,
                        letterSpacing: "0.16em",
                        color: INK_MUTE,
                      }}
                    >
                      {p.name}
                    </p>
                    <p
                      style={{
                        margin: "3px 0 0",
                        fontFamily: GOTHIC,
                        fontSize: 14,
                        fontWeight: 700,
                        color: HEAD,
                      }}
                    >
                      {p.freq}
                    </p>
                  </div>
                  <div style={{ flex: 1, textAlign: "right" }}>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: GOTHIC,
                        fontSize: 18,
                        fontWeight: 800,
                        letterSpacing: "-0.01em",
                        color: HEAD,
                      }}
                    >
                      {p.monthly}
                      <span style={{ fontSize: 12 }}>円 / 月</span>
                    </p>
                    <p
                      style={{
                        margin: "3px 0 0",
                        fontFamily: GOTHIC,
                        fontSize: 12.5,
                        fontWeight: 700,
                        color: ACCENT,
                      }}
                    >
                      1回あたり {p.per}円
                    </p>
                  </div>
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

          {/* ─ ⑫ グループレッスンとの違い ───────────────────
              濃色の面を作らず、ラベルと細い縦罫だけで差を見せる。 */}
          <Section>
            <Kicker text={c.compare.kicker} />
            <Head text={c.compare.heading} size={22} />

            <div style={{ marginTop: 30 }}>
              <div style={{ paddingBottom: 22, borderBottom: `1px solid ${RULE}` }}>
                <p
                  style={{
                    margin: 0,
                    fontFamily: GOTHIC,
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: INK_MUTE,
                  }}
                >
                  {c.compare.group.label}
                </p>
                <p
                  style={{
                    margin: "9px 0 0",
                    fontFamily: BODY,
                    fontSize: 13.5,
                    lineHeight: 2,
                    color: INK_SOFT,
                  }}
                >
                  {c.compare.group.body}
                </p>
              </div>

              <div
                style={{
                  marginTop: 22,
                  paddingLeft: 15,
                  borderLeft: `2px solid ${ACCENT}`,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontFamily: GOTHIC,
                    fontSize: 14,
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    color: ACCENT,
                  }}
                >
                  {c.compare.ivy.label}
                </p>
                <p
                  style={{
                    margin: "9px 0 0",
                    fontFamily: BODY,
                    fontSize: 13.5,
                    lineHeight: 2,
                    color: INK,
                  }}
                >
                  {c.compare.ivy.body}
                </p>
              </div>
            </div>

            <p
              style={{
                margin: "32px 0 0",
                textAlign: "center",
                fontFamily: MINCHO,
                fontWeight: 600,
                fontSize: 18.5,
                lineHeight: 1.85,
                letterSpacing: "0.03em",
                color: HEAD,
              }}
            >
              {nl(c.compare.closing)}
            </p>
          </Section>

          {/* ─ ⑬ 体験レッスンの流れ（CTA 4/5）───────────────
              細い縦線のタイムライン。写真は顧客判断で削除した（2026-09-29）。 */}
          <Section flush background={PALE}>
            <div style={{ padding: `0 ${PAD}px` }}>
              <Kicker text={c.flow.kicker} />
              <Head text={c.flow.heading} size={23} />
            </div>

            {/* 写真を挟まず1本のタイムラインで通す。最後のステップだけ
                `last` を立てて、縦線をそこで止める。 */}
            <div style={{ padding: `30px ${PAD}px 0` }}>
              {c.flow.steps.map((s, i, arr) => (
                <FlowStep key={s.num} step={s} last={i === arr.length - 1} index={i} />
              ))}
              <Cta marginTop={34} />
            </div>
          </Section>

          {/* ─ ⑭ 初めてでも大丈夫 ───────────────────────────── */}
          <Section>
            <Kicker text={c.beginner.kicker} />
            <Head text={c.beginner.heading} size={23} />
            <div
              style={{
                marginTop: 28,
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 0,
                borderTop: `1px solid ${RULE}`,
              }}
            >
              {c.beginner.items.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    gap: 11,
                    padding: "14px 2px",
                    borderBottom: `1px solid ${RULE}`,
                    fontFamily: BODY,
                    fontSize: 14,
                    lineHeight: 1.75,
                    color: INK,
                  }}
                >
                  <Check />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p
              style={{
                margin: "28px 0 0",
                textAlign: "center",
                fontFamily: BODY,
                fontSize: 13.5,
                lineHeight: 2.1,
                color: INK_SOFT,
              }}
            >
              {nl(c.beginner.closing)}
            </p>
          </Section>

          {/* ─ ⑮ 店舗情報 ───────────────────────────────────
              事務的にしない。外観を全幅で先に出し、情報は細い行で添える。 */}
          <Section flush style={{ paddingTop: 0 }}>
            <FullBleed img={c.store.img} ratio="16 / 10" />
            <div style={{ padding: `34px ${PAD}px 0` }}>
              <Kicker text={c.store.kicker} />
              <h2
                style={{
                  margin: "14px 0 0",
                  textAlign: "center",
                  fontFamily: MINCHO,
                  fontWeight: 600,
                  fontSize: 21,
                  letterSpacing: "0.06em",
                  color: HEAD,
                }}
              >
                {c.store.name}
              </h2>
              <p
                style={{
                  margin: "8px 0 0",
                  textAlign: "center",
                  fontFamily: GOTHIC,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: ACCENT,
                }}
              >
                {c.store.access}
              </p>

              <dl style={{ margin: "26px 0 0", borderTop: `1px solid ${RULE}` }}>
                {[
                  { k: "住所", v: c.store.address },
                  { k: "営業時間", v: c.store.hours },
                  { k: "レッスン", v: c.store.lesson },
                ].map((row) => (
                  <div
                    key={row.k}
                    style={{
                      display: "flex",
                      gap: 16,
                      padding: "14px 2px",
                      borderBottom: `1px solid ${RULE}`,
                    }}
                  >
                    <dt
                      style={{
                        flex: "none",
                        width: 66,
                        fontFamily: GOTHIC,
                        fontSize: 11.5,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: INK_MUTE,
                        lineHeight: 1.95,
                      }}
                    >
                      {row.k}
                    </dt>
                    <dd
                      style={{
                        margin: 0,
                        fontFamily: BODY,
                        fontSize: 13.5,
                        lineHeight: 1.95,
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
                  margin: "14px 0 0",
                  fontFamily: BODY,
                  fontSize: 11.5,
                  lineHeight: 1.85,
                  color: INK_MUTE,
                }}
              >
                {c.store.note}
              </p>

            </div>

            <div style={{ padding: `0 ${PAD}px` }}>
              {/*
                地図全体をリンクにして、顧客支給のGoogleマップへ飛ばす。
                iframe はクリックを自分で取ってしまうので `pointerEvents: none` で
                無効化し、上に重ねた <a> に拾わせている。
                副次的に、スマホでスクロール中に地図の中へ指が吸われる事故も防げる。
              */}
              <a
                href={c.store.mapHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${c.store.name}をGoogleマップで見る`}
                style={{
                  display: "block",
                  position: "relative",
                  marginTop: 20,
                  height: 210,
                  border: `1px solid ${RULE}`,
                  overflow: "hidden",
                  textDecoration: "none",
                }}
              >
                <iframe
                  src={c.store.mapEmbedSrc}
                  title={`${c.store.name}の地図`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  tabIndex={-1}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: 0,
                    display: "block",
                    pointerEvents: "none",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    // 右下ではなく右上に置く。Googleマップ埋め込みは下辺に
                    // ロゴと著作権表示が入り、利用規約上それを隠せないため。
                    right: 10,
                    top: 10,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "7px 12px",
                    background: "rgba(255,255,255,0.94)",
                    border: `1px solid ${RULE}`,
                    borderRadius: 999,
                    fontFamily: GOTHIC,
                    fontSize: 11.5,
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    color: HEAD,
                    boxShadow: "0 2px 8px rgba(20,50,70,0.14)",
                  }}
                >
                  {c.store.mapLinkLabel}
                  <span style={{ fontSize: 10 }}>↗</span>
                </span>
              </a>
            </div>
          </Section>

          {/* ─ ⑯ FAQ ──────────────────────────────────────── */}
          <Section>
            <Kicker text={c.faq.kicker} />
            <Head text={c.faq.heading} size={23} />
            <div style={{ marginTop: 26 }}>
              <FaqList
                items={c.faq.items}
                accent={ACCENT}
                rule={RULE}
                ink={INK}
                inkSoft={INK_SOFT}
              />
            </div>
          </Section>

          {/* ─ ⑰ クロージング（CTA 5/5）─────────────────────
              濃色で塗らず、淡いグラデーションでFVに呼応する静かな締めにする。 */}
          <Section
            style={{
              background: `linear-gradient(180deg, ${BASE} 0%, ${PALE} 34%, #E9F2F7 100%)`,
              paddingTop: 58,
              paddingBottom: 60,
            }}
          >
            <Kicker text={c.closing.kicker} />
            <Head text={c.closing.heading} size={25} />
            <p
              style={{
                margin: "22px 0 0",
                textAlign: "center",
                fontFamily: BODY,
                fontSize: 13.5,
                lineHeight: 2.15,
                color: INK_SOFT,
              }}
            >
              {nl(c.closing.body)}
            </p>
            <div
              style={{
                margin: "26px 0 0",
                display: "grid",
                gridTemplateColumns: "repeat(2, max-content)",
                justifyContent: "center",
                gap: "13px 26px",
              }}
            >
              {c.closing.chips.map((t) => (
                <DotItem key={t} text={t} color={ACCENT} />
              ))}
            </div>
            <OfferType
              label={c.closing.label}
              was={c.closing.was}
              nowLabel={c.closing.nowLabel}
              now={c.closing.now}
              nowUnit={c.closing.nowUnit}
            />
            <Cta />
          </Section>

          {/* ─ 予約フォーム ───────────────────────────────── */}
          <Section id="form">
            {/*
              LPForm は全LP共通で、入力欄の枠（#DDD6C8）と必須タグ（#C25B4B）が
              パターンA由来の暖色で固定されている。共通側は触らず、このLPの中だけ
              青系に寄せる。枠色はインラインなので !important でしか上書きできない。
            */}
            <style>{`
              #form input, #form textarea, #form select { border-color: ${RULE} !important; border-radius: 4px !important; }
              #form .lpform-toggle[data-selected="false"] { border-color: ${RULE} !important; border-radius: 4px !important; }
              #form .lpform-toggle[data-selected="true"] { border-radius: 4px !important; }
              #form .lpform-required-tag { color: ${ACCENT} !important; }
              #form .lpform-optional-tag { color: ${INK_MUTE} !important; }
            `}</style>

            <Kicker text={c.form.kicker} />
            <Head text={c.form.heading} size={22} />
            <p
              style={{
                margin: "20px 0 26px",
                textAlign: "center",
                fontFamily: BODY,
                fontSize: 13.5,
                lineHeight: 2,
                color: INK_SOFT,
              }}
            >
              {nl(c.form.lead)}
            </p>

            <LPForm
              clientSlug={c.slug}
              fields={c.form.fields}
              accent={ACCENT}
              submitLabel={c.form.submitLabel}
              submitStyle={{ background: CTA_GRAD, boxShadow: `0 8px 22px ${CTA_SHADOW}` }}
              microcopy={
                <span style={{ color: HEAD, fontSize: 12.5, fontWeight: 700 }}>
                  {c.form.microcopy}
                </span>
              }
              disclaimer={nl(c.form.disclaimer)}
              errorMessage={c.form.errorMessage}
            />
          </Section>

          {/* ─ フッター ───────────────────────────────────── */}
          <footer
            style={{
              background: BASE,
              borderTop: `1px solid ${RULE}`,
              padding: "26px 20px 30px",
              textAlign: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.header.logo.src ?? ""}
              alt="STUDIO IVY"
              style={{ width: 126, height: "auto", display: "inline-block" }}
            />
            <p
              style={{
                margin: "6px 0 0",
                fontFamily: GOTHIC,
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: INK_SOFT,
              }}
            >
              {c.footer.brandSub}
            </p>
            <p style={{ margin: "16px 0 0", fontSize: 10, color: INK_MUTE }}>
              © {new Date().getFullYear()} STUDIO IVY
            </p>
          </footer>
        </LPCanvas>
      </div>

      {/* ─ 追従CTA ─────────────────────────────────────── */}
      <StickyFooterCTA
        anchor={c.cta.anchor}
        buttonText={c.sticky.buttonText}
        showAfter={640}
        buttonGradient={CTA_GRAD}
        shadowColor={CTA_SHADOW}
        borderColor="rgba(43,75,94,0.14)"
        offers={[
          <span
            key="offer"
            style={{
              display: "inline-flex",
              alignItems: "baseline",
              gap: 5,
              fontFamily: GOTHIC,
              color: HEAD,
            }}
          >
            <span style={{ fontSize: 11.5, fontWeight: 700 }}>
              {c.sticky.offerLabel}
            </span>
            <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.01em" }}>
              {c.sticky.offerValue}
            </span>
          </span>,
          <span
            key="was"
            style={{
              fontFamily: GOTHIC,
              fontSize: 11,
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

/* ── ⑩⑬ で使う小さな部品 ──────────────────────────────────── */

const reasonTitleStyle: CSSProperties = {
  margin: "12px 0 0",
  fontFamily: MINCHO,
  fontWeight: 600,
  fontSize: 21,
  lineHeight: 1.65,
  letterSpacing: "0.045em",
  color: HEAD,
};

const reasonBodyStyle: CSSProperties = {
  margin: "12px 0 0",
  fontFamily: BODY,
  fontSize: 13.5,
  lineHeight: 2,
  color: INK_SOFT,
};

/** 「選ばれる理由」の番号ラベル。短い罫と組で置く。 */
function ReasonLabel({ num }: { num: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span
        style={{
          fontFamily: GOTHIC,
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: "0.2em",
          color: ACCENT,
        }}
      >
        REASON {num}
      </span>
      <span style={{ flex: 1, height: 1, background: RULE }} />
    </div>
  );
}

/** ⑬体験レッスンの流れの1ステップ。左に細い縦線を通す。 */
function FlowStep({
  step,
  last,
}: {
  step: { num: string; title: string; body: string };
  last: boolean;
  index: number;
}) {
  return (
    <div style={{ display: "flex", gap: 15 }}>
      <div
        style={{
          flex: "none",
          width: 9,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span
          style={{
            width: 9,
            height: 9,
            marginTop: 8,
            borderRadius: "50%",
            background: ACCENT,
          }}
        />
        {!last && <span style={{ flex: 1, width: 1, background: RULE }} />}
      </div>
      <div style={{ paddingBottom: last ? 0 : 24 }}>
        <p
          style={{
            margin: 0,
            fontFamily: GOTHIC,
            fontSize: 10.5,
            fontWeight: 800,
            letterSpacing: "0.2em",
            color: BRAND,
          }}
        >
          STEP {step.num}
        </p>
        <h3
          style={{
            margin: "5px 0 0",
            fontFamily: MINCHO,
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: "0.04em",
            color: HEAD,
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            margin: "9px 0 0",
            fontFamily: BODY,
            fontSize: 13.5,
            lineHeight: 1.95,
            color: INK_SOFT,
          }}
        >
          {step.body}
        </p>
      </div>
    </div>
  );
}
