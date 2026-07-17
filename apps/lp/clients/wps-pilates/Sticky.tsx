"use client";

import { useEffect, useState } from "react";

export interface StickyProps {
  offers: { label: string; value: string }[];
  buttonText: string;
  anchor: string;
  gradient: string;
  showAfter?: number;
}

/** Sticky footer CTA for the WPS green/gold template. */
export default function Sticky({
  offers,
  buttonText,
  anchor,
  gradient,
  showAfter = 560,
}: StickyProps) {
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
        animation: "wpsStickyUp 0.4s cubic-bezier(0.22,1,0.36,1) both",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          margin: "0 12px 12px",
          padding: "12px 14px",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(176,138,60,0.4)",
          borderRadius: 16,
          boxShadow: "0 8px 26px rgba(31,59,41,0.24)",
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
            gap: 16,
          }}
        >
          {offers.map((offer, i) => (
            <span key={i} style={{ display: "contents" }}>
              {i > 0 && (
                <span
                  style={{ width: 1, height: 16, background: "rgba(60,90,70,0.25)" }}
                />
              )}
              <span
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 6,
                  fontFamily: "'Zen Kaku Gothic New', sans-serif",
                }}
              >
                <span style={{ fontSize: 12, color: "#5C6157" }}>{offer.label}</span>
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#B08A3C",
                    fontFamily: "'Shippori Mincho', serif",
                  }}
                >
                  {offer.value}
                </span>
              </span>
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
            letterSpacing: "0.08em",
            borderRadius: 999,
            boxShadow: "0 6px 16px rgba(176,138,60,0.4)",
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
              animation: "wpsSheen 3.4s ease-in-out infinite",
            }}
          />
        </a>
      </div>
    </div>
  );
}
