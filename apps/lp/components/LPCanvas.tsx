import type { CSSProperties, ReactNode } from "react";

/**
 * 設計幅。全LPはこの幅の1枚のキャンバスとして作る。
 * iPhone 14/15/16 の論理幅であり、国内スマホ実機幅（360〜430px）の中央値。
 */
export const DESIGN_WIDTH = 390;

/** PCでキャンバスが取る最大の実寸。390pxの設計をここまで拡大して見せる。 */
export const MAX_RENDER_WIDTH = 480;

export interface LPCanvasProps {
  children: ReactNode;
  /** キャンバスの地色。 */
  background?: string;
  /** キャンバス外周の影。パターンごとに色を変える。 */
  boxShadow?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * 全LP共通のキャンバス。横幅ずれ防止ルールの実体（CLAUDE.md §16）。
 *
 * 中身は常に幅 `DESIGN_WIDTH`(390px) でレイアウトされ、表示幅に応じて
 * キャンバスごと拡大縮小される。したがって 360px の実機でも 1280px の PC でも
 * 改行位置・要素の比率・高さが完全に一致する。実寸は
 * `min(ビューポート幅, 480px)` で、PCでは 390px 設計の 1.23 倍表示になる。
 *
 * 実装は `globals.css` の `.lp-canvas`（`zoom` + `@supports` フォールバック）。
 *
 * 注意: このキャンバスの内側で `vw` / `vh` などのビューポート単位を使わないこと。
 * ビューポート単位は zoom の外側＝ウィンドウ基準で解決されるため、PCでは
 * 1280px、実機では 390px を指してしまい、このルールの保証をそのまま破る。
 */
export default function LPCanvas({
  children,
  background,
  boxShadow,
  className,
  style,
}: LPCanvasProps) {
  return (
    <div
      className={className ? `lp-canvas ${className}` : "lp-canvas"}
      style={{ background, boxShadow, ...style }}
    >
      {children}
    </div>
  );
}
