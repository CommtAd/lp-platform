import LPShell from "@/components/LPShell";
import config from "./config";

const pink = "#FF2E8B";
const purple = "#6C3FD1";
const ink = "#2D2145";
const bg = "#FFFFFF";
const textDim = "rgba(45,33,69,0.72)";
const headerGrad = `linear-gradient(90deg, #4B2A9E 0%, ${purple} 100%)`;
const fontGothic = "'Zen Kaku Gothic New', sans-serif";
const fontSans = "'Noto Sans JP', sans-serif";
const ctaGrad = `linear-gradient(90deg, #FF4A9E 0%, ${pink} 50%, #E0186F 100%)`;

export default function ThanksPage() {
  const c = config;
  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div style={{ fontFamily: fontSans, background: bg, minHeight: "100vh", color: ink }}>
        <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", padding: "14px 20px", background: headerGrad }}>
            {c.header.logo ? (
              <img src={c.header.logo} alt={c.header.logoAlt ?? c.header.brand} style={{ height: 40, width: "auto", display: "block" }} />
            ) : (
              <div style={{ fontFamily: fontGothic, fontSize: 14, fontWeight: 800, letterSpacing: "0.08em", color: "#FFFFFF" }}>{c.header.brand}</div>
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
                color: "#FFFFFF",
                boxShadow: `0 10px 26px rgba(255,46,139,0.32)`,
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
              ご登録いただいたメールアドレス宛にご予約完了メールを送信しましたのでご確認ください。
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
                color: pink,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.04em",
                textDecoration: "none",
              }}
            >
              トップページに戻る
            </a>
          </div>

          <footer style={{ padding: "18px 22px 22px", background: headerGrad, textAlign: "center" }}>
            <p style={{ margin: 0, fontFamily: fontGothic, fontSize: 10.5, letterSpacing: "0.08em", color: "rgba(255,255,255,0.75)" }}>{c.footer.copyright}</p>
          </footer>
        </div>
      </div>
    </LPShell>
  );
}
