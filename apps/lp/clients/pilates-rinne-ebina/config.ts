import type { ClientStatus } from "@shared/index";

const ASSET = "/clients/pilates-rinne-ebina";

/**
 * ピラティスRINNE 海老名店 — 実顧客LP。構成案 §15〜§19 に対応。
 *
 * ■ 店舗別LP運用について
 * 店舗ごとに個別のLPを作る方針のため、このLPは海老名店専用（slug: pilates-rinne-ebina）。
 * 辻堂店はこのフォルダを複製して作る予定（想定slug: pilates-rinne-tsujido）。
 * そのため店舗選択UIは持たず、予約導線・店舗情報・FAQ等はすべて海老名店1店舗の内容のみ。
 * ダッシュボード側で slug "pilates-rinne-ebina" を登録すること（規約12）。
 *
 * ■ 構成がテンプレAと違う理由
 * ブリーフ §15 が要求する13セクションのうち5つ（④比較表・⑤姿勢診断・⑦初心者・
 * ⑧お客様の声・⑬最終予約エリア）はテンプレAに存在しない。また §16 で
 * 「予約ボタンはすべてhacomonoの店舗別ウィジェットへ接続」と指定されているため
 * LPForm を使わない。bee-pilates-ebisu と同じ方針（専用 page.tsx + 専用config型 +
 * check-rules の FORM_EXEMPT 登録）で構成している。LPShell は必須なので維持。
 *
 * ■ 配色
 * 実サイト（https://rinne-pilates.com/studio）から採取した実測値を採用。
 * 深緑 #003E2F（メイン・見出し・背景）× クリーム #E6D2BE（ボタン・背景）× 白。
 * パターンAのゴールド系装飾（オファー帯・CTAボタン・価格の強調グラデーション等）は
 * すべてこの深緑・クリームの配色に置き換えている（page.tsx 側で対応）。
 *
 * ■ 未確定（ブリーフ §18 優先確認事項）— すべて `null` / 〇〇 / 00 表記
 * もっともらしい仮の値は入れていない。実データと区別できなくなり、
 * そのまま公開される事故につながるため。
 *   1. reserve.stores[].url — hacomono海老名店予約URL（★これが無いとCTAが機能しない）
 *   2. stores[].tel — 海老名店の電話番号（住所・営業時間・定休日・アクセスは確定済み）
 *   3. 月額料金・入会金・事務手数料・キャンペーン適用条件・対象期間の明記
 *      （★顧客修正指示で月額等の一覧ブロックごと削除。景表法上、公開前に
 *      適用条件・対象期間・対象店舗・別途費用のいずれかの形での明記が必要）
 *   4. flow.steps[].time — 各ステップの所要時間
 *   5. instructors[].name / nameEn / tags / body — 氏名・資格・指導歴（写真はGoogle Driveの実素材を仮配置済み）
 *   6. testimonials[] — お客様の声（★広告掲載許可の取得が前提）
 *   7. achievement — Google口コミ等の実績数値
 *   8. stores[].map の src — 地図画像（写真は実素材を仮配置済み。mapEmbedSrcでGoogleマップ埋め込み済み）
 *   9. FAQは顧客修正指示により確定回答のある4問（初心者・身体の硬さ・駐車場・勧誘の有無）に絞り済み。
 *      年齢制限・男性利用・服装・持ち物・更衣室・所要時間・予約変更・妊娠中/産後は削除した
 *      （復活させる場合は要確認の回答を用意してから追加する）
 *
 * ■ 写真素材について（2026-07-31 反映）
 * Google Drive「ピラティス素材(RINNE様)」フォルダより、海老名店と確認済みの写真を
 * 9枚配置（public/clients/pilates-rinne-ebina/）。フルサイズ(6000px級, 10MB前後)を
 * sipsで1600px・JPEG品質78に圧縮済み（1枚あたり200〜350KB）。同フォルダ内の
 * TEP09332/TEP09374は辻堂店の写真と確認したため、このLPには使用していない。
 * インストラクターの写真は現状「複数人が写る指導風景」から流用しており、本来の
 * 個人ポートレートではない。ソロ写真が用意され次第、差し替えが必要。
 */

/** レイアウト上の画像枠。`src` が null ならプレースホルダ表示。 */
export interface Slot {
  placeholder: string;
  src?: string | null;
  /** 切り抜き位置（例 "38% center"）。既定は "center"。 */
  position?: string;
}

