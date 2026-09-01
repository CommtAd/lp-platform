import type { CSSProperties, ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPCanvas from "@/components/LPCanvas";
import StickyFooterCTA from "@/components/StickyFooterCTA";
import ImageSlot from "@/components/ImageSlot";
import FaqAccordion from "./FaqAccordion";
import SimulationSection from "./SimulationSection";
import config from "./config";

/**
 * コミットアドforピラティス — 集客シミュレーションLP。
 *
 * 構成は `_base-b`（パターンB）から引いているが、見た目は顧客の既存LP
 * （旧 pilates.commitad.com/lp/simulation/）の作法に寄せている。既存の
 * Meta広告クリエイティブと地続きに見せる必要があるため。
 *
 *   1. 地は生成り #F9F8F7、カードは白
 *   2. 見出しは明朝・中央寄せ・下に細い罫
 *   3. パープル #C88DC2 の帯で白カードを包む
 *   4. CTAは緑 #39BA36
 *
 * したがって page.tsx は `_base-b` とは意図的に差分がある（テンプレ側の
 * 構成変更を取り込むときは、この4点を壊さないこと）。
 */

/** Render "\n"-separated text as line breaks. */
function nl(text: string): ReactNode {
  const parts = text.split("\n");
  return parts.map((p, i) => (
    <span key={i}>
      {p}
      {i < parts.length - 1 && <br />}
    </span>
  ));
}

const CREAM = "#F9F8F7";
const PURPLE = "#C88DC2";
const PURPLE_TINT = "#F6ECF4";
const PLUM = "#4A2F47";
const LINE = "#E5E7EB";
const BODY = "#5C545A";

const MINCHO = "'Shippori Mincho', 'Hiragino Mincho ProN', serif";

/**
 * 明朝・中央寄せ・下に細い罫の見出し。既存LPの
 * `after:w-28 after:h-px after:bg-black` をそのまま踏襲している。
 */
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

/** 英字キッカー。セクションの頭に小さく置く。 */
function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="text-center text-[10.5px] font-bold tracking-[0.22em]" style={{ color: PURPLE }}>
      {children}
    </p>
  );
}

