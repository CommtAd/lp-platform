import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ClientRecord, ClientStatus } from "@shared/index";
import { fetchClientRecord } from "@/lib/client-record";
import TagInjector from "./TagInjector";
import UtmCapture from "./UtmCapture";

export interface LPShellProps {
  clientSlug: string;
  /**
   * Local fallback used only when the clients table has no matching row (e.g.
   * during local dev without Supabase). Lets the LP render standalone.
   */
  fallback?: { name?: string; status?: ClientStatus };
  children: React.ReactNode;
}

function buildDefault(
  slug: string,
  fallback?: LPShellProps["fallback"],
): ClientRecord {
  const now = new Date().toISOString();
  return {
    id: "local",
    slug,
    name: fallback?.name ?? slug,
    status: fallback?.status ?? "published",
    owner_user_id: null,
    commitad_client_id: null,
    custom_domain: null,
    use_custom_domain_as_canonical: false,
    meta_pixel_id: null,
    ga4_id: null,
    gtm_id: null,
    line_tag_id: null,
    meta_domain_verification: null,
    cv_events: {},
    created_at: now,
    updated_at: now,
  };
}

/**
 * Mandatory wrapper for every LP. Handles tag injection, publication gating and
 * UTM capture without the LP author having to think about it. The design inside
 * `children` is untouched. See docs/implementation-brief-01.md §3.1.
 */
export default async function LPShell({
  clientSlug,
  fallback,
  children,
}: LPShellProps) {
  const record =
    (await fetchClientRecord(clientSlug)) ?? buildDefault(clientSlug, fallback);

  // Phase 3: once a custom domain is verified and marked canonical, the
  // platform's own path-based URL (…vercel.app/{slug}) becomes an alias —
  // send crawlers and visitors to the client's own domain instead.
  if (record.use_custom_domain_as_canonical && record.custom_domain) {
    const currentHost = (await headers()).get("host")?.split(":")[0] ?? "";
    if (currentHost && currentHost !== record.custom_domain) {
      redirect(`https://${record.custom_domain}/`);
    }
  }

  const isPublished = record.status === "published";

  return (
    <>
      {!isPublished && <meta name="robots" content="noindex,nofollow" />}
      {record.meta_domain_verification && (
        <meta
          name="facebook-domain-verification"
          content={record.meta_domain_verification}
        />
      )}

      <TagInjector client={record} />
      <UtmCapture />

      {!isPublished && (
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "#3B3D36",
            color: "#FCFBF7",
            textAlign: "center",
            fontSize: 12,
            letterSpacing: "0.08em",
            padding: "8px 12px",
            fontFamily: "'Noto Sans JP', sans-serif",
          }}
        >
          非公開プレビュー（status: {record.status}）— このページは検索エンジンに登録されません
        </div>
      )}

      {children}
    </>
  );
}
