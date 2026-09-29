import type { PatternCConfig } from "@/clients/pattern-c.types";

const ASSET = "/clients/lavantscene";

/**
 * ベルヴィ ラヴァンセーヌ — ブライダルフェア（パターンC）。
 *
 * lold の config を写して作り、原稿・写真・会場情報は指示書（2026-09-29 受領）の
 * ものに差し替えた。装飾（飾り罫・フレーム・おすすめ/流れのアイコン）は
 * パターンC共通の部品として lold から引き継いでいる。
 * 金額・適用条件・日付は顧客確認を取ってから変更すること。
 */
const config: PatternCConfig = {
  slug: "lavantscene",
  status: "draft",
  meta: {
    title: "ベルヴィ ラヴァンセーヌ｜10月限定プレミアムフェア",
    description:
      "静岡「ベルヴィ ラヴァンセーヌ」の10月限定プレミアムフェア。ご来館で国産牛コース試食会に無料ご招待＋1万円分Amazonギフト券、ご成約で3万円分の選べるギフトと最大15大特典をご用意。最短30秒でご予約いただけます。",
    // OGP専用の1枚（1200x630）。会場紹介のチャペル写真から切り出したもので、
    // ファイルは別に持つ。差し替えるときは必ずファイル名も変えること（SNSのキャッシュ対策）。
    ogpImage: `${ASSET}/ogp-2026-09-29.jpg`,
  },
  ink: "#3B3730",
  accent: "#B99653",
  paper: "#FBF8F3",

  // 特典バンドの配色は lold から引き継いだもの（#A49483 × 白）。
  // 金額はすべて白プレート＋深い金に逃がしてあるので、地を変えても桁は読める。
  band: {
    bg: "#A49483",
    text: "#FFFFFF",
    accent: "#FFFFFF",
    rule: "rgba(255,255,255,0.5)",
  },

  header: {
    venue: "ベルヴィ ラヴァンセーヌ",
    // 紋章 + ロゴタイプの縦積み（比率 2.76:1、透過PNG）。ロゴタイプが高さの3割弱なので、
    // lold と同じく 46px で文字が約12px になる。支給が300px幅と小さく、DPR3では少し甘い。
    logo: { src: `${ASSET}/logo.png`, height: 46 },
    ctaText: "予約する",
    sticky: false,
  },

  fv: {
    brand: "ベルヴィ ラヴァンセーヌ",
    kicker: "＼最大4万円相当の選べるギフト付き／",
    // 英字前提のキッカー枠なので、数字を明朝の立体に逃がす。
    kickerEmphasis: "4",
    catch: ["10月限定", "プレミアムフェア開催"],
    framed: true,
    ornament: {
      top: `${ASSET}/fv-ornament-top.png`,
      bottom: `${ASSET}/fv-ornament-bottom.png`,
      // 罫は渦の中央を通るので、罫と本文の間が絵として空く（上下とも約28px）。
      // 負の値でその空きを詰め、罫と本文のアキを上下とも約8pxに揃える（顧客指定）。
      // 渦は文字幅（プレートの18〜82%）の範囲では罫より外側にしか無いので重ならない。
      gap: -20,
      gapBottom: -20,
    },
    highlight: "最大100万円相当 優待",
    highlightSize: 19,
    ctaText: "最短30秒で予約する",
    catchPosition: "top",
    // 支給素材は横位置（3:2）と正方形なので、3:4に切り出してある（1360x1814）。
    // プレートがFVの上約55%を覆うため、人物が下半分に来るように切った。
    // 2枚目・4枚目は人物が上寄りなので、下側を落として人物を下げている。
    // 4枚目は元が1500px角と小さく、切り出し幅が832pxしかない（高精細端末ではやや甘い）。
    heroAspect: "3 / 4",
    hero: {
      placeholder: "チャペル（三面窓と新郎新婦）",
      src: `${ASSET}/hero.jpg`,
      position: "center",
    },
    heroSlides: [
      { placeholder: "ナイトガーデンでの乾杯", src: `${ASSET}/hero-2.jpg` },
      // 神殿は新郎新婦の足元がFVの下端に来るよう、元画像の足元（下から約15%）で切ってある（顧客指定）。
      { placeholder: "神殿（和装の新郎新婦）", src: `${ASSET}/hero-3.jpg` },
      { placeholder: "パーティー会場での乾杯", src: `${ASSET}/hero-4.jpg` },
    ],
  },

  // FVを離脱する前に来館特典だけ持ち帰ってもらうための要約。詳細は privilege 側。
  // 試食会の金額換算は指示書に無いので、金額の枠には「無料試食」を置く（顧客指定）。
  // 写真は privilege と同一。同じ特典なので別カットにすると別物に見える。
  fvSummary: {
    label: "来館特典",
    items: [
      {
        amount: "無料試食",
        name: "国産牛コース試食会\n無料ご招待",
        image: { placeholder: "国産牛のコース料理", src: `${ASSET}/gift-tasting.jpg` },
      },
      {
        amount: "1万円分",
        name: "Amazon\nギフト券",
        // lold と同じギフトの写真（顧客指定）。
        image: { placeholder: "ギフトボックス", src: `${ASSET}/gift-card.jpg` },
      },
    ],
  },

  // 成約特典。指示書の並び（選べるギフト ➕ 最大15大特典）をそのまま上から積む。
  grandOffer: {
    eyebrow: "ご成約特典",
    heading: "10月のキャンペーン限定！",
    // 特典名はカード内で1行に収まらず「選べ／るギフト」で割れたので、中身はリードへ出す。
    lead: "旅行券orカタログギフトなどから選べる",
    // 金額は title で言い切り、写真の下の金額プレートは出さない（顧客指定）。
    title: "3万円分の\n選べるギフトプレゼント",
    titleEmphasis: "3万円分",
    // 選べるギフトの中身を写真で見せる（顧客支給、4:3に切り出し済み）。
    images: [
      { placeholder: "旅行券", src: `${ASSET}/gift-travel.jpg`, caption: "旅行券" },
      { placeholder: "カタログギフト", src: `${ASSET}/gift-catalog.jpg`, caption: "カタログギフト" },
    ],
    frame: `${ASSET}/grand-offer-frame.png`,
    // 15大特典の総額（FVの「最大100万円相当 優待」と同じもの）を金額として立てる。
    feature: {
      title: "＋ 15大特典付き！",
      amount: "最大100万円相当",
      body: "挙式・衣裳・乾杯ドリンクなどご優待価格にてご案内",
    },
  },

  experience: {
    heading: "このフェアで体験できること",
    lead: "チャペルからお料理まで。当日の雰囲気をまるごとご体感いただけます。",
    items: [
      {
        tag: "01",
        title: "チャペル見学",
        body: "実際の挙式会場を見学しながら、当日の雰囲気をご体感いただけます。",
        image: {
          placeholder: "チャペル（フラワーシャワー）",
          src: `${ASSET}/exp-chapel.jpg`,
        },
      },
      {
        tag: "02",
        title: "披露宴会場見学",
        body: "披露宴会場をご覧いただきながら、おふたりらしい結婚式をご提案いたします。",
        image: { placeholder: "披露宴会場", src: `${ASSET}/exp-banquet.jpg` },
      },
      {
        tag: "03",
        title: "国産牛コース試食会",
        body: "国産牛を使った婚礼コースをご試食いただき、おもてなしのイメージをご確認いただけます。",
        image: { placeholder: "国産牛のコース料理", src: `${ASSET}/tasting.jpg` },
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
        title: "国産牛コース試食会\n無料ご招待",
        amount: "無料試食",
        // 支給の横位置カットを正方形に切り出したもの（3皿とも収まる中央）。
        image: { placeholder: "国産牛のコース料理", src: `${ASSET}/gift-tasting.jpg` },
      },
      {
        title: "Amazon\nギフト券",
        amount: "1万円分",
        image: { placeholder: "ギフトボックス", src: `${ASSET}/gift-card.jpg` },
      },
    ],
    frame: `${ASSET}/privilege-frame.png`,
    contract: {
      label: "さらに、ご成約で",
      amount: "3万円分の選べるギフト",
      // 成約特典の2つ目（顧客指定）。総額はFVの「最大100万円相当 優待」と同じもの。
      extras: ["最大100万円相当の15大特典"],
      // 金額（3万円分 / 最大100万円相当）だけを金にし、特典名は本文色で組む（顧客指定）。
      inkAfterAmount: true,
    },
  },

  facility: {
    heading: "会場のご紹介",
    lead: "チャペル・神殿と、3つのパーティー会場",
    // 支給素材がすべて 3:2 なので、そのまま受けてトリミングを出さない。
    aspect: "3 / 2",
    bodySize: 13,
    items: [
      {
        tag: "01",
        title: "陽光満ちるチャペル",
        body: "三面の窓から自然光が降り注ぐ、開放感あふれる独立型チャペル",
        image: { placeholder: "チャペル", src: `${ASSET}/facility-chapel.jpg` },
      },
      {
        tag: "02",
        title: "神殿",
        body: "檜の香りに包まれた、和の美しさと落ち着きを感じる神殿",
        image: { placeholder: "神殿", src: `${ASSET}/facility-shrine.jpg` },
      },
      {
        tag: "03",
        title: "OPERA｜オペラ",
        body: "専用テラスを備えた、最大160名まで楽しめる開放的なパーティ会場",
        image: { placeholder: "パーティー会場 OPERA", src: `${ASSET}/facility-opera.jpg` },
      },
      {
        tag: "04",
        title: "MUSÉE｜ミュゼ",
        body: "オープンキッチンの料理演出も楽しめる、上質でクラシカルな会場",
        image: { placeholder: "パーティー会場 MUSÉE", src: `${ASSET}/facility-musee.jpg` },
      },
      {
        tag: "05",
        title: "ARIA｜アリア",
        body: "家族や親しいゲストとゆったり過ごせる、少人数専用のプライベート空間",
        image: { placeholder: "パーティー会場 ARIA", src: `${ASSET}/facility-aria.jpg` },
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
        body: "チャペルや披露宴会場を実際にご見学いただきます。また、国産牛のコース料理をご試食いただけます。",
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
    venueName: "ベルヴィ ラヴァンセーヌ",
    address: "〒422-8076 静岡県静岡市駿河区八幡1-4-38",
    routes: [
      "JR静岡駅南口より徒歩7分",
      "JR静岡駅北口より静鉄バス登呂コープタウン行「八幡1丁目」下車 徒歩1分（乗車時間5分）",
    ],
    mapEmbed: { query: "ベルヴィ ラヴァンセーヌ" },
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
    offerText: "最大100万円相当 優待",
    buttonText: "最短30秒で予約",
    anchor: "#form",
  },
};

/*
 * TODO(lavantscene): 差し替え・確認が残っている項目:
 *  - 特典の適用条件の注記（指示書に無いので未記載）
 *  - recommend / flow / experience の説明文はテンプレの原稿のまま
 *  - 電話番号（指示書に無いので access.tel 未設定）
 */
export default config;
