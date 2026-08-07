import type { PatternAConfig } from "@/clients/pattern-a.types";

/** 画像は public/clients/estudio/ 配下（撮影データ 2026-08 より選定・Web最適化済み）。 */
const ASSET = "/clients/estudio";

/** 1時間刻みの予約時間スロット（例: 9:00〜20:00）。 */
const hourlySlots = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => {
    const h = from + i;
    return { value: `${String(h).padStart(2, "0")}:00`, label: `${h}:00` };
  });

/**
 * Pilates E-studio（参宮橋 / 女性専用パーソナルピラティス）
 * ヒアリングシート（2026-08）より作成。パターンAをベージュ×ピンクベージュに
 * リテーマ（page.tsx 側でトークン変更済み）。単店舗構成。
 *
 * 画像は撮影データ（Google Drive・全49枚）から選定し public/clients/estudio/ に配置済み。
 *
 * 要確認（ヒアリング未取得）:
 *  - インストラクターのプロフィール（人数・氏名・経歴・資格・メッセージ）
 *    → 現状は事実ベースの汎用文＋実写真。氏名・経歴が来たら trainers を差し替え
 *  - 入会後の月額プラン / 会員価格、通常入会金額
 */
const config: PatternAConfig = {
  slug: "estudio",
  status: "draft",
  meta: {
    title: "Pilates E-studio｜参宮橋駅徒歩1分の女性専用パーソナルピラティス",
    description:
      "小田急線「参宮橋駅」西口より徒歩1分。女性ならではのお悩みに寄りそうパーソナルピラティススタジオ。姿勢評価をもとにしたオーダーメイドレッスンで、猫背・反り腰・産前産後の不調まで一人ひとりに合わせて整えます。60分体験レッスン初回980円・当日入会で入会金0円。",
    ogpImage: `${ASSET}/ogp.jpg`,
  },
  accent: "#6B5645",
  showMonitorBadge: true,

  header: {
    brand: "Pilates E-studio",
    brandSub: "女性専用パーソナルピラティス｜代々木・参宮橋",
    access: [{ station: "参宮橋駅", walk: "西口 徒歩1分" }],
  },
  offerBar: {
    badgeLines: ["体験", "¥980"],
    text: "初回60分体験 ¥980｜入会金0円",
  },
  achievement: { pre: "Google口コミ", num: "★4.95", post: "｜女性専用スタジオ" },

  fv: {
    catchLines: ["女性の悩みに寄りそう", "パーソナルピラティス"],
    hero: { placeholder: "スタジオ内観／マシンピラティスの写真（全面）", src: `${ASSET}/hero.jpg`, position: "center" },
    leftCard: { small: "初回60分体験", big: "¥980" },
    rightCard: { small: "入会金", big: "0円" },
  },

  offer: {
    eyebrow: "はじめての方へ",
    heading: "60分の体験レッスン",
    trialBadge: "当日入会で入会金0円",
    trialRegular: "13,200",
    items: [
      "カウンセリング\n10分",
      "マシンピラティス\n体験40分",
      "レンタルウェア\n無料",
      "レンタルソックス\n無料",
      "お水\n完備",
      "手ぶらで\n通える",
    ],
    photos: [
      { placeholder: "カウンセリングのシーン写真", src: `${ASSET}/offer-counseling.jpg` },
      { placeholder: "マシンピラティスのレッスン写真", src: `${ASSET}/offer-machine.jpg` },
    ],
    joinLabel: "入会金",
    joinRegular: "当日入会で",
    regular: { prefix: "通常 単発レッスン ", amount: "13,200", suffix: "月額プランもご用意しています" },
    ctaText: "60分体験を予約する",
  },

  about: {
    heading: "Pilates E-studio\nについて",
    photo: { placeholder: "スタジオ内観／スタッフの写真", src: `${ASSET}/about.jpg` },
    caption: "Natural × Pilates",
    lead: "ピラティスを通して体を改善し、\n心まで整えていく。",
    body: "女性ならではのお悩みに寄りそう、参宮橋の女性専用パーソナルピラティススタジオ。姿勢評価をもとに骨格を本来の位置へ整え、インナーマッスルを活性化させます。単に体重を落とすだけでなく、基礎代謝を上げながら、しなやかに引き締まった「一生モノの美しいシルエット」を形づくります。",
  },

  worry: {
    heading: "こんなお悩み、ありませんか？",
    cards: [
      { img: { placeholder: "イメージ画像", src: `${ASSET}/worry-1.jpg` }, text: "猫背・巻き肩が\n気になる" },
      { img: { placeholder: "イメージ画像", src: `${ASSET}/worry-2.jpg` }, text: "反り腰・腰痛が\nつらい" },
      { img: { placeholder: "イメージ画像", src: `${ASSET}/worry-3.jpg` }, text: "体重は変わらないのに\nたるんできた" },
      { img: { placeholder: "イメージ画像", src: `${ASSET}/worry-4.jpg` }, text: "産前産後の不調・\n歪みが気になる" },
    ],
    closingPre: "その一つひとつに、",
    closingHighlight: "ここで応えます。",
  },

  reasons: {
    heading: "選ばれる理由",
    items: [
      {
        num: "01",
        img: { placeholder: "スタジオ外観／参宮橋駅周辺の写真", src: `${ASSET}/reason-1.jpg` },
        title: "参宮橋駅 徒歩1分\n通い続けられる好立地",
        body: "小田急線「参宮橋駅」西口より徒歩1分。お仕事帰りやお出かけのついでにも立ち寄りやすく、無理なく続けられる立地です。ウェア・ソックス・お水を完備しているので、手ぶらで思い立った日にそのまま通えます。",
      },
      {
        num: "02",
        img: { placeholder: "マシンピラティス指導中の写真", src: `${ASSET}/reason-2.jpg` },
        title: "一人ひとりに合わせた\nオーダーメイドレッスン",
        body: "姿勢評価をもとに、お悩みや体の状態に合わせてメニューを組み立てるマンツーマンレッスン。機能改善の視点も取り入れ、体の使い方から根本的に整えます。",
        trio: [
          { label: "姿勢評価", desc: "体の状態を\n丁寧にチェック" },
          { label: "個別メニュー", desc: "お悩みに\n合わせて設計" },
          { label: "機能改善", desc: "正しい体の\n使い方へ" },
        ],
      },
      {
        num: "03",
        img: { placeholder: "女性インストラクター／マシンの写真", src: `${ASSET}/reason-3.jpg` },
        title: "女性専用・女性インストラクター\n安心して通える環境",
        body: "女性のお客様に安心してお過ごしいただける空間づくりを大切にしています。指導はすべて女性インストラクターによるマンツーマン。4種類以上のマシンを完備し、1000種類以上のエクササイズに対応します。",
      },
    ],
    ctaText: "60分体験を予約する",
    ctaSub: "初回60分体験 ¥980｜入会金0円",
  },

  trainers: {
    heading: "インストラクター紹介",
    lead: "女性インストラクターによる\nマンツーマン指導です。",
    swipeHint: "",
    items: [
      {
        img: { placeholder: "インストラクターの写真", src: `${ASSET}/trainer.jpg` },
        role: "PILATES INSTRUCTOR",
        name: "ERINA",
        nameEn: "Erina",
        body: "女性ならではのお悩みに寄りそい、姿勢評価をもとにお一人おひとりに合わせたマンツーマン指導を行います。はじめての方も安心してお越しください。",
        tags: ["女性専用", "マンツーマン"],
      },
    ],
  },

  scenes: {
    heading: "こんな方に通われています",
    items: [
      {
        img: { placeholder: "レッスンシーンの写真", src: `${ASSET}/scene-1.jpg` },
        title: "「姿勢や不調を根本から整えたい方」",
        body: "猫背・反り腰・O脚など、日々の不調やクセが気になる方。姿勢評価をもとに、体の使い方から見直していきます。",
      },
      {
        img: { placeholder: "レッスンシーンの写真", src: `${ASSET}/scene-2.jpg` },
        title: "「産前産後の体の変化が気になる方」",
        body: "出産を経ての不調や歪み、体力の低下に。お体の状態に合わせて、無理のないペースで進めます。",
      },
      {
        img: { placeholder: "レッスンシーンの写真", src: `${ASSET}/scene-3.jpg` },
        title: "「理想のボディラインを目指したい方」",
        body: "30〜40代を中心に、幅広い年代の方が通われています。しなやかで引き締まった、一生モノの美しいシルエットへ。",
      },
    ],
  },

  flow: {
    heading: "60分体験レッスンの流れ",
    steps: [
      {
        num: "1",
        title: "カウンセリング",
        time: "約10分",
        body: "お悩みや目標、お体の状態を丁寧にヒアリングします。姿勢評価もこの時間で行います。",
      },
      {
        num: "2",
        title: "マシンピラティス体験",
        time: "約40分",
        body: "あなたに合わせたオーダーメイドのマシンピラティスを、女性インストラクターがマンツーマンでご案内します。",
      },
      {
        num: "3",
        title: "フィードバック・ご案内",
        time: "約10分",
        body: "体験の振り返りと、今後の通い方・ご入会についてご案内します。当日ご入会で入会金0円です。",
      },
    ],
  },

  faq: {
    heading: "よくあるご質問",
    items: [
      {
        q: "運動が苦手・はじめてでも大丈夫ですか？",
        a: "はい、はじめての方がほとんどです。女性インストラクターがマンツーマンで、お一人おひとりのペースに合わせて丁寧にサポートしますのでご安心ください。",
      },
      {
        q: "持ち物は必要ですか？",
        a: "レンタルウェア・ソックス・お水をご用意しているので、手ぶらでお越しいただけます。動きやすい服装であれば、そのままでも受講いただけます。",
      },
      {
        q: "男性も通えますか？",
        a: "当スタジオは女性専用です。男性は既存会員さまのご紹介のみご入会いただけます。あらかじめご了承ください。",
      },
      {
        q: "産前・産後でも受けられますか？",
        a: "産前・産後の受け入れも行っています。お体の状態には個人差がありますので、カウンセリング時にお気軽にご相談ください。",
      },
    ],
  },

  access: {
    heading: "スタジオのご案内",
    stores: [
      {
        img: { placeholder: "スタジオ外観／内観の写真", src: `${ASSET}/store.jpg` },
        name: "Pilates E-studio（参宮橋）",
        address: "〒151-0053 東京都渋谷区代々木4-6-2 宍戸ビル202",
        hours: "平日・土 9:00〜21:00 / 日祝 9:00〜19:00",
        route: "（定休日：不定休）\n小田急線「参宮橋駅」西口より徒歩1分",
      },
    ],
  },

  form: {
    heading: "60分体験のご予約",
    lead: "ご希望の日時をお選びください。担当より24時間以内にご連絡いたします。\n営業時間：平日・土 9:00〜21:00／日祝 9:00〜19:00（日祝の最終受付18:00）",
    fields: [
      { type: "text", name: "name", label: "お名前", required: true, placeholder: "山田 花子" },
      { type: "tel", name: "tel", label: "電話番号", required: true, placeholder: "090-0000-0000" },
      { type: "email", name: "email", label: "メールアドレス", placeholder: "example@mail.com" },
      { type: "date", name: "date1", label: "ご希望日(第1希望)", required: true },
      { type: "select", name: "time1", label: "ご希望時間(第1希望)", required: true, placeholder: "時間を選択", options: hourlySlots(9, 20) },
      { type: "date", name: "date2", label: "ご希望日(第2希望)" },
      { type: "select", name: "time2", label: "ご希望時間(第2希望)", placeholder: "時間を選択", options: hourlySlots(9, 20) },
      {
        type: "textarea",
        name: "note",
        label: "ご質問・ご相談内容",
        optionalTag: "任意",
        placeholder: "お悩みやご希望など、ご自由にお書きください。",
        rows: 4,
      },
    ],
    submitLabel: "この内容で予約する",
    disclaimer:
      "送信いただいた内容は予約対応のみに利用します。\n初回60分体験 ¥980｜入会金0円｜しつこい勧誘はいたしません。",
    errorMessage: "お名前・電話番号・第1希望日時は必須項目です。ご希望日は明日以降の日付をお選びください。",
  },

  sticky: {
    offers: [
      { label: "60分体験", value: "¥980" },
      { label: "入会金", value: "0円" },
    ],
    buttonText: "60分体験を予約する",
    anchor: "#form",
  },
};

export default config;
