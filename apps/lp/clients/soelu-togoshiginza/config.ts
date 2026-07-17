import type { ClientStatus } from "@shared/index";

const ASSET = "/clients/soelu-togoshiginza";

/** 予約ウィジェット（SOELUマイページ）。全CTAの共通遷移先。 */
const CTA_URL = "https://mypage.soelu.com/widgets/3?isShowProgramName=true&studioId=88";

/** An image position in the layout. `src` empty → placeholder box. */
export interface Slot {
  placeholder: string;
  src?: string | null;
  position?: string;
}

export interface SoeluConfig {
  slug: string;
  status?: ClientStatus;
  /** 予約ウィジェット等、全CTAの共通遷移先URL。 */
  ctaUrl: string;
  meta: { title: string; description: string; ogpImage?: string };

  header: {
    brand: string;
    brandSub: string;
    access: { station: string; walk: string }[];
  };

  /** 1周年キャンペーンの帯（ヘッダー直下） */
  offerBar: { text: string; sub: string };

  fv: {
    anniversaryBadge: { small: string; big: string; en: string };
    catchTop: string;
    catchLines: [string, string];
    hero: Slot;
    trial: { label: string; time: string; price: string; unit: string; priceNote: string };
    yomogiBadge: { label: string; text: string };
    tags: string[];
    /** 必須注釈（無料体験・受け放題まわり） */
    notes: string[];
    ctaText: string;
  };

  stats: {
    items: { pre: string; num: string; unit: string; post: string; note: string }[];
  };

  worry: {
    heading: string;
    items: string[];
    closingPre: string;
    closingHighlight: string;
  };

  trial: {
    eyebrow: string;
    headingPre: string;
    headingHighlight: string;
    lead: string;
    items: { icon: string; title: string; body: string }[];
    photos: [Slot, Slot];
    notes: string[];
    ctaText: string;
  };

  campaign: {
    ribbonEn: string;
    ribbonJa: string;
    heading: string;
    period: string;
    periodNote: string;
    mains: { label: string; value: string; suffix: string }[];
    benefitsHeading: string;
    benefits: { icon: string; title: string; body: string }[];
    notes: string[];
    ctaText: string;
  };

  method1: {
    eyebrow: string;
    heading: string;
    img: Slot;
    body: string;
    points: { icon: string; label: string; desc: string }[];
    message: { title: string; body: string; from: string };
    /** スタッフ不在（完全無人）の必須注釈 */
    note: string;
  };

  method2: {
    eyebrow: string;
    heading: string;
    img: Slot;
    body: string;
    badge: string;
    note: string;
  };

  tebura: {
    heading: string;
    body: string;
    scenes: string[];
    img: Slot;
  };

  reasons: {
    heading: string;
    items: { num: string; img: Slot; title: string; body: string }[];
    ctaText: string;
    ctaSub: string;
  };

  voices: {
    heading: string;
    items: { meta: string; worry: string; comment: string }[];
    chipsHeading: string;
    chips: string[];
    notes: string[];
  };

  flow: {
    heading: string;
    steps: { num: string; title: string; body: string }[];
    note: string;
  };

  faq: { heading: string; items: { q: string; a: string }[] };

  access: {
    heading: string;
    store: {
      img: Slot;
      name: string;
      address: string;
      hours: string;
      holiday: string;
      route: string;
      lessonNote: string;
    };
  };

  /** 末尾の予約導線セクション（予約ウィジェットへの誘導CTA）。 */
  form: {
    heading: string;
    lead: string;
    ctaText: string;
    disclaimer: string;
  };

  sticky: {
    offers: { label: string; value: string }[];
    buttonText: string;
    anchor: string;
  };

  footer: { lines: string[] };
}

