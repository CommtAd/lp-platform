"use client";

import { trackEvent } from "@/components/LPForm";

/**
 * 電話リンク。CLAUDE.md 規約4により tel: リンクには trackEvent('tel_tap') を付与する。
 * page.tsx はサーバーコンポーネントで onClick を持てないため、クライアント側に切り出す。
 */
export default function TelLink({
  tel,
  slug,
  label,
  accent,
}: {
  tel: string;
  slug: string;
  label: string;
  accent: string;
}) {
  return (
    <a
      href={`tel:${tel.replace(/[^0-9+]/g, "")}`}
      onClick={() => trackEvent("tel_tap", slug)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        height: 46,
        marginTop: 14,
        border: `1px solid ${accent}`,
        borderRadius: 999,
        color: accent,
        textDecoration: "none",
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: "0.04em",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
      </svg>
      {label}
    </a>
  );
}
