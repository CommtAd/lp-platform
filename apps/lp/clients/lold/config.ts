import type { PatternCConfig } from "@/clients/pattern-c.types";

const ASSET = "/clients/lold";

/**
 * ザ・フォレストオブロルド — ブライダルフェア（パターンC）。
 *
 * forest-terrace-hiroshima の config を写して作ったが、原稿・金額・会場情報は
 * すべて lold のものに差し替え済み。会場を特定する広島由来の要素は残っていない
 * （2026-09-08 時点。装飾・アイコンはパターンC共通の部品なので対象外）。
 * 金額・適用条件・日付は顧客確認を取ってから変更すること。
 */
const config: PatternCConfig = {
  slug: "lold",
  status: "draft",
  meta: {
    title: "ザ・フォレストオブロルド｜プレミア試食つきBIGフェア",
    description:
      "「ザ・フォレストオブロルド」のプレミア試食つきBIGフェアを開催中。ご成約で最大100万円分プレゼント、ご来館で最大7万円分の特典をご用意。チャペル見学・披露宴会場見学・豪華無料試食・お見積り相談を最短30秒でご予約いただけます。",
    // OGP専用の1枚（1200x630）。会場紹介のチャペル写真から切り出したもので、
    // ファイルは別に持つ。共用すると写真を差し替えてもURLが変わらず、
    // SNS側のキャッシュが古い画像を出し続ける（実際に発生）。
    // 差し替えるときは必ずファイル名も変えること。
    ogpImage: `${ASSET}/ogp-2026-09.jpg`,
  },
  ink: "#3B3730",
  accent: "#B99653",
  paper: "#FBF8F3",

  // 特典バンド（限定特典・来館特典）。地・文字とも顧客指定（#A49483 × 白）。
  // 白 on #A49483 は 2.9:1 で WCAG AA（4.5:1／大文字3:1）には届かないが、
  // 見た目の指定を優先するという判断。ここに載るのは見出しと補足のみで、
  // 金額はすべて白プレート＋深い金（4.9:1）に逃がしてある。
  band: {
    bg: "#A49483",
    text: "#FFFFFF",
    accent: "#FFFFFF",
    rule: "rgba(255,255,255,0.5)",
  },

  header: {
    // 英字表記は支給ロゴの表記に合わせている。
    venue: "The Forest of Lold",
    // 横並びのロゴ（紋章 + ロゴタイプ、比率 2.64:1）。ロゴタイプが高さの3割弱しか
    // 取らないので、42px だと文字が10px を切って読めない。46px で約13px になる。
    // 支給素材は白地の不透明PNGだったので、白を透過に起こして余白を詰めてある
    //（そのまま置くと生成りのヘッダーに白い矩形が出る）。
    logo: { src: `${ASSET}/logo.png`, height: 46 },
    ctaText: "予約する",
    // ヘッダーは追従させない（顧客指定）。
    sticky: false,
  },

  fv: {
    brand: "ザ・フォレストオブロルド",
    kicker: "＼豪華10大特典／",
    // 英字前提のキッカー枠なので、数字を明朝の立体に逃がさないと "1o" に見える。
    kickerEmphasis: "10",
    catch: ["プレミア試食つきBIGフェア"],
    // キッカー・キャッチ・訴求を1枚のプレートにまとめる。
    framed: true,
    ornament: {
      top: `${ASSET}/fv-ornament-top.png`,
      bottom: `${ASSET}/fv-ornament-bottom.png`,
    },
    highlight: "最大100万円相当プレゼント",
    // 既定22pxから一段下げる（顧客指定）。
    highlightSize: 19,
    // リードとオファーチップは顧客要望で非表示。FVは訴求を highlight 1点に絞る。
    ctaText: "最短30秒で予約する",
    // 新郎新婦が写真中央にいるため、キャッチを上に逃がして顔にかぶらないようにする。
    catchPosition: "top",
    // スライドは全て 1360x1814。支給素材が 1627x2170 の 3:4 ちょうどなので、
    // heroAspect と一致し、トリミングは発生しない（幅を詰めただけ）。
    // キャンバスは実寸480pxまでなので、DPR3の端末でも 1440px あれば等倍に届く。
    //
    // プレートがFVの上53%を覆うため、素材は顔が60%前後にある必要がある。
    // 3枚とも顔が約62%で、プレートの下に収まっている。
    heroAspect: "3 / 4",
    hero: {
      placeholder: "チャペル（木組みの天井と新婦）",
      src: `${ASSET}/hero.jpg`,
      position: "center",
    },
    // 挙式 → 昼のガーデン → 夜のガーデン。1日の時間の流れをなぞる順に並べる。
    heroSlides: [
      { placeholder: "ガーデンパーティー（昼）", src: `${ASSET}/hero-2.jpg` },
      { placeholder: "ガーデン（夜・キャンドル）", src: `${ASSET}/hero-3.jpg` },
    ],
  },

  // FVを離脱する前に金額だけ持ち帰ってもらうための要約。詳細は privilege 側。
  fvSummary: {
    headline: "最大7万円の来館ギフトがついてくる",
    headlineEmphasis: "最大7万円",
    headlineOrnament: `${ASSET}/fv-summary-ornament.png`,
    label: "来館特典",
    // 写真は privilege と同一。同じ特典なので別カットにすると別物に見える。
    items: [
      {
        amount: "5万円分",
        name: "JCBギフト券",
        image: { placeholder: "ギフトボックス", src: `${ASSET}/gift-card.jpg` },
      },
      {
        amount: "2万円相当",
        name: "飛騨牛&フォアグラなど\n豪華無料試食",
        image: { placeholder: "婚礼料理のコース", src: `${ASSET}/gift-tasting.jpg` },
      },
    ],
    disclaimer: "※特典のお渡しには適用条件がございます",
  },

  grandOffer: {
    eyebrow: "プレミアブライダルフェア",
    heading: "美食 × 自由度を体験",
    headingSize: 29,
    badge: "最大100万円分プレゼント",
    title: "豪華10大特典",
    // 金額はバッジ側に出したので、プレートは中身の説明に充てる。
    // 数字の特大化を切らないと「衣装2着」の 2 だけが巨大になる。
    amount: "衣装2着・装花・映像・引出物など\n結婚式に必要なアイテムがお得に！",
    amountProse: true,
    amountProseEmphasis: "衣装2着",
    frame: `${ASSET}/grand-offer-frame.png`,
  },

  experience: {
    heading: "このフェアで体験できること",
    lead: "チャペルからお料理、お見積りまで。当日のすべてをご確認いただけます。",
    items: [
      {
        tag: "01",
        title: "チャペル見学",
        body: "実際の挙式会場を見学しながら、当日の雰囲気をご体感いただけます。",
        // 支給素材が 688x446 と小さい（他は1400〜1600px）。カード幅は約296pxなので
        // 高精細端末では等倍に届かず、この1枚だけ少し甘く出る。
        image: {
          placeholder: "チャペル（ゲストの祝福を受ける新郎新婦）",
          src: `${ASSET}/chapel.jpg`,
        },
      },
      {
        tag: "02",
        title: "披露宴会場見学",
        body: "披露宴会場をご覧いただきながら、おふたりらしい結婚式をご提案いたします。",
        image: { placeholder: "披露宴会場", src: `${ASSET}/banquet.jpg` },
      },
      {
        tag: "03",
        title: "豪華無料試食",
        body: "シェフ自慢の婚礼料理をご試食いただき、おもてなしのイメージをご確認いただけます。",
        // 来館特典セクションと同じカット（別カットにすると別物の試食に見える）。
        image: { placeholder: "婚礼料理", src: `${ASSET}/gift-tasting.jpg` },
      },
      {
        tag: "04",
        title: "見積もり相談",
        body: "ご予算やご希望の日程に合わせて、専属プランナーが丁寧にご案内いたします。",
        image: {
          placeholder: "プランナーとのお見積り相談カット",
          src: `${ASSET}/planner.jpg`,
        },
      },
    ],
  },

  recommend: {
    heading: "このフェアがおすすめな方",
    items: [
      { label: "初めて式場見学をする", icon: `${ASSET}/rec-planner.png` },
      { label: "何から始めればいいか分からない", icon: `${ASSET}/rec-question.png` },
      { label: "費用が気になる", icon: `${ASSET}/rec-cost.png` },
      { label: "少人数婚も相談したい", icon: `${ASSET}/rec-couple.png` },
    ],
  },

  privilege: {
    heading: "ご来館特典・ご成約特典",
    lead: "フェアにご参加いただいた方にご用意しています。",
    // 合計はここで言い切るので、パネル下部の TOTAL ブロックは出さない（total 未設定）。
    headline: "最大7万円の来館ギフトがついてくる",
    headlineEmphasis: "最大7万円",
    items: [
      {
        title: "JCBギフト券",
        amount: "5万円分",
        image: { placeholder: "ギフトボックス", src: `${ASSET}/gift-card.jpg` },
      },
      {
        title: "飛騨牛&フォアグラなど\n豪華無料試食",
        amount: "2万円相当",
        image: { placeholder: "婚礼料理のコース", src: `${ASSET}/gift-tasting.jpg` },
      },
    ],
    frame: `${ASSET}/privilege-frame.png`,
    disclaimer: "※特典のお渡しには適用条件がございます",
    contract: { label: "さらに、ご成約で", amount: "最大100万円分プレゼント" },
  },

  facility: {
    heading: "会場のご紹介",
    lead: "わたし“らしく”を楽しみ、非日常体験を届けるウエディング",
    // 会場写真がパノラマ（2.08:1）なので、4:3だと左右が大きく切れる。
    aspect: "16 / 9",
    // 説明文は既定12pxだと会場名に対して弱いので一段上げる（顧客指定）。
    bodySize: 13,
    items: [
      {
        tag: "01",
        title: "チャペル",
        body: "木の温もりに包まれた、自然体で誓えるチャペル",
        image: { placeholder: "チャペル", src: `${ASSET}/facility-chapel.jpg` },
      },
      {
        tag: "02",
        title: "貸切パーティー会場",
        body: "ゲストと自由に過ごせる、北欧テイストの貸切空間",
        image: { placeholder: "貸切パーティー会場", src: `${ASSET}/facility-party.jpg` },
      },
      {
        tag: "03",
        title: "一軒家ウエディング",
        body: "1日1組貸切で、ふたりらしい演出も自由自在",
        image: { placeholder: "一軒家ウエディング", src: `${ASSET}/facility-house.jpg` },
      },
      {
        tag: "04",
        title: "久屋大通の森の邸宅",
        body: "都心にいながら、緑と温もりを感じる特別な空間",
        // 支給素材が縦位置（857x1200）で、16:9 で受けると高さの4割しか映らない。
        // 中央だと後ろのビルもゲストも半端に切れるので、少し下に寄せて
        // 「ビルの足元 + 緑 + パーティーの人」が入る帯を出す。
        image: {
          placeholder: "久屋大通の森の邸宅",
          src: `${ASSET}/facility-mansion.jpg`,
          position: "center 58%",
        },
      },
    ],
  },

  flow: {
    heading: "当日の流れ",
    lead: "所要時間：2〜3時間",
    steps: [
      {
        num: "1",
        title: "受付",
        icon: `${ASSET}/flow-01.png`,
        body: "ご希望の結婚式のイメージやご要望をお伺いします。",
      },
      {
        num: "2",
        title: "見学・試食",
        icon: `${ASSET}/flow-02.png`,
        body: "チャペルや披露宴会場を実際にご見学いただきます。また、人気の婚礼メニューをご試食いただけます。",
      },
      {
        num: "3",
        title: "相談・見積り",
        icon: `${ASSET}/flow-03.png`,
        body: "ご予算や日程について詳しくご案内いたします。",
      },
    ],
  },

  access: {
    heading: "アクセス",
    venueName: "The Forest of Lold",
    address: "〒461-0005 名古屋市東区東桜1丁目3-32",
    routes: ["地下鉄名城線・桜通線「久屋大通」3A出口 徒歩2分"],
    // 施設名だけで渡す。Googleマップに会場名で登録済みで、ピンにラベルも出る
    //（2026-09-08 実機確認）。住所を足すと検索結果が住所側に寄ってピンがずれる。
    mapEmbed: { query: "ザ・フォレストオブロルド" },
    map: {
      placeholder: "会場外観",
      src: `${ASSET}/access.jpg`,
      // 支給素材は3:2。16:9 で受けると縦が切れるので、建物の頭と新郎新婦の足元の
      // どちらを残すかの調整。やや上寄せで屋根まで入れ、手前の舗装を落とす。
      position: "center 38%",
    },
  },

  form: {
    heading: "ブライダルフェアのご予約",
    lead: "下記フォームよりご希望の日程をお知らせください。\n担当プランナーよりご連絡いたします。",
    tone: "light",
    fields: [
      { type: "text", name: "name", label: "お名前", required: true, placeholder: "山田 太郎" },
      { type: "tel", name: "tel", label: "電話番号", required: true, placeholder: "090-0000-0000" },
      {
        type: "email",
        name: "email",
        label: "メールアドレス",
        required: true,
        placeholder: "example@mail.com",
      },
      { type: "date", name: "visit_date_1", label: "ご来館希望日（第一希望）", required: true },
      { type: "date", name: "visit_date_2", label: "ご来館希望日（第二希望）", required: true },
      {
        // 挙式の招待人数ではなく、フェア当日に来館する人数。
        // おふたりだけか、ご両親が同席するかで案内の準備が変わる。
        type: "select",
        name: "guests",
        label: "ご来館人数",
        required: true,
        placeholder: "選択してください",
        options: [
          { value: "1", label: "1名" },
          { value: "2", label: "2名" },
          { value: "3", label: "3名" },
          { value: "4over", label: "4名以上" },
        ],
      },
      {
        type: "toggle",
        name: "tasting",
        label: "ご試食の有無",
        required: true,
        columns: 2,
        options: [
          { value: "yes", label: "試食あり" },
          { value: "no", label: "試食なし" },
        ],
      },
      {
        type: "textarea",
        name: "note",
        label: "ご質問・ご相談",
        optionalTag: "任意",
        placeholder: "ご希望の体験内容や、他の日程のご相談などをご自由にお書きください。",
        rows: 4,
      },
    ],
    submitLabel: "この内容で予約する",
    disclaimer:
      "ご入力いただいた内容はご予約対応のみに利用します。\nしつこいご案内はいたしません。",
    errorMessage:
      "お名前・電話番号・メールアドレス・ご来館希望日（第一/第二）・ご人数・ご試食の有無は必須項目です。",
  },

  sticky: {
    offerText: "最大100万円分プレゼント",
    buttonText: "最短30秒で予約",
    anchor: "#form",
  },
};

/*
 * TODO(lold): 差し替え・確認が残っている項目:
 *  - 見積もり相談 / JCBギフト券の写真（会場の実物ではない汎用カット）
 *  - experience 04（見積もり相談）/ recommend / flow はテンプレの原稿のまま
 *  - facility（収容人数は削除済み。必要になったら実数を確認して戻す）
 *  - form（人数・試食の選択肢は案件の原稿に従う）
 */
export default config;
