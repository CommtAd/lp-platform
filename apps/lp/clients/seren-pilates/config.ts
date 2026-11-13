import type { ClientStatus } from "@shared/index";

/**
 * Seren Pilates Studio（セレンピラティス）— 白金高輪店・錦糸町店・南行徳店。
 *
 * 構成は指示書の18セクション固定。料金プランのセクションは「一旦非表示」の
 * 指示により丸ごと落としている（`page.tsx` にもコメントを残してある）。
 *
 * 予約導線は店舗ごとの予約ページへ直接外部遷移する（`stores.items[].reserveUrl`）。
 * 3店舗とも hacomono の店舗別予約ウィジェット
 * （`/widgets/{ウィジェットID}?isShowProgramName=false&studioId={店舗ID}`、顧客指定のURL）。
 * ページ内フォームを持たないため、
 * `scripts/check-rules.ts` の FORM_EXEMPT に `seren-pilates` を登録している。
 * LPShell は必須なので維持。
 *
 * 年代訴求は `TARGET_AGE` 1か所で持つ。広告テストで「35歳から」などに
 * 切り替えるときはここだけ書き換えれば、FV・お悩み・理由・予約の見出しが揃って変わる。
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
  supervision?: { pre: string; num?: string; post: string };

  fv: {
    hero: Slot;
    /** 写真上部のメインコピー。`catchAge` だけ特大・メインカラーで立てる。 */
    catchAge: string;
    catchAgeSuffix: string;
    catchMain: string;
    /** 写真下部に並べる円形バッジ（3つ）。"\n" で改行。 */
    features: string[];
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
      /** 店舗の予約ページ。予約CTAはすべて店舗別のボタンとして並ぶ。 */
      reserveUrl: string;
    }[];
  };
  /** ⑯FAQ。 */
  faq: { heading: string; items: { q: string; a: string }[] };
  /** ⑰クロージング。 */
  closing: { heading: string; lead: string; chips: string[] };

  /** 予約CTA。⑥⑨⑬⑰の4箇所で、店舗ごとのボタンとして並べる。 */
  reserve: { label: string; note: string };
  /** ⑱追従フッターCTA。 */
  sticky: {
    buttonText: string;
    showAfter: number;
    offers: { label: string; value: string }[];
  };
}

const ASSET = "/clients/seren-pilates";

/**
 * 年代訴求。LP内の「40代から」はすべてここから組み立てている。
 * 「35歳」のように書き換えると「35歳からのマシンピラティス」になる。
 */
export const TARGET_AGE = "40代";

