import type { PatternAConfig } from "@/clients/pattern-a.types";

const ASSET = "/clients/training-studio-arcs";

/**
 * pattern-a.types の `form`（LPForm）の代わりに `reserve` を使う。
 * 予約導線はhacomono店舗別ウィジェットへ直接遷移し、LPFormは使用しない
 * （check-rules.ts の FORM_EXEMPT に登録済み。LPShellは維持）。
 */
type Config = Omit<PatternAConfig, "form"> & {
  reserve: {
    heading: string;
    lead: string;
    /** hacomono みらい平店の予約URL。未確定はnull（非リンク描画になる）。 */
    url: string | null;
    ctaText: string;
    note: string;
  };
};

/**
 * Training Studio ARCS（パーソナルジムARCS）— pattern A.
 *
 * 出典: 打ち合わせシート【アークス】+ 公式サイト https://arcs-trainingstudio.jp
 * ピラティス（美容整体×マシンピラティス）はみらい平店限定のプログラムのため、
 * このLPはみらい平店に絞った訴求にしている（全5店舗のうち1店舗）。
 *
 * ★未確認・要ご確認（顧客確認が取れるまで status は draft のまま）
 *  - トレーナー2・3の氏名／経歴（ヒアリングは「女性・管理栄養士・トレーニング系」のみ）
 *  - 体験120分の各ステップの所要時間（合計120分になるよう仮置き）
 *  - キャンペーン実施期間が「〜2026年7月末」表記のため、8月以降の取り扱い
 *  - 一部画像は顧客支給のレッスン風景素材（Google Drive「ピラティス素材」フォルダ）から選定済み。
 *    悩み共感カードは他クライアントと共通の汎用イメージ素材を流用。
 *    通い方シーン・選ばれる理由03（キッズスペース/駐車場）・店舗外観/内観は、
 *    店舗固有の実写真が必要なため（他店舗の実写真は事実と異なるため転用不可）src:null のまま。
 */
