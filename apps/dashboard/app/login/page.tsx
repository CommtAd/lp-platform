import { login } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <h1 className="mb-1 text-xl font-semibold text-navy">LP Platform</h1>
      <p className="mb-6 text-sm text-neutral-500">ダッシュボードにログイン</p>

      {error ? (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      ) : null}

      <form action={login} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            メールアドレス
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-navy"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            パスワード
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-navy"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-navy px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          ログイン
        </button>
      </form>
    </main>
  );
}
