import type { PatternAConfig } from "@/clients/pattern-a.types";

/**
 * Pattern A base template — DUMMY content only.
 * Copy this folder to `clients/<slug>/` and replace config.ts with real data.
 * Every image slot is a placeholder (src:null) so the layout is visible empty.
 */
const config: PatternAConfig = {
  slug: "_base-a",
  status: "draft",
  meta: {
    title: "サンプルスタジオ｜〇〇・〇〇のサービス紹介ランディングページ",
    description:
      "ここにサービスの概要説明が入ります。特典や営業時間、アクセスなどの訴求文を120文字前後で記載してください。ダミーテキストのため実データに差し替えてください。",
    ogpImage: undefined,
  },
  accent: "#2E4269",
  showMonitorBadge: true,

  header: {
    brand: "SAMPLE BRAND NAME",
    brandSub: "サービス紹介の補足テキスト｜0:00〜00:00 営業日を記載",
    access: [
      { station: "〇〇駅", walk: "徒歩0分" },
      { station: "〇〇駅", walk: "徒歩0分" },
    ],
  },
  offerBar: { badgeLines: ["特典", "実施中"], text: "特典内容をここに記載・入会金0円" },
  achievement: { pre: "全国", num: "00", post: "店舗展開のサービスが運営" },

  fv: {
    catchLines: ["キャッチコピー一行目を", "ここに入れる二行目"],
    hero: { placeholder: "メインビジュアルの写真（全面）", src: null },
    leftCard: { small: "サブ訴求", big: "メイン訴求ワード" },
    rightCard: { small: "サブ訴求", big: "メイン訴求" },
  },

  offer: {
    eyebrow: "オファーの見出し",
    heading: "00分のお試し体験",
    trialBadge: "追加特典の説明をここに記載",
    trialRegular: "00,000",
    items: [
      "項目名を\n二行で記載",
      "項目\n名称",
      "サンプル\n項目名",
      "項目名の\nサンプル",
      "サンプル\n項目",
      "項目サンプル\n名称",
    ],
    photos: [
      { placeholder: "シーンの写真", src: null },
      { placeholder: "設備 / 環境の写真", src: null },
    ],
    joinLabel: "入会金",
    joinRegular: "00,000",
    regular: { prefix: "1回 ", amount: "0,000", suffix: "で通える" },
    ctaText: "無料体験を予約する",
  },

  about: {
    heading: "SAMPLE BRAND NAME\nについて",
    photo: { placeholder: "スタッフ / 環境の写真", src: null },
    caption: "Concept × Sample",
    lead: "コンセプトの一行目、\nここに二行目を入れる。",
    body: "ここにサービスの紹介文が入ります。強みや背景、他にはない特徴などを、実データに差し替えて130文字前後で記載してください。これはレイアウト確認用のダミーテキストなので、公開前に必ず本文へ置き換えてください。よろしくお願いします。",
  },

  worry: {
    heading: "こんなお悩み、ありませんか？",
    cards: [
      { img: { placeholder: "イメージ画像", src: null }, text: "お悩みの一つ目を\nここに記載する" },
      { img: { placeholder: "イメージ画像", src: null }, text: "お悩みの二つ目を\nここに記載" },
      { img: { placeholder: "イメージ画像", src: null }, text: "お悩みの三つ目を\nここに記載" },
      { img: { placeholder: "イメージ画像", src: null }, text: "お悩みの四つ目をここに\n記載する" },
    ],
    closingPre: "その願い、",
    closingHighlight: "ここなら叶います。",
  },

  reasons: {
    heading: "選ばれる3つの理由",
    items: [
      {
        num: "01",
        img: { placeholder: "理由を表す写真", src: null },
        title: "一つ目の理由の見出しを\n二行で記載する",
        body: "一つ目の理由の説明文がここに入ります。実データに差し替えて100文字前後で記載してください。レイアウト確認用のダミーテキストなので、公開前に本文へ置き換えてください。",
      },
      {
        num: "02",
        img: { placeholder: "理由を表す写真", src: null },
        title: "二つ目の理由の見出しを\n二行で記載する",
        body: "二つ目の理由の説明文をここに記載します。ダミーテキストのため差し替えてください。以下に3つの選択肢を並べる構成です。",
        trio: [
          { label: "選択肢A", desc: "一つ目の説明を\n二行で記載" },
          { label: "選択肢B", desc: "二つ目の説明を\n二行で記載" },
          { label: "選択肢C", desc: "三つ目の説明を\n二行で記載" },
        ],
      },
      {
        num: "03",
        img: { placeholder: "理由を表す写真", src: null },
        title: "三つ目の理由の見出しを\n二行で記載する",
        body: "三つ目の理由の説明文がここに入ります。実データに差し替えて120文字前後で記載してください。これはレイアウト確認用のダミーテキストなので、公開前には必ず本文へ置き換えてください。",
      },
    ],
    ctaText: "無料体験を予約する",
    ctaSub: "00分無料体験｜入会金0円",
  },

  trainers: {
    heading: "スタッフ紹介",
    lead: "スタッフ紹介のリード文をここに記載します。\n一人ひとりに合わせて対応する旨などを二行で。",
    swipeHint: "スワイプで移動",
    items: [
      {
        img: { placeholder: "スタッフの写真", src: null },
        role: "STAFF ROLE",
        name: "氏名 サンプル",
        nameEn: "Sample Name",
        body: "スタッフ紹介の本文がここに入ります。経歴や指導方針などを、実データに差し替えて100文字前後で記載してください。ダミーテキストです。",
        tags: ["資格・実績サンプル", "タグ2"],
      },
      {
        img: { placeholder: "スタッフの写真", src: null },
        role: "STAFF ROLE",
        name: "氏名 サンプル",
        nameEn: "Sample Name",
        body: "スタッフ紹介の本文がここに入ります。経歴や指導方針などを、実データに差し替えて100文字前後で記載してください。ダミーテキストです。",
        tags: ["資格・実績サンプル"],
      },
      {
        img: { placeholder: "スタッフの写真", src: null },
        role: "STAFF ROLE",
        name: "氏名 サンプル",
        nameEn: "Sample Name",
        body: "スタッフ紹介の本文がここに入ります。経歴や指導方針などを、実データに差し替えて100文字前後で記載してください。ダミーテキストです。",
        tags: ["資格・実績サンプル", "タグ2"],
      },
      {
        img: { placeholder: "スタッフの写真", src: null },
        role: "STAFF ROLE",
        name: "氏名 サンプル",
        nameEn: "Sample Name",
        body: "スタッフ紹介の本文がここに入ります。経歴や指導方針などを、実データに差し替えて100文字前後で記載してください。ダミーテキストです。",
        tags: ["資格・実績サンプル", "タグ2"],
      },
    ],
  },

  scenes: {
    heading: "あなたの毎日に寄り添う通い方",
    items: [
      {
        img: { placeholder: "シーンの写真", src: null },
        title: "「利用シーン一つ目の見出し」",
        body: "利用シーンの説明文がここに入ります。ダミーテキストのため実データに差し替えてください。",
      },
      {
        img: { placeholder: "シーンの写真", src: null },
        title: "「利用シーン二つ目の見出し」",
        body: "利用シーンの説明文がここに入ります。ダミーテキストのため実データに差し替えてください。",
      },
      {
        img: { placeholder: "シーンの写真", src: null },
        title: "「利用シーン三つ目の見出し」",
        body: "利用シーンの説明文がここに入ります。ダミーテキストのため実データに差し替えてください。",
      },
    ],
  },

  flow: {
    heading: "00分無料体験の流れ",
    steps: [
      {
        num: "1",
        title: "ステップ名サンプル",
        time: "約00分",
        body: "ステップの説明文がここに入ります。ダミーテキストのため実データに差し替えてください。",
      },
      {
        num: "2",
        title: "ステップ名サンプル",
        time: "約00分",
        body: "ステップの説明文がここに入ります。ダミーテキストのため実データに差し替えてください。",
      },
      {
        num: "3",
        title: "ステップ名サンプル",
        time: "約00分",
        body: "ステップの説明文がここに入ります。ダミーテキストのため実データに差し替えてください。",
      },
    ],
  },

  faq: {
    heading: "よくあるご質問",
    items: [
      {
        q: "質問文のサンプル一つ目?",
        a: "回答文のサンプルがここに入ります。よくある質問への回答を、実データに差し替えて100文字前後で記載してください。これはレイアウト確認用のダミーテキストです。",
      },
      {
        q: "質問文のサンプル二つ目?",
        a: "回答文のサンプルがここに入ります。よくある質問への回答を、実データに差し替えて100文字前後で記載してください。これはレイアウト確認用のダミーテキストです。",
      },
      {
        q: "質問文のサンプル三つ目?",
        a: "回答文のサンプルがここに入ります。よくある質問への回答を、実データに差し替えて100文字前後で記載してください。これはレイアウト確認用のダミーテキストです。",
      },
      {
        q: "質問文のサンプル四つ目?",
        a: "回答文のサンプルがここに入ります。よくある質問への回答を、実データに差し替えて100文字前後で記載してください。これはレイアウト確認用のダミーテキストです。",
      },
    ],
  },

  access: {
    heading: "店舗のご案内",
    stores: [
      {
        img: { placeholder: "店舗の外観 / 内観写真", src: null },
        name: "〇〇店",
        address: "〒000-0000 都道府県市区町村0-0-0 建物名0階",
        hours: "営業時間 0:00〜00:00",
        route: "（最終受付 00:00）\n〇〇線 〇〇駅 〇口 徒歩0分／「〇〇」バス停 徒歩約0分",
      },
      {
        img: { placeholder: "店舗の外観 / 内観写真", src: null },
        name: "〇〇店",
        address: "〒000-0000 都道府県市区町村0丁目00-00 建物名0-0",
        hours: "営業時間 0:00〜00:00",
        route: "（最終受付 00:00）\n〇〇線／〇〇線 〇〇駅 〇口 徒歩0分",
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
          { value: "store_a", label: "〇〇店" },
          { value: "store_b", label: "〇〇店" },
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
        placeholder: "ご質問やご相談内容など、ご自由にお書きください。",
        rows: 4,
      },
    ],
    submitLabel: "この内容で予約する",
    disclaimer:
      "送信いただいた内容は予約対応のみに利用します。\n00分無料体験｜入会金0円｜しつこい勧誘はいたしません。",
    errorMessage: "店舗・お名前・電話番号は必須項目です。",
  },

  sticky: {
    offers: [
      { label: "00分体験", value: "¥0" },
      { label: "入会金", value: "¥0" },
    ],
    buttonText: "無料体験を予約する",
    anchor: "#form",
  },
};

export default config;
