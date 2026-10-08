import type { ClientStatus } from "@shared/index";
import type { LPFormField } from "@/components/LPForm";

const ASSET = "/clients/ism-azabujuban";

/** An image position in the layout. `src` empty → placeholder box. */
export interface Slot {
  placeholder: string;
  src?: string | null;
  position?: string;
}

export interface IsmConfig {
  slug: string;
  status?: ClientStatus;
  meta: { title: string; description: string; ogpImage?: string };

  header: {
    logo: string;
    brand: string;
    access: { station: string; walk: string }[];
  };

  /** ヘッダー直下のオファー帯 */
  offerBar: { text: string; sub: string };

  fv: {
    catchTop: string;
    catchLines: [string, string];
    lead: string;
    hero: Slot;
    trial: { label: string; sub: string; was: string; price: string; unit: string };
    hook: { label: string; text: string };
    tags: string[];
    notes: string[];
    ctaText: string;
  };

  /** 運営スクールの実績 */
  stats: {
    heading: string;
    items: { pre: string; num: string; unit: string; post: string }[];
    media: string;
    notes: string[];
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
    was: string;
    headingHighlight: string;
    lead: string;
    items: { icon: string; title: string; body: string }[];
    photos: [Slot, Slot];
    notes: string[];
    ctaText: string;
  };

  /** 体験当日入会の特典 */
  campaign: {
    ribbonEn: string;
    ribbonJa: string;
    heading: string;
    entry: { label: string; was: string; now: string; off: string };
    plansHeading: string;
    plans: { name: string; was: string; now: string; recommend?: boolean }[];
    perLesson: { label: string; formula: string; price: string; unit: string };
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
    focusHeading: string;
    focus: { rank: string; title: string; area: string }[];
    points: { icon: string; label: string; desc: string }[];
    note: string;
  };

  /** 代表メッセージ */
  message: {
    eyebrow: string;
    quote: string;
    body: string;
    name: string;
    titles: string[];
    license: string;
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
    items: { num: string; img: Slot; title: string; body: string; note?: string }[];
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
    steps: { num: string; time: string; title: string; body: string }[];
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
      routes: string[];
    };
  };

  form: {
    heading: string;
    lead: string;
    fields: LPFormField[];
    submitLabel: string;
    microcopy: string;
    disclaimer: string;
    errorMessage: string;
  };

  sticky: {
    offers: { label: string; value: string }[];
    buttonText: string;
    anchor: string;
  };

  footer: { lines: string[] };
}

