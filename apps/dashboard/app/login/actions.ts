"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * OAuth のコールバック先に使う自分自身のオリジン。
 *
 * リクエストヘッダーから組む。環境変数に焼くと Vercel のプレビュー環境
 * （デプロイごとにURLが変わる）でログインできなくなる。
 */
async function siteOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3001";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

/**
 * Google でログインする。ダッシュボードの唯一のログイン手段。
 *
 * 「管理者が事前に登録したメールアドレスの人だけ入れる」は Supabase 側の
 * 設定（Authentication → Allow new users to sign up を OFF）で成立する。
 * 未登録のメールアドレスで来た人は Supabase Auth が新規作成を拒否し、
 * `/auth/callback` に `error_code=signup_disabled` で戻ってくる。
 * アプリ側で許可リストを突き合わせているのではない点に注意（＝コードの
 * バグで穴が開かない）。
 */
export async function signInWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${await siteOrigin()}/auth/callback`,
      // 常にアカウント選択を出す。複数のGoogleアカウントを使い分けている人が
      // 意図しないアカウントで入って「登録されていません」になるのを防ぐ。
      queryParams: { prompt: "select_account" },
    },
  });

  if (error || !data.url) {
    redirect(`/login?error=${encodeURIComponent("Googleログインを開始できませんでした")}`);
  }

  redirect(data.url);
}

export async function signout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
