import type { PatternAConfig } from "@/clients/pattern-a.types";

/**
 * Training Studio ARCS（パーソナルジムARCS）— pattern A.
 *
 * 出典: 打ち合わせシート【アークス】+ 公式サイト https://arcs-trainingstudio.jp
 * ピラティス（美容整体×マシンピラティス）は牛久店・みらい平店限定のプログラムのため、
 * このLPはその2店舗に絞った訴求にしている（全5店舗のうち2店舗）。
 *
 * ★未確認・要ご確認（顧客確認が取れるまで status は draft のまま）
 *  - トレーナー2・3の氏名／経歴（ヒアリングは「女性・管理栄養士・トレーニング系」のみ）
 *  - 体験120分の各ステップの所要時間（合計120分になるよう仮置き）
 *  - キャンペーン実施期間が「〜2026年7月末」表記のため、8月以降の取り扱い
 *  - 全画像（公式サイトの画像は流用不可・顧客支給待ちのため src:null プレースホルダ）
 */
const config: PatternAConfig = {
  slug: "training-studio-arcs",
  status: "draft",
  meta: {
    title: "パーソナルジムARCS 牛久・みらい平｜美容整体×マシンピラティス体験1,980円",
    description:
      "厚生労働大臣認定の病院併設施設で10年の経験を持つトレーナーが在籍。整えてから鍛えるマシンピラティスで、姿勢改善からダイエットまで対応します。牛久店・みらい平店では120分フルセット体験を1,980円・入会金0円でご案内中。無料駐車場・キッズスペース完備。",
    ogpImage: undefined,
  },
  /*
   * 公式サイトのメインカラー（--o-r-colors-accent = #f08d1b）をそのまま採用。
   * page.tsx 側でこの1色から用途別の濃淡（文字用・白文字を乗せる面用）を導出している。
   */
  accent: "#F08D1B",
  showMonitorBadge: true,

  header: {
    brand: "TRAINING STUDIO ARCS",
    brandSub: "美容整体 × マシンピラティス",
    access: [
      { station: "牛久店", walk: "車6分" },
      { station: "みらい平店", walk: "徒歩7分" },
    ],
  },
  offerBar: {
    badgeLines: ["毎月", "5名限定"],
    text: "体験1,980円・入会金0円",
  },
  achievement: { pre: "茨城県内", num: "5", post: "店舗展開のパーソナルジムが運営" },

  fv: {
    catchLines: ["整えてから鍛える、", "ダイエットピラティス"],
    hero: { placeholder: "メインビジュアルの写真（全面）", src: null },
    leftCard: { small: "整える", big: "美容整体" },
    rightCard: { small: "鍛える", big: "マシンピラティス" },
  },

  offer: {
    eyebrow: "毎月5名様限定キャンペーン",
    heading: "120分のフルセット体験",
    trialBadge: "当日ご入会予約で体験料金 全額キャッシュバック",
    trialRegular: "5,500",
    trialNow: "1,980",
    items: [
      "カウン\nセリング",
      "姿勢確認・\n体組成測定",
      "美容整体\n体験",
      "マシン\nピラティス",
      "体験後\nフィードバック",
      "オリジナル\nメニュー提案",
    ],
    photos: [
      { placeholder: "マシンピラティスのレッスン風景", src: null },
      { placeholder: "スタジオ内観 / マシン設備", src: null },
    ],
    joinLabel: "入会金",
    joinRegular: "22,000",
    regular: { prefix: "1回 ", amount: "7,700", suffix: "から通える" },
    ctaText: "120分体験を予約する",
  },

  about: {
    heading: "TRAINING STUDIO ARCS\nについて",
    photo: { placeholder: "トレーナー / スタジオの写真", src: null },
    caption: "All Round Care Service",
    lead: "一人ひとりの異なるご要望に、\n最善のサービスを。",
    body: "ARCSは「All Round Care Service」を掲げるパーソナルジムです。代表は女性専用ジムを経て、厚生労働大臣認定の病院併設の健康増進施設で約10年間、現場責任者を務めました。ダイエットや生活習慣病の予防から機能改善まで携わった知見をもとに、痛くなってからではなく、痛くならない身体づくりをご提案します。",
  },

  worry: {
    heading: "こんなお悩み、ありませんか？",
    cards: [
      { img: { placeholder: "イメージ画像", src: null }, text: "ダイエットも姿勢改善も\n両方かなえたい" },
      { img: { placeholder: "イメージ画像", src: null }, text: "何から始めればいいか\n分からない" },
      { img: { placeholder: "イメージ画像", src: null }, text: "自己流ダイエットで\n失敗が続いている" },
      { img: { placeholder: "イメージ画像", src: null }, text: "運動不足のままの\n将来の健康が不安" },
    ],
    closingPre: "その願い、",
    closingHighlight: "ARCSなら叶います。",
  },

  reasons: {
    heading: "選ばれる3つの理由",
    items: [
      {
        num: "01",
        img: { placeholder: "トレーナーの指導風景", src: null },
        title: "国が認めた健康増進施設で\n10年間の現場責任者経験",
        body: "全国に350しかない厚生労働大臣認定の病院併設の健康増進施設で、10年間責任者を経験したトレーナーが在籍。ダイエットから生活習慣病の予防、機能改善まで、医学的な知見に基づいてサポートします。",
      },
      {
        num: "02",
        img: { placeholder: "3つのコースを表す写真", src: null },
        title: "目的とコンディションで\n選べる3つのコース",
        body: "「整えたい」「引き締めたい」「痩せたい」。目的に合わせてコースを組み合わせられるので、姿勢改善で終わらずダイエットまで対応できます。",
        trio: [
          { label: "ピラティス", desc: "正しいフォームで\n整えてから鍛える" },
          { label: "パーソナル", desc: "大きな筋肉を動かし\nボディメイク" },
          { label: "食事管理付", desc: "続けられる食習慣を\n個別に設計" },
        ],
      },
      {
        num: "03",
        img: { placeholder: "キッズスペース / 駐車場の写真", src: null },
        title: "毎回オリジナルメニュー\n通いやすさも妥協なし",
        body: "決まったメニューを当てはめるのではなく、その日のコンディションを確認して毎回オリジナルのメニューを作成。管理栄養士をはじめ多数の資格保有者が対応します。キッズスペースと無料駐車場を完備し、お子様連れでもお車でも通えます。",
      },
    ],
    ctaText: "120分体験を予約する",
    ctaSub: "120分フルセット体験1,980円｜入会金0円",
  },

  trainers: {
    heading: "トレーナー紹介",
    lead: "フィットネスから健康関連まで、多数の資格を持つトレーナーが在籍。\nお一人おひとりのお身体に合わせて担当いたします。",
    swipeHint: "スワイプで移動",
    items: [
      {
        img: { placeholder: "上坂代表の写真", src: null },
        role: "ARCS 代表 / インストラクター",
        name: "上坂 裕一",
        nameEn: "Yuichi Kamisaka",
        body: "女性専用パーソナルジムを経て、病院併設の健康増進施設に約10年間、現場責任者として従事。ダイエットや生活習慣病予防はもちろん、重度の疾患を持つ方の機能改善指導にも携わってきました。",
        tags: ["健康運動指導士", "JATI-AATI 上級トレーニング指導者", "フィットネスマネジメント技能士2級"],
      },
      {
        img: { placeholder: "女性トレーナーの写真", src: null },
        // TODO: 氏名・経歴が未提供。顧客確認後に差し替える。
        name: "スタッフ名（ご提供待ち）",
        role: "インストラクター / 管理栄養士",
        nameEn: "",
        body: "管理栄養士の資格を持つ女性トレーナーが在籍しています。トレーニングと食事の両面から、無理のない習慣づくりをサポートします。",
        tags: ["管理栄養士"],
      },
      {
        img: { placeholder: "トレーナーの写真", src: null },
        // TODO: 氏名・経歴が未提供。顧客確認後に差し替える。
        name: "スタッフ名（ご提供待ち）",
        role: "インストラクター",
        nameEn: "",
        body: "トレーニング指導を専門とするトレーナーが在籍しています。ボディメイクから運動習慣の定着まで、目的に合わせて担当いたします。",
        tags: ["加圧インストラクター"],
      },
    ],
  },

  scenes: {
    heading: "あなたの毎日に寄り添う通い方",
    items: [
      {
        img: { placeholder: "シーンの写真", src: null },
        title: "「子どもを預けずに通いたい」",
        body: "キッズスペースを完備。産後の身体づくりも、お子様連れのままレッスンを受けていただけます。",
      },
      {
        img: { placeholder: "シーンの写真", src: null },
        title: "「車で立ち寄って帰りたい」",
        body: "牛久店は店舗前に7台、みらい平店は店舗裏に10台の無料駐車場。大通り沿いで買い物のついでにも通えます。",
      },
      {
        img: { placeholder: "シーンの写真", src: null },
        title: "「仕事帰りに続けたい」",
        body: "平日は22時まで営業。完全予約制なので待ち時間なく、仕事帰りの時間を有効に使えます。",
      },
    ],
  },

  flow: {
    heading: "120分フルセット体験の流れ",
    steps: [
      {
        num: "1",
        title: "カウンセリング・姿勢確認",
        time: "約30分",
        body: "お悩みや理想のカラダについてお伺いし、姿勢を確認します。必要に応じてInBodyで体組成を測定します。",
      },
      {
        num: "2",
        title: "美容整体＆マシンピラティス",
        time: "約40分",
        body: "その場で組み立てたオリジナルメニューで、整えてから鍛える流れを体験いただきます。",
      },
      {
        num: "3",
        title: "フィードバックとプランのご提案",
        time: "約50分",
        body: "体験の結果をフィードバックし、目標とライフスタイルに合わせた無理のない継続プランをご一緒に決めていきます。",
      },
    ],
  },

  faq: {
    heading: "よくあるご質問",
    items: [
      {
        q: "運動経験がなくても始められますか？",
        a: "もちろん可能です。お一人おひとりの体力や柔軟性に合わせてレッスンを行うため、運動初心者の方や40代・50代の方でも安心してスタートできます。",
      },
      {
        q: "マシンピラティスとマットピラティス、どちらがおすすめですか？",
        a: "運動初心者の方や姿勢改善・ダイエットを目的とする方にはマシンピラティスがおすすめです。マシンが動きをサポートしてくれるため、正しいフォームを身につけやすく、効率的に身体を整えられます。",
      },
      {
        q: "ピラティスだけでダイエット効果は期待できますか？",
        a: "ピラティスは姿勢改善や体幹強化に効果的ですが、大きな減量を目指す場合は筋力トレーニングや食事管理との併用がおすすめです。ARCSではピラティスとトレーニングを組み合わせたサポートも行っています。",
      },
      {
        q: "肩こりや腰痛の改善にも効果がありますか？",
        a: "身体のバランスや姿勢を整えることで、肩こりや腰痛の原因となる筋力低下や身体の歪みにアプローチできます。ただし症状によっては医療機関へのご相談もおすすめしています。",
      },
    ],
  },

  access: {
    heading: "店舗のご案内",
    stores: [
      {
        img: { placeholder: "牛久店の外観 / 内観写真", src: null },
        name: "牛久店",
        address: "〒300-1232 茨城県牛久市上柏田4丁目52-2 オークヒルズ 001号",
        hours: "平日 10:00〜22:00／土日・祝 9:00〜21:00",
        route: "（定休日 年末年始）\nJR上野・東京ライン「牛久駅」より車で約6分／店舗前に無料駐車場7台",
      },
      {
        img: { placeholder: "みらい平店の外観 / 内観写真", src: null },
        name: "みらい平店",
        address: "〒300-2359 茨城県つくばみらい市紫峰ヶ丘1-7-2 AJ-MIRAI 1B",
        hours: "平日 10:00〜22:00／土日・祝 9:00〜21:00",
        route: "（定休日 年末年始）\nつくばエクスプレス線「みらい平駅」徒歩7分／店舗裏に無料駐車場10台",
      },
    ],
  },

  form: {
    heading: "120分フルセット体験のご予約",
    lead: "下記フォームからお気軽にお申し込みください。\n担当より24時間以内にご連絡いたします。",
    fields: [
      {
        type: "toggle",
        name: "store",
        label: "ご希望店舗",
        required: true,
        columns: 2,
        options: [
          { value: "ushiku", label: "牛久店" },
          { value: "miraidaira", label: "みらい平店" },
        ],
      },
      { type: "text", name: "name", label: "お名前", required: true, placeholder: "山田 花子" },
      { type: "tel", name: "tel", label: "電話番号", required: true, placeholder: "090-0000-0000" },
      { type: "email", name: "email", label: "メールアドレス", placeholder: "example@mail.com" },
      { type: "text", name: "date1", label: "ご希望日時(第1希望)", placeholder: "例)平日夜、土曜午前など" },
      { type: "text", name: "date2", label: "ご希望日時(第2希望)", placeholder: "例)日曜午後など" },
      {
        type: "textarea",
        name: "note",
        label: "ご質問・ご相談内容",
        optionalTag: "任意",
        placeholder: "お身体のお悩みやご不安な点など、ご自由にお書きください。",
        rows: 4,
      },
    ],
    submitLabel: "この内容で予約する",
    disclaimer:
      "送信いただいた内容は予約対応のみに利用します。\n120分体験1,980円｜入会金0円｜しつこい勧誘はいたしません。",
    errorMessage: "店舗・お名前・電話番号は必須項目です。",
  },

  sticky: {
    offers: [
      { label: "120分体験", value: "¥1,980" },
      { label: "入会金", value: "¥0" },
    ],
    buttonText: "120分体験を予約する",
    anchor: "#form",
  },
};

export default config;
