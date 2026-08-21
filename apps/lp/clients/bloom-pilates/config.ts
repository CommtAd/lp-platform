import type { ClientStatus } from "@shared/index";
import type { LPFormField } from "@/components/LPForm";

/**
 * ritsu pilates（錦糸町 / 旧 bloom pilates）— 既存LPの忠実移植。
 *
 * 元LP: https://pilates.commitad.com/bloom-pilates/01/
 * 成果が出ているため構成・デザインは変更せず、画像スタック構成をそのまま再現する。
 * 画像は public/clients/bloom-pilates/ 配下（元LPの本番素材をそのまま使用）。
 * 基盤要件（タグ注入・CV受信）を満たすため LPShell でラップし、フォームは LPForm を使用。
 */
const ASSET = "/clients/bloom-pilates";

/** 元LPの体験希望時間スロット（7:00〜19:00 / 90分刻み）。 */
const timeOptions = [
  "7:00",
  "8:30",
  "10:00",
  "11:30",
  "13:00",
  "14:30",
  "16:00",
  "17:30",
  "19:00",
].map((t) => ({ value: t, label: t }));

const formFields: LPFormField[] = [
  { name: "name", label: "お名前", type: "text", required: true, placeholder: "山田花子" },
  { name: "email", label: "メールアドレス", type: "email", required: true, placeholder: "yamada@xxx.com" },
  { name: "tel", label: "電話番号", type: "tel", required: true, placeholder: "01234567890" },
  { name: "date1", label: "体験希望日 第一希望", type: "date", required: true },
  { name: "hour1", label: "希望時間", type: "select", required: true, options: timeOptions, placeholder: "---" },
  { name: "date2", label: "体験希望日 第二希望", type: "date", required: true },
  { name: "hour2", label: "希望時間", type: "select", required: true, options: timeOptions, placeholder: "---" },
  { name: "date3", label: "体験希望日 第三希望", type: "date", optionalTag: "任意" },
  { name: "hour3", label: "希望時間", type: "select", options: timeOptions, placeholder: "---", optionalTag: "任意" },
  { name: "message", label: "ご質問・ご相談内容", type: "textarea", rows: 4, optionalTag: "任意" },
];

const config = {
  slug: "bloom-pilates",
  status: "draft" as ClientStatus,

  meta: {
    title: "ritsu pilates",
    description: "ritsu pilates 体験予約",
    ogpImage: `${ASSET}/mv.jpg`,
  },

  /** ヘッダーのアクセス訴求バッジ（元LP header.jpg の右側テキスト）。 */
  stationBadge: { pre: "錦糸町駅 徒歩", num: "2", post: "分" },

  /** アクセントカラー（元LP: --color-primary）。 */
  primary: "#fd7b43",
  /** 全体の最大幅（元LP: max-w-[750px]）。 */
  maxWidth: 750,

  asset: ASSET,

  /** 縦積み画像（元LPの順序を厳守）。cp はCTAボタン付きで2回登場する。 */
  images: {
    logo: `${ASSET}/logo.png`,
    mv: `${ASSET}/mv.jpg`,
    cp: `${ASSET}/cp.jpg`,
    about: `${ASSET}/about.jpg`,
    problem: `${ASSET}/problem.jpg`,
    solution: `${ASSET}/solution.jpg`,
    feature: `${ASSET}/feature.jpg`,
    try: `${ASSET}/try.jpg`,
    bgFlow: `${ASSET}/bg-flow.jpg`,
    titleFlow: `${ASSET}/title-flow.png`,
    flow: [1, 2, 3, 4, 5].map((n) => `${ASSET}/flow${n}.png`),
    access: `${ASSET}/access.jpg`,
    titleForm: `${ASSET}/title-form.png`,
    btn: `${ASSET}/btn.png`,
    btnFollow: `${ASSET}/btn-follow.png`,
  },

  /** Google マップ埋め込み（元LPの iframe src をそのまま流用）。 */
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.1502429412494!2d139.81029167580198!3d35.6979202290571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188929ccbd2b03%3A0x2434524044bd7ed7!2z5pel5pys44CB44CSMTMwLTAwMTMg5p2x5Lqs6YO95aKo55Sw5Yy66Yym57O477yS5LiB55uu77yU4oiS77yR77yS!5e0!3m2!1sja!2sth!4v1777375005227!5m2!1sja!2sth",

  form: {
    fields: formFields,
    submitLabel: "送信",
  },
};

export default config;
