import type { CSSProperties, ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPCanvas from "@/components/LPCanvas";
import StickyFooterCTA from "@/components/StickyFooterCTA";
import ImageSlot from "@/components/ImageSlot";
import FaqList from "./FaqList";
import ReserveTracker from "./ReserveTracker";
import config, { type Slot } from "./config";

/**
 * ピラティススタジオ Swan 蒲郡店 — オープン記念のMeta広告用LP。
 *
 * 構成は seren-pilates を踏襲（FV → 特典 → お悩み → 目指せる身体 → 選ばれる理由 →
 * 特典CTA → 姿勢診断 →（ビフォーアフター）→ 体験の流れ → 特典CTA → 初心者 →
 * 店舗 → FAQ → 最終CTA → 追従CTA）。デザインは公式HPの配色・書体に合わせている。
 *
 * 守っているルール:
 *   1. 幅390pxの1枚のキャンバス（`<LPCanvas>`）。`vw` / `vh` は使わない
 *      （CLAUDE.md §16-17）。キャンバス外の地色を敷く `100vh` だけが例外。
 *   2. 予約CTAは「無料体験レッスンを予約する」に統一し、URLは `config.reserve.url`
 *      の1か所だけを参照する。各ボタンに `data-cta` を付け、`ReserveTracker` が
 *      dataLayer / fbq にクリック位置を送る。
 *   3. キャンペーンは `isCampaignActive()` が false になると全箇所から消え、
 *      `config.afterCampaign` の文言に差し替わる（無料・0円を出し続けない）。
 *   4. ビフォーアフターは掲載許諾のある素材が無いので `config.beforeAfter` 未設定＝非表示。
 *   5. 蒲郡店の写真はまだ無い。他店舗の写真を蒲郡店として出さないため、店舗カードは
 *      写真を置かずロゴと地図で組んでいる。
 *
 * 予約は外部（hacomono）へ遷移するためページ内フォームを持たない。
 * `scripts/check-rules.ts` の FORM_EXEMPT に登録済み。
 */

const c = config;

/** キャンペーン期間中（＝終了日時より前）か。ISR(60秒)ごとに再評価される。 */
function isCampaignActive(now: Date = new Date()): boolean {
  return now.getTime() <= new Date(c.campaign.endsAt).getTime();
}

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

/* ── 配色（公式HP pilates-studio-swan.com の実測値） ───────────────── */
const brown = "#604C3F"; // メイン。見出し・CTA・金額。白地 8.9:1
const brownDeep = "#4B3B31";
const blush = "#FBF4F1"; // 淡い地
const blush2 = "#F8EDE8";
const beige = "#F4E5DC";
const sub = "#EDD3C5"; // サブカラー（公式の「詳しくはこちら」ボタン）
const accent = "#DEB69C"; // 装飾専用。文字には使わない（白地 2.0:1）
const accentText = "#9A7760"; // 英字キッカー等の小さな装飾文字（淡色地 4.0:1）
const ink = "#4A3F38"; // 本文（公式の #444 を茶系に寄せた）
const inkSoft = "#6E625A";
const inkMute = "#958880";

const ctaGrad = `linear-gradient(135deg, #735C4D 0%, ${brown} 50%, ${brownDeep} 100%)`;

const SERIF = "'Noto Serif JP', serif";
const SANS = "'Noto Sans JP', sans-serif";
const SERIF_CSS = "https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@500;600;700&display=swap";

/* ── 部品 ──────────────────────────────────────────────── */

/** 公式HPと同じ「英字の小見出し（明朝・小文字）＋明朝の見出し」。 */
function SectionHeading({
  kicker,
  text,
  variant = "brown",
  fontSize = 23,
}: {
  kicker?: string;
  text: string;
  variant?: "brown" | "white";
  fontSize?: number;
}) {
  const color = variant === "white" ? "#FFFFFF" : brown;
  return (
    <div style={{ textAlign: "center" }}>
      {kicker && (
        <p
          style={{
            margin: "0 0 10px",
            fontFamily: SERIF,
            fontWeight: 600,
            fontSize: 11.5,
            letterSpacing: "0.3em",
            color: variant === "white" ? "rgba(255,255,255,0.8)" : accentText,
          }}
        >
          {kicker}
        </p>
      )}
      <h2
        style={{
          margin: 0,
          fontFamily: SERIF,
          fontWeight: 600,
          fontSize,
          lineHeight: 1.6,
          letterSpacing: "0.08em",
          color,
        }}
      >
        {nl(text)}
      </h2>
      <div
        style={{
          width: 28,
          height: 1,
          background: variant === "white" ? "rgba(255,255,255,0.6)" : accent,
          margin: "16px auto 0",
        }}
      />
    </div>
  );
}

const Check = ({ size = 18 }: { size?: number }) => (
  <span
    style={{
      flex: "none",
      width: size,
      height: size,
      borderRadius: "50%",
      background: brown,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 2,
    }}
  >
    <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  </span>
);

/** 予約ボタン。URLは全箇所 `config.reserve.url`。`position` は計測用。 */
function ReserveButton({ position, label }: { position: string; label: string }) {
  return (
    <a
      href={c.reserve.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cta={position}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        padding: "0 44px",
        background: ctaGrad,
        color: "#FFFFFF",
        textDecoration: "none",
        fontFamily: SANS,
        fontWeight: 700,
        fontSize: 16,
        letterSpacing: "0.06em",
        borderRadius: 999,
        boxShadow: "0 8px 20px rgba(75,59,49,0.28)",
      }}
    >
      {label}
      <span
        style={{
          position: "absolute",
          right: 16,
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
        }}
      >
        ›
      </span>
    </a>
  );
}

