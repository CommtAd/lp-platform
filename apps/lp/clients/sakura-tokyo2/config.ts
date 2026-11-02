import type { ClientStatus } from "@shared/index";

/**
 * パーソナルマシンピラティス SAKURA — 東京エリアの広告集客LP（スワイプ版）。
 *
 * 通常版 `sakura-tokyo/` とのABテスト用に、同じ内容・素材を「横スワイプで1枚ずつ読む」
 * 10枚のスライドに組み直したもの。予約導線（SAKURA公式の予約サイト）は通常版と同一。
 *
 * 目的は予約件数だけでなく**来店率・入会率**。そのため「0円」を前に出すのは料金スライド（08）
 * と最後（10）だけにして、01〜07 で SAKURA とパーソナルの価値を先に伝える順序にしている。
 * 「無料」で釣った予約は来店しない・入会しない、を避けるための構成。
 *
 * 掲載事実は通常版と同じく公式サイト（sakura-pilates.jp）の記載に基づく。出典は各ブロックに残す。
 * 2026-11-02 に公式サイトを再確認し、通常版から次の点を更新している:
 *   - キャンペーン期限: 通常版は「10/31まで」のまま期限切れ。公式店舗ページは
 *     「体験レッスン5,500円が【無料】で受けられるキャンペーンも実施中」で継続中のため、
 *     通常版と同じ「月末締め」の運用で 11/30 を置いた。**月をまたぐたびに更新すること。**
 *   - 店舗数: 公式 /studios/ の東京都の店舗は24（うち3店舗がオープン予定）→ 営業中21店舗。
 */

/** 画像・動画スロット。`src` が空ならプレースホルダが出る。 */
export interface Slot {
  placeholder: string;
  src?: string | null;
  /** 切り抜き位置（object-position）。既定は "center"。 */
  position?: string;
  /** 動画スロットの読み込み前に出す静止画。 */
  poster?: string;
}

export interface SakuraSwipeConfig {
  slug: string;
  status?: ClientStatus;
  meta: { title: string; description: string; ogpImage?: string };

  header: { brand: string; brandSub: string; ctaText: string };

  /** スライド下部のナビに出す短い見出し。並び順はスライドと一致させること。 */
  navLabels: string[];

  /** 01 ファーストビュー */
  fv: {
    kicker: string;
    catchLines: string[];
    lead: string;
    chips: string[];
    hero: Slot;
    swipeHint: string;
  };

  /** 02 レッスン風景（動画） */
  lesson: { kicker: string; heading: string; video: Slot; caption: string };

  /** 03 お悩み */
  worry: {
    kicker: string;
    heading: string;
    items: { img: Slot; text: string }[];
    closing: string;
  };

  /** 04 選ばれる理由 */
  reasons: {
    kicker: string;
    heading: string;
    photo: Slot;
    stats: { num: string; unit: string; label: string }[];
    items: { title: string; body: string }[];
    note: string;
  };

  /** 05 マンツーマンだからできること */
  personal: {
    kicker: string;
    heading: string;
    photo: Slot;
    items: { title: string; body: string }[];
  };

  /** 06 身体の状態を知って、積み上げる仕組み */
  system: {
    kicker: string;
    heading: string;
    lead: string;
    photo: Slot;
    steps: { num: string; title: string; body: string }[];
  };

  /** 07 女性専用・完全個室 */
  privacy: {
    kicker: string;
    heading: string;
    photo: Slot;
    lead: string;
    points: string[];
  };

  /** 08 料金・キャンペーン */
  price: {
    kicker: string;
    heading: string;
    deadline: string;
    trial: { label: string; was: string; now: string };
    join: { label: string; was: string; now: string; extra: string };
    plans: { name: string; amount: string; unit: string; per: string; badge?: string }[];
    notes: string;
    ctaText: string;
  };

