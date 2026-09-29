import type { ClientStatus } from "@shared/index";
import type { LPFormField } from "@/components/LPForm";

/**
 * STUDIO IVY 藤沢店 — Meta広告専用LP / **B案（デザイン刷新版）**。
 *
 * 訴求内容・事実・CV導線は A案（`ivy-test`）と同じ。**違うのは見せ方だけ**。
 *   - ブランドLP感60% / 広告LPとしての分かりやすさ40%（A案は70/30）。
 *   - 地色はほぼ白で固定し、切り替えを最小限にする。色ではなく
 *     余白・写真・文字組みで見せる。
 *   - カードの連続をやめる。セクションごとにレイアウトを変えてリズムを作る。
 *     とくに「選ばれる理由」は4項目すべて別レイアウト（指示書 §11-10）。
 *   - FVに白札を重ねない。タイポグラフィと余白で組む（同 §11-04）。
 *   - FVにもCTAを置くため、本文中のCTAはA案の4箇所＋FVの計5箇所。
 *
 * 事実関係はすべて公式サイト（https://www.pilates-ivy.jp/studio/fujisawa）由来。
 *   住所・営業時間・料金3プラン・体験4,500円・1レッスン50分・持ち物・FAQ回答。
 *   **確認できない制度／期限／実績を推測で足さないこと**（指示書 §17）。
 *   キャンペーン期限「10/31まで」は公式サイトの表示（9/1〜10/31）が根拠。
 *
 * 配色（A案と同じブランド青系。詳細は ivy-test/config.ts の冒頭コメント）。
 *   ただしB案では**濃色の面をほぼ使わない**ため、色は見出し・CTA・細い罫・
 *   数字の強調だけに乗る。
 */

/** 画像／動画スロット。`src` が無いときは ImageSlot がプレースホルダを出す。 */
interface Slot {
  placeholder: string;
  src?: string | null;
  /** CSS object-position。人物の顔や手元が切れないように寄せる。 */
  position?: string;
}

export interface IvyBConfig {
  slug: string;
  status?: ClientStatus;
  meta: { title: string; description: string; ogpImage?: string };

  header: { logo: Slot; store: string };
  /** ②オファーバー。セールバナーにしないため、淡色地＋細字で静かに置く。 */
  offerBar: { badge?: string; lead: string; was: string; now: string };
  /** ③特徴バー。白地にヘアラインだけ。 */
  featureBar: string[];

  fv: {
    /** FV背景動画。 */
    video: string;
    /** 動画の読み込み前・失敗時に出る静止画。FVのLCPはこの画像が担う。 */
    poster: string;
    /** 明朝の大見出し。左寄せ。改行位置は組版ルール（指示書 §14）で決める。 */
    catch: string;
    /** キャッチの上に置く英字キッカー。 */
    kicker: string;
    /** 価格・立地を1行で。白札は使わず、罫と余白で区切る。 */
    facts: string[];
    price: { value: string; unit: string };
    campaign: { label: string; was: string; now: string; nowUnit: string };
    /** キャンペーンに付く特典。FVでは1行に収めるため、短い語で2つまで。 */
    bonuses: string[];
  };

  intro: {
    kicker: string;
    heading: string;
    body: string;
    /** 本文とチップの間に挟む正方形の写真。 */
    img: Slot;
    chips: string[];
  };

  campaign: {
    kicker: string;
    heading: string;
    lead: string;
    label: string;
    was: string;
    nowLabel: string;
    now: string;
    nowUnit: string;
    note: string;
  };

  /**
   * ⑦お悩み。**見出しと悩み項目は画像に焼き込まれている**
   * （顧客支給、2026-09-29 AUN #6）。そのためLP側はキッカー・見出し・
   * リストのテキストを持たない。文言を直すには画像の作り直しが要る。
   */
  worry: {
    img: Slot;
    /** 画像内の文言。読み上げと、画像が出ないときのために全項目を入れる。 */
    imgAlt: string;
    closing: string;
  };

