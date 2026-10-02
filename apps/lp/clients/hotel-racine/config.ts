import type { PatternCConfig } from "@/clients/pattern-c.types";

const ASSET = "/clients/hotel-racine";

/**
 * ホテル ラシーネ新前橋 — プレミアム ブライダルフェア（パターンC）。
 *
 * lold の config を写して作った。原稿は AUN の指示書（lold のキャプチャに
 * 差し替え文言を書き込んだもの）に従い、指示のない箇所（会場紹介・当日の流れ・
 * フォーム）は lold の構成のまま、ラシーネの会場情報に差し替えている。
 * 金額・適用条件は顧客確認を取ってから変更すること。
 */
const config: PatternCConfig = {
  slug: "hotel-racine",
  status: "draft",
  meta: {
    title: "ホテル ラシーネ新前橋｜プレミアム ブライダルフェア",
    description:
      "「ホテル ラシーネ新前橋」の大聖堂チャペル×ホテルウェディング プレミアム ブライダルフェア。最大40万円相当の特典をプレゼント。大聖堂チャペル見学・国産牛フィレ肉を含むハーフコース無料試食・お見積り相談を最短30秒でご予約いただけます。",
    // OGP専用の1枚（1200x630）。チャペル正面のカットから切り出した。
    // 差し替えるときは必ずファイル名も変えること（SNS側のキャッシュ対策）。
    ogpImage: `${ASSET}/ogp-2026-10-02.jpg`,
  },
  ink: "#3B3730",
  accent: "#B99653",
  paper: "#FBF8F3",

  // 特典バンドは lold の配色（#A49483 × 白）をそのまま引き継ぐ。
  // 金額はすべて白プレート＋深い金に逃がしてある。
  band: {
    bg: "#A49483",
    text: "#FFFFFF",
    accent: "#FFFFFF",
    rule: "rgba(255,255,255,0.5)",
  },

  header: {
    venue: "Hotel Racine Shinmaebashi",
    // 横並びのロゴ（紋章 + ロゴタイプ、比率 4.16:1）。支給の透過PNGの余白を詰めてある。
    // ヘッダーは ashibinosato と同じ高さ（ロゴ32px＋上下8px）で薄く組む（顧客指定）。
    // 下段の「SHINMAEBASHI」は小さくなるが、ヘッダーの薄さを優先する判断。
    logo: { src: `${ASSET}/logo.png`, height: 32 },
    paddingY: 8,
    // CTAボタンは非表示（ロゴが中央寄せになる）。追従バーが常時出ているので導線は確保されている。
    sticky: false,
  },

  fv: {
    // ヘッダー直下の帯（顧客指定）。カードの文字量を減らすため、キャッチの1行目をここへ出す。
    topBand: "大聖堂チャペル×ホテルウェディング",
    // 会場名はヘッダーのロゴで出すので、カードには置かない（ashibinosato と同じ構成）。
    kicker: "＼豪華来館特典付き／",
    catch: ["プレミアム", "ブライダルフェア"],
    framed: true,
    ornament: {
      top: `${ASSET}/fv-ornament-top.png`,
      bottom: `${ASSET}/fv-ornament-bottom.png`,
      // 余白の詰め方は ashibinosato と同じ。下の飾りに接するのは幅の狭い
      // 「プレゼント！」なので、渦にはかからず詰められる。
      gap: 0,
      gapBottom: -20,
    },
    // 金額を大きく見せるため「プレゼント」は次の行（highlightSub）へ送る。
    highlight: "最大40万円相当",
    highlightSize: 22,
    highlightSub: "プレゼント！",
    highlightSubSize: 16,
    ctaText: "最短30秒で予約する",
    // lold と同じくプレートを上に置く（顧客指定）。
    catchPosition: "top",
    catchTopInset: 12,
    // スライドはFV用に支給された 1008x1350（ほぼ 3:4）の5枚。いずれも顔が
    // 高さの55%より下にあり、上53%を覆うプレートにかからない。順序は支給どおり。
    heroAspect: "3 / 4",
    hero: {
      placeholder: "チャペル（ステンドグラスの前で誓う新郎新婦）",
      src: `${ASSET}/fv-01.jpg`,
      position: "center",
    },
    heroSlides: [
      { placeholder: "シャンデリアの下のカラードレスの新郎新婦", src: `${ASSET}/fv-02.jpg` },
      { placeholder: "チャペル（ステンドグラスの前の新郎新婦）", src: `${ASSET}/fv-03.jpg` },
      { placeholder: "披露宴会場「銀河」の新郎新婦", src: `${ASSET}/fv-04.jpg` },
      { placeholder: "チャペル（バージンロードの新郎新婦）", src: `${ASSET}/fv-05.jpg` },
    ],
  },

  // FVを離脱する前に特典だけ持ち帰ってもらうための要約。詳細は privilege 側。
  fvSummary: {
    headline: "豪華来館特典付き",
    headlineEmphasis: "豪華来館特典",
    headlineOrnament: `${ASSET}/fv-summary-ornament.png`,
    label: "来館特典",
    // 料理写真の支給がないので画像なしで組む。
    items: [{ amount: "ハーフコース無料試食", name: "国産牛フィレ肉を含む" }],
    disclaimer: "※特典のお渡しには適用条件がございます",
  },

  grandOffer: {
    eyebrow: "プレミアムブライダルフェア",
    heading: "大聖堂 × 美食を体験",
    headingSize: 29,
    badge: "最大40万円相当プレゼント",
    title: "フェア成約特典",
    amount: "ご成約で、最大40万円相当の\n特典をプレゼントいたします",
    amountProse: true,
    amountProseEmphasis: "最大40万円相当",
    frame: `${ASSET}/grand-offer-frame.png`,
  },

  experience: {
    heading: "このフェアで体験できること",
    lead: "チャペルからお料理、お見積りまで。当日のすべてをご確認いただけます。",
    items: [
      {
        tag: "01",
        title: "大聖堂チャペル見学",
        body: "木の温もりを感じる「ガブリエル」で、実際の挙式の雰囲気を体験。",
        image: { placeholder: "大聖堂チャペル", src: `${ASSET}/exp-chapel.jpg` },
      },
      {
        tag: "02",
        title: "披露宴会場・館内見学",
        body: "ホテルならではの上質な空間を実際に見学。",
        image: { placeholder: "披露宴会場", src: `${ASSET}/banquet.jpg` },
      },
      {
        tag: "03",
        title: "国産牛フィレ肉の無料試食",
        body: "婚礼料理の味を、実際に試食しておもてなしを確認。",
        image: { placeholder: "国産牛フィレ肉の婚礼料理", src: `${ASSET}/exp-tasting.jpg` },
      },
      {
        tag: "04",
        title: "見積り・日程相談",
        body: "希望時期や人数、予算に合わせてプランナーが提案。",
        image: { placeholder: "ブライダルサロンでの相談", src: `${ASSET}/planner.jpg` },
      },
    ],
  },

  recommend: {
    heading: "こんなおふたりにおすすめ",
    // アイコン素材がないので金の丸囲みチェックで組む（指示書の ☑ に相当）。
    items: [
      { label: "初めての式場見学で\n何から見ればいいか\nわからない" },
      { label: "ホテルウェディングを\n実際に見てみたい" },
      { label: "料理を試食してから\n式場を決めたい" },
      { label: "結婚式の費用が\n気になる" },
      { label: "遠方ゲストの宿泊も\n考えている" },
      { label: "家族・親族にも\n安心してもらえる\n会場を探している" },
      { label: "少人数での結婚式に\nついて相談したい" },
    ],
  },

  privilege: {
    heading: "来館特典・フェア成約特典",
    lead: "大聖堂チャペル見学とあわせてご用意しています。",
    headline: "最大40万円相当の特典をプレゼント",
    headlineEmphasis: "最大40万円相当",
    items: [
      { title: "国産牛フィレ肉を\n含むハーフコース", amount: "無料試食" },
      { title: "新郎新婦様の\n挙式当日", amount: "宿泊ご招待" },
      { title: "ご列席の\nゲスト様", amount: "宿泊特別優待" },
    ],
    frame: `${ASSET}/privilege-frame.png`,
    disclaimer: "※特典のお渡しには適用条件がございます",
    contract: {
      label: "さらに、ご成約で",
      // 1行に収まらず「プレゼ/ント」で割れるので、締めの語は footer に送る。
      amount: "40万円相当の特典を",
      inkAfterAmount: true,
      footer: "プレゼント",
    },
  },

  facility: {
    heading: "会場のご紹介",
    lead: "大聖堂チャペルとホテルの上質な空間で叶える、ふたりの結婚式",
    aspect: "16 / 9",
    bodySize: 13,
    items: [
      {
        tag: "01",
        title: "大聖堂チャペル「ガブリエル」",
        body: "ステンドグラスと大理石のバージンロード。パイプオルガンの音色が響く大聖堂",
        image: { placeholder: "大聖堂チャペル", src: `${ASSET}/facility-chapel.jpg` },
      },
      {
        tag: "02",
        title: "披露宴会場「銀河」",
        body: "5連のシャンデリアが高い天井に煌めく、ホテルならではの大空間",
        // 体験セクションと同一カット（披露宴会場の支給素材がこの1枚のみ）。
        image: { placeholder: "披露宴会場「銀河」", src: `${ASSET}/banquet.jpg` },
      },
      {
        tag: "03",
        title: "ドレスサロン",
        body: "館内のサロンで、当日のドレス選びまでご相談いただけます",
        image: { placeholder: "ドレスサロン", src: `${ASSET}/facility-dress.jpg` },
      },
      {
        tag: "04",
        title: "和装",
        body: "白無垢や色打掛など、和装のご相談も承ります",
        image: { placeholder: "和装の衣裳室", src: `${ASSET}/facility-kimono.jpg` },
      },
    ],
  },

  flow: {
    heading: "当日の流れ",
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
        body: "大聖堂チャペルや披露宴会場を実際にご見学いただきます。また、国産牛フィレ肉を含むハーフコースをご試食いただけます。",
      },
      {
        num: "3",
        title: "相談・見積り",
        icon: `${ASSET}/flow-03.png`,
        body: "ご希望の時期や人数、ご予算に合わせてプランナーがご提案いたします。",
      },
    ],
  },

  access: {
    heading: "アクセス",
    venueName: "ホテル ラシーネ新前橋",
    address: "〒371-0844 群馬県前橋市古市町1-35-1",
    routes: ["JR新前橋駅東口より徒歩3分", "無料駐車場200台"],
    mapEmbed: { query: "ホテルラシーネ新前橋" },
    map: { placeholder: "ホテル館内のサイン", src: `${ASSET}/venue-exterior.jpg` },
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
    offerText: "最大40万円相当プレゼント",
    buttonText: "最短30秒で予約",
    anchor: "#form",
  },
};

/*
 * TODO(hotel-racine): 差し替え・確認が残っている項目:
 *  - facility の説明文・flow は指示書に記載がなく、公式情報から起こした原稿
 *  - 特典の適用条件（※注記）・1名来館時の扱いは顧客確認
 */
export default config;
