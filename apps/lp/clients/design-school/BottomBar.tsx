"use client";

import { useEffect, useState } from "react";
import LPCanvas from "@/components/LPCanvas";
import LineLink from "./LineLink";

interface BottomBarProps {
  clientSlug: string;
  lineUrl: string;
  lineText: string;
  ctaText: string;
  /** これより下にスクロールしたら出す（px）。 */
  showAfter?: number;
}

/**
 * 画面下に固定する2ボタン（LINE / 無料相談）。フォームが見えたら隠す。
 * 中身は LPCanvas で組むので、本文と同じ倍率で拡大縮小される。
 */
export default function BottomBar({ clientSlug, lineUrl, lineText, ctaText, showAfter = 600 }: BottomBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const form = document.querySelector("#form");
      const reached = form ? form.getBoundingClientRect().top <= window.innerHeight * 0.9 : false;
      setVisible(window.scrollY >= showAfter && !reached);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  const btn = {
    flex: 1,
    height: 46,
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textDecoration: "none",
  } as const;

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        pointerEvents: visible ? "auto" : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "opacity .3s, transform .3s",
      }}
    >
      <LPCanvas>
        <div
          style={{
            display: "flex",
            gap: 6,
            padding: "8px 10px 10px",
            background: "rgba(255,255,255,0.96)",
            boxShadow: "0 -4px 16px rgba(80,50,60,0.12)",
          }}
        >
          <LineLink
            clientSlug={clientSlug}
            href={lineUrl}
            style={{
              ...btn,
              background: "linear-gradient(180deg,#2FCB3A 0%,#0DB705 100%)",
              boxShadow: "0 3px 0 #0A8F04",
            }}
          >
            {lineText}
          </LineLink>
          <a
            href="#form"
            style={{
              ...btn,
              background: "linear-gradient(180deg,#C9667F 0%,#B4506B 100%)",
              boxShadow: "0 3px 0 #8A3850",
            }}
          >
            {ctaText}
          </a>
        </div>
      </LPCanvas>
    </div>
  );
}
