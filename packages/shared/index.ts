export type ClientStatus = "draft" | "published" | "unpublished";

export type CvEventType = "form_submit" | "tel_tap" | "line_tap";

/**
 * 業種タブ。ダッシュボードの一覧分類にのみ使う値で、LP配信側の挙動には
 * 一切影響しない（タグ注入・公開判定は業種非依存）。
 */
export type Industry = "fitness" | "bridal" | "other";

export const INDUSTRY_LABEL: Record<Industry, string> = {
  fitness: "フィットネス",
  bridal: "ブライダル",
  other: "その他",
};

export const INDUSTRIES: Industry[] = ["fitness", "bridal", "other"];

/**
 * 独自ドメインを持たない顧客LPの配信ホスト。業種で振り分ける。
 * どちらも同一のVercelプロジェクトを指すので、技術的にはどちらのホストでも
 * 全slugが表示できる。顧客に案内するURLを分けるための対応表。
 */
export const INDUSTRY_LP_HOST: Record<Industry, string> = {
  fitness: "fitness-lp.commitad.com",
  bridal: "bridal-lp.commitad.com",
  other: "fitness-lp.commitad.com",
};

/**
 * 顧客LPの公開URL。独自ドメインが設定されていればそちらを優先する
 * （LPShell も canonical 指定時はそこへリダイレクトする）。
 */
export function publicLpUrl(client: {
  slug: string;
  industry?: Industry | null;
  custom_domain?: string | null;
}): string {
  if (client.custom_domain) return `https://${client.custom_domain}/`;
  return `https://${INDUSTRY_LP_HOST[client.industry ?? "fitness"]}/${client.slug}`;
}

/**
 * フォーム送信成功時に送る Meta ピクセルのイベント名。
 * Meta の標準イベントに限定してある。任意文字列を許すと打ち間違いに気づけない
 * （ピクセルは未知のイベント名でもエラーを出さず、ただ計上されないだけ）。
 */
export type MetaCvEvent =
  | "Lead"
  | "Purchase"
  | "CompleteRegistration"
  | "Contact"
  | "Schedule"
  | "SubmitApplication";

export const META_CV_EVENTS: MetaCvEvent[] = [
  "Lead",
  "Purchase",
  "CompleteRegistration",
  "Contact",
  "Schedule",
  "SubmitApplication",
];

/**
 * 業種ごとの既定イベント。`clients.meta_cv_event` が null のときに使う。
 * DBの default では業種を参照できないため、SQL側（`get_public_client`）と
 * ここの2箇所に同じ規則がある。**片方だけ変えないこと。**
 */
export const DEFAULT_META_CV_EVENT: Record<Industry, MetaCvEvent> = {
  fitness: "Lead",
  bridal: "Purchase",
  other: "Lead",
};

/** `meta_cv_event` が未設定なら業種の既定に解決する。 */
export function resolveMetaCvEvent(client: {
  meta_cv_event?: MetaCvEvent | null;
  industry?: Industry | null;
}): MetaCvEvent {
  return client.meta_cv_event ?? DEFAULT_META_CV_EVENT[client.industry ?? "fitness"];
}

export interface CvEvents {
  form_submit?: boolean;
  tel_tap?: boolean;
  line_tap?: boolean;
}

/** Row shape of the `clients` table (tag IDs + publication state). */
export interface ClientRecord {
  id: string;
  slug: string;
  name: string;
  status: ClientStatus;
  owner_user_id: string | null;
  commitad_client_id: string | null;
  notify_emails: string[];
  custom_domain: string | null;
  use_custom_domain_as_canonical: boolean;
  meta_pixel_id: string | null;
  ga4_id: string | null;
  gtm_id: string | null;
  line_tag_id: string | null;
  meta_domain_verification: string | null;
  cv_events: CvEvents;
  /**
   * ヒートマップ計測のON/OFF。既定ON。LPShell がこの値を見て収集スクリプトを
   * 出すかどうかを決める（`supabase/migrations/0038_heatmap.sql`）。
   */
  heatmap_enabled: boolean;
  /**
   * フォーム送信成功時に送る Meta ピクセルのイベント名。
   * 公開RPC経由では業種の既定に解決済みの値が入る（null にならない）。
   * ダッシュボードが clients テーブルを直接読むときは null＝業種の既定に従う。
   */
  meta_cv_event?: MetaCvEvent | null;
  /**
   * 業種タブ。公開RPC `get_public_client` は返さない（LP側は業種を使わない）ため
   * optional。ダッシュボードが clients テーブルを直接読むときは必ず入る。
   */
  industry?: Industry;
  created_at: string;
  updated_at: string;
}

export interface Utm {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  creative?: string;
  adset?: string;
  id?: string;
  /** Meta/Facebook click id (`fbclid` URL param) — not a utm_* param, but travels alongside them for ad attribution. */
  fbclid?: string;
}

