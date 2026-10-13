import LPShell from "@/components/LPShell";
import LPCanvas from "@/components/LPCanvas";
import config from "./config";

/* Pilates isM 麻布十番店 サンクスページ — 予約受付の完了と体験当日のご案内。 */
const MAIN = "#4A3F43";
const ROSE = "#9E5F5A";
const PALE = "#F8F1EF";
const DIM = "#6E6467";
const LINE = "#EDE3E1";
const CTA_GRAD = "linear-gradient(135deg, #C98F88 0%, #9E5F5A 100%)";
const fontMincho = "'Shippori Mincho', serif";
const fontSans = "'Noto Sans JP', sans-serif";

export default function ThanksPage() {
  const c = config;
  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div style={{ fontFamily: fontSans, background: "#EFE7E5", minHeight: "100vh", color: "#3A3335" }}>
        <LPCanvas background="#FFFFFF" style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", padding: "12px 18px", borderBottom: `1px solid ${LINE}` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.header.logo} alt={c.header.brand} style={{ display: "block", height: 26, width: "auto" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 26px 44px", textAlign: "center" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: CTA_GRAD,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                color: "#FFFFFF",
                boxShadow: "0 10px 26px rgba(158,95,90,0.32)",
              }}
            >
              ✓
            </div>
            <p style={{ fontFamily: fontMincho, fontSize: 22, fontWeight: 600, letterSpacing: "0.06em", margin: "24px 0 0", color: MAIN }}>
              ご予約ありがとうございます
            </p>
            <p style={{ fontSize: 13, lineHeight: 2, color: DIM, margin: "16px 0 0" }}>
              50分体験レッスンのお申し込みを受け付けました。
              <br />
              担当より順次ご連絡いたしますので、
              <br />
              今しばらくお待ちくださいませ。
            </p>

            <div style={{ width: "100%", marginTop: 32, background: PALE, borderRadius: 14, padding: "20px 22px", textAlign: "left" }}>
              <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.9, color: "#3A3335" }}>
                <span style={{ color: ROSE, fontWeight: 700 }}>◎</span> ウェア・タオルのレンタルがあるので手ぶらでOK
                <br />
                <span style={{ color: ROSE, fontWeight: 700 }}>◎</span> 体験当日のご入会で入会金50%OFF＋初月料金割引
              </p>
            </div>

            <a
              href={`/${c.slug}`}
              style={{
                marginTop: 32,
                display: "inline-block",
                padding: "14px 32px",
                borderRadius: 999,
                border: `1.5px solid ${ROSE}`,
                color: ROSE,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.04em",
                textDecoration: "none",
              }}
            >
              トップページに戻る
            </a>
          </div>

          <footer style={{ marginTop: "auto", padding: "18px 22px 24px", background: MAIN, textAlign: "center" }}>
            <p style={{ margin: 0, fontFamily: fontMincho, fontSize: 12, letterSpacing: "0.1em", color: "#FFFFFF" }}>© {c.header.brand}</p>
          </footer>
        </LPCanvas>
      </div>
    </LPShell>
  );
}
