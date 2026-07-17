"use client";

import { useState } from "react";

export interface FaqProps {
  items: { q: string; a: string }[];
  accent: string;
}

/** Accordion FAQ for the WPS green template. */
export default function Faq({ items, accent }: FaqProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            style={{
              background: "#FFFFFF",
              border: "1px solid #DCE6DC",
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 6px 18px rgba(31,59,41,0.06)",
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "18px 18px",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "inherit",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: accent,
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "'Shippori Mincho', serif",
                }}
              >
                Q
              </span>
              <span
                style={{
                  flex: 1,
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#2C3A2E",
                  lineHeight: 1.6,
                  letterSpacing: "0.02em",
                }}
              >
                {item.q}
              </span>
              <span
                style={{
                  flexShrink: 0,
                  color: accent,
                  fontSize: 18,
                  transition: "transform 0.25s ease",
                  transform: isOpen ? "rotate(45deg)" : "none",
                  lineHeight: 1,
                }}
              >
                ＋
              </span>
            </button>
            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 0.28s ease",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <p
                  style={{
                    margin: 0,
                    padding: "0 18px 20px 56px",
                    fontSize: 14,
                    lineHeight: 1.9,
                    color: "#5C6157",
                  }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
