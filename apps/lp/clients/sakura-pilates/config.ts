import type { ClientStatus } from "@shared/index";
import type { LPFormField } from "@/components/LPForm";

/**
 * パーソナルマシンピラティス SAKURA — ブランド全体の広告集客用LP（Meta広告流入）。
 *
 * 掲載内容はすべて公式サイト（sakura-pilates.jp）の記載に基づく。
 * 事実確認できない数値・実績は載せない方針なので、追記するときは必ず
 * 公式サイトの該当ページを確認してから足すこと。出典は各ブロックのコメントに残してある。
 *
 * 店舗単位のLPではない（住所・電話・インストラクターは店舗ごとに違うため載せない）。
 * CVは「体験レッスンの予約フォーム送信」で、希望店舗はフォームの select で受ける。
 *
 * **配信エリアは東京都限定**（2026-09-07 の顧客判断）。掲載する店舗・店舗数・
 * お客様の声はすべて東京都内のものに絞ってある。神奈川・埼玉・千葉・茨城・静岡・
 * 鹿児島の店舗はこのLPには載せない（広告の訴求とLPの内容を一致させるため）。
 * エリアを広げるときは meta / fv.sub / fv.stats / proof.stats / studios /
 * form の店舗select を揃えて直すこと。
 */

/** 画像スロット。`src` が空ならプレースホルダが出る。 */
export interface Slot {
  placeholder: string;
  src?: string | null;
  /** 切り抜き位置（object-position）。既定は "center"。 */
  position?: string;
}

export interface SakuraConfig {
  slug: string;
  status?: ClientStatus;
  meta: { title: string; description: string; ogpImage?: string };

  /** オファーバー（ヘッダー直下の帯）。公式の店舗キャンペーンバナーと同内容。 */
  offerBar: { note: string; text: string; badge: string };

  header: { brand: string; brandSub: string; ctaText: string };

  fv: {
    /** 縦書きの明朝キャッチ（1要素＝1行）。採用理由は下の CATCH_CANDIDATES を参照。 */
    catchLines: string[];
    sub: string;
    hero: Slot;
    /** FV下部の信頼バッジ。 */
    stats: { num: string; unit: string; label: string }[];
  };

  /**
   * MV直下の特典ブロック。参考LP（masterpiece-rest）の cp ブロックと同じ組み立てで、
   *   「体験で受けられる中身」→「さらに」→「入会時の特典」
   * の順に積む。中身は公式LPのキャンペーンバナー原文に基づく:
   *   【体験レッスン&カウンセリング】通常60分5,500円のところ…今だけ「無料」！
   *   さらに体験レッスン後のご入会で「入会金0円」「専用靴下プレゼント」
   */
  offer: {
    note: string;
    eyebrow: string;
    heading: string;
    duration: string;
    trialLabel: string;
    trialWas: string;
    trialNow: string;
    trialUnit: string;
    /** 体験60分で受けられる中身。円形アイコンで並べる（アイコンは page.tsx 側で固定）。 */
    items: string[];
    photos: [Slot, Slot];
    bridge: string;
    joinLead: string;
    perks: { label: string; was?: string; now: string; note?: string }[];
    foot: string;
    ctaText: string;
    ctaSub: string;
  };

  worry: {
    kicker: string;
    heading: string;
    lead: string;
    /** 1行1悩み。写真＋コピーの横並びで積む（2列グリッドは文字が小さくなり読みにくかった）。 */
    cards: { img: Slot; text: string; note: string }[];
    closing: string;
    closingSub: string;
  };

  bridge: {
    kicker: string;
    heading: string;
    lead: string;
    photo: Slot;
    items: { title: string; body: string }[];
    ctaText: string;
    ctaSub: string;
  };

  features: {
    kicker: string;
    heading: string;
    lead: string;
    /** `insight` は見込み客の本音（不安）。強みを「会社の説明」でなく「不安への答え」として出す。 */
    items: { num: string; insight: string; title: string; body: string; img?: Slot }[];
  };

  personal: {
    kicker: string;
    heading: string;
    lead: string;
    photo: Slot;
    items: { title: string; body: string }[];
    versus: { label: string; group: string; sakura: string }[];
  };

  beginner: {
    kicker: string;
    heading: string;
    lead: string;
    photos: [Slot, Slot];
    items: { title: string; body: string }[];
    ctaText: string;
    ctaSub: string;
  };

  proof: {
    kicker: string;
    heading: string;
    stats: { num: string; unit: string; label: string }[];
    badges: string[];
    note: string;
  };

