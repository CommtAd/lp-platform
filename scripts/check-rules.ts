/**
 * CI rule check (implementation-brief-01.md §7).
 *
 * Every `apps/lp/clients/<slug>/page.tsx` must import LPShell and LPForm.
 * These are the two mandatory building blocks: LPShell injects tags / noindex /
 * UTM capture, LPForm fixes the submission target. An LP that bypasses either
 * silently loses platform functionality, so we fail the build here.
 *
 * Exception: an LP whose conversions are handled by an external booking system
 * (the CTA links out instead of posting to LPForm) can be added to
 * FORM_EXEMPT. LPShell stays mandatory even then — only the LPForm requirement
 * is waived, per an explicit per-client opt-in.
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const clientsDir = join(root, "apps/lp/clients");

const REQUIRED = ["LPShell", "LPForm"] as const;

/**
 * Slugs intentionally shipped without an on-page LPForm because conversions are
 * routed to an external booking widget. LPShell remains required for these.
 */
const FORM_EXEMPT = new Set<string>(["soelu-togoshiginza"]);

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
  const required = FORM_EXEMPT.has(slug)
    ? REQUIRED.filter((name) => name !== "LPForm")
    : REQUIRED;
  const missing = required.filter(
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

console.log(
  `check-rules passed — ${clientSlugs().length} client page(s) checked ` +
    `(${FORM_EXEMPT.size} form-exempt, LPShell required for all).`,
);