export default function Page() {
  const c = config;
  const vars = {
    fontFamily: "'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif",
    color: "#3A3339",
  } as CSSProperties;

  const greenCta =
    "flex h-14 items-center justify-center gap-2 rounded-full text-[15px] font-bold text-white";
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

          {/* ── FV ── */}
          <section className="px-5 pt-9 pb-11 text-center" style={{ background: CREAM }}>
            <span
              className="inline-block px-5 py-1.5 text-[13px] font-bold text-white"
              style={{ background: PURPLE }}
            >
              {c.fv.badge}
            </span>
            <h1
              className="mt-6 text-[27px] leading-[1.5] font-semibold"
              style={{ fontFamily: MINCHO, color: PLUM }}
            >
              {c.fv.heading.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-6 text-[13px] leading-[1.95]" style={{ color: BODY }}>
              {nl(c.fv.sub)}
            </p>
            <div
              className="mt-7 inline-block border-y px-6 py-1.5 text-[15px] font-bold tracking-[0.08em]"
              style={{ borderColor: PURPLE, color: PLUM, fontFamily: MINCHO }}
            >
              {c.fv.highlight}
            </div>
            <div className="mt-7">
              <ImageSlot
                src={c.fv.hero.src}
                placeholder={c.fv.hero.placeholder}
                objectPosition={c.fv.hero.position ?? "center"}
                radius={14}
                style={{ width: "100%", aspectRatio: "4 / 3" }}
              />
            </div>
            <a href="#form" className={`mt-7 ${greenCta}`} style={greenStyle}>
              {c.fv.ctaText} <span>→</span>
            </a>
            <p className="mt-3 text-[10.5px]" style={{ color: "#9A9398" }}>
              {c.fv.trust.join("　｜　")}
            </p>
          </section>

          {/* ── problem ── */}
          <section className="bg-white px-5 py-12">
            <Kicker>{c.problem.eyebrow}</Kicker>
            <div className="mt-3">
              <Heading>{c.problem.heading}</Heading>
            </div>
            <p className="mt-6 text-center text-[13px] leading-[1.95]" style={{ color: BODY }}>
              {nl(c.problem.lead)}
            </p>
            <div className="relative mt-8">
              <ImageSlot
                src={c.problem.persona.src}
                placeholder={c.problem.persona.placeholder}
                radius={14}
                style={{ width: "100%", aspectRatio: "1 / 1" }}
              />
              <div className="pointer-events-none absolute inset-0">
                {c.problem.tasks.map((t, i) => {
                  const pos = [
                    "left-[3%] top-[8%] -rotate-6",
                    "right-[3%] top-[24%] rotate-3",
                    "left-[5%] bottom-[18%] rotate-2",
                    "right-[2%] bottom-[3%] -rotate-3",
                  ][i % 4];
                  return (
                    <span
                      key={t}
                      className={`absolute ${pos} whitespace-nowrap rounded-xl bg-white px-3 py-1.5 text-[11px] font-bold shadow-[0_8px_20px_rgba(74,47,71,0.16)]`}
                      style={{ color: PLUM }}
                    >
                      {t}
                    </span>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── solution ── */}
          <section className="px-5 py-12" style={{ background: CREAM }}>
            <Kicker>{c.solution.eyebrow}</Kicker>
            <div className="mt-3">
              <Heading>{nl(c.solution.heading)}</Heading>
            </div>
            <p className="mt-6 text-center text-[13px] leading-[1.95]" style={{ color: BODY }}>
              {nl(c.solution.lead)}
            </p>
            <div className="mt-8 rounded-2xl bg-white p-4" style={{ border: `1px solid ${LINE}` }}>
              <div className="flex items-center justify-center gap-1">
                {c.solution.steps.map((s, i) => (
                  <span key={s} className="flex items-center gap-1">
                    <span
                      className="flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-xl px-2.5 text-[10px] font-bold"
                      style={{ background: PURPLE_TINT, color: PLUM }}
                    >
                      {s}
                    </span>
                    {i < c.solution.steps.length - 1 && (
                      <span className="shrink-0 text-xs" style={{ color: PURPLE }}>
                        →
                      </span>
                    )}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-center text-xl leading-none" style={{ color: PURPLE }}>
                ↓
              </div>
              <div
                className="mx-auto mt-3 flex h-14 w-full max-w-[220px] items-center justify-center rounded-xl px-4 text-center text-[13px] font-bold text-white"
                style={{ background: PURPLE }}
              >
                まとめてお任せください
              </div>
            </div>
          </section>

          {/* ── benefits ── */}
          <section id="benefits" className="bg-white px-5 py-12">
            <Heading>{c.benefits.heading}</Heading>
            <p className="mt-5 text-center text-[13px]" style={{ color: BODY }}>
              {nl(c.benefits.lead)}
            </p>
            <div className="mt-10 flex flex-col gap-11">
              {c.benefits.items.map((item) => (
                <div key={item.num}>
                  <ImageSlot
                    src={item.image.src}
                    placeholder={item.image.placeholder}
                    radius={14}
                    style={{ width: "100%", aspectRatio: "4 / 3" }}
                  />
                  <div className="mt-5">
                    <div className="flex items-center justify-center gap-2.5">
                      <span className="text-[12.5px] font-bold" style={{ color: PURPLE }}>
                        {item.num}
                      </span>
                      <span
                        className="rounded-full px-3 py-1 text-[10.5px] font-bold"
                        style={{ background: PURPLE_TINT, color: PLUM }}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <h3
                      className="mt-3.5 text-center text-[17px] leading-[1.55] font-semibold"
                      style={{ fontFamily: MINCHO, color: PLUM }}
                    >
                      {nl(item.title)}
                    </h3>
                    <p className="mt-3 text-[13px] leading-[1.95]" style={{ color: BODY }}>
                      {nl(item.body)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── advantage ── */}
          <section id="advantage" className="px-5 py-12" style={{ background: PURPLE_TINT }}>
            <Heading>{c.advantage.heading}</Heading>
            <div className="mt-9 flex flex-col gap-4">
              {c.advantage.items.map((a, i) => (
                <div key={a.title} className="rounded-2xl bg-white p-6">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-bold text-white"
                    style={{ background: PURPLE }}
                  >
                    {i + 1}
                  </span>
                  <h3
                    className="mt-4 text-[16px] leading-[1.5] font-semibold"
                    style={{ fontFamily: MINCHO, color: PLUM }}
                  >
                    {a.title}
                  </h3>
                  <p className="mt-2.5 text-[12.5px] leading-[1.95]" style={{ color: BODY }}>
                    {a.body}
                  </p>
                  {a.stat && (
                    <p className="mt-3 text-[12px] font-bold" style={{ color: PURPLE }}>
                      {a.stat}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── flow ── */}
          <section id="flow" className="bg-white px-5 py-12">
            <Heading>{c.flow.heading}</Heading>
            <p className="mt-5 text-center text-[13px] leading-[1.95]" style={{ color: BODY }}>
              {nl(c.flow.lead)}
            </p>
            <div className="mt-9 flex flex-col">
              {c.flow.steps.map((s, i) => {
                const last = i === c.flow.steps.length - 1;
                return (
                  <div key={s.num} className="flex gap-4">
                    <div className="flex flex-none flex-col items-center">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-bold text-white"
                        style={{ background: PURPLE }}
                      >
                        {s.num}
                      </span>
                      {!last && <span className="w-px flex-1" style={{ background: "#E4DCE3" }} />}
                    </div>
                    <div className={last ? "pb-0" : "pb-8"}>
                      <h3 className="text-[14.5px] font-bold" style={{ color: PLUM }}>
                        {s.title}
                      </h3>
                      <p className="mt-2 text-[12.5px] leading-[1.95]" style={{ color: BODY }}>
                        {s.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── faq ── */}
          <section id="faq" className="px-5 py-12" style={{ background: CREAM }}>
            <Heading>{c.faq.heading}</Heading>
            <div className="mt-8">
              <FaqAccordion items={c.faq.items} accent={PLUM} cta={PURPLE} />
            </div>
          </section>

          {/* ── closing ──
              パープル地の文字はプラムで置く。白抜きだと 2.6:1 しか出ず、
              13px の本文には読みにくい（帯やバッジのような短い大文字は白抜きのままでよい）。 */}
          <section className="px-5 py-14 text-center" style={{ background: PURPLE }}>
            <h2
              className="text-[21px] leading-[1.55] font-semibold"
              style={{ fontFamily: MINCHO, color: PLUM }}
            >
              {nl(c.closing.heading)}
            </h2>
            <p className="mt-5 text-[13px] leading-[1.95]" style={{ color: PLUM }}>
              {c.closing.body}
            </p>
            <a href="#form" className={`mt-7 ${greenCta}`} style={greenStyle}>
              {c.closing.ctaText} <span>→</span>
            </a>
          </section>

          {/* ── form（集客シミュレーション） ── */}
          <section id="form" className="px-5 py-12" style={{ background: CREAM }}>
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
