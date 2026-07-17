import type { PatternAConfig } from "@/clients/pattern-a.types";

/**
 * KARADA整骨院（パターンA・仮想デモページ / demo01）。
 * 福岡市博多区板付の整骨院。既存の整骨院メニューに加え、新規事業として
 * マシンピラティスを導入したことを分かりやすく伝える構成。
 * 構成は the-personal-pilates / days-pilates と同一のパターンA。
 *
 * 公式サイト https://karada-seikotsu.jp/ の掲載情報をもとに作成。
 *
 * 実データ確定分（公式サイトに明記）:
 *   - 住所・電話・営業時間・定休日・駐車場・アクセス（トップページ／店舗紹介）。
 *   - マシンピラティス: 15分 ¥4,400、初回 ¥1,000、着替え不要、マンツーマン（施術メニューページ）。
 *   - 対応症状40種以上、土日営業、水曜・祝日定休（トップページ）。
 *   - 各種矯正メニュー 3,300円（猫背矯正・骨盤矯正・距骨矯正・HV電療・EMS）（料金表ページ）。
 *
 * 【要確認・公開前に顧客確認必須】このデモページで提案している項目:
 *   - offer.trialRegular / joinLabel の「0円」訴求は、マシンピラティス新規事業の
 *     集客キャンペーン案（パターンAの実績ある無料体験導線）として提示。
 *     実際の初回価格は公式サイトでは1,000円のため、実施の可否・金額は顧客確認が必要。
 *   - trainers.items（スタッフ個別プロフィール・写真・氏名）は公式サイトに情報がないため
 *     プレースホルダ。顧客素材受領後に差し替え。
 *   - 画像は全てプレースホルダ（src:null）。参照サイトの画像は流用していない。
 */
