import type { ClientStatus } from "@shared/index";

/**
 * ピラティススタジオ Swan 蒲郡店 — 新規オープン（2027-01-11）のMeta広告用LP。
 *
 * 構成は seren-pilates のLPを踏襲し、デザイン・配色・書体は公式HP
 * （pilates-studio-swan.com）の実測値に合わせている。
 *   - メインカラー #604C3F … 公式HPの見出し・本文・「体験レッスンに申込む」ボタンの地。
 *     白地 8.9:1。CTA・見出し・金額はすべてこの色。
 *   - 地色 #FBF4F1 / #F8EDE8 / #F4E5DC … 公式HPのセクション地（淡いピンクベージュ）。
 *   - サブカラー #EDD3C5 … 公式HPの「詳しくはこちら」ボタンの地。帯・チップに使う。
 *   - アクセント #DEB69C … 公式HPの装飾色。**中間トーンなので文字には使わない**（白地 2.0:1）。
 *   - 見出しは Noto Serif JP、本文は Noto Sans JP（公式HPと同じ）。
 *
 * 予約導線は hacomono。**予約URLは `reserve.url` の1か所だけで持つ。**
 * ページ内の全CTA（FV・特典・理由の後・流れの後・店舗・最下部・追従フッター）が
 * ここを参照するので、自由枠ウィジェットのURLが確定したらここだけ書き換える。
 * ページ内フォームは持たないため、`scripts/check-rules.ts` の FORM_EXEMPT に登録している。
 *
 * キャンペーンは `campaign.endsAt` を過ぎると自動で非表示になる（page.tsx の
 * `isCampaignActive()`）。ISR（60秒）で再生成されるので、終了後1分ほどで切り替わる。
 * 終了後は `afterCampaign` の文言に差し替わり、「無料」「0円」は一切出なくなる。
 */

export interface Slot {
  placeholder: string;
  src?: string | null;
  position?: string;
}

export interface SwanConfig {
  slug: string;
  status?: ClientStatus;
  meta: { title: string; description: string; ogpImage?: string };

  header: { area: string; open: string };

  fv: {
    hero: Slot;
    area: string;
    openLabel: string;
    /** 写真下部に重ねるキャッチ。"\n" で改行。 */
    catch: string;
    /** キャッチの上に置く小見出し。 */
    lead: string;
    sub: string;
    features: string[];
  };

  /**
   * オープン記念キャンペーン。期間・特典はすべてここで変える。
   * `endsAt` を過ぎると全セクションから自動で消える。
   */
  campaign: {
    /** 表示用の期間（短い表記）。FV・追従CTA用。 */
    periodShort: string;
    /** 表示用の期間（長い表記）。見出し用。 */
    periodLong: string;
    /** ISO 8601（JST）。この時刻を過ぎたら非表示。 */
    endsAt: string;
    title: string;
    /** 特典。1つ目が主役（大きく出す）。 */
    benefits: {
      label: string;
      title: string;
      /** FV等のミニカード用の改行入り表記。無ければ title。 */
      miniTitle?: string;
      /** 通常価格（「円」はレイアウト側で付ける）。無ければ二重価格を出さない。 */
      regular?: string;
      now: string;
      note?: string;
    }[];
    /** 二重価格の根拠。公式HPの料金表に合わせている。 */
    priceNote: string;
  };

  /** キャンペーン終了後に差し替わる文言（無料・0円を含めない）。 */
  afterCampaign: {
    title: string;
    lead: string;
    ctaLabel: string;
    stickyNote: string;
    stickyButton: string;
  };

  worry: { heading: string; photo: Slot; items: string[]; closing: string };

  body: {
    heading: string;
    items: { num: string; title: string; text: string; img: Slot }[];
  };

  reasons: {
    heading: string;
    items: {
      num: string;
      title: string;
      text: string;
      img?: Slot;
      /** REASON 03 用。マシンの写真を並べる。 */
      machines?: { name: string; img: Slot }[];
    }[];
  };

  posture: { heading: string; text: string[]; photo: Slot; items: string[]; note?: string };

  /**
   * ビフォーアフター。**掲載許諾のある実素材が無いので未設定（＝セクションごと非表示）。**
   * 素材が届いたら items を足す。既存店舗の事例は `store` に店舗名を必ず入れる。
   */
  beforeAfter?: {
    heading: string;
    items: { worry: string; period: string; store: string; img: Slot }[];
    disclaimer: string;
  };

  flow: {
    heading: string;
    steps: { num: string; title: string; text: string; img: Slot }[];
    note: string;
  };

  beginner: { heading: string; text: string; photo: Slot; items: string[] };

