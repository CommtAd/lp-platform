/**
 * CI rule check (implementation-brief-01.md §7).
 *
 * Every `apps/lp/clients/<slug>/page.tsx` must import LPShell and LPForm.
 * These are the two mandatory building blocks: LPShell injects tags / noindex /
 * UTM capture, LPForm fixes the submission target. An LP that bypasses either
 * silently loses platform functionality, so we fail the build here.
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const clientsDir = join(root, "apps/lp/clients");

const REQUIRED = ["LPShell", "LPForm"] as const;

function clientSlugs(): string[] {
  return readdirSync(clientsDir).filter((entry) => {
    const full = join(clientsDir, entry);
    return statSync(full).isDirectory() && existsSync(join(full, "page.tsx"));
  });
}

const failures: string[] = [];

for (const slug of clientSlugs()) {
  const pagePath = join(clientsDir, slug, "page.tsx");
  const src = readFileSync(pagePath, "utf8");
  const missing = REQUIRED.filter(
    (name) => !new RegExp(`import\\s+${name}\\b`).test(src),
  );
  if (missing.length > 0) {
    failures.push(`  ${slug}/page.tsx is missing import(s): ${missing.join(", ")}`);
  }
}

if (failures.length > 0) {
  console.error("check-rules FAILED — every clients/*/page.tsx must import LPShell and LPForm:");
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`check-rules passed — ${clientSlugs().length} client page(s) import LPShell + LPForm.`);
