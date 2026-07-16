import type { PatternBConfig } from "@/clients/pattern-b.types";

const config: PatternBConfig = {
  slug: "kaigyo-support",
  status: "draft",
  meta: {
    title: "フィットネス開業支援パック｜HP・LP制作から予約システム・広告運用まで丸ごとサポート",
    description:
      "フィットネス開業予定の方向けに、HP・LP制作、予約システム導入、広告運用までワンストップでサポート。オープン初月からのロケットスタートを実現します。",
    ogpImage: undefined,
  },
  accent: "#0B2545",
  cta: "#FF6A2B",
  accent2: "#3DA5F5",

  header: {
    brand: "フィットネス開業支援パック",
    brandSub: "Web・集客まるごと伴走",
    navLinks: [
      { label: "サービス内容", href: "#benefits" },
      { label: "選ばれる理由", href: "#advantage" },
      { label: "導入の流れ", href: "#flow" },
      { label: "よくある質問", href: "#faq" },
    ],
    ctaText: "無料相談・お見積り",
  },

  fv: {
    badge: "フィットネス業界に特化！",
    heading: ["フィットネス開業の", "Web・集客周り、", "すべて丸投げしませんか？"],
    sub: "HP・LP制作から予約システム導入、広告運用まで。\nあなたの店舗に合わせた完全カスタマイズで、オープン初月からのロケットスタートを実現します！",
    ctaText: "まずは無料相談・お見積りはこちら",
    hero: {
      placeholder: "高級感のあるクリーンなジム内装とWebサービスUIの合成イメージ",
      src: "/clients/kaigyo-support/hero.svg",
    },
  },

  problem: {
    eyebrow: "PROBLEM",
    heading: "こんなお悩み、ありませんか？",
    lead: "物件契約、機材選定、ホームページ制作、広告運用……開業準備はやることが山積み。\nすべて自分たちだけで抱え込み、疲弊してしまうオーナー様の声を数多くお聞きしてきました。",
    persona: {
      placeholder: "少し疲れた表情のジムオーナーのイラスト",
      src: "/clients/kaigyo-support/persona.svg",
    },
    tasks: ["物件", "機材", "HP制作", "広告"],
  },

  solution: {
    eyebrow: "SOLUTION",
    heading: "バラバラのタスクを、\nひとつのパックに。",
    lead: "HP制作・LP制作・予約システム導入・広告運用という\n4つの専門業務を、窓口ひとつでまとめてお任せいただけます。",
    diagram: { placeholder: "4つのサービスが1つにまとまる図解", src: null },
    steps: ["HP制作", "LP制作", "予約システム", "広告運用"],
  },

  benefits: {
    heading: "サービス内容",
    lead: "4つの支援を、オープンまでの導線に合わせて\nまとめてご提供します。",
    items: [
      {
        num: "01",
        tag: "HP制作",
        title: "魅力が伝わる\n店舗のホームページ制作",
        body: "清潔感のあるスタジオやインストラクター・トレーナーの写真を中心に据えた、\n信頼感のあるホームページを制作します。",
        image: {
          placeholder: "ノートPC・スマホに表示されたジムHPのイメージ",
          src: "/clients/kaigyo-support/benefit-hp.svg",
        },
      },
      {
        num: "02",
        tag: "LP制作",
        title: "コンバージョンを高める\n体験申込み特化LP",
        body: "カウントダウンタイマーや体験申込みフォームを配置した、成果につながるランディングページを制作します。",
        image: {
          placeholder: "スマホに表示された体験申込みLPのイメージ",
          src: "/clients/kaigyo-support/benefit-lp.svg",
        },
      },
      {
        num: "03",
        tag: "予約システム導入",
        title: "直感的に使える\n予約・顧客管理システム",
        body: "操作しやすいカレンダー予約UIと顧客管理ダッシュボードを導入し、日々の運営を効率化します。",
        image: {
          placeholder: "タブレットに表示された予約カレンダーUIのイメージ",
          src: "/clients/kaigyo-support/benefit-reservation.svg",
        },
      },
      {
        num: "04",
        tag: "広告運用",
        title: "Google・Instagram・LINEの\n広告運用で集客を後押し",
        body: "各媒体の特性に合わせた広告運用で、オープン時からの安定した集客を支援します。\n成果保証型の広告運用のため、成果が出なければ費用が発生しません。",
        image: {
          placeholder: "広告媒体ロゴと右肩上がりの成果グラフのイメージ",
          src: "/clients/kaigyo-support/benefit-ads.svg",
        },
      },
    ],
  },

  advantage: {
    heading: "当社が選ばれる理由",
    items: [
      { title: "完全カスタマイズ", body: "テンプレートに頼らず、店舗のコンセプトや立地に合わせて一つひとつ設計します。" },
      { title: "一気通貫サポート", body: "企画から公開後の運用まで、ひとつの窓口で対応します。" },
      { title: "業界ノウハウ", body: "フィットネス業界に特化して培ったノウハウを活かしたご提案が可能です。" },
    ],
  },

  flow: {
    heading: "導入の流れ",
    lead: "無料相談からオープン後の運用サポートまで、\n6つのステップで進みます。",
    steps: [
      { num: "1", title: "無料相談", body: "現在の検討状況やお悩みをお伺いします。" },
      { num: "2", title: "ヒアリング", body: "コンセプトやターゲット、ご予算などを詳しくお伺いします。" },
      { num: "3", title: "お見積り・ご契約", body: "ヒアリング内容をもとに、最適なプランをご提案します。" },
      { num: "4", title: "企画・制作", body: "HP・LP・予約システムの設計と制作を進めます。" },
      { num: "5", title: "最終確認・公開", body: "内容をご確認いただき、オープンに合わせて公開します。" },
      { num: "6", title: "運用サポート", body: "広告運用や改善提案など、オープン後も伴走します。" },
    ],
  },

  faq: {
    heading: "よくあるご質問",
    items: [
      {
        q: "開業準備の初期段階でも相談できますか？",
        a: "はい、物件が決まっていない段階からでもご相談いただけます。早い段階でのご相談ほど、準備をスムーズに進めやすくなります。",
      },
      {
        q: "一部のサービスだけの依頼は可能ですか？",
        a: "はい、HP制作のみ、広告運用のみなど、必要な支援だけを組み合わせてご依頼いただけます。",
      },
      {
        q: "対応エリアは決まっていますか？",
        a: "全国対応可能です。オンラインでの打ち合わせを中心に進めますので、遠方のお客様も安心してご利用いただけます。",
      },
      {
        q: "費用はどれくらいかかりますか？",
        a: "ご要望の範囲によって異なりますので、まずは無料相談にて概算のお見積りをお伝えします。",
      },
    ],
  },

  closing: {
    heading: "まずは無料相談から、\n始めてみませんか？",
    body: "ご相談・お見積りは無料です。開業に向けた不安や疑問、なんでもお気軽にお聞かせください。",
    ctaText: "まずは無料相談・お見積りはこちら",
    photo: {
      placeholder: "自信に満ちた笑顔のトレーナーと、賑わうジムのイメージ",
      src: "/clients/kaigyo-support/closing.svg",
    },
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
