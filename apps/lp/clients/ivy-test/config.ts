import type { ClientStatus } from "@shared/index";
import type { LPFormField } from "@/components/LPForm";

/**
 * STUDIO IVY 藤沢店 — Meta広告（Instagram / Facebook）専用LP。
 *
 * 目的はブランド紹介ではなく「初回体験レッスンの予約」。月15件の体験予約が目標。
 * 広告の主訴求（完全個室・マンツーマン・1回7,000円〜・初回体験0円）を
 * FV〜2セクション以内で必ず確認できるようにしている（指示書 §20）。
 *
 * 配色は公式サイト（pilates-ivy.jp）とロゴの実測値から起こした4色。
 *   - メインカラー #3C7EA6 … ロゴ／サイトのブランドブルー #4E94BF を暗くしたもの。
 *     ブランド色そのままだと白地で 2.9:1 しか出ず本文・ボタン文字に使えない。
 *     #3C7EA6 なら白地 4.6:1 で、見出し・CTA・濃色地に安全に使える。
 *   - ブランドブルー #4E94BF … 罫・アイコン・淡い装飾など、文字以外の要素だけ。
 *   - 淡色の地 #F3F7FA … ブランドブルーを薄めた淡色背景。
 *   - 基本の地 #FDFDFC … ほぼ白。
 *   - 中間トーン #2F6B8F … 価格・数字・CTAの最濃部（白地 6.0:1）。CTA専用色を兼ねる。
 * **ゴールド・ピンク・オレンジなど、ブランドに無い色を装飾目的で足さないこと**
 *   （公式サイトには金 #BE9744 が少量あるが、指示書 §9 で明確に禁止されている）。
 *
 * 事実関係はすべて公式サイト（https://www.pilates-ivy.jp/studio/fujisawa）由来。
 *   住所・営業時間・料金3プラン・体験4,500円・1レッスン50分・持ち物・FAQ回答。
 *   **確認できない制度／期限／実績を推測で足さないこと**（指示書 §22）。
 *   キャンペーン期限「10/31まで」は公式サイトの表示（9/1〜10/31）を根拠にしている。
 */

/** 画像／動画スロット。`src` が無いときは ImageSlot がプレースホルダを出す。 */
interface Slot {
  placeholder: string;
  src?: string | null;
  /** CSS object-position。人物の顔や手元が切れないように寄せる。 */
  position?: string;
}

export interface IvyConfig {
  slug: string;
  status?: ClientStatus;
  meta: { title: string; description: string; ogpImage?: string };

  /** ①ヘッダー。白地にロゴ＋店舗名だけ。情報を詰め込まない。 */
  header: { logo: Slot; store: string };
  /** ②オファーバー。メインカラーの細い帯。 */
  offerBar: { badge?: string; lead: string; was: string; now: string };
  /** ③特徴バー。3項目を「｜」区切りで一目で読ませる。 */
  featureBar: string[];

  /** ④FV。背景動画＋最小限の情報。優先順位は指示書 §04 のとおり。 */
  fv: {
    /** 背景動画。A/Bで差し替えるときはここだけ変える（`heroAlt` に代替素材あり）。 */
    video: string;
    /** A/Bテスト候補。`video` と入れ替えるだけで切り替わる。 */
    videoAlt: string;
    /** 動画の読み込み前・失敗時に出る静止画。FVのLCPはこの画像が担う。 */
    poster: string;
    /** メインコピー。改行位置は組版ルール（指示書 §18）に合わせて手で決める。 */
    catch: string;
    /** 価格・立地の1行。 */
    facts: { price: string; priceUnit: string; access: string; style: string };
    campaign: { label: string; was: string; now: string; nowUnit: string };
  };

  /** ⑤FV直下。広告の訴求をもう一度、落ち着いた文体で確認させる。 */
  intro: { heading: string; body: string; chips: string[] };

  /** ⑥⑰で使い回す体験キャンペーン。「0円」はページ内で最も大きい要素。 */
  campaign: {
    heading: string;
    lead: string;
    label: string;
    wasLabel: string;
    was: string;
    nowLabel: string;
    now: string;
    nowUnit: string;
    note: string;
  };

