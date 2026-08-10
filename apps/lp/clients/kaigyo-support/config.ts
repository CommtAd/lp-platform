import type { PatternBConfig } from "@/clients/pattern-b.types";

/**
 * kaigyo-support は既存店舗オーナー向け「新規集客保証パック」LP。
 * pattern-b.types の必須項目に加え、このLP専用の追加セクション（対象者明記・
 * 成果保証訴求・比較表・実績・ビフォーアフター・対象業種）をローカルで拡張する。
 * 他クライアント（_base-b 等）には影響しない。
 */
interface KaigyoConfig extends PatternBConfig {
  fv: PatternBConfig["fv"] & {
    /** FV最上部の対象者ラベル。 */
    eyebrow: string;
    /** メインコピー直下のサブコピー。 */
    tagline: string;
  };
  problem: PatternBConfig["problem"] & {
    /** 悩みリスト下部の橋渡しコピー。 */
    closingLine: string;
  };
  solution: PatternBConfig["solution"] & {
    /** 対応領域の広さ（HP・予約システムまで）を補足する追加見出し・本文。 */
    scopeHeading: string;
    scopeBody: string;
  };
  audience: {
    heading: string;
    items: string[];
    note: string;
  };
  /** 「広告だけでは完結しない」という導線全体の必要性を訴求するセクション。 */
  funnel: {
    heading: string;
    painPoints: string[];
    statement: string;
    steps: string[];
    caption: string;
  };
  /** ワンストップで対応できる施策の一覧セクション。 */
  onestop: {
    heading: string;
    items: string[];
    note: string;
  };
  guarantee: {
    heading: string;
    highlight: string;
    body: string;
    footnote: string;
  };
  comparison: {
    heading: string;
    general: { label: string; items: string[] };
    ours: { label: string; items: string[] };
  };
  results: {
    heading: string;
    headline: { label: string; before: string; after: string };
    stats: { label: string; value: string }[];
    disclaimer: string;
  };
  beforeAfter: {
    heading: string;
    items: { before: string; after: string }[];
  };
  industries: {
    heading: string;
    items: string[];
  };
}

