import type { PatternAConfig } from "@/clients/pattern-a.types";

/**
 * パーソナルマシンピラティス SAKURA 代々木上原店 — 実顧客LP。
 * 女性専用・桜色（サクラピンク）×生成りのトンマナ。配色は page.tsx 側で
 * パターンAのネイビー×ゴールドからサクラ系に載せ替えている。
 */
const config: PatternAConfig = {
  slug: "sakura-yoyogiuehara",
  status: "draft",
  meta: {
    title:
      "パーソナルマシンピラティス SAKURA 代々木上原店｜女性専用・60分無料体験",
    description:
      "代々木上原駅 徒歩4分、女性専用のパーソナルマシンピラティスSAKURA。全米スポーツ医学協会の有資格者が監修した独自メソッドで、筋肉質にならずしなやかな美ボディへ。今だけ60分の体験レッスン＆入会金が0円。",
    ogpImage: "/clients/sakura-yoyogiuehara/ogp.jpg",
  },
  accent: "#C25C79",
  showMonitorBadge: true,

  header: {
    brand: "SAKURA",
    brandSub: "パーソナルマシンピラティス 代々木上原店",
    access: [{ station: "代々木上原駅", walk: "徒歩4分" }],
  },
  offerBar: {
    badgeLines: ["今だけ", "0円"],
    text: "60分体験＆カウンセリングが0円",
  },
  achievement: {
    pre: "Googleクチコミ",
    num: "★4.95",
    post: "の高評価をいただいています",
  },

  fv: {
    catchLines: ["筋肉質にならず、", "しなやかに美しく。"],
    hero: { placeholder: "レッスン風景（メインビジュアル）", src: "/clients/sakura-yoyogiuehara/hero.jpg", position: "center" },
    leftCard: { small: "60分体験", big: "無料" },
    rightCard: { small: "入会金", big: "無料" },
  },

  offer: {
    eyebrow: "＼ 今だけ無料キャンペーン ／",
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
      { placeholder: "レッスン風景", src: "/clients/sakura-yoyogiuehara/offer-1.jpg" },
      { placeholder: "無料レンタルウェア", src: "/clients/sakura-yoyogiuehara/offer-2.jpg" },
    ],
    joinLabel: "入会金",
    joinRegular: "33,000",
    regular: { prefix: "2ヶ月目が", amount: "10,000", suffix: "割引に" },
    ctaText: "無料体験を予約する",
  },

  about: {
    heading: "SAKURA について",
    photo: { placeholder: "スタジオの様子", src: "/clients/sakura-yoyogiuehara/about.jpg" },
    caption: "Personal Machine Pilates",
    lead: "いつからでも、いつまでも、\n心と身体を美しく。",
    body: "SAKURAは、全米スポーツ医学協会の有資格者が監修した独自メソッドで、ピラティスに“ボディメイクの視点”を大きく取り入れた女性専用スタジオです。メディカルな視点からお一人おひとりの身体と向き合い、無理なく続けられる美しさへと導きます。",
  },

  worry: {
    heading: "こんなお悩み、ありませんか？",
    cards: [
      { img: { placeholder: "ボディライン", src: "/clients/sakura-yoyogiuehara/worry-1-body.jpg" }, text: "筋肉質にならず\nボディラインを整えたい" },
      { img: { placeholder: "姿勢", src: "/clients/sakura-yoyogiuehara/worry-2-posture.jpg" }, text: "猫背・巻き肩を直して\n姿勢をすらっとさせたい" },
      { img: { placeholder: "むくみ・冷え", src: "/clients/sakura-yoyogiuehara/worry-3-cold.jpg" }, text: "むくみや冷えを\n改善したい" },
      { img: { placeholder: "産後ケア", src: "/clients/sakura-yoyogiuehara/worry-4-postnatal.jpg" }, text: "産後の骨盤ケアを\nしていきたい" },
    ],
    closingPre: "そのお悩み、",
    closingHighlight: "SAKURAで叶います。",
  },

  reasons: {
    heading: "SAKURAが選ばれる理由",
    items: [
      {
        num: "01",
        img: { placeholder: "女性専用スタジオ", src: "/clients/sakura-yoyogiuehara/reason-1.jpg" },
        title: "女性専用スタジオ×\nインストラクターも全員女性",
        body: "スタジオもインストラクターも、すべて女性。人目を気にせず、リラックスして自分のペースでレッスンに集中できます。ピラティスが初めての方も安心してお通いいただけます。",
      },
      {
        num: "02",
        img: { placeholder: "独自メソッド", src: "/clients/sakura-yoyogiuehara/reason-2.jpg" },
        title: "全米スポーツ医学協会\n監修の独自メソッド",
        body: "有資格者が監修したプログラムで、ピラティスにボディメイクの視点を大きくプラス。メディカルな視点から、あなたのお悩みやなりたい姿に合わせて的確にアプローチします。",
      },
      {
        num: "03",
        img: { placeholder: "綺麗な内装の完全個室", src: "/clients/sakura-yoyogiuehara/reason-3.jpg" },
        title: "通いやすさへの\nこだわり",
        body: "駅チカ・完全個室・長い営業時間。コストを抑えたリーズナブルな価格と、続けやすい環境をどこまでも追求しました。",
        trio: [
          { label: "完全個室", desc: "綺麗な内装の\n落ち着いた空間" },
          { label: "駅徒歩4分", desc: "代々木上原駅\n東口すぐ" },
          { label: "8:00-21:30", desc: "仕事帰りも\n休日も通える" },
        ],
      },
    ],
    ctaText: "無料体験を予約する",
    ctaSub: "60分体験0円｜入会金0円",
  },

  trainers: {
    heading: "インストラクター紹介",
    lead: "在籍するのは、全員女性のインストラクター。\n国内外の資格をもつ専門スタッフが、丁寧にサポートします。",
    swipeHint: "スワイプでご覧いただけます",
    items: [
      {
        img: { placeholder: "Chinami", src: "/clients/sakura-yoyogiuehara/trainer-chinami.jpg", position: "center top" },
        role: "PILATES INSTRUCTOR",
        name: "Chinami",
        nameEn: "ちなみ",
        body: "お一人おひとりの身体と目標に寄り添い、心地よく続けられるレッスンを大切にしています。初めての方も、どうぞ安心してお任せください。",
        tags: ["女性インストラクター", "初心者歓迎"],
      },
      {
        img: { placeholder: "MIKU", src: "/clients/sakura-yoyogiuehara/trainer-miku.jpg", position: "center top" },
        role: "PILATES INSTRUCTOR",
        name: "MIKU",
        nameEn: "みく",
        body: "「気持ちよく動けた」を毎回感じていただけるように。姿勢や日常のクセまで、一つひとつ丁寧に見させていただきます。",
        tags: ["女性インストラクター", "姿勢改善"],
      },
      {
        img: { placeholder: "Misa", src: "/clients/sakura-yoyogiuehara/trainer-misa.jpg", position: "center top" },
        role: "PILATES INSTRUCTOR",
        name: "Misa",
        nameEn: "みさ",
        body: "しなやかで美しいボディラインづくりが得意です。無理なく、あなたらしい身体を一緒に目指していきましょう。",
        tags: ["女性インストラクター", "ボディメイク"],
      },
    ],
  },

  scenes: {
    heading: "あなたの毎日に、ピラティスを",
    items: [
      {
        img: { placeholder: "仕事帰り", src: "/clients/sakura-yoyogiuehara/scene-1-work.jpg" },
        title: "「仕事帰りに、自分を整える」",
        body: "夜21:30まで営業。お仕事終わりに立ち寄って、こわばった身体をリセット。1日の終わりを心地よく締めくくれます。",
      },
      {
        img: { placeholder: "産後ママ", src: "/clients/sakura-yoyogiuehara/scene-2-baby.jpg" },
        title: "「産後の身体づくりも、安心して」",
        body: "お子様同伴OK。キッズスペースを完備しているので、産後の骨盤ケアもお子様と一緒に通っていただけます。",
      },
      {
        img: { placeholder: "休日の朝", src: "/clients/sakura-yoyogiuehara/scene-3-morning.jpg" },
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
        q: "体験当日は何を持っていけばいいですか？",
        a: "体験レッスンではウェア・パンツ・靴下を無料でお貸出ししていますので、手ぶらでお越しいただけます。お着替えスペースも完備しています。",
      },
      {
        q: "男性も通えますか？",
        a: "SAKURAは女性専用スタジオです。インストラクターも全員女性ですので、人目を気にせず安心してお通いいただけます。",
      },
      {
        q: "子どもを連れて行けますか？",
        a: "はい、お子様同伴が可能です。キッズスペースをご用意していますので、産後のママも安心してレッスンを受けていただけます。",
      },
      {
        q: "予約は取りやすいですか？",
        a: "できる限り予約を取りやすくする独自の仕組みを整えています。ライフスタイルに合わせて、無理なく通い続けていただけます。",
      },
    ],
  },

  access: {
    heading: "スタジオのご案内",
    stores: [
      {
        img: { placeholder: "スタジオ内観", src: "/clients/sakura-yoyogiuehara/access.jpg" },
        name: "パーソナルマシンピラティス SAKURA 代々木上原店",
        address: "〒151-0064 東京都渋谷区上原1-38-11 シャトー代々木上原 102",
        hours: "営業時間 8:00〜21:30",
        route:
          "\n定休日：年末年始（12/29〜1/3）\n小田急小田原線・東京メトロ千代田線「代々木上原駅」東口より徒歩4分",
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

export default config;
