import type { ClientStatus } from "@shared/index";
import type { LPFormField } from "@/components/LPForm";

/**
 * コミットアドforピラティス — 集客シミュレーションLP。
 *
 * 対象: ピラティススタジオのオーナー（BtoB）。Meta広告からのスマホ流入が中心。
 * 導線: 店舗情報入力 → TimeRexで日程予約 → 予約完了 → 集客予測を公開。
 *
 * **最終CVは「TimeRex予約完了」（`Schedule`）で、フォーム送信ではない。**
 * フォーム送信では LPForm が `clients.meta_cv_event`（fitness既定 = Lead）を
 * 発火する＝中間指標。広告側の最適化イベントは `Schedule` に向けること。
 * 実装は `SimulationSection.tsx`。
 *
 * **PatternBConfig は使わない。** 参照元（旧 pilates.commitad.com/lp/simulation/）が
 * 「MV → 訴求 → フォーム」だけの極端に短いLPで、パターンBの
 * problem / solution / benefits / advantage / closing を持たないため。
 * 使わないセクションのconfigを残すと「直したのに反映されない」罠になるので、
 * このLP専用の型にしてある。
 *
 * 配色は参照元から継承: ブランドパープル #C88DC2 / CTA緑 #39BA36。
 * ただし #C88DC2 は白地で 2.6:1 しか出ないため、文字・数字には
 * 深いプラム #4A2F47 を使う（`page.tsx` の PLUM）。
 */

interface Slot {
  placeholder: string;
  src?: string | null;
  position?: string;
  /** 画像本来の縦横比（例 "640 / 1225"）。ImageSlot は cover なので、
      ここを実寸に合わせておけばトリミングされない。 */
  aspect?: string;
}

export interface PilatesConfig {
  slug: string;
  status?: ClientStatus;
  meta: { title: string; description: string; ogpImage?: string };

  /** CTAの緑。 */
  cta: string;

  /**
   * FV。**バッジ・見出し・リード・ロゴはすべて MV 画像に焼き込まれている**ため
   * config には持たない（HTMLで持つと二重表示になる）。文言を変えるには
   * 画像を差し替える必要がある。
   */
  fv: {
    /** MV画像に無い煽り。画像の下に帯で置く。 */
    highlight: string;
    ctaText: string;
    trust: string[];
    hero: Slot;
  };

  /** 「なぜ先に件数が出せるのか」。参照元の point 画像に相当する訴求ブロック。 */
  reasons: {
    heading: string;
    items: { title: string; body: string }[];
  };

  form: {
    heading: string;
    lead: string;
    /** カードを包む帯の煽り。 */
    bandLabel?: string;
    fields: LPFormField[];
    submitLabel: string;
    disclaimer: string;
    errorMessage: string;
  };

  /** 離脱の核心だけに絞る。数を増やすとLPが伸びる。 */
  faq: { heading: string; items: { q: string; a: string }[] };

  sticky: { offerText: string; buttonText: string; anchor: string; showAfter?: number };
}

