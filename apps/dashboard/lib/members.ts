import "server-only";

import { INDUSTRIES, type Industry } from "@shared/index";
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
  /** 見られる業種。null = 制限なし（全業種）。 */
  industries: Industry[] | null;
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

/**
 * `members.industries` を型に落とす。
 * null / 未知の値 / 空配列はすべて「制限なし」に寄せる
 * （0041 未適用の環境でも全業種見える状態を保つため）。
 */
export function parseIndustries(raw: unknown): Industry[] | null {
  if (!Array.isArray(raw)) return null;
  const valid = raw.filter((v): v is Industry => (INDUSTRIES as string[]).includes(String(v)));
  return valid.length ? valid : null;
}

/** その業種を見られるか。RLS と同じ判定を画面側でも使う。 */
export function canAccessIndustry(
  allowed: Industry[] | null,
  industry: Industry | null | undefined,
): boolean {
  if (allowed === null) return true;
  return allowed.includes(industry ?? "fitness");
}

/** PostgREST が「テーブルが無い」を返したか（0040 未適用の判定）。 */
function isMissingTable(code: string | undefined): boolean {
  // 42P01 = undefined_table、PGRST205 = スキーマキャッシュに見つからない
  return code === "42P01" || code === "PGRST205";
}

/** PostgREST が「列が無い」を返したか（0041 未適用の判定）。 */
function isMissingColumn(code: string | undefined): boolean {
  // 42703 = undefined_column、PGRST204 = スキーマキャッシュに列が無い
  return code === "42703" || code === "PGRST204";
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
  /** 見られる業種。null = 制限なし。 */
  industries: Industry[] | null;
  migrationMissing: boolean;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { userId: null, email: null, role: null, industries: null, migrationMissing: false };
  }

  // industries は 0041 で足した列。未適用の環境では落ちるので、
  // 列が無いエラーのときは role だけで読み直す。
  let data: { role?: string; industries?: unknown } | null = null;
  let error = null as { code?: string } | null;

  const withIndustries = await supabase
    .from("members")
    .select("role, industries")
    .eq("user_id", user.id)
    .maybeSingle();

  if (withIndustries.error && isMissingColumn(withIndustries.error.code)) {
    const fallback = await supabase
      .from("members")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();
    data = fallback.data;
    error = fallback.error;
  } else {
    data = withIndustries.data;
    error = withIndustries.error;
  }

  if (error) {
    return {
      userId: user.id,
      email: user.email ?? null,
      role: null,
      industries: null,
      migrationMissing: isMissingTable(error.code),
    };
  }

  // 行が無い場合は member 扱い（トリガーが入る前に作られたユーザーの保険）。
  const role = (data?.role as MemberRole | undefined) ?? "member";
  return {
    userId: user.id,
    email: user.email ?? null,
    role,
    industries: parseIndustries(data?.industries),
    migrationMissing: false,
  };
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

  // 0041 未適用の環境では industries 列が無いので、落ちたら role だけで読み直す。
  let roleRows: { user_id: string; role: string; industries?: unknown }[] = [];
  const withIndustries = await admin.from("members").select("user_id, role, industries");
  if (withIndustries.error) {
    const fallback = await admin.from("members").select("user_id, role");
    roleRows = (fallback.data ?? []) as typeof roleRows;
  } else {
    roleRows = (withIndustries.data ?? []) as typeof roleRows;
  }

  const roleOf = new Map<string, MemberRole>(
    roleRows.map((r) => [r.user_id, r.role as MemberRole]),
  );
  const industriesOf = new Map<string, Industry[] | null>(
    roleRows.map((r) => [r.user_id, parseIndustries(r.industries)]),
  );

  return data.users
    .map((u) => ({
      userId: u.id,
      email: u.email ?? "(メールアドレス未設定)",
      // members 行が無いユーザーは member 扱い（0040 のトリガー導入前の取りこぼし）。
      role: roleOf.get(u.id) ?? "member",
      industries: industriesOf.get(u.id) ?? null,
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
