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
    /** 最も強い単一訴求（例 "最大180万円相当 優待"）。金額系はここに置く。 */
    highlight?: string;
    /** 補足リード。`highlight` だけで足りるなら省略してFVを締める。 */
    lead?: string;
    /** Offer chips shown over the hero, e.g. ["来館特典 最大10万円分", "無料試食つき"]. 省略可。 */
    offers?: string[];
    ctaText: string;
    hero: Slot;
    /** ヒーロー写真のアスペクト比。既定 "3 / 4"。横位置素材なら "1 / 1" 等に緩める。 */
    heroAspect?: string;
  };

  /**
   * FV直下・CTAボタンの上に敷く特典サマリー。ファーストビューを離脱する前に
   * 金額だけ持ち帰ってもらうための要約なので、詳細は `privilege` 側に置く。
   */
  fvSummary?: {
    /** 中央の小見出し、例 "来館特典"。 */
    label: string;
    /** 3点程度に絞る。横3分割で並ぶため、`amount` は6文字以内が目安。 */
    items: { amount: string; name: string }[];
    note: string;
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
     * 目玉特典をもう一段強調したいとき。
     * `image` を渡すと写真を敷いてスクリム＋白文字で載せる（宿泊特典の客室写真など）。
     */
    feature?: { title: string; body: string; image?: Slot };
    note: string;
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
     * パネル上端に敷く写真。既出のカット（チャペル・料理・客室・会場・外観）と
     * 被らない絵を選ぶこと。無い場合はセクションが文字と枠だけになる。
     */
    image?: Slot;
    /**
     * 横3分割で「＋」で繋いで合計へ収束させる版面。カード幅が100px前後しか取れないため
     * 説明文は持たせない。`title` は6文字程度まで、`amount` は「1万円分」等の短い表記に。
     */
    items: { title: string; amount: string }[];
    /** 特典合計の訴求、例 "最大10万円分"。 */
    total: string;
    totalNote: string;
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

  /** フェア当日の流れ。 */
  flow: {
    heading: string;
    lead: string;
    steps: { num: string; title: string; time?: string; body: string }[];
  };

  faq?: { heading: string; items: { q: string; a: string }[] };

  /** 会場案内。`tel` は trackEvent('tel_tap') 付きで発火する（規約4）。 */
  access: {
    heading: string;
    venueName: string;
    address: string;
    /** 空配列なら経路リストを出さない。 */
    routes: string[];
    tel: string;
    telNote: string;
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