/** Payload posted from LPForm to the form-submit Edge Function. */
export interface FormSubmitPayload {
  event_id: string;
  client_slug: string;
  event_type: CvEventType;
  form_data: Record<string, string>;
  utm: Utm;
  referrer?: string;
  /** Full URL of the LP page the form was submitted from (window.location.href). */
  page_url?: string;
  occurred_at: string;
}

/* ── ヒートマップ分析 ──────────────────────────────────────────
 *
 * 外部SaaSを使わない自社実装。保存するのはクリック座標・押された要素の文字・
 * スクロール到達深さだけで、入力値も録画も残さない。
 * スキーマは `supabase/migrations/0038_heatmap.sql`。
 */

/**
 * ヒートマップを重ねる基準幅。LPは幅390pxの1枚のキャンバスとして作られている
 * （CLAUDE.md §16）ので、この幅のiframeに載せると収集時の座標とぴったり合う。
 * LP側の `DESIGN_WIDTH` と同じ値。**片方だけ変えないこと。**
 */
export const HEATMAP_RENDER_WIDTH = 390;

export type HeatmapDevice = "mobile" | "tablet" | "desktop";

export const HEATMAP_DEVICE_LABEL: Record<HeatmapDevice, string> = {
  mobile: "スマホ",
  tablet: "タブレット",
  desktop: "PC",
};

/** 幅から端末種別を決める。`HEATMAP_RENDER_WIDTH` と同じ閾値感で切る。 */
export function heatmapDeviceOf(viewportWidth: number): HeatmapDevice {
  if (viewportWidth < 768) return "mobile";
  if (viewportWidth < 1024) return "tablet";
  return "desktop";
}

/** `heatmap_sessions` の1行（ダッシュボードが読む分だけ）。 */
export interface HeatmapSession {
  id: string;
  device: HeatmapDevice;
  page_height_px: number;
  max_scroll_px: number;
  dwell_ms: number;
  started_at: string;
}

/** `heatmap_clicks` の1行。y はセッションのページ全高で割って比率に直して使う。 */
export interface HeatmapClick {
  x_ratio: number;
  y_px: number;
  label: string | null;
  session_id: string;
}

/** ヒートマップに重ねる1点。y は 0〜1 の比率。 */
export interface HeatmapPoint {
  x: number;
  y: number;
}

/**
 * クリック行をヒートマップ用の点に直す。
 *
 * y をセッションのページ全高で割るのが要点。新規LPはキャンバスが常に390px幅
 * なのでどの端末でも同じ全高になり、割っても割らなくても同じ絵になる。
 * 横幅ずれ防止ルールの対象外である既存17本はキャンバスが可変幅＝端末ごとに
 * 全高が違うので、比率に直さないと縦方向がばらける。
 */
export function heatmapPoints(
  clicks: HeatmapClick[],
  sessions: Pick<HeatmapSession, "id" | "page_height_px">[],
): HeatmapPoint[] {
  const heightById = new Map(sessions.map((s) => [s.id, s.page_height_px]));
  const points: HeatmapPoint[] = [];
  for (const c of clicks) {
    const h = heightById.get(c.session_id);
    if (!h || h <= 0) continue;
    const y = c.y_px / h;
    if (y < 0 || y > 1) continue;
    points.push({ x: c.x_ratio, y });
  }
  return points;
}

/** スクロール到達率の1区切り。`depth` は 0.1 刻みの到達位置。 */
export interface ScrollReachBucket {
  depth: number;
  sessions: number;
  ratio: number;
}

/**
 * 「ページの何割まで見られたか」の分布。各区切りは**そこまで到達した**
 * セッションの割合（累積なので単調に減る）。
 */
export function scrollReach(
  sessions: Pick<HeatmapSession, "page_height_px" | "max_scroll_px">[],
  steps = 10,
): ScrollReachBucket[] {
  const reaches = sessions
    .filter((s) => s.page_height_px > 0)
    .map((s) => Math.min(s.max_scroll_px / s.page_height_px, 1));
  const total = reaches.length;
  const buckets: ScrollReachBucket[] = [];
  for (let i = 1; i <= steps; i += 1) {
    const depth = i / steps;
    const reached = reaches.filter((r) => r >= depth).length;
    buckets.push({ depth, sessions: reached, ratio: total ? reached / total : 0 });
  }
  return buckets;
}

/** 押された要素の文字ごとの件数。多い順。 */
export function clickRanking(
  clicks: Pick<HeatmapClick, "label">[],
  limit = 15,
): { label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const c of clicks) {
    const label = c.label?.trim();
    if (!label) continue;
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/** 平均到達率（0〜1）。セッションが無ければ 0。 */
export function averageScrollReach(
  sessions: Pick<HeatmapSession, "page_height_px" | "max_scroll_px">[],
): number {
  const rs = sessions
    .filter((s) => s.page_height_px > 0)
    .map((s) => Math.min(s.max_scroll_px / s.page_height_px, 1));
  if (!rs.length) return 0;
  return rs.reduce((a, b) => a + b, 0) / rs.length;
}
