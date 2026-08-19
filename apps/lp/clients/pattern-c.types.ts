import type { ClientStatus } from "@shared/index";
import type { LPFormField } from "@/components/LPForm";

/**
 * 横スクロールカルーセルの1枚。`experience` と `facility` で共用する。
 * `note` は収容人数など短い補足で、見出し直下に金の小文字で出る。
 */
export interface CarouselItem {
  tag: string;
  title: string;
  body: string;
  note?: string;
  image: Slot;
}

/** An image position in the layout. `src` empty → placeholder box. */
export interface Slot {
  placeholder: string;
  src?: string | null;
  /** CSS object-position for the cropped image (e.g. "38% center"). Default "center". */
  position?: string;
}

/**
 * Pattern C — ブライダルフェア（式場来館予約）LP。
 *
 * パターンA（ピラティス体験）／パターンB（B2B支援パック）とは別系統のデザイン
 * システム。混ぜないこと（CLAUDE.md）。CVは「フェア来館予約」であり、体験入会でも
 * 資料請求でもない。したがって
 *   ・特典を金額つきで並べる（来館特典と成約特典は別セクションで扱う）
 *   ・フェアで体験できることをカルーセルで見せる
 *   ・フォームは来館希望日を必ず取る
 * の3点がパターンCの骨格。
 *
 * `?` が付いたセクションは案件ごとに省略できる。式場によって出せる情報
 * （日程表・ギャラリー・プラン価格・先輩カップルの声）が大きく違うため、
 * 揃わない項目を空欄で埋めるより丸ごと落とすほうが仕上がりが良い。
 * 省略しても page.tsx 側で自動的にセクションごとスキップされる。
 */
export interface PatternCConfig {
  slug: string;
  /** Local fallback status when no clients row exists (dev only). */
  status?: ClientStatus;
  /**
   * `ogpImage` はOGP専用の1枚を 1200x630（1.91:1）で用意する。
   * FVの写真を使い回すとURLが変わらないままFVだけ差し替わり、SNS側のキャッシュが
   * 古い画像を出し続ける。差し替えるときはファイル名も変えてキャッシュを切ること。
   */
  meta: { title: string; description: string; ogpImage?: string };
  /** Base ink color (deep greige/charcoal). */
  ink: string;
  /** Accent (champagne gold) used for CTA and rules. */
  accent: string;
  /** Page background (off-white). */
  paper: string;

  /**
   * 特典バンド（限定特典・来館特典セクション）の配色。
   * 未指定なら「チャコール地 × 生成り文字 × ゴールド」の既定に戻る。
   *
   * ゴールド `#B99653` は中間トーンなので、中間色の地に置くと文字が消える
   * （`#A49483` 上で 1.06:1）。明るい地に変えるときは `accent` / `rule` を濃色に振ること。
   *
   * なお金額はバンドの配色に関係なく、必ず白プレート＋深い金（`goldOnWhite`）で置く。
   * バンド地に直接載せると、一番見せたい桁が一番弱い要素になってしまうため。
   */
  band?: {
    bg: string;
    text: string;
    /** 見出し・英字キッカーなど強調文字の色。 */
    accent: string;
    /** 罫線・区切り線の色。 */
    rule: string;
  };

  header: {
    /** ロゴ未指定時のヘッダー表示。指定時も img の alt に使う。 */
    venue: string;
    venueSub: string;
    /**
     * ロゴ画像。指定すると会場名テキスト2行の代わりに表示する。
     * 縦積みのロゴは `height` を上げないと下段の小さい文字が潰れる。
     */
    logo?: { src: string; height?: number };
    ctaText: string;
  };

