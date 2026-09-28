import type { ClientStatus } from "@shared/index";

/**
 * WAKATA PHYSIO STUDIO（WPS）— 名古屋市緑区若田の理学療法士監修マシンピラティス。
 * テスト枠（slug: wps-test）。既存の本番LP `wps-pilates` とは別枠で、
 * 指示書の18セクション構成に組み直した版。
 *
 * 構成は指示書の18セクション固定。料金プランのセクションは「一旦非表示」の
 * 指示により丸ごと落としている（`page.tsx` にもコメントを残してある）。
 *
 * 予約導線は公式サイトと同じ Square（wakata-physio-studio.square.site）へ
 * 外部遷移する。ページ内フォームを持たないため、`scripts/check-rules.ts` の
 * FORM_EXEMPT に `wps-test` を登録している。LPShell は必須なので維持。
 *
 * 配色は公式サイト（www5d.biglobe.ne.jp/wakata/wpsdo/）とロゴの実測から起こした3色構成。
 *   - メインカラー #006C38 … ロゴのブランドグリーン #009944 を暗くした深緑。
 *     白地で 6.6:1 出るので見出し・本文の濃色・CTA・濃色セクションの地に使える。
 *     ロゴ色そのままだと 3.7:1 で本文サイズに足りない。
 *   - 淡色の地 #F6F0E5 … 公式サイトが敷いている生成りそのまま。
 *   - 基本の地 #FCFBF8 … ほぼ白。
 *   - 中間トーン #009944 … ロゴのブランドグリーン。チェックアイコン・数字の
 *     強調用（白地 3.7:1）。
 * **ゴールドなど、ブランドに無い4色目を足さないこと。**
 *
 * ⚠️ 掲載前に顧客確認が必要な箇所:
 *   1. キャンペーン期限「9/30まで」。本番LP `wps-pilates` には終了日の記載が無く、
 *      指示書が期限バッジ「〇/〇まで」を必須にしているため月末で仮置きしている。
 *   2. 「実質0円」の表記。当日入会が条件で、入会しない場合は5,000円（税込）。
 *      指示書のひな型は「完全無料」だが、条件付きなので文言を変えている。
 *   3. 店舗外観の写真が素材庫に無いため、⑮店舗情報はスタジオ内の写真で代用している。
 */

interface Slot {
  placeholder: string;
  src?: string | null;
  position?: string;
}

