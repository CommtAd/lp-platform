"use client";

import { useEffect, useRef, useState } from "react";

export interface HeroVideoProps {
  /** 背景動画。A/Bで差し替えるときは config の `fv.video` だけを変える。 */
  src: string;
  /** 動画が出るまで（および出せないとき）に見えている静止画。 */
  poster: string;
  alt: string;
}

/**
 * FVの背景動画。**静止画を先に出し、動画は後から重ねる**作りにしている。
 *
 * 理由は指示書 §12・§13。動画は 540x960 / 約4.2秒で約3.8MBあり、これを
 * 初期表示に載せるとMeta広告の流入（＝モバイル回線）で確実に遅くなる。
 * そこで:
 *   - ポスター画像（約100KB）は常に描画され、FVのLCPはこちらが担う。
 *   - 動画は `load` の後、さらにアイドルまで待ってから読み込み、
 *     再生が始まってからフェードインで重ねる。
 *   - データセーバー / 2G・3G 回線、および `prefers-reduced-motion` では
 *     動画を読み込まず、静止画のままにする（指示書の「静止画フォールバック」）。
 * したがって動画の読み込みに失敗しても、FVは静止画で成立したままになる。
 */
export default function HeroVideo({ src, poster, alt }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // `connection` は実験的APIなので、無い環境では素通しにする。
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const slow =
      conn?.saveData === true ||
      (conn?.effectiveType ? /^(slow-)?2g$|^3g$/.test(conn.effectiveType) : false);
    if (reduceMotion || slow) return;

    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      const v = videoRef.current;
      if (!v) return;
      v.src = src;
      v.load();
      // autoplay が拒否されても静止画が残るだけなので、失敗は握りつぶす。
      void v.play().catch(() => {});
    };

    // 初期表示を邪魔しないよう、load 後のアイドルまで待ってから読み込む。
    const afterLoad = () => {
      const ric = (
        window as Window & {
          requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
        }
      ).requestIdleCallback;
      if (ric) ric(start, { timeout: 2500 });
      else window.setTimeout(start, 600);
    };
    if (document.readyState === "complete") afterLoad();
    else window.addEventListener("load", afterLoad, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", afterLoad);
    };
  }, [src]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt={alt}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 38%",
          display: "block",
        }}
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="none"
        aria-hidden="true"
        onPlaying={() => setPlaying(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 38%",
          display: "block",
          opacity: playing ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      />
    </>
  );
}
