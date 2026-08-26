import type { ClientStatus } from "@shared/index";

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
      giftImage?: string;
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

  /**
   * 予約導線（外部 Hacomono 予約）。全CTAがこの url（新規タブ）へ接続する。
   * 基盤フォーム（LPForm）は使わない（estudio / pilates-rinne と同方式）。
   */
  reserve: {
    heading: string;
    lead: string;
    url: string;
    ctaText: string;
    note: string;
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
  slug: "beat-pilates-toyota",
  status: "draft",
  meta: {
    title: "BEAT PILATES 豊田店｜暗闇×音楽×マシンピラティス",
    description:
      "女性専用の暗闇空間で、周りの目を気にせず自分のペースでボディメイク。初回体験0円・今なら入会金0円。名鉄豊田市駅 西口 徒歩3分。",
  },

  header: {
    brand: "BEAT PILATES",
    brandSub: "TOYOTA",
    logo: "/clients/beat-pilates-toyota/logo_w.png",
    logoAlt: "BEAT PILATES",
  },

  hero: {
    catchLines: ["運動が苦手でも、", "楽しく続く。"],
    subCatch: "暗闇×音楽×マシンピラティス",
    body: "女性専用の暗闇空間で、周りの目を気にせず、\n自分のペースでボディメイク。",
    hero: { placeholder: "マシンピラティスレッスンの写真（全面）", src: "/clients/beat-pilates-toyota/fv-hero.jpg", position: "3% 30%" },
    trialBadge: { label: "初回体験", price: "0", unit: "円" },
    joinBadge: { label: "今なら入会金", value: "0円" },
    tags: ["女性専用", "初心者歓迎"],
    access: [
      { station: "豊田市駅", walk: "徒歩3分" },
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
        img: { placeholder: "暗闇スタジオの写真", src: "/clients/beat-pilates-toyota/why-01-dark-studio.jpg", position: "center 38%" },
        title: "暗闇で集中",
        body: "周りの目を気にせず、自分の動きに集中できる特別な空間。",
      },
      {
        num: "02",
        img: { placeholder: "音楽に合わせて動く写真", src: "/clients/beat-pilates-toyota/why-02-music.png", position: "center" },
        title: "音楽で楽しく",
        body: "心地よい音楽がモチベーションを高め、レッスンがもっと楽しく。",
      },
      {
        num: "03",
        img: { placeholder: "マシンピラティスの写真", src: "/clients/beat-pilates-toyota/why-03-machine.jpg", position: "center 75%" },
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
    photo: { placeholder: "レッスンの様子の写真", src: "/clients/beat-pilates-toyota/about-lesson.jpg", position: "70% center" },
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
        img: { placeholder: "スタジオの写真", src: "/clients/beat-pilates-toyota/reason-01-studio.jpg", position: "center" },
        label: "45分\n体験レッスン",
        price: "0",
        unit: "円",
        note: "(税込)",
      },
      {
        num: "02",
        img: { placeholder: "スタジオの写真", src: "/clients/beat-pilates-toyota/why-01-dark-studio.jpg", position: "center" },
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
        giftImage: "/clients/beat-pilates-toyota/benefit-gift-socks.png",
      },
    ],
  },

  reasons: {
    heading: "BEAT PILATESが選ばれる\n3つの理由",
    items: [
      {
        num: "01",
        img: { placeholder: "女性専用スタジオの写真", src: "/clients/beat-pilates-toyota/reason-01-studio.jpg", position: "center" },
        title: "女性専用の暗闇空間で、\n人目を気にせず集中できる",
        body: "会員もインストラクターもすべて女性。照明を落とした暗闇スタジオだから、周りの視線が気にならず、自分の身体と動きだけに集中できます。運動が苦手な方や初めての方でも、安心して始められる環境です。",
      },
      {
        num: "02",
        img: { placeholder: "レッスンの写真", src: "/clients/beat-pilates-toyota/reason-02-program.jpg", position: "center" },
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
        img: { placeholder: "マシンピラティスの写真", src: "/clients/beat-pilates-toyota/reason-03-machine.jpg", position: "center 60%" },
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
        img: { placeholder: "インストラクター Asami の写真", src: "/clients/beat-pilates-toyota/trainer-asami.jpg", position: "center 20%" },
        role: "PILATES INSTRUCTOR",
        name: "ASAMI",
        nameEn: "Asami",
        body: "幼少期からのバレエやダンスの経験を経て、ヨガ、そしてマシンピラティスに出会いました。私のとりえは、とにかく元気なこと！初めての方でも安心して動けるよう、お一人おひとりに寄り添って丁寧に説明します。ぜひ一緒に心地よい汗を流しましょう。",
        tags: ["マシンピラティス", "初心者歓迎"],
      },
      {
        img: { placeholder: "インストラクター KARIN の写真", src: "/clients/beat-pilates-toyota/trainer-karin.jpg", position: "center 15%" },
        role: "PILATES INSTRUCTOR",
        name: "KARIN",
        nameEn: "Karin",
        body: "一人ひとりの身体と気持ちに寄り添いながら、音楽に合わせて楽しく心地よく動ける時間を大切にしています。初めての方にも、リラックスして楽しんでいただけるレッスンをお届けします。",
        tags: ["音楽ピラティス", "リラックス"],
      },
      {
        img: { placeholder: "インストラクター FUMIKO の写真", src: "/clients/beat-pilates-toyota/trainer-fumiko.jpg", position: "center 25%" },
        role: "PILATES INSTRUCTOR",
        name: "FUMIKO",
        nameEn: "Fumiko",
        body: "お一人おひとりの身体の状態や目標に寄り添いながら、無理なく楽しく続けていただけるレッスンを心がけています。身体の変化を一緒に喜びながら、「また来たい」と思っていただけるよう丁寧にサポートします。",
        tags: ["目標別サポート", "継続習慣"],
      },
      {
        img: { placeholder: "インストラクター SAAYA の写真", src: "/clients/beat-pilates-toyota/trainer-saaya.jpg", position: "center 15%" },
        role: "PILATES INSTRUCTOR",
        name: "SAAYA",
        nameEn: "Saaya",
        body: "更に素敵な自分へ！楽しく音楽に合わせて、姿勢改善や日頃の運動不足を改善していきましょう♪一人ひとりのなりたい自分へのお手伝いをさせていただきます。",
        tags: ["姿勢改善", "運動不足解消"],
      },
      {
        img: { placeholder: "インストラクター MAI の写真", src: "/clients/beat-pilates-toyota/trainer-mai.jpg", position: "center 20%" },
        role: "PILATES INSTRUCTOR",
        name: "MAI",
        nameEn: "Mai",
        body: "「ピラティスを頑張る時間」ではなく、「身体も心もリフレッシュできる楽しみな時間」に。お一人おひとりのお悩みに寄り添い、無理なく楽しく続けていただけるようサポートします。",
        tags: ["リフレッシュ", "お悩み対応"],
      },
      {
        img: { placeholder: "インストラクター ichiha の写真", src: "/clients/beat-pilates-toyota/trainer-ichiha.jpg", position: "center 20%" },
        role: "PILATES INSTRUCTOR",
        name: "ICHIHA",
        nameEn: "Ichiha",
        body: "一緒にピラティスで理想の身体を目指しましょう！自分のペースで音楽に合わせながらリフレッシュしましょう。個人の悩みに合わせたサポートをいたします。",
        tags: ["ボディメイク", "マイペース"],
      },
      {
        img: { placeholder: "インストラクター MIKU の写真", src: "/clients/beat-pilates-toyota/trainer-miku.jpg", position: "center 20%" },
        role: "PILATES INSTRUCTOR",
        name: "MIKU",
        nameEn: "Miku",
        body: "運動が苦手な方や初心者の方にも安心して楽しんでいただけるよう、一人ひとりのペースに合わせた無理のないレッスンを心がけています。",
        tags: ["初心者歓迎", "マイペース"],
      },
    ],
  },

  movie: {
    heading: "スタジオ紹介ムービー",
    src: "/clients/beat-pilates-toyota/studio-movie.mp4",
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
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3264.865852692026!2d137.15456609999998!3d35.0850844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6004a15a18532229%3A0xc9c569e465580d50!2zQmVhdCBQaWxhdGVz6LGK55Sw5bqX!5e0!3m2!1sja!2sjp!4v1787730326689!5m2!1sja!2sjp",
    stores: [
      {
        img: { placeholder: "豊田店の外観／内観写真", src: "/clients/beat-pilates-toyota/access-store.jpg" },
        name: "BEAT PILATES 豊田店",
        address: "〒471-0025 愛知県豊田市西町5-5 VITS豊田タウン2階",
        hours: "営業時間 平日 9:00〜21:00／土日祝 9:00〜18:00",
        route: "名鉄豊田市駅 西口より徒歩3分",
      },
    ],
  },

  // 予約導線は外部 Hacomono 予約へ（基盤フォーム未使用）。全CTAがこの url（新規タブ）へ接続する。
  reserve: {
    heading: "体験レッスンのご予約",
    lead: "下記ボタンから、予約ページでご希望の日時をお選びいただけます。\n（外部の予約ページが新しいタブで開きます）",
    url: "https://beatpilates-toyota.hacomono.jp/reserve/schedule/1/1/?trial",
    ctaText: "体験レッスンを予約する",
    note: "45分体験レッスン0円｜今なら入会金0円｜しつこい勧誘はいたしません。",
  },

  sticky: {
    offers: [
      { label: "初回体験", value: "¥0" },
      { label: "入会金", value: "¥0" },
    ],
    buttonText: "体験レッスンを予約する",
    anchor: "#reserve",
  },

  footer: {
    copyright: "© 2026 BEAT PILATES 豊田店",
  },
};

export default config;
