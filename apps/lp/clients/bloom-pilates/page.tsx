import type { CSSProperties } from "react";
import LPShell from "@/components/LPShell";
import LPForm from "@/components/LPForm";
import FollowCTA from "./FollowCTA";
import config from "./config";

/** 縦積みの全幅画像（元LPの `<img class="w-full">` 相当）。 */
function FullImg({ src, alt = "" }: { src: string; alt?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} style={{ width: "100%", display: "block" }} />;
}

/** cp画像＋CTAボタン（元LP: 画像下部にボタンを重ねてフォームへ誘導）。 */
function CampaignBlock({ cp, btn }: { cp: string; btn: string }) {
  return (
    <div style={{ position: "relative" }}>
      <FullImg src={cp} />
      <a
        href="#contact"
        style={{
          position: "absolute",
          bottom: "1%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "95%",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={btn} alt="無料体験を予約する" style={{ width: "100%", display: "block" }} />
      </a>
    </div>
  );
}

/**
 * BLOOM PILATES（錦糸町）— 既存LPの忠実移植。
 * 成果が出ているため元LPの画像スタック構成をそのまま再現し、
 * 基盤要件（タグ注入・CV受信）を満たすため LPShell + LPForm でラップする。
 */
export default function Page() {
  const c = config;
  const img = c.images;

  const columnStyle: CSSProperties = {
    maxWidth: c.maxWidth,
    margin: "0 auto",
    background: "#ffffff",
    fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif",
    color: "#333",
  };

  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div style={{ background: "#ffffff" }}>
        <div style={columnStyle}>
          {/* ── ヘッダー（新ロゴ＋アクセスバッジ。元LP header.jpg をコードで再現）── */}
          <header
            style={{
              background: "#fdfbe4",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "12px 16px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.logo}
              alt="ritsu pilates"
              style={{ height: 52, width: "auto", display: "block" }}
            />
            <span
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                border: "1px solid #d9d6c8",
                background: "#ffffff",
                padding: "7px 13px",
                fontFamily: "'Shippori Mincho', 'YuMincho', 'Hiragino Mincho ProN', serif",
                color: "#3a3a3a",
                fontSize: 15,
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}
            >
              {c.stationBadge.pre}
              <span style={{ color: c.primary, fontWeight: 700, fontSize: 21, margin: "0 2px" }}>
                {c.stationBadge.num}
              </span>
              {c.stationBadge.post}
            </span>
          </header>

          {/* ── メインビジュアル ── */}
          <FullImg src={img.mv} />

          {/* ── キャンペーン（CTA付き）── */}
          <CampaignBlock cp={img.cp} btn={img.btn} />

          {/* ── 訴求画像スタック ── */}
          <FullImg src={img.about} />
          <FullImg src={img.problem} />
          <FullImg src={img.solution} />
          <FullImg src={img.feature} />
          <FullImg src={img.try} />

          {/* ── 体験の流れ（横スワイプ）── */}
          <div
            style={{
              padding: "40px 5%",
              backgroundImage: `url('${img.bgFlow}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.titleFlow}
              alt="体験の流れ"
              style={{ width: "90%", margin: "0 auto 24px", display: "block" }}
            />
            <div
              style={{
                display: "flex",
                gap: 12,
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {img.flow.map((src, i) => (
                <div
                  key={i}
                  style={{ flex: "0 0 100%", scrollSnapAlign: "center" }}
                >
                  <FullImg src={src} alt={`STEP ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* ── キャンペーン再掲（CTA付き）── */}
          <CampaignBlock cp={img.cp} btn={img.btn} />

          {/* ── アクセス（地図オーバーレイ）── */}
          <div style={{ position: "relative" }}>
            <FullImg src={img.access} alt="アクセス" />
            <div
              style={{
                position: "absolute",
                top: "42%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "90%",
              }}
            >
              <div style={{ width: "100%", aspectRatio: "16 / 9" }}>
                <iframe
                  title="BLOOM PILATES アクセスマップ"
                  src={c.mapEmbed}
                  style={{ width: "100%", height: "100%", border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* ── 予約フォーム ── */}
          <section id="contact" style={{ padding: "56px 5%", background: "#fefbe3" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.titleForm}
              alt="無料体験のご予約"
              style={{ width: "80%", margin: "0 auto", display: "block" }}
            />
            <LPForm
              clientSlug={c.slug}
              accent={c.primary}
              fields={c.form.fields}
              submitLabel={c.form.submitLabel}
              submitStyle={{
                background: c.primary,
                boxShadow: `0 10px 22px ${c.primary}66`,
                maxWidth: 240,
                margin: "0 auto",
              }}
            />
          </section>

          {/* ── フッター ── */}
          <footer
            style={{
              background: "#4d4848",
              color: "#fff",
              padding: "8px 0",
              fontSize: 12,
              textAlign: "center",
            }}
          >
            © ritsu pilates
          </footer>
        </div>
      </div>

      <FollowCTA src={img.btnFollow} anchor="#contact" />
    </LPShell>
  );
}