const config: SerenConfig = {
  slug: "seren-pilates",
  status: "draft",
  meta: {
    title: `Seren Pilates Studio｜${TARGET_AGE}からのマシンピラティス｜白金高輪・錦糸町・南行徳`,
    description:
      `${TARGET_AGE}からの姿勢や体型の変化に。AI姿勢分析付きの完全マンツーマン体験レッスンが980円（通常11,550円）。国家資格「理学療法士」が研修に携わるプログラム。白金高輪店・錦糸町店・南行徳店。`,
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
    stores: ["白金高輪・錦糸町・南行徳"],
    note: "パーソナル マシンピラティス",
  },

  offerBar: {
    badgeText: "初回限定",
    text: "体験レッスン 980円",
  },

  fv: {
    /* 顧客撮影（2026/10/30・錦糸町店）。カウンセリング中の1枚。 */
    hero: { placeholder: "FVメイン写真", src: `${ASSET}/fv-counseling.jpg` },
    catchAge: TARGET_AGE,
    catchAgeSuffix: "からの",
    catchMain: "マシンピラティス",
    features: ["完全\nマンツーマン", "AI\n姿勢分析", "一人ひとりに\n合わせた\nレッスン"],
    subLines: ["年齢とともに変わる姿勢や体型に。", "今のあなたに合った身体づくりを。"],
    notes: ["猫背・巻き肩", "反り腰", "下腹", "肩こり"],
  },

  campaign: {
    badge: "初めての方限定",
    title: "約75分のお試し体験",
    lead:
      "AI姿勢分析付きの\nマンツーマン約75分を、\n980円でお受けいただけます。",
    trialRegular: "11,550",
    trialNow: "980円",
  },

  worry: {
    heading: `${TARGET_AGE}から、\nこんなお悩みありませんか？`,
    items: [
      "最近、下腹や背中のお肉が\n気になってきた",
      "昔より姿勢が悪くなった気がする",
      "肩こりや身体の重さを\n感じやすくなった",
      "運動したいけど、何から\n始めればいいか分からない",
      "無理なく続けられる運動を探している",
    ],
    closing: "これからの自分のために、\n今こそ身体と向き合う時間を。",
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
    heading: `${TARGET_AGE}からの女性に\nSerenが選ばれる理由`,
    items: [
      {
        num: "01",
        title: "人目を気にせず、自分のペースで\n完全マンツーマン",
        body: "レッスンの最初から最後まで、インストラクターがあなた一人を担当します。スタジオを同時にご利用いただくのは最大2名まで。周りの目を気にせず、体型のことも身体の不安も気兼ねなくご相談いただけます。その日の体調まで伺ったうえで、負荷とメニューを組み立てます。",
        img: { placeholder: "マンツーマン指導", src: `${ASSET}/reason-01-manto.jpg` },
      },
      {
        num: "02",
        title: "自分では気づけない癖を\nAI姿勢分析で見える化",
        body: "専用タブレットで数枚撮影し、自分では気づきにくい姿勢の癖や左右差を、数値と画面で確認します。結果をインストラクターと一緒に見ながら、一人ひとりに合わせたレッスン内容を決めていきます。来店ごとの記録を見比べることもできます。",
        img: { placeholder: "AI姿勢分析", src: `${ASSET}/reason-02-ai.jpg` },
      },
      {
        num: "03",
        title: "運動が久しぶりでも\n無理なく始められるマシンピラティス",
        body: "マシンのスプリングが動きを支えてくれるので、筋力や柔軟性に自信がなくても正しいフォームで動けます。運動経験や身体の状態に合わせて負荷を細かく調整し、無理のない範囲から少しずつ進めます。",
        img: { placeholder: "マシンピラティス", src: `${ASSET}/reason-03-machine.jpg` },
      },
      {
        num: "04",
        title: "国家資格「理学療法士」が\n研修",
        body: "身体の専門知識を持つ理学療法士が所属し、インストラクターの研修にも携わっています。一人の指導者の経験だけに頼らない、共有されたメソッドでお迎えします。",
        img: { placeholder: "インストラクター", src: `${ASSET}/reason-04.jpg` },
      },
    ],
  },

  posture: {
    heading: "AI姿勢分析で、\n今の姿勢を知ることから。",
    body: "専用タブレットで正面・側面などを数枚撮影し、姿勢のバランスや身体の傾きの傾向を「見える化」します。身体を動かす検査ではないので、運動が久しぶりの方にも負担はありません。結果はインストラクターと画面を一緒に見ながら確認し、その日のレッスンにそのまま活かします。",
    photo: { placeholder: "AI姿勢分析の様子", src: `${ASSET}/posture-tablet.jpg` },
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
        body: "ご希望の店舗の予約ボタンから、日時をお選びください。",
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
        name: "白金高輪店",
        appeal: "白金高輪駅から徒歩3分。\n完全予約制のプライベートスタジオ。",
        address: "〒108-0074\n東京都港区高輪1-17-15\nオーク高輪ビル 3F",
        hours: "営業開始 9:00",
        closed: "不定休",
        access: ["東京メトロ南北線・都営三田線「白金高輪駅」1番出口から徒歩3分"],
        img: { placeholder: "白金高輪店 スタジオ", src: `${ASSET}/studio-shirokane.jpg` },
        mapEmbedSrc:
          "https://maps.google.com/maps?q=" +
          encodeURIComponent("東京都港区高輪1-17-15 オーク高輪ビル") +
          "&z=17&output=embed",
        reserveUrl: "https://sanare-pilates.hacomono.jp/widgets/9?isShowProgramName=false&studioId=2",
      },
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
        reserveUrl: "https://sanare-pilates.hacomono.jp/widgets/11?isShowProgramName=false&studioId=3",
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
        reserveUrl: "https://sanare-pilates.hacomono.jp/widgets/12?isShowProgramName=false&studioId=4",
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
    heading: `${TARGET_AGE}から始める、\n私のためのマシンピラティス`,
    lead: "まずは体験レッスンで、\n今の自分の身体を知ることから。",
    chips: ["初めての方限定", "AI姿勢分析付き", "マンツーマン約75分", "入会金0円"],
  },

  reserve: {
    label: "体験レッスンを予約する",
    note: "初回体験 980円｜当日ご入会で入会金0円｜しつこい勧誘はいたしません。",
  },

  sticky: {
    buttonText: "体験レッスンを予約する",
    showAfter: 620,
    offers: [{ label: "体験レッスン", value: "980円" }],
  },
};

export default config;
