import type { ClientStatus } from "@shared/index";
import type { LPFormField } from "@/components/LPForm";

/**
 * Pilates SAKURA 新宿三丁目店 — 11/1 NEW OPEN 記念のMeta広告用・短尺LP。
 *
 * 指示書: 「Pilates SAKURA 新宿三丁目店｜LP制作指示書」（2026-10-14）
 * 参照: 成果良好のMeta広告バナー（新宿三丁目駅 徒歩3分／11月1日 NEW OPEN!／先着30名様限定／3大特典）
 * 先着人数はバナーの30名から、顧客修正（AUN 2026-10-15）で20名、OPEN後（2026-11-16）に10名へ変更済み。
 *
 * 長尺の店舗LP `sakura-shinjuku-sanchome` とは別物。こちらは広告バナーの続きとして
 * 「① FV（特典） → ② お悩み → ③ 最終CTA → ④ 予約フォーム」だけで予約へ送る、OPEN記念のキャンペーンページ。
 * 広告との一貫性が最優先なので、FVの文言・並び・配色はバナーに揃えている。
 *
 * CVはページ下部の LPForm（体験予約フォーム）で受ける。CTAはすべて #form へスクロールする。
 * 送信成功後はサンクスページ（thanks.tsx・/sakura-shinjuku-sanchome2/thanks）へ遷移する。
 * 送信時に LPForm が Meta Pixel の CVイベント（フィットネスは既定で Lead）を撃つ。
 *
 * 公開前に必ず確認すること（指示書 §7）:
 *   - store      … 徒歩分数（既存LPは2分、バナーは3分）と住所・営業時間。
 *   - notes      … 特典の適用条件・先着10名の管理方法。顧客確認後に差し替える。
 *   - fv.status  … OPEN前は「体験予約受付スタート！」、OPEN後（2026-11-16〜）は「OPEN記念キャンペーン！」。
 *   - 通常価格（体験5,500円・入会金33,000円）はバナー記載どおり。
 */

/** 画像スロット。`src` が空ならプレースホルダが出る。 */
export interface Slot {
  placeholder: string;
  src?: string | null;
  /** 切り抜き位置（object-position）。既定は "center"。 */
  position?: string;
  /** `src` が動画のとき、再生開始までに出す静止画。 */
  poster?: string;
}

/** 3大特典の1枚。`was` があれば二重価格、無ければ `gift` を出す。 */
export interface Perk {
  no: string;
  label: string;
  was?: string;
  now?: string;
  gift?: string;
}

/** お悩みアイコンの種類。page.tsx の WorryIcon と対応する。 */
export type WorryIconKind = "posture" | "shape" | "swelling" | "inactive" | "easy";

export interface ShinjukuOpenConfig {
  slug: string;
  status?: ClientStatus;
  meta: { title: string; description: string; ogpImage?: string };

  fv: {
    access: string;
    brand: string;
    tagline: string;
    /** MV写真。上部に人物の顔が来る写真を前提に、ロゴは写真の上の帯に置く。 */
    photo: Slot;
    /** "11月1日" の数字部分とそれ以外を分けて持つ（数字だけ欧文イタリックにするため）。 */
    openDate: { month: string; day: string };
    /** 予約受付が始まっていない間は null にすると帯ごと消える。 */
    status: string | null;
    catch: { pre: string; emphasis: string; post: string };
    ribbon: string;
    limit: { pre: string; num: string; post: string };
    perksHeading: { pre: string; emphasis: string };
  };

  perks: Perk[];

  worry: {
    kicker: string;
    heading: string;
    items: { icon: WorryIconKind; text: string; strong: string }[];
    photo: Slot;
    closing: { pre: string; strong: string };
  };

  closing: {
    eyebrow: string;
    limit: string;
    heading: string;
    rows: { label: string; value: string; unit: string }[];
    push: string;
  };

  cta: { text: string; sub: string };
  form: {
    heading: string;
    lead: string;
    fields: LPFormField[];
    submitLabel: string;
    microcopy: string;
    disclaimer: string;
    errorMessage: string;
    thanks: { heading: string; body: string };
  };
  store: {
    heading: string;
    name: string;
    access: string;
    rows: { label: string; value: string }[];
    mapQuery: string;
  };
  /** 特典の注記。FVの特典カード下と最終CTA下に出す。 */
  notes: string[];
  sticky: { note: string; offers: string[] };
}

