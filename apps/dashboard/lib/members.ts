import "server-only";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient, isAdminApiConfigured } from "@/lib/supabase/admin";

export type MemberRole = "admin" | "member";

export const ROLE_LABEL: Record<MemberRole, string> = {
  admin: "管理者",
  member: "メンバー",
};

/** 一覧1行ぶん。Auth 側（メール・ログイン日時）と members 側（ロール）を合わせたもの。 */
export type MemberRow = {
  userId: string;
  email: string;
  role: MemberRole;
  createdAt: string;
  lastSignInAt: string | null;
  isSelf: boolean;
};

/**
 * メンバー管理画面を使えない理由。
 * - `service-role-missing`: Vercel に `SUPABASE_SERVICE_ROLE_KEY` が入っていない
 * - `migration-missing`: `supabase/migrations/0040` が本番に適用されていない
 * - `not-admin`: ログイン中の人が管理者ではない
 */
export type MemberAccessDenial = "service-role-missing" | "migration-missing" | "not-admin";

export type MemberAccess =
  | { ok: true; userId: string; email: string }
  | { ok: false; reason: MemberAccessDenial; role: MemberRole | null };

/** PostgREST が「テーブルが無い」を返したか（0040 未適用の判定）。 */
function isMissingTable(code: string | undefined): boolean {
  // 42P01 = undefined_table、PGRST205 = スキーマキャッシュに見つからない
  return code === "42P01" || code === "PGRST205";
}

/**
 * ログイン中ユーザーのロール。
 *
 * anon キー + RLS（`members_team_select`）で読む。ここで service_role を
 * 使わないのが設計の要点で、「自分は管理者か」の判定だけなら特権鍵が不要になる。
 * 0040 未適用のときは null を返す。
 */
export async function currentMemberRole(): Promise<{
  userId: string | null;
  email: string | null;
  role: MemberRole | null;
  migrationMissing: boolean;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { userId: null, email: null, role: null, migrationMissing: false };

  const { data, error } = await supabase
    .from("members")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    return {
      userId: user.id,
      email: user.email ?? null,
      role: null,
      migrationMissing: isMissingTable(error.code),
    };
  }

  // 行が無い場合は member 扱い（トリガーが入る前に作られたユーザーの保険）。
  const role = (data?.role as MemberRole | undefined) ?? "member";
  return { userId: user.id, email: user.email ?? null, role, migrationMissing: false };
}

/**
 * メンバー管理の操作が許されているか。画面と server action の両方で必ず通す。
 *
 * **server action 側のチェックを省略しないこと。** 画面でボタンを隠すだけでは、
 * Server Action のエンドポイントを直接叩かれると通ってしまう。
 */
export async function checkMemberAccess(): Promise<MemberAccess> {
  if (!isAdminApiConfigured()) {
    const { role } = await currentMemberRole();
    return { ok: false, reason: "service-role-missing", role };
  }

  const { userId, email, role, migrationMissing } = await currentMemberRole();
  if (migrationMissing) return { ok: false, reason: "migration-missing", role: null };
  if (!userId) return { ok: false, reason: "not-admin", role: null };
  if (role !== "admin") return { ok: false, reason: "not-admin", role };

  return { ok: true, userId, email: email ?? "" };
}

/** 一覧に出す上限。営業チームの人数なので1ページで足りる。 */
const LIST_PER_PAGE = 200;

/**
 * メンバー一覧。メール・作成日・最終ログインは `auth.users`（service_role 必須）、
 * ロールは `public.members` から取り、user_id で突き合わせる。
 */
export async function listMembers(selfId: string): Promise<MemberRow[] | null> {
  const admin = createAdminClient();

  const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: LIST_PER_PAGE });
  if (error || !data) return null;

  const { data: roleRows } = await admin.from("members").select("user_id, role");
  const roleOf = new Map<string, MemberRole>(
    (roleRows ?? []).map((r) => [r.user_id as string, r.role as MemberRole]),
  );

  return data.users
    .map((u) => ({
      userId: u.id,
      email: u.email ?? "(メールアドレス未設定)",
      // members 行が無いユーザーは member 扱い（0040 のトリガー導入前の取りこぼし）。
      role: roleOf.get(u.id) ?? "member",
      createdAt: u.created_at,
      lastSignInAt: u.last_sign_in_at ?? null,
      isSelf: u.id === selfId,
    }))
    .sort((a, b) => {
      // 管理者を上に、その中はメール順。
      if (a.role !== b.role) return a.role === "admin" ? -1 : 1;
      return a.email.localeCompare(b.email);
    });
}
