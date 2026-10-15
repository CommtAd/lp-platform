"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * FVの切り抜き。**被写体を文字より上へ逃がすための値**で、実測して決めている。
 *
 * 支給動画は被写体が画面中央にいるので、素のまま `cover` で敷くと
 * 立位シーンでキャッチが顔を横切る。そこで:
 *
 *   - `objectPosition: center 100%` … 動画の下端を枠の下端に合わせる。
 *     上側が切れるぶん、被写体が枠の中で上へ上がる。
 *   - `ZOOM` … さらに拡大して、被写体と文字の間隔を稼ぐ。
 *
 * **FVの高さを変えても被写体と文字の間隔は変わらない。**
 * 高さを増やすとそのぶん切り抜き量が減って相殺されるため（間隔は
 * `動画の描画高 − 文字ブロックの高さ` で決まり、枠の高さが式から消える）。
 * 間隔を実際に動かせるのはこの `ZOOM` だけなので、ここで調整すること。
 *
 * 1.18 は、3シーン（カウンセリング / リフォーマー / 立位）すべてで顔が
 * 文字帯を外れ、かつ左右の切れ過ぎない上限として選んだ値。
 * 大きくするほど被写体は上がるが、横が切れて解像度も落ちる。
 */
const ZOOM = 1.18;

/**
 * 拡大は `transform` ではなく**要素そのものの寸法**で行う。`transform: scale`
 * は原点まわりに拡縮するため `object-position` の下端合わせと噛み合わず、
 * 拡大率を変えるたびに位置が狂う。幅・高さを `ZOOM` 倍した要素を
 * 下端・中央で置けば、拡大率だけを独立に動かせる。
 */
const FRAME: CSSProperties = {
  position: "absolute",
  left: "50%",
  bottom: 0,
  width: `${ZOOM * 100}%`,
  height: `${ZOOM * 100}%`,
  transform: "translateX(-50%)",
  objectFit: "cover",
  objectPosition: "center 100%",
  display: "block",
};

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
      <img src={poster} alt={alt} style={FRAME} />
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
          ...FRAME,
          opacity: playing ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      />
    </>
  );
}
