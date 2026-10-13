import type { ClientStatus } from "@shared/index";
import type { LPFormField } from "@/components/LPForm";

/**
 * 新宿美容外科クリニック｜イボ・ほくろ除去LP（テスト枠）— Meta広告用、カウンセリング予約の獲得。
 *
 * 構成・見せ方は参考LP（nagoya-chuoh-hokuro.info）に寄せ、配色は公式HPのブランドカラー。
 * 指示書は `brief.md`。施術内容・料金以外のクリニック情報は公式HP（shinjukubiyou.com）から転記。
 *
 * **表現上の注意（医療広告ガイドライン）**
 *   - 効果の断定・未確認の実績（症例数など）・保証表現は書かない。
 *   - 料金は指示書の3プランのみ。金額は税込（2026-10-13 確認）。追加費用・適用条件は未確認のため、
 *     画面上に「要確認」タグを出している（page.tsx の `.tbc`）。確認が取れたら外す。
 *   - 公式HPでは初診料3,300円・再診料2,200円（税込）。参考LPの「0円」表記は流用しない。
 *   - 公式HPの施術法は電気メス・切縫法・くり抜き法。参考LPのレーザーの記述は流用しない。
 */

const TIME_SLOTS = ["10:00〜", "11:00〜", "12:00〜", "13:00〜", "14:00〜", "15:00〜", "16:00〜", "17:00〜", "18:00〜"];
const timeOptions = [{ value: "何時でも可", label: "何時でも可" }, ...TIME_SLOTS.map((t) => ({ value: t, label: t }))];

export interface ShinjukubiyouConfig {
  slug: string;
  status?: ClientStatus;
  meta: { title: string; description: string; ogpImage?: string };
  /** FVメインビジュアル（public/clients/{slug}/ 配下）。 */
  fvImage: string;
  privacyUrl: string;
  sticky: { buttonText: string; showAfter: number; offers: { label: string; value: string }[] };
  form: {
    fields: LPFormField[];
    submitLabel: string;
    microcopy: string;
  };
}

const config: ShinjukubiyouConfig = {
  slug: "sinnjyukubiyougeka-test",
  status: "draft",
  meta: {
    title: "イボ・ほくろ除去｜新宿美容外科クリニック",
    description:
      "新宿美容外科クリニック（新宿院・立川院）のイボ・ほくろ除去。1個あたり2mmまで、3個・10個・30個のまとめて除去プラン。カウンセリング予約受付中。",
  },
  fvImage: "/clients/sinnjyukubiyougeka-test/fv.webp",
  privacyUrl: "https://www.shinjukubiyou.com/privacy/",
  sticky: {
    buttonText: "カウンセリングを予約する",
    showAfter: 620,
    offers: [
      { label: "初診料・再診料・カウンセリング", value: "無料" },
    ],
  },
  form: {
    submitLabel: "この内容で予約する",
    microcopy: "ご予約日時は、担当者より改めてご連絡いたします。",
    fields: [
      {
        type: "toggle",
        name: "clinic",
        label: "ご希望の院",
        required: true,
        columns: 2,
        options: [
          { value: "新宿院", label: "新宿院" },
          { value: "立川院", label: "立川院" },
        ],
      },
      { type: "text", name: "name", label: "お名前", required: true, placeholder: "例）新宿　花子" },
      { type: "text", name: "kana", label: "フリガナ", optionalTag: "任意", placeholder: "例）シンジュク　ハナコ" },
      { type: "text", name: "age", label: "年齢", required: true, placeholder: "例）32" },
      {
        type: "select",
        name: "sex",
        label: "性別",
        optionalTag: "任意",
        placeholder: "選択してください",
        options: [
          { value: "女性", label: "女性" },
          { value: "男性", label: "男性" },
          { value: "回答しない", label: "回答しない" },
        ],
      },
      { type: "email", name: "email", label: "メールアドレス", required: true, placeholder: "例）example@mail.com" },
      {
        type: "tel",
        name: "tel",
        label: "電話番号",
        required: true,
        placeholder: "例）09012345678",
        hint: "※必ず連絡の取れる番号をご入力ください。",
      },
      {
        type: "textarea",
        name: "message",
        label: "ご相談内容",
        optionalTag: "任意",
        rows: 4,
        placeholder: "例）顔のほくろを5個ほど取りたい／大きさが2mmを超えるかもしれない など",
      },
      { type: "date", name: "date1", label: "第1希望日", required: true },
      { type: "select", name: "time1", label: "第1希望 時間帯", required: true, placeholder: "時間帯を選択", options: timeOptions },
      { type: "date", name: "date2", label: "第2希望日", optionalTag: "任意" },
      { type: "select", name: "time2", label: "第2希望 時間帯", optionalTag: "任意", placeholder: "時間帯を選択", options: timeOptions },
      { type: "date", name: "date3", label: "第3希望日", optionalTag: "任意" },
      { type: "select", name: "time3", label: "第3希望 時間帯", optionalTag: "任意", placeholder: "時間帯を選択", options: timeOptions },
      {
        type: "checkboxGroup",
        name: "agree",
        label: "プライバシーポリシーへの同意",
        required: true,
        columns: 1,
        options: [{ value: "同意する", label: "プライバシーポリシーに同意する" }],
      },
    ],
  },
};

export default config;
