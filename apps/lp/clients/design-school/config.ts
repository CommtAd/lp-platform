import type { LPFormField } from "@/components/LPForm";

/** 画像枠。src が null の間は ImageSlot のプレースホルダが出る。 */
export interface Img {
  src: string | null;
  placeholder: string;
  position?: string;
}

/**
 * 強調付きテキスト。`[[...]]` で囲んだ部分がアクセント色（ピンク）、
 * `{{...}}` で囲んだ部分が黄色マーカーになる。`\n` は改行。
 */
export type Rich = string;

export interface DesignSchoolConfig {
  slug: string;
  status: "draft" | "published";
  meta: { title: string; description: string; ogpImage?: string };

  brand: {
    /** スクール名。未確定の間は「〇〇〇〇〇」。 */
    name: string;
    logo: Img;
    copyright: string;
  };
  /** LINE友だち追加URL。未確定の間は "#"。 */
  lineUrl: string;

  header: { lineText: string; ctaText: string };
  offerBar: Rich;

  fv: {
    label: string;
    titleAccent: string;
    titleRest: string;
    titleLine2: string;
    photo: Img;
    badge: { big: string; small: string };
    kicker: string;
    heading: string;
    skills: string[];
    points: Rich[];
    /** FV下部の権威づけ帯。 */
    authority: Rich;
  };

  consult: {
    pill: string;
    lead: string;
    heading: string;
    body: Rich;
    photos: [Img, Img];
    topicsHeading: string;
    topics: { icon: "doc" | "yen" | "career" | "chat"; label: string }[];
    ctaText: Rich;
    lineText: string;
  };

  problem: {
    lead: string;
    headingAccent: string;
    headingRest: string;
    items: Rich[];
    illustration: Img;
    goalLead: string;
    goal: string;
  };

  gap: {
    bubble: string;
    line1: string;
    line2: string;
    line3: string;
    band: string;
    pillars: { label: string; image: Img; color: string }[];
    after: string;
    power: Rich;
    worry: string;
  };

  intro: {
    tag: string;
    photo: Img;
    bg: Img;
    vertical: string[];
    body: Rich;
  };

  /** 監修者（権威性）。 */
  authority: {
    eyebrow: string;
    lead: string;
    name: string;
    nameEn: string;
    role: string;
    photo: Img;
    stat: { label: string; value: string; unit: string };
    body: Rich;
  };

  features: {
    heading: string;
    items: { title: string[]; body: Rich; image: Img; note?: string }[];
  };

  gallery: {
    lead: string;
    heading: string;
    banners: { label: string; items: Img[] };
    lps: { label: string; items: Img[] };
  };

  comparison: {
    lead: string;
    headingRest: string;
    headingAccent: string;
    otherLabel: string;
    rows: { label: string; ours: string; other: string }[];
  };

  /** 対象者と受講条件。 */
  target: {
    eyebrow: string;
    heading: string;
    personas: { title: string; body: string }[];
    requirement: { label: string; title: string; body: string };
    beginner: { heading: string; lead: string; items: string[]; note: string };
  };

  pricing: {
    eyebrow: string;
    heading: string;
    valueLead: string;
    values: { title: string; body: string }[];
    price: { label: string; amount: string; unit: string; tax: string; note?: string };
    rows: { label: string; value: Rich; list?: string[] }[];
  };

  barrier: {
    pill: string;
    lead: string;
    heading: string;
    body: Rich;
    photo: Img;
    closingLead: string;
    closing: Rich[];
  };

  support: {
    heading: string;
    items: { icon: "office" | "hand" | "doc" | "chat"; title: string; body: string }[];
  };

  faq: { heading: string; items: { q: string; a: string }[] };

  challenge: {
    photo: Img;
    lead: string;
    heading: Rich;
    body: Rich[];
  };

  form: {
    pill: string;
    headingAccent: string;
    headingRest: string;
    fields: LPFormField[];
    submitLabel: string;
    errorMessage: string;
    disclaimer: string;
  };

  bottomBar: { lineText: string; ctaText: string };
}

const img = (placeholder: string): Img => ({ src: null, placeholder });

