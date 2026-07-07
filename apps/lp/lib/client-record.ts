import { createClient } from "@supabase/supabase-js";
import type { ClientRecord } from "@shared/index";
import { HAS_SUPABASE, SUPABASE_ANON_KEY, SUPABASE_URL } from "./env";

/**
 * Fetch a client row by slug. Returns null when Supabase is not configured or
 * the row does not exist, so LPShell can fall back to a local default and the
 * page still renders during local development.
 */
export async function fetchClientRecord(
  slug: string,
): Promise<ClientRecord | null> {
  if (!HAS_SUPABASE) return null;
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    // Render-safe columns only, via a SECURITY DEFINER function — the clients
    // table's RLS otherwise limits reads to the owning sales user.
    const { data, error } = await supabase
      .rpc("get_public_client", { p_slug: slug })
      .maybeSingle();
    if (error) return null;
    return (data as ClientRecord) ?? null;
  } catch {
    return null;
  }
}
