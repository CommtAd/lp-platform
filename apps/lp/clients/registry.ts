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
  "_base-c": () => import("./_base-c/page"),
  "forest-terrace-hiroshima": () => import("./forest-terrace-hiroshima/page"),
  "kaigyo-support": () => import("./kaigyo-support/page"),
  "the-personal-pilates": () => import("./the-personal-pilates/page"),
  "the-personal-gym": () => import("./the-personal-gym/page"),
  "beat-pilates-nagoyafushimi": () => import("./beat-pilates-nagoyafushimi/page"),
  "beat-pilates-toyota": () => import("./beat-pilates-toyota/page"),
  "days-pilates": () => import("./days-pilates/page"),
  "soelu-togoshiginza": () => import("./soelu-togoshiginza/page"),
  "demo01": () => import("./demo01/page"),
  "wps-pilates": () => import("./wps-pilates/page"),
  "bee-pilates-ebisu": () => import("./bee-pilates-ebisu/page"),
  "bee-pilates-okusawa": () => import("./bee-pilates-okusawa/page"),
  "sakura-yoyogiuehara": () => import("./sakura-yoyogiuehara/page"),
  "pilates-rinne-ebina": () => import("./pilates-rinne-ebina/page"),
  "pilates-rinne-tsujido": () => import("./pilates-rinne-tsujido/page"),
  "estudio": () => import("./estudio/page"),
  "training-studio-arcs": () => import("./training-studio-arcs/page"),
  "bloom-pilates": () => import("./bloom-pilates/page"),
  "pilates": () => import("./pilates/page"),
  "sakura-pilates": () => import("./sakura-pilates/page"),
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
  "sakura-yoyogiuehara": () => import("./sakura-yoyogiuehara/thanks"),
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
  "_base-c": () => import("./_base-c/config"),
  "forest-terrace-hiroshima": () => import("./forest-terrace-hiroshima/config"),
  "kaigyo-support": () => import("./kaigyo-support/config"),
  "the-personal-pilates": () => import("./the-personal-pilates/config"),
  "the-personal-gym": () => import("./the-personal-gym/config"),
  "beat-pilates-nagoyafushimi": () => import("./beat-pilates-nagoyafushimi/config"),
  "beat-pilates-toyota": () => import("./beat-pilates-toyota/config"),
  "days-pilates": () => import("./days-pilates/config"),
  "soelu-togoshiginza": () => import("./soelu-togoshiginza/config"),
  "demo01": () => import("./demo01/config"),
  "wps-pilates": () => import("./wps-pilates/config"),
  "bee-pilates-ebisu": () => import("./bee-pilates-ebisu/config"),
  "bee-pilates-okusawa": () => import("./bee-pilates-okusawa/config"),
  "sakura-yoyogiuehara": () => import("./sakura-yoyogiuehara/config"),
  "pilates-rinne-ebina": () => import("./pilates-rinne-ebina/config"),
  "pilates-rinne-tsujido": () => import("./pilates-rinne-tsujido/config"),
  "estudio": () => import("./estudio/config"),
  "training-studio-arcs": () => import("./training-studio-arcs/config"),
  "bloom-pilates": () => import("./bloom-pilates/config"),
  "pilates": () => import("./pilates/config"),
  "sakura-pilates": () => import("./sakura-pilates/config"),
};
