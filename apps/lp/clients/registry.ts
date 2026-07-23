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
  "_base-b": () => import("./_base-b/page"),
  "kaigyo-support": () => import("./kaigyo-support/page"),
  "the-personal-pilates": () => import("./the-personal-pilates/page"),
  "the-personal-gym": () => import("./the-personal-gym/page"),
  "beat-pilates-nagoyafushimi": () => import("./beat-pilates-nagoyafushimi/page"),
  "days-pilates": () => import("./days-pilates/page"),
  "soelu-togoshiginza": () => import("./soelu-togoshiginza/page"),
  "demo01": () => import("./demo01/page"),
  "wps-pilates": () => import("./wps-pilates/page"),
  "bee-pilates-ebisu": () => import("./bee-pilates-ebisu/page"),
};

export const clientSlugs = Object.keys(clientRegistry);

/**
 * Slug → thank-you page module registry. Optional per client — only clients
 * that pass `thanksHref` to `LPForm` need an entry here; others keep the
 * inline thank-you card and are absent from this map.
 */
export const clientThanksRegistry: Partial<
  Record<string, () => Promise<{ default: ComponentType }>>
> = {
  "beat-pilates-nagoyafushimi": () => import("./beat-pilates-nagoyafushimi/thanks"),
  "kaigyo-support": () => import("./kaigyo-support/thanks"),
};

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
  "_base-b": () => import("./_base-b/config"),
  "kaigyo-support": () => import("./kaigyo-support/config"),
  "the-personal-pilates": () => import("./the-personal-pilates/config"),
  "the-personal-gym": () => import("./the-personal-gym/config"),
  "beat-pilates-nagoyafushimi": () => import("./beat-pilates-nagoyafushimi/config"),
  "days-pilates": () => import("./days-pilates/config"),
  "soelu-togoshiginza": () => import("./soelu-togoshiginza/config"),
  "demo01": () => import("./demo01/config"),
  "wps-pilates": () => import("./wps-pilates/config"),
  "bee-pilates-ebisu": () => import("./bee-pilates-ebisu/config"),
};
