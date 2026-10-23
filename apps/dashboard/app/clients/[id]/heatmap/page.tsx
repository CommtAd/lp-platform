import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  HEATMAP_DEVICE_LABEL,
  HEATMAP_RENDER_WIDTH,
  averageScrollReach,
  clickRanking,
  heatmapPoints,
  publicLpUrl,
  scrollReach,
  type ClientRecord,
  type HeatmapClick,
  type HeatmapDevice,
  type HeatmapSession,
} from "@shared/index";
import HeatmapCanvas from "./HeatmapCanvas";

/**
 * ヒートマップ分析画面（自社実装）。
 *
 * LPを幅390pxのiframeで出し、収集したクリック座標を重ねる。LPが幅390pxの
 * 1枚のキャンバスとして作られている（CLAUDE.md §16）ことを前提に、
 * iframe内で `zoom` が 1 になる＝収集時の座標とそのまま一致する、という作り。
 */

const RANGES = [7, 30, 90] as const;
const DEVICES: HeatmapDevice[] = ["mobile", "tablet", "desktop"];

/** 1画面の集計に読む上限。これを超える案件が出たら集計をSQL側に寄せる。 */
const ROW_LIMIT = 20_000;

function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

function pct(ratio: number): string {
  return `${Math.round(ratio * 100)}%`;
}

function dwellLabel(ms: number): string {
  if (ms < 1000) return "0秒";
  const sec = Math.round(ms / 1000);
  if (sec < 60) return `${sec}秒`;
  return `${Math.floor(sec / 60)}分${String(sec % 60).padStart(2, "0")}秒`;
}

