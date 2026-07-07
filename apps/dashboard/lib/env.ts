export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** Vercel Deploy Hook fired on publish/unpublish. Unset -> skip + log. */
export const VERCEL_DEPLOY_HOOK_URL = process.env.VERCEL_DEPLOY_HOOK_URL ?? "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    "[dashboard] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY not set — auth and data will not work.",
  );
}
