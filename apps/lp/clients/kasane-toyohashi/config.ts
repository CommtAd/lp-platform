import type { ClientStatus } from "@shared/index";
import type { LPFormField } from "@/components/LPForm";

/**
 * Pilates KASANE バロー豊橋店 — Meta広告用LP（体験予約の獲得）。
 *
 * 構成・情報の見せ方・CTA配置は `b-body-pilates` を参考にしている。
 * 情報の優先順位: 制作指示書（`brief.md`）> 店舗HP > ブランドページ。
 *
 * 予約導線はページ下部の予約フォーム（LPForm、`#reserve`）。全CTA・追従フッターは
 * `reserve.url` を見ていて、現在は `#reserve`。hacomono へ直接送る形に戻すときは
 * `reserve.url` を `HACOMONO_URL` に替え、`scripts/check-rules.ts` の FORM_EXEMPT に登録し直す。
 *
 * **表現上の禁止事項（指示書 §9）**
 *   - 定員の人数を書かない。公式でも「4名〜」「5名以下〜最大12名」と表記が揺れているため、
 *     「少人数制」とだけ言う。「完全マンツーマン」「全レッスン4名以下」も不可。
 *   - バロー豊橋店は店舗HPで「パーソナルレッスンなし」。パーソナルを訴求しない。
 *   - 効果の保証・Before/After・架空の口コミや実績は書かない。
 *   - キャンペーンの条件・期限、料金は推測で書かない。
 *
 * **公開前に店舗確認が必要な項目**は `confirm: true` を付け、画面上に【要確認】を出している。
 * 確認が取れたら外すこと。
 *
 * 配色（指示書 §5: 白・アイボリー／ベージュ・グレージュ／ブラウン・くすみ暖色）
 *   - メイン #5E4636 … 落ち着いたブラウン。白地 9:1。見出し・濃色の地。
 *   - CTA   #A9573A … くすみテラコッタ。白文字 5:1。ボタンと「0円」の数字だけに使う。
 *   - 地     #FBF8F2（アイボリー）／#F3EDE4（グレージュ）／#E9E0D3（ベージュ）。
 */

/** hacomono の体験予約（指示書 §7 の候補URL）。現在は未使用。外部予約へ戻すときに使う。 */
export const HACOMONO_URL = "https://pilates-kasane.hacomono.jp/reserve/schedule/66/105";

interface Slot {
  placeholder: string;
  src?: string | null;
  position?: string;
}

/** キャンペーン1項目。`value` を特大で置く。`regular` は通常料金が確定したら入れる（打ち消し線で併記）。 */
interface Offer {
  label: string;
  value: string;
  unit: string;
  regular?: string | null;
}

export interface KasaneConfig {
  slug: string;
  status?: ClientStatus;
  meta: { title: string; description: string; ogpImage?: string };

  /**
   * ロゴ。KASANEのロゴは加工・別フォント・指定外の色が禁止（ブランドロゴ ガイドライン）。
   * 公式データ（#54564b／黒／白）が届いたら `logo` にパスを入れる。空の間は `brand` を
   * ロゴに似せない素のテキストで出す。
   */
  header: { logo?: string | null; brand: string; store: string; badge: string };
  offerBar: string[];

  fv: {
    hero: Slot;
    catchLines: string[];
    sub: string;
    features: string[];
  };

  /** FV・キャンペーン・料金・最終CTAで使い回す4特典。 */
  offers: Offer[];
  /** 特典の注記。条件が確定したら差し替える。 */
  offerNote: { text: string; confirm?: boolean };

  campaign: { kicker: string; heading: string };

  worry: {
    kicker: string;
    heading: string;
    img: Slot;
    items: { text: string; strong?: boolean }[];
    bridge: string;
  };

  benefit: {
    kicker: string;
    heading: string;
    items: { num: string; title: string; body: string; img: Slot }[];
    note: string;
  };

  reasons: {
    kicker: string;
    heading: string;
    items: { num: string; title: string; body: string; img: Slot; major?: boolean }[];
  };

  program: {
    kicker: string;
    heading: string;
    lead: string;
    items: { en: string; name: string; body: string; img: Slot; confirm?: boolean }[];
  };

  twice: {
    kicker: string;
    heading: string;
    lead: string;
    items: { num: string; title: string; body: string; img: Slot }[];
    closing: string;
    confirm?: string;
  };

  studio: {
    kicker: string;
    heading: string;
    body: string;
    points: string[];
    gallery: Slot[];
  };

