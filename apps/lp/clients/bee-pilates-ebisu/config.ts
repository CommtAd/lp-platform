import type { ClientStatus } from "@shared/index";
import type { LPFormField } from "@/components/LPForm";

const ASSET = "/clients/bee-pilates-ebisu";

/** An image position in the layout. `src` empty → placeholder box. */
export interface Slot {
  placeholder: string;
  src?: string | null;
  position?: string;
}

export interface BeeConfig {
  slug: string;
  status?: ClientStatus;
  meta: { title: string; description: string; ogpImage?: string };

  header: {
    brand: string;
    brandSub: string;
    access: { station: string; walk: string }[];
  };

  /** ヘッダー直下のオープン記念オファー帯 */
  offerBar: { text: string; sub: string };

  fv: {
    openBadge: { small: string; big: string; en: string };
    catchTop: string;
    /** 縦書きにも耐えるメインキャッチ（明朝） */
    catchLines: [string, string, string];
    lead: string;
    hero: Slot;
    trial: {
      label: string;
      time: string;
      normal: string;
      price: string;
      unit: string;
      priceNote: string;
    };
    tags: string[];
    notes: string[];
    ctaText: string;
  };

  /** ブランドフィロソフィー（ずっと、もっと、美しく） */
  philosophy: {
    eyebrow: string;
    heading: string;
    body: string;
  };

  worry: {
    heading: string;
    items: { icon: string; text: string }[];
    closingPre: string;
    closingHighlight: string;
  };

  /** パーソナルピラティスとは（メソッド説明） */
  about: {
    eyebrow: string;
    heading: string;
    img: Slot;
    body: string;
    points: { icon: string; label: string; desc: string }[];
  };

  trial: {
    eyebrow: string;
    headingPre: string;
    headingHighlight: string;
    lead: string;
    photos: [Slot, Slot];
    steps: { min: string; icon: string; title: string; body: string }[];
    joinBenefit: { label: string; normal: string; value: string; note: string };
    notes: string[];
    ctaText: string;
  };

  reasons: {
    heading: string;
    items: { num: string; img: Slot; title: string; body: string }[];
    ctaText: string;
    ctaSub: string;
  };

  pricing: {
    eyebrow: string;
    heading: string;
    lead: string;
    plans: {
      name: string;
      note: string;
      perLesson: string;
      genderNote: string;
    }[];
    joinFee: { label: string; normal: string; value: string; note: string };
    notes: string[];
  };

  /** 継続の目安（10回→20回→30回） */
  progress: {
    eyebrow: string;
    heading: string;
    steps: { count: string; label: string }[];
    note: string;
  };

  instructors: {
    eyebrow: string;
    heading: string;
    lead: string;
    count: { num: string; unit: string; post: string };
    img: Slot;
    message: { title: string; body: string };
    points: string[];
  };

  flow: {
    heading: string;
    steps: { num: string; title: string; body: string }[];
    note: string;
  };

  faq: { heading: string; items: { q: string; a: string }[] };