const config: PatternAConfig = {
  slug: "demo01",
  status: "draft",
  meta: {
    title: "KARADA整骨院｜福岡市博多区 板付の整骨院×マシンピラティス",
    description:
      "肩こり・腰痛・産後の骨盤矯正でおなじみのKARADA整骨院に、新しくマシンピラティスが登場。根本から治す整骨院の技術と、動いて整えるマシンピラティスで理想のカラダへ。土日営業・板付7丁目バス停徒歩5分・駐車場3台。",
    ogpImage: undefined,
  },
  // 公式サイトのロゴ・アクセントカラーに合わせた紺系のブルー。
  accent: "#24425F",
  showMonitorBadge: true,

  header: {
    brand: "KARADA整骨院",
    brandSub: "整骨院 × マシンピラティス｜土日営業",
    access: [{ station: "板付7丁目バス停", walk: "徒歩5分" }],
  },
  offerBar: {
    badgeLines: ["新規", "導入"],
    badgeFontSize: 15,
    badgeFontWeight: 400,
    badgeFontFamily: "mincho",
    text: "マシンピラティス新規導入記念キャンペーン",
  },
  achievement: { pre: "のべ", num: "40", post: "種以上の症状に対応する地域の整骨院" },

  fv: {
    catchLines: ["根本から治し、", "動けるカラダへ。"],
    hero: { placeholder: "施術シーン / マシンピラティスの写真（全面）", src: null },
    leftCard: { small: "根本から治す", big: "整骨院" },
    rightCard: { small: "動いて整える", big: "マシンピラティス" },
  },

  offer: {
    eyebrow: "整骨院 × マシンピラティス",
    heading: "15分のお試し体験",
    trialBadge: "マシンピラティスを体験",
    trialRegular: "4,400",
    items: [
      "事前\nカウンセリング",
      "姿勢・お悩み\nヒアリング",
      "マシン\nピラティス",
      "整骨院の\n施術ケア",
      "事後\nカウンセリング",
      "改善プラン\nご提案",
    ],
    photos: [
      { placeholder: "マシンピラティスのシーン写真", src: null },
      { placeholder: "リフォーマー / 院内設備の写真", src: null },
    ],
    joinLabel: "初回カウンセリング料",
    joinRegular: "3,300",
    regular: { prefix: "2回目以降 1回 ", amount: "4,400", suffix: "で通える" },
    ctaText: "無料体験を予約する",
  },

  about: {
    heading: "KARADA整骨院\nについて",
    photo: { placeholder: "院内 / スタッフの写真", src: null },
    caption: "Seikotsu × Pilates",
    lead: "「治す」その先へ、\n動けるカラダをつくる。",
    body:
      "肩こり、腰痛、産後の骨盤の歪み、自律神経の乱れ。KARADA整骨院は福岡市博多区板付で、痛みに対する根本的治療にこだわる整骨院です。この度、新たにマシンピラティスを導入。治療で整えた身体を、動きの中でも維持できるよう、無理のない運動習慣づくりをサポートします。土日も営業しているので、平日忙しい方も通いやすい環境です。",
  },

  worry: {
    heading: "こんなお悩み、ありませんか？",
    cards: [
      { img: { placeholder: "イメージ画像", src: null }, text: "肩こり・腰痛が\nなかなか良くならない" },
      { img: { placeholder: "イメージ画像", src: null }, text: "産後の骨盤の\nゆがみが気になる" },
      { img: { placeholder: "イメージ画像", src: null }, text: "猫背や反り腰など\n姿勢が気になる" },
      { img: { placeholder: "イメージ画像", src: null }, text: "運動したいけど\n続けられるか不安" },
    ],
    closingPre: "その不調、",
    closingHighlight: "根本から整えます。",
  },

  reasons: {
    heading: "選ばれる3つの理由",
    items: [
      {
        num: "01",
        img: { placeholder: "施術シーンの写真", src: null },
        title: "整骨院の技術力を活かした\n本気の治療",
        body:
          "ムチウチ、四十肩、坐骨神経痛、ヘルニア、脊柱管狭窄症など、対応可能な症状は40種以上。痛みに対する根本的治療を、一日でも早い回復を目指して全身全霊で行います。",
      },
      {
        num: "02",
        img: { placeholder: "マシンピラティス指導の写真", src: null },
        title: "新導入マシンピラティスで\n動けるカラダを維持",
        body:
          "「整える」から「動かして、本来持っている機能を回復させる」ボディワークへ。バネの力で優しく身体を支えるマシンを使うので、痛みが不安な方や運動が苦手な方でも安心です。",
        trio: [
          { label: "猫背矯正", desc: "崩れた姿勢を\n整える" },
          { label: "骨盤矯正", desc: "産後・日常の\nゆがみに" },
          { label: "マシンピラティス", desc: "動きながら\n体幹強化" },
        ],
      },
      {
        num: "03",
        img: { placeholder: "院外観 / 駐車場の写真", src: null },
        title: "土日も営業だから\n忙しくても通いやすい",
        body:
          "土日は9:00〜14:00で営業。板付7丁目バス停より徒歩5分、駐車場3台完備で、平日忙しい方や車での通院も安心です。",
      },
    ],
    ctaText: "無料体験を予約する",
    ctaSub: "15分体験｜初回カウンセリング料0円",
  },

  trainers: {
    heading: "スタッフ紹介",
    lead: "国家資格を持つスタッフが、\n一人ひとりの症状やお悩みに寄り添います。",
    swipeHint: "スワイプで移動",
    items: [
      {
        img: { placeholder: "スタッフの写真", src: null },
        role: "柔道整復師",
        name: "近日公開",
        nameEn: "Coming Soon",
        body: "整骨院での治療経験を活かし、丁寧なカウンセリングと施術を行います。プロフィールは近日公開予定です。（※顧客プロフィール受領後に差し替え）",
        tags: ["国家資格保有"],
      },
      {
        img: { placeholder: "スタッフの写真", src: null },
        role: "マシンピラティス担当",
        name: "近日公開",
        nameEn: "Coming Soon",
        body: "マンツーマンでマシンピラティスをサポート。運動が苦手な方にも寄り添って指導します。（※顧客プロフィール受領後に差し替え）",
        tags: ["マシンピラティス"],
      },
    ],
  },

  scenes: {
    heading: "あなたの毎日に寄り添う通い方",
    items: [
      {
        img: { placeholder: "施術シーンの写真", src: null },
        title: "「肩こり・腰痛を\nしっかり治したい」",
        body: "40種以上の症状に対応。痛みの原因から根本的に治療し、一日でも早い回復を目指します。",
      },
      {
        img: { placeholder: "産後ケアのシーン写真", src: null },
        title: "「産後の骨盤を\n整えたい」",
        body: "出産後に崩れやすい骨盤を、専門的な骨盤矯正でケア。無理のないペースで通えます。",
      },
      {
        img: { placeholder: "マシンピラティスのシーン写真", src: null },
        title: "「運動習慣を\n無理なく続けたい」",
        body: "マシンが身体を支えてくれるマシンピラティスなら、運動が苦手な方でも15分から始められます。",
      },
    ],
  },

  flow: {
    heading: "15分体験の流れ",
    steps: [
      {
        num: "1",
        title: "受付・カウンセリング",
        time: "約5分",
        body: "着替え不要。動きやすい服装のまま、気になる症状やお悩みをお伺いします。",
      },
      {
        num: "2",
        title: "マシンピラティス体験",
        time: "約15分",
        body: "スタッフとマンツーマンで、リフォーマーを使ったマシンピラティスを体験します。",
      },
      {
        num: "3",
        title: "事後カウンセリング・ご提案",
        time: "約10分",
        body: "体験を踏まえて、整骨院の治療と組み合わせた通い方をご提案。無理な勧誘はいたしません。",
      },
    ],
  },

  faq: {
    heading: "よくあるご質問",
    items: [
      {
        q: "運動が苦手でも大丈夫ですか?",
        a: "はい、ご安心ください。マシンが身体を支えてくれるので、運動経験のない方でも無理なく取り組めます。マンツーマンで一人ひとりに合わせてサポートします。",
      },
      {
        q: "整骨院の治療と一緒に受けられますか?",
        a: "はい。整骨院での治療とあわせてマシンピラティスを受けていただけます。根本治療と運動習慣づくりを両立できます。",
      },
      {
        q: "土日も予約できますか?",
        a: "土日は9:00〜14:00で営業しております。定休日は水曜・祝日です。お気軽にご予約ください。",
      },
      {
        q: "着替えは必要ですか?",
        a: "更衣室のご用意はございませんので、動きやすい服装でお越しください。手ぶらでお越しいただけます。",
      },
    ],
  },

  access: {
    heading: "院のご案内",
    stores: [
      {
        img: { placeholder: "院の外観 / 内観写真", src: null },
        name: "KARADA整骨院",
        address: "〒812-0888 福岡県福岡市博多区板付7丁目8-59",
        hours: "土日 9:00〜14:00営業",
        route: "（定休日 水曜・祝日）\n板付7丁目バス停 徒歩5分／駐車場3台完備",
      },
    ],
  },

  form: {
    heading: "無料体験のご予約",
    lead: "下記フォームからお気軽にお申し込みください。\n担当より24時間以内にご連絡いたします。",
    fields: [
      {
        type: "toggle",
        name: "menu",
        label: "ご希望のメニュー",
        required: true,
        columns: 1,
        options: [
          { value: "seikotsu", label: "整骨院の施術を相談したい" },
          { value: "pilates", label: "マシンピラティス体験を予約したい" },
          { value: "both", label: "両方相談したい" },
        ],
      },
      { type: "text", name: "name", label: "お名前", required: true, placeholder: "山田 花子" },
      { type: "tel", name: "tel", label: "電話番号", required: true, placeholder: "090-0000-0000" },
      { type: "email", name: "email", label: "メールアドレス", placeholder: "example@mail.com" },
      { type: "text", name: "date1", label: "ご希望日時(第1希望)", placeholder: "例)土曜午前、平日夜など" },
      { type: "text", name: "date2", label: "ご希望日時(第2希望)", placeholder: "例)日曜午後など" },
      {
        type: "textarea",
        name: "note",
        label: "ご質問・ご相談内容",
        optionalTag: "任意",
        placeholder: "気になる症状やお悩みなど、ご自由にお書きください。",
        rows: 4,
      },
    ],
    submitLabel: "この内容で予約する",
    disclaimer:
      "送信いただいた内容は予約対応のみに利用します。\n15分体験｜初回カウンセリング料0円｜しつこい勧誘はいたしません。",
    errorMessage: "ご希望のメニュー・お名前・電話番号は必須項目です。",
  },

  sticky: {
    offers: [
      { label: "マシンピラティス体験", value: "¥4,400" },
      { label: "初回カウンセリング料", value: "¥0" },
    ],
    buttonText: "無料体験を予約する",
    anchor: "#form",
  },
};

export default config;
