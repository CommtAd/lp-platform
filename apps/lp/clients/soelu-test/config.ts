/**
 * ソエルスタジオ戸越銀座店（テスト枠 / slug: soelu-test）。
 *
 * 初稿は「4色目を足さない・ゴールド禁止」のブリーフで組んだが、
 * AUNレビュー（2026-09-17 / 27件）でCTA4本すべて「ゴールドベースに」の指示が入ったため、
 * CTAと特典まわりはゴールド系へ切り替えている（既存 `soelu-togoshiginza` の本番配色と同じ）。
 * ベースの紺×淡青×白はそのまま。
 *
 * 料金・キャンペーンの法務注記はレビュー添付（実LPのスクリーンショット）に合わせている。
 * 公式サイト掲載額とは異なるため、**掲載前に顧客確認が必要**。
 *
 * CVは公式予約システム（mypage.soelu.com）への外部遷移。
 */

const ASSET = "/clients/soelu-test";

/** 予約導線。SOELU公式の予約ウィジェットへ送る。 */
export const CTA_URL = "https://mypage.soelu.com/reserve/schedule/88/317";

export interface Slot {
  placeholder: string;
  src?: string;
}

export interface SoeluTestConfig {
  meta: { title: string; description: string };

  /** 1. ヘッダー（AUN #4） */
  header: { brand: string; sub: string; routes: [string, string] };

  /** 2. オファーバー（AUN #3） */
  offerBar: { main: string; sub: string };

  /** 4. FV（AUN #1 バッジ削除 / #2 キャッチ変更） */
  fv: { catchLines: [string, string]; hero: Slot };

  /** 5. FV下のメインカラー帯（AUN2 #10 — 添付を参考に特徴カード4枚へ） */
  fvBand: {
    pill: string;
    features: {
      label: string;
      lines: string[];
      /** カードの色味。よもぎ蒸しだけ緑にして、青一色の単調さを崩す。 */
      tone: "blue" | "green" | "sky" | "indigo";
      badge?: { main: string; sub: string };
    }[];
    /** 特徴カードの下に置く注釈（AUN e5kw59 #1）。 */
    featuresNote?: string;
  };

  /** 6. 体験キャンペーン（AUN #7） */
  reservation: {
    badge: string;
    eyebrow: string;
    heading: string;
    lead: string[];
    chips: { label: string; value: string }[];
    rows: { tag: string; label: string; value: string; note?: string }[];
    notes: string[];
  };

  /** 7. お悩み訴求（AUN #9） */
  worry: {
    heading: string;
    items: { text: string; highlight: string }[];
    closingPre: string;
    closingHighlight: string;
  };

  /** 8. 目指せる未来（AUN #10-13 画像 / #14 見出し / #15 文字サイズ） */
  future: {
    heading: string;
    items: { num: string; title: string; body: string; img: Slot }[];
    closing: string;
  };

  /** 9. 選ばれる理由（AUN #16 画像 / #17 4・5は画像なしでコンパクト / #19 見出し） */
  reasons: {
    heading: string;
    items: { num: string; title: string; body: string; img?: Slot; note?: string }[];
  };

  /** 10. 料金プラン（AUN #20 見出し / #24 デイユース削除 / #25 見せ方） */
  plans: {
    heading: string;
    lead: string;
    highlight: { pre: string; amount: string; post: string; lines: [string, string] };
    cross: { a: string; b: string; title: string; lines: [string, string] };
    /** 公式 studio.soelu.com/plans の3プラン構成。 */
    items: { name: string; badge?: string; price: string; machine: string }[];
    machineLabel: string;
    common: { heading: string; items: string[] };
    initial: {
      heading: string;
      rows: { label: string; value: string }[];
      total: { label: string; value: string };
      campaign: string;
    };
    taxNote: string;
    notes: string[];
  };

  /** 11. 入会特典（AUN #21 — 添付の内容で再作成・イラストは使わない） */
  benefits: {
    heading: string;
    monthly: { tag: string; label: string; value: string; note?: string }[];
    subHeading: string;
    items: { title: string; body: string }[];
    notes: string[];
  };

  /** 12. 設備のご案内（AUN #26 小見出し削除 / #27 チェックを大きく） */
  facility: { heading: string; img: Slot; body: string; checks: string[] };

