"use client";

import { useEffect } from "react";
import { heatmapDeviceOf } from "@shared/index";
import { HAS_SUPABASE, SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/env";
import { readUtm } from "@/lib/utm";

/**
 * ヒートマップの収集スクリプト（自社実装）。LPShell が全LPを包んでいるので、
 * ここに置けば各LPの `page.tsx` に触らずに全案件へ入る。
 *
 * 送るのは3つだけ。
 *   1. クリック位置（キャンバス座標）
 *   2. 押された要素の文字（ボタン名。入力値は送らない）
 *   3. スクロールの最大到達深さと滞在時間
 * セッション録画はしない。入力欄の中身・個人情報は一切送らない。
 *
 * ## 座標の取り方（ここが要点）
 *
 * LPは「幅390pxの1枚のキャンバス」で、表示幅に応じて `zoom` でキャンバスごと
 * 拡大縮小される（CLAUDE.md §16）。そのため生の `clientX/Y` をそのまま保存すると
 * 端末ごとに倍率が違う座標が混ざってしまう。
 *
 * そこでキャンバスの矩形を基準に割り戻し、**キャンバス座標**（＝390px設計上の
 * 座標）に直してから送る。こうすると360pxの実機とPCのクリックが同じ1枚の絵に
 * 重なる。ダッシュボードは幅390pxのiframeにLPを出して重ねるので、
 * iframe内では `zoom` が 1 になり、保存した座標とそのまま一致する。
 *
 * `getBoundingClientRect()` はスクロールに応じて `top` が動くので、
 * 「キャンバス上端からの距離」はスクロール量を足さずにそのまま出せる。
 *
 * ## 既存LPでの扱い
 *
 * 横幅ずれ防止ルールの対象外である既存17本は `.lp-canvas` を持たないので
 * `document.body` を基準にする。キャンバスが可変幅なので端末ごとに全高が
 * 変わるが、`page_height_px` を一緒に送っているのでダッシュボード側が
 * 比率に直して重ねられる。
 */

/** 溜まったクリックを送る間隔。離脱時にも送るので、これは保険。 */
const FLUSH_INTERVAL_MS = 15_000;

/** 直帰でも母数に残すため、表示直後に一度セッション行を作る。 */
const INITIAL_FLUSH_MS = 2_000;

/** 1回の送信に載せるクリックの上限（DB側も300で切っている）。 */
const MAX_CLICKS_PER_FLUSH = 300;

/** クリックを拾う要素。入力欄は対象外（値に触れないため）。 */
const CLICKABLE = 'a,button,[role="button"],input[type="submit"],summary';

interface PendingClick {
  /** キャンバス幅に対する比率 0〜1。 */
  x: number;
  /** キャンバス上端からの距離（キャンバス座標px）。 */
  y: number;
  /** 押された要素の文字。 */
  l?: string;
}

/**
 * `.lp-canvas` を持たない既存LPのキャンバス代わり。
 *
 * body をそのまま使うと、PC幅では body が1280pxでLPの中身が480pxの中央寄せ
 * カラムになり、クリックのx比率が中央（0.4〜0.6）に潰れてしまう（実測で確認）。
 * そこで body から「背の高い子が1つだけ」の連鎖を辿り、幅が body より狭く
 * なった時点＝中央寄せカラムに到達した時点で止める。
 * 既存LPはパターンAもCも `maxWidth: 480` のカラム1枚で組まれているので、
 * これで360px幅では360px、1280px幅では480pxのカラムが選ばれる。
 */
function fallbackCanvas(): HTMLElement {
  const body = document.body;
  let node: HTMLElement = body;
  for (let depth = 0; depth < 4; depth += 1) {
    const tall = [...node.children].filter(
      (el) => el.getBoundingClientRect().height > 200,
    );
    if (tall.length !== 1) break;
    const child = tall[0];
    if (!(child instanceof HTMLElement) || child.offsetWidth <= 0) break;
    node = child;
    if (node.offsetWidth < body.offsetWidth) break;
  }
  return node;
}

/** キャンバス要素。新規LPは `.lp-canvas`、既存LPは中央寄せカラムで代用する。 */
function canvasElement(): HTMLElement | null {
  if (typeof document === "undefined") return null;
  return document.querySelector<HTMLElement>(".lp-canvas") ?? fallbackCanvas();
}

interface CanvasMetrics {
  /** ビューポート座標でのキャンバスの矩形（描画後の実寸）。 */
  rect: DOMRect;
  /** キャンバス座標での幅。新規LPは常に 390。 */
  width: number;
  /** キャンバス座標での全高。 */
  height: number;
  /** 描画倍率。PCでは 480/390 = 1.23 前後、実機では 1 未満になる。 */
  scale: number;
}

function canvasMetrics(el: HTMLElement): CanvasMetrics | null {
  const rect = el.getBoundingClientRect();
  // offsetWidth は zoom の内側＝キャンバス座標で返る。rect はズーム後の実寸。
  // この比が描画倍率になる。`.lp-canvas` を持たない既存LPでは 1 になる。
  const width = el.offsetWidth || rect.width;
  const height = Math.max(el.offsetHeight, el.scrollHeight);
  if (!width || !height || !rect.width) return null;
  return { rect, width, height, scale: rect.width / width };
}

/** 押された要素の文字。入力値は絶対に拾わない。 */
function labelOf(target: EventTarget | null): string | undefined {
  if (!(target instanceof Element)) return undefined;
  const el = target.closest(CLICKABLE);
  if (!el) return undefined;

  const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
  if (text) return text.slice(0, 60);

  const aria = el.getAttribute("aria-label")?.trim();
  if (aria) return aria.slice(0, 60);

  if (el instanceof HTMLAnchorElement) {
    const href = el.getAttribute("href") ?? "";
    if (href.startsWith("tel:")) return "電話リンク";
    if (href.includes("line.me")) return "LINEリンク";
  }
  return el.tagName.toLowerCase();
}

/** セッション識別子。タブを閉じれば消える。Cookieは使わない。 */
function sessionKeyFor(slug: string): string {
  const storageKey = `hm:${slug}`;
  const fresh =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  try {
    const saved = sessionStorage.getItem(storageKey);
    if (saved) return saved;
    sessionStorage.setItem(storageKey, fresh);
  } catch {
    // プライベートモードなどで sessionStorage が使えない場合は、
    // このページビュー限りの識別子として使う（再送が別セッションになるだけ）。
  }
  return fresh;
}

export interface HeatmapTrackerProps {
  clientSlug: string;
  /** `clients.heatmap_enabled`。false なら何もしない。 */
  enabled: boolean;
}

export default function HeatmapTracker({ clientSlug, enabled }: HeatmapTrackerProps) {
  useEffect(() => {
    if (!enabled || !HAS_SUPABASE) return;
    // ブラウザの「追跡しない」設定は尊重する。
    if (typeof navigator !== "undefined" && navigator.doNotTrack === "1") return;
    // iframe の中では計測しない。ダッシュボードのヒートマップ画面がLPを
    // iframe で表示するので、これが無いと自分の閲覧が混ざる。
    if (window.top !== window.self) return;

    const sessionKey = sessionKeyFor(clientSlug);
    const endpoint = `${SUPABASE_URL}/rest/v1/rpc/record_heatmap`;

    let pending: PendingClick[] = [];
    let maxScroll = 0;
    let sentScroll = -1;
    let dwellMs = 0;
    let visibleSince = document.visibilityState === "visible" ? Date.now() : 0;
    let scrollQueued = false;

    const currentDwell = () =>
      Math.round(dwellMs + (visibleSince ? Date.now() - visibleSince : 0));

    const flush = (final: boolean) => {
      const el = canvasElement();
      const metrics = el ? canvasMetrics(el) : null;
      if (!metrics) return;
      // 送るものが無い通常フラッシュは黙って見送る。
      if (!final && !pending.length && maxScroll === sentScroll) return;

      const clicks = pending.slice(0, MAX_CLICKS_PER_FLUSH);
      pending = pending.slice(clicks.length);

      const body = JSON.stringify({
        p_slug: clientSlug,
        p_session_key: sessionKey,
        p_device: heatmapDeviceOf(window.innerWidth),
        p_viewport_w: Math.round(window.innerWidth),
        p_viewport_h: Math.round(window.innerHeight),
        p_canvas_width_px: Math.round(metrics.width),
        p_page_height_px: Math.round(metrics.height),
        p_max_scroll_px: maxScroll,
        p_dwell_ms: currentDwell(),
        p_utm: readUtm(),
        p_referrer: document.referrer || null,
        p_clicks: clicks,
      });

      sentScroll = maxScroll;

      // keepalive を付けると離脱中でも送り切れる（sendBeacon と違って
      // apikey ヘッダを付けられるのでこちらを使う）。
      // 失敗したぶんは捨てる。ヒートマップは母数で見るので取りこぼしは許容する。
      void fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body,
        keepalive: true,
      }).catch(() => {});
    };

    const onClick = (e: MouseEvent) => {
      const el = canvasElement();
      const metrics = el ? canvasMetrics(el) : null;
      if (!metrics) return;
      const { rect, width, scale } = metrics;
      if (!scale) return;

      const x = (e.clientX - rect.left) / scale / width;
      const y = (e.clientY - rect.top) / scale;
      if (x < 0 || x > 1 || y < 0) return;

      // sticky なヘッダー／追従CTA、および横スクロールするカルーセルの中身は
      // 「押した時に指があった位置」で記録される（DOM上の位置ではない）。
      // 何枚目のスライドを押したかは座標からは分からないので、
      // どのボタンが押されたかは label 側＝押された要素ランキングで読む。
      pending.push({
        x: Number(x.toFixed(5)),
        y: Math.round(y),
        l: labelOf(e.target),
      });
    };

    const measureScroll = () => {
      scrollQueued = false;
      const el = canvasElement();
      const metrics = el ? canvasMetrics(el) : null;
      if (!metrics) return;
      const { rect, height, scale } = metrics;
      if (!scale) return;
      // rect.top はスクロールで動くので、これだけで「キャンバス上端から
      // 画面下端まで」の距離が出る。
      const reached = (window.innerHeight - rect.top) / scale;
      maxScroll = Math.max(maxScroll, Math.min(Math.round(reached), Math.round(height)));
    };

    const onScroll = () => {
      if (scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(measureScroll);
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        if (visibleSince) {
          dwellMs += Date.now() - visibleSince;
          visibleSince = 0;
        }
        flush(true);
      } else if (!visibleSince) {
        visibleSince = Date.now();
      }
    };

    const onPageHide = () => flush(true);

    measureScroll();
    document.addEventListener("click", onClick, { capture: true, passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);

    const initial = window.setTimeout(() => flush(true), INITIAL_FLUSH_MS);
    const interval = window.setInterval(() => flush(false), FLUSH_INTERVAL_MS);

    return () => {
      window.clearTimeout(initial);
      window.clearInterval(interval);
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      flush(true);
    };
  }, [clientSlug, enabled]);

  return null;
}
