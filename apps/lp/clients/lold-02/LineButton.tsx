"use client";

import { trackEvent } from "@/components/LPForm";

interface LineButtonProps {
  clientSlug: string;
  href: string;
  label: string;
  /** LINE公式のロゴマーク（緑の吹き出し／背景透過）。 */
  logoSrc: string;
}

/** LINEのブランドグリーン。 */
const LINE_GREEN = "#06C755";

/**
 * LINE友だち追加のボタン。遷移前に line_tap を記録する（CLAUDE.md 規約4）。
 * `trackEvent` は撃ちっぱなしなので、遷移が遅れることはない。
 *
 * ロゴは公式マークをそのまま置く（色も比率も変えない）。緑地に直接載せると
 * 緑のロゴが沈むので、白いチップに載せて隔離する。ロゴ自体には手を入れない。
 */
export default function LineButton({ clientSlug, href, label, logoSrc }: LineButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("line_tap", clientSlug)}
      className="flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[16px] font-bold text-white"
      style={{
        background: LINE_GREEN,
        boxShadow: "0 10px 24px rgba(6,199,85,0.32)",
        letterSpacing: "0.04em",
      }}
    >
      <span
        aria-hidden
        className="flex items-center justify-center rounded-[7px] bg-white"
        style={{ padding: 4 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={22} height={21} style={{ display: "block" }} />
      </span>
      {label}
    </a>
  );
}
