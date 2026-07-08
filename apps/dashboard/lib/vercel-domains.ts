import { VERCEL_API_TOKEN, VERCEL_LP_PROJECT_ID, VERCEL_TEAM_ID } from "./env";

const API = "https://api.vercel.com";

function isConfigured() {
  return Boolean(VERCEL_API_TOKEN && VERCEL_TEAM_ID && VERCEL_LP_PROJECT_ID);
}

function withTeam(path: string) {
  return `${API}${path}${path.includes("?") ? "&" : "?"}teamId=${VERCEL_TEAM_ID}`;
}

function authHeaders() {
  return {
    Authorization: `Bearer ${VERCEL_API_TOKEN}`,
    "Content-Type": "application/json",
  };
}

export interface DomainStatus {
  verified: boolean;
  misconfigured: boolean;
  verification: { type: string; domain: string; value: string; reason: string }[];
}

/** Add a custom domain to the LP Vercel project. Unset config -> skip + log. */
export async function addDomainToProject(
  domain: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!isConfigured()) {
    console.warn("[dashboard] VERCEL_API_TOKEN 未設定 — ドメイン追加をスキップしました");
    return { ok: false, error: "Vercel連携が未設定のため、ドメインを追加できません" };
  }
  try {
    const res = await fetch(withTeam(`/v10/projects/${VERCEL_LP_PROJECT_ID}/domains`), {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ name: domain }),
    });
    if (res.ok) return { ok: true };
    const body = await res.json().catch(() => ({}));
    // Already attached to this same project — treat as success (idempotent retry).
    if (body?.error?.code === "domain_already_in_use") return { ok: true };
    return { ok: false, error: body?.error?.message ?? "ドメイン追加に失敗しました" };
  } catch (e) {
    console.error("[dashboard] Vercelドメイン追加に失敗:", e);
    return { ok: false, error: "ドメイン追加に失敗しました" };
  }
}

/** Detach a domain from the LP Vercel project. Best-effort: never throws. */
export async function removeDomainFromProject(domain: string): Promise<void> {
  if (!isConfigured()) return;
  try {
    await fetch(withTeam(`/v9/projects/${VERCEL_LP_PROJECT_ID}/domains/${domain}`), {
      method: "DELETE",
      headers: authHeaders(),
    });
  } catch (e) {
    console.error("[dashboard] Vercelドメイン削除に失敗:", e);
  }
}

/** Verification + DNS-config status for a domain already attached to the project. */
export async function getDomainStatus(domain: string): Promise<DomainStatus | null> {
  if (!isConfigured()) return null;
  try {
    const [domainRes, configRes] = await Promise.all([
      fetch(withTeam(`/v9/projects/${VERCEL_LP_PROJECT_ID}/domains/${domain}`), {
        headers: authHeaders(),
      }),
      fetch(withTeam(`/v6/domains/${domain}/config`), { headers: authHeaders() }),
    ]);
    if (!domainRes.ok) return null;
    const domainInfo = await domainRes.json();
    const config = configRes.ok ? await configRes.json() : { misconfigured: true };
    return {
      verified: Boolean(domainInfo.verified),
      misconfigured: Boolean(config.misconfigured),
      verification: domainInfo.verification ?? [],
    };
  } catch (e) {
    console.error("[dashboard] Vercelドメイン状態取得に失敗:", e);
    return null;
  }
}
