import type { ClientStatus } from "@shared/index";
import type { LPFormField } from "@/components/LPForm";

/** Fixed lesson slot lists (times are on the hour but staggered, not evenly spaced). */
const weekdaySlots = [
  { value: "①9:00-9:45", label: "①9:00-9:45" },
  { value: "②10:20-11:05", label: "②10:20-11:05" },
  { value: "③11:40-12:25", label: "③11:40-12:25" },
  { value: "④14:20-15:05", label: "④14:20-15:05" },
  { value: "⑤15:40-16:25", label: "⑤15:40-16:25" },
  { value: "⑥17:30-18:15", label: "⑥17:30-18:15" },
  { value: "⑦18:50-19:35", label: "⑦18:50-19:35" },
  { value: "⑧20:10-20:55", label: "⑧20:10-20:55" },
];
const weekendSlots = [
  { value: "①9:00-9:45(土日)", label: "①9:00-9:45" },
  { value: "②10:20-11:05(土日)", label: "②10:20-11:05" },
  { value: "③11:40-12:25(土日)", label: "③11:40-12:25" },
  { value: "④14:20-15:05(土日)", label: "④14:20-15:05" },
  { value: "⑤15:40-16:25(土日)", label: "⑤15:40-16:25" },
  { value: "⑥17:00-17:45(土日)", label: "⑥17:00-17:45" },
];

/** An image position in the layout. `src` empty → placeholder box. */
export interface Slot {
  placeholder: string;
  src?: string | null;
  position?: string;
}

export interface BeatPilatesConfig {
  slug: string;
  status?: ClientStatus;
  meta: { title: string; description: string; ogpImage?: string };

  header: {
    brand: string;
    brandSub: string;
    logo?: string;
    logoAlt?: string;
  };

  hero: {
    catchLines: [string, string];
    subCatch: string;
    body: string;
    hero: Slot;
    trialBadge: { label: string; price: string; unit: string };
    joinBadge: { label: string; value: string };
    tags: string[];
    access: { station: string; walk: string }[];
    ctaText: string;
  };

  worry: {
    eyebrow: string;
    headingLarge: string;
    headingSmall: string;
    items: { parts: { t: string; hl?: boolean }[] }[];
  };

  why: {
    heading: string;
    headingHighlight: string;
    lead: string;
    items: { num: string; img: Slot; title: string; body: string }[];
    ctaText: string;
  };

  about: {
    heading: string;
    body1: string;
    body2: string;
    tags: { icon: string; label: string }[];
    photo: Slot;
  };

  offer: {
    headingParts: { t: string; hl?: boolean }[];
    cards: {
      num: string;
      img: Slot;
      label: string;
      price: string;
      unit: string;
      note: string;
    }[];
    badges: { icon: string; label: string }[];
  };

  benefits: {
    heading: string;
    headingHighlight: string;
    items: {
      title: string;
      nowLabel: string;
      body: string;
      price?: { unit?: string; value: string; suffix: string; note?: string };
      gift?: boolean;
    }[];
  };

  reasons: {
    heading: string;
    items: {
      num: string;
      img: Slot;
      title: string;
      body: string;
      trio?: { label: string }[];
    }[];
    ctaText: string;
    ctaSub: string;
  };

  trainers: {
    heading: string;
    lead: string;
    swipeHint: string;
    items: {
      img: Slot;
      role: string;
      name: string;
      nameEn: string;
      body: string;
      tags: string[];
    }[];
  };

  movie: {
    heading: string;
    src: string;
  };

  voices: {
    heading: string;
    swipeHint: string;
    items: { name: string; meta: string; rating: number; comment: string }[];
  };

  faq: { heading: string; items: { q: string; a: string }[] };

  pricing: {
    heading: string;
    headingHighlight: string;
    plans: { label: string; sublabel?: string; price: string }[];
    note: string;
  };

  access: {
    heading: string;
    mapEmbedSrc?: string;
    stores: {
      img: Slot;
      name: string;
      address: string;
      hours: string;
      route: string;
    }[];
  };