  /** 09 体験の流れ・よくある質問 */
  flow: {
    kicker: string;
    heading: string;
    steps: { title: string; body: string }[];
    faqHeading: string;
    faq: { q: string; a: string }[];
  };

  /** 10 予約のご案内 */
  closing: {
    kicker: string;
    heading: string;
    photo: Slot;
    lead: string;
    chips: string[];
    ctaText: string;
    ctaSub: string;
    studiosLabel: string;
    studios: string;
    upcoming: string;
  };

  /**
   * 予約導線。CVは SAKURA の予約サイト（hacomono）で受ける。通常版 sakura-tokyo と同じURL
   * （ABテストで差を出すのはLPの見せ方だけにするため、遷移先は揃える）。
   */
  reserve: { url: string; note: string };
}

/**
 * 写真はすべて通常版 sakura-tokyo と同じSAKURA提供素材（原本はドライブ「★広告用撮影素材」）。
 * lesson.mp4 は sakura-shinjuku-sanchome2 の mv.mp4 と同一（同ドライブ「★レッスン風景」から
 * 4カットを切り出した20秒ループ・無音・780x940）。店舗が特定されないブランド共通の素材。
 * 同じ写真は2回使わない／顔が枠で切れる写真は使わない、は通常版の方針をそのまま守る。
 */
const IMG = "/clients/sakura-tokyo2";

/** 公式 /studios/ の東京都の店舗（2026-11-02 時点で営業中のもの）。 */
const TOKYO_STUDIOS = [
  "麻布十番", "五反田", "恵比寿", "学芸大学", "旗の台", "大井町", "勝どき",
  "代々木上原", "四谷三丁目", "新宿三丁目", "茗荷谷", "池袋", "高田馬場・西早稲田",
  "町屋", "亀戸", "練馬", "大泉学園", "成増", "成増ANNEX", "経堂", "三鷹",
];

