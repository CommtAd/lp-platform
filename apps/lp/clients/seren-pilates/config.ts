import type { ClientStatus } from "@shared/index";

/**
 * Seren Pilates Studio（セレンピラティス）— 錦糸町店・南行徳店。
 *
 * 構成は指示書の18セクション固定。料金プランのセクションは「一旦非表示」の
 * 指示により丸ごと落としている（`page.tsx` にもコメントを残してある）。
 *
 * 予約導線は公式サイトと同じ hacomono（https://sanare-pilates.hacomono.jp/）へ
 * 外部遷移する。ページ内フォームを持たないため、`scripts/check-rules.ts` の
 * FORM_EXEMPT に `seren-pilates` を登録している。LPShell は必須なので維持。
 *
 * 配色は公式サイト（seren-pilates.jp）とロゴの実測から起こした3色構成。
 *   - メインカラー #4E5F56 … ロゴのセージ #697970 を暗くした深いセージ。
 *     白地で 6.8:1 出るので見出し・本文の濃色・CTA・濃色セクションの地に使える。
 *     ロゴ色そのままだと 4.6:1 で本文サイズに足りない。
 *   - 淡色の地 #FAF3E2 … ロゴの地色そのまま（生成り）。
 *   - 基本の地 #FCFBF7 … ほぼ白。
 *   - 中間トーン #6B8A72 … チェックアイコン・数字の強調用（白地 3.8:1）。
 * **ゴールドなど、ブランドに無い4色目を足さないこと。**
 */

interface Slot {
  placeholder: string;
  src?: string | null;
  position?: string;
}

export interface SerenConfig {
  slug: string;
  status?: ClientStatus;
  meta: { title: string; description: string; ogpImage?: string };

  /** メインカラー。見出し・CTA・濃色セクションの地。 */
  accent: string;

  header: { brand: string; brandSub: string; stores: string[]; note?: string };
  /** ②メインカラーの帯。左に角丸の期限バッジ、中央にオファー文。 */
  offerBar: { badgeText: string; text: string };
  /** ③白地の細い監修バー。`num` だけ太字・アクセント色で立てる。 */
  supervision: { pre: string; num?: string; post: string };

  fv: {
    hero: Slot;
    /** 縦書きの白い札。**配列の先頭が右**（row-reverse で組むため）。 */
    catchLines: string[];
    /** 右上の円形バッジ。 */
    chips: { small: string; big: string }[];
    /** ⑤FV下のメインカラー帯のサブコピー2行。 */
    subLines: string[];
    /** 同・悩みワードの丸チップ。 */
    notes: string[];
  };

  /** ⑥⑪⑰で使い回す体験キャンペーンのブロック。 */
  campaign: {
    badge: string;
    title: string;
    lead: string;
    /** 打ち消し線を引く通常価格（「円」はレイアウト側で付ける）。 */
    trialRegular: string;
    /** 明朝特大。ページ内で最も大きい要素。 */
    trialNow: string;
  };

  /** ⑦お悩み訴求。 */
  worry: { heading: string; items: string[]; closing: string };
  /** ⑧目指せる未来。 */
  future: {
    heading: string;
    items: { num: string; title: string; body: string; img: Slot }[];
    closing: string;
  };
  /** ⑨選ばれる理由 01〜04。 */
  reasons: {
    heading: string;
    items: { num: string; title: string; body: string; img: Slot }[];
  };
  /** ⑫姿勢診断（AI姿勢分析）の説明。 */
  posture: { heading: string; body: string; photo: Slot; items: string[] };
  /** ⑬体験レッスンの流れ。 */
  flow: {
    heading: string;
    steps: { num: string; title: string; body: string; time?: string }[];
  };
  /** ⑭初めてでも大丈夫。 */
  beginner: { heading: string; body: string; items: string[] };
  /** ⑮店舗情報。 */
  stores: {
    heading: string;
    items: {
      name: string;
      appeal: string;
      address: string;
      hours: string;
      closed: string;
      access: string[];
      img: Slot;
      mapEmbedSrc?: string;
    }[];
  };
  /** ⑯FAQ。 */
  faq: { heading: string; items: { q: string; a: string }[] };
  /** ⑰クロージング。 */
  closing: { heading: string; lead: string; chips: string[] };