  /** 13. 体験レッスンの流れ */
  flow: { heading: string; steps: { title: string; body: string }[] };

  /** 14. 初めてでも大丈夫 */
  beginner: { heading: string; body: string; checks: string[] };

  /** 15. 店舗情報 */
  access: {
    heading: string;
    img: Slot;
    name: string;
    address: string;
    hours: string;
    closed: string;
    routes: string[];
    mapUrl: string;
    mapEmbed: string;
  };

  /** 16. FAQ */
  faq: { heading: string; items: { q: string; a: string }[] };

  /** 17. クロージング */
  closing: {
    heading: string;
    lead: string;
    chips: string[];
    label: string;
    listPrice: string;
    freeText: string;
  };

  /** CTA共通（AUN #8・#18・#22・#23 でゴールド指定） */
  cta: { text: string; note: string; trialNote: string };

  /** 18. 追従フッターCTA */
  sticky: { label: string; value: string; buttonText: string };
}

const config: SoeluTestConfig = {
  meta: {
    title:
      "ソエルスタジオ戸越銀座店｜マシンピラティス&よもぎ蒸し 体験レッスン無料（9/30まで）",
    description:
      "戸越銀座駅徒歩30秒・戸越駅徒歩2分のマシンピラティススタジオ。9月30日までに体験予約された方は体験レッスン0円・初月月会費0円・入会金／事務手数料0円・翌月会費50%OFF。24時間営業、手ぶらでOK。",
  },

  header: {
    brand: "ソエルスタジオ戸越銀座店",
    sub: "女性専用マシンピラティス&よもぎ蒸し",
    routes: ["戸越銀座駅 徒歩30秒", "戸越駅 徒歩2分"],
  },

  offerBar: {
    main: "おかげさまで1周年！特別感謝キャンペーン",
    sub: "2026年9月30日までの期間限定",
  },

  fv: {
    // AUN #2: 縦書き2枚の札のコピーを差し替え。行末に1文字だけ残さない配分にしている。
    catchLines: ["ココロもカラダも", "整う毎日へ。"],
    hero: {
      placeholder: "スタジオ内観 / マシンピラティスの写真（全面）",
      src: `${ASSET}/hero-2.webp`,
    },
  },

  fvBand: {
    // AUN #5: 添付の「戸越銀座駅 徒歩30秒｜女性専用」から、指示どおり「女性専用」を削除。
    pill: "戸越銀座駅 徒歩30秒",
    // AUN2 #10: 3つのチップを、添付デザインの特徴カード4枚に差し替え。
    features: [
      { label: "マシンピラティス", tone: "blue", lines: ["しなやかに整える", "姿勢・ボディメイクに"] },
      { label: "よもぎ蒸し", tone: "green", lines: ["内側から心地よく", "リラックス＆リフレッシュ"] },
      {
        label: "スタジオレッスン受け放題",
        tone: "sky",
        // 語の途中で割れないよう、中黒の後ろで分けている。
        lines: ["ヨガ・ピラティス・", "トレーニングなど"],
        // スタジオレッスンも24時間受けられる（顧客指摘 2026-09-17）。
        // オンラインだけにバッジが付いていると、スタジオは時間制限があるように読めるため両方に置く。
        badge: { main: "24時間", sub: "早朝も深夜も\nレッスンOK" },
      },
      {
        label: "オンラインレッスン",
        tone: "indigo",
        lines: ["おうちでも", "プロのレッスンを"],
        badge: { main: "24時間", sub: "いつでも、\n自分のペースで" },
      },
    ],
    // AUN e5kw59 #1: 受け放題の対象がマット・ヨガであることを明示する。
    // 料金セクションの「全プラン共通で受け放題」と食い違って読めるため。
    featuresNote:
      "※スタジオレッスン受け放題の対象はマット・ヨガレッスンです。マシンピラティスはプランごとの回数に準じます。",
  },

  reservation: {
    badge: "1周年キャンペーンは9月30日まで",
    eyebrow: "RESERVATION",
    heading: "無料体験のご予約",
    lead: [
      "予約ページで空き状況をご確認のうえ、",
      "ご希望の日時をお選びください。",
      "30分の体験レッスンは0円（税込）。",
      "手ぶらでお越しいただけます。",
    ],
    chips: [
      { label: "30分体験", value: "¥0" },
      { label: "入会金", value: "¥0" },
    ],
    rows: [
      { tag: "初月", label: "月額会費", value: "0円", note: "（税込）" },
      { tag: "翌月", label: "月額会費", value: "50%OFF" },
    ],
    notes: [
      "※体験レッスンが無料となるのは、初めてご予約された方に限ります。",
      "※特典の適用には、2026年9月30日(水)までの体験ご予約が必要です。",
    ],
  },

  worry: {
    heading: "こんなお悩み、ありませんか？",
    items: [
      { text: "体を引き締めて、美ボディを目指したい", highlight: "美ボディ" },
      { text: "姿勢が気になってきた", highlight: "姿勢" },
      { text: "運動不足をそろそろ解消したい", highlight: "運動不足" },
      { text: "疲れが溜まってリラックスできない", highlight: "リラックス" },
    ],
    closingPre: "その悩み、",
    closingHighlight: "ソエルスタジオ戸越銀座店で\n解決しませんか？",
  },

  future: {
    heading: "ソエルスタジオ戸越銀座店なら\nこんな自分を目指せます！",
    items: [
      {
        num: "01",
        title: "すっと伸びた姿勢",
        body: "体幹を支える筋肉を目覚めさせ、\n美しい後ろ姿を目指します。",
        img: { placeholder: "まっすぐ立つ女性の写真", src: `${ASSET}/future-01.jpg` },
      },
      {
        num: "02",
        title: "しなやかな体のライン",
        body: "全身をバランスよく動かし、\n締まって見えるラインを\n目指しましょう。",
        img: { placeholder: "ストレッチする女性の写真", src: `${ASSET}/future-02.jpg` },
      },
      {
        num: "03",
        title: "肩と首へのアプローチ",
        body: "凝り固まった部分をゆるめ、\n動かしやすい体を取り戻します。",
        img: { placeholder: "デスクワーク中に肩をほぐす女性の写真", src: `${ASSET}/future-03.jpg` },
      },
      {
        num: "04",
        title: "心身共にリラックス",
        body: "呼吸に集中する時間が、\n一日の緊張をほどいていきます。",
        img: { placeholder: "深呼吸してリラックスする女性の写真", src: `${ASSET}/future-04.jpg` },
      },
    ],
    closing: "続けるたび、少しずつ理想の自分へ。",
  },

  reasons: {
    heading: "選ばれる理由",
    items: [
      {
        num: "01",
        title: "プロ監修の動画レッスン×\nスタッフのサポート",
        body: "レッスンはプロインストラクター監修の動画に沿って進むので、スタッフによる指導の差が出ません。細かなフォームの調整は、スタジオのスタッフが直接お声がけしてサポートします。",
        img: { placeholder: "動画レッスン受講シーンの写真", src: `${ASSET}/reason-01.jpg` },
        note: "※時間帯により、スタッフが不在の場合がございます。",
      },
      {
        num: "02",
        title: "ピラティスとよもぎ蒸しの\n贅沢なWケア",
        body: "体を動かして引き締めたあとは、よもぎの蒸気でじんわり温まる時間を。運動と温活のWケアが、ひとつのスタジオ・ひとつの月会費で完結します。",
        img: { placeholder: "よもぎ蒸しルームの写真", src: `${ASSET}/yomogi.webp` },
        note: "※よもぎ蒸しは会員限定メニューです。体験レッスンではご利用いただけません。",
      },
      {
        num: "03",
        title: "女性専用の、清潔で\n落ち着いたスタジオ",
        body: "会員さまは女性のみ。更衣室・天井ミラー・無料レンタルウェアを完備しているので、まわりを気にせずレッスンそのものに集中していただけます。",
        img: { placeholder: "スタジオ内観の写真", src: `${ASSET}/studio-space.jpg` },
      },
      // AUN #17: 04・05は画像なし。2列のコンパクトカードでまとめる。
      {
        num: "04",
        title: "24時間営業・\n駅徒歩30秒",
        body: "早朝も深夜も、自分のタイミングで通えます。",
      },
      {
        num: "05",
        title: "予約もキャンセルも\nスマホで簡単",
        body: "思い立ったときにサクッと予約できます。",
      },
    ],
  },

  plans: {
    heading: "料金プラン",
    lead: "ライフスタイルに合わせて選べるプラン。",
    // AUN #25: 添付の見せ方（1回あたりの目安価格を大きく打ち出す）を踏襲。
    highlight: {
      pre: "1回 約",
      amount: "330",
      post: "円〜で",
      lines: ["姿勢もカラダも", "整う毎日へ。"],
    },
    cross: {
      a: "戸越銀座",
      b: "中延",
      title: "相互利用OK!",
      lines: ["2店舗どちらも使えて、", "通いやすい!"],
    },
    // AUN2 #13: 公式サイト（studio.soelu.com/plans）の3プラン構成で作り直し。
    // AUN #24 の「デイユース削除」は公式にも存在しないプランなので、そのまま解消している。
    items: [
      { name: "スタンダード", price: "7,678円", machine: "チケット制（1回 1,500円）" },
      { name: "ピラティス4", badge: "おすすめ", price: "9,878円", machine: "月4回（以降 1回 1,500円）" },
      { name: "プレミアム", badge: "人気No.1", price: "13,178円", machine: "受け放題" },
    ],
    machineLabel: "マシンピラティス",
    common: {
      heading: "全プラン共通で受け放題",
      items: ["マット・ヨガレッスン", "よもぎ蒸し", "オンラインレッスン"],
    },
    initial: {
      heading: "初期費用",
      rows: [
        { label: "入会金", value: "5,500円" },
        { label: "事務手数料", value: "5,500円" },
      ],
      total: { label: "合計", value: "11,000円" },
      campaign: "キャンペーン適用で 0円",
    },
    taxNote: "表示はすべて税込価格です。",
    // AUN3 #1: 「2026年6月時点」「自社調べアンケート」の2件を削除。
    // 残りが ※3 始まりになると本文のマーカーと合わなくなるため、番号を繰り上げている。
    notes: [
      "※1 ピラティス4プラン（税込 月額9,878円）を30日換算した場合の、1日1回あたりの目安価格です。",
      "※2 受け放題の「プレミアムプラン」は月額会費 税込13,178円です。",
      "※ 別途、月額880円（税込）の施設維持費がかかります。金額は店舗により異なります。",
    ],
  },

  benefits: {
    heading: "期間中のご入会特典",
    monthly: [
      { tag: "初月", label: "月額会費", value: "0円", note: "（税込）" },
      { tag: "翌月", label: "月額会費", value: "50%OFF" },
    ],
    subHeading: "さらに、体験当日のご入会で",
    items: [
      { title: "入会金 0円", body: "通常かかる入会金が0円（税込）に。" },
      { title: "事務手数料 0円", body: "初期費用をぐっと抑えてスタートできます。" },
      {
        title: "ピラティスハンドブック（PDF）",
        body: "完全初心者向けに、言葉の意味や基本の動きをまとめた極意書をプレゼント。",
      },
      { title: "入会後もずーっと手ぶらOK", body: "無料レンタルウェアで、入会後も手ぶらのまま通えます。" },
    ],
    notes: [
      "※キャンペーンでのご入会は、入会から12ヶ月間の在籍が条件となります。",
      "※キャンペーンでご入会された方でも、解約金22,000円（税込）をお支払いいただくことで即時解約可能です。",
      "※ご契約時にキャンペーンを適用せずにご入会された場合は、在籍条件の縛りなくご利用いただけます。",
      "※人数制限のあるキャンペーンの場合、ご入会人数が上限に達した時点で期限前に終了することがございます。",
      "※対象店舗にて、体験・見学当日のご契約が必要です。",
      "※店舗によっては別途施設維持費がかかります。詳しくは店舗までお問い合わせください。",
      "※本キャンペーンを適用した場合、12ヶ月間の総額は103,719円（税込）〜となります。総額はプランによって異なります。",
      "※キャンペーン適用後の月額会費はプランによって異なります。詳しくは本ページ下部のQ&Aをご確認ください。",
      "※2026年9月1日〜9月30日の期間中に新規ご入会の方が対象です。",
    ],
  },

  facility: {
    heading: "設備のご案内",
    img: { placeholder: "レンタルウェア / 更衣室の写真", src: `${ASSET}/wear.jpg` },
    body: "必要なものはスタジオにそろっています。仕事帰りでも買い物のついででも、思い立ったその足で立ち寄れる環境を整えました。",
    checks: [
      "無料レンタルウェア（上下）",
      "専用マシン「リフォーマー」9台",
      "動きを確認できる天井ミラー",
      "施錠できる更衣室・パウダースペース",
      "会員限定のよもぎ蒸しルーム",
    ],
  },

  flow: {
    heading: "体験レッスンの流れ",
    steps: [
      { title: "ご予約", body: "予約ページで空き状況を確認し、ご希望の日時をお選びください。" },
      { title: "ご来店", body: "レッスン開始の10分前を目安にお越しください。手ぶらで大丈夫です。" },
      { title: "お着替え", body: "無料レンタルウェアにお着替えいただきます。" },
      { title: "カウンセリング", body: "気になる部分やご不安な点を、スタッフがお伺いします。" },
      { title: "レッスン体験", body: "お手本動画とスタッフのサポートで、実際のレッスン枠を体験いただきます。" },
      { title: "ご案内・ご検討", body: "プランをご案内します。その場でお決めいただく必要はありません。" },
    ],
  },

  beginner: {
    heading: "初めてでも大丈夫です",
    body: "ご来店されるお客様のほとんどが、ピラティス未経験からのスタートです。体の硬さや運動経験は問いません。まずは一度、体を動かす心地よさを試してみてください。",
    checks: [
      "運動経験ゼロでOK",
      "体が硬くても大丈夫",
      "手ぶらで来店OK",
      "女性専用で安心",
      "しつこい勧誘なし",
    ],
  },

  access: {
    heading: "店舗情報",
    img: { placeholder: "店舗外観 / エントランスの写真", src: `${ASSET}/entrance.webp` },
    name: "ソエルスタジオ戸越銀座店",
    address: "〒142-0051 東京都品川区平塚1丁目9-1 グローバル戸越銀座ビル 5F",
    hours: "24時間",
    closed: "年中無休（年末年始を除く）",
    routes: ["東急池上線 戸越銀座駅より徒歩30秒", "都営浅草線 戸越駅より徒歩2分"],
    mapUrl: "https://maps.google.com/?q=東京都品川区平塚1-9-1+グローバル戸越銀座ビル5F",
    mapEmbed:
      "https://maps.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E5%93%81%E5%B7%9D%E5%8C%BA%E5%B9%B3%E5%A1%9A1-9-1&output=embed",
  },

  faq: {
    heading: "よくあるご質問",
    items: [
      {
        q: "ピラティスが初めてでも参加できますか？",
        a: "はい。ご来店されるお客様のほとんどが未経験からのスタートです。お手本動画とスタッフのサポートがあるので、運動が苦手な方でも安心してご参加いただけます。",
      },
      {
        q: "体験当日は何を持っていけばよいですか？",
        a: "無料レンタルウェアをご用意しているので、手ぶらでお越しいただけます。お化粧直しの道具など、必要なものだけお持ちください。",
      },
      {
        q: "体験レッスンは本当に無料ですか？",
        a: "9月30日までに体験をご予約いただいた、初めての方は0円（税込）です。当日に追加でお支払いいただく費用はございません。",
      },
      {
        q: "その場で入会を決める必要はありますか？",
        a: "ございません。ご自宅でゆっくりご検討いただけます。しつこい勧誘はいたしませんのでご安心ください。",
      },
    ],
  },

  closing: {
    heading: "まずは一度、\n体の変化を試してみませんか。",
    lead: "9月30日までにご予約いただいた方限定の特典です。\nご予約はスマホから1分で完了します。",
    chips: ["体験レッスン0円", "初月月会費0円", "入会金・事務手数料0円", "翌月会費50%OFF"],
    label: "体験レッスン",
    listPrice: "3,300円",
    freeText: "0円",
  },

  cta: {
    text: "無料体験を予約する",
    note: "初回体験 完全無料｜入会金0円｜しつこい勧誘はいたしません。",
    /** CTA②〜④に出す無料体験の適用条件。予約セクションの notes と同文。 */
    trialNote: "※体験レッスンが無料となるのは、初めてご予約された方に限ります。",
  },

  sticky: { label: "体験レッスン", value: "無料", buttonText: "無料体験を予約する" },
};

export default config;