  fv: {
    /**
     * キッカーのさらに上に置く会場名。新規オープンで会場名の認知がない場合に使う。
     * フェア名より一段細く出るので、主役はあくまでキャッチ側。
     */
    brand?: string;
    /** Small English kicker above the catch, e.g. "BRIDAL FAIR". */
    kicker: string;
    /** Main catch, one line per array entry. */
    catch: string[];
    /** キャッチの文字サイズ(px)。既定 26。1行に長い文言を収めるときに下げる。 */
    catchSize?: number;
    /**
     * キッカー＋キャッチの配置。既定 "bottom"（オファーと一体で写真下部に重ねる）。
     * "top" にすると写真上部へ寄せ、下部にはオファーだけが残る。
     * 人物が中央〜下寄りの素材で、顔にコピーがかぶるときに使う。
     */
    catchPosition?: "top" | "bottom";
    /**
     * キッカー・キャッチ・`highlight` を1枚のプレートにまとめる（招待状風のタイトルカード）。
     * 3要素がバラけて見えるときに使う。写真に直接白文字を重ねないので、
     * 明るい会場写真でも可読性が安定する。
     */
    framed?: boolean;
    /**
     * プレートの上下に置く飾り罫（唐草など）。`framed` のときだけ効く。
     * 横長の透過PNG/SVGを想定し、プレート幅の `width` ぶんで中央に置く。
     * 上下1対の素材を使う前提なので、片側だけ渡すと収まりが悪くなる。
     */
    ornament?: {
      top?: string;
      bottom?: string;
      /** 既定 "100%"（プレートの内寸いっぱい）。 */
      width?: string;
      /**
       * 高さ(px)。既定 44。幅と高さを両方指定するので画像は縦横比を保たず伸縮する。
       * 素材を横いっぱいに広げてもプレートが縦に伸びないようにするための割り切り。
       */
      height?: number;
    };
    /** 最も強い単一訴求（例 "最大180万円相当 優待"）。金額系はここに置く。 */
    highlight?: string;
    /** 補足リード。`highlight` だけで足りるなら省略してFVを締める。 */
    lead?: string;
    /** Offer chips shown over the hero, e.g. ["来館特典 最大10万円分", "無料試食つき"]. 省略可。 */
    offers?: string[];
    ctaText: string;
    hero: Slot;
    /**
     * 2枚目以降のヒーロー写真。渡すと `hero` を1枚目としたスライドショーになる
     * （CSSのみのクロスフェード＋微速ズーム。JSは使わない）。
     * 全カットが同じトリミングで成立する必要があるので、寄りと引きを混ぜないこと。
     *
     * **人物は必ず写真の下半分に置くこと。** `framed` のプレートがFVの上から約55%を
     * 覆うため、顔がそれより上にあると隠れる。横位置素材を縦長で受けると横しか
     * トリミングされず `position` では上下に動かせないので、素材側を切り直すしかない
     * （実際に3枚とも顔が隠れて切り直した）。
     */
    heroSlides?: Slot[];
    /** ヒーロー写真のアスペクト比。既定 "3 / 4"。横位置素材なら "1 / 1" 等に緩める。 */
    heroAspect?: string;
  };

  /**
   * ブランド紹介。FVの直後・特典サマリーの上に入る。
   * 新規オープンで会場名の認知がない場合に「何者か」を先に伝えるためのもので、
   * 既存の認知がある会場では省く（未設定でセクションごと消える）。
   * `lead` / `body` は `\n` で改行位置を指定できる。
   */
  brand?: {
    /** 例 "2026年6月 GRAND OPEN"。 */
    heading: string;
    /** 見出しの下の3行程度のリード。 */
    lead: string;
    image: Slot;
    /** 写真の下の説明文。 */
    body: string;
  };