  flow: {
    kicker: string;
    heading: string;
    total: { label: string; value: string; note: string };
    items: { num: string; title: string; body: string; time?: string; img: Slot }[];
  };

  price: {
    kicker: string;
    heading: string;
    /** 月会費プラン。確定した公式情報だけを入れる。空なら「確定後に掲載」の枠を出す。 */
    plans: { name: string; price: string; note?: string }[];
    emptyNote: string;
  };

  faq: { kicker: string; heading: string; items: { q: string; a: string; confirm?: boolean }[] };

  access: {
    kicker: string;
    heading: string;
    name: string;
    img: Slot;
    rows: { label: string; value: string; strong?: boolean }[];
    mapEmbedSrc: string;
  };

  closing: { heading: string; lead: string; points: string[] };

  /** `url` が "#…" ならページ内フォームへスクロール、http(s) なら新規タブで外部遷移。 */
  reserve: { label: string; url: string; note: string };

  form: {
    kicker: string;
    heading: string;
    lead: string;
    fields: LPFormField[];
    submitLabel: string;
    microcopy: string;
    disclaimer: string;
  };

  sticky: { buttonText: string; showAfter: number };
  footer: { copyright: string };
}

/**
 * 希望時間は時間帯で取る。グループレッスンは開始時刻が店舗のスケジュールで決まっていて
 * LP側では分からないため、具体的な時刻は推測で並べない。営業 10:00〜21:00。
 */
const timeBands = ["10:00〜12:00", "12:00〜15:00", "15:00〜18:00", "18:00〜21:00", "いつでもよい"].map((t) => ({
  value: t,
  label: t,
}));

const formFields: LPFormField[] = [
  { name: "name", label: "お名前", type: "text", required: true, placeholder: "例）山田 花子" },
  { name: "kana", label: "フリガナ", type: "text", required: true, placeholder: "例）ヤマダ ハナコ" },
  { name: "tel", label: "電話番号", type: "tel", required: true, placeholder: "例）09012345678" },
  { name: "email", label: "メールアドレス", type: "email", required: true, placeholder: "例）example@mail.com" },
  { name: "date1", label: "体験希望日（第1希望）", type: "date", required: true },
  { name: "time1", label: "希望の時間帯（第1希望）", type: "select", required: true, options: timeBands, placeholder: "選択してください" },
  {
    name: "date2",
    label: "体験希望日（第2希望）",
    type: "date",
    required: true,
    hint: "第1希望とは別の日を選ぶと、ご案内がスムーズです。",
  },
  { name: "time2", label: "希望の時間帯（第2希望）", type: "select", required: true, options: timeBands, placeholder: "選択してください" },
  {
    name: "concerns",
    label: "気になっていること",
    type: "checkboxGroup",
    optionalTag: "任意・複数可",
    columns: 2,
    options: [
      { value: "下腹部", label: "下腹部" },
      { value: "くびれ・下半身", label: "くびれ・下半身" },
      { value: "猫背・巻き肩", label: "猫背・巻き肩" },
      { value: "反り腰・骨盤周り", label: "反り腰・骨盤周り" },
      { value: "身体の硬さ", label: "身体の硬さ" },
      { value: "運動不足", label: "運動不足" },
    ],
  },
  {
    name: "message",
    label: "ご質問・お伝えしておきたいこと",
    type: "textarea",
    optionalTag: "任意",
    rows: 4,
    placeholder: "例）ピラティスは初めてです。",
  },
];