/** 比較表のマーク。good=◎ / fair=○ / poor=△ */
export type Mark = "good" | "fair" | "poor";

/** 予約先。url が null の間は「予約URL設定待ち」として非リンク描画される。 */
export interface ReserveTarget {
  /** ボタン文言。§16 の推奨（「空き状況を見る」系）に合わせる。 */
  label: string;
  /** hacomono 店舗別ウィジェットURL。未確定は null。 */
  url: string | null;
}

export interface RinneConfig {
  slug: string;
  status?: ClientStatus;
  meta: { title: string; description: string; ogpImage?: string };
  accent: string;

  header: {
    brand: string;
    brandSub: string;
    stores: string[];
    /** 店舗名の近くに添える補足（駐車場・駐輪場完備など） */
    note?: string;
  };
  offerBar: {
    badgeLines: [string, string];
    text: string;
  };
  /** 監修・実績帯。数値が未確定なら num を空文字にすると数字部分が出ない。 */
  achievement: { pre: string; num: string; post: string };

  /** ① ファーストビュー */
  fv: {
    catchLines: string[];
    subLines: string[];
    hero: Slot;
    /** 補足要素（初心者歓迎・監修・体験受付中など） */
    notes: string[];
    /** 特徴チップ（最大3名 / 姿勢診断付き / 監修） */
    chips: { small: string; big: string }[];
  };

  /** ② このようなお悩みはありませんか */
  worry: {
    heading: string;
    items: string[];
    closing: string;
  };

  /** ③ RINNEが選ばれる理由 */
  reasons: {
    heading: string;
    items: { num: string; title: string; body: string; img: Slot }[];
  };

  /** ④ 他のレッスン形式との違い */
  comparison: {
    heading: string;
    lead: string;
    columns: [string, string, string];
    /** 強調する列のindex（RINNE = 2） */
    highlight: number;
    rows: { label: string; values: [string, string, string]; marks: [Mark, Mark, Mark] }[];
  };

  /** ⑤ 姿勢診断について */
  posture: {
    heading: string;
    body: string;
    items: string[];
    photo: Slot;
  };

  /** ⑥ 体験レッスンの流れ */
  flow: {
    heading: string;
    steps: { num: string; title: string; time?: string | null; body: string }[];
  };

  /** ⑦ 初心者でも参加しやすい理由 */
  beginner: {
    heading: string;
    body: string;
    items: string[];
  };

  /** ⑧ お客様の変化・お客様の声。広告掲載許可の取得が前提。 */
  testimonials: {
    heading: string;
    lead: string;
    /** 許可取得済みの声のみを入れる。空配列なら準備中プレースホルダを表示。 */
    items: {
      img: Slot;
      age: string;
      store: string;
      period: string;
      comment: string;
    }[];
  };

  /** ⑨ インストラクター紹介 */
  instructors: {
    heading: string;
    lead: string;
    swipeHint: string;
    items: {
      img: Slot;
      role: string;
      name: string;
      nameEn: string;
      body: string;
      tags: string[];
    }[];
  };

  /** ⑩ 料金・キャンペーン */
  pricing: {
    heading: string;
    campaignBadge: string;
    campaignTitle: string;
    campaignLead: string;
    /** 通常体験料金（未確定は "00,000"） */
    trialRegular: string;
    /** キャンペーン適用後の体験料金表示 */
    trialNow: string;
  };

  /** ⑪ 店舗情報 */
  stores: {
    heading: string;
    items: {
      name: string;
      appeal: string;
      img: Slot;
      address: string;
      hours: string;
      closed: string;
      /** ハイフン無し表記も可。null なら電話ボタンを出さない。 */
      tel: string | null;
      /** アクセス・道順・近隣ランドマーク・駐車場など */
      access: string[];
      /** Googleマップ埋め込み or 地図画像。未確定は null。 */
      map: Slot;
      /** Googleマップの埋め込みURL（output=embed）。あれば map.src より優先して<iframe>表示する。 */
      mapEmbedSrc?: string;
    }[];
  };

  /** ⑫ よくある質問 */
  faq: { heading: string; items: { q: string; a: string }[] };

  /** ⑬ 最終予約エリア */
  closing: {
    heading: string;
    lead: string;
    chips: string[];
  };