  /**
   * FV直下・CTAボタンの上に敷く特典サマリー。ファーストビューを離脱する前に
   * 金額だけ持ち帰ってもらうための要約なので、詳細は `privilege` 側に置く。
   */
  fvSummary?: {
    /** FV写真の直下・`label` の上に置く訴求文。1行に収まる長さにする。 */
    headline?: string;
    /** `headline` の中で金額として強調する部分文字列（21pxの深い金になる）。 */
    headlineEmphasis?: string;
    /**
     * `headline` を囲む装飾（中央が透明のPNG）。横幅いっぱいに自然比で敷き、
     * その高さの中央に文字が乗る。装飾側が高さを決めるので、文字が2行に
     * なるほど長い `headline` には使わない。
     * 375px幅で1行に収まる長さが目安（この文言で左右21pxの余裕）。
     * 320px幅では2行になるが装飾の内側には収まる。
     */
    headlineOrnament?: string;
    /** 中央の小見出し、例 "来館特典"。 */
    label: string;
    /**
     * 3点程度に絞る。横3分割で並ぶため、`amount` は6文字以内が目安。
     * `image` を渡すと各列の頭に正方形のサムネイルが入る（全列に付けるか、全列なしか）。
     * 写真がある場合は列を分ける縦罫が消え、溝で離れる。
     */
    items: { amount: string; name: string; image?: Slot }[];
    /** 金額の右下に小さく置く注記（適用条件など）。 */
    disclaimer?: string;
    note?: string;
    /** `note` の中で金額として強調する部分文字列。含まれない場合は無視される。 */
    noteEmphasis?: string;
  };

  /**
   * 期間限定・グランドオープン等の「成約特典」。来館特典（privilege）とは
   * 金額の桁も条件も違うので別セクションで扱う。
   */
  grandOffer?: {
    eyebrow: string;
    heading: string;
    lead: string;
    /** 対象条件のバッジ、例 "2027年5月までの挙式披露宴が対象"。 */
    badge?: string;
    /** 特典の名前、例 "豪華10大特典"。 */
    title: string;
    /** 金額訴求、例 "最大180万円相当"。 */
    amount: string;
    /**
     * 金額カードに重ねる四隅のフレーム装飾（中央が透明の横長PNG）。
     * カードの縦横比に合わせて伸縮するので、四隅の意匠が対称な素材を使うこと。
     */
    frame?: string;
    /**
     * 目玉特典。**金額プレートとは必ず別カードで描画される。**
     * ひと続きにすると「180万円相当のホテル宿泊券」のように、金額が目玉特典の
     * 中身だと誤読されるため。
     * `image` を渡すと写真を敷いてスクリム＋白文字で載せる（宿泊特典の客室写真など）。
     */
    /** `disclaimer` はカード右下に小さく入る注記（適用条件など）。 */
    feature?: { title: string; body: string; image?: Slot; disclaimer?: string };
    note?: string;
  };

  /** フェア開催日程。日程を公開する案件のみ。 */
  schedule?: {
    heading: string;
    lead: string;
    /** 開催回。`badge` は「残席わずか」等の煽り表示（任意）。 */
    dates: {
      /** 表示用の日付、例 "8/23"。 */
      date: string;
      /** 曜日、例 "土"。 */
      weekday: string;
      /** 時間帯、例 "10:00 / 13:00 / 16:00"。 */
      times: string;
      title: string;
      badge?: string;
    }[];
    note: string;
  };

  /** フェア当日に体験できること（横スクロールのカルーセル）。 */
  experience: {
    heading: string;
    lead: string;
    items: CarouselItem[];
  };

  /**
   * 施設紹介。挙式会場と披露宴会場を1枚ずつ、`experience` と同じカルーセルで見せる。
   * 会場写真はパノラマで支給されることが多いので `aspect` を広げられるようにしてある。
   */
  facility?: {
    heading: string;
    lead: string;
    items: CarouselItem[];
    /** カルーセル画像の比率。既定 "4 / 3"。 */
    aspect?: string;
  };

  /**
   * こんな方におすすめ。
   * `icon` を渡すとイラストアイコンを、渡さなければ金の丸囲みチェックを描く。
   * `label` は1行に収める前提なので、長くても14文字程度までに抑えること
   * （320px幅の端末で折り返さない上限）。
   */
  recommend?: {
    heading: string;
    lead?: string;
    items: { label: string; icon?: string }[];
  };

