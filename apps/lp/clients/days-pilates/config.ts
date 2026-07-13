import type { PatternAConfig } from "@/clients/pattern-a.types";

const ASSET = "/clients/days-pilates";

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
 *   - 画像素材すべて（src:null → プレースホルダ枠）。シートに「共有素材あり」との申告あり。
 *   - offer.trialRegular（体験の通常価格）。二重価格表記は THE PERSONAL GYM と違い顧客未確認。
 *   - trainers.items（インストラクター個別プロフィール）。判明しているのは「全員女性・女性専用」のみ。
 * 実データ確定分:
 *   - offer.joinRegular = 10,000（入会金＋事務手数料10,000円→0円。シート Q9）。
 *   - 店舗住所・営業時間・アクセス（シート Q2/Q4）。
 */
const config: PatternAConfig = {
  slug: "days-pilates",
  status: "draft",
  meta: {
    title: "DAYS PILATES｜梅田・心斎橋の女性専用マシンピラティススタジオ",
    description:
      "整体×マシンピラティスで肩こり・腰痛・むくみ・姿勢の崩れなど身体の不調を整える女性専用スタジオ。初回体験0円・入会金＋事務手数料0円。梅田駅・心斎橋駅 徒歩2分、定休日なし。",
    ogpImage: undefined,
  },
  accent: "#2E4269",
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

  fv: {
    catchLines: ["美しいカラダに", "生まれ変わる"],
    hero: { placeholder: "スタジオ / マシンピラティスの写真（全面）", src: null },
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
      { placeholder: "マシンピラティスのシーン写真", src: null },
      { placeholder: "リフォーマー / スタジオ設備の写真", src: null },
    ],
    joinLabel: "入会金",
    joinRegular: "10,000",
    regular: { prefix: "1回 ", amount: "—", suffix: "で通える" },
    ctaText: "無料体験を予約する",
  },

  about: {
    heading: "DAYS PILATES\nについて",
    photo: { placeholder: "スタジオ / インストラクターの写真", src: null },
    caption: "Seitai × Pilates",
    lead: "不調を整えながら、\nしなやかな私へ。",
    body:
      "肩こり、腰痛、冷え、むくみ、姿勢の崩れ。DAYS PILATESは、整体で身体の土台を整えながら、マシンピラティスでしなやかに動ける身体づくりを目指す女性専用スタジオです。マシンが身体を支えるので、運動が苦手な方や初心者の方も無理なく続けられます。",
  },

  worry: {
    heading: "こんなお悩み、ありませんか？",
    cards: [
      { img: { placeholder: "イメージ画像", src: null }, text: "肩こり・腰痛が\nなかなか取れない" },
      { img: { placeholder: "イメージ画像", src: null }, text: "姿勢の崩れ・猫背が\n気になってきた" },
      { img: { placeholder: "イメージ画像", src: null }, text: "冷え・むくみ・\n便秘が続いている" },
      { img: { placeholder: "イメージ画像", src: null }, text: "運動が苦手で\n続けられるか不安" },
    ],
    closingPre: "その不調、",
    closingHighlight: "ここなら整います。",
  },

  reasons: {
    heading: "選ばれる3つの理由",
    items: [
      {
        num: "01",
        img: { placeholder: "整体×マシンピラティスの写真", src: null },
        title: "整体×マシンピラティスで\n不調の根本から整える",
        body:
          "整体で凝り固まった身体をほぐし土台を整えてから、マシンピラティスでしなやかに動ける身体づくりへ。肩こり・腰痛・冷え・むくみ・姿勢の崩れなど、気になる不調にアプローチしながら、引き締まった身体を目指せます。",
      },
      {
        num: "02",
        img: { placeholder: "スタジオでのシーン写真", src: null },
        title: "その日の身体に合わせて\n選べる3つのメニュー",
        body:
          "目的やその日のコンディションに合わせて、通い方を選べます。無理なく続けられるから、身体を整える習慣に。",
        trio: [
          { label: "マシン", desc: "リフォーマーで\n全身を整える" },
          { label: "パーソナル", desc: "マンツーマンで\nお悩みに集中" },
          { label: "グループ", desc: "仲間と一緒に\n楽しく続ける" },
        ],
      },
      {
        num: "03",
        img: { placeholder: "インストラクター指導の写真", src: null },
        title: "女性専用スタジオ・\n全員女性のインストラクター",
        body:
          "インストラクターは全員女性。女性専用スタジオだから、周りの目を気にせず安心して通えます。初心者の方や運動が苦手な方も、一人ひとりのお悩みに寄り添って丁寧にサポートします。",
      },
    ],
    ctaText: "無料体験を予約する",
    ctaSub: "初回体験0円｜入会金＋事務手数料0円｜プラン最大45%OFF",
  },

  trainers: {
    heading: "インストラクター紹介",
    lead: "全員女性のインストラクターが、\n一人ひとりの身体とお悩みに寄り添います。",
    swipeHint: "スワイプで移動",
    // 【要確認】個別プロフィール・写真・氏名は顧客素材を受領後に差し替え。
    items: [
      {
        img: { placeholder: "インストラクターの写真", src: null },
        role: "PILATES INSTRUCTOR",
        name: "近日公開",
        nameEn: "Coming Soon",
        body:
          "全員女性のインストラクターが在籍しています。プロフィールは近日公開予定です。（※顧客プロフィール受領後に差し替え）",
        tags: ["女性インストラクター"],
      },
      {
        img: { placeholder: "インストラクターの写真", src: null },
        role: "PILATES INSTRUCTOR",
        name: "近日公開",
        nameEn: "Coming Soon",
        body:
          "整体×マシンピラティスの知識をもつ女性インストラクターが、丁寧にサポートします。（※顧客プロフィール受領後に差し替え）",
        tags: ["女性インストラクター"],
      },
    ],
  },

  scenes: {
    heading: "あなたの毎日に寄り添う通い方",
    items: [
      {
        img: { placeholder: "仕事帰りに通うシーン写真", src: null },
        title: "「仕事終わりに立ち寄りたい」",
        body: "梅田・心斎橋ともに駅近。お仕事帰りにマシンピラティスで、一日の緊張をリセットして帰れます。",
      },
      {
        img: { placeholder: "買い物ついでに通うシーン写真", src: null },
        title: "「買い物ついでに通いたい」",
        body: "梅田・心斎橋の中心地だから、お出かけやショッピングの合間にも気軽に立ち寄れます。",
      },
      {
        img: { placeholder: "定期的に身体を整えるシーン写真", src: null },
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
        time: "約10分",
        body: "手ぶらでOK。お着替えを済ませて、リラックスしてお待ちください。",
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
        time: "約50分",
        body: "整体×マシンピラティスをマンツーマンで体験。運動経験に合わせて強度を調整するので、初めての方も安心です。",
      },
      {
        num: "4",
        title: "事後カウンセリング",
        time: "約20分",
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
        img: { placeholder: "梅田店の外観 / 内観写真", src: null },
        name: "梅田店",
        address: "大阪府大阪市北区太融寺町8-2 エーワンビル4階",
        hours: "営業時間 10:00〜20:00",
        route:
          "（定休日なし）\n地下鉄 東梅田駅・梅田駅「M14」出口 徒歩2分／阪急梅田駅・JR大阪駅 徒歩5分",
      },
      {
        img: { placeholder: "心斎橋店の外観 / 内観写真", src: null },
        name: "心斎橋店",
        address: "大阪府大阪市中央区西心斎橋1-1-10 プレリー心斎橋ビル5F",
        hours: "営業時間 7:40〜21:00",
        route: "（定休日なし）\n地下鉄 心斎橋駅 徒歩2分／クリスタ長堀 南14番出口すぐ",
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
      "初回体験0円｜入会金＋事務手数料0円｜初月会費半額｜しつこい勧誘はいたしません。",
    errorMessage:
      "店舗・お名前・電話番号・メールアドレス・ご希望日時(第1・第2希望)は必須項目です。ご希望日は明日以降の日付をお選びください。",
  },

  sticky: {
    offers: [
      { label: "初回体験", value: "¥0" },
      { label: "入会金", value: "¥0" },
    ],
    buttonText: "無料体験を予約する",
    anchor: "#form",
    showAfter: 0,
  },
};

export default config;
