/**
 * 横幅ずれ防止ルールのCIチェック（CLAUDE.md §16）。
 *
 * LPは「幅390pxの1枚のキャンバス」として作る。表示幅に合わせてキャンバスごと
 * 拡大縮小されるので、360pxの実機でも1280pxのPCでも改行位置と比率が一致する。
 * これを壊すのは次の2パターンだけなので、その2つだけを機械的に落とす。
 *
 *   1. LPCanvas を使わず自前で `maxWidth: 480` のキャンバスを組む
 *      → 可変幅キャンバス＋固定pxの中身になり、幅が変わると中身が取り残される。
 *   2. LPの中で `vw` / `vh` などのビューポート単位を使う
 *      → ビューポート単位は zoom の外側＝ウィンドウ基準で解決されるため、
 *        PCでは1280px、実機では390pxを指す。ルールの保証をそのまま破る。
 *
 * ルール制定（2026-08-21）前に作られたLPは EXISTING_BEFORE_RULE で対象外にしている。
 * 既存LPは移行しない方針なので、**このリストは増えも減りもしない。**
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const clientsDir = join(root, "apps/lp/clients");

/**
 * ルール制定（2026-08-21）より前に作られたLP。**このルールは適用しない。**
 *
 * 顧客確認済みの見た目をこちら都合で動かさないため、既存LPは現状のまま据え置く
 * という判断（2026-08-21）。移行しないので、このリストは減らない。
 * **新規LPをここに足すのも禁止。** 新規は必ず LPCanvas で作る。
 */
const EXISTING_BEFORE_RULE = new Set<string>([
  "beat-pilates-nagoyafushimi",
  "bee-pilates-ebisu",
  "bee-pilates-okusawa",
  "bloom-pilates",
  "days-pilates",
  "demo01",
  "estudio",
  "forest-terrace-hiroshima",
  "kaigyo-support",
  "pilates-rinne-ebina",
  "pilates-rinne-tsujido",
  "sakura-yoyogiuehara",
  "soelu-togoshiginza",
  "the-personal-gym",
  "the-personal-pilates",
  "training-studio-arcs",
  "wps-pilates",
]);

/**
 * キャンバスの外側の地色を画面いっぱいに敷くための `100vh` だけは許す。
 * キャンバスの外なので拡大縮小の影響を受けない。
 */
const ALLOWED_VIEWPORT_UNIT = /(minHeight|min-height):\s*"?100(vh|dvh)"?|min-h-screen|min-h-dvh/;

/** ビューポート単位。CSS文字列・Tailwindの任意値どちらも拾う。 */
const VIEWPORT_UNIT = /\b\d+(\.\d+)?(vw|vh|dvh|svh|lvh|dvw|svw|lvw)\b/;

function clientSlugs(): string[] {
  return readdirSync(clientsDir).filter((entry) => {
    const full = join(clientsDir, entry);
    return statSync(full).isDirectory() && existsSync(join(full, "page.tsx"));
  });
}

const failures: string[] = [];

for (const slug of clientSlugs()) {
  if (EXISTING_BEFORE_RULE.has(slug)) continue;

  const pagePath = join(clientsDir, slug, "page.tsx");
  const src = readFileSync(pagePath, "utf8");

  if (!/import\s+LPCanvas\b/.test(src)) {
    failures.push(
      `  ${slug}/page.tsx: LPCanvas を使っていません。` +
        `キャンバスは <LPCanvas> で組んでください（自前の maxWidth: 480 は禁止）。`,
    );
  }

  src.split("\n").forEach((line, i) => {
    if (!VIEWPORT_UNIT.test(line)) return;
    if (ALLOWED_VIEWPORT_UNIT.test(line)) return;
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return; // コメント行は対象外
    failures.push(
      `  ${slug}/page.tsx:${i + 1}: ビューポート単位（vw/vh）は使えません。` +
        `DESIGN_WIDTH 基準の px か % に置き換えてください。\n      ${line.trim()}`,
    );
  });
}

const stale = [...EXISTING_BEFORE_RULE].filter((slug) => !existsSync(join(clientsDir, slug)));
if (stale.length > 0) {
  failures.push(
    `  scripts/check-responsive.ts の EXISTING_BEFORE_RULE に存在しない slug があります: ${stale.join(", ")}`,
  );
}

if (failures.length > 0) {
  console.error("横幅ずれ防止ルール違反:\n" + failures.join("\n"));
  console.error(
    "\n詳細は CLAUDE.md「横幅ずれ防止ルール（2026-08-21以降の新規LPのみ・変更禁止）」を参照。",
  );
  process.exit(1);
}

console.log(
  `check-responsive: OK（${clientSlugs().length - EXISTING_BEFORE_RULE.size} 件を検査 / ルール制定前の既存LP ${EXISTING_BEFORE_RULE.size} 件は対象外）`,
);
