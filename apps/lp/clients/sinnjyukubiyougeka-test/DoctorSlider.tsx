"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * 医師紹介のスライダー（AUN 2026-10-13：縦長になるのでスライド表示に）。
 * 横スクロール＋scroll-snap が実体で、左右ボタンとドットは現在位置を送るだけ。
 * 左右ボタンは常に押せる（最後の次は最初へ、最初の前は最後へループ）。
 * ループ時も押した矢印の向きに動かす（2026-10-14 顧客指示）。そのため両端に
 * 反対側のカードの複製を置き、複製へ送ってから止まった時点で本物へ瞬間移動する。
 * 幅は親（.inner）に追従するので、キャンバスの zoom の内側でもそのまま動く。
 */
export default function DoctorSlider({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const slides = Children.toArray(children);
  const count = slides.length;
  const loop = count > 1;
  // トラック上の並び：[最後の複製, 本物0..count-1, 最初の複製]（ループしないときは本物だけ）
  const offset = loop ? 1 : 0;

  // 高さ合わせに使う「止まっているカード」。ドットの index はスワイプ中も追従させるが、
  // 高さはスワイプ中に変えると下のコンテンツが指の動きと関係なく上下してガタつくので、止まってから変える
  const [settled, setSettled] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const jump = (pos: number) => el.scrollTo({ left: pos * el.clientWidth, behavior: "instant" as ScrollBehavior });
    jump(offset);

    let touching = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const toIndex = (pos: number) => (((pos - offset) % count) + count) % count;

    // 指が離れていて、かつカードの位置ぴったりに止まったときだけ確定する。
    // 指で押さえたまま一瞬止めただけでは動かさない（そこで瞬間移動すると指の下でカードが入れ替わる）
    const settle = () => {
      if (touching) return;
      const raw = el.scrollLeft / el.clientWidth;
      const pos = Math.round(raw);
      if (Math.abs(raw - pos) > 0.01) return; // まだスナップ中。scroll がまた来るのでそのとき再判定
      // 複製の位置で止まったら、同じ見た目の本物へ瞬間移動（スワイプで端を越えたときも同じ）
      if (loop && pos === 0) jump(count);
      else if (loop && pos === count + 1) jump(1);
      setSettled(toIndex(pos));
    };
    const onScroll = () => {
      setIndex(toIndex(Math.round(el.scrollLeft / el.clientWidth)));
      clearTimeout(timer);
      timer = setTimeout(settle, 150);
    };
    const onTouchStart = () => { touching = true; clearTimeout(timer); };
    const onTouchEnd = () => { touching = false; clearTimeout(timer); timer = setTimeout(settle, 150); };

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("scrollend", settle);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      clearTimeout(timer);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("scrollend", settle);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [count, loop, offset]);

  // カードごとに高さが違うので、トラックの高さは表示中のカードに合わせる（一番長いカードの余白が残らないように）
  useEffect(() => {
    const el = track.current;
    const slide = el?.children[settled + offset] as HTMLElement | undefined;
    if (!el || !slide) return;
    const fit = () => { el.style.height = `${slide.offsetHeight}px`; };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(slide);
    return () => ro.disconnect();
  }, [settled, offset]);

  // step：-1 / +1 で矢印の向きに1枚送る（端では複製へ進むので向きが逆転しない）
  const step = (dir: -1 | 1) => {
    const el = track.current;
    if (!el) return;
    const pos = Math.round(el.scrollLeft / el.clientWidth);
    const next = loop ? pos + dir : (((pos + dir) % count) + count) % count;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: (i + offset) * el.clientWidth, behavior: "smooth" });
  };

  const slide = (child: ReactNode, i: number, clone = false) => (
    <div
      key={clone ? `clone-${i}` : i}
      className="dr-slide"
      aria-roledescription="slide"
      aria-label={`${i + 1} / ${count}`}
      aria-hidden={clone || undefined}
      inert={clone || undefined}
    >
      {child}
    </div>
  );

  return (
    <div className="dr-slider">
      <div className="dr-track" ref={track}>
        {loop && slide(slides[count - 1], count - 1, true)}
        {slides.map((child, i) => slide(child, i))}
        {loop && slide(slides[0], 0, true)}
      </div>
      <button type="button" className="dr-nav prev" aria-label="前の医師" onClick={() => step(-1)} />
      <button type="button" className="dr-nav next" aria-label="次の医師" onClick={() => step(1)} />
      <div className="dr-dots">
        {Array.from({ length: count }, (_, i) => (
          <button key={i} type="button" aria-label={`${i + 1}人目の医師`} aria-current={i === index} onClick={() => goTo(i)} />
        ))}
      </div>
    </div>
  );
}
