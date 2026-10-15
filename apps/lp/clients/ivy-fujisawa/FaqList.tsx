"use client";

import { useState } from "react";

interface FaqListProps {
  items: { q: string; a: string }[];
  accent: string;
  rule: string;
  ink: string;
  inkSoft: string;
}

/**
 * FAQ。B案では枠も影も持たせず、**ヘアラインで区切るだけ**にしている。
 * カードを並べない方針（指示書 §4）に合わせるため。
 */
export default function FaqList({
  items,
  accent,
  rule,
  ink,
  inkSoft,
}: FaqListProps) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div style={{ borderTop: `1px solid ${rule}` }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderBottom: `1px solid ${rule}` }}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "18px 2px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  fontFamily: "'Zen Kaku Gothic New', sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  lineHeight: 1.75,
                  color: accent,
                }}
              >
                Q
              </span>
              <span
                style={{
                  flex: 1,
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: ink,
                  lineHeight: 1.75,
                }}
              >
                {item.q}
              </span>
              {/* 細い十字。開いているときは横棒だけにする（＝マイナス）。 */}
              <span
                style={{
                  flexShrink: 0,
                  position: "relative",
                  width: 12,
                  height: 12,
                  marginTop: 6,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    width: 12,
                    height: 1,
                    background: accent,
                  }}
                />
                {!isOpen && (
                  <span
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: 0,
                      width: 1,
                      height: 12,
                      background: accent,
                    }}
                  />
                )}
              </span>
            </button>
            {isOpen && (
              <p
                style={{
                  margin: 0,
                  padding: "0 24px 20px 24px",
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontSize: 13,
                  lineHeight: 2.05,
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
