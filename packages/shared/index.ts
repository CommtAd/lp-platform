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
