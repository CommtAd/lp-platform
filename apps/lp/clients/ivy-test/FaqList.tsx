"use client";

import { useState } from "react";

interface FaqListProps {
  items: { q: string; a: string }[];
  accent: string;
  accentSoft: string;
  ink: string;
  inkSoft: string;
}

/**
 * FAQのアコーディオン。初期状態で1問目だけ開いている。
 * 回答は公式サイトで確認できる内容のみ（config 側で担保）。
 */
export default function FaqList({
  items,
  accent,
  accentSoft,
  ink,
  inkSoft,
}: FaqListProps) {
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
              border: `1px solid ${accentSoft}`,
              boxShadow: "0 2px 10px rgba(40,70,90,0.06)",
              overflow: "hidden",
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
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: accent,
                  color: "#FFFFFF",
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: "22px",
                  textAlign: "center",
                }}
              >
                Q
              </span>
              <span
                style={{
                  flex: 1,
                  fontSize: 14,
                  fontWeight: 700,
                  color: ink,
                  lineHeight: 1.6,
                }}
              >
                {item.q}
              </span>
              <span
                style={{
                  flexShrink: 0,
                  width: 20,
                  height: 20,
                  color: accent,
                  fontSize: 17,
                  lineHeight: "20px",
                  textAlign: "center",
                  fontWeight: 700,
                  transition: "transform 0.2s ease",
                  transform: isOpen ? "rotate(45deg)" : "none",
                }}
              >
                ＋
              </span>
            </button>
            {isOpen && (
              <p
                style={{
                  margin: 0,
                  padding: "0 16px 16px 49px",
                  fontSize: 13,
                  lineHeight: 1.95,
                  color: inkSoft,
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