  /** 予約（§16: すべてhacomonoの店舗別ウィジェットへ） */
  reserve: {
    /** CTAブロック上部の小見出し */
    eyebrow: string;
    stores: ReserveTarget[];
    /** ボタン下の補足（キャンペーン条件など） */
    note: string;
  };

  sticky: {
    offers: { label: string; value: string }[];
    buttonText: string;
    anchor: string;
    showAfter?: number;
  };
}

const config: RinneConfig = {
  slug: "pilates-rinne-ebina",
  status: "draft",
  meta: {
    title:
      "ピラティスRINNE 海老名店｜最大3名のセミパーソナル・姿勢診断付きマシンピラティス",
    description:
      "海老名店のセミパーソナルマシンピラティスRINNE。最大3名だからインストラクターが一人ひとりの動きを確認します。鍼灸師・整体師監修のプログラムと姿勢診断から始めるので、ピラティスが初めての方・身体が硬い方も安心。体験レッスン受付中。",
    ogpImage: undefined,
  },
  accent: "#003E2F",

  header: {
    brand: "PILATES RINNE",
    brandSub: "パーソナルマシンピラティス",
    stores: ["海老名店"],
    note: "駐車場・駐輪場完備",
  },
  offerBar: {
    badgeLines: ["期間", "限定"],
    text: "無料体験レッスン受付中",
  },
  // TBD(§18): Google口コミ等の実績数値。確定まで数字を出さない。
  achievement: { pre: "鍼灸師・整体師監修", num: "", post: "のプログラム" },

  fv: {
    catchLines: ["パーソナルの丁寧さを、", "続けやすい形で。"],
    subLines: [
      "マンツーマンも",
      "最大3名のセミパーソナルも選べる",
      "姿勢診断から始めるマシンピラティス",
    ],
    hero: {
      placeholder: "最大3名でのレッスン風景（メインビジュアル）",
      src: `${ASSET}/hero.jpg`,
      position: "center 30%",
    },
    notes: ["初心者歓迎", "鍼灸師・整体師監修", "海老名店で体験受付中"],
    chips: [{ small: "姿勢診断", big: "付き" }],
  },

  worry: {
    heading: "このようなお悩みはありませんか",
    items: [
      "猫背や巻き肩が気になる",
      "下腹や下半身のラインが気になる",
      "運動不足を感じている",
      "身体が硬く、運動に苦手意識がある",
      "大人数のレッスンについていけるか不安",
      "グループレッスンでは十分に見てもらえなかった",
      "パーソナルレッスンは料金面で続けにくい",
      "自分に合った運動が分からない",
    ],
    closing: "そのお悩み、身体の状態を\n確認することから始めませんか？",
  },

  reasons: {
    heading: "RINNEが選ばれる理由",
    items: [
      {
        num: "01",
        title: "マンツーマンも最大3名のセミパーソナルも選べる",
        body:
          "大人数のグループレッスンとは異なり、インストラクターが一人ひとりの動きを確認します。初心者の方や、正しく動けているか不安な方にも参加しやすいレッスンです。",
        img: { placeholder: "最大3名で受講している様子", src: `${ASSET}/reason-1.jpg` },
      },
      {
        num: "02",
        title: "姿勢診断からスタート",
        body:
          "レッスン前に姿勢や身体の癖を確認し、一人ひとりの状態に合わせて必要な動きをご提案します。全員が同じ動きをするのではなく、自分の身体に合ったレッスンを受けられます。",
        img: { placeholder: "姿勢診断の様子", src: `${ASSET}/reason-2.jpg` },
      },
      {
        num: "03",
        title: "鍼灸師・整体師監修",
        body:
          "身体に関する知識を持つ専門家が、姿勢や身体の使い方を考えたプログラムを監修しています。ただ身体を動かすだけでなく、姿勢や動きやすさを意識したレッスンを行います。",
        img: { placeholder: "インストラクターの指導風景", src: `${ASSET}/reason-3.jpg` },
      },
      {
        num: "04",
        title: "続けやすいレッスン形式",
        body:
          "パーソナルレッスンのような丁寧さと、グループレッスンの通いやすさを両立しています。しっかり見てもらいたいけれど、完全パーソナルは続けにくいと感じる方にもおすすめです。",
        img: { placeholder: "スタジオ内観・マシンの写真", src: `${ASSET}/reason-4.jpg` },
      },
    ],
  },

  comparison: {
    heading: "パーソナルとグループの、\n良いところを両立。",
    lead: "完全パーソナル・大人数のグループレッスンと、RINNEのピラティスを比べました。",
    columns: ["完全\nパーソナル", "大人数の\nグループ", "RINNE"],
    highlight: 2,
    rows: [
      {
        label: "レッスン人数",
        values: ["1名", "多人数", "最大3名"],
        marks: ["good", "poor", "good"],
      },
      {
        label: "指導の細かさ",
        values: ["丁寧に見てもらえる", "一人ひとりを細かく見ることが難しい", "一人ひとりの動きを確認"],
        marks: ["good", "poor", "good"],
      },
      {
        label: "身体に合わせた対応",
        values: ["一人ひとりに合わせやすい", "全員が同じ動きになりやすい", "姿勢診断をもとに提案"],
        marks: ["good", "poor", "good"],
      },
      {
        label: "通いやすさ",
        values: ["予約枠が限られやすい", "通いやすい", "続けやすい"],
        marks: ["poor", "good", "good"],
      },
      {
        label: "料金の負担",
        values: ["高くなりやすい", "抑えやすい", "完全パーソナルより続けやすい"],
        marks: ["poor", "good", "fair"],
      },
      {
        label: "初心者の参加しやすさ",
        values: ["安心して始めやすい", "周囲についていけるか不安になりやすい", "少人数だから質問しやすい"],
        marks: ["good", "poor", "good"],
      },
    ],
  },

  posture: {
    heading: "自分に必要な運動を知ることから。",
    body:
      "身体の状態や悩みは、一人ひとり異なります。RINNEでは、レッスン前に姿勢や身体の癖を確認し、その方に必要な動きをご提案します。何から始めればよいか分からない方にも、安心してご参加いただけます。",
    items: [
      "現在の姿勢を確認",
      "肩や骨盤の左右差を確認",
      "身体の動かし方や癖を確認",
      "気になる部分や目標をヒアリング",
      "診断内容をもとにレッスンをご提案",
    ],
    photo: { placeholder: "姿勢診断の様子", src: `${ASSET}/posture.jpg` },
  },

  flow: {
    heading: "体験レッスンの流れ",
    steps: [
      {
        num: "1",
        title: "ご予約",
        time: null,
        body: "予約ページから、ご希望の日時を選択します。",
      },
      {
        num: "2",
        title: "ご来店・受付",
        time: null,
        body: "店舗へお越しいただき、体験内容をご案内します。",
      },
      {
        num: "3",
        title: "カウンセリング",
        // TBD(§18): 各ステップの所要時間
        time: null,
        body: "身体のお悩み、運動経験、目標などをお伺いします。",
      },
      {
        num: "4",
        title: "姿勢診断",
        time: null,
        body: "現在の姿勢や身体の動かし方を確認します。",
      },
      {
        num: "5",
        title: "マシンピラティス体験",
        time: null,
        body: "身体の状態に合わせて、インストラクターが丁寧に指導します。",
      },
      {
        num: "6",
        title: "体験の振り返り・フィードバック",
        time: null,
        body: "体験内容を振り返り、ご希望に応じて料金や通い方をご案内します。",
      },
    ],
  },

  beginner: {
    heading: "ピラティスが初めてでも、大丈夫です。",
    body:
      "RINNEに通う方の中には、運動が久しぶりの方や、ピラティスが初めての方もいらっしゃいます。セミパーソナルは最大3名のため、周囲についていくことを優先せず、ご自身のペースでレッスンを受けられます。",
    items: [
      "最大3名だから質問しやすい",
      "インストラクターが動きを確認",
      "マシンが身体の動きをサポート",
      "一人ひとりのペースで進められる",
      "運動経験が少なくても参加可能",
      "身体が硬くても問題なし",
    ],
  },

  testimonials: {
    heading: "お客様の声",
    lead: "実際にRINNEへ通われている方の声をご紹介します。",
    // TBD(§18): 実際のお客様の声。広告掲載許可（§8 必要素材）取得後に追加する。
    // ブリーフの「お客様の声例」は構成案の例文であり実在の声ではないため、
    // ここには入れない（景表法・ステマ規制上、体験談は実在・許諾済みのものに限る）。
    items: [],
  },

  instructors: {
    heading: "一人ひとりの身体に、丁寧に向き合います。",
    lead: "姿勢や身体の使い方を確認しながら、\nその方に必要な動きをご提案します。",
    swipeHint: "スワイプで移動",
    // TBD(§18): インストラクター情報（氏名・保有資格・指導歴・得意な指導・メッセージ・写真）
    items: [
      {
        img: { placeholder: "インストラクターの写真", src: `${ASSET}/instructor-1.jpg` },
        role: "INSTRUCTOR",
        name: "氏名 要確認",
        nameEn: "Name TBD",
        body:
          "指導歴・得意な指導・お客様へのメッセージをここに記載します。ブリーフ §18「インストラクター情報」受領後に差し替えてください。",
        tags: ["保有資格を記載"],
      },
      {
        img: { placeholder: "インストラクターの写真", src: `${ASSET}/instructor-2.jpg` },
        role: "INSTRUCTOR",
        name: "氏名 要確認",
        nameEn: "Name TBD",
        body:
          "指導歴・得意な指導・お客様へのメッセージをここに記載します。ブリーフ §18「インストラクター情報」受領後に差し替えてください。",
        tags: ["保有資格を記載"],
      },
    ],
  },

  pricing: {
    heading: "料金・キャンペーン",
    campaignBadge: "期間限定",
    campaignTitle: "体験レッスン無料",
    campaignLead:
      "マンツーマンも最大3名のセミパーソナルも、\n姿勢診断とあわせてまずは体験してみませんか？",
    trialRegular: "8,800",
    trialNow: "0",
  },

  stores: {
    heading: "店舗情報",
    items: [
      {
        name: "海老名店",
        appeal: "駐車場3台完備\n車で通いやすいパーソナルピラティス",
        img: { placeholder: "海老名店の外観", src: `${ASSET}/store-ebina.jpg` },
        // TBD(§18): 電話番号
        address: "〒243-0419 神奈川県海老名市大谷北4丁目3-32\nハイムあすなろ 105号",
        hours: "営業時間 09:00〜21:30",
        closed: "定休日 不定休となります",
        tel: null,
        access: [
          "海老名駅からバスで5分、綾瀬市役所から車で7分",
          "駐車場完備で便利なアクセス",
        ],
        map: { placeholder: "海老名店の地図", src: null },
        mapEmbedSrc:
          "https://maps.google.com/maps?q=" +
          encodeURIComponent("神奈川県海老名市大谷北4丁目3-32 ハイムあすなろ") +
          "&z=16&output=embed",
      },
    ],
  },

  faq: {
    heading: "よくある質問",
    items: [
      {
        q: "ピラティスが初めてでも参加できますか？",
        a: "はい、初めての方も歓迎しております。最大3名の少人数制で、インストラクターが一人ひとりの動きを確認しながら進めますので、初めての方でも安心してご参加いただけます。",
      },
      {
        q: "身体が硬くても大丈夫ですか？",
        a: "問題ありません。マシンが身体の動きをサポートするため、身体が硬い方でも無理のない範囲で動くことができます。レッスン前の姿勢診断で身体の状態を確認し、その方に合った動きをご提案します。",
      },
      {
        q: "駐車場はありますか？",
        a: "駐車場を3台分ご用意しております。",
      },
      {
        q: "無理な勧誘はありますか？",
        a: "体験後は、ご希望に応じて料金や通い方をご案内しております。ご入会を強くお勧めすることはございません。",
      },
    ],
  },

  closing: {
    heading: "大人数ではなく、\nあなたの身体に目が届くピラティスを。",
    lead: "マンツーマンも最大3名のセミパーソナルも、\nまずは体験してみませんか？",
    chips: [
      "パーソナルマシンピラティス",
      "最大3名のセミパーソナル",
      "姿勢診断付き",
      "鍼灸師・整体師監修",
      "初心者歓迎",
      "海老名店",
    ],
  },

  reserve: {
    eyebrow: "ご希望の日時をお選びください",
    // ★TBD(§18): hacomono 海老名店の予約URL。null の間は非リンク描画になる。
    stores: [{ label: "無料体験を予約する", url: null }],
    note: "空き状況の確認のみでもご利用いただけます。",
  },

  sticky: {
    offers: [{ label: "体験レッスン", value: "無料" }],
    buttonText: "無料体験を予約する",
    anchor: "#reserve",
    showAfter: 620,
  },
};

export default config;

export { ASSET };
