import type { CSSProperties, ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPCanvas from "@/components/LPCanvas";
import StickyFooterCTA from "@/components/StickyFooterCTA";
import ImageSlot from "@/components/ImageSlot";
import LPForm from "@/components/LPForm";
import config from "./config";
import type { Perk, WorryIconKind } from "./config";

/**
 * Pilates SAKURA 新宿三丁目店 — 11/1 NEW OPEN 記念のMeta広告用・短尺LP。
 *
 * 指示書 §4 の3ブロックだけで構成する（スマホで2〜3スクロール）:
 *   ① FV（NEW OPEN・先着30名・3大特典・CTA）→ ② お悩み（こんな方におすすめ）→ ③ 最終CTA
 *   → ④ 予約フォーム（LPForm）＋ 追従フッターCTA（§5）
 *
 * 広告バナーとの一貫性が最優先（§3「印象が大きく変わらないように」）:
 *   - FVはMV写真（ロゴ帯の下に全幅）＋文字。文言・並び順はバナーのまま
 *   - 特典以降は淡いピンクの地に白いカード
 *   - 日付・数字・NEW OPEN は Playfair Display のイタリック、和文見出しは明朝
 *   - 特典は横並び3枚のカード。0円の「0」を最大の要素にする
 *   - アニメーション・装飾は入れない（§3）
 *
 * CTAはすべてページ下部の予約フォーム（#form）へスクロールする。CVは LPForm の送信。
 *
 * 幅は390px固定のキャンバス（LPCanvas）。vw/vh はキャンバス外の minHeight のみ（CLAUDE.md §16-17）。
 */

/* ── palette（バナーから採色） ─────────────────────────────── */
const BG = "#F3D3DD";
const PALE = "#FBEFF2";
const PALE2 = "#F8E5EB";
const LINE = "#EED6DE";
const GOLD_LINE = "#D8C09C";
const PINK = "#E58BA4";
const PINK_DEEP = "#C2557A";
const PINK_INK = "#A8416A";
const INK = "#2F2B2C";
const BODY = "#5E5659";
const MUTED = "#8E8286";
const BTN = "linear-gradient(135deg, #D4628A 0%, #A8416A 100%)";
const BTN_SHADOW = "0 10px 22px rgba(168,65,106,0.34)";
/** キャンバス地。バナー背景のにじんだピンクを放射グラデーションで再現する。 */
const BG_FILL = [
  "radial-gradient(circle at 12% 8%, rgba(255,255,255,0.55) 0, transparent 34%)",
  "radial-gradient(circle at 92% 30%, rgba(255,255,255,0.4) 0, transparent 30%)",
  "radial-gradient(circle at 8% 78%, rgba(255,255,255,0.35) 0, transparent 32%)",
  `linear-gradient(180deg, #F6DCE4 0%, ${BG} 55%, #EFC6D3 100%)`,
].join(", ");

const MINCHO = "'Shippori Mincho', 'Hiragino Mincho ProN', serif";
const GOTHIC = "'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif";
const SERIF_IT = "'Playfair Display', 'Times New Roman', serif";

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

/** 桜のマーク（ロゴの花）。 */
function SakuraMark({ size = 14, color = PINK }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse key={deg} cx="12" cy="6.4" rx="3.1" ry="5.1" transform={`rotate(${deg} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="1.7" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

/** 白いカード。FVと最終CTAで同じ器を使い、バナーと同じ見え方にする。 */
function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 14,
        padding: "28px 18px 26px",
        boxShadow: "0 10px 30px rgba(168,65,106,0.12)",
        textAlign: "center",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** 予約CTA。すべてページ下部の予約フォームへスクロールする。 */
function Cta({ top = 24 }: { top?: number }) {
  return (
    <div style={{ marginTop: top }}>
      <a
        href="#form"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          height: 66,
          background: BTN,
          color: "#FFFFFF",
          textDecoration: "none",
          fontSize: 19,
          fontWeight: 700,
          letterSpacing: "0.06em",
          borderRadius: 999,
          boxShadow: BTN_SHADOW,
        }}
      >
        {config.cta.text}
        <span
          style={{
            display: "inline-flex",
            width: 26,
            height: 26,
            borderRadius: 999,
            background: "rgba(255,255,255,0.26)",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
          }}
        >
          →
        </span>
      </a>
      <p style={{ margin: "10px 0 0", fontSize: 12, letterSpacing: "0.02em", color: MUTED }}>{config.cta.sub}</p>
    </div>
  );
}

function Notes() {
  return (
    <div style={{ marginTop: 16, textAlign: "left" }}>
      {config.notes.map((n) => (
        <p key={n} style={{ margin: "3px 0 0", fontSize: 11, lineHeight: 1.65, color: MUTED }}>
          {n}
        </p>
      ))}
    </div>
  );
}

/** ピラティスソックス（特典③）。バナーの写真の代わりに線画で描く（参照画像の素材は流用しない）。 */
function SockIcon() {
  return (
    <svg width="74" height="44" viewBox="0 0 74 44" fill="none" aria-hidden>
      {/* 左右のきらめき線 */}
      <g stroke={PINK_DEEP} strokeWidth="1.3" strokeLinecap="round">
        <path d="M3 14l8 3M2 22h9M3 30l8-3" />
        <path d="M71 14l-8 3M72 22h-9M71 30l-8-3" />
      </g>
      <path
        d="M22 6h12v15c0 2.5 2 4 4.5 4H49c4.5 0 7.5 3 7.5 6.5S53.5 38 49 38H31c-6 0-9-4-9-10V6z"
        fill="#F1B6C8"
        stroke={PINK_INK}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M22 10h12" stroke={PINK_INK} strokeWidth="1.2" />
      {/* 5本指 */}
      <path d="M48 25.2v12.6M51.5 25.8v11.8M54.5 27.6v8.6" stroke={PINK_INK} strokeWidth="1.1" />
      {/* 足裏の開き（ピラティスソックス特有の甲の開口） */}
      <ellipse cx="39" cy="31" rx="4.5" ry="3" fill="#FFFFFF" stroke={PINK_INK} strokeWidth="1.1" />
    </svg>
  );
}

/** 特典カード（横並び3枚の1枚）。 */
function PerkCard({ perk }: { perk: Perk }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        border: `1px solid ${GOLD_LINE}`,
        borderRadius: 6,
        background: `linear-gradient(160deg, #FFFFFF 0%, ${PALE} 60%, ${PALE2} 100%)`,
        padding: "10px 4px 10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.06em",
          color: "#FFFFFF",
          background: PINK_INK,
          borderRadius: 999,
          padding: "2px 10px",
        }}
      >
        {perk.no}
      </span>
      <div
        style={{
          marginTop: 7,
          minHeight: 38,
          display: "flex",
          alignItems: "center",
          fontFamily: MINCHO,
          fontSize: 14.5,
          fontWeight: 700,
          lineHeight: 1.3,
          color: INK,
        }}
      >
        <span>{nl(perk.label)}</span>
      </div>
      {perk.was ? (
        <>
          <div style={{ fontSize: 10.5, lineHeight: 1.35, color: BODY }}>
            通常価格
            <br />
            <span style={{ textDecoration: "line-through", textDecorationColor: PINK_INK }}>{perk.was}</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
              marginTop: 2,
              color: PINK_INK,
            }}
          >
            <span style={{ fontFamily: SERIF_IT, fontStyle: "italic", fontWeight: 700, fontSize: 58, lineHeight: 1 }}>
              {perk.now}
            </span>
            <span style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 22, marginLeft: 2 }}>円</span>
          </div>
        </>
      ) : (
        <>
          <div style={{ marginTop: 6 }}>
            <SockIcon />
          </div>
          <div
            style={{
              marginTop: 6,
              fontFamily: MINCHO,
              fontSize: 16.5,
              fontWeight: 700,
              letterSpacing: "0.02em",
              color: PINK_INK,
            }}
          >
            {perk.gift}
          </div>
        </>
      )}
    </div>
  );
}

