import Link from "next/link";
import { createClientRecord } from "../actions";

export default async function NewClientPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto max-w-md px-6 py-10">
      <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-800">
        ← 一覧に戻る
      </Link>
      <h1 className="mb-6 mt-4 text-xl font-semibold text-navy">顧客LPを新規作成</h1>

      {error ? (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      ) : null}

      <form action={createClientRecord} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            表示名
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="THE PERSONAL PILATES 渋谷店"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-navy"
          />
        </div>
        <div>
          <label htmlFor="slug" className="mb-1 block text-sm font-medium">
            slug（URL）
          </label>
          <input
            id="slug"
            name="slug"
            required
            placeholder="the-personal-pilates"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-navy"
          />
          <p className="mt-1 text-xs text-neutral-500">
            英小文字・数字・ハイフンのみ。<code>apps/lp/clients/&#123;slug&#125;/</code> と一致させます。
          </p>
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-navy px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          作成する（下書き）
        </button>
      </form>
    </main>
  );
}
