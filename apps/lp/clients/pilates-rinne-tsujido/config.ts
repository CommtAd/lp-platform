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
 *   hero.jpg ← IMG_7776 / reason-1.jpg ← IMG_7763 / reason-2.jpg ← IMG_7777 /
 *   reason-3.jpg ← IMG_7767 / reason-4.jpg ← IMG_7773 / posture.jpg ← IMG_7769 /
 *   instructor-1.jpg ← IMG_7765
 * （reason-3とreason-4は初版がどちらも同じ2人の近距離カウンセリング写真で似すぎていた
 *   ため、reason-4はスタジオ全体を映した別カットに差し替え済み。2026-08-05）
 * （2026-08-25: 「パーソナルスタジオ」訴求への変更に合わせ、MVの中身を差し替え。
 *   フォルダ内の素材は実質「カウンセリング中の2人」系統（hero/reason-1/reason-3/
 *   instructor-1、いずれも近い数秒のカットで見た目が近い）と「姿勢診断デモの
 *   立ち姿」系統（posture/reason-4）の2パターンしかないため、MVを後者の系統に
 *   差し替えて視覚的な違いを出した。ファイル名は変更せず内容のみ入れ替え。
 *   hero.jpg⇔posture.jpgの内容を交換、hero.jpg⇔instructor-1.jpgも先に交換済み。
 *   本当に「レッスン中」の写真は素材内に存在しないため、それが必要なら顧客への
 *   追加素材依頼（Google Drive内の未分類高画質写真、または新規撮影）が必要）
 */

