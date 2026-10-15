import type { ClientStatus } from "@shared/index";

/**
 * パーソナルマシンピラティス SAKURA 青葉台店 — Meta広告の体験予約用LP。
 *
 * 構成は seren-pilates（参考LP）を踏襲し、SAKURAブランドの見た目は sakura-tokyo に揃える。
 * 指示書: 【LP制作指示書】ピラティスSAKURA 青葉台店（2026-10-14）
 * ヒアリング: SAKURA 青葉台店様.pdf（2026-10-14）
 *
 * 事実の出典:
 *   - 公式 /studios/aobadai/（住所・営業時間・アクセス・口コミ・設備）2026-10-14 確認
 *   - ヒアリングシート（体験0円・入会金0円・乗り換え特典・子連れ可・監修）
 * 事実確認できない数値・実績は載せない。追記するときは必ず出典をコメントに残すこと。
 *
 * 体験料金について: 指示書は「5,500円（無料表現NG）」だったが、ヒアリングシートと
 * 公式サイトのバナーが「今だけ無料（通常5,500円）」のため、0円で出す（2026-10-14 営業判断）。
 * キャンペーンが終わったら offer.trialNow / fv.price / sticky / meta をまとめて戻すこと。
 *
 * CVは自社フォームではなく、ハコモノ（hacomono）の青葉台店・体験予約ページで受ける。
 * ページ内のCTAはすべて reserve.url へ直接遷移する（店舗選択の手間を省くため店舗別URL）。
 */

/** 画像スロット。`src` が空ならプレースホルダが出る。 */
export interface Slot {
  placeholder: string;
  src?: string | null;
  /** 切り抜き位置（object-position）。既定は "center"。 */
  position?: string;
}

/**
 * ABテストの切り替え。**1回のテストで変えるのは1要素だけ**（指示書 §9）。
 *   fv   … ファーストビューのキャッチ（A: 姿勢・ボディライン / B: パーソナル）
 *   hero … メインビジュアル（A: マンツーマン指導 / B: マシンを実践する女性）
 *   cta  … CTA文言（A: 空き状況を見る / B: 青葉台店の体験予約はこちら /
 *          mixed: セクションごとに指示書どおりの文言）
 * 予約クリック時に dataLayer へ現在の組み合わせを送るので、GTM側で集計できる。
 */
export type Variant = "A" | "B";
export interface AbConfig {
  fv: Variant;
  hero: Variant;
  cta: Variant | "mixed";
}

export interface AobadaiConfig {
  slug: string;
  status?: ClientStatus;
  meta: { title: string; description: string; ogpImage?: string };
  ab: AbConfig;

  header: { brand: string; brandSub: string; ctaText: string };
  offerBar: { badgeText: string; text: string };

  fv: {
    catchVariants: Record<Variant, string[]>;
    heroVariants: Record<Variant, Slot>;
    /** 写真右下の円形バッジ。 */
    badge: { small: string; big: string; foot: string };
    subVariants: Record<Variant, string[]>;
    /** サブコピーの2段目（帯の中で小さく添える）。 */
    support: string;
    /** 目立たせる4要素（指示書 ①）。 */
    points: { top: string; bottom: string }[];
    price: { label: string; was: string; now: string; unit: string };
  };

  /** CTA文言。spot ごとの既定（mixed 時）と、AB用の統一文言。 */
  cta: {
    variants: Record<Variant, string>;
    spots: Record<CtaSpot, string>;
  };

  worry: { heading: string; items: string[]; closing: string };

  future: {
    kicker: string;
    heading: string;
    items: { num: string; title: string; body: string; img: Slot }[];
    closing: string;
  };

  reasons: {
    kicker: string;
    heading: string;
    items: { num: string; title: string; body: string; img: Slot }[];
  };

  offer: {
    heading: string;
    lead: string;
    label: string;
    duration: string;
    was: string;
    now: string;
    unit: string;
    points: string[];
    photo: Slot;
    joinLead: string;
    perks: { label: string; was?: string; now: string; note?: string }[];
  };