export interface WpsTestConfig {
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
    /** 二重価格の直下に置く条件の注記。 */
    note: string;
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
  /** ⑫姿勢・動作分析の説明。 */
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

const ASSET = "/clients/wps-test";
/** 公式サイトの「体験お申し込み」と同じ Square の予約ページ。 */
const RESERVE_URL = "https://wakata-physio-studio.square.site/";

const config: WpsTestConfig = {
  slug: "wps-test",
  status: "draft",
  meta: {
    title:
      "WAKATA PHYSIO STUDIO｜理学療法士監修のマシンピラティス｜名古屋市緑区若田",
    description:
      "名古屋市緑区若田のマシンピラティススタジオ。理学療法士・柔道整復師が姿勢と動作を分析し、不調の原因にアプローチします。初回体験は実質0円（通常5,000円税込）・入会金／事務手数料0円。平日21時まで営業、駐車場完備。",
    /*
       相対パスで書くと metadataBase が別ドメインに解決されてしまうため、
       OGPは必ず本番の絶対URLで持つ。
    */
    ogpImage: "https://fitness-lp.commitad.com/clients/wps-test/ogp.jpg",
  },

  accent: "#006C38",

  header: {
    brand: "WAKATA PHYSIO STUDIO",
    brandSub: "ワカタ フィジオ スタジオ",
    stores: ["名古屋市緑区若田"],
    note: "マシンピラティス",
  },

  offerBar: {
    // ⚠️ 期限は仮置き。本番LPに終了日の記載が無いため、顧客確認が必要。
    badgeText: "9/30まで",
    text: "無料体験レッスン受付中",
  },

  supervision: {
    pre: "国家資格",
    num: "理学療法士・柔道整復師",
    post: "が在籍・監修",
  },

  fv: {
    hero: { placeholder: "スタジオとリフォーマー", src: `${ASSET}/hero.jpg`, position: "58% 32%" },
    /* 公式サイトの「身体を分析し、根本改善」という立ち位置から。先頭が右の札。 */
    catchLines: ["身体を分析し、", "根本から整える。"],
    chips: [{ small: "姿勢・動作分析", big: "付き" }],
    subLines: ["理学療法士が、今の身体を分析。", "ピラティスで、正しく動かしていく。"],
    notes: ["肩こり", "腰痛", "反り腰", "巻き肩"],
  },

  campaign: {
    // ⚠️ 期限は仮置き。offerBar.badgeText と揃えている。
    badge: "9月30日まで",
    title: "50分のお試し体験",
    lead:
      "カウンセリングから姿勢・動作分析、\nマシンピラティス体験、フィードバックまで。\nWPSのプログラムを一通り、\n50分でお試しいただけます。",
    trialRegular: "5,000",
    // 当日入会が条件のため「完全無料」ではなく「実質0円」で置いている。
    trialNow: "実質0円",
    // 改行位置を指定しないと「す。」が1行に取り残される。
    note: "※当日ご入会の場合。ご入会されない場合は\n5,000円（税込）です。",
  },

  worry: {
    heading: "こんなお悩み、\nありませんか？",
    items: [
      "肩こりや腰痛が、もう何年も\n続いている",
      "反り腰・巻き肩が気になって\nきた",
      "人から「姿勢が悪い」と\n言われることが増えた",
      "疲れが抜けにくく、動くのが\n億劫になってきた",
      "マッサージに通っても、\nすぐ元に戻ってしまう",
    ],
    closing: "その不調は、\n身体の使い方のクセに\nあるかもしれません。",
  },

  future: {
    heading: "WPSで、\n目指せる身体。",
    items: [
      {
        num: "01",
        title: "背すじが伸びる",
        body: "骨盤と背骨の位置から整えるので、何気ない立ち姿そのものが変わります。",
        img: { placeholder: "まっすぐ立つ", src: `${ASSET}/future-01.jpg` },
      },
      {
        num: "02",
        title: "肩と首が軽い",
        body: "内へ巻いた肩を戻し、こり固まっていた背中まわりがほぐれていきます。",
        img: { placeholder: "肩まわり", src: `${ASSET}/future-02.jpg` },
      },
      {
        num: "03",
        title: "腰がラクになる",
        body: "腹圧を支えるインナーマッスルが働き、腰にかかる負担が減っていきます。",
        img: { placeholder: "体幹", src: `${ASSET}/future-03.jpg` },
      },
      {
        num: "04",
        title: "軽やかに動ける",
        body: "使えていなかった筋肉が目覚め、階段も旅行も億劫に感じにくくなります。",
        img: { placeholder: "動ける身体", src: `${ASSET}/future-04.jpg` },
      },
    ],
    closing: "変わるのは、\n見た目だけではありません。",
  },

  reasons: {
    heading: "WPSが選ばれる理由",
    items: [
      {
        num: "01",
        title: "分析してから動かす、\nWPS独自のアプローチ",
        body: "いきなり鍛えるのではなく、まず身体の状態を読み解きます。どこが動かず、どこが働きすぎているのかを確かめたうえでマシンピラティスに入るので、その日の一回が的外れになりません。",
        img: { placeholder: "マシン指導", src: `${ASSET}/reason-01.jpg` },
      },
      {
        num: "02",
        title: "国家資格を持つスタッフが\n在籍・監修",
        body: "理学療法士と柔道整復師が在籍し、プログラムを監修しています。身体の専門知識を土台にしているので、痛みや不調を抱えた状態からでも、無理のない範囲を見極めてご案内できます。",
        img: { placeholder: "スタッフ", src: `${ASSET}/reason-02.jpg` },
      },
      {
        num: "03",
        title: "本格マシンを備えた\nパーソナル・少人数制",
        body: "リフォーマーをはじめとする専用マシンを完備。パーソナルと少人数制グループをご用意しているので、周囲に気を遣わず、その日の自分の身体だけに集中していただけます。",
        img: { placeholder: "スタジオ内観", src: `${ASSET}/reason-03.jpg` },
      },
      {
        num: "04",
        title: "平日21時まで・駐車場完備で\n通い続けやすい",
        body: "仕事帰りにも立ち寄れるよう平日は21時まで、土日も17時まで営業しています。駐車場を完備しているので、お車でも通っていただけます。続けられることを前提にした環境です。",
        img: { placeholder: "スタジオのエントランス壁", src: `${ASSET}/reason-04.jpg`, position: "center 30%" },
      },
    ],
  },

  posture: {
    heading: "まずは、今の身体を\n知ることから。",
    body: "体験では、カウンセリングのあとに姿勢と動作のチェックを行います。立ち姿のバランス、関節の動く範囲、左右差、日常の動きのクセを一つひとつ確認し、不調がどこから来ているのかを一緒に探していきます。痛みを伴う検査ではないので、運動が久しぶりの方にもご負担はありません。結果はその場でご説明し、当日のピラティスにそのまま活かします。",
    photo: { placeholder: "姿勢・動作チェックの様子", src: `${ASSET}/posture.jpg`, position: "center 12%" },
    items: [
      "立ち姿のバランスと身体の傾き",
      "肩の高さ・骨盤の左右差",
      "背骨のカーブ（猫背・反り腰の傾向）",
      "関節の動く範囲（可動域）",
      "日常動作に出ている動きのクセ",
    ],
  },

  flow: {
    heading: "体験レッスンの流れ",
    steps: [
      {
        num: "1",
        title: "WEBでご予約",
        body: "予約ページから、ご希望の日時をお選びください。",
        time: "約2分",
      },
      {
        num: "2",
        title: "ご来店・受付",
        body: "開始の10分前を目安にお越しください。駐車場を完備しています。",
        time: "10分前",
      },
      {
        num: "3",
        title: "お着替え",
        body: "動きやすいウェアにお着替えいただきます。ウェアはご持参ください。",
      },
      {
        num: "4",
        title: "カウンセリング",
        body: "気になる症状やお悩み、目標を伺います。痛みのある方はこの場でご相談ください。",
      },
      {
        num: "5",
        title: "姿勢・動作分析",
        body: "姿勢のバランスや可動域、動きのクセを確認し、不調の原因を探します。",
      },
      {
        num: "6",
        title: "ピラティス体験・フィードバック",
        body: "分析結果に合わせてマシンピラティスを体験し、今後の進め方をご説明します。",
        time: "50分",
      },
    ],
  },

  beginner: {
    heading: "初めてでも、大丈夫です。",
    body: "ご来店される方のほとんどが、ピラティス未経験からのスタートです。マシンが動きを支えてくれるので、身体が硬い方や運動から離れていた方こそ、無理なく正しいフォームで動けます。痛みや不調を抱えた状態でのご相談も、国家資格を持つスタッフがお受けします。",
    items: [
      "運動経験ゼロでOK",
      "身体が硬くてもOK",
      "痛みがあってもOK",
      "パーソナル対応",
      "平日21時まで営業",
      "駐車場完備",
    ],
  },

  stores: {
    heading: "スタジオのご案内",
    items: [
      {
        name: "WAKATA PHYSIO STUDIO",
        appeal: "名古屋市緑区若田。\n駐車場完備で、お車でも通えます。",
        address: "〒458-0034\n愛知県名古屋市緑区若田3丁目1002",
        // 1行に流すと「祝日」が改行で割れるため、曜日区分ごとに改行する。
        hours: "平日 9:00〜21:00\n土日 9:00〜17:00\n祝日 9:00〜14:00",
        closed: "不定休",
        access: [
          "名鉄名古屋本線「左京山駅」より徒歩20分",
          "名鉄名古屋本線「有松駅」より徒歩15分",
          "名古屋市営バス「若田」下車 徒歩1分",
          "名古屋市営バス「緑保健所」下車 徒歩5分",
        ],
        // ⚠️ 外観写真が素材庫に無いため、スタジオ内の写真で代用している。
        img: { placeholder: "スタジオ内のレッスン風景", src: `${ASSET}/studio.jpg`, position: "center 45%" },
        mapEmbedSrc:
          "https://maps.google.com/maps?q=" +
          encodeURIComponent("愛知県名古屋市緑区若田3丁目1002") +
          "&z=17&output=embed",
      },
    ],
  },

  faq: {
    heading: "よくあるご質問",
    items: [
      {
        q: "運動が苦手で、身体も硬いのですが大丈夫ですか？",
        a: "問題ありません。マシンが動きを支えてくれるので、身体が硬い方や運動から離れていた方こそ、無理なく正しいフォームで動けます。国家資格を持つスタッフが一人ひとりの状態に合わせてご案内します。",
      },
      {
        q: "痛みや不調があっても受けられますか？",
        a: "姿勢と動作を丁寧に確認したうえで、無理のない範囲でプログラムを組み立てます。気になる症状は体験時のカウンセリングでお気軽にご相談ください。",
      },
      {
        q: "体験当日は何を持っていけばよいですか？",
        a: "動きやすいウェアをご持参ください。靴下があると安心です。お水はプレゼントしております。",
      },
      {
        q: "体験のあと、しつこい勧誘はありませんか？",
        a: "いたしません。体験後に身体の状態とプランをご説明しますが、その場でご入会いただく必要はありません。ご自宅でゆっくりご検討ください。",
      },
    ],
  },

  closing: {
    heading: "今の身体を知ることから、\n始めてみませんか。",
    lead: "9月30日までのご予約で、\n通常5,000円の体験が実質0円に。",
    chips: ["初めての方限定", "姿勢・動作分析付き", "入会金0円", "事務手数料0円"],
  },

  reserve: {
    label: "無料体験レッスンを予約する",
    url: RESERVE_URL,
    // 1行に流すと「いた／しません」と語の途中で割れるため、改行位置を指定する。
    note: "初回体験 実質0円｜入会金・事務手数料0円\nしつこい勧誘はいたしません。",
  },

  sticky: {
    buttonText: "無料体験レッスンを予約する",
    showAfter: 620,
    offers: [{ label: "初回体験", value: "実質0円" }],
  },
};

export default config;