  /** ⑦お悩み。煽らず、チェックリストとして淡々と並べる。 */
  worry: { heading: string; items: string[]; closing: string };
  /** ⑧STUDIO IVYなら。4項目。02にマンツーマンの実写を置く。 */
  points: {
    heading: string;
    items: { num: string; title: string; body: string; img?: Slot }[];
  };
  /** ⑨目指せる未来。効果の断定はしない（指示書 §09・§21）。 */
  future: {
    heading: string;
    img: Slot;
    items: { num: string; title: string }[];
    note: string;
  };
  /** ⑩選ばれる4つの理由。03で価格を大きく見せる。 */
  reasons: {
    heading: string;
    items: {
      num: string;
      title: string;
      body: string;
      img?: Slot;
      /** 03の価格プレート。 */
      price?: { value: string; unit: string; caption: string };
    }[];
  };
  /** ⑪料金プラン。月4回を最も視認性高く。 */
  price: {
    heading: string;
    lead: string;
    plans: {
      name: string;
      freq: string;
      monthly: string;
      per: string;
      note: string;
      /** 月4回だけ true。大きく・枠を強くする。 */
      featured?: boolean;
    }[];
    note: string;
  };
  /** ⑫グループレッスンとの違い。競合を否定しない書き方。 */
  compare: {
    heading: string;
    group: { label: string; body: string };
    ivy: { label: string; body: string };
    closing: string;
  };
  /** ⑬体験レッスンの流れ。公式サイトの正式フローに準拠。 */
  flow: {
    heading: string;
    steps: { num: string; title: string; body: string; img?: Slot }[];
  };
  /** ⑭初めてでも大丈夫。 */
  beginner: { heading: string; items: string[]; closing: string };
  /** ⑮店舗情報。 */
  store: {
    heading: string;
    name: string;
    access: string;
    address: string;
    hours: string;
    lesson: string;
    img: Slot;
    subImg: Slot;
    subImgCaption: string;
    mapEmbedSrc: string;
    note: string;
  };
  /** ⑯FAQ。回答は公式サイトで確認できる事実のみ。 */
  faq: { heading: string; items: { q: string; a: string }[] };
  /** ⑰クロージング。FVのメッセージに戻す。 */
  closing: { heading: string; body: string; chips: string[] };

  /** CTA。本文中4箇所（⑥⑩⑬⑰）＋追従フッターで文言を統一する。 */
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
  footer: { brand: string; brandSub: string };
}

const ASSET = "/clients/ivy-test";

