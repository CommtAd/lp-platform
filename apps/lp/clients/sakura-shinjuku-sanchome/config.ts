import type { PatternAConfig } from "@/clients/pattern-a.types";

/**
 * パーソナルマシンピラティス SAKURA 新宿3丁目店 — 実顧客LP（2026/10/15 OPEN予定）。
 * sakura-yoyogiuehara の構成・トンマナを引き継ぎ、内容を新宿3丁目店のヒアリングに差し替えたもの。
 * 横幅ずれ防止ルール（CLAUDE.md §16〜20）の対象なので、page.tsx は <LPCanvas> で組んでいる。
 *
 * 写真: 人物・レッスン・ウェアは SAKURA ブランド共通の撮影素材を流用。
 * 店舗固有の写真（内観・キッズ対応）は新宿3丁目店の素材待ちのためプレースホルダ。インストラクター紹介は掲載しない。
 */
const IMG = "/clients/sakura-shinjuku-sanchome";

const config: PatternAConfig = {
  slug: "sakura-shinjuku-sanchome",
  status: "draft",
  meta: {
    title:
      "パーソナルマシンピラティス SAKURA 新宿3丁目店｜女性専用・60分無料体験",
    description:
      "新宿三丁目駅 C8出口徒歩2分、女性専用・完全個室のパーソナルマシンピラティスSAKURA。予約が取りやすい独自の仕組みと手ぶらで通える環境で、忙しい女性も無理なく続けられます。今だけ60分の体験レッスン＆入会金が0円。2026年10月15日OPEN予定。",
    ogpImage: `${IMG}/ogp.jpg`,
  },
  accent: "#C25C79",
  showMonitorBadge: true,

  header: {
    brand: "SAKURA",
    brandSub: "パーソナルマシンピラティス 新宿3丁目店",
    access: [{ station: "新宿三丁目駅", walk: "徒歩2分" }],
  },
  offerBar: {
    badgeLines: ["今だけ", "0円"],
    text: "60分体験＆カウンセリングが0円",
  },
  achievement: {
    pre: "Google口コミ",
    num: "★5.0",
    post: "",
  },

  fv: {
    catchLines: ["筋肉質にならず、", "しなやかに美しく。"],
    hero: { placeholder: "レッスン風景（メインビジュアル）", src: `${IMG}/hero.jpg`, position: "center" },
    leftCard: { small: "60分体験", big: "無料" },
    rightCard: { small: "入会金", big: "無料" },
  },

  offer: {
    eyebrow: "＼ 10/15 NEW OPEN・今だけ無料 ／",
    heading: "60分の体験レッスン",
    trialBadge: "カウンセリング・レッスン・ご案内すべて込み",
    trialRegular: "5,500",
    items: [
      "丁寧な\nカウンセリング",
      "マシン\nピラティス体験",
      "専門的な\nフィードバック",
      "完全個室で\nマンツーマン",
      "全員女性の\nスタッフ",
      "ウェア・靴下\n無料レンタル",
    ],
    photos: [
      { placeholder: "レッスン風景", src: `${IMG}/offer-1.jpg` },
      { placeholder: "無料レンタルウェア", src: `${IMG}/offer-2.jpg` },
    ],
    joinLabel: "入会金",
    joinRegular: "33,000",
    regular: { prefix: "他スタジオから乗り換えで2ヶ月目", amount: "10,000", suffix: "円OFF" },
    ctaText: "無料体験を予約する",
  },

  about: {
    heading: "SAKURA について",
    photo: { placeholder: "スタジオの様子", src: `${IMG}/about.jpg` },
    caption: "Personal Machine Pilates",
    lead: "いつからでも、いつまでも、\n心と身体を美しく。",
    body: "SAKURAは、全米スポーツ医学協会の有資格者が監修した独自メソッドで、ピラティスに“ボディメイクの視点”を大きく取り入れた女性専用スタジオです。メディカルな視点からお一人おひとりの身体と向き合い、無理なく続けられる美しさへと導きます。",
  },

  worry: {
    heading: "こんなお悩み、ありませんか？",
    cards: [
      { img: { placeholder: "ボディライン", src: `${IMG}/worry-1-body.jpg` }, text: "筋肉質にならず\nボディラインを整えたい" },
      { img: { placeholder: "姿勢", src: `${IMG}/worry-2-posture.jpg` }, text: "デスクワークの猫背・\n巻き肩を改善したい" },
      { img: { placeholder: "むくみ・冷え", src: `${IMG}/worry-3-cold.jpg` }, text: "むくみや冷えを改善して\nリフレッシュしたい" },
      { img: { placeholder: "産後ケア", src: `${IMG}/worry-4-postnatal.jpg` }, text: "産後の骨盤ケアや\n体型戻しをしたい" },
    ],
    closingPre: "そのお悩み、",
    closingHighlight: "SAKURAで叶います。",
  },

  reasons: {
    heading: "SAKURAが選ばれる理由",
    items: [
      {
        num: "01",
        img: { placeholder: "女性専用スタジオ", src: `${IMG}/reason-1.jpg` },
        title: "完全個室の女性専用\nパーソナル",
        body: "スタジオもインストラクターも、すべて女性。清潔感のある完全個室で、人目を気にせず自分のペースでレッスンに集中できます。会員様の80%がピラティス未経験からのスタートです。",
      },
      {
        num: "02",
        img: { placeholder: "独自メソッド", src: `${IMG}/reason-2.jpg` },
        title: "全米スポーツ医学協会\n監修の独自メソッド",
        body: "有資格者が監修したプログラムで、ピラティスにボディメイクの視点を大きくプラス。メディカルな視点から、あなたのお悩みやなりたい姿に合わせて的確にアプローチします。",
      },
      {
        num: "03",
        img: { placeholder: "新宿3丁目店 内観（素材待ち）" },
        title: "予約が取りやすく、\n手ぶら＆駅近で通いやすい",
        body: "独自の予約システムで、忙しい方でも予約が取りやすいのがSAKURAの強み。ウェアの無料レンタルで仕事帰りも手ぶらでOK。パーソナルなのにリーズナブルで、無理なく続けられます。",
        trio: [
          { label: "駅徒歩2分", desc: "新宿三丁目駅\nC8出口すぐ" },
          { label: "8:00-21:30", desc: "仕事帰りも\n休日も通える" },
          { label: "手ぶらOK", desc: "ウェア・靴下\n無料レンタル" },
        ],
      },
    ],
    ctaText: "無料体験を予約する",
    ctaSub: "60分体験0円｜入会金0円",
  },

  /* 新宿3丁目店はインストラクター紹介を載せない（顧客判断）。型上必須なので show: false で常に非表示。 */
  trainers: {
    show: false,
    heading: "インストラクター紹介",
    lead: "在籍するのは、全員女性のインストラクター。\n国内外の資格をもつ専門スタッフが、丁寧にサポートします。",
    swipeHint: "スワイプでご覧いただけます",
    items: [],
  },

  scenes: {
    heading: "あなたの毎日に、ピラティスを",
    items: [
      {
        img: { placeholder: "仕事帰り", src: `${IMG}/scene-1-work.jpg` },
        title: "「仕事帰りに、手ぶらで整える」",
        body: "夜21:30まで営業、新宿三丁目駅から徒歩2分。ウェアは無料レンタルなので、お仕事帰りに手ぶらで立ち寄って、こわばった身体をリセットできます。",
      },
      {
        img: { placeholder: "お子様連れのママ（素材待ち）" },
        title: "「子育ての合間にも、安心して」",
        body: "お子様同伴OKの完全個室。周りに気をつかわず、産後の骨盤ケアや体型戻しにじっくり取り組んでいただけます。",
      },
      {
        img: { placeholder: "休日の朝", src: `${IMG}/scene-3-morning.jpg` },
        title: "「休日の朝は、自分メンテナンス」",
        body: "朝8時から営業。休日の朝の時間を有効に使って、リフレッシュとボディメイクを習慣にできます。",
      },
    ],
  },

  flow: {
    heading: "60分無料体験の流れ",
    steps: [
      {
        num: "1",
        title: "カウンセリング",
        time: "約15分",
        body: "お悩みやなりたい姿、生活習慣を丁寧にヒアリング。あなたに合ったプランをご提案します。",
      },
      {
        num: "2",
        title: "パーソナルマシンピラティス体験",
        time: "約35分",
        body: "実際にマシンを使ったレッスンを体験。専門インストラクターがマンツーマンでサポートします。",
      },
      {
        num: "3",
        title: "フィードバック・ご案内",
        time: "約10分",
        body: "身体の状態やレッスンの感想をシェア。今後の通い方やプランについてご案内します。",
      },
    ],
  },

  faq: {
    heading: "よくあるご質問",
    items: [
      {
        q: "ピラティスが初めてでも大丈夫ですか？",
        a: "はい。会員様の約80%がピラティス未経験からスタートされています。専門インストラクターがマンツーマンで一から丁寧にサポートしますので、運動が苦手な方もご安心ください。",
      },
      {
        q: "予約は取りやすいですか？",
        a: "はい。独自の予約システムで、予約の取りやすさにこだわっています。お仕事帰りや子育ての合間など、ライフスタイルに合わせて無理なく通い続けていただけます。",
      },
      {
        q: "体験当日は何を持っていけばいいですか？",
        a: "体験レッスンではウェア（トップス・パンツ）・靴下を無料でお貸出ししていますので、手ぶらでお越しいただけます。お着替えスペースも完備しています。",
      },
      {
        q: "男性も通えますか？",
        a: "SAKURAは女性専用スタジオです。インストラクターも全員女性ですので、人目を気にせず安心してお通いいただけます。",
      },
      {
        q: "子どもを連れて行けますか？",
        a: "はい、お子様同伴が可能です。完全個室なので、産後のママも周りを気にせず安心してレッスンを受けていただけます。",
      },
    ],
  },

  access: {
    heading: "スタジオのご案内",
    stores: [
      {
        img: { placeholder: "新宿3丁目店 外観・内観（素材待ち）" },
        name: "パーソナルマシンピラティス SAKURA 新宿3丁目店",
        address: "東京都新宿区新宿5-18-11 谷川ビル",
        hours: "営業時間 8:00〜21:30",
        route:
          "\n定休日：年末年始（12/29〜1/3）\n2026年10月15日 OPEN予定\n東京メトロ丸ノ内線・副都心線、都営新宿線「新宿三丁目駅」C8出口より徒歩2分\nJR「新宿駅」東口より徒歩8分",
      },
    ],
  },

  form: {
    heading: "無料体験のご予約",
    lead: "下記フォームからお気軽にお申し込みください。\n担当より順次ご連絡いたします。",
    fields: [
      { type: "text", name: "name", label: "お名前", required: true, placeholder: "山田 花子" },
      { type: "tel", name: "tel", label: "電話番号", required: true, placeholder: "090-0000-0000" },
      { type: "email", name: "email", label: "メールアドレス", optionalTag: "任意", placeholder: "example@mail.com" },
      { type: "date", name: "date1", label: "ご希望日(第1希望)" },
      { type: "date", name: "date2", label: "ご希望日(第2希望)", optionalTag: "任意" },
      {
        type: "textarea",
        name: "note",
        label: "ご希望の時間帯・ご相談内容",
        optionalTag: "任意",
        placeholder: "例）平日の夜、土曜の午前など。ご質問もお気軽にどうぞ。",
        rows: 4,
      },
    ],
    submitLabel: "この内容で予約する",
    disclaimer:
      "ご入力いただいた内容は予約対応のみに利用します。\n60分体験0円｜入会金0円｜しつこい勧誘はいたしません。",
    errorMessage: "お名前・電話番号は必須項目です。",
  },

  sticky: {
    offers: [
      { label: "60分体験", value: "¥0" },
      { label: "入会金", value: "¥0" },
    ],
    buttonText: "無料体験を予約する",
    anchor: "#form",
  },
};

/** お客様の声（ヒアリングQ23）。パターンAの型に枠がないため page.tsx 側で描画する。 */
export const voices = [
  {
    who: "30代・会社員",
    worry: "長時間のデスクワークで姿勢が悪化、肩こりも慢性的に",
    body: "マンツーマン指導で体の使い方が分かり、仕事中の姿勢や体の軽さがガラッと変わりました。",
  },
  {
    who: "30代・ママ",
    worry: "産後の体型崩れと運動不足",
    body: "個室＆子連れOKなので安心して通えて、無理なく体幹が引き締まってきました。",
  },
  {
    who: "40代",
    worry: "運動が苦手で、何をしても長続きしない",
    body: "周りの目を気にせず自分のペースで学べるので、今では毎週の楽しみになっています。",
  },
];

export default config;
