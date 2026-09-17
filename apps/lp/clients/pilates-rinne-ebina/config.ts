import type { ClientStatus } from "@shared/index";

const ASSET = "/clients/pilates-rinne-ebina";

/**
 * ピラティスRINNE 海老名店 — 実顧客LP。構成案 §15〜§19 に対応。
 *
 * ■ 店舗別LP運用について
 * 店舗ごとに個別のLPを作る方針のため、このLPは海老名店専用（slug: pilates-rinne-ebina）。
 * 辻堂店は pilates-rinne-tsujido。
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
 * ■ デザインを辻堂店に合わせた（2026-09-18）
 * 辻堂店（pilates-rinne-tsujido）で重ねた修正をこのLPにも反映し、
 * page.tsx / FaqList.tsx は辻堂店と同一コピーに戻した。差分は config.ts のみ。
 * 以降、どちらかの page.tsx を直したらもう一方にも必ずコピーすること。
 * 取り込んだ主な変更:
 *   - 比較表（④他レッスン形式との違い）を廃止し、料金プラン表（plans）へ差し替え
 *   - 「目指せる未来」セクション（future）を追加
 *   - 「料金・キャンペーン」セクションを廃止し、体験キャンペーン（pricing）を
 *     MV直下・料金表直下・最終予約エリアの3箇所に配置
 *   - CTAを7本から4本へ整理、オファー帯の丸バッジを1行のピルへ変更
 *   - 全体の文字サイズ引き上げ・お悩みの1列化・予約ボタンを濃緑に統一
 * 取り込まなかったもの:
 *   - アクティブライフ（activeLife）: 湘南・海沿いの立地に寄せたブロックのため、
 *     内陸の海老名店では未設定にして丸ごと非表示にしている（page.tsx が自動でスキップ）。
 *   - MVの動画（hero.mp4）: 辻堂店の撮影素材。海老名店は従来の hero.jpg のまま。
 *
 * ■ 未確定（ブリーフ §18 優先確認事項）— すべて `null` / 〇〇 / 00 表記
 * もっともらしい仮の値は入れていない。実データと区別できなくなり、
 * そのまま公開される事故につながるため。
 *   1. reserve.stores[].url — hacomono海老名店予約URL（★これが無いとCTAが機能しない）
 *   2. stores[].tel — 海老名店の電話番号（住所・営業時間・定休日・アクセスは確定済み）
 *   3. plans — 金額は辻堂店と同一の全店共通料金として転記（2026-09-18 指示）。
 *      海老名店固有の料金表が出てきた場合は要差し替え。入会金・事務手数料・
 *      キャンペーン適用条件は景表法上、公開前に明記が必要。
 *   4. flow.steps[].time — 各ステップの所要時間
 *   5. instructors[].name / nameEn / tags / body — 氏名・資格・指導歴（写真はGoogle Driveの実素材を仮配置済み）
 *   6. testimonials[] — お客様の声（★広告掲載許可の取得が前提）
 *   7. achievement — Google口コミ等の実績数値
 *   8. stores[].map の src — 地図画像（写真は実素材を仮配置済み。mapEmbedSrcでGoogleマップ埋め込み済み）
 *   9. FAQは顧客修正指示により確定回答のある4問（初心者・身体の硬さ・駐車場・勧誘の有無）に絞り済み。
 *      年齢制限・男性利用・服装・持ち物・更衣室・所要時間・予約変更・妊娠中/産後は削除した
 *      （復活させる場合は要確認の回答を用意してから追加する）
 *  10. reserve.note — 辻堂店の「入会金0円」は海老名店で未確認のため転記していない。
 *
 * ■ 写真素材について（2026-07-31 反映）
 * Google Drive「ピラティス素材(RINNE様)」フォルダより、海老名店と確認済みの写真を
 * 9枚配置（public/clients/pilates-rinne-ebina/）。フルサイズ(6000px級, 10MB前後)を
 * sipsで1600px・JPEG品質78に圧縮済み（1枚あたり200〜350KB）。同フォルダ内の
 * TEP09332/TEP09374は辻堂店の写真と確認したため、このLPには使用していない。
 * インストラクターの写真は現状「複数人が写る指導風景」から流用しており、本来の
 * 個人ポートレートではない。ソロ写真が用意され次第、差し替えが必要。
 * future-01〜04.jpg のみ、店舗を特定しないイメージカット（スタジオ内の立ち姿等）のため
 * 辻堂店と共通の素材を使っている。店舗の写真は流用していない。
 */

