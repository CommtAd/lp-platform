"use client";

import { useState } from "react";

interface FaqListProps {
  items: { q: string; a: string }[];
  accent: string;
  accentSoft: string;
}

export default function FaqList({ items, accent, accentSoft }: FaqListProps) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            style={{
              background: "#FFFFFF",
              borderRadius: 20,
              boxShadow: "0 3px 12px rgba(70,72,60,0.07)",
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
                justifyContent: "space-between",
                gap: 12,
                padding: "16px 20px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: 13.5, fontWeight: 700, color: "#3B3D36", lineHeight: 1.5 }}>
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
              <p
                style={{
                  margin: 0,
                  padding: "0 22px 18px",
                  fontSize: 12.5,
                  lineHeight: 1.9,
                  color: "#62655B",
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
