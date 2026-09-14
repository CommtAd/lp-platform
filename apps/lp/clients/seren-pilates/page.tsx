import type { ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPCanvas from "@/components/LPCanvas";
import StickyFooterCTA from "@/components/StickyFooterCTA";
import ImageSlot from "@/components/ImageSlot";
import FaqList from "./FaqList";
import config from "./config";

/**
 * Seren Pilates Studio — 指示書の18セクション構成。
 *
 * 守っているルール:
 *   1. 幅390pxの1枚のキャンバス（`<LPCanvas>`）。`vw` / `vh` は使わない
 *      （CLAUDE.md §16-17）。キャンバス外の地色を敷く `100vh` だけが例外。
 *   2. 予約CTAは4箇所のみ（体験キャンペーン・選ばれる理由・体験の流れ・
 *      クロージングの各末尾）。ボタンの上に小見出しは置かない。
 *   3. 配色は3色＋中間トーン1色。ブランドに無い色（ゴールド等）を足さない。
 *   4. 料金プランのセクションは「一旦非表示」の指示により丸ごと出していない
 *      （config にもデータを持たせていない。復活させるときは両方に足すこと）。
 *
 * 予約は hacomono へ外部遷移するためページ内フォームを持たない。
 * `scripts/check-rules.ts` の FORM_EXEMPT に `seren-pilates` を登録済み。
 */

/** hex を白（amt>0）／黒（amt<0）へ寄せる。配色を1色から派生させるため。 */
function shade(hex: string, amt: number): string {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((ch) => ch + ch).join("");
  let r = parseInt(h.slice(0, 2), 16),
    g = parseInt(h.slice(2, 4), 16),
    b = parseInt(h.slice(4, 6), 16);
  const mix = amt < 0 ? 0 : 255,
    t = Math.abs(amt);
  r = Math.round(r + (mix - r) * t);
  g = Math.round(g + (mix - g) * t);
  b = Math.round(b + (mix - b) * t);
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

/** "\n" を <br> にする。見出しの改行位置は config 側で指定する。 */
function nl(text: string): ReactNode {
  const parts = text.split("\n");
  return parts.map((p, i) => (
    <span key={i}>
      {p}
      {i < parts.length - 1 && <br />}
    </span>
  ));
}

const c = config;

/* ── 配色（3色＋中間トーン1色。公式サイトとロゴの実測値から） ───────── */
const accent = c.accent; // #4E5F56 深いセージ。白地 6.8:1
const accentMid = "#6B8A72"; // 価格・チェックアイコンの強調。白地 3.8:1
const base = "#FCFBF7"; // 基本の地（ほぼ白）
const cream = "#FAF3E2"; // 淡色の地（ロゴの地色そのまま）
const creamDeep = "#F0E8D4";
const creamGrad = `linear-gradient(180deg, ${cream} 0%, ${creamDeep} 100%)`;
const accentGrad = `linear-gradient(150deg, ${shade(accent, 0.14)} 0%, ${accent} 52%, ${shade(accent, -0.2)} 100%)`;
const accentSoft = accent + "1F";
const accentGlow = accent + "55";
/*
   CTAボタン。ページ内で最もコントラストが強い要素にするため、淡色の地でも
   白地でも沈まない濃いセージのグラデーションで固定する（追従フッターと共用）。
*/
const ctaGrad = `linear-gradient(135deg, ${shade(accent, 0.12)} 0%, ${shade(accent, -0.18)} 100%)`;
const ink = "#33372F";
const inkSoft = "#5F6459";
const inkMute = "#94998C";

const fontMincho = "'Shippori Mincho', serif";
const fontGothic = "'Zen Kaku Gothic New', sans-serif";

/** セクション見出し（明朝＋短い下線）。淡色・白地では accent、濃色地では白。 */
function SectionHeading({
  text,
  variant = "accent",
  fontSize = 22,
}: {
  text: string;
  variant?: "accent" | "white";
  fontSize?: number;
}) {
  const color = variant === "white" ? "#FFFFFF" : accent;
  const rule = variant === "white" ? "rgba(255,255,255,0.6)" : accent;
  return (
    <div style={{ textAlign: "center" }}>
      <h2
        style={{
          fontFamily: fontMincho,
          fontWeight: 600,
          fontSize,
          letterSpacing: "0.06em",
          color,
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {nl(text)}
      </h2>
      <div
        style={{
          width: 30,
          height: 2,
          background: rule,
          borderRadius: 2,
          margin: "14px auto 0",
        }}
      />
    </div>
  );
}

const CheckIcon = ({ color = accentMid }: { color?: string }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flex: "none", marginTop: 3 }}
  >
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

/**
 * 予約CTA。指示書どおり4箇所だけで使う。上に小見出しは置かず、
 * ボタンの下に注記1行だけを添える。
 */
function ReserveCta({ variant = "light" }: { variant?: "light" | "dark" }) {
  return (
    <div style={{ marginTop: 30 }}>
      <a
        href={c.reserve.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          height: 58,
          background: ctaGrad,
          color: "#FFFFFF",
          textDecoration: "none",
          fontFamily: fontGothic,
          fontSize: 15.5,
          fontWeight: 700,
          letterSpacing: "0.04em",
          borderRadius: 999,
          boxShadow: "0 10px 22px rgba(30,45,36,0.30)",
        }}
      >
        {c.reserve.label}
        <span style={{ fontSize: 13 }}>›</span>
      </a>
      <p
        style={{
          textAlign: "center",
          fontSize: 11,
          lineHeight: 1.8,
          color: variant === "dark" ? "rgba(255,255,255,0.78)" : inkMute,
          letterSpacing: "0.02em",
          margin: "12px 0 0",
        }}
      >
        {c.reserve.note}
      </p>
    </div>
  );
}

/**
 * 体験キャンペーンのブロック（⑥⑪⑰で使い回す）。
 * `compact` はクロージング用で、期限バッジと二重価格だけに絞る。
 */
function CampaignBlock({ compact = false }: { compact?: boolean } = {}) {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <span
          style={{
            display: "inline-block",
            background: accent,
            color: "#FFFFFF",
            fontFamily: fontGothic,
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: "0.1em",
            padding: "7px 15px",
            borderRadius: 4,
          }}
        >
          {c.campaign.badge}
        </span>
        {!compact && (
          <>
            <div>
              <h3
                style={{
                  fontFamily: fontMincho,
                  fontWeight: 600,
                  fontSize: 29,
                  letterSpacing: "0.04em",
                  color: ink,
                  margin: "16px 0 0",
                  background: `linear-gradient(transparent 68%, ${cream} 68%)`,
                  display: "inline-block",
                  padding: "0 4px",
                }}
              >
                {c.campaign.title}
              </h3>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.95, color: inkSoft, margin: "16px 0 0" }}>
              {nl(c.campaign.lead)}
            </p>
          </>
        )}
      </div>

      {/*
        二重価格。「完全無料」は4文字でも58pxあるため横並びにすると収まらない。
        通常価格を上段にまとめ、↓ をはさんで下段に特大で置く縦積みにしている。
      */}
      <div style={{ marginTop: compact ? 18 : 26, textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              background: accent,
              color: "#FFFFFF",
              fontFamily: fontGothic,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.06em",
              padding: "6px 13px",
              borderRadius: 4,
              whiteSpace: "nowrap",
            }}
          >
            体験レッスン
          </span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontSize: 12, color: inkSoft }}>通常</span>
            <span
              style={{
                position: "relative",
                fontFamily: fontMincho,
                fontSize: 21,
                color: ink,
              }}
            >
              {c.campaign.trialRegular}
              <span style={{ fontSize: 12 }}>円</span>
              {/* 打ち消し線。ブランドに無い赤を足さないよう、メインカラーで引く。 */}
              <span
                style={{
                  position: "absolute",
                  left: -2,
                  right: -2,
                  top: "55%",
                  height: 1.5,
                  background: accent,
                  transform: "rotate(-8deg)",
                }}
              />
            </span>
            <span style={{ fontSize: 11, color: inkMute }}>税込</span>
          </div>
        </div>
        <div style={{ fontSize: 20, lineHeight: 1, color: accentMid, margin: "12px 0 4px" }}>↓</div>
        <div
          style={{
            fontFamily: fontMincho,
            fontWeight: 700,
            fontSize: 58,
            lineHeight: 1.2,
            letterSpacing: "0.04em",
            color: accent,
          }}
        >
          {c.campaign.trialNow}
        </div>
      </div>
    </>
  );
}

