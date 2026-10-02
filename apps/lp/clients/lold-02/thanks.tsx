import type { CSSProperties } from "react";
import LPShell from "@/components/LPShell";
import LPCanvas from "@/components/LPCanvas";
import LineButton from "./LineButton";
import config from "./config";

/*
 * lold-02（ABテストB案）のサンクスページ。
 *
 * 狙いはLINEの友だち追加。応募フォームの送信だけでは当選連絡の導線が無いため、
 * 送信直後のこのページで登録まで運ぶ（`form.thanksHref` から遷移する）。
 *
 * 版面はLP本体と同じ 390px キャンバス（CLAUDE.md §16）。配色・書体もLPに揃え、
 * LINEのボタンだけブランド色を使う。
 */

const ASSET = "/clients/lold-02";
const mincho = "'Shippori Mincho', 'Noto Serif JP', serif";
const playfair = "'Playfair Display', serif";
/** 白地に載せる深い金。ブランドゴールドは白地で2.6:1しか出ない（CLAUDE.md パターンC）。 */
const goldOnWhite = "#8C6B2F";
/** FVのバッジと同じ深いローズ。当選連絡＝この案件の「赤」の位置づけ。 */
const rose = "#B0475F";

const LINE_URL =
  "https://liff.line.me/1657086148-xQLqKbaD/landing?follow=%40324ersml&lp=nZFkUD&liff_id=1657086148-xQLqKbaD";

export default function ThanksPage() {
  const c = config;
  const vars = {
    "--ink": c.ink,
    "--accent": c.accent,
    "--paper": c.paper,
    fontFamily: "'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif",
  } as CSSProperties;

  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div
        style={{ ...vars, background: "#EFEAE2", minHeight: "100vh" }}
        className="text-[var(--ink)]"
      >
        <LPCanvas className="bg-[var(--paper)]" boxShadow="0 0 60px rgba(59,55,48,0.14)">
          {/* LP本体と同じ薄いヘッダー（ロゴのみ・中央寄せ）。 */}
          <header
            className="flex items-center justify-center border-b border-[var(--ink)]/10 bg-[var(--paper)]/95 px-5"
            style={{ paddingTop: 6, paddingBottom: 6 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${ASSET}/logo.png`}
              alt={c.header.venue}
              style={{ height: 24, width: "auto", display: "block" }}
            />
          </header>

          <main className="px-5 pb-14 pt-10">
            <p
              className="text-center text-[11px] italic tracking-[0.2em]"
              style={{ fontFamily: playfair, color: goldOnWhite }}
            >
              THANK YOU
            </p>
            <h1
              className="mt-2 text-center text-[21px] leading-snug"
              style={{ fontFamily: mincho }}
            >
              ご応募ありがとうございます
            </h1>

            {/* 本題。ここから先が未完了だと応募が無効になるので、帯で強く切り出す。 */}
            <div
              className="relative mt-8 rounded-[3px] border bg-white px-4 pb-7 pt-9"
              style={{ borderColor: `${c.accent}59` }}
            >
              {/*
                四隅の金の飾り。LP本体の特典パネルが秋仕様になる前に使っていた枠で、
                中央が透明のPNGを「上半分＝上の角・下半分＝下の角」として貼り分ける
                （page.tsx の CornerFrame と同じ扱い）。
              */}
              <span aria-hidden className="pointer-events-none absolute inset-1.5 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${ASSET}/privilege-frame.png`}
                  alt=""
                  className="absolute left-0 top-0 w-full"
                  style={{ clipPath: "inset(0 0 50% 0)" }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${ASSET}/privilege-frame.png`}
                  alt=""
                  className="absolute bottom-0 left-0 w-full"
                  style={{ clipPath: "inset(50% 0 0 0)" }}
                />
              </span>
              <p
                className="relative mx-auto w-fit rounded-[2px] px-5 py-2 text-center text-[14.5px] font-bold text-white"
                style={{ background: rose, fontFamily: mincho, letterSpacing: "0.04em" }}
              >
                当選結果はLINEでお知らせ
              </p>
              <p className="relative mt-5 text-center text-[12.5px] leading-[1.95]">
                ご応募には
                <span className="font-bold" style={{ color: goldOnWhite }}>
                  LINEの登録が必須
                </span>
                となります。
                <br />
                下記より、必ずご登録ください。
              </p>
              {/*
                未登録だと無効になる条件。ボタンを押す前に読ませたいので直上に置く。
                カード内寸は 390 - 左右40 - 内側32 = 318px。この一文は全角換算で約32字
                あるので、1行に収めるには 318 ÷ (32 × 1.07) ≒ 9.3px が上限になる。
              */}
              <p className="relative mt-5 text-center text-[9px] leading-[1.7] opacity-65">
                ※LINEのご登録がない場合、キャンペーンへの応募は無効となります
              </p>
              <div className="relative mt-2.5">
                <LineButton
                  clientSlug={c.slug}
                  href={LINE_URL}
                  label="友だち追加をする"
                  logoSrc={`${ASSET}/line-logo.png`}
                />
              </div>
              <p className="relative mt-4 text-center text-[11.5px] leading-[1.8] opacity-65">
                ご登録後は、当選発表までお待ちください。
              </p>
            </div>

            <p className="mt-8 text-center">
              <a
                href={`/${c.slug}`}
                className="inline-block rounded-full border px-6 py-3 text-[12.5px] font-bold"
                style={{ borderColor: `${c.accent}80`, color: goldOnWhite }}
              >
                ページに戻る
              </a>
            </p>
          </main>

          <footer
            className="px-5 py-4 text-center"
            style={{ background: c.ink, color: "#F6F1E7" }}
          >
            <p className="text-[10.5px] tracking-[0.06em]">
              copyright© {c.header.venue} all rights reserved.
            </p>
          </footer>
        </LPCanvas>
      </div>
    </LPShell>
  );
}