function ReserveCta({
  position,
  active,
  variant = "light",
}: {
  position: string;
  active: boolean;
  variant?: "light" | "dark";
}) {
  return (
    <div style={{ marginTop: 26 }}>
      <ReserveButton position={position} label={active ? c.reserve.label : c.afterCampaign.ctaLabel} />
      <p
        style={{
          margin: "10px 0 0",
          textAlign: "center",
          fontSize: 11,
          lineHeight: 1.7,
          color: variant === "dark" ? "rgba(255,255,255,0.78)" : inkMute,
        }}
      >
        {c.reserve.note}
      </p>
    </div>
  );
}

/** 打ち消し線つきの通常価格。 */
function Regular({ value, size = 14 }: { value: string; size?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: 3, color: inkSoft }}>
      <span style={{ fontSize: size - 3 }}>通常</span>
      <span style={{ position: "relative", fontFamily: SERIF, fontSize: size, fontWeight: 600 }}>
        {value}
        <span style={{ fontSize: size - 4 }}>円</span>
        <span
          style={{
            position: "absolute",
            left: -2,
            right: -2,
            top: "54%",
            height: 1.5,
            background: brown,
            transform: "rotate(-8deg)",
          }}
        />
      </span>
    </span>
  );
}

/** 「0円」の数字を特大、単位を小さく。数字が無ければ全体をそのまま出す。 */
function Amount({ text, size }: { text: string; size: number }) {
  if (!/\d/.test(text)) {
    return <span style={{ fontSize: size * 0.42 }}>{text}</span>;
  }
  return (
    <>
      {text.split(/([\d,]+)/).map((part, i) =>
        /\d/.test(part) ? (
          <span key={i}>{part}</span>
        ) : (
          <span key={i} style={{ fontSize: size * 0.42, marginLeft: 1 }}>
            {part}
          </span>
        ),
      )}
    </>
  );
}

/**
 * 特典のミニカード（FV・理由の後・流れの後・最終CTAで使い回す）。
 * 茶の地に白いタイル3枚。期間中しか呼ばない。
 */
