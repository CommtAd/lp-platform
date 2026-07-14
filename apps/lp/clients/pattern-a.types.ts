import type { ClientStatus } from "@shared/index";
import type { LPFormField } from "@/components/LPForm";

/** An image position in the layout. `src` empty → placeholder box. */
export interface Slot {
  placeholder: string;
  src?: string | null;
  /** CSS object-position for the cropped image (e.g. "38% center"). Default "center". */
  position?: string;
}

export interface PatternAConfig {
  slug: string;
  /** Local fallback status when no clients row exists (dev only). */
  status?: ClientStatus;
  meta: { title: string; description: string; ogpImage?: string };
  /** Primary accent (navy in pattern A). Gold tones are fixed in the design. */
  accent: string;
  /** Monitor-recruiting badge on the offer bar. Default ON. */
  showMonitorBadge: boolean;

  header: {
    brand: string;
    brandSub: string;
    /** Optional logo image path. When set, replaces the text brand/brandSub with an image lockup. */
    logo?: string;
    logoAlt?: string;
    /** Optional line shown below the logo (e.g. business hours). Only used when `logo` is set. */
    hours?: string;
    access: { station: string; walk: string }[];
  };
  offerBar: {
    badgeLines: [string, string];
    /** Badge text font size (px). Tune to fill the circle when line length changes. Default 12.5. */
    badgeFontSize?: number;
    /** Badge text font weight. Default 700 (bold). */
    badgeFontWeight?: number;
    /** Badge text font family. Default gothic. */
    badgeFontFamily?: "gothic" | "mincho";
    text: string;
  };
  achievement: { pre: string; num: string; post: string };

  fv: {
    catchLines: string[];
    /** Optional short horizontal brand line rendered under the vertical catchLines stack. */
    heroTag?: string;
    /** Which side of the hero image the vertical catchLines stack sits on. Defaults to "left". */
    catchAlign?: "left" | "right";
    hero: Slot;
    leftCard: { small: string; big: string };
    rightCard: { small: string; big: string };
  };

  offer: {
    eyebrow: string;
    heading: string;
    trialBadge: string;
    trialRegular: string;
    /** Six experience items (icons are fixed in the design). */
    items: string[];
    photos: [Slot, Slot];
    joinLabel: string;
    joinRegular: string;
    regular: { prefix: string; amount: string; suffix: string };
    ctaText: string;
  };

  about: {
    heading: string;
    photo: Slot;
    caption: string;
    lead: string;
    body: string;
  };

  worry: {
    heading: string;
    cards: { img: Slot; text: string }[];
    closingPre: string;
    closingHighlight: string;
  };

  reasons: {
    heading: string;
    items: {
      num: string;
      img: Slot;
      title: string;
      body: string;
      trio?: { label: string; desc: string }[];
    }[];
    ctaText: string;
    ctaSub: string;
  };

  trainers: {
    heading: string;
    lead: string;
    swipeHint: string;
    items: {
      img: Slot;
      role: string;
      name: string;
      nameEn: string;
      body: string;
      tags: string[];
    }[];
  };

  scenes: {
    heading: string;
    items: { img: Slot; title: string; body: string }[];
  };

  flow: {
    heading: string;
    steps: { num: string; title: string; time: string; body: string }[];
  };

  faq: { heading: string; items: { q: string; a: string }[] };

  access: {
    heading: string;
    stores: {
      img: Slot;
      name: string;
      address: string;
      hours: string;
      route: string;
    }[];
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
    offers: { label: string; value: string }[];
    buttonText: string;
    anchor: string;
    /** Show the sticky bar after scrolling this many px. Default 620 (matches hero height). */
    showAfter?: number;
  };
}