  personal: {
    kicker: string;
    heading: string;
    body: string[];
    photo: Slot;
    approachLabel: string;
    approaches: string[];
  };

  flow: {
    kicker: string;
    heading: string;
    steps: { num: string; title: string; body: string; img?: Slot }[];
  };

  access: {
    kicker: string;
    heading: string;
    lead: string;
    points: string[];
    photo: Slot;
    gallery: Slot[];
    name: string;
    rows: { label: string; value: string }[];
    route: string;
    mapQuery: string;
  };

  faq: { kicker: string; heading: string; items: { q: string; a: string }[] };

  closing: {
    heading: string;
    sub: string;
    offerLabel: string;
    chips: string[];
  };

  reserve: { url: string };

  sticky: { offers: [string, string] };
}

export type CtaSpot = "header" | "fv" | "offer" | "flow" | "closing" | "sticky";

const IMG = "/clients/sakura-aobadai";

/**
 * 写真の出典:
 *   studio-*.jpg … 公式 /studios/aobadai/ 掲載の青葉台店の実写真（2026-10-14 取得・幅1500pxに縮小）。
 *                  **青葉台店の店舗紹介にはこれだけを使う。**
 *   それ以外      … SAKURAの撮影素材（sakura-tokyo と同じ。原本はドライブ「★広告用撮影素材」）。
 *                  ブランド共通のレッスン風景としてのみ使い、青葉台店の店内・スタッフとしては紹介しない。
 * 方針: 同じ写真は2回使わない／頭・顔が枠で切れる写真は使わない。
 */