function CampaignMini() {
  return (
    <div
      style={{
        background: `linear-gradient(160deg, #6E5849 0%, ${brown} 55%, ${brownDeep} 100%)`,
        borderRadius: 16,
        padding: "20px 14px 16px",
        boxShadow: "0 10px 24px rgba(75,59,49,0.22)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <span
          style={{
            display: "inline-block",
            background: sub,
            color: brown,
            fontFamily: SANS,
            fontWeight: 700,
            fontSize: 12.5,
            letterSpacing: "0.08em",
            padding: "4px 14px",
            borderRadius: 999,
          }}
        >
          {c.campaign.periodShort}
        </span>
        <p
          style={{
            margin: "10px 0 0",
            fontFamily: SERIF,
            fontWeight: 600,
            fontSize: 20,
            letterSpacing: "0.1em",
            color: "#FFFFFF",
          }}
        >
          {c.campaign.title}
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginTop: 14 }}>
        {c.campaign.benefits.map((b) => (
          <div
            key={b.label}
            style={{
              background: "#FFFFFF",
              borderRadius: 10,
              padding: "10px 4px 9px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 84,
            }}
          >
            <span
              style={{
                fontSize: 11.5,
                fontWeight: 700,
                color: inkSoft,
                lineHeight: 1.35,
                letterSpacing: "0.02em",
              }}
            >
              {nl(b.miniTitle ?? b.title)}
            </span>
            <span
              style={{
                fontFamily: SERIF,
                fontWeight: 700,
                fontSize: 34,
                lineHeight: 1.1,
                color: brown,
              }}
            >
              <Amount text={b.now} size={/\d/.test(b.now) ? 34 : 40} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** キャンペーン終了後の差し替え（無料・0円を含めない）。 */
function AfterCampaignBlock({ variant = "light" }: { variant?: "light" | "dark" }) {
  const color = variant === "dark" ? "#FFFFFF" : brown;
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ margin: 0, fontFamily: SERIF, fontWeight: 600, fontSize: 22, letterSpacing: "0.1em", color }}>
        {c.afterCampaign.title}
      </p>
      <p
        style={{
          margin: "12px 0 0",
          fontSize: 13.5,
          lineHeight: 1.9,
          color: variant === "dark" ? "rgba(255,255,255,0.85)" : inkSoft,
        }}
      >
        {nl(c.afterCampaign.lead)}
      </p>
    </div>
  );
}

function Photo({ slot, style, radius = 0 }: { slot: Slot; style: CSSProperties; radius?: number }) {
  return (
    <ImageSlot
      src={slot.src}
      placeholder={slot.placeholder}
      objectPosition={slot.position ?? "center"}
      radius={radius}
      style={style}
    />
  );
}

/* ── ページ ─────────────────────────────────────────────── */

export default function Page() {
  const active = isCampaignActive();
  const faqItems = c.faq.items.filter((f) => active || !f.campaignOnly);

  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <link rel="stylesheet" href={SERIF_CSS} precedence="default" />
      <ReserveTracker reserveUrl={c.reserve.url} />
      <div
        style={{
          fontFamily: SANS,
          /* 長音符・小書き仮名が行頭に来ないよう禁則処理を厳密に。 */
          lineBreak: "strict",
          background: "#EFE2DA",
          minHeight: "100vh",
          color: ink,
        }}
      >
        <LPCanvas style={{ background: "#FFFFFF" }} boxShadow="0 0 60px rgba(96,76,63,0.14)">
          {/* ── ヘッダー ── */}
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 18px",
              background: "#FFFFFF",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/clients/swan-pilates-gamagori/logo.webp" alt="Swan PILATES STUDIO" style={{ height: 34, width: "auto", display: "block" }} />
            <div style={{ textAlign: "right", lineHeight: 1.45 }}>
              <div style={{ fontSize: 10.5, letterSpacing: "0.12em", color: inkSoft }}>{c.header.area}</div>
              <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 12.5, letterSpacing: "0.06em", color: brown }}>
                {c.header.open}
              </div>
            </div>
          </header>

          {/* ── ① FV：写真＋下部にキャッチ ── */}
          <section style={{ position: "relative", height: 470, background: blush }}>
            <Photo slot={c.fv.hero} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            {/* 下部はキャッチを載せる淡色のグラデーション。顔（上45%）には掛けない。 */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(to bottom, ${blush}00 0%, ${blush}00 46%, ${blush}D9 66%, ${blush} 84%)`,
                pointerEvents: "none",
              }}
            />
            {/* 右上のオープン表示（左上はインストラクターの顔に掛かるため右上に置く）。 */}
            <div
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                width: 92,
                height: 92,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.92)",
                border: `1px solid ${accent}`,
                outline: "4px solid rgba(255,255,255,0.5)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: brown,
                boxShadow: "0 4px 14px rgba(75,59,49,0.18)",
              }}
            >
              <span style={{ fontSize: 9, letterSpacing: "0.06em", color: inkSoft }}>{c.fv.area}</span>
              <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 21, lineHeight: 1.15, letterSpacing: "0.02em" }}>
                1.11
              </span>
              <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 9.5, letterSpacing: "0.12em" }}>GRAND OPEN</span>
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 18, textAlign: "center" }}>
              <p
                style={{
                  margin: 0,
                  display: "inline-block",
                  fontFamily: SANS,
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "0.12em",
                  color: "#FFFFFF",
                  background: brown,
                  padding: "5px 14px",
                  borderRadius: 999,
                }}
              >
                {c.fv.lead}
              </p>
              <h1
                style={{
                  margin: "12px 0 0",
                  fontFamily: SERIF,
                  fontWeight: 600,
                  fontSize: 35,
                  lineHeight: 1.45,
                  letterSpacing: "0.08em",
                  color: brown,
                }}
              >
                {nl(c.fv.catch)}
              </h1>
            </div>
          </section>

          {/* FV下：サブコピー・特徴・特典・CTA */}
          <section style={{ background: blush, padding: "4px 22px 34px" }}>
            <p
              style={{
                margin: 0,
                textAlign: "center",
                fontFamily: SERIF,
                fontWeight: 500,
                fontSize: 15,
                lineHeight: 1.85,
                letterSpacing: "0.06em",
                color: ink,
              }}
            >
              {nl(c.fv.sub)}
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 18 }}>
              {c.fv.features.map((f) => (
                <div
                  key={f}
                  style={{
                    width: 102,
                    height: 102,
                    borderRadius: "50%",
                    background: "#FFFFFF",
                    border: `1px solid ${accent}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: 13,
                    lineHeight: 1.4,
                    color: brown,
                  }}
                >
                  <span>{nl(f)}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 22 }}>{active ? <CampaignMini /> : <AfterCampaignBlock />}</div>
            <ReserveCta position="fv" active={active} />
          </section>

          {/* ── ② オープン記念キャンペーン ── */}
          <section
            id="campaign"
            style={{ background: `linear-gradient(180deg, ${beige} 0%, ${sub} 100%)`, padding: "52px 22px 50px" }}
          >
            {active ? (
              <>
                <SectionHeading kicker="opening campaign" text={c.campaign.title} fontSize={25} />
                <p
                  style={{
                    margin: "18px 0 0",
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: 13.5,
                    letterSpacing: "0.04em",
                    color: brown,
                  }}
                >
                  {c.campaign.periodLong}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 22 }}>
                  {/* 特典01（体験0円）を主役に大きく */}
                  {c.campaign.benefits.slice(0, 1).map((b) => (
                    <div
                      key={b.label}
                      style={{
                        background: "#FFFFFF",
                        borderRadius: 16,
                        padding: "20px 18px 18px",
                        textAlign: "center",
                        border: `1.5px solid ${brown}`,
                        boxShadow: "0 8px 20px rgba(96,76,63,0.12)",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          fontFamily: SERIF,
                          fontWeight: 600,
                          fontSize: 12,
                          letterSpacing: "0.16em",
                          color: "#FFFFFF",
                          background: brown,
                          padding: "3px 12px",
                          borderRadius: 999,
                        }}
                      >
                        {b.label}
                      </span>
                      <p style={{ margin: "10px 0 0", fontWeight: 700, fontSize: 19, letterSpacing: "0.08em", color: ink }}>
                        {b.title}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 12,
                          marginTop: 4,
                        }}
                      >
                        {b.regular && <Regular value={b.regular} size={17} />}
                        <span style={{ color: accent, fontSize: 18 }}>▶</span>
                        <span
                          style={{
                            fontFamily: SERIF,
                            fontWeight: 700,
                            fontSize: 66,
                            lineHeight: 1.1,
                            color: brown,
                          }}
                        >
                          <Amount text={b.now} size={66} />
                        </span>
                      </div>
                    </div>
                  ))}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {c.campaign.benefits.slice(1).map((b) => (
                      <div
                        key={b.label}
                        style={{
                          background: "#FFFFFF",
                          borderRadius: 14,
                          padding: "16px 8px 14px",
                          textAlign: "center",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          boxShadow: "0 6px 16px rgba(96,76,63,0.08)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: SERIF,
                            fontWeight: 600,
                            fontSize: 11,
                            letterSpacing: "0.16em",
                            color: brown,
                            background: sub,
                            padding: "2px 10px",
                            borderRadius: 999,
                          }}
                        >
                          {b.label}
                        </span>
                        <p style={{ margin: "8px 0 0", fontWeight: 700, fontSize: 14, letterSpacing: "0.04em", color: ink }}>
                          {b.title}
                        </p>
                        <div style={{ marginTop: "auto", paddingTop: 4 }}>
                          {b.regular && <Regular value={b.regular} size={13} />}
                          <div
                            style={{
                              fontFamily: SERIF,
                              fontWeight: 700,
                              fontSize: 40,
                              lineHeight: 1.15,
                              color: brown,
                            }}
                          >
                            <Amount text={b.now} size={/\d/.test(b.now) ? 40 : 52} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p style={{ margin: "12px 0 0", fontSize: 10.5, lineHeight: 1.7, color: inkSoft }}>
                  {c.campaign.priceNote}
                </p>
              </>
            ) : (
              <AfterCampaignBlock />
            )}
            <ReserveCta position="campaign" active={active} />
          </section>

          {/* ── ③ お悩み ── */}
          <section style={{ background: "#FFFFFF", padding: "56px 24px 58px" }}>
            <SectionHeading kicker="worries" text={c.worry.heading} />
            <Photo slot={c.worry.photo} radius={16} style={{ width: "100%", height: 200, marginTop: 28 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 20 }}>
              {c.worry.items.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    background: blush,
                    borderRadius: 10,
                    padding: "13px 14px",
                  }}
                >
                  <Check />
                  <span style={{ fontSize: 14, lineHeight: 1.65, color: ink }}>{nl(item)}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
              <svg width="26" height="14" viewBox="0 0 26 14" aria-hidden>
                <path d="M1 1l12 11L25 1" fill="none" stroke={accent} strokeWidth="1.5" />
              </svg>
            </div>
            <div
              style={{
                marginTop: 16,
                background: `linear-gradient(160deg, #6E5849 0%, ${brown} 60%, ${brownDeep} 100%)`,
                borderRadius: 16,
                padding: "28px 18px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  textAlign: "center",
                  fontFamily: SERIF,
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: 1.9,
                  letterSpacing: "0.05em",
                  color: "#FFFFFF",
                }}
              >
                {nl(c.worry.closing)}
              </p>
            </div>
          </section>

          {/* ── ④ Swanで目指せる身体 ── */}
          <section style={{ background: blush, padding: "56px 22px 58px" }}>
            <SectionHeading kicker="body make" text={c.body.heading} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 30 }}>
              {c.body.items.map((item) => (
                <div
                  key={item.num}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 14,
                    overflow: "hidden",
                    boxShadow: "0 4px 14px rgba(96,76,63,0.07)",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <Photo slot={item.img} style={{ width: "100%", height: 150 }} />
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        background: brown,
                        color: "#FFFFFF",
                        fontFamily: SERIF,
                        fontWeight: 600,
                        fontSize: 14,
                        letterSpacing: "0.06em",
                        padding: "4px 10px",
                        borderTopRightRadius: 10,
                      }}
                    >
                      {item.num}
                    </span>
                  </div>
                  <div style={{ padding: "12px 12px 14px" }}>
                    <h3
                      style={{
                        margin: 0,
                        fontFamily: SERIF,
                        fontWeight: 600,
                        fontSize: 15,
                        lineHeight: 1.5,
                        letterSpacing: "0.04em",
                        color: brown,
                      }}
                    >
                      {nl(item.title)}
                    </h3>
                    <p style={{ margin: "8px 0 0", fontSize: 12, lineHeight: 1.75, color: inkSoft }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── ⑤ 選ばれる理由 ── */}
          <section style={{ background: "#FFFFFF", padding: "58px 24px 56px" }}>
            <SectionHeading kicker="reason" text={c.reasons.heading} />
            {c.reasons.items.map((item, idx) => (
              <div key={item.num} style={{ marginTop: idx === 0 ? 34 : 46 }}>
                {item.img && <Photo slot={item.img} radius={16} style={{ width: "100%", height: 220 }} />}
                {item.machines && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {item.machines.map((m) => (
                      <div key={m.name} style={{ background: blush, borderRadius: 12, overflow: "hidden" }}>
                        <Photo slot={m.img} style={{ width: "100%", height: 112 }} />
                        <p
                          style={{
                            margin: 0,
                            padding: "7px 0 8px",
                            textAlign: "center",
                            fontFamily: SERIF,
                            fontWeight: 600,
                            fontSize: 13,
                            letterSpacing: "0.08em",
                            color: brown,
                          }}
                        >
                          {m.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20 }}>
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 600,
                      fontSize: 12,
                      letterSpacing: "0.22em",
                      color: accentText,
                      whiteSpace: "nowrap",
                    }}
                  >
                    REASON
                  </span>
                  <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 28, lineHeight: 1, color: brown }}>
                    {item.num}
                  </span>
                  <span style={{ flex: 1, height: 1, background: sub }} />
                </div>
                <h3
                  style={{
                    margin: "12px 0 0",
                    fontFamily: SERIF,
                    fontWeight: 600,
                    fontSize: 19,
                    lineHeight: 1.6,
                    letterSpacing: "0.05em",
                    color: brown,
                  }}
                >
                  {nl(item.title)}
                </h3>
                <p style={{ margin: "12px 0 0", fontSize: 14, lineHeight: 2, color: inkSoft }}>{item.text}</p>
              </div>
            ))}
          </section>

          {/* ── ⑥ 特典・CTA（理由の後） ── */}
          <section style={{ background: beige, padding: "40px 22px 42px" }}>
            {active ? <CampaignMini /> : <AfterCampaignBlock />}
            <ReserveCta position="after-reasons" active={active} />
          </section>

          {/* ── ⑦ 姿勢診断 ── */}
          <section style={{ background: "#FFFFFF", padding: "56px 24px 58px" }}>
            <SectionHeading kicker="check" text={c.posture.heading} fontSize={22} />
            <Photo slot={c.posture.photo} radius={16} style={{ width: "100%", height: 220, marginTop: 28 }} />
            {c.posture.text.map((t) => (
              <p key={t} style={{ margin: "18px 0 0", fontSize: 14, lineHeight: 2, color: inkSoft }}>
                {t}
              </p>
            ))}
            <div
              style={{
                marginTop: 22,
                background: blush,
                borderRadius: 14,
                padding: "20px 18px",
              }}
            >
              <p
                style={{
                  margin: "0 0 12px",
                  textAlign: "center",
                  fontFamily: SERIF,
                  fontWeight: 600,
                  fontSize: 15,
                  letterSpacing: "0.1em",
                  color: brown,
                }}
              >
                チェック項目の例
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
                {c.posture.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "#FFFFFF",
                      border: `1px solid ${sub}`,
                      borderRadius: 999,
                      padding: "7px 14px 7px 10px",
                      fontSize: 13,
                      fontWeight: 500,
                      color: ink,
                    }}
                  >
                    <Check size={16} />
                    {item}
                  </span>
                ))}
              </div>
              {c.posture.note && (
                <p style={{ margin: "12px 0 0", fontSize: 10.5, lineHeight: 1.7, color: inkMute, textAlign: "center" }}>
                  {c.posture.note}
                </p>
              )}
            </div>
          </section>

          {/* ── ⑧ ビフォーアフター（素材がある場合のみ） ── */}
          {c.beforeAfter && c.beforeAfter.items.length > 0 && (
            <section style={{ background: blush, padding: "56px 24px 58px" }}>
              <SectionHeading kicker="before / after" text={c.beforeAfter.heading} />
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 28 }}>
                {c.beforeAfter.items.map((it) => (
                  <div key={it.img.src ?? it.worry} style={{ background: "#FFFFFF", borderRadius: 14, overflow: "hidden" }}>
                    <Photo slot={it.img} style={{ width: "100%", height: 230 }} />
                    <div style={{ padding: "12px 16px 14px", fontSize: 13, lineHeight: 1.8, color: inkSoft }}>
                      <strong style={{ color: brown }}>{it.worry}</strong>
                      <br />
                      {it.period}（{it.store}での事例）
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ margin: "14px 0 0", fontSize: 10.5, lineHeight: 1.7, color: inkMute }}>
                {c.beforeAfter.disclaimer}
              </p>
            </section>
          )}

          {/* ── ⑨ 体験レッスンの流れ ── */}
          <section style={{ background: blush, padding: "56px 22px 52px" }}>
            <SectionHeading kicker="flow" text={c.flow.heading} fontSize={22} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 30 }}>
              {c.flow.steps.map((step) => (
                <div
                  key={step.num}
                  style={{
                    display: "flex",
                    gap: 12,
                    background: "#FFFFFF",
                    borderRadius: 14,
                    padding: 10,
                    boxShadow: "0 3px 10px rgba(96,76,63,0.06)",
                  }}
                >
                  <Photo slot={step.img} radius={10} style={{ width: 118, height: 96, flex: "none" }} />
                  <div style={{ flex: 1, paddingTop: 2 }}>
                    <span
                      style={{
                        fontFamily: SERIF,
                        fontWeight: 600,
                        fontSize: 11,
                        letterSpacing: "0.18em",
                        color: accentText,
                      }}
                    >
                      STEP {step.num}
                    </span>
                    <h3
                      style={{
                        margin: "2px 0 0",
                        fontWeight: 700,
                        fontSize: 14.5,
                        lineHeight: 1.45,
                        color: brown,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p style={{ margin: "5px 0 0", fontSize: 12, lineHeight: 1.7, color: inkSoft }}>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p
              style={{
                margin: "16px 0 0",
                textAlign: "center",
                fontSize: 12.5,
                fontWeight: 500,
                color: brown,
              }}
            >
              {c.flow.note}
            </p>
          </section>

          {/* ── ⑩ 特典・CTA（流れの後） ── */}
          <section style={{ background: beige, padding: "40px 22px 42px" }}>
            {active ? <CampaignMini /> : <AfterCampaignBlock />}
            <ReserveCta position="after-flow" active={active} />
          </section>

          {/* ── ⑪ 初心者への安心訴求 ── */}
          <section style={{ background: "#FFFFFF", padding: "56px 24px 58px" }}>
            <SectionHeading kicker="for beginners" text={c.beginner.heading} fontSize={21} />
            <Photo slot={c.beginner.photo} radius={16} style={{ width: "100%", height: 210, marginTop: 28 }} />
            <p style={{ margin: "18px 0 0", fontSize: 14, lineHeight: 2, color: inkSoft }}>{c.beginner.text}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 20 }}>
              {c.beginner.items.map((item, i) => {
                const wide = i === c.beginner.items.length - 1 && c.beginner.items.length % 2 === 1;
                return (
                  <div
                    key={item}
                    style={{
                      gridColumn: wide ? "1 / -1" : undefined,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: wide ? "center" : "flex-start",
                      gap: 8,
                      background: blush,
                      borderRadius: 12,
                      padding: "13px 12px",
                    }}
                  >
                    <Check />
                    <span style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.5, color: brown }}>
                      {wide ? item.replace("\n", "") : nl(item)}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── ⑫ 店舗情報 ── */}
          <section id="studio" style={{ background: blush2, padding: "56px 22px 52px" }}>
            <SectionHeading kicker="studio" text="店舗のご案内" />
            <div
              style={{
                marginTop: 28,
                background: "#FFFFFF",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 6px 18px rgba(96,76,63,0.10)",
              }}
            >
              {/* 蒲郡店の写真が届くまでは写真を置かない（他店舗の写真を使わない）。 */}
              <div style={{ background: blush, padding: "26px 18px 22px", textAlign: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/clients/swan-pilates-gamagori/logo.webp"
                  alt="Swan PILATES STUDIO"
                  style={{ height: 52, width: "auto", display: "block", margin: "0 auto" }}
                />
                <h3
                  style={{
                    margin: "14px 0 0",
                    fontFamily: SERIF,
                    fontWeight: 600,
                    fontSize: 18,
                    letterSpacing: "0.08em",
                    color: brown,
                  }}
                >
                  {c.store.name}
                </h3>
                <span
                  style={{
                    display: "inline-block",
                    marginTop: 10,
                    background: brown,
                    color: "#FFFFFF",
                    fontFamily: SERIF,
                    fontWeight: 600,
                    fontSize: 12.5,
                    letterSpacing: "0.1em",
                    padding: "4px 14px",
                    borderRadius: 999,
                  }}
                >
                  {c.store.open}
                </span>
              </div>
              <dl style={{ margin: 0, padding: "8px 18px 4px" }}>
                {[
                  { k: "住所", v: <>{c.store.zip}<br />{c.store.address}</> },
                  { k: "営業時間", v: <>{c.store.hours}<br />{c.store.hoursNote}</> },
                  {
                    k: "駐車場",
                    v: (
                      <>
                        <strong style={{ color: brown }}>{c.store.parking}</strong>
                        <br />
                        <span style={{ fontSize: 12 }}>{c.store.parkingNote}</span>
                      </>
                    ),
                  },
                ].map((row, i) => (
                  <div
                    key={row.k}
                    style={{
                      display: "flex",
                      gap: 12,
                      padding: "14px 0",
                      borderTop: i === 0 ? "none" : `1px solid ${blush2}`,
                    }}
                  >
                    <dt
                      style={{
                        flex: "none",
                        width: 64,
                        fontWeight: 700,
                        fontSize: 13,
                        color: brown,
                      }}
                    >
                      {row.k}
                    </dt>
                    <dd style={{ margin: 0, fontSize: 13.5, lineHeight: 1.75, color: ink }}>{row.v}</dd>
                  </div>
                ))}
              </dl>
              {/* 車での来店が前提の地域なので、駐車場は帯でも強調する。 */}
              <div
                style={{
                  margin: "0 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  background: sub,
                  borderRadius: 10,
                  padding: "10px 12px",
                  fontWeight: 700,
                  fontSize: 13.5,
                  color: brown,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={brown} strokeWidth="1.8" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <path d="M9.5 17V7h3.5a3 3 0 010 6H9.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                お車でのご来店も安心の駐車場完備
              </div>
              <div style={{ padding: "16px 18px 20px" }}>
                <iframe
                  src={c.store.mapEmbedSrc}
                  title={`${c.store.name}の地図`}
                  loading="lazy"
                  style={{ width: "100%", height: 200, border: 0, borderRadius: 10, display: "block" }}
                />
                <a
                  href={c.store.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    marginTop: 10,
                    textAlign: "center",
                    fontSize: 12.5,
                    color: brown,
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  Googleマップで開く
                </a>
              </div>
            </div>
            <ReserveCta position="studio" active={active} />
          </section>

          {/* ── ⑬ FAQ ── */}
          <section style={{ background: blush, padding: "56px 22px 56px" }}>
            <SectionHeading kicker="faq" text="よくあるご質問" />
            <div style={{ marginTop: 28 }}>
              <FaqList items={faqItems} accent={brown} accentSoft={sub} ink={ink} inkSoft={inkSoft} />
            </div>
          </section>

          {/* ── ⑭ 最終CTA ── */}
          <section id="reserve" style={{ background: "#FFFFFF", paddingBottom: 56 }}>
            <div style={{ position: "relative", height: 320 }}>
              <Photo slot={c.closing.photo} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to bottom, rgba(255,255,255,0) 40%, rgba(255,255,255,0.85) 78%, #FFFFFF 100%)",
                }}
              />
              <h2
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 4,
                  margin: 0,
                  textAlign: "center",
                  fontFamily: SERIF,
                  fontWeight: 600,
                  fontSize: 27,
                  lineHeight: 1.55,
                  letterSpacing: "0.1em",
                  color: brown,
                }}
              >
                {nl(c.closing.heading)}
              </h2>
            </div>
            <div style={{ padding: "0 22px" }}>
              <p
                style={{
                  margin: "14px 0 0",
                  textAlign: "center",
                  fontFamily: SERIF,
                  fontWeight: 500,
                  fontSize: 15,
                  lineHeight: 1.85,
                  letterSpacing: "0.05em",
                  color: ink,
                }}
              >
                {nl(c.closing.lead)}
              </p>
              <div style={{ marginTop: 24 }}>
                {active ? (
                  <>
                    <p
                      style={{
                        margin: "0 0 10px",
                        textAlign: "center",
                        fontSize: 12.5,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        color: brown,
                      }}
                    >
                      {c.campaign.periodLong}
                    </p>
                    <CampaignMini />
                  </>
                ) : (
                  <AfterCampaignBlock />
                )}
              </div>
              <ReserveCta position="closing" active={active} />
            </div>
          </section>

          <footer style={{ background: brown, padding: "22px 18px 24px", textAlign: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/clients/swan-pilates-gamagori/logo-white.webp"
              alt="Swan PILATES STUDIO"
              style={{ height: 30, width: "auto", display: "block", margin: "0 auto" }}
            />
            <p style={{ margin: "10px 0 0", fontSize: 10, letterSpacing: "0.08em", color: "rgba(255,255,255,0.75)" }}>
              © Pilates Studio Swan
            </p>
          </footer>
        </LPCanvas>
      </div>

      {/* ── 追従CTA ── */}
      <StickyFooterCTA
        href={c.reserve.url}
        anchor="#reserve"
        buttonText={active ? c.sticky.buttonText : c.afterCampaign.stickyButton}
        showAfter={c.sticky.showAfter}
        buttonGradient={ctaGrad}
        shadowColor="rgba(75,59,49,0.35)"
        borderColor={`${brown}40`}
        offers={[
          <span
            key="note"
            style={{
              fontFamily: SERIF,
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.08em",
              color: brown,
            }}
          >
            {active ? c.sticky.note : c.afterCampaign.stickyNote}
          </span>,
        ]}
      />
    </LPShell>
  );
}
