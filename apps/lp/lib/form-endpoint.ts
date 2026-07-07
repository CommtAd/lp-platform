import { SUPABASE_URL } from "./env";

/**
 * Absolute URL of the `form-submit` Edge Function.
 *
 * This is intentionally NOT a component prop: the submission target is fixed at
 * the platform level so that individual LPs (and HTML exports) can never point
 * the form somewhere else. See docs/implementation-brief-01.md §3.2.
 */
export const FORM_SUBMIT_URL = SUPABASE_URL
  ? `${SUPABASE_URL}/functions/v1/form-submit`
  : "/api/form-submit-local";
