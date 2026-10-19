import type { ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPCanvas from "@/components/LPCanvas";
import LPForm from "@/components/LPForm";
import StickyFooterCTA from "@/components/StickyFooterCTA";
import ImageSlot from "@/components/ImageSlot";
import FaqList from "./FaqList";
import config from "./config";

/**
 * Pilates KASANE バロー豊橋店 — Meta広告用LP。指示書（brief.md）の13セクション構成。
 *
 *   ヘッダー → ①FV → ②キャンペーン → ③悩み → ④目指せる変化 → ⑤選ばれる5つの理由
 *   → ⑥プログラム → ⑦2回体験 → ⑧スタジオ → ⑨体験の流れ → ⑩料金・キャンペーン再訴求
 *   → ⑪FAQ → ⑫アクセス → ⑬最終CTA ＋ 追従フッターCTA
 *
 * 守っているルール:
 *   1. 幅390pxの1枚のキャンバス（`<LPCanvas>`）。`vw` / `vh` は使わない
 *      （CLAUDE.md §16-17）。キャンバス外の地色を敷く `100vh` だけが例外。
 *   2. CTAは指示書 §7 の6箇所（FV・キャンペーン・選ばれる理由・2回体験・流れ・最終）＋追従フッター。
 *      すべて `c.reserve.url`（現在はページ下部の予約フォーム `#reserve`）へ。文言は「無料体験を予約する」で統一。
 *   3. テラコッタ（cta）はボタンと特典の数字だけ。見出しには使わない。
 *   4. 画像はすべて ImageSlot。`src` を config に入れるだけで差し替わり、空でもレイアウトは崩れない。
 */

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

const c = config;

/* ── 配色 ─────────────────────────────────────────────── */
const brown = "#5E4636"; // メイン。白地 9:1
const brownMid = "#A08467"; // 番号・アイコンの中間トーン
const cta = "#A9573A"; // CTAと特典の数字専用。白文字 5:1
const ivory = "#FBF8F2";
const greige = "#F3EDE4";
const beige = "#E9E0D3";
const brownGrad = "linear-gradient(160deg, #6E5442 0%, #5E4636 55%, #4A372A 100%)";
const ctaGrad = "linear-gradient(135deg, #B9664A 0%, #9A4C31 100%)";
const brownSoft = "#5E46361A";
const ink = "#3A332D";
const inkSoft = "#6A6058";
const inkMute = "#9A8F85";
const line = "#E4DBCD";

const fontMincho = "'Shippori Mincho', serif";
const fontGothic = "'Zen Kaku Gothic New', sans-serif";
const fontEn = "'Playfair Display', serif";

/** 【要確認】タグ。店舗確認が取れたら config の `confirm` を外すと消える。 */
const Confirm = () => (
  <span style={{ color: "#C0392B", fontWeight: 700, fontSize: "0.9em", marginRight: 2 }}>【要確認】</span>
);

/** ブランド名の「かさね」に合わせた、ずらして重ねた2本線。見出しの下に置く。 */
function KasaneRule({ color = brownMid }: { color?: string }) {
  return (
    <svg width="44" height="8" viewBox="0 0 44 8" style={{ display: "block", margin: "14px auto 0" }} aria-hidden>
      <path d="M0 2h34" stroke={color} strokeWidth="1.5" />
      <path d="M10 6h34" stroke={color} strokeWidth="1.5" opacity="0.55" />
    </svg>
  );
}

/** セクション見出し。英字キッカー（イタリック）＋明朝の見出し＋かさね線。 */
function SectionHeading({
  text,
  kicker,
  variant = "brown",
  fontSize = 23,
}: {
  text: string;
  kicker?: string;
  variant?: "brown" | "white";
  fontSize?: number;
}) {
  const white = variant === "white";
  return (
    <div style={{ textAlign: "center" }}>
      {kicker && (
        <p
          style={{
            fontFamily: fontEn,
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "0.12em",
            color: white ? "rgba(255,255,255,0.72)" : brownMid,
            margin: "0 0 8px",
          }}
        >
          {kicker}
        </p>
      )}
      <h2
        style={{
          fontFamily: fontMincho,
          fontWeight: 600,
          fontSize,
          letterSpacing: "0.06em",
          color: white ? "#FFFFFF" : brown,
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {nl(text)}
      </h2>
      <KasaneRule color={white ? "rgba(255,255,255,0.7)" : brownMid} />
    </div>
  );
}

const CheckIcon = ({ color = brownMid, size = 15 }: { color?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
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

/** `reserve.url` が外部URLなら新規タブで開く（hacomono へ戻したとき用）。 */
const reserveExternal = /^https?:\/\//.test(c.reserve.url);

/** 予約CTA。すべて `reserve.url` へ。ボタン下に注記1行。 */
function ReserveCta({ variant = "light", marginTop = 30 }: { variant?: "light" | "dark"; marginTop?: number }) {
  const dark = variant === "dark";
  return (
    <div style={{ marginTop }}>
      <a
        href={c.reserve.url}
        {...(reserveExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          height: 60,
          background: ctaGrad,
          color: "#FFFFFF",
          textDecoration: "none",
          fontFamily: fontGothic,
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: "0.06em",
          borderRadius: 999,
          boxShadow: dark ? "0 10px 22px rgba(0,0,0,0.28)" : "0 10px 22px rgba(154,76,49,0.32)",
        }}
      >
        {c.reserve.label}
        <span style={{ fontSize: 14 }}>›</span>
      </a>
      <p
        style={{
          textAlign: "center",
          fontSize: 11,
          lineHeight: 1.8,
          color: dark ? "rgba(255,255,255,0.78)" : inkMute,
          letterSpacing: "0.02em",
          margin: "10px 0 0",
        }}
      >
        {c.reserve.note}
      </p>
    </div>
  );
}

/**
 * 4特典のグリッド。`size="lg"` はキャンペーン・料金セクション用（2×2で数字を特大）、
 * `size="sm"` はFV・最終CTA用（4列で1行に収める）。
 * 通常料金（`regular`）が確定した項目だけ、打ち消し線で上に併記する。
 */
function OfferGrid({ size = "lg" }: { size?: "lg" | "sm" }) {
  const lg = size === "lg";
  return (
    <div style={{ display: "grid", gridTemplateColumns: lg ? "1fr 1fr" : "repeat(4, 1fr)", gap: lg ? 10 : 6 }}>
      {c.offers.map((o) => (
        <div
          key={o.label}
          style={{
            background: "#FFFFFF",
            border: `1px solid ${line}`,
            borderRadius: lg ? 14 : 10,
            padding: lg ? "16px 8px 14px" : "10px 2px 9px",
            textAlign: "center",
            boxShadow: lg ? "0 4px 12px rgba(94,70,54,0.08)" : "none",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: fontGothic,
              fontWeight: 700,
              fontSize: lg ? 13.5 : 10.5,
              color: brown,
              letterSpacing: lg ? "0.06em" : 0,
              whiteSpace: "nowrap",
            }}
          >
            {o.label}
          </p>
          {lg && o.regular && (
            <p style={{ margin: "6px 0 0", fontSize: 12, color: inkMute, textDecoration: "line-through" }}>
              通常{o.regular}円
            </p>
          )}
          <p style={{ margin: lg ? "6px 0 0" : "3px 0 0", color: cta, lineHeight: 1, whiteSpace: "nowrap" }}>
            <span style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: lg ? 54 : 28 }}>{o.value}</span>
            <span style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: lg ? 17 : 10.5, marginLeft: 1 }}>
              {o.unit}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

function OfferNote({ dark = false }: { dark?: boolean }) {
  return (
    <p
      style={{
        fontSize: 11,
        lineHeight: 1.7,
        color: dark ? "rgba(255,255,255,0.75)" : inkMute,
        margin: "10px 0 0",
        textAlign: "center",
      }}
    >
      {c.offerNote.confirm && (
        <>
          <Confirm />
          <br />
        </>
      )}
      {nl(c.offerNote.text)}
    </p>
  );
}

export default function Page() {
  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div
        style={{
          fontFamily: "'Noto Sans JP', sans-serif",
          lineBreak: "strict",
          background: "#ECE5DA",
          minHeight: "100vh",
          color: ink,
        }}
      >
        <LPCanvas style={{ background: ivory }} boxShadow="0 0 60px rgba(74,55,42,0.16)">
          {/* ── ヘッダー ── */}
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 18px",
              background: "#FFFFFF",
            }}
          >
            <div style={{ lineHeight: 1.2 }}>
              {c.header.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.header.logo} alt={c.header.brand} style={{ display: "block", height: 30, width: "auto" }} />
              ) : (
                /* ロゴデータ到着までの仮表示。ロゴに似せないよう本文と同じゴシック・本文色で置く。 */
                <div style={{ fontFamily: fontGothic, fontWeight: 700, fontSize: 16, color: ink, letterSpacing: "0.04em" }}>
                  {c.header.brand}
                </div>
              )}
              <div style={{ fontFamily: fontGothic, fontWeight: 500, fontSize: 12, color: inkSoft, letterSpacing: "0.08em", marginTop: 3 }}>
                {c.header.store}
              </div>
            </div>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 11.5,
                fontWeight: 700,
                color: brown,
                border: `1px solid ${brown}`,
                borderRadius: 999,
                padding: "5px 11px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
                <path d="M9.5 17V7.5h3.5a3 3 0 010 6H9.5" strokeLinejoin="round" />
              </svg>
              {c.header.badge}
            </span>
          </header>

          {/* ── オファーバー ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              background: brownGrad,
              padding: "9px 12px",
              color: "#FFFFFF",
              fontFamily: fontGothic,
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.04em",
            }}
          >
            {c.offerBar.map((t, i) => (
              <span key={t} style={{ display: "flex", alignItems: "center", gap: 10, whiteSpace: "nowrap" }}>
                {i > 0 && <span style={{ opacity: 0.5 }}>｜</span>}
                {t}
              </span>
            ))}
          </div>

          {/* ── ① FV：写真＋メインコピー ── */}
          <section style={{ position: "relative", height: 470, overflow: "hidden", background: beige }}>
            <ImageSlot
              src={c.fv.hero.src}
              placeholder={c.fv.hero.placeholder}
              objectPosition={c.fv.hero.position}
              poster={c.fv.hero.poster}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", alignItems: "flex-start", paddingTop: c.fv.hero.src ? 0 : 70 }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(58,40,28,0) 36%, rgba(58,40,28,0.55) 62%, rgba(52,36,25,0.9) 100%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "absolute", left: 22, right: 22, bottom: 26, color: "#FFFFFF" }}>
              <h1
                style={{
                  fontFamily: fontMincho,
                  fontWeight: 700,
                  fontSize: 29,
                  lineHeight: 1.5,
                  letterSpacing: "0.05em",
                  margin: 0,
                  textShadow: "0 2px 12px rgba(0,0,0,0.35)",
                }}
              >
                {c.fv.catchLines.map((l, i) => (
                  <span key={l} style={{ display: "block", fontSize: i === 0 ? 24 : undefined, marginBottom: i === 0 ? 6 : 0 }}>
                    {l}
                  </span>
                ))}
              </h1>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.8,
                  letterSpacing: "0.04em",
                  margin: "12px 0 0",
                  fontWeight: 500,
                  textShadow: "0 1px 6px rgba(0,0,0,0.4)",
                }}
              >
                {nl(c.fv.sub)}
              </p>
            </div>
          </section>

          {/* ── FV下：3つの特徴 → 4特典 → CTA ── */}
          <section style={{ background: greige, padding: "18px 18px 28px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
              {c.fv.features.map((f) => (
                <div
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 56,
                    borderRadius: 999,
                    background: "#FFFFFF",
                    border: `1.5px solid ${brown}`,
                    textAlign: "center",
                    fontFamily: fontGothic,
                    fontWeight: 700,
                    fontSize: 12.5,
                    lineHeight: 1.35,
                    color: brown,
                  }}
                >
                  <span>{nl(f)}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <OfferGrid size="sm" />
            </div>
            <ReserveCta marginTop={18} />
          </section>

          {/* ── ② キャンペーン ── */}
          <section style={{ background: ivory, padding: "52px 22px 56px" }}>
            <SectionHeading text={c.campaign.heading} kicker={c.campaign.kicker} />
            <div style={{ marginTop: 28 }}>
              <OfferGrid />
            </div>
            <OfferNote />
            <ReserveCta />
          </section>

          {/* ── ③ 悩み ── */}
          <section style={{ background: greige, padding: "54px 24px 58px" }}>
            <SectionHeading text={c.worry.heading} kicker={c.worry.kicker} />
            <ImageSlot
              src={c.worry.img.src}
              placeholder={c.worry.img.placeholder}
              objectPosition={c.worry.img.position}
              radius={16}
              style={{ width: "100%", height: 170, marginTop: 28 }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 18 }}>
              {c.worry.items.map((item) => (
                <div
                  key={item.text}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 9,
                    background: "#FFFFFF",
                    border: item.strong ? `1.5px solid ${brownMid}` : `1px solid ${line}`,
                    borderRadius: 12,
                    padding: "13px 14px",
                  }}
                >
                  <CheckIcon color={item.strong ? cta : brownMid} />
                  <span style={{ fontSize: item.strong ? 15.5 : 14.5, lineHeight: 1.7, color: ink, fontWeight: item.strong ? 700 : 500 }}>
                    {nl(item.text)}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 26 }}>
              <svg width="30" height="20" viewBox="0 0 30 20" aria-hidden>
                <path d="M2 2l13 14L28 2" fill="none" stroke={brownMid} strokeWidth="2.4" />
              </svg>
            </div>
            <p
              style={{
                textAlign: "center",
                fontFamily: fontMincho,
                fontWeight: 700,
                fontSize: 20,
                lineHeight: 1.75,
                letterSpacing: "0.04em",
                color: brown,
                margin: "14px 0 0",
              }}
            >
              {nl(c.worry.bridge)}
            </p>
          </section>

          {/* ── ④ 目指せる身体の変化 ── */}
          <section style={{ background: ivory, padding: "56px 24px 58px" }}>
            <SectionHeading text={c.benefit.heading} kicker={c.benefit.kicker} fontSize={20} />
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 30 }}>
              {c.benefit.items.map((item) => (
                <div key={item.num} style={{ background: "#FFFFFF", borderRadius: 16, overflow: "hidden", border: `1px solid ${line}` }}>
                  <ImageSlot
                    src={item.img.src}
                    placeholder={item.img.placeholder}
                    objectPosition={item.img.position}
                    style={{ width: "100%", height: 180 }}
                  />
                  <div style={{ padding: "16px 18px 18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontFamily: fontEn, fontStyle: "italic", fontWeight: 700, fontSize: 24, lineHeight: 1, color: brownMid }}>
                        {item.num}
                      </span>
                      <h3 style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 18, lineHeight: 1.5, letterSpacing: "0.04em", margin: 0, color: brown }}>
                        {nl(item.title)}
                      </h3>
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.85, color: inkSoft, margin: "10px 0 0" }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, color: inkMute, margin: "12px 0 0", textAlign: "right" }}>{c.benefit.note}</p>
          </section>

          {/* ── ⑤ 選ばれる5つの理由 ＋ CTA ── */}
          <section style={{ background: greige, padding: "58px 24px 62px" }}>
            <SectionHeading text={c.reasons.heading} kicker={c.reasons.kicker} fontSize={25} />
            {c.reasons.items.map((item, idx) => (
              <div key={item.num} style={{ marginTop: idx === 0 ? 40 : 46 }}>
                <div style={{ position: "relative" }}>
                  <ImageSlot
                    src={item.img.src}
                    placeholder={item.img.placeholder}
                    objectPosition={item.img.position}
                    radius={16}
                    style={{ width: "100%", height: item.major ? 220 : 180 }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: -14,
                      left: 14,
                      display: "flex",
                      alignItems: "baseline",
                      gap: 4,
                      background: brown,
                      color: "#FFFFFF",
                      borderRadius: 8,
                      padding: "7px 12px 6px",
                      boxShadow: "0 6px 14px rgba(74,55,42,0.25)",
                    }}
                  >
                    <span style={{ fontSize: 10, letterSpacing: "0.14em" }}>REASON</span>
                    <span style={{ fontFamily: fontEn, fontStyle: "italic", fontWeight: 700, fontSize: 20, lineHeight: 1 }}>
                      {item.num}
                    </span>
                  </div>
                </div>
                <h3
                  style={{
                    fontFamily: fontMincho,
                    fontWeight: 700,
                    fontSize: item.major ? 21 : 19,
                    lineHeight: 1.55,
                    letterSpacing: "0.04em",
                    margin: "20px 0 0",
                    color: brown,
                    textAlign: "center",
                  }}
                >
                  {nl(item.title)}
                </h3>
                <div style={{ width: 36, height: 1.5, background: brownMid, margin: "12px auto 0", opacity: 0.6 }} />
                <p style={{ fontSize: 14.5, lineHeight: 1.95, color: inkSoft, margin: "14px 0 0" }}>{item.body}</p>
              </div>
            ))}
            <ReserveCta marginTop={40} />
          </section>

          {/* ── ⑥ レッスンプログラム ── */}
          <section style={{ background: ivory, padding: "56px 24px 58px" }}>
            <SectionHeading text={c.program.heading} kicker={c.program.kicker} />
            <p
              style={{
                textAlign: "center",
                fontSize: 14.5,
                lineHeight: 1.85,
                color: inkSoft,
                margin: "18px 0 0",
              }}
            >
              {nl(c.program.lead)}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 26 }}>
              {c.program.items.map((p) => (
                <div key={p.en} style={{ background: "#FFFFFF", borderRadius: 14, overflow: "hidden", border: `1px solid ${line}` }}>
                  <ImageSlot src={p.img.src} placeholder={p.img.placeholder} objectPosition={p.img.position} style={{ width: "100%", height: 110 }} />
                  <div style={{ padding: "12px 12px 14px" }}>
                    <p style={{ margin: 0, lineHeight: 1.2 }}>
                      <span style={{ fontFamily: fontEn, fontStyle: "italic", fontWeight: 700, fontSize: 19, color: brown }}>{p.en}</span>
                    </p>
                    <p style={{ margin: "4px 0 0", fontFamily: fontMincho, fontWeight: 700, fontSize: 13, color: brownMid, letterSpacing: "0.1em" }}>
                      〜{p.name}〜
                    </p>
                    <p style={{ fontSize: 12, lineHeight: 1.75, color: inkSoft, margin: "8px 0 0" }}>
                      {p.confirm && <Confirm />}
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── ⑦ 2回体験 ＋ CTA ── */}
          <section style={{ background: brownGrad, padding: "58px 24px 60px" }}>
            <SectionHeading text={c.twice.heading} kicker={c.twice.kicker} variant="white" />
            <p style={{ textAlign: "center", fontSize: 14, lineHeight: 1.85, color: "rgba(255,255,255,0.88)", margin: "18px 0 0" }}>
              {nl(c.twice.lead)}
            </p>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 28 }}>
              {c.twice.items.map((t, i) => (
                <div key={t.num}>
                  {i > 0 && (
                    <div style={{ display: "flex", justifyContent: "center", padding: "10px 0" }}>
                      <svg width="26" height="18" viewBox="0 0 26 18" aria-hidden>
                        <path d="M2 2l11 12L24 2" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.4" />
                      </svg>
                    </div>
                  )}
                  <div style={{ background: "#FFFFFF", borderRadius: 16, overflow: "hidden" }}>
                    <ImageSlot src={t.img.src} placeholder={t.img.placeholder} objectPosition={t.img.position} style={{ width: "100%", height: 150 }} />
                    <div style={{ padding: "16px 18px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span
                          style={{
                            flex: "none",
                            fontFamily: fontGothic,
                            fontWeight: 700,
                            fontSize: 13,
                            color: "#FFFFFF",
                            background: cta,
                            borderRadius: 4,
                            padding: "4px 9px",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {t.num}回目
                        </span>
                        <h3 style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 18, lineHeight: 1.5, letterSpacing: "0.03em", margin: 0, color: brown }}>
                          {nl(t.title)}
                        </h3>
                      </div>
                      <p style={{ fontSize: 14, lineHeight: 1.85, color: inkSoft, margin: "10px 0 0" }}>{t.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p
              style={{
                textAlign: "center",
                fontFamily: fontMincho,
                fontWeight: 700,
                fontSize: 19,
                lineHeight: 1.8,
                letterSpacing: "0.04em",
                color: "#FFFFFF",
                margin: "30px 0 0",
              }}
            >
              {nl(c.twice.closing)}
            </p>
            {c.twice.confirm && (
              <p style={{ textAlign: "center", fontSize: 11, lineHeight: 1.7, color: "rgba(255,255,255,0.8)", margin: "12px 0 0" }}>
                <span style={{ color: "#FFD2C4", fontWeight: 700 }}>【要確認】</span>
                {c.twice.confirm}
              </p>
            )}
            <ReserveCta variant="dark" />
          </section>

          {/* ── ⑧ スタジオの雰囲気 ── */}
          <section style={{ background: ivory, padding: "56px 24px 58px" }}>
            <SectionHeading text={c.studio.heading} kicker={c.studio.kicker} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 28 }}>
              {c.studio.gallery.map((g, i) => (
                <ImageSlot
                  key={g.placeholder}
                  src={g.src}
                  placeholder={g.placeholder}
                  objectPosition={g.position}
                  radius={10}
                  style={{ width: "100%", height: i === 0 ? 220 : 120, gridColumn: i === 0 ? "1 / -1" : undefined }}
                />
              ))}
            </div>
            <p style={{ fontSize: 14.5, lineHeight: 1.95, color: inkSoft, margin: "22px 0 0" }}>{c.studio.body}</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 7, marginTop: 20 }}>
              {c.studio.points.map((p) => (
                <span
                  key={p}
                  style={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: brown,
                    background: brownSoft,
                    borderRadius: 999,
                    padding: "6px 13px",
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </section>

          {/* ── ⑨ 体験レッスンの流れ ＋ CTA ── */}
          <section style={{ background: greige, padding: "56px 24px 60px" }}>
            <SectionHeading text={c.flow.heading} kicker={c.flow.kicker} fontSize={22} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                marginTop: 24,
                background: "#FFFFFF",
                borderRadius: 999,
                padding: "10px 16px",
                border: `1px solid ${line}`,
              }}
            >
              <span style={{ fontSize: 12.5, color: inkSoft }}>{c.flow.total.label}</span>
              <span style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 22, color: brown, lineHeight: 1 }}>{c.flow.total.value}</span>
              <span style={{ fontSize: 11, color: inkMute }}>（{c.flow.total.note}）</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 26 }}>
              {c.flow.items.map((s, i) => {
                const last = i === c.flow.items.length - 1;
                return (
                  <div key={s.num} style={{ display: "flex", gap: 14 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
                      <span
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          background: brown,
                          color: "#FFFFFF",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          lineHeight: 1,
                          flex: "none",
                        }}
                      >
                        <span style={{ fontSize: 8, letterSpacing: "0.1em" }}>STEP</span>
                        <span style={{ fontFamily: fontEn, fontStyle: "italic", fontWeight: 700, fontSize: 16, marginTop: 2 }}>{s.num}</span>
                      </span>
                      {!last && <span style={{ width: 2, flex: 1, background: "#D8CCBA" }} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0, paddingBottom: last ? 0 : 22, paddingTop: 4 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                        <h3 style={{ fontFamily: fontGothic, fontWeight: 700, fontSize: 16.5, lineHeight: 1.5, margin: 0, color: ink }}>
                          {s.title}
                        </h3>
                        {s.time && (
                          <span
                            style={{
                              flex: "none",
                              fontSize: 11,
                              fontWeight: 700,
                              color: brown,
                              background: brownSoft,
                              borderRadius: 999,
                              padding: "3px 9px",
                            }}
                          >
                            {s.time}
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: 13.5, lineHeight: 1.8, color: inkSoft, margin: "6px 0 0" }}>{s.body}</p>
                      <ImageSlot
                        src={s.img.src}
                        placeholder={s.img.placeholder}
                        objectPosition={s.img.position}
                        radius={10}
                        style={{ width: "100%", height: 120, marginTop: 10 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <ReserveCta />
          </section>

          {/* ── ⑩ 料金・キャンペーン再訴求 ── */}
          <section style={{ background: ivory, padding: "56px 20px 58px" }}>
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: 20,
                padding: "30px 16px 26px",
                border: `2px solid ${brown}`,
                boxShadow: "0 12px 30px rgba(74,55,42,0.10)",
              }}
            >
              <SectionHeading text={c.price.heading} kicker={c.price.kicker} />
              <div style={{ marginTop: 24 }}>
                <OfferGrid />
              </div>
              <OfferNote />
              <div style={{ marginTop: 24, borderTop: `1px dashed ${line}`, paddingTop: 20 }}>
                <p style={{ margin: 0, textAlign: "center", fontFamily: fontMincho, fontWeight: 700, fontSize: 16, color: brown, letterSpacing: "0.08em" }}>
                  月会費プラン
                </p>
                {c.price.plans.length > 0 ? (
                  <dl style={{ margin: "14px 0 0" }}>
                    {c.price.plans.map((p) => (
                      <div
                        key={p.name}
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "space-between",
                          gap: 10,
                          padding: "12px 4px",
                          borderBottom: `1px solid ${line}`,
                        }}
                      >
                        <dt style={{ fontSize: 14, fontWeight: 700, color: ink }}>
                          {p.name}
                          {p.note && <span style={{ display: "block", fontSize: 11, fontWeight: 400, color: inkMute }}>{p.note}</span>}
                        </dt>
                        <dd style={{ margin: 0, fontFamily: fontMincho, fontWeight: 700, fontSize: 20, color: brown, whiteSpace: "nowrap" }}>
                          {p.price}
                          <span style={{ fontSize: 12 }}>円</span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p
                    style={{
                      margin: "12px 0 0",
                      background: greige,
                      borderRadius: 10,
                      padding: "18px 14px",
                      fontSize: 12,
                      lineHeight: 1.7,
                      color: inkSoft,
                      textAlign: "center",
                    }}
                  >
                    <Confirm />
                    {c.price.emptyNote}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* ── ⑪ FAQ ── */}
          <section style={{ background: brownGrad, padding: "54px 24px" }}>
            <SectionHeading text={c.faq.heading} kicker={c.faq.kicker} variant="white" fontSize={24} />
            <div style={{ marginTop: 28 }}>
              <FaqList
                items={c.faq.items.map((f) => ({ q: f.q, a: f.confirm ? `【要確認】${f.a}` : f.a }))}
                accent={brown}
                accentSoft={brownSoft}
              />
            </div>
          </section>

          {/* ── ⑫ アクセス ── */}
          <section style={{ background: ivory, padding: "56px 24px" }}>
            <SectionHeading text={c.access.heading} kicker={c.access.kicker} fontSize={24} />
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 6px 16px rgba(74,55,42,0.10)",
                marginTop: 28,
              }}
            >
              <ImageSlot src={c.access.img.src} placeholder={c.access.img.placeholder} objectPosition={c.access.img.position} style={{ width: "100%", height: 200 }} />
              <div style={{ padding: 20 }}>
                <h3 style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 19, letterSpacing: "0.05em", margin: 0, color: brown }}>
                  {c.access.name}
                </h3>
                <div style={{ height: 1, background: line, margin: "14px 0" }} />
                <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "64px 1fr", rowGap: 10, fontSize: 14 }}>
                  {c.access.rows.map((r) => (
                    <div key={r.label} style={{ display: "contents" }}>
                      <dt style={{ color: inkMute, fontSize: 12.5, paddingTop: 1 }}>{r.label}</dt>
                      <dd style={{ margin: 0, lineHeight: 1.7, color: r.strong ? brown : inkSoft, fontWeight: r.strong ? 700 : 400 }}>
                        {nl(r.value)}
                      </dd>
                    </div>
                  ))}
                </dl>
                <iframe
                  src={c.access.mapEmbedSrc}
                  title={`${c.access.name}の地図`}
                  loading="lazy"
                  style={{ width: "100%", height: 180, marginTop: 16, border: 0, borderRadius: 10 }}
                />
              </div>
            </div>
          </section>

          {/* ── ⑬ 最終CTA ── */}
          <section style={{ background: greige, padding: "60px 22px 60px" }}>
            <h2
              style={{
                textAlign: "center",
                fontFamily: fontMincho,
                fontWeight: 700,
                fontSize: 29,
                lineHeight: 1.55,
                letterSpacing: "0.06em",
                color: brown,
                margin: 0,
              }}
            >
              {nl(c.closing.heading)}
            </h2>
            <KasaneRule />
            <p style={{ textAlign: "center", fontSize: 15, lineHeight: 1.85, color: ink, margin: "16px 0 0", letterSpacing: "0.04em" }}>
              {nl(c.closing.lead)}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 22 }}>
              {c.closing.points.map((p) => (
                <div
                  key={p}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 6,
                    background: "#FFFFFF",
                    borderRadius: 10,
                    padding: "10px 14px",
                  }}
                >
                  <CheckIcon color={brown} size={14} />
                  <span style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.6, color: ink }}>{p}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18 }}>
              <OfferGrid size="sm" />
            </div>
            <OfferNote />
            <ReserveCta marginTop={20} />
          </section>

          {/* ── 予約フォーム ── */}
          <section id="reserve" style={{ background: ivory, padding: "56px 20px 60px" }}>
            <SectionHeading text={c.form.heading} kicker={c.form.kicker} fontSize={22} />
            <p style={{ textAlign: "center", fontSize: 14, lineHeight: 1.85, color: inkSoft, margin: "18px 0 0" }}>
              {nl(c.form.lead)}
            </p>
            <div style={{ marginTop: 20 }}>
              <OfferGrid size="sm" />
            </div>
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: 16,
                padding: "24px 18px",
                marginTop: 20,
                border: `1px solid ${line}`,
              }}
            >
              <LPForm
                clientSlug={c.slug}
                accent={brown}
                fields={c.form.fields}
                submitLabel={c.form.submitLabel}
                submitStyle={{ background: ctaGrad, boxShadow: "0 10px 22px rgba(154,76,49,0.32)", borderRadius: 999 }}
                microcopy={c.form.microcopy}
                disclaimer={c.form.disclaimer}
              />
            </div>
          </section>

          <footer
            style={{
              background: brown,
              color: "rgba(255,255,255,0.8)",
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

      {/* ── 追従フッターCTA（フォームが見えたら隠れる。外部URLのときは最後まで表示） ── */}
      <StickyFooterCTA
        anchor={reserveExternal ? undefined : c.reserve.url}
        href={reserveExternal ? c.reserve.url : undefined}
        buttonText={c.sticky.buttonText}
        showAfter={c.sticky.showAfter}
        buttonGradient={ctaGrad}
        shadowColor="rgba(154,76,49,0.35)"
        borderColor={`${brown}59`}
        offers={c.offerBar.map((t) => {
          const [label, value] = t.split(" ");
          return (
            <span key={t} style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontSize: 11, color: inkSoft }}>{label}</span>
              <span style={{ fontFamily: fontMincho, fontWeight: 700, fontSize: 18, lineHeight: 1, color: cta }}>
                {value.replace("円", "")}
                <span style={{ fontSize: 11 }}>円</span>
              </span>
            </span>
          );
        })}
      />
    </LPShell>
  );
}
