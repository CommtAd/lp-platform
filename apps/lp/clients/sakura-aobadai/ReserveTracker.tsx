"use client";

import { useEffect } from "react";

interface ReserveTrackerProps {
  /** 予約ページのURL。これで始まるリンクのクリックだけを拾う。 */
  reserveUrl: string;
  /** 現在のABの組み合わせ。クリックごとに一緒に送る。 */
  ab: { fv: string; hero: string; cta: string };
}

/**
 * 予約CTAのクリック計測。CVはハコモノ側で完了するため、LP側で取れるのは
 * 「予約ページへの遷移」まで。ページ内の全予約リンク（追従フッター含む）を
 * document のクリックで拾い、GTM / Meta Pixel に送る。
 *
 *   dataLayer: { event: "reserve_click", cta_position, ab_fv, ab_hero, ab_cta }
 *   fbq:       trackCustom "ReserveClick"（同じパラメータ）
 *
 * cta_position はリンクの data-cta 属性（無ければ "sticky" = 追従フッター）。
 * いずれも撃ちっぱなしで、遷移は止めない。予約完了（Schedule 等）の計測は
 * ハコモノ側のタグ設定が必要で、このLPの責務外。
 */
export default function ReserveTracker({ reserveUrl, ab }: ReserveTrackerProps) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a");
      if (!link || !link.href.startsWith(reserveUrl)) return;
      const params = {
        cta_position: link.dataset.cta ?? "sticky",
        ab_fv: ab.fv,
        ab_hero: ab.hero,
        ab_cta: ab.cta,
      };
      const w = window as unknown as {
        dataLayer?: unknown[];
        fbq?: (...a: unknown[]) => void;
      };
      (w.dataLayer ??= []).push({ event: "reserve_click", ...params });
      if (typeof w.fbq === "function") w.fbq("trackCustom", "ReserveClick", params);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [reserveUrl, ab.fv, ab.hero, ab.cta]);

  return null;
}