export default function Page() {
  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div
        style={{
          fontFamily: "'Noto Sans JP', sans-serif",
          /* 長音符・小書き仮名が行頭に来ないよう禁則処理を厳密に。 */
          lineBreak: "strict",
          background: "#E7E2D6",
          minHeight: "100vh",
          color: ink,
        }}
      >
        <LPCanvas style={{ background: base }} boxShadow="0 0 60px rgba(60,70,60,0.16)">
          {/* ── ① ヘッダー ── */}
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "13px 18px",
              background: "#FFFFFF",
            }}
          >
            <div style={{ lineHeight: 1.25 }}>
              <div
                style={{
                  fontFamily: fontMincho,
                  fontSize: 18,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: accent,
                }}
              >
                {c.header.brand}
              </div>
              <div style={{ fontSize: 9, letterSpacing: "0.14em", color: inkMute }}>
                {c.header.brandSub}
              </div>
            </div>
            <div style={{ textAlign: "right", lineHeight: 1.5 }}>
              {c.header.stores.map((s) => (
                <div
                  key={s}
                  style={{
                    fontFamily: fontGothic,
                    fontWeight: 700,
                    fontSize: 13,
                    color: ink,
                    letterSpacing: "0.03em",
                  }}
                >
                  {s}
                </div>
              ))}
              {c.header.note && (
                <div style={{ fontSize: 9, color: inkMute, letterSpacing: "0.04em" }}>
                  {c.header.note}
                </div>
              )}
            </div>
          </header>

          {/* ── ② オファーバー ── */}
          <div
            style={{
              position: "relative",
              zIndex: 5,
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: `linear-gradient(120deg, ${shade(accent, 0.16)} 0%, ${accent} 55%, ${shade(accent, -0.16)} 100%)`,
              padding: "14px 18px",
              boxShadow: "0 3px 10px rgba(60,70,60,0.18)",
            }}
          >
            <span
              style={{
                flex: "none",
                display: "inline-flex",
                alignItems: "center",
                fontFamily: fontGothic,
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: "0.02em",
                lineHeight: 1.2,
                whiteSpace: "nowrap",
                color: accent,
                background: `linear-gradient(135deg, #FFFDF6 0%, ${cream} 100%)`,
                borderRadius: 8,
                padding: "7px 13px",
                boxShadow: "0 2px 6px rgba(30,40,32,0.26)",
              }}
            >
              {c.offerBar.badgeText}
            </span>
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  fontFamily: fontGothic,
                  fontWeight: 700,
                  fontSize: 19,
                  letterSpacing: "0.05em",
                  color: "#FFFFFF",
                  textShadow: "0 1px 5px rgba(20,30,24,0.5)",
                  lineHeight: 1.2,
                  textAlign: "center",
                }}
              >
                {c.offerBar.text}
              </div>
            </div>
          </div>

          {/* ── ③ 監修バー ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: c.supervision.num ? 6 : 0,
              background: "#FFFFFF",
              color: ink,
              padding: "8px 18px",
              boxShadow: "0 2px 6px rgba(60,70,60,0.08)",
            }}
          >
            <span style={{ fontSize: 13, letterSpacing: "0.02em" }}>{c.supervision.pre}</span>
            {c.supervision.num && (
              <span
                style={{
                  fontFamily: fontGothic,
                  fontWeight: 700,
                  fontSize: 15,
                  lineHeight: 1,
                  color: accent,
                }}
              >
                {c.supervision.num}
              </span>
            )}
            <span style={{ fontSize: 13, letterSpacing: "0.02em" }}>{c.supervision.post}</span>
          </div>

          {/* ── ④ FV：写真全面＋縦書きキャッチ（白い札2枚）＋円形バッジ ── */}
          {/*
            写真の領域には縦書きキャッチとバッジしか置かない。サブコピーや
            チップを同じ領域に重ねると、文量が増えたときに縦書きの真下へ
            回り込んで文字が被る（rinne で実際に起きた）。
          */}
          <section style={{ position: "relative", height: 480, overflow: "hidden", background: accent }}>
            <ImageSlot
              src={c.fv.hero.src}
              placeholder={c.fv.hero.placeholder}
              objectPosition={c.fv.hero.position ?? "center"}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(20,30,24,0.06) 0%, rgba(20,30,24,0) 34%, rgba(20,30,24,0.42) 100%)",
                pointerEvents: "none",
              }}
            />
            {/* 縦書きメインコピー。配列の先頭が右に来る。 */}
            <div
              style={{
                position: "absolute",
                top: 34,
                left: 24,
                zIndex: 2,
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "flex-start",
                gap: 6,
                pointerEvents: "none",
              }}
            >
              {c.fv.catchLines.map((line, i) => (
                <div
                  key={i}
                  style={{
                    writingMode: "vertical-rl",
                    fontFamily: fontMincho,
                    fontWeight: 600,
                    fontSize: 21,
                    letterSpacing: "0.12em",
                    lineHeight: 1.7,
                    color: ink,
                    background: "#FFFFFF",
                    padding: "12px 6px",
                    borderRadius: 4,
                    boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
            {/* 右上の円形バッジ */}
            <div
              style={{
                position: "absolute",
                top: 36,
                right: 20,
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                pointerEvents: "none",
              }}
            >
              {c.fv.chips.map((chip) => (
                <div
                  key={chip.big}
                  style={{
                    width: 84,
                    height: 84,
                    borderRadius: "50%",
                    background: accent,
                    border: "1.5px solid rgba(255,255,255,0.55)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1.25,
                    color: "#FFFFFF",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.22)",
                  }}
                >
                  <span style={{ fontSize: 10.5, letterSpacing: "0.04em", color: cream }}>
                    {chip.small}
                  </span>
                  <span style={{ fontFamily: fontGothic, fontWeight: 700, fontSize: 21 }}>
                    {chip.big}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ── ⑤ FV下のメインカラー帯（サブコピー2行＋悩みワードの丸チップ） ── */}
          <div style={{ background: accent, padding: "28px 24px 34px" }}>
            <div style={{ textAlign: "center" }}>
              {c.fv.subLines.map((line) => (
                <p
                  key={line}
                  style={{
                    fontFamily: fontGothic,
                    fontWeight: 500,
                    fontSize: 16,
                    letterSpacing: "0.04em",
                    lineHeight: 1.85,
                    color: "#FFFFFF",
                    margin: 0,
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
                  gap: 6,
                  marginTop: 14,
                }}
              >
                {c.fv.notes.map((n) => (
                  <span
                    key={n}
                    style={{
                      fontSize: 12.5,
                      letterSpacing: "0.02em",
                      color: "#FFFFFF",
                      background: "rgba(255,255,255,0.14)",
                      border: "1px solid rgba(255,255,255,0.38)",
                      borderRadius: 999,
                      padding: "5px 12px",
                    }}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── ⑥ 体験キャンペーン ＋ CTA 1/4 ── */}
          <section style={{ background: base, padding: "42px 26px 48px" }}>
            <CampaignBlock />
            <ReserveCta />
          </section>

          {/* ── ⑦ お悩み訴求 ── */}
          <section style={{ background: creamGrad, padding: "54px 26px" }}>
            <SectionHeading text={c.worry.heading} fontSize={22} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 30 }}>
              {c.worry.items.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#FFFFFF",
                    borderRadius: 12,
                    padding: "14px 13px",
                    boxShadow: "0 4px 12px rgba(60,70,60,0.06)",
                  }}
                >
                  <CheckIcon />
                  <span style={{ fontSize: 14, lineHeight: 1.7, color: "#4A4F46" }}>{nl(item)}</span>
                </div>
              ))}
            </div>
            {/*
              受けの一文。白プレートに載せると上の白カード5枚と同化するため、
              メインカラーの地に白抜き明朝で反転させて視線を止める。
            */}
            <div
              style={{
                marginTop: 34,
                background: accentGrad,
                borderRadius: 16,
                padding: "30px 20px",
                boxShadow: `0 10px 24px ${accentGlow}`,
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  fontFamily: fontMincho,
                  fontWeight: 600,
                  fontSize: 22,
                  lineHeight: 1.8,
                  letterSpacing: "0.05em",
                  margin: 0,
                  color: "#FFFFFF",
                }}
              >
                {nl(c.worry.closing)}
              </p>
            </div>
          </section>

          {/* ── ⑧ 目指せる未来 ── */}
          <section style={{ background: base, padding: "56px 26px 60px" }}>
            <SectionHeading text={c.future.heading} fontSize={22} />
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 32 }}>
              {c.future.items.map((item) => (
                <div
                  key={item.num}
                  style={{
                    display: "flex",
                    alignItems: "stretch",
                    /* cover は短辺基準で拡大率が決まる。高さを確保しておかないと
                       正方形に近い素材でも被写体が小さくなる。 */
                    minHeight: 128,
                    background: "#F5F1E7",
                    borderRadius: 14,
                    overflow: "hidden",
                  }}
                >
                  <ImageSlot
                    src={item.img.src}
                    placeholder={item.img.placeholder}
                    style={{ width: 130, flex: "none", alignSelf: "stretch" }}
                  />
                  <div style={{ flex: 1, padding: "16px 16px 16px 15px" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <span
                        style={{
                          fontFamily: fontGothic,
                          fontWeight: 700,
                          fontSize: 13,
                          letterSpacing: "0.06em",
                          color: accentMid,
                        }}
                      >
                        {item.num}
                      </span>
                      <span style={{ width: 1, height: 12, background: "#CFCBBC" }} />
                      <h3
                        style={{
                          fontFamily: fontGothic,
                          fontWeight: 700,
                          fontSize: 15,
                          lineHeight: 1.5,
                          letterSpacing: "0.02em",
                          margin: 0,
                          color: ink,
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        lineHeight: 1.8,
                        color: inkSoft,
                        margin: "10px 0 0",
                      }}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p
              style={{
                textAlign: "center",
                fontFamily: fontMincho,
                fontWeight: 600,
                fontSize: 20,
                lineHeight: 1.8,
                letterSpacing: "0.04em",
                color: ink,
                margin: "32px 0 0",
              }}
            >
              {nl(c.future.closing)}
            </p>
          </section>

          {/* ── ⑨ 選ばれる理由 01〜04 ＋ CTA 2/4 ── */}
          <section style={{ background: creamGrad, padding: "58px 26px 64px" }}>
            <SectionHeading text={c.reasons.heading} fontSize={24} />
            {c.reasons.items.map((item, idx) => (
              <div key={item.num} style={{ marginTop: idx === 0 ? 44 : 48 }}>
                <div style={{ position: "relative" }}>
                  <ImageSlot
                    src={item.img.src}
                    placeholder={item.img.placeholder}
                    objectPosition={item.img.position ?? "center"}
                    radius={16}
                    style={{ width: "100%", height: 210 }}
                  />
                  {/* 右上の菱形バッジ */}
                  <div
                    style={{
                      position: "absolute",
                      top: -16,
                      right: 16,
                      width: 50,
                      height: 50,
                      transform: "rotate(45deg)",
                      background: accent,
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 6px 14px ${accentGlow}`,
                    }}
                  >
                    <span
                      style={{
                        transform: "rotate(-45deg)",
                        fontFamily: fontGothic,
                        fontWeight: 700,
                        fontSize: 19,
                        color: "#FFFFFF",
                      }}
                    >
                      {item.num}
                    </span>
                  </div>
                </div>
                <h3
                  style={{
                    fontFamily: fontGothic,
                    fontWeight: 700,
                    fontSize: 19,
                    lineHeight: 1.6,
                    letterSpacing: "0.03em",
                    margin: "22px 0 0",
                    color: ink,
                    textAlign: "center",
                  }}
                >
                  {nl(item.title)}
                </h3>
                <div style={{ width: 40, height: 2, background: "#D7D1C0", margin: "12px auto 0" }} />
                <p style={{ fontSize: 14.5, lineHeight: 2, color: inkSoft, margin: "16px 0 0" }}>
                  {item.body}
                </p>
              </div>
            ))}
            <ReserveCta />
          </section>

          {/* ── ⑩ 料金プラン：指示書「一旦非表示」により非掲載。
                 復活させるときは config に `plans` を足したうえでここに置く。 ── */}

          {/* ── ⑪ 体験キャンペーン再掲（CTAは置かない。指示書のCTA4箇所ルール） ── */}
          <section style={{ background: base, padding: "50px 26px 54px" }}>
            <CampaignBlock />
          </section>

          {/* ── ⑫ 姿勢診断（AI姿勢分析）の説明 ── */}
          <section style={{ background: base, padding: "10px 26px 56px" }}>
            <SectionHeading text={c.posture.heading} fontSize={20} />
            <ImageSlot
              src={c.posture.photo.src}
              placeholder={c.posture.photo.placeholder}
              radius={16}
              style={{ width: "100%", height: 220, marginTop: 32 }}
            />
            <p style={{ fontSize: 14.5, lineHeight: 2.05, color: inkSoft, margin: "24px 0 0" }}>
              {c.posture.body}
            </p>
            <div
              style={{
                background: cream,
                borderRadius: 14,
                padding: "22px 20px",
                marginTop: 24,
              }}
            >
              <p
                style={{
                  fontFamily: fontGothic,
                  fontWeight: 700,
                  fontSize: 14.5,
                  letterSpacing: "0.06em",
                  color: accent,
                  margin: "0 0 14px",
                }}
              >
                確認する内容
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {c.posture.items.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <CheckIcon />
                    <span style={{ fontSize: 14, lineHeight: 1.7, color: "#4A4F46" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── ⑬ 体験レッスンの流れ ＋ CTA 3/4 ── */}
          <section style={{ background: creamGrad, padding: "54px 26px 60px" }}>
            <SectionHeading text={c.flow.heading} fontSize={24} />
            <div style={{ display: "flex", flexDirection: "column", marginTop: 34 }}>
              {c.flow.steps.map((step, i) => {
                const last = i === c.flow.steps.length - 1;
                return (
                  <div key={step.num} style={{ display: "flex", gap: 16 }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flex: "none",
                      }}
                    >
                      <span
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          background: accent,
                          color: "#FFFFFF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: fontGothic,
                          fontWeight: 700,
                          fontSize: 18,
                          flex: "none",
                        }}
                      >
                        {step.num}
                      </span>
                      {!last && <span style={{ width: 2, flex: 1, background: "#DCD6C6" }} />}
                    </div>
                    <div style={{ paddingBottom: last ? 0 : 26 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: 10,
                          flexWrap: "wrap",
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: fontGothic,
                            fontWeight: 700,
                            fontSize: 17,
                            letterSpacing: "0.02em",
                            margin: 0,
                            color: ink,
                          }}
                        >
                          {step.title}
                        </h3>
                        {step.time && (
                          <span style={{ fontSize: 11, color: inkMute }}>{step.time}</span>
                        )}
                      </div>
                      <p style={{ fontSize: 14, lineHeight: 1.9, color: inkSoft, margin: "8px 0 0" }}>
                        {step.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <ReserveCta />
          </section>

          {/* ── ⑭ 初めてでも大丈夫 ── */}
          <section style={{ background: base, padding: "54px 26px" }}>
            <SectionHeading text={c.beginner.heading} fontSize={21} />
            <p style={{ fontSize: 14.5, lineHeight: 2.05, color: inkSoft, margin: "24px 0 0" }}>
              {c.beginner.body}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginTop: 26,
              }}
            >
              {c.beginner.items.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 7,
                    background: cream,
                    borderRadius: 12,
                    padding: "14px 12px",
                  }}
                >
                  <CheckIcon />
                  <span style={{ fontSize: 13, lineHeight: 1.7, color: "#4A4F46" }}>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── ⑮ 店舗情報 ── */}
          <section id="stores" style={{ background: creamGrad, padding: "54px 26px" }}>
            <SectionHeading text={c.stores.heading} fontSize={24} />
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 30 }}>
              {c.stores.items.map((store) => (
                <div
                  key={store.name}
                  style={{
                    background: base,
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 6px 16px rgba(60,70,60,0.10)",
                  }}
                >
                  <ImageSlot
                    src={store.img.src}
                    placeholder={store.img.placeholder}
                    style={{ width: "100%", height: 250 }}
                  />
                  <div style={{ padding: 20 }}>
                    <h3
                      style={{
                        fontFamily: fontGothic,
                        fontWeight: 700,
                        fontSize: 20,
                        letterSpacing: "0.05em",
                        margin: 0,
                        color: ink,
                      }}
                    >
                      {store.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: fontMincho,
                        fontWeight: 600,
                        fontSize: 15.5,
                        lineHeight: 1.8,
                        letterSpacing: "0.04em",
                        color: accent,
                        margin: "10px 0 0",
                      }}
                    >
                      {nl(store.appeal)}
                    </p>
                    <div style={{ height: 1, background: "#EFEADE", margin: "16px 0" }} />
                    <p style={{ fontSize: 14, lineHeight: 1.9, color: inkSoft, margin: 0 }}>
                      {nl(store.address)}
                      <br />
                      <span style={{ color: accent, fontWeight: 700 }}>{store.hours}</span>
                      <br />
                      {store.closed}
                    </p>
                    <div style={{ marginTop: 12 }}>
                      {store.access.map((a) => (
                        <div
                          key={a}
                          style={{ display: "flex", alignItems: "flex-start", gap: 7, marginTop: 6 }}
                        >
                          <CheckIcon />
                          <span style={{ fontSize: 13, lineHeight: 1.7, color: inkSoft }}>{a}</span>
                        </div>
                      ))}
                    </div>
                    {store.mapEmbedSrc && (
                      <iframe
                        src={store.mapEmbedSrc}
                        title={`${store.name}の地図`}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: 150,
                          marginTop: 16,
                          border: 0,
                          borderRadius: 10,
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── ⑯ FAQ ── */}
          <section style={{ background: accentGrad, padding: "54px 26px" }}>
            <SectionHeading text={c.faq.heading} variant="white" fontSize={24} />
            <div style={{ marginTop: 28 }}>
              <FaqList items={c.faq.items} accent={accent} accentSoft={accentSoft} />
            </div>
          </section>

          {/* ── ⑰ クロージング ＋ CTA 4/4 ── */}
          <section id="reserve" style={{ background: base, padding: "56px 26px 64px" }}>
            <SectionHeading text={c.closing.heading} fontSize={21} />
            <p
              style={{
                textAlign: "center",
                fontFamily: fontMincho,
                fontWeight: 600,
                fontSize: 16,
                lineHeight: 1.9,
                letterSpacing: "0.04em",
                color: ink,
                margin: "22px 0 0",
              }}
            >
              {nl(c.closing.lead)}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 7,
                marginTop: 22,
              }}
            >
              {c.closing.chips.map((chip) => (
                <span
                  key={chip}
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.02em",
                    color: accent,
                    border: `1px solid ${accentSoft}`,
                    background: accentSoft,
                    borderRadius: 999,
                    padding: "6px 12px",
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <CampaignBlock compact />
            </div>
            <ReserveCta />
          </section>
        </LPCanvas>
      </div>

      {/* ── ⑱ 追従フッターCTA ── */}
      <StickyFooterCTA
        href={c.reserve.url}
        buttonText={c.sticky.buttonText}
        showAfter={c.sticky.showAfter}
        buttonGradient={ctaGrad}
        shadowColor="rgba(30,45,36,0.35)"
        borderColor={`${accent}59`}
        offers={c.sticky.offers.map((o) => (
          <span key={o.label} style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
            <span style={{ fontSize: 11, color: inkSoft, letterSpacing: "0.02em" }}>{o.label}</span>
            <span
              style={{
                fontFamily: fontMincho,
                fontWeight: 700,
                fontSize: 17,
                lineHeight: 1,
                color: accent,
              }}
            >
              {o.value}
            </span>
          </span>
        ))}
      />
    </LPShell>
  );
}