  program: {
    kicker: string;
    heading: string;
    lead: string;
    groups: { label: string; items: { en: string; ja: string }[] }[];
    note: string;
  };

  voices: {
    kicker: string;
    heading: string;
    items: { title: string; body: string; who: string }[];
    note: string;
    ctaText: string;
    ctaSub: string;
  };

  price: {
    kicker: string;
    heading: string;
    lead: string;
    join: { label: string; was: string; now: string; note: string };
    plans: {
      name: string;
      desc: string;
      amount: string;
      unit: string;
      per: string;
      badge?: string;
    }[];
    notes: string[];
    ctaText: string;
    ctaSub: string;
  };

  compare: {
    kicker: string;
    heading: string;
    /** 評価軸ごとに1枚のカード。先頭が SAKURA。 */
    axes: { label: string; rows: { name: string; text: string }[] }[];
  };

  flow: {
    kicker: string;
    heading: string;
    lead: string;
    steps: { num: string; title: string; body: string }[];
    ctaText: string;
    ctaSub: string;
  };

  faq: { kicker: string; heading: string; items: { q: string; a: string }[] };

  studios: {
    kicker: string;
    heading: string;
    lead: string;
    photo: Slot;
    /** 東京都内の店舗名（駅名）。単一エリアLPなので都県のグルーピングは持たない。 */
    names: string[];
    upcoming: { label: string; names: string[] };
    hours: string;
    holiday: string;
    note: string;
  };

  form: {
    kicker: string;
    heading: string;
    lead: string;
    fields: LPFormField[];
    submitLabel: string;
    microcopy: string;
    disclaimer: string;
    errorMessage: string;
  };

  sticky: { buttonText: string; anchor: string; offers: [string, string] };
}

/* ──────────────────────────────────────────────────────────────
 * キャッチコピー案（FV）
 *
 * A. 姿勢が変わると、鏡を見るのが楽しみになる。      ← 採用
 * B. ただ鍛えるだけじゃない。あなたらしい美しい身体へ。
 * C. 鏡に映る自分を、もっと好きになる。
 * D. 筋肉質にならず、しなやかに美しく。
 * E. 姿勢から変える、私だけの60分。
 *
 * A を採用した理由:
 *  1. 「姿勢（原因）→ 見た目の変化（ベネフィット）→ 感情（鏡を見るのが楽しみ）」が
 *     1文で繋がる。B/D は状態の言い換えで止まり、行動理由まで届かない。
 *  2. 公式サイトのFV「パーソナルピラティスで鏡を見るのが楽しくなる毎日へ」と
 *     同じ世界観なので、広告→LP→公式サイトで訴求が一致する。
 *  3. 「痩せる」を言わずに見た目の変化を約束できる。ダイエット訴求に寄せない
 *     という今回の要件をコピー単体で満たす。
 *  4. C は主語が「自分」で内省的すぎ、E は「60分」が先に立って情緒が弱い。
 * ────────────────────────────────────────────────────────────── */

const IMG = "/clients/sakura-pilates";

/**
 * 希望店舗セレクト。公式 /studios/ の表記に合わせている（2026年9月時点）。
 * 東京都限定LPなので、東京都の18店舗＋東京都内のオープン予定4店舗のみを出す。
 */
const TOKYO_STUDIOS = [
  "麻布十番", "五反田", "恵比寿", "学芸大学", "旗の台", "大井町", "勝どき",
  "代々木上原", "四谷三丁目", "茗荷谷", "池袋", "高田馬場・西早稲田",
  "町屋", "練馬", "大泉学園", "成増", "経堂", "三鷹",
];

const TOKYO_UPCOMING = [
  "成増ANNEX店（9/15オープン）",
  "新宿三丁目店（10/15オープン）",
  "亀戸店（10/15オープン）",
  "白金高輪店（11/1オープン）",
];

const studioOptions = [
  {
    label: "東京都",
    options: TOKYO_STUDIOS.map((n) => ({ value: `${n}店`, label: `${n}店` })),
  },
  {
    label: "オープン予定",
    options: TOKYO_UPCOMING.map((n) => ({ value: n, label: n })),
  },
  {
    label: "その他",
    options: [{ value: "まだ決めていない", label: "まだ決めていない／相談したい" }],
  },
];

