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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--blue)]/15 px-4 py-1.5 text-[11.5px] font-bold text-[var(--blue)]">
              ★ {c.fv.badge}
            </span>
            <h1 className="mt-5 text-[24px] font-bold leading-[1.5] text-white">
              {c.fv.heading.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-4 text-[13px] leading-[1.85] text-white/75">{nl(c.fv.sub)}</p>
            <a
              href="#form"
              className="mt-7 flex h-14 items-center justify-center gap-2 rounded-full text-[14.5px] font-bold text-white shadow-[0_10px_26px_rgba(255,106,43,0.45)]"
              style={{ background: ctaGradAngle(c.cta) }}
            >
              {c.fv.ctaText} <span>→</span>
            </a>
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

          {/* ── problem ── */}
          <section className="bg-slate-50 px-5 py-12">
            <span className="text-[11.5px] font-bold tracking-[0.15em] text-[var(--cta)]">
              {c.problem.eyebrow}
            </span>
            <h2 className="mt-2 text-[21px] font-bold leading-snug">{c.problem.heading}</h2>
            <p className="mt-4 text-[13px] leading-[1.85] text-slate-500">{nl(c.problem.lead)}</p>
            <div className="relative mt-7">
              <ImageSlot
                src={c.problem.persona.src}
                placeholder={c.problem.persona.placeholder}
                radius={16}
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
                      className={`absolute ${pos} whitespace-nowrap rounded-xl bg-white px-3 py-1.5 text-[11px] font-bold text-slate-500 shadow-[0_8px_20px_rgba(11,37,69,0.16)]`}
                    >
                      {t}
                    </span>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── solution ── */}
          <section className="bg-white px-5 py-12">
            <span className="text-[11.5px] font-bold tracking-[0.15em] text-[var(--blue)]">
              {c.solution.eyebrow}
            </span>
            <h2 className="mt-2 text-[21px] font-bold leading-snug">{nl(c.solution.heading)}</h2>
            <p className="mt-4 text-[13px] leading-[1.85] text-slate-500">{nl(c.solution.lead)}</p>
            <div className="mt-7 rounded-3xl bg-slate-50 p-4">
              <div className="flex items-center justify-center gap-1">
                {c.solution.steps.map((s, i) => (
                  <span key={s} className="flex items-center gap-1">
                    <span className="flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-2xl bg-white px-2.5 text-[10px] font-bold text-[var(--navy)] shadow-[0_4px_14px_rgba(11,37,69,0.14)]">
                      {s}
                    </span>
                    {i < c.solution.steps.length - 1 && (
                      <span className="shrink-0 text-xs text-[var(--blue)]">→</span>
                    )}
                  </span>
                ))}
              </div>
              <div className="mt-5 text-center text-xl leading-none text-[var(--blue)]">↓</div>
              <div className="mx-auto mt-3 flex h-14 w-full max-w-[220px] items-center justify-center rounded-2xl bg-[var(--navy)] px-4 text-center text-[12.5px] font-bold text-white shadow-[0_10px_24px_rgba(11,37,69,0.3)]">
                まとめてお任せください
              </div>
            </div>
          </section>

          {/* ── benefits ── */}
          <section id="benefits" className="bg-slate-50 px-5 py-12">
            <div className="text-center">
              <h2 className="text-[21px] font-bold">{c.benefits.heading}</h2>
              <p className="mt-2 text-[13px] text-slate-500">{nl(c.benefits.lead)}</p>
            </div>
            <div className="mt-10 flex flex-col gap-12">
              {c.benefits.items.map((item) => (
                <div key={item.num}>
                  <div className="overflow-hidden rounded-2xl bg-white shadow-[0_14px_34px_rgba(11,37,69,0.12)]">
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

          {/* ── advantage ── */}
          <section id="advantage" className="bg-[var(--navy)] px-5 py-12 text-white">
            <h2 className="text-center text-[21px] font-bold">{c.advantage.heading}</h2>
            <div className="mt-10 flex flex-col gap-5">
              {c.advantage.items.map((a, i) => (
                <div key={a.title} className="rounded-2xl bg-white/[0.06] p-6">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-[14px] font-bold text-white"
                    style={{ background: c.cta }}
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-[15.5px] font-bold">{a.title}</h3>
                  <p className="mt-2 text-[12.5px] leading-[1.85] text-white/70">{a.body}</p>
                  {a.stat && <p className="mt-3 text-[12.5px] font-bold text-[var(--blue)]">{a.stat}</p>}
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
              <p className="mt-4 text-[13px] leading-[1.85] text-white/80">{c.closing.body}</p>
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
