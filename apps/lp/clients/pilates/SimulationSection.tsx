"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import LPForm, { type LPFormField } from "@/components/LPForm";

/**
 * 集客シミュレーション導線。
 *
 * 入力 → 集客予測を表示（同じ画面の下にTimeRex）→ 予約完了、の3ステップ。
 *
 * 2026-09-02に「結果は予約完了まで出さない」ゲート方式から変更した（顧客指定）。
 * 先に数字を見せて信頼を作り、その根拠を聞くために予約してもらう組み立て。
 * ゲートに戻す場合は `BookingGate` の未予約分岐から `<ForecastCard>` を外すだけでよい。
 *
 * CV設計:
 *   - フォーム送信 → LPForm が `clients.meta_cv_event`（fitness既定 = Lead）を発火。
 *     これは中間指標であって最終CVではない。
 *   - 予約完了 → ここで `Schedule` を発火。**これが最終CV。**
 *   広告側の最適化イベントは `Schedule` に向けること。
 *
 * 見た目は顧客の既存LPに合わせ、パープルの帯で白カードを包む形にしている。
 */

const TIMEREX_URL = "https://timerex.net/s/ru-sk/74f10a86";
const TIMEREX_EMBED_SRC = "https://asset.timerex.net/js/embed.js";

const CREAM = "#F9F8F7";
const PURPLE = "#C88DC2";
const PLUM = "#4A2F47";
const GREEN = "#39BA36";
const LINE = "#E5E7EB";
const BODY = "#5C545A";
const MINCHO = "'Shippori Mincho', 'Hiragino Mincho ProN', serif";

/* ── 集客予測ロジック ───────────────────────────────────────────
   顧客指定の条件表（2026-09-01）をそのまま実装している。係数の掛け算ではなく
   素の分岐にしてあるのは、営業が数字を直接読めて、直したい行だけ直せるため。

     無料体験あり × 東京・愛知(名古屋)・大阪・福岡  → 15〜20件
     無料体験あり × 関東（東京以外）                → 10〜20件
     無料体験あり × 上記以外のエリア                → 10〜15件
     有料（無料体験なし）※エリア不問               →  5〜15件

   注意点:
   - 「名古屋」「大阪」「福岡」は市名で指定されたが、フォームの選択肢は都道府県
     なので愛知県 / 大阪府 / 福岡県として扱う。市区町村は任意の自由入力のため
     判定には使えない。
   - **有料はエリアを問わず一律**なので、「東京の有料（5〜15件）」が
     「地方の無料体験あり（10〜15件）」を下回る。無料体験の有無を最も強い要因と
     置く指定のため意図どおり。
   - ピラティスのタイプ（style）は結果に影響しない。入力は営業情報として
     TimeRex と通知メールには引き継がれる。 */

/** 無料体験ありのとき最上位になるエリア。 */
const TOP_AREAS = new Set(["東京都", "愛知県", "大阪府", "福岡県"]);

/** 関東のうち東京以外。東京は TOP_AREAS 側で拾う。 */
const KANTO_EXCEPT_TOKYO = new Set([
  "神奈川県",
  "埼玉県",
  "千葉県",
  "茨城県",
  "栃木県",
  "群馬県",
]);

function forecast(values: Record<string, string>): { lo: number; hi: number } {
  // 有料（無料体験なし）はエリアを問わず一律。
  if (values.taiken !== "あり") return { lo: 5, hi: 15 };

  const pref = values.prefecture ?? "";
  if (TOP_AREAS.has(pref)) return { lo: 15, hi: 20 };
  if (KANTO_EXCEPT_TOKYO.has(pref)) return { lo: 10, hi: 20 };
  return { lo: 10, hi: 15 };
}

/* ── ステップインジケーター ─────────────────────────────────── */

const STEP_LABELS = ["店舗情報", "結果・予約", "予約完了"];

/**
 * 既存LPの STEP ドットを踏襲。現在のステップだけ白抜き、
 * 済みと未着手はパープル塗り（`#dot1〜3` と同じ考え方）。
 */
