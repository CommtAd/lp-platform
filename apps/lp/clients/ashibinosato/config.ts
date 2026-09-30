import type { PatternCConfig } from "@/clients/pattern-c.types";

const ASSET = "/clients/ashibinosato";

/**
 * 奈良町あしびの郷ウエディング — ブライダルフェア（パターンC）。
 *
 * lavantscene の config を写して作り、原稿・写真・会場情報は指示書（2026-09-30 受領）の
 * ものに差し替えた。装飾（飾り罫・フレーム・おすすめ/流れのアイコン）は
 * パターンC共通の部品として lavantscene から引き継いでいる。
 * 金額・適用条件・日付は顧客確認を取ってから変更すること。
 */
const config: PatternCConfig = {
  slug: "ashibinosato",
  status: "draft",
  meta: {
    title: "奈良町あしびの郷ウエディング｜1日1組貸切×豪華試食付きBIGフェア",
    description:
      "奈良町「あしびの郷ウエディング」の1日1組貸切ブライダルフェア。ご来館で国産和牛・旬食材の和洋コース豪華無料試食＋3,000円分ギフト券、ご成約で最大70万円分の15大特典をご用意。最短30秒でご予約いただけます。",
    // OGP専用の1枚（1200x630）。会場紹介のチャペル写真から切り出したもので、
    // ファイルは別に持つ。差し替えるときは必ずファイル名も変えること（SNSのキャッシュ対策）。
    ogpImage: `${ASSET}/ogp-2026-09-30.jpg`,
  },
  ink: "#3B3730",
  accent: "#B99653",
  paper: "#FBF8F3",

  // 特典バンドの配色は lavantscene から引き継いだもの（#A49483 × 白）。
  // 金額はすべて白プレート＋深い金に逃がしてあるので、地を変えても桁は読める。
  band: {
    bg: "#A49483",
    text: "#FFFFFF",
    accent: "#FFFFFF",
    rule: "rgba(255,255,255,0.5)",
  },

  header: {
    // ロゴは未支給のため会場名テキストで出す。支給されたら lavantscene と同じく logo を渡す。
    venue: "奈良町あしびの郷ウエディング",
    // CTAボタンは非表示（会場名が中央寄せになる）。追従バーが常時出ているので導線は確保されている。
    sticky: false,
  },

  fv: {
    brand: "奈良で見つける、ふたりらしい結婚式。",
    kicker: "＼毎月満席の人気フェア、今月も開催！／",
    catch: ["1日1組貸切×豪華試食付き", "BIGフェア"],
    framed: true,
    ornament: {
      top: `${ASSET}/fv-ornament-top.png`,
      bottom: `${ASSET}/fv-ornament-bottom.png`,
      // lavantscene と同じ詰め（罫と本文のアキを上下とも約8pxに揃える）。
      gap: -20,
      gapBottom: -20,
    },
    highlight: "豪華試食＋最大70万円分 プレゼント！",
    highlightSize: 17,
    ctaText: "最短30秒で予約する",
    catchPosition: "top",
    catchTopInset: 12,
    // 支給は4枚とも横位置（3:2）。中央で3:4に切り出している。
    // hero = 庭のバルーン演出 / hero-2 = チャペル / hero-3 = 披露宴会場 / hero-4 = 緑の小径。
    heroAspect: "3 / 4",
    hero: {
      placeholder: "庭でのバルーンリリース",
      src: `${ASSET}/hero.jpg`,
      position: "center",
    },
    heroSlides: [
      { placeholder: "チャペル（新郎新婦）", src: `${ASSET}/hero-2.jpg` },
      { placeholder: "披露宴会場（和装の新郎新婦）", src: `${ASSET}/hero-3.jpg` },
      { placeholder: "緑の小径を歩く新郎新婦", src: `${ASSET}/hero-4.jpg` },
    ],
  },

  // FVを離脱する前に来館特典だけ持ち帰ってもらうための要約。詳細は privilege 側。
  // 写真は privilege と同一。同じ特典なので別カットにすると別物に見える。
  fvSummary: {
    label: "来館特典",
    headline: "＼列席者アンケート1位／",
    headlinePosition: "afterLabel",
    items: [
      {
        amount: "無料",
        name: "国産和牛×旬食材\n和洋コース試食",
        image: { placeholder: "和洋コースの一皿", src: `${ASSET}/gift-tasting.jpg` },
      },
      {
        amount: "3,000円分",
        name: "ギフト券",
        // lavantscene と同じギフトの写真。
        image: { placeholder: "ギフトボックス", src: `${ASSET}/gift-card.jpg` },
      },
    ],
  },

  // 成約特典。指示書の並び（貸切ウェディング → 15大特典 → 優待価格）をそのまま上から積む。
  grandOffer: {
    eyebrow: "ご成約特典",
    heading: "プレミアムブライダルフェア",
    lead: "1日1組だけの貸切ウェディング\nー時間も空間も、ふたりとゲストだけー",
    title: "15大特典付き",
    amount: "最大70万円分 プレゼント！",
    frame: `${ASSET}/grand-offer-frame.png`,
    note: "挙式・衣裳・スナップ写真などご優待価格にてご案内",
  },

  experience: {
    heading: "このフェアで体験できること",
    lead: "チャペルからお料理、お見積りまで。当日のすべてをご確認いただけます。",
    items: [
      {
        tag: "01",
        title: "チャペル見学",
        body: "実際の挙式会場を見学しながら、当日の雰囲気をご体感いただけます。",
        image: { placeholder: "チャペル", src: `${ASSET}/exp-chapel.jpg` },
      },
      {
        tag: "02",
        title: "披露宴会場見学",
        body: "披露宴会場をご覧いただきながら、おふたりらしい結婚式をご提案いたします。",
        image: { placeholder: "披露宴会場", src: `${ASSET}/exp-banquet.jpg` },
      },
      {
        tag: "03",
        title: "豪華無料試食",
        body: "国産和牛と季節の食材を使った和洋コースをご試食いただき、おもてなしのイメージをご確認いただけます。",
        image: { placeholder: "婚礼料理のテーブル", src: `${ASSET}/exp-tasting.jpg` },
      },
      {
        // forest-terrace-hiroshima と同じ原稿・写真（指示書の指定）。
        tag: "04",
        title: "見積もり相談",
        body: "ご予算やご希望の日程に合わせて、専属プランナーが丁寧にご案内いたします。",
        image: {
          placeholder: "プランナーとのお見積り相談カット",
          src: `${ASSET}/planner.jpg`,
        },
      },
    ],
  },

  recommend: {
    heading: "このフェアがおすすめな方",
    items: [
      { label: "初めて式場見学をする", icon: `${ASSET}/rec-planner.png` },
      { label: "何から始めればいいか分からない", icon: `${ASSET}/rec-question.png` },
      { label: "費用が気になる", icon: `${ASSET}/rec-cost.png` },
      { label: "少人数婚も相談したい", icon: `${ASSET}/rec-couple.png` },
    ],
  },

  privilege: {
    heading: "ご来館特典・ご成約特典",
    lead: "フェアにご参加いただいた方にご用意しています。",
    items: [
      {
        title: "和洋コース\n豪華無料試食",
        amount: "無料",
        image: { placeholder: "和洋コースの一皿", src: `${ASSET}/gift-tasting.jpg` },
      },
      {
        title: "ギフト券",
        amount: "3,000円分",
        image: { placeholder: "ギフトボックス", src: `${ASSET}/gift-card.jpg` },
      },
    ],
    frame: `${ASSET}/privilege-frame.png`,
    contract: {
      label: "さらに、ご成約で",
      amount: "最大70万円分の15大特典",
      inkAfterAmount: true,
      footer: "プレゼント！",
      outset: 8,
    },
  },

  facility: {
    heading: "会場のご紹介",
    lead: "奈良町の緑に包まれた、1日1組の貸切会場",
    // 支給素材を 3:2 に揃えて受ける。
    aspect: "3 / 2",
    bodySize: 13,
    items: [
      {
        tag: "01",
        title: "緑と光に包まれるチャペル",
        body: "自然光と豊かな緑を感じながら、温かみのある挙式が叶います。",
        image: { placeholder: "チャペル", src: `${ASSET}/facility-chapel.jpg` },
      },
      {
        tag: "02",
        title: "1日1組限定の完全貸切",
        body: "時間や周りを気にせず、ふたりとゲストだけでゆったり過ごせる特別な一日を",
        image: { placeholder: "ガーデンでのパーティー", src: `${ASSET}/facility-private.jpg` },
      },
      {
        tag: "03",
        title: "開放感あふれる披露宴会場",
        body: "大きな窓から自然光が差し込む空間で、ゲストとの距離が近いアットホームなパーティを",
        image: { placeholder: "披露宴会場", src: `${ASSET}/facility-banquet.jpg` },
      },
      {
        tag: "04",
        title: "奈良町ならではのロケーション",
        body: "歴史ある街並みと自然が調和する奈良町で、ここでしか叶わないウェディングを",
        image: { placeholder: "奈良町の庭園", src: `${ASSET}/facility-naramachi.jpg` },
      },
    ],
  },

  flow: {
    heading: "当日の流れ",
    // 所要時間は指示書に無いので囲みごと出さない（lead 未設定）。
    steps: [
      {
        num: "1",
        title: "受付",
        icon: `${ASSET}/flow-01.png`,
        body: "ご希望の結婚式のイメージやご要望をお伺いします。",
      },
      {
        num: "2",
        title: "見学・試食",
        icon: `${ASSET}/flow-02.png`,
        body: "チャペルや披露宴会場を実際にご見学いただきます。また、国産和牛と旬食材の和洋コースをご試食いただけます。",
      },
      {
        num: "3",
        title: "相談・見積り",
        icon: `${ASSET}/flow-03.png`,
        body: "ご予算や日程について詳しくご案内いたします。",
      },
    ],
  },

  access: {
    heading: "アクセス",
    venueName: "奈良町あしびの郷ウエディング",
    address: "〒630-8337 奈良県奈良市脇戸町29",
    routes: ["近鉄奈良駅から徒歩10分", "JR奈良駅から徒歩20分"],
    mapEmbed: { query: "奈良県奈良市脇戸町29 あしびの郷" },
    map: {
      placeholder: "会場外観",
      src: `${ASSET}/venue-exterior.jpg`,
    },
  },

  form: {
    heading: "ブライダルフェアのご予約",
    lead: "下記フォームよりご希望の日程をお知らせください。\n担当プランナーよりご連絡いたします。",
    tone: "light",
    fields: [
      { type: "text", name: "name", label: "お名前", required: true, placeholder: "山田 太郎" },
      { type: "tel", name: "tel", label: "電話番号", required: true, placeholder: "090-0000-0000" },
      {
        type: "email",
        name: "email",
        label: "メールアドレス",
        required: true,
        placeholder: "example@mail.com",
      },
      { type: "date", name: "visit_date_1", label: "ご来館希望日（第一希望）", required: true },
      { type: "date", name: "visit_date_2", label: "ご来館希望日（第二希望）", required: true },
      { type: "date", name: "visit_date_3", label: "ご来館希望日（第三希望）", required: true },
      {
        // 挙式の招待人数ではなく、フェア当日に来館する人数。
        type: "select",
        name: "guests",
        label: "ご来館人数",
        required: true,
        placeholder: "選択してください",
        // 「1名様は来館特典対象外」の注釈は一旦出さない（指示書の指定）。
        options: [
          { value: "1", label: "1名" },
          { value: "2", label: "2名" },
          { value: "3", label: "3名" },
          { value: "4over", label: "4名以上" },
        ],
      },
      {
        type: "toggle",
        name: "tasting",
        label: "ご試食の有無",
        required: true,
        columns: 2,
        options: [
          { value: "yes", label: "試食あり" },
          { value: "no", label: "試食なし" },
        ],
      },
      {
        type: "textarea",
        name: "note",
        label: "ご質問・ご相談",
        optionalTag: "任意",
        placeholder: "ご希望の体験内容や、他の日程のご相談などをご自由にお書きください。",
        rows: 4,
      },
    ],
    submitLabel: "この内容で予約する",
    disclaimer:
      "ご入力いただいた内容はご予約対応のみに利用します。\nしつこいご案内はいたしません。",
    errorMessage:
      "お名前・電話番号・メールアドレス・ご来館希望日（第一/第二/第三）・ご人数・ご試食の有無は必須項目です。",
  },

  sticky: {
    offerText: "豪華試食＋最大70万円分プレゼント",
    buttonText: "最短30秒で予約",
    anchor: "#form",
  },
};

export default config;
