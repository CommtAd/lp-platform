"use client";

import { useState } from "react";

interface FaqDarkProps {
  items: { q: string; a: string }[];
  pink: string;
}

export default function FaqDark({ items, pink }: FaqDarkProps) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 18px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  border: `1px solid ${pink}`,
                  color: pink,
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: "22px",
                  textAlign: "center",
                }}
              >
                Q
              </span>
              <span style={{ flex: 1, fontSize: 13.5, fontWeight: 700, color: "#FFFFFF", lineHeight: 1.5 }}>
                {item.q}
              </span>
              <span style={{ flexShrink: 0, fontSize: 18, color: pink, lineHeight: 1 }}>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <p
                style={{
                  margin: 0,
                  padding: "0 20px 18px 54px",
                  fontSize: 12.5,
                  lineHeight: 1.9,
                  color: "rgba(255,255,255,0.65)",
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
