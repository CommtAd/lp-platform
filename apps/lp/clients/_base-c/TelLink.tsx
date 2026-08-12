"use client";

import { trackEvent } from "@/components/LPForm";

interface TelLinkProps {
  clientSlug: string;
  tel: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * `tel:` anchor that records a tel_tap conversion before navigating (CLAUDE.md 規約4).
 * trackEvent fires and-forgets, so the call is never delayed.
 */
export default function TelLink({ clientSlug, tel, className, style, children }: TelLinkProps) {
  return (
    <a
      href={`tel:${tel.replace(/[^0-9+]/g, "")}`}
      className={className}
      style={style}
      onClick={() => trackEvent("tel_tap", clientSlug)}
    >
      {children}
    </a>
  );
}
