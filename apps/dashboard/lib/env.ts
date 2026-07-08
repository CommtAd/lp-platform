export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** Vercel Deploy Hook fired on publish/unpublish. Unset -> skip + log. */
export const VERCEL_DEPLOY_HOOK_URL = process.env.VERCEL_DEPLOY_HOOK_URL ?? "";

/** Vercel API access for custom-domain management (Phase 3). Unset -> skip + log. */
export const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN ?? "";
export const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID ?? "";
export const VERCEL_LP_PROJECT_ID = process.env.VERCEL_LP_PROJECT_ID ?? "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    "[dashboard] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY not set — auth and data will not work.",
  );
}