const IMG = "/clients/sakura-shinjuku-sanchome2";

/**
 * hacomono（reserve.sakura-pilates.jp/reserve/schedule/69/41）の新宿三丁目店
 * 「パーソナルレッスン」枠。60分レッスン＋15分インターバルで 8:00〜20:30 の11枠・毎日・定休日なし。
 */
const ALL = ["8:00", "9:15", "10:30", "11:45", "13:00", "14:15", "15:30", "16:45", "18:00", "19:15", "20:30"];

/** hacomono の空き枠を写した日。この最終日より後の日付はフォームで選べない（date の max）。 */
export const SLOTS_SNAPSHOT_LAST_DATE = "2026-12-06";

/**
 * 希望日ごとに選べる時間 = hacomono で FULL でない枠（**2026-11-16 時点の写し・自動では更新されない**）。
 * hacomono の予約受付は約3週間先までなので、写せるのも 11/17〜12/6 の20日分。
 *
 * ここに無い日付は時間を選べない（満席扱い）。空配列の日は hacomono で全枠FULL。
 * さらにLPで予約が入った枠は、ページ表示時に Supabase の get_booked_slots から読んで除外する
 * （SlotForm.tsx。supabase/migrations/0042_get_booked_slots.sql）。
 *
 * 更新するとき: Chromeで上記URLを開き（Browser pane・curl は406で弾かれる）、週ごとに
 * `.d_lesson` のうち `full` / `disabled` クラスが付いていない枠の開始時刻を拾って差し替え、
 * SLOTS_SNAPSHOT_LAST_DATE も合わせて進める。
 */
export const HACOMONO_OPEN_SLOTS: Record<string, string[]> = {
  "2026-11-17": ["8:00", "9:15", "10:30", "11:45", "13:00", "14:15", "16:45", "18:00", "19:15", "20:30"],
  "2026-11-18": ["8:00", "9:15", "10:30", "11:45", "13:00", "14:15", "15:30", "16:45", "18:00", "20:30"],
  "2026-11-19": ["8:00", "9:15", "11:45", "13:00", "14:15", "15:30", "16:45", "18:00", "19:15", "20:30"],
  "2026-11-20": ["9:15", "10:30", "11:45", "13:00", "14:15", "15:30", "16:45", "18:00", "19:15", "20:30"],
  "2026-11-21": ["15:30", "16:45", "18:00", "19:15", "20:30"],
  "2026-11-22": ["15:30", "18:00", "19:15", "20:30"],
  "2026-11-23": ALL,
  "2026-11-24": ALL,
  "2026-11-25": ALL,
  "2026-11-26": ["9:15", "10:30", "11:45", "13:00", "14:15", "15:30", "16:45", "18:00", "19:15", "20:30"],
  "2026-11-27": ALL,
  "2026-11-28": [],  // 全枠FULL
  "2026-11-29": ["15:30", "16:45", "18:00", "19:15", "20:30"],
  "2026-11-30": ALL,
  "2026-12-01": ALL,
  "2026-12-02": ALL,
  "2026-12-03": ALL,
  "2026-12-04": ALL,
  "2026-12-05": ["10:30", "11:45", "13:00", "14:15", "15:30", "16:45"],
  "2026-12-06": ["15:30", "16:45", "18:00", "19:15", "20:30"],
};

const toOptions = (times: string[]) => times.map((t) => ({ value: t, label: `${t}〜` }));

/** 時間 select 用。日付ごとの選択肢（LPForm の dateLinkedOptions.byDate）。 */
const SLOT_OPTIONS_BY_DATE = Object.fromEntries(
  Object.entries(HACOMONO_OPEN_SLOTS).map(([d, times]) => [d, toOptions(times)]),
);

const timeField = (dateField: string) => ({
  dateField,
  // 写していない日付は選択肢なし（満席扱い）。
  weekday: [],
  weekend: [],
  byDate: SLOT_OPTIONS_BY_DATE,
});

