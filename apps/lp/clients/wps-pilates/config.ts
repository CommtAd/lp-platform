import type { ClientStatus } from "@shared/index";
import type { LPFormField } from "@/components/LPForm";

const ASSET = "/clients/wps-pilates";

/**
 * WAKATA PHYSIO STUDIO (WPS) — 名古屋市緑区の「整体×ピラティス」スタジオ。
 * 参照サイト（画像ベタ貼りLP）をHTML化して最適化した bespoke クライアント。
 *
 * ⚠️ 画像は参照サイトからの一時プレースホルダ（確認用）。CLAUDE.md 規約11に基づき、
 * 公開前に必ず顧客素材へ差し替えること（`public/clients/wps-pilates/`）。
 */

/** An image position in the layout. `src` empty → placeholder box. */
export interface Slot {
  placeholder: string;
  src?: string | null;
  position?: string;
}

export interface WpsConfig {
  slug: string;
  status?: ClientStatus;
  meta: { title: string; description: string; ogpImage?: string };

  header: {
    brand: string;
    brandEn: string;
    badges: string[];
  };
  offerBar: { pre: string; text: string; highlight: string; post: string };

  fv: {
    eyebrow: string;
    catchTop: string;
    catchLines: [string, string];
    catchTail: string;
    tags: string[];
    band: string;
    punch: string;
    duo: [string, string];
    hero: Slot;
  };

  campaign: {
    ribbon: string;
    heading: string;
    trialTitle: string;
    regularLabel: string;
    regularPrice: string;
    freeLabel: string;
    note: string;
    items: string[];
    bonusIntro: string;
    bonuses: { label: string; value: string }[];
    bonusNote: string;
    ctaText: string;
  };

  about: {
    eyebrow: string;
    heading: string;
    tags: string[];
    tagTail: string;
    photo: Slot;
    leadPre: string;
    leadHighlight: string;
    leadPost: string;
    features: { icon: string; label: string }[];
  };

  worry: {
    heading: string;
    checks: { text: string; hi: string }[];
    whyHeading: string;
    whyHi: string;
    whyBody: string;
    traps: { label: string; img: Slot }[];
    closingPre: string;
    closingHi: string;
    closingPost: string;
  };

  solution: {
    photo: Slot;
    leadTop: string;
    duo: [string, string];
    subPre: string;
    subHi: string;
    subPost: string;
    bodyPre: string;
    bodyHi: string;
    bodyPost: string;
    footnote: string;
  };

  method: {
    eyebrow: string;
    heading: string;
    steps: {
      no: string;
      en: string;
      title: string;
      photo: Slot;
      body: { text: string; hi?: string }[];
      chips: string[];
    }[];
  };

  reasons: {
    heading: string;
    brandLabel: string;
    items: { icon: string; title: string }[];
    closing: string;
  };

  flow: {
    eyebrow: string;
    heading: string;
    steps: { no: string; title: string; body: string; photo: Slot }[];
  };

  gallery: { heading: string; eyebrow: string; photos: Slot[] };

  access: {
    eyebrow: string;
    heading: string;
    train: { line: string; time: string }[];
    bus: { line: string; time: string }[];
    hours: { day: string; time: string }[];
    parking: string;
    postal: string;
    address: string;
    mapQuery: string;
  };

  faq: { heading: string; eyebrow: string; items: { q: string; a: string }[] };

  form: {
    eyebrow: string;
    heading: string;
    lead: string;
    fields: LPFormField[];
    submitLabel: string;
    disclaimer: string;
    errorMessage: string;
  };

  sticky: {
    offers: { label: string; value: string }[];
    buttonText: string;
    anchor: string;
  };
}