export default async function HeatmapPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ days?: string; device?: string }>;
}) {
  const { id } = await params;
  const { days: daysParam, device: deviceParam } = await searchParams;

  const days = RANGES.includes(Number(daysParam) as (typeof RANGES)[number])
    ? Number(daysParam)
    : 30;
  const device = DEVICES.includes(deviceParam as HeatmapDevice)
    ? (deviceParam as HeatmapDevice)
    : null;

  const supabase = await createClient();
  const { data: clientData } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!clientData) notFound();
  const client = clientData as ClientRecord;

  const since = new Date(Date.now() - days * 86_400_000).toISOString();

  let sessionQuery = supabase
    .from("heatmap_sessions")
    .select("id,device,page_height_px,max_scroll_px,dwell_ms,started_at")
    .eq("client_id", id)
    .gte("started_at", since)
    .order("started_at", { ascending: false })
    .limit(ROW_LIMIT);
  if (device) sessionQuery = sessionQuery.eq("device", device);

  const [{ data: sessionRows, error: sessionError }, { data: clickRows }] = await Promise.all([
    sessionQuery,
    supabase
      .from("heatmap_clicks")
      .select("x_ratio,y_px,label,session_id")
      .eq("client_id", id)
      .gte("occurred_at", since)
      .order("occurred_at", { ascending: false })
      .limit(ROW_LIMIT),
  ]);

  const sessions = (sessionRows ?? []) as HeatmapSession[];
  // 端末で絞ったときは、その端末のセッションに属するクリックだけを見る。
  const sessionIds = new Set(sessions.map((s) => s.id));
  const clicks = ((clickRows ?? []) as HeatmapClick[]).filter((c) =>
    sessionIds.has(c.session_id),
  );

  const points = heatmapPoints(clicks, sessions);
  const reach = scrollReach(sessions);
  const ranking = clickRanking(clicks);
  const avgReach = averageScrollReach(sessions);
  const avgDwell = sessions.length
    ? sessions.reduce((a, s) => a + s.dwell_ms, 0) / sessions.length
    : 0;

  // iframe の高さ。幅390pxで出すので、スマホのセッションが記録した全高が
  // 一番近い。無ければ全体の中央値で代用する。
  const mobileHeights = sessions
    .filter((s) => s.device === "mobile")
    .map((s) => s.page_height_px);
  const pageHeight =
    median(mobileHeights) || median(sessions.map((s) => s.page_height_px)) || 2400;

  const lpUrl = publicLpUrl(client);
  const deviceCounts = DEVICES.map((d) => ({
    device: d,
    count: sessions.filter((s) => s.device === d).length,
  }));

  const queryFor = (next: { days?: number; device?: string | null }) => {
    const sp = new URLSearchParams();
    sp.set("days", String(next.days ?? days));
    const nextDevice = next.device === undefined ? device : next.device;
    if (nextDevice) sp.set("device", nextDevice);
    return `/clients/${id}/heatmap?${sp.toString()}`;
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link
        href={`/clients/${id}`}
        className="text-sm text-neutral-500 hover:text-neutral-800"
      >
        ← {client.name} の設定に戻る
      </Link>

      <div className="mb-6 mt-4">
        <h1 className="text-xl font-semibold text-navy">ヒートマップ分析</h1>
        <p className="text-sm text-neutral-500">
          /{client.slug} ・ クリック位置とスクロール到達を自社計測で集計しています
        </p>
      </div>

      {!client.heatmap_enabled && (
        <p className="mb-6 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700">
          この案件は計測がOFFです（既定OFF）。新しいデータは溜まりません。分析したい期間だけ
          設定画面でONにしてください。
        </p>
      )}
      {sessionError && (
        <p className="mb-6 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          集計テーブルを読めませんでした。マイグレーション 0038 が適用済みか確認してください。
        </p>
      )}

      {/* 絞り込み */}
      <div className="mb-6 flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">期間</span>
          {RANGES.map((r) => (
            <Link
              key={r}
              href={queryFor({ days: r })}
              className={`rounded-md px-3 py-1.5 text-sm transition ${
                r === days
                  ? "bg-navy text-white"
                  : "border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              {r}日
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">端末</span>
          <Link
            href={queryFor({ device: null })}
            className={`rounded-md px-3 py-1.5 text-sm transition ${
              device === null
                ? "bg-navy text-white"
                : "border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            すべて
          </Link>
          {deviceCounts.map(({ device: d, count }) => (
            <Link
              key={d}
              href={queryFor({ device: d })}
              className={`rounded-md px-3 py-1.5 text-sm transition ${
                device === d
                  ? "bg-navy text-white"
                  : "border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              {HEATMAP_DEVICE_LABEL[d]}
              <span className="ml-1 text-xs opacity-70">{count}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 指標 */}
      <section className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="セッション" value={sessions.length.toLocaleString()} />
        <Stat label="クリック" value={clicks.length.toLocaleString()} />
        <Stat label="平均スクロール到達" value={pct(avgReach)} />
        <Stat label="平均滞在" value={dwellLabel(avgDwell)} />
      </section>

      {sessions.length === 0 ? (
        <section className="rounded-lg border border-neutral-200 bg-white p-8 text-center">
          <p className="text-sm font-medium text-neutral-700">
            この期間のデータはまだありません
          </p>
          <p className="mt-2 text-xs text-neutral-500">
            計測をONにしたうえで公開後にLPが開かれると溜まります。計測はページを開いた
            2秒後と離脱時に送信されます。
          </p>
        </section>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[auto_1fr]">
          {/* クリックヒートマップ */}
          <section>
            <h2 className="mb-1 text-sm font-semibold">クリックヒートマップ</h2>
            <p className="mb-3 max-w-[420px] text-xs text-neutral-500">
              幅{HEATMAP_RENDER_WIDTH}pxの設計そのままに重ねています。
              {client.status !== "published" && (
                <>
                  <br />
                  <span className="text-amber-700">
                    下書き・非公開のLPはプレビュー帯のぶん（約33px）下にずれて重なります。
                  </span>
                </>
              )}
            </p>
            <HeatmapCanvas
              src={lpUrl}
              width={HEATMAP_RENDER_WIDTH}
              height={pageHeight}
              points={points}
            />
          </section>

          <div className="space-y-8">
            {/* スクロール到達率 */}
            <section className="rounded-lg border border-neutral-200 bg-white p-5">
              <h2 className="mb-1 text-sm font-semibold">スクロール到達率</h2>
              <p className="mb-4 text-xs text-neutral-500">
                ページの上から何割まで見られたか。各行は「ここまで到達した人の割合」です。
              </p>
              <ul className="space-y-1.5">
                {reach.map((b) => (
                  <li key={b.depth} className="flex items-center gap-3 text-xs">
                    <span className="w-10 shrink-0 text-right tabular-nums text-neutral-500">
                      {pct(b.depth)}
                    </span>
                    <span className="h-3 flex-1 overflow-hidden rounded-full bg-neutral-100">
                      <span
                        className="block h-full rounded-full bg-navy"
                        style={{ width: `${Math.max(b.ratio * 100, b.ratio > 0 ? 1 : 0)}%` }}
                      />
                    </span>
                    <span className="w-16 shrink-0 tabular-nums text-neutral-600">
                      {pct(b.ratio)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* クリックされた要素 */}
            <section className="rounded-lg border border-neutral-200 bg-white p-5">
              <h2 className="mb-1 text-sm font-semibold">押された要素</h2>
              <p className="mb-4 text-xs text-neutral-500">
                ボタン・リンクの文字で集計しています。追従CTAのように位置が動く要素は
                ヒートマップ上では散るので、順位はこちらで読んでください。
              </p>
              {ranking.length === 0 ? (
                <p className="text-xs text-neutral-500">
                  ボタン・リンクのクリックはまだありません。
                </p>
              ) : (
                <ol className="space-y-1.5">
                  {ranking.map((r, i) => (
                    <li key={r.label} className="flex items-baseline gap-3 text-xs">
                      <span className="w-4 shrink-0 text-right tabular-nums text-neutral-400">
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-neutral-700" title={r.label}>
                        {r.label}
                      </span>
                      <span className="shrink-0 tabular-nums font-medium text-neutral-800">
                        {r.count}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </section>

            <section className="rounded-lg border border-neutral-200 bg-white p-5">
              <h2 className="mb-2 text-sm font-semibold">この数字の読み方</h2>
              <ul className="space-y-1.5 text-xs leading-relaxed text-neutral-600">
                <li>
                  セッションはページビュー1回です。同じ人がタブを開き直すと別で数えます
                  （Cookieを使わず、タブを閉じれば消える識別子で数えています）。
                </li>
                <li>
                  保存しているのはクリック座標・押された要素の文字・到達深さだけです。
                  入力欄の中身や録画は一切保存していません。
                </li>
                <li>
                  ブラウザの「追跡しない（DNT）」が有効な訪問者は計測対象外です。
                </li>
                <li>
                  読み込みは1画面あたり{ROW_LIMIT.toLocaleString()}件までです。
                  これを超える案件は期間を短くしてください。
                </li>
              </ul>
            </section>
          </div>
        </div>
      )}
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white px-4 py-3">
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="mt-0.5 text-lg font-semibold tabular-nums text-navy">{value}</p>
    </div>
  );
}
