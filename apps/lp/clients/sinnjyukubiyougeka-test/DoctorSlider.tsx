"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * 医師紹介のスライダー（AUN 2026-10-13：縦長になるのでスライド表示に）。
 * 横スクロール＋scroll-snap が実体で、左右ボタンとドットは現在位置を送るだけ。
 * 左右ボタンは常に押せる（最後の次は最初へ、最初の前は最後へループ）。
 * 幅は親（.inner）に追従するので、キャンバスの zoom の内側でもそのまま動く。
 */
export default function DoctorSlider({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = Children.count(children);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // カードごとに高さが違うので、トラックの高さは表示中のカードに合わせる（一番長いカードの余白が残らないように）
  useEffect(() => {
    const el = track.current;
    const slide = el?.children[index] as HTMLElement | undefined;
    if (!el || !slide) return;
    const fit = () => { el.style.height = `${slide.offsetHeight}px`; };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(slide);
    return () => ro.disconnect();
  }, [index]);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    // 端から先へ押したら反対側へ回る（左右のボタンを常に押せるように）
    const next = (i + count) % count;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="dr-slider">
      <div className="dr-track" ref={track}>
        {Children.map(children, (child, i) => (
          <div className="dr-slide" aria-roledescription="slide" aria-label={`${i + 1} / ${count}`}>
            {child}
          </div>
        ))}
      </div>
      <button type="button" className="dr-nav prev" aria-label="前の医師" onClick={() => go(index - 1)} />
      <button type="button" className="dr-nav next" aria-label="次の医師" onClick={() => go(index + 1)} />
      <div className="dr-dots">
        {Array.from({ length: count }, (_, i) => (
          <button key={i} type="button" aria-label={`${i + 1}人目の医師`} aria-current={i === index} onClick={() => go(i)} />
        ))}
      </div>
    </div>
  );
}
