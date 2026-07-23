import type { CSSProperties } from "react";
import LPShell from "@/components/LPShell";
import config from "./config";

export default function ThanksPage() {
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
          className="mx-auto flex min-h-screen flex-col overflow-x-hidden bg-white"
          style={{ maxWidth: 480, boxShadow: "0 0 60px rgba(11,37,69,0.14)" }}
        >
          {/* ── header ── */}
          <header className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--navy)] text-sm font-bold text-white">
              {c.header.brand.slice(0, 1)}
            </span>
            <div className="leading-tight">
              <div className="text-[12.5px] font-bold tracking-wide">{c.header.brand}</div>
              <div className="text-[9.5px] text-slate-400">{c.header.brandSub}</div>
            </div>
          </header>

          {/* ── body ── */}
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full text-[28px] text-white"
              style={{ background: `linear-gradient(135deg, ${c.cta} 0%, #FF8A50 100%)`, boxShadow: `0 10px 26px ${c.cta}55` }}
            >
              ✓
            </div>
            <p className="mt-6 text-[19px] font-bold leading-[1.5]">
              お問い合わせありがとうございます
            </p>
            <p className="mt-4 text-[13px] leading-[1.9] text-slate-500">
              ご相談・お見積りのお申し込みを受け付けました。
              <br />
              担当より24時間以内にご連絡いたします。
              <br />
              今しばらくお待ちくださいませ。
            </p>
            <a
              href={`/${c.slug}`}
              className="mt-9 inline-flex h-12 items-center justify-center rounded-full border border-[var(--navy)] px-8 text-[13px] font-bold text-[var(--navy)]"
            >
              トップページに戻る
            </a>
          </div>

          <footer className="border-t border-slate-100 px-5 py-6 text-center">
            <p className="text-[10.5px] tracking-wide text-slate-400">{c.header.brand}</p>
          </footer>
        </div>
      </div>
    </LPShell>
  );
}
