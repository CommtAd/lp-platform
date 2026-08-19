import type { PatternCConfig } from "@/clients/pattern-c.types";

/**
 * Pattern C base template — DUMMY content only.
 * Copy this folder to `clients/<slug>/` and replace config.ts with real data.
 * Every image slot is a placeholder (src:null) so the layout is visible empty.
 *
 * 日付・特典金額・プラン価格は必ず顧客確認を取ってから実データに差し替えること。
 * 二重価格（was → price）は根拠のある通常価格がある場合のみ使う。
 */
const config: PatternCConfig = {
  slug: "_base-c",
  status: "draft",
  meta: {
    title: "サンプル会場｜ブライダルフェア開催のご案内",
    description:
      "ここに会場とフェアの概要説明が入ります。開催日・特典・体験内容などを120文字前後で記載してください。ダミーテキストのため実データに差し替えてください。",
    ogpImage: undefined,
  },
  ink: "#3B3730",
  accent: "#B99653",
  paper: "#FBF8F3",

  header: {
    venue: "SAMPLE WEDDING",
    venueSub: "〇〇県〇〇市のゲストハウス",
    ctaText: "フェアを予約",
  },

  fv: {
    kicker: "BRIDAL FAIR",
    catch: ["ふたりらしい一日を、", "まず見に来てください。"],
    highlight: "最大〇万円相当 優待",
    lead: "チャペル見学から無料試食まで、当日のすべてを2時間で体験できます。これはダミーテキストのため実データに差し替えてください。",
    offers: ["来館特典 最大〇万円分", "無料試食つき", "所要 約2時間"],
    ctaText: "空き日程を見て予約する",
    hero: { placeholder: "チャペルまたはガーデンの引き写真（横位置・人物入り）", src: null },
  },

  // 新規オープンで会場名の認知がない場合のみ入れる。不要なら丸ごと削除する。
  brand: {
    heading: "0000年0月 GRAND OPEN",
    lead: "〇〇から\n新たに生まれたブライダルブランド\n〇〇〇〇",
    image: { placeholder: "会場を象徴する写真（新郎新婦入り）", src: null },
    body: "ブランドの紹介文がここに入ります。\n改行位置は \\n で指定できます。\nダミーテキストのため実データに\n差し替えてください。",
  },

  fvSummary: {
    headline: "最大〇万円の来館ギフトがついてくる",
    headlineEmphasis: "最大〇万円",
    label: "来館特典",
    items: [
      { amount: "〇万円", name: "特典名A" },
      { amount: "〇万円相当", name: "特典名B" },
      { amount: "〇万円相当", name: "特典名C" },
    ],
    disclaimer: "※特典のお渡しには適用条件がございます",
  },

  grandOffer: {
    eyebrow: "SPECIAL",
    heading: "期間限定特典",
    lead: "＼スペシャルなフェアを開催！／",
    badge: "0000年0月までの挙式披露宴が対象",
    title: "豪華〇大特典",
    amount: "最大〇万円相当",
    feature: {
      title: "目玉特典の見出しをここに記載",
      body: "目玉特典の説明文がここに入ります。ダミーテキストのため実データに差し替えてください。",
      disclaimer: "※特典のお渡しには適用条件がございます",
    },
    note: "※ 適用条件があります。詳細は当日ご案内いたします。",
  },

  schedule: {
    heading: "フェア開催日程",
    lead: "ご希望の回をお選びください。表示のない日程もご相談いただけます。",
    dates: [
      { date: "0/00", weekday: "土", times: "10:00 / 13:00 / 16:00", title: "チャペル見学＋無料試食フェア", badge: "残席わずか" },
      { date: "0/00", weekday: "日", times: "10:00 / 14:00", title: "ドレス試着つき 総合フェア" },
      { date: "0/00", weekday: "土", times: "11:00 / 15:00", title: "見積り相談フェア" },
      { date: "0/00", weekday: "日", times: "10:00 / 13:00 / 16:00", title: "チャペル見学＋無料試食フェア" },
    ],
    note: "※ 平日のご見学も承っております。フォームの備考欄にご希望をご記入ください。",
  },

  privilege: {
    heading: "ご来館特典",
    lead: "フェアにご参加いただいた方全員にご用意しています。",
    // 横3分割で並ぶため、title は6文字程度まで。
    items: [
      { title: "特典名A", amount: "〇万円分" },
      { title: "特典名B", amount: "〇万円分" },
      { title: "特典名C", amount: "〇万円分" },
    ],
    disclaimer: "※特典のお渡しには適用条件がございます",
    // 合計を lead の下で言い切る構成にするなら headline を足して total を外す。
    total: "最大 〇万円分",
    contract: { label: "ご成約で", amount: "最大〇万円優待" },
  },

  experience: {
    heading: "フェア当日に体験できること",
    lead: "約2時間で、会場・料理・費用のすべてをご確認いただけます。",
    items: [
      {
        tag: "01",
        title: "チャペル・会場見学",
        body: "体験内容の説明文がここに入ります。実データに差し替えて80文字前後で記載してください。これはダミーテキストです。",
        image: { placeholder: "チャペル内観（バージンロード方向）", src: null },
      },
      {
        tag: "02",
        title: "無料試食",
        body: "体験内容の説明文がここに入ります。実データに差し替えて80文字前後で記載してください。これはダミーテキストです。",
        image: { placeholder: "コース料理のアップ写真", src: null },
      },
      {
        tag: "03",
        title: "ドレス試着",
        body: "体験内容の説明文がここに入ります。実データに差し替えて80文字前後で記載してください。これはダミーテキストです。",
        image: { placeholder: "ドレスショップ／試着カット", src: null },
      },
      {
        tag: "04",
        title: "お見積り相談",
        body: "体験内容の説明文がここに入ります。実データに差し替えて80文字前後で記載してください。これはダミーテキストです。",
        image: { placeholder: "プランナーとの相談カット", src: null },
      },
    ],
  },

  recommend: {
    heading: "このフェアがおすすめな方",
    // icon を渡さない場合は金の丸囲みチェックが入る。
    items: [
      { label: "おすすめ条件をここに記載" },
      { label: "おすすめ条件をここに記載" },
      { label: "おすすめ条件をここに記載" },
      { label: "おすすめ条件をここに記載" },
    ],
  },

  gallery: {
    heading: "会場について",
    lead: "挙式からご披露宴まで、ひとつの空間で叶えられます。",
    photos: [
      { placeholder: "チャペル", src: null, caption: "チャペル" },
      { placeholder: "バンケット（披露宴会場）", src: null, caption: "バンケット" },
      { placeholder: "ガーデン", src: null, caption: "ガーデン" },
      { placeholder: "エントランス／ロビー", src: null, caption: "エントランス" },
    ],
  },

  reasons: {
    heading: "選ばれる理由",
    items: [
      {
        num: "01",
        title: "理由の見出しをここに記載",
        body: "理由の説明文がここに入ります。実データに差し替えて100文字前後で記載してください。これはレイアウト確認用のダミーテキストです。",
        image: { placeholder: "理由①を象徴する写真", src: null },
      },
      {
        num: "02",
        title: "理由の見出しをここに記載",
        body: "理由の説明文がここに入ります。実データに差し替えて100文字前後で記載してください。これはレイアウト確認用のダミーテキストです。",
        image: { placeholder: "理由②を象徴する写真", src: null },
      },
      {
        num: "03",
        title: "理由の見出しをここに記載",
        body: "理由の説明文がここに入ります。実データに差し替えて100文字前後で記載してください。これはレイアウト確認用のダミーテキストです。",
        image: { placeholder: "理由③を象徴する写真", src: null },
      },
    ],
  },

  plan: {
    heading: "プラン例",
    lead: "ご人数・時期に応じて、おふたりに合わせたお見積りをご用意します。",
    items: [
      {
        name: "プラン名A",
        guests: "〇〇名様",
        was: "0,000,000円",
        price: "0,000,000円",
        includes: ["含まれる内容A", "含まれる内容B", "含まれる内容C"],
      },
      {
        name: "プラン名B",
        guests: "〇〇名様",
        price: "0,000,000円",
        includes: ["含まれる内容A", "含まれる内容B", "含まれる内容C"],
      },
    ],
    note: "※ 表示価格はすべて税込です。時期・曜日により変動します。詳細は当日お見積りをご提示いたします。",
  },

  voices: {
    heading: "先輩カップルの声",
    items: [
      {
        name: "〇〇様ご夫妻",
        date: "0000年0月 挙式",
        body: "お客様の声がここに入ります。実データに差し替えて100文字前後で記載してください。これはダミーテキストです。",
        image: { placeholder: "先輩カップルの写真①", src: null },
      },
      {
        name: "〇〇様ご夫妻",
        date: "0000年0月 挙式",
        body: "お客様の声がここに入ります。実データに差し替えて100文字前後で記載してください。これはダミーテキストです。",
        image: { placeholder: "先輩カップルの写真②", src: null },
      },
      {
        name: "〇〇様ご夫妻",
        date: "0000年0月 挙式",
        body: "お客様の声がここに入ります。実データに差し替えて100文字前後で記載してください。これはダミーテキストです。",
        image: { placeholder: "先輩カップルの写真③", src: null },
      },
    ],
  },

  facility: {
    heading: "会場のご紹介",
    lead: "挙式会場と披露宴会場をご紹介します。",
    items: [
      {
        tag: "01",
        title: "チャペル名をここに記載",
        body: "会場の説明文がここに入ります。実データに差し替えて60文字前後で記載してください。",
        image: { placeholder: "チャペル内観", src: null },
      },
      {
        tag: "02",
        title: "会場名をここに記載",
        note: "00〜00名",
        body: "会場の説明文がここに入ります。実データに差し替えて60文字前後で記載してください。",
        image: { placeholder: "披露宴会場の内観", src: null },
      },
    ],
  },

  flow: {
    heading: "当日の流れ",
    lead: "所要時間は約2時間です。お気軽な服装でお越しください。",
    steps: [
      { num: "1", title: "ご来館・ヒアリング", time: "約20分", body: "ステップの説明文がここに入ります。ダミーテキストのため実データに差し替えてください。" },
      { num: "2", title: "会場見学・ご試食", time: "約60分", body: "ステップの説明文がここに入ります。ダミーテキストのため実データに差し替えてください。" },
      { num: "3", title: "お見積りのご提示", time: "約40分", body: "ステップの説明文がここに入ります。ダミーテキストのため実データに差し替えてください。" },
    ],
  },

  faq: {
    heading: "よくあるご質問",
    items: [
      { q: "ひとりで参加してもいいですか？", a: "回答文のサンプルがここに入ります。実データに差し替えて100文字前後で記載してください。これはダミーテキストです。" },
      { q: "服装の指定はありますか？", a: "回答文のサンプルがここに入ります。実データに差し替えて100文字前後で記載してください。これはダミーテキストです。" },
      { q: "当日に契約を迫られませんか？", a: "回答文のサンプルがここに入ります。実データに差し替えて100文字前後で記載してください。これはダミーテキストです。" },
      { q: "駐車場はありますか？", a: "回答文のサンプルがここに入ります。実データに差し替えて100文字前後で記載してください。これはダミーテキストです。" },
    ],
  },

  access: {
    heading: "アクセス",
    venueName: "SAMPLE WEDDING",
    address: "〒000-0000 〇〇県〇〇市〇〇1-2-3",
    routes: ["〇〇線「〇〇駅」より徒歩0分", "〇〇ICより車で0分／駐車場00台"],
    tel: "000-0000-0000",
    telNote: "受付時間 00:00 - 00:00（〇曜定休）",
    map: { placeholder: "会場の外観写真または地図キャプチャ", src: null },
  },

  overview: {
    heading: "ご予約概要",
    items: [
      { label: "適用期間", value: "0000年0月までに結婚式を実施可能な方" },
      { label: "所要時間", value: "約2時間" },
    ],
    note: "※ 組数限定のため、上限に達しましたら終了とさせていただきます。",
  },

  form: {
    heading: "ブライダルフェアのご予約",
    lead: "下記フォームよりご希望の日程をお知らせください。\n担当プランナーより24時間以内にご連絡いたします。",
    fields: [
      { type: "text", name: "name", label: "お名前", required: true, placeholder: "山田 太郎" },
      { type: "tel", name: "tel", label: "電話番号", required: true, placeholder: "090-0000-0000" },
      { type: "email", name: "email", label: "メールアドレス", required: true, placeholder: "example@mail.com" },
      { type: "date", name: "visit_date", label: "ご来館希望日", required: true },
      {
        type: "select",
        name: "visit_time",
        label: "ご希望の時間帯",
        required: true,
        placeholder: "選択してください",
        options: [
          { value: "10", label: "10:00〜" },
          { value: "13", label: "13:00〜" },
          { value: "16", label: "16:00〜" },
        ],
      },
      {
        type: "select",
        name: "wedding_timing",
        label: "挙式希望時期",
        required: true,
        placeholder: "選択してください",
        options: [
          { value: "6m", label: "6ヶ月以内" },
          { value: "1y", label: "1年以内" },
          { value: "1y5y", label: "1年半以内" },
          { value: "2y", label: "2年以内" },
          { value: "unset", label: "未定・検討中" },
        ],
      },
      {
        type: "select",
        name: "guests",
        label: "招待人数の目安",
        optionalTag: "任意",
        placeholder: "選択してください",
        options: [
          { value: "u30", label: "〜30名" },
          { value: "u50", label: "31〜50名" },
          { value: "u80", label: "51〜80名" },
          { value: "o80", label: "81名以上" },
          { value: "unset", label: "未定" },
        ],
      },
      {
        type: "textarea",
        name: "note",
        label: "ご質問・ご要望",
        optionalTag: "任意",
        placeholder: "ご希望の体験内容や、他の日程のご相談などをご自由にお書きください。",
        rows: 4,
      },
    ],
    submitLabel: "この内容で予約する",
    disclaimer: "ご入力いただいた内容はご予約対応のみに利用します。\nしつこいご案内はいたしません。",
    errorMessage: "お名前・電話番号・メールアドレス・ご来館希望日・時間帯・挙式希望時期は必須項目です。",
  },

  sticky: {
    offerText: "来館特典 最大〇万円分",
    buttonText: "フェアを予約する",
    anchor: "#form",
  },
};

export default config;
