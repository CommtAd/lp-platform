import type { ClientStatus } from "@shared/index";
import type { LPFormField } from "@/components/LPForm";

/**
 * base BODY（ベースボディ）赤坂見附 — Meta広告用LP。
 *
 * コンセプトは「鍛える前に、まず身体を知る。」の1本。LP全体を次の5語で貫く。
 *   ①鍛える前に、まず身体を知る ②理学療法の考え方・評価方法
 *   ③7つの動きから身体を知るFMS ④身体のクセから整える ⑤一人ひとりに合わせたピラティス
 *
 * 情報の優先順位: 制作指示書 > ヒアリング資料①② > 既存ページ（ペライチ）・公式サイト。
 * 構成・文字サイズの強弱は `seren-pilates` を基準にしている。
 *
 * **表現上の禁止事項（ヒアリング Q28）**
 *   スタッフ全員が理学療法士ではない。「理学療法士が必ず担当／全員を評価」と
 *   読める表現は使わない。基本表現は「理学療法の考え方や評価方法を取り入れた身体分析」。
 *   代表紹介でのみ「代表・熊田純一郎／理学療法士」と明記してよい。
 *   FMS を医療診断として書かない。「治る」「根本治療」「改善を保証」系の断定もしない。
 *
 * **公開前に顧客確認が必要な項目**は `confirm: true` を付けて
 * 画面上に【要確認】を出している。確認が取れたら外すこと。
 *
 * 「お客様の声」「代表について」のブロックは顧客指示（2026-10-03）により削除。
 *
 * 配色はブランドの既存色（ブラウン・グリーン）に縛られず、30〜50代女性向けに
 * 「上品・清潔・落ち着き・安心」で提案した3色構成（ヒアリング Q25）。
 *   - メイン #2F5560 … 深いスレートティール。白地 8:1。見出し・CTA・濃色の地。
 *   - 価格   #B0563E … テラコッタ。**1,000円／0円の数字だけ**に使う（白地 4.9:1）。
 *   - 地     #FBFAF7（ほぼ白）／#F4F0E8（グレージュ）／#EAF1F0（淡いミスト）。
 */

interface Slot {
  placeholder: string;
  src?: string | null;
  position?: string;
}

/** 価格の1行。`regular` は打ち消し線、`now` は特大で置く（「円」はレイアウト側）。 */
interface PriceLine {
  label: string;
  /** 価格の前に置く条件（「体験当日のご入会で」など）。 */
  condition?: string;
  regular: string;
  now: string;
}

export interface BaseBodyConfig {
  slug: string;
  status?: ClientStatus;
  meta: { title: string; description: string; ogpImage?: string };

  header: { brand: string; brandSub: string; station: string; walkPre: string; walkNum: string; walkPost: string };
  offerBar: { badge: string; pre: string; num: string; post: string };

  fv: {
    hero: Slot;
    /** メインコピー。写真下部のグラデーション上に白抜き明朝で置く。 */
    catchLines: string[];
    /** サブコピー。`[[…]]` で囲んだ語だけ大きくする。 */
    sub: string;
    /** FMS評価 × 身体分析 × パーソナルマシンピラティス */
    features: string[];
  };

  /** キャンペーン期限。オファーバー・価格カード・キャンペーン・追従フッター・フォームで使う。 */
  deadline: { short: string; date: string; dow: string };

  /** FV・キャンペーン・最終CTAで使い回す2本の価格。 */
  prices: { trial: PriceLine; admission: PriceLine };

  worry: {
    heading: string;
    items: string[];
    closing: { lead: string; not: string; but: string; tail: string };
  };

  reason: {
    kicker: string;
    heading: string;
    lead: string;
    factorsTitle: string;
    factors: string[];
    example: { label: string; body: string };
    conclusion: string;
    compare: { label: string; steps: string[]; strong?: boolean }[];
  };

  future: {
    heading: string;
    items: { num: string; title: string; body: string; img: Slot }[];
    closing: string;
    closingSub: string;
  };

  reasons: {
    heading: string;
    items: { num: string; title: string; body: string; img: Slot }[];
  };

