import LPShell from "@/components/LPShell";
import LPCanvas from "@/components/LPCanvas";
import config from "./config";
import {
  BG_FILL,
  BODY,
  BTN,
  BTN_SHADOW,
  Card,
  GOTHIC,
  INK,
  LINE,
  MINCHO,
  MONTSERRAT_CSS,
  MUTED,
  PALE,
  PINK,
  PINK_DEEP,
  PINK_INK,
  SERIF_IT,
  SakuraMark,
  nl,
} from "./page";

/**
 * Pilates SAKURA 新宿三丁目店（OPEN記念・短尺LP）のサンクスページ。
 *
 * 予約フォーム（LPForm）の送信成功後に `thanksHref` でここへ遷移する。
 * CVイベントは送信時に LPForm が撃ち済みなので、このページでは何も撃たない。
 *
 * 版面・配色・書体はLP本体と揃える（同じ390pxキャンバス、部品は page.tsx から流用）。
 * 中身は「受付完了 → 次に何が起きるか → 確定した特典の再確認 → 店舗情報」だけの簡素な作り。
 */
export default function ThanksPage() {
  const c = config;
  const storeRows = c.store.rows.filter((r) => r.label !== "定休日");

  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <link rel="stylesheet" href={MONTSERRAT_CSS} precedence="default" />
      <div style={{ fontFamily: GOTHIC, color: INK, background: "#EBD3DA", minHeight: "100vh", lineBreak: "strict" }}>
        <LPCanvas style={{ background: BG_FILL }} boxShadow="0 0 60px rgba(120,60,85,0.18)">
          {/* ロゴ帯（LP本体のFV上部と同じ） */}
          <header style={{ background: "#FFFFFF", padding: "16px 16px 14px", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <SakuraMark size={26} color={PINK} />
              <span style={{ fontFamily: MINCHO, fontSize: 24, fontWeight: 700, letterSpacing: "0.14em" }}>
                {c.fv.brand}
              </span>
            </div>
            <div style={{ marginTop: 5, fontSize: 13, fontWeight: 500, letterSpacing: "0.1em" }}>
              ✶ {c.fv.tagline} ✶
            </div>
          </header>

          <main style={{ padding: "26px 14px 10px" }}>
            {/* 受付完了 */}
            <Card style={{ padding: "34px 20px 30px" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  margin: "0 auto",
                  borderRadius: "50%",
                  background: BTN,
                  boxShadow: BTN_SHADOW,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" aria-hidden>
                  <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div
                style={{
                  marginTop: 18,
                  fontFamily: SERIF_IT,
                  fontStyle: "italic",
                  fontWeight: 800,
                  fontSize: 15,
                  letterSpacing: "0.12em",
                  color: PINK_DEEP,
                }}
              >
                THANK YOU
              </div>
              <h1 style={{ margin: "6px 0 0", fontFamily: MINCHO, fontSize: 23, fontWeight: 700, letterSpacing: "0.04em" }}>
                {c.form.thanks.heading}
              </h1>
              <p style={{ margin: "14px 0 0", fontSize: 14, lineHeight: 1.9, color: BODY }}>{nl(c.form.thanks.body)}</p>
            </Card>

            {/* 確定した特典の再確認 */}
            <Card style={{ marginTop: 18, padding: "26px 18px 24px" }}>
              <div
                style={{
                  display: "inline-block",
                  background: PINK_INK,
                  color: "#FFFFFF",
                  borderRadius: 3,
                  padding: "5px 16px",
                  fontSize: 13.5,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                }}
              >
                {c.closing.limit}
              </div>
              <div style={{ marginTop: 12, fontFamily: MINCHO, fontSize: 21, fontWeight: 700 }}>
                体験当日に受けられる特典
              </div>
              <div
                style={{
                  marginTop: 16,
                  background: PALE,
                  border: `1px solid ${LINE}`,
                  borderRadius: 10,
                  padding: "4px 16px",
                  textAlign: "left",
                }}
              >
                {c.closing.rows.map((r, i) => (
                  <div
                    key={r.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 0",
                      borderTop: i ? `1px dashed ${LINE}` : "none",
                    }}
                  >
                    <span style={{ fontFamily: MINCHO, fontSize: 16, fontWeight: 700 }}>{r.label}</span>
                    <span style={{ display: "flex", alignItems: "baseline", color: PINK_INK, fontWeight: 700 }}>
                      {r.unit ? (
                        <>
                          <span style={{ fontFamily: SERIF_IT, fontStyle: "italic", fontWeight: 800, fontSize: 32, lineHeight: 1 }}>
                            {r.value}
                          </span>
                          <span style={{ fontFamily: MINCHO, fontSize: 17, marginLeft: 2 }}>{r.unit}</span>
                        </>
                      ) : (
                        <span style={{ fontFamily: MINCHO, fontSize: 18 }}>{r.value}</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
              {c.notes.map((n) => (
                <p key={n} style={{ margin: "8px 0 0", fontSize: 11, lineHeight: 1.65, color: MUTED, textAlign: "left" }}>
                  {n}
                </p>
              ))}
            </Card>

            {/* 店舗情報 */}
            <Card style={{ marginTop: 18, padding: "24px 18px 22px", textAlign: "left" }}>
              <div style={{ textAlign: "center", fontFamily: MINCHO, fontSize: 21, fontWeight: 700 }}>
                {c.store.heading}
              </div>
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  fontSize: 14,
                  fontWeight: 700,
                  color: PINK_INK,
                }}
              >
                <SakuraMark size={14} color={PINK} />
                {c.store.name}
              </div>
              <dl style={{ margin: "14px 0 0" }}>
                {storeRows.map((r) => (
                  <div
                    key={r.label}
                    style={{ display: "flex", gap: 12, padding: "10px 0", borderTop: `1px solid ${LINE}`, fontSize: 13 }}
                  >
                    <dt style={{ width: 72, flexShrink: 0, fontWeight: 700, color: PINK_INK }}>{r.label}</dt>
                    <dd style={{ margin: 0, lineHeight: 1.7, color: INK }}>{nl(r.value)}</dd>
                  </div>
                ))}
              </dl>
            </Card>

            <div style={{ textAlign: "center", marginTop: 26 }}>
              <a
                href={`/${c.slug}`}
                style={{
                  display: "inline-block",
                  padding: "13px 34px",
                  borderRadius: 999,
                  border: `1.5px solid ${PINK_INK}`,
                  background: "#FFFFFF",
                  color: PINK_INK,
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                }}
              >
                トップページに戻る
              </a>
            </div>
          </main>

          <footer style={{ padding: "26px 20px 30px", textAlign: "center" }}>
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
    </LPShell>
  );
}
