import type { ClientStatus } from "@shared/index";
import type { LPFormField } from "@/components/LPForm";

/** An image position in the layout. `src` empty → placeholder box. */
export interface Slot {
  placeholder: string;
  src?: string | null;
  /** CSS object-position for the cropped image (e.g. "38% center"). Default "center". */
  position?: string;
}

/**
 * Pattern B — B2B lead-gen LP (e.g. "開業支援パック" for fitness business
 * founders). Navy × white × orange, Z-pattern layout, gothic-only typography.
 * Distinct from Pattern A (consumer studio trial LP) — do not mix the two
 * design systems. See CLAUDE.md.
 */
export interface PatternBConfig {
  slug: string;
  /** Local fallback status when no clients row exists (dev only). */
  status?: ClientStatus;
  meta: { title: string; description: string; ogpImage?: string };
  /** Primary navy. */
  accent: string;
  /** CTA / highlight orange. */
  cta: string;
  /** Secondary accent (light blue) for small tags/icons. */
  accent2: string;

  header: {
    brand: string;
    brandSub: string;
    navLinks: { label: string; href: string }[];
    ctaText: string;
  };

  fv: {
    badge: string;
    heading: string[];
    /** Short standout guarantee line shown between heading and sub (e.g. a results-guarantee claim). */
    highlight: string;
    sub: string;
    ctaText: string;
    /** Small trust cues shown under the CTA button, e.g. ["相談無料", "しつこい営業なし"]. */
    trust: string[];
    hero: Slot;
  };

  problem: {
    eyebrow: string;
    heading: string;
    lead: string;
    persona: Slot;
    tasks: string[];
  };

  solution: {
    eyebrow: string;
    heading: string;
    lead: string;
    diagram: Slot;
    steps: string[];
  };

  benefits: {
    heading: string;
    lead: string;
    items: {
      num: string;
      tag: string;
      title: string;
      body: string;
      image: Slot;
    }[];
  };

  advantage: {
    heading: string;
    items: { title: string; body: string; stat?: string }[];
  };

  flow: {
    heading: string;
    lead: string;
    steps: { num: string; title: string; body: string }[];
  };

  faq: { heading: string; items: { q: string; a: string }[] };

  closing: {
    heading: string;
    body: string;
    ctaText: string;
    photo: Slot;
  };

  form: {
    heading: string;
    lead: string;
    fields: LPFormField[];
    submitLabel: string;
    disclaimer: string;
    errorMessage: string;
  };

  sticky: {
    offerText: string;
    buttonText: string;
    anchor: string;
    showAfter?: number;
  };
}
