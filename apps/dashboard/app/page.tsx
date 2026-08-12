import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signout } from "./login/actions";
import {
  INDUSTRIES,
  INDUSTRY_LABEL,
  publicLpUrl,
  type ClientRecord,
  type Industry,
} from "@shared/index";

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

/** `?industry=` の値。未指定・不正値は「すべて」扱い。 */
function readTab(raw?: string): Industry | "all" {
  return (INDUSTRIES as string[]).includes(raw ?? "") ? (raw as Industry) : "all";
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string }>;
}) {
  const tab = readTab((await searchParams).industry);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clients")
    .select("id, slug, name, status, industry, custom_domain, meta_pixel_id, commitad_client_id")
    .order("created_at", { ascending: false });

  const all = (data ?? []) as Pick<
    ClientRecord,
    | "id"
    | "slug"
    | "name"
    | "status"
    | "industry"
    | "custom_domain"
    | "meta_pixel_id"
    | "commitad_client_id"
  >[];

  // 0015 以前に作られた行は industry が入っていない可能性があるため fitness に寄せる。
  const industryOf = (c: (typeof all)[number]): Industry => c.industry ?? "fitness";
  const clients = tab === "all" ? all : all.filter((c) => industryOf(c) === tab);

  const tabs: { key: Industry | "all"; label: string; count: number }[] = [
    { key: "all", label: "すべて", count: all.length },
    ...INDUSTRIES.map((key) => ({
      key,
      label: INDUSTRY_LABEL[key],
      count: all.filter((c) => industryOf(c) === key).length,
    })),
  ];

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="mb-6 flex items-center justify-between">
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

      <nav className="mb-6 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const active = t.key === tab;
          return (
            <Link
              key={t.key}
              href={t.key === "all" ? "/" : `/?industry=${t.key}`}
              className={`rounded-full px-3.5 py-1.5 text-sm transition ${
                active
                  ? "bg-navy font-medium text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {t.label}
              <span className={active ? "ml-1.5 text-white/70" : "ml-1.5 text-neutral-400"}>
                {t.count}
              </span>
            </Link>
          );
        })}
      </nav>

      {error ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          読み込みに失敗しました
        </p>
      ) : clients.length === 0 ? (
        <p className="rounded-md border border-dashed border-neutral-300 px-4 py-10 text-center text-sm text-neutral-500">
          {tab === "all"
            ? "担当顧客がまだありません。「新規作成」から追加してください。"
            : `${INDUSTRY_LABEL[tab]}のLPはまだありません。`}
        </p>
      ) : (
        <ul className="divide-y divide-neutral-200 overflow-hidden rounded-lg border border-neutral-200 bg-white">
          {clients.map((c) => (
            // 行全体は詳細へのリンク。公開ページへのリンクは入れ子にできないので
            // 兄弟要素として並べる。
            <li key={c.id} className="flex items-center transition hover:bg-neutral-50">
              <Link href={`/clients/${c.id}`} className="min-w-0 flex-1 px-4 py-4">
                <p className="font-medium">{c.name}</p>
                <p className="text-xs text-neutral-500">
                  /{c.slug}
                  {` · ${INDUSTRY_LABEL[industryOf(c)]}`}
                  {c.meta_pixel_id ? " · Pixel設定済" : " · Pixel未設定"}
                  {c.commitad_client_id ? " · CommitAd連携済" : ""}
                </p>
              </Link>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[c.status]}`}
              >
                {STATUS_LABEL[c.status]}
              </span>
              <a
                href={publicLpUrl({ ...c, industry: industryOf(c) })}
                target="_blank"
                rel="noreferrer"
                title="公開ページを開く"
                className="shrink-0 px-4 py-4 text-sm text-neutral-400 transition hover:text-navy"
              >
                ↗
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