const config: SoeluConfig = {
  slug: "soelu-togoshiginza",
  status: "draft",
  ctaUrl: CTA_URL,
  meta: {
    title: "ソエル 戸越銀座｜女性専用マシンピラティス&よもぎ蒸し 体験レッスンいつでも0円",
    description:
      "戸越銀座駅徒歩30秒・戸越駅徒歩2分の女性専用マシンピラティススタジオ。45分体験レッスンはいつでも0円（税込）・手ぶらOK。会員はよもぎ蒸しも追加料金なし。朝6時〜夜24時まで年中無休。",
  },

  header: {
    brand: "ソエル 戸越銀座",
    brandSub: "女性専用マシンピラティス&よもぎ蒸し",
    access: [
      { station: "戸越銀座駅", walk: "徒歩30秒" },
      { station: "戸越駅", walk: "徒歩2分" },
    ],
  },

  offerBar: {
    text: "＼ おかげさまで1周年！特別感謝キャンペーン ／",
    sub: "2026年8月31日までの期間限定",
  },

  fv: {
    anniversaryBadge: { small: "祝", big: "1st", en: "ANNIVERSARY" },
    catchTop: "戸越銀座駅 徒歩30秒｜女性専用",
    catchLines: ["話題のマシンピラティスを", "手ぶらで、気軽に。"],
    hero: { placeholder: "スタジオ内観 / マシンピラティスの写真（全面）", src: null },
    trial: {
      label: "45分体験レッスン",
      time: "手ぶらでOK",
      price: "0",
      unit: "円",
      priceNote: "いつでも（税込）",
    },
    yomogiBadge: {
      label: "会員特典",
      text: "会員になると、あの「よもぎ蒸し」も\n追加料金なしで毎日利用OK！",
    },
    tags: ["女性専用", "初心者向け", "朝6時〜夜24時"],
    notes: [
      "※体験レッスンが無料となるのは初めて予約された方です。",
      "※よもぎ蒸しは体験レッスン対象外です。",
      "※プランによって受け放題の範囲や予約枠の上限数は異なります。",
      "※スタジオで開催されるレッスンプログラムは日毎・店舗毎で異なります。",
    ],
    ctaText: "無料体験を予約する",
  },

  stats: {
    items: [
      {
        pre: "全国",
        num: "100",
        unit: "店舗",
        post: "突破",
        note: "※2026年6月時点、全国14都道府県に展開",
      },
      {
        pre: "受講回数",
        num: "1,200",
        unit: "万回",
        post: "突破",
        note: "※2026年4月3日時点・オンラインレッスン予約数とスタジオ来店数の合算",
      },
    ],
  },

  worry: {
    heading: "こんな想い、ありませんか？",
    items: [
      "体を引き締めて、美ボディを目指したい",
      "姿勢のゆがみが気になってきた",
      "話題のピラティス、やってみたかった",
      "運動不足をそろそろ解消したい",
      "冷えを和らげたい、リフレッシュしたい",
      "家や駅から近い場所で、気軽に始めたい",
    ],
    closingPre: "その想い、",
    closingHighlight: "ソエル戸越銀座ではじめませんか？",
  },

  trial: {
    eyebrow: "TRIAL LESSON",
    headingPre: "45分体験レッスンは",
    headingHighlight: "いつでも0円",
    lead: "初めての方の体験レッスンは、いつでも0円（税込）。\n実際のレッスン枠に参加して、店舗の雰囲気をそのまま体験できます。",
    items: [
      {
        icon: "reformer",
        title: "実際のレッスン枠で体験",
        body: "マシン9台のうち2台が体験用の枠。ふだんのレッスンにそのまま参加するので、入会後のイメージがつかめます。",
      },
      {
        icon: "hanger",
        title: "手ぶら来店OK",
        body: "無料レンタルウェアをご用意。お仕事帰りやお買い物のついでに、そのままお越しいただけます。",
      },
      {
        icon: "staff",
        title: "スタッフがサポート",
        body: "カウンセリングから動きのサポート（アジャスト）、施設のご案内まで、スタッフが丁寧にお手伝いします。",
      },
    ],
    photos: [
      { placeholder: "体験レッスンのシーン写真", src: null },
      { placeholder: "リフォーマー / スタジオの写真", src: null },
    ],
    notes: [
      "※体験レッスンが無料となるのは初めて予約された方です。",
      "※よもぎ蒸しは会員限定メニューのため体験レッスン対象外です。体験はマシンピラティスのみとなります。",
    ],
    ctaText: "無料体験を予約する",
  },

  campaign: {
    ribbonEn: "1st Anniversary",
    ribbonJa: "祝・1周年記念特別キャンペーン",
    heading: "期間中の新規ご入会で\nうれしい特典",
    period: "2026年8月1日(土) 〜 8月31日(月)",
    periodNote: "期間中の新規入会者さま対象",
    mains: [
      { label: "初月", value: "月額会費 0円", suffix: "（税込）" },
      { label: "翌月", value: "月額会費 50%OFF", suffix: "" },
    ],
    benefitsHeading: "さらに、体験当日のご入会で",
    benefits: [
      { icon: "yen", title: "入会金 0円", body: "通常かかる入会金が0円（税込）に。" },
      { icon: "document", title: "事務手数料 0円", body: "初期費用をぐっと抑えてスタートできます。" },
      {
        icon: "book",
        title: "ピラティスハンドブック（PDF）",
        body: "完全初心者向けに、言葉の意味や基本の動きをまとめた極意書をプレゼント。",
      },
      {
        icon: "hanger",
        title: "入会後もずーっと手ぶらOK",
        body: "無料レンタルウェアで、入会後も手ぶらのまま通えます。",
      },
    ],
    notes: [
      "※キャンペーンでのご入会は入会から◯ヶ月間の在籍が条件となります。",
      "※対象店舗にて体験・見学当日のご契約が必要です。",
      "※店舗によっては別途施設維持費がかかります。詳しくはWEBページをご確認ください。",
      "※2026年8月1日〜8月31日の期間中に新規ご入会の方が対象です。",
    ],
    ctaText: "8/31までに無料体験を予約する",
  },

  method1: {
    eyebrow: "METHOD 01",
    heading: "動画×スタッフサポート型\nマシンピラティス",
    img: { placeholder: "大画面動画レッスン＋スタッフサポートの写真", src: null },
    body: "大画面モニターに映るプロインストラクターの分かりやすいお手本動画を見ながら、専用マシン「リフォーマー」で動いていきます。スタジオのスタッフが一人ひとりのフォームをチェックして直接お声がけ・サポート（アジャスト）するから、指導のブレがなく、初心者の方でも安心して取り組めます。",
    points: [
      { icon: "monitor", label: "プロ監修の動画レッスン", desc: "実績豊富なプロインストラクター陣が出演・監修。いつ受けてもブレのないクオリティ。" },
      { icon: "staff", label: "スタッフが直接サポート", desc: "常駐スタッフがフォームをチェックし、優しくアジャスト。" },
      { icon: "mirror", label: "天井ミラー完備", desc: "自分の動きを確認しながら進められる環境です。" },
    ],
    message: {
      title: "スタッフより",
      body: "「運動が苦手な方や初心者の方でも大丈夫です！映像と私たちの丁寧なサポートで、心地よく体を整えていきましょう！」",
      from: "動画レッスンはプロのピラティスインストラクターが監修しています。",
    },
    note: "※時間帯により、スタッフが不在（完全無人レッスン）の場合がございます。その際はスタッフによるアジャスト（お声がけや補助）はございませんので、予めご了承ください。",
  },

  method2: {
    eyebrow: "METHOD 02",
    heading: "本格よもぎ蒸しで、\nじんわり温まる温活タイム",
    img: { placeholder: "よもぎ蒸しルームの写真", src: null },
    body: "女性に人気の本格よもぎ蒸し設備を完備。ピラティスでしっかり体を動かして心地よく引き締めた後は、よもぎの蒸気でじんわり温まって、爽快なリフレッシュ、冷えを和らげるケア、心地よいリラックスタイムを。",
    badge: "会員は追加料金なしで利用OK",
    note: "※よもぎ蒸しは会員限定メニューです。体験レッスンでは利用できません。",
  },

  tebura: {
    heading: "ずーっと手ぶらで、\nサクッと通える。",
    body: "無料レンタルウェアがあるから、体験のときも、入会後もずっと手ぶらでOK。ウェアを持ち歩く面倒がないから、毎日の予定にすっと組み込めます。",
    scenes: ["出勤前に", "お買い物ついでに", "お仕事帰りに"],
    img: { placeholder: "レンタルウェア / 更衣室の写真", src: null },
  },

  reasons: {
    heading: "ソエル戸越銀座が\n選ばれる5つの理由",
    items: [
      {
        num: "01",
        img: { placeholder: "よもぎ蒸しの写真", src: null },
        title: "よもぎ蒸し×ピラティスの\n贅沢なトータルケア",
        body: "体を動かして引き締めた後は、よもぎ蒸しでじんわり温まってリラックス。運動と温活のトータルケアが、ひとつのスタジオで、ひとつの月額会費で楽しめます。",
      },
      {
        num: "02",
        img: { placeholder: "戸越銀座駅前 / 店舗外観の写真", src: null },
        title: "朝6時〜夜24時・年中無休の\n通いやすさ",
        body: "朝6:30から夜23:45の枠までレッスンがあるから、早朝も、お仕事帰りの遅い時間も、自分のタイミングで通えます。戸越銀座駅から徒歩30秒の駅近です。",
      },
      {
        num: "03",
        img: { placeholder: "動画レッスン受講シーンの写真", src: null },
        title: "プロの動画レッスン×\nスタッフサポートで安心",
        body: "レッスンはプロインストラクター監修の動画だから、インストラクターによる指導の差が出ません。さらに常駐スタッフがフォームを優しくサポートします。",
      },
      {
        num: "04",
        img: { placeholder: "スタジオ内観の写真", src: null },
        title: "女性専用のクリーンで\n洗練されたスタジオ空間",
        body: "会員さまは女性のみ。清潔感のある洗練された空間で、まわりを気にせずレッスンに集中できます。更衣室・天井ミラー・無料レンタルウェアを完備しています。",
      },
      {
        num: "05",
        img: { placeholder: "スマホ予約画面のイメージ写真", src: null },
        title: "予約もキャンセルも\nスマホで簡単",
        body: "レッスンの予約・キャンセルはスマホでいつでも完結。思い立ったときにサクッと予約できるから、忙しい毎日でも続けやすい仕組みです。",
      },
    ],
    ctaText: "無料体験を予約する",
    ctaSub: "45分体験レッスンいつでも0円（税込）",
  },

  voices: {
    heading: "お客様の声",
    items: [
      {
        meta: "30代女性",
        worry: "冷えや運動不足が気になっていた",
        comment:
          "ピラティスで体がすっきり軽くなり、その後のよもぎ蒸しでじんわり温まって気分爽快です！1箇所で両方ケアできるのが嬉しいです。",
      },
      {
        meta: "40代女性・ピラティス初心者",
        worry: "体型の崩れが気になっていた",
        comment:
          "動画が分かりやすく、スタッフさんが優しくフォームをサポートしてくれるので、しっかり引き締まっている実感が得られます。施設も綺麗で通うのが楽しいです。",
      },
    ],
    chipsHeading: "クチコミで多くいただく声",
    chips: ["施設が綺麗", "スタッフが親切で安心できる", "よもぎ蒸しが心地よい"],
    notes: [
      "※個人の感想です。効果効能を保証するものではありません。",
      "※効果には個人差があります。",
    ],
  },

  flow: {
    heading: "無料体験当日の流れ",
    steps: [
      {
        num: "1",
        title: "ご来店・お着替え",
        body: "手ぶらでご来店OK。無料レンタルウェアにお着替えいただきます。",
      },
      {
        num: "2",
        title: "カウンセリング・施設のご案内",
        body: "スタッフが目的やご不安をヒアリングし、スタジオ内をご案内します。",
      },
      {
        num: "3",
        title: "45分レッスン体験",
        body: "大画面のお手本動画とスタッフのサポート（アジャスト）で、実際のレッスン枠を体験していただきます。",
      },
    ],
    note: "※お着替えの服装は、裾がフィットしたものがおすすめです（事故防止のため）。",
  },

  faq: {
    heading: "よくあるご質問",
    items: [
      {
        q: "運動経験がなくても大丈夫？",
        a: "はい、ご安心ください。ソエル戸越銀座はピラティスを0から始める初心者の方が多数です。分かりやすいお手本動画に合わせて動き、スタッフがフォームをサポートするので、初めての方でも無理なく取り組めます。",
      },
      {
        q: "持ち物は必要？",
        a: "手ぶらでOKです。無料レンタルウェアをご用意していますので、お仕事帰りやお出かけのついでにそのままお越しください。服装は裾がフィットしたものがおすすめです（事故防止のため）。",
      },
      {
        q: "体験でよもぎ蒸しは利用できる？",
        a: "よもぎ蒸しは会員限定メニューのため、体験レッスンではご利用いただけません。体験はマシンピラティスのみとなります。ご入会後は追加料金なしでご利用いただけます。",
      },
      {
        q: "男性も通える？",
        a: "申し訳ございません。ソエル戸越銀座は女性専用スタジオです。女性のお客さまが安心して通える空間づくりをしています。",
      },
      {
        q: "予約の変更やキャンセルは？",
        a: "レッスンの予約・変更・キャンセルはスマホから簡単に行えます。その日の予定や体調に合わせて柔軟に調整できるので、忙しい方でも続けやすい仕組みです。",
      },
    ],
  },

  access: {
    heading: "店舗のご案内",
    store: {
      img: { placeholder: "店舗外観 / 内観の写真", src: null },
      name: "ソエル 戸越銀座",
      address: "〒142-0051 東京都品川区平塚1丁目9-1 グローバル戸越銀座ビル 5F",
      hours: "営業時間 6:00〜24:00",
      holiday: "定休日なし（年中無休）",
      route: "東急池上線 戸越銀座駅 徒歩30秒／都営浅草線 戸越駅 徒歩2分",
      lessonNote: "※レッスンは朝6:30〜夜23:45の枠まで開催しています。",
    },
  },

  form: {
    heading: "無料体験のご予約",
    lead: "予約ページで空き状況をご確認のうえ、ご希望の日時をお選びください。\n45分の体験レッスンはいつでも0円（税込）。手ぶらでお越しいただけます。",
    ctaText: "予約ページで空き枠を見る",
    disclaimer: "45分体験レッスンいつでも0円（税込）｜無理な勧誘はいたしません。",
  },

  sticky: {
    offers: [
      { label: "45分体験", value: "¥0" },
      { label: "入会金", value: "¥0" },
    ],
    buttonText: "無料体験を予約する",
    anchor: CTA_URL,
  },

  footer: {
    lines: [
      "ソエル 戸越銀座",
      "〒142-0051 東京都品川区平塚1丁目9-1 グローバル戸越銀座ビル 5F",
      "営業時間 6:00〜24:00｜定休日なし（年中無休）",
    ],
  },
};

export default config;