const config: IvyConfig = {
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
     * 背景動画。S0017 の 6.0秒から4.2秒（540x960 / 約3.7MB）。
     * 「安心・親しみ」の印象で、利用者とインストラクターが両方映る区間を選んでいる。
     * A/Bで差し替えるときは、この1行を `videoAlt` の値に書き換えるだけでよい。
     */
    video: `${ASSET}/hero.mp4`,
    /**
     * A/Bテスト候補。S0039 の 9.8秒から4.2秒。「丁寧なパーソナル指導」の印象。
     * ファイルは public に置いてあるが、`video` を差し替えるまで読み込まれない。
     * **注意: S0039 は全編が背後からの寄りの構図で、身体のラインが主役になる。**
     * 「親しみのある、綺麗なパーソナルスタジオ」からは外れるので、
     * A/Bに回す前に顧客確認を取ること。
     */
    videoAlt: `${ASSET}/hero-alt.mp4`,
    poster: `${ASSET}/hero-poster.jpg`,
    // 3行。助詞や長音符が行頭に来ないよう、意味の切れ目で改行している。
    catch: "完全個室の\nパーソナルピラティスを、\nもっと気軽に。",
    facts: {
      price: "7,000",
      priceUnit: "円〜 / 1回",
      access: "藤沢駅 徒歩5分",
      style: "完全個室・マンツーマン",
    },
    campaign: {
      label: "初回体験レッスン",
      was: "通常4,500円",
      now: "0",
      nowUnit: "円",
    },
  },

  intro: {
    heading: "自分のペースで、\n自分の身体と向き合える。",
    body:
      "周りの目を気にせず、一人ひとりの身体や目的に合わせたレッスンを。\n" +
      "STUDIO IVYは完全個室の空間で受けられる、\nマンツーマンのマシンピラティススタジオです。",
    chips: ["完全個室", "マンツーマン", "初心者歓迎", "藤沢駅 徒歩5分"],
  },

  campaign: {
    heading: "まずは一度、\nSTUDIO IVYのレッスンを\n体験してみませんか？",
    lead:
      "初めての方にも気軽に試していただけるよう、\n初回体験レッスンをご用意しています。",
    label: "初回体験レッスン",
    wasLabel: "通常",
    was: "4,500円",
    nowLabel: "完全無料",
    now: "0",
    nowUnit: "円",
    note: "50分のパーソナルレッスン／動きやすいウェアと靴下だけでお越しいただけます。",
  },

  worry: {
    heading: "こんなお悩み、ありませんか？",
    items: [
      "姿勢やボディラインが気になってきた",
      "運動不足を感じている",
      "身体を動かしたいけれど、何をすればいいか分からない",
      "グループレッスンだと周りについていけるか不安",
      "自分の身体に合った運動を教えてほしい",
    ],
    closing: "そんな方にこそ、\nマンツーマンのピラティスを。",
  },

  points: {
    heading: "一人ひとりに合わせた\nパーソナルレッスン。",
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
        img: {
          placeholder: "マンツーマン指導の様子",
          src: `${ASSET}/manman.jpg`,
          position: "center 56%",
        },
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
    heading: "ピラティスを、\n毎日の身体づくりの習慣に。",
    img: { placeholder: "ピラティスのイメージ", src: `${ASSET}/future.jpg` },
    // 2列グリッドのカード幅は約142px。自動折り返しに任せると「へ」1文字が
    // 行頭に残るので、意味の切れ目で改行位置を指定して全項目を2行に揃える
    // （指示書 §18 の組版ルール）。
    items: [
      { num: "01", title: "すっと伸びた\n姿勢へ" },
      { num: "02", title: "すっきりした\nボディラインへ" },
      { num: "03", title: "軽やかに動ける\n身体へ" },
      { num: "04", title: "無理なく続く\n運動習慣へ" },
    ],
    note: "※効果の感じ方には個人差があります。身体づくりをサポートするレッスンです。",
  },

  reasons: {
    heading: "STUDIO IVY藤沢店が\n選ばれる4つの理由",
    items: [
      {
        num: "01",
        title: "完全個室のプライベート空間",
        body: "インストラクターと1対1。人目を気にせず、自分だけの時間に集中できます。",
        img: {
          placeholder: "スタジオ内観",
          src: `${ASSET}/studio.jpg`,
          position: "center 55%",
        },
      },
      {
        num: "02",
        title: "マンツーマンだから初心者でも安心",
        body:
          "カウンセリングで身体の状態を確認し、正しい動きをその場で丁寧にお伝えします。",
      },
      {
        num: "03",
        title: "パーソナルを1回7,000円〜",
        body: "月4回プランなら、1回あたり7,000円。無理なく続けられる価格です。",
        price: { value: "7,000", unit: "円〜", caption: "1回あたり（月4回プラン）" },
      },
      {
        num: "04",
        title: "藤沢駅から徒歩5分",
        body: "駅から歩いて通える立地。予定に組み込みやすく、続けやすい場所です。",
      },
    ],
  },

  price: {
    heading: "無理なく続けられる\nパーソナルピラティス。",
    lead: "月謝制の3プラン。まずは週1回ペースの月4回プランから。",
    plans: [
      {
        name: "BASIC",
        freq: "月2回",
        monthly: "15,000",
        per: "7,500",
        note: "まずは気軽に試したい方に",
      },
      {
        name: "STANDARD",
        freq: "月4回",
        monthly: "28,000",
        per: "7,000",
        note: "週1回程度から始めたい方におすすめ",
        featured: true,
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
    heading: "自分の身体に、\nもっと丁寧に向き合いたい方へ。",
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
    heading: "初めてでも、\n安心してお越しください。",
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
        img: {
          placeholder: "カウンセリングの様子",
          src: `${ASSET}/counseling.jpg`,
          position: "center 40%",
        },
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
    heading: "ピラティスが初めての方へ。",
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
    heading: "店舗情報",
    name: "STUDIO IVY 藤沢店",
    access: "藤沢駅から徒歩5分",
    address: "〒251-0052\n神奈川県藤沢市藤沢991-36\nFJ9フロアビル402号",
    hours: "8:00〜21:00",
    lesson: "1レッスン50分（パーソナル）",
    img: { placeholder: "ビル外観", src: `${ASSET}/exterior.jpg` },
    subImg: {
      placeholder: "スタジオのエントランス",
      src: `${ASSET}/entrance.jpg`,
      position: "center 30%",
    },
    /** 入口の写真は単体だと用途が読み取れないので、短いキャプションを添える。 */
    subImgCaption: "スタジオ入口（ビル4階・402号）",
    mapEmbedSrc:
      "https://maps.google.com/maps?q=" +
      encodeURIComponent("神奈川県藤沢市藤沢991-36 FJ9フロアビル") +
      "&z=17&output=embed",
    note: "ビル4階です。エレベーターで402号までお上がりください。",
  },

  faq: {
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
    heading: "完全個室の\nパーソナルピラティスを、\nもっと気軽に。",
    body:
      "周りを気にせず、あなたの身体に合わせたレッスンを。\nまずは体験から始めてみませんか？",
    chips: ["藤沢駅 徒歩5分", "完全個室", "マンツーマン", "1回7,000円〜"],
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
      "入力は1分で完了します。\nご希望の日時を確認のうえ、担当より順次ご連絡いたします。",
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
      "ご入力いただいた内容は、体験レッスンのご予約対応にのみ利用します。\nしつこい勧誘はいたしません。",
    errorMessage: "お名前・電話番号・ご希望日・時間帯は必須項目です。",
  },

  footer: { brand: "STUDIO IVY", brandSub: "藤沢店" },
};

export default config;
