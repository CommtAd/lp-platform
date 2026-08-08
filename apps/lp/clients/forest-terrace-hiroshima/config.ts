import type { PatternCConfig } from "@/clients/pattern-c.types";

const ASSET = "/clients/forest-terrace-hiroshima";

/**
 * ザ・フォレストテラス広島 — グランドオープン記念BIGフェア（パターンC）。
 *
 * 原稿は顧客支給の指示書に準拠。金額・適用条件・日付は勝手に変えないこと。
 * 未確定のまま入れている項目は末尾のコメントに列挙してある。
 */
const config: PatternCConfig = {
  slug: "forest-terrace-hiroshima",
  status: "draft",
  meta: {
    title: "ザ・フォレストテラス広島｜グランドオープン記念BIGフェア",
    description:
      "広島市中区のホテルウェディング「ザ・フォレストテラス広島」。グランドオープンを記念したBIGフェアを開催中。ご成約で最大180万円相当の優待、ご来館で最大10万円分の特典をご用意。チャペル見学・豪華無料試食・ドレス見学・お見積り相談を最短30秒でご予約いただけます。",
    ogpImage: `${ASSET}/hero.jpg`,
  },
  ink: "#3B3730",
  accent: "#B99653",
  paper: "#FBF8F3",

  // 特典バンド（限定特典・来館特典）。地・文字とも顧客指定（#A49483 × 白）。
  // 白 on #A49483 は 2.9:1 で WCAG AA（4.5:1／大文字3:1）には届かないが、
  // 見た目の指定を優先するという判断。ここに載るのは見出しと補足のみで、
  // 金額はすべて白プレート＋深い金（4.9:1）に逃がしてある。
  band: {
    bg: "#A49483",
    text: "#FFFFFF",
    accent: "#FFFFFF",
    rule: "rgba(255,255,255,0.5)",
  },

  header: {
    venue: "The Forest Terrace Hiroshima",
    venueSub: "オリエンタルホテル広島内",
    // マーク＋ロゴタイプの縦積み。42px 以下だと下段の HIROSHIMA が潰れる。
    logo: { src: `${ASSET}/logo.png`, height: 42 },
    ctaText: "予約する",
  },

  fv: {
    kicker: "GRAND OPEN BRIDAL FAIR",
    catch: ["グランドオープン記念BIGフェア"],
    // 14文字を1行で収めるため既定26pxから下げる。プレートの内側パディングぶん、
    // 枠なしのときより1px小さい19pxが360px幅の端末で折り返さない上限。
    catchSize: 19,
    // キッカー・キャッチ・訴求を1枚のプレートにまとめる。
    framed: true,
    highlight: "最大180万円相当 優待",
    // リードとオファーチップは顧客要望で非表示。FVは訴求を highlight 1点に絞る。
    ctaText: "最短30秒で予約する",
    // 新郎新婦が写真中央にいるため、キャッチを上に逃がして顔にかぶらないようにする。
    catchPosition: "top",
    // 横位置（3:2）の引き写真を縦長に受ける。左右のフラワーシャワーは切れるが、
    // キャッチの下に写真の余白が残るぶんFV全体の見え方が良くなる。
    heroAspect: "3 / 4",
    hero: {
      placeholder: "チャペル退場・フラワーシャワー",
      src: `${ASSET}/hero.jpg`,
      position: "center",
    },
  },

  // FVを離脱する前に金額だけ持ち帰ってもらうための要約。詳細は privilege 側。
  fvSummary: {
    label: "来館特典",
    items: [
      { amount: "1万円分", name: "JCBギフト券" },
      { amount: "3万円相当", name: "豪華無料試食" },
      { amount: "4万円相当", name: "ご宿泊" },
    ],
    note: "他にも最大10万円分のご来館特典がついてくる",
    noteEmphasis: "最大10万円分",
  },

  grandOffer: {
    eyebrow: "GRAND OPEN",
    heading: "グランドオープン限定特典",
    // 幅任せに折り返すと小書き文字が行頭に来るので、改行位置を明示する。
    lead: "＼グランドオープンを記念した\nスペシャルなフェアを開催！／",
    badge: "2027年5月までの挙式披露宴が対象",
    title: "豪華10大特典",
    amount: "最大180万円相当",
    feature: {
      title: "エグゼクティブルームを\n2泊3日でプレゼント",
      body: "人生で最も特別な2泊3日を。",
      image: {
        placeholder: "エグゼクティブルーム（リビング・市街地ビュー）",
        src: `${ASSET}/executive-room.jpg`,
        position: "center",
      },
    },
    note: "※ 適用条件があります。詳細は当日ご案内いたします。",
  },

  experience: {
    heading: "このフェアで体験できること",
    lead: "チャペルからお料理、お見積りまで。当日のすべてをご確認いただけます。",
    items: [
      {
        tag: "01",
        title: "チャペル見学",
        body: "実際の挙式会場を見学しながら、当日の雰囲気をご体感いただけます。",
        image: {
          placeholder: "チャペル（バージンロード）",
          src: `${ASSET}/chapel.jpg`,
        },
      },
      {
        tag: "02",
        title: "豪華無料試食",
        body: "シェフ自慢の婚礼料理をご試食いただき、おもてなしのイメージをご確認いただけます。",
        image: { placeholder: "婚礼料理", src: `${ASSET}/tasting.jpg` },
      },
      {
        tag: "03",
        title: "ドレス見学",
        body: "披露宴会場やドレスをご覧いただきながら、おふたりらしい結婚式をご提案いたします。",
        image: { placeholder: "披露宴会場とドレス", src: `${ASSET}/dress.jpg` },
      },
      {
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
        title: "JCBギフト券",
        amount: "1万円分",
        image: { placeholder: "ギフトボックス", src: `${ASSET}/gift-card.jpg` },
      },
      {
        title: "豪華無料試食",
        amount: "3万円相当",
        image: { placeholder: "婚礼料理のコース", src: `${ASSET}/gift-tasting.jpg` },
      },
      {
        title: "ご宿泊",
        amount: "4万円相当",
        image: { placeholder: "客室（ツイン）", src: `${ASSET}/gift-stay.jpg` },
      },
    ],
    total: "最大 10万円分",
    totalNote: "※ 特典の適用には条件があります。詳細は当日ご案内いたします。",
    contract: { label: "さらに、ご成約で", amount: "最大180万円優待" },
  },

  // 会場名・キャッチ・収容人数は公式サイト（forestterrace-hs.jp/banquet/）に準拠。
  // 写真も同ページのメインカットを使用。支給素材が来たら差し替える。
  facility: {
    heading: "会場のご紹介",
    lead: "挙式のチャペルと、3つの披露宴会場をご用意しています。",
    // 会場写真がパノラマ（2.08:1）なので、4:3だと左右が大きく切れる。
    aspect: "16 / 9",
    items: [
      {
        tag: "01",
        title: "チャペル",
        body: "自然光が差し込むあたたかな空間で、おふたりらしい挙式を叶えていただけます。",
        image: { placeholder: "チャペル", src: `${ASSET}/facility-chapel.jpg` },
      },
      {
        tag: "02",
        title: "ムーングロー",
        note: "10〜95名",
        body: "景色と時間が祝宴を特別に変えていく天空バンケット。広島の街並みを一望できます。",
        image: { placeholder: "ムーングロー", src: `${ASSET}/facility-moonglow.jpg` },
      },
      {
        tag: "03",
        title: "ボールルーム",
        note: "30〜150名",
        body: "華やかさと品格が調和する正統派ボールルーム。大人数の披露宴にも対応しています。",
        image: { placeholder: "ボールルーム", src: `${ASSET}/facility-ballroom.jpg` },
      },
      {
        tag: "04",
        title: "レインボールーム",
        note: "30〜120名",
        body: "上質さ感じる木漏れ日空間。やわらかな光に包まれた落ち着きのある会場です。",
        image: { placeholder: "レインボールーム", src: `${ASSET}/facility-rainbow.jpg` },
      },
    ],
  },

  flow: {
    heading: "当日の流れ",
    lead: "所要時間は2〜3時間です。",
    steps: [
      {
        num: "1",
        title: "受付",
        body: "ご希望の結婚式のイメージやご要望をお伺いします。",
      },
      {
        num: "2",
        title: "見学・試食",
        body: "チャペルや披露宴会場を実際にご見学いただきます。また、人気の婚礼メニューをご試食いただけます。",
      },
      {
        num: "3",
        title: "相談・見積り",
        body: "ご予算や日程について詳しくご案内いたします。",
      },
    ],
  },

  access: {
    heading: "アクセス",
    venueName: "The Forest Terrace Hiroshima",
    address: "〒730-0026 広島県広島市中区田中町6-10 オリエンタルホテル広島内",
    routes: ["広島電鉄本線 八丁堀駅より徒歩9分"],
    tel: "082-240-5551",
    telNote: "お電話でのご予約・お問い合わせも承っております。",
    map: {
      placeholder: "オリエンタルホテル広島 外観",
      src: `${ASSET}/access.jpg`,
      // 16:9 で受けると縦が切れる。下寄せにして新郎新婦の足元を残し、空側を落とす。
      position: "center bottom",
    },
  },

  overview: {
    heading: "ご予約概要",
    items: [
      { label: "適用期間", value: "2027年5月までに結婚式を実施可能な方" },
      { label: "所要時間", value: "2〜3時間" },
    ],
    note: "※ 組数限定のため、上限に達しましたら終了とさせていただきます。",
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
      {
        type: "select",
        name: "guests",
        label: "ご人数",
        required: true,
        placeholder: "選択してください",
        options: [
          { value: "u20", label: "〜20名" },
          { value: "u40", label: "21〜40名" },
          { value: "u60", label: "41〜60名" },
          { value: "u80", label: "61〜80名" },
          { value: "o80", label: "81名以上" },
          { value: "unset", label: "未定" },
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
      "お名前・電話番号・メールアドレス・ご来館希望日（第一/第二）・ご人数・ご試食の有無は必須項目です。",
  },

  sticky: {
    offerText: "最大180万円相当優待",
    buttonText: "最短30秒で予約",
    anchor: "#form",
  },
};

/*
 * 顧客確認待ちの項目:
 *  - 「見積もり相談」カットの画像（指示書では「フリー素材」。現在はプレースホルダ）
 *  - 会場外観 / アクセスマップの画像
 *  - 最寄駅からの経路・所要時間（access.routes が空）
 *  - 電話受付時間（access.telNote に時間を入れていない）
 *  - 指示書④の「JCBギフト券1円分」は①の「JCBギフト1万円」に合わせて 1万円分 と表記
 */
export default config;