const config: KasaneConfig = {
  slug: "kasane-toyohashi",
  status: "draft",
  meta: {
    title: "【体験0円・入会金0円】少人数制マシンピラティス｜Pilates KASANE バロー豊橋店",
    description:
      "気になる下腹も、姿勢も。少人数制で初心者にも丁寧なマシンピラティス。和を基調とした落ち着いたスタジオで、50分の体験レッスンが無料。バロー豊橋2F・無料駐車場あり。",
  },

  header: { logo: null, brand: "Pilates KASANE", store: "バロー豊橋店", badge: "無料駐車場あり" },
  offerBar: ["体験 0円", "入会金 0円", "初月会費 0円"],

  fv: {
    hero: { placeholder: "マシンピラティスのレッスン風景", src: "/clients/kasane-toyohashi/studio-reformer.jpg", position: "48% center" },
    catchLines: ["気になる下腹も、姿勢も。", "私らしく、", "しなやかな身体へ。"],
    sub: "少人数制で、初心者にも丁寧な\nマシンピラティス。",
    features: ["少人数制の\n丁寧な指導", "無料駐車場\n完備", "50分の\n体験レッスン"],
  },

  offers: [
    { label: "体験レッスン", value: "0", unit: "円", regular: null },
    { label: "じっくり", value: "2", unit: "回体験", regular: null },
    { label: "入会金", value: "0", unit: "円", regular: null },
    { label: "初月会費", value: "0", unit: "円", regular: null },
  ],
  /* 文言はKASANE表記ガイドライン「固定表記・クレジット／キャンペーン」の指定どおり。改行位置だけこちらで決めている。 */
  offerNote: {
    text: "※店舗により適用条件が異なります。\n※割引の適用タイミングは店舗により\n異なる場合がございます。\n詳細は各店へお問い合わせください。",
    confirm: true,
  },

  campaign: { kicker: "CAMPAIGN", heading: "今なら、お得に\nピラティスをスタート！" },

  worry: {
    kicker: "WORRIES",
    heading: "こんなお悩み、\nありませんか？",
    img: { placeholder: "お悩みのイメージ", src: "/clients/kasane-toyohashi/lesson-seated.jpg", position: "50% 25%" },
    items: [
      { text: "下腹部のゆるみが気になる", strong: true },
      { text: "くびれや下半身を引き締めたい", strong: true },
      { text: "猫背や巻き肩が気になる", strong: true },
      { text: "反り腰や骨盤周りが気になる" },
      { text: "昔よりも身体が硬くなった" },
      { text: "運動を始めたいけど、\n続けられるか不安" },
    ],
    bridge: "そんな身体のお悩みに、\nマシンピラティスという選択を。",
  },

  benefit: {
    kicker: "BENEFIT",
    heading: "ただ鍛えるだけじゃない。\n姿勢から、身体の印象を整える。",
    items: [
      {
        num: "01",
        title: "すっきりとした\nボディラインへ",
        body: "体幹やインナーマッスルを意識したエクササイズで、引き締まった身体づくりをサポートします。",
        img: { placeholder: "ボディライン", src: "/clients/kasane-toyohashi/core.jpg", position: "40% 35%" },
      },
      {
        num: "02",
        title: "美しく自然な姿勢へ",
        body: "呼吸・骨盤・背骨の動きを意識しながら、正しい身体の使い方を学んでいきます。",
        img: { placeholder: "姿勢", src: "/clients/kasane-toyohashi/posture-check.jpg", position: "60% 30%" },
      },
      {
        num: "03",
        title: "動きやすく、\nしなやかな身体へ",
        body: "身体の柔軟性や可動域にアプローチし、日常生活でも動きやすい身体を目指します。",
        img: { placeholder: "しなやかな身体", src: "/clients/kasane-toyohashi/stretch.jpg", position: "45% 55%" },
      },
    ],
    note: "※感じ方には個人差があります。",
  },

  reasons: {
    kicker: "REASON",
    heading: "KASANEが\n選ばれる5つの理由",
    items: [
      {
        num: "01",
        title: "少人数制だから、\n一人ひとりに丁寧な指導",
        body: "大人数のレッスンでは不安な方も安心。インストラクターが一人ひとりの動きを確認しながらサポートします。初心者の方も、自分のペースで学べる環境です。",
        img: { placeholder: "インストラクターが動きをサポートする様子", src: "/clients/kasane-toyohashi/lesson-assist.jpg", position: "65% 40%" },
        major: true,
      },
      {
        num: "02",
        title: "身体の基礎から学べる\n独自プログラム",
        body: "呼吸・骨盤・背骨の動きを一つずつ丁寧に。身体の使い方を理解しながらエクササイズを進めるので、「なんとなく動く」で終わりません。",
        img: { placeholder: "基礎プログラムのレッスン", src: "/clients/kasane-toyohashi/posture-check-2.jpg", position: "50% 35%" },
        major: true,
      },
      {
        num: "03",
        title: "マシンのサポートで\n初心者も始めやすい",
        body: "専用マシンが動きを支えてくれるので、運動経験が少ない方も無理のない範囲で身体を動かせます。",
        img: { placeholder: "ピラティスマシン", src: "/clients/kasane-toyohashi/lesson-reformer.jpg", position: "40% 55%" },
      },
      {
        num: "04",
        title: "和を基調とした\n落ち着いた空間",
        body: "和モダンで清潔感のあるスタジオ。気張りすぎず、自分の身体と向き合える心地よい雰囲気です。",
        img: { placeholder: "スタジオ内装", src: "/clients/kasane-toyohashi/lesson-seated.jpg", position: "50% 30%" },
      },
      {
        num: "05",
        title: "無料駐車場完備で\n車でも通いやすい",
        body: "バロー豊橋の2Fにあり、無料駐車場をご利用いただけます。お買い物ついでや、子育て・お仕事の合間にも通いやすい立地です。",
        img: { placeholder: "バロー豊橋の外観・駐車場" },
      },
    ],
  },

  program: {
    kicker: "PROGRAM",
    heading: "身体の基礎から、\n少しずつ。",
    lead: "自分に合ったレッスンで、\n理想の身体づくりを。",
    items: [
      {
        en: "Relax",
        name: "呼吸",
        body: "呼吸と身体の動きを意識し、インナーマッスルにアプローチするプログラム。",
        img: { placeholder: "Relax のレッスン", src: "/clients/kasane-toyohashi/lesson-seated.jpg", position: "45% 35%" },
      },
      {
        en: "Core",
        name: "骨盤",
        body: "骨盤の動きや体幹を意識するプログラム。反り腰や下腹部、骨盤周りが気になる方に。",
        img: { placeholder: "Core のレッスン", src: "/clients/kasane-toyohashi/core.jpg", position: "45% 40%" },
      },
      {
        en: "Stretch",
        name: "背骨",
        body: "背骨の動きや柔軟性にフォーカスし、身体のコンディションを整えるプログラム。",
        img: { placeholder: "Stretch のレッスン", src: "/clients/kasane-toyohashi/stretch.jpg", position: "45% 50%" },
      },
      {
        en: "Posture",
        name: "美姿勢",
        body: "美しい姿勢づくりにフォーカスしたプログラム。（正式名称・内容を店舗に確認して差し替え）",
        img: { placeholder: "美姿勢プログラムのレッスン", src: "/clients/kasane-toyohashi/posture-check.jpg", position: "65% 35%" },
        confirm: true,
      },
    ],
  },

  twice: {
    kicker: "TRIAL × 2",
    heading: "初めてだからこそ、\n2回じっくり体験。",
    lead: "一度だけではわからない、\nKASANEの魅力を体感してください。",
    items: [
      {
        num: "1",
        title: "マシンピラティスを知る",
        body: "マシンの使い方や基本の動きを体験。スタジオの雰囲気やレッスンの内容を知っていただきます。",
        img: { placeholder: "1回目の体験", src: "/clients/kasane-toyohashi/lesson-reformer.jpg", position: "40% 50%" },
      },
      {
        num: "2",
        title: "自分に合うか、\nもう一度確かめる",
        body: "1回目の経験を踏まえて、身体の動かし方や「続けるイメージ」をもう一歩深めます。",
        img: { placeholder: "2回目の体験", src: "/clients/kasane-toyohashi/lesson-assist.jpg", position: "70% 45%" },
      },
    ],
    closing: "自分に合うかどうか、\nじっくり確かめてから始められる。",
    confirm: "2回体験の予約方法・受講の流れ・無料の範囲は店舗確認後に記載します。",
  },

  studio: {
    kicker: "STUDIO",
    heading: "通う時間が、\nちょっと楽しみになる。",
    body: "KASANEは、和を基調とした落ち着いたマシンピラティススタジオ。運動をする場所というだけでなく、日常の喧騒から少し離れて、自分の身体と向き合える空間です。",
    points: ["和モダンな内装", "清潔感のある空間", "落ち着いた雰囲気", "スタッフとの距離が近い", "アットホームで通いやすい"],
    gallery: [
      { placeholder: "スタジオ内装", src: "/clients/kasane-toyohashi/studio-reformer.jpg", position: "50% 55%" },
      { placeholder: "マシンが並ぶ様子", src: "/clients/kasane-toyohashi/lesson-reformer.jpg", position: "30% 75%" },
      { placeholder: "レッスン風景", src: "/clients/kasane-toyohashi/lesson-assist.jpg", position: "60% 50%" },
      { placeholder: "インストラクター", src: "/clients/kasane-toyohashi/posture-check-2.jpg", position: "30% 25%" },
      { placeholder: "受付・パウダースペース" },
    ],
  },

  flow: {
    kicker: "FLOW",
    heading: "初めての方も安心！\n体験レッスンの流れ",
    total: { label: "来店から終了まで", value: "約100分", note: "レッスンは50分" },
    items: [
      {
        num: "01",
        title: "WEBから予約",
        body: "ご希望の日時を選んで、体験レッスンをご予約ください。",
        img: { placeholder: "予約画面" },
      },
      {
        num: "02",
        title: "ご来店・カウンセリング",
        body: "レッスン開始20分前にご来店ください。カウンセリング・姿勢の確認・マシンのご説明を行います。",
        time: "約20分",
        img: { placeholder: "カウンセリング", src: "/clients/kasane-toyohashi/posture-check.jpg", position: "60% 30%" },
      },
      {
        num: "03",
        title: "50分の体験レッスン",
        body: "インストラクターのサポートを受けながら、マシンピラティスを体験していただきます。",
        time: "50分",
        img: { placeholder: "体験レッスン", src: "/clients/kasane-toyohashi/core.jpg", position: "45% 40%" },
      },
      {
        num: "04",
        title: "レッスン後のご案内",
        body: "今後の通い方やご入会について、約30分でご案内します。",
        time: "約30分",
        img: { placeholder: "レッスン後のご案内", src: "/clients/kasane-toyohashi/lesson-seated.jpg", position: "60% 30%" },
      },
    ],
  },

  price: {
    kicker: "PRICE",
    heading: "今なら、\nお得に始められる！",
    plans: [],
    emptyNote: "月会費プランは、確定した公式情報を確認後に掲載します。",
  },

  faq: {
    kicker: "FAQ",
    heading: "よくあるご質問",
    items: [
      {
        q: "ピラティス初心者でも大丈夫ですか？",
        a: "はい。KASANEでは、初心者の方でも取り組みやすい基礎プログラムをご用意しています。インストラクターが丁寧にサポートしますので、安心してお越しください。",
      },
      {
        q: "運動が苦手でも参加できますか？",
        a: "はい。マシンのサポートを活用しながら、ご自身の体力やペースに合わせて取り組めます。",
      },
      {
        q: "車で通うことはできますか？",
        a: "はい。バロー豊橋の無料駐車場をご利用いただけます。",
      },
      {
        q: "体験レッスンは何分ですか？",
        a: "レッスンは50分です。開始20分前までのご来店をお願いしています。レッスン後に約30分のご案内があり、来店から終了まで約100分が目安です。",
      },
      {
        q: "体験に必要な持ち物はありますか？",
        a: "レンタルウェア・レンタルソックス・ミネラルウォーターを無料でご用意しています。手ぶらでお越しいただけます。",
      },
      {
        q: "2回体験はどのように受けられますか？",
        a: "キャンペーンのご利用方法は、店舗確認後に正式なご案内を掲載します。",
        confirm: true,
      },
    ],
  },

  access: {
    kicker: "ACCESS",
    heading: "車でも通いやすい！",
    name: "Pilates KASANE バロー豊橋店",
    img: { placeholder: "店舗外観" },
    rows: [
      { label: "住所", value: "〒440-0851\n愛知県豊橋市前田南町2-17-2\nバロー豊橋 2F" },
      { label: "営業時間", value: "10:00〜21:00", strong: true },
      { label: "定休日", value: "年中無休" },
      { label: "駐車場", value: "無料駐車場あり", strong: true },
      { label: "電車", value: "豊橋鉄道渥美線「柳生橋駅」徒歩7分" },
    ],
    mapEmbedSrc:
      "https://maps.google.com/maps?q=" +
      encodeURIComponent("バロー豊橋 愛知県豊橋市前田南町2-17-2") +
      "&z=16&output=embed",
  },

  closing: {
    heading: "身体を整える、\n新しい習慣を。",
    lead: "まずは体験レッスンから\n始めませんか？",
    points: ["少人数制で丁寧な指導", "初心者も始めやすい", "無料駐車場完備", "体験無料・入会特典あり"],
  },

  reserve: {
    label: "無料体験を予約する",
    url: "#reserve",
    note: "50分の体験レッスン｜手ぶらでOK｜無料駐車場あり",
  },

  form: {
    kicker: "RESERVATION",
    heading: "無料体験レッスンのご予約",
    lead: "ご希望の日と時間帯を2つお選びください。\n確認のうえ、店舗からご連絡いたします。",
    fields: formFields,
    submitLabel: "この内容で無料体験を予約する",
    microcopy: "50分の体験レッスン｜手ぶらでOK｜無料駐車場あり",
    disclaimer: "ご入力いただいた情報は、体験レッスンのご案内のためにのみ使用いたします。",
  },

  sticky: { buttonText: "無料体験を予約する", showAfter: 640 },
  footer: { copyright: "© Pilates KASANE" },
};

export default config;