const config: PilatesConfig = {
  slug: "pilates",
  status: "draft",
  meta: {
    title: "ピラティス集客シミュレーション｜コミットアド for ピラティス",
    description:
      "あなたのスタジオなら毎月何件の新規集客が期待できる？店舗情報を入力するだけで、ピラティス専門の集客支援「コミットアド for ピラティス」による集客予測を無料でシミュレーションできます。カンタン30秒。",
    /* 絶対URLで指定する。`metadataBase` が未設定のため、相対パスだと Next.js が
       Vercel の先頭ドメイン（bridal-lp.commitad.com）で解決してしまい、
       フィットネスのLPにブライダルのドメインが出る（本番で実測）。 */
    ogpImage: "https://fitness-lp.commitad.com/clients/pilates/mv.jpg",
  },
  cta: "#39BA36",

  fv: {
    highlight: "カンタン30秒・完全無料",
    ctaText: "まずは無料でシミュレーション",
    trust: ["入力30秒", "費用は一切かかりません", "しつこい営業なし"],
    hero: {
      placeholder: "MV（ロゴ・見出し込み）",
      /* 顧客支給のMV。PC版 mv.jpg は 1920x1000 で、390pxキャンバスに置くと
         高さ203px＝焼き込まれた見出しが約7pxになり読めないため、同じデザインの
         縦版 mv-sp.jpg（640x1225）を使う。PC版はOGPに回している。 */
      src: "/clients/pilates/mv-sp.jpg",
      aspect: "640 / 1225",
    },
  },

  reasons: {
    heading: "なぜ、先に件数が分かるのか",
    items: [
      {
        title: "ピラティス専門",
        body: "業種を絞って運用してきたため、どの訴求が刺さるかの見当が最初からついています。",
      },
      {
        title: "エリアごとの実績",
        body: "商圏の人口構成とレッスン形態から、同条件での獲得実績を引き当てて試算します。",
      },
      {
        title: "制作から運用まで一社",
        body: "LPと広告を分けないため、数字が動かないときの原因を切り分けられます。",
      },
    ],
  },

  form: {
    heading: "ピラティス集客シミュレーション",
    lead: "貴社の店舗についてご入力ください。\n日程予約が完了すると、集客予測が表示されます。",
    bandLabel: "カンタン30秒!!",
    fields: [
      {
        type: "toggle",
        name: "style",
        label: "ピラティスのタイプ",
        required: true,
        columns: 2,
        options: [
          { value: "マットピラティス", label: "マット" },
          { value: "マシンピラティス", label: "マシン" },
          { value: "両方", label: "両方" },
          { value: "その他", label: "その他" },
        ],
      },
      {
        type: "select",
        name: "prefecture",
        label: "店舗のエリア（都道府県）",
        required: true,
        placeholder: "選択してください",
        options: [
          "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
          "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
          "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県",
          "岐阜県", "静岡県", "愛知県", "三重県",
          "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
          "鳥取県", "島根県", "岡山県", "広島県", "山口県",
          "徳島県", "香川県", "愛媛県", "高知県",
          "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
        ].map((p) => ({ value: p, label: p })),
      },
      {
        type: "text",
        name: "city",
        label: "市区町村",
        optionalTag: "任意",
        placeholder: "例：渋谷区",
      },
      {
        type: "toggle",
        name: "taiken",
        label: "無料体験の有無",
        required: true,
        columns: 2,
        options: [
          { value: "あり", label: "あり" },
          { value: "なし", label: "なし" },
        ],
      },
      {
        type: "text",
        name: "company",
        label: "企業名・店舗名",
        required: true,
        placeholder: "例：株式会社コミットアド",
      },
      { type: "text", name: "name", label: "ご担当者名", required: true, placeholder: "例：山田 太郎" },
      { type: "email", name: "email", label: "メールアドレス", required: true, placeholder: "例：info@example.com" },
      { type: "tel", name: "tel", label: "電話番号", required: true, placeholder: "例：0312345678" },
    ],
    submitLabel: "集客予測を算出する",
    disclaimer:
      "ご入力内容は無料相談のご案内にのみ使用します。\n算出される件数は運用実績をもとにした参考値であり、成果を保証するものではありません。",
    errorMessage: "必須項目をご入力ください。",
  },

  faq: {
    heading: "よくあるご質問",
    items: [
      {
        q: "なぜ結果を見る前に日程予約が必要なのですか？",
        a: "エリアや形態によって前提が大きく変わるため、数字だけをお渡ししても誤解を招きかねません。無料相談の中で根拠と前提をあわせてご説明したいと考えており、ご予約を先にお願いしています。",
      },
      {
        q: "シミュレーションだけの利用でも大丈夫ですか？",
        a: "はい、問題ありません。集客予測の確認だけで終えていただいても費用は一切かかりませんし、その後しつこくご連絡することもありません。",
      },
    ],
  },

  sticky: {
    offerText: "カンタン30秒・無料",
    buttonText: "無料でシミュレーション",
    anchor: "#form",
    showAfter: 400,
  },
};

export default config;
