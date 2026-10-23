import Link from "next/link";
import { ROLE_LABEL, checkMemberAccess, listMembers, type MemberRow } from "@/lib/members";
import { INDUSTRY_LABEL } from "@shared/index";
import { addMember, removeMember, setMemberIndustries, setMemberRole } from "./actions";
import ConfirmButton from "./ConfirmButton";
import IndustryPicker from "./IndustryPicker";

/**
 * メンバー管理画面。
 *
 * ログインできる人（Supabase Auth ユーザー）の一覧・追加・削除をここで完結させる。
 * これまでは Supabase の管理コンソールを開いて手で作っていた。
 *
 * ログインはGoogleのみなので、登録するのはメールアドレスだけ。
 * **この一覧が実質の許可リスト**で、ここに無いメールアドレスのGoogleアカウントは
 * Supabase Auth 側で弾かれる（Allow new users to sign up が OFF）。
 *
 * 操作できるのは `members.role = 'admin'` の人だけ。clients / submissions の
 * 権限は 0010 のまま全員同じで、**絞っているのはメンバー管理の操作だけ**。
 */

const INPUT = "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-navy";
const PRIMARY = "rounded-md bg-navy px-4 py-2 text-sm font-medium text-white transition hover:opacity-90";
const GHOST = "rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40";

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-800">
        ← 一覧に戻る
      </Link>
      <h1 className="mb-6 mt-4 text-xl font-semibold text-navy">メンバー管理</h1>
      {children}
    </main>
  );
}

function Notice({ tone, children }: { tone: "error" | "info"; children: React.ReactNode }) {
  const style = tone === "error" ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-800";
  return <div className={`mb-4 rounded-md px-3 py-2 text-sm ${style}`}>{children}</div>;
}

function MemberList({ members }: { members: MemberRow[] }) {
  return (
    <ul className="divide-y divide-neutral-200 overflow-hidden rounded-lg border border-neutral-200 bg-white">
      {members.map((m) => (
        <li key={m.userId} className="px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-medium">
                {m.email}
                {m.isSelf ? (
                  <span className="ml-2 text-xs font-normal text-neutral-400">(自分)</span>
                ) : null}
              </p>
              <p className="mt-0.5 text-xs text-neutral-500">
                {m.lastSignInAt ? (
                  <>最終ログイン {formatDate(m.lastSignInAt)}</>
                ) : (
                  // 追加したが本人がまだGoogleで入っていない状態。
                  <span className="text-amber-700">まだログインしていません</span>
                )}
                {` · 追加 ${formatDate(m.createdAt)}`}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  m.role === "admin" ? "bg-navy/10 text-navy" : "bg-neutral-100 text-neutral-600"
                }`}
              >
                {ROLE_LABEL[m.role]}
              </span>
              <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-600">
                {m.industries === null
                  ? "全業種"
                  : m.industries.map((i) => INDUSTRY_LABEL[i]).join("・")}
              </span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <form action={setMemberRole}>
              <input type="hidden" name="user_id" value={m.userId} />
              <input type="hidden" name="role" value={m.role === "admin" ? "member" : "admin"} />
              <button
                type="submit"
                className={GHOST}
                // 自分の管理者権限を外せると、最後の管理者が消えてメンバー管理が
                // 誰からも触れなくなる。server action 側でも同じ条件で弾いている。
                disabled={m.isSelf && m.role === "admin"}
              >
                {m.role === "admin" ? "メンバーに戻す" : "管理者にする"}
              </button>
            </form>

            <details className="w-full">
              <summary className="inline-block cursor-pointer rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-700 transition hover:bg-neutral-50">
                業種を設定
              </summary>
              <form
                action={setMemberIndustries}
                className="mt-3 space-y-3 border-l-2 border-neutral-200 pl-4"
              >
                <input type="hidden" name="user_id" value={m.userId} />
                <IndustryPicker current={m.industries} idPrefix={m.userId} />
                <button type="submit" className={PRIMARY}>
                  保存する
                </button>
              </form>
            </details>

            {m.isSelf ? null : (
              <form action={removeMember}>
                <input type="hidden" name="user_id" value={m.userId} />
                <ConfirmButton
                  message={`${m.email} を削除します。ログインできなくなります。よろしいですか？`}
                  className="rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs text-red-600 transition hover:bg-red-50"
                >
                  削除
                </ConfirmButton>
              </form>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default async function MembersPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; notice?: string }>;
}) {
  const { error, notice } = await searchParams;
  const access = await checkMemberAccess();

  if (!access.ok) {
    return (
      <Shell>
        {access.reason === "service-role-missing" ? (
          <Notice tone="error">
            <p className="font-medium">メンバー管理は現在無効です</p>
            <p className="mt-1">
              Vercel のダッシュボードプロジェクトに環境変数{" "}
              <code className="rounded bg-white/60 px-1">SUPABASE_SERVICE_ROLE_KEY</code>{" "}
              を追加して再デプロイしてください。Auth ユーザーの作成・削除には
              service_role キーが必要です。
            </p>
          </Notice>
        ) : access.reason === "migration-missing" ? (
          <Notice tone="error">
            <p className="font-medium">メンバー管理は現在無効です</p>
            <p className="mt-1">
              <code className="rounded bg-white/60 px-1">
                supabase/migrations/0040_members_admin_role.sql
              </code>{" "}
              が未適用です。Supabase の SQL エディタで実行してください。
            </p>
          </Notice>
        ) : (
          <Notice tone="info">
            <p className="font-medium">この画面は管理者のみ操作できます</p>
            <p className="mt-1">
              現在のあなたの権限は「{access.role ? ROLE_LABEL[access.role] : "不明"}」です。
              メンバーの追加・削除が必要な場合は管理者に依頼してください。
            </p>
          </Notice>
        )}
      </Shell>
    );
  }

  const members = await listMembers(access.userId);

  return (
    <Shell>
      {error ? <Notice tone="error">{error}</Notice> : null}
      {notice ? <Notice tone="info">{notice}</Notice> : null}

      <p className="mb-6 text-sm leading-relaxed text-neutral-500">
        ここに載っているメールアドレスのGoogleアカウントだけがログインできます。
        「業種を設定」で担当業種を絞ると、その業種のLPとCVデータだけが見えるようになります
        （絞り込みはデータベース側で行っているので、画面を細工しても他業種は見えません）。
      </p>

      {members === null ? (
        <Notice tone="error">メンバー一覧の取得に失敗しました</Notice>
      ) : (
        <MemberList members={members} />
      )}

      <section className="mt-10 rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="mb-1 text-sm font-semibold">メンバーを追加</h2>
        <p className="mb-4 text-xs leading-relaxed text-neutral-500">
          本人が普段使っているGoogleアカウントのメールアドレスを登録してください。
          追加した時点でログインできます（招待メールは送られません。URLを伝えるだけで完了です）。
        </p>
        <form action={addMember} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Googleアカウントのメールアドレス
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="off"
              placeholder="sales@example.com"
              className={INPUT}
            />
            <p className="mt-1 text-xs text-neutral-500">
              本人がログインに使うアドレスと完全に一致している必要があります。
              別のアドレスだとログインできません。
            </p>
          </div>
          <IndustryPicker current={null} idPrefix="new-member" />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="role"
              value="admin"
              className="h-4 w-4 rounded border-neutral-300"
            />
            管理者にする（メンバーの追加・削除ができる）
          </label>
          <button type="submit" className={PRIMARY}>
            追加する
          </button>
        </form>
      </section>
    </Shell>
  );
}
