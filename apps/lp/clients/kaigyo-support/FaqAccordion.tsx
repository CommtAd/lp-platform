"use client";

import { useState } from "react";

interface FaqAccordionProps {
  items: { q: string; a: string }[];
  accent: string;
  cta: string;
}

export default function FaqAccordion({ items, accent, cta }: FaqAccordionProps) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="overflow-hidden rounded-2xl bg-white shadow-[0_3px_14px_rgba(11,37,69,0.08)]"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="flex items-start gap-3">
                <span
                  className="shrink-0 font-bold"
                  style={{ color: cta }}
                >
                  Q
                </span>
                <span className="text-[15px] font-bold leading-relaxed" style={{ color: accent }}>
                  {item.q}
                </span>
              </span>
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-base font-bold"
                style={{ background: `${accent}14`, color: accent }}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <p className="m-0 px-6 pb-6 pl-[3.1rem] text-[13.5px] leading-8 text-slate-600">
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