  /** ⑧STUDIO IVYなら。4項目だが、写真つき1つ＋数字主役1つ＋文字だけ2つで組む。 */
  points: {
    kicker: string;
    heading: string;
    photo: Slot;
    items: { num: string; title: string; body: string }[];
  };

  future: {
    kicker: string;
    heading: string;
    img: Slot;
    items: string[];
    note: string;
  };

  /** ⑩選ばれる理由。**4項目とも別レイアウト**。型もそれぞれ別に持つ。 */
  reasons: {
    kicker: string;
    heading: string;
    /** 01 完全個室 — 内観写真を大きく。 */
    privateRoom: { num: string; title: string; body: string; img: Slot };
    /** 02 マンツーマン — 人物写真を大きく。 */
    oneOnOne: { num: string; title: string; body: string; img: Slot };
    /** 03 1回7,000円〜 — タイポグラフィが主役。写真を置かない。 */
    price: {
      num: string;
      title: string;
      body: string;
      value: string;
      unit: string;
      caption: string;
    };
    /** 04 徒歩5分 — 駅からの導線を図で見せる。写真を置かない。 */
    access: {
      num: string;
      title: string;
      body: string;
      route: { label: string; sub: string }[];
    };
  };

  price: {
    kicker: string;
    heading: string;
    lead: string;
    /** 主役。月4回プラン。 */
    main: { name: string; freq: string; monthly: string; per: string; note: string };
    /** 脇。月2回・月8回。 */
    others: { name: string; freq: string; monthly: string; per: string; note: string }[];
    note: string;
  };

  compare: {
    kicker: string;
    heading: string;
    group: { label: string; body: string };
    ivy: { label: string; body: string };
    closing: string;
  };

  flow: {
    kicker: string;
    heading: string;
    photo: Slot;
    /** 写真はこのステップの直後に全幅で差し込む。 */
    photoAfterStep: number;
    steps: { num: string; title: string; body: string }[];
  };

  beginner: { kicker: string; heading: string; items: string[]; closing: string };

  store: {
    kicker: string;
    heading: string;
    name: string;
    access: string;
    address: string;
    hours: string;
    lesson: string;
    img: Slot;
    mapEmbedSrc: string;
    mapHref: string;
    mapLinkLabel: string;
    note: string;
  };

  faq: { kicker: string; heading: string; items: { q: string; a: string }[] };

  closing: {
    kicker: string;
    heading: string;
    body: string;
    chips: string[];
    label: string;
    was: string;
    nowLabel: string;
    now: string;
    nowUnit: string;
  };

  cta: { label: string; note: string; anchor: string };
  sticky: { offerLabel: string; offerValue: string; buttonText: string };

  form: {
    kicker: string;
    heading: string;
    lead: string;
    fields: LPFormField[];
    submitLabel: string;
    microcopy: string;
    disclaimer: string;
    errorMessage: string;
  };
  footer: { brandSub: string };
}

const ASSET = "/clients/ivy-test";

