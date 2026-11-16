import type { CSSProperties, ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPCanvas from "@/components/LPCanvas";
import ImageSlot from "@/components/ImageSlot";
import SwipeDeck from "./SwipeDeck";
import config from "./config";
import type { Slot } from "./config";

/**
 * パーソナルマシンピラティス SAKURA — 東京エリアの広告集客LP（スワイプ版）。
 * 通常版 `sakura-tokyo` とABテストするための別LP。中身と予約導線は通常版から引き継ぐ。
 *
 * 画面の組み立て（上から）:
 *   ヘッダー（ブランド＋体験予約）→ 進捗バー → スライド（横スワイプ・10枚）→ ナビ（03 / 10）
 * 全体の高さは 約700px（設計px）。iPhoneの表示領域に収まり、縦スクロールせずに
 * 左右のスワイプだけで最後まで読める高さにしている。
 *
 * スライド順（1枚1メッセージ）:
 *   01 FV → 02 レッスン動画 → 03 お悩み → 04 選ばれる理由 → 05 マンツーマン
 *   → 06 積み上げる仕組み → 07 女性専用・完全個室 → 08 料金・キャンペーン（CTA）
 *   → 09 体験の流れ・FAQ → 10 予約のご案内（CTA）
 * 来店率・入会率を上げる目的なので、「0円」は 08 と 10 にだけ出す（理由は config.ts 冒頭）。
 *
 * CTAは 08・10 ＋ ヘッダーの3箇所。すべてSAKURA公式の予約サイトへ外部遷移する
 * （config.reserve.url。通常版と同じ遷移先）。ページ内フォームは持たない
 * （check-rules の FORM_EXEMPT に登録済み）。
 *
 * 見た目の作法:
 *   1. 生成り・墨色・桜色。地は生成り、文字は墨、アクセントは桜
 *   2. 見出しは明朝（Shippori Mincho）、本文はゴシック
 *   3. 小さい桜色の文字は SAKURA_DEEP（白地・生成り地で4.5:1以上）。淡い SAKURA は罫と地だけ
 *   4. 幅は390px固定のキャンバス（LPCanvas）。vw/vh は使わない（CLAUDE.md §16-17）
 */

/* ── palette ───────────────────────────────────────────────── */
const KINARI = "#F7F2EA";
const KINARI_DEEP = "#EFE7DB";
const SUMI = "#2B2627";
const BODY = "#5C5355";
const MUTED = "#8A8083";
const SAKURA = "#E7A9B9";
const SAKURA_PALE = "#F7E7EB";
const SAKURA_DEEP = "#AE4B69";
const LINE = "#E5DAD3";

const MINCHO = "'Shippori Mincho', 'Hiragino Mincho ProN', serif";
const GOTHIC = "'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif";

/** スライドの高さ（設計px）。ヘッダー・進捗バー・ナビと合わせて約700px。 */
const SLIDE_H = 580;
/** スライドの左右余白。本文幅は 390 - 24×2 = 342px。 */
const PAD_X = 24;

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

/** 桜のマーク。ブランド記号としてヘッダーと見出しに使う。 */
function SakuraMark({ size = 14, color = SAKURA }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse key={deg} cx="12" cy="6.4" rx="3.1" ry="5.1" transform={`rotate(${deg} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="1.7" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

function Img({ slot, style, radius = 0 }: { slot: Slot; style: CSSProperties; radius?: number }) {
  return (
    <ImageSlot
      src={slot.src}
      placeholder={slot.placeholder}
      alt={slot.placeholder}
      objectPosition={slot.position ?? "center"}
      poster={slot.poster}
      radius={radius}
      style={style}
    />
  );
}

/** 英字キッカー＋明朝の見出し。各スライドの頭に置く。 */
function Heading({
  kicker,
  text,
  size = 23,
  light = false,
}: {
  kicker: string;
  text: string;
  size?: number;
  light?: boolean;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.22em",
          color: light ? "rgba(255,255,255,0.9)" : SAKURA_DEEP,
        }}
      >
        <SakuraMark size={11} color={light ? "#FFFFFF" : SAKURA} />
        {kicker}
      </div>
      <h2
        style={{
          margin: "8px 0 0",
          fontFamily: MINCHO,
          fontSize: size,
          fontWeight: 600,
          lineHeight: 1.5,
          letterSpacing: "0.04em",
          color: light ? "#FFFFFF" : SUMI,
        }}
      >
        {nl(text)}
      </h2>
    </div>
  );
}

/** 予約CTA。すべてSAKURA公式の予約サイトへ送る。 */
function Cta({ text, sub, height = 54 }: { text: string; sub?: string; height?: number }) {
  return (
    <div>
      <a
        href={config.reserve.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          height,
          background: SAKURA_DEEP,
          color: "#FFFFFF",
          textDecoration: "none",
          fontSize: 16.5,
          fontWeight: 700,
          letterSpacing: "0.08em",
          borderRadius: 999,
          boxShadow: "0 8px 18px rgba(174,75,105,0.26)",
        }}
      >
        {text}
        <span style={{ fontSize: 14 }}>→</span>
      </a>
      {sub && (
        <p style={{ margin: "8px 0 0", textAlign: "center", fontSize: 11.5, color: MUTED }}>
          {sub}
        </p>
      )}
    </div>
  );
}

const pad = (bg: string, top = 26): CSSProperties => ({
  height: "100%",
  background: bg,
  padding: `${top}px ${PAD_X}px 0`,
  boxSizing: "border-box",
});

/* ── slides ────────────────────────────────────────────────── */

/** 01 ファーストビュー。写真全面＋下からの墨色グラデーションに明朝のキャッチ。 */
function SlideFv() {
  const f = config.fv;
  return (
    <div style={{ position: "relative", height: "100%" }}>
      <Img slot={f.hero} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(43,38,39,0) 38%, rgba(43,38,39,0.55) 62%, rgba(43,38,39,0.88) 100%)",
        }}
      />
      <div style={{ position: "absolute", left: PAD_X, right: PAD_X, bottom: 28, color: "#FFFFFF" }}>
        <div style={{ fontSize: 10.5, letterSpacing: "0.24em", opacity: 0.85 }}>{f.kicker}</div>
        <h1
          style={{
            margin: "10px 0 0",
            fontFamily: MINCHO,
            fontSize: 32,
            fontWeight: 600,
            lineHeight: 1.45,
            letterSpacing: "0.06em",
          }}
        >
          {f.catchLines.map((l) => (
            <span key={l} style={{ display: "block" }}>
              {l}
            </span>
          ))}
        </h1>
        <p style={{ margin: "14px 0 0", fontSize: 14, lineHeight: 1.75, letterSpacing: "0.04em" }}>
          {nl(f.lead)}
        </p>
        <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
          {f.chips.map((chip) => (
            <span
              key={chip}
              style={{
                padding: "5px 10px",
                border: "1px solid rgba(255,255,255,0.7)",
                borderRadius: 999,
                fontSize: 11.5,
                letterSpacing: "0.04em",
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** 02 レッスン風景（動画）。 */
function SlideLesson() {
  const l = config.lesson;
  return (
    <div style={pad(KINARI)}>
      <Heading kicker={l.kicker} text={l.heading} size={21} />
      <Img
        slot={l.video}
        radius={6}
        style={{ marginTop: 16, width: "100%", height: 336 }}
      />
      <p style={{ margin: "14px 0 0", fontSize: 13, lineHeight: 1.75, color: BODY }}>{nl(l.caption)}</p>
    </div>
  );
}

/** 03 お悩み。2×2の写真カード。 */
function SlideWorry() {
  const w = config.worry;
  return (
    <div style={pad("#FFFFFF")}>
      <Heading kicker={w.kicker} text={w.heading} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
        {w.items.map((item) => (
          <div key={item.text} style={{ background: KINARI, borderRadius: 6, overflow: "hidden" }}>
            <Img slot={item.img} style={{ width: "100%", height: 100 }} />
            <p
              style={{
                margin: 0,
                padding: "10px 10px 12px",
                fontSize: 13.5,
                fontWeight: 700,
                lineHeight: 1.55,
                color: SUMI,
              }}
            >
              {nl(item.text)}
            </p>
          </div>
        ))}
      </div>
      <p
        style={{
          margin: "20px 0 0",
          textAlign: "center",
          fontFamily: MINCHO,
          fontSize: 17,
          fontWeight: 600,
          lineHeight: 1.65,
          color: SAKURA_DEEP,
        }}
      >
        {nl(w.closing)}
      </p>
    </div>
  );
}

/** 04 選ばれる理由。写真＋実績2つ＋理由3つ。 */
function SlideReasons() {
  const r = config.reasons;
  return (
    <div style={{ height: "100%", background: KINARI }}>
      <Img slot={r.photo} style={{ width: "100%", height: 180 }} />
      <div style={{ padding: `18px ${PAD_X}px 0` }}>
        <Heading kicker={r.kicker} text={r.heading} size={22} />
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          {r.stats.map((s) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                padding: "8px 0 9px",
                background: "#FFFFFF",
                borderRadius: 6,
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: MINCHO, color: SAKURA_DEEP, lineHeight: 1.1 }}>
                <span style={{ fontSize: 30, fontWeight: 600 }}>{s.num}</span>
                <span style={{ fontSize: 15, marginLeft: 2 }}>{s.unit}</span>
              </div>
              <div style={{ marginTop: 3, fontSize: 11.5, color: BODY }}>{s.label}</div>
            </div>
          ))}
        </div>
        <ol style={{ listStyle: "none", margin: "12px 0 0", padding: 0 }}>
          {r.items.map((item, i) => (
            <li
              key={item.title}
              style={{
                display: "flex",
                gap: 10,
                padding: "8px 0",
                borderTop: i === 0 ? "none" : `1px solid ${LINE}`,
              }}
            >
              <span style={{ fontFamily: MINCHO, fontSize: 15, color: SAKURA_DEEP, lineHeight: 1.45 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: SUMI, lineHeight: 1.45 }}>{item.title}</div>
                <div style={{ marginTop: 2, fontSize: 12, color: BODY, lineHeight: 1.6 }}>{item.body}</div>
              </div>
            </li>
          ))}
        </ol>
        <p style={{ margin: "4px 0 0", fontSize: 10, color: MUTED }}>{r.note}</p>
      </div>
    </div>
  );
}

/** 05 マンツーマンだからできること。 */
function SlidePersonal() {
  const p = config.personal;
  return (
    <div style={{ height: "100%", background: "#FFFFFF" }}>
      <Img slot={p.photo} style={{ width: "100%", height: 205 }} />
      <div style={{ padding: `22px ${PAD_X}px 0` }}>
        <Heading kicker={p.kicker} text={p.heading} />
        <div style={{ marginTop: 14 }}>
          {p.items.map((item) => (
            <div
              key={item.title}
              style={{ padding: "9px 0 9px 14px", borderLeft: `2px solid ${SAKURA}`, marginTop: 6 }}
            >
              <div style={{ fontSize: 14.5, fontWeight: 700, color: SUMI, lineHeight: 1.45 }}>{item.title}</div>
              <div style={{ marginTop: 2, fontSize: 12.5, color: BODY, lineHeight: 1.6 }}>{item.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** 06 積み上げる仕組み。3ステップを縦の線でつなぐ。 */
function SlideSystem() {
  const s = config.system;
  return (
    <div style={pad(KINARI)}>
      <Heading kicker={s.kicker} text={s.heading} />
      <p style={{ margin: "10px 0 0", fontSize: 13, lineHeight: 1.75, color: BODY }}>{nl(s.lead)}</p>
      <Img slot={s.photo} radius={6} style={{ marginTop: 14, width: "100%", height: 150 }} />
      <div style={{ position: "relative", marginTop: 16 }}>
        <span
          aria-hidden
          style={{ position: "absolute", left: 17, top: 18, bottom: 18, width: 1, background: SAKURA }}
        />
        {s.steps.map((step) => (
          <div key={step.num} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 12 }}>
            <span
              style={{
                position: "relative",
                flex: "0 0 auto",
                width: 35,
                height: 35,
                borderRadius: 999,
                background: "#FFFFFF",
                border: `1px solid ${SAKURA}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: MINCHO,
                fontSize: 13,
                color: SAKURA_DEEP,
              }}
            >
              {step.num}
            </span>
            <div style={{ paddingTop: 1 }}>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: SUMI, lineHeight: 1.45 }}>{step.title}</div>
              <div style={{ marginTop: 1, fontSize: 12.5, color: BODY, lineHeight: 1.6 }}>{step.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 07 女性専用・完全個室。 */
function SlidePrivacy() {
  const p = config.privacy;
  return (
    <div style={{ height: "100%", background: "#FFFFFF" }}>
      <Img slot={p.photo} style={{ width: "100%", height: 290 }} />
      <div style={{ padding: `22px ${PAD_X}px 0` }}>
        <Heading kicker={p.kicker} text={p.heading} size={24} />
        <p style={{ margin: "12px 0 0", fontSize: 13.5, lineHeight: 1.8, color: BODY }}>{nl(p.lead)}</p>
        <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
          {p.points.map((pt) => (
            <span
              key={pt}
              style={{
                padding: "6px 11px",
                borderRadius: 999,
                background: SAKURA_PALE,
                color: SAKURA_DEEP,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {pt}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** 08 料金・キャンペーン。体験の特典 → 月額プラン → CTA。 */
function SlidePrice() {
  const p = config.price;
  const row = (label: string, was: string, now: string) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
      <span style={{ fontSize: 12.5, fontWeight: 700, color: SUMI, lineHeight: 1.45 }}>{label}</span>
      <span style={{ flex: "0 0 auto", display: "flex", alignItems: "baseline", gap: 6 }}>
        <s style={{ fontSize: 11.5, color: MUTED }}>{was}</s>
        <span style={{ fontSize: 11, color: MUTED }}>→</span>
        <span style={{ fontFamily: MINCHO, fontSize: 24, fontWeight: 700, color: SAKURA_DEEP }}>{now}</span>
      </span>
    </div>
  );
  return (
    <div style={pad(KINARI, 22)}>
      <Heading kicker={p.kicker} text={p.heading} size={22} />
      <div
        style={{
          marginTop: 12,
          background: "#FFFFFF",
          borderRadius: 8,
          border: `1px solid ${SAKURA}`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "6px 0",
            background: SAKURA_DEEP,
            color: "#FFFFFF",
            textAlign: "center",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        >
          {p.deadline}
        </div>
        <div style={{ padding: "10px 14px 12px", display: "grid", gap: 6 }}>
          {row(p.trial.label, p.trial.was, p.trial.now)}
          <div style={{ height: 1, background: LINE }} />
          {row(p.join.label, p.join.was, p.join.now)}
          <div style={{ fontSize: 11.5, color: SAKURA_DEEP, fontWeight: 700 }}>{p.join.extra}</div>
        </div>
      </div>

      <div style={{ marginTop: 12, background: "#FFFFFF", borderRadius: 8 }}>
        {p.plans.map((plan, i) => (
          <div
            key={plan.name}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "9px 14px",
              borderTop: i === 0 ? "none" : `1px solid ${LINE}`,
            }}
          >
            <div style={{ flex: 1, fontSize: 13, fontWeight: 700, color: SUMI }}>
              {plan.name}
              {plan.badge && (
                <span
                  style={{
                    marginLeft: 6,
                    padding: "1px 6px",
                    borderRadius: 3,
                    background: SAKURA_PALE,
                    color: SAKURA_DEEP,
                    fontSize: 10,
                    verticalAlign: 2,
                  }}
                >
                  {plan.badge}
                </span>
              )}
            </div>
            <div style={{ textAlign: "right", lineHeight: 1.25 }}>
              <div style={{ color: SUMI }}>
                <span style={{ fontFamily: MINCHO, fontSize: 17, fontWeight: 700 }}>{plan.amount}</span>
                <span style={{ fontSize: 10.5, marginLeft: 2 }}>{plan.unit}</span>
              </div>
              <div style={{ fontSize: 10.5, color: MUTED }}>{plan.per}</div>
            </div>
          </div>
        ))}
      </div>
      <p style={{ margin: "8px 0 14px", fontSize: 10.5, lineHeight: 1.6, color: MUTED }}>{p.notes}</p>
      <Cta text={p.ctaText} height={52} />
    </div>
  );
}

/** 09 体験の流れ・よくある質問。 */
function SlideFlow() {
  const f = config.flow;
  return (
    <div style={pad("#FFFFFF")}>
      <Heading kicker={f.kicker} text={f.heading} size={22} />
      <div style={{ marginTop: 12 }}>
        {f.steps.map((step, i) => (
          <div
            key={step.title}
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              padding: "7px 12px",
              background: KINARI,
              borderRadius: 6,
              marginTop: i === 0 ? 0 : 6,
            }}
          >
            <span style={{ fontFamily: MINCHO, fontSize: 12, color: SAKURA_DEEP, letterSpacing: "0.08em" }}>
              STEP
              <br />
              <span style={{ fontSize: 19 }}>{i + 1}</span>
            </span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: SUMI, lineHeight: 1.45 }}>{step.title}</div>
              <div style={{ fontSize: 12, color: BODY, lineHeight: 1.55 }}>{step.body}</div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 14,
          fontFamily: MINCHO,
          fontSize: 17,
          fontWeight: 600,
          color: SUMI,
          letterSpacing: "0.04em",
        }}
      >
        {f.faqHeading}
      </div>
      <dl style={{ margin: "6px 0 0" }}>
        {f.faq.map((item) => (
          <div key={item.q} style={{ padding: "7px 0", borderBottom: `1px solid ${LINE}` }}>
            <dt style={{ fontSize: 13.5, fontWeight: 700, color: SUMI }}>
              <span style={{ fontFamily: MINCHO, color: SAKURA_DEEP, marginRight: 6 }}>Q.</span>
              {item.q}
            </dt>
            <dd style={{ margin: "3px 0 0", fontSize: 12.5, lineHeight: 1.6, color: BODY }}>
              <span style={{ fontFamily: MINCHO, color: MUTED, marginRight: 6 }}>A.</span>
              {item.a}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** 10 予約のご案内。写真＋締めの一言＋CTA＋店舗一覧。 */
function SlideClosing() {
  const c = config.closing;
  return (
    <div style={{ height: "100%", background: KINARI }}>
      <Img slot={c.photo} style={{ width: "100%", height: 136 }} />
      <div style={{ padding: `18px ${PAD_X}px 0` }}>
        <Heading kicker={c.kicker} text={c.heading} size={20} />
        <p style={{ margin: "8px 0 0", fontSize: 13, lineHeight: 1.7, color: BODY }}>{nl(c.lead)}</p>
        <div style={{ display: "flex", gap: 6, margin: "12px 0 14px" }}>
          {c.chips.map((chip) => (
            <span
              key={chip}
              style={{
                padding: "4px 9px",
                borderRadius: 999,
                background: "#FFFFFF",
                border: `1px solid ${SAKURA}`,
                color: SAKURA_DEEP,
                fontSize: 11.5,
                fontWeight: 700,
              }}
            >
              {chip}
            </span>
          ))}
        </div>
        <Cta text={c.ctaText} sub={c.ctaSub} height={56} />
        <div style={{ marginTop: 12, padding: "9px 12px", background: KINARI_DEEP, borderRadius: 6 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: SUMI }}>{c.studiosLabel}</div>
          <p style={{ margin: "3px 0 0", fontSize: 10.5, lineHeight: 1.6, color: BODY }}>{c.studios}</p>
          <p style={{ margin: "3px 0 0", fontSize: 10, lineHeight: 1.5, color: MUTED }}>{c.upcoming}</p>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const c = config;
  const slides = [
    <SlideFv key="fv" />,
    <SlideLesson key="lesson" />,
    <SlideWorry key="worry" />,
    <SlideReasons key="reasons" />,
    <SlidePersonal key="personal" />,
    <SlideSystem key="system" />,
    <SlidePrivacy key="privacy" />,
    <SlidePrice key="price" />,
    <SlideFlow key="flow" />,
    <SlideClosing key="closing" />,
  ];

  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div
        style={{
          fontFamily: GOTHIC,
          color: SUMI,
          background: KINARI_DEEP,
          minHeight: "100vh",
          /* 長音符・小書き仮名が行頭に来ないよう禁則処理を厳密に。 */
          lineBreak: "strict",
        }}
      >
        <LPCanvas style={{ background: KINARI }} boxShadow="0 0 60px rgba(43,38,39,0.12)">
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "9px 14px 8px",
              background: "#FFFFFF",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <SakuraMark size={22} />
              <div style={{ lineHeight: 1.25 }}>
                <div
                  style={{
                    fontFamily: MINCHO,
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: SUMI,
                  }}
                >
                  {c.header.brand}
                </div>
                <div style={{ fontSize: 9.5, letterSpacing: "0.04em", color: BODY }}>{c.header.brandSub}</div>
              </div>
            </div>
            <a
              href={c.reserve.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                height: 34,
                padding: "0 16px",
                borderRadius: 999,
                border: `1px solid ${SAKURA_DEEP}`,
                color: SAKURA_DEEP,
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textDecoration: "none",
              }}
            >
              {c.header.ctaText}
            </a>
          </header>

          <SwipeDeck
            slides={slides}
            labels={c.navLabels}
            height={SLIDE_H}
            ink={SUMI}
            accent={SAKURA_DEEP}
            line={LINE}
            hint={c.fv.swipeHint}
          />

          <footer style={{ padding: "18px 0 22px", textAlign: "center", background: KINARI }}>
            <p style={{ margin: 0, fontSize: 10.5, color: MUTED }}>
              © {new Date().getFullYear()} SAKURA
            </p>
          </footer>
        </LPCanvas>
      </div>
    </LPShell>
  );
}
