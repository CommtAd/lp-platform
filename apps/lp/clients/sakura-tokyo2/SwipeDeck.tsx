"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * 横スワイプのスライド本体。スクロールスナップで1枚ずつ止め、
 * 上端の進捗バーと下端の「03 / 10」で現在位置を出す。
 *
 * スライドの幅は `100%`（= キャンバス幅）。390px と書かないのは、zoom 非対応の
 * ブラウザでキャンバスが 390px 未満に縮んだときにスナップ位置がずれないようにするため。
 * 高さは設計px固定（`height`）。ビューポート単位は使わない（CLAUDE.md §17）。
 */
export default function SwipeDeck({
  slides,
  labels,
  height,
  ink,
  accent,
  line,
  hint,
}: {
  slides: ReactNode[];
  /** 下端のナビに出す各スライドの短い見出し。 */
  labels: string[];
  height: number;
  ink: string;
  accent: string;
  line: string;
  /** 1枚目に出すスワイプの案内。一度でも動かしたら消す。 */
  hint: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [moved, setMoved] = useState(false);
  const total = slides.length;

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setIndex(Math.max(0, Math.min(total - 1, i)));
    if (el.scrollLeft > 4) setMoved(true);
  }, [total]);

  const goTo = useCallback(
    (i: number) => {
      const el = trackRef.current;
      if (!el) return;
      const next = Math.max(0, Math.min(total - 1, i));
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    },
    [total],
  );

  /* PCでの確認用。左右キーでも送れるようにする。 */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index]);

  const arrow = (dir: -1 | 1) => {
    const disabled = dir === -1 ? index === 0 : index === total - 1;
    return (
      <button
        type="button"
        aria-label={dir === -1 ? "前のスライド" : "次のスライド"}
        onClick={() => goTo(index + dir)}
        disabled={disabled}
        style={{
          width: 40,
          height: 40,
          borderRadius: 999,
          border: `1px solid ${disabled ? line : ink}`,
          background: dir === 1 && !disabled ? ink : "transparent",
          color: dir === 1 && !disabled ? "#FFFFFF" : disabled ? line : ink,
          fontSize: 16,
          lineHeight: 1,
          cursor: disabled ? "default" : "pointer",
          flex: "0 0 auto",
        }}
      >
        {dir === -1 ? "←" : "→"}
      </button>
    );
  };

  return (
    <div>
      {/* 進捗バー（ストーリー型の区切り）。何枚中どこまで読んだかを一目で見せる。 */}
      <div
        aria-hidden
        style={{ display: "flex", gap: 3, padding: "0 14px 8px", background: "#FFFFFF" }}
      >
        {slides.map((_, i) => (
          <span
            key={i}
            style={{
              flex: 1,
              height: 2.5,
              borderRadius: 2,
              background: i <= index ? accent : line,
              transition: "background 0.25s",
            }}
          />
        ))}
      </div>

      <div style={{ position: "relative" }}>
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="sakura-swipe-track"
          style={{
            display: "flex",
            overflowX: "auto",
            overflowY: "hidden",
            scrollSnapType: "x mandatory",
            overscrollBehaviorX: "contain",
            scrollbarWidth: "none",
            height,
          }}
        >
          {slides.map((slide, i) => (
            <section
              key={i}
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${total}：${labels[i] ?? ""}`}
              style={{
                flex: "0 0 100%",
                height,
                position: "relative",
                overflow: "hidden",
                scrollSnapAlign: "start",
                scrollSnapStop: "always",
              }}
            >
              {slide}
            </section>
          ))}
        </div>

        {/* 1枚目だけのスワイプ案内。 */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: 14,
            top: 16,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 12px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.9)",
            color: ink,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.06em",
            pointerEvents: "none",
            opacity: index === 0 && !moved ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          {hint}
          <span className="sakura-swipe-nudge" style={{ display: "inline-block" }}>
            →
          </span>
        </div>
      </div>

      {/* 下端ナビ。現在位置（03 / 10）と、いま読んでいるスライドの見出し。 */}
      <nav
        aria-label="スライドの移動"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 14px",
          background: "#FFFFFF",
          borderTop: `1px solid ${line}`,
        }}
      >
        {arrow(-1)}
        <div style={{ flex: 1, textAlign: "center", lineHeight: 1.3 }}>
          <div
            style={{
              fontFamily: "'Shippori Mincho', 'Hiragino Mincho ProN', serif",
              fontSize: 17,
              letterSpacing: "0.12em",
              color: ink,
            }}
          >
            <span style={{ color: accent, fontWeight: 700 }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span style={{ fontSize: 13, margin: "0 6px" }}>/</span>
            {String(total).padStart(2, "0")}
          </div>
          <div style={{ fontSize: 11, color: "#8A8083", letterSpacing: "0.04em" }}>
            {labels[index]}
          </div>
        </div>
        {arrow(1)}
      </nav>

      <style>{`
        .sakura-swipe-track::-webkit-scrollbar { display: none; }
        @keyframes sakura-nudge { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(4px); } }
        .sakura-swipe-nudge { animation: sakura-nudge 1.2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