  fms: {
    kicker: string;
    heading: string;
    lead: string;
    photo: Slot;
    body: string;
    moves: { num: string; verb: string; en: string }[];
    subPhotos: { img: Slot; caption: string }[];
    checkTitle: string;
    checks: string[];
    discovery: { label: string; body: string };
    purpose: { heading: string; body: string };
    note: string;
  };

  steps: {
    kicker: string;
    heading: string;
    items: { num: string; en: string; title: string; body: string; img: Slot }[];
    closing: string;
  };

  trial: {
    kicker: string;
    heading: string;
    photo: Slot;
    duration: { label: string; value: string; note?: string };
    items: { num: string; title: string; sub?: string }[];
    closing: string;
  };

  beginner: {
    heading: string;
    body: string;
    photo: Slot;
    items: string[];
    voice: string;
  };

  campaign: { heading: string; values: string[] };

  store: {
    heading: string;
    name: string;
    img: Slot;
    address: string;
    walkPre: string;
    walkNum: string;
    walkPost: string;
    hours: string;
    closed: string;
    route: string;
    mapEmbedSrc: string;
  };

  faq: { heading: string; items: { q: string; a: string; confirm?: boolean }[] };

  closing: { heading: string; lead: string; chips: string[] };

  cta: { main: string; sub: string; final: string; campaign: string; note: string };

  form: {
    kicker: string;
    heading: string;
    lead: string;
    fields: LPFormField[];
    submitLabel: string;
    microcopy: string;
    disclaimer: string;
  };

  sticky: { buttonText: string; showAfter: number };
  footer: { copyright: string };
}

const ASSET = "/clients/base-body";

/** 営業 10:00〜22:00、体験は90分なので最終の開始枠は20:00（既存ページの予約フォームと同じ）。 */
const timeOptions = [
  "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
].map((t) => ({ value: t, label: `${t}〜` }));

const formFields: LPFormField[] = [
  { name: "name", label: "お名前", type: "text", required: true, placeholder: "例）山田 花子" },
  { name: "kana", label: "フリガナ", type: "text", required: true, placeholder: "例）ヤマダ ハナコ" },
  { name: "tel", label: "電話番号", type: "tel", required: true, placeholder: "例）09012345678" },
  { name: "email", label: "メールアドレス", type: "email", required: true, placeholder: "例）example@mail.com" },
  { name: "date1", label: "体験希望日（第1希望）", type: "date", required: true },
  { name: "time1", label: "希望時間（第1希望）", type: "select", required: true, options: timeOptions, placeholder: "選択してください" },
  {
    name: "date2",
    label: "体験希望日（第2希望）",
    type: "date",
    required: true,
    hint: "第1希望とは別の日をお選びいただくと、ご案内がスムーズです。",
  },
  { name: "time2", label: "希望時間（第2希望）", type: "select", required: true, options: timeOptions, placeholder: "選択してください" },
  {
    name: "concerns",
    label: "気になっていること",
    type: "checkboxGroup",
    optionalTag: "任意・複数可",
    columns: 2,
    options: [
      { value: "姿勢（猫背・巻き肩・反り腰）", label: "姿勢（猫背・巻き肩・反り腰）" },
      { value: "肩や腰など身体の不調", label: "肩や腰など身体の不調" },
      { value: "身体が硬い", label: "身体が硬い" },
      { value: "運動不足・体力", label: "運動不足・体力" },
      { value: "将来の健康", label: "将来の健康" },
      { value: "その他", label: "その他" },
    ],
  },
  {
    name: "message",
    label: "ご質問・お身体について伝えておきたいこと",
    type: "textarea",
    optionalTag: "任意",
    rows: 4,
    placeholder: "例）以前、腰を痛めたことがあります。",
  },
];

