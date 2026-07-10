"use client";

import { useEffect, useState, type ReactNode } from "react";

export interface StickyDarkProps {
  offers: ReactNode[];
  buttonText: string;
  anchor: string;
  gradient: string;
  showAfter?: number;
}

/** Sticky footer CTA for the beat-pilates dark/neon template. */
export default function StickyDark({
  offers,
  buttonText,
  anchor,
  gradient,
  showAfter = 560,
}: StickyDarkProps) {
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
          background: "rgba(10,10,16,0.9)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,61,147,0.35)",
          borderRadius: 16,
          boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
          pointerEvents: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 9,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
          {offers.map((offer, i) => (
            <span key={i} style={{ display: "contents" }}>
              {i > 0 && <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.2)" }} />}
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
            background: gradient,
            color: "#FFFFFF",
            textDecoration: "none",
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "0.06em",
            borderRadius: 999,
            boxShadow: "0 6px 18px rgba(255,61,147,0.35)",
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
