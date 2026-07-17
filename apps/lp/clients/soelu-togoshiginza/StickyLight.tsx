"use client";

import { useEffect, useState } from "react";

export interface StickyLightProps {
  offers: { label: string; value: string }[];
  buttonText: string;
  anchor: string;
  accent: string;
  gradient: string;
  /** Show only after scrolling past this Y offset (px). */
  showAfter?: number;
}

/** Sticky footer CTA for the soelu clean white/blue template. */
export default function StickyLight({
  offers,
  buttonText,
  anchor,
  accent,
  gradient,
  showAfter = 0,
}: StickyLightProps) {
  const [visible, setVisible] = useState(false);
  // 外部URL（予約ウィジェット等）の場合はページ内アンカーが無いので、
  // querySelector（URLは不正なセレクタで例外になる）を回避し常時表示扱いにする。
  const isExternal = /^https?:\/\//.test(anchor);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY >= showAfter;
      const target = isExternal ? null : document.querySelector(anchor);
      const reached = target
        ? target.getBoundingClientRect().top <= window.innerHeight * 0.9
        : false;
      setVisible(past && !reached);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [anchor, showAfter, isExternal]);

  useEffect(() => {
    // Reserve bottom clearance for the fixed bar, and override the global body
    // background (globals.css uses pattern A's cream #e4dfd5) so the padding
    // doesn't show as a cream strip under this white/blue LP.
    const prevPad = document.body.style.paddingBottom;
    const prevBg = document.body.style.background;
    document.body.style.paddingBottom = "104px";
    document.body.style.background = "#E8EFF4";
    return () => {
      document.body.style.paddingBottom = prevPad;
      document.body.style.background = prevBg;
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
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${accent}44`,
          borderRadius: 16,
          boxShadow: "0 8px 26px rgba(35,80,110,0.2)",
          pointerEvents: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 9,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
          {offers.map((o, i) => (
            <span key={o.label} style={{ display: "contents" }}>
              {i > 0 && <span style={{ width: 1, height: 14, background: "rgba(35,80,110,0.2)" }} />}
              <span style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                <span style={{ fontSize: 11, color: "#5D7180" }}>{o.label}</span>
                <span style={{ fontWeight: 800, fontSize: 16, color: accent }}>{o.value}</span>
              </span>
            </span>
          ))}
        </div>
        <a
          href={anchor}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
            boxShadow: "0 6px 16px rgba(180,135,60,0.4)",
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
