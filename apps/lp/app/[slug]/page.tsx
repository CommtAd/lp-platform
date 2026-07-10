import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { clientMetaRegistry, clientRegistry, clientSlugs } from "@/clients/registry";

export function generateStaticParams() {
  return clientSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = clientMetaRegistry[slug];
  if (!entry) return {};
  const { meta } = (await entry()).default;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: meta.ogpImage ? [meta.ogpImage] : undefined,
    },
  };
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = clientRegistry[slug];
  if (!entry) notFound();
  const LP = (await entry()).default;
  return <LP />;
}