const config: IsmConfig = {
  slug: "ism-azabujuban",
  status: "draft",
  meta: {
    title: "Pilates isM 麻布十番店｜韓国式パーソナルマシンピラティス 50分体験0円",
    description:
      "麻布十番駅徒歩3分。完全個室・完全マンツーマンの韓国式パーソナルマシンピラティス。くびれ・ヒップアップ・美脚・美姿勢を目指す方へ。50分体験レッスン0円、男性も歓迎、ウェア・タオルのレンタルで手ぶらOK。",
  },

  header: {
    logo: `${ASSET}/logo.png`,
    brand: "Pilates isM 麻布十番店",
    access: [
      { station: "麻布十番駅", walk: "徒歩3分" },
      { station: "赤羽橋駅", walk: "徒歩11分" },
    ],
  },

  offerBar: {
    text: "＼ 50分体験レッスン 0円 実施中 ／",
    sub: "体験当日のご入会で 入会金50%OFF＋初月料金割引",
  },

  fv: {
    catchTop: "麻布十番駅 徒歩3分｜完全個室マンツーマン",
    catchLines: ["くびれ・美尻・美脚へ導く", "韓国式マシンピラティス"],
    lead: "一人ひとりの骨格とお悩みに合わせて、\n強めのスプリングで効率よくボディメイク。",
    hero: { placeholder: "マシンピラティスのレッスン写真（全面）", src: `${ASSET}/hero.jpg`, position: "center 40%" },
    trial: {
      label: "50分体験レッスン",
      sub: "姿勢分析つき",
      was: "通常5,000円",
      price: "0",
      unit: "円",
    },
    hook: {
      label: "会員特典",
      text: "オンラインレッスンが最大月12回。\nご自宅でも美習慣を続けられます。",
    },
    tags: ["完全個室", "マンツーマン", "男性も歓迎"],
    notes: [
      "※体験レッスン0円は初めての方が対象です。",
      "※オンラインレッスン特典は月4回・月8回プランの会員さまが対象です。",
    ],
    ctaText: "無料体験を予約する",
  },

  stats: {
    heading: "ピラティス指導のプロ集団が運営",
    items: [
      { pre: "インストラクター輩出", num: "5,000", unit: "名", post: "以上" },
      { pre: "著書『ちょこっとピラティス』", num: "1", unit: "位", post: "獲得" },
    ],
    media: "『anan』『Tarzan』『Poco'ce』など メディア掲載多数",
    notes: [
      "※運営会社（株式会社MAJOLI）が運営するピラティスインストラクター養成スクールの累計実績です。",
      "※著書の順位はAmazonランキングでの獲得実績です。",
    ],
  },

  worry: {
    heading: "こんなお悩み、ありませんか？",
    items: [
      "運動が苦手・体が硬くて、ついていけるか不安",
      "ピラティスに通ったけれど、変化を実感できなかった",
      "くびれ・ヒップアップ・美脚など、ボディラインを整えたい",
      "猫背・反り腰・巻き肩など、姿勢のクセが気になる",
      "男性でも気兼ねなく通える、本格パーソナルを探している",
      "自己流のケアでは変わらず、プロに一から教わりたい",
    ],
    closingPre: "そのお悩み、",
    closingHighlight: "韓国式パーソナルピラティスで。",
  },

  trial: {
    eyebrow: "TRIAL LESSON",
    headingPre: "50分体験レッスンが",
    was: "通常5,000円",
    headingHighlight: "0円",
    lead: "姿勢分析からマシンピラティス、\nビフォーアフターの確認まで。\nパーソナルのレッスンをそのまま体験できます。",
    items: [
      {
        icon: "camera",
        title: "カウンセリング・姿勢分析",
        body: "お悩みや理想のゴールをうかがい、写真撮影で正面・横・後ろの13項目をチェック。体の歪みや課題を見える化します。",
      },
      {
        icon: "reformer",
        title: "韓国式マシンピラティス",
        body: "リフォーマーを使い、お悩みに合わせたメニューでレッスン。途中で立ち姿勢や足の感覚の変化も体感いただけます。",
      },
      {
        icon: "chart",
        title: "ビフォーアフター＆プランのご提案",
        body: "グリッド線つきの比較写真で変化と課題を共有し、目標に合わせた通い方をご提案します。",
      },
    ],
    photos: [
      { placeholder: "体験レッスンのシーン写真", src: `${ASSET}/trial-1.jpg` },
      { placeholder: "インストラクターの指導シーン写真", src: `${ASSET}/trial-2.jpg` },
    ],
    notes: ["※体験レッスン0円は初めての方が対象です。"],
    ctaText: "無料体験を予約する",
  },

  campaign: {
    ribbonEn: "Special Offer",
    ribbonJa: "体験当日のご入会限定特典",
    heading: "体験したその日のご入会で\n初月がおトクに",
    entry: { label: "入会金", was: "15,000円", now: "7,500円", off: "50%OFF" },
    plansHeading: "初月の月額料金も割引",
    plans: [
      { name: "月2回プラン", was: "18,000円", now: "14,400円" },
      { name: "月4回プラン", was: "30,000円", now: "26,000円", recommend: true },
      { name: "月8回プラン", was: "57,000円", now: "50,000円" },
    ],
    perLesson: {
      label: "月4回プランなら",
      formula: "スタジオ4回＋オンライン最大12回＝月16回",
      price: "1,875",
      unit: "円",
    },
    benefitsHeading: "さらに、会員さまはずっと",
    benefits: [
      {
        icon: "online",
        title: "オンラインレッスン 最大月12回",
        body: "月4回・月8回プランの特典。ご自宅でもレッスンを受けて、美習慣をキープできます。",
      },
      {
        icon: "line",
        title: "公式LINEでのフォロー",
        body: "レッスン後のフィードバックや次回のご提案を、公式LINEで丁寧にお届けします。",
      },
      {
        icon: "hanger",
        title: "ウェア・タオルのレンタルあり",
        body: "手ぶらで通えるから、お仕事帰りやお出かけのついでにも気軽に。",
      },
    ],
    notes: [
      "※体験当日にご入会いただいた方限定の特典です。",
      "※最低契約期間は3ヶ月です。",
      "※割引価格の適用は初月のみです。2ヶ月目以降は通常料金となります。",
      "※オンラインレッスン特典は月4回・月8回プランのみ対象です。",
      "※1回あたり1,875円は、月4回プラン（30,000円）のスタジオレッスン4回と、特典のオンラインレッスン最大12回を合わせた月16回で算出した、オンラインレッスンを含む価格です。",
      "※プラン料金は税込です。",
    ],
    ctaText: "無料体験を予約する",
  },

  method1: {
    eyebrow: "METHOD",
    heading: "結果につながる\n韓国式マシンピラティス",
    img: { placeholder: "リフォーマーでのレッスン写真", src: `${ASSET}/lesson-strap.jpg` },
    body: "韓国式は「くびれ・美脚・ヒップアップ」といった、目に見えるボディメイクにフォーカスしたマシンピラティス。一般的なものより約2倍強いスプリングの重さ・圧を使い、一人ひとりの骨格やレベルに合わせて負荷を細かく調整。体幹を鍛え、姿勢を整えながら、しなやかで引き締まったボディラインへ効率よく導きます。",
    focusHeading: "ご相談の多いお悩み TOP3",
    focus: [
      { rank: "1", title: "くびれ", area: "ウエスト・お腹" },
      { rank: "2", title: "ヒップアップ", area: "お尻・骨盤まわり" },
      { rank: "3", title: "美脚", area: "脚のライン・O脚X脚" },
    ],
    points: [
      {
        icon: "spring",
        label: "約2倍の強いスプリング",
        desc: "しっかりした負荷で、経験者には違いが分かり、初心者・体が硬い方も変化につながります。",
      },
      {
        icon: "list",
        label: "10種類以上の目的別プログラム",
        desc: "姿勢改善・くびれ・ヒップアップ・美脚・背中美化など、お悩みに合わせて種目を厳選・調整します。",
      },
      {
        icon: "medical",
        label: "理学療法士監修のアプローチ",
        desc: "解剖学に基づいたプログラムで、体の使い方から丁寧に整えていきます。",
      },
    ],
    note: "※スプリングの強さは一般的なリフォーマーとの比較です（当社調べ）。※効果には個人差があります。",
  },

  message: {
    eyebrow: "MESSAGE",
    quote: "美しさは、正義。",
    body: "体だけでなく、心も整う特別な空間で、ご自身が本当に望む「理想の美しさ」を手に入れてほしい。心も体も美しくなれるよう、私たちが全力でお手伝いします。",
    name: "横幕 真理",
    titles: ["株式会社MAJOLI 代表取締役", "一般社団法人国際ピラティス協会 代表理事"],
    license: "ネバダ州立大学公認 DKピラティス指導者（マット／リフォーマー／キャデラック／チェアー）",
  },

  method2: {
    eyebrow: "ONLINE",
    heading: "スタジオの外でも、\n美習慣がつづく",
    img: { placeholder: "ストレッチ種目のレッスン写真", src: `${ASSET}/online.jpg` },
    body: "月4回・月8回プランの会員さまは、オンラインレッスンを最大月12回受講可能。スタジオでのレッスンの合間も、ご自宅で体を動かす習慣をつくれるから、変化を実感しやすく、続けやすい。",
    badge: "会員特典 最大月12回",
    note: "※月4回・月8回プランの会員さまが対象です。",
  },

  tebura: {
    heading: "手ぶらで、\nふらっと通える。",
    body: "ウェア・タオルのレンタルをご用意。荷物を持ち歩かなくていいから、毎日の予定にすっと組み込めます。",
    scenes: ["お仕事帰りに", "お出かけついでに", "自分時間に"],
    img: { placeholder: "スタジオ内観の写真", src: `${ASSET}/studio-tools.jpg` },
  },

  reasons: {
    heading: "Pilates isM 麻布十番店が\n選ばれる5つの理由",
    items: [
      {
        num: "01",
        img: { placeholder: "リフォーマーのスプリング写真", src: `${ASSET}/reformer-spring.jpg` },
        title: "強めのスプリングで\n変化を実感しやすい",
        body: "一般的なものより約2倍強いスプリングの重さ・圧を使用。ピラティス経験者には違いが分かり、初心者や体が硬い方も、負荷の微調整で結果につなげられます。",
        note: "※スプリングの強さは一般的なリフォーマーとの比較です（当社調べ）。",
      },
      {
        num: "02",
        img: { placeholder: "完全個室のスタジオ写真", src: `${ASSET}/private-room.jpg` },
        title: "完全個室×完全マンツーマンの\nプライベート空間",
        body: "1部屋にリフォーマー1台の完全個室。まわりの目を気にせず、インストラクターと1対1でレッスンに集中できます。",
      },
      {
        num: "03",
        img: { placeholder: "姿勢チェック・指導シーンの写真", src: `${ASSET}/lesson-bridge.jpg` },
        title: "姿勢分析にもとづく\nオーダーメイドのレッスン",
        body: "13項目のアライメントチェックとお悩みをもとに、10種類以上の目的別プログラムから最適な種目を厳選。体験直後のビフォーアフター写真で、変化を目で確かめられます。",
      },
      {
        num: "04",
        img: { placeholder: "男性のレッスンシーン写真", src: `${ASSET}/men.jpg` },
        title: "男性のお客さまも\n大歓迎",
        body: "体幹強化や姿勢改善を目指す男性にもご好評いただいています。完全個室だから、男性も気兼ねなく本格的なパーソナルピラティスを始められます。",
      },
      {
        num: "05",
        img: { placeholder: "レッスンシーンの写真", src: `${ASSET}/lesson-ring.jpg` },
        title: "手ぶら＆オンライン特典で\n続けやすい",
        body: "ウェア・タオルのレンタルで手ぶら通いOK。月4回・月8回プランはオンラインレッスンが最大月12回つき、公式LINEでのフォローもあるから、無理なく習慣にできます。",
      },
    ],
    ctaText: "無料体験を予約する",
    ctaSub: "50分体験レッスン 通常5,000円 → 0円",
  },

  voices: {
    heading: "お客様の声",
    items: [
      {
        meta: "脚のライン",
        worry: "脚のラインが気になっていた",
        comment: "丁寧なパーソナル指導で脚のラインが整い、憧れだったスキニーを美しく着こなせるようになりました！",
      },
      {
        meta: "姿勢改善",
        worry: "デスクワークで背中が丸まっていた",
        comment: "デスクワークの丸まりが改善され、背すじが伸びて立ち姿を褒められるようになりました。",
      },
      {
        meta: "産後のボディラインケア",
        worry: "産後のウエストまわりが気になっていた",
        comment: "骨盤の歪みを整えることでウエストまわりがスッキリし、元の服が自信を持って着られるようになりました。",
      },
    ],
    chipsHeading: "ご入会の決め手として多い声",
    chips: ["体験直後のビフォーアフターで変化が見えた", "自分に合わせたオーダーメイドのレッスン", "養成スクール運営の安心感"],
    notes: ["※個人の感想です。効果効能を保証するものではありません。", "※効果には個人差があります。"],
  },

  flow: {
    heading: "50分体験レッスンの流れ",
    steps: [
      {
        num: "1",
        time: "約9分",
        title: "カウンセリング",
        body: "お悩み、理想のゴール、どのくらいの期間で変わりたいかをうかがいます。",
      },
      {
        num: "2",
        time: "約2分",
        title: "アライメントチェック",
        body: "写真を撮影し、正面・横・後ろの13項目をチェック。歪みや課題を特定します。",
      },
      {
        num: "3",
        time: "約30分",
        title: "マシンピラティスレッスン",
        body: "リフォーマーを使い、お悩みに合わせたメニューを実施。途中で立ち姿勢や足の感覚の変化も体感いただけます。",
      },
      {
        num: "4",
        time: "約9分",
        title: "ビフォーアフター確認・プランのご提案",
        body: "グリッド線つきの比較写真で変化と課題を共有し、目標に合った通い方をご提案します。",
      },
    ],
    note: "※ウェア・タオルはレンタルがございますので、手ぶらでお越しいただけます。",
  },

  faq: {
    heading: "よくあるご質問",
    items: [
      {
        q: "運動が苦手・体が硬くても大丈夫？",
        a: "はい、ご安心ください。完全マンツーマンのレッスンなので、一人ひとりの骨格やレベルに合わせて負荷や種目を調整します。体が硬い方や運動が苦手な方でも、無理なく取り組めます。",
      },
      {
        q: "ほかのピラティスと何が違うの？",
        a: "韓国式は「くびれ・美脚・ヒップアップ」といった、目に見えるボディメイクにフォーカスしているのが特徴です。一般的なものより約2倍強いスプリングを使い、理学療法士監修の10種類以上の目的別プログラムから、お悩みに合わせた種目を厳選してご提供します。",
      },
      {
        q: "男性も通えますか？",
        a: "はい、男性のお客さまも大歓迎です。完全個室のプライベート空間なので、まわりを気にせずレッスンに集中していただけます。",
      },
      {
        q: "持ち物は必要ですか？",
        a: "ウェア・タオルのレンタルがございますので、手ぶらでお越しいただけます。",
      },
      {
        q: "妊娠中・産後でも受けられますか？",
        a: "ご妊娠中・産後ともに、安定期に入っていて、主治医の許可（同意）を得ていることが受講の条件となります。子育て中のお客さまも多く、ご自分の時間をつくって通われています。",
      },
      {
        q: "料金プランを教えてください。",
        a: "入会金15,000円、月額は月2回プラン18,000円・月4回プラン30,000円・月8回プラン57,000円（税込）です。都度払いは1回15,000円です。月4回・月8回プランの会員さまは、オンラインレッスンを最大月12回ご受講いただけます。体験当日のご入会で、入会金50%OFFと初月の月額料金割引が適用されます（最低契約期間3ヶ月・割引は初月のみ）。",
      },
    ],
  },

  access: {
    heading: "スタジオのご案内",
    store: {
      img: { placeholder: "スタジオ内観の写真", src: `${ASSET}/studio.jpg` },
      name: "Pilates isM 麻布十番店",
      address: "〒106-0045 東京都港区麻布十番2丁目16-11 麻布十番2Aビル",
      hours: "営業時間 8:00〜21:00",
      holiday: "定休日 不定休",
      routes: [
        "東京メトロ南北線・都営大江戸線「麻布十番駅」徒歩3分",
        "都営大江戸線「赤羽橋駅」徒歩11分",
      ],
    },
  },

  form: {
    heading: "無料体験のご予約",
    lead: "下記フォームからお気軽にお申し込みください。\n担当より順次ご連絡いたします。",
    fields: [
      { type: "text", name: "name", label: "お名前", required: true, placeholder: "山田 花子" },
      { type: "tel", name: "tel", label: "電話番号", required: true, placeholder: "090-0000-0000" },
      { type: "email", name: "email", label: "メールアドレス", optionalTag: "任意", placeholder: "example@mail.com" },
      {
        type: "toggle",
        name: "gender",
        label: "性別",
        optionalTag: "任意",
        options: [
          { value: "女性", label: "女性" },
          { value: "男性", label: "男性" },
        ],
        columns: 2,
      },
      { type: "date", name: "date1", label: "ご希望日（第1希望）", required: true },
      { type: "date", name: "date2", label: "ご希望日（第2希望）", optionalTag: "任意" },
      {
        type: "toggle",
        name: "time",
        label: "ご希望の時間帯",
        optionalTag: "任意",
        options: [
          { value: "8:00〜12:00", label: "午前" },
          { value: "12:00〜17:00", label: "午後" },
          { value: "17:00〜21:00", label: "夕方以降" },
        ],
        columns: 3,
      },
      {
        type: "checkboxGroup",
        name: "concerns",
        label: "気になるお悩み",
        optionalTag: "複数選択可",
        options: [
          { value: "くびれ", label: "くびれ" },
          { value: "ヒップアップ", label: "ヒップアップ" },
          { value: "美脚", label: "美脚" },
          { value: "姿勢改善", label: "姿勢改善" },
          { value: "肩こり・巻き肩", label: "肩こり・巻き肩" },
          { value: "産後のケア", label: "産後のケア" },
        ],
        columns: 2,
      },
      {
        type: "textarea",
        name: "note",
        label: "ご質問・ご要望",
        optionalTag: "任意",
        placeholder: "ご希望の時間やご質問など、お気軽にどうぞ。",
        rows: 4,
      },
    ],
    submitLabel: "この内容で予約する",
    microcopy: "50分体験レッスン 通常5,000円 → 0円",
    disclaimer: "ご入力いただいた内容は、ご予約の対応にのみ利用します。",
    errorMessage: "お名前・電話番号・ご希望日は必須項目です。",
  },

  sticky: {
    offers: [
      { label: "50分体験", value: "¥0" },
      { label: "入会金", value: "50%OFF" },
    ],
    buttonText: "無料体験を予約する",
    anchor: "#form",
  },

  footer: {
    lines: [
      "Pilates isM 麻布十番店",
      "〒106-0045 東京都港区麻布十番2丁目16-11 麻布十番2Aビル",
      "営業時間 8:00〜21:00｜不定休",
    ],
  },
};

export default config;