function StepBar({ step }: { step: number }) {
  return (
    <div
      className="flex items-center justify-center gap-1.5 py-3"
      style={{ background: CREAM, borderBottom: `1px solid ${LINE}` }}
    >
      <span className="mr-1 text-[13px] tracking-[0.08em]" style={{ color: PLUM }}>
        STEP
      </span>
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        const current = n === step;
        return (
          <span key={label} className="flex items-center gap-1.5">
            <span className="flex flex-col items-center gap-0.5">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold tabular-nums"
                style={{
                  background: current ? "#FFFFFF" : PURPLE,
                  border: `1px solid ${PURPLE}`,
                  color: current ? PLUM : "#FFFFFF",
                }}
              >
                {n}
              </span>
              <span
                className="text-[9px] font-bold whitespace-nowrap"
                style={{ color: current ? PLUM : "#B7AEB5" }}
              >
                {label}
              </span>
            </span>
          </span>
        );
      })}
    </div>
  );
}

/* ── 集客予測カード ─────────────────────────────────────────── */

/**
 * 予測件数の表示。フォーム送信直後（STEP2）と予約完了後（STEP3）の両方で
 * 出すため、同一の見た目になるよう切り出している。
 */
function ForecastCard({ lo, hi }: { lo: number; hi: number }) {
  return (
    <div
      className="rounded-2xl px-4 py-6 text-center"
      style={{ background: `linear-gradient(160deg, ${PLUM} 0%, #33203180 100%), ${PLUM}` }}
    >
      <p className="text-[10.5px] font-bold tracking-[0.22em] text-white/75">SIMULATION RESULT</p>
      {/* 数字は白プレート＋深いプラムで置く。ブランドパープル #C88DC2 は
          白地で 2.6:1 しか出ないため、一番見せたい桁が一番弱い要素になってしまう。 */}
      <div className="mt-3.5 rounded-xl bg-white px-3.5 py-5">
        <p className="text-[12.5px]" style={{ color: BODY }}>
          貴社店舗の場合
        </p>
        <p
          className="mt-1.5 text-[24px] leading-[1.25] font-semibold tabular-nums"
          style={{ fontFamily: MINCHO, color: PLUM }}
        >
          毎月 約<span className="text-[46px]">{lo}</span>〜
          <span className="text-[46px]">{hi}</span>
          <span className="text-[20px]">件</span>
        </p>
        <p className="mt-1 text-[14px] font-bold" style={{ color: PLUM }}>
          新規体験予約の獲得が見込めます
        </p>
      </div>
      <p className="mt-3.5 text-[10px] leading-[1.7] text-white/70">
        ※過去の運用実績等をもとにした参考値であり、成果を保証するものではありません。
      </p>
    </div>
  );
}

/* ── 予約ステップ（結果表示 + TimeRex） ─────────────────────── */

interface BookingGateProps {
  values: Record<string, string>;
  onStep: (step: number) => void;
}

