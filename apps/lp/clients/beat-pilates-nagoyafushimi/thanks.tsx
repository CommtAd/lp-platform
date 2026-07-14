import LPShell from "@/components/LPShell";
import config from "./config";

const pink = "#FF3D93";
const blue = "#3FA0FF";
const violet = "#8B5CF6";
const bg = "#0A0A10";
const border = "rgba(255,255,255,0.1)";
const textDim = "rgba(255,255,255,0.65)";
const fontGothic = "'Zen Kaku Gothic New', sans-serif";
const fontSans = "'Noto Sans JP', sans-serif";
const ctaGrad = `linear-gradient(90deg, ${pink} 0%, ${violet} 55%, ${blue} 100%)`;

export default function ThanksPage() {
  const c = config;
  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div style={{ fontFamily: fontSans, background: bg, minHeight: "100vh", color: "#FFFFFF" }}>
        <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", padding: "14px 20px", borderBottom: `1px solid ${border}` }}>
            {c.header.logo ? (
              <img src={c.header.logo} alt={c.header.logoAlt ?? c.header.brand} style={{ height: 40, width: "auto", display: "block" }} />
            ) : (
              <div style={{ fontFamily: fontGothic, fontSize: 14, fontWeight: 800, letterSpacing: "0.08em" }}>{c.header.brand}</div>
            )}
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 28px", textAlign: "center" }}>
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
                boxShadow: `0 10px 26px rgba(255,61,147,0.32)`,
              }}
            >
              ✓
            </div>
            <p style={{ fontFamily: fontGothic, fontSize: 20, fontWeight: 800, letterSpacing: "0.04em", margin: "24px 0 0" }}>
              ご予約ありがとうございます
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.9, color: textDim, margin: "16px 0 0" }}>
              お申し込みを受け付けました。
              <br />
              担当より24時間以内にご連絡いたします。
              <br />
              今しばらくお待ちくださいませ。
            </p>
            <a
              href={`/${c.slug}`}
              style={{
                marginTop: 32,
                display: "inline-block",
                padding: "14px 32px",
                borderRadius: 999,
                border: `1.5px solid ${pink}`,
                color: "#FFFFFF",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.04em",
                textDecoration: "none",
              }}
            >
              トップページに戻る
            </a>
          </div>

          <footer style={{ padding: "18px 22px 22px", borderTop: `1px solid ${border}`, textAlign: "center" }}>
            <p style={{ margin: 0, fontFamily: fontGothic, fontSize: 10.5, letterSpacing: "0.08em", color: textDim }}>{c.footer.copyright}</p>
          </footer>
        </div>
      </div>
    </LPShell>
  );
}
