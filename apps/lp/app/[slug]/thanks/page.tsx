import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { clientMetaRegistry, clientThanksRegistry } from "@/clients/registry";

/**
 * サンクスページのタイトル。LP本体と同じ `meta` を使い、末尾に画面名を足す。
 * これを付けないと `app/layout.tsx` の既定値（"LP Platform"）がそのまま出る。
 * noindex なので検索には出ないが、タブ・履歴・ブックマークには残る。
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = clientMetaRegistry[slug];
  if (!entry) return {};
  const { meta } = (await entry()).default;
  return { title: `送信完了｜${meta.title}` };
}

export default async function ThanksPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = clientThanksRegistry[slug];
  if (!entry) notFound();
  const Thanks = (await entry()).default;
  return <Thanks />;
}