/** レイアウト上の画像枠。`src` が null ならプレースホルダ表示。 */
export interface Slot {
  placeholder: string;
  src?: string | null;
  /** 切り抜き位置（例 "38% center"）。既定は "center"。 */
  position?: string;
  /**
   * 明るさ・彩度の補正（CSS filter）。
   * 素材が店内の暗い照明で撮られた場合、枠によっては持ち上げが要る。
   */
  filter?: string;
}

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
    /** 期限バッジ。1行の帯なので分割せず1文字列で持つ。 */
    badgeText: string;
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
    /** 特徴チップ（姿勢診断付き / 監修） */
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

  /** ③-2 目指せる未来 */
  future: {
    heading: string;
    items: { num: string; title: string; body: string; img: Slot }[];
    closing: string;
  };

  /**
   * ③-3 アクティブライフ。
   * 「目指せる未来」の締めと「選ばれる理由」の間に挟む、生活シーンの訴求ブロック。
   * 立地に紐づく内容なので、合わない店舗では未設定にしてよい（page.tsx が自動で省く）。
   */
  activeLife?: {
    /** ブロックの見出し（\n で改行）。 */
    heading: string;
    /** シーンカード。2列グリッドに流し込むので偶数で持つ。 */
    cards: {
      en: string;
      ja: string;
      /** カード下のコピー。\n で改行。 */
      copy: string;
      img: Slot;
    }[];
  };

  /** ④ 料金プラン */
  plans: {
    heading: string;
    lead: string;
    /** 列見出し（英字＋和文）。1列目は回数ラベル列なので含めない。 */
    columns: { en: string; ja: string }[];
    /**
     * 行＝月あたりの回数。values は columns と同じ並び。
     * 金額は「1回あたり」で持つ（月額 ÷ 回数・10円未満切り捨て）。
     * 月額そのものは表に出さない。
     */
    rows: {
      label: string;
      /** price / campaign は "8,700円/回" の形。数字と単位は表示側で出し分ける。 */
      values: { price: string; campaign?: string; campaignNote?: string }[];
    }[];
    taxNote: string;
    /** 表の下に置く補足（月2回プランの条件など） */
    notes: string[];
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

  /**
   * 体験キャンペーン（完全無料訴求）。「料金・キャンペーン」セクションは
   * 廃止したため見出しは持たず、MV直下・料金表直下・最終予約エリアの3箇所で使う。
   */
  pricing: {
    campaignBadge: string;
    campaignTitle: string;
    campaignLead: string;
    /** 通常体験料金（未確定は "00,000"） */
    trialRegular: string;
    /**
     * キャンペーン適用後の体験料金表示。
     * 「0円」のような金額ではなく「完全無料」のような文言も入る（文字数に応じて
     * 表示サイズは page.tsx 側で調整済み）。
     */
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
    /** CTAブロック上部の小見出し。未設定なら出さない。 */
    eyebrow?: string;
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
    badgeText: "9/30まで",
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
    heading: "このようなお悩みは\nありませんか",
    items: [
      "猫背や巻き肩が気になる",
      "下腹や下半身のラインが気になる",
      "運動不足を感じている",
      "身体が硬く、運動に苦手意識がある",
      "大人数のレッスンについていけるか不安",
      "グループレッスンでは\n十分に見てもらえなかった",
      "パーソナルレッスンは\n料金面で続けにくい",
      "自分に合った運動が分からない",
    ],
    closing: "そのお悩み、\n身体の状態を確認する\nことから始めませんか？",
  },

  reasons: {
    heading: "RINNEが選ばれる理由",
    items: [
      {
        num: "01",
        title: "マンツーマンも最大3名の\nセミパーソナルも選べる",
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

  // お悩み訴求のあとに置く「目指せる未来」。辻堂店と共通の内容・共通のイメージカット。
  // 店舗を特定しない素材のため、両店で同じ写真を使っている。
  future: {
    heading: "姿勢から整えて、\nもっと好きになれる身体へ。",
    items: [
      {
        num: "01",
        title: "すっと伸びた美しい姿勢",
        body: "自然と自信を持てる、きれいな立ち姿へ。",
        img: { placeholder: "美しい姿勢のイメージ", src: `${ASSET}/future-01.jpg` },
      },
      {
        num: "02",
        title: "すっきりしたお腹まわり",
        body: "姿勢を整えて、身体のラインを美しく。",
        img: { placeholder: "お腹まわりのイメージ", src: `${ASSET}/future-02.jpg` },
      },
      {
        num: "03",
        title: "女性らしいヒップライン",
        body: "お尻や脚を正しく使える身体を目指します。",
        img: { placeholder: "ヒップラインのイメージ", src: `${ASSET}/future-03.jpg` },
      },
      {
        num: "04",
        title: "軽やかに動ける身体",
        body: "毎日の動きまでラクになる身体づくりへ。",
        img: { placeholder: "軽やかに動く身体のイメージ", src: `${ASSET}/future-04.jpg` },
      },
    ],
    closing: "RINNEなら、一人ひとりの\n身体に合わせて整えます。",
  },

  /*
   * activeLife は未設定（＝非表示）。
   * 辻堂店のこのブロックはサーフィン等、湘南・海沿いの立地に寄せた4シーンで、
   * 内陸の海老名店には合わないため丸ごと省いている（2026-09-18 指示）。
   * 海老名向けのシーンと写真が用意できたら、ここに activeLife を足せば表示される。
   */

  // 金額は辻堂店の料金表をそのまま転記（全店共通料金という前提・2026-09-18 指示）。
  // 元の月額を回数で割った「1回あたり」で持ち、10円未満は切り捨て。
  plans: {
    heading: "料金プラン",
    lead: "2つのプランを使い分けできるから\nマシンピラティスを長く続けられる",
    columns: [
      { en: "PERSONAL", ja: "パーソナル" },
      { en: "SEMI PERSONAL", ja: "セミパーソナル" },
    ],
    rows: [
      {
        label: "月4回",
        values: [
          // 34,800円 → 8,700円 / 29,800円 → 7,450円
          { price: "8,700円/回", campaign: "7,450円/回", campaignNote: "最初の3ヶ月" },
          // 19,800円 → 4,950円
          { price: "4,950円/回" },
        ],
      },
      {
        label: "月6回",
        values: [
          // 49,800円 → 8,300円 / 44,800円 → 7,466.6円 → 7,460円
          { price: "8,300円/回", campaign: "7,460円/回", campaignNote: "最初の3ヶ月" },
          // 27,800円 → 4,633.3円 → 4,630円
          { price: "4,630円/回" },
        ],
      },
      {
        label: "月8回",
        values: [
          // 顧客支給の表ではキャンペーン額が月6回と同額（44,800円）。誤記の可能性があるため要確認。
          // 59,800円 → 7,475円 → 7,470円 / 44,800円 → 5,600円
          { price: "7,470円/回", campaign: "5,600円/回", campaignNote: "最初の3ヶ月" },
          // 34,800円 → 4,350円
          { price: "4,350円/回" },
        ],
      },
      {
        label: "月12回",
        values: [
          // 85,800円 → 7,150円 / 80,800円 → 6,733.3円 → 6,730円
          { price: "7,150円/回", campaign: "6,730円/回", campaignNote: "最初の3ヶ月" },
          // 49,800円 → 4,150円
          { price: "4,150円/回" },
        ],
      },
    ],
    taxNote: "表示価格は税込です",
    notes: [
      "6ヶ月以上所属の方は、7ヶ月目から月2回プランもお選びいただけます。",
      "※パーソナル月2回 8,900円/回、セミパーソナル月2回 5,900円/回",
    ],
  },

  posture: {
    heading: "自分に必要な運動を\n知ることから。",
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
    heading: "ピラティスが初めてでも、\n大丈夫です。",
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
    campaignBadge: "9月30日までに体験予約をした方限定",
    // 直下の金額表記が「完全無料」なので、見出し側では「無料」を使わない
    campaignTitle: "お試し体験レッスン",
    campaignLead:
      "マンツーマンも最大3名のセミパーソナルも、\n姿勢診断とあわせてまずは体験してみませんか？",
    trialRegular: "8,800",
    trialNow: "完全無料",
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
    heading: "大人数ではなく、\nあなたの身体に目が届く\nピラティスを。",
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
    // 辻堂店に合わせて eyebrow は出さない（ボタンだけを置く）。
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
