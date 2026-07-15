"use client";

import { useEffect, useState, type ReactNode } from "react";

export interface StickyFooterCTAProps {
  /** Offer chips shown above the button, e.g. ["90分体験 ¥0", "入会金 ¥0"]. */
  offers: ReactNode[];
  buttonText: string;
  /** In-page anchor the button scrolls to (e.g. "#form"). */
  anchor: string;
  /** Show only after scrolling past this Y offset (px). */
  showAfter?: number;
  /** Button background. Default matches pattern A's gold gradient. */
  buttonGradient?: string;
  /** Button box-shadow color (rgba). Default matches pattern A's gold glow. */
  shadowColor?: string;
  /** Card border color (rgba). Default matches pattern A's gold border. */
  borderColor?: string;
}

/**
 * Shared following footer CTA. Appears after the hero and hides once the
 * target section is in view. Reserves bottom padding on <body> equal to its
 * own height so it never overlaps the final section. Colors default to
 * pattern A's gold styling but can be overridden per pattern/client.
 */
export default function StickyFooterCTA({
  offers,
  buttonText,
  anchor,
  showAfter = 620,
  buttonGradient = "linear-gradient(135deg, #E8C877 0%, #C1902F 100%)",
  shadowColor = "rgba(160,120,40,0.4)",
  borderColor = "rgba(190,150,70,0.35)",
}: StickyFooterCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY >= showAfter;
      const target = document.querySelector(anchor);
      const reached = target
        ? target.getBoundingClientRect().top <= window.innerHeight * 0.9
        : false;
      setVisible(past && !reached);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [anchor, showAfter]);

  // Reserve space so the fixed bar never hides the last section's content.
  useEffect(() => {
    const prev = document.body.style.paddingBottom;
    document.body.style.paddingBottom = "104px";
    return () => {
      document.body.style.paddingBottom = prev;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 50,
        animation: "stickyUp 0.4s cubic-bezier(0.22,1,0.36,1) both",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          margin: "0 12px 12px",
          padding: "12px 14px",
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${borderColor}`,
          borderRadius: 16,
          boxShadow: "0 8px 26px rgba(70,72,60,0.22)",
          pointerEvents: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 9,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
          }}
        >
          {offers.map((offer, i) => (
            <span key={i} style={{ display: "contents" }}>
              {i > 0 && (
                <span
                  style={{
                    width: 1,
                    height: 14,
                    background: "rgba(90,92,78,0.25)",
                  }}
                />
              )}
              {offer}
            </span>
          ))}
        </div>
        <a
          href={anchor}
          style={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            height: 54,
            background: buttonGradient,
            color: "#FFFFFF",
            textDecoration: "none",
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "0.08em",
            borderRadius: 999,
            boxShadow: `0 6px 16px ${shadowColor}`,
          }}
        >
          <span style={{ position: "relative", zIndex: 1 }}>{buttonText}</span>
          <span
            style={{
              position: "relative",
              zIndex: 1,
              display: "inline-flex",
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.25)",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
            }}
          >
            →
          </span>
          <span
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "-60%",
              width: "40%",
              background:
                "linear-gradient(100deg, transparent, rgba(255,255,255,0.55), transparent)",
              transform: "skewX(-18deg)",
              animation: "ctaSheen 3.4s ease-in-out infinite",
            }}
          />
        </a>
      </div>
    </div>
  );
}
