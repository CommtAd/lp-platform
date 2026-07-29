/**
 * LPフォルダ名と clients.slug の一致チェック。
 *
 * `apps/lp/app/[slug]/page.tsx` は `apps/lp/clients/` のフォルダ名でルーティングし、
 * LPShell は同じ文字列で clients 行を引いてタグを注入する。両者がずれると
 * ページは200で表示されるのにタグが一切入らない、という気づきにくい壊れ方をする
 * （days-pilates / bee-pilates-ebisu で実際に発生）。
 *
 * 参照は公開RPC `get_public_client` なので anon key だけで動く。
 *
 * 制約: RPCがslug単体引きのため「DB行はあるがLPフォルダが無い」逆方向は検出できない。
 * ダッシュボード先行で枠を作る運用ではその状態が正常なので、現状は許容している。
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const clientsDir = join(root, "apps/lp/clients");

function readEnvLocal(): Record<string, string> {
  const path = join(root, "apps/lp/.env.local");
  if (!existsSync(path)) return {};
  const out: Record<string, string> = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (m) out[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
  return out;
}

const env = readEnvLocal();
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !anonKey) {
  console.error(
    "check-slug-sync SKIPPED — NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY が見つかりません " +
      "(apps/lp/.env.local か環境変数で指定してください)",
  );
  process.exit(0);
}

/** `_base-*` はテンプレなので clients 行を持たない。 */
function lpSlugs(): string[] {
  return readdirSync(clientsDir).filter((entry) => {
    if (entry.startsWith("_")) return false;
    const full = join(clientsDir, entry);
    return statSync(full).isDirectory() && existsSync(join(full, "page.tsx"));
  });
}

async function fetchRow(slug: string) {
  const res = await fetch(`${supabaseUrl}/rest/v1/rpc/get_public_client`, {
    method: "POST",
    headers: {
      apikey: anonKey!,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ p_slug: slug }),
  });
  if (!res.ok) {
    throw new Error(`RPC ${res.status} ${await res.text()}`);
  }
  const rows = (await res.json()) as { slug: string }[];
  return rows[0] ?? null;
}

async function main() {
  const slugs = lpSlugs();
  const missing: string[] = [];

  for (const slug of slugs) {
    if ((await fetchRow(slug)) === null) missing.push(slug);
  }

  if (missing.length > 0) {
    console.error(
      "check-slug-sync FAILED — 以下のLPに対応する clients 行がありません。\n" +
        "ダッシュボードのslugがフォルダ名と一致しているか確認してください " +
        "（不一致だとページは表示されるのにタグが注入されません）:",
    );
    console.error(missing.map((s) => `  apps/lp/clients/${s}/`).join("\n"));
    process.exit(1);
  }

  console.log(`check-slug-sync passed — ${slugs.length} 件すべて clients 行と一致。`);
}

main().catch((err) => {
  console.error("check-slug-sync ERROR —", err.message);
  process.exit(1);
});