  /** 来館特典。金額を添えて並べるのがブライダルの慣習。 */
  privilege: {
    heading: string;
    lead: string;
    /**
     * `lead` の下に置く訴求文。バンドの地に載るため、強調は色ではなく級数で付ける
     * （ゴールドは中間トーンの地で消える）。強調部分は `band.accent` になる。
     */
    headline?: string;
    /** `headline` の中で大きく見せる部分文字列。含まれない場合は無視される。 */
    headlineEmphasis?: string;
    /**
     * 横3分割で並べて合計へ収束させる版面。列幅が100px前後しか取れないため説明文は
     * 持たせない。`title` は6文字程度まで、`amount` は「1万円分」等の短い表記に。
     * `image` を渡すと各列の頭に正方形のサムネイルが入る（全列に付けるか、全列なしか）。
     */
    items: { title: string; amount: string; image?: Slot }[];
    /** パネルに重ねる四隅のフレーム装飾（中央が透明のPNG）。`grandOffer.frame` と同じ扱い。 */
    frame?: string;
    /** パネル直下・右寄せの注記（適用条件など）。カードの外に出る。 */
    disclaimer?: string;
    /**
     * 特典合計の訴求、例 "最大10万円分"。省略するとパネル下部の TOTAL ブロック
     * （罫・TOTAL・合計額）ごと消える。合計を `headline` 側で言う場合は省略する。
     */
    total?: string;
    totalNote?: string;
    /** 成約特典への導線をこのセクションの末尾に置く場合。 */
    contract?: { label: string; amount: string };
  };

  /** 会場ギャラリー（横スクロール）。 */
  gallery?: {
    heading: string;
    lead: string;
    photos: (Slot & { caption: string })[];
  };

  /** 選ばれる理由。 */
  reasons?: {
    heading: string;
    items: { num: string; title: string; body: string; image: Slot }[];
  };

  /** プラン例（二重価格表記を使う場合は `was` を入れる）。 */
  plan?: {
    heading: string;
    lead: string;
    items: {
      name: string;
      guests: string;
      was?: string;
      price: string;
      includes: string[];
    }[];
    note: string;
  };

  /** 先輩カップルの声。 */
  voices?: {
    heading: string;
    items: { name: string; date: string; body: string; image: Slot }[];
  };

  /**
   * フェア当日の流れ。
   * `icon` は「STEP番号｜アイコン｜テキスト」の3カラムで並ぶ。全ステップに付けるか、
   * 全ステップなしか（一部だけだと列が歯抜けになる）。無い場合は2カラムで組む。
   */
  flow: {
    heading: string;
    lead: string;
    steps: { num: string; title: string; time?: string; body: string; icon?: string }[];
  };

  faq?: { heading: string; items: { q: string; a: string }[] };

  /** 会場案内。`tel` は trackEvent('tel_tap') 付きで発火する（規約4）。 */
  access: {
    heading: string;
    venueName: string;
    address: string;
    /** 交通経路。1行1経路で、そのまま太字で並ぶ。空配列なら経路リストを出さない。 */
    routes: string[];
    tel: string;
    /**
     * 電話番号を `tel:` リンクにするか。既定 true。
     * false にするとプレーンテキストになり、`trackEvent('tel_tap')` も発火しない
     * （＝ダッシュボードの tel_tap は計測されない）。WEBからの問い合わせに寄せたい案件で使う。
     */
    telLink?: boolean;
    /** 電話番号の下の補足（受付時間など）。不要なら省略する。 */
    telNote?: string;
    map: Slot;
  };

  /** 予約概要（適用期間・組数制限などの但し書き）。 */
  overview?: {
    heading: string;
    items: { label: string; value: string }[];
    note?: string;
  };

  form: {
    heading: string;
    lead: string;
    /**
     * 予約フォームセクションの地。既定 "dark"（濃色地で締める）。
     * "light" にすると生成り地＋白いフォームカードになり、明るいトーンの
     * 会場写真を使ったLPで全体の印象が揃う。
     */
    tone?: "dark" | "light";
    fields: LPFormField[];
    submitLabel: string;
    disclaimer: string;
    errorMessage: string;
  };

  sticky: {
    offerText: string;
    buttonText: string;
    anchor: string;
    showAfter?: number;
  };
}
