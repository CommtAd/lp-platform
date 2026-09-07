"use client";

import { useState } from "react";

interface FaqAccordionProps {
  items: { q: string; a: string }[];
  /** 桜色のアクセント。開閉ボタンとQ/Aの記号に使う。 */
  accent: string;
  ink: string;
  body: string;
  line: string;
}

/**
 * FAQアコーディオン。1問目だけ開いた状態で出す（開き方が分かるように）。
 * 全問閉じられるよう -1 を許容する。
 */
export default function FaqAccordion({ items, accent, ink, body, line }: FaqAccordionProps) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            style={{
              overflow: "hidden",
              borderRadius: 12,
              background: "#FFFFFF",
              border: `1px solid ${line}`,
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 10,
                padding: "14px 14px",
                background: "none",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <span style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span
                  style={{
                    flexShrink: 0,
                    fontSize: 13,
                    fontWeight: 700,
                    color: accent,
                    lineHeight: 1.6,
                  }}
                >
                  Q
                </span>
                <span
                  style={{
                    fontSize: 13.5,
                    fontWeight: 700,
                    lineHeight: 1.6,
                    color: ink,
                  }}
                >
                  {item.q}
                </span>
              </span>
              <span
                style={{
                  flexShrink: 0,
                  display: "flex",
                  width: 22,
                  height: 22,
                  borderRadius: 999,
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  background: `${accent}1F`,
                  color: accent,
                  marginTop: 1,
                }}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <p
                style={{
                  margin: 0,
                  padding: "0 14px 15px 32px",
                  fontSize: 12.5,
                  lineHeight: 2,
                  color: body,
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
