import { notFound } from "next/navigation";
import { clientThanksRegistry } from "@/clients/registry";

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
