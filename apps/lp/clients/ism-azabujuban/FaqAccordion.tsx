"use client";

import { useState } from "react";

interface FaqAccordionProps {
  items: { q: string; a: string }[];
  /** Qバッジ・開閉記号・質問文の色。 */
  accent: string;
  /** 回答文の色。 */
  dim: string;
}

/** 生成り地に置く白いアコーディオン。最初の1問だけ開いておく。 */
export default function FaqAccordion({ items, accent, dim }: FaqAccordionProps) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            style={{
              background: "#FFFFFF",
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid #EDE3E1",
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
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: accent,
                  color: "#FFFFFF",
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: 13,
                  fontWeight: 700,
                  lineHeight: "24px",
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
              <span style={{ flexShrink: 0, fontSize: 18, color: accent, lineHeight: 1 }}>{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <p
                style={{
                  margin: 0,
                  padding: "0 18px 16px 51px",
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontSize: 12.5,
                  lineHeight: 1.9,
                  color: dim,
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
