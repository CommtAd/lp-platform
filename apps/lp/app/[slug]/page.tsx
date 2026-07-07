import { notFound } from "next/navigation";
import { clientRegistry, clientSlugs } from "@/clients/registry";

export function generateStaticParams() {
  return clientSlugs.map((slug) => ({ slug }));
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
