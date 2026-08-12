import LPShell from "@/components/LPShell";
import config from "./config";

/* SAKURA サンクスページ — ご予約完了後に体験当日入会特典クーポンをご案内。 */
const accent = "#C25C79";
const cream = "#FCFBF7";
const border = "rgba(70,72,60,0.12)";
const textDim = "#62655B";
const fontMincho = "'Shippori Mincho', serif";
const fontGothic = "'Zen Kaku Gothic New', sans-serif";
const fontSans = "'Noto Sans JP', sans-serif";
const ctaGrad = "linear-gradient(135deg, #EC8AA6 0%, #C24F71 100%)";

export default function ThanksPage() {
  const c = config;
  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div style={{ fontFamily: fontSans, background: "#E9DEDC", minHeight: "100vh", color: "#3B3D36" }}>
        <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", background: cream, display: "flex", flexDirection: "column" }}>
          {/* header */}
          <div style={{ display: "flex", alignItems: "center", padding: "14px 20px", background: "#FFFFFF", borderBottom: `1px solid ${border}` }}>
            <div style={{ lineHeight: 1.25 }}>
              <div style={{ fontFamily: fontGothic, fontSize: 15, fontWeight: 700, letterSpacing: "0.14em", color: "#3B3D36" }}>
                {c.header.brand}
              </div>
              <div style={{ fontSize: 9, letterSpacing: "0.14em", color: "#9A9C90" }}>{c.header.brandSub}</div>
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 26px 40px", textAlign: "center" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: ctaGrad,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                color: "#FFFFFF",
                boxShadow: "0 10px 26px rgba(194,79,113,0.32)",
              }}
            >
              ✓
            </div>
            <p style={{ fontFamily: fontMincho, fontSize: 22, fontWeight: 600, letterSpacing: "0.06em", margin: "24px 0 0", color: "#33352E" }}>
              ご予約ありがとうございます
            </p>
            <p style={{ fontSize: 13, lineHeight: 2, color: textDim, margin: "16px 0 0" }}>
              無料体験のお申し込みを受け付けました。
              <br />
              担当より順次ご連絡いたしますので、
              <br />
              今しばらくお待ちくださいませ。
            </p>

            {/* extra perks */}
            <div style={{ width: "100%", marginTop: 34, background: "#FBF1EE", borderRadius: 14, padding: "20px 22px", textAlign: "left" }}>
              <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.9, color: "#4C4E45" }}>
                <span style={{ color: accent, fontWeight: 700 }}>◎</span> 体験レッスンのウェア・パンツ・靴下は無料レンタル
                <br />
                <span style={{ color: accent, fontWeight: 700 }}>◎</span> ピラティスソックスのプレゼント特典もご用意（条件あり）
              </p>
            </div>

            <a
              href={`/${c.slug}`}
              style={{
                marginTop: 32,
                display: "inline-block",
                padding: "14px 32px",
                borderRadius: 999,
                border: `1.5px solid ${accent}`,
                color: accent,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.04em",
                textDecoration: "none",
              }}
            >
              トップページに戻る
            </a>
          </div>

          <footer style={{ padding: "18px 22px 24px", background: "#FFFFFF", borderTop: `1px solid ${border}`, textAlign: "center" }}>
            <p style={{ margin: 0, fontFamily: fontGothic, fontSize: 10.5, letterSpacing: "0.08em", color: textDim }}>
              © パーソナルマシンピラティス SAKURA 代々木上原店
            </p>
          </footer>
        </div>
      </div>
    </LPShell>
  );
}
