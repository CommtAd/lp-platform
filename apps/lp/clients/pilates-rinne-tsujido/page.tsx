import type { ReactNode } from "react";
import LPShell from "@/components/LPShell";
import StickyFooterCTA from "@/components/StickyFooterCTA";
import ImageSlot from "@/components/ImageSlot";
import FaqList from "./FaqList";
import TelLink from "./TelLink";
import config from "./config";

/**
 * ピラティスRINNE — 構成案 §15 の13セクション構成。
 *
 * テンプレA（_base-a）の配色・タイポ・見出し様式は踏襲しつつ、セクション構成は
 * ブリーフ §15 に合わせている（④比較表・⑤姿勢診断・⑦初心者・⑧お客様の声・
 * ⑬最終予約エリアはテンプレAに無いセクション）。
 *
 * 予約は §16 に従い全CTAが hacomono の店舗別ウィジェットへ遷移する（LPForm 非使用）。
 * このため scripts/check-rules.ts の FORM_EXEMPT に pilates-rinne を登録している。
 * LPShell は必須のため維持。
 */

/* Derive navy tones from the accent, mirroring the design's renderVals(). */
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

/** Render "\n"-separated text as line breaks. */
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
const accent = c.accent;
/* 実サイト（rinne-pilates.com）の実測値。深緑×クリーム×白の3色構成で、
   パターンA由来のゴールドは一切使わない。 */
const cream = "#E6D2BE";
const creamSoft = "#F1E6D6";
const accentMid = "#2E7D5B"; // 価格・チェック等の強調用に、見出しのdeep greenより明るい中間トーン
const navyGrad = `linear-gradient(158deg, ${shade(accent, 0.14)} 0%, ${accent} 52%, ${shade(accent, -0.18)} 100%)`;
const accentSoft = accent + "22";
const accentGlow = accent + "55";
const goldGrad = `linear-gradient(160deg, ${accentMid} 0%, ${accent} 100%)`;
const goldBtn = `linear-gradient(135deg, ${creamSoft} 0%, ${cream} 100%)`;
/* StickyFooterCTAの共通コンポーネントはボタン文字色が白固定のため、
   クリーム地のgoldBtnではなく白文字が読める濃緑グラデーションを使う。 */
const stickyBtnGrad = `linear-gradient(135deg, ${shade(accent, 0.12)} 0%, ${shade(accent, -0.15)} 100%)`;
const creamGrad = "linear-gradient(180deg, #F3E8D8 0%, #E9DAC4 100%)";
const fontMincho = "'Shippori Mincho', serif";
const fontGothic = "'Zen Kaku Gothic New', serif";

