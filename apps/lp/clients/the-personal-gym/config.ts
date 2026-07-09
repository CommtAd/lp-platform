import type { PatternAConfig } from "@/clients/pattern-a.types";

const ASSET = "/clients/the-personal-gym";

/**
 * THE PERSONAL GYM (pattern A). This is the SAME business as
 * the-personal-pilates, rebranding under the name "THE PERSONAL GYM" — not a
 * different client. Started as a copy of the-personal-pilates's real data
 * (trainers, stores, pricing, photos are accurate for this business and are
 * intentionally retained), with slug / ASSET path / status / brand-name
 * strings updated to THE PERSONAL GYM. Still draft pending explicit
 * instruction to publish.
 */
const config: PatternAConfig = {
  slug: "the-personal-gym",
  status: "draft",
  meta: {
    title: "THE PERSONAL GYM｜国分寺・吉祥寺のマシンピラティススタジオ",
    description:
      "全国50店舗以上のパーソナルジムが運営するマシンピラティススタジオ。90分体験無料・入会金0円。国分寺駅・吉祥寺駅 徒歩3分、7:00〜23:00 土日祝も営業。",
    ogpImage: `${ASSET}/store-kokubunji.jpg`,
  },
  accent: "#2E4269",
  showMonitorBadge: true,

  header: {
    brand: "THE PERSONAL GYM",
    brandSub: "マシンピラティススタジオ｜7:00〜23:00 土日祝営業",
    logo: `${ASSET}/logo.png`,
    logoAlt: "THE PERSONAL GYM",
    hours: "営業時間 7:00〜23:00",
    access: [
      { station: "国分寺駅", walk: "徒歩3分" },
      { station: "吉祥寺駅", walk: "徒歩3分" },
    ],
  },
  offerBar: { badgeLines: ["期間", "限定"], badgeFontSize: 18, badgeFontWeight: 400, badgeFontFamily: "mincho", text: "90分体験無料・入会金0円" },
  achievement: { pre: "全国", num: "50", post: "店舗展開のパーソナルジムが運営" },

  fv: {
    catchLines: ["心と身体の状態に", "合わせるピラティス"],
    hero: { placeholder: "スタジオ / マシンピラティスの写真（全面）", src: "/clients/the-personal-gym/fv-hero.jpg", position: "42% center" },
    leftCard: { small: "パーソナル", big: "マシンピラティス" },
    rightCard: { small: "姿勢改善", big: "ストレッチ" },
  },

  offer: {
    eyebrow: "パーソナルピラティス",
    heading: "90分の無料体験",
    trialBadge: "姿勢改善ストレッチも体験可能",
    trialRegular: "11,000",
    items: [
      "問診・\nカウンセリング",
      "姿勢\n分析",
      "マシン\nピラティス",
      "姿勢改善\nストレッチ",
      "フィード\nバック",
      "改善プラン\n提案",
    ],
    photos: [
      { placeholder: "ピラティスのシーン写真", src: "/clients/the-personal-gym/offer-photo-1.jpg" },
      { placeholder: "スタジオ / マシンの写真", src: "/clients/the-personal-gym/offer-photo-2.jpg" },
    ],
    joinLabel: "入会金",
    joinRegular: "33,000",
    regular: { prefix: "1回 ", amount: "7,150", suffix: "で通える" },
    ctaText: "無料体験を予約する",
  },

  about: {
    heading: "THE PERSONAL GYM\nについて",
    photo: { placeholder: "スタジオ / トレーナーの写真", src: "/clients/the-personal-gym/about-photo.jpg" },
    caption: "Personal × Pilates",
    lead: "鍛えるだけでも、\nただ休めるだけでもない。",
    body: "姿勢の乱れ、運動不足、抜けない疲れ。その日の身体は毎日ちがいます。THE PERSONAL GYMは、全国50店舗以上のパーソナルジムで培った身体づくりの知見を活かし、鍛える日も整える日も、あなたのコンディションに合わせて通えるマシンピラティススタジオです。",
  },

  worry: {
    heading: "こんなお悩み、ありませんか？",
    cards: [
      { img: { placeholder: "イメージ画像", src: "/clients/the-personal-gym/worry-1.jpg" }, text: "姿勢の乱れが\n気になってきた" },
      { img: { placeholder: "イメージ画像", src: "/clients/the-personal-gym/worry-2.jpg" }, text: "身体を無理なく\n整えたい" },
      { img: { placeholder: "イメージ画像", src: "/clients/the-personal-gym/worry-3.jpg" }, text: "運動不足を\n解消したい" },
      { img: { placeholder: "イメージ画像", src: "/clients/the-personal-gym/worry-4.jpg" }, text: "疲れをケアしながら\n動きたい" },
    ],
    closingPre: "その通い方、",
    closingHighlight: "ここなら叶います。",
  },

  reasons: {
    heading: "選ばれる3つの理由",
    items: [
      {
        num: "01",
        img: { placeholder: "パーソナルトレーナー指導の写真", src: "/clients/the-personal-gym/reason-1.jpg" },
        title: "全国50店舗以上のジムの知見を\n活かしたマシンピラティス",
        body: "パーソナルジムで培ってきた身体づくりのノウハウを、そのままピラティスの指導にも活かせるのが最大の強み。一人ひとりの姿勢や身体の状態を見極めながら、あなたに合ったセッションを組み立てます。",
      },
      {
        num: "02",
        img: { placeholder: "スタジオでのシーン写真", src: "/clients/the-personal-gym/reason-2.jpg" },
        title: "その日の気分や身体の状態に\n合わせて選べる",
        body: "「今日はどう過ごしたいか」で通い方を選べます。予定や体調に合わせられるから、無理なく続く運動習慣に。",
        trio: [
          { label: "鍛える", desc: "がっつり動く日は\nパーソナルジム" },
          { label: "整える", desc: "整えたい日は\nピラティス" },
          { label: "ほぐす", desc: "疲れた日は\n姿勢改善ストレッチ" },
        ],
      },
      {
        num: "03",
        img: { placeholder: "姿勢改善ストレッチの写真", src: "/clients/the-personal-gym/reason-3.jpg" },
        title: "ピラティスだけでなく、\n姿勢改善ストレッチにも対応",
        body: "ただ動くだけで終わらせないのがこのスタジオの特徴。トレーナーの手で凝り固まった部位をほぐし、姿勢やコンディションまで整えます。「今日は受け身でケアしたい」という日も、通う理由になります。",
      },
    ],
    ctaText: "無料体験を予約する",
    ctaSub: "90分無料体験｜入会金0円",
  },

  trainers: {
    heading: "トレーナー紹介",
    lead: "パーソナルジムで研鑽を積んだトレーナーが、\n一人ひとりの身体に合わせて伴走します。",
    swipeHint: "スワイプで移動",
    items: [
      {
        img: { placeholder: "トレーナーの写真", src: `${ASSET}/trainer-jessica.jpg` },
        role: "PERSONAL TRAINER",
        name: "ジェシカ",
        nameEn: "Jessica Kwon",
        body: "自身のダイエット体験をきっかけに、運動で心と身体が整うことを実感。ボディメイクや健康づくりを、初心者の方にも無理なく続けやすく丁寧にサポートします。英語での指導にも対応しています。",
        tags: ["TOEFL 950", "英語指導OK"],
      },
      {
        img: { placeholder: "トレーナーの写真", src: `${ASSET}/trainer-tanaka.jpg` },
        role: "PERSONAL TRAINER",
        name: "田中 勇輝",
        nameEn: "Yuki Tanaka",
        body: "“Look good, feel good, play good.” 見た目が変われば、すべてが変わる。「どうせ無理」と思っていた人こそ、自分の可能性に気づける。そのきっかけを本気で提供します。",
        tags: ["FWJ 2024 三重大会 men's physique"],
      },
      {
        img: { placeholder: "トレーナーの写真", src: `${ASSET}/trainer-omura.jpg` },
        role: "PERSONAL TRAINER",
        name: "大村 健人",
        nameEn: "Kento Omura",
        body: "身体が変わると気持ちが変わり、人生が豊かになる——それを伝えたくてトレーナーに。自身の知識と経験を活かし、一人ひとりに合ったボディメイクを提供します。理想の身体を目指して一緒にがんばりましょう。",
        tags: ["NSCA-CPT", "FWJ 2021 Crystal Cup ノービス10位"],
      },
      {
        img: { placeholder: "トレーナーの写真", src: `${ASSET}/trainer-ito.jpg` },
        role: "PERSONAL TRAINER",
        name: "伊藤 優汰",
        nameEn: "Yuta Ito",
        body: "トレーニングで身体が変わる喜びと、運動から得られる前向きな気持ちを実感。学んできた知識と技術をもとに、お客様の目標達成を全力でサポートします。理想の身体を一緒に作り上げましょう。",
        tags: ["JATI-ATI", "JBBF 神奈川選手権2024 出場"],
      },
    ],
  },

  scenes: {
    heading: "あなたの毎日に寄り添う通い方",
    items: [
      {
        img: { placeholder: "ゆったり整えるシーン写真", src: "/clients/the-personal-gym/scene-1.jpg" },
        title: "「今日はゆったり整えたい」",
        body: "朝7時からの営業だから、出勤前にマシンピラティスで姿勢を整えてから一日をスタート。",
      },
      {
        img: { placeholder: "疲れをリセットするシーン写真", src: "/clients/the-personal-gym/scene-2.jpg" },
        title: "「昨日の疲れをリセットしたい」",
        body: "残業続きの週は、仕事帰りに姿勢改善ストレッチ。受け身のケアで身体を軽くして帰る。",
      },
      {
        img: { placeholder: "しっかり鍛えるシーン写真", src: "/clients/the-personal-gym/scene-3.jpg" },
        title: "「がっつり鍛える日と使い分けたい」",
        body: "時間のある週末はパーソナルジムでしっかりトレーニング。気分に合わせて強度を選べる。",
      },
    ],
  },

  flow: {
    heading: "90分無料体験の流れ",
    steps: [
      {
        num: "1",
        title: "カウンセリング",
        time: "約20分",
        body: "姿勢や生活習慣、気になる不調をヒアリング。目指したいコンディションを一緒に整理します。",
      },
      {
        num: "2",
        title: "マシンピラティス体験",
        time: "約50分",
        body: "トレーナーとマンツーマンで実際に体験。運動経験に合わせて強度を調整するので、初めての方も安心です。",
      },
      {
        num: "3",
        title: "フィードバック",
        time: "約20分",
        body: "体験を踏まえて、あなたに合う通い方とメニューの組み合わせをご提案。無理な勧誘は行いません。",
      },
    ],
  },

  faq: {
    heading: "よくあるご質問",
    items: [
      {
        q: "運動経験がなくても大丈夫?",
        a: "はい、ご安心ください。体験に来られる方の多くは運動経験のない方です。マンツーマンで姿勢や動きを確認しながら、その日のあなたに合わせた強度で進めますので、初めての方でも無理なく取り組めます。",
      },
      {
        q: "服装は何を用意すればいい?",
        a: "動きやすい服装であれば何でも構いません。Tシャツとレギンス、ジャージなどをお持ちください。お水とタオルは無料でご用意しています。仕事帰りでも手ぶらに近い形でお越しいただけます。",
      },
      {
        q: "男性も通える?",
        a: "もちろん通えます。母体がパーソナルジムということもあり、男性会員の方も多く在籍しています。姿勢のケアからしっかりしたトレーニングまで、性別を問わずご利用いただけるスタジオです。",
      },
      {
        q: "予約の変更やキャンセルは?",
        a: "前日までであれば、専用アプリからいつでも変更・キャンセルが可能です。その日の体調や予定に合わせて柔軟に調整できますので、忙しい方でも続けやすい仕組みになっています。",
      },
    ],
  },

  access: {
    heading: "店舗のご案内",
    stores: [
      {
        img: { placeholder: "国分寺店の外観 / 内観写真", src: `${ASSET}/store-kokubunji.jpg` },
        name: "国分寺店",
        address: "〒185-0021 東京都国分寺市南町3-18-17 第4サイトウビル4階",
        hours: "営業時間 7:00〜23:00",
        route:
          "（最終受付 22:00）\nJR中央線・西武国分寺線・西武多摩湖線 国分寺駅 南口 徒歩1分／「国分寺駅南口」バス停 徒歩約3分",
      },
      {
        img: { placeholder: "吉祥寺店の外観 / 内観写真", src: `${ASSET}/store-kichijoji.jpg` },
        name: "吉祥寺店",
        address: "〒180-0004 東京都武蔵野市吉祥寺本町2丁目25-12 Santa Fe1-B",
        hours: "営業時間 7:00〜23:00",
        route: "（最終受付 22:00）\nJR中央線／JR総武線 吉祥寺駅 北口 徒歩4分",
      },
    ],
  },

  form: {
    heading: "無料体験のご予約",
    lead: "下記フォームからお気軽にお申し込みください。\n担当より24時間以内にご連絡いたします。",
    fields: [
      {
        type: "toggle",
        name: "store",
        label: "ご希望店舗",
        required: true,
        columns: 2,
        options: [
          { value: "kokubunji", label: "国分寺店" },
          { value: "kichijoji", label: "吉祥寺店" },
        ],
      },
      { type: "text", name: "name", label: "お名前", required: true, placeholder: "山田 花子" },
      { type: "tel", name: "tel", label: "電話番号", required: true, placeholder: "090-0000-0000" },
      { type: "email", name: "email", label: "メールアドレス", placeholder: "example@mail.com" },
      { type: "text", name: "date1", label: "ご希望日時(第1希望)", placeholder: "例)平日夜、土曜午前など" },
      { type: "text", name: "date2", label: "ご希望日時(第2希望)", placeholder: "例)日曜午後など" },
      {
        type: "textarea",
        name: "note",
        label: "ご質問・ご相談内容",
        optionalTag: "任意",
        placeholder: "運動経験や身体のお悩みなど、ご自由にお書きください。",
        rows: 4,
      },
    ],
    submitLabel: "この内容で予約する",
    disclaimer:
      "送信いただいた内容は予約対応のみに利用します。\n90分無料体験｜入会金0円｜しつこい勧誘はいたしません。",
    errorMessage: "店舗・お名前・電話番号は必須項目です。",
  },

  sticky: {
    offers: [
      { label: "90分体験", value: "¥0" },
      { label: "入会金", value: "¥0" },
    ],
    buttonText: "無料体験を予約する",
    anchor: "#form",
    showAfter: 0,
  },
};

export default config;
