import type { ClientStatus } from "@shared/index";

/**
 * BEAT PILATES 豊田店 — Meta広告用LP。
 *
 * コンセプトは「運動は苦手。でも、身体は変えたい。」の1本。
 * FVのキャッチは「運動は続かなかった／でも、身体は変えたい」（2026-10-03 顧客指示で変更）。
 * 「もっと頑張らないと変わらない」→「続けたくなる運動を見つけることが大切」へ考え方を変え、
 * その答えとして「暗闇 × 音楽 × マシンピラティス」を出す。LP全体で次の言葉を繰り返す。
 *   楽しく身体を動かす／運動が苦手でも始めやすい／周りを気にしにくい／
 *   音楽に合わせて動く／マシンが動きをサポート／続けたくなる運動／女性専用
 *
 * 情報の優先順位: 制作指示書 > 公式サイト（beat-pilates.com, /toyota/）> 既存LP（beat-pilates-toyota）。
 * 構成・文字サイズの強弱・CTA頻度は `seren-pilates` を基準にしている（文章・内容は流用しない）。
 *
 * **表現上の禁止事項（指示書 §29）**
 *   「痩せる」「治る」「改善する」「絶対変わる」などの結果断定はしない。
 *   「目指す」「整える」「意識する」「気になる方へ」で書く。
 *   豊田店のお客様の声・スタッフ資格は未提供のため掲載しない（架空の口コミは作らない）。
 *
 * 体験45分・キャンペーン条件・体験後の案内・レンタル等の【要確認】項目は顧客確認済み（2026-10-03）。
 *
 * 予約導線は既存の豊田店LPと同じ hacomono（豊田店の体験予約）。LPForm は置かない
 * （scripts/check-rules.ts の FORM_EXEMPT に登録）。
 */

/** An image position in the layout. `src` empty → placeholder box. */
export interface Slot {
  placeholder: string;
  src?: string | null;
  position?: string;
  poster?: string;
}

export interface BeatToyotaMetaConfig {
  slug: string;
  status?: ClientStatus;
  meta: { title: string; description: string; ogpImage?: string };

  header: { logo: string; logoAlt: string; station: string; walkPre: string; walkNum: string; walkPost: string; parking: string };
  offerBar: { trialLabel: string; trial: string; admissionLabel: string; admission: string };

  /** 価格はここに1か所だけ。FV・キャンペーン・最終CTA・追従CTAで共有する。 */
  prices: {
    trialLabel: string;
    trialNote: string;
    trial: string;
    admissionLabel: string;
    admission: string;
  };

  cta: { main: string; reserve: string; try: string; sub: string };

  fv: {
    hero: Slot;
    eyebrow: string;
    /** 2行目は「でも、」を小さく、強調語をピンクで大きく置く。 */
    catch: { line1: string; line2Lead: string; line2Em: string };
    sub: string;
    pillars: { en: string; label: string; img: Slot }[];
    chips: string[];
  };

  worry: { heading: string; items: { img: Slot; text: string }[]; closing: string };

  reason: {
    kicker: string;
    heading: string;
    tried: string[];
    triedNote: string;
    lines: string[];
  };

  mindset: { heading: string; emphasis: string; body: string; img: Slot; formula: { label: string; img: Slot }[] };

  features: {
    kicker: string;
    heading: string;
    items: { num: string; en: string; label: string; title: string; body: string; img: Slot }[];
  };

  future: { heading: string; items: string[]; img: Slot; closing: string };

  reasons: {
    heading: string;
    items: { num: string; title: string; body: string; img?: Slot }[];
  };

  body: { heading: string; lead: string; items: { img: Slot; label: string; text: string }[]; note: string };

  instructors: { heading: string; lead: string; items: { name: string; img: Slot }[] };

  flow: {
    heading: string;
    steps: { num: string; title: string; body: string; img?: Slot }[];
  };

  qa: { heading: string; img: Slot; items: { q: string; a: string }[] };

  campaign: { kicker: string; value: string; heading: string; bg: Slot };

  store: {
    heading: string;
    img: Slot;
    exterior: Slot;
    name: string;
    address: string;
    access: string[];
    parking: string;
    hours: string;
    mapEmbedSrc: string;
  };

  faq: { heading: string; items: { q: string; a: string }[] };