/** Accent (or white) heading with a short underline rule. */
function SectionHeading({
  text,
  variant = "accent",
  fontSize = 22,
  nowrap = false,
}: {
  text: string;
  variant?: "accent" | "white";
  fontSize?: number;
  nowrap?: boolean;
}) {
  const color = variant === "white" ? "#FFFFFF" : accent;
  const rule = variant === "white" ? "rgba(255,255,255,0.55)" : accent;
  return (
    <div style={{ textAlign: "center" }}>
      <h2
        style={{
          fontFamily: fontMincho,
          fontWeight: 600,
          fontSize,
          letterSpacing: "0.08em",
          color,
          lineHeight: 1.5,
          margin: 0,
          whiteSpace: nowrap ? "nowrap" : undefined,
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

const CheckIcon = ({ color = accent }: { color?: string }) => (
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
 * 予約CTA。§16 の設置箇所すべてで使う。店舗別に hacomono ウィジェットへ遷移する。
 * url が null（未確定）の場合は死んだリンクを出さず、設定待ちである旨を表示する。
 */
function ReserveCta({ variant = "light" }: { variant?: "light" | "dark" }) {
  const eyebrowColor = variant === "dark" ? "rgba(255,255,255,0.85)" : "#62655B";
  const noteColor = variant === "dark" ? "rgba(255,255,255,0.7)" : "#9A9C90";
  return (
    <div style={{ marginTop: 28 }}>
      <p
        style={{
          textAlign: "center",
          fontSize: 12,
          letterSpacing: "0.08em",
          color: eyebrowColor,
          margin: "0 0 12px",
          textShadow: variant === "dark" ? "0 1px 6px rgba(0,0,0,0.45)" : undefined,
        }}
      >
        {c.reserve.eyebrow}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {c.reserve.stores.map((s) =>
          s.url ? (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                height: 58,
                background: goldBtn,
                color: accent,
                textDecoration: "none",
                fontSize: 15.5,
                fontWeight: 700,
                letterSpacing: "0.04em",
                borderRadius: 999,
                boxShadow: "0 10px 22px rgba(0,40,30,0.28)",
              }}
            >
              {s.label}
              <span style={{ fontSize: 13 }}>›</span>
            </a>
          ) : (
            /* 予約URL未確定。死んだリンクを出さず、設定待ちであることを明示する。 */
            <div
              key={s.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                minHeight: 58,
                background: "#D9D4C8",
                color: "#6E7065",
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: "0.04em",
                borderRadius: 999,
                padding: "8px 12px",
                textAlign: "center",
              }}
            >
              {s.label}
              <span style={{ fontSize: 10, fontWeight: 400, letterSpacing: "0.02em" }}>
                hacomono予約URL設定待ち
              </span>
            </div>
          ),
        )}
      </div>
      <p
        style={{
          textAlign: "center",
          fontSize: 11,
          lineHeight: 1.8,
          color: noteColor,
          letterSpacing: "0.04em",
          margin: "12px 0 0",
          textShadow: variant === "dark" ? "0 1px 6px rgba(0,0,0,0.45)" : undefined,
        }}
      >
        {c.reserve.note}
      </p>
    </div>
  );
}

/**
 * キャンペーンバッジ・体験レッスンの二重価格表記。
 * 顧客修正指示によりMV直下・料金表直下（pin 32）に全体を、
 * 最終予約エリア（pin 38）には compact で金額部分だけを出す。
 */
function TrialPriceBlock({ compact = false }: { compact?: boolean } = {}) {
  return (
    <>
      {!compact && (
      <div style={{ textAlign: "center" }}>
        <span
          style={{
            display: "inline-block",
            background: "#4A4E57",
            color: "#FFFFFF",
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: "0.1em",
            padding: "7px 15px",
            borderRadius: 4,
          }}
        >
          {c.pricing.campaignBadge}
        </span>
        <div>
          <h3
            style={{
              fontFamily: fontMincho,
              fontWeight: 600,
              fontSize: 30,
              letterSpacing: "0.05em",
              color: "#33352E",
              margin: "14px 0 0",
              background: `linear-gradient(transparent 66%, ${creamSoft} 66%)`,
              display: "inline-block",
              padding: "0 4px",
            }}
          >
            {c.pricing.campaignTitle}
          </h3>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.9, color: "#62655B", margin: "14px 0 0" }}>
          {nl(c.pricing.campaignLead)}
        </p>
      </div>
      )}

      {/*
        二重価格表記（通常 → キャンペーン）。
        キャンペーン側は「0円」ではなく「完全無料」のような文言が入るため、
        横並びだと 480px の枠に収まらない。通常価格を上段にまとめ、
        訴求文言を下段に大きく置く縦積みにしている。
      */}
      <div style={{ marginTop: compact ? 0 : 24, textAlign: "center" }}>
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
              background: "#4A4E57",
              color: "#FFFFFF",
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
            <span style={{ fontSize: 12, color: "#62655B" }}>通常価格</span>
            <span style={{ position: "relative", fontFamily: fontMincho, fontSize: 21, color: "#4A4E57" }}>
              {c.pricing.trialRegular}
              <span style={{ fontSize: 12 }}>円</span>
              <span
                style={{
                  position: "absolute",
                  left: -2,
                  right: -2,
                  top: "55%",
                  height: 1.5,
                  background: "#C25B4B",
                  transform: "rotate(-8deg)",
                }}
              />
            </span>
            <span style={{ fontSize: 11, color: "#9A9C90" }}>税込</span>
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
            background: goldGrad,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {c.pricing.trialNow}
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
          background: "#E4DFD5",
          minHeight: "100vh",
          color: "#3B3D36",
        }}
      >
        <div
          style={{
            maxWidth: 480,
            margin: "0 auto",
            background: "#FCFBF7",
            boxShadow: "0 0 60px rgba(70,72,60,0.16)",
            overflow: "hidden",
          }}
        >
          {/* ── header ── */}
          <div
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
                  fontFamily: fontGothic,
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "#3B3D36",
                }}
              >
                {c.header.brand}
              </div>
              <div style={{ fontSize: 9, letterSpacing: "0.14em", color: "#9A9C90" }}>
                {c.header.brandSub}
              </div>
            </div>
            <div style={{ textAlign: "right", lineHeight: 1.55 }}>
              {c.header.stores.map((s) => (
                <div key={s} style={{ fontSize: 13, color: accent, letterSpacing: "0.03em" }}>
                  {s}
                </div>
              ))}
              {c.header.note && (
                <div style={{ fontSize: 9, color: "#9A9C90", letterSpacing: "0.02em" }}>
                  {c.header.note}
                </div>
              )}
            </div>
          </div>

          {/* ── offer bar ── */}
          {/*
            期限バッジは円形の“ステッカー”をはみ出させる作りだったが、
            1行表示にすると横幅が要るうえ上下のはみ出しがロゴに被る。
            帯の中に収まる角丸のピルに変え、絶対配置と余白合わせのスペーサーを廃した。
          */}
          <div
            style={{
              position: "relative",
              zIndex: 5,
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: `linear-gradient(120deg, ${shade(accent, 0.16)} 0%, ${accent} 55%, ${shade(accent, -0.15)} 100%)`,
              padding: "14px 18px",
              boxShadow: "0 3px 10px rgba(70,72,60,0.18)",
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
                background: `linear-gradient(135deg, ${creamSoft} 0%, ${cream} 100%)`,
                borderRadius: 8,
                padding: "7px 13px",
                boxShadow: "0 2px 6px rgba(50,40,25,0.26)",
              }}
            >
              {c.offerBar.badgeText}
            </span>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div
                style={{
                  fontFamily: fontGothic,
                  fontWeight: 700,
                  fontSize: 20,
                  letterSpacing: "0.06em",
                  color: "#FFFFFF",
                  textShadow: "0 1px 5px rgba(0,20,15,0.5)",
                  lineHeight: 1.2,
                  textAlign: "center",
                }}
              >
                {c.offerBar.text}
              </div>
            </div>
          </div>

          {/* ── 監修バー ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: c.achievement.num ? 6 : 0,
              background: "#FFFFFF",
              color: "#3B3D36",
              padding: "7px 18px",
              boxShadow: "0 2px 6px rgba(70,72,60,0.08)",
            }}
          >
            <span style={{ fontSize: 13, letterSpacing: "0.03em" }}>{c.achievement.pre}</span>
            {c.achievement.num && (
              <span style={{ fontWeight: 700, fontSize: 16, lineHeight: 1, color: accent }}>
                {c.achievement.num}
              </span>
            )}
            <span style={{ fontSize: 13, letterSpacing: "0.03em" }}>{c.achievement.post}</span>
          </div>

          {/* ── ① ファーストビュー：写真＋縦書きコピー ── */}
          {/*
            以前は縦書きキャッチコピー（絶対配置・上寄せ）とサブコピー＋CTA
            （flex marginTop:auto で下寄せ）を同じ写真セクション内に重ねており、
            後者のコンテンツ量が増えると marginTop:auto が効かず上に張り付いて、
            縦書きコピーの真下に文字が被る問題があった。
            写真は縦書きコピー＋特徴チップだけが乗る固定高さの領域に留め、
            サブコピー・補足・CTAは写真の外（通常フロー）に出して物理的に
            座標がぶつからないようにしている。
          */}
          <section style={{ position: "relative", minHeight: 480, overflow: "hidden", background: accent }}>
            <ImageSlot
              src={c.fv.hero.src}
              placeholder={c.fv.hero.placeholder}
              objectPosition={c.fv.hero.position ?? "center"}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                // 元写真が店内の暗めの照明で撮影されているため、MVとして少し明るく補正。
                filter: "brightness(1.18) saturate(1.05)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                /* 縦書きコピーは白背景の札に乗るため、ここは写真に軽い陰影を
                   付けるだけの演出用。 */
                background:
                  "linear-gradient(to bottom, rgba(0,20,15,0.05) 0%, rgba(0,20,15,0) 32%, rgba(0,20,15,0.42) 100%)",
                pointerEvents: "none",
              }}
            />
            {/* 縦書きメインコピー */}
            <div
              style={{
                position: "absolute",
                top: 34,
                left: 26,
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
                    color: "#3B3D36",
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
            {/* 特徴チップ（最大3名 / 姿勢診断付き） */}
            <div
              style={{
                position: "absolute",
                top: 38,
                right: 22,
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
                    width: 66,
                    height: 66,
                    borderRadius: "50%",
                    background: accent,
                    border: "1.5px solid rgba(255,255,255,0.5)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1.2,
                    color: "#FFFFFF",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.22)",
                  }}
                >
                  <span style={{ fontSize: 9.5, letterSpacing: "0.06em", color: cream }}>
                    {chip.small}
                  </span>
                  <span style={{ fontFamily: fontGothic, fontWeight: 700, fontSize: 17 }}>
                    {chip.big}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ── ①-2 サブコピー・補足・CTA（写真の外の通常フロー） ── */}
          <div style={{ position: "relative", background: accent, padding: "30px 26px 38px" }}>
            <div style={{ textAlign: "center" }}>
              {c.fv.subLines.map((line) => (
                <p
                  key={line}
                  style={{
                    fontFamily: fontGothic,
                    fontWeight: 500,
                    fontSize: 17,
                    letterSpacing: "0.06em",
                    lineHeight: 1.8,
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
                      border: "1px solid rgba(255,255,255,0.35)",
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

          {/* ── MV直下の体験料金表示（顧客修正指示） ── */}
          {/* pin 27/28: CTAは料金ブロックの前から後ろへ移動（無料訴求を見せてから予約導線） */}
          <section style={{ background: "#FCFBF7", padding: "40px 26px 48px" }}>
            <TrialPriceBlock />
            {/* CTA 1/4: 体験料金の後 */}
            <ReserveCta />
          </section>

          {/* ── ② このようなお悩みはありませんか ── */}
          <section style={{ background: creamGrad, padding: "54px 26px" }}>
            <SectionHeading text={c.worry.heading} fontSize={22} />
            {/* pin 26 で5項目（奇数）になったため、2列だと最終行が片側だけ空く。1列に変更。 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 30 }}>
              {c.worry.items.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    background: "#FCFBF7",
                    borderRadius: 12,
                    padding: "14px 12px",
                    boxShadow: "0 4px 12px rgba(70,72,60,0.06)",
                  }}
                >
                  <CheckIcon />
                  <span style={{ fontSize: 14, lineHeight: 1.7, color: "#4C4E45" }}>{item}</span>
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
                margin: "34px 0 0",
                color: "#33352E",
              }}
            >
              {nl(c.worry.closing)}
            </p>
            {/* pin 29: ここのCTAは削除 */}
          </section>

          {/* ── ②-2 目指せる未来（pin 25） ── */}
          <section style={{ background: "#FCFBF7", padding: "56px 26px 60px" }}>
            <SectionHeading text={c.future.heading} fontSize={19} />
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 32 }}>
              {c.future.items.map((item) => (
                <div
                  key={item.num}
                  style={{
                    display: "flex",
                    alignItems: "stretch",
                    background: "#F4F0E8",
                    borderRadius: 14,
                    overflow: "hidden",
                  }}
                >
                  <ImageSlot
                    src={item.img.src}
                    placeholder={item.img.placeholder}
                    style={{ width: 132, flex: "none", alignSelf: "stretch" }}
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
                      <span style={{ width: 1, height: 12, background: "#CFC8B8" }} />
                      <h3
                        style={{
                          fontFamily: fontGothic,
                          fontWeight: 700,
                          fontSize: 15,
                          lineHeight: 1.5,
                          letterSpacing: "0.03em",
                          margin: 0,
                          color: "#33352E",
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p style={{ fontSize: 13, lineHeight: 1.8, color: "#62655B", margin: "10px 0 0" }}>
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
                fontSize: 17,
                lineHeight: 1.8,
                letterSpacing: "0.04em",
                color: "#33352E",
                margin: "32px 0 0",
              }}
            >
              {nl(c.future.closing)}
            </p>
          </section>

          {/* ── ③ RINNEが選ばれる理由 ── */}
          <section style={{ background: "#FCFBF7", padding: "58px 26px 66px" }}>
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
                    fontSize: 20,
                    lineHeight: 1.6,
                    letterSpacing: "0.04em",
                    margin: "22px 0 0",
                    color: "#33352E",
                    textAlign: "center",
                  }}
                >
                  {nl(item.title)}
                </h3>
                <div style={{ width: 40, height: 2, background: "#DAD5C9", margin: "12px auto 0" }} />
                <p style={{ fontSize: 14.5, lineHeight: 2, color: "#62655B", margin: "16px 0 0" }}>
                  {item.body}
                </p>
              </div>
            ))}
            {/* CTA 2/4: 選ばれる理由の後 */}
            <ReserveCta />
          </section>

          {/* ── ④ 料金プラン（pin 21〜24: 比較表から差し替え） ── */}
          <section style={{ background: navyGrad, padding: "54px 20px" }}>
            <SectionHeading text={c.plans.heading} variant="white" fontSize={24} />
            <p
              style={{
                textAlign: "center",
                fontSize: 14,
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.82)",
                margin: "18px 0 0",
              }}
            >
              {nl(c.plans.lead)}
            </p>
            <div style={{ marginTop: 26 }}>
              {/* 列見出し */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "0.62fr 1fr 1fr",
                  gap: 6,
                  alignItems: "stretch",
                }}
              >
                <div />
                {c.plans.columns.map((col) => (
                  <div
                    key={col.en}
                    style={{
                      background: shade(accent, -0.22),
                      borderRadius: "10px 10px 0 0",
                      padding: "12px 6px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: fontGothic,
                        fontWeight: 700,
                        fontSize: 14,
                        letterSpacing: "0.04em",
                        color: cream,
                        lineHeight: 1.3,
                      }}
                    >
                      {col.en}
                    </div>
                    <div
                      style={{
                        fontSize: 11.5,
                        letterSpacing: "0.03em",
                        color: "rgba(255,255,255,0.8)",
                        marginTop: 3,
                      }}
                    >
                      {col.ja}
                    </div>
                  </div>
                ))}
              </div>
              {/* 行 */}
              {c.plans.rows.map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "0.62fr 1fr 1fr",
                    gap: 6,
                    marginTop: 6,
                    alignItems: "stretch",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: creamSoft,
                      borderRadius: 8,
                      padding: "12px 4px",
                      fontFamily: fontGothic,
                      fontWeight: 700,
                      fontSize: 14,
                      letterSpacing: "0.04em",
                      color: "#4C4E45",
                    }}
                  >
                    {row.label}
                  </div>
                  {row.values.map((v, vi) => (
                    <div
                      key={vi}
                      style={{
                        background: "#FFFFFF",
                        borderRadius: 8,
                        padding: "14px 6px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: fontGothic,
                          fontWeight: 700,
                          fontSize: 16,
                          letterSpacing: "0.02em",
                          color: accent,
                          lineHeight: 1.3,
                        }}
                      >
                        {v.price}
                      </div>
                      {v.campaign && (
                        <div style={{ lineHeight: 1.3 }}>
                          <span
                            style={{
                              fontFamily: fontGothic,
                              fontWeight: 700,
                              fontSize: 15,
                              letterSpacing: "0.02em",
                              color: accent,
                            }}
                          >
                            →{v.campaign}
                          </span>
                          {v.campaignNote && (
                            <span
                              style={{
                                display: "block",
                                fontSize: 10.5,
                                color: "#62655B",
                                marginTop: 2,
                              }}
                            >
                              （{v.campaignNote}）
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p
              style={{
                textAlign: "right",
                fontSize: 11,
                letterSpacing: "0.02em",
                color: "rgba(255,255,255,0.75)",
                margin: "12px 0 0",
              }}
            >
              {c.plans.taxNote}
            </p>
            <div style={{ marginTop: 14 }}>
              {c.plans.notes.map((note) => (
                <p
                  key={note}
                  style={{
                    fontSize: 12.5,
                    lineHeight: 1.8,
                    color: "rgba(255,255,255,0.85)",
                    margin: 0,
                  }}
                >
                  {note}
                </p>
              ))}
            </div>
          </section>

          {/* ── ④-2 体験キャンペーン（pin 32: 料金表の直後に追加） ── */}
          <section style={{ background: "#FCFBF7", padding: "50px 26px 54px" }}>
            <TrialPriceBlock />
          </section>

          {/* ── ⑤ 姿勢診断について ── */}
          <section style={{ background: "#FCFBF7", padding: "54px 26px" }}>
            <SectionHeading text={c.posture.heading} fontSize={19} nowrap />
            <ImageSlot
              src={c.posture.photo.src}
              placeholder={c.posture.photo.placeholder}
              radius={16}
              style={{ width: "100%", height: 220, marginTop: 32 }}
            />
            <p style={{ fontSize: 14.5, lineHeight: 2.05, color: "#62655B", margin: "24px 0 0" }}>
              {c.posture.body}
            </p>
            <div style={{ background: "#F4F0E8", borderRadius: 14, padding: "22px 20px", marginTop: 24 }}>
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
                姿勢診断で確認する内容
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {c.posture.items.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <CheckIcon color={accentMid} />
                    <span style={{ fontSize: 14, lineHeight: 1.7, color: "#4C4E45" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── ⑥ 体験レッスンの流れ ── */}
          <section style={{ background: creamGrad, padding: "54px 26px" }}>
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
                      {!last && <span style={{ width: 2, flex: 1, background: "#DED8CB" }} />}
                    </div>
                    <div style={{ paddingBottom: last ? 0 : 26 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                        <h3
                          style={{
                            fontFamily: fontGothic,
                            fontWeight: 700,
                            fontSize: 17.5,
                            letterSpacing: "0.03em",
                            margin: 0,
                            color: "#33352E",
                          }}
                        >
                          {step.title}
                        </h3>
                        {step.time && <span style={{ fontSize: 11, color: "#9A9C90" }}>{step.time}</span>}
                      </div>
                      <p style={{ fontSize: 14, lineHeight: 1.9, color: "#62655B", margin: "8px 0 0" }}>
                        {step.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* CTA 3/4: 体験レッスンの流れの後 */}
            <ReserveCta />
          </section>

          {/* ── ⑦ 初心者でも参加しやすい理由 ── */}
          <section style={{ background: "#FCFBF7", padding: "54px 26px" }}>
            <SectionHeading text={c.beginner.heading} fontSize={17} nowrap />
            <p style={{ fontSize: 14.5, lineHeight: 2.05, color: "#62655B", margin: "24px 0 0" }}>
              {c.beginner.body}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 26 }}>
              {c.beginner.items.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 7,
                    background: "#F4F0E8",
                    borderRadius: 12,
                    padding: "14px 12px",
                  }}
                >
                  <CheckIcon />
                  <span style={{ fontSize: 13, lineHeight: 1.7, color: "#4C4E45" }}>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── ⑧ お客様の声：顧客修正指示により非表示。
                 config.testimonials のデータは差し替え待ちのまま保持。 ── */}

          {/* ── ⑨ インストラクター紹介：顧客修正指示により非表示。
                 config.instructors のデータは差し替え待ちのまま保持。 ── */}

          {/* ── ⑩ 料金・キャンペーン：pin 37 によりセクションごと削除。
                 無料訴求は料金表の直後（pin 32）と最終予約エリア（pin 38）に置いている。 ── */}

          {/* ── ⑪ 店舗情報 ── */}
          <section id="stores" style={{ background: creamGrad, padding: "54px 26px" }}>
            <SectionHeading text={c.stores.heading} fontSize={24} />
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 30 }}>
              {c.stores.items.map((store) => (
                <div
                  key={store.name}
                  style={{
                    background: "#FCFBF7",
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 6px 16px rgba(70,72,60,0.10)",
                  }}
                >
                  <ImageSlot
                    src={store.img.src}
                    placeholder={store.img.placeholder}
                    style={{ width: "100%", height: 290 }}
                  />
                  <div style={{ padding: 20 }}>
                    <h3
                      style={{
                        fontFamily: fontGothic,
                        fontWeight: 700,
                        fontSize: 20,
                        letterSpacing: "0.05em",
                        margin: 0,
                        color: "#33352E",
                      }}
                    >
                      {store.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: fontMincho,
                        fontWeight: 600,
                        fontSize: 16,
                        lineHeight: 1.8,
                        letterSpacing: "0.04em",
                        color: accent,
                        margin: "10px 0 0",
                      }}
                    >
                      {nl(store.appeal)}
                    </p>
                    <div style={{ height: 1, background: "#EFEAE0", margin: "16px 0" }} />
                    <p style={{ fontSize: 14, lineHeight: 1.9, color: "#62655B", margin: 0 }}>
                      {nl(store.address)}
                      <br />
                      <span style={{ color: accent, fontWeight: 700 }}>{store.hours}</span>
                      <br />
                      {store.closed}
                    </p>
                    <div style={{ marginTop: 12 }}>
                      {store.access.map((a) => (
                        <div key={a} style={{ display: "flex", alignItems: "flex-start", gap: 7, marginTop: 6 }}>
                          <CheckIcon color={accentMid} />
                          <span style={{ fontSize: 13, lineHeight: 1.7, color: "#62655B" }}>{a}</span>
                        </div>
                      ))}
                    </div>
                    {store.mapEmbedSrc ? (
                      <iframe
                        src={store.mapEmbedSrc}
                        title={store.map.placeholder}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: 150,
                          marginTop: 16,
                          border: 0,
                          borderRadius: 10,
                        }}
                      />
                    ) : (
                      <ImageSlot
                        src={store.map.src}
                        placeholder={store.map.placeholder}
                        radius={10}
                        style={{ width: "100%", height: 150, marginTop: 16 }}
                      />
                    )}
                    {store.tel && (
                      <TelLink tel={store.tel} slug={c.slug} label={`${store.name}に電話する`} accent={accent} />
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* pin 36: ここのCTAは削除 */}
          </section>

          {/* ── ⑫ よくある質問 ── */}
          <section style={{ background: navyGrad, padding: "54px 26px" }}>
            <SectionHeading text={c.faq.heading} variant="white" fontSize={24} />
            <FaqList items={c.faq.items} accent={accent} accentSoft={accentSoft} />
          </section>

          {/* ── ⑬ 最終予約エリア ── */}
          <section id="reserve" style={{ background: "#FCFBF7", padding: "56px 26px 64px" }}>
            <SectionHeading text={c.closing.heading} fontSize={21} />
            <p
              style={{
                textAlign: "center",
                fontFamily: fontMincho,
                fontWeight: 600,
                fontSize: 16,
                lineHeight: 1.9,
                letterSpacing: "0.04em",
                color: "#33352E",
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
            {/* pin 38: 予約直前にキャンペーン価格を再掲 */}
            <div style={{ marginTop: 28 }}>
              <TrialPriceBlock compact />
            </div>
            {/* CTA 4/4: LP最下部 */}
            <ReserveCta />
          </section>
        </div>
      </div>

      <StickyFooterCTA
        anchor={c.sticky.anchor}
        buttonText={c.sticky.buttonText}
        showAfter={c.sticky.showAfter}
        buttonGradient={stickyBtnGrad}
        shadowColor="rgba(0,40,30,0.35)"
        borderColor={`${accent}59`}
        offers={c.sticky.offers.map((o) => (
          <span key={o.label} style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
            <span style={{ fontSize: 11, color: "#62655B", letterSpacing: "0.02em" }}>{o.label}</span>
            <span
              style={{
                fontFamily: fontMincho,
                fontWeight: 700,
                fontSize: 17,
                lineHeight: 1,
                color: accentMid,
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
