import type { CSSProperties, ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPCanvas from "@/components/LPCanvas";
import StickyFooterCTA from "@/components/StickyFooterCTA";
import ImageSlot from "@/components/ImageSlot";
import SimulationSection from "./SimulationSection";
import config from "./config";

/**
 * コミットアドforピラティス — 集客シミュレーションLP。
 *
 * 参照元（旧 pilates.commitad.com/lp/simulation/）は
 * 「MV → 訴求 → フォーム → フッター」だけの極端に短いLPで、訴求は全て
 * 画像に焼き込まれている。Meta広告からの流入をフォームまで最短で運ぶための
 * 作りなので、このLPも同じ短さに合わせている。
 *
 * ブロックは5つだけ。**ここに節を足さないこと。**
 *   FV → なぜ件数が分かるのか → 予約までの流れ → シミュレーション → FAQ2問
 *
 * 見た目の作法（参照元から継承）:
 *   1. 地は生成り #F9F8F7、カードは白
 *   2. 見出しは明朝・中央寄せ・下に細い罫
 *   3. パープル #C88DC2 の帯で白カードを包む
 *   4. CTAは緑 #39BA36
 */

const CREAM = "#F9F8F7";
const PURPLE = "#C88DC2";
const PURPLE_TINT = "#F6ECF4";
const PLUM = "#4A2F47";
const LINE = "#E5E7EB";
const BODY = "#5C545A";

const MINCHO = "'Shippori Mincho', 'Hiragino Mincho ProN', serif";

/** 明朝・中央寄せ・下に細い罫の見出し。参照元の `after:w-28 after:h-px` を踏襲。 */
function Heading({ children }: { children: ReactNode }) {
  return (
    <h2
      className="relative pb-5 text-center text-[21px] leading-[1.55] font-semibold"
      style={{ fontFamily: MINCHO, color: PLUM }}
    >
      {children}
      <span
        className="absolute bottom-0 left-1/2 block h-px w-24 -translate-x-1/2"
        style={{ background: PURPLE }}
        aria-hidden
      />
    </h2>
  );
}

export default function Page() {
  const c = config;
  const vars = {
    fontFamily: "'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif",
    color: "#3A3339",
  } as CSSProperties;

  const greenStyle: CSSProperties = {
    background: c.cta,
    boxShadow: `0 8px 20px ${c.cta}59`,
  };

  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div style={{ ...vars, background: "#EFE9EE", minHeight: "100vh" }}>
        <LPCanvas style={{ background: CREAM }} boxShadow="0 0 60px rgba(74,47,71,0.16)">
          {/* ── header ── */}
          <header
            className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b bg-white/95 px-5 py-3.5 backdrop-blur"
            style={{ borderColor: LINE }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
                style={{ background: PURPLE }}
              >
                {c.header.brand.slice(0, 1)}
              </span>
              <div className="leading-tight">
                <div className="text-[12.5px] font-bold" style={{ color: PLUM }}>
                  {c.header.brand}
                </div>
                <div className="text-[9.5px]" style={{ color: "#9A9398" }}>
                  {c.header.brandSub}
                </div>
              </div>
            </div>
            <a
              href="#form"
              className="shrink-0 rounded-full px-4 py-2.5 text-[12px] font-bold text-white"
              style={greenStyle}
            >
              {c.header.ctaText}
            </a>
          </header>

          {/* ── 1. FV ──
              MV画像に ロゴ・バッジ・見出し・リード が焼き込まれているので、
              HTML側では一切重複させない（文言変更は画像の差し替えで行う）。
              CTAは参照元と同じく画像の上に重ねる。画像が390px幅で747pxあり、
              下に置くと初回表示に入らないため。 */}
          <section style={{ background: CREAM }}>
            <div className="relative">
              <ImageSlot
                src={c.fv.hero.src}
                placeholder={c.fv.hero.placeholder}
                objectPosition={c.fv.hero.position ?? "center"}
                alt="コミットアド for ピラティス｜完全成果保証型 ピラティス集客シミュレーション"
                style={{ width: "100%", aspectRatio: c.fv.hero.aspect }}
              />
              <a
                href="#form"
                className="absolute bottom-[13%] left-1/2 flex h-14 w-[86%] -translate-x-1/2 items-center justify-center gap-2 rounded-full text-[15px] font-bold text-white"
                style={greenStyle}
              >
                {c.fv.ctaText} <span>→</span>
              </a>
            </div>
            <div className="px-5 pt-6 pb-9 text-center">
              <div
                className="inline-block border-y px-6 py-1.5 text-[15px] font-bold tracking-[0.08em]"
                style={{ borderColor: PURPLE, color: PLUM, fontFamily: MINCHO }}
              >
                {c.fv.highlight}
              </div>
              <p className="mt-3 text-[10.5px]" style={{ color: "#9A9398" }}>
                {c.fv.trust.join("　｜　")}
              </p>
            </div>
          </section>

          {/* ── 2. なぜ件数が分かるのか ── */}
          <section className="bg-white px-5 py-11">
            <Heading>{c.reasons.heading}</Heading>
            <div className="mt-7 flex flex-col gap-3">
              {c.reasons.items.map((r, i) => (
                <div
                  key={r.title}
                  className="flex gap-3.5 rounded-xl px-4 py-4"
                  style={{ background: PURPLE_TINT }}
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                    style={{ background: PURPLE }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3
                      className="text-[15px] leading-[1.5] font-semibold"
                      style={{ fontFamily: MINCHO, color: PLUM }}
                    >
                      {r.title}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] leading-[1.9]" style={{ color: BODY }}>
                      {r.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 3. 予約までの流れ ── */}
          <section className="px-5 py-11" style={{ background: CREAM }}>
            <Heading>{c.steps.heading}</Heading>
            <div className="mt-7 flex flex-col gap-2.5">
              {c.steps.items.map((s) => (
                <div
                  key={s.num}
                  className="flex items-center gap-3.5 rounded-xl bg-white px-4 py-3.5"
                  style={{ border: `1px solid ${LINE}` }}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
                    style={{ background: PURPLE }}
                  >
                    {s.num}
                  </span>
                  <div>
                    <h3 className="text-[13.5px] font-bold" style={{ color: PLUM }}>
                      {s.title}
                    </h3>
                    <p className="text-[11.5px] leading-[1.8]" style={{ color: BODY }}>
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 4. シミュレーション ── */}
          <section id="form" className="bg-white px-5 py-11">
            <SimulationSection
              clientSlug={c.slug}
              heading={c.form.heading}
              lead={c.form.lead}
              fields={c.form.fields}
              submitLabel={c.form.submitLabel}
              disclaimer={c.form.disclaimer}
              errorMessage={c.form.errorMessage}
              bandLabel={c.form.bandLabel}
            />
          </section>

          {/* ── 5. FAQ（2問だけ・アコーディオンにしない） ──
              アコーディオンは1問あたりの余白が大きく、2問で542pxを使っていた。
              このLPは短さが要件なので、開閉なしのQ&Aを直に並べる。 */}
          <section id="faq" className="px-5 py-11" style={{ background: CREAM }}>
            <Heading>{c.faq.heading}</Heading>
            <dl className="mt-7 flex flex-col gap-4">
              {c.faq.items.map((f) => (
                <div
                  key={f.q}
                  className="rounded-xl bg-white px-4 py-4"
                  style={{ border: `1px solid ${LINE}` }}
                >
                  <dt className="flex gap-2 text-[13px] font-bold" style={{ color: PLUM }}>
                    <span style={{ color: PURPLE }}>Q.</span>
                    {f.q}
                  </dt>
                  <dd className="mt-2 flex gap-2 text-[12px] leading-[1.9]" style={{ color: BODY }}>
                    <span className="font-bold" style={{ color: PURPLE }}>
                      A.
                    </span>
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <footer
            className="px-5 py-6 text-center text-[10px]"
            style={{ background: CREAM, color: "#9A9398", borderTop: `1px solid ${LINE}` }}
          >
            © {new Date().getFullYear()} rusk Inc.
          </footer>
        </LPCanvas>
      </div>

      <StickyFooterCTA
        anchor={c.sticky.anchor}
        buttonText={c.sticky.buttonText}
        showAfter={c.sticky.showAfter}
        buttonGradient={c.cta}
        shadowColor={`${c.cta}66`}
        borderColor={`${PURPLE}59`}
        offers={[
          <span key="offer" className="text-[13px] font-bold" style={{ color: PLUM }}>
            {c.sticky.offerText}
          </span>,
        ]}
      />
    </LPShell>
  );
}
