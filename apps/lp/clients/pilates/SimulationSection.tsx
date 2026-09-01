"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import LPForm, { type LPFormField } from "@/components/LPForm";

/**
 * 集客シミュレーション導線。
 *
 * 入力 → TimeRexで日程予約 → 予約完了後に結果公開、の3ステップ。
 * 「結果を見たい」という動機で予約まで進んでもらうのが狙いなので、
 * **結果は予約完了まで絶対に出さない**。
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
   実績が出たら BASE_LO / BASE_HI で全体の水準を、係数テーブルで条件差を動かす。
   表示は5件刻みに丸める（1件単位で出すと精度を持っているように見えてしまう）。 */

const AREA_TIER: Record<string, number> = {
  東京都: 1.3,
  神奈川県: 1.2,
  大阪府: 1.2,
  愛知県: 1.15,
  埼玉県: 1.1,
  千葉県: 1.1,
  福岡県: 1.1,
  兵庫県: 1.05,
  京都府: 1.05,
  北海道: 1.0,
  宮城県: 1.0,
  広島県: 1.0,
};
const STYLE_W: Record<string, number> = {
  マシンピラティス: 1.15,
  両方: 1.1,
  マットピラティス: 1.0,
  その他: 0.95,
};
const TAIKEN_W: Record<string, number> = { あり: 1.2, なし: 1.0 };
const BASE_LO = 12;
const BASE_HI = 20;

function forecast(values: Record<string, string>): { lo: number; hi: number } {
  const w =
    (AREA_TIER[values.prefecture ?? ""] ?? 0.9) *
    (STYLE_W[values.style ?? ""] ?? 1) *
    (TAIKEN_W[values.taiken ?? ""] ?? 1);
  const lo = Math.max(5, Math.round((BASE_LO * w) / 5) * 5);
  let hi = Math.round((BASE_HI * w) / 5) * 5;
  if (hi <= lo) hi = lo + 5;
  return { lo, hi };
}

/* ── ステップインジケーター ─────────────────────────────────── */

const STEP_LABELS = ["店舗情報", "日程予約", "結果表示"];

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

/* ── 予約ステップ → 結果 ───────────────────────────────────── */

interface BookingGateProps {
  values: Record<string, string>;
  onStep: (step: number) => void;
}

function BookingGate({ values, onStep }: BookingGateProps) {
  const [booked, setBooked] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const bootedRef = useRef(false);

  useEffect(() => {
    onStep(2);
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

  if (booked) {
    const { lo, hi } = forecast(values);
    return <Result lo={lo} hi={hi} values={values} />;
  }

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
      <p className="text-center text-[13px] leading-[1.95]" style={{ color: BODY }}>
        結果をご確認いただくため、
        <br />
        無料相談の日程をご予約ください。
      </p>

      <span
        className="mx-auto rounded-full px-5 py-2 text-[13px] font-bold text-white"
        style={{ background: PLUM }}
      >
        あと1STEP
      </span>

      <div
        className="rounded-xl border border-dashed px-4 py-3.5 text-center"
        style={{ borderColor: PURPLE, background: "#FAF4F9" }}
      >
        <p className="text-[13px] font-bold" style={{ color: PLUM }}>
          🔒 集客予測は日程予約後に公開されます
        </p>
        <p className="mt-1 text-[11.5px]" style={{ color: BODY }}>
          ご予約が完了すると、この画面で結果を表示します。
        </p>
      </div>

      <p className="text-center text-[14px] font-bold" style={{ color: PLUM }}>
        ▼ ご希望の日程を選択してください
      </p>

      {/* Begin TimeRex Widget */}
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
      {/* 数字は白プレート＋深いプラムで置く。ブランドパープル #C88DC2 は
          白地で 2.6:1 しか出ないため、一番見せたい桁が一番弱い要素になってしまう。 */}
      <div
        className="rounded-2xl px-4 py-6 text-center"
        style={{ background: `linear-gradient(160deg, ${PLUM} 0%, #33203180 100%), ${PLUM}` }}
      >
        <p className="text-[10.5px] font-bold tracking-[0.22em] text-white/75">SIMULATION RESULT</p>
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
          <div className="px-5 pt-1 pb-7 [&_input]:!rounded-xl [&_input]:!border-[#E5E7EB] [&_select]:!rounded-xl [&_select]:!border-[#E5E7EB] [&_label]:text-center [&_button]:!rounded-xl [&_.lpform-required-tag]:!text-[#ED647D]">
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
