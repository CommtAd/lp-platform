"use client";

import type { CSSProperties, ReactNode } from "react";
import { trackEvent } from "@/components/LPForm";

interface LineLinkProps {
  clientSlug: string;
  href: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/** LINEリンク。遷移前に line_tap を記録する（CLAUDE.md 規約4）。 */
export default function LineLink({ clientSlug, href, className, style, children }: LineLinkProps) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={className}
      style={style}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => trackEvent("line_tap", clientSlug)}
    >
      {children}
    </a>
  );
}
