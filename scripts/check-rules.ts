/**
 * CI rule check (implementation-brief-01.md §7).
 *
 * Every `apps/lp/clients/<slug>/` must use LPShell and LPForm — the two
 * mandatory building blocks: LPShell injects tags / noindex / UTM capture,
 * LPForm fixes the submission target. An LP that bypasses either silently
 * loses platform functionality, so we fail the build here.
 *
 * LPShell must be imported by `page.tsx` itself; LPForm may live in any `.tsx`
 * of the LP folder (see the note on REQUIRED_IN_FOLDER below).
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

/**
 * LPShell は page.tsx が直接 import すること（ページ全体を包む役目なので、
 * 位置がずれると noindex / タグ注入が効かなくなる）。
 *
 * LPForm は **LPフォルダ内のどのファイルでもよい**。フォーム前後の状態を持つLPは
 * page.tsx が server component のままでは書けず、同フォルダの client component に
 * LPForm を置く必要がある（`pilates` の集客シミュレーションが実例。入力 → 日程予約 →
 * 結果公開でフォーム後の画面が切り替わる）。
 * 「LPが独自フォームを手作りして送信先を差し替える」ことを防ぐ目的は、
 * フォルダ内のどこかに LPForm があることを求めれば同じく達成できる。
 */
const REQUIRED_IN_PAGE = ["LPShell"] as const;
const REQUIRED_IN_FOLDER = ["LPForm"] as const;

/**
 * Slugs intentionally shipped without an on-page LPForm because conversions are
 * routed to an external booking widget. LPShell remains required for these.
 */
const FORM_EXEMPT = new Set<string>([
  "soelu-togoshiginza",
  "days-pilates",
  "bee-pilates-ebisu",
  "bee-pilates-okusawa",
  // 構成案 §16「予約ボタンはすべてhacomonoの店舗別ウィジェットへ接続」による。
  // 店舗別に別LPを作る運用のため slug は店舗名サフィックス付き。
  "pilates-rinne-ebina",
  "pilates-rinne-tsujido",
  // 予約導線をhacomono店舗別ウィジェットに接続（顧客要望、2026-08-07）。
  "training-studio-arcs",
  // 予約導線を外部 STORES 予約に接続（顧客要望、2026-08）。
  "estudio",
  // 予約導線を外部 Hacomono 予約に接続（顧客要望、2026-08）。名古屋伏見店とは別オーナー・別LP。
  "beat-pilates-toyota",
]);

function clientSlugs(): string[] {
  return readdirSync(clientsDir).filter((entry) => {
    const full = join(clientsDir, entry);
    return statSync(full).isDirectory() && existsSync(join(full, "page.tsx"));
  });
}

const failures: string[] = [];

/** LPフォルダ直下の .tsx をすべて連結して返す（LPForm の所在探索用）。 */
function folderSource(slug: string): string {
  const dir = join(clientsDir, slug);
  return readdirSync(dir)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => readFileSync(join(dir, f), "utf8"))
    .join("\n");
}

for (const slug of clientSlugs()) {
  const pageSrc = readFileSync(join(clientsDir, slug, "page.tsx"), "utf8");
  const imports = (name: string, src: string) =>
    new RegExp(`import\\s+${name}\\b`).test(src);

  const missingInPage = REQUIRED_IN_PAGE.filter((name) => !imports(name, pageSrc));
  if (missingInPage.length > 0) {
    failures.push(`  ${slug}/page.tsx is missing import(s): ${missingInPage.join(", ")}`);
  }

  if (!FORM_EXEMPT.has(slug)) {
    const src = folderSource(slug);
    const missing = REQUIRED_IN_FOLDER.filter((name) => !imports(name, src));
    if (missing.length > 0) {
      failures.push(`  ${slug}/ is missing import(s): ${missing.join(", ")}`);
    }
  }
}

if (failures.length > 0) {
  console.error(
    "check-rules FAILED — page.tsx must import LPShell, and the LP folder must import LPForm:",
  );
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  `check-rules passed — ${clientSlugs().length} client page(s) checked ` +
    `(${FORM_EXEMPT.size} form-exempt, LPShell required for all).`,
);