  access: {
    heading: string;
    store: {
      img: Slot;
      name: string;
      address: string;
      hours: string;
      holiday: string;
      route: string;
      mapQuery: string;
    };
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

  footer: { lines: string[] };
}

const config: BeeConfig = {
  slug: "bee-pilates-ebisu",
  status: "draft",
  meta: {
    title:
      "Pilates Studio Beê 恵比寿店｜完全個室パーソナルピラティス｜2026.8.1 GRAND OPEN 体験500円",
    description:
      "恵比寿駅徒歩2分、完全個室のパーソナルピラティス専門スタジオ。2026年8月1日グランドオープン。オープン記念で55分の体験レッスンが通常5,500円→500円（税込）。入会金22,000円も体験当日入会で0円。初めての方も、何歳からでも、プロによる一対一のオーダーメイドレッスンで、姿勢と美しいボディラインを。",
    ogpImage: `${ASSET}/ogp.jpg`,
  },

  header: {
    brand: "Pilates Studio Beê",
    brandSub: "恵比寿店｜完全個室パーソナルピラティス",
    access: [{ station: "恵比寿駅", walk: "徒歩2分" }],
  },

  offerBar: {
    text: "＼ 2026.8.1 GRAND OPEN｜オープン記念キャンペーン ／",
    sub: "55分の体験レッスンが 通常5,500円 → 500円（税込）",
  },

  fv: {
    openBadge: { small: "2026", big: "8.1", en: "GRAND OPEN" },
    catchTop: "恵比寿駅 徒歩2分｜完全個室パーソナル",
    catchLines: ["ずっと、", "もっと、", "美しく。"],
    lead: "呼吸から整え、体をコアから鍛える。プロと一対一の、あなただけのピラティス。",
    hero: { placeholder: "スタジオ内観 / マシンピラティスの写真（全面）", src: `${ASSET}/hero.jpg`, position: "center" },
    trial: {
      label: "55分 体験レッスン",
      time: "オープン記念価格",
      normal: "5,500",
      price: "500",
      unit: "円",
      priceNote: "（税込）",
    },
    tags: ["完全個室", "マンツーマン", "初心者歓迎"],
    notes: [
      "※体験レッスンが500円（税込）となるのはオープン記念キャンペーン期間中に初めてご予約された方です。",
      "※体験レッスンは1名さま1回限りとなります。",
    ],
    ctaText: "オープン記念で体験を予約する",
  },

  philosophy: {
    eyebrow: "CONCEPT",
    heading: "「ずっと、もっと、美しく」\nを、あなたのものに。",
    body: "ピラティスは、呼吸を使って体の深部を目覚めさせ、正しい動きを生みだすエクササイズ。体をコアから鍛え、姿勢を整え、美しいボディラインをつくります。初めての方でも、何歳からでも、安心して始められる、プロによる一対一のサポートです。",
  },

  worry: {
    heading: "こんなお悩み、\nありませんか？",
    items: [
      { icon: "posture", text: "姿勢の悪さが気になる。美姿勢を目指したい" },
      { icon: "body", text: "体型の乱れをシェイプアップ・体幹から整えたい" },
      { icon: "heart", text: "肩こりや不調を、根本から改善したい" },
      { icon: "run", text: "運動不足を、無理なく解消したい" },
    ],
    closingPre: "その一つでも当てはまるなら、",
    closingHighlight: "Beê のパーソナルピラティスへ。",
  },

  about: {
    eyebrow: "WHAT'S PILATES",
    heading: "パーソナルピラティスとは",
    img: { placeholder: "マシンピラティスのレッスン写真", src: `${ASSET}/about.jpg` },
    body: "呼吸を使い、体の深部（コア）を目覚めさせ、正しい動きを生みだすエクササイズです。表面の筋肉ではなく、体を内側から支えるインナーマッスルに働きかけることで、姿勢を整え、美しいボディラインをつくります。Beê では、お一人おひとりの体の状態や目標に合わせて、プロのインストラクターが一対一でレッスンを組み立てます。",
    points: [
      { icon: "spine", label: "姿勢を整える", desc: "体幹（コア）を目覚めさせ、内側からまっすぐ美しい姿勢へ。" },
      { icon: "body", label: "美しいボディライン", desc: "しなやかな筋肉を育て、引き締まったラインをつくります。" },
      { icon: "heal", label: "不調をケア", desc: "正しい動きを取り戻し、肩こり・体の不調を根本からケア。" },
    ],
  },

  trial: {
    eyebrow: "TRIAL LESSON",
    headingPre: "55分の体験レッスンが",
    headingHighlight: "オープン記念500円",
    lead: "プロのインストラクターによる一対一のカウンセリングから、実際のマシンピラティスまで。\n初めての方も、体験だけでも、お気軽にお越しください。",
    photos: [
      { placeholder: "カウンセリングのシーン写真", src: `${ASSET}/trial-counseling.jpg` },
      { placeholder: "マシンピラティスのシーン写真", src: `${ASSET}/trial-machine.jpg` },
    ],
    steps: [
      {
        min: "約10分",
        icon: "talk",
        title: "カウンセリング",
        body: "プロのインストラクターが、体のお悩みや目標を一対一で丁寧にヒアリングします。",
      },
      {
        min: "35〜40分",
        icon: "reformer",
        title: "マシンピラティス",
        body: "充実のマシン設備で、あなたの体に合わせたオーダーメイドのレッスンを体験できます。",
      },
      {
        min: "約10分",
        icon: "feedback",
        title: "フィードバック",
        body: "体験を踏まえ、これからの通い方やプランを分かりやすくご案内します。",
      },
    ],
    joinBenefit: {
      label: "体験当日のご入会で",
      normal: "22,000",
      value: "0",
      note: "入会金（税込）",
    },
    notes: [
      "※体験レッスンが500円（税込）となるのはオープン記念キャンペーン期間中に初めてご予約された方です。",
      "※入会金0円は体験当日にご入会された方が対象です。",
      "※動きやすい服装でお越しください（お着替えスペースもございます）。",
    ],
    ctaText: "オープン記念で体験を予約する",
  },

  reasons: {
    heading: "Beê が\n選ばれる5つの理由",
    items: [
      {
        num: "01",
        img: { placeholder: "完全個室のレッスン風景の写真", src: `${ASSET}/reason-1.jpg` },
        title: "プライベート空間で\n一対一のオーダーメイド",
        body: "完全個室で、まわりを気にせずレッスンに集中。お一人おひとりの体と目標に合わせて、プロが一対一でメニューを組み立てます。",
      },
      {
        num: "02",
        img: { placeholder: "インストラクター指導中の写真", src: `${ASSET}/reason-2.jpg` },
        title: "質の高い\nインストラクター陣",
        body: "確かな知識と技術をもつプロのインストラクターが在籍。担当が変わっても引き継ぎがあるので、毎回「はじめまして」になりません。",
      },
      {
        num: "03",
        img: { placeholder: "マシン設備の写真", src: `${ASSET}/reason-3.jpg` },
        title: "充実の\nマシン設備",
        body: "本格的なピラティスマシンを完備。マシンならではのサポートと負荷で、初心者の方でも正しい動きを効率よく身につけられます。",
      },
      {
        num: "04",
        img: { placeholder: "レッスン風景 / 料金イメージの写真", src: `${ASSET}/reason-4.jpg` },
        title: "続けやすい\n価格設定",
        body: "55分のレッスンを、続けやすい料金で。月4回プランなら1回あたり税込7,425円（女性）から。無理なく通い続けられます。",
      },
      {
        num: "05",
        img: { placeholder: "恵比寿駅前 / 店舗外観の写真", src: `${ASSET}/reason-5.jpg` },
        title: "恵比寿駅から\n徒歩2分の好立地",
        body: "恵比寿駅から徒歩2分。お仕事帰りやお出かけのついでにも通いやすく、予約枠も1日12枠と取りやすい環境です。",
      },
    ],
    ctaText: "オープン記念で体験を予約する",
    ctaSub: "55分体験レッスン オープン記念500円（税込）",
  },

  pricing: {
    eyebrow: "PRICE",
    heading: "料金のご案内",
    lead: "続けやすさにこだわった、55分パーソナルレッスンの料金です。\n目的やペースに合わせてプランをお選びいただけます。",
    plans: [
      {
        name: "月4回プラン",
        note: "月4回・55分パーソナル",
        perLesson: "7,425",
        genderNote: "女性・1回あたり（税込）",
      },
    ],
    joinFee: {
      label: "入会金",
      normal: "22,000",
      value: "0",
      note: "体験当日のご入会で0円（税込）",
    },
    notes: [
      "※表示は月4回プランの1回あたりの料金（税込）です。",
      "※男性の月4回プランは1回あたり税込9,625円です。",
      "※そのほかのプランや詳細は、体験レッスン時にご案内いたします。",
    ],
  },

  progress: {
    eyebrow: "CONTINUE",
    heading: "続けるほど、\n変化を実感。",
    steps: [
      { count: "10回", label: "違いを知り" },
      { count: "20回", label: "見た目が良くなり" },
      { count: "30回", label: "すべてが変わる" },
    ],
    note: "※変化には個人差があります。継続の目安としてご参考ください。",
  },

  instructors: {
    eyebrow: "INSTRUCTOR",
    heading: "あなたを支える、\nプロのインストラクター",
    lead: "Beê には、確かな技術をもつプロのインストラクターが在籍。担当が変わってもレッスンを引き継ぐから、あなたのことを分かった上で、いつも最適なレッスンをお届けします。",
    count: { num: "10", unit: "名", post: "のインストラクターが在籍" },
    img: { placeholder: "インストラクター集合 / 指導シーンの写真", src: `${ASSET}/instructor.jpg` },
    message: {
      title: "インストラクターより",
      body: "「あなたらしく、ずっと、もっと、美しく…。変化したところを一緒に見つけ、なぜその動きが必要なのかをお伝えしながら、体を根本から整えていきましょう。」",
    },
    points: [
      "一対一でしっかり見るマンツーマン指導",
      "担当が変わっても安心のレッスン引き継ぎ",
      "初めての方・運動が苦手な方も歓迎",
    ],
  },

  flow: {
    heading: "体験当日の流れ",
    steps: [
      {
        num: "1",
        title: "ご予約・ご来店",
        body: "フォームからご予約後、当日は動きやすい服装で恵比寿店へお越しください。手ぶらでもOKです。",
      },
      {
        num: "2",
        title: "カウンセリング（約10分）",
        body: "プロのインストラクターが、体のお悩みや目標を一対一で丁寧にヒアリングします。",
      },
      {
        num: "3",
        title: "マシンピラティス体験（35〜40分）",
        body: "充実のマシンで、あなたの体に合わせたオーダーメイドのレッスンを体験していただきます。",
      },
      {
        num: "4",
        title: "フィードバック・ご案内（約10分）",
        body: "体験を踏まえた通い方やプランをご案内。当日ご入会で入会金0円の特典もございます。",
      },
    ],
    note: "※体験レッスンは全体で約55分です。",
  },

  faq: {
    heading: "よくあるご質問",
    items: [
      {
        q: "運動経験がなくても大丈夫ですか？",
        a: "はい、ご安心ください。Beê は完全個室のマンツーマン指導です。プロのインストラクターがお一人おひとりの体力やペースに合わせてレッスンを組み立てますので、初めての方や運動が苦手な方でも無理なく取り組めます。何歳からでも安心してお始めいただけます。",
      },
      {
        q: "何を持っていけばよいですか？",
        a: "動きやすい服装でお越しいただければ、基本的に手ぶらでOKです。お着替えスペースもございますので、お仕事帰りやお出かけのついでにもお立ち寄りいただけます。",
      },
      {
        q: "体験当日に入会しないといけませんか？",
        a: "いいえ、その場でのご入会は必須ではありません。体験レッスンだけでも大歓迎です。無理な勧誘はいたしませんので、ご自身のペースでご検討ください（体験当日にご入会いただくと入会金22,000円が0円になる特典がございます）。",
      },
      {
        q: "担当のインストラクターは毎回変わりますか？",
        a: "スケジュールにより担当が変わる場合もございますが、レッスン内容やお客様の状態をインストラクター間でしっかり引き継ぎます。担当が変わっても「はじめまして」からにならず、いつも最適なレッスンをお届けします。",
      },
      {
        q: "予約は取りやすいですか？",
        a: "はい。1日12枠をご用意しており、比較的お好きな時間で予約を取りやすい環境です。営業時間は8:00〜21:45（最終枠20:50）、定休日はございません。",
      },
    ],
  },

  access: {
    heading: "店舗のご案内",
    store: {
      img: { placeholder: "恵比寿店の外観 / 内観の写真", src: `${ASSET}/store.jpg` },
      name: "Pilates Studio Beê 恵比寿店",
      address: "〒150-0021 東京都渋谷区恵比寿西1丁目8-1 かづさやビル 301",
      hours: "営業時間 8:00〜21:45",
      holiday: "定休日なし",
      route: "各線 恵比寿駅 徒歩2分（最終レッスン枠 20:50）",
      mapQuery: "東京都渋谷区恵比寿西1丁目8-1 かづさやビル",
    },
  },

  form: {
    heading: "体験レッスンのご予約",
    lead: "下記フォームよりお気軽にお申し込みください。\n担当より折り返しご連絡いたします。",
    fields: [
      { type: "text", name: "name", label: "お名前", required: true, placeholder: "山田 花子" },
      { type: "tel", name: "tel", label: "電話番号", required: true, placeholder: "090-0000-0000" },
      { type: "email", name: "email", label: "メールアドレス", placeholder: "example@mail.com" },
      { type: "date", name: "date1", label: "ご希望日(第1希望)", required: true },
      { type: "time", name: "time1", label: "ご希望時間(第1希望)", required: true, min: "08:00", max: "20:50" },
      { type: "date", name: "date2", label: "ご希望日(第2希望)" },
      { type: "time", name: "time2", label: "ご希望時間(第2希望)", min: "08:00", max: "20:50" },
      {
        type: "textarea",
        name: "note",
        label: "ご質問・ご相談内容",
        optionalTag: "任意",
        placeholder: "運動経験や体のお悩みなど、ご自由にお書きください。",
        rows: 4,
      },
    ],
    submitLabel: "この内容で予約する",
    disclaimer:
      "送信いただいた内容は予約対応のみに利用します。\nオープン記念 体験55分500円（税込）｜体験当日入会で入会金0円｜無理な勧誘はいたしません。",
    errorMessage: "お名前・電話番号・第1希望日時は必須です。ご希望日は明日以降の日付をお選びください。",
  },

  sticky: {
    offers: [
      { label: "55分体験", value: "¥500" },
      { label: "入会金", value: "¥0" },
    ],
    buttonText: "オープン記念で体験を予約する",
    anchor: "#form",
  },

  footer: {
    lines: [
      "Pilates Studio Beê 恵比寿店",
      "〒150-0021 東京都渋谷区恵比寿西1丁目8-1 かづさやビル 301",
      "営業時間 8:00〜21:45（最終枠 20:50）｜定休日なし",
    ],
  },
};

export default config;