/**
 * WEBデザインスクール（無料個別相談会）LP。
 *
 * 仮環境: ダッシュボード未登録の仮slug。表示は LPShell の fallback で行う。
 * 本番化するときはダッシュボードで枠を作り、その slug でフォルダ名・`slug` を揃えること。
 *
 * 未確定（デザイン上も空欄）: スクール名「〇〇〇〇〇」・ロゴ・LINE URL・FAQ・全写真。
 * 要確認（TODO）: 渡邊さんの肩書き、受講条件、税込表記、案件保証の条件。
 */
const config: DesignSchoolConfig = {
  slug: "design-school",
  status: "draft",
  meta: {
    title: "広告代理店が本気で育てる 実践型WEBデザインスクール｜無料個別相談会",
    description:
      "年間数十億円の広告運用実績を持つ渡邊徹が監修。週4回のライブ講義と現役デザイナーの直接指導で、Photoshop・バナー・LPを1ヶ月で集中習得。卒業後はラスクでの採用チャンスと5万円の案件保証つき。まずは無料のオンライン個別相談会へ。",
  },

  brand: {
    name: "〇〇〇〇〇",
    logo: img("logo"),
    copyright: "© 2026 rusk Inc.",
  },
  lineUrl: "#",

  header: { lineText: "LINE相談", ctaText: "無料オンライン相談" },
  offerBar: "正社員を目指すフリーランスの方・\n{{広告デザイナー志望}}の方へ",

  fv: {
    label: "広告代理店が本気で育てる",
    titleAccent: "実践型",
    titleRest: "WEB",
    titleLine2: "デザインスクール",
    photo: img("メインビジュアル（PCに向かう女性）"),
    badge: { big: "1ヶ月", small: "短期集中！" },
    kicker: "一生モノのスキルを得る",
    heading: "現場で求められるデザイン力を",
    skills: ["Photoshop", "バナー", "LP", "マーケティング"],
    points: ["現役デザイナーが\n{{[[直接指導]]}}！", "卒業後は\n{{[[採用のチャンス]]}}！"],
    authority: "年間[[数十億円]]の広告運用実績\n渡邊 徹 監修",
  },

  consult: {
    pill: "オンライン開催 / 約50分",
    lead: "まずは無料の",
    heading: "個別相談会",
    body: "{{カリキュラムについて}}や、{{費用について}}\nなど詳しくお話しさせていただきます。\n{{疑問や不安点などなんでも}}\nお気軽な気持ちでぜひご相談ください。",
    photos: [img("相談会イメージ1"), img("相談会イメージ2")],
    topicsHeading: "気になることをじっくり解決",
    topics: [
      { icon: "doc", label: "カリキュラム\nについて" },
      { icon: "yen", label: "費用\nについて" },
      { icon: "career", label: "目指せるキャリア\nについて" },
      { icon: "chat", label: "卒業後の\n採用について" },
    ],
    ctaText: "まずは{{無料}}で相談してみる",
    lineText: "LINEからのご相談はこちら",
  },

  problem: {
    lead: "このようなことで",
    headingAccent: "お悩み",
    headingRest: "はありませんか？",
    items: [
      "独学やスクールで学んだけど\n[[経験もスキルも足りない]]気がする…",
      "[[動画を観るだけのスクール]]では\n続かなかった…",
      "スクールを卒業したけれど、\n[[転職、就職できていない…]]",
      "フリーランスで活動しているけど\n[[正社員として働きたい…]]",
      "コンペに応募しても\n[[なかなか採用されない…]]",
      "プロからもっと\n[[添削を受けたい！]]",
    ],
    illustration: img("悩む女性のイラスト"),
    goalLead: "広告の現場で一目置かれる",
    goal: "WEBデザイナーになりたい！",
  },

  gap: {
    bubble: "そのために、知ってほしい",
    line1: "デザインを「作れる」と",
    line2: "「仕事で通用する」",
    line3: "は違う！",
    band: "実際の制作現場で必要なのは",
    pillars: [
      { label: "誰に", image: img("ターゲット"), color: "#B4586F" },
      { label: "何を", image: img("訴求内容"), color: "#3A4559" },
      { label: "どう伝える", image: img("伝え方"), color: "#A88A55" },
    ],
    after: "を考え、",
    power: "[[目的に合わせて]]デザインする力",
    worry: "この力を身に付けるために\nどうすれば良いのかわからない…",
  },

  intro: {
    tag: "そんなあなたのための",
    photo: img("講師イメージ（PCを持つ女性）"),
    bg: img("オフィス背景"),
    /** 右から読む順。 */
    vertical: ["[[広告代理店]]が運営する", "[[超！実践型]]の", "WEBデザインスクール"],
    body: "〇〇〇〇〇では、分厚い教科書は使わず、\n[[即実践で使えるスキル]]だけを最短で学べます。\n現役デザイナーからフィードバックを受け、\n[[「理由を持ってデザインできる力」]]を\n身につけることができるのが魅力です。",
  },

  // TODO(要確認): 肩書き・写真・本文の表現は渡邊さん本人の確認を取ってから確定する。
  authority: {
    eyebrow: "SUPERVISOR",
    lead: "スクール監修",
    name: "渡邊 徹",
    nameEn: "Toru Watanabe",
    role: "肩書きが入ります",
    photo: img("渡邊 徹 プロフィール写真"),
    stat: { label: "年間広告運用額", value: "数十億", unit: "円規模" },
    body: "年間数十億円規模の広告運用で培った{{「成果が出るクリエイティブ」の知見}}を、カリキュラムと添削に反映。見た目の美しさだけでなく、[[数字につながるデザインの考え方]]まで学べます。",
  },

  features: {
    heading: "選ばれる理由",
    items: [
      {
        title: ["指導するのは", "現役のWEBデザイナー！"],
        body: "講師を担当するのは、{{スクール専門講師ではなく現在も広告代理店で実案件を制作している}}Webデザイナー。プロが実務で行っている判断まで言語化してフィードバックします。",
        image: img("オンライン指導の様子"),
      },
      {
        title: ["通学×オンラインの", "ハイブリッド型受講スタイル！"],
        body: "教室で直接学ぶ通学と、自宅等から参加するオンラインを選択可能。{{ご都合に合わせて柔軟に使い分ける}}ことができます。",
        image: img("通学とオンライン"),
      },
      {
        title: ["週4回のLIVE授業", "リアルタイムで学べる！"],
        body: "{{動画視聴ではなく、週4回の授業はすべてリアルタイムで実施。}}{{その場で質問・相談できる}}から、疑問を残さず1ヶ月で実践的なスキルを身につけられます。",
        image: img("LIVE授業の様子"),
      },
      {
        title: ["Photoshop / バナー / LPに", "学習内容を徹底特化！"],
        body: "コーディングや幅広いWeb制作スキルを浅く学ぶのではなく、{{仕事で使うデザイン制作を集中学習。}}{{計100万円分の実務案件}}を題材に、即実践で使えるスキルを身につけます。",
        image: img("Photoshopでの制作"),
      },
      {
        title: ["広告代理店が", "直接運営するスクール！"],
        body: "年間数十億円の広告を運用する広告代理店が運営。{{スクールのためだけに作られた知識ではなく、実際の制作現場で求められている考え方}}をもとにカリキュラムを設計しています。",
        image: img("運営会社スタッフ集合写真"),
      },
      {
        title: ["卒業後、ご希望の方は", "ラスクで採用のチャンス！"],
        body: "一定の採用基準を満たした方には、{{卒業後にラスクの採用選考にご案内}}させていただきます。スクールで学んだ先に、{{「実際に広告代理店でWebデザイナーとして働く」}}ことができます。",
        image: img("オフィスで働く様子"),
        note: "※受講によって採用が保証されるものではありません。\nスキル・成長力・適性等を総合的に判断いたします。",
      },
    ],
  },

  gallery: {
    lead: "こんなデザインが",
    heading: "作れるように！",
    banners: {
      label: "制作例 バナー",
      items: Array.from({ length: 8 }, (_, i) => img(`バナー制作例${i + 1}`)),
    },
    lps: {
      label: "制作例 スマホ向けLP\n（ファーストビュー）",
      items: Array.from({ length: 4 }, (_, i) => img(`LP制作例${i + 1}`)),
    },
  },

  comparison: {
    lead: "比べてわかる！",
    headingRest: "他スクールとの",
    headingAccent: "比較",
    otherLabel: "一般的な\n動画型スクール",
    rows: [
      { label: "期間", ours: "1ヶ月\n短期集中", other: "数ヶ月〜\n半年以上" },
      { label: "授業", ours: "週4回の\nLIVE授業", other: "録画動画を中心に\n自主学習" },
      { label: "受講方法", ours: "通学×\nオンライン", other: "オンライン中心" },
      { label: "学習内容", ours: "Photoshop\nバナー・LPに特化", other: "Web制作を\n幅広く学習" },
      { label: "質問", ours: "授業中に\nその場で質問", other: "チャット・\n質問フォーム等" },
      { label: "卒業後", ours: "採用チャンス＋\n5万円の案件保証", other: "キャリア支援\nなど" },
    ],
  },

  // TODO(要確認): 受講条件・未経験者の受入れ条件は顧客確認後に確定する。
  target: {
    eyebrow: "FOR YOU",
    heading: "こんな方のためのスクールです",
    personas: [
      {
        title: "正社員を目指すフリーランスの方",
        body: "案件をこなしながらも、広告代理店などで正社員デザイナーとして働く道を考えている方。",
      },
      {
        title: "広告デザイナー志望の方",
        body: "バナーやLPなど、成果が求められる広告デザインの仕事に就きたい方。",
      },
      {
        title: "学習時間を確保できる方",
        body: "1ヶ月間、週4回のライブ講義と課題制作に時間を使える方。",
      },
    ],
    requirement: {
      label: "必須",
      title: "パソコンの基本操作ができること",
      body: "タイピング・ファイル管理・ブラウザ操作など、パソコンを日常的に使えることが受講の前提です。",
    },
    beginner: {
      heading: "デザイン未経験の方へ",
      lead: "未経験の方も受講いただけます。ただし、1ヶ月で実務レベルを目指すため、以下を満たす方に限らせていただきます。",
      items: [
        "パソコンの基本操作に慣れていること",
        "週4回のライブ講義すべてに参加できること",
        "講義外でも課題制作の時間を確保できること",
      ],
      note: "※受講条件は無料個別相談会で確認させていただきます。",
    },
  },

  // TODO(要確認): 税込表記・Photoshop代込みか・案件保証の条件。
  pricing: {
    eyebrow: "PRICING PLANS",
    heading: "料金と受講内容",
    valueLead: "受講料に含まれるもの",
    values: [
      { title: "1ヶ月短期集中コース", body: "最短ルートで実務レベルへ" },
      { title: "週4回のライブ講義", body: "その場で質問できるリアルタイム授業" },
      { title: "現役デザイナーの直接指導", body: "制作物に実務目線でフィードバック" },
      { title: "計100万円分の実務案件で学べる", body: "実際の案件を題材に制作" },
      { title: "ラスクでの採用チャンス", body: "基準を満たした方は採用選考へ" },
      { title: "5万円の案件保証", body: "卒業後、5万円分の案件を発注" },
    ],
    price: { label: "受講料", amount: "498,000", unit: "円", tax: "(税込)", note: "※デザインソフト代(Photoshop)込み" },
    rows: [
      { label: "受講期間", value: "1ヶ月短期集中プログラム\n（週4回ライブ講義）" },
      { label: "身につく\nスキル", value: "", list: ["Photoshop", "デザイン基礎", "バナー制作", "LPデザイン"] },
      { label: "できるよう\nになること", value: "実務を意識したバナー・LPを\n自分で考えて制作できる" },
      { label: "目指せる\n未来", value: "広告代理店の正社員デザイナー・\n広告デザイナーへの就職・転職" },
    ],
  },

  barrier: {
    pill: "デザインスクールを卒業した後は",
    lead: "まず、業界に入り込む",
    heading: "第一歩が最難関",
    body: "スクールでスキルを身につけ、\nポートフォリオを完成させても、\n[[「実務経験がない」]]ことが、\n仕事を始めるときの壁になることがあります。\n\nなぜなら、\n採用する企業やクライアントが見ているのは\n[[「実際の仕事を任せられるか」]]どうかだからです。",
    photo: img("考える女性"),
    closingLead: "だからこそ\nスクールで学んで終わりではなく",
    closing: ["最初の実務につながる", "[[環境]]まであることが大切！"],
  },

  support: {
    heading: "卒業後も安心",
    items: [
      {
        icon: "office",
        title: "ラスクへの入社チャンス",
        body: "学んだ先に、そのまま広告代理店ラスクでWEBデザイナーとして働けるチャンスがあります。",
      },
      {
        icon: "hand",
        title: "5万円分の案件を保証",
        body: "卒業後、ラスクから実際のデザイン案件を5万円分発注。卒業してすぐに、実務経験と実績をつくれます。",
      },
      {
        icon: "doc",
        title: "ポートフォリオの添削",
        body: "ポートフォリオや職務経歴書を、採用現場の目線で魅力が伝わるようにアドバイス・添削します。",
      },
      {
        icon: "chat",
        title: "実践的な面接対策",
        body: "WEBデザイナー採用で見られるポイントをアドバイス。選考に向けてしっかり準備ができます。",
      },
    ],
  },

  faq: {
    heading: "よくあるご質問",
    items: Array.from({ length: 5 }, () => ({
      q: "ここにテキストが入ります",
      a: "ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。",
    })),
  },

  challenge: {
    photo: img("PCに向かい笑顔の女性"),
    lead: "1ヶ月後、もう迷わない",
    heading: "あなたの「なりたい未来」まで\n[[しっかり伴走]]します。",
    body: [
      "一人で悩まないから続けられる。",
      "{{「私にもできるかな？」}}と\n思ったら\nまずは無料相談会でお話ししてみませんか？",
      "あなたのなりたい姿をヒアリングして\n最適な進め方をご提案します。",
      "一歩を踏み出せば\n{{「次は必ず大丈夫」}}\nと自信を持ってデザインに向かえる毎日が始まります。",
    ],
  },

  form: {
    pill: "オンライン開催 / 約50分",
    headingAccent: "無料個別相談会",
    headingRest: "を予約",
    fields: [
      { type: "text", name: "name", label: "お名前", required: true, placeholder: "山田 花子" },
      { type: "text", name: "kana", label: "フリガナ", required: true, placeholder: "ヤマダ ハナコ" },
      { type: "tel", name: "tel", label: "電話番号", required: true, placeholder: "09012345678" },
      { type: "email", name: "email", label: "メールアドレス", required: true, placeholder: "example@mail.com" },
      { type: "date", name: "date", label: "ご希望日", required: true },
      {
        type: "select",
        name: "time",
        label: "ご希望の時間帯",
        required: true,
        options: [
          { value: "10:00〜12:00", label: "10:00〜12:00" },
          { value: "12:00〜15:00", label: "12:00〜15:00" },
          { value: "15:00〜18:00", label: "15:00〜18:00" },
          { value: "18:00〜20:00", label: "18:00〜20:00" },
        ],
      },
      {
        type: "select",
        name: "status",
        label: "現在のご状況",
        required: true,
        options: [
          { value: "フリーランスで活動中", label: "フリーランスで活動中" },
          { value: "会社員（デザイン職）", label: "会社員（デザイン職）" },
          { value: "会社員（その他の職種）", label: "会社員（その他の職種）" },
          { value: "その他", label: "その他" },
        ],
      },
      {
        type: "toggle",
        name: "experience",
        label: "デザインの学習経験",
        required: true,
        columns: 3,
        options: [
          { value: "なし", label: "なし" },
          { value: "独学", label: "独学" },
          { value: "スクール", label: "スクール" },
        ],
      },
      {
        type: "textarea",
        name: "message",
        label: "ご相談内容",
        optionalTag: "任意",
        placeholder: "気になっていることがあればご記入ください",
        rows: 4,
      },
    ],
    submitLabel: "送信",
    errorMessage: "送信に失敗しました。時間をおいて再度お試しください。",
    disclaimer: "ご入力いただいた個人情報は、個別相談会のご案内のみに使用します。",
  },

  bottomBar: { lineText: "LINEで相談", ctaText: "無料オンライン相談" },
};

export default config;