/** お悩みの線画アイコン（バナー下部の円形アイコンの作法に揃える）。 */
function WorryIcon({ kind }: { kind: WorryIconKind }) {
  const paths: Record<WorryIconKind, ReactNode> = {
    posture: (
      <>
        <circle cx="17" cy="6" r="3" />
        <path d="M15.5 10c-4.5 3.5-5 8-1.5 11.5s3 6.5.5 9" />
        <path d="M24 9v21" strokeDasharray="2 2.4" />
      </>
    ),
    shape: (
      <>
        <path d="M11 3c0 7 3.5 9.5 3.5 13S11 22 11 29" />
        <path d="M21 3c0 7-3.5 9.5-3.5 13S21 22 21 29" />
        <path d="M3 16h5M6 13.5L8.5 16 6 18.5" />
        <path d="M29 16h-5M26 13.5L23.5 16 26 18.5" />
      </>
    ),
    swelling: (
      <>
        <path d="M9 3c.5 8-2.5 12-1.5 18l.5 6h7" />
        <path d="M16 3c0 7 2 12 .5 18" />
        <path d="M25 8c-2 3-3 4.6-3 6a3 3 0 0 0 6 0c0-1.4-1-3-3-6z" />
      </>
    ),
    inactive: <path d="M3 17h6l3-7 4 14 3-9 2 2h8" />,
    easy: (
      <>
        <path d="M16 29V15" />
        <path d="M16 18c0-6-5-9-10-9 0 5 4 9 10 9z" />
        <path d="M16 15c0-5 4-8 10-8 0 5-4 8-10 8z" />
      </>
    ),
  };
  return (
    <span
      style={{
        flex: "none",
        width: 50,
        height: 50,
        borderRadius: 999,
        border: `1px solid ${LINE}`,
        background: PALE,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        stroke={PINK_INK}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {paths[kind]}
      </svg>
    </span>
  );
}

export default function Page() {
  const c = config;
  const fv = c.fv;

  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div
        style={{
          fontFamily: GOTHIC,
          color: INK,
          background: "#EBD3DA",
          minHeight: "100vh",
          /* 長音符・小書き仮名が行頭に来ないよう禁則処理を厳密に。 */
          lineBreak: "strict",
        }}
      >
        <LPCanvas style={{ background: BG_FILL }} boxShadow="0 0 60px rgba(120,60,85,0.18)">
          {/* ── ① ファーストビュー（MV写真＋文字。文言・並びはバナーに揃える） ── */}
          <section style={{ background: "#FFFFFF" }}>
            {/* ロゴ帯。写真の上部に人物の顔が来るので、重ねずに写真の上へ置く。 */}
            <div style={{ padding: "16px 16px 14px", textAlign: "center" }}>
              <div
                style={{
                  display: "inline-block",
                  border: `1px solid ${INK}`,
                  borderRadius: 3,
                  padding: "4px 20px",
                  fontSize: 15,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                }}
              >
                {fv.access}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 10 }}>
                <SakuraMark size={28} color={PINK} />
                <span style={{ fontFamily: MINCHO, fontSize: 26, fontWeight: 700, letterSpacing: "0.14em" }}>
                  {fv.brand}
                </span>
              </div>
              <div style={{ marginTop: 6, fontSize: 14, fontWeight: 500, letterSpacing: "0.1em" }}>
                ✶ {fv.tagline} ✶
              </div>
            </div>

            {/* MV写真。下端の白グラデーションに「11月1日 NEW OPEN!」を重ねる。 */}
            <div style={{ position: "relative" }}>
              <ImageSlot
                src={fv.photo.src}
                placeholder={fv.photo.placeholder}
                alt={fv.photo.placeholder}
                objectPosition={fv.photo.position ?? "center"}
                style={{ width: "100%", aspectRatio: "390 / 470" }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: "42%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  paddingBottom: 6,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.82) 42%, #FFFFFF 78%)",
                }}
              >
                <div style={{ color: PINK_INK, fontWeight: 700, lineHeight: 1 }}>
                  <span style={{ fontFamily: SERIF_IT, fontStyle: "italic", fontSize: 50 }}>{fv.openDate.month}</span>
                  <span style={{ fontFamily: MINCHO, fontSize: 27 }}>月</span>
                  <span style={{ fontFamily: SERIF_IT, fontStyle: "italic", fontSize: 50, marginLeft: 2 }}>
                    {fv.openDate.day}
                  </span>
                  <span style={{ fontFamily: MINCHO, fontSize: 27 }}>日</span>
                </div>
                <div
                  style={{
                    marginTop: 2,
                    fontFamily: SERIF_IT,
                    fontStyle: "italic",
                    fontWeight: 700,
                    fontSize: 56,
                    lineHeight: 1.05,
                    letterSpacing: "-0.01em",
                    color: INK,
                  }}
                >
                  NEW OPEN!
                </div>
              </div>
            </div>

            <div style={{ padding: "8px 16px 26px", textAlign: "center" }}>
              {fv.status && (
                <div
                  style={{
                    display: "inline-block",
                    padding: "6px 16px",
                    borderRadius: 999,
                    background: PALE,
                    color: PINK_INK,
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: "0.03em",
                  }}
                >
                  {fv.status}
                </div>
              )}
              {/* マシンピラティスで 理想のカラダづくりを。 */}
              <div style={{ marginTop: 14, fontFamily: MINCHO, fontWeight: 700 }}>
                <div style={{ fontSize: 19, letterSpacing: "0.14em" }}>{fv.catch.pre}</div>
                <div style={{ marginTop: 2, fontSize: 30, letterSpacing: "0.04em", color: PINK_INK }}>
                  {fv.catch.emphasis}
                  <span style={{ fontSize: 20, color: INK }}>{fv.catch.post}</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── ①' OPEN記念の特典（バナーと同じ白カード） ── */}
          <section style={{ padding: "22px 14px 10px" }}>
            <Card style={{ paddingTop: 22 }}>

              {/* OPEN記念リボン */}
              <div
                style={{
                  width: 210,
                  margin: "0 auto",
                  padding: "8px 0",
                  background: PINK_INK,
                  color: "#FFFFFF",
                  fontSize: 19,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  clipPath: "polygon(0 0, 100% 0, 93% 50%, 100% 100%, 0 100%, 7% 50%)",
                }}
              >
                {fv.ribbon}
              </div>

              {/* ＼ 先着30名様限定 ／ */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "center",
                  gap: 5,
                  marginTop: 10,
                  fontFamily: MINCHO,
                  fontWeight: 700,
                  color: INK,
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ fontSize: 24, fontWeight: 500 }}>＼</span>
                <span style={{ fontSize: 30 }}>{fv.limit.pre}</span>
                <span
                  style={{
                    fontFamily: SERIF_IT,
                    fontStyle: "italic",
                    fontSize: 60,
                    lineHeight: 1,
                    color: PINK_INK,
                  }}
                >
                  {fv.limit.num}
                </span>
                <span style={{ fontSize: 30 }}>{fv.limit.post}</span>
                <span style={{ fontSize: 24, fontWeight: 500 }}>／</span>
              </div>
              <div style={{ marginTop: 4, fontFamily: MINCHO, fontWeight: 700, fontSize: 22, letterSpacing: "0.04em" }}>
                {fv.perksHeading.pre}
                <span style={{ fontSize: 29, color: PINK_INK }}>{fv.perksHeading.emphasis}</span>
              </div>

              {/* 3大特典（横並び） */}
              <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
                {c.perks.map((p) => (
                  <PerkCard key={p.no} perk={p} />
                ))}
              </div>

              <Cta />
              <Notes />
            </Card>
          </section>

          {/* ── ② こんなお悩みありませんか？ ── */}
          <section style={{ padding: "26px 14px 10px" }}>
            <Card style={{ padding: "30px 18px 28px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", color: PINK_DEEP }}>
                ＼ {c.worry.kicker} ／
              </div>
              <h2
                style={{
                  margin: "6px 0 0",
                  fontFamily: MINCHO,
                  fontSize: 27,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: INK,
                }}
              >
                {c.worry.heading}
              </h2>

              <ul style={{ listStyle: "none", margin: "20px 0 0", padding: 0, textAlign: "left" }}>
                {c.worry.items.map((it) => (
                  <li
                    key={it.strong}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "9px 4px",
                      borderBottom: `1px dashed ${LINE}`,
                    }}
                  >
                    <WorryIcon kind={it.icon} />
                    <span style={{ lineHeight: 1.4 }}>
                      {it.text && <span style={{ display: "block", fontSize: 13.5, color: BODY }}>{it.text}</span>}
                      <span style={{ fontSize: 17, fontWeight: 700, color: INK }}>{it.strong}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <ImageSlot
                src={c.worry.photo.src}
                placeholder={c.worry.photo.placeholder}
                alt={c.worry.photo.placeholder}
                objectPosition={c.worry.photo.position ?? "center"}
                radius={10}
                style={{ marginTop: 22, width: "100%", aspectRatio: "3 / 2" }}
              />

              <div style={{ marginTop: 18, fontFamily: MINCHO, fontWeight: 700 }}>
                <div style={{ fontSize: 16, letterSpacing: "0.06em", color: INK }}>{c.worry.closing.pre}</div>
                <div style={{ marginTop: 4, fontSize: 23, lineHeight: 1.55, color: PINK_INK }}>
                  {nl(c.worry.closing.strong)}
                </div>
              </div>
            </Card>
          </section>

          {/* ── ③ 最終CTA ── */}
          <section style={{ padding: "26px 14px 30px" }}>
            <Card>
              <div style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 20, letterSpacing: "0.04em" }}>
                ＼ <span style={{ fontFamily: SERIF_IT, fontStyle: "italic", color: PINK_INK, fontSize: 26 }}>11</span>月
                <span style={{ fontFamily: SERIF_IT, fontStyle: "italic", color: PINK_INK, fontSize: 26 }}>1</span>日{" "}
                <span style={{ fontFamily: SERIF_IT, fontStyle: "italic" }}>NEW OPEN!</span> ／
              </div>
              <div
                style={{
                  display: "inline-block",
                  marginTop: 12,
                  padding: "6px 18px",
                  background: PINK_INK,
                  color: "#FFFFFF",
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  borderRadius: 3,
                }}
              >
                {c.closing.limit}
              </div>
              <h2
                style={{
                  margin: "12px 0 0",
                  fontFamily: MINCHO,
                  fontSize: 29,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: INK,
                }}
              >
                今なら<span style={{ color: PINK_INK }}>豪華3大特典！</span>
              </h2>

              <div
                style={{
                  marginTop: 16,
                  border: `1px solid ${GOLD_LINE}`,
                  borderRadius: 8,
                  background: `linear-gradient(160deg, #FFFFFF 0%, ${PALE} 100%)`,
                  padding: "6px 16px",
                }}
              >
                {c.closing.rows.map((r, i) => (
                  <div
                    key={r.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 10,
                      padding: "8px 0",
                      borderTop: i === 0 ? "none" : `1px dashed ${LINE}`,
                    }}
                  >
                    <span style={{ fontFamily: MINCHO, fontSize: 17, fontWeight: 700, color: INK }}>{r.label}</span>
                    <span style={{ display: "flex", alignItems: "baseline", color: PINK_INK, fontWeight: 700 }}>
                      {r.unit ? (
                        <>
                          <span style={{ fontFamily: SERIF_IT, fontStyle: "italic", fontSize: 44, lineHeight: 1 }}>
                            {r.value}
                          </span>
                          <span style={{ fontFamily: MINCHO, fontSize: 19, marginLeft: 2 }}>{r.unit}</span>
                        </>
                      ) : (
                        <span style={{ fontFamily: MINCHO, fontSize: 21, lineHeight: "44px" }}>{r.value}</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 18, fontFamily: MINCHO, fontSize: 19, fontWeight: 700, color: INK }}>
                {c.closing.push}
              </div>
              <Cta top={14} />
              <Notes />
            </Card>
          </section>

          {/* ── 店舗情報（フォームの直前。OPEN前で店舗写真が無いので地図で場所を見せる） ── */}
          <section style={{ padding: "0 14px 26px" }}>
            <Card style={{ padding: "28px 18px 22px" }}>
              <h2
                style={{
                  margin: 0,
                  fontFamily: MINCHO,
                  fontSize: 25,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: INK,
                }}
              >
                {c.store.heading}
              </h2>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 10 }}>
                <SakuraMark size={16} color={PINK} />
                <span style={{ fontSize: 15, fontWeight: 700, color: PINK_INK }}>{c.store.name}</span>
              </div>
              <dl style={{ margin: "16px 0 0", textAlign: "left", borderTop: `1px solid ${LINE}` }}>
                {c.store.rows.map((r) => (
                  <div
                    key={r.label}
                    style={{ display: "flex", gap: 12, padding: "11px 2px", borderBottom: `1px solid ${LINE}` }}
                  >
                    <dt style={{ flex: "none", width: 64, fontSize: 13, fontWeight: 700, color: PINK_INK }}>
                      {r.label}
                    </dt>
                    <dd style={{ margin: 0, fontSize: 13.5, lineHeight: 1.7, color: INK }}>{nl(r.value)}</dd>
                  </div>
                ))}
              </dl>
              <iframe
                title={`${c.store.name}の地図`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(c.store.mapQuery)}&z=17&output=embed`}
                loading="lazy"
                style={{ display: "block", width: "100%", height: 220, marginTop: 16, border: 0, borderRadius: 10 }}
              />
            </Card>
          </section>

          {/* ── ④ 予約フォーム ── */}
          <section id="form" style={{ padding: "0 14px 30px", scrollMarginTop: 12 }}>
            <Card style={{ padding: "30px 20px 28px" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <SakuraMark size={20} color={PINK} />
              </div>
              <h2
                style={{
                  margin: "8px 0 0",
                  fontFamily: MINCHO,
                  fontSize: 26,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: INK,
                }}
              >
                {c.form.heading}
              </h2>
              <p style={{ margin: "10px 0 0", fontSize: 14, lineHeight: 1.8, color: BODY }}>{nl(c.form.lead)}</p>
              <div style={{ marginTop: 18, textAlign: "left" }}>
                <LPForm
                  clientSlug={c.slug}
                  accent={PINK_INK}
                  fields={c.form.fields}
                  submitLabel={c.form.submitLabel}
                  submitStyle={{ background: BTN, boxShadow: BTN_SHADOW, borderRadius: 999 }}
                  microcopy={<span style={{ color: PINK_INK }}>{c.form.microcopy}</span>}
                  disclaimer={nl(c.form.disclaimer)}
                  errorMessage={c.form.errorMessage}
                  thanks={
                    <div style={{ textAlign: "center", padding: "12px 0" }}>
                      <SakuraMark size={30} color={PINK} />
                      <div
                        style={{ marginTop: 10, fontFamily: MINCHO, fontSize: 21, fontWeight: 700, color: PINK_INK }}
                      >
                        {c.form.thanks.heading}
                      </div>
                      <p style={{ margin: "12px 0 0", fontSize: 14, lineHeight: 1.85, color: BODY }}>
                        {nl(c.form.thanks.body)}
                      </p>
                    </div>
                  }
                />
              </div>
            </Card>
          </section>

          <footer style={{ padding: "4px 20px 30px", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
              <SakuraMark size={18} />
              <span style={{ fontFamily: MINCHO, fontSize: 18, fontWeight: 700, letterSpacing: "0.16em" }}>
                {c.fv.brand}
              </span>
            </div>
            <p style={{ margin: "6px 0 0", fontSize: 12, color: BODY }}>
              {c.store.name}｜{c.store.access}
            </p>
            <p style={{ margin: "10px 0 0", fontSize: 11, color: BODY }}>© {new Date().getFullYear()} SAKURA</p>
          </footer>
        </LPCanvas>
      </div>

      <StickyFooterCTA
        anchor="#form"
        buttonText={c.cta.text}
        showAfter={700}
        buttonGradient={BTN}
        shadowColor="rgba(168,65,106,0.4)"
        borderColor="rgba(229,139,164,0.45)"
        note={<span style={{ fontSize: 12.5, fontWeight: 700, color: PINK_INK }}>{c.sticky.note}</span>}
        offers={c.sticky.offers.map((o) => (
          <span key={o} style={{ fontSize: 13.5, fontWeight: 700, color: INK }}>
            {o}
          </span>
        ))}
      />
    </LPShell>
  );
}
