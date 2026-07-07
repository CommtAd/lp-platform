export type ClientStatus = "draft" | "published" | "unpublished";

export type CvEventType = "form_submit" | "tel_tap" | "line_tap";

export interface CvEvents {
  form_submit?: boolean;
  tel_tap?: boolean;
  line_tap?: boolean;
}

/** Row shape of the `clients` table (tag IDs + publication state). */
export interface ClientRecord {
  id: string;
  slug: string;
  name: string;
  status: ClientStatus;
  owner_user_id: string | null;
  commitad_client_id: string | null;
  custom_domain: string | null;
  use_custom_domain_as_canonical: boolean;
  meta_pixel_id: string | null;
  ga4_id: string | null;
  gtm_id: string | null;
  line_tag_id: string | null;
  meta_domain_verification: string | null;
  cv_events: CvEvents;
  created_at: string;
  updated_at: string;
}

export interface Utm {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}

/** Payload posted from LPForm to the form-submit Edge Function. */
export interface FormSubmitPayload {
  event_id: string;
  client_slug: string;
  event_type: CvEventType;
  form_data: Record<string, string>;
  utm: Utm;
  referrer?: string;
  occurred_at: string;
}
