import type { PatternCConfig } from "@/clients/pattern-c.types";

const ASSET = "/clients/lold-02";

/**
 * ザ・フォレストオブロルド — ブライダルフェア（パターンC）／ABテストB案。
 *
 * `lold` の複製（2026-09-28 時点で中身は完全に同一）。同じ会場・同じフェアの
 * 別クリエイティブを並走させ、広告のリンク先を出し分けて比較するためのもの。
 * 画像も `public/clients/lold-02/` に実体を持たせてあるので、A案を触っても
 * こちらは動かない。**差分はこの config.ts に閉じる**（`page.tsx` /
 * `FaqAccordion.tsx` / `TelLink.tsx` は `_base-c` と同一コピーのまま）。
 *
 * 計測は A案と同じ Meta ピクセルを共有する（運用の指定）。Meta の管理画面では
 * 同一ピクセルに集約されるので、ABの比較は広告セット側のリンク先URLで分ける。
 *
 * 金額・適用条件・日付は顧客確認を取ってから変更すること。
 */
const config: PatternCConfig = {
  slug: "lold-02",
  status: "draft",
  meta: {
    title: "ザ・フォレストオブロルド｜AUTUMN WEDDING CAMPAIGN",
    // A案（lold）は「フェアの予約」、B案は「キャンペーンへの応募」。
    // 抽選であること・締切があること・応募が30秒で済むことを本文に入れる。
    description:
      "「ザ・フォレストオブロルド」10月限定のAUTUMN WEDDING CAMPAIGN。抽選で10組様に、ご成約で最大100万円相当の特典をプレゼント。ご来館だけでも最大5万円分の特典付きです。応募締切は2026年10月20日(火)、フォームは最短30秒で送信できます。",
    // OGP専用の1枚（1200x630）。会場紹介のチャペル写真から切り出したもので、
    // ファイルは別に持つ。共用すると写真を差し替えてもURLが変わらず、
    // SNS側のキャッシュが古い画像を出し続ける（実際に発生）。
    // 差し替えるときは必ずファイル名も変えること。
    ogpImage: `${ASSET}/ogp-2026-09-11.jpg`,
  },
  ink: "#3B3730",
  accent: "#B99653",
  // A案の #FBF8F3 より黄みに振った生成り。ページ全体の地をわずかに温めて秋に寄せる
  // （差は小さいが全面に効くので、写真とバンドの温かさと喧嘩しない）。
  paper: "#FAF5EB",

  // 特典バンド（限定特典・来館特典）。地・文字とも顧客指定（#A49483 × 白）。
  // 白 on #A49483 は 2.9:1 で WCAG AA（4.5:1／大文字3:1）には届かないが、
  // 見た目の指定を優先するという判断。ここに載るのは見出しと補足のみで、
  // 金額はすべて白プレート＋深い金（4.9:1）に逃がしてある。
  band: {
    // A案の #A49483 より一段温かく・濃く振った枯葉色。白見出しのコントラストも
    // 2.94:1 → 3.76:1 に上がる（21pxの大きい文字の基準3:1を満たす）。
    bg: "#9A7F63",
    text: "#FFFFFF",
    accent: "#FFFFFF",
    rule: "rgba(255,255,255,0.5)",
  },

  header: {
    // 英字表記は支給ロゴの表記に合わせている。
    venue: "The Forest of Lold",
    // ヘッダーを薄くする指定（B案の差分）。高さ = ロゴ24 + 余白6×2 + 罫線1 = 37px で、
    // A案の75pxのほぼ半分。ロゴタイプは約7pxになり文字としては読めないが、
    // 紋章のシルエットで会場を示す割り切り。
    logo: { src: `${ASSET}/logo.png`, height: 24 },
    paddingY: 6,
    // CTAボタンは非表示。追従バーが常時出ているので導線は確保されている。
    // ヘッダーは追従させない（顧客指定）。
    sticky: false,
  },

  fv: {
    brand: "ザ・フォレストオブロルド",
    kicker: "＼10月限定キャンペーン／",
    // 英字前提のキッカー枠なので、数字を明朝の立体に逃がさないと "1o" に見える。
    kickerEmphasis: "10",
    catch: ["AUTUMN WEDDING CAMPAIGN"],
    // 自動調整は和文基準（半角0.62em）なので、大文字の英字だと幅を過小評価して
    // 2行に折り返す（24.26px で 403px、プレート内寸は344px）。実測で1行に収まる
    // 上限が20px（335px）なので明示する。
    catchSize: 20,
    // キッカー・キャッチ・訴求を1枚のプレートにまとめる。
    framed: true,
    ornament: {
      // 秋仕様。金の渦からもみじ・銀杏の枝＋中央の金罫に差し替える（B案の差分）。
      top: `${ASSET}/autumn-ornament-top.png`,
      bottom: `${ASSET}/autumn-ornament-bottom.png`,
      // 新しい絵は枝が枠の高さいっぱいまで入っていて上下の空きが無いので、
      // 金の渦のときのような負のツメ（-20 / -14）は入れない。
      // 素材の腕をそのまま使えるだけの高さを取る（既定44では枝が小さくなりすぎる）。
      // 版面の縦横比はプレート内寸344px÷この値に合わせてあるので、値を変えるなら
      // 画像も作り直すこと。上 900x126 / 下 900x131。
      height: 48,
      // 罫は版面の中央なので、枝の上下は絵として空く。負の値でその空きぶんを詰め、
      // カードの縦を元の高さより伸ばさない。
      gap: -10,
      heightBottom: 50,
      gapBottom: -16,
    },
    highlight: "最大100万円相当プレゼント",
    // 既定22pxから一段下げる（顧客指定）。
    highlightSize: 19,
    // 金額の言い切りを受ける一言（B案の差分）。
    highlightSub: "お得なブライダルフェアへご招待",
    // FV下端のゴールド帯。締切で今すぐ動く理由を作る（B案の差分）。
    noticeBand: "応募締切：2026年10月20日(火)まで",
    // タイトルカードの左下に重ねる当選枠のバッジ（B案の差分）。
    // 中央寄せの訴求文（左端 70.5px）と重ならないよう、左へ逃がして少し小さくする。
    plateBadge: { lines: ["抽選で", "10組様"], size: 88, left: -10, bottom: -40 },
    // リードとオファーチップは顧客要望で非表示。FVは訴求を highlight 1点に絞る。
    ctaText: "キャンペーンに応募",
    // 新郎新婦が写真中央にいるため、キャッチを上に逃がして顔にかぶらないようにする。
    catchPosition: "top",
    // カード上のアキを左右（12px）に揃える（B案の差分）。
    catchTopInset: 12,
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
    headline: "今なら！\n最大5万円分来館特典付き",
    headlineEmphasis: "最大5万円分",
    headlineOrnament: `${ASSET}/fv-summary-ornament.png`,
    label: "来館特典",
    // 写真は privilege と同一。同じ特典なので別カットにすると別物に見える。
    items: [
      {
        amount: "2万円分",
        name: "ギフト券orカタログギフト",
        image: { placeholder: "ギフトボックス", src: `${ASSET}/gift-card.jpg` },
      },
      {
        amount: "3万円相当",
        name: "飛騨牛など豪華無料試食",
        image: { placeholder: "婚礼料理のコース", src: `${ASSET}/gift-tasting.jpg` },
      },
    ],
    disclaimer: "※特典のお渡しには適用条件がございます",
  },

  grandOffer: {
    eyebrow: "AUTUMN WEDDING CAMPAIGN",
    heading: "美食 × 自由度を体験",
    headingSize: 29,
    badge: "最大100万円分プレゼント",
    title: "豪華10大特典",
    // 金額はバッジ側に出したので、プレートは中身の説明に充てる。
    // 数字の特大化を切らないと「衣装2着」の 2 だけが巨大になる。
    amount: "衣装2着・装花・映像・引出物など\n結婚式に必要なアイテムがお得に！",
    amountProse: true,
    amountProseEmphasis: "衣装2着",
    // 秋仕様。バラの線画からもみじ・銀杏の水彩の枠に差し替える（B案のみ）。
    frame: `${ASSET}/autumn-frame.png`,
  },

  experience: {
    heading: "キャンペーン当選で体験できること",
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
    heading: "こんな方におすすめ",
    items: [
      { label: "これから\n式場を探し始める", icon: `${ASSET}/rec-planner.png` },
      { label: "何から始めれば\nいいか分からない", icon: `${ASSET}/rec-question.png` },
      { label: "費用が気になる", icon: `${ASSET}/rec-cost.png` },
      { label: "自分たちのスタイルに\n合った結婚式を挙げたい", icon: `${ASSET}/rec-couple.png` },
    ],
  },

  privilege: {
    heading: "豪華当選特典",
    // 合計はここで言い切るので、パネル下部の TOTAL ブロックは出さない（total 未設定）。
    headline: "今なら！\n最大5万円分来館特典付き",
    headlineEmphasis: "最大5万円分",
    items: [
      {
        title: "ギフト券orカタログギフト",
        amount: "2万円分",
        image: { placeholder: "ギフトボックス", src: `${ASSET}/gift-card.jpg` },
      },
      {
        title: "飛騨牛など豪華無料試食",
        amount: "3万円相当",
        image: { placeholder: "婚礼料理のコース", src: `${ASSET}/gift-tasting.jpg` },
      },
    ],
    frame: `${ASSET}/autumn-frame.png`,
    // 見出しまわりの余白に落ち葉を薄く敷く。枯葉色の地に同系色なので、
    // 透過を上げると柄になってしまう。0.2 前後で「地の気配」に留める。
    decor: [
      // 傾けると外接矩形が size より一回り大きくなる。キャンバスは overflow-x: clip なので、
      // 左右の余白はその増分（maple 約9px / ginkgo 約9px）より大きく取ること。
      { src: `${ASSET}/autumn-leaf-maple.png`, size: 74, top: 16, left: 12, rotate: -18 },
      { src: `${ASSET}/autumn-leaf-ginkgo.png`, size: 56, top: 92, right: 12, rotate: 24 },
      { src: `${ASSET}/autumn-leaf-brown.png`, size: 44, top: 8, right: 62, rotate: 34, opacity: 0.16 },
    ],
    disclaimer: "※特典のお渡しには適用条件がございます",
    contract: {
      label: "さらに、ご成約で",
      amount: "最大100万円分プレゼント",
      // 100万円は抽選の賞。FVと同じスタンプを金額に添えて、条件が金額から離れないようにする。
      badge: { lines: ["抽選で", "10組様"] },
    },
    // FVと同じキャンペーンの枠をこのセクションにも被せる（中盤から読み始めた人向け）。
    campaign: {
      kicker: "＼10月限定キャンペーン／",
      notice: "応募締切：2026年10月20日(火)まで",
      // 顧客指定で白抜き（FV下部の帯は ink のまま）。
      // ブランドゴールドのままだと白は 2.2:1 で読めないので、地を深い金に振る。
      // 濃い側 #6B4F20 で 7.6:1、明るい側 #8C6B2F で 4.9:1。どこを取ってもAAを満たす。
      // #8C6B2F は金額に使っている深い金と同じ色なので、色数は増えない。
      noticeColor: "#FFFFFF",
      noticeBg: "linear-gradient(135deg, #6B4F20 0%, #8C6B2F 100%)",
    },
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
        // アクセスと同一カット。同じ建物なので別カットにすると別物に見える。
        // 3:2 の素材を 16:9 で受けるので、上寄せで建物の頭と館銘板を残し、
        // 手前の舗装を落とす。
        image: {
          placeholder: "一軒家ウエディング（会場外観）",
          src: `${ASSET}/venue-exterior.jpg`,
          position: "center top",
        },
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

  // B案は「当日の流れ」ではなく、応募から抽選・来館・成約までの全体の流れを見せる。
  // アイコンは付けない（手持ちは3点＝プランナー／チャペル／署名だけで、抽選・プレゼントに
  // 当たる絵が無く、5ステップ中2つが空の丸になるため）。icon を省くと page.tsx が
  // アイコン列ごと落として「番号｜本文」の2カラムで組む。
  flow: {
    heading: "応募からご成約までの流れ",
    // 5ステップを1枚のカードで囲む（B案の差分）。
    card: true,
    steps: [
      {
        num: "1",
        title: "フォームを送信",
        time: "約30秒",
        body: "むずかしいご記入はありません。まずはお気軽にご応募ください。",
      },
      {
        num: "2",
        title: "抽選",
        body: "ご応募いただいた方の中から、抽選で10組様を決定します。",
      },
      {
        num: "3",
        title: "当選のご連絡",
        body: "当選されたお客様へ、式場の担当者よりご連絡します。",
      },
      {
        num: "4",
        title: "ご来館日の確定・ご来館",
        time: "所要2時間ほど",
        body: "ご都合のよい日時を調整のうえ、会場のご見学とお料理のご試食をお楽しみください。",
      },
      {
        num: "5",
        title: "ご成約でプレゼント適用",
        body: "ご来館いただくと、5万円分の特典付き。さらに、ご成約で最大100万円相当の特典をプレゼント。",
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
      src: `${ASSET}/venue-exterior.jpg`,
      // 3:2 の素材を 16:9 で受けるので上下が切れる。上寄せで建物の頭と
      // 館銘板（LOLD THE VENUE）を残し、手前の舗装を落とす。
      position: "center top",
    },
  },

  form: {
    // B案は予約導線を「キャンペーンへの応募」として見せる。
    heading: "キャンペーン概要",
    kicker: "CAMPAIGN",
    // 特典セクションと同じ落ち葉を、見出しまわりの余白に敷く。
    // 地が生成りで葉と近い色なので、バンド（0.16〜0.2）より少し濃く取る。
    decor: [
      { src: `${ASSET}/autumn-leaf-ginkgo.png`, size: 62, top: 18, left: 12, rotate: -22, opacity: 0.28 },
      { src: `${ASSET}/autumn-leaf-maple.png`, size: 72, top: 78, right: 14, rotate: 20, opacity: 0.28 },
      { src: `${ASSET}/autumn-leaf-brown.png`, size: 44, top: 10, right: 72, rotate: 36, opacity: 0.22 },
    ],
    lead: "下記フォームよりお気軽にご応募ください。",
    // 「下記フォーム」を指す文面なので、条件プレートの下＝入力欄の直前に置く。
    leadAfterEligibility: true,
    cardTitle: "応募フォーム",
    tone: "light",
    eligibility: {
      // 見出しは書体と色で立てるので【】は不要。
      title: "対象となる方",
      items: [
        "おふたり揃ってフェアに参加できる方",
        "当式場のフェアに初めて参加される方",
      ],
      note: "※すでにご予約済みの方は対象外です",
    },
    // B案は来館日をフォームで取らず、想い＋任意の条件だけ聞いて送信の手数を減らす。
    // 日程はプランナーからの折り返しで調整する運用（A案との差分の主眼）。
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
      {
        type: "textarea",
        name: "wedding_wish",
        label: "結婚式への想い",
        optionalTag: "任意",
        placeholder: "結婚式への想いをご自由にお書きください",
        rows: 4,
      },
      {
        type: "select",
        name: "wedding_timing",
        label: "挙式時期",
        optionalTag: "任意",
        placeholder: "選択してください",
        options: [
          { value: "3m", label: "3ヶ月以内" },
          { value: "6m", label: "6ヶ月以内" },
          { value: "1y", label: "1年以内" },
          { value: "unset", label: "未定" },
        ],
      },
      {
        // 挙式に招待する人数の目安。フェア当日の来館人数ではない。
        type: "select",
        name: "guests",
        label: "挙式人数",
        optionalTag: "任意",
        placeholder: "選択してください",
        options: [
          { value: "o20", label: "20名以上" },
          { value: "o30", label: "30名以上" },
          { value: "o40", label: "40名以上" },
          { value: "unset", label: "未定" },
        ],
      },
    ],
    // 送信後はサンクスページへ。LINEの友だち追加まで運ぶのが狙い（B案の差分）。
    thanksHref: "/lold-02/thanks",
    submitLabel: "この内容で応募する",
    disclaimer:
      "ご入力いただいた内容はご予約対応のみに利用します。\nしつこいご案内はいたしません。",
    errorMessage: "お名前・電話番号・メールアドレスは必須項目です。",
  },

  sticky: {
    offerText: "最大100万円分が当たる",
    buttonText: "キャンペーンに応募",
    anchor: "#form",
  },
};

/*
 * TODO(lold): 差し替え・確認が残っている項目:
 *  - 見積もり相談 / ギフト券の写真（会場の実物ではない汎用カット）
 *  - experience 04（見積もり相談）/ recommend / flow はテンプレの原稿のまま
 *  - facility（収容人数は削除済み。必要になったら実数を確認して戻す）
 *  - form（挙式時期・挙式人数の選択肢は案件の原稿に従う）
 */
export default config;