function BookingGate({ values, onStep }: BookingGateProps) {
  const [booked, setBooked] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  /** 予測直下のCTAからスクロールで送る先。 */
  const bookingRef = useRef<HTMLParagraphElement>(null);
  const bootedRef = useRef(false);

  /* 送信ボタンはフォーム下端にあるため、差し替え直後は肝心の数字が画面外に
     なりうる。予測まで自動で送る。 */
  useEffect(() => {
    onStep(2);
    hostRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [onStep]);

  /* 予約完了 = 最終CV。ここでしか Schedule を発火させない。 */
  const handleBookingComplete = () => {
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    if (typeof fbq === "function") fbq("track", "Schedule");
    const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    if (typeof gtag === "function") gtag("event", "booking_complete", { method: "timerex" });
    setBooked(true);
    onStep(3);
    hostRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (booked || bootedRef.current) return;

    type TimerexOptions = {
      guest_company?: string;
      guest_name?: string;
      guest_email?: string;
      url_params?: Record<string, string>;
      onBookingComplete?: () => void;
    };
    type WithTimerex = { TimerexCalendar?: (o: TimerexOptions) => void };

    const call = () => {
      /* call() は下の load リスナーとしても登録される。StrictMode の二重実行で
         リスナーが2本張られるため、ここで弾かないと TimerexCalendar() が2回走り
         カレンダーが2つ描画される（開発時に実測）。 */
      if (bootedRef.current) return true;
      const fn = (window as unknown as WithTimerex).TimerexCalendar;
      if (typeof fn !== "function") return false;
      bootedRef.current = true;
      fn({
        /* 標準の質問項目に自動転記（全プランで利用可）。二重入力による離脱を防ぐ。
           カスタム項目（電話番号など）への転記はプレミアム限定なので url_params で送る。 */
        guest_company: values.company ?? "",
        guest_name: values.name ?? "",
        guest_email: values.email ?? "",
        /* 値は生のまま渡す。embed.js 側でURLエンコードされるため、ここで
           encodeURIComponent すると二重エンコードになり、予約レコードに
           "%E6%B8%8B%E8%B0%B7%E5%8C%BA" のような文字列が入る（実測で確認）。 */
        url_params: {
          style: values.style ?? "",
          pref: values.prefecture ?? "",
          city: values.city ?? "",
          taiken: values.taiken ?? "",
          tel: values.tel ?? "",
        },
        onBookingComplete: handleBookingComplete,
      });
      return true;
    };

    if (call()) return;

    const existing = document.getElementById("timerex_embed");
    if (existing) {
      existing.addEventListener("load", call, { once: true });
      return;
    }
    const s = document.createElement("script");
    s.id = "timerex_embed";
    s.src = TIMEREX_EMBED_SRC;
    s.addEventListener("load", call, { once: true });
    document.head.appendChild(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booked]);

  const { lo, hi } = forecast(values);

  if (booked) return <Result lo={lo} hi={hi} values={values} />;

  return (
    <div ref={hostRef} className="flex flex-col gap-5 py-6">
      <span
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-[26px] text-white"
        style={{ background: GREEN }}
      >
        ✓
      </span>
      <p className="text-center text-[17px] font-bold" style={{ color: GREEN }}>
        シミュレーション完了！
      </p>
      <h3
        className="text-center text-[19px] leading-[1.55] font-semibold"
        style={{ fontFamily: MINCHO, color: PLUM }}
      >
        あなたの店舗の
        <br />
        「集客予測」が算出されました。
      </h3>

      <ForecastCard lo={lo} hi={hi} />

      {/* 件数を見た直後に動ける人向けの近道。下の訴求ブロックを読まなくても
          カレンダーへ飛べるようにしている。このLPに遷移先の別ページは無いので
          リンクではなくスクロールで送る（ボタンは1画面に2つ出るが、上は近道、
          下はカレンダー本体という役割分担）。 */}
      <button
        type="button"
        onClick={() =>
          bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
        className="flex h-14 w-full items-center justify-center gap-1.5 rounded-xl text-[16px] font-bold text-white"
        style={{
          background: GREEN,
          boxShadow: `0 8px 20px ${GREEN}59`,
          letterSpacing: "0.04em",
        }}
      >
        勝ちパターンを聞く
        <span aria-hidden>↓</span>
      </button>

      {/* 数字を見せたうえで予約に進ませるブロック。予約の動機は「ロック解除」ではなく
          「この件数をどう取るかの具体策」。文言は営業判断で確定（2026-09-02）。

          ✓リストの見た目は STEP1 の `.lpform-note-items`（LPForm の note）と
          意図的に揃えている。片方だけ直すと同じLP内で作りが割れるので、
          見た目を変えるときは両方あわせて直すこと。

          ここで挙げた4項目も `forecast()` の出力とは無関係で、無料相談で人が
          共有する約束。LP側に実装は無い（config.ts の contactNote と同じ扱い）。 */}
      <div
        className="rounded-2xl px-4 py-5 text-center"
        style={{ border: `1px solid ${PURPLE}`, background: "#FAF4F9" }}
      >
        <p
          className="text-[16px] leading-[1.5] font-semibold"
          style={{ fontFamily: MINCHO, color: PLUM }}
        >
          この件数、あなたの店舗では
          <br />
          どうやって獲得する？
        </p>
        <p className="mt-2.5 text-[11.5px] leading-[1.85]" style={{ color: BODY }}>
          この数字を目指すためには、広告だけでなく、
          <br />
          クリエイティブ・予約導線・特典設計まで含めた集客設計が重要です！
        </p>

        <p className="mt-3.5 text-[12.5px] font-bold" style={{ color: PLUM }}>
          【このページ限定】
        </p>
        <p className="mt-1 text-[11.5px] leading-[1.85]" style={{ color: BODY }}>
          下記より日程をご予約いただいた方には、
          <br />
          シミュレーション結果をもとに、
        </p>

        {/* 淡いピンク地に直接置くとコントラストが足らないので白プレートに載せる。 */}
        <ul className="mt-2.5 flex flex-col gap-1.5 rounded-xl bg-white px-2.5 py-3 text-left">
          {[
            "成果につながりやすい広告クリエイティブ",
            "来店率を高める広告・予約導線",
            "入会率を高めるキャンペーン・特典",
            "あなたの店舗で優先すべき改善ポイント",
          ].map((item) => (
            <li
              key={item}
              className="flex gap-1 text-[11.5px] leading-[1.6] font-bold"
              style={{ color: PLUM }}
            >
              <span aria-hidden className="shrink-0" style={{ color: PURPLE }}>
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-2.5 text-[12.5px] font-bold" style={{ color: PLUM }}>
          まで具体的にご共有します！
        </p>
      </div>

      {/* scroll-mt-6: CTAからのスクロール時に上端へ張り付かないよう余白を持たせる
          （下書きプレビューの帯にも隠れない）。 */}
      <p
        ref={bookingRef}
        className="scroll-mt-6 text-center text-[14px] font-bold"
        style={{ color: PLUM }}
      >
        ▼ ご希望の日程を選択してください
      </p>

      {/* Begin TimeRex Widget */}
      {/* TimeRexはレイアウトを `window.innerWidth` で決める外部ウィジェットで、
          キャンバスのzoomの外側＝ブラウザ幅を見る。そのためPC幅で検収すると
          min-width:550px のPC版が出て、361pxの枠に対し190pxほどはみ出す
          （実機幅では min-width が0に落ちてモバイル版になり、ほぼ収まる）。
          **ラッパーを足して逃がす必要はない。** embed.js が `#timerex_calendar`
          自体に `overflow-x: auto` をインラインで付けるので、横スクロールは
          ウィジェット側で成立している（scrollWidth 550 / clientWidth 294 で
          右端まで到達することを実測済み）。自前のスクロールコンテナで包むと
          入れ子のスクロール領域ができてスワイプが曖昧になるだけ。
          なおこのブロックはPC幅と実機幅で見た目が一致しない。外部ウィジェットの
          都合なので、§20の改行一致の検収基準はここには適用できない。 */}
      <div id="timerex_calendar" data-url={TIMEREX_URL} style={{ minHeight: 60 }} />
      {/* End TimeRex Widget */}
    </div>
  );
}

/* ── 結果 ───────────────────────────────────────────────────── */

function Result({
  lo,
  hi,
  values,
}: {
  lo: number;
  hi: number;
  values: Record<string, string>;
}) {
  const recap: [string, string][] = [
    ["ピラティスのタイプ", values.style ?? "—"],
    ["店舗エリア", `${values.prefecture ?? ""} ${values.city ?? ""}`.trim() || "—"],
    ["無料体験", values.taiken ?? "—"],
  ];

  return (
    <div className="py-6">
      <ForecastCard lo={lo} hi={hi} />

      <div className="mt-4 rounded-2xl bg-white px-4 py-5" style={{ border: `1px solid ${LINE}` }}>
        <p
          className="text-[16px] leading-[1.5] font-semibold"
          style={{ fontFamily: MINCHO, color: PLUM }}
        >
          無料相談のご予約ありがとうございます！
        </p>
        <p className="mt-2.5 text-[13px] leading-[1.95]" style={{ color: BODY }}>
          当日はシミュレーション結果をもとに、店舗の状況に合わせた具体的な集客方法をご提案いたします。
        </p>
        <dl className="mt-4 flex flex-col gap-2 pt-3.5" style={{ borderTop: `1px solid ${LINE}` }}>
          {recap.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3 text-[12.5px]">
              <dt className="shrink-0" style={{ color: "#9A9398" }}>
                {k}
              </dt>
              <dd className="text-right font-bold" style={{ color: PLUM }}>
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/* ── セクション全体 ─────────────────────────────────────────── */

export interface SimulationSectionProps {
  clientSlug: string;
  heading: string;
  lead: string;
  fields: LPFormField[];
  submitLabel: string;
  disclaimer: string;
  errorMessage: string;
  /** カードを包む帯の煽り（例「カンタン30秒!!」）。 */
  bandLabel?: string;
}

function nl(text: string): ReactNode {
  const parts = text.split("\n");
  return parts.map((p, i) => (
    <span key={i}>
      {p}
      {i < parts.length - 1 && <br />}
    </span>
  ));
}

export default function SimulationSection({
  clientSlug,
  heading,
  lead,
  fields,
  submitLabel,
  disclaimer,
  errorMessage,
  bandLabel,
}: SimulationSectionProps) {
  const [step, setStep] = useState(1);

  return (
    <>
      <h2
        className="relative pb-5 text-center text-[21px] leading-[1.55] font-semibold"
        style={{ fontFamily: MINCHO, color: PLUM }}
      >
        {heading}
        <span
          className="absolute bottom-0 left-1/2 block h-px w-24 -translate-x-1/2"
          style={{ background: PURPLE }}
          aria-hidden
        />
      </h2>
      <p className="mt-6 text-center text-[13px] leading-[1.95]" style={{ color: BODY }}>
        {nl(lead)}
      </p>

      {/* パープルの帯で白カードを包む（既存LPの `bg-secondary` + 白カード） */}
      <div className="mt-8 overflow-hidden rounded-xl px-2 pb-2" style={{ background: PURPLE }}>
        {bandLabel && (
          <div className="py-3 text-center text-[16px] tracking-[0.14em] text-white">
            {bandLabel}
          </div>
        )}
        <div className="overflow-hidden rounded-xl bg-white">
          <StepBar step={step} />

          {/* LPForm の既定の見た目はパターンA（砂色系）なので、この帯の中に
              収まるよう外側から上書きしている。共通コンポーネントには手を入れない。

              LPForm は1インスタンスだけ置くこと。step で分岐して別要素にすると
              React が再マウントし、送信済み状態が失われてフォームに戻ってしまう。 */}
          <div className="px-5 pt-1 pb-7 [&_input]:!rounded-xl [&_input]:!border-[#E5E7EB] [&_select]:!rounded-xl [&_select]:!border-[#E5E7EB] [&_label]:text-center [&_button]:!rounded-xl [&_.lpform-required-tag]:!text-[#ED647D] [&_.lpform-note-title]:!text-[#4A2F47]">
            <LPForm
              clientSlug={clientSlug}
              accent={PURPLE}
              fields={fields}
              submitLabel={submitLabel}
              errorMessage={errorMessage}
              disclaimer={nl(disclaimer)}
              submitStyle={{
                background: GREEN,
                boxShadow: `0 8px 20px ${GREEN}59`,
                letterSpacing: "0.04em",
              }}
              thanks={(values) => <BookingGate values={values} onStep={setStep} />}
            />
          </div>
        </div>
      </div>
    </>
  );
}
