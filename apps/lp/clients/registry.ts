import type { ComponentType } from "react";

/**
 * Slug → LP module registry. Each client folder default-exports its page.
 * `app/[slug]/page.tsx` resolves the slug against this map.
 */
export const clientRegistry: Record<
  string,
  () => Promise<{ default: ComponentType }>
> = {
  "_base-a": () => import("./_base-a/page"),
  "the-personal-pilates": () => import("./the-personal-pilates/page"),
  "the-personal-gym": () => import("./the-personal-gym/page"),
  "beat-pilates-nagoyafushimi": () => import("./beat-pilates-nagoyafushimi/page"),
};

export const clientSlugs = Object.keys(clientRegistry);

interface ClientMeta {
  title: string;
  description: string;
  ogpImage?: string;
}

/**
 * Slug → config module registry, used only to read `meta` for
 * `generateMetadata` (page tab title / OGP). Kept separate from
 * clientRegistry so metadata resolution doesn't have to render the page.
 */
export const clientMetaRegistry: Record<
  string,
  () => Promise<{ default: { meta: ClientMeta } }>
> = {
  "_base-a": () => import("./_base-a/config"),
  "the-personal-pilates": () => import("./the-personal-pilates/config"),
  "the-personal-gym": () => import("./the-personal-gym/config"),
  "beat-pilates-nagoyafushimi": () => import("./beat-pilates-nagoyafushimi/config"),
};