const config: SakuraSwipeConfig = {
  slug: "sakura-tokyo2",
  status: "draft",
  meta: {
    title: "女性専用パーソナルマシンピラティス SAKURA｜東京都内21店舗・体験レッスン受付中",
    description:
      "姿勢が変わると、鏡を見るのが楽しみになる。東京都内21店舗、女性専用・完全マンツーマンのマシンピラティスSAKURA。会員様の80%がピラティス未経験、継続率94%。11月30日までのご予約で体験レッスン＆入会金が0円。",
    // 相対パスだと metadataBase が別ドメインに解決されるため絶対URLで固定する。
    ogpImage: "https://fitness-lp.commitad.com/clients/sakura-tokyo2/ogp.jpg",
  },

  header: {
    brand: "SAKURA",
    brandSub: "女性専用パーソナルマシンピラティス",
    ctaText: "体験予約",
  },

  navLabels: [
    "SAKURAについて",
    "レッスン風景",
    "こんなお悩みに",
    "選ばれる理由",
    "マンツーマンの価値",
    "積み上げる仕組み",
    "女性専用・完全個室",
    "料金・キャンペーン",
    "体験の流れ・FAQ",
    "体験予約のご案内",
  ],

  /* キャッチは通常版と同じ（採用理由は sakura-tokyo/config.ts の CATCH_CANDIDATES）。 */
  fv: {
    kicker: "PERSONAL MACHINE PILATES",
    catchLines: ["姿勢が変わると、", "鏡を見るのが", "楽しみになる。"],
    lead: "あなたの身体だけを見る、\n女性専用・完全マンツーマンの60分。",
    chips: ["東京都内21店舗", "女性専用", "完全マンツーマン"],
    hero: { placeholder: "マンツーマンレッスン風景", src: `${IMG}/hero.jpg`, position: "44% center" },
    swipeHint: "スワイプして読む",
  },

  lesson: {
    kicker: "LESSON",
    heading: "マシンが支えてくれるから、\n運動が苦手でも動ける。",
    video: {
      placeholder: "レッスン風景（動画）",
      src: `${IMG}/lesson.mp4`,
      poster: `${IMG}/lesson-poster.jpg`,
    },
    /* 出典: 公式店舗LP「マシンピラティスで得られる効果」Benefits 01 */
    caption: "専用マシン「リフォーマー」が動きをサポート。\n筋力に自信がなくても、体幹に届きます。",
  },

  /* 出典: 公式トップ「SAKURAなら、このようなお悩みをすべて解決」 */
  worry: {
    kicker: "TROUBLES",
    heading: "こんなお悩み、\nありませんか？",
    items: [
      { img: { placeholder: "姿勢", src: `${IMG}/offer-1.jpg`, position: "35% center" }, text: "猫背・巻き肩で、\n姿勢が気になる" },
      { img: { placeholder: "ボディライン", src: `${IMG}/reason-2.jpg`, position: "40% center" }, text: "筋肉質にならずに\nラインを整えたい" },
      { img: { placeholder: "むくみ・冷え", src: `${IMG}/worry-3-cold.jpg` }, text: "むくみや冷えが\nなかなか抜けない" },
      { img: { placeholder: "産後ケア", src: `${IMG}/drive-smile-portrait.jpg` }, text: "産後の骨盤まわりを\nケアしたい" },
    ],
    closing: "どれも「鍛え方」より\n「身体の使い方」の問題です。",
  },

  /* 出典: 公式店舗LP「『SAKURA』のマシンピラティス 5つの特徴」（80% / 94% も同ページ） */
  reasons: {
    kicker: "REASON",
    heading: "SAKURAが選ばれる理由",
    photo: { placeholder: "マシン指導", src: `${IMG}/drive-chair-lesson.jpg`, position: "center 8%" },
    stats: [
      { num: "80", unit: "%", label: "ピラティス未経験から" },
      { num: "94", unit: "%", label: "継続率" },
    ],
    items: [
      { title: "理学療法士監修のメソッド", body: "ボディメイクの視点を加えた独自メソッド。" },
      { title: "結果を出すことに特化", body: "他スタジオで効果を感じなかった方からも高い評価。" },
      { title: "予約が取りやすい", body: "常に3週間先まで予約を開放。計画的に通えます。" },
    ],
    note: "※数値は公式サイト掲載の実績値です。",
  },

  /* 出典: 公式店舗LP Benefits 02 ／ 通常版の PERSONAL（公式の記載を要約したもの） */
  personal: {
    kicker: "PERSONAL",
    heading: "マンツーマンだから、\nできること。",
    photo: { placeholder: "インストラクターのサポート", src: `${IMG}/drive-arm-stretch-tower.jpg`, position: "center 5%" },
    items: [
      { title: "その日の身体に合わせて組み立てる", body: "体調やお悩みに合わせて、毎回メニューを調整。" },
      { title: "自分では気づけないクセを、その場で", body: "鏡では分からない動きのクセを、見つけて修正します。" },
      { title: "気になる部分にピンポイントで", body: "悩みのある部分に集中して、効率よく変われる。" },
    ],
  },

  /* 「記録」の仕組み（カルテ・アプリ等）は公式に記載が無いため書かない。
     出典: 公式店舗LPのキャンペーンバナー（姿勢分析・フィードバック）／公式FAQ（3週間先の予約開放）
     ／公式 /price/（月額制は回数を繰り越せる）。仕組みの記載が公式に出たらここを差し替える。 */
  system: {
    kicker: "SYSTEM",
    heading: "1回で終わらせない、\n積み上げる仕組み。",
    lead: "変化は、続けた回数の先にあります。\nだから「続けられる」ところまで設計しています。",
    photo: { placeholder: "カウンセリング", src: `${IMG}/drive-counseling-tablet.jpg` },
    steps: [
      { num: "01", title: "今の身体を知る", body: "カウンセリングと姿勢分析で、クセと原因を確認。" },
      { num: "02", title: "進め方を決める", body: "フィードバックで、目標と通い方をご提案。" },
      { num: "03", title: "計画的に通う", body: "3週間先まで予約OK。月額制は繰り越しも可。" },
    ],
  },

  /* 出典: 公式店舗LP「女性専用のスタジオ」／他社比較「完全個室かつ女性インストラクターのみ」 */
  privacy: {
    kicker: "PRIVATE",
    heading: "女性だけの、\n完全個室。",
    photo: { placeholder: "スタジオ内観", src: `${IMG}/drive-studio-logo-wall.jpg` },
    lead: "スタジオもインストラクターも、全員女性。\n人目を気にせず、体型や産後のことも\n気兼ねなく相談できます。",
    points: ["スタッフ全員女性", "完全個室", "体験は手ぶらでOK"],
  },

  /* 出典: 公式店舗LPのキャンペーンバナー
       「【体験レッスン&カウンセリング】通常60分5,500円のところ…今だけ「無料」！
         さらに体験レッスン後のご入会で「入会金0円」「専用靴下プレゼント」」
     ＋ 公式 /price/（税込）。期限は月末締め。**月をまたぐたびに更新すること。** */
  price: {
    kicker: "PRICE",
    heading: "料金・キャンペーン",
    deadline: "11月30日（月）までのご予約限定",
    trial: { label: "体験レッスン60分", was: "5,500円", now: "0円" },
    join: { label: "体験後のご入会で 入会金", was: "33,000円", now: "0円", extra: "＋ SAKURA専用ソックスをプレゼント" },
    plans: [
      { name: "月4回コース", amount: "33,000", unit: "円/月", per: "1回 8,250円", badge: "人気" },
      { name: "月8回コース", amount: "63,800", unit: "円/月", per: "1回 7,975円" },
      { name: "12ヶ月プラン", amount: "343,200", unit: "円", per: "1回 7,150円" },
    ],
    notes: "※税込。ほかに回数券・6ヶ月プランもございます。プランは体験時にご相談いただけます。",
    ctaText: "体験レッスンを予約する",
  },

  /* 出典: 公式店舗LP「体験予約の流れ」／公式 /faq/ */
  flow: {
    kicker: "FLOW",
    heading: "体験レッスンの流れ",
    steps: [
      { title: "予約サイトから予約", body: "店舗と日時を選ぶだけ。空きもすぐ分かります。" },
      { title: "ご来店・カウンセリング", body: "お悩みや目標を伺い、メニューをご提案します。" },
      { title: "レッスン・フィードバック", body: "身体のクセと、合う通い方をお伝えします。" },
    ],
    faqHeading: "よくあるご質問",
    faq: [
      { q: "運動経験がなくても大丈夫？", a: "会員様の80%が未経験から。丁寧にサポートします。" },
      { q: "持ち物は？", a: "体験時はウェア・靴下を無料貸出。手ぶらでOK。" },
      { q: "時間はどのくらい？", a: "お着替え・プランのご説明を含めて60分です。" },
    ],
  },

  closing: {
    kicker: "RESERVE",
    heading: "鏡を見るのが楽しみになる毎日を、\nここから。",
    photo: { placeholder: "ご来店", src: `${IMG}/welcome.jpg`, position: "center 30%" },
    lead: "まずは60分、あなたの身体を知るところから。\nお近くの店舗でお待ちしています。",
    chips: ["体験レッスン0円", "入会金0円", "11/30までのご予約"],
    ctaText: "体験レッスンを予約する",
    ctaSub: "SAKURA公式の予約サイトへ移動します",
    studiosLabel: "東京都内の店舗",
    studios: TOKYO_STUDIOS.join("／"),
    upcoming: "近日オープン：白金高輪（11/15）／市ヶ谷・神楽坂（12/1）／西荻窪（1/15）",
  },

  reserve: {
    url: "https://reserve.sakura-pilates.jp/reserve",
    note: "SAKURA公式の予約サイトへ移動します",
  },
};

export default config;
