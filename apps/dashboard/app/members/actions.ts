"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkMemberAccess, type MemberRole } from "@/lib/members";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function back(params: { error?: string; notice?: string }): never {
  const q = new URLSearchParams();
  if (params.error) q.set("error", params.error);
  if (params.notice) q.set("notice", params.notice);
  const qs = q.toString();
  redirect(`/members${qs ? `?${qs}` : ""}`);
}

/**
 * 操作前のゲート。**全ての server action の先頭で呼ぶ。**
 * 画面でボタンを隠すだけでは Server Action を直接叩かれると通ってしまう。
 */
async function requireAdmin(): Promise<{ userId: string }> {
  const access = await checkMemberAccess();
  if (!access.ok) {
    const messages = {
      "service-role-missing": "service_role キーが未設定のため実行できません",
      "migration-missing": "マイグレーション0040が未適用のため実行できません",
      "not-admin": "この操作は管理者のみ実行できます",
    } as const;
    back({ error: messages[access.reason] });
  }
  return { userId: access.userId };
}

function readRole(formData: FormData): MemberRole {
  return String(formData.get("role") ?? "") === "admin" ? "admin" : "member";
}

/**
 * メンバーを追加する。登録するのは**メールアドレスだけ**。
 *
 * パスワードは作らない。ログインはGoogleのみで、本人がGoogleで入ってきた
 * ときに Supabase Auth が「同じメールアドレスの既存ユーザー」へ
 * Google の認証情報を自動で紐づける（automatic identity linking）。
 *
 * 逆に、ここに登録されていないメールアドレスでGoogleログインしてきた人は
 * Supabase の「Allow new users to sign up」が OFF であるため新規作成が拒否される。
 * つまり**この一覧が実質の許可リスト**になる。
 */
export async function addMember(formData: FormData) {
  await requireAdmin();

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const role = readRole(formData);

  if (!EMAIL_RE.test(email)) back({ error: "メールアドレスの形式が正しくありません" });

  const admin = createAdminClient();

  // password を渡さない = パスワードログインできないユーザーになる。
  // email_confirm: true は確認メールを出さないために必須（メール送信経路に
  // 一切依存しないのがこの方式の利点なので、ここで送ってしまうと台無しになる）。
  const { data, error } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
  });

  if (error || !data.user) {
    const duplicate = /already|registered|exists/i.test(error?.message ?? "");
    back({
      error: duplicate
        ? "そのメールアドレスは既に登録されています"
        : "メンバーの追加に失敗しました",
    });
  }

  // 0040 のトリガーが members 行を role='member' で作る。
  // 管理者として追加する場合だけ上書きする（トリガーが未適用の環境でも
  // 行が無い状態にならないよう upsert にしておく）。
  const { error: roleError } = await admin
    .from("members")
    .upsert({ user_id: data.user.id, role }, { onConflict: "user_id" });

  if (roleError) {
    back({
      error: `ユーザーは作成しましたが、ロールの設定に失敗しました（${email} は現在メンバー権限です）`,
    });
  }

  revalidatePath("/members");
  back({
    notice: `${email} を追加しました。本人がこのメールアドレスのGoogleアカウントでログインできます。`,
  });
}

/** メンバーを削除する。自分自身は削除できない。 */
export async function removeMember(formData: FormData) {
  const { userId: selfId } = await requireAdmin();
  const targetId = String(formData.get("user_id") ?? "");

  if (!targetId) back({ error: "対象が指定されていません" });
  // 全管理者が消えてログインできる人がいなくなる事故を防ぐための最低線。
  // 自分を消せない限り、操作した本人が必ず管理者として残る。
  if (targetId === selfId) back({ error: "自分自身は削除できません" });

  const admin = createAdminClient();
  const { data: target } = await admin.auth.admin.getUserById(targetId);
  const { error } = await admin.auth.admin.deleteUser(targetId);

  if (error) back({ error: "削除に失敗しました" });

  // members 行は auth.users への FK（on delete cascade）で一緒に消える。
  // 消した時点でそのメールアドレスは許可リストから外れるので、
  // 以降はGoogleログインしても Supabase が拒否する。
  revalidatePath("/members");
  back({ notice: `${target?.user?.email ?? "メンバー"} を削除しました` });
}

/** ロールを切り替える。自分自身の管理者権限は外せない。 */
export async function setMemberRole(formData: FormData) {
  const { userId: selfId } = await requireAdmin();
  const targetId = String(formData.get("user_id") ?? "");
  const role = readRole(formData);

  if (!targetId) back({ error: "対象が指定されていません" });
  if (targetId === selfId && role !== "admin") {
    back({ error: "自分自身の管理者権限は外せません" });
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("members")
    .upsert({ user_id: targetId, role }, { onConflict: "user_id" });

  if (error) back({ error: "ロールの変更に失敗しました" });

  revalidatePath("/members");
  back({ notice: role === "admin" ? "管理者にしました" : "メンバー権限にしました" });
}
