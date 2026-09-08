"use client";

import { useState } from "react";

interface FaqAccordionProps {
  items: { q: string; a: string }[];
  ink: string;
  accent: string;
}

/** Pattern C FAQ — hairline rules instead of cards, matching the editorial look. */
export default function FaqAccordion({ items, ink, accent }: FaqAccordionProps) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="flex flex-col">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-t last:border-b" style={{ borderColor: `${ink}1F` }}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="flex items-start gap-3">
                <span className="shrink-0 text-[13px] font-bold tracking-wider" style={{ color: accent }}>
                  Q
                </span>
                <span className="text-[14.5px] leading-relaxed" style={{ color: ink }}>
                  {item.q}
                </span>
              </span>
              <span
                className="shrink-0 text-lg leading-none transition-transform"
                style={{ color: accent, transform: isOpen ? "rotate(45deg)" : "none" }}
              >
                +
              </span>
            </button>
            {isOpen && (
              <p
                className="m-0 pb-6 pl-[1.55rem] text-[13.5px] leading-8"
                style={{ color: `${ink}B3` }}
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
