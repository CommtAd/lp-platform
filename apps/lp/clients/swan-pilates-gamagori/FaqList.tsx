"use client";

import { useState } from "react";

interface FaqListProps {
  items: { q: string; a: string }[];
  /** Q・＋/− の色。 */
  accent: string;
  /** ＋/− の丸の地色。 */
  accentSoft: string;
  ink: string;
  inkSoft: string;
}

/**
 * seren-pilates の FaqList を Swan の配色に合わせたもの。
 * 白いアコーディオンで、初期状態は1問目だけ開いている。
 */
export default function FaqList({ items, accent, accentSoft, ink, inkSoft }: FaqListProps) {
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
              borderRadius: 14,
              boxShadow: "0 3px 12px rgba(96,76,63,0.08)",
              overflow: "hidden",
            }}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 16px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "inherit",
              }}
            >
              <span
                style={{
                  flex: "none",
                  fontFamily: "'Noto Serif JP', serif",
                  fontWeight: 600,
                  fontSize: 17,
                  lineHeight: 1,
                  color: accent,
                }}
              >
                Q.
              </span>
              <span
                style={{
                  flex: 1,
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: ink,
                  lineHeight: 1.6,
                  textWrap: "pretty",
                }}
              >
                {item.q}
              </span>
              <span
                style={{
                  flexShrink: 0,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: accentSoft,
                  color: accent,
                  fontSize: 16,
                  lineHeight: "24px",
                  textAlign: "center",
                  fontWeight: 700,
                }}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div style={{ display: "flex", gap: 10, padding: "0 18px 18px 16px" }}>
                <span
                  style={{
                    flex: "none",
                    fontFamily: "'Noto Serif JP', serif",
                    fontWeight: 600,
                    fontSize: 17,
                    lineHeight: 1.4,
                    color: "#C09A80",
                  }}
                >
                  A.
                </span>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.95, color: inkSoft }}>{item.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
