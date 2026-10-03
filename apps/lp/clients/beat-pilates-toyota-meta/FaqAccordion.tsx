"use client";

import { useState } from "react";

interface FaqAccordionProps {
  items: { q: string; a: string; confirm?: boolean }[];
  accent: string;
  accentSoft: string;
  ink: string;
  inkSoft: string;
}

/** 白いカードのアコーディオン。初期状態はすべて閉じる（指示書 §20）。 */
export default function FaqAccordion({ items, accent, accentSoft, ink, inkSoft }: FaqAccordionProps) {
  const [open, setOpen] = useState<number>(-1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            style={{
              background: "#FFFFFF",
              borderRadius: 14,
              border: `1px solid ${isOpen ? accent + "55" : "#E7E1F3"}`,
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
              <span style={{ flex: "none", fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 800, fontSize: 17, color: accent }}>
                Q
              </span>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: ink, lineHeight: 1.55 }}>{item.q}</span>
              <span
                style={{
                  flex: "none",
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
              <div style={{ display: "flex", gap: 10, padding: "0 16px 18px" }}>
                <span style={{ flex: "none", fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 800, fontSize: 17, color: "#FF2E8B" }}>
                  A
                </span>
                <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.9, color: inkSoft }}>
                  {item.confirm && <span style={{ color: "#D4145A", fontWeight: 700 }}>【要確認】</span>}
                  {item.a}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