const config: WpsConfig = {
  slug: "wps-pilates",
  status: "draft",
  meta: {
    title:
      "WAKATA PHYSIO STUDIO｜整体×ピラティスで不調の根本改善｜名古屋市緑区",
    description:
      "理学療法士・柔道整復師が在籍する名古屋市緑区の整体×マシンピラティススタジオ。身体を分析し不調の原因にアプローチ。初回体験実質0円・入会金0円、平日21時まで営業・駐車場完備。肩こり・腰痛・姿勢改善に。",
    ogpImage: `${ASSET}/hero.jpg`,
  },

  header: {
    brand: "WAKATA PHYSIO STUDIO",
    brandEn: "wps",
    badges: ["平日21時まで営業", "駐車場完備"],
  },
  offerBar: {
    pre: "期間限定！",
    text: "初回体験",
    highlight: "実質0円",
    post: "キャンペーン実施中",
  },

  fv: {
    eyebrow: "理学療法士が身体を分析",
    catchTop: "整体×",
    catchLines: ["ピラティス", "で"],
    catchTail: "不調の原因にアプローチ！",
    tags: ["肩こり", "腰痛", "姿勢改善"],
    band: "あらゆる不調を整える",
    punch: "1度で効果を実感",
    duo: ["整体", "マシン\nピラティス"],
    hero: {
      placeholder: "マシンピラティスのシーン（全面）",
      src: `${ASSET}/hero.jpg`,
      position: "center 35%",
    },
  },

  campaign: {
    ribbon: "今だけの特別チャンス",
    heading: "初回体験0円キャンペーン！",
    trialTitle: "50分のお試し体験",
    regularLabel: "通常価格",
    regularPrice: "5,000",
    freeLabel: "0",
    note: "※当日入会の場合。入会しない場合は5,000円（税込）",
    items: [
      "カウンセリング",
      "姿勢・\n動作分析",
      "整体",
      "ピラティス\n体験",
      "フィード\nバック",
    ],
    bonusIntro: "さらに",
    bonuses: [
      { label: "入会金・事務手数料", value: "無料" },
      { label: "お水", value: "プレゼント" },
    ],
    bonusNote: "※ウェアはご持参ください。",
    ctaText: "無料体験を予約する",
  },

  about: {
    eyebrow: "What is WPS?",
    heading: "WPSとは？",
    tags: ["理学療法士", "柔道整復師"],
    tagTail: "在籍の",
    photo: {
      placeholder: "スタジオ／マシンの写真",
      src: `${ASSET}/about-studio.jpg`,
      position: "center 42%",
    },
    leadPre: "ただ鍛えるだけではなく、",
    leadHighlight: "整体とピラティスを組み合わせ",
    leadPost: "、身体のクセ・動き方から改善を目指します。",
    features: [
      { icon: "hand", label: "パーソナル対応" },
      { icon: "group", label: "少人数制グループ" },
      { icon: "dumbbell", label: "本格マシン完備" },
      { icon: "care", label: "医療系サポート" },
    ],
  },

  worry: {
    heading: "こんなお悩み、ありませんか？",
    checks: [
      { text: "がずっと続いている。", hi: "肩こりや腰痛" },
      { text: "が気になる。", hi: "反り腰・巻き肩" },
      { text: "と言われる。", hi: "姿勢が悪い" },
      { text: "疲れやすく、", hi: "やる気が出ない。" },
      { text: "身体が硬くて", hi: "動きづらい。" },
    ],
    whyHeading: "なぜ不調を",
    whyHi: "繰り返す",
    whyBody:
      "マッサージや整体だけでは、一時的にラクになることはあっても身体の使い方が変わらなければ、不調を繰り返してしまうことも…",
    traps: [
      { label: "湿布で\nごまかす", img: { placeholder: "イメージ", src: null } },
      { label: "自己流で\nストレッチ", img: { placeholder: "イメージ", src: null } },
      { label: "とりあえず\n筋トレ", img: { placeholder: "イメージ", src: null } },
    ],
    closingPre: "これだけでは、",
    closingHi: "根本原因に届かない",
    closingPost: "場合も…",
  },

  solution: {
    photo: {
      placeholder: "ピラティスのシーン写真",
      src: `${ASSET}/solution.jpg`,
      position: "center 30%",
    },
    leadTop: "痛みがあるから無理ではなく、\n痛みがあるからこそ身体を見直す。",
    duo: ["整体", "マシン\nピラティス"],
    subPre: "整体だけで終わらせず、",
    subHi: "“動ける身体”",
    subPost: "を目指しませんか？",
    bodyPre: "整体で整えるだけでなく、ピラティスで正しい動きを身につけ、",
    bodyHi: "不調を根本から改善",
    bodyPost: "します。",
    footnote: "一人一人に合わせたオーダーメイドのプログラムをご提供します。",
  },

  method: {
    eyebrow: "WPS METHOD",
    heading: "WPS独自の3ステップ",
    steps: [
      {
        no: "01",
        en: "BODY ASSESSMENT",
        title: "身体チェック",
        photo: { placeholder: "姿勢・動作チェックの写真", src: `${ASSET}/method-01.jpg`, position: "center 40%" },
        body: [
          { text: "姿勢のゆがみやバランス、日常動作や筋力など、身体の状態を詳しくチェックし、" },
          { text: "を見つけます。", hi: "不調の原因" },
        ],
        chips: ["姿勢評価", "可動域チェック", "左右差確認", "動きのクセ分析"],
      },
      {
        no: "02",
        en: "ALIGN THE BODY",
        title: "整体で整える",
        photo: { placeholder: "整体施術の写真", src: `${ASSET}/method-02.jpg`, position: "center 45%" },
        body: [
          { text: "硬くなった筋肉や関節を調整し、動きやすい状態へ。無理に鍛える前に、まずは" },
          { text: "を作ります。", hi: "身体が動ける状態" },
        ],
        chips: ["筋肉の緊張を緩和", "関節の調整", "バランス改善", "可動域向上"],
      },
      {
        no: "03",
        en: "MOVE CORRECTLY WITH PILATES",
        title: "ピラティスで正しく動かす",
        photo: { placeholder: "マシンピラティスの写真", src: `${ASSET}/method-03.jpg`, position: "center 30%" },
        body: [
          { text: "整えた身体を、正しく使える身体へ。インナーマッスルや姿勢保持にアプローチし、" },
          { text: "を目指します。", hi: "再発しにくい身体づくり" },
        ],
        chips: ["インナーマッスル", "姿勢保持", "再発予防"],
      },
    ],
  },

  reasons: {
    heading: "選ばれる理由",
    brandLabel: "WAKATA PHYSIO STUDIOが",
    items: [
      { icon: "care", title: "理学療法士監修の\n安心品質" },
      { icon: "handshake", title: "整体×ピラティス\n独自のアプローチ" },
      { icon: "dumbbell", title: "本格マシン完備\n充実の設備" },
      { icon: "person", title: "パーソナル\n少人数制" },
      { icon: "spark", title: "慢性的な\n痛み改善" },
      { icon: "pin", title: "地域密着で\n通いやすい" },
    ],
    closing: "初心者の方でも安心して通える環境を整えています。",
  },

  flow: {
    eyebrow: "FLOW",
    heading: "ご利用の流れ",
    steps: [
      {
        no: "01",
        title: "WEBで簡単予約",
        body: "ご希望の日時を選択して、WEB上で簡単にお申し込みいただけます。",
        photo: { placeholder: "予約のイメージ", src: `${ASSET}/flow-1.jpg`, position: "center 30%" },
      },
      {
        no: "02",
        title: "カウンセリング",
        body: "お悩みや目標をヒアリングし、最適なプログラムをご提供します。",
        photo: { placeholder: "カウンセリングの写真", src: `${ASSET}/flow-2.jpg`, position: "center 30%" },
      },
      {
        no: "03",
        title: "姿勢・動作チェック",
        body: "身体の状態を細かくチェックし、不調の原因を見つけます。",
        photo: { placeholder: "姿勢チェックの写真", src: `${ASSET}/flow-3.jpg`, position: "center 25%" },
      },
      {
        no: "04",
        title: "整体・ピラティス体験",
        body: "整体とピラティスを掛け合わせたメニューで、身体を整え、正しく動かします。",
        photo: { placeholder: "施術・体験の写真", src: `${ASSET}/flow-4.jpg`, position: "center 30%" },
      },
      {
        no: "05",
        title: "フィードバック・プラン説明",
        body: "一人一人のお体の状態に合わせた、今後の最適なプランをご提案します。",
        photo: { placeholder: "プラン説明の写真", src: `${ASSET}/flow-5.jpg`, position: "center 30%" },
      },
    ],
  },

  gallery: {
    eyebrow: "GALLERY",
    heading: "スタジオの様子",
    photos: [
      { placeholder: "スタジオ写真1", src: `${ASSET}/studio-1.jpg` },
      { placeholder: "スタジオ写真2", src: `${ASSET}/studio-2.jpg` },
    ],
  },

  access: {
    eyebrow: "ACCESS",
    heading: "スタジオのご案内",
    train: [
      { line: "左京山駅", time: "徒歩20分" },
      { line: "有松駅", time: "徒歩15分" },
    ],
    bus: [
      { line: "名古屋市営バス／地下鉄鳴子北〜太子「若田」下車", time: "徒歩1分" },
      {
        line: "緑巡回系統・幹鳴子1系統・新瑞12系統・鳴子14系統「緑保健所」下車",
        time: "徒歩5分",
      },
    ],
    hours: [
      { day: "平日", time: "9:00〜21:00" },
      { day: "土曜", time: "9:00〜17:00" },
      { day: "日祝", time: "9:00〜14:00" },
      { day: "定休日", time: "不定休" },
    ],
    parking: "駐車場完備",
    postal: "〒458-0034",
    address: "愛知県名古屋市緑区若田3丁目1002",
    mapQuery: "愛知県名古屋市緑区若田3丁目1002",
  },

  faq: {
    eyebrow: "FAQ",
    heading: "よくあるご質問",
    items: [
      {
        q: "運動が苦手・初めてでも大丈夫ですか？",
        a: "はい。理学療法士・柔道整復師が一人一人の身体の状態に合わせて指導しますので、運動が苦手な方や初めての方でも安心してご参加いただけます。",
      },
      {
        q: "痛みや不調があっても受けられますか？",
        a: "身体の状態を丁寧にチェックしたうえで、無理のない範囲でプログラムを組み立てます。気になる症状は体験時のカウンセリングでお気軽にご相談ください。",
      },
      {
        q: "体験当日は何を持っていけばよいですか？",
        a: "動きやすいウェアをご持参ください。お水はプレゼントしております。靴下があると安心です。",
      },
      {
        q: "予約の変更・キャンセルはできますか？",
        a: "WEBまたはお電話にて承ります。ご都合が変わった場合は、なるべくお早めにご連絡ください。",
      },
      {
        q: "駐車場はありますか？",
        a: "駐車場を完備しております。お車でも通いやすい環境です。",
      },
    ],
  },

  form: {
    eyebrow: "RESERVE",
    heading: "体験のご予約",
    lead: "以下のフォームよりお気軽にお申し込みください。担当より折り返しご連絡いたします。",
    fields: [
      { name: "name", label: "お名前", type: "text", required: true, placeholder: "山田 花子" },
      { name: "email", label: "メールアドレス", type: "email", required: true, placeholder: "example@mail.com" },
      { name: "tel", label: "電話番号", type: "tel", required: true, placeholder: "090-0000-0000" },
      { name: "date1", label: "体験希望日 第一希望", type: "date", required: true },
      {
        name: "time1",
        label: "希望時間 第一希望",
        type: "select",
        required: true,
        placeholder: "時間帯を選択",
        options: [
          { value: "9-12", label: "午前（9:00〜12:00）" },
          { value: "12-15", label: "昼（12:00〜15:00）" },
          { value: "15-18", label: "夕方（15:00〜18:00）" },
          { value: "18-21", label: "夜（18:00〜21:00）" },
        ],
      },
      { name: "date2", label: "体験希望日 第二希望", type: "date", optionalTag: "任意" },
      {
        name: "time2",
        label: "希望時間 第二希望",
        type: "select",
        optionalTag: "任意",
        placeholder: "時間帯を選択",
        options: [
          { value: "9-12", label: "午前（9:00〜12:00）" },
          { value: "12-15", label: "昼（12:00〜15:00）" },
          { value: "15-18", label: "夕方（15:00〜18:00）" },
          { value: "18-21", label: "夜（18:00〜21:00）" },
        ],
      },
      {
        name: "message",
        label: "ご質問・ご相談内容",
        type: "textarea",
        optionalTag: "任意",
        rows: 4,
        placeholder: "気になる症状やご希望などをご記入ください。",
      },
    ],
    submitLabel: "この内容で予約する",
    disclaimer:
      "ご入力いただいた個人情報は、ご予約対応およびご連絡の目的にのみ利用いたします。",
    errorMessage: "必須項目のご入力をご確認ください。",
  },

  sticky: {
    offers: [
      { label: "初回体験", value: "実質¥0" },
      { label: "入会金", value: "¥0" },
    ],
    buttonText: "無料体験を予約する",
    anchor: "#form",
  },
};

export default config;
