"use client";

import { useState } from "react";

interface FaqLightProps {
  items: { q: string; a: string }[];
  accent: string;
}

/** Light-theme FAQ accordion for the soelu clean white/blue template. */
export default function FaqLight({ items, accent }: FaqLightProps) {
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
              border: "1px solid #DCE7EE",
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 2px 10px rgba(35,80,110,0.05)",
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
                  background: accent,
                  color: "#FFFFFF",
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: "24px",
                  textAlign: "center",
                }}
              >
                Q
              </span>
              <span style={{ flex: 1, fontSize: 13.5, fontWeight: 700, color: "#22415A", lineHeight: 1.5 }}>
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
                  padding: "0 20px 18px 54px",
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
