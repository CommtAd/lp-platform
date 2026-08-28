"use client";

import { createContext, useContext } from "react";
import type { MetaCvEvent } from "@shared/index";

/**
 * フォーム送信成功時に送る Meta ピクセルのイベント名を LPForm へ渡すための context。
 *
 * LPForm は各LPの page.tsx が直接置いているので、素直に prop で渡すと 20 本以上ある
 * page.tsx をすべて書き換えることになる（テンプレとの同一性も崩れる）。
 * LPShell が children ごと包む形にすれば、LP 側は何も知らなくてよい。
 *
 * 既定は "Lead"。Supabase 未接続のローカル開発でもフォームが動くようにするため、
 * provider が無くても例外にはしない。
 */
const CvEventContext = createContext<MetaCvEvent>("Lead");

export function CvEventProvider({
  value,
  children,
}: {
  value: MetaCvEvent;
  children: React.ReactNode;
}) {
  return <CvEventContext.Provider value={value}>{children}</CvEventContext.Provider>;
}

export function useCvEvent(): MetaCvEvent {
  return useContext(CvEventContext);
}
