import type { PatternBConfig } from "@/clients/pattern-b.types";

/**
 * Pattern B base template — DUMMY content only.
 * Copy this folder to `clients/<slug>/` and replace config.ts with real data.
 * Every image slot is a placeholder (src:null) so the layout is visible empty.
 */
const config: PatternBConfig = {
  slug: "_base-b",
  status: "draft",
  meta: {
    title: "サンプルサービス｜〇〇向け支援パックのご案内",
    description:
      "ここにサービスの概要説明が入ります。対象・提供内容・特長などを120文字前後で記載してください。ダミーテキストのため実データに差し替えてください。",
    ogpImage: undefined,
  },
  accent: "#0B2545",
  cta: "#FF6A2B",
  accent2: "#3DA5F5",

  header: {
    brand: "SAMPLE SUPPORT PACK",
    brandSub: "業界特化型サポートサービス",
    navLinks: [
      { label: "サービス内容", href: "#benefits" },
      { label: "選ばれる理由", href: "#advantage" },
      { label: "導入の流れ", href: "#flow" },
      { label: "よくある質問", href: "#faq" },
    ],
    ctaText: "無料相談はこちら",
  },

  fv: {
    badge: "〇〇業界に特化！",
    heading: ["〇〇に関わる業務、", "すべて丸投げしませんか？"],
    sub: "企画立案から実務対応まで。あなたの事業に合わせた完全カスタマイズで、立ち上げ初月からのロケットスタートを実現します。これはダミーテキストのため実データに差し替えてください。",
    ctaText: "まずは無料相談・お見積りはこちら",
    hero: { placeholder: "サービスのメインビジュアル（環境写真＋UI要素の合成）", src: null },
  },

  problem: {
    eyebrow: "PROBLEM",
    heading: "こんなお悩み、ありませんか？",
    lead: "立ち上げ準備は決めることが多く、担当者だけでは手が回らないという声を多くいただきます。これはダミーテキストのため実データに差し替えてください。",
    persona: { placeholder: "悩んでいる担当者のイラスト／写真", src: null },
    tasks: ["タスクA", "タスクB", "タスクC", "タスクD"],
  },

  solution: {
    eyebrow: "SOLUTION",
    heading: "バラバラのタスクを、ひとつのパックに。",
    lead: "個別に発注していた業務を一本化し、窓口ひとつですべて完結します。これはダミーテキストのため実データに差し替えてください。",
    diagram: { placeholder: "4つのサービスが1つにまとまる図解", src: null },
    steps: ["支援内容A", "支援内容B", "支援内容C", "支援内容D"],
  },

  benefits: {
    heading: "サービス内容",
    lead: "4つの支援内容を、必要な分だけ組み合わせてご利用いただけます。",
    items: [
      {
        num: "01",
        tag: "支援内容A",
        title: "支援内容Aの見出しを\nここに二行で記載する",
        body: "支援内容Aの説明文がここに入ります。実データに差し替えて100文字前後で記載してください。これはレイアウト確認用のダミーテキストです。",
        image: { placeholder: "支援内容Aのイメージ（画面キャプチャ等）", src: null },
      },
      {
        num: "02",
        tag: "支援内容B",
        title: "支援内容Bの見出しを\nここに二行で記載する",
        body: "支援内容Bの説明文がここに入ります。実データに差し替えて100文字前後で記載してください。これはレイアウト確認用のダミーテキストです。",
        image: { placeholder: "支援内容Bのイメージ（画面キャプチャ等）", src: null },
      },
      {
        num: "03",
        tag: "支援内容C",
        title: "支援内容Cの見出しを\nここに二行で記載する",
        body: "支援内容Cの説明文がここに入ります。実データに差し替えて100文字前後で記載してください。これはレイアウト確認用のダミーテキストです。",
        image: { placeholder: "支援内容Cのイメージ（画面キャプチャ等）", src: null },
      },
      {
        num: "04",
        tag: "支援内容D",
        title: "支援内容Dの見出しを\nここに二行で記載する",
        body: "支援内容Dの説明文がここに入ります。実データに差し替えて100文字前後で記載してください。これはレイアウト確認用のダミーテキストです。",
        image: { placeholder: "支援内容Dのイメージ（画面キャプチャ等）", src: null },
      },
    ],
  },

  advantage: {
    heading: "当社が選ばれる理由",
    items: [
      { title: "完全カスタマイズ", body: "テンプレートに頼らず、事業内容に合わせて個別設計します。これはダミーテキストです。", stat: "対応実績 00件" },
      { title: "一気通貫サポート", body: "企画から運用開始まで、ひとつの窓口で完結します。これはダミーテキストです。", stat: "満足度 00%" },
      { title: "業界ノウハウ", body: "業界特化のノウハウを活かした提案が可能です。これはダミーテキストです。", stat: "支援歴 00年" },
    ],
  },

  flow: {
    heading: "導入の流れ",
    lead: "お申し込みから運用開始まで、6つのステップでスムーズに進みます。",
    steps: [
      { num: "1", title: "無料相談", body: "ステップの説明文がここに入ります。ダミーテキストのため実データに差し替えてください。" },
      { num: "2", title: "ヒアリング", body: "ステップの説明文がここに入ります。ダミーテキストのため実データに差し替えてください。" },
      { num: "3", title: "お見積り・ご契約", body: "ステップの説明文がここに入ります。ダミーテキストのため実データに差し替えてください。" },
      { num: "4", title: "企画・制作", body: "ステップの説明文がここに入ります。ダミーテキストのため実データに差し替えてください。" },
      { num: "5", title: "最終確認・公開", body: "ステップの説明文がここに入ります。ダミーテキストのため実データに差し替えてください。" },
      { num: "6", title: "運用サポート", body: "ステップの説明文がここに入ります。ダミーテキストのため実データに差し替えてください。" },
    ],
  },

  faq: {
    heading: "よくあるご質問",
    items: [
      { q: "質問文のサンプル一つ目？", a: "回答文のサンプルがここに入ります。実データに差し替えて100文字前後で記載してください。これはダミーテキストです。" },
      { q: "質問文のサンプル二つ目？", a: "回答文のサンプルがここに入ります。実データに差し替えて100文字前後で記載してください。これはダミーテキストです。" },
      { q: "質問文のサンプル三つ目？", a: "回答文のサンプルがここに入ります。実データに差し替えて100文字前後で記載してください。これはダミーテキストです。" },
      { q: "質問文のサンプル四つ目？", a: "回答文のサンプルがここに入ります。実データに差し替えて100文字前後で記載してください。これはダミーテキストです。" },
    ],
  },

  closing: {
    heading: "まずは無料相談から、\n始めてみませんか？",
    body: "ご相談・お見積りは無料です。これはダミーテキストのため実データに差し替えてください。",
    ctaText: "まずは無料相談・お見積りはこちら",
    photo: { placeholder: "自信に満ちた笑顔の写真／賑わうイメージ", src: null },
  },

  form: {
    heading: "無料相談・お見積りのご依頼",
    lead: "下記フォームからお気軽にお申し込みください。\n担当より24時間以内にご連絡いたします。",
    fields: [
      { type: "text", name: "name", label: "お名前", required: true, placeholder: "山田 太郎" },
      { type: "text", name: "company", label: "会社名・屋号", optionalTag: "任意", placeholder: "〇〇株式会社" },
      { type: "tel", name: "tel", label: "電話番号", required: true, placeholder: "090-0000-0000" },
      { type: "email", name: "email", label: "メールアドレス", required: true, placeholder: "example@mail.com" },
      {
        type: "select",
        name: "timing",
        label: "開業予定時期",
        required: true,
        placeholder: "選択してください",
        options: [
          { value: "asap", label: "できるだけ早く" },
          { value: "3m", label: "3ヶ月以内" },
          { value: "6m", label: "6ヶ月以内" },
          { value: "1y", label: "1年以内" },
          { value: "unset", label: "未定" },
        ],
      },
      {
        type: "textarea",
        name: "note",
        label: "ご相談内容",
        optionalTag: "任意",
        placeholder: "現在の検討状況やご要望などをご自由にお書きください。",
        rows: 4,
      },
    ],
    submitLabel: "この内容で送信する",
    disclaimer: "送信いただいた内容はご相談対応のみに利用します。\nしつこい営業はいたしません。",
    errorMessage: "お名前・電話番号・メールアドレス・開業予定時期は必須項目です。",
  },

  sticky: {
    offerText: "無料相談・お見積り受付中",
    buttonText: "まずは無料相談",
    anchor: "#form",
  },
};

export default config;
