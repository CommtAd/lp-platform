import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { HAS_SUPABASE, SUPABASE_ANON_KEY, SUPABASE_URL } from "./lib/env";

// Only the root path needs host-based resolution: a custom domain always maps
// to exactly one client's LP. Every other path (assets, [slug] pages, api) is
// host-independent, so we skip middleware entirely for them.
export const config = {
  matcher: "/",
};

export async function middleware(req: NextRequest) {
  const host = req.headers.get("host")?.split(":")[0] ?? "";
  if (!HAS_SUPABASE || !host || host.endsWith(".vercel.app") || host === "localhost") {
    return NextResponse.next();
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_client_slug_by_domain`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ p_host: host }),
    });
    if (!res.ok) return NextResponse.next();
    const slug = await res.json();
    if (typeof slug !== "string" || !slug) return NextResponse.next();
    return NextResponse.rewrite(new URL(`/${slug}`, req.url));
  } catch {
    return NextResponse.next();
  }
}