const config: AobadaiConfig = {
  slug: "sakura-aobadai",
  status: "draft",
  meta: {
    title: "女性専用パーソナルマシンピラティス SAKURA 青葉台店｜青葉台駅西口徒歩2分・体験レッスン0円",
    description:
      "姿勢も、ボディラインも。自分らしく美しく。青葉台駅西口から徒歩2分、女性専用・完全個室のパーソナルマシンピラティスSAKURA。会員様の80%がピラティス未経験から。今なら体験レッスン（通常5,500円）が0円。",
    // 相対パスだと metadataBase が別ドメインに解決されるため絶対URLで固定する。
    ogpImage: "https://fitness-lp.commitad.com/clients/sakura-aobadai/ogp.jpg",
  },

  ab: { fv: "A", hero: "A", cta: "mixed" },

  header: {
    brand: "SAKURA",
    brandSub: "青葉台店｜女性専用パーソナルピラティス",
    ctaText: "空き状況を見る",
  },

  /* 出典: 公式 /studios/aobadai/ バナー「【今だけ無料】無料体験＆カウンセリング」／ヒアリング Q7 */
  offerBar: { badgeText: "今だけ", text: "体験レッスン 5,500円→0円" },

  fv: {
    catchVariants: {
      A: ["姿勢も、", "ボディラインも。", "自分らしく美しく。"],
      B: ["青葉台で始める、", "私だけの", "マシンピラティス。"],
    },
    heroVariants: {
      // 縦書きキャッチが左側を覆うので、被写体（講師と受講者）が右に来るよう寄せる。
      A: { placeholder: "マンツーマン指導", src: `${IMG}/hero-a.jpg`, position: "28% center" },
      B: { placeholder: "マシンピラティスを実践する女性", src: `${IMG}/hero-b.jpg`, position: "6% center" },
    },
    badge: { small: "体験レッスン", big: "0円", foot: "通常5,500円" },
    /* キャッチBは「青葉台で始める」を含むので、帯で同じ言葉を繰り返さない。 */
    subVariants: {
      A: ["青葉台で始める、", "女性専用パーソナルマシンピラティス。"],
      B: ["姿勢も、ボディラインも。", "女性専用・完全個室のマンツーマン。"],
    },
    support: "一人ひとりの身体に合わせたマンツーマンレッスンで、\n理想の身体づくりをサポート。",
    points: [
      { top: "青葉台駅西口", bottom: "徒歩2分" },
      { top: "女性専用", bottom: "完全個室" },
      { top: "完全", bottom: "マンツーマン" },
      { top: "ピラティス", bottom: "初心者歓迎" },
    ],
    price: {
      label: "初回体験レッスン",
      was: "5,500円",
      now: "0",
      unit: "円",
    },
  },

  cta: {
    variants: { A: "体験レッスンの空き状況を見る", B: "青葉台店の体験予約はこちら" },
    spots: {
      header: "空き状況を見る",
      fv: "体験レッスンの空き状況を見る",
      offer: "青葉台店の体験予約はこちら",
      flow: "体験レッスンの空き状況を見る",
      closing: "青葉台店の体験予約はこちら",
      sticky: "体験レッスンの空き状況を見る",
    },
  },

  worry: {
    heading: "こんなお悩み、\nありませんか？",
    items: [
      "猫背や巻き肩など、\n姿勢の崩れが気になる",
      "年齢とともにお腹や\nお尻のラインが気になってきた",
      "身体が硬くなり、\n動きにくさを感じる",
      "運動不足だけど、\nハードな運動は苦手",
      "ジムや自己流の運動が\n長続きしない",
      "自分の身体に合った運動を\n教えてほしい",
    ],
    closing: "そんなお悩みを持つ女性に。\nSAKURAの\nパーソナルマシンピラティス。",
  },

  future: {
    kicker: "FUTURE",
    heading: "SAKURAで、\n目指せる未来。",
    items: [
      {
        num: "01",
        title: "すらっと美しい姿勢へ",
        body: "猫背や巻き肩など、日常の姿勢のクセにアプローチ。自然と背すじを伸ばしたくなるような、美しい姿勢を目指します。",
        img: { placeholder: "姿勢の指導", src: `${IMG}/future-1.jpg`, position: "40% center" },
      },
      {
        num: "02",
        title: "引き締まったボディラインへ",
        body: "お腹・お尻・背中など、気になる部位に合わせてアプローチ。しなやかで美しい身体づくりをサポートします。",
        img: { placeholder: "ボディライン", src: `${IMG}/future-2.jpg`, position: "45% center" },
      },
      {
        num: "03",
        title: "しなやかで動きやすい身体へ",
        body: "柔軟性や身体の動かしやすさを意識したレッスン。毎日の動作をもっと心地よく、軽やかに。",
        img: { placeholder: "ストレッチ", src: `${IMG}/future-3.jpg` },
      },
      {
        num: "04",
        title: "自分を大切にする習慣へ",
        body: "仕事や家事などで忙しい毎日にも、自分の身体と向き合う時間を。無理なく続けられる、新しい運動習慣を目指します。",
        img: { placeholder: "リラックス", src: `${IMG}/future-4.jpg`, position: "55% center" },
      },
    ],
    closing: "変わるのは、見た目だけじゃない。\n毎日をもっと心地よく。",
  },

  /* 出典: ヒアリング Q13・Q17・Q21、公式 /studios/aobadai/ */
  reasons: {
    kicker: "REASON",
    heading: "SAKURAが\n選ばれる4つの理由",
    items: [
      {
        num: "01",
        title: "完全マンツーマンだから、\n自分に合ったレッスン",
        body: "身体の状態や悩み、目指したい目標は一人ひとり異なります。SAKURAでは、その日のコンディションや目的に合わせてレッスンをご提案。インストラクターが1対1で丁寧にサポートするため、初めての方でも安心して取り組めます。",
        img: { placeholder: "マンツーマン指導", src: `${IMG}/reason-1.jpg` },
      },
      {
        num: "02",
        title: "女性専用・完全個室の\nプライベート空間",
        body: "スタッフもインストラクターも全員女性。周囲の目を気にすることなく、姿勢やボディラインなどの悩みも気軽に相談できます。お子様連れでのご来店もOKです。",
        img: { placeholder: "青葉台店の個室", src: `${IMG}/studio-room.jpg` },
      },
      {
        num: "03",
        title: "全米スポーツ医学協会の\n有資格者が監修したプログラム",
        body: "ピラティスにボディメイクの視点を組み合わせた独自のメソッド。身体の使い方や姿勢を確認しながら、マシンを活用して無理のないペースで理想の身体づくりをサポートします。",
        img: { placeholder: "マシン指導", src: `${IMG}/reason-3.jpg` },
      },
      {
        num: "04",
        title: "青葉台駅徒歩2分。\n日常生活に取り入れやすい",
        body: "東急田園都市線・青葉台駅西口から徒歩2分。朝8時から夜21時半まで営業しているので、お買い物の前後や仕事帰り、子育ての合間にも通いやすい立地です。",
        img: { placeholder: "笑顔の女性", src: `${IMG}/reason-4.jpg`, position: "center 30%" },
      },
    ],
  },

  /* 出典: ヒアリング Q7・Q9・Q10、公式 /studios/aobadai/ */
  offer: {
    heading: "まずは、\n体験レッスンから。",
    lead: "自分の身体に合ったピラティスを、\n青葉台で体験してみませんか？",
    label: "初回体験レッスン",
    duration: "約60分",
    was: "5,500円",
    now: "0",
    unit: "円",
    points: ["完全\nマンツーマン", "女性専用\n完全個室", "ピラティス\n初心者歓迎", "ウェア・靴下\nレンタル無料"],
    photo: { placeholder: "体験レッスン", src: `${IMG}/offer.jpg` },
    joinLead: "体験当日のご入会で",
    perks: [
      { label: "入会金・事務手数料", was: "33,000円", now: "0円" },
      {
        label: "乗り換え特典",
        now: "2ヶ月目半額",
        note: "他スタジオからの乗り換えが対象。3ヶ月の月額プラン加入が条件・回数券は対象外",
      },
      { label: "ピラティスソックス", now: "プレゼント" },
    ],
  },

  personal: {
    kicker: "PERSONAL",
    heading: "一人ひとり違う身体だから、\nレッスンも一人ひとりに。",
    body: [
      "姿勢のクセも、身体の悩みも、目指したい理想も、人それぞれ。",
      "SAKURAでは、カウンセリングを通じてお悩みや目的を伺い、一人ひとりに合わせたレッスンをご提案します。",
      "インストラクターが身体の動きを確認しながら進めるため、初めての方でも安心して取り組めます。",
    ],
    photo: { placeholder: "マンツーマン指導", src: `${IMG}/personal.jpg` },
    approachLabel: "こんなお悩みにアプローチ",
    approaches: [
      "猫背・巻き肩・反り腰などの姿勢の悩み",
      "お腹・お尻・背中などのボディライン",
      "身体の柔軟性や動かしやすさ",
      "運動不足や身体づくり",
    ],
  },

  /* 出典: 指示書 ⑧、公式店舗LP「体験予約の流れ」 */
  flow: {
    kicker: "FLOW",
    heading: "体験レッスンの流れ",
    steps: [
      { num: "01", title: "WEB予約", body: "ご希望の日時を選んで、体験レッスンを予約。空き状況はその場で確認できます。" },
      { num: "02", title: "ご来店", body: "予約日時に合わせて、青葉台店へお越しください。青葉台駅西口から徒歩2分です。" },
      {
        num: "03",
        title: "お着替え",
        body: "動きやすい服装にお着替えいただきます。体験時のウェア・靴下は無料でレンタルできます。",
        img: { placeholder: "青葉台店のお着替えスペース", src: `${IMG}/studio-changing.jpg` },
      },
      {
        num: "04",
        title: "カウンセリング",
        body: "姿勢や身体のお悩み、目指したい目標などをお伺いします。",
        img: { placeholder: "カウンセリング", src: `${IMG}/flow-counseling.jpg` },
      },
      {
        num: "05",
        title: "マシンピラティス体験",
        body: "インストラクターがマンツーマンで、身体に合わせたレッスンを行います。",
        img: { placeholder: "マシンピラティス", src: `${IMG}/flow-lesson.jpg` },
      },
      {
        num: "06",
        title: "体験フィードバック",
        body: "体験後、ご希望に合わせて料金プランや通い方をご説明します。",
        img: { placeholder: "青葉台店のカウンセリングスペース", src: `${IMG}/studio-counseling.jpg` },
      },
    ],
  },

  /* 出典: 公式 /studios/aobadai/（2026-10-14 確認）・ヒアリング Q4 */
  access: {
    kicker: "ACCESS",
    heading: "青葉台駅徒歩2分。\n暮らしの中に、ピラティスを。",
    lead: "東急田園都市線・青葉台駅西口から徒歩2分。駅前でのお買い物や仕事帰り、日常のお出かけにも合わせて通いやすいスタジオです。忙しい毎日の中でも、自分の身体を整える時間を取り入れてみませんか？",
    points: [
      "青葉台駅西口 徒歩2分",
      "青葉台東急スクエアでの\nお買い物の前後にも",
      "藤が丘・田奈・長津田方面からも\n通いやすい",
      "仕事帰りや普段のお出かけにも",
    ],
    photo: { placeholder: "青葉台店の店内", src: `${IMG}/studio-main.jpg` },
    gallery: [
      { placeholder: "チェア", src: `${IMG}/studio-chair.jpg` },
      { placeholder: "パウダースペース", src: `${IMG}/studio-powder.jpg` },
      { placeholder: "レンタルウェア", src: `${IMG}/studio-wear.jpg` },
    ],
    name: "パーソナルマシンピラティス SAKURA 青葉台店",
    rows: [
      { label: "住所", value: "〒227-0062\n神奈川県横浜市青葉区青葉台1-5-7\n司ビル 407" },
      { label: "アクセス", value: "東急田園都市線\n青葉台駅西口 徒歩2分" },
      { label: "営業時間", value: "8:00〜21:30" },
      { label: "定休日", value: "年末年始（12/29〜1/3）" },
    ],
    route: "西口から東急スクエアSouth方面へ進み、階段を降りて横断歩道を渡った先の司ビルへ。エレベーターで4階へお上がりください。",
    mapQuery: "神奈川県横浜市青葉区青葉台1-5-7 司ビル",
  },

  /* 出典: 指示書 ⑪、公式 /faq/、ヒアリング Q15（お子様同伴可） */
  faq: {
    kicker: "FAQ",
    heading: "よくあるご質問",
    items: [
      {
        q: "ピラティスが初めてでも大丈夫ですか？",
        a: "はい。SAKURAではピラティス未経験から始める方も多く、インストラクターがマンツーマンで丁寧にサポートします。",
      },
      {
        q: "身体が硬くても参加できますか？",
        a: "はい。身体の状態に合わせて、無理のない範囲でレッスンを進めます。",
      },
      {
        q: "体験時に持ち物は必要ですか？",
        a: "体験時はウェア・靴下を無料でレンタルできますので、手ぶらでお越しいただけます。ご入会をご希望の場合はクレジットカードをお持ちください。",
      },
      {
        q: "体験レッスンは何分ですか？",
        a: "お着替えやプランのご説明を含めて約60分です。",
      },
      {
        q: "女性専用ですか？",
        a: "はい。女性専用スタジオで、女性インストラクターがレッスンを担当します。",
      },
      {
        q: "子ども連れでも通えますか？",
        a: "はい。お子様連れでのご来店も可能です。ご予約の際にお知らせください。",
      },
      {
        q: "体験後は必ず入会しなければいけませんか？",
        a: "体験後に料金プランをご案内しますので、内容をご確認のうえ、ご自身でご検討いただけます。",
      },
    ],
  },

  closing: {
    heading: "これからの自分のために、\n身体を整える新習慣を。",
    sub: "姿勢も、ボディラインも、\n無理なく自分らしく。\n青葉台で始める、\n女性専用パーソナルマシンピラティス。",
    offerLabel: "初回体験レッスン",
    chips: ["女性専用", "完全個室", "初心者歓迎"],
  },

  /* ハコモノの青葉台店・体験予約ウィジェット（studioId=57 が青葉台店）。店舗選択を挟まず直接開く。
     2026-10-14 営業指定で /reserve/schedule/57/31 から差し替え。 */
  reserve: {
    url: "https://reserve.sakura-pilates.jp/widgets/38?isShowProgramName=false&studioId=57",
  },

  sticky: { offers: ["体験レッスン ¥0", "入会金 ¥0"] },
};

export default config;
