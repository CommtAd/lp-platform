import type { CSSProperties, ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPCanvas from "@/components/LPCanvas";
import ImageSlot from "@/components/ImageSlot";
import StickyFooterCTA from "@/components/StickyFooterCTA";
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
        href={c.cta.url}
        target="_blank"
        rel="noopener noreferrer"
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
 * ご入会特典のブロック。FV直下・体験キャンペーン・クロージングの3箇所で使う。
 *
 * B案は箱を並べない方針だが、**ここだけは意図的に囲う**。オファーは本文と
 * 性質が違ううえ、顧客から「目立たせたい」指示があるため（2026-09-29）。
 * 罫だけだと本文に埋もれる。
 *
 * 見出しは必ず「ご入会特典」。初回体験0円のすぐ近くに出るので、
 * 「特典」とだけ書くと体験に付く特典と読めてしまう。
 *
 * `variant`:
 *   band … FV直下。キャンバス幅いっぱいの帯。
 *   inset … セクションの中。左右に余白がある前提の角丸ブロック。
 */
function BonusBlock({ variant = "inset" }: { variant?: "band" | "inset" }) {
  const band = variant === "band";
  return (
    <div
      style={{
        background: "#EEF5F9",
        border: band ? "none" : `1px solid rgba(60,126,166,0.30)`,
        borderTop: band ? `1px solid rgba(60,126,166,0.30)` : undefined,
        borderBottom: band ? `1px solid rgba(60,126,166,0.30)` : undefined,
        borderRadius: band ? 0 : 12,
        padding: band ? "20px 26px 21px" : "20px 14px 21px",
        marginTop: band ? 0 : 26,
      }}
    >
      <p
        style={{
          margin: 0,
          textAlign: "center",
          fontFamily: GOTHIC,
          fontSize: 12.5,
          fontWeight: 800,
          letterSpacing: "0.16em",
          color: ACCENT,
        }}
      >
        {c.bonus.label}
      </p>

      <div
        style={{
          margin: "14px auto 0",
          display: "flex",
          flexDirection: "column",
          gap: 9,
          width: "max-content",
          maxWidth: "100%",
        }}
      >
        {c.bonus.items.map((b) => (
          <span
            key={b.text}
            style={{
              display: "flex",
              alignItems: "center",
              // 幅が足りないときは**バッジだけ**を次の行へ送る。text 側を
              // `nowrap` にしないと、日本語はどこでも折れるので
              // 「…プレゼン/ト」のように語中で切れる。
              flexWrap: "wrap",
              gap: "4px 8px",
              fontFamily: GOTHIC,
              fontSize: 15.5,
              fontWeight: 800,
              letterSpacing: "0.01em",
              lineHeight: 1.45,
              color: HEAD,
            }}
          >
            <Check />
            <span style={{ whiteSpace: "nowrap" }}>{b.text}</span>
            {b.badge && (
              <span
                style={{
                  flex: "none",
                  padding: "3px 7px",
                  borderRadius: 3,
                  background: ACCENT,
                  fontFamily: GOTHIC,
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                  color: "#FFFFFF",
                  whiteSpace: "nowrap",
                }}
              >
                {b.badge}
              </span>
            )}
          </span>
        ))}
      </div>

      <p
        style={{
          margin: "13px 0 0",
          textAlign: "center",
          fontFamily: BODY,
          fontSize: 11,
          lineHeight: 1.7,
          color: INK_SOFT,
        }}
      >
        {c.bonus.note}
      </p>
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
          {/* ─ ①〜④ ヘッダー・オファーバー・特徴バー・FV ────────
              顧客支給の画像1枚に置き換え（2026-09-30 AUN #1）。
              **これにより背景動画とFV内のCTAが無くなっている。**
              予約導線は直下の体験レッスン画像（リンク付き）と追従CTAが担う。
              config の header / offerBar / featureBar / fv はデータを残してあるので、
              戻すときはここに元のブロックを書き戻す。 */}
          <FullBleed
            img={c.topImage.img}
            ratio="1027 / 1450"
            alt={c.topImage.imgAlt}
          />

          {/* ─ ④-b 体験レッスン ──────────────────────────
              顧客支給の画像に置き換え（2026-09-30 AUN #2、2026-10-01 差し替え）。
              差し替え後の画像には予約ボタンが描かれていないため、
              画像はリンクにせず、下に実体の <Cta> を置く。 */}
          <FullBleed img={c.trial.img} ratio="1061 / 1483" alt={c.trial.imgAlt} />
          <div style={{ background: "#EEF5F9", padding: "4px 24px 28px" }}>
            <Cta marginTop={0} />
          </div>

          {/* ─ ④-c アクセス図 ──────────────────────────────
              顧客支給（2026-09-30 AUN #4）。**下部にあった住所・営業時間の帯は
              誤記だったため切り落としてある**（詳細は config の `access`）。
              正確な位置と店舗情報は⑮のGoogleマップ埋め込みが担う。 */}
          <Section flush style={{ padding: "26px 0 0" }}>
            <FullBleed img={c.access.img} ratio="1857 / 847" alt={c.access.imgAlt} />
          </Section>

          {/* ─ ⑤ FV直下 ───────────────────────────────────
              見出し・本文・特徴アイコンまで顧客支給の画像に焼き込まれている
              （2026-09-30 AUN #3）。⑦お悩みと同じく、画像を全幅で出すだけ。
              比率は原寸（946x1663）と一致させてあるので切り取られない。 */}
          <Section flush style={{ padding: "0 0 0" }}>
            <FullBleed img={c.intro.img} ratio="946 / 1581" alt={c.intro.imgAlt} />
          </Section>

          {/* ─ ⑥ 体験キャンペーン（非表示）─────────────────
              顧客判断で削除（2026-09-30 AUN #5）。config の `campaign` は
              データごと残してあるので、戻すときはここに書き戻す。
              **このセクションにあったCTAとご入会特典ブロックも一緒に消えている。** */}

          {/* ─ ⑦ お悩み ─────────────────────────────────────
              見出しと悩み項目は顧客支給の画像に焼き込まれている（AUN #6）。
              そのためキッカー・見出し・リストは置かず、画像を全幅で出して
              締めの一文だけをLP側で持つ。画像の比率は原寸（1092x1440）と
              一致させてあるので、`cover` でも切り取られない。 */}
          <Section background={PALE} flush style={{ padding: "0 0 48px" }}>
            <FullBleed img={c.worry.img} ratio="1092 / 1440" alt={c.worry.imgAlt} />
            <p
              style={{
                margin: "46px 0 0",
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

          {/* ─ ⑧ STUDIO IVYなら（非表示）─────────────────────
              顧客判断で削除（2026-09-30 AUN #3）。config の `points` は
              データごと残してあるので、戻すときはここに書き戻す。 */}

          {/* ─ ⑨ 目指せる未来 ───────────────────────────────
              顧客支給の画像に置き換え（2026-09-30 AUN #4）。
              指示どおり本文の説明文は画像側から削り、見出しと
              アイコンのラベルだけ残してある。config の `future` は
              データごと残してあるが、描画には使っていない。 */}
          <Section flush style={{ padding: "0" }}>
            <FullBleed img={c.future.img} ratio="758 / 2003" alt={c.future.imgAlt} />
          </Section>

          {/* ─ ⑩ 選ばれる理由（CTA 3/5）─────────────────────
              本文は顧客判断で全削除（2026-09-30 AUN #18）。
              **CTAだけは残す。** ここを丸ごと消すと、ページ前半の導線が
              体験バナー画像の中のボタン1つだけになってしまう。
              config の `reasons` はデータごと残してある。 */}
          <Section flush style={{ padding: "40px 0 44px" }}>
            <div style={{ padding: `0 ${PAD}px` }}>
              <Cta marginTop={0} />
            </div>
          </Section>

          {/* ─ ⑪ 料金プラン ─────────────────────────────────
              顧客支給の画像に置き換え（2026-09-30 AUN #20）。
              **金額は画像に焼き込まれている**（月4回28,000円／月2回15,000円／
              月8回52,000円）。値上げやプラン変更のときは config を直すだけでは
              表示が変わらない。必ず画像を作り直すこと。 */}
          <Section flush background={PALE} style={{ padding: "0" }}>
            <FullBleed img={c.price.img} ratio="1024 / 1516" alt={c.price.imgAlt} />
          </Section>

          {/* ─ ⑫ グループレッスンとの違い（非表示）─────────────
              顧客判断で削除（2026-09-30 AUN #19）。config の `compare` は
              データごと残してあるので、戻すときはここに書き戻す。 */}

          {/* ─ ⑬ 体験レッスンの流れ（CTA 4/5）───────────────
              顧客支給の画像に置き換え（2026-09-30 AUN #21）。STEP 01〜05 の
              内容は画像に焼き込まれているので、`config.flow.steps` は
              データごと残してあるだけで描画には使っていない。
              **CTAは画像の外に残す**（ここがページ後半で唯一の導線）。 */}
          <Section flush background={PALE}>
            <FullBleed img={c.flow.img} ratio="1024 / 1536" alt={c.flow.imgAlt} />
            <div style={{ padding: `0 ${PAD}px` }}>
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
              顧客支給の画像に置き換え（2026-10-01）。見出し・チップ・0円・
              ご入会特典は画像に入っている（config の `closing` はデータだけ残置）。
              画像にボタンは無いので、下に実体の <Cta> を置く。 */}
          <div style={{ background: "#FFFFFF", paddingBottom: 48 }}>
            <FullBleed img={c.closingImage.img} ratio="1024 / 1640" alt={c.closingImage.imgAlt} />
            <div style={{ padding: "0 24px" }}>
              <Cta marginTop={8} />
            </div>
          </div>

          {/* ─ 予約フォーム（非表示）─────────────────────────
              ページ内フォームをやめ、CTAはすべて外部の予約システム
              （config の `cta.url`）へ送る（2026-09-29 顧客判断）。
              config の `form` はデータごと残してあるので、戻すときは
              ここにセクションを書き戻し、`check-rules.ts` の FORM_EXEMPT から
              `ivy-test` を外す。 */}

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
        href={c.cta.url}
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