const config: Config = {
  slug: "training-studio-arcs",
  status: "draft",
  meta: {
    title: "パーソナルジムARCS みらい平｜美容整体×マシンピラティス体験1,980円",
    description:
      "厚生労働大臣認定の病院併設施設で10年の経験を持つトレーナーが在籍。整えてから鍛えるマシンピラティスで、姿勢改善からダイエットまで対応します。みらい平店では120分フルセット体験を1,980円・入会金0円でご案内中。無料駐車場・キッズスペース完備。",
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
    access: [{ station: "みらい平店", walk: "徒歩7分", note: "駐車場完備" }],
  },
  offerBar: {
    badgeLines: ["毎月", "5名限定"],
    text: "体験1,980円・入会金0円",
  },
  achievement: { pre: "茨城県内", num: "5", post: "店舗展開のパーソナルジムが運営" },

  fv: {
    catchLines: ["整えてから鍛える、", "ダイエットピラティス"],
    hero: { placeholder: "メインビジュアルの写真（全面）", src: `${ASSET}/hero.jpg` },
    leftCard: { small: "整える", big: "美容整体" },
    rightCard: { small: "鍛える", big: "マシンピラティス" },
  },

  offer: {
    eyebrow: "毎月5名様限定キャンペーン",
    heading: "120分のフルセット体験",
    trialBadge: "当日ご入会予約で体験料金\n全額キャッシュバック",
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
      { placeholder: "マシンピラティスのレッスン風景", src: `${ASSET}/lesson-1.jpg` },
      { placeholder: "スタジオ内観 / マシン設備", src: `${ASSET}/studio-1.jpg` },
    ],
    joinLabel: "入会金",
    joinRegular: "22,000",
    regular: { prefix: "1回 ", amount: "7,700", suffix: "から通える" },
    ctaText: "120分体験を予約する",
  },

  about: {
    heading: "TRAINING STUDIO ARCS\nについて",
    photo: { placeholder: "トレーナー / スタジオの写真", src: `${ASSET}/about.jpg` },
    caption: "All Round Care Service",
    lead: "一人ひとりの異なるご要望に、\n最善のサービスを。",
    body: "ARCSは「All Round Care Service」を掲げるパーソナルジムです。代表は女性専用ジムを経て、厚生労働大臣認定の健康増進施設で10年間現場責任者を務めた経験をもとに、痛くなってからではなく痛くならない身体づくりをご提案します。なかでも美容整体は、骨格の歪みを整え、姿勢の崩れや肩こり・冷えにアプローチするARCSならではのメニューです。",
  },

  worry: {
    heading: "こんなお悩み、ありませんか？",
    cards: [
      { img: { placeholder: "イメージ画像", src: `${ASSET}/worry-1.jpg` }, text: "肩こり・腰痛が\nなかなか取れない" },
      { img: { placeholder: "イメージ画像", src: `${ASSET}/worry-2.jpg` }, text: "姿勢の崩れ・猫背が\n気になってきた" },
      { img: { placeholder: "イメージ画像", src: `${ASSET}/worry-3.jpg` }, text: "冷え・むくみ・\n便秘が続いている" },
      { img: { placeholder: "イメージ画像", src: `${ASSET}/worry-4.jpg` }, text: "運動が苦手で\n続けられるか不安" },
    ],
    closingPre: "その不調、",
    closingHighlight: "ARCSなら整います。",
  },

  reasons: {
    heading: "選ばれる3つの理由",
    items: [
      {
        num: "01",
        img: { placeholder: "トレーナーの指導風景", src: `${ASSET}/reason-1.jpg` },
        title: "国が認めた健康増進施設で\n10年間の現場責任者経験",
        body: "全国に350しかない厚生労働大臣認定の病院併設の健康増進施設で、10年間責任者を経験したトレーナーが在籍。ダイエットから生活習慣病の予防、機能改善まで、医学的な知見に基づいてサポートします。",
      },
      {
        num: "02",
        img: { placeholder: "3つのコースを表す写真", src: `${ASSET}/reason-2.jpg` },
        title: "目的とコンディションで\n選べる3つのコース",
        body: "「整えたい」「引き締めたい」「痩せたい」。目的に合わせてコースを組み合わせられるので、姿勢改善で終わらずダイエットまで対応できます。",
        trio: [
          { label: "ピラティス", desc: "正しいフォームで\n整えてから鍛える" },
          { label: "パーソナル", desc: "大きな筋肉を動かし\nボディメイク" },
          { label: "美容整体", desc: "骨格から整えて\n美しい姿勢へ導く" },
        ],
      },
      {
        num: "03",
        img: { placeholder: "キッズスペース / 駐車場の写真", src: `${ASSET}/reason-3.jpg` },
        title: "毎回オリジナルメニュー\n通いやすさも妥協なし",
        body: "決まったメニューを当てはめるのではなく、その日のコンディションを確認して毎回オリジナルのメニューを作成。管理栄養士をはじめ多数の資格保有者が対応します。キッズスペースと無料駐車場を完備し、お子様連れでもお車でも通えます。",
      },
    ],
    ctaText: "120分体験を予約する",
    ctaSub: "120分フルセット体験1,980円｜入会金0円",
  },

  trainers: {
    show: false,
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
        img: { placeholder: "シーンの写真", src: `${ASSET}/scene-1.jpg` },
        title: "「子どもを預けずに通いたい」",
        body: "キッズスペースを完備。産後の身体づくりも、お子様連れのままレッスンを受けていただけます。",
      },
      {
        img: { placeholder: "シーンの写真", src: `${ASSET}/scene-2.jpg` },
        title: "「車で通える」",
        body: "店舗裏に無料駐車場が10台。駐車場を探す心配なく、車でそのまま通えます。",
      },
      {
        img: { placeholder: "シーンの写真", src: `${ASSET}/scene-3.jpg` },
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
        title: "カウンセリング・姿勢確認（30分）",
        time: "約30分",
        body: "お悩みや理想のカラダについてお伺いし、姿勢を確認します。必要に応じてInBodyで体組成を測定し、今のカラダの状態を可視化します。",
      },
      {
        num: "2",
        title: "美容整体＆マシンピラティス体験（50分）",
        time: "約50分",
        body: "カウンセリングの内容をもとに組み立てたオリジナルメニューで、美容整体とマシンピラティスを体験。整えてから鍛える流れを実際に感じていただきます。",
        trio: [
          { label: "ピラティス", desc: "正しいフォームで\n整えてから鍛える" },
          { label: "パーソナル", desc: "大きな筋肉を動かし\nボディメイク" },
          { label: "美容整体", desc: "骨格から整えて\n美しい姿勢へ導く" },
        ],
      },
      {
        num: "3",
        title: "体験フィードバック・プラン提案（20分）",
        time: "約20分",
        body: "体験の感想や気づきをうかがいながら結果をフィードバック。目標やライフスタイルに合わせた、無理のない継続プランをご提案します。",
      },
      {
        num: "4",
        title: "ご希望の方には手続きご案内（20分）",
        time: "約20分",
        body: "ご継続を希望される方には、その場でご入会のお手続きをご案内します。しつこい勧誘はいたしませんので、じっくりご検討いただいて構いません。",
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
        img: { placeholder: "みらい平店の外観 / 内観写真", src: `${ASSET}/access.jpg` },
        name: "みらい平店",
        address: "〒300-2359 茨城県つくばみらい市紫峰ヶ丘1-7-2 AJ-MIRAI 1B",
        hours: "平日 10:00〜22:00／土日・祝 9:00〜21:00",
        route: "（定休日 年末年始）\nつくばエクスプレス線「みらい平駅」徒歩7分／店舗裏に無料駐車場10台",
      },
    ],
  },

  reserve: {
    heading: "120分フルセット体験のご予約",
    lead: "下記のボタンからご希望の日時をお選びいただき、そのままご予約ください。",
    url: "https://arcs.hacomono.jp/widgets/8?isFilterableByCategory=false&isShowStudioInfo=true&studioIds=3",
    ctaText: "120分体験を予約する",
    note: "120分体験1,980円｜入会金0円｜しつこい勧誘はいたしません。",
  },

  sticky: {
    offers: [
      { label: "120分体験", value: "¥1,980" },
      { label: "入会金", value: "¥0" },
    ],
    buttonText: "120分体験を予約する",
    anchor: "#reserve",
  },
};

export default config;