/**
 * 写真の出典: worry.jpg（お悩み）は SAKURA の撮影素材（sakura-aobadai/future-2.jpg と同一。
 * 原本はドライブ「★広告用撮影素材」）。新宿三丁目店はOPEN前で店舗写真が無いため、
 * ブランド共通のレッスン風景としてのみ使う。店舗写真が届いたら差し替える。
 *
 * MV動画 mv.mp4（20秒ループ・780x940・無音）は同ドライブ「★レッスン風景」フォルダの4本から5.5秒ずつ切り出し、
 * 0.5秒のクロスフェードでつないだもの（顧客修正 2026-10-15「MVを動画に」）。順に
 * チェア-レッスン動画② → タワーレッスン動画② → リフォーマー-レッスン動画② → リフォーマー-レッスン動画⑩。
 * 顔のアップのカット（タワー-レッスン動画④⑤）は使わない（顧客指示）。人物は下端の白グラデーションに
 * 被らないよう、どのカットも枠の上78%に収まる位置で切り出している。
 * 末尾は先頭カットへフェードして戻るので、ループの継ぎ目は見えない。mv-poster.jpg はその先頭フレーム。
 */
const config: ShinjukuOpenConfig = {
  slug: "sakura-shinjuku-sanchome2",
  status: "draft",
  meta: {
    title: "Pilates SAKURA 新宿三丁目店｜11月1日NEW OPEN・先着10名様限定 豪華3大特典",
    description:
      "新宿三丁目駅徒歩3分、女性専用マシンピラティススタジオSAKURAが11月1日NEW OPEN。OPEN記念・先着10名様限定で、体験レッスン（通常5,500円）0円・入会金（通常33,000円）0円・ピラティスソックスプレゼント。",
    // 相対パスだと metadataBase が別ドメインに解決されるため絶対URLで固定する。
    ogpImage: "https://fitness-lp.commitad.com/clients/sakura-shinjuku-sanchome2/ogp.jpg",
  },

  fv: {
    access: "新宿三丁目駅 徒歩3分",
    brand: "SAKURA",
    tagline: "女性専用マシンピラティススタジオ",
    // 20秒のループ動画（無音・自動再生）。枠と同じ 390:470 で書き出し済みなので切り抜き位置の調整は不要。
    photo: {
      placeholder: "MV：マシンピラティスのレッスン風景",
      src: `${IMG}/mv.mp4`,
      poster: `${IMG}/mv-poster.jpg`,
    },
    openDate: { month: "11", day: "1" },
    status: "OPEN記念キャンペーン！",
    catch: { pre: "マシンピラティスで", emphasis: "理想のカラダづくり", post: "を。" },
    ribbon: "OPEN記念",
    limit: { pre: "先着", num: "10", post: "名様限定" },
    perksHeading: { pre: "今だけの", emphasis: "豪華3大特典！" },
  },

  perks: [
    { no: "特典①", label: "体験レッスン", was: "5,500円", now: "0" },
    { no: "特典②", label: "入会金", was: "33,000円", now: "0" },
    { no: "特典③", label: "ピラティス\nソックス", gift: "プレゼント" },
  ],

  worry: {
    kicker: "こんなお悩みありませんか？",
    heading: "こんな方におすすめ！",
    items: [
      { icon: "posture", text: "猫背・反り腰など", strong: "姿勢が気になる" },
      { icon: "shape", text: "お腹・脚・お尻を", strong: "引き締めたい" },
      { icon: "swelling", text: "むくみや", strong: "身体の硬さが気になる" },
      { icon: "inactive", text: "", strong: "運動不足を解消したい" },
      { icon: "easy", text: "", strong: "無理なく運動を始めたい" },
    ],
    photo: { placeholder: "マシンピラティスのレッスン風景", src: `${IMG}/worry.jpg`, position: "center 40%" },
    closing: { pre: "女性専用マシンピラティスで", strong: "自分らしく、\n理想のカラダづくりを。" },
  },

  closing: {
    eyebrow: "11月1日 NEW OPEN！",
    limit: "OPEN記念・先着10名様限定",
    heading: "今なら豪華3大特典！",
    rows: [
      { label: "体験レッスン", value: "0", unit: "円" },
      { label: "入会金", value: "0", unit: "円" },
      { label: "ピラティスソックス", value: "プレゼント", unit: "" },
    ],
    push: "お得に始めるなら今がチャンス！",
  },

  cta: { text: "無料体験を予約する", sub: "体験レッスン0円｜入会金0円｜ソックスプレゼント" },

  form: {
    heading: "無料体験のご予約",
    lead: "下記フォームからお申し込みください。\n担当より日程確定のご連絡をいたします。",
    fields: [
      { type: "text", name: "name", label: "お名前", required: true, placeholder: "山田 花子" },
      { type: "tel", name: "tel", label: "電話番号", required: true, placeholder: "090-0000-0000" },
      { type: "email", name: "email", label: "メールアドレス", required: true, placeholder: "example@mail.com" },
      // 下限は LPForm 既定の「翌日以降」、上限は hacomono の空き枠を写した最終日（2026-11-16）。
      // 時間は希望日に連動して、その日の空き枠だけを出す（HACOMONO_OPEN_SLOTS）。
      { type: "date", name: "date1", label: "ご希望日（第1希望）", required: true, max: SLOTS_SNAPSHOT_LAST_DATE },
      { type: "select", name: "time1", label: "時間", required: true, placeholder: "選択してください", dateLinkedOptions: timeField("date1") },
      { type: "date", name: "date2", label: "ご希望日（第2希望）", optionalTag: "任意", max: SLOTS_SNAPSHOT_LAST_DATE },
      { type: "select", name: "time2", label: "時間", optionalTag: "任意", placeholder: "選択してください", dateLinkedOptions: timeField("date2") },
      {
        type: "textarea",
        name: "note",
        label: "ご質問・ご要望",
        optionalTag: "任意",
        placeholder: "気になるお悩みや、ご質問があればご記入ください。",
        rows: 3,
      },
    ],
    submitLabel: "無料体験を予約する",
    microcopy: "＼ OPEN記念・先着10名様限定 ／",
    disclaimer: "ご入力いただいた内容は体験予約のご連絡のみに利用します。\nしつこい勧誘はいたしません。",
    errorMessage: "未入力の必須項目があります。",
    thanks: {
      heading: "ご予約ありがとうございます",
      body: "内容を確認のうえ、担当より\n日程確定のご連絡をいたします。\nご来店を心よりお待ちしております。",
    },
  },

  /* 出典: 既存の店舗LP sakura-shinjuku-sanchome の access（ヒアリング時点）。
     徒歩分数は既存LPが「C8出口より徒歩2分」、今回の指示書・広告バナーが「徒歩3分」で食い違う。
     広告との一貫性を優先して「3分」で統一（TODO(公開前): 顧客に正しい分数を確認する）。 */
  store: {
    heading: "店舗情報",
    name: "Pilates SAKURA 新宿三丁目店",
    access: "新宿三丁目駅 徒歩3分",
    rows: [
      { label: "住所", value: "東京都新宿区新宿5-18-11\n谷川ビル" },
      {
        label: "アクセス",
        value: "東京メトロ丸ノ内線・副都心線\n都営新宿線「新宿三丁目駅」\nC8出口より徒歩3分\nJR「新宿駅」東口より徒歩8分",
      },
      { label: "営業時間", value: "8:00〜21:30" },
      { label: "定休日", value: "年末年始（12/29〜1/3）" },
      { label: "OPEN", value: "2026年11月1日" },
    ],
    // ビル名を付けると Google 側で特定できずピンが立たない（2026-10-14 確認）ので番地まで。
    mapQuery: "東京都新宿区新宿5丁目18-11",
  },

  /* TODO(公開前): 適用条件は顧客確認待ちの仮文言（指示書 §4①「確認のうえ注記」）。 */
  notes: [
    "※特典はOPEN記念キャンペーン期間中に体験レッスンを受講された、先着10名様が対象です。",
    "※金額はすべて税込です。特典の詳しい適用条件は体験時にご案内します。",
  ],

  sticky: { note: "＼ OPEN記念・先着10名様限定 ／", offers: ["体験 0円", "入会金 0円", "ソックス進呈"] },
};

export default config;
