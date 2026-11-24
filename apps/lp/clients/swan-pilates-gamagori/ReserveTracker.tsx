"use client";

import { useEffect } from "react";

interface ReserveTrackerProps {
  /** 予約ページのURL。これで始まるリンクのクリックだけを拾う。 */
  reserveUrl: string;
}

/**
 * 予約CTAのクリック計測（sakura-aobadai の ReserveTracker と同じ方式）。
 * CVは hacomono 側で完了するため、LP側で取れるのは「予約ページへの遷移」まで。
 * ページ内の全予約リンク（追従フッター含む）を document のクリックで拾い、
 * GTM / Meta Pixel に送る。タグ自体は LPShell がダッシュボードの設定から注入する。
 *
 *   dataLayer: { event: "reserve_click", cta_position }
 *   fbq:       trackCustom "ReserveClick" { cta_position }
 *
 * cta_position はリンクの data-cta 属性（無ければ "sticky" = 追従フッター）。
 * 撃ちっぱなしで、遷移は止めない。
 */
export default function ReserveTracker({ reserveUrl }: ReserveTrackerProps) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a");
      if (!link || !link.href.startsWith(reserveUrl)) return;
      const params = { cta_position: link.dataset.cta ?? "sticky" };
      const w = window as unknown as {
        dataLayer?: unknown[];
        fbq?: (...a: unknown[]) => void;
      };
      (w.dataLayer ??= []).push({ event: "reserve_click", ...params });
      if (typeof w.fbq === "function") w.fbq("trackCustom", "ReserveClick", params);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [reserveUrl]);

  return null;
}