const config: SakuraConfig = {
  slug: "sakura-pilates",
  status: "draft",
  meta: {
    title:
      "女性専用パーソナルマシンピラティス SAKURA｜東京都内18店舗・体験レッスン＆入会金0円",
    description:
      "姿勢が変わると、鏡を見るのが楽しみになる。東京都内18店舗、女性専用・完全マンツーマンのマシンピラティスSAKURA。会員様の80%がピラティス未経験、継続率94%。今月末までのご予約限定で体験レッスン＆入会金が0円。",
    // 相対パスだと metadataBase が別ドメインに解決されるため絶対URLで固定する。
    ogpImage: "https://fitness-lp.commitad.com/clients/sakura-pilates/ogp.jpg",
  },

  /* 出典: 公式 /studios/<店舗>/ のキャンペーンバナー
     「今月末までのご予約限定で 体験レッスン＆入会金 0円」 */
  offerBar: {
    note: "今月末までのご予約限定",
    text: "体験レッスン＆入会金",
    badge: "0円",
  },

  header: {
    brand: "SAKURA",
    brandSub: "東京18店舗｜女性専用マシンピラティス",
    ctaText: "無料体験を予約",
  },

  fv: {
    catchLines: ["姿勢が変わると、", "鏡を見るのが", "楽しみになる。"],
    sub: "東京都内18店舗。女性専用・完全マンツーマン。\n運動が初めての方も、あなたの身体に合わせて。",
    hero: {
      placeholder: "マンツーマンレッスン風景",
      src: `${IMG}/hero.jpg`,
      // 縦書きキャッチが左半分を覆うので、被写体が右側に来るよう切り抜きを左へ寄せる。
      position: "36% center",
    },
    /* 出典: 公式店舗LP（未経験80% / 継続率94% / スタッフ全員女性）、公式 /studios/（店舗数） */
    stats: [
      { num: "18", unit: "店舗", label: "東京都内に展開" },
      { num: "80", unit: "%", label: "ピラティス未経験" },
      { num: "94", unit: "%", label: "継続率" },
      { num: "全員", unit: "女性", label: "スタッフ" },
    ],
  },

  /* 出典: 公式店舗LPのキャンペーンバナー（alt原文）
     「【体験レッスン&カウンセリング】通常60分5,500円のところ…今だけ「無料」！
       さらに体験レッスン後のご入会で「入会金0円」「専用靴下プレゼント」」
     ＋ 公式 /studios/<店舗>/ のバナー「今月末までのご予約限定」 */
  offer: {
    note: "今月末までのご予約限定",
    eyebrow: "＼ 今だけ ／",
    heading: "体験レッスン＆カウンセリング",
    duration: "60分",
    trialLabel: "通常 5,500円 のところ",
    trialWas: "5,500円",
    trialNow: "0",
    trialUnit: "円",
    items: [
      "丁寧な\nカウンセリング",
      "マシン\nピラティス体験",
      "専門的な\nフィードバック",
      "あなたに合う\nプランのご案内",
      "完全マンツーマン\n女性インストラクター",
      "ウェア・靴下\n無料レンタル",
    ],
    photos: [
      { placeholder: "レッスン風景", src: `${IMG}/offer-1.jpg` },
      { placeholder: "無料レンタルウェア", src: `${IMG}/offer-2.jpg` },
    ],
    bridge: "さらに",
    joinLead: "体験レッスン後のご入会で",
    perks: [
      { label: "入会金", was: "33,000円", now: "0円" },
      { label: "SAKURA専用ソックス", now: "プレゼント", note: "レッスン用のグリップソックス" },
    ],
    foot: "体験はウェア・靴下の無料レンタル付き。手ぶらでお越しいただけます。",
    ctaText: "まずは無料体験を予約する",
    ctaSub: "所要60分／入力は1分で完了",
  },

  worry: {
    kicker: "TROUBLES",
    heading: "こんなお悩み、\nありませんか？",
    lead: "ひとつでも当てはまるなら、\nマシンピラティスで変えられます。",
    /* 出典: 公式トップ「SAKURAなら、このようなお悩みをすべて解決」 */
    cards: [
      {
        img: { placeholder: "姿勢", src: `${IMG}/worry-2-posture.jpg` },
        text: "猫背や巻き肩を改善して\n姿勢をすらっとさせたい",
        note: "デスクワークで丸まった背中は、見た目の印象を大きく左右します。",
      },
      {
        img: { placeholder: "ボディライン", src: `${IMG}/worry-1-body.jpg` },
        text: "筋肉質な感じにさせず\nボディラインを綺麗にしたい",
        note: "鍛えて大きくするのではなく、使い方を整えてしなやかに。",
      },
      {
        img: { placeholder: "むくみ・冷え", src: `${IMG}/worry-3-cold.jpg` },
        text: "むくみや冷え性を\n改善したい",
        note: "呼吸と可動域から見直すので、女性特有の不調にも期待できます。",
      },
      {
        img: { placeholder: "産後ケア", src: `${IMG}/worry-4-postnatal.jpg` },
        text: "産後の骨盤ケアを\nしていきたい",
        note: "産後のからだの変化に寄り添った、専用のプログラムがあります。",
      },
    ],
    closing: "そのお悩み、SAKURAなら\nすべて解決できます。",
    closingSub: "女性専用・完全マンツーマンだから、あなたの身体に合わせて進められます。",
  },

  /* 出典: 公式トップ Concept / 公式店舗LP「マシンピラティスで得られる効果」Benefits 01-03 */
  bridge: {
    kicker: "WHY PILATES",
    heading: "そのお悩みには、\nマシンピラティス × マンツーマン。",
    lead: "体重を落とすだけのボディメイクではなく、習慣化している身体の使い方を修正して奥深いところから鍛えることで『しなやかで美しいボディライン』を手に入れることができます。",
    photo: { placeholder: "リフォーマーでのレッスン", src: `${IMG}/reason-2.jpg` },
    items: [
      {
        title: "運動が苦手でも、\nマシンが動きを支えてくれる",
        body: "専用マシン「リフォーマー」が身体の動きをサポートしてくれるため、運動が苦手な方や筋力が少ない方でも、効率的に体幹・インナーマッスルを鍛えることができます。",
      },
      {
        title: "気になる部分に\nピンポイントでアプローチ",
        body: "気になるパーツや悩みのある部分だけに集中してアプローチすることができるので、より効率的に結果を出すことができます。",
      },
      {
        title: "姿勢だけでなく、\nカラダの不調にも期待できる",
        body: "柔軟性を向上させたり、骨の位置を改善することで痛みの悩みを改善。呼吸も大切にしているので、女性特有の不調にも効果が期待できます。",
      },
    ],
    ctaText: "自分の身体を知ることから始める",
    ctaSub: "体験レッスン0円／入会金0円",
  },

  /* 出典: 公式店舗LP「『SAKURA』のマシンピラティス 5つの特徴」 */
  features: {
    kicker: "FEATURE",
    heading: "SAKURAが\n選ばれる5つの理由",
    lead: "ピラティスを始める前に、ほとんどの方が同じところでつまずきます。\nその5つに、SAKURAは全部答えを持っています。",
    /* タイトルは見込み客の不安への「答え」に言い換えているが、本文の事実は
       公式店舗LP「『SAKURA』のマシンピラティス 5つの特徴」の記載どおり。 */
    items: [
      {
        num: "01",
        insight: "他のジムもヨガも、続けたのに変わらなかった。",
        title: "「効果を感じられなかった」人ほど、\n変化を実感している",
        body: "お客様評価を最も大切にするスタジオなので、他スタジオで効果を感じなかったお客様からとても高い評価をいただいています。結果を出すことに特化した設計です。",
        img: { placeholder: "レッスン風景", src: `${IMG}/offer-1.jpg` },
      },
      {
        num: "02",
        insight: "なんとなく動くだけで、本当に姿勢が変わるの？",
        title: "「なんとなく」で終わらせない、\n理学療法士監修のメソッド",
        body: "理学療法士とパーソナルトレーナーが監修し、ピラティスにボディメイクの視点を組み合わせた独自メソッドを導入。マシンレッスンをメインに、女性特有のニーズにお応えします。",
        img: { placeholder: "マシン指導", src: `${IMG}/scene-3-morning.jpg` },
      },
      {
        num: "03",
        insight: "スタジオで体型を見られるのが、どうしても恥ずかしい。",
        title: "人の目が気になる人のための、\n女性専用スタジオ",
        body: "スタジオもインストラクターも全員女性。人目を気にせず、体型や産後のことなど女性特有のお悩みも、お気軽に相談できる環境です。",
        img: { placeholder: "カウンセリング", src: `${IMG}/reason-1.jpg` },
      },
      {
        num: "04",
        insight: "パーソナルは効きそうだけど、高くて続けられない。",
        title: "「高いから続かない」をなくした、\nパーソナルなのにリーズナブル",
        body: "コストカットにより他社よりも続けやすい費用を実現。月額制とチケット制を用意しているので、通うペースに合わせてプランをお選びいただけます。",
        img: { placeholder: "スタジオ内観", src: `${IMG}/reason-3.jpg` },
      },
      {
        num: "05",
        insight: "産後の体型、もう元には戻らない気がする。",
        title: "産後の身体は、戻すのではなく整える。\n産後リカバリーサポート",
        body: "産後のからだの変化に寄り添い、心身ともに快適な日常へとつながる姿勢づくりをサポートします。骨盤まわりに特化したMATERNITYプログラムもご用意しています。",
        img: { placeholder: "産後ケア", src: `${IMG}/worry-4-postnatal.jpg` },
      },
    ],
  },

  personal: {
    kicker: "PERSONAL",
    heading: "パーソナルだから、\nできること。",
    lead: "決められたメニューをみんなで動くのではなく、あなたの身体だけを見て、その日のコンディションに合わせて組み立てる60分です。",
    photo: { placeholder: "マンツーマン指導", src: `${IMG}/offer-1.jpg` },
    items: [
      {
        title: "あなたの身体だけを見る60分",
        body: "その日の体調・可動域・お悩みを伺ったうえで、負荷とメニューを一つひとつ調整します。",
      },
      {
        title: "自分では気づけないクセを直せる",
        body: "猫背・巻き肩・反り腰。鏡だけでは分からない身体のクセを、専門インストラクターが見つけて整えていきます。",
      },
      {
        title: "目的に合わせてメニューを選べる",
        body: "姿勢改善・ボディメイク・産前産後・PMSまで、目的別のプログラムから組み合わせられます。",
      },
      {
        title: "人目を気にせず、自分のペースで",
        body: "完全マンツーマンなので、周りと比べる必要も、置いていかれる不安もありません。",
      },
    ],
    versus: [
      {
        label: "メニュー",
        group: "全員同じ内容",
        sakura: "あなたの身体に合わせて毎回組み立て",
      },
      {
        label: "フォーム",
        group: "自己流になりやすい",
        sakura: "その場で1つずつ修正",
      },
      {
        label: "ペース",
        group: "クラスの進行に合わせる",
        sakura: "その日の体調に合わせる",
      },
      {
        label: "はじめやすさ",
        group: "経験者と一緒で気後れしやすい",
        sakura: "未経験からのスタートが80%",
      },
    ],
  },

  /* 出典: 公式店舗LP「マシンピラティスが初めての方でも安心」／公式FAQ */
  beginner: {
    kicker: "FOR BEGINNERS",
    heading: "はじめてでも、\n大丈夫です。",
    lead: "SAKURAの会員様は80%がピラティス未経験。30代を中心に、幅広い年齢層の方が通われています。",
    photos: [
      { placeholder: "レンタルウェア", src: `${IMG}/offer-2.jpg` },
      { placeholder: "カウンセリングスペース", src: `${IMG}/access.jpg` },
    ],
    items: [
      {
        title: "会員様の80%がピラティス未経験",
        body: "「みんな経験者だったらどうしよう」はありません。ほとんどの方が、あなたと同じところからスタートしています。",
      },
      {
        title: "運動経験がなくても大丈夫",
        body: "プロのインストラクターがマンツーマンで丁寧なレッスンを行いますので、安心してご来店ください。",
      },
      {
        title: "インストラクターも全員女性",
        body: "女性専用スタジオなので、体型や産後のことも気兼ねなく相談できます。",
      },
      {
        title: "ウェア・靴下は体験時無料",
        body: "体験レッスンの際はウェアや靴下を無料で貸し出していますので、手ぶらでご来店いただけます。",
      },
    ],
    ctaText: "運動が苦手でも、まず体験してみる",
    ctaSub: "体験レッスン0円／手ぶらでOK",
  },

  proof: {
    kicker: "TRUST",
    heading: "数字で見るSAKURA",
    stats: [
      { num: "18", unit: "店舗", label: "東京都内に展開" },
      { num: "80", unit: "%", label: "ピラティス未経験からスタート" },
      { num: "94", unit: "%", label: "継続率" },
      { num: "7,150", unit: "円〜", label: "レッスン1回あたり" },
      { num: "8:00", unit: "-21:30", label: "営業時間" },
      { num: "全員", unit: "女性", label: "スタッフ・インストラクター" },
    ],
    badges: [
      "全米スポーツ医学協会の有資格者が監修したプログラム",
      "理学療法士とパーソナルトレーナーが監修した独自メソッド",
      "女性専用スタジオ／完全マンツーマン",
    ],
    note: "※数値は公式サイト掲載の実績値です。店舗数は2026年9月時点の東京都内の営業中店舗数（オープン予定を含めると22店舗）。",
  },

  /* 出典: 公式 /program/ ＋ 公式店舗LP「幅広いレッスン内容」 */
  program: {
    kicker: "PROGRAM",
    heading: "目的に合わせて選べる\nレッスン内容",
    lead: "全米スポーツ医学協会の有資格者が監修したプログラム。カウンセリングで伺ったお悩みに合わせて、インストラクターが組み立てます。",
    groups: [
      {
        label: "初めての方向け",
        items: [
          { en: "INTRO", ja: "ピラティスやリフォーマー初心者の方向けのプログラム" },
          { en: "BEAUTIFUL POSTURE", ja: "綺麗な姿勢に戻し、維持するためのプログラム" },
        ],
      },
      {
        label: "ステップアップ",
        items: [
          { en: "ADVANCE", ja: "基礎を理解し、慣れてきた方向けのプログラム" },
          { en: "SUPPLE BODY", ja: "可動域を広げ、しなやかなボディを作るためのプログラム" },
        ],
      },
      {
        label: "パーツボディメイク",
        items: [
          { en: "FULL BODY", ja: "余計な筋肉をつけることなく、全身をまんべんなく鍛える" },
          { en: "WAIST", ja: "腹部とウェストラインを集中的に鍛える" },
          { en: "HIP & LEG", ja: "股関節の柔軟性を高め、骨盤から美脚ラインへと導く" },
          { en: "BACK & ARM", ja: "腕から背中をすらっと整え、凛とした上半身をつくる" },
        ],
      },
      {
        label: "ご希望に応じて",
        items: [
          { en: "MATERNITY", ja: "産前産後の骨盤矯正、骨盤周りの筋肉を鍛える" },
          { en: "PMS", ja: "呼吸へ重点を置き、女性特有のお悩みの改善を目指す" },
        ],
      },
    ],
    note: "※MATERNITYは対応できるインストラクターについてお問い合わせください。",
  },

  /* 出典: 公式サイト掲載のお客様の声（原文ママ） */
  voices: {
    kicker: "VOICE",
    heading: "お客様の声",
    items: [
      {
        title: "骨盤の位置など姿勢が変わったのがわかります",
        body: "体験レッスンでマシンピラティスの効果を実感！特に骨盤の位置など姿勢が変わったのがわかります。場所は町屋駅からすぐで通いやすいです。",
        who: "A様（40歳）／町屋",
      },
      {
        title: "ウエスト周りがすっきりしてきたのを実感",
        body: "旗の台駅からすぐのスタジオでパーソナルのマシンピラティスを続けて3ヶ月。ウエスト周りがすっきりしてきたのを実感しています。",
        who: "S様（29歳）／旗の台",
      },
      {
        title: "運動が苦手な私でも安心して続けられた",
        body: "四谷三丁目駅から通えるスタジオを探していてピラティスに挑戦。運動が苦手な私でも続けられるレッスン内容でした！",
        who: "J様（48歳）／四谷三丁目",
      },
      {
        title: "育児の疲れをリフレッシュできる",
        body: "産後の体型が気になって、大泉学園のピラティススタジオに通い始めました。育児の合間のリフレッシュにもなっていて大満足です。",
        who: "H様（48歳）／大泉学園",
      },
    ],
    note: "※公式サイト掲載のお客様の声より。個人の感想であり、効果を保証するものではありません。",
    ctaText: "私の場合はどうか、聞いてみる",
    ctaSub: "体験レッスン0円／入会金0円",
  },

  /* 出典: 公式 /price/（税込） */
  price: {
    kicker: "PRICE",
    heading: "続けやすい料金設定",
    lead: "コストカットにより、他社よりも続けやすい費用を実現。月額制とチケット制を用意しているので、あなたに合わせたプランをお選びいただけます。",
    join: {
      label: "入会金",
      was: "33,000円",
      now: "0円",
      note: "今月末までのご予約限定",
    },
    plans: [
      {
        name: "月4回コース",
        desc: "毎月1日〜末日の間に、4回のレッスンが可能",
        amount: "33,000",
        unit: "円/月",
        per: "1回あたり8,250円",
        badge: "人気No.1",
      },
      {
        name: "月8回コース",
        desc: "毎月1日〜末日の間に、8回のレッスンが可能",
        amount: "63,800",
        unit: "円/月",
        per: "1回あたり7,975円",
      },
      {
        name: "回数券8枚コース",
        desc: "有効期限内に8回のレッスンが可能",
        amount: "70,400",
        unit: "円",
        per: "1回あたり8,800円",
      },
      {
        name: "6ヶ月プラン",
        desc: "最大月4回までご利用いただけます",
        amount: "184,800",
        unit: "円",
        per: "1回あたり7,700円",
      },
      {
        name: "12ヶ月プラン",
        desc: "最大月4回までご利用いただけます",
        amount: "343,200",
        unit: "円",
        per: "1回あたり7,150円",
        badge: "最安",
      },
    ],
    notes: [
      "※料金はすべて税込表示です。",
      "※月額制の場合、回数の制限なく繰り越すことができます。",
      "※6ヶ月・12ヶ月プランは4レッスンまでまとめて予約可能です。",
      "※クレジットカード決済か銀行振込がご利用いただけます。",
    ],
    ctaText: "料金を相談しながら体験する",
    ctaSub: "体験レッスン0円／入会金0円",
  },

  /* 出典: 公式店舗LP「Comparison 他社比較」 */
  compare: {
    kicker: "COMPARISON",
    heading: "他のサービスとの違い",
    axes: [
      {
        label: "コスパ",
        rows: [
          { name: "SAKURA", text: "コストカットでパーソナルなのに通いやすい料金を実現" },
          { name: "グループピラティス", text: "月謝は安いが効果に時間がかかる" },
          { name: "他社パーソナル\nピラティス", text: "個別指導で費用はやや高め" },
          { name: "パーソナルジム", text: "短期集中で総費用は高めになりやすい" },
        ],
      },
      {
        label: "指導力",
        rows: [
          { name: "SAKURA", text: "メディカル視点の独自メソッドで丁寧に指導" },
          { name: "グループピラティス", text: "集団指導が主で個別調整は限定的" },
          { name: "他社パーソナル\nピラティス", text: "研修体制が薄く指導に差が出る" },
          { name: "パーソナルジム", text: "トレーナー主導で筋力重視の指導が中心" },
        ],
      },
      {
        label: "続けやすさ",
        rows: [
          { name: "SAKURA", text: "予約しやすくマンツーマンで無理なく続けられる" },
          { name: "グループピラティス", text: "時間固定のクラスが多く予定に合わせにくい" },
          { name: "他社パーソナル\nピラティス", text: "習慣化しやすいが人気次第で予約が埋まりやすい" },
          { name: "パーソナルジム", text: "短期集中型で途中離脱しやすい" },
        ],
      },
      {
        label: "女性専用",
        rows: [
          { name: "SAKURA", text: "完全個室かつ女性インストラクターのみで安心感が高い" },
          { name: "グループピラティス", text: "男女共用のスタジオが多い" },
          { name: "他社パーソナル\nピラティス", text: "スタッフが男性の場合もある" },
          { name: "パーソナルジム", text: "男性比率が高めで入りやすさに差あり" },
        ],
      },
      {
        label: "効果",
        rows: [
          { name: "SAKURA", text: "効果を出すことに特化したプログラムで変化を実感" },
          { name: "グループピラティス", text: "継続で効果は出るが劇的な変化は出にくい" },
          { name: "他社パーソナル\nピラティス", text: "個別とはいえ講師のスキル差で結果にばらつき" },
          { name: "パーソナルジム", text: "筋力向上は早いが姿勢改善は個人差がある" },
        ],
      },
    ],
  },

  /* 出典: 公式店舗LP「体験予約の流れ」／公式FAQ */
  flow: {
    kicker: "FLOW",
    heading: "体験レッスンの流れ",
    lead: "お着替えからレッスン後のフィードバックまで含めて、所要時間は60分。\nウェア・靴下は無料レンタルなので、手ぶらでお越しいただけます。",
    steps: [
      {
        num: "01",
        title: "体験レッスンを予約",
        body: "このページのフォームからお申し込みください。ご希望の店舗と日程を伺い、担当より順次ご連絡いたします。",
      },
      {
        num: "02",
        title: "スタジオへご来店",
        body: "前のお客様がいらっしゃる可能性がございますので、予約時間ちょうどにスタジオへお越しください。",
      },
      {
        num: "03",
        title: "お着替え",
        body: "お着替えをしていただきます。無料レンタルウェアのご用意もございます。",
      },
      {
        num: "04",
        title: "カウンセリング",
        body: "まずはお客様のご希望やお悩みをヒアリングし、メニューをご提案します。",
      },
      {
        num: "05",
        title: "レッスン",
        body: "経験豊富なインストラクターがレッスンを行います。丁寧にサポートするので、初めてでもご安心ください。",
      },
      {
        num: "06",
        title: "体験後のフィードバック",
        body: "レッスンで見えた姿勢のクセや身体の状態を、インストラクターがその場でフィードバック。目標までの進め方と、あなたに合った通い方をご案内します。ご不明点はなんでもご質問ください。",
      },
    ],
    ctaText: "体験レッスンを予約する",
    ctaSub: "所要60分／体験レッスン0円",
  },

  /* 出典: 公式 /faq/ */
  faq: {
    kicker: "FAQ",
    heading: "よくあるご質問",
    items: [
      {
        q: "運動経験のない初心者でも大丈夫ですか？",
        a: "もちろん大丈夫です。プロのインストラクターがマンツーマンで丁寧なレッスンを行いますので、安心してご来店ください。会員様の80%がピラティス未経験からスタートされています。",
      },
      {
        q: "体験レッスンの持ち物は何ですか？",
        a: "体験レッスンの際はウェアや靴下を無料で貸し出しておりますので、手ぶらでご来店いただけます（入会後は有料となります）。ご入会をご希望の場合はクレジットカードもお持ちください。",
      },
      {
        q: "体験レッスンはどのくらい時間がかかりますか？",
        a: "お着替えやプランのご説明も含めて60分となります。先のお客様がいらっしゃることもありますので、お時間ちょうどにご来店ください。",
      },
      {
        q: "男性も通えますか？",
        a: "SAKURAは女性専用スタジオです。インストラクターも全員女性なので、人目を気にせず安心してお通いいただけます。",
      },
      {
        q: "妊娠中でもレッスンを受けられますか？",
        a: "医師への確認、同意の上であれば可能です。店舗によって異なりますので、一度ご連絡ください。",
      },
      {
        q: "予約は取りやすいですか？",
        a: "一気に予約が解放されるスタジオとは異なり、当店独自の仕組みにより可能な限り予約の取りやすい環境を作っています。常に3週間先のスケジュールが開放される形になっております。",
      },
      {
        q: "支払い方法は何がありますか？",
        a: "クレジットカード決済か銀行振込がご利用いただけます。クレジットカード決済の場合、月会費の引落は毎月20日となります。",
      },
      {
        q: "予約のキャンセルはいつまで可能ですか？",
        a: "前日の21時までとなっております。",
      },
      {
        q: "体験レッスンは何回も受けられますか？",
        a: "申し訳ございません。体験レッスンは1回限りとさせていただいております。",
      },
    ],
  },

  /* 出典: 公式 /studios/（2026年9月時点）。東京都限定LPなので東京都の店舗のみ掲載する。 */
  studios: {
    kicker: "STUDIOS",
    heading: "東京都内18店舗",
    lead: "駅チカ・完全個室のスタジオを、東京都内18店舗で展開しています。\nご希望の店舗はフォームからお選びください。",
    photo: { placeholder: "スタジオ内観", src: `${IMG}/reason-3.jpg` },
    names: TOKYO_STUDIOS,
    upcoming: {
      label: "東京都内で新規オープン予定",
      names: ["成増ANNEX（9/15）", "新宿三丁目（10/15）", "亀戸（10/15）", "白金高輪（11/1）"],
    },
    hours: "8:00〜21:30",
    holiday: "年末年始（12/29〜1/3）",
    note: "※店舗数・営業時間は2026年9月時点の公式サイト掲載情報です。詳しい住所・アクセスは体験のご予約後にご案内します。",
  },

  form: {
    kicker: "RESERVE",
    heading: "無料体験レッスンのご予約",
    lead: "入力は1分で完了します。\nご希望の店舗・日程を担当より確認のうえ、順次ご連絡いたします。",
    fields: [
      { type: "text", name: "name", label: "お名前", required: true, placeholder: "山田 花子" },
      { type: "tel", name: "tel", label: "電話番号", required: true, placeholder: "090-0000-0000" },
      {
        type: "email",
        name: "email",
        label: "メールアドレス",
        optionalTag: "任意",
        placeholder: "example@mail.com",
      },
      {
        type: "select",
        name: "store",
        label: "ご希望の店舗",
        required: true,
        placeholder: "店舗を選択してください",
        groups: studioOptions,
      },
      { type: "date", name: "date1", label: "ご希望日（第1希望）" },
      { type: "date", name: "date2", label: "ご希望日（第2希望）", optionalTag: "任意" },
      {
        type: "textarea",
        name: "note",
        label: "ご希望の時間帯・ご相談内容",
        optionalTag: "任意",
        placeholder: "例）平日の夜、土曜の午前など。猫背が気になる、運動が苦手、などもお気軽にどうぞ。",
        rows: 4,
      },
    ],
    submitLabel: "この内容で無料体験を予約する",
    microcopy: "体験レッスン0円／入会金0円／手ぶらでOK",
    disclaimer:
      "ご入力いただいた内容は、体験レッスンのご予約対応にのみ利用します。\nしつこい勧誘はいたしません。",
    errorMessage: "お名前・電話番号・ご希望の店舗は必須項目です。",
  },

  sticky: {
    buttonText: "まずは無料体験を予約する",
    anchor: "#form",
    offers: ["体験レッスン ¥0", "入会金 ¥0"],
  },
};

export default config;