const config: KaigyoConfig = {
  slug: "kaigyo-support",
  status: "draft",
  meta: {
    title: "フィットネス新規集客保証パック｜広告運用・LP改善・予約導線まで成果保証型でサポート",
    description:
      "すでに店舗を運営しているフィットネス事業者向けに、広告運用・クリエイティブ・LP改善・予約導線改善までを成果保証型でサポート。新規顧客獲得・体験予約の増加に特化した集客支援サービスです。",
    ogpImage: undefined,
  },
  accent: "#0B2545",
  cta: "#FF6A2B",
  accent2: "#3DA5F5",

  header: {
    brand: "フィットネス新規集客保証パック",
    brandSub: "成果保証型の新規集客支援",
    navLinks: [
      { label: "サービス内容", href: "#benefits" },
      { label: "集客実績", href: "#results" },
      { label: "利用の流れ", href: "#flow" },
      { label: "よくある質問", href: "#faq" },
    ],
    ctaText: "無料相談する",
  },

  fv: {
    eyebrow: "フィットネス店舗を運営している方へ",
    heading: ["店舗はある。", "でも、新規客が来ない。"],
    tagline: "そんなフィットネス店舗の集客を変える",
    highlight: "成果保証型「フィットネス新規集客保証パック」",
    sub: "パーソナルジム・ピラティス・ヨガ・整体など\nフィットネス店舗の新規顧客獲得をサポートします。",
    ctaText: "新規集客について無料相談する",
    trust: ["現在の集客状況もヒアリング可能", "見積り無料", "しつこい営業なし"],
    badge: "既存店舗オーナー様向け 新規集客支援",
    hero: {
      placeholder: "賑わうスタジオの内観とスマートフォンに届いた予約通知の合成イメージ",
      src: null,
    },
  },

  audience: {
    heading: "こんな店舗オーナー様におすすめです",
    items: [
      "すでに店舗を運営している",
      "新規顧客の獲得に困っている",
      "体験予約がなかなか増えない",
      "広告を出しているが成果が出ていない",
      "毎月安定して新規顧客を獲得したい",
    ],
    note: "本サービスは、現在フィットネス店舗を運営されている事業者様を対象とした新規集客支援サービスです。",
  },

  problem: {
    eyebrow: "PROBLEM",
    heading: "こんな集客のお悩みありませんか？",
    lead: "店舗をオープンしたものの新規のお客様が来ない、広告を出しても成果が分からない……\n新規集客に関するお悩みを数多くお聞きしてきました。",
    persona: {
      placeholder: "広告管理画面を見て悩む店舗オーナーのイラスト",
      src: null,
    },
    tasks: [
      "店舗をオープンしたけど新規のお客様が来ない",
      "Instagramを更新しているけど予約につながらない",
      "広告を出しているけど、広告費だけがかかっている",
      "広告代理店に依頼しているけど成果が分からない",
      "月によって新規顧客数にバラつきがある",
      "体験予約から入会につながる母数が足りない",
      "ホームページはあるが予約につながっていない",
      "店舗のHPを新しく作りたい",
      "予約システムが使いづらく、予約時の離脱が多い",
      "広告・HP・予約システムをそれぞれ別の会社に依頼している",
      "集客に必要なWeb周りをまとめて任せたい",
    ],
    closingLine: "その集客課題を「フィットネス新規集客保証パック」が解決します。",
  },

  solution: {
    eyebrow: "SOLUTION",
    heading: "フィットネス店舗の\n「新規顧客獲得」に特化した集客支援",
    lead: "フィットネス新規集客保証パックは、広告運用・クリエイティブ・LP・予約導線などを活用し、フィットネス店舗の新規顧客獲得をサポートするサービスです。\n「広告を出すこと」ではなく、実際の「新規顧客・体験予約の獲得」を目的に集客施策を設計します。",
    diagram: { placeholder: "6つの施策が新規顧客獲得に集約される図解", src: null },
    steps: ["広告運用", "LP", "HP", "予約システム", "クリエイティブ", "予約導線"],
    scopeHeading: "新規集客に必要な環境を\nまとめてサポート",
    scopeBody:
      "フィットネス新規集客保証パックでは、広告運用だけではなく、\n広告から集客したユーザーを予約・来店につなげるために必要なWeb環境まで一貫してサポートします。\n店舗の状況に合わせて、広告運用・LP制作・HP制作・予約システム導入・広告クリエイティブ制作・予約導線改善など、新規顧客獲得に必要な施策をご提案します。",
  },

  funnel: {
    heading: "広告だけでは、\n新規集客は完結しません。",
    painPoints: [
      "HPが分かりづらい",
      "LPで魅力が伝わらない",
      "予約方法が分かりづらい",
      "予約フォームで離脱してしまう",
    ],
    statement:
      "「広告を出すところ」から「実際に予約されるところ」まで、\n新規集客に必要な導線をまとめて支援します。",
    steps: ["広告", "LP・HP", "予約システム", "体験予約", "来店・入会"],
    caption: "新規顧客獲得に必要な導線を\nワンストップで構築・改善",
  },

  onestop: {
    heading: "新規集客に必要な施策を\nすべてワンストップで。",
    items: [
      "集客戦略設計",
      "Meta広告運用",
      "Google広告運用",
      "広告クリエイティブ制作",
      "LP制作・改善",
      "HP制作・改善",
      "予約システム導入",
      "予約導線改善",
      "データ分析・改善",
    ],
    note: "店舗ごとに必要な施策は異なるため、現在の集客状況を確認したうえで、必要な施策を組み合わせてご提案します。",
  },

  guarantee: {
    heading: "広告運用ではなく、\n「成果」を保証。",
    highlight: "成果保証型だから\n集客成果が見えやすい。",
    body: "一般的な広告代理店への依頼では、広告費や運用費を支払っても、必ずしも集客成果につながるとは限りません。\nフィットネス新規集客保証パックでは、あらかじめ設定した成果基準をもとに、新規集客をサポートします。",
    footnote: "※具体的な保証件数・保証条件については、実際のサービス条件に合わせてご案内します。",
  },

  comparison: {
    heading: "一般的な広告運用との違い",
    general: {
      label: "一般的な広告代理店",
      items: [
        "広告運用が中心",
        "LPやHPは別会社へ依頼",
        "予約システムは店舗側で準備",
        "広告から予約までの導線が分断されやすい",
      ],
    },
    ours: {
      label: "フィットネス新規集客保証パック",
      items: [
        "新規顧客獲得を目的に設計",
        "成果保証型",
        "広告運用",
        "LP制作",
        "HP制作",
        "予約システム導入",
        "クリエイティブ制作",
        "予約導線改善",
      ],
    },
  },

  benefits: {
    heading: "新規集客に必要な施策を\nまとめてサポート",
    lead: "広告戦略の設計から配信後の改善まで、\n新規顧客獲得に必要な業務をまとめてご提供します。",
    items: [
      {
        num: "01",
        tag: "広告戦略設計",
        title: "店舗・商圏に合わせた\n広告戦略設計",
        body: "店舗の立地・商圏・ターゲットに合わせて、最適な広告戦略を設計します。",
        image: {
          placeholder: "商圏分析とターゲット設定のイメージ図",
          src: null,
        },
      },
      {
        num: "02",
        tag: "Meta広告運用",
        title: "Instagram・Facebook広告で\n新規ユーザーへアプローチ",
        body: "Instagram・Facebook広告を活用し、新規顧客となるユーザーへ的確にアプローチします。",
        image: {
          placeholder: "広告媒体ロゴと右肩上がりの成果グラフのイメージ",
          src: "/clients/kaigyo-support/benefit-ads.jpg",
        },
      },
      {
        num: "03",
        tag: "広告クリエイティブ制作",
        title: "集客成果につながる\nバナー・動画クリエイティブ制作",
        body: "集客成果につながるバナーや動画クリエイティブを制作し、広告の反応率を高めます。",
        image: {
          placeholder: "スマホに表示された広告クリエイティブのイメージ",
          src: null,
        },
      },
      {
        num: "04",
        tag: "LP制作・改善",
        title: "予約しやすいLPへ\n制作・継続的に改善",
        body: "広告から流入したユーザーが予約しやすいLPへ、制作から継続的な改善までサポートします。",
        image: {
          placeholder: "スマホに表示された体験予約LPのイメージ",
          src: "/clients/kaigyo-support/benefit-lp.jpg",
        },
      },
      {
        num: "05",
        tag: "HP制作・改善",
        title: "予約につながる\nホームページを制作・改善",
        body: "店舗の特徴・サービス内容が伝わり、新規ユーザーの予約につながるホームページを制作・改善します。\n現在HPがない店舗は新規制作、既存HPがある場合は集客導線を考慮した改善も対応します。",
        image: {
          placeholder: "ノートPC・スマホに表示された店舗HPのイメージ",
          src: null,
        },
      },
      {
        num: "06",
        tag: "予約システム導入",
        title: "スムーズに体験予約できる\n予約環境を構築",
        body: "広告やHPから流入したユーザーがスムーズに体験予約できる予約環境を構築します。\n店舗側の予約管理業務も含め、運用しやすい予約導線をご提案します。",
        image: {
          placeholder: "タブレットに表示された予約カレンダーと顧客管理UIのイメージ",
          src: null,
        },
      },
      {
        num: "07",
        tag: "予約導線改善",
        title: "広告クリックから\n体験予約までの離脱を削減",
        body: "広告クリックから体験予約完了までの導線を見直し、離脱を減らします。",
        image: {
          placeholder: "スマホでの予約フォーム入力画面のイメージ",
          src: null,
        },
      },
      {
        num: "08",
        tag: "広告データ分析・改善",
        title: "配信データをもとに\n継続的に広告を改善",
        body: "配信結果を分析し、広告・クリエイティブを継続的に改善します。",
        image: {
          placeholder: "広告管理画面のグラフと改善提案のイメージ",
          src: null,
        },
      },
    ],
  },

  results: {
    heading: "フィットネス店舗の\n新規集客実績",
    headline: { label: "広告からの体験予約", before: "月間 0件", after: "月間 30件以上" },
    stats: [
      { label: "月間体験予約数", value: "50件以上" },
      { label: "CPA", value: "○○円" },
      { label: "入会数", value: "○○名" },
    ],
    disclaimer: "※実際に公開可能な実績のみ掲載しています。",
  },

  beforeAfter: {
    heading: "集客できない状態から\n安定して新規顧客を獲得できる状態へ",
    items: [
      { before: "広告を出しても予約0件", after: "毎月安定して体験予約を獲得" },
      { before: "Instagramだけで集客", after: "広告から新規顧客を継続獲得" },
      { before: "広告代理店に任せきり", after: "成果を確認しながら集客改善" },
    ],
  },

  industries: {
    heading: "フィットネス・店舗ビジネスに対応",
    items: [
      "パーソナルジム",
      "フィットネスクラブ",
      "ピラティススタジオ",
      "ヨガスタジオ",
      "整体・ストレッチ店舗",
      "その他フィットネス関連店舗",
    ],
  },

  advantage: {
    heading: "こんな店舗オーナー様におすすめです",
    items: [
      { title: "現在店舗を運営している", body: "" },
      { title: "もっと新規顧客を増やしたい", body: "" },
      { title: "広告をやっているが成果が出ていない", body: "" },
      { title: "毎月の新規顧客数を安定させたい", body: "" },
      { title: "SNSだけの集客に限界を感じている", body: "" },
      { title: "集客をプロに任せたい", body: "" },
      { title: "HPやLPを改善したい", body: "" },
      { title: "予約システムを導入・変更したい", body: "" },
      { title: "広告から予約までの導線を改善したい", body: "" },
      { title: "Web周りを複数業者に依頼するのが大変", body: "" },
      { title: "集客に必要な環境をまとめて任せたい", body: "" },
    ],
  },

  flow: {
    heading: "利用の流れ",
    lead: "無料相談から集客改善まで、\n5つのステップで進みます。",
    steps: [
      { num: "1", title: "無料相談", body: "現在の店舗状況・集客状況についてヒアリングします。" },
      { num: "2", title: "集客状況の分析", body: "現在の広告・SNS・LP・予約導線などを確認します。" },
      { num: "3", title: "集客プランのご提案", body: "店舗・商圏・目標に合わせて集客施策をご提案します。" },
      { num: "4", title: "広告配信・集客開始", body: "広告・クリエイティブ・LPなどを準備し、集客を開始します。" },
      { num: "5", title: "分析・改善", body: "広告データを分析しながら、新規顧客獲得数の最大化を目指します。" },
    ],
  },

  faq: {
    heading: "よくあるご質問",
    items: [
      {
        q: "すでに広告を運用していますが依頼できますか？",
        a: "はい。現在の広告配信状況を確認したうえで、改善施策をご提案します。",
      },
      {
        q: "広告を一度も実施したことがなくても大丈夫ですか？",
        a: "はい。広告アカウントの準備から配信設計までサポート可能です。",
      },
      {
        q: "どのような店舗が対象ですか？",
        a: "パーソナルジム・ピラティス・ヨガ・フィットネスジム・整体など、店舗型のフィットネス関連事業者様を対象としています。",
      },
      {
        q: "成果保証とはどのような内容ですか？",
        a: "具体的な成果保証内容・適用条件については、店舗状況を確認したうえでご案内します。",
      },
    ],
  },

  closing: {
    heading: "店舗の新規集客、\nまずは無料相談から。",
    body: "現在の集客状況をヒアリングしたうえで、\n店舗に合った集客方法をご提案します。",
    ctaText: "自店舗で集客できるか相談する",
    photo: {
      placeholder: "自信に満ちた笑顔のオーナーと、賑わう店舗のイメージ",
      src: "/clients/kaigyo-support/closing.jpg",
    },
  },

  form: {
    heading: "新規集客について無料相談する",
    lead: "下記フォームからお気軽にお申し込みください。\n担当より24時間以内にご連絡いたします。",
    fields: [
      { type: "text", name: "name", label: "お名前", required: true, placeholder: "山田 太郎" },
      { type: "text", name: "company", label: "会社名 / 店舗名", required: true, placeholder: "〇〇スタジオ" },
      { type: "tel", name: "tel", label: "電話番号", required: true, placeholder: "090-0000-0000" },
      { type: "email", name: "email", label: "メールアドレス", required: true, placeholder: "example@mail.com" },
      {
        type: "text",
        name: "storeUrl",
        label: "店舗URL / Instagram URL",
        required: true,
        placeholder: "https://... または @account",
      },
      {
        type: "select",
        name: "storeStatus",
        label: "現在の店舗状況",
        required: true,
        placeholder: "選択してください",
        options: [
          { value: "operating", label: "現在店舗を運営している" },
          { value: "opening_3m", label: "3ヶ月以内にオープン予定" },
          { value: "preparing", label: "開業準備中" },
          { value: "considering", label: "開業を検討している段階" },
        ],
      },
      {
        type: "select",
        name: "monthlyNewCustomers",
        label: "現在の月間新規顧客数",
        required: true,
        placeholder: "選択してください",
        options: [
          { value: "0-5", label: "0〜5名" },
          { value: "6-10", label: "6〜10名" },
          { value: "11-30", label: "11〜30名" },
          { value: "31+", label: "31名以上" },
        ],
      },
      {
        type: "checkboxGroup",
        name: "acquisitionMethods",
        label: "現在の集客方法（複数選択可）",
        required: true,
        columns: 2,
        options: [
          { value: "meta_ads", label: "Meta広告" },
          { value: "google_ads", label: "Google広告" },
          { value: "instagram", label: "Instagram" },
          { value: "meo", label: "MEO" },
          { value: "portal", label: "ポータルサイト" },
          { value: "referral", label: "紹介" },
          { value: "none", label: "特に実施していない" },
          { value: "other", label: "その他" },
        ],
      },
      {
        type: "select",
        name: "currentIssue",
        label: "現在の集客課題",
        required: true,
        placeholder: "選択してください",
        options: [
          { value: "few_new_customers", label: "新規顧客が少ない" },
          { value: "few_trial_bookings", label: "体験予約が少ない" },
          { value: "poor_ad_results", label: "広告成果が悪い" },
          { value: "high_cpa", label: "CPAが高い" },
          { value: "low_conversion", label: "入会率が低い" },
          { value: "no_idea", label: "集客方法が分からない" },
          { value: "other", label: "その他" },
        ],
      },
      {
        type: "textarea",
        name: "note",
        label: "ご相談内容",
        optionalTag: "任意",
        placeholder: "現在の集客状況やご要望などをご自由にお書きください。",
        rows: 4,
      },
    ],
    submitLabel: "新規集客について無料相談する",
    disclaimer: "送信いただいた内容はご相談対応のみに利用します。\nしつこい営業はいたしません。",
    errorMessage: "お名前・会社名/店舗名・電話番号・メールアドレス・店舗URLと、店舗状況に関する項目は必須です。",
  },

  sticky: {
    offerText: "新規集客の無料相談受付中",
    buttonText: "無料で相談する",
    anchor: "#form",
  },
};

export default config;
