import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { setPublishState, updateClientRecord } from "../../actions";
import type { ClientRecord } from "@shared/index";

const STATUS_LABEL: Record<string, string> = {
  draft: "下書き",
  published: "公開中",
  unpublished: "非公開",
};

export default async function ClientDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const { id } = await params;
  const { error: errMsg, saved } = await searchParams;

  const supabase = await createClient();
  const { data } = await supabase.from("clients").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const client = data as ClientRecord;

  const update = updateClientRecord.bind(null, client.id);
  const publish = setPublishState.bind(null, client.id, "published");
  const unpublish = setPublishState.bind(null, client.id, "unpublished");

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-800">
        ← 一覧に戻る
      </Link>

      <div className="mb-6 mt-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-navy">{client.name}</h1>
          <p className="text-sm text-neutral-500">/{client.slug}</p>
        </div>
        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
          {STATUS_LABEL[client.status]}
        </span>
      </div>

      {saved ? (
        <p className="mb-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
          保存しました
        </p>
      ) : null}
      {errMsg ? (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{errMsg}</p>
      ) : null}

      {/* 公開状態の切替 */}
      <section className="mb-8 rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="mb-1 text-sm font-semibold">公開状態</h2>
        <p className="mb-4 text-xs text-neutral-500">
          切替時に Vercel Deploy Hook が発火し、LPサイトが再ビルドされます。
        </p>
        <div className="flex gap-3">
          {client.status === "published" ? (
            <form action={unpublish}>
              <button className="rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-100">
                非公開にする
              </button>
            </form>
          ) : (
            <form action={publish}>
              <button className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">
                公開する
              </button>
            </form>
          )}
        </div>
      </section>

      {/* タグ・連携設定 */}
      <form action={update} className="space-y-6">
        <section className="rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold">基本情報</h2>
          <Field label="表示名" name="name" defaultValue={client.name} required />
        </section>

        <section className="space-y-4 rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold">計測タグ</h2>
          <Field
            label="Meta Pixel ID"
            name="meta_pixel_id"
            defaultValue={client.meta_pixel_id}
            placeholder="000000000000000"
          />
          <Field label="GA4 測定ID" name="ga4_id" defaultValue={client.ga4_id} placeholder="G-XXXXXXX" />
          <Field label="GTM ID" name="gtm_id" defaultValue={client.gtm_id} placeholder="GTM-XXXXXXX" />
          <Field label="LINEタグ ID" name="line_tag_id" defaultValue={client.line_tag_id} />
          <Field
            label="Meta ドメイン認証コード"
            name="meta_domain_verification"
            defaultValue={client.meta_domain_verification}
          />
        </section>

        <section className="space-y-3 rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold">CVイベント</h2>
          <Toggle label="フォーム送信" name="cv_form_submit" defaultChecked={client.cv_events?.form_submit} />
          <Toggle label="電話タップ" name="cv_tel_tap" defaultChecked={client.cv_events?.tel_tap} />
          <Toggle label="LINEタップ" name="cv_line_tap" defaultChecked={client.cv_events?.line_tap} />
        </section>

        <section className="rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold">CommitAd 連携</h2>
          <Field
            label="CommitAd クライアントID"
            name="commitad_client_id"
            defaultValue={client.commitad_client_id}
            placeholder="CV転送先の識別子"
          />
        </section>

        <button
          type="submit"
          className="w-full rounded-md bg-navy px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          設定を保存
        </button>
      </form>
    </main>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-navy"
      />
    </div>
  );
}

function Toggle({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked ?? false}
        className="h-4 w-4 rounded border-neutral-300 accent-navy"
      />
      {label}
    </label>
  );
}
