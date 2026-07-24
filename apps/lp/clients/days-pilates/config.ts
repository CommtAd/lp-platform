import type { PatternAConfig } from "@/clients/pattern-a.types";

const ASSET = "/clients/days-pilates";

/**
 * 予約CTAの遷移先（外部予約システム reserveform.com）。店舗選択→自社フォーム入力
 * ではなく、店舗ボタンから直接外部予約ページへ遷移する運用のため、on-page LPForm
 * は使用しない（scripts/check-rules.ts の FORM_EXEMPT を参照）。
 */
type StoreUrls = { umeda: string; shinsaibashi: string };
const STORE_URLS: StoreUrls = {
  umeda: "https://reserveform.com/link.php?i=pif6y9z4w33s&m=miamm4uqeua3",
  shinsaibashi: "https://reserveform.com/link.php?i=pif6y78rtvcb&m=miamm4uqeua3",
};

/** 30-minute time slots between two hours, e.g. timeSlots(8, 21) → 08:00 … 21:00. */
const timeSlots = (startHour: number, endHour: number) => {
  const slots: { value: string; label: string }[] = [];
  for (let m = startHour * 60; m <= endHour * 60; m += 30) {
    const label = `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
    slots.push({ value: label, label });
  }
  return slots;
};

/**
 * DAYS PILATES (pattern A). 女性専用の「整体×マシンピラティス」スタジオ。
 * 梅田店・心斎橋店（大阪）。案件シート（ヒアリング内容）をもとに作成。
 * 構成は the-personal-gym と同一のパターンA。
 *
 * 【要確認・公開前に顧客差し替え必須】シート・参考LP(https://dayspilates.com/sp-004/)
 * ともに未記載のためプレースホルダで作成した項目:
 *   - offer.trialRegular（体験の通常価格）。二重価格表記は THE PERSONAL GYM と違い顧客未確認。
 *   - trainers.items（インストラクター個別プロフィール・氏名）。写真は顧客提供素材を仮配置。判明しているのは「全員女性・女性専用」のみ。
 * 実データ確定分:
 *   - offer.joinRegular = 10,000（入会金＋事務手数料10,000円→0円。シート Q9）。
 *   - 店舗住所・営業時間・アクセス（シート Q2/Q4）。
 */
const config: PatternAConfig & { storeUrls: StoreUrls } = {
  slug: "days-pilates",
  status: "draft",
  meta: {
    title: "DAYS PILATES｜梅田・心斎橋の女性専用マシンピラティススタジオ",
    description:
      "整体×マシンピラティスで肩こり・腰痛・むくみ・姿勢の崩れなど身体の不調を整える女性専用スタジオ。初回体験0円・入会金＋事務手数料0円。梅田駅・心斎橋駅 徒歩2分、定休日なし。",
    ogpImage: undefined,
  },
  // 公式サイト https://dayspilates.com/ の配色に合わせた accent。
  // ネイビーではなく、公式のフッター/ロゴと同じ温かみのあるトープブラウンを採用
  // （生成り背景＋ゴールドは維持。パターンAのゴールドは page.tsx 側で固定）。
  accent: "#6B5F55",
  showMonitorBadge: true,

  header: {
    brand: "DAYS PILATES",
    brandSub: "整体×マシンピラティス｜女性専用スタジオ",
    access: [
      { station: "梅田駅", walk: "徒歩2分" },
      { station: "心斎橋駅", walk: "徒歩2分" },
    ],
  },
  offerBar: {
    badgeLines: ["初回", "特典"],
    badgeFontSize: 15,
    badgeFontWeight: 400,
    badgeFontFamily: "mincho",
    text: "初回体験0円・入会金0円",
  },
  achievement: { pre: "大阪", num: "2", post: "店舗｜女性専用の整体×マシンピラティススタジオ" },
  storeUrls: STORE_URLS,

  fv: {
    catchLines: ["美しいカラダに", "生まれ変わる"],
    catchAlign: "right",
    hero: { placeholder: "スタジオ / マシンピラティスの写真（全面）", src: `${ASSET}/hero.mp4` },
    leftCard: { small: "根本から整える", big: "整体" },
    rightCard: { small: "しなやかに動く", big: "マシンピラティス" },
  },

  offer: {
    eyebrow: "整体 × マシンピラティス",
    heading: "約90分の無料体験",
    trialBadge: "整体×マシンピラティスを体験",
    trialRegular: "5,500",
    items: [
      "事前\nカウンセリング",
      "姿勢・お悩み\nヒアリング",
      "マシン\nピラティス",
      "整体\nケア",
      "事後\nカウンセリング",
      "改善プラン\nご提案",
    ],
    photos: [
      { placeholder: "マシンピラティスのシーン写真", src: `${ASSET}/offer-1.jpg` },
      { placeholder: "リフォーマー / スタジオ設備の写真", src: `${ASSET}/offer-2.jpg` },
    ],
    joinLabel: "入会金＋事務手数料",
    joinRegular: "10,000",
    regular: { prefix: "1回 ", amount: "—", suffix: "で通える" },
    ctaText: "無料体験を予約する",
  },

  about: {
    heading: "DAYS PILATES\nについて",
    photo: { placeholder: "スタジオ / インストラクターの写真", src: `${ASSET}/about.jpg` },
    caption: "Seitai × Pilates",
    lead: "不調を整えながら、\nしなやかな私へ。",
    body:
      "肩こり、腰痛、冷え、むくみ、姿勢の崩れ。DAYS PILATESは、整体で身体の土台を整えながら、マシンピラティスでしなやかに動ける身体づくりを目指す女性専用スタジオです。マシンが身体を支えるので、運動が苦手な方や初心者の方も無理なく続けられます。姿勢矯正・骨格矯正の専門院「ハピフル鍼灸整骨院」院長監修のプログラムだから、結果にこだわれます。",
  },

  worry: {
    heading: "こんなお悩み、ありませんか？",
    cards: [
      { img: { placeholder: "イメージ画像", src: `${ASSET}/worry-1.jpg` }, text: "肩こり・腰痛が\nなかなか取れない" },
      { img: { placeholder: "イメージ画像", src: `${ASSET}/worry-2.jpg` }, text: "姿勢の崩れ・猫背が\n気になってきた" },
      { img: { placeholder: "イメージ画像", src: `${ASSET}/worry-3.jpg` }, text: "冷え・むくみ・\n便秘が続いている" },
      { img: { placeholder: "イメージ画像", src: `${ASSET}/worry-4.jpg` }, text: "運動が苦手で\n続けられるか不安" },
    ],
    closingPre: "その不調、",
    closingHighlight: "ここなら整います。",
  },

  reasons: {
    heading: "選ばれる3つの理由",
    items: [
      {
        num: "01",
        img: { placeholder: "整体×マシンピラティスの写真", src: `${ASSET}/reasons-1.jpg` },
        title: "整体×マシンピラティスで\n不調の根本から整える",
        body:
          "整体で凝り固まった身体をほぐし土台を整えてから、マシンピラティスでしなやかに動ける身体づくりへ。肩こり・腰痛・冷え・むくみ・姿勢の崩れなど、気になる不調にアプローチしながら、引き締まった身体を目指せます。",
      },
      {
        num: "02",
        img: { placeholder: "スタジオでのシーン写真", src: `${ASSET}/reasons-2.jpg` },
        title: "その日の身体に合わせて\n選べる3つのレッスン",
        body:
          "肩こり・腰痛・むくみ・姿勢の崩れなど、一人ひとりのお悩みに合わせて通い方を選べます。整体×マシンピラティスで、無理なく身体を整える習慣に。",
        trio: [
          { label: "マシン", desc: "リフォーマーで\n全身を整える" },
          { label: "パーソナル", desc: "マンツーマンで\nお悩みに集中" },
          { label: "グループ", desc: "仲間と一緒に\n楽しく続ける" },
        ],
      },
      {
        num: "03",
        img: { placeholder: "インストラクター指導の写真", src: `${ASSET}/reasons-3.jpg` },
        title: "女性専用スタジオ・\n全員女性のインストラクター",
        body:
          "インストラクターは全員女性。女性専用スタジオだから、周りの目を気にせず安心して通えます。初心者の方や運動が苦手な方も、一人ひとりのお悩みに寄り添って丁寧にサポートします。",
      },
    ],
    ctaText: "無料体験を予約する",
    ctaSub: "初回体験0円｜入会金＋事務手数料0円｜プラン最大45%OFF｜初月会費半額",
  },

  trainers: {
    heading: "インストラクター紹介",
    lead: "全員女性のインストラクターが、\n一人ひとりの身体とお悩みに寄り添います。",
    swipeHint: "スワイプで移動",
    items: [
      {
        img: { placeholder: "インストラクターの写真", src: `${ASSET}/trainer-1.jpg` },
        role: "PILATES INSTRUCTOR",
        name: "CHIKA",
        nameEn: "Chika",
        body:
          "ヨガインストラクターの経験も持つ、資格保有のインストラクター。明るく誰とでもすぐに打ち解けられる性格で、初めての方も安心してレッスンを受けていただけます。",
        tags: ["女性インストラクター", "ヨガ資格保有"],
      },
      {
        img: { placeholder: "インストラクターの写真", src: `${ASSET}/trainer-2.jpg` },
        role: "PILATES INSTRUCTOR",
        name: "RENE",
        nameEn: "Rene",
        body:
          "格闘家としての顔も持つ、資格保有のインストラクター。マイペースながら負けず嫌いな一面もあり、レッスンにも情熱を注ぎます。闘技や水泳、バッティングセンターでのトレーニングも欠かしません。",
        tags: ["女性インストラクター", "格闘技経験あり"],
      },
      {
        img: { placeholder: "インストラクターの写真", src: `${ASSET}/trainer-3.jpg` },
        role: "PILATES INSTRUCTOR",
        name: "ARISA",
        nameEn: "Arisa",
        body:
          "数多くの指導実績を持つインストラクター。マシン・マットピラティスの両方で、外側からも内側からも身体を整えます。好奇心旺盛でポジティブな性格で、レッスンにも自然と笑顔があふれます。",
        tags: ["女性インストラクター", "指導実績多数"],
      },
      {
        img: { placeholder: "インストラクターの写真", src: `${ASSET}/trainer-4.jpg` },
        role: "PILATES INSTRUCTOR",
        name: "LIRY",
        nameEn: "Liry",
        body:
          "ビキニフィットネス大会出場経験を持つ、資格保有のインストラクター。筋トレやキックボクシング、水泳、スキューバダイビングとアクティブな趣味を通して、鍛え抜かれた身体づくりのコツを知り尽くしています。",
        tags: ["女性インストラクター", "ビキニフィットネス出場経験"],
      },
      {
        img: { placeholder: "インストラクターの写真", src: `${ASSET}/trainer-5.jpg` },
        role: "PILATES INSTRUCTOR",
        name: "AKIKO",
        nameEn: "Akiko",
        body:
          "ピラティスの資格に加えてネイリストの資格も持つ、多才なインストラクター。ON/OFFをしっかり切り替えながら、何事にも一生懸命に取り組む姿勢が持ち味です。休日は登山でリフレッシュしています。",
        tags: ["女性インストラクター", "ネイリスト資格保有"],
      },
      {
        img: { placeholder: "インストラクターの写真", src: `${ASSET}/trainer-6.jpg` },
        role: "PILATES INSTRUCTOR",
        name: "KUMI",
        nameEn: "Kumi",
        body:
          "ウエスト・お尻・二の腕・背中の引き締めから姿勢改善、柔軟性向上まで、幅広い得意分野を持つインストラクター。一人ひとりの気になる部分に合わせて、丁寧にアプローチします。",
        tags: ["女性インストラクター", "引き締め・姿勢改善が得意"],
      },
    ],
  },

  scenes: {
    heading: "あなたの毎日に寄り添う通い方",
    items: [
      {
        img: { placeholder: "仕事帰りに通うシーン写真", src: `${ASSET}/scene-1.jpg` },
        title: "「仕事終わりに立ち寄りたい」",
        body: "梅田・心斎橋ともに駅近。お仕事帰りにマシンピラティスで、一日の緊張をリセットして帰れます。",
      },
      {
        img: { placeholder: "買い物ついでに通うシーン写真", src: `${ASSET}/scene-2.jpg` },
        title: "「買い物ついでに通いたい」",
        body: "梅田・心斎橋の中心地だから、お出かけやショッピングの合間にも気軽に立ち寄れます。",
      },
      {
        img: { placeholder: "定期的に身体を整えるシーン写真", src: `${ASSET}/scene-3.jpg` },
        title: "「不調を定期的に整えたい」",
        body: "肩こりや姿勢の崩れが気になったら整体×ピラティスで。無理なく続けて、身体を整える習慣に。",
      },
    ],
  },

  flow: {
    heading: "初回体験（約90分）の流れ",
    steps: [
      {
        num: "1",
        title: "ご来店・お着替え",
        time: "約5分",
        body: "レンタルウェアをご用意しておりますので、\nお着替えの準備は不要です。\n（ご自身のものでももちろんOKです！）\nお着替えを済ませて、リラックスしてお待ちください。",
      },
      {
        num: "2",
        title: "事前カウンセリング",
        time: "約10分",
        body: "姿勢や生活習慣、気になる不調やお悩みを丁寧にヒアリングします。",
      },
      {
        num: "3",
        title: "体験レッスン",
        time: "約30分",
        body: "整体×マシンピラティスをマンツーマンで体験。運動経験に合わせて強度を調整するので、初めての方も安心です。",
      },
      {
        num: "4",
        title: "体験フィードバック",
        time: "約15分",
        body: "体験を踏まえて、あなたに合った通い方やプランをご提案。無理な勧誘はいたしません。",
      },
    ],
  },

  faq: {
    heading: "よくあるご質問",
    items: [
      {
        q: "運動が苦手でも大丈夫?",
        a: "はい、ご安心ください。マシンが身体を支えてくれるので、運動経験のない方や初心者の方でも無理なく取り組めます。インストラクターがマンツーマンで、あなたの身体に合わせて丁寧にサポートします。",
      },
      {
        q: "男性も通える?",
        a: "DAYS PILATESは女性専用スタジオです。インストラクターも全員女性のため、女性の方だけの、周りの目を気にせず安心して通える環境をご用意しています。",
      },
      {
        q: "服装や持ち物は?",
        a: "動きやすい服装でお越しください。初回体験は手ぶらでもお越しいただけます。ご不明な点はご予約時にお気軽にお問い合わせください。",
      },
      {
        q: "予約の変更やキャンセルは?",
        a: "ご予約の変更・キャンセルは、お電話にてお気軽にご連絡ください。その日の体調や予定に合わせて、忙しい方でも続けやすい仕組みになっています。",
      },
    ],
  },

  access: {
    heading: "店舗のご案内",
    stores: [
      {
        img: { placeholder: "梅田店の外観 / 内観写真", src: `${ASSET}/store-umeda.jpg` },
        name: "梅田店",
        address: "大阪府大阪市北区太融寺町8-2 エーワンビル4階",
        hours: "営業時間 10:00〜20:00",
        route:
          "（定休日なし）\n地下鉄 東梅田駅・梅田駅「M14」出口 徒歩2分／阪急梅田駅・JR大阪駅 徒歩5分",
      },
      {
        img: { placeholder: "心斎橋店の外観 / 内観写真", src: `${ASSET}/store-shinsaibashi.jpg` },
        name: "心斎橋店",
        address: "大阪府大阪市中央区西心斎橋1-1-10 プレリー心斎橋ビル5F",
        hours: "営業時間 7:40〜21:00",
        route: "（定休日なし）\n地下鉄 心斎橋駅 徒歩2分／クリスタ長堀 南14番出口すぐ",
      },
    ],
  },

  form: {
    heading: "無料体験のご予約",
    lead: "ご希望の店舗を選んで、予約ページへお進みください。",
    fields: [
      {
        type: "toggle",
        name: "store",
        label: "ご希望店舗",
        required: true,
        columns: 2,
        options: [
          { value: "umeda", label: "梅田店" },
          { value: "shinsaibashi", label: "心斎橋店" },
        ],
      },
      { type: "text", name: "name", label: "お名前", required: true, placeholder: "山田 花子" },
      { type: "tel", name: "tel", label: "電話番号", required: true, placeholder: "090-0000-0000" },
      { type: "email", name: "email", label: "メールアドレス", required: true, placeholder: "example@mail.com" },
      { type: "date", name: "date1", label: "ご希望日(第1希望)", required: true },
      { type: "select", name: "time1", label: "ご希望時間(第1希望)", required: true, placeholder: "時間を選択", options: timeSlots(8, 21) },
      { type: "date", name: "date2", label: "ご希望日(第2希望)", required: true },
      { type: "select", name: "time2", label: "ご希望時間(第2希望)", required: true, placeholder: "時間を選択", options: timeSlots(8, 21) },
      {
        type: "textarea",
        name: "note",
        label: "ご質問・ご相談内容",
        optionalTag: "任意",
        placeholder: "気になる不調やお悩み、運動経験など、ご自由にお書きください。",
        rows: 4,
      },
    ],
    submitLabel: "この内容で予約する",
    disclaimer:
      "初回体験0円｜入会金＋事務手数料0円｜プラン最大45%OFF｜初月会費半額｜しつこい勧誘はいたしません。",
    errorMessage:
      "店舗・お名前・電話番号・メールアドレス・ご希望日時(第1・第2希望)は必須項目です。ご希望日は明日以降の日付をお選びください。",
  },

  sticky: {
    offers: [
      { label: "初回体験", value: "¥0" },
      { label: "入会金＋事務手数料", value: "¥0" },
    ],
    buttonText: "無料体験を予約する",
    anchor: "#form",
    showAfter: 0,
  },
};

export default config;
