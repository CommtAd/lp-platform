"use client";

import { useState } from "react";

interface FaqAccordionProps {
  items: { q: string; a: string }[];
  /** メインカラー。Qバッジと開閉記号に使う。 */
  accent: string;
}

/** 濃色セクションの上に置く白いアコーディオン（ブリーフ §16）。 */
export default function FaqAccordion({ items, accent }: FaqAccordionProps) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            style={{
              background: "#FFFFFF",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 2px 10px rgba(16,42,62,0.10)",
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 11,
                padding: "15px 16px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 23,
                  height: 23,
                  borderRadius: "50%",
                  background: accent,
                  color: "#FFFFFF",
                  fontFamily: "'Zen Kaku Gothic New', sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: "23px",
                  textAlign: "center",
                }}
              >
                Q
              </span>
              <span
                style={{
                  flex: 1,
                  fontFamily: "'Zen Kaku Gothic New', sans-serif",
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: accent,
                  lineHeight: 1.55,
                }}
              >
                {item.q}
              </span>
              <span style={{ flexShrink: 0, fontSize: 18, color: accent, lineHeight: 1 }}>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <p
                style={{
                  margin: 0,
                  padding: "0 18px 16px 50px",
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontSize: 12.5,
                  lineHeight: 1.9,
                  color: "#5D7180",
                }}
              >
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
