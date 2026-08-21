import type { ClientStatus } from "@shared/index";
import type { LPFormField } from "@/components/LPForm";

/**
 * ritsu pilates（錦糸町 / 旧 bloom pilates）— 完全コード版LP。
 *
 * 元LP（画像スタック）: https://pilates.commitad.com/bloom-pilates/01/
 * 成果が出ているデザインを「見た目そのまま」コードで再現する（テキスト・レイアウト・
 * バッジ・料金表・チェックリスト・王冠・グラデ等はすべて HTML/CSS 化）。写真のみ
 * `photos/` 配下の画像を使う（元合成画像から切り出し）。
 * 基盤要件（タグ注入・CV受信）を満たすため LPShell でラップし、フォームは LPForm を使用。
 * slug/URL は bloom-pilates のまま維持。
 */
const ASSET = "/clients/bloom-pilates";
const PH = `${ASSET}/photos`;

/** 元LPの体験希望時間スロット（7:00〜19:00 / 90分刻み）。 */
const timeOptions = [
  "7:00", "8:30", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00",
].map((t) => ({ value: t, label: t }));

const formFields: LPFormField[] = [
  { name: "name", label: "お名前", type: "text", required: true, placeholder: "山田花子" },
  { name: "email", label: "メールアドレス", type: "email", required: true, placeholder: "yamada@xxx.com" },
  { name: "tel", label: "電話番号", type: "tel", required: true, placeholder: "01234567890" },
  { name: "date1", label: "体験希望日 第一希望", type: "date", required: true },
  { name: "hour1", label: "希望時間", type: "select", required: true, options: timeOptions, placeholder: "---" },
  { name: "date2", label: "体験希望日 第二希望", type: "date", required: true },
  { name: "hour2", label: "希望時間", type: "select", required: true, options: timeOptions, placeholder: "---" },
  { name: "date3", label: "体験希望日 第三希望", type: "date", optionalTag: "任意" },
  { name: "hour3", label: "希望時間", type: "select", options: timeOptions, placeholder: "---", optionalTag: "任意" },
  { name: "message", label: "ご質問・ご相談内容", type: "textarea", rows: 4, optionalTag: "任意" },
];

/** マシンピラティス × 専用カルテ の2本柱（複数セクションで再利用）。 */
const pillars = [
  { eyebrow: "パーソナル", label: "マシン\nピラティス" },
  { eyebrow: "あなただけの", label: "専用カルテ" },
];

