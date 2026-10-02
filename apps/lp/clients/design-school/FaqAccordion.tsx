"use client";

import { useState } from "react";

interface FaqAccordionProps {
  items: { q: string; a: string }[];
  accent: string;
  text: string;
}

export default function FaqAccordion({ items, accent, text }: FaqAccordionProps) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ background: "#F5F1EF", borderRadius: 6 }}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: 10,
                padding: "18px 16px",
                textAlign: "left",
                color: text,
              }}
            >
              <span
                style={{
                  fontFamily: "'Shippori Mincho', serif",
                  fontSize: 21,
                  fontWeight: 700,
                  lineHeight: 1,
                  color: accent,
                }}
              >
                Q
              </span>
              <span style={{ flex: 1, fontSize: 13.5, letterSpacing: "0.08em", lineHeight: 1.7 }}>
                {item.q}
              </span>
              <span style={{ fontSize: 14, color: text }}>{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <p
                style={{
                  margin: "0 14px",
                  padding: "14px 4px 18px",
                  borderTop: `1px solid ${accent}55`,
                  fontSize: 12.5,
                  lineHeight: 1.9,
                  letterSpacing: "0.06em",
                  color: text,
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