  store: {
    name: string;
    open: string;
    zip: string;
    address: string;
    hours: string;
    hoursNote: string;
    parking: string;
    parkingNote: string;
    mapEmbedSrc: string;
    mapUrl: string;
  };

  /** `campaignOnly` の問いはキャンペーン終了後に自動で消える。 */
  faq: { items: { q: string; a: string; campaignOnly?: boolean }[] };

  closing: { heading: string; lead: string; photo: Slot };

  /** 予約CTA。全CTAがこの1つのURLを参照する。 */
  reserve: { url: string; label: string; note: string };

  sticky: { note: string; buttonText: string; showAfter: number };
}

const ASSET = "/clients/swan-pilates-gamagori";

const ADDRESS = "愛知県蒲郡市三谷北通3丁目185";

const config: SwanConfig = {
  slug: "swan-pilates-gamagori",
  status: "draft",
  meta: {
    title: "ピラティススタジオ Swan 蒲郡店｜2027年1月11日 GRAND OPEN｜大人女性のためのマシンピラティス",
    description:
      "愛知県蒲郡市に、見た目痩せを目指すマシンピラティス専門スタジオ「Swan」がオープン。姿勢から整え、しなやかで美しいボディラインへ。1/11〜1/31はオープン記念で体験レッスン0円・入会金0円・ピラティスソックスプレゼント。駐車場あり。",
    /* 相対パスだと metadataBase が別ドメインに解決されるため、本番の絶対URLで持つ。 */
    ogpImage: "https://fitness-lp.commitad.com/clients/swan-pilates-gamagori/ogp.jpg",
  },

  header: { area: "愛知県蒲郡市", open: "2027.1.11 GRAND OPEN" },

  fv: {
    /* Swan写真① DSC_9480。キャデラックでの指導風景。 */
    hero: { placeholder: "FV メイン写真", src: `${ASSET}/fv.webp`, position: "78% 20%" },
    area: "愛知県蒲郡市",
    openLabel: "2027.1.11 GRAND OPEN",
    lead: "大人女性のためのマシンピラティス",
    catch: "体重よりも、\n見た目を変える。",
    sub: "姿勢から整え、\nしなやかで美しいボディラインへ。",
    features: ["一人ひとりに\n合わせた\nレッスン", "見た目痩せを\n目指す\nボディメイク", "初心者\n歓迎"],
  },

  campaign: {
    periodShort: "1/11〜1/31限定",
    periodLong: "2027年1月11日（月）〜1月31日（日）限定",
    endsAt: "2027-01-31T23:59:59+09:00",
    title: "オープン記念3大特典",
    benefits: [
      { label: "特典 01", title: "体験レッスン", regular: "5,500", now: "0円" },
      { label: "特典 02", title: "入会金", regular: "11,000", now: "0円" },
      { label: "特典 03", title: "ピラティスソックス", miniTitle: "ピラティス\nソックス", now: "プレゼント" },
    ],
    priceNote: "※通常料金は公式サイト掲載のパーソナルレッスン料金（税込）です。",
  },

  afterCampaign: {
    title: "体験レッスン受付中",
    lead: "姿勢診断付きの体験レッスンで、\n今の身体を知ることから始めましょう。",
    ctaLabel: "体験レッスンを予約する",
    stickyNote: "姿勢診断付き 体験レッスン受付中",
    stickyButton: "体験レッスンを予約する",
  },

  worry: {
    heading: "こんなお悩み\nありませんか？",
    /* Swan写真② P1047555 */
    photo: { placeholder: "お悩み", src: `${ASSET}/worry.webp`, position: "50% 8%" },
    items: [
      "年齢とともに体型が変わってきた",
      "下腹やお尻のラインが気になる",
      "猫背や巻き肩、反り腰が気になる",
      "体重を落としても理想の体型にならない",
      "激しい運動や食事制限は続かない",
      "運動を始めたいけど\n何から始めればいいかわからない",
    ],
    closing:
      "体重だけではなく、\n身体の使い方や姿勢に\n目を向けてみませんか？\n\nSwanのマシンピラティスで、\n自分らしい美しさを目指しましょう。",
  },

  body: {
    heading: "姿勢から整える、\n理想のボディライン。",
    items: [
      {
        num: "01",
        title: "すらっと美しい姿勢",
        text: "背骨や骨盤の動きにアプローチし、美しい立ち姿を目指します。",
        img: { placeholder: "姿勢", src: `${ASSET}/future-01.webp`, position: "50% 20%" },
      },
      {
        num: "02",
        title: "すっきりとした\nお腹まわり",
        text: "インナーマッスルを意識したエクササイズで、引き締まったボディラインへ。",
        img: { placeholder: "お腹まわり", src: `${ASSET}/future-02.webp`, position: "50% 40%" },
      },
      {
        num: "03",
        title: "女性らしい\nヒップライン",
        text: "骨盤や股関節の使い方を意識し、メリハリのある身体を目指します。",
        img: { placeholder: "ヒップライン", src: `${ASSET}/future-03.webp`, position: "45% 50%" },
      },
      {
        num: "04",
        title: "しなやかに\n動ける身体",
        text: "柔軟性や身体のバランスを整え、日常生活でも動きやすい身体へ。",
        img: { placeholder: "しなやかな身体", src: `${ASSET}/future-04.webp`, position: "60% 30%" },
      },
    ],
  },

  reasons: {
    heading: "大人女性に\nSwanが選ばれる理由",
    items: [
      {
        num: "01",
        title: "見た目痩せに特化した\nマシンピラティス",
        text: "体重を減らすことだけを目的にせず、背骨や骨盤の“正しい使い方”からアプローチ。きつい筋トレや食事制限に頼らず、女性らしい綺麗な見た目を目指します。",
        img: { placeholder: "見た目痩せ", src: `${ASSET}/reason-01.webp`, position: "50% 25%" },
      },
      {
        num: "02",
        title: "一人ひとりに合わせた\nオーダーメイドレッスン",
        text: "身体の状態やお悩み、その日の体調、目標に合わせてメニューを組み立てます。細かい動きまでインストラクターがサポートするので、自分のペースで無理なく始められます。",
        img: { placeholder: "オーダーメイドレッスン", src: `${ASSET}/reason-02.webp`, position: "50% 10%" },
      },
      {
        num: "03",
        title: "充実のピラティスマシン",
        text: "リフォーマー・キャデラック・チェア・バレルを完備。豊富なマシンを使い分けることで、身体の状態や目的に合わせた幅広いエクササイズが可能です。",
        machines: [
          { name: "リフォーマー", img: { placeholder: "リフォーマー", src: `${ASSET}/machine-reformer.webp` } },
          { name: "キャデラック", img: { placeholder: "キャデラック", src: `${ASSET}/machine-cadillac.webp` } },
          { name: "チェア", img: { placeholder: "チェア", src: `${ASSET}/machine-chair.webp` } },
          { name: "バレル", img: { placeholder: "バレル", src: `${ASSET}/machine-barrel.webp` } },
        ],
      },
      {
        num: "04",
        title: "運動が苦手な方でも\n始めやすい",
        text: "マシンのバネが身体の動きをサポートするため、運動不足の方や柔軟性に自信がない方でも、自分に合った負荷で正しいフォームを身につけられます。",
        img: { placeholder: "初心者", src: `${ASSET}/reason-04.webp`, position: "50% 30%" },
      },
    ],
  },

  posture: {
    heading: "まずは、自分の身体を\n知ることから。",
    text: [
      "体験レッスンでは、カウンセリングと姿勢診断で、今の身体の状態を確認します。",
      "お悩みや目標に合わせてレッスン内容をご提案し、レッスンの前後で写真を撮って比べながら、身体の変化をご説明します。",
    ],
    /* Swan写真③ P1024202。タブレットで撮影した写真を見ながらの説明。 */
    photo: { placeholder: "姿勢診断", src: `${ASSET}/posture.webp`, position: "50% 35%" },
    items: ["骨盤の傾き", "背骨のバランス", "肩の位置", "身体の左右差", "身体の動かし方"],
    note: "※項目は一例です。お身体の状態に合わせて確認します。",
  },

  flow: {
    heading: "初めての方も安心\n体験レッスンの流れ",
    steps: [
      {
        num: "01",
        title: "体験予約",
        text: "予約ボタンから、ご希望の日時を選んでご予約ください。",
        img: { placeholder: "体験予約", src: `${ASSET}/flow-01.webp` },
      },
      {
        num: "02",
        title: "ご来店",
        text: "動きやすい服装でお越しください。スタッフがお出迎えいたします。",
        img: { placeholder: "ご来店", src: `${ASSET}/flow-02.webp`, position: "50% 40%" },
      },
      {
        num: "03",
        title: "カウンセリング・姿勢診断",
        text: "身体のお悩みや目標、運動経験を伺い、今の身体の状態を確認します。",
        img: { placeholder: "カウンセリング", src: `${ASSET}/flow-03.webp`, position: "90% 30%" },
      },
      {
        num: "04",
        title: "マシンピラティス体験",
        text: "やり方やポイントをご説明しながら、身体の状態に合わせたレッスンを行います。",
        img: { placeholder: "レッスン", src: `${ASSET}/flow-04.webp`, position: "50% 30%" },
      },
      {
        num: "05",
        title: "レッスン後の身体の確認",
        text: "レッスンの前後で写真を比べ、身体の変化をご説明します。",
        img: { placeholder: "身体の確認", src: `${ASSET}/flow-05.webp`, position: "50% 25%" },
      },
      {
        num: "06",
        title: "フィードバック・ご案内",
        text: "これからのボディメイクプランと料金システムをご案内します。",
        img: { placeholder: "ご案内", src: `${ASSET}/flow-06.webp`, position: "78% 30%" },
      },
    ],
    note: "体験レッスンは、ご説明やご案内を含めて約60分です。",
  },

  beginner: {
    heading: "ピラティスが初めての方も\nご安心ください。",
    text: "マシンが動きをサポートしてくれるので、初めての方でも正しいフォームで取り組めます。やり方やポイントは、インストラクターが丁寧にお伝えします。",
    /* Swan写真① DSC_0244 */
    photo: { placeholder: "初心者の方へ", src: `${ASSET}/beginner.webp`, position: "50% 25%" },
    items: [
      "運動が苦手でも\n大丈夫",
      "身体が硬くても\n大丈夫",
      "自分に合った\nペースで",
      "インストラクターが\n丁寧にサポート",
      "駐車場7台\n（店舗前2台＋隣接5台）",
    ],
  },

  store: {
    name: "ピラティススタジオ Swan 蒲郡店",
    open: "2027年1月11日 GRAND OPEN",
    zip: "〒443-0022",
    address: ADDRESS,
    hours: "9:00〜21:00",
    hoursNote: "（最終受付20:00）",
    parking: "店舗前2台＋隣接駐車場5台",
    parkingNote: "隣接駐車場は21〜25番をご利用ください。",
    mapEmbedSrc:
      "https://maps.google.com/maps?q=" + encodeURIComponent(ADDRESS) + "&z=16&output=embed",
    /* 公式HPの蒲郡店「Google MAP」ボタンと同じリンク。 */
    mapUrl: "https://maps.app.goo.gl/6MQshg4ut58dXj1k9",
  },

  faq: {
    items: [
      {
        q: "ピラティスが初めてでも大丈夫ですか？",
        a: "はい、大丈夫です。ピラティスは初心者の方でも無理なく取り組めるエクササイズです。マシンが動きをサポートしてくれるので、初めての方でも正しいフォームで行えます。やり方やポイントは丁寧にご説明します。",
      },
      {
        q: "身体が硬くてもレッスンを受けられますか？",
        a: "はい、受けていただけます。マシンが動きを助けてくれるため、柔軟性に自信がない方でも、ご自身に合った負荷で取り組めます。",
      },
      {
        q: "体験レッスンには何を持っていけばいいですか？",
        a: "動ける服装、ピラティス用の靴下、タオル、お飲み物をお持ちください。",
      },
      {
        q: "体験レッスンはどのくらい時間がかかりますか？",
        a: "カウンセリング・姿勢診断、レッスン後のご説明やご案内を含めて約60分です。",
      },
      {
        q: "駐車場はありますか？",
        a: "店舗の目の前に2台、隣の駐車場に5台（21〜25番）ございます。お車でお越しください。",
      },
      {
        q: "オープン記念キャンペーンはいつまでですか？",
        a: "2027年1月11日（月）〜1月31日（日）です。期間中は「体験レッスン0円」「入会金0円」「ピラティスソックスプレゼント」の3つの特典をご用意しています。",
        campaignOnly: true,
      },
      {
        q: "体験レッスン後に必ず入会する必要はありますか？",
        a: "ご入会は必須ではありません。体験レッスンの最後に、これからのボディメイクプランと料金システムをご案内しますので、ご検討のうえご判断ください。",
      },
    ],
  },

  closing: {
    heading: "2027年、\n新しい自分に出会う。",
    lead: "姿勢から整える、\n大人女性のためのマシンピラティス。",
    /* Swan写真② DSC_5346-2 */
    photo: { placeholder: "クロージング", src: `${ASSET}/closing.webp`, position: "50% 25%" },
  },

  reserve: {
    /*
       予約URL（全CTA共通）。自由枠ウィジェットのURLが確定したらここだけ差し替える。
       仮置き: 公式HPの「体験レッスン受付中」バナーと同じ hacomono のトップ。
    */
    url: "https://pilates-studio-swan.hacomono.jp/home",
    label: "無料体験レッスンを予約する",
    note: "ご予約は予約サイト（hacomono）で承ります。",
  },

  sticky: {
    note: "1/31まで体験無料",
    buttonText: "無料体験を予約する",
    showAfter: 640,
  },
};

export default config;