const config: IvyBConfig = {
  slug: "ivy-test",
  status: "draft",
  meta: {
    title:
      "【初回体験0円】完全個室のパーソナルマシンピラティス｜STUDIO IVY 藤沢店",
    description:
      "藤沢駅徒歩5分。完全個室・マンツーマンのパーソナルマシンピラティス。1回7,000円〜、初回体験レッスンは通常4,500円のところ0円。運動が初めての方も、自分のペースで始められます。",
    ogpImage: `${ASSET}/hero-poster.jpg`,
  },

  header: {
    logo: { placeholder: "STUDIO IVY", src: `${ASSET}/logo.jpg` },
    store: "藤沢店",
  },

  offerBar: {
    badge: "10/31まで",
    lead: "初回体験レッスン受付中",
    was: "通常4,500円",
    now: "0円",
  },

  featureBar: ["藤沢駅 徒歩5分", "完全個室", "マンツーマン"],

  fv: {
    /**
     * FV背景動画。支給素材 `ivy_fujisawa_fv_loop_v5_long.mp4` をそのまま置いている。
     * 720x1280 / 10.6秒 / 約1.6MB、H.264、moov が先頭（faststart済み）なので
     * 再エンコードしていない。カウンセリング → リフォーマー補助 → 立位の
     * 3シーン構成。
     *
     * 当初の S0017 切り出し（540x960 / 4.2秒 / 3.7MB）と、A/B候補だった S0039 は
     * この支給素材に差し替えたため削除済み（2026-09-28、顧客判断）。
     */
    video: `${ASSET}/hero.mp4`,
    /**
     * 動画が出るまでの静止画。**動画の1フレーム目と一致させること。**
     * ずれていると、動画の再生開始時に絵が飛んで見える。
     */
    poster: `${ASSET}/hero-poster.jpg`,
    kicker: "PERSONAL PILATES STUDIO",
    catch: "完全個室の\nパーソナルピラティスを、\nもっと気軽に。",
    facts: ["完全個室・マンツーマン", "藤沢駅 徒歩5分"],
    price: { value: "7,000", unit: "円〜" },
    campaign: {
      label: "初回体験レッスン",
      was: "通常4,500円",
      now: "0",
      nowUnit: "円",
    },
    // 顧客支給の特典内容（2026-09-29 AUN #1）。FVは1行に収める必要があるため、
    // 語を増やすときは幅（設計338px）に収まるか確認すること。
    bonuses: ["ピラティスソックスプレゼント", "入会金無料"],
  },

  intro: {
    kicker: "ABOUT",
    heading: "自分のペースで、\n自分の身体と向き合える。",
    body:
      "周りの目を気にせず、\n一人ひとりの身体や目的に合わせたレッスンを。\n" +
      "STUDIO IVYは、完全個室の空間で受けられる\nマンツーマンのマシンピラティススタジオです。",
    img: {
      placeholder: "レッスンの様子",
      src: `${ASSET}/about.jpg`,
      position: "center 35%",
    },
    chips: ["完全個室", "マンツーマン", "初心者歓迎", "藤沢駅 徒歩5分"],
  },

  campaign: {
    kicker: "TRIAL LESSON",
    heading: "まずは一度、\nSTUDIO IVYのレッスンを\n体験してみませんか？",
    lead:
      "初めての方にも気軽に試していただけるよう、\n初回体験レッスンをご用意しています。",
    label: "初回体験レッスン",
    was: "通常 4,500円",
    nowLabel: "完全無料",
    now: "0",
    nowUnit: "円",
    note: "50分のパーソナルレッスン／動きやすいウェアと靴下だけでお越しいただけます。",
  },

  worry: {
    img: {
      placeholder: "こんなお悩みありませんか？",
      src: `${ASSET}/worry.jpg`,
    },
    imgAlt:
      "こんなお悩みありませんか？ 姿勢やボディラインが気になってきた／" +
      "運動不足を感じている／身体を動かしたいけれど、何をすればいいか分からない／" +
      "グループレッスンだと周りについていけるか不安／" +
      "自分の身体に合った運動を教えてほしい／ジムは続かなかった",
    closing: "そんな方にこそ、\nマンツーマンのピラティスを。",
  },

  points: {
    kicker: "OUR LESSON",
    heading: "一人ひとりに合わせた\nパーソナルレッスン。",
    photo: {
      placeholder: "マンツーマン指導の様子",
      src: `${ASSET}/manman.jpg`,
      position: "center 56%",
    },
    items: [
      {
        num: "01",
        title: "完全個室",
        body: "周りの目を気にせず、自分の身体とレッスンに集中できる空間。",
      },
      {
        num: "02",
        title: "マンツーマン",
        body:
          "その日の身体の状態や目的に合わせて、一人ひとりに合わせたレッスンを行います。",
      },
      {
        num: "03",
        title: "自分のペースで",
        body: "運動経験や身体の柔軟性に関係なく、無理のないペースから始められます。",
      },
      {
        num: "04",
        title: "50分しっかりレッスン",
        body: "一人ひとりと向き合う時間を確保し、丁寧に身体を動かしていきます。",
      },
    ],
  },

  future: {
    kicker: "YOUR FUTURE",
    heading: "ピラティスを、\n毎日の身体づくりの習慣に。",
    img: { placeholder: "ピラティスのイメージ", src: `${ASSET}/future.jpg` },
    items: [
      "すっと伸びた姿勢へ",
      "すっきりしたボディラインへ",
      "軽やかに動ける身体へ",
      "無理なく続く運動習慣へ",
    ],
    note: "※効果の感じ方には個人差があります。身体づくりをサポートするレッスンです。",
  },

  reasons: {
    kicker: "WHY IVY",
    heading: "STUDIO IVY 藤沢店が\n選ばれる理由",
    privateRoom: {
      num: "01",
      title: "完全個室の\nプライベート空間",
      body:
        "インストラクターとお客様が1対1で向き合う完全プライベート制。人目を気にせず、自分だけの時間に集中できます。",
      img: {
        placeholder: "スタジオ内観",
        src: `${ASSET}/studio.jpg`,
        position: "center 55%",
      },
    },
    oneOnOne: {
      num: "02",
      title: "マンツーマンだから\n初心者でも安心",
      body:
        "カウンセリングで身体の状態を確認し、正しい動きをその場で丁寧にお伝えします。",
      img: {
        placeholder: "マンツーマンで指導を受ける様子",
        src: `${ASSET}/guide.jpg`,
        position: "center 40%",
      },
    },
    price: {
      num: "03",
      title: "パーソナルを、\n1回7,000円〜。",
      body:
        "月謝制なので、通う回数から決められます。月4回プランなら1回あたり7,000円です。",
      value: "7,000",
      unit: "円〜",
      caption: "1回あたり（月4回プラン・税込）",
    },
    access: {
      num: "04",
      title: "藤沢駅から徒歩5分",
      body: "駅から歩いて通える立地。予定に組み込みやすく、続けやすい場所です。",
      route: [
        { label: "藤沢駅", sub: "JR・小田急・江ノ電" },
        { label: "徒歩 5分", sub: "" },
        { label: "STUDIO IVY", sub: "FJ9フロアビル 402号" },
      ],
    },
  },

  price: {
    kicker: "PRICE",
    heading: "無理なく続けられる\nパーソナルピラティス。",
    lead: "月謝制の3プラン。まずは週1回ペースの月4回プランから。",
    main: {
      name: "STANDARD",
      freq: "月4回",
      monthly: "28,000",
      per: "7,000",
      note: "週1回程度から始めたい方におすすめ",
    },
    others: [
      {
        name: "BASIC",
        freq: "月2回",
        monthly: "15,000",
        per: "7,500",
        note: "まずは気軽に試したい方に",
      },
      {
        name: "PREMIUM",
        freq: "月8回",
        monthly: "52,000",
        per: "6,500",
        note: "しっかりペースを作りたい方に",
      },
    ],
    note: "※表示はすべて税込です。",
  },

  compare: {
    kicker: "DIFFERENCE",
    heading: "自分の身体に、\nもっと丁寧に\n向き合いたい方へ。",
    group: {
      label: "グループレッスン",
      body:
        "複数人で行うため料金を抑えやすい一方、一人ひとりに合わせた細かな指導には限りがあります。",
    },
    ivy: {
      label: "STUDIO IVY",
      body:
        "完全個室で、最初から最後までマンツーマン。身体の状態や目的に合わせながら、自分のペースでレッスンできます。",
    },
    closing: "「みんなと同じ」ではなく、\n「あなたに合った」レッスンを。",
  },

  flow: {
    kicker: "FLOW",
    heading: "初めてでも、\n安心してお越しください。",
    photo: {
      placeholder: "カウンセリングの様子",
      src: `${ASSET}/counseling.jpg`,
      position: "center 40%",
    },
    photoAfterStep: 2,
    steps: [
      {
        num: "01",
        title: "ご予約",
        body: "このページのフォームから、ご希望の日時をお送りください。",
      },
      {
        num: "02",
        title: "ご来店・カウンセリング",
        body:
          "お着替えの時間があるため、開始5分前を目安にご来店ください。いきなり身体を動かすことはありません。",
      },
      {
        num: "03",
        title: "身体やお悩みの確認",
        body:
          "現在の身体の状態やお悩み、これまでの運動習慣をうかがい、最適なプログラムをご提案します。",
      },
      {
        num: "04",
        title: "パーソナルレッスン",
        body:
          "うかがった内容をもとに、インストラクターがマンツーマンで50分のレッスンを進めます。",
      },
      {
        num: "05",
        title: "振り返り・アドバイス",
        body: "レッスン後に身体の状態を振り返り、これからの続け方をご案内します。",
      },
    ],
  },

  beginner: {
    kicker: "FOR BEGINNERS",
    heading: "ピラティスが\n初めての方へ。",
    items: [
      "運動経験がなくてもOK",
      "身体が硬くても始められる",
      "ピラティス未経験でもOK",
      "マンツーマンだから質問しやすい",
      "自分のペースで進められる",
      "周りを気にしにくい完全個室",
    ],
    closing:
      "「私にもできるかな？」と思っている方こそ、\nぜひ一度体験してみてください。",
  },

  store: {
    kicker: "STUDIO",
    heading: "店舗情報",
    name: "STUDIO IVY 藤沢店",
    access: "藤沢駅から徒歩5分",
    address: "〒251-0052\n神奈川県藤沢市藤沢991-36\nFJ9フロアビル402号",
    hours: "8:00〜21:00",
    lesson: "1レッスン50分（パーソナル）",
    img: { placeholder: "ビル外観", src: `${ASSET}/exterior.jpg` },
    /**
     * 埋め込み地図。**住所の文字列検索ではなく、店舗リスティングの実座標を打つ。**
     * 住所検索だとビルにピンが立つだけで、STUDIO IVY 藤沢店そのものを指さない。
     * 座標は `mapHref`（顧客から支給された共有リンク）の解決先から取得した
     * 店舗リスティングの値（35.3397871, 139.4830024）。
     * `(ラベル)` を付けるとピンに店名が出る。
     */
    mapEmbedSrc:
      "https://maps.google.com/maps?q=" +
      encodeURIComponent("35.3397871,139.4830024(STUDIO IVY 藤沢店)") +
      "&z=17&output=embed",
    /**
     * 地図をタップしたときに開く先。顧客支給の共有リンクをそのまま使う。
     * 埋め込みは短縮URLを受け付けないので、表示用（`mapEmbedSrc`）と
     * 遷移用（ここ）を分けている。
     */
    mapHref: "https://maps.app.goo.gl/GER9AewW128xNZvd8",
    mapLinkLabel: "Googleマップで見る",
    note: "ビルの4階です。1階でインターホンを押していただき、オートロックを解除いたします。",
  },

  faq: {
    kicker: "FAQ",
    heading: "よくあるご質問",
    items: [
      {
        q: "ピラティスが初めてでも大丈夫ですか？",
        a: "はい、大丈夫です。未経験の方でも安心して始められるよう、インストラクターがマンツーマンで丁寧にサポートします。体験レッスンでは初めにカウンセリングを行い、お一人おひとりに合わせたプログラムをご提案します。",
      },
      {
        q: "身体が硬くてもできますか？",
        a: "はい。運動経験や身体の柔軟性に関係なく、無理のない負荷とワーク内容をご提案します。専用マシンが動きをサポートするため、正しいフォームで身体を動かしていただけます。",
      },
      {
        q: "体験レッスンには何を持っていけばいいですか？",
        a: "動きやすいウェアと靴下をご持参ください。ウォーターサーバーをご用意しているため、お水は持参いただかなくても大丈夫です。更衣室もございます。",
      },
      {
        q: "どんな服装が動きやすいですか？",
        a: "ヨガウェアやピラティスウェアが理想的ですが、お持ちでない場合は伸縮性のあるTシャツやボトムスをご用意ください。スパッツなど、屈伸しやすいボトムスがおすすめです。",
      },
      {
        q: "レッスンはマンツーマンですか？",
        a: "はい。STUDIO IVYはインストラクターとお客様が1対1で向き合う完全プライベート制です。1レッスンは50分になります。",
      },
      {
        q: "レッスンは何分前に行けばいいですか？",
        a: "お着替えの時間がありますので、開始5分前を目安にご来店ください。到着が早すぎる場合は、前のお客様のレッスン中でスタジオに入れないことがあります。",
      },
    ],
  },

  closing: {
    kicker: "START HERE",
    heading: "完全個室の\nパーソナルピラティスを、\nもっと気軽に。",
    body:
      "周りを気にせず、あなたの身体に合わせたレッスンを。\nまずは体験から始めてみませんか？",
    chips: ["藤沢駅 徒歩5分", "完全個室", "マンツーマン", "1回7,000円〜"],
    label: "初回体験レッスン",
    was: "通常 4,500円",
    nowLabel: "完全無料",
    now: "0",
    nowUnit: "円",
  },

  cta: {
    label: "無料体験を予約する",
    note: "通常4,500円の体験レッスンが、初回0円",
    anchor: "#form",
  },

  sticky: {
    offerLabel: "初回体験",
    offerValue: "0円",
    buttonText: "無料体験を予約する",
  },

  form: {
    kicker: "RESERVE",
    heading: "無料体験レッスンのご予約",
    lead:
      "入力は1分で完了します。\nご希望の日時を確認のうえ、\n担当より順次ご連絡いたします。",
    fields: [
      {
        type: "text",
        name: "name",
        label: "お名前",
        required: true,
        placeholder: "山田 花子",
      },
      {
        type: "tel",
        name: "tel",
        label: "電話番号",
        required: true,
        placeholder: "090-0000-0000",
      },
      {
        type: "email",
        name: "email",
        label: "メールアドレス",
        optionalTag: "任意",
        placeholder: "example@mail.com",
      },
      { type: "date", name: "date1", label: "ご希望日（第1希望）", required: true },
      {
        type: "toggle",
        name: "time1",
        label: "ご希望の時間帯",
        required: true,
        columns: 3,
        options: [
          { value: "午前（8:00〜12:00）", label: "午前" },
          { value: "午後（12:00〜17:00）", label: "午後" },
          { value: "夕方以降（17:00〜21:00）", label: "夕方以降" },
        ],
      },
      { type: "date", name: "date2", label: "ご希望日（第2希望）", optionalTag: "任意" },
      {
        type: "toggle",
        name: "experience",
        label: "ピラティスのご経験",
        columns: 3,
        options: [
          { value: "未経験", label: "未経験" },
          { value: "少しある", label: "少しある" },
          { value: "経験あり", label: "経験あり" },
        ],
      },
      {
        type: "textarea",
        name: "note",
        label: "気になっていること・ご質問",
        optionalTag: "任意",
        placeholder:
          "例）運動がとても久しぶりです／姿勢が気になります／身体が硬いのですが大丈夫でしょうか",
        rows: 4,
      },
    ],
    submitLabel: "この内容で無料体験を予約する",
    microcopy: "初回体験 0円（通常4,500円）／50分のパーソナルレッスン",
    disclaimer:
      "ご入力いただいた内容は、\n体験レッスンのご予約対応にのみ利用します。\nしつこい勧誘はいたしません。",
    errorMessage: "お名前・電話番号・ご希望日・時間帯は必須項目です。",
  },

  footer: { brandSub: "藤沢店" },
};

export default config;