  form: {
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

  footer: {
    copyright: string;
  };
}

const config: BeatPilatesConfig = {
  slug: "beat-pilates-nagoyafushimi",
  status: "draft",
  meta: {
    title: "BEAT PILATES 名古屋伏見店｜暗闇×音楽×マシンピラティス",
    description:
      "女性専用の暗闇空間で、周りの目を気にせず自分のペースでボディメイク。初回体験0円・今なら入会金0円。伏見駅徒歩8分／大須観音駅徒歩10分。",
  },

  header: {
    brand: "BEAT PILATES",
    brandSub: "NAGOYA FUSHIMI",
    logo: "/clients/beat-pilates-nagoyafushimi/logo_w.png",
    logoAlt: "BEAT PILATES",
  },

  hero: {
    catchLines: ["運動が苦手でも、", "楽しく続く。"],
    subCatch: "暗闇×音楽×マシンピラティス",
    body: "女性専用の暗闇空間で、周りの目を気にせず、\n自分のペースでボディメイク。",
    hero: { placeholder: "マシンピラティスレッスンの写真（全面）", src: "/clients/beat-pilates-nagoyafushimi/fv-hero.jpg", position: "3% 30%" },
    trialBadge: { label: "初回体験", price: "0", unit: "円" },
    joinBadge: { label: "今なら入会金", value: "0円" },
    tags: ["女性専用", "初心者歓迎"],
    access: [
      { station: "伏見駅", walk: "徒歩8分" },
      { station: "大須観音駅", walk: "徒歩10分" },
    ],
    ctaText: "体験レッスンを予約する",
  },

  worry: {
    eyebrow: "Trouble",
    headingLarge: "こんなお悩み",
    headingSmall: "ありませんか？",
    items: [
      { parts: [{ t: "人目が気になり", hl: true }, { t: "運動に抵抗がある" }] },
      { parts: [{ t: "ダンベルで" }, { t: "ムキムキになりそう", hl: true }, { t: "で不安" }] },
      { parts: [{ t: "ジムで" }, { t: "何をしていいかわからない", hl: true }] },
      { parts: [{ t: "ストレスで" }, { t: "食べ過ぎてしまう", hl: true }] },
      { parts: [{ t: "そろそろ" }, { t: "運動しないと", hl: true }, { t: "いけないと感じている" }] },
    ],
  },

  why: {
    heading: "だから",
    headingHighlight: "BEAT PILATES",
    lead: "暗闇だから集中できる。音楽があるから楽しい。\nマシンだから初心者でも始めやすい。",
    items: [
      {
        num: "01",
        img: { placeholder: "暗闇スタジオの写真", src: "/clients/beat-pilates-nagoyafushimi/why-01-dark-studio.jpg", position: "center 38%" },
        title: "暗闇で集中",
        body: "周りの目を気にせず、自分の動きに集中できる特別な空間。",
      },
      {
        num: "02",
        img: { placeholder: "音楽に合わせて動く写真", src: "/clients/beat-pilates-nagoyafushimi/why-02-music.png", position: "center" },
        title: "音楽で楽しく",
        body: "心地よい音楽がモチベーションを高め、レッスンがもっと楽しく。",
      },
      {
        num: "03",
        img: { placeholder: "マシンピラティスの写真", src: "/clients/beat-pilates-nagoyafushimi/why-03-machine.jpg", position: "center 75%" },
        title: "マシンで安心",
        body: "専用マシンが身体をサポートするから、初心者でも安心して正しく動ける。",
      },
    ],
    ctaText: "体験レッスンを予約する",
  },

  about: {
    heading: "暗闇マシンピラティスとは？",
    body1:
      "暗闇空間で音楽に合わせながら、\nリフォーマーを使って全身を動かす\nグループレッスン。",
    body2:
      "周囲の目を気にせず集中でき、楽しみ\nながら姿勢改善・体幹強化・ボディ\nメイクを目指せます。",
    tags: [
      { icon: "moon", label: "暗闇" },
      { icon: "musicNote", label: "音楽" },
      { icon: "reformer", label: "リフォーマー" },
    ],
    photo: { placeholder: "レッスンの様子の写真", src: "/clients/beat-pilates-nagoyafushimi/about-lesson.jpg", position: "70% center" },
  },

  offer: {
    headingParts: [
      { t: "まずは初回体験" },
      { t: "0円", hl: true },
      { t: "から" },
    ],
    cards: [
      {
        num: "01",
        img: { placeholder: "スタジオの写真", src: "/clients/beat-pilates-nagoyafushimi/reason-01-studio.jpg", position: "center" },
        label: "45分\n体験レッスン",
        price: "0",
        unit: "円",
        note: "(税込)",
      },
      {
        num: "02",
        img: { placeholder: "スタジオの写真", src: "/clients/beat-pilates-nagoyafushimi/why-01-dark-studio.jpg", position: "center" },
        label: "今なら\n入会金",
        price: "0",
        unit: "円",
        note: "(税込)",
      },
    ],
    badges: [
      { icon: "book", label: "初めての方限定" },
      { icon: "femaleHeart", label: "女性専用" },
      { icon: "sparklePerson", label: "初心者歓迎" },
    ],
  },

  benefits: {
    heading: "うれしい",
    headingHighlight: "入会特典",
    items: [
      {
        title: "通い放題プランが2ヶ月おトク！",
        nowLabel: "今だけ",
        body: "通い放題プラン【スタンダード】or【プレミアム】の場合",
        price: { unit: "2ヶ月", value: "1,980", suffix: "円", note: "月額会費（税込）" },
      },
      {
        title: "入会された方限定プレゼント！",
        nowLabel: "今だけ",
        body: "ピラティス専用ソックスプレゼント",
        gift: true,
      },
    ],
  },

  reasons: {
    heading: "BEAT PILATESが選ばれる\n3つの理由",
    items: [
      {
        num: "01",
        img: { placeholder: "女性専用スタジオの写真", src: "/clients/beat-pilates-nagoyafushimi/reason-01-studio.jpg", position: "center" },
        title: "女性専用の暗闇空間で、\n人目を気にせず集中できる",
        body: "会員もインストラクターもすべて女性。照明を落とした暗闇スタジオだから、周りの視線が気にならず、自分の身体と動きだけに集中できます。運動が苦手な方や初めての方でも、安心して始められる環境です。",
      },
      {
        num: "02",
        img: { placeholder: "レッスンの写真", src: "/clients/beat-pilates-nagoyafushimi/reason-02-program.jpg", position: "center" },
        title: "その日の目的に合わせて\n選べるプログラム",
        body: "「今日は何を整えたいか」でレッスンを選べます。目的に合わせてインストラクターが強度を調整するから、無理なく続けられる運動習慣に。",
        trio: [
          { label: "姿勢改善" },
          { label: "骨盤ケア" },
          { label: "体幹トレーニング" },
          { label: "ヒップアップ" },
          { label: "美脚プログラム" },
          { label: "肩こり腰痛ケア" },
        ],
      },
      {
        num: "03",
        img: { placeholder: "マシンピラティスの写真", src: "/clients/beat-pilates-nagoyafushimi/reason-03-machine.jpg", position: "center 60%" },
        title: "マシンピラティスだから、\n初心者でも安心して動ける",
        body: "専用マシン（リフォーマー）が身体の動きをサポート。正しいフォームを保ちながら効率よく筋肉にアプローチできるので、運動経験がない方でも安心して取り組めます。",
      },
    ],
    ctaText: "体験レッスンを予約する",
    ctaSub: "初回体験0円｜入会金0円",
  },

  trainers: {
    heading: "インストラクター紹介",
    lead: "経験豊富な女性インストラクターが、\n一人ひとりの身体に合わせて丁寧にサポートします。",
    swipeHint: "スワイプで移動",
    items: [
      {
        img: { placeholder: "インストラクターの写真", src: "/clients/beat-pilates-nagoyafushimi/trainer-akina.jpg", position: "center 20%" },
        role: "PILATES INSTRUCTOR",
        name: "AKINA",
        nameEn: "Akina",
        body: "「運動が苦手」という方こそ変われることを、自身の経験から実感。一人ひとりのペースに寄り添い、楽しく続けられるレッスンを心がけています。",
        tags: ["マシンピラティス", "姿勢改善"],
      },
      {
        img: { placeholder: "インストラクターの写真", src: "/clients/beat-pilates-nagoyafushimi/trainer-momo.jpg", position: "center 15%" },
        role: "PILATES INSTRUCTOR",
        name: "MOMO",
        nameEn: "Momo",
        body: "身体を動かす楽しさと、続けることで生まれる変化を届けたい。初めての方でも安心できるよう、丁寧な声かけとサポートを大切にしています。",
        tags: ["ボディメイク", "体幹強化"],
      },
      {
        img: { placeholder: "インストラクターの写真", src: "/clients/beat-pilates-nagoyafushimi/trainer-pipi.jpg", position: "center 25%" },
        role: "PILATES INSTRUCTOR",
        name: "PIPI",
        nameEn: "Pipi",
        body: "音楽に合わせて動く心地よさを通して、運動を習慣に。その日の体調や目的に合わせたレッスンで、しなやかな身体づくりをサポートします。",
        tags: ["骨盤ケア", "ヒップアップ"],
      },
      {
        img: { placeholder: "インストラクターの写真", src: "/clients/beat-pilates-nagoyafushimi/trainer-kuma.jpg", position: "center 15%" },
        role: "PILATES INSTRUCTOR",
        name: "KUMA",
        nameEn: "Kuma",
        body: "レッスン後の軽やかな身体の変化を実感してほしい。呼吸と動きを丁寧に合わせながら、無理なく続けられるレッスンをお届けします。",
        tags: ["姿勢改善", "柔軟性向上"],
      },
      {
        img: { placeholder: "インストラクターの写真", src: "/clients/beat-pilates-nagoyafushimi/trainer-ai.jpg", position: "center 20%" },
        role: "PILATES INSTRUCTOR",
        name: "ai",
        nameEn: "Ai",
        body: "初めての方にこそ、正しいフォームと心地よい負荷を。細やかな観察力で一人ひとりに合わせたレッスンを提供しています。",
        tags: ["マシンピラティス", "ボディメイク"],
      },
    ],
  },

  movie: {
    heading: "スタジオ紹介ムービー",
    src: "/clients/beat-pilates-nagoyafushimi/studio-movie.mp4",
  },

  voices: {
    heading: "お客様の声",
    swipeHint: "← スワイプできます →",
    items: [
      {
        name: "M.K さん",
        meta: "30代・会社員",
        rating: 5,
        comment:
          "運動が苦手でしたが、暗闇で人目を気にせず集中できるのが最高です。音楽に乗って動いていたら、あっという間の45分でした。",
      },
      {
        name: "Y.S さん",
        meta: "20代・美容師",
        rating: 5,
        comment:
          "姿勢の悪さが悩みでしたが、通い始めて数ヶ月で肩こりがラクに。マシンが支えてくれるので、初心者でも安心して動けます。",
      },
      {
        name: "A.T さん",
        meta: "40代・主婦",
        rating: 5,
        comment:
          "女性専用というのが決め手でした。スタッフさんも優しくて、毎回のレッスンが楽しみ。無理なく続けられています。",
      },
    ],
  },

  faq: {
    heading: "よくある質問",
    items: [
      { q: "ピラティスが初めてでも大丈夫？", a: "はい。女性インストラクターが丁寧にサポートします。" },
      { q: "運動が苦手でもついていける？", a: "暗闇空間で周りを気にせず、自分のペースで参加できます。" },
      { q: "どんな服装で行けばいい？", a: "動きやすいウェアでOK。お飲み物もご持参ください。" },
      { q: "支払い方法は？", a: "クレジットカードでのお支払いとなります。" },
    ],
  },

  pricing: {
    heading: "通いやすい",
    headingHighlight: "料金プラン",
    plans: [
      { label: "月3回プラン", price: "7,800円〜" },
      { label: "月4回プラン", price: "10,000円〜" },
      { label: "デイタイム", sublabel: "平日9:00〜17:00", price: "11,800円〜" },
      { label: "ナイトタイム", sublabel: "全日17:00〜21:00", price: "11,800円〜" },
      { label: "フルプラン", sublabel: "回数無制限", price: "15,600円〜" },
    ],
    note: "※詳細は予約サイト・店頭でご確認ください",
  },

  access: {
    heading: "店舗のご案内",
    mapEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.664848305828!2d136.89272!3d35.16497839999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600377fb17fe07c5%3A0xe0039999223bec7b!2zQmVhdCBQaWxhdGVz77yI44OT44O844OI44OU44Op44OG44Kj44K577yJ5ZCN5Y-k5bGL5LyP6KaL5bqX!5e0!3m2!1sja!2sjp!4v1783923815160!5m2!1sja!2sjp",
    stores: [
      {
        img: { placeholder: "名古屋伏見店の外観／内観写真", src: "/clients/beat-pilates-nagoyafushimi/access-store.jpg" },
        name: "BEAT PILATES 名古屋伏見店",
        address: "〒460-0008 名古屋市中区栄1-18-1 ハイツサンライズ2F号室",
        hours: "営業時間 9:00〜21:00",
        route: "地下鉄東山線・鶴舞線 伏見駅 徒歩8分／地下鉄鶴舞線 大須観音駅 徒歩10分",
      },
    ],
  },

  form: {
    heading: "体験レッスンのご予約",
    lead: "下記フォームからお気軽にお申し込みください。\n担当より24時間以内にご連絡いたします。",
    fields: [
      { type: "text", name: "name", label: "お名前", required: true, placeholder: "山田 花子" },
      { type: "tel", name: "tel", label: "電話番号", required: true, placeholder: "090-0000-0000" },
      { type: "email", name: "email", label: "メールアドレス", required: true, placeholder: "example@mail.com" },
      { type: "date", name: "date1", label: "ご希望日", required: true },
      {
        type: "select",
        name: "time1",
        label: "ご希望時間",
        required: true,
        placeholder: "時間帯を選択してください",
        dateLinkedOptions: {
          dateField: "date1",
          weekday: weekdaySlots,
          weekend: weekendSlots,
        },
      },
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
    disclaimer: "45分体験レッスン0円｜今なら入会金0円｜しつこい勧誘はいたしません。",
    errorMessage: "お名前・電話番号・メールアドレス・ご希望日・ご希望時間は必須項目です。ご希望日は明日以降の日付をお選びください。",
  },

  sticky: {
    offers: [
      { label: "初回体験", value: "¥0" },
      { label: "入会金", value: "¥0" },
    ],
    buttonText: "体験レッスンを予約する",
    anchor: "#form",
  },

  footer: {
    copyright: "© 2026 BEAT PILATES 名古屋伏見店",
  },
};

export default config;
