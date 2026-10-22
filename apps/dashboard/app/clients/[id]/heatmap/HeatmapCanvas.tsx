"use client";

import { useEffect, useRef, useState } from "react";
import type { HeatmapPoint } from "@shared/index";

/**
 * クリックヒートマップの描画。LPを幅390pxのiframeで出し、その上に
 * canvas で濃淡を重ねる。
 *
 * LPは幅390pxの1枚のキャンバスなので、幅390pxのiframeに入れると中の `zoom` が
 * 1 になり、収集時のキャンバス座標とそのまま一致する（CLAUDE.md §16）。
 * だから座標変換はここでは要らず、比率を幅・高さに掛けるだけで重なる。
 *
 * 濃淡は「点ごとのガウシアンを足し合わせて最大値で正規化」する素朴なKDE。
 * 画素数を抑えるため実解像度の半分で作り、CSSで引き伸ばしている。
 */

/** 描画バッファの縮小率。390×全高をそのまま持つと重いので半分で作る。 */
const BUFFER_SCALE = 0.5;

/** 1クリックの広がり（キャンバス座標px）。指1本ぶんの当たり判定に合わせている。 */
const POINT_RADIUS_PX = 22;

/** 薄い部分を見えるようにするためのガンマ。1未満で低い値を持ち上げる。 */
const INTENSITY_GAMMA = 0.55;

/** 濃淡の色。下から上へ「薄い＝青 → 濃い＝赤」。 */
const RAMP: { stop: number; rgb: [number, number, number] }[] = [
  { stop: 0.0, rgb: [37, 99, 235] },
  { stop: 0.35, rgb: [16, 185, 129] },
  { stop: 0.6, rgb: [250, 204, 21] },
  { stop: 0.8, rgb: [249, 115, 22] },
  { stop: 1.0, rgb: [220, 38, 38] },
];

function rampColor(t: number): [number, number, number] {
  for (let i = 1; i < RAMP.length; i += 1) {
    const prev = RAMP[i - 1];
    const next = RAMP[i];
    if (t <= next.stop) {
      const span = next.stop - prev.stop || 1;
      const k = (t - prev.stop) / span;
      return [
        Math.round(prev.rgb[0] + (next.rgb[0] - prev.rgb[0]) * k),
        Math.round(prev.rgb[1] + (next.rgb[1] - prev.rgb[1]) * k),
        Math.round(prev.rgb[2] + (next.rgb[2] - prev.rgb[2]) * k),
      ];
    }
  }
  return RAMP[RAMP.length - 1].rgb;
}

export interface HeatmapCanvasProps {
  /** iframe に出すLPのURL。 */
  src: string;
  /** キャンバス座標での幅（390）。 */
  width: number;
  /** キャンバス座標でのページ全高。 */
  height: number;
  /** 重ねる点。x・y ともに 0〜1 の比率。 */
  points: HeatmapPoint[];
}

export default function HeatmapCanvas({ src, width, height, points }: HeatmapCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(0.7);
  const [frameLoaded, setFrameLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = Math.max(1, Math.round(width * BUFFER_SCALE));
    const h = Math.max(1, Math.round(height * BUFFER_SCALE));
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);
    if (!points.length) return;

    // 1. 点ごとのガウシアンを足し合わせる
    const radius = Math.max(2, Math.round(POINT_RADIUS_PX * BUFFER_SCALE));
    const intensity = new Float32Array(w * h);
    const sigmaSq = (radius / 2) ** 2;
    let max = 0;

    for (const p of points) {
      const cx = Math.round(p.x * w);
      const cy = Math.round(p.y * h);
      const x0 = Math.max(0, cx - radius);
      const x1 = Math.min(w - 1, cx + radius);
      const y0 = Math.max(0, cy - radius);
      const y1 = Math.min(h - 1, cy + radius);
      for (let y = y0; y <= y1; y += 1) {
        const dy = y - cy;
        for (let x = x0; x <= x1; x += 1) {
          const dx = x - cx;
          const d2 = dx * dx + dy * dy;
          if (d2 > radius * radius) continue;
          const i = y * w + x;
          const v = intensity[i] + Math.exp(-d2 / (2 * sigmaSq));
          intensity[i] = v;
          if (v > max) max = v;
        }
      }
    }
    if (max <= 0) return;

    // 2. 正規化して色に変える
    const image = ctx.createImageData(w, h);
    const data = image.data;
    for (let i = 0; i < intensity.length; i += 1) {
      const raw = intensity[i] / max;
      if (raw <= 0.004) continue;
      const t = Math.min(1, raw ** INTENSITY_GAMMA);
      const [r, g, b] = rampColor(t);
      const o = i * 4;
      data[o] = r;
      data[o + 1] = g;
      data[o + 2] = b;
      data[o + 3] = Math.round(Math.min(1, t * 1.25) * 255);
    }
    ctx.putImageData(image, 0, 0);
  }, [points, width, height]);

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-4 text-xs text-neutral-600">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={visible}
            onChange={(e) => setVisible(e.target.checked)}
            className="h-4 w-4 rounded border-neutral-300 accent-navy"
          />
          ヒートマップを重ねる
        </label>
        <label className="flex items-center gap-2">
          濃さ
          <input
            type="range"
            min={0.2}
            max={1}
            step={0.05}
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-32 accent-navy"
          />
        </label>
        <span className="flex items-center gap-2">
          薄い
          <span
            aria-hidden
            className="inline-block h-2 w-28 rounded-full"
            style={{
              background: `linear-gradient(to right, ${RAMP.map(
                (r) => `rgb(${r.rgb.join(",")}) ${Math.round(r.stop * 100)}%`,
              ).join(", ")})`,
            }}
          />
          濃い
        </span>
      </div>

      <div className="overflow-auto rounded-lg border border-neutral-200 bg-neutral-100 p-4">
        <div
          className="relative mx-auto bg-white shadow-sm"
          style={{ width, height }}
        >
          <iframe
            src={src}
            title="LPプレビュー"
            onLoad={() => setFrameLoaded(true)}
            scrolling="no"
            // 計測スクリプトは iframe 内では止まるので、この表示でデータは増えない。
            sandbox="allow-same-origin allow-scripts"
            style={{ width, height, border: 0, display: "block" }}
          />
          <canvas
            ref={canvasRef}
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              width,
              height,
              opacity: visible ? opacity : 0,
              pointerEvents: "none",
              transition: "opacity 120ms",
            }}
          />
          {!frameLoaded && (
            <p className="absolute inset-x-0 top-24 text-center text-xs text-neutral-400">
              LPを読み込んでいます…
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