const config = {
  slug: "bloom-pilates",
  status: "draft" as ClientStatus,

  meta: {
    title: "ritsu pilates",
    description: "ritsu pilates｜錦糸町駅徒歩2分のパーソナルピラティススタジオ。90分の体験レッスンが今なら0円。",
    ogpImage: `${PH}/hero.jpg`,
  },

  primary: "#fd7b43",
  cream: "#fefbe3",
  headerBg: "#fdfbe4",
  ink: "#3f3a36",
  maxWidth: 750,
  asset: ASSET,

  stationBadge: { pre: "錦糸町駅 徒歩", num: "2", post: "分" },
  logo: `${ASSET}/logo.png`,

  pillars,

  hero: {
    newOpen: "2026年4月22日 NEWOPEN！",
    photo: `${PH}/hero.jpg`,
    catch: ["美しい姿勢は、", "生き方にあらわれる。"],
    bubbles: ["肩こり", "腰痛", "猫背", "関節痛"],
    lead: "あらゆる不調を整える",
    headline: "根本ケア習慣",
    stat: { num: "92", unit: "%", tail: "が効果を実感した、", emph: "身体の言語化ピラティス" },
    statNote: "専用カルテで\n「変わる理由」が明確に",
  },

  offer: {
    band: { badge: "先着\n10名様", title: "OPENキャンペーン！", note: "7月31日", noteTail: "までにご予約いただいた方限定" },
    trial: {
      kicker: "マンツーマンのピラティス",
      title: "90分のお試し体験",
      wasLabel: "通常価格",
      was: "5,000円",
      wasTax: "税込",
      arrow: "初回トライアル",
      now: "0円",
      badges: [
        { label: "カウンセリング", icon: "clipboard" },
        { label: "姿勢分析", icon: "posture" },
        { label: "マシンピラティス", icon: "reformer" },
      ],
      photos: [`${PH}/cp1.jpg`, `${PH}/cp2.jpg`],
    },
    join: {
      divider: "さらに",
      heading: "体験当日のご入会で！",
      rows: [
        { label: "入会金", was: "通常 20,000円", now: "0円" },
        { label: "事務手数料", was: "通常 3,000円", now: "0円" },
      ],
      redBadge: "今なら",
      redLabel: "初月月会費",
      redNow: "0円",
    },
  },

  about: {
    kicker: "パーソナルピラティススタジオ",
    brand: "ritsu pilates",
    brandTail: "とは？",
    headline: ["Wのボディメソッドを", "【融合】"],
    photo: `${PH}/about.jpg`,
    highlight: ["姿勢・呼吸・身体のクセをチェックして", "一人ひとりに合わせたレッスンを"],
  },

  problem: {
    title: ["こんな", "お悩み", "ありませんか？"],
    items: [
      [["デスクワーク続きで、"], ["肩こりや腰痛が慢性化", true], ["している"]],
      [["鏡を見るたび、"], ["猫背や巻き肩、反り腰", true], ["が気になる"]],
      [["寝ても"], ["疲れが取れず", true], ["、なんとなく"], ["身体がだるい", true]],
      [["グループレッスンでは、自分の動きが"], ["正しいのか不安", true]],
      [["ハードなトレーニングは苦手。でも、"], ["身体を根本から変えたい", true]],
    ] as [string, boolean?][][],
    bridge: "自己流で対策しても…",
    concerns: [
      { caption: "キツイ運動が\n続かない…", photo: `${PH}/p1.jpg` },
      { caption: "頑張っても\n変わらない…", photo: `${PH}/p2.jpg` },
      { caption: "正しくできて\nいるのか？", photo: `${PH}/p3.jpg` },
    ],
    mainPhoto: `${PH}/pmain.jpg`,
    conclusions: ["自己流では限界がある！", "頑張っても逆に崩れる！"],
  },

  solution: {
    band: "こんな方こそ試してみてほしい",
    brand: "ritsu pilates",
    brandTail: "の",
    headline: "根本ケア習慣",
    verticalCatch: "通うたびに変わる身体を実感。",
    photo: `${PH}/solution.jpg`,
    body: "当スタジオでは、一人ひとりの骨格や筋肉の動きを見極め、身体に本来の正しい使い方を身につけていきます。",
  },

  method: {
    kicker: "ritsu pilates",
    lead: "あらゆる不調を整える",
    headline: "根本ケアメソッド",
    items: [
      {
        no: "METHOD 01",
        eyebrow: "MACHINE PILATES",
        title: "マシンピラティス",
        sub: "マシンで実現する、精密な身体コントロール",
        photo: `${PH}/m01a.jpg`,
        body: "一人ひとりの身体の状態に合わせて、最適な動きと負荷を丁寧に設計。なんとなく動くのではなく、「効かせるべき場所に、正しく効かせる」ことで、無駄のない変化へ導きます。",
        highlight: ["当スタジオ「ritsu pilates」では", "最新マシンや設備を完備"],
        photo2: `${PH}/m01b.jpg`,
        body2: "ピラティス専用の「リフォーマー」や「キャデラック」をはじめ、厳選された多彩なマシンとプロップスを完備。さらに！オーバーボールやフォームローラーなど、細やかなボディメイクを叶えるアイテムも充実しています。",
      },
      {
        no: "METHOD 02",
        eyebrow: "PERSONALIZED BODY ASSESSMENT",
        title: "あなた専用のカルテ",
        sub: "身体を“見える化”するパーソナル分析",
        photo: `${PH}/m02.jpg`,
        body: "人の身体はそれぞれ異なります。100人いれば、100通りの身体。だからこそ、画一的ではない、あなたに最適な方法で整えていきます。",
        karteQ: "専用のカルテって何？",
        karteA: "専用カルテをもとに、身体の状態を分かりやすく可視化。",
        karteIcons: ["姿勢や歪みを\n細かくチェック", "身体のバランス\nやクセを把握", "最適な\nアプローチを設計"],
      },
    ],
  },

  invite: {
    lead: "1度で変化を実感できる",
    catch: ["さぁ！", "あなたも", "今"],
    photo: `${PH}/try.jpg`,
    brand: "ritsu pilates",
    tail: "ではじめませんか？",
  },

  flow: {
    title: "お試し体験の流れ",
    steps: [
      { no: "01", title: "体験レッスン予約", photo: `${PH}/flow1.jpg`, body: "当ページの入力フォームにて必要事項を入力しお気軽にご予約ください。初心者の方でも安心して参加できるよう、丁寧にサポートします。" },
      { no: "02", title: "ご来店・お着替え", photo: `${PH}/flow2.jpg`, body: "ご来店後、受付を済ませていただき、お着替えへご案内いたします。リラックスした状態でレッスンを始めていただけます。" },
      { no: "03", title: "カウンセリング", photo: `${PH}/flow3.jpg`, body: "ヒアリングと身体の状態チェックをもとに、姿勢やお悩み、生活習慣などを丁寧に確認していきます。（約10分）" },
      { no: "04", title: "レッスンを体験", photo: `${PH}/flow4.jpg`, body: "姿勢チェックをもとに、骨格や筋肉の状態に合わせたオーダーメイドレッスンを行います。（約60分）" },
      { no: "05", title: "フィードバック", photo: `${PH}/flow5.jpg`, body: "レッスン後は専用カルテをもとに身体の状態を分かりやすくご説明します。ご自宅でできるエクササイズもお伝えします。（約20分）" },
    ],
  },

  access: {
    kicker: "ritsu pilates",
    title: "スタジオのご案内",
    tags: ["パーソナルピラティス", "完全予約制"],
    badge: "錦糸町駅より徒歩2分",
    rows: [
      { label: "営業時間", lines: ["【平日】10:00〜21:00", "【土日祝】7:00〜19:00", "【定休日】定休日なし"] },
      { label: "TEL", lines: ["03-4400-7251"] },
      { label: "住所", lines: ["〒130-0013", "東京都墨田区錦糸 2-4-12", "イーストビル錦糸町Ⅱ 501・502"] },
    ],
  },

  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.1502429412494!2d139.81029167580198!3d35.6979202290571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188929ccbd2b03%3A0x2434524044bd7ed7!2z5pel5pys44CB44CSMTMwLTAwMTMg5p2x5Lqs6YO95aKo55Sw5Yy66Yym57O477yS5LiB55uu77yU4oiS77yR77yS!5e0!3m2!1sja!2sth!4v1777375005227!5m2!1sja!2sth",

  form: {
    title: "無料体験のご予約",
    fields: formFields,
    submitLabel: "送信",
  },

  cta: { label: "お試し体験予約はこちら" },
};

export default config;