const config: BaseBodyConfig = {
  slug: "base-body",
  status: "draft",
  meta: {
    title: "【初回体験1,000円】鍛える前に、まず身体を知る。｜base BODY 赤坂見附のパーソナルマシンピラティス",
    description:
      "7つの動きから身体のクセをチェック。理学療法の考え方を取り入れた身体分析で、あなたに合ったマンツーマンのマシンピラティスを。10月31日までの期間限定で、通常11,000円の体験が初回1,000円。体験当日のご入会で入会金0円。赤坂見附駅徒歩30秒。",
    /* 相対パスは metadataBase が別ドメインに解決されるため、本番の絶対URLで持つ。 */
    ogpImage: "https://fitness-lp.commitad.com/clients/base-body/ogp.jpg",
  },

  header: {
    brand: "base BODY ピラティス",
    brandSub: "ベースボディ｜パーソナルマシンピラティス",
    station: "赤坂見附駅",
    walkPre: "徒歩",
    walkNum: "30",
    walkPost: "秒",
  },

  offerBar: { badge: "10/31まで", pre: "初回体験", num: "1,000", post: "円" },

  fv: {
    hero: {
      placeholder: "女性インストラクターのマンツーマン指導",
      src: `${ASSET}/hero.jpg`,
      position: "30% 22%",
    },
    catchLines: ["鍛える前に、", "まず身体を知る。"],
    sub: "[[7つ]]の動きから身体のクセをチェック。\n理学療法の考え方を取り入れた身体分析で、\nあなたに合ったピラティスを。",
    features: ["FMS評価", "身体分析", "パーソナル\nマシンピラティス"],
  },

  /* 体験1,000円は 2026-10-31（土）までの期間限定（顧客指示 2026-10-03）。 */
  deadline: { short: "10/31まで", date: "10月31日", dow: "土" },

  prices: {
    trial: { label: "初回体験", regular: "11,000", now: "1,000" },
    admission: { label: "入会金", condition: "体験当日のご入会で", regular: "22,000", now: "0" },
  },

  worry: {
    heading: "こんなお悩み、\nありませんか？",
    items: [
      "鏡を見ると、猫背や巻き肩が気になる",
      "姿勢を意識しても、\n気づくと元に戻っている",
      "最近、身体が硬くなった気がする",
      "肩や腰など、身体の不調が気になる",
      "運動したいけれど、\n何から始めればいいか分からない",
      "自己流の運動が、\n自分に合っているのか分からない",
    ],
    closing: {
      lead: "もしかすると必要なのは、",
      not: "「もっと頑張って運動すること」",
      but: "「今の自分の身体を\n知ること」",
      tail: "かもしれません。",
    },
  },

  reason: {
    kicker: "WHY",
    heading: "なぜ、まず\n身体を知ることが\n大切なのか？",
    lead: "姿勢や身体の動きは、\n「筋力が足りない」「身体が硬い」\nだけで決まるものではありません。",
    factorsTitle: "身体には、一人ひとり違いがあります",
    factors: ["柔軟性", "関節の動き", "バランス", "左右差", "身体の使い方", "力の入り方"],
    example: {
      label: "たとえば",
      body: "身体に力が入りすぎていることで、巻き肩や猫背のような姿勢につながっているケースもあります。",
    },
    conclusion: "だからこそ、\n「何をするか」を決める前に、\n「今、自分の身体がどう動いているか」\nを知ることが大切です。",
    compare: [
      { label: "よくある始め方", steps: ["運動する"] },
      { label: "base BODYの始め方", steps: ["身体を知る", "整える", "動かす"], strong: true },
    ],
  },

  future: {
    heading: "base BODYで\n目指せる未来",
    items: [
      {
        num: "01",
        title: "自然ときれいな姿勢へ",
        body: "無理に胸を張り続けるのではなく、身体を正しく使える状態を目指します。",
        img: { placeholder: "姿勢", src: `${ASSET}/future-01.jpg`, position: "58% 30%" },
      },
      {
        num: "02",
        title: "軽やかに動ける身体へ",
        body: "身体のクセを知り、必要な動きを身につけることで、日常生活も軽やかに。",
        img: { placeholder: "動ける身体", src: `${ASSET}/future-02.jpg`, position: "55% 40%" },
      },
      {
        num: "03",
        title: "自分の身体が分かる",
        body: "今まで気づかなかった身体のクセや、苦手な動きを知ることができます。",
        img: { placeholder: "身体を知る", src: `${ASSET}/future-03.jpg`, position: "60% 40%" },
      },
      {
        num: "04",
        title: "10年先も美しく、\n健康に動ける身体へ",
        body: "今だけではなく、これから先も自分らしく動ける身体づくりを。",
        img: { placeholder: "10年先の身体", src: `${ASSET}/future-04.jpg`, position: "38% 40%" },
      },
    ],
    closing: "変わるのは、\n見た目だけではありません。",
    closingSub: "姿勢、動きやすさ、そして健康。\nその先に、年齢を重ねても続く美しさを。",
  },

  reasons: {
    heading: "base BODYが\n選ばれる5つの理由",
    items: [
      {
        num: "01",
        title: "理学療法の考え方を取り入れた\n身体分析",
        body: "姿勢・関節の動き・筋力・柔軟性・バランス・呼吸までを多角的にチェック。見た目の姿勢だけでなく、「身体がどう動いているのか」まで確認します。",
        img: { placeholder: "姿勢・関節の動きのチェック", src: `${ASSET}/reason-01.jpg`, position: "45% 30%" },
      },
      {
        num: "02",
        title: "7つの動きから身体を知る\nFMS評価",
        body: "しゃがむ・またぐ・踏み込むなど、7つの基本的な動作から、左右差やバランス、身体の使い方のクセを確認。自分では気づきにくいクセが見えてきます。",
        img: { placeholder: "FMS評価", src: `${ASSET}/reason-02.jpg`, position: "50% 45%" },
      },
      {
        num: "03",
        title: "一人ひとりに合わせた\nマンツーマンピラティス",
        body: "評価の結果をもとに、その方の身体・体力・動きに合わせて内容を組み立てる、オーダーメイドのレッスン。決められたメニューではなく、「今の自分に必要な運動」を行えます。",
        img: { placeholder: "マンツーマンのマシンピラティス", src: `${ASSET}/reason-03.jpg`, position: "55% 45%" },
      },
      {
        num: "04",
        title: "必要に応じて\n骨格調整・ストレッチも",
        body: "硬くなっている部分を骨格調整やストレッチで整え、身体を動かしやすい状態にしてからピラティスへ。ただ鍛えるだけではない、「整えてから動く」進め方です。",
        img: { placeholder: "ストレッチ・骨格調整", src: `${ASSET}/reason-04.jpg`, position: "55% 40%" },
      },
      {
        num: "05",
        title: "姿勢だけでなく、\n10年先まで考えた身体づくり",
        body: "目指すのは、きれいな姿勢と、これから先も自分の足で軽やかに動ける身体。健康と美しさの両方を、今から整えていきます。",
        img: { placeholder: "10年先の身体づくり", src: `${ASSET}/reason-05.jpg`, position: "45% 35%" },
      },
    ],
  },

  fms: {
    kicker: "FMS｜Functional Movement Screen",
    heading: "自分でも気づかない\n“身体のクセ”を見える化。",
    lead: "まずは、今の身体の動き方を知ることから。",
    photo: { placeholder: "身体の動きをチェックしている様子", src: `${ASSET}/fms-main.jpg`, position: "50% 45%" },
    body: "base BODYでは、7つの基本的な動作から、あなたの身体の動き方を確認します。その評価に使用するのが「FMS（ファンクショナル・ムーブメント・スクリーン）」です。",
    moves: [
      { num: "01", verb: "しゃがむ", en: "Deep Squat" },
      { num: "02", verb: "またぐ", en: "Hurdle Step" },
      { num: "03", verb: "踏み込む", en: "In-line Lunge" },
      { num: "04", verb: "肩を動かす", en: "Shoulder Mobility" },
      { num: "05", verb: "脚を上げる", en: "Active Straight Leg Raise" },
      { num: "06", verb: "体幹で支える", en: "Trunk Stability Push-up" },
      { num: "07", verb: "対角に伸ばす", en: "Rotary Stability" },
    ],
    subPhotos: [
      { img: { placeholder: "またぐ動き", src: `${ASSET}/fms-sub-1.jpg`, position: "35% 50%" }, caption: "02 またぐ" },
      { img: { placeholder: "対角に伸ばす動き", src: `${ASSET}/fms-sub-2.jpg`, position: "55% 55%" }, caption: "07 対角に伸ばす" },
    ],
    checkTitle: "たとえば、こんなことを確認します",
    checks: [
      "左右の動きに違いはある？",
      "バランスは取れている？",
      "身体をスムーズに動かせている？",
      "必要な可動性はある？",
      "必要以上に力が入っていない？",
    ],
    discovery: {
      label: "受けた方が驚くのは…",
      body: "柔軟性よりも、「思っていた以上にバランスが取れていなかった」という気づき。運動に慣れている方でも、力が入りすぎて上手く脱力できていないことに気づくケースがあります。",
    },
    purpose: {
      heading: "大切なのは、\n良い・悪いを判定することでは\nありません。",
      body: "結果をもとに、\n「今のあなたにどんな運動が必要なのか」\nを考えるために使います。",
    },
    note: "※FMSは動作の評価ツールです。\n医療機関での診断・治療ではありません。",
  },

  steps: {
    kicker: "base BODYの進め方",
    heading: "知る → 整える → 動かす",
    items: [
      {
        num: "01",
        en: "KNOW",
        title: "身体を知る",
        body: "FMSなどを用いて、姿勢・身体の動き・バランスなどをチェック。",
        img: { placeholder: "身体の動きのチェック", src: `${ASSET}/step-know.jpg`, position: "55% 35%" },
      },
      {
        num: "02",
        en: "CONDITION",
        title: "身体を整える",
        body: "必要に応じて骨格調整やストレッチで、身体を動かしやすい状態へ。",
        img: { placeholder: "骨格調整・ストレッチ", src: `${ASSET}/step-condition.jpg`, position: "50% 50%" },
      },
      {
        num: "03",
        en: "MOVE",
        title: "自分に必要な動きをする",
        body: "評価結果をもとに、マンツーマンでマシンピラティス。",
        img: { placeholder: "マンツーマンのマシンピラティス", src: `${ASSET}/step-move.jpg`, position: "45% 45%" },
      },
    ],
    closing: "いきなり運動するのではなく、\nまず身体を知ることから。",
  },

  trial: {
    kicker: "初回体験レッスン",
    heading: "1,000円の体験で、\nここまで身体を見ていきます。",
    photo: { placeholder: "カウンセリングの様子", src: `${ASSET}/trial.jpg`, position: "50% 40%" },
    duration: { label: "所要時間", value: "90分" },
    items: [
      { num: "1", title: "カウンセリング", sub: "お悩みや目標、身体のことを伺います" },
      { num: "2", title: "姿勢・身体の動きをチェック", sub: "FMSなどを使用した身体評価" },
      { num: "3", title: "身体の状態をご説明", sub: "結果をもとに、今の身体の状態をお伝えします" },
      { num: "4", title: "必要に応じたコンディショニング", sub: "骨格調整・ストレッチなど" },
      { num: "5", title: "身体評価をもとにした\nマンツーマンマシンピラティス" },
      { num: "6", title: "今後の身体づくりについてご案内" },
    ],
    closing: "チェックして、整えて、動かすまで。\n初回からしっかり身体を見ていきます。",
  },

  beginner: {
    heading: "運動が苦手でも、\n大丈夫です。",
    body: "base BODYは、「ピラティスができる人が行く場所」ではありません。運動に不安がある方こそ、相談していただきたい場所です。その日の身体の状態に合わせて、無理のないところから始めます。",
    photo: { placeholder: "女性スタッフと会話している様子", src: `${ASSET}/beginner.jpg`, position: "60% 35%" },
    items: [
      "ピラティス未経験OK",
      "身体が硬くてもOK",
      "運動が苦手でもOK",
      "体力に自信がなくてもOK",
      "マンツーマン",
      "その日の身体に合わせて調整",
      "ウェアレンタルあり",
      "赤坂見附駅 徒歩30秒",
    ],
    voice: "運動が苦手だった50代の方も、自分の身体やその日の状態に合わせた指導で、無理なく続けられています。",
  },

  campaign: {
    heading: "初回限定",
    values: ["FMS評価", "身体分析", "マンツーマン", "90分"],
  },

  store: {
    heading: "店舗のご案内",
    name: "base BODY",
    img: { placeholder: "スタジオ内観", src: `${ASSET}/studio.jpg`, position: "50% 50%" },
    address: "東京都港区赤坂3-9-1\n紀陽ビル 6F",
    walkPre: "赤坂見附駅 徒歩",
    walkNum: "30",
    walkPost: "秒",
    hours: "10:00〜22:00",
    closed: "不定休",
    route: "赤坂見附駅10番出口を出て向かい側へ渡り、右へ直進。大戸屋から2つ先のビルの6階です。",
    mapEmbedSrc:
      "https://maps.google.com/maps?q=" +
      /* 住所だけだと名前なしのピンになるので、Googleマップの登録名（base BODY 港区赤坂）で引く。 */
      encodeURIComponent("base BODY 港区赤坂 東京都港区赤坂3-9-1") +
      "&z=17&output=embed",
  },

  faq: {
    heading: "よくあるご質問",
    items: [
      {
        q: "ピラティス未経験・運動が苦手でも大丈夫ですか？",
        a: "大丈夫です。最初に身体の状態を確認し、その日の体調や体力に合わせて内容を組み立てます。運動経験のない方も多く通われていますので、安心してお越しください。",
      },
      {
        q: "身体が硬くてもできますか？",
        a: "できます。必要に応じてストレッチや骨格調整で身体を動かしやすい状態にしてから、ピラティスを行います。",
      },
      {
        q: "FMSとは何ですか？",
        a: "しゃがむ・またぐ・踏み込むなど、7つの基本的な動作から、身体の動き方や左右差、バランス、身体の使い方の傾向を確認する評価ツールです。良い・悪いを判定するためではなく、あなたに必要な運動を考えるために使います。",
      },
      {
        q: "FMSは痛い検査ですか？",
        a: "器具を使って身体を押したりするものではなく、基本的な動作を行っていただき、その動き方を確認するものです。痛みや不安のある動きは、事前にお伝えください。",
        confirm: true,
      },
      {
        q: "何を持っていけばいいですか？",
        a: "基本的にご用意いただくものはありません。ウェア・タオル・お水は無料でご用意しています（ご自身のものをお持ちいただいてもOKです）。レッスンは裸足で行います。",
      },
      {
        q: "体験はどのくらい時間がかかりますか？",
        a: "カウンセリングを含めて90分です。",
      },
      {
        q: "体験後に、必ず入会しなければいけませんか？",
        a: "いいえ、その必要はありません。無理な勧誘はいたしません。体験後にご案内はいたしますが、最終的なご判断はお客様ご自身にお任せしています。",
      },
    ],
  },

  closing: {
    heading: "鍛える前に、\nまず身体を知る。",
    lead: "今の身体を知ることから、\n始めてみませんか？",
    chips: ["FMSによる身体チェック", "理学療法の考え方を取り入れた身体分析", "パーソナルマシンピラティス"],
  },

  cta: {
    main: "1,000円で体験してみる",
    sub: "まずは自分の身体を知ってみる",
    campaign: "1,000円で体験する",
    final: "1,000円で体験レッスンを予約する",
    note: "初回体験 90分｜無理な勧誘はいたしません",
  },

  form: {
    kicker: "RESERVATION",
    heading: "体験レッスンのご予約",
    lead: "ご希望の日時を2つお選びください。\n確認のうえ、スタッフからご連絡いたします。",
    fields: formFields,
    submitLabel: "この内容で体験を予約する",
    microcopy: "初回体験 1,000円（税込）｜無理な勧誘なし",
    disclaimer: "ご入力いただいた情報は、体験レッスンのご案内のためにのみ使用いたします。",
  },

  sticky: { buttonText: "1,000円で体験してみる", showAfter: 700 },
  footer: { copyright: "© base BODY" },
};

export default config;
