/** Public Supabase URL. Empty string when running locally without a backend. */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

/** Public (anon) Supabase key. Safe to expose; RLS enforces access. */
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const HAS_SUPABASE = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
