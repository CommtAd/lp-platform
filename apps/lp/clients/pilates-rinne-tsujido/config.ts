import type { ClientStatus } from "@shared/index";

const ASSET = "/clients/pilates-rinne-tsujido";

/**
 * ピラティスRINNE 辻堂店 — 実顧客LP。海老名店（pilates-rinne-ebina）を複製して作成。
 *
 * ■ 店舗別LP運用について
 * 店舗ごとに個別のLPを作る方針のため、このLPは辻堂店専用（slug: pilates-rinne-tsujido）。
 * 店舗選択UIは持たず、予約導線・店舗情報・FAQ等はすべて辻堂店1店舗の内容のみ。
 * ダッシュボード側で slug "pilates-rinne-tsujido" を登録すること（規約12）。
 *
 * ■ 構成がテンプレAと違う理由
 * 海老名店と同じ理由・同じ方針（専用 page.tsx + 専用config型 + check-rules の
 * FORM_EXEMPT登録）。予約ボタンはhacomonoの店舗別ウィジェットへ接続、LPFormは未使用。
 * LPShell は必須のため維持。
 *
 * ■ 未確定 — すべて `null` / 〇〇 / 00 表記（複製時点で辻堂店固有の情報が未着手のため）
 * もっともらしい仮の値は入れていない。実データと区別できなくなり、
 * そのまま公開される事故につながるため。
 *   1. reserve.stores[].url — hacomono辻堂店予約URL（★これが無いとCTAが機能しない）
 *   2. stores[].tel / access（駐車場等） / map画像 — 電話番号・アクセス補足・地図画像
 *      （住所・営業時間・定休日は2026-08-05に顧客から受領し反映済み）
 *   3. 月額料金・入会金・事務手数料・キャンペーン適用条件・対象期間の明記
 *   4. flow.steps[].time — 各ステップの所要時間
 *   5. instructors[].name / nameEn / tags / body — 氏名・資格・指導歴
 *   6. testimonials[] — お客様の声（★広告掲載許可の取得が前提）
 *   7. achievement — Google口コミ等の実績数値
 *   8. instructors[1].img — 2人目のインストラクター写真（未着手。1人目のみ配置済み）
 *   9. FAQ — 海老名店の内容を仮置き。辻堂店向けに確定回答を確認後、要否を見直す。
 *
 * ■ 写真素材について（2026-08-05 反映）
 * 顧客共有のGoogle Drive「ピラティス素材(RINNE様)」フォルダより辻堂店の撮影素材を配置。
 * 海老名店の写真（store-ebina.jpg等）とは別素材であり、流用していない。
 *
 * store-tsujido.jpg のみ、フォルダ内の静止画「辻堂店外観1.jpg」（顧客がファイル名で
 * 指定）を使用。それ以外（hero / reason-1〜4 / posture / instructor-1）は、
 * 依頼時点でこの静止画の存在に気づかず、フォルダ内のiPhone動画（IMG_77xx.MOV、
 * 数秒のカット）から代表フレームを切り出して静止画化したもの（1600px・JPEG品質78）。
 * 動画切り出しのため画質はやや粗い。フォルダには他にも「TEP0933x」「RINNExx」系の
 * 高画質な写真（2025/12/27撮影、海老名店/辻堂店混在・店舗未分類）が多数あるため、
 * 顧客に各写真がどちらの店舗かを確認できれば、それらへの差し替えを推奨する。
 * 使用した元動画（フレーム切り出し元）:
 *   hero.jpg ← IMG_7769 / reason-1.jpg ← IMG_7763 / reason-2.jpg ← IMG_7777 /
 *   reason-3.jpg ← IMG_7767 / reason-4.jpg ← IMG_7773 / posture.jpg ← IMG_7776 /
 *   instructor-1.jpg ← IMG_7765
 * （reason-3とreason-4は初版がどちらも同じ2人の近距離カウンセリング写真で似すぎていた
 *   ため、reason-4はスタジオ全体を映した別カットに差し替え済み。2026-08-05）
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
  slug: "pilates-rinne-tsujido",
  status: "draft",
  meta: {
    title:
      "ピラティスRINNE 辻堂店｜最大3名のセミパーソナル・姿勢診断付きマシンピラティス",
    description:
      "辻堂店のセミパーソナルマシンピラティスRINNE。最大3名だからインストラクターが一人ひとりの動きを確認します。鍼灸師・整体師監修のプログラムと姿勢診断から始めるので、ピラティスが初めての方・身体が硬い方も安心。体験レッスン受付中。",
    ogpImage: undefined,
  },
  accent: "#003E2F",

  header: {
    brand: "PILATES RINNE",
    brandSub: "パーソナルマシンピラティス",
    stores: ["辻堂店"],
    // TBD: 駐車場・駐輪場の有無
    note: undefined,
  },
  offerBar: {
    badgeLines: ["期間", "限定"],
    text: "無料体験レッスン受付中",
  },
  // TBD: Google口コミ等の実績数値。確定まで数字を出さない。
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
    },
    notes: ["初心者歓迎", "鍼灸師・整体師監修", "辻堂店で体験受付中"],
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
        // TBD: 各ステップの所要時間
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
    // TBD: 実際のお客様の声。広告掲載許可取得後に追加する。
    items: [],
  },

  instructors: {
    heading: "一人ひとりの身体に、丁寧に向き合います。",
    lead: "姿勢や身体の使い方を確認しながら、\nその方に必要な動きをご提案します。",
    swipeHint: "スワイプで移動",
    // TBD: インストラクター情報（氏名・保有資格・指導歴・得意な指導・メッセージ・写真）
    items: [
      {
        // TBD: 氏名・資格が確認できるまで、写真のみ配置（動画フレーム切り出し。src: null に戻す場合は要確認）
        img: { placeholder: "インストラクターの写真", src: `${ASSET}/instructor-1.jpg` },
        role: "INSTRUCTOR",
        name: "氏名 要確認",
        nameEn: "Name TBD",
        body:
          "指導歴・得意な指導・お客様へのメッセージをここに記載します。インストラクター情報受領後に差し替えてください。",
        tags: ["保有資格を記載"],
      },
      {
        // TBD: 2人目のインストラクター写真は未着手
        img: { placeholder: "インストラクターの写真", src: null },
        role: "INSTRUCTOR",
        name: "氏名 要確認",
        nameEn: "Name TBD",
        body:
          "指導歴・得意な指導・お客様へのメッセージをここに記載します。インストラクター情報受領後に差し替えてください。",
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
        name: "辻堂店",
        appeal: "辻堂駅から徒歩2分",
        // Google Drive「辻堂店外観1.jpg」を使用（顧客がファイル名で指定）
        img: { placeholder: "辻堂店の外観", src: `${ASSET}/store-tsujido.jpg` },
        address: "〒253-0014 神奈川県茅ヶ崎市本宿町12-11\n辻堂NWビル 3F 11号",
        hours: "営業時間 09:00〜21:30",
        closed: "定休日 不定休となります",
        // TBD: 電話番号
        tel: null,
        access: ["辻堂駅から徒歩2分", "近隣に無料駐輪場あり"],
        map: { placeholder: "辻堂店の地図", src: null },
        // Googleマップ共有リンク（https://maps.app.goo.gl/FurAdYzjGvcXvR8h7）が指す
        // Googleビジネスプロフィール名で検索し、店名ラベル付きピンを表示。
        // 住所テキスト検索だと別店舗のピンにマッチしていたため、正式な店名指定に変更。
        mapEmbedSrc:
          "https://maps.google.com/maps?q=" +
          encodeURIComponent("パーソナルマシンピラティス RINNE 辻堂スタジオ") +
          "&z=17&output=embed",
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
        // TBD: 辻堂店の駐車場有無に応じて確認
        q: "駐車場はありますか？",
        a: "〇〇",
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
      "辻堂店",
    ],
  },

  reserve: {
    eyebrow: "ご希望の日時をお選びください",
    stores: [
      {
        label: "無料体験を予約する",
        url: "https://rinne-pilates.hacomono.jp/widgets/4?isShowProgramName=true&studioId=4",
      },
    ],
    note: "初回体験0円｜しつこい勧誘はいたしません。",
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