  closing: { heading: string; lead: string; bg: Slot; chips: string[]; storeName: string };

  /** 予約導線（外部 hacomono）。全CTAがこの url（新規タブ）へ接続する。 */
  reserve: { url: string };

  sticky: { buttonText: string; showAfter: number };
  footer: { copyright: string };
}

const IMG = "/clients/beat-pilates-toyota-meta";

const config: BeatToyotaMetaConfig = {
  slug: "beat-pilates-toyota-meta",
  status: "draft",
  meta: {
    title: "【初回体験1,000円】運動は続かなかった。でも、身体は変えたい。｜BEAT PILATES 豊田店",
    description:
      "音楽に合わせて楽しむ、女性専用の暗闇マシンピラティス。周りを気にしにくい暗闇と、動きをサポートするマシンで、運動が苦手でも始めやすい。初回体験1,000円・入会金0円。名鉄豊田市駅 徒歩3分・駐車場あり。",
    // 相対パスだと metadataBase 未設定のためブライダルのドメインで解決される。必ず絶対URL。
    ogpImage: `https://fitness-lp.commitad.com${IMG}/ogp.jpg`,
  },

  header: {
    logo: `${IMG}/logo_w.png`,
    logoAlt: "BEAT PILATES",
    station: "名鉄 豊田市駅",
    walkPre: "徒歩",
    walkNum: "3",
    walkPost: "分",
    parking: "駐車場完備",
  },

  offerBar: { trialLabel: "初回体験", trial: "1,000", admissionLabel: "入会金", admission: "0" },

  prices: {
    trialLabel: "初回体験",
    trialNote: "45分レッスン",
    trial: "1,000",
    admissionLabel: "入会金",
    admission: "0",
  },

  cta: {
    main: "1,000円で体験してみる",
    reserve: "1,000円で体験レッスンを予約する",
    try: "BEAT PILATESを体験してみる",
    sub: "豊田市駅 徒歩3分｜女性専用",
  },

  fv: {
    hero: {
      placeholder: "暗闇照明のマシンピラティスレッスン（動画）",
      src: `${IMG}/fv-loop.mp4`,
      poster: `${IMG}/fv-poster.jpg`,
      position: "center 30%",
    },
    eyebrow: "女性専用の暗闇マシンピラティス",
    catch: { line1: "運動は続かなかった", line2Lead: "でも、", line2Em: "身体は変えたい" },
    sub: "音楽に合わせて楽しむ、\n暗闇マシンピラティス。",
    pillars: [
      { en: "DARK", label: "暗闇", img: { placeholder: "", src: `${IMG}/dark-purple.jpg`, position: "center 60%" } },
      { en: "MUSIC", label: "音楽", img: { placeholder: "", src: `${IMG}/music.jpg`, position: "center 30%" } },
      { en: "MACHINE", label: "マシン\nピラティス", img: { placeholder: "", src: `${IMG}/machine-lesson.jpg`, position: "40% center" } },
    ],
    chips: ["女性専用", "運動初心者OK", "豊田市駅 徒歩3分"],
  },

  worry: {
    heading: "こんなこと、\n気になっていませんか？",
    items: [
      { img: { placeholder: "", src: `${IMG}/worry-hip.jpg`, position: "62% 30%" }, text: "最近、お尻の\nラインが気になる" },
      { img: { placeholder: "", src: `${IMG}/worry-camera.jpg`, position: "65% 40%" }, text: "写真を見ると、\n姿勢が気になる" },
      { img: { placeholder: "", src: `${IMG}/worry-waist.jpg`, position: "68% 40%" }, text: "下腹やお腹周りが\n気になる" },
      { img: { placeholder: "", src: `${IMG}/worry-sofa.jpg`, position: "62% 45%" }, text: "運動しない日が\n増えてきた" },
      { img: { placeholder: "", src: `${IMG}/worry-gym.jpg`, position: "30% 40%" }, text: "ジムに入っても\n続かなかった" },
      { img: { placeholder: "", src: `${IMG}/counseling.jpg`, position: "60% 40%" }, text: "何か始めたいけど、\n何をすれば\nいいか分からない" },
    ],
    closing: "ひとつでも当てはまったら、\nこの先を読んでみてください。",
  },

  reason: {
    kicker: "WHY",
    heading: "身体を変えたい。\nでも、続かない。",
    tried: ["ジム", "YouTube", "宅トレ", "ウォーキング", "ヨガ", "ストレッチ"],
    triedNote: "始めてみたけれど、いつの間にかやめていた。",
    lines: [
      "きつい運動を始めても、\n楽しめなければ続けるのは難しい。",
      "一人で黙々と頑張る運動が、\nあなたに合っていなかった\nだけかもしれません。",
    ],
  },

  mindset: {
    heading: "必要なのは、\nもっと頑張ることじゃない。",
    emphasis: "続けたくなる運動を\n見つけること。",
    body: "身体づくりは、1回だけ頑張るより\n無理なく身体を動かす時間を\nつくり続けることが大切。\nそのためにBEAT PILATESは、\n3つを組み合わせました。",
    img: { placeholder: "音楽に合わせて動くインストラクター", src: `${IMG}/instructor-move.jpg`, position: "center 35%" },
    formula: [
      { label: "暗闇", img: { placeholder: "", src: `${IMG}/dark-purple.jpg`, position: "center 60%" } },
      { label: "音楽", img: { placeholder: "", src: `${IMG}/music.jpg`, position: "center 30%" } },
      { label: "マシン", img: { placeholder: "", src: `${IMG}/machine-lesson.jpg`, position: "35% center" } },
    ],
  },

  features: {
    kicker: "BEAT STYLE",
    heading: "だからBEAT PILATESは、\n運動を“楽しむ時間”に変える。",
    items: [
      {
        num: "01",
        en: "DARK",
        label: "暗闇",
        title: "周りを気にしにくい",
        body: "暗闇だから、人と比べすぎず、\n自分の動きに集中しやすい。",
        img: { placeholder: "暗闇照明のスタジオ", src: `${IMG}/dark-studio.jpg`, position: "center 55%" },
      },
      {
        num: "02",
        en: "MUSIC",
        label: "音楽",
        title: "音楽に合わせて動く",
        body: "音楽に合わせて身体を動かすから、\nただ回数をこなす運動とは違う楽しさ。",
        img: { placeholder: "音楽に合わせて動くレッスン", src: `${IMG}/music.jpg`, position: "center 40%" },
      },
      {
        num: "03",
        en: "MACHINE",
        label: "マシン",
        title: "身体の動きをサポート",
        body: "専用マシンが動きを補助するため、\n運動に自信がない方でも取り組みやすい。",
        img: { placeholder: "リフォーマーを使うレッスン", src: `${IMG}/machine-support.jpg`, position: "center 60%" },
      },
    ],
  },

  future: {
    heading: "少しずつ、\n自分の身体を\n好きになれる毎日へ。",
    items: [
      "好きな服を、もっと楽しみたい",
      "写真に写る自分に、自信を持ちたい",
      "姿勢を意識できる身体になりたい",
      "運動することを、習慣にしたい",
      "身体を動かす時間を、楽しみにしたい",
    ],
    img: { placeholder: "笑顔でマシンピラティスをする女性たち", src: `${IMG}/future-friends.jpg`, position: "center 35%" },
    closing: "こんな自分を、\nここから目指してみませんか。",
  },

  reasons: {
    heading: "BEAT PILATESが\n始めやすい5つの理由",
    items: [
      {
        num: "01",
        title: "暗闇だから周りを気にしにくい",
        body: "照明を落とした空間だから、できない動きを見られる心配が少なく、自分のペースで動けます。",
        img: { placeholder: "暗闇照明のスタジオ", src: `${IMG}/studio-purple.jpg`, position: "center 55%" },
      },
      {
        num: "02",
        title: "音楽に合わせて楽しく動ける",
        body: "K-POP・邦楽・洋楽など、音楽に乗って身体を動かすから、気づけばレッスンが終わっています。",
        img: { placeholder: "音楽に合わせたグループレッスン", src: `${IMG}/group-lesson.jpg`, position: "center 30%" },
      },
      {
        num: "03",
        title: "マシンが動きをサポート",
        body: "リフォーマーのスプリングが動きを補助。筋力に自信がなくても、フォームを意識して取り組めます。",
        img: { placeholder: "リフォーマー", src: `${IMG}/reformer.jpg`, position: "center 60%" },
      },
      {
        num: "04",
        title: "女性専用スタジオ",
        body: "通っているのは女性だけ。運動が久しぶりの方も、気兼ねなく参加できます。",
        img: { placeholder: "", src: `${IMG}/women-only.jpg`, position: "center 35%" },
      },
      {
        num: "05",
        title: "豊田市駅から徒歩3分",
        body: "名鉄豊田市駅 西口から徒歩3分。駐車場もあるので、仕事帰りや車でも通いやすい。",
        img: { placeholder: "", src: `${IMG}/exterior.jpg`, position: "center 55%" },
      },
    ],
  },

  body: {
    heading: "気になるところから、\n身体を動かしていこう。",
    lead: "全身を使うマシンピラティスだから、\n気になるところを意識しながら動けます。",
    items: [
      { img: { placeholder: "", src: `${IMG}/body-hip.jpg`, position: "45% center" }, label: "お尻", text: "お尻のラインが\n気になる" },
      { img: { placeholder: "", src: `${IMG}/body-waist.jpg`, position: "40% center" }, label: "お腹", text: "下腹をすっきり\n見せたい" },
      { img: { placeholder: "", src: `${IMG}/body-leg.jpg`, position: "55% center" }, label: "脚", text: "脚のラインを\n整えたい" },
      { img: { placeholder: "", src: `${IMG}/body-posture.jpg`, position: "40% center" }, label: "姿勢", text: "猫背や巻き肩を\n意識したい" },
      { img: { placeholder: "", src: `${IMG}/body-energy.jpg`, position: "40% center" }, label: "運動不足", text: "座りっぱなしの\n毎日を変えたい" },
      { img: { placeholder: "", src: `${IMG}/worry-gym.jpg`, position: "25% center" }, label: "体力", text: "最近、体力が\n落ちた気がする" },
    ],
    note: "※効果には個人差があります。",
  },

  instructors: {
    heading: "インストラクターが\nレッスンをサポート",
    lead: "見本を見せながら、一人ひとりの動きに\n声をかけてサポートします。",
    items: [
      { name: "ASAMI", img: { placeholder: "インストラクター", src: `${IMG}/trainer-asami.jpg`, position: "center 30%" } },
      { name: "KARIN", img: { placeholder: "インストラクター", src: `${IMG}/trainer-karin.jpg`, position: "center 15%" } },
      { name: "FUMIKO", img: { placeholder: "インストラクター", src: `${IMG}/trainer-fumiko.jpg`, position: "center 25%" } },
      { name: "SAAYA", img: { placeholder: "インストラクター", src: `${IMG}/trainer-saaya.jpg`, position: "center 15%" } },
      { name: "MAI", img: { placeholder: "インストラクター", src: `${IMG}/trainer-mai.jpg`, position: "center 20%" } },
      { name: "ICHIHA", img: { placeholder: "インストラクター", src: `${IMG}/trainer-ichiha.jpg`, position: "center 20%" } },
      { name: "MIKU", img: { placeholder: "インストラクター", src: `${IMG}/trainer-miku.jpg`, position: "center 20%" } },
    ],
  },

  flow: {
    heading: "初めてでも大丈夫。\n体験はかんたん4STEP。",
    steps: [
      { num: "01", title: "体験レッスンを予約", body: "スマホから、希望の日時を選ぶだけ。", img: { placeholder: "", src: `${IMG}/studio-purple.jpg`, position: "center 55%" } },
      { num: "02", title: "スタジオへ来店", body: "動きやすい服装でお越しください。靴下・タオル・飲み物があると安心です。", img: { placeholder: "", src: `${IMG}/entrance.jpg`, position: "center 40%" } },
      { num: "03", title: "マシンピラティスを体験", body: "音楽に合わせて、実際のレッスン（45分）を体験。最初に見本を見ながら練習します。", img: { placeholder: "", src: `${IMG}/group-lesson.jpg`, position: "center 30%" } },
      { num: "04", title: "レッスン終了", body: "気になることがあれば、その場でお気軽にご相談ください。", img: { placeholder: "", src: `${IMG}/counseling.jpg`, position: "60% 40%" } },
    ],
  },

  qa: {
    heading: "ピラティスが初めてでも、\n運動が久しぶりでも。",
    img: { placeholder: "", src: `${IMG}/beginner-support.jpg`, position: "center 35%" },
    items: [
      {
        q: "運動が苦手でも大丈夫？",
        a: "マシンが動きを補助するため、運動に自信がない方でも取り組みやすいのが特長です。",
      },
      {
        q: "周りについていけるか不安…",
        a: "暗闇の空間なので、周りの視線を意識しすぎず、自分の動きに集中しやすい環境です。",
      },
      {
        q: "身体が硬くても大丈夫？",
        a: "リフォーマーはスプリングの力で動きを補助します。無理のない範囲で動けるよう調整できます。",
      },
      {
        q: "ピラティス未経験でも大丈夫？",
        a: "いきなり音楽に合わせて動くことはありません。まずインストラクターが見本を見せ、曲を流さずに練習してから始めます。",
      },
    ],
  },

  campaign: {
    kicker: "TRIAL CAMPAIGN",
    value: "暗闇 × 音楽 × マシンピラティスを、\n実際に体験してください。",
    heading: "まずは、気軽に体験。",
    bg: { placeholder: "BEAT PILATESロゴと照明", src: `${IMG}/brand-loop.mp4`, poster: `${IMG}/brand-poster.jpg`, position: "center 30%" },
  },

  store: {
    heading: "店舗のご案内",
    img: { placeholder: "豊田店のスタジオ", src: `${IMG}/store.jpg`, position: "center 40%" },
    exterior: { placeholder: "", src: `${IMG}/exterior.jpg`, position: "center 55%" },
    name: "BEAT PILATES 豊田店",
    address: "〒471-0025\n愛知県豊田市西町5-5 VITS豊田タウン2階",
    access: ["名鉄 豊田市駅 西口から徒歩3分", "愛知環状鉄道 新豊田駅 東口から徒歩5分"],
    parking: "駐車場あり（3時間無料）",
    hours: "平日 9:00〜21:00\n土日祝 9:00〜18:00",
    mapEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3264.865852692026!2d137.15456609999998!3d35.0850844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6004a15a18532229%3A0xc9c569e465580d50!2zQmVhdCBQaWxhdGVz6LGK55Sw5bqX!5e0!3m2!1sja!2sjp!4v1787730326689!5m2!1sja!2sjp",
  },

  faq: {
    heading: "よくあるご質問",
    items: [
      {
        q: "ピラティスが初めてでも参加できますか？",
        a: "はい。まずインストラクターが動きの見本を見せ、曲を流さずに全員で練習してから始めます。",
      },
      {
        q: "運動が苦手でも大丈夫ですか？",
        a: "マシンのスプリングが動きを補助するので、筋力に自信がない方でも取り組みやすいレッスンです。暗闇なので周りの目も気にしにくい環境です。",
      },
      {
        q: "身体が硬くても参加できますか？",
        a: "はい。スプリングの強さで負荷を調整しながら、無理のない範囲で身体を動かせます。",
      },
      {
        q: "どんな服装で行けばいいですか？",
        a: "動きやすい服装でお越しください。靴下・タオル・飲み物をお持ちいただくと安心です。ウェアやタオルのレンタルの有無は店舗にご確認ください。",
      },
      {
        q: "体験レッスンでは何をしますか？",
        a: "暗闇の中、音楽に合わせてリフォーマーを使う実際のレッスン（45分）を体験していただきます。",
      },
      { q: "駐車場はありますか？", a: "はい、駐車場があります（3時間無料）。" },
      {
        q: "豊田市駅からどのくらいですか？",
        a: "名鉄 豊田市駅 西口から徒歩3分、愛知環状鉄道 新豊田駅 東口から徒歩5分です。",
      },
    ],
  },

  closing: {
    heading: "運動が苦手でも、\nまずは一度\n身体を動かしてみませんか？",
    lead: "頑張る運動ではなく、\n楽しめる運動から始めてみる。",
    bg: { placeholder: "雰囲気の良いレッスン写真", src: `${IMG}/lesson-blue.jpg`, position: "30% center" },
    chips: ["女性専用", "豊田市駅 徒歩3分"],
    storeName: "BEAT PILATES 豊田店",
  },

  reserve: { url: "https://beatpilates-toyota.hacomono.jp/reserve/schedule/1/1/?trial=true" },

  sticky: { buttonText: "初回1,000円｜体験予約する", showAfter: 700 },
  footer: { copyright: "© BEAT PILATES 豊田店" },
};

export default config;
