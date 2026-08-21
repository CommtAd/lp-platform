import type { PatternAConfig } from "@/clients/pattern-a.types";

/** 画像は public/clients/estudio/ 配下（撮影データ 2026-08 より選定・Web最適化済み）。 */
const ASSET = "/clients/estudio";

/**
 * 予約は STORES 予約（外部）で受け付けるため、pattern-a.types の `form`（LPForm）の
 * 代わりに `reserve` を使う（training-studio-arcs と同じ方式）。
 * 全CTAが reserve.url（新規タブ）へ接続し、LPFormは使用しない。
 * → check-rules.ts の FORM_EXEMPT に "estudio" を登録済み。LPShell は維持。
 * NOTE: この方式では基盤側にフォームCVは届かない（予約はすべて STORES 側に入る）。
 */
type Config = Omit<PatternAConfig, "form"> & {
  reserve: {
    heading: string;
    lead: string;
    url: string;
    ctaText: string;
    note: string;
  };
};

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
const config: Config = {
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

  // 緊急性・限定性（月ごとに更新する。定員が変わったら人数・月表記を差し替え）。
  campaign: { limitText: "8月 先着10名様限定" },

  // 予約導線（外部 STORES 予約）。全CTAがこの url（新規タブ）へ接続する。
  reserve: {
    heading: "60分体験のご予約",
    lead: "下記ボタンから、STORES予約でご希望の日時をお選びいただけます。\n（外部の予約ページが新しいタブで開きます）",
    url: "https://sanguubashi.stores.jp/reserve/pilates-e-studio88/1479210#pageContent",
    ctaText: "60分体験を予約する",
    note: "約1分で予約完了／強引な勧誘は一切ございません",
  },

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
    // ベネフィット型キャッチ（縦書きプレート・右→左の順で読ませる）。
    catchLines: ["姿勢が変われば、", "見た目印象まで変わる。"],
    heroTag: "手ぶらで通える、女性専用パーソナルピラティス",
    hero: { placeholder: "スタジオ内観／マシンピラティスの写真（全面）", src: `${ASSET}/hero.jpg`, position: "center" },
    leftCard: { small: "初回60分体験", big: "¥980" },
    rightCard: { small: "入会金", big: "0円" },
  },

  offer: {
    eyebrow: "はじめての方へ",
    heading: "60分の体験レッスン",
    trialBadge: "当日入会で入会金0円",
    trialRegular: "13,200",
    discountBadge: "92%OFF", // 通常13,200円 → 980円（92.6%OFF）を丸めた表記。

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
        // certs を設定しているため tags（下記）は表示されない（page.tsx が所有資格一覧を優先描画）。
        tags: ["女性専用", "マンツーマン"],
        certs: [
          "PHI MatⅠ/Ⅱ",
          "ReformerⅠ",
          "Tower",
          "Barrel",
          "Props",
          "ヴィオラトリコロール　マタニティピラティスインストラクター",
        ],
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

  sticky: {
    offers: [
      { label: "60分体験", value: "¥980" },
      { label: "入会金", value: "0円" },
    ],
    buttonText: "60分体験を予約する",
    anchor: "#reserve", // 予約セクションが見えたら追従バーを隠す（リンク自体は reserve.url へ）。
    showAfter: 460, // FVを見た直後（スクロール開始まもなく）に追従バーを出す。
  },
};

export default config;