/** レイアウト上の画像枠。`src` が null ならプレースホルダ表示。 */
export interface Slot {
  placeholder: string;
  src?: string | null;
  /** 切り抜き位置（例 "38% center"）。既定は "center"。 */
  position?: string;
  /**
   * 明るさ・彩度の補正（CSS filter）。
   * 素材が店内の暗い照明で撮られた動画フレームのため、枠によっては持ち上げが要る。
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

  /** ④ 料金プラン */
  plans: {
    heading: string;
    lead: string;
    /** 列見出し（英字＋和文）。1列目は回数ラベル列なので含めない。 */
    columns: { en: string; ja: string }[];
    /** 行＝月あたりの回数。values は columns と同じ並び。 */
    rows: {
      label: string;
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
   * 体験キャンペーン（完全無料訴求）。pin 37 で「料金・キャンペーン」セクションを
   * 削除したため見出しは持たず、料金表直下と最終予約エリアの2箇所で使う。
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
      "ピラティスRINNE 辻堂店｜マンツーマン・姿勢診断付きマシンピラティス",
    description:
      "辻堂店のパーソナルマシンピラティスRINNE。マンツーマンだからインストラクターが一人ひとりの動きを確認します。鍼灸師・整体師監修のプログラムと姿勢診断から始めるので、ピラティスが初めての方・身体が硬い方も安心。体験レッスン受付中。",
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
    badgeText: "9/30まで",
    text: "無料体験レッスン受付中",
  },
  // TBD: Google口コミ等の実績数値。確定まで数字を出さない。
  achievement: { pre: "鍼灸師・整体師監修", num: "", post: "のプログラム" },

  fv: {
    catchLines: ["ただ痩せるより、", "キレイな身体へ。"],
    subLines: [
      "身体のお悩みに姿勢からアプローチ",
      "パーソナルマシンピラティス RINNE",
    ],
    hero: {
      /*
        AUN No.5「動画が可能なら公式のような動画を挿入」に対して顧客から受領した
        レッスン中の動画。ImageSlot が拡張子で判定し、autoPlay / muted / loop /
        playsInline の <video> として描画する（エンドレス再生）。
        元データは .mov / 1080x1350 / 60fps / 38MB。Chromeなどは .mov を再生できず、
        容量もMVには重すぎるため、mp4(H.264 High) / 810x1012 / 30fps / 約2MB へ変換し、
        音声は削除している（muted再生なので不要、自動再生のブロック回避にもなる）。
      */
      placeholder: "ピラティスをしている様子（メインビジュアル）",
      src: `${ASSET}/hero.mp4`,
    },
    notes: ["猫背", "肩こり", "ぽっこりお腹", "反り腰"],
    chips: [{ small: "姿勢診断", big: "付き" }],
  },

  worry: {
    heading: "このようなお悩みはありませんか",
    items: [
      "猫背や巻き肩で、姿勢が悪く見える",
      "肩こりや身体の疲れが気になる",
      "下腹や下半身がなかなかすっきりしない",
      "運動したいけれど何をすればいいかわからない",
      "大人数のレッスンについていけるか不安",
    ],
    closing: "そのお悩み、身体の状態を\n確認することから始めませんか？",
  },

  reasons: {
    heading: "RINNEが選ばれる理由",
    items: [
      {
        num: "01",
        title: "完全マンツーマンで一人ひとりに向き合う",
        body:
          "大人数のグループレッスンとは異なり、インストラクターがお客様一人に集中して動きを確認します。初心者の方や、正しく動けているか不安な方にも安心して参加いただけるレッスンです。",
        img: {
          placeholder: "マンツーマンで受講している様子",
          src: `${ASSET}/reason-1.jpg`,
          /*
            元は900x1600の縦写真で、枠は428x210の横長。cover で高さの約27%しか
            映らないため、切り出す帯がずれると人物が丸ごと落ちる。
            2人の顔と手元の資料が入る位置（原寸で上から約43〜71%）に合わせている。
            横は cover 後の幅が枠とぴったり一致するため指定しても効かない。
          */
          position: "center 60%",
          // 店内が暗く、黒い服の2人が背景に沈んで見えにくいので少し持ち上げる。
          filter: "brightness(1.16) contrast(1.06) saturate(1.04)",
        },
      },
      {
        num: "02",
        title: "自分の身体を知る「姿勢診断」",
        body:
          "レッスン前に姿勢や身体の癖を確認し、一人ひとりの状態に合わせて必要な動きをご提案します。全員が同じ動きをするのではなく、自分の身体に合ったレッスンを受けられます。",
        img: { placeholder: "姿勢診断の様子", src: `${ASSET}/reason-2.jpg` },
      },
      {
        num: "03",
        title: "鍼灸師・整体師\n身体を知るプロが監修",
        body:
          "身体に関する知識を持つ専門家が、姿勢や身体の使い方を考えたプログラムを監修しています。ただ身体を動かすだけでなく、姿勢や動きやすさを意識したレッスンを行います。",
        // TBD: ピラティス実施中の写真へ差し替え（現素材はカウンセリング中のため素材受領待ち）
        img: { placeholder: "ピラティスをしている様子（素材受領待ち）", src: null },
      },
      {
        num: "04",
        title: "続けやすい料金",
        body:
          "お客様の状況や課題に合わせて2つのプランをお選びいただけます。まずはパーソナルプランで基礎基本をマスター。慣れてきたらコスパ重視のセミパーソナルで長く継続がRINNEのおすすめです。",
        img: {
          placeholder: "スタジオ内観・マシンの写真",
          src: `${ASSET}/reason-4.jpg`,
          /*
            既定の center だと上端に天井の暗い帯が入り、骸骨模型の頭も枠にかかる。
            少しだけ下げて天井を外した。56%まで下げると人物はもっと入るが
            RINNEのロゴ上端が切れて「04」バッジと重なるため、ロゴが収まる53%で止めている。
          */
          position: "center 53%",
          // 白壁で元から明るめなので、①ほど強くは持ち上げない。
          filter: "brightness(1.08) saturate(1.03)",
        },
      },
    ],
  },

  // pin 25: お悩み訴求のあとに「目指せる未来」を追加。
  // 添付は他社LPのイメージ共有のみのため、レイアウトはRINNEの配色・書体に合わせて起こす。
  future: {
    heading: "姿勢から整えて、\nもっと好きになれる身体へ。",
    items: [
      {
        num: "01",
        title: "すっと伸びた美しい姿勢",
        body: "自然と自信を持てる、きれいな立ち姿へ。",
        // TBD: 各項目の写真は素材受領待ち
        img: { placeholder: "美しい姿勢のイメージ", src: null },
      },
      {
        num: "02",
        title: "すっきりしたお腹まわり",
        body: "姿勢を整えて、身体のラインを美しく。",
        img: { placeholder: "お腹まわりのイメージ", src: null },
      },
      {
        num: "03",
        title: "女性らしいヒップライン",
        body: "お尻や脚を正しく使える身体を目指します。",
        img: { placeholder: "ヒップラインのイメージ", src: null },
      },
      {
        num: "04",
        title: "軽やかに動ける身体",
        body: "毎日の動きまでラクになる身体づくりへ。",
        img: { placeholder: "軽やかに動く身体のイメージ", src: null },
      },
    ],
    closing: "RINNEなら、\n一人ひとりの身体に合わせて整えます。",
  },

  // pin 21〜24: 「比較」カテゴリを「料金表」カテゴリに差し替え。
  // 金額・注記は顧客支給の料金表（AUN添付 2026-09-10）をそのまま転記している。
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
          { price: "34,800円", campaign: "29,800円", campaignNote: "最初の3ヶ月" },
          { price: "19,800円" },
        ],
      },
      {
        label: "月6回",
        values: [
          { price: "49,800円", campaign: "44,800円", campaignNote: "最初の3ヶ月" },
          { price: "27,800円" },
        ],
      },
      {
        label: "月8回",
        values: [
          // 顧客支給の表では月6回と同額（44,800円）。誤記の可能性があるため要確認。
          { price: "59,800円", campaign: "44,800円", campaignNote: "最初の3ヶ月" },
          { price: "34,800円" },
        ],
      },
      {
        label: "月12回",
        values: [
          { price: "85,800円", campaign: "80,800円", campaignNote: "最初の3ヶ月" },
          { price: "49,800円" },
        ],
      },
    ],
    taxNote: "表示価格は税込です",
    notes: [
      "6ヶ月以上所属の方は、7ヶ月目から月2回プランもお選びいただけます。",
      "※パーソナル月2回 17,800円、セミパーソナル月2回 11,800円",
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
      "RINNEに通う方の中には、運動が久しぶりの方や、ピラティスが初めての方もいらっしゃいます。マンツーマンだからこそ、周囲を気にせず、ご自身のペースでレッスンを受けられます。",
    items: [
      "マンツーマンだから質問しやすい",
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
    campaignBadge: "9月30日までに体験予約をした方限定",
    campaignTitle: "体験レッスン無料",
    campaignLead:
      "マンツーマンのパーソナルレッスンを、\n姿勢診断とあわせてまずは体験してみませんか？",
    trialRegular: "8,800",
    trialNow: "完全無料",
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
        a: "はい、初めての方も歓迎しております。マンツーマンで、インストラクターが一人ひとりの動きを確認しながら進めますので、初めての方でも安心してご参加いただけます。",
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
    lead: "マンツーマンのパーソナルレッスンを、\nまずは体験してみませんか？",
    chips: [
      "パーソナルマシンピラティス",
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
    note: "初回体験 完全無料｜入会金0円｜しつこい勧誘はいたしません。",
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
