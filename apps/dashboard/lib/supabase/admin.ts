// このモジュールはサーバー専用。クライアントコンポーネントから import すると
// ビルドが落ちる（service_role キーがブラウザへ漏れる事故を型レベルで止める）。
import "server-only";

import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from "@/lib/env";

/**
 * service_role キーが環境変数に入っているか。
 * 未設定なら Auth ユーザーの作成・削除はできないので、画面側で機能を無効化する。
 */
export function isAdminApiConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * service_role キーを使う Supabase クライアント。**RLSを全てバイパスする。**
 *
 * 使うのはメンバー管理（Auth ユーザーの一覧・作成・削除）だけ。
 * clients / submissions の読み書きは従来どおり `lib/supabase/server.ts` の
 * anon キー + RLS 経由で行う（0010 の「認証済みなら全件操作可」を変えないため）。
 *
 * 呼ぶ前に必ず `isAdminApiConfigured()` を確認すること。
 */
export function createAdminClient(): SupabaseClient {
  if (!isAdminApiConfigured()) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  return createSupabaseClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
