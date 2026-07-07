import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signout } from "./login/actions";
import type { ClientRecord } from "@shared/index";

const STATUS_LABEL: Record<string, string> = {
  draft: "下書き",
  published: "公開中",
  unpublished: "非公開",
};

const STATUS_STYLE: Record<string, string> = {
  draft: "bg-neutral-100 text-neutral-600",
  published: "bg-green-100 text-green-700",
  unpublished: "bg-amber-100 text-amber-700",
};

export default async function HomePage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clients")
    .select("id, slug, name, status, meta_pixel_id, commitad_client_id")
    .order("created_at", { ascending: false });

  const clients = (data ?? []) as Pick<
    ClientRecord,
    "id" | "slug" | "name" | "status" | "meta_pixel_id" | "commitad_client_id"
  >[];

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-navy">顧客LP一覧</h1>
          <p className="text-sm text-neutral-500">自分が担当する顧客のみ表示されます</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/new"
            className="rounded-md bg-navy px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            新規作成
          </Link>
          <form action={signout}>
            <button className="text-sm text-neutral-500 hover:text-neutral-800">ログアウト</button>
          </form>
        </div>
      </header>

      {error ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          読み込みに失敗しました
        </p>
      ) : clients.length === 0 ? (
        <p className="rounded-md border border-dashed border-neutral-300 px-4 py-10 text-center text-sm text-neutral-500">
          担当顧客がまだありません。「新規作成」から追加してください。
        </p>
      ) : (
        <ul className="divide-y divide-neutral-200 overflow-hidden rounded-lg border border-neutral-200 bg-white">
          {clients.map((c) => (
            <li key={c.id}>
              <Link
                href={`/clients/${c.id}`}
                className="flex items-center justify-between px-4 py-4 transition hover:bg-neutral-50"
              >
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-neutral-500">
                    /{c.slug}
                    {c.meta_pixel_id ? " · Pixel設定済" : " · Pixel未設定"}
                    {c.commitad_client_id ? " · CommitAd連携済" : ""}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[c.status]}`}
                >
                  {STATUS_LABEL[c.status]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
