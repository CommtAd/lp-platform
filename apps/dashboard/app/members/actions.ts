"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { checkMemberAccess, type MemberRole } from "@/lib/members";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 初期パスワードの最低長。Supabase の既定(6)より厳しくしている。 */
const MIN_PASSWORD_LENGTH = 12;

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
 * メンバーを追加する。
 *
 * `inviteUserByEmail`（招待メール）ではなく `admin.createUser` +
 * 初期パスワード手渡しを採る。理由は PR 本文に記載。要点は、Supabase の
 * 既定メール送信が本番非推奨でレート制限も厳しく、カスタムSMTPを立てていない
 * 現状では「招待メールが届かない」という一番気づきにくい失敗をするため。
 */
export async function addMember(formData: FormData) {
  await requireAdmin();

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const role = readRole(formData);

  if (!EMAIL_RE.test(email)) back({ error: "メールアドレスの形式が正しくありません" });
  if (password.length < MIN_PASSWORD_LENGTH) {
    back({ error: `初期パスワードは${MIN_PASSWORD_LENGTH}文字以上にしてください` });
  }

  const admin = createAdminClient();

  // email_confirm: true = 確認メールを待たずにそのままログインできる状態で作る。
  // メール送信に依存しないのがこの方式を選んだ理由なので、ここは必須。
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error || !data.user) {
    const duplicate = /already|registered|exists/i.test(error?.message ?? "");
    back({
      error: duplicate
        ? "そのメールアドレスのユーザーは既に存在します"
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
  back({ notice: `${email} を追加しました。初期パスワードを本人に伝えてください。` });
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

/**
 * メンバーのパスワードを再発行する。
 *
 * カスタムSMTPを立てていないので「パスワードを忘れた」のメール復旧が使えない。
 * 管理者が新しいパスワードを発行して本人に渡す運用で代替する。
 */
export async function resetMemberPassword(formData: FormData) {
  await requireAdmin();
  const targetId = String(formData.get("user_id") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!targetId) back({ error: "対象が指定されていません" });
  if (password.length < MIN_PASSWORD_LENGTH) {
    back({ error: `パスワードは${MIN_PASSWORD_LENGTH}文字以上にしてください` });
  }

  const admin = createAdminClient();
  const { data: target } = await admin.auth.admin.getUserById(targetId);
  const { error } = await admin.auth.admin.updateUserById(targetId, { password });

  if (error) back({ error: "パスワードの再発行に失敗しました" });

  back({
    notice: `${target?.user?.email ?? "メンバー"} のパスワードを再発行しました。本人に伝えてください。`,
  });
}

/**
 * 自分のパスワードを変更する。管理者でなくても使える。
 *
 * 初期パスワードは管理者が決めるため、受け取った本人が差し替えられる口を
 * 必ず用意しておく必要がある。service_role は使わず自分のセッションで更新する。
 */
export async function changeOwnPassword(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (password.length < MIN_PASSWORD_LENGTH) {
    back({ error: `パスワードは${MIN_PASSWORD_LENGTH}文字以上にしてください` });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.auth.updateUser({ password });
  if (error) back({ error: "パスワードの変更に失敗しました" });

  back({ notice: "自分のパスワードを変更しました" });
}
