import type { ClientStatus } from "@shared/index";
import type { LPFormField } from "@/components/LPForm";

/**
 * Pilates SAKURA 新宿三丁目店 — 11/1 NEW OPEN 記念のMeta広告用・短尺LP。
 *
 * 指示書: 「Pilates SAKURA 新宿三丁目店｜LP制作指示書」（2026-10-14）
 * 参照: 成果良好のMeta広告バナー（新宿三丁目駅 徒歩3分／11月1日 NEW OPEN!／先着30名様限定／3大特典）
 *
 * 長尺の店舗LP `sakura-shinjuku-sanchome` とは別物。こちらは広告バナーの続きとして
 * 「① FV（特典） → ② お悩み → ③ 最終CTA → ④ 予約フォーム」だけで予約へ送る、OPEN記念のキャンペーンページ。
 * 広告との一貫性が最優先なので、FVの文言・並び・配色はバナーに揃えている。
 *
 * CVはページ下部の LPForm（体験予約フォーム）で受ける。CTAはすべて #form へスクロールする。
 * 送信時に LPForm が Meta Pixel の CVイベント（フィットネスは既定で Lead）を撃つ。
 *
 * 公開前に必ず確認すること（指示書 §7）:
 *   - store      … 徒歩分数（既存LPは2分、バナーは3分）と住所・営業時間。
 *   - notes      … 特典の適用条件・先着30名の管理方法。顧客確認後に差し替える。
 *   - fv.status  … 「体験予約受付スタート！」は実際に予約可能になってから出す。
 *   - 通常価格（体験5,500円・入会金33,000円）はバナー記載どおり。
 */

/** 画像スロット。`src` が空ならプレースホルダが出る。 */
export interface Slot {
  placeholder: string;
  src?: string | null;
  /** 切り抜き位置（object-position）。既定は "center"。 */
  position?: string;
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

/** 希望時間の選択肢。営業 8:00〜21:30・体験60分なので、開始は 8:00〜20:30 の30分刻み。 */
const TIME_SLOTS = Array.from({ length: 26 }, (_, i) => {
  const t = `${8 + Math.floor(i / 2)}:${i % 2 ? "30" : "00"}`;
  return { value: t, label: `${t}〜` };
});

/**
 * 写真の出典: lesson.jpg（MV）／worry.jpg（お悩み）は SAKURA の撮影素材（それぞれ sakura-aobadai/hero-a.jpg・future-2.jpg と同一。
 * 原本はドライブ「★広告用撮影素材」）。新宿三丁目店はOPEN前で店舗写真が無いため、
 * ブランド共通のレッスン風景としてのみ使う。店舗写真が届いたら差し替える。
 */
const config: ShinjukuOpenConfig = {
  slug: "sakura-shinjuku-sanchome2",
  status: "draft",
  meta: {
    title: "Pilates SAKURA 新宿三丁目店｜11月1日NEW OPEN・先着30名様限定 豪華3大特典",
    description:
      "新宿三丁目駅徒歩3分、女性専用マシンピラティススタジオSAKURAが11月1日NEW OPEN。OPEN記念・先着30名様限定で、体験レッスン（通常5,500円）0円・入会金（通常33,000円）0円・ピラティスソックスプレゼント。",
    // 相対パスだと metadataBase が別ドメインに解決されるため絶対URLで固定する。
    ogpImage: "https://fitness-lp.commitad.com/clients/sakura-shinjuku-sanchome2/ogp.jpg",
  },

  fv: {
    access: "新宿三丁目駅 徒歩3分",
    brand: "SAKURA",
    tagline: "女性専用マシンピラティススタジオ",
    photo: { placeholder: "MV：マシンピラティスのレッスン風景", src: `${IMG}/lesson.jpg`, position: "47% center" },
    openDate: { month: "11", day: "1" },
    status: "新宿三丁目店 体験予約受付スタート！",
    catch: { pre: "マシンピラティスで", emphasis: "理想のカラダづくり", post: "を。" },
    ribbon: "OPEN記念",
    limit: { pre: "先着", num: "30", post: "名様限定" },
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
    limit: "OPEN記念・先着30名様限定",
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
      // OPEN前は11/1以降しか選べないようにする（OPEN後は min を外すと「翌日以降」が既定になる）。
      { type: "date", name: "date1", label: "ご希望日（第1希望）", required: true, min: "2026-11-01" },
      { type: "select", name: "time1", label: "時間", required: true, placeholder: "選択してください", options: TIME_SLOTS },
      { type: "date", name: "date2", label: "ご希望日（第2希望）", optionalTag: "任意", min: "2026-11-01" },
      { type: "select", name: "time2", label: "時間", optionalTag: "任意", placeholder: "選択してください", options: TIME_SLOTS },
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
    microcopy: "＼ OPEN記念・先着30名様限定 ／",
    disclaimer: "ご入力いただいた内容は体験予約のご連絡のみに利用します。\nしつこい勧誘はいたしません。",
    errorMessage: "未入力の必須項目があります。",
    thanks: {
      heading: "ご予約ありがとうございます",
      body: "内容を確認のうえ、担当より日程確定のご連絡をいたします。\n11月1日のOPENを楽しみにお待ちください。",
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
    "※特典はOPEN記念キャンペーン期間中に体験レッスンを受講された、先着30名様が対象です。",
    "※金額はすべて税込です。特典の詳しい適用条件は体験時にご案内します。",
  ],

  sticky: { note: "＼ OPEN記念・先着30名様限定 ／", offers: ["体験 0円", "入会金 0円", "ソックス進呈"] },
};

export default config;