  /** 予約CTA。⑥⑨⑬⑰の4箇所だけで使う。 */
  reserve: { label: string; url: string; note: string };
  /** ⑱追従フッターCTA。 */
  sticky: {
    buttonText: string;
    showAfter: number;
    offers: { label: string; value: string }[];
  };
}

const ASSET = "/clients/seren-pilates";
/** 公式サイトと同じ hacomono。店舗と日時は遷移先で選ぶ。 */
const RESERVE_URL = "https://sanare-pilates.hacomono.jp/";

const config: SerenConfig = {
  slug: "seren-pilates",
  status: "draft",
  meta: {
    title: "Seren Pilates Studio｜錦糸町・南行徳のパーソナルマシンピラティス",
    description:
      "AI姿勢分析付きのマンツーマン体験レッスンが、10月15日までのご予約で完全無料（通常11,550円）。国家資格「理学療法士」が所属・監修するプログラム。錦糸町店・南行徳店。",
    /*
       相対パスで書くと metadataBase が別ドメインに解決されてしまうため、
       OGPは必ず本番の絶対URLで持つ。
    */
    ogpImage: "https://fitness-lp.commitad.com/clients/seren-pilates/ogp.jpg",
  },

  accent: "#4E5F56",

  header: {
    brand: "Seren Pilates",
    brandSub: "セレンピラティス",
    stores: ["錦糸町店 / 南行徳店"],
    note: "パーソナル マシンピラティス",
  },

  offerBar: {
    badgeText: "10/15まで",
    text: "無料体験レッスン受付中",
  },

  supervision: {
    pre: "国家資格",
    num: "理学療法士",
    post: "所属・監修のプログラム",
  },

  fv: {
    hero: { placeholder: "FVメイン写真", src: `${ASSET}/hero.jpg`, position: "center" },
    /* 公式サイトのメインコピー。先頭が右の札。 */
    catchLines: ["私の身体を、", "私らしくデザインする。"],
    chips: [{ small: "AI姿勢分析", big: "付き" }],
    subLines: ["AI姿勢分析で、今の身体を知る。", "90分マンツーマンで、整えていく。"],
    notes: ["猫背", "肩こり", "ぽっこりお腹", "反り腰"],
  },

  campaign: {
    badge: "10月15日まで",
    title: "90分のお試し体験",
    lead:
      "10月15日までに体験レッスンを\nご予約いただいた方限定。\nAI姿勢分析付きのマンツーマン90分を、\n無料でお受けいただけます。",
    trialRegular: "11,550",
    trialNow: "完全無料",
  },

  worry: {
    heading: "こんなお悩み、\nありませんか？",
    items: [
      "デスクワークで、猫背と肩こりが\n慢性化している",
      "運動は苦手。何から始めれば\nいいのか分からない",
      "体重よりも、姿勢とくびれを\nどうにかしたい",
      "産後や年齢の変化で、体型が\n戻らなくなってきた",
      "ジムもエステも、結局続かなかった",
    ],
    closing: "その原因は、\n姿勢のクセに\nあるかもしれません。",
  },

  future: {
    heading: "Serenで、\n目指せる未来。",
    items: [
      {
        num: "01",
        title: "背すじが伸びる",
        body: "骨盤と背骨の位置から整えるので、何気ない立ち姿そのものが変わります。",
        img: { placeholder: "姿勢", src: `${ASSET}/future-01.jpg` },
      },
      {
        num: "02",
        title: "体側にゆとり",
        body: "呼吸に合わせて脇腹を伸ばし、詰まっていた体側にゆとりが生まれます。",
        img: { placeholder: "体側", src: `${ASSET}/future-02.jpg` },
      },
      {
        num: "03",
        title: "肩甲骨がひらく",
        body: "内へ巻いた肩を戻し、背中の見える服も気持ちよく着られるように。",
        img: { placeholder: "肩甲骨", src: `${ASSET}/future-03.jpg` },
      },
      {
        num: "04",
        title: "軽やかに動ける",
        body: "支える筋肉が目覚め、階段も旅行も、億劫に感じにくくなります。",
        img: { placeholder: "動ける身体", src: `${ASSET}/future-04.jpg` },
      },
    ],
    closing: "変わるのは、\n体型だけではありません。",
  },

  reasons: {
    heading: "Serenが選ばれる理由",
    items: [
      {
        num: "01",
        title: "その日の身体に合わせた\n完全マンツーマン",
        body: "姿勢・柔軟性・運動経験、そしてその日の体調まで伺ったうえで、負荷とメニューを一つひとつ組み立てます。決まったプログラムをこなすだけのレッスンではありません。",
        img: { placeholder: "マンツーマン指導", src: `${ASSET}/reason-01.jpg` },
      },
      {
        num: "02",
        title: "「なんとなく」で終わらせない\nAI姿勢分析",
        body: "専用タブレットで数枚撮影し、姿勢の傾向を数値と画面で見える化します。結果を一緒に見ながらその日の優先ポイントを決め、来店ごとの記録を見比べることもできます。",
        img: { placeholder: "AI姿勢分析", src: `${ASSET}/reason-02.jpg` },
      },
      {
        num: "03",
        title: "人目を気にせず向き合える\nプライベート空間",
        body: "同時にご利用いただくのは最大2名まで。周囲の視線を気にせず、体型のことも産後のお悩みも、気兼ねなくご相談いただける環境です。",
        img: { placeholder: "スタジオ内観", src: `${ASSET}/reason-03.jpg` },
      },
      {
        num: "04",
        title: "国家資格「理学療法士」が\n所属・監修",
        body: "身体の専門知識を持つ理学療法士が所属し、インストラクターの研修にも携わっています。一人の指導者の経験だけに頼らない、共有されたメソッドでお迎えします。",
        img: { placeholder: "インストラクター", src: `${ASSET}/reason-04.jpg` },
      },
    ],
  },

  posture: {
    heading: "AI姿勢分析で、\n今の姿勢を知ることから。",
    body: "専用タブレットで正面・側面などを数枚撮影し、姿勢のバランスや身体の傾きの傾向を「見える化」します。身体を動かす検査ではないので、運動が久しぶりの方にも負担はありません。結果はインストラクターと画面を一緒に見ながら確認し、その日のレッスンにそのまま活かします。",
    photo: { placeholder: "AI姿勢分析の様子", src: `${ASSET}/posture.jpg` },
    items: [
      "頭の位置（前に出ていないか）",
      "肩の高さの左右差",
      "骨盤の傾きと前後のバランス",
      "背骨のカーブ（猫背・反り腰の傾向）",
      "重心のかかり方と身体の傾き",
    ],
  },

  flow: {
    heading: "体験レッスンの流れ",
    steps: [
      {
        num: "1",
        title: "ご予約",
        body: "予約ページから、ご希望の店舗と日時をお選びください。",
      },
      {
        num: "2",
        title: "ご来店・受付",
        body: "AI姿勢分析のお時間を含め、開始の10分前を目安にお越しください。",
      },
      {
        num: "3",
        title: "お着替え",
        body: "動きやすい服装にお着替えいただきます。更衣室と鍵付きロッカーを完備。",
      },
      {
        num: "4",
        title: "カウンセリング・AI姿勢分析",
        body: "お悩みと目標を伺い、専用タブレットで今の姿勢の傾向を確認します。",
      },
      {
        num: "5",
        title: "パーソナルレッスン",
        body: "分析結果と当日のコンディションに合わせて、マンツーマンで進めます。",
      },
      {
        num: "6",
        title: "結果のご説明",
        body: "身体の変化と、これからの整え方をご説明します。当日入会キャンペーンのご案内がありますので、よろしければご検討ください。",
      },
    ],
  },

  beginner: {
    heading: "初めてでも、大丈夫です。",
    body: "「身体が硬い」「運動が苦手」という方こそ、ピラティスに向いています。マシンが動きを支えてくれるので、無理なく正しいフォームで動けるからです。20代から70代まで、幅広い年代の方が通われています。",
    items: [
      "運動経験ゼロでOK",
      "身体が硬くてもOK",
      "20代〜70代が在籍",
      "女性専用スタジオ",
      "鍵付きロッカー",
      "持ち物は3つだけ",
    ],
  },

  stores: {
    heading: "店舗のご案内",
    items: [
      {
        name: "錦糸町店",
        appeal: "錦糸町駅から徒歩3分。\n光が差し込む開放的なスタジオ。",
        address: "〒130-0022\n東京都墨田区江東橋4-25-10\nオカバ錦糸町ビル 1F Ⅱ",
        hours: "営業開始 9:00",
        closed: "不定休",
        access: [
          "東京メトロ半蔵門線「錦糸町駅」2番出口から徒歩3分",
          "JR総武線「錦糸町駅」南口から徒歩5分",
        ],
        img: { placeholder: "錦糸町店 スタジオ", src: `${ASSET}/studio-kinshicho.jpg` },
        mapEmbedSrc:
          "https://maps.google.com/maps?q=" +
          encodeURIComponent("東京都墨田区江東橋4-25-10 オカバ錦糸町ビル") +
          "&z=17&output=embed",
      },
      {
        name: "南行徳店",
        appeal: "2026年7月オープン。\n最新設備の落ち着いたスタジオ。",
        address: "〒272-0143\n千葉県市川市相之川4-6\nエクセレントマンション 201",
        hours: "営業開始 9:00",
        closed: "不定休",
        access: ["東京メトロ東西線「南行徳駅」より徒歩4分"],
        img: {
          placeholder: "南行徳店 スタジオ",
          src: `${ASSET}/studio-minamigyotoku.jpg`,
        },
        mapEmbedSrc:
          "https://maps.google.com/maps?q=" +
          encodeURIComponent("千葉県市川市相之川4-6 エクセレントマンション") +
          "&z=17&output=embed",
      },
    ],
  },

  faq: {
    heading: "よくあるご質問",
    items: [
      {
        q: "ピラティスが初めてで、身体も硬いのですが大丈夫ですか？",
        a: "問題ありません。マシンが身体の動きを支えてくれるので、身体が硬い方や運動不足の方こそ、無理なく正しいフォームで動けます。レベルに合わせてご案内しますので、ご安心ください。",
      },
      {
        q: "何歳くらいの方が通っていますか？",
        a: "20代から70代まで、幅広い年代の方に通っていただいています。姿勢を整えたい、筋力をつけたい、不調をケアしたいなど、目的もさまざまです。",
      },
      {
        q: "持ち物は何が必要ですか？",
        a: "動きやすい服装・タオル・お飲み物の3つをご用意ください。更衣室と鍵付きロッカーを完備しています。なお、シャワールームのご用意はございません。",
      },
      {
        q: "体験のあと、しつこい勧誘はありませんか？",
        a: "いたしません。レッスン後に身体の状態と適切なプランを一番お得な内容でご入会いただけるようご提案はいたしますが、お客様自身のタイミングでご選択可能です。",
      },
    ],
  },

  closing: {
    heading: "今の身体を知ることから、\n始めてみませんか。",
    lead: "10月15日までのご予約で、\n通常11,550円の体験レッスンが無料に。",
    chips: ["初めての方限定", "AI姿勢分析付き", "マンツーマン90分", "入会金0円"],
  },

  reserve: {
    label: "無料体験レッスンを予約する",
    url: RESERVE_URL,
    note: "初回体験 完全無料｜入会金0円｜しつこい勧誘はいたしません。",
  },

  sticky: {
    buttonText: "無料体験レッスンを予約する",
    showAfter: 620,
    offers: [{ label: "体験レッスン", value: "無料" }],
  },
};

export default config;
