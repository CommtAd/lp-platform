import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Google ログインの戻り先。
 *
 * Supabase が付けてくる認可コードをセッションに交換する。
 * **middleware でこのパスを素通りさせること**（`/login` 以外を未ログイン扱いで
 * リダイレクトする作りなので、例外を入れないとコードを交換する前に
 * `/login` へ飛ばされ、永久にログインできない）。
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const code = url.searchParams.get("code");

  // Supabase 側で弾かれた場合はコードではなくエラーが載って戻ってくる。
  const error = url.searchParams.get("error");
  const errorCode = url.searchParams.get("error_code");

  if (error || !code) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(loginErrorMessage(errorCode, error))}`, url.origin),
    );
  }

  const supabase = await createClient();
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent("ログインの確立に失敗しました")}`, url.origin),
    );
  }

  return NextResponse.redirect(new URL("/", url.origin));
}

/** Supabase から返るエラーを、何をすればよいか分かる日本語にする。 */
function loginErrorMessage(errorCode: string | null, error: string | null): string {
  // 未登録のメールアドレスで入ろうとした場合。
  // Supabase の「Allow new users to sign up」が OFF のとき新規作成が拒否される。
  if (errorCode === "signup_disabled") {
    return "このメールアドレスは登録されていません。管理者にメンバー追加を依頼してください。";
  }
  if (error === "access_denied") {
    return "Googleログインがキャンセルされました";
  }
  return "Googleログインに失敗しました";
}
