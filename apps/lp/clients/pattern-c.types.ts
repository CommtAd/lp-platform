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
 * セクションの地に散らす飾り（季節の葉など）。見出しまわりの余白を埋めるためのもので、
 * 位置は設計幅390px基準の絶対値で指定する。
 *
 * セクションに overflow を足して切る運用はしない（§18）ので、`size` と位置はキャンバスから
 * はみ出さない値にすること。**傾けると外接矩形が `size` より一回り大きくなる**ので、
 * 左右の余白はその増分より大きく取る。文字の下に敷くだけなので `opacity` は低めに取り、
 * 読みの邪魔をしないこと。
 */
export interface SectionDecor {
  src: string;
  size: number;
  top?: number;
  left?: number;
  right?: number;
  rotate?: number;
  /** 既定 0.2。 */
  opacity?: number;
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
    /** ロゴ未指定時に会場名の下へ出る補足。省略すると行ごと出ない。 */
    venueSub?: string;
    /**
     * ロゴ画像。指定すると会場名テキスト2行の代わりに表示する。
     * 縦積みのロゴは `height` を上げないと下段の小さい文字が潰れる。
     */
    logo?: { src: string; height?: number };
    /**
     * ヘッダー右のCTAボタン。省略するとボタンごと出ず、ロゴが中央寄せになる
     *（片側だけ要素が残ると左に寄って見えるため）。
     */
    ctaText?: string;
    /**
     * ヘッダーの上下の余白(px)。既定 14。
     * ヘッダーの高さは「ロゴの高さ + これ×2 + 罫線1px」で決まるので、
     * 薄くしたいときは `logo.height` と合わせて下げる。
     */
    paddingY?: number;
    /**
     * ヘッダーをスクロールに追従させるか。既定 true。
     * false にすると先頭に置いたままになり、スクロールすると流れて消える。
     */
    sticky?: boolean;
  };

  fv: {
    /**
     * キッカーのさらに上に置く会場名。新規オープンで会場名の認知がない場合に使う。
     * フェア名より一段細く出るので、主役はあくまでキャッチ側。
     */
    brand?: string;
    /** Small English kicker above the catch, e.g. "BRIDAL FAIR". */
    kicker: string;
    /**
     * `kicker` の中で明朝の立体に落とす部分文字列。含まれない場合は無視される。
     *
     * キッカーの枠は英字前提（Playfair Display のイタリック）なので、和文キッカーに
     * 数字を混ぜると数字だけイタリックの楕円になり "10" が "1o" に見える。
     * 数字を含む和文キッカーを使うときはここに数字部分を渡す。
     */
    kickerEmphasis?: string;
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
     * `catchPosition: "top"` のとき、FV上端からカードまでのアキ(px)。既定 28。
     * 左右のアキ（`framed` なら12px）に揃えたいときに下げる。
     */
    catchTopInset?: number;
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
      /**
       * 下の飾りだけ高さを変えたいときに指定する(px)。既定は `height`。
       * 上下で絵柄が違う（下だけ片側に寄せた、など）場合に使う。
       * 画像の縦横比もこの高さに合わせて作り直すこと。
       */
      heightBottom?: number;
      /**
       * 上の飾りと本文の間のアキ(px)。既定 6。**負の値も入る。**
       * 飾りは両端が渦・中央が細い罫線という絵柄なので、中央下は絵として空く。
       * その空きが気になるときは負の値で本文を引き上げる（中央寄せの文字は
       * 両端の渦とは重ならない）。
       */
      gap?: number;
      /** 下の飾りと本文の間のアキ(px)。既定 6。`gap` と同じく負の値も入る。 */
      gapBottom?: number;
    };
    /** 最も強い単一訴求（例 "最大180万円相当 優待"）。金額系はここに置く。 */
    highlight?: string;
    /**
     * `highlight` の文字サイズ(px)。既定は `framed` なら22、単独プレートなら17。
     * 文言を詰めて余白が空いたときなどに一段落とす用途。
     */
    highlightSize?: number;
    /**
     * `highlight` の直下に置く一言。金額の言い切りを受ける補足で、
     * 金額より一段小さく本文色で出る。1行に収まる長さにすること。
     */
    highlightSub?: string;
    /** `highlightSub` の文字サイズ(px)。既定 15。 */
    highlightSubSize?: number;
    /**
     * FV最下部に敷くゴールドの帯。締切など「今すぐ動く理由」を1行で置く。
     * 省略すると帯ごと出ない。長い文言は入らないので1行に収まる長さにすること。
     * 金地に濃い文字で出る（白文字は金地で 2.2:1 しか出ず読めない）。
     */
    noticeBand?: string;
    /**
     * タイトルカードの左下に重ねる円形バッジ（当選枠など）。`framed` のときだけ効く。
     * `lines` は1行目が小さく、2行目以降が大きくなる（「抽選で」＋「10組様」の形）。
     * 円に収まる長さにすること（1行目5文字・2行目4文字程度が上限）。
     * `bg` 未指定は深めのローズ `#B0475F`。わずかに傾けてスタンプ風に出る。
     */
    plateBadge?: {
      lines: string[];
      bg?: string;
      /** 直径(px)。既定 86。 */
      size?: number;
      /** カード左端からの位置(px)。既定 -8（負でカードの外へ出る）。 */
      left?: number;
      /** カード下端からの位置(px)。既定 -20（負でカードの下へ出る）。 */
      bottom?: number;
    };
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
    /**
     * `heading` と `lead` の文字色。未指定なら本文色（ink）。
     * 明るい地の上に薄い色を置くと読めなくなるので、指定するときは
     * 白地とのコントラストを確認すること（本文は4.5:1、大きな見出しは3:1が目安）。
     */
    accent?: string;
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
    /** `name` は `\n` で改行位置を指定できる。 */
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
    /** `heading` の文字サイズ(px)。既定 21。 */
    headingSize?: number;
    /** 見出し下のリード。省略すると行ごと出ない。 */
    lead?: string;
    /** 対象条件のバッジ、例 "2027年5月までの挙式披露宴が対象"。 */
    badge?: string;
    /** 特典の名前、例 "豪華10大特典"。 */
    title: string;
    /** 金額訴求、例 "最大180万円相当"。数字部分は自動で特大になる。 */
    amount: string;
    /**
     * `amount` を金額ではなく説明文として組む。数字の特大化をやめ、`\n` の行ごとに
     * 積んで読ませる。金額をバッジ側に出して、プレートでは特典の中身を説明する
     * ときに使う（"衣装2着…" のような文言だと 2 だけが巨大になってしまうため）。
     */
    amountProse?: boolean;
    /** `amountProse` のとき、この語を含む行だけ深い金の大きめにする。 */
    amountProseEmphasis?: string;
    /** `amountProse` の基準文字サイズ(px)。既定 13（強調行はこれ +4）。 */
    amountProseSize?: number;
    /**
     * 金額カードに重ねる四隅のフレーム装飾（中央が透明の横長PNG）。
     * カードの縦横比に合わせて伸縮するので、四隅の意匠が対称な素材を使うこと。
     */
    frame?: string;
    /**
     * 金額カードの中、`title` の下に並べる写真（特典の中身。旅行券・カタログギフトなど）。
     * 2〜3枚を横並び・4:3で受ける。`caption` は写真の下に小さく出る。
     * 渡すとカードの高さが伸びるので、`frame` は四隅を自然比で貼る版（CornerFrame）に切り替わる。
     */
    images?: (Slot & { caption?: string })[];
    /**
     * 目玉特典。**金額プレートとは必ず別カードで描画される。**
     * ひと続きにすると「180万円相当のホテル宿泊券」のように、金額が目玉特典の
     * 中身だと誤読されるため。
     * `image` を渡すと写真を敷いてスクリム＋白文字で載せる（宿泊特典の客室写真など）。
     */
    /** `disclaimer` はカード右下に小さく入る注記（適用条件など）。 */
    /**
     * `amount` は title と body の間に置く金額（例 "最大100万円相当"）。
     * 数字部分は金額プレートと同じく自動で特大になる。省略すると出ない。
     */
    feature?: {
      title: string;
      body: string;
      amount?: string;
      image?: Slot;
      disclaimer?: string;
    };
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
    /** 説明文の文字サイズ(px)。既定 12。 */
    bodySize?: number;
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
    /**
     * `label` は `\n` で改行位置を指定できる。文字サイズは最長行に合わせて自動で
     * 決まるので、長い項目は改行を入れたほうが大きく出る。
     */
    items: { label: string; icon?: string }[];
  };

  /** 来館特典。金額を添えて並べるのがブライダルの慣習。 */
  privilege: {
    heading: string;
    /** 見出しの下のリード。省略すると行ごと出ない。 */
    lead?: string;
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
    /** `title` は `\n` で改行位置を指定できる。 */
    items: { title: string; amount: string; image?: Slot }[];
    /** パネルに重ねる四隅のフレーム装飾（中央が透明のPNG）。`grandOffer.frame` と同じ扱い。 */
    frame?: string;
    /** セクションの地に散らす飾り（季節の葉など）。`SectionDecor` 参照。 */
    decor?: SectionDecor[];
    /** パネル直下・右寄せの注記（適用条件など）。カードの外に出る。 */
    disclaimer?: string;
    /**
     * 特典合計の訴求、例 "最大10万円分"。省略するとパネル下部の TOTAL ブロック
     * （罫・TOTAL・合計額）ごと消える。合計を `headline` 側で言う場合は省略する。
     */
    total?: string;
    totalNote?: string;
    /** 成約特典への導線をこのセクションの末尾に置く場合。 */
    contract?: {
      label: string;
      amount: string;
      /**
       * 金額の左上に重ねるローズのスタンプ（FVのプレートバッジと同じ見た目）。
       * 抽選など、金額に付く条件を金額と切り離さずに見せるためのもの。
       */
      badge?: { lines: string[]; size?: number; bg?: string };
    };
    /**
     * FVで出しているキャンペーンの枠を、このセクションにも被せる。
     * 中盤から読み始めた人にも「期間限定であること」「締切」が伝わるようにするためのもの。
     */
    campaign?: {
      /** リードの下・パネルの上に置く和文のキッカー（例 "＼10月限定キャンペーン／"）。 */
      kicker?: string;
      /** セクション末尾に全幅で敷く金の帯（応募締切など）。 */
      notice?: string;
      /**
       * 帯の文字色。既定は ink。
       * ブランドゴールドの地に白は 2.2:1 しか出ない（ink なら 5.3:1）。
       * 白抜きにするなら `noticeBg` で地を濃い金に振って 4.5:1 を確保すること。
       */
      noticeColor?: string;
      /**
       * 帯の地。既定は CTA と同じゴールドのグラデーション。
       * 白抜きにするときだけ、深い金のグラデーションなどに差し替える。
       */
      noticeBg?: string;
    };
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
    /** 見出しの下に囲みで置く一行（所要時間など）。省略すると囲みごと出ない。 */
    lead?: string;
    /**
     * ステップ全体を1枚のカードで囲む。既定は囲みなし（地に直接組む）。
     * 前後のセクションと地続きに見えるときに、ここだけ独立させたい場合に使う。
     */
    card?: boolean;
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
    /** 電話番号。省略すると電話の枠ごと出ない（WEB導線だけで受ける案件向け）。 */
    tel?: string;
    /**
     * 電話番号を `tel:` リンクにするか。既定 true。
     * false にするとプレーンテキストになり、`trackEvent('tel_tap')` も発火しない
     * （＝ダッシュボードの tel_tap は計測されない）。WEBからの問い合わせに寄せたい案件で使う。
     */
    telLink?: boolean;
    /** 電話番号の下の補足（受付時間など）。不要なら省略する。 */
    telNote?: string;
    /**
     * Googleマップの埋め込み。APIキーは不要（`output=embed`）。
     * `query` は Google に登録済みの施設名だけを渡すのが基本。住所を足すと
     * 検索結果が住所側に寄ってピンが中央から外れることがある（実際に発生）。
     * 施設名で一意に決まらない場合だけ住所を併記する。
     * 埋め込みはGoogleのCookieを読むので、同意が必要な案件では設定しない。
     * 地図の下には経路リンク（`maps/dir`）が自動で付く。スクロール中に地図を
     * 踏むと画面が持っていかれるため、地図アプリへの導線を別に確保している。
     */
    mapEmbed?: {
      query: string;
      /** 埋め込みの高さ(px)。既定 220。 */
      height?: number;
      /** ズーム。既定 16（建物が特定できる程度）。 */
      zoom?: number;
      /** 経路リンクの文言。既定「Googleマップで経路を見る」。 */
      linkLabel?: string;
    };
    /** 外観写真または地図キャプチャ。`mapEmbed` とは別枠で、両方出せる。 */
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
    /** セクションの地に散らす飾り（季節の葉など）。`SectionDecor` 参照。 */
    decor?: SectionDecor[];
    /**
     * セクション上の英字キッカー。既定 "RESERVATION"。
     * 見出しを「キャンペーン概要」のように予約以外の語に変えたときだけ差し替える。
     */
    kicker?: string;
    /**
     * 送信成功後に遷移する先。省略するとページ内で完了カードに差し替わる（既定）。
     * サンクスページを用意して別導線（LINE登録など）に運ぶ案件だけ指定する。
     * 遷移先は `clients/{slug}/thanks.tsx` と `clientThanksRegistry` で用意すること。
     */
    thanksHref?: string;
    /**
     * フォームカードの中・最初の入力欄の上に置く見出し（例 "応募フォーム"）。
     * 省略すると出ない。
     */
    cardTitle?: string;
    /**
     * `lead` を見出しの直下ではなく、応募条件プレートの下＝フォームの直前に置く。
     * リードが「下記フォームより〜」のように、直後の入力欄を指す文面のときに使う。
     */
    leadAfterEligibility?: boolean;
    /**
     * フォームの手前に置く応募条件のプレート（白地＋金の囲み）。
     * 省略すると丸ごと出ない。
     */
    eligibility?: {
      title: string;
      /** 先頭に金のチェックが付く条件の行。 */
      items: string[];
      /** 条件の下に小さく添える除外条件など。 */
      note?: string;
    };
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
