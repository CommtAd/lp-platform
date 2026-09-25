import type { CSSProperties, ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPCanvas from "@/components/LPCanvas";
import ImageSlot from "@/components/ImageSlot";
import StickyFooterCTA from "@/components/StickyFooterCTA";
import FaqAccordion from "./FaqAccordion";
import config, { CTA_URL } from "./config";

/**
 * ソエルスタジオ戸越銀座店（テスト枠）— 18セクション構成。
 *
 * 設計ルール:
 *   1. 幅390pxの1枚のキャンバス（<LPCanvas>）。vw/vh は使わない（CLAUDE.md §16-17）。
 *      キャンバス外の地色を敷く `minHeight: "100vh"` だけが例外。
 *   2. 予約ボタンは4箇所だけ（§6・§9・§13・§17の各末尾）。
 *      §11（入会特典）は §6 の再掲枠なのでボタンを置かない。
 *   3. CTAはゴールド。AUNレビュー #8・#18・#22・#23 の指示による。
 *      初稿ブリーフの「ゴールド禁止」はこのレビューで上書きされている。
 */

/* ── design tokens ─────────────────────────────────────────────────────
   MAIN   紺: 見出し・濃色セクションの地
   ACCENT 明るい青: 価格・チェックアイコンの強調
   PALE   淡青: セクションの区切り
   GOLD_* CTA・特典まわり（AUNレビューで追加） */
const MAIN = "#23506E";
const ACCENT = "#4E96C8";
const PALE = "#EFF6FA";
const WHITE = "#FFFFFF";
const INK = "#2E4552";
const DIM = "#5D7180";
const LINE = "#DCE7EE";
const PAGE_BG = "#E8EFF4";

/** CTAはゴールド（本番 soelu-togoshiginza と同じグラデーション）。 */
const CTA_GRAD = "linear-gradient(135deg, #D9B569 0%, #B5852F 100%)";
const CTA_SHADOW = "rgba(180,135,60,0.35)";
const GOLD = "#B58A3C";
/** 白地に載せる金は 2.6:1 しか出ないので、文字はこの深い金を使う。 */
const GOLD_DEEP = "#8C6B2F";
const CREAM = "#FAF6EE";
const CREAM_LINE = "#E7DCC4";

/**
 * FV下の特徴カードの色味。参考画像では「よもぎ蒸し」だけ緑系で、
 * 4枚を同じ青で塗ると単調・重く見える（顧客指摘 2026-09-17）。
 * 各カードに地色・ラベル色・右上の光を割り当てて変化をつける。
 */
const FEATURE_TONES = {
  blue: { from: "#FFFFFF", to: "#D6EAF8", pill: "#23506E", text: "#1F4A66", glow: "rgba(78,150,200,0.30)" },
  green: { from: "#FFFFFF", to: "#D9EFE2", pill: "#3C7A5E", text: "#2C5A45", glow: "rgba(96,164,130,0.32)" },
  sky: { from: "#FFFFFF", to: "#CFE8F5", pill: "#1F6A8C", text: "#1B5570", glow: "rgba(64,166,206,0.30)" },
  indigo: { from: "#FFFFFF", to: "#DEE4F7", pill: "#3B5591", text: "#2F4577", glow: "rgba(96,120,200,0.30)" },
} as const;

const MINCHO = "'Shippori Mincho', serif";
const GOTHIC = "'Zen Kaku Gothic New', sans-serif";
const SANS = "'Noto Sans JP', sans-serif";

const PAD = 18;

const c = config;

/** "\n" 区切りのテキストを改行として描画する。 */
function nl(text: string): ReactNode {
  return text.split("\n").map((part, i, arr) => (
    <span key={i}>
      {part}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

/** `text` のうち `term` 部分だけ色付き太字にする。 */
function highlight(text: string, term: string, color: string): ReactNode {
  const i = text.indexOf(term);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <b style={{ color, fontWeight: 700 }}>{term}</b>
      {text.slice(i + term.length)}
    </>
  );
}

function CheckIcon({ size = 16, color = ACCENT }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M5 12.5l4.2 4.2L19 6.8" />
    </svg>
  );
}

/** 丸地に白チェック。お悩み訴求で使う。 */
function CheckDot({ size = 26 }: { size?: number }) {
  return (
    <span
      style={{
        flexShrink: 0,
        width: size,
        height: size,
        borderRadius: "50%",
        background: ACCENT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CheckIcon size={size * 0.58} color={WHITE} />
    </span>
  );
}

function Heading({
  text,
  color = MAIN,
  size = 24,
  align = "center",
}: {
  text: string;
  color?: string;
  size?: number;
  align?: CSSProperties["textAlign"];
}) {
  return (
    <h2
      style={{
        margin: 0,
        fontFamily: MINCHO,
        fontSize: size,
        fontWeight: 700,
        lineHeight: 1.55,
        letterSpacing: "0.04em",
        color,
        textAlign: align,
      }}
    >
      {nl(text)}
    </h2>
  );
}

/**
 * 予約CTA（ゴールド）。ボタンの上に小見出しは置かず、下に注記を置く。
 * ページ内で4回のみ使用する。
 *
 * `trialNote` は無料体験の適用条件。予約セクションのCTA①は同じ注記が
 * すぐ上にあるため付けず、それ以外のCTA②〜④に付ける（AUN e5kw59 #2〜#4）。
 */
function Cta({ trialNote = false }: { trialNote?: boolean }) {
  return (
    <div style={{ marginTop: 22 }}>
      <a
        href={CTA_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          height: 58,
          background: CTA_GRAD,
          color: WHITE,
          textDecoration: "none",
          fontFamily: GOTHIC,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "0.06em",
          borderRadius: 999,
          boxShadow: `0 10px 22px ${CTA_SHADOW}`,
        }}
      >
        {c.cta.text}
        <span
          style={{
            display: "inline-flex",
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.28)",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
          }}
        >
          →
        </span>
      </a>
      <p
        style={{
          margin: "9px 0 0",
          fontFamily: SANS,
          fontSize: 11,
          lineHeight: 1.7,
          color: DIM,
          textAlign: "center",
        }}
      >
        {c.cta.note}
      </p>
      {trialNote && (
        <p
          style={{
            margin: "6px 0 0",
            fontFamily: SANS,
            fontSize: 11,
            lineHeight: 1.7,
            color: DIM,
            textAlign: "center",
          }}
        >
          {c.cta.trialNote}
        </p>
      )}
    </div>
  );
}

/** 「初月 月額会費 0円」形式の金額行。予約セクションと特典セクションで共有。 */
function MoneyRow({
  tag,
  label,
  value,
  note,
  round = false,
}: {
  tag: string;
  label: string;
  value: string;
  note?: string;
  round?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: round ? "12px 16px" : "13px 16px",
        background: WHITE,
        border: `1px solid ${CREAM_LINE}`,
        borderRadius: 12,
      }}
    >
      <span
        style={{
          flexShrink: 0,
          width: round ? 44 : 40,
          height: round ? 44 : 26,
          borderRadius: round ? "50%" : 6,
          background: round ? CTA_GRAD : CREAM,
          color: round ? WHITE : GOLD_DEEP,
          fontFamily: MINCHO,
          fontSize: 13,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {tag}
      </span>
      <span
        style={{
          fontFamily: GOTHIC,
          fontSize: 15,
          fontWeight: 800,
          color: MAIN,
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: GOTHIC,
          fontSize: 19,
          fontWeight: 800,
          color: GOLD_DEEP,
          letterSpacing: "0.01em",
        }}
      >
        {value}
      </span>
      {note && (
        <span style={{ fontFamily: SANS, fontSize: 10.5, color: DIM }}>{note}</span>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <LPShell
      clientSlug="soelu-test"
      fallback={{ name: c.meta.title, status: "draft" }}
    >
      <div style={{ fontFamily: SANS, color: INK, background: PAGE_BG, minHeight: "100vh" }}>
        <LPCanvas style={{ background: WHITE }} boxShadow="0 0 60px rgba(35,80,110,0.16)">
          {/* ── 1. ヘッダー（AUN #4） ─────────────────────────────── */}
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              padding: "11px 14px",
              background: WHITE,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: MINCHO,
                  fontSize: 17,
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                  color: MAIN,
                  lineHeight: 1.3,
                }}
              >
                {c.header.brand}
              </p>
              <p
                style={{
                  margin: "2px 0 0",
                  fontFamily: SANS,
                  fontSize: 9.5,
                  letterSpacing: "0.02em",
                  color: DIM,
                  lineHeight: 1.4,
                }}
              >
                {c.header.sub}
              </p>
            </div>
            <div style={{ flexShrink: 0, textAlign: "right" }}>
              {c.header.routes.map((r) => {
                const m = r.match(/^(.*?)(徒歩\S+)$/);
                return (
                  <p
                    key={r}
                    style={{
                      margin: 0,
                      fontFamily: GOTHIC,
                      fontSize: 10.5,
                      lineHeight: 1.6,
                      color: INK,
                    }}
                  >
                    {m ? (
                      <>
                        {m[1]}
                        <b style={{ fontWeight: 800, color: MAIN }}>{m[2]}</b>
                      </>
                    ) : (
                      r
                    )}
                  </p>
                );
              })}
            </div>
          </header>

          {/* ── 2. オファーバー（AUN #3） ─────────────────────────── */}
          <div style={{ background: MAIN, padding: "13px 14px", textAlign: "center" }}>
            <p
              style={{
                margin: 0,
                fontFamily: GOTHIC,
                // 15px。ref03（実寸 約13.8px相当）より大きく、かつ閉じの「／」が
                // 折り返さずに1行へ収まるサイズ（設計幅390 − 左右14 = 362pxに対して約340px）。
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: "0.01em",
                color: "#E8CD8A",
                lineHeight: 1.4,
                whiteSpace: "nowrap",
              }}
            >
              ＼{c.offerBar.main}／
            </p>
            <p
              style={{
                margin: "6px 0 0",
                fontFamily: GOTHIC,
                fontSize: 13.5,
                fontWeight: 500,
                letterSpacing: "0.04em",
                color: WHITE,
              }}
            >
              {c.offerBar.sub}
            </p>
          </div>

          {/* ── 4. FV（AUN #1 バッジ削除 / #2 キャッチ変更） ─────── */}
          {/* AUN2 #11: 下部の余った床面をカットするため 520 → 430 に詰めている。 */}
          <section style={{ position: "relative", height: 430, background: MAIN }}>
            <ImageSlot
              src={c.fv.hero.src}
              placeholder={c.fv.hero.placeholder}
              alt="スタジオ内観"
              // AUN2 #11: 既定の center だと上下が均等に切れて床が残るため、
              // 表示位置を上寄せして下側（床面）を落とす。
              objectPosition="center 30%"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(20,50,74,0.30) 0%, rgba(20,50,74,0.05) 34%, rgba(20,50,74,0.62) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 28,
                left: 16,
                display: "flex",
                flexDirection: "row-reverse",
                // 既定の stretch だと短いほうの札が相手の高さに引き伸ばされ、
                // 「。」の後ろに余白が出る（AUN2 #1）。各札を中身の高さに合わせる。
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              {c.fv.catchLines.map((lineText, i) => (
                <span
                  key={i}
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "upright",
                    background: "rgba(255,255,255,0.93)",
                    color: MAIN,
                    fontFamily: MINCHO,
                    fontSize: i === 0 ? 27 : 24,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    lineHeight: 1,
                    padding: "20px 12px",
                    borderRadius: 4,
                    boxShadow: "0 4px 14px rgba(20,50,74,0.22)",
                  }}
                >
                  {lineText}
                </span>
              ))}
            </div>
          </section>

          {/* ── 5. FV下のメインカラー帯（AUN #5 / #6） ───────────── */}
          <section
            style={{
              // 単色の紺だと重く沈むので、下に向けて少し明るいブルーへ送る。
              background: "linear-gradient(180deg, #1E4863 0%, #2A6489 100%)",
              padding: `20px ${PAD}px 24px`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "11px 22px",
                  borderRadius: 999,
                  background: WHITE,
                  color: MAIN,
                  fontFamily: GOTHIC,
                  fontSize: 16,
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                  boxShadow: "0 4px 14px rgba(10,35,55,0.28)",
                }}
              >
                {c.fvBand.pill}
              </span>
            </div>
            {/* AUN2 #10: 添付デザインを参考にした特徴カード4枚（2×2）。 */}
            <div
              style={{
                marginTop: 14,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              {c.fvBand.features.map((f) => {
                const t = FEATURE_TONES[f.tone];
                return (
                <div
                  key={f.label}
                  style={{
                    background: `radial-gradient(circle at 112% 8%, ${t.glow} 0%, transparent 58%), linear-gradient(150deg, ${t.from} 0%, ${t.to} 100%)`,
                    borderRadius: 14,
                    padding: "11px 10px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 7,
                    boxShadow: "0 4px 14px rgba(10,35,55,0.18)",
                  }}
                >
                  <span
                    style={{
                      alignSelf: "flex-start",
                      background: t.pill,
                      color: WHITE,
                      borderRadius: 999,
                      padding: "5px 10px",
                      fontFamily: GOTHIC,
                      // 最長の「スタジオレッスン受け放題」(12字) が
                      // カード内側153pxに1行で収まるサイズ。
                      fontSize: 10.5,
                      fontWeight: 800,
                      letterSpacing: "0.01em",
                      lineHeight: 1.25,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {f.label}
                  </span>
                  <span
                    style={{
                      fontFamily: GOTHIC,
                      fontSize: 11,
                      fontWeight: 700,
                      lineHeight: 1.65,
                      color: t.text,
                    }}
                  >
                    {f.lines.map((ln, i) => (
                      <span key={i}>
                        {ln}
                        {i < f.lines.length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                  {f.badge && (
                    <span
                      style={{
                        marginTop: "auto",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        background: t.pill,
                        borderRadius: 8,
                        padding: "5px 8px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: GOTHIC,
                          fontSize: 12,
                          fontWeight: 800,
                          color: WHITE,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {f.badge.main}
                      </span>
                      <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.4)" }} />
                      <span
                        style={{
                          fontFamily: SANS,
                          fontSize: 8.5,
                          lineHeight: 1.4,
                          color: "rgba(255,255,255,0.9)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {nl(f.badge.sub)}
                      </span>
                    </span>
                  )}
                </div>
                );
              })}
            </div>
            {c.fvBand.featuresNotes?.map((note, i) => (
              <p
                key={note}
                style={{
                  margin: `${i === 0 ? 10 : 3}px 0 0`,
                  fontFamily: SANS,
                  fontSize: 9.5,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.72)",
                }}
              >
                {note}
              </p>
            ))}
          </section>

          {/* ── 6. 無料体験のご予約（AUN #7）＋ CTA① ─────────────── */}
          <section style={{ background: WHITE, padding: `32px ${PAD}px 36px` }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "13px 22px",
                  borderRadius: 999,
                  background: CTA_GRAD,
                  color: WHITE,
                  fontFamily: GOTHIC,
                  fontSize: 15.5,
                  fontWeight: 800,
                  letterSpacing: "0.02em",
                  boxShadow: `0 6px 16px ${CTA_SHADOW}`,
                }}
              >
                ＼ {c.reservation.badge} ／
              </span>
            </div>

            <div
              style={{
                marginTop: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <span style={{ width: 26, height: 1, background: ACCENT }} />
              <span
                style={{
                  fontFamily: GOTHIC,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  color: ACCENT,
                }}
              >
                {c.reservation.eyebrow}
              </span>
              <span style={{ width: 26, height: 1, background: ACCENT }} />
            </div>

            <div style={{ marginTop: 12 }}>
              <Heading text={c.reservation.heading} size={28} />
            </div>

            <p
              style={{
                margin: "16px 0 0",
                fontFamily: SANS,
                fontSize: 13,
                lineHeight: 1.95,
                color: INK,
                textAlign: "center",
              }}
            >
              {c.reservation.lead.map((ln, i) => (
                <span key={i}>
                  {ln}
                  {i < c.reservation.lead.length - 1 && <br />}
                </span>
              ))}
            </p>

            <div
              style={{
                marginTop: 18,
                display: "flex",
                justifyContent: "center",
                gap: 12,
              }}
            >
              {c.reservation.chips.map((chip) => (
                <span
                  key={chip.label}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 8,
                    padding: "16px 20px",
                    borderRadius: 14,
                    background: PALE,
                    border: `2px solid ${ACCENT}`,
                  }}
                >
                  <span style={{ fontFamily: GOTHIC, fontSize: 12.5, fontWeight: 700, color: MAIN }}>
                    {chip.label}
                  </span>
                  <span
                    style={{
                      fontFamily: GOTHIC,
                      fontSize: 27,
                      fontWeight: 800,
                      color: MAIN,
                    }}
                  >
                    {chip.value}
                  </span>
                </span>
              ))}
            </div>

            <div
              style={{
                marginTop: 18,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                background: CREAM,
                border: `2px solid ${GOLD}`,
                borderRadius: 14,
                padding: 12,
              }}
            >
              {c.reservation.rows.map((row) => (
                <MoneyRow key={row.tag} {...row} />
              ))}
            </div>

            <div style={{ marginTop: 14 }}>
              {c.reservation.notes.map((note, i) => (
                <p
                  key={i}
                  style={{
                    margin: i === 0 ? 0 : "4px 0 0",
                    fontFamily: SANS,
                    fontSize: 11,
                    lineHeight: 1.75,
                    color: DIM,
                  }}
                >
                  {note}
                </p>
              ))}
            </div>

            <Cta />
          </section>

          {/* ── 7. お悩み訴求（AUN #9） ───────────────────────────── */}
          <section style={{ background: WHITE, padding: `32px ${PAD}px 36px` }}>
            <Heading text={c.worry.heading} size={24} />
            <div
              style={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                gap: 11,
              }}
            >
              {c.worry.items.map((item) => (
                <div
                  key={item.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "15px 16px",
                    background: PALE,
                    borderRadius: 12,
                  }}
                >
                  <CheckDot />
                  <span
                    style={{
                      fontFamily: SANS,
                      fontSize: 13.5,
                      lineHeight: 1.6,
                      color: INK,
                    }}
                  >
                    {highlight(item.text, item.highlight, ACCENT)}
                  </span>
                </div>
              ))}
            </div>

            <p
              style={{
                margin: "26px 0 0",
                fontFamily: MINCHO,
                fontSize: 20,
                fontWeight: 700,
                lineHeight: 1.75,
                letterSpacing: "0.03em",
                color: MAIN,
                textAlign: "center",
              }}
            >
              {c.worry.closingPre}
              <br />
              {c.worry.closingHighlight.split("\n").map((ln) => (
                <span key={ln} style={{ display: "block" }}>
                  <span
                    style={{
                      background: `linear-gradient(transparent 62%, ${PALE} 62%)`,
                      paddingBottom: 2,
                    }}
                  >
                    {ln}
                  </span>
                </span>
              ))}
            </p>
          </section>

          {/* ── 8. 目指せる未来（AUN #10-13 / #14 / #15） ─────────── */}
          <section style={{ background: PALE, padding: `32px ${PAD}px 36px` }}>
            <Heading text={c.future.heading} size={22} />
            <div
              style={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {c.future.items.map((item) => (
                <div
                  key={item.num}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 13,
                    background: WHITE,
                    borderRadius: 12,
                    padding: 10,
                    boxShadow: "0 2px 8px rgba(35,80,110,0.06)",
                  }}
                >
                  <ImageSlot
                    src={item.img.src}
                    placeholder={item.img.placeholder}
                    alt={item.title}
                    radius={10}
                    style={{ flexShrink: 0, width: 112, height: 108 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: GOTHIC,
                          fontSize: 14,
                          fontWeight: 800,
                          color: ACCENT,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {item.num}
                      </span>
                      <span style={{ width: 1, height: 14, background: LINE }} />
                      <span
                        style={{
                          fontFamily: GOTHIC,
                          fontSize: 16,
                          fontWeight: 800,
                          color: MAIN,
                          letterSpacing: "0.01em",
                          lineHeight: 1.35,
                        }}
                      >
                        {item.title}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: SANS,
                        fontSize: 13,
                        lineHeight: 1.8,
                        color: INK,
                      }}
                    >
                      {nl(item.body)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p
              style={{
                margin: "24px 0 0",
                fontFamily: MINCHO,
                fontSize: 19,
                fontWeight: 700,
                lineHeight: 1.7,
                letterSpacing: "0.04em",
                color: MAIN,
                textAlign: "center",
              }}
            >
              {c.future.closing}
            </p>
          </section>

          {/* ── 9. 選ばれる理由（AUN #16 / #17 / #19）＋ CTA② ────── */}
          <section style={{ background: WHITE, padding: `32px ${PAD}px 36px` }}>
            <Heading text={c.reasons.heading} size={30} />
            <div
              style={{
                width: 48,
                height: 3,
                background: GOLD,
                margin: "12px auto 0",
                borderRadius: 2,
              }}
            />

            {/* 画像ありの理由（01〜03） */}
            <div
              style={{
                marginTop: 22,
                display: "flex",
                flexDirection: "column",
                gap: 26,
              }}
            >
              {c.reasons.items
                .filter((item) => item.img)
                .map((item) => (
                  <div key={item.num}>
                    <div style={{ position: "relative" }}>
                      <ImageSlot
                        src={item.img!.src}
                        placeholder={item.img!.placeholder}
                        alt={item.title.replace("\n", "")}
                        radius={12}
                        style={{ width: "100%", height: 186 }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: -12,
                          right: 8,
                          width: 46,
                          height: 46,
                          background: MAIN,
                          transform: "rotate(45deg)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 4,
                          boxShadow: "0 4px 12px rgba(35,80,110,0.28)",
                        }}
                      >
                        <span
                          style={{
                            transform: "rotate(-45deg)",
                            fontFamily: GOTHIC,
                            fontSize: 15,
                            fontWeight: 800,
                            color: WHITE,
                          }}
                        >
                          {item.num}
                        </span>
                      </div>
                    </div>

                    <h3
                      style={{
                        margin: "16px 0 0",
                        fontFamily: MINCHO,
                        fontSize: 19,
                        fontWeight: 700,
                        lineHeight: 1.6,
                        letterSpacing: "0.03em",
                        color: MAIN,
                        textAlign: "center",
                      }}
                    >
                      {nl(item.title)}
                    </h3>
                    <div
                      style={{ width: 42, height: 2, background: ACCENT, margin: "11px auto 0" }}
                    />
                    <p
                      style={{
                        margin: "13px 0 0",
                        fontFamily: SANS,
                        fontSize: 13,
                        lineHeight: 1.95,
                        color: INK,
                      }}
                    >
                      {item.body}
                    </p>
                    {item.note && (
                      <p
                        style={{
                          margin: "8px 0 0",
                          fontFamily: SANS,
                          fontSize: 11,
                          lineHeight: 1.75,
                          color: DIM,
                        }}
                      >
                        {item.note}
                      </p>
                    )}
                  </div>
                ))}
            </div>

            {/* AUN #17: 04・05は画像なし。2列でコンパクトにまとめる。 */}
            <div
              style={{
                marginTop: 20,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {c.reasons.items
                .filter((item) => !item.img)
                .map((item) => (
                  <div
                    key={item.num}
                    style={{
                      background: PALE,
                      borderRadius: 12,
                      padding: "16px 13px 15px",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        width: 30,
                        height: 30,
                        background: MAIN,
                        transform: "rotate(45deg)",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 3,
                      }}
                    >
                      <span
                        style={{
                          transform: "rotate(-45deg)",
                          fontFamily: GOTHIC,
                          fontSize: 11.5,
                          fontWeight: 800,
                          color: WHITE,
                        }}
                      >
                        {item.num}
                      </span>
                    </span>
                    <h3
                      style={{
                        margin: "11px 0 0",
                        fontFamily: MINCHO,
                        fontSize: 15,
                        fontWeight: 700,
                        lineHeight: 1.55,
                        letterSpacing: "0.02em",
                        color: MAIN,
                      }}
                    >
                      {nl(item.title)}
                    </h3>
                    <p
                      style={{
                        margin: "8px 0 0",
                        fontFamily: SANS,
                        fontSize: 11.5,
                        lineHeight: 1.75,
                        color: DIM,
                      }}
                    >
                      {item.body}
                    </p>
                  </div>
                ))}
            </div>

            <Cta trialNote />
          </section>

          {/* ── 10. 料金プラン（AUN #20 / #24 / #25） ─────────────── */}
          <section style={{ background: MAIN, padding: `32px ${PAD}px 36px` }}>
            <Heading text={c.plans.heading} size={30} color={WHITE} />
            <div
              style={{
                width: 48,
                height: 3,
                background: GOLD,
                margin: "12px auto 0",
                borderRadius: 2,
              }}
            />
            <p
              style={{
                margin: "14px 0 0",
                fontFamily: GOTHIC,
                fontSize: 15,
                fontWeight: 700,
                lineHeight: 1.7,
                color: WHITE,
                textAlign: "center",
              }}
            >
              {c.plans.lead}
            </p>

            {/* AUN #25: 1回あたりの目安価格を大きく打ち出す見せ方 */}
            <div
              style={{
                marginTop: 18,
                background: WHITE,
                borderRadius: 14,
                padding: "18px 16px 20px",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, lineHeight: 1.1 }}>
                <span
                  style={{
                    fontFamily: GOTHIC,
                    fontSize: 15,
                    fontWeight: 800,
                    color: MAIN,
                  }}
                >
                  {c.plans.highlight.pre}
                </span>
                <span
                  style={{
                    fontFamily: GOTHIC,
                    fontSize: 46,
                    fontWeight: 800,
                    color: GOLD_DEEP,
                    letterSpacing: "0.01em",
                    padding: "0 2px",
                  }}
                >
                  {c.plans.highlight.amount}
                </span>
                <span
                  style={{
                    fontFamily: GOTHIC,
                    fontSize: 15,
                    fontWeight: 800,
                    color: MAIN,
                  }}
                >
                  円{c.plans.highlight.post.replace("円", "")}
                </span>
                <sup style={{ fontFamily: SANS, fontSize: 9, color: DIM }}>※1</sup>
              </p>
              <p
                style={{
                  margin: "10px 0 0",
                  fontFamily: MINCHO,
                  fontSize: 21,
                  fontWeight: 700,
                  lineHeight: 1.55,
                  letterSpacing: "0.03em",
                  color: MAIN,
                }}
              >
                {c.plans.highlight.lines[0]}
                <br />
                {c.plans.highlight.lines[1]}
              </p>

              <div
                style={{
                  marginTop: 16,
                  paddingTop: 16,
                  borderTop: `1px solid ${LINE}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  {[c.plans.cross.a, c.plans.cross.b].map((name, i) => (
                    <span key={name} style={{ display: "contents" }}>
                      {i > 0 && (
                        <span style={{ fontFamily: GOTHIC, fontSize: 13, color: DIM }}>×</span>
                      )}
                      <span
                        style={{
                          padding: "6px 13px",
                          borderRadius: 8,
                          background: MAIN,
                          color: WHITE,
                          fontFamily: GOTHIC,
                          fontSize: 13,
                          fontWeight: 800,
                        }}
                      >
                        {name}
                      </span>
                    </span>
                  ))}
                </div>
                <p
                  style={{
                    margin: "10px 0 0",
                    fontFamily: GOTHIC,
                    fontSize: 24,
                    fontWeight: 800,
                    color: GOLD_DEEP,
                    letterSpacing: "0.02em",
                  }}
                >
                  {c.plans.cross.title}
                </p>
                <p
                  style={{
                    margin: "6px 0 0",
                    fontFamily: GOTHIC,
                    fontSize: 14,
                    fontWeight: 700,
                    lineHeight: 1.6,
                    color: MAIN,
                  }}
                >
                  {c.plans.cross.lines[0]}
                  <br />
                  {c.plans.cross.lines[1]}
                </p>
              </div>
            </div>

            {/* AUN2 #13: 公式 studio.soelu.com/plans の3プラン構成で作り直し。
                390px幅では3列比較表が潰れるため、プランごとのカードを縦に積んでいる。 */}
            <div
              style={{
                marginTop: 16,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {c.plans.items.map((plan) => (
                <div
                  key={plan.name}
                  style={{
                    background: WHITE,
                    borderRadius: 12,
                    border: plan.badge ? `2px solid ${GOLD}` : `1px solid ${LINE}`,
                    padding: "14px 15px 15px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 10,
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                      <span
                        style={{
                          fontFamily: GOTHIC,
                          fontSize: 15,
                          fontWeight: 800,
                          color: MAIN,
                        }}
                      >
                        {plan.name}
                      </span>
                      {plan.badge && (
                        <span
                          style={{
                            flexShrink: 0,
                            background: CTA_GRAD,
                            color: WHITE,
                            borderRadius: 999,
                            padding: "3px 9px",
                            fontFamily: GOTHIC,
                            fontSize: 10,
                            fontWeight: 800,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {plan.badge}
                        </span>
                      )}
                    </span>
                    <span
                      style={{
                        flexShrink: 0,
                        fontFamily: MINCHO,
                        fontSize: 21,
                        fontWeight: 700,
                        color: GOLD_DEEP,
                      }}
                    >
                      {plan.price}
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      paddingTop: 10,
                      borderTop: `1px solid ${LINE}`,
                      display: "flex",
                      alignItems: "baseline",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        fontFamily: SANS,
                        fontSize: 10.5,
                        color: DIM,
                      }}
                    >
                      {c.plans.machineLabel}
                    </span>
                    <span
                      style={{
                        fontFamily: GOTHIC,
                        fontSize: 12.5,
                        fontWeight: 700,
                        lineHeight: 1.5,
                        color: MAIN,
                      }}
                    >
                      {plan.machine}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 全プラン共通 */}
            <div
              style={{
                marginTop: 12,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: 12,
                padding: "13px 15px 14px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: GOTHIC,
                  fontSize: 12.5,
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                  color: WHITE,
                }}
              >
                {c.plans.common.heading}
              </p>
              <div
                style={{
                  marginTop: 9,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 7,
                }}
              >
                {c.plans.common.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      background: "rgba(255,255,255,0.14)",
                      borderRadius: 999,
                      padding: "5px 11px",
                      fontFamily: GOTHIC,
                      fontSize: 11.5,
                      fontWeight: 700,
                      color: WHITE,
                    }}
                  >
                    <CheckIcon size={12} color="#BFE0F2" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* 初期費用 */}
            <div
              style={{
                marginTop: 12,
                background: WHITE,
                borderRadius: 12,
                padding: "13px 15px 15px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: GOTHIC,
                  fontSize: 12.5,
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                  color: MAIN,
                }}
              >
                {c.plans.initial.heading}
              </p>
              <div style={{ marginTop: 9, display: "flex", flexDirection: "column", gap: 6 }}>
                {c.plans.initial.rows.map((row) => (
                  <div
                    key={row.label}
                    style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}
                  >
                    <span style={{ fontFamily: SANS, fontSize: 12, color: INK }}>{row.label}</span>
                    <span style={{ fontFamily: GOTHIC, fontSize: 13.5, fontWeight: 700, color: INK }}>
                      {row.value}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    paddingTop: 8,
                    borderTop: `1px solid ${LINE}`,
                  }}
                >
                  <span style={{ fontFamily: GOTHIC, fontSize: 12.5, fontWeight: 800, color: MAIN }}>
                    {c.plans.initial.total.label}
                  </span>
                  <span
                    style={{
                      fontFamily: GOTHIC,
                      fontSize: 16,
                      fontWeight: 800,
                      color: DIM,
                      textDecoration: "line-through",
                      textDecorationThickness: 1.5,
                    }}
                  >
                    {c.plans.initial.total.value}
                  </span>
                </div>
              </div>
              <p
                style={{
                  margin: "11px 0 0",
                  background: CREAM,
                  border: `1px solid ${GOLD}`,
                  borderRadius: 8,
                  padding: "9px 10px",
                  fontFamily: GOTHIC,
                  fontSize: 14,
                  fontWeight: 800,
                  color: GOLD_DEEP,
                  textAlign: "center",
                }}
              >
                {c.plans.initial.campaign}
              </p>
            </div>

            <p
              style={{
                margin: "12px 0 0",
                fontFamily: SANS,
                fontSize: 11.5,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.86)",
                textAlign: "right",
              }}
            >
              {c.plans.taxNote}
            </p>

            <div style={{ marginTop: 10 }}>
              {c.plans.notes.map((note, i) => (
                <p
                  key={i}
                  style={{
                    margin: i === 0 ? 0 : "5px 0 0",
                    fontFamily: SANS,
                    fontSize: 10.5,
                    lineHeight: 1.8,
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  {note}
                </p>
              ))}
            </div>
          </section>

          {/* ── 11. 入会特典（AUN #21・CTAは置かない） ────────────── */}
          <section style={{ background: CREAM, padding: `32px ${PAD}px 36px` }}>
            <Heading text={c.benefits.heading} size={24} />

            <div
              style={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                gap: 11,
              }}
            >
              {c.benefits.monthly.map((row) => (
                <MoneyRow key={row.tag} {...row} round />
              ))}
            </div>

            <p
              style={{
                margin: "26px 0 0",
                fontFamily: MINCHO,
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: MAIN,
                textAlign: "center",
              }}
            >
              {c.benefits.subHeading}
            </p>

            <div
              style={{
                marginTop: 14,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {c.benefits.items.map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: WHITE,
                    border: `1px solid ${CREAM_LINE}`,
                    borderRadius: 12,
                    padding: "14px 16px",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontFamily: GOTHIC,
                      fontSize: 14.5,
                      fontWeight: 800,
                      color: GOLD_DEEP,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      margin: "5px 0 0",
                      fontFamily: SANS,
                      fontSize: 12.5,
                      lineHeight: 1.8,
                      color: INK,
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16 }}>
              {c.benefits.notes.map((note, i) => (
                <p
                  key={i}
                  style={{
                    margin: i === 0 ? 0 : "5px 0 0",
                    fontFamily: SANS,
                    fontSize: 10.5,
                    lineHeight: 1.8,
                    color: DIM,
                  }}
                >
                  {note}
                </p>
              ))}
            </div>
          </section>

          {/* ── 12. 設備のご案内（AUN #26 見出し削除 / #27 大きく） ── */}
          <section style={{ background: PALE, padding: `32px ${PAD}px 36px` }}>
            <Heading text={c.facility.heading} size={24} />
            <ImageSlot
              src={c.facility.img.src}
              placeholder={c.facility.img.placeholder}
              alt={c.facility.heading}
              radius={12}
              style={{ width: "100%", height: 190, marginTop: 18 }}
            />
            <p
              style={{
                margin: "16px 0 0",
                fontFamily: SANS,
                fontSize: 13,
                lineHeight: 1.95,
                color: INK,
              }}
            >
              {c.facility.body}
            </p>

            <div
              style={{
                marginTop: 18,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {c.facility.checks.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: WHITE,
                    border: `1px solid ${LINE}`,
                    borderRadius: 12,
                    padding: "15px 16px",
                    boxShadow: "0 2px 8px rgba(35,80,110,0.06)",
                  }}
                >
                  <CheckDot size={24} />
                  <span
                    style={{
                      fontFamily: GOTHIC,
                      fontSize: 14.5,
                      fontWeight: 700,
                      lineHeight: 1.55,
                      color: MAIN,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ── 13. 体験レッスンの流れ ＋ CTA③ ───────────────────── */}
          <section style={{ background: WHITE, padding: `32px ${PAD}px 36px` }}>
            <Heading text={c.flow.heading} size={24} />
            <div style={{ marginTop: 22, position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: 16,
                  top: 14,
                  bottom: 14,
                  width: 2,
                  background: LINE,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {c.flow.steps.map((step, i) => (
                  <div key={step.title} style={{ display: "flex", gap: 14, position: "relative" }}>
                    <span
                      style={{
                        flexShrink: 0,
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: MAIN,
                        color: WHITE,
                        fontFamily: GOTHIC,
                        fontSize: 15,
                        fontWeight: 800,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {i + 1}
                    </span>
                    <div style={{ flex: 1, minWidth: 0, paddingTop: 3 }}>
                      <p
                        style={{
                          margin: 0,
                          fontFamily: GOTHIC,
                          fontSize: 14.5,
                          fontWeight: 800,
                          color: MAIN,
                          letterSpacing: "0.03em",
                        }}
                      >
                        {step.title}
                      </p>
                      <p
                        style={{
                          margin: "4px 0 0",
                          fontFamily: SANS,
                          fontSize: 12.5,
                          lineHeight: 1.85,
                          color: DIM,
                        }}
                      >
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Cta trialNote />
          </section>

          {/* ── 14. 初めてでも大丈夫 ──────────────────────────────── */}
          <section style={{ background: PALE, padding: `32px ${PAD}px 36px` }}>
            <Heading text={c.beginner.heading} size={24} />
            <p
              style={{
                margin: "14px 0 0",
                fontFamily: SANS,
                fontSize: 13,
                lineHeight: 1.95,
                color: INK,
              }}
            >
              {c.beginner.body}
            </p>
            <div
              style={{
                marginTop: 18,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 9,
              }}
            >
              {c.beginner.checks.map((item, i) => (
                <div
                  key={item}
                  style={{
                    // 項目数が奇数のとき、最後の1枚が片側に取り残されて見えるので
                    // 2列ぶん使わせる（AUN3 #2 で1項目削除して5個になったため）。
                    gridColumn:
                      c.beginner.checks.length % 2 === 1 && i === c.beginner.checks.length - 1
                        ? "1 / -1"
                        : undefined,
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "11px",
                    background: WHITE,
                    borderRadius: 9,
                    boxShadow: "0 2px 8px rgba(35,80,110,0.06)",
                  }}
                >
                  <CheckIcon size={14} />
                  <span
                    style={{
                      fontFamily: GOTHIC,
                      fontSize: 12,
                      fontWeight: 700,
                      lineHeight: 1.45,
                      color: INK,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ── 15. 店舗情報 ──────────────────────────────────────── */}
          <section style={{ background: WHITE, padding: `32px ${PAD}px 36px` }}>
            <Heading text={c.access.heading} size={24} />
            <ImageSlot
              src={c.access.img.src}
              placeholder={c.access.img.placeholder}
              alt={c.access.name}
              radius={12}
              style={{ width: "100%", height: 190, marginTop: 18 }}
            />

            <p
              style={{
                margin: "16px 0 0",
                fontFamily: GOTHIC,
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: "0.03em",
                color: MAIN,
              }}
            >
              {c.access.name}
            </p>

            <dl style={{ margin: "12px 0 0", display: "flex", flexDirection: "column", gap: 9 }}>
              {[
                { k: "住所", v: [c.access.address] },
                { k: "営業時間", v: [c.access.hours] },
                { k: "定休日", v: [c.access.closed] },
                { k: "アクセス", v: c.access.routes },
              ].map((row) => (
                <div key={row.k} style={{ display: "flex", gap: 11 }}>
                  <dt
                    style={{
                      flexShrink: 0,
                      width: 58,
                      fontFamily: GOTHIC,
                      fontSize: 11.5,
                      fontWeight: 700,
                      color: MAIN,
                      paddingTop: 1,
                    }}
                  >
                    {row.k}
                  </dt>
                  <dd style={{ margin: 0, flex: 1, minWidth: 0 }}>
                    {row.v.map((line) => (
                      <p
                        key={line}
                        style={{
                          margin: 0,
                          fontFamily: SANS,
                          fontSize: 12.5,
                          lineHeight: 1.8,
                          color: INK,
                        }}
                      >
                        {line}
                      </p>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>

            <iframe
              src={c.access.mapEmbed}
              title={`${c.access.name}の地図`}
              loading="lazy"
              style={{
                width: "100%",
                height: 180,
                marginTop: 16,
                border: 0,
                borderRadius: 12,
                display: "block",
              }}
            />
            <a
              href={c.access.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                marginTop: 10,
                fontFamily: GOTHIC,
                fontSize: 12,
                fontWeight: 700,
                color: ACCENT,
                textAlign: "center",
                textDecoration: "underline",
              }}
            >
              Googleマップで見る
            </a>
          </section>

          {/* ── 16. FAQ ───────────────────────────────────────────── */}
          <section style={{ background: MAIN, padding: `32px ${PAD}px 36px` }}>
            <Heading text={c.faq.heading} size={24} color={WHITE} />
            <div style={{ marginTop: 20 }}>
              <FaqAccordion items={c.faq.items} accent={MAIN} />
            </div>
          </section>

          {/* ── 17. クロージング ＋ CTA④ ─────────────────────────── */}
          <section style={{ background: WHITE, padding: `36px ${PAD}px 40px` }}>
            <Heading text={c.closing.heading} size={23} />
            <p
              style={{
                margin: "14px 0 0",
                fontFamily: SANS,
                fontSize: 13.5,
                lineHeight: 1.95,
                color: INK,
                textAlign: "center",
              }}
            >
              {nl(c.closing.lead)}
            </p>

            <div
              style={{
                marginTop: 18,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {c.closing.chips.map((chip) => (
                <span
                  key={chip}
                  style={{
                    padding: "6px 13px",
                    borderRadius: 999,
                    background: CREAM,
                    border: `1px solid ${CREAM_LINE}`,
                    color: GOLD_DEEP,
                    fontFamily: GOTHIC,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.03em",
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>

            <div
              style={{
                marginTop: 20,
                padding: "20px 16px 22px",
                borderRadius: 16,
                background: PALE,
                border: `1px solid ${LINE}`,
                textAlign: "center",
              }}
            >
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
                    fontFamily: GOTHIC,
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: MAIN,
                    background: WHITE,
                    border: `1px solid ${LINE}`,
                    borderRadius: 6,
                    padding: "5px 11px",
                  }}
                >
                  {c.closing.label}
                </span>
                <span
                  style={{
                    fontFamily: GOTHIC,
                    fontSize: 17,
                    fontWeight: 500,
                    color: DIM,
                    textDecoration: "line-through",
                    textDecorationThickness: 1.5,
                  }}
                >
                  {c.closing.listPrice}
                </span>
              </div>
              <div style={{ fontSize: 19, color: ACCENT, lineHeight: 1, margin: "12px 0 6px" }}>
                ↓
              </div>
              <p
                style={{
                  margin: 0,
                  fontFamily: MINCHO,
                  fontSize: 58,
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "0.02em",
                  color: MAIN,
                }}
              >
                {c.closing.freeText}
              </p>
            </div>

            <Cta trialNote />
          </section>

          {/* ── フッター ──────────────────────────────────────────── */}
          <footer style={{ background: MAIN, padding: "20px 18px 26px", textAlign: "center" }}>
            <p
              style={{
                margin: 0,
                fontFamily: MINCHO,
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: WHITE,
              }}
            >
              {c.header.brand}
            </p>
            <p
              style={{
                margin: "6px 0 0",
                fontFamily: SANS,
                fontSize: 11,
                color: "rgba(255,255,255,0.72)",
              }}
            >
              {c.header.sub}
            </p>
          </footer>
        </LPCanvas>
      </div>

      {/* ── 18. 追従フッターCTA ─────────────────────────────────── */}
      <StickyFooterCTA
        href={CTA_URL}
        buttonText={c.sticky.buttonText}
        showAfter={560}
        buttonGradient={CTA_GRAD}
        shadowColor={CTA_SHADOW}
        borderColor="rgba(190,150,70,0.4)"
        offers={[
          <span
            key="label"
            style={{ fontFamily: GOTHIC, fontSize: 12.5, fontWeight: 700, color: MAIN }}
          >
            {c.sticky.label}
          </span>,
          <span
            key="value"
            style={{ fontFamily: GOTHIC, fontSize: 14, fontWeight: 800, color: GOLD_DEEP }}
          >
            {c.sticky.value}
          </span>,
        ]}
      />
    </LPShell>
  );
}
