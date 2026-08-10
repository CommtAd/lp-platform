import type { CSSProperties, ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPForm from "@/components/LPForm";
import StickyFooterCTA from "@/components/StickyFooterCTA";
import ImageSlot from "@/components/ImageSlot";
import FaqAccordion from "./FaqAccordion";
import config from "./config";

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

const ctaGradAngle = (cta: string) => `linear-gradient(135deg, ${cta} 0%, #FF8A50 100%)`;

/**
 * Pattern B — mobile-only single-column layout (matches pattern A's fixed
 * ~480px card convention). Desktop viewers just see the same mobile card
 * centered on a neutral background; there is no separate desktop layout.
 *
 * kaigyo-support は既存店舗オーナー向け「新規集客保証パック」LP。
 * config.ts でこのクライアント専用に拡張したセクション（audience / guarantee /
 * comparison / results / beforeAfter / industries）を追加で描画する。
 */
export default function Page() {
  const c = config;
  const vars = {
    "--navy": c.accent,
    "--cta": c.cta,
    "--blue": c.accent2,
    fontFamily: "'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif",
  } as CSSProperties;

  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div style={{ ...vars, background: "#EDF1F6", minHeight: "100vh" }} className="text-[var(--navy)]">
        <div
          className="mx-auto overflow-x-hidden bg-white"
          style={{ maxWidth: 480, boxShadow: "0 0 60px rgba(11,37,69,0.14)" }}
        >
          {/* ── header ── */}
          <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--navy)] text-sm font-bold text-white">
                {c.header.brand.slice(0, 1)}
              </span>
              <div className="leading-tight">
                <div className="text-[12.5px] font-bold tracking-wide">{c.header.brand}</div>
                <div className="text-[9.5px] text-slate-400">{c.header.brandSub}</div>
              </div>
            </div>
            <a
              href="#form"
              className="shrink-0 rounded-full bg-[var(--cta)] px-4 py-2.5 text-[12px] font-bold text-white shadow-[0_4px_14px_rgba(255,106,43,0.35)]"
            >
              {c.header.ctaText}
            </a>
          </header>

          {/* ── FV ── */}
          <section className="bg-[linear-gradient(160deg,var(--navy)_0%,#132C52_55%,#0A1E3B_100%)] px-5 py-12">
            <span className="text-[12px] font-bold tracking-wide text-white/60">{c.fv.eyebrow}</span>
            <h1 className="mt-2 text-[24px] font-bold leading-[1.5] text-white">
              {c.fv.heading.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-2 text-[14.5px] font-bold text-[var(--blue)]">{c.fv.tagline}</p>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--cta)]/15 px-4 py-2 text-[13.5px] font-bold leading-snug text-[var(--cta)]">
              {c.fv.highlight}
            </div>
            <p className="mt-4 text-[13px] leading-[1.85] text-white/75">{nl(c.fv.sub)}</p>
            <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[var(--blue)]/15 px-4 py-1.5 text-[11.5px] font-bold text-[var(--blue)]">
              ★ {c.fv.badge}
            </div>
            <a
              href="#form"
              className="mt-5 flex h-14 items-center justify-center gap-2 rounded-full text-[14.5px] font-bold text-white shadow-[0_10px_26px_rgba(255,106,43,0.45)]"
              style={{ background: ctaGradAngle(c.cta) }}
            >
              {c.fv.ctaText} <span>→</span>
            </a>
            <p className="mt-3 text-center text-[10.5px] text-white/50">{c.fv.trust.join("　｜　")}</p>
            <div className="mt-8">
              <ImageSlot
                src={c.fv.hero.src}
                placeholder={c.fv.hero.placeholder}
                objectPosition={c.fv.hero.position ?? "center"}
                radius={16}
                style={{ width: "100%", aspectRatio: "4 / 3" }}
              />
            </div>
          </section>

          {/* ── audience（対象者明記） ── */}
          <section className="bg-white px-5 py-11">
            <h2 className="text-[18.5px] font-bold leading-snug">{c.audience.heading}</h2>
            <div className="mt-5 flex flex-col gap-2.5">
              {c.audience.items.map((item) => (
                <div key={item} className="flex items-start gap-2.5 rounded-xl bg-slate-50 px-4 py-3">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                    style={{ background: c.cta }}
                  >
                    ✓
                  </span>
                  <span className="text-[13.5px] font-bold leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[11px] leading-[1.85] text-slate-400">{c.audience.note}</p>
          </section>

          {/* ── problem ── */}
          <section className="bg-slate-50 px-5 py-12">
            <span className="text-[11.5px] font-bold tracking-[0.15em] text-[var(--cta)]">
              {c.problem.eyebrow}
            </span>
            <h2 className="mt-2 text-[21px] font-bold leading-snug">{c.problem.heading}</h2>
            <p className="mt-4 text-[13px] leading-[1.85] text-slate-500">{nl(c.problem.lead)}</p>
            <div className="mt-7">
              <ImageSlot
                src={c.problem.persona.src}
                placeholder={c.problem.persona.placeholder}
                radius={16}
                style={{ width: "100%", aspectRatio: "16 / 10" }}
              />
            </div>
            <div className="mt-6 flex flex-col gap-3">
              {c.problem.tasks.map((t) => (
                <div key={t} className="flex items-start gap-2.5 rounded-xl bg-white px-4 py-3 shadow-[0_4px_14px_rgba(11,37,69,0.08)]">
                  <span className="mt-0.5 shrink-0 text-[13px] font-bold text-[var(--cta)]">×</span>
                  <span className="text-[12.5px] leading-relaxed text-slate-600">{t}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-[14.5px] font-bold leading-snug">{nl(c.problem.closingLine)}</p>
          </section>

          {/* ── solution ── */}
          <section className="bg-white px-5 py-12">
            <span className="text-[11.5px] font-bold tracking-[0.15em] text-[var(--blue)]">
              {c.solution.eyebrow}
            </span>
            <h2 className="mt-2 text-[21px] font-bold leading-snug">{nl(c.solution.heading)}</h2>
            <p className="mt-4 text-[13px] leading-[1.85] text-slate-500">{nl(c.solution.lead)}</p>
            <div className="mt-7 rounded-3xl bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {c.solution.steps.map((s) => (
                  <span
                    key={s}
                    className="flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-2xl bg-white px-2.5 text-[10px] font-bold text-[var(--navy)] shadow-[0_4px_14px_rgba(11,37,69,0.14)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-5 text-center text-xl leading-none text-[var(--blue)]">↓</div>
              <div className="mx-auto mt-3 flex h-14 w-full max-w-[220px] items-center justify-center rounded-2xl bg-[var(--navy)] px-4 text-center text-[12.5px] font-bold text-white shadow-[0_10px_24px_rgba(11,37,69,0.3)]">
                新規顧客獲得を実現
              </div>
            </div>
            <div className="mt-9 rounded-2xl bg-slate-50 p-5">
              <h3 className="text-[16px] font-bold leading-snug">{nl(c.solution.scopeHeading)}</h3>
              <p className="mt-3 text-[12.5px] leading-[1.9] text-slate-500">{nl(c.solution.scopeBody)}</p>
            </div>
          </section>

          {/* ── funnel（広告だけでは完結しない／集客導線） ── */}
          <section className="bg-[var(--navy)] px-5 py-12 text-white">
            <h2 className="text-[21px] font-bold leading-snug">{nl(c.funnel.heading)}</h2>
            <div className="mt-6 flex flex-col gap-2.5">
              {c.funnel.painPoints.map((p) => (
                <div key={p} className="flex items-start gap-2.5 rounded-xl bg-white/[0.06] px-4 py-3">
                  <span className="mt-0.5 shrink-0 text-[13px] font-bold text-[var(--cta)]">×</span>
                  <span className="text-[12.5px] leading-relaxed text-white/80">{p}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[14px] font-bold leading-snug text-[var(--blue)]">{nl(c.funnel.statement)}</p>
            <div className="mt-8 flex flex-col items-center gap-2">
              {c.funnel.steps.map((s, i) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <span className="flex h-12 w-full max-w-[240px] items-center justify-center rounded-2xl bg-white px-4 text-center text-[13px] font-bold text-[var(--navy)] shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
                    {s}
                  </span>
                  {i < c.funnel.steps.length - 1 && <span className="text-lg leading-none text-[var(--blue)]">↓</span>}
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-[13px] font-bold leading-snug text-white/80">{nl(c.funnel.caption)}</p>
          </section>

          {/* ── onestop（ワンストップ支援） ── */}
          <section className="bg-white px-5 py-12">
            <h2 className="text-center text-[21px] font-bold leading-snug">{nl(c.onestop.heading)}</h2>
            <div className="mt-7 flex flex-col gap-2.5">
              {c.onestop.items.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                    style={{ background: c.cta }}
                  >
                    ✓
                  </span>
                  <span className="text-[13px] font-bold">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[11px] leading-[1.85] text-slate-400">{c.onestop.note}</p>
          </section>

          {/* ── guarantee（成果保証訴求） ── */}
          <section className="bg-[var(--navy)] px-5 py-12 text-center text-white">
            <h2 className="text-[21px] font-bold leading-snug">{nl(c.guarantee.heading)}</h2>
            <div className="mx-auto mt-6 inline-block rounded-2xl bg-white/[0.08] px-6 py-5">
              <p className="text-[16px] font-bold leading-snug text-[var(--blue)]">{nl(c.guarantee.highlight)}</p>
            </div>
            <p className="mt-6 text-left text-[12.5px] leading-[1.9] text-white/75">{nl(c.guarantee.body)}</p>
            <p className="mt-5 text-left text-[10.5px] leading-[1.8] text-white/40">{c.guarantee.footnote}</p>
          </section>

          {/* ── comparison（一般的な広告運用との違い） ── */}
          <section className="bg-slate-50 px-5 py-12">
            <h2 className="text-center text-[21px] font-bold">{c.comparison.heading}</h2>
            <div className="mt-8 flex flex-col gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-[13.5px] font-bold text-slate-400">{c.comparison.general.label}</p>
                <div className="mt-3 flex flex-col gap-2.5">
                  {c.comparison.general.items.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-[12.5px] leading-relaxed text-slate-500">
                      <span className="shrink-0 font-bold text-slate-400">×</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center text-lg leading-none text-[var(--blue)]">↓</div>
              <div className="rounded-2xl p-5 text-white shadow-[0_14px_34px_rgba(11,37,69,0.2)]" style={{ background: c.accent }}>
                <p className="text-[13.5px] font-bold text-[var(--blue)]">{c.comparison.ours.label}</p>
                <div className="mt-3 flex flex-col gap-2.5">
                  {c.comparison.ours.items.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-[12.5px] font-bold leading-relaxed">
                      <span className="shrink-0" style={{ color: c.cta }}>✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── benefits（支援内容） ── */}
          <section id="benefits" className="bg-white px-5 py-12">
            <div className="text-center">
              <h2 className="text-[21px] font-bold">{nl(c.benefits.heading)}</h2>
              <p className="mt-2 text-[13px] text-slate-500">{nl(c.benefits.lead)}</p>
            </div>
            <div className="mt-10 flex flex-col gap-12">
              {c.benefits.items.map((item) => (
                <div key={item.num}>
                  <div className="overflow-hidden rounded-2xl bg-slate-50 shadow-[0_14px_34px_rgba(11,37,69,0.12)]">
                    <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
                      <span className="h-2 w-2 rounded-full bg-slate-300" />
                      <span className="h-2 w-2 rounded-full bg-slate-300" />
                      <span className="h-2 w-2 rounded-full bg-slate-300" />
                    </div>
                    <ImageSlot
                      src={item.image.src}
                      placeholder={item.image.placeholder}
                      style={{ width: "100%", aspectRatio: "4 / 3" }}
                    />
                  </div>
                  <div className="mt-5">
                    <div className="flex items-center gap-3">
                      <span className="text-[12.5px] font-bold text-[var(--blue)]">{item.num}</span>
                      <span className="rounded-full bg-[var(--navy)]/[0.08] px-3 py-1 text-[10.5px] font-bold text-[var(--navy)]">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="mt-3 text-[17px] font-bold leading-snug">{nl(item.title)}</h3>
                    <p className="mt-3 text-[13px] leading-[1.85] text-slate-500">{nl(item.body)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── results（集客実績） ── */}
          <section id="results" className="bg-slate-50 px-5 py-12">
            <h2 className="text-center text-[21px] font-bold leading-snug">{nl(c.results.heading)}</h2>
            <div className="mt-8 rounded-2xl bg-white p-6 text-center shadow-[0_14px_34px_rgba(11,37,69,0.1)]">
              <p className="text-[13px] font-bold text-slate-400">{c.results.headline.label}</p>
              <div className="mt-4 flex items-center justify-center gap-4">
                <div>
                  <p className="text-[10.5px] text-slate-400">導入前</p>
                  <p className="mt-1 text-[15px] font-bold text-slate-400">{c.results.headline.before}</p>
                </div>
                <span className="text-xl text-[var(--blue)]">→</span>
                <div>
                  <p className="text-[10.5px] font-bold text-[var(--cta)]">導入後</p>
                  <p className="mt-1 text-[19px] font-bold text-[var(--navy)]">{c.results.headline.after}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {c.results.stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-white p-4 text-center shadow-[0_6px_18px_rgba(11,37,69,0.08)]">
                  <p className="text-[10px] font-bold text-slate-400">{s.label}</p>
                  <p className="mt-2 text-[15px] font-bold text-[var(--navy)]">{s.value}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-[10.5px] text-slate-400">{c.results.disclaimer}</p>
          </section>

          {/* ── beforeAfter（ビフォーアフター） ── */}
          <section className="bg-white px-5 py-12">
            <h2 className="text-center text-[21px] font-bold leading-snug">{nl(c.beforeAfter.heading)}</h2>
            <div className="mt-8 flex flex-col gap-4">
              {c.beforeAfter.items.map((item) => (
                <div key={item.before} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                  <div className="flex-1 text-center">
                    <p className="text-[10px] font-bold text-slate-400">BEFORE</p>
                    <p className="mt-1.5 text-[12.5px] font-bold leading-snug text-slate-500">{item.before}</p>
                  </div>
                  <span className="shrink-0 text-lg text-[var(--blue)]">→</span>
                  <div className="flex-1 text-center">
                    <p className="text-[10px] font-bold text-[var(--cta)]">AFTER</p>
                    <p className="mt-1.5 text-[12.5px] font-bold leading-snug text-[var(--navy)]">{item.after}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── industries（対象業種） ── */}
          <section className="bg-slate-50 px-5 py-12">
            <h2 className="text-center text-[21px] font-bold">{c.industries.heading}</h2>
            <div className="mt-7 flex flex-wrap justify-center gap-2.5">
              {c.industries.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white px-4 py-2 text-[12px] font-bold text-[var(--navy)] shadow-[0_4px_14px_rgba(11,37,69,0.1)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* ── advantage（こんな方におすすめ） ── */}
          <section className="bg-[var(--navy)] px-5 py-12 text-white">
            <h2 className="text-center text-[21px] font-bold leading-snug">{c.advantage.heading}</h2>
            <div className="mt-9 flex flex-col gap-3">
              {c.advantage.items.map((a) => (
                <div key={a.title} className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-5 py-4">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
                    style={{ background: c.cta }}
                  >
                    ✓
                  </span>
                  <h3 className="text-[14px] font-bold leading-snug">{a.title}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* ── flow ── */}
          <section id="flow" className="bg-white px-5 py-12">
            <h2 className="text-center text-[21px] font-bold">{c.flow.heading}</h2>
            <p className="mt-2 text-center text-[13px] text-slate-500">{nl(c.flow.lead)}</p>
            <div className="mt-10 flex flex-col">
              {c.flow.steps.map((s, i) => {
                const last = i === c.flow.steps.length - 1;
                return (
                  <div key={s.num} className="flex gap-4">
                    <div className="flex flex-none flex-col items-center">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--navy)] text-[14px] font-bold text-white">
                        {s.num}
                      </span>
                      {!last && <span className="w-0.5 flex-1 bg-slate-200" />}
                    </div>
                    <div className={last ? "pb-0" : "pb-8"}>
                      <h3 className="text-[14px] font-bold">{s.title}</h3>
                      <p className="mt-2 text-[12px] leading-[1.85] text-slate-500">{s.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── faq ── */}
          <section id="faq" className="bg-slate-50 px-5 py-12">
            <h2 className="text-center text-[21px] font-bold">{c.faq.heading}</h2>
            <div className="mt-9">
              <FaqAccordion items={c.faq.items} accent={c.accent} cta={c.cta} />
            </div>
          </section>

          {/* ── closing ── */}
          <section className="relative overflow-hidden px-5 py-16 text-center text-white">
            <ImageSlot
              src={c.closing.photo.src}
              placeholder={c.closing.photo.placeholder}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(11,37,69,0.92),rgba(10,30,59,0.86))]" />
            <div className="relative">
              <h2 className="text-[21px] font-bold leading-snug">{nl(c.closing.heading)}</h2>
              <p className="mt-4 text-[13px] leading-[1.85] text-white/80">{nl(c.closing.body)}</p>
              <a
                href="#form"
                className="mt-7 inline-flex h-14 items-center justify-center gap-2 rounded-full px-7 text-[14.5px] font-bold text-white shadow-[0_10px_26px_rgba(255,106,43,0.45)]"
                style={{ background: ctaGradAngle(c.cta) }}
              >
                {c.closing.ctaText} <span>→</span>
              </a>
            </div>
          </section>

          {/* ── form ── */}
          <section id="form" className="bg-white px-5 py-12">
            <h2 className="text-center text-[20px] font-bold">{c.form.heading}</h2>
            <p className="mt-3 text-center text-[12.5px] leading-[1.85] text-slate-500">{nl(c.form.lead)}</p>
            <LPForm
              clientSlug={c.slug}
              accent={c.cta}
              fields={c.form.fields}
              submitLabel={c.form.submitLabel}
              errorMessage={c.form.errorMessage}
              disclaimer={nl(c.form.disclaimer)}
              thanksHref={`/${c.slug}/thanks`}
              submitStyle={{
                background: ctaGradAngle(c.cta),
                boxShadow: `0 10px 26px ${c.cta}66`,
              }}
            />
          </section>
        </div>
      </div>

      <StickyFooterCTA
        anchor={c.sticky.anchor}
        buttonText={c.sticky.buttonText}
        showAfter={c.sticky.showAfter}
        buttonGradient={ctaGradAngle(c.cta)}
        shadowColor={`${c.cta}66`}
        borderColor={`${c.cta}59`}
        offers={[
          <span key="offer" className="text-[13px] font-bold" style={{ color: c.accent }}>
            {c.sticky.offerText}
          </span>,
        ]}
      />
    </LPShell>
  );
}
