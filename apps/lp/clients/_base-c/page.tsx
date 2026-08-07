import type { CSSProperties, ReactNode } from "react";
import type { CarouselItem } from "@/clients/pattern-c.types";
import LPShell from "@/components/LPShell";
import LPForm from "@/components/LPForm";
import StickyFooterCTA from "@/components/StickyFooterCTA";
import ImageSlot from "@/components/ImageSlot";
import FaqAccordion from "./FaqAccordion";
import TelLink from "./TelLink";
import config from "./config";

/** Render "\n"-separated text as line breaks. */
function nl(text: string): ReactNode {
  const parts = text.split("\n");
  return parts.map((p, i) => (
    <span key={i}>
      {p}
      {i < parts.length - 1 && <br />}
    </span>
  ));
}

const mincho = "'Shippori Mincho', 'Noto Serif JP', serif";
const playfair = "'Playfair Display', serif";
const goldGrad = (accent: string) => `linear-gradient(135deg, ${accent} 0%, #D8BC80 100%)`;
/**
 * 白地に載せる濃いめの金。ブランドゴールド `#B99653` は白の上だと 2.6:1 しか出ず
 * 読めないため、FVの訴求バンド専用にこの深い金を使う（白地で 4.9:1）。
 */
const goldOnWhite = "#8C6B2F";

/**
 * 金額表記の数字部分だけを特大にする（"最大180万円相当" → 180 を特大）。
 * ブライダルは金額が比較軸なので、桁を目に焼き付けるのが目的。
 * 数字が見つからない文字列はそのまま返す。
 */
function amountEmphasis(text: string, numSize = 46, sideSize = 20): ReactNode {
  const m = text.match(/^(.*?)([0-9０-９][0-9０-９,，.．]*)(.*)$/);
  if (!m) return text;
  const [, head, num, tail] = m;
  return (
    <>
      {head && <span style={{ fontSize: sideSize }}>{head}</span>}
      <span style={{ fontSize: numSize }}>{num}</span>
      {tail && <span style={{ fontSize: sideSize }}>{tail}</span>}
    </>
  );
}

/** 文中の金額語だけを金の明朝に置き換える。語が見つからなければそのまま返す。 */
function emphasize(text: string, word: string | undefined, color: string): ReactNode {
  if (!word || !text.includes(word)) return text;
  const [head, ...rest] = text.split(word);
  return (
    <>
      {head}
      <span className="text-[15px] font-bold" style={{ fontFamily: mincho, color }}>
        {word}
      </span>
      {rest.join(word)}
    </>
  );
}

/**
 * 横スクロールカルーセル。`experience`（体験できること）と `facility`（施設紹介）で
 * 同じ見せ方を共有する。写真の比率だけセクションごとに変えられる。
 */
function Carousel({ items, aspect = "4 / 3" }: { items: CarouselItem[]; aspect?: string }) {
  return (
    <>
      <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">
        {items.map((e, i) => (
          <div key={`${e.tag}-${i}`} className="w-[76%] shrink-0 snap-center">
            <ImageSlot
              src={e.image.src}
              placeholder={e.image.placeholder}
              objectPosition={e.image.position ?? "center"}
              radius={12}
              style={{ width: "100%", aspectRatio: aspect }}
            />
            <div className="mt-3 flex items-center gap-2">
              <span
                className="text-[11px] italic tracking-widest text-[var(--accent)]"
                style={{ fontFamily: playfair }}
              >
                {e.tag}
              </span>
              <h3 className="text-[14.5px]" style={{ fontFamily: mincho }}>
                {e.title}
              </h3>
            </div>
            {e.note && (
              <p
                className="mt-1.5 text-[11px] tracking-wide"
                style={{ fontFamily: mincho, color: goldOnWhite }}
              >
                {e.note}
              </p>
            )}
            <p className="mt-2 text-[12px] leading-[1.9] opacity-70">{e.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 px-5 text-right text-[10.5px] tracking-wide opacity-40">
        横にスワイプ →
      </p>
    </>
  );
}

/** Small centered section heading: English kicker + mincho Japanese title. */
function Heading({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) {
  return (
    <div className="text-center">
      <span
        className="text-[11px] italic tracking-[0.2em] text-[var(--accent)]"
        style={{ fontFamily: playfair }}
      >
        {kicker}
      </span>
      <h2 className="mt-2 text-[21px] leading-snug" style={{ fontFamily: mincho }}>
        {title}
      </h2>
      {lead && <p className="mt-3 text-[12.5px] leading-[1.9] opacity-70">{nl(lead)}</p>}
    </div>
  );
}

/**
 * Pattern C — mobile-only single-column layout (same fixed ~480px card
 * convention as patterns A and B). Desktop viewers see the mobile card
 * centered on a neutral background; there is no separate desktop layout.
 *
 * Optional config sections (grandOffer / schedule / recommend / gallery /
 * reasons / plan / voices / faq / overview) are skipped entirely when absent,
 * so one page.tsx serves both this template and clients that only have a
 * subset of the material.
 */
export default function Page() {
  const c = config;
  // 特典バンドの配色。config で band を指定しなければ従来のチャコール地に戻る。
  const band = c.band ?? {
    bg: c.ink,
    text: "#F6F1E7",
    accent: c.accent,
    rule: `${c.accent}80`,
  };
  // キッカー・キャッチ・訴求プレートは3点セットで動く。catchPosition で上下どちらかに寄せる。
  const catchTop = c.fv.catchPosition === "top";
  const fvBottomHasContent =
    !catchTop || Boolean(c.fv.lead) || Boolean(c.fv.offers && c.fv.offers.length > 0);
  const framed = Boolean(c.fv.framed);
  const formLight = c.form.tone === "light";

  /**
   * 明るいセクションの地は白／生成りを交互に敷く。地色をセクションごとに
   * ハードコードすると、任意セクションを省いた案件で隣り合う面が同色になり
   * 境目が消える（FAQを省いた案件で当日の流れとアクセスが地続きに見えた）。
   * 描画順で決めれば、どのセクションを落としても必ず交互になる。
   */
  let lightIndex = 0;
  const lightBg = () => (lightIndex++ % 2 === 0 ? "bg-white" : "bg-[var(--paper)]");
  /**
   * 直前に `lightBg()` が返した色の反対を返す。セクションの地色が描画順で決まる以上、
   * その上に置くカードの地も固定できないため（白セクションに白カードだと沈む）。
   */
  const oppositeLightBg = () => (lightIndex % 2 === 0 ? "bg-white" : "bg-[var(--paper)]");
  const heroTextShadow = "0 2px 14px rgba(59,55,48,0.6)";
  // スクリムは「写真に直接白文字が載る側」だけを落とす。
  // framed のプレートは自前の地を持つので、その側は写真を明るいまま残す。
  const heroScrim = !catchTop
    ? "linear-gradient(180deg,rgba(59,55,48,0.42) 0%,rgba(59,55,48,0.10) 24%,rgba(59,55,48,0.64) 56%,rgba(59,55,48,0.95) 100%)"
    : fvBottomHasContent
      ? framed
        ? "linear-gradient(180deg,rgba(59,55,48,0.24) 0%,rgba(59,55,48,0.06) 34%,rgba(59,55,48,0.62) 76%,rgba(59,55,48,0.95) 100%)"
        : "linear-gradient(180deg,rgba(59,55,48,0.66) 0%,rgba(59,55,48,0.34) 32%,rgba(59,55,48,0.10) 48%,rgba(59,55,48,0.62) 76%,rgba(59,55,48,0.95) 100%)"
      : framed
        ? "linear-gradient(180deg,rgba(59,55,48,0.26) 0%,rgba(59,55,48,0.06) 40%,rgba(59,55,48,0.04) 78%,rgba(59,55,48,0.12) 100%)"
        : "linear-gradient(180deg,rgba(59,55,48,0.70) 0%,rgba(59,55,48,0.38) 34%,rgba(59,55,48,0.06) 60%,rgba(59,55,48,0.12) 100%)";

  const fvKicker = (
    <span
      className="text-[11px] italic tracking-[0.28em]"
      style={{ fontFamily: playfair, color: framed ? goldOnWhite : undefined }}
    >
      {c.fv.kicker}
    </span>
  );
  const fvCatch = (
    <h1
      className="mt-2.5 leading-[1.5]"
      style={{ fontFamily: mincho, fontSize: c.fv.catchSize ?? 26 }}
    >
      {/* 改行位置は config の配列で決める。狭い端末で入り切らない行は折り返させる
          （nowrap にすると 320px 幅で末尾が切れてしまう）。 */}
      {c.fv.catch.map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ))}
    </h1>
  );
  // framed のときはプレート自体が枠を持つので、訴求は罫線で区切った1行として置く。
  // 単独で置く場合は、角を落とした矩形のすりガラスプレートで受ける（角丸ピルは安っぽく見える）。
  const fvHighlight = !c.fv.highlight ? null : framed ? (
    <>
      <span className="mt-4 block h-px" style={{ background: `${c.accent}66` }} />
      <p
        className="mt-4 text-[17px] font-bold tracking-[0.1em]"
        style={{ fontFamily: mincho, color: goldOnWhite }}
      >
        {c.fv.highlight}
      </p>
    </>
  ) : (
    <p
      className="mt-4 inline-block rounded-[2px] border px-6 py-2.5 text-[17px] font-bold tracking-[0.14em] backdrop-blur-[3px]"
      style={{
        fontFamily: mincho,
        background: "rgba(255,255,255,0.86)",
        borderColor: c.accent,
        color: goldOnWhite,
        textShadow: "none",
      }}
    >
      {c.fv.highlight}
    </p>
  );

  /** キッカー・キャッチ・訴求の3点セット。framed なら1枚のプレートに封じる。 */
  const fvGroup = framed ? (
    <div
      className="rounded-[3px] border px-4 py-5 text-center backdrop-blur-[3px]"
      style={{
        background: "rgba(255,255,255,0.9)",
        borderColor: c.accent,
        color: c.ink,
        textShadow: "none",
      }}
    >
      {fvKicker}
      {fvCatch}
      {fvHighlight}
    </div>
  ) : (
    <>
      {fvKicker}
      {fvCatch}
      {fvHighlight}
    </>
  );
  const vars = {
    "--ink": c.ink,
    "--accent": c.accent,
    "--paper": c.paper,
    fontFamily: "'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif",
  } as CSSProperties;

  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div style={{ ...vars, background: "#EFEAE2", minHeight: "100vh" }} className="text-[var(--ink)]">
        <div
          className="mx-auto overflow-x-hidden bg-[var(--paper)]"
          style={{ maxWidth: 480, boxShadow: "0 0 60px rgba(59,55,48,0.14)" }}
        >
          {/* ── header ── */}
          <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-[var(--ink)]/10 bg-[var(--paper)]/95 px-5 py-3.5 backdrop-blur">
            <div className="min-w-0 leading-tight">
              {c.header.logo ? (
                // ロゴは cover ではなく実比率で置くので ImageSlot は使わない。
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.header.logo.src}
                  alt={c.header.venue}
                  style={{
                    height: c.header.logo.height ?? 40,
                    width: "auto",
                    display: "block",
                  }}
                />
              ) : (
                <>
                  <div
                    className="truncate text-[12.5px] tracking-[0.1em]"
                    style={{ fontFamily: mincho }}
                  >
                    {c.header.venue}
                  </div>
                  <div className="truncate text-[9.5px] opacity-50">{c.header.venueSub}</div>
                </>
              )}
            </div>
            <a
              href="#form"
              className="shrink-0 rounded-full px-4 py-2.5 text-[11.5px] font-bold tracking-wide text-white"
              style={{ background: goldGrad(c.accent) }}
            >
              {c.header.ctaText}
            </a>
          </header>

          {/* ── FV ── */}
          <section className="relative">
            <ImageSlot
              src={c.fv.hero.src}
              placeholder={c.fv.hero.placeholder}
              objectPosition={c.fv.hero.position ?? "center"}
              style={{ width: "100%", aspectRatio: c.fv.heroAspect ?? "3 / 4" }}
            />
            {/* 明るい会場写真でも文字が沈まないよう、コピーが載る側を強めに落とす。 */}
            <div className="absolute inset-0" style={{ background: heroScrim }} />
            {catchTop && (
              <div
                className={`absolute inset-x-0 top-0 pt-7 text-white ${framed ? "px-5" : "px-6"}`}
                // 明るい天井や白ドレスに白文字が重なっても読めるよう、影で輪郭を作る。
                style={{ textShadow: heroTextShadow }}
              >
                {fvGroup}
              </div>
            )}
            {fvBottomHasContent && (
              <div
                className={`absolute inset-x-0 bottom-0 pb-8 text-white ${framed ? "px-5" : "px-6"}`}
                style={{ textShadow: heroTextShadow }}
              >
                {!catchTop && fvGroup}
                {c.fv.lead && (
                  <p className="mt-3 text-[12.5px] leading-[1.9] text-white/80">{c.fv.lead}</p>
                )}
                {c.fv.offers && c.fv.offers.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.fv.offers.map((o) => (
                      <span
                        key={o}
                        className="rounded-full border border-white/40 px-3 py-1 text-[10.5px] tracking-wide"
                      >
                        {o}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
          {/* ── FV直下の特典サマリー ── */}
          {c.fvSummary && (
            <div className="bg-[var(--paper)] px-5 pt-9">
              <div className="flex items-center gap-4">
                <span className="h-px flex-1" style={{ background: `${c.accent}66` }} />
                <span
                  className="text-[12px] tracking-[0.3em]"
                  style={{ fontFamily: mincho }}
                >
                  {c.fvSummary.label}
                </span>
                <span className="h-px flex-1" style={{ background: `${c.accent}66` }} />
              </div>
              <div className="mt-7 grid grid-cols-3">
                {c.fvSummary.items.map((item, i) => (
                  <div
                    key={`${item.name}-${i}`}
                    className={`px-1.5 text-center ${i > 0 ? "border-l" : ""}`}
                    style={i > 0 ? { borderColor: `${c.ink}1F` } : undefined}
                  >
                    <p
                      className="whitespace-nowrap text-[17px] font-bold leading-none"
                      style={{ fontFamily: mincho, color: goldOnWhite }}
                    >
                      {item.amount}
                    </p>
                    <p className="mt-2.5 text-[10.5px] leading-snug opacity-65">{item.name}</p>
                  </div>
                ))}
              </div>
              <p className="mt-7 text-center text-[12px] leading-[1.9]">
                {emphasize(c.fvSummary.note, c.fvSummary.noteEmphasis, goldOnWhite)}
              </p>
            </div>
          )}

          <div className="bg-[var(--paper)] px-5 pb-10 pt-6">
            <a
              href="#form"
              className="flex h-14 items-center justify-center gap-2 rounded-full text-[14.5px] font-bold tracking-wide text-white"
              style={{ background: goldGrad(c.accent), boxShadow: `0 10px 26px ${c.accent}59` }}
            >
              {c.fv.ctaText} <span>→</span>
            </a>
          </div>

          {/* ── grand offer（成約特典） ── */}
          {c.grandOffer && (
            <section
              className="px-5 py-12"
              style={{ background: band.bg, color: band.text }}
            >
              <div className="text-center">
                <span
                  className="text-[11px] italic tracking-[0.2em]"
                  style={{ fontFamily: playfair, color: band.accent }}
                >
                  {c.grandOffer.eyebrow}
                </span>
                <h2 className="mt-2 text-[21px] leading-snug" style={{ fontFamily: mincho }}>
                  {c.grandOffer.heading}
                </h2>
                <p className="mt-3 text-[12.5px] leading-[1.9] opacity-75">
                  {c.grandOffer.lead}
                </p>
              </div>
              {/* 金額プレート。金額は必ず白地＋深い金で置く（FVの訴求プレートと同じ扱い）。
                  バンド地の上に白文字で置くと、一番見せたい桁が一番弱くなってしまう。 */}
              <div
                className="mt-8 rounded-[3px] border px-5 py-8 text-center"
                style={{
                  background: "rgba(255,255,255,0.94)",
                  borderColor: c.accent,
                  color: c.ink,
                }}
              >
                {c.grandOffer.badge && (
                  <span
                    className="inline-block rounded-[2px] px-3.5 py-1.5 text-[10.5px] font-bold tracking-wide"
                    style={{ background: c.ink, color: "#F0DDB2" }}
                  >
                    {c.grandOffer.badge}
                  </span>
                )}
                <p
                  className="mt-5 text-[18px] leading-snug tracking-[0.08em]"
                  style={{ fontFamily: mincho }}
                >
                  {c.grandOffer.title}
                </p>
                <span
                  className="mx-auto mt-5 block h-px w-14"
                  style={{ background: `${c.accent}99` }}
                />
                {/* text-[30px] は数字を含まない文字列（テンプレのダミー等）のフォールバック。
                    数字があれば amountEmphasis 側の span がサイズを上書きする。 */}
                <p
                  className="mt-5 text-[30px] font-bold leading-none tracking-[0.02em]"
                  style={{ fontFamily: mincho, color: goldOnWhite }}
                >
                  {amountEmphasis(c.grandOffer.amount)}
                </p>
              </div>
              {c.grandOffer.feature &&
                (c.grandOffer.feature.image ? (
                  // 写真つきの目玉特典。金額プレートの下に敷いて「金額 → 中身」の順に読ませる。
                  <div className="relative mt-4 overflow-hidden rounded-[3px]">
                    <ImageSlot
                      src={c.grandOffer.feature.image.src}
                      placeholder={c.grandOffer.feature.image.placeholder}
                      objectPosition={c.grandOffer.feature.image.position ?? "center"}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                    />
                    {/* 客室写真は壁も窓も明るいことが多いので、スクリムは強めに当てる。 */}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(59,55,48,0.58)_0%,rgba(59,55,48,0.80)_100%)]" />
                    <div
                      className="relative px-5 py-9 text-center text-white"
                      style={{ textShadow: "0 2px 14px rgba(59,55,48,0.75)" }}
                    >
                      <p className="text-[15.5px] leading-relaxed" style={{ fontFamily: mincho }}>
                        {nl(c.grandOffer.feature.title)}
                      </p>
                      {/* 写真の上ではブランドゴールドの罫線が沈むので、淡いシャンパンで引く。 */}
                      <span
                        className="mx-auto mt-4 block h-px w-12"
                        style={{ background: "#E2C892" }}
                      />
                      <p className="mt-4 text-[12px] leading-[1.9] text-white/85">
                        {c.grandOffer.feature.body}
                      </p>
                    </div>
                  </div>
                ) : (
                  // 目玉特典は金額プレートより一段弱く。白で塗ると金額と主役を奪い合う。
                  <div
                    className="mt-4 rounded-[3px] border px-5 py-5 text-center"
                    style={{ background: "rgba(255,255,255,0.14)", borderColor: band.rule }}
                  >
                    <p className="text-[14.5px] leading-relaxed" style={{ fontFamily: mincho }}>
                      {nl(c.grandOffer.feature.title)}
                    </p>
                    <p className="mt-2 text-[12px] leading-[1.9] opacity-80">
                      {c.grandOffer.feature.body}
                    </p>
                  </div>
                ))}
              <p className="mt-4 text-[11px] leading-[1.9] opacity-75">{c.grandOffer.note}</p>
            </section>
          )}

          {/* ── schedule ── */}
          {c.schedule && (
            <section id="schedule" className={`${lightBg()} px-5 py-12`}>
              <Heading kicker="SCHEDULE" title={c.schedule.heading} lead={c.schedule.lead} />
              <ul className="mt-8 flex flex-col gap-3">
                {c.schedule.dates.map((d, i) => (
                  <li
                    key={`${d.date}-${i}`}
                    className="flex items-center gap-4 rounded-2xl border border-[var(--ink)]/10 bg-[var(--paper)] px-4 py-4"
                  >
                    <div className="flex w-14 shrink-0 flex-col items-center">
                      <span className="text-[20px] leading-none" style={{ fontFamily: mincho }}>
                        {d.date}
                      </span>
                      <span className="mt-1 text-[10px] tracking-widest opacity-60">
                        {d.weekday}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 border-l border-[var(--ink)]/10 pl-4">
                      <p className="text-[13px] font-bold leading-snug">{d.title}</p>
                      <p className="mt-1 text-[11.5px] tracking-wide opacity-60">{d.times}</p>
                    </div>
                    {d.badge && (
                      <span
                        className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
                        style={{ background: c.accent }}
                      >
                        {d.badge}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[11px] leading-[1.9] opacity-55">{c.schedule.note}</p>
            </section>
          )}

          {/* ── experience（カルーセル） ── */}
          <section className={`${lightBg()} py-12`}>
            <div className="px-5">
              <Heading
                kicker="EXPERIENCE"
                title={c.experience.heading}
                lead={c.experience.lead}
              />
            </div>
            <Carousel items={c.experience.items} />
          </section>

          {/* ── recommend ── */}
          {c.recommend && (
            <section className={`${lightBg()} px-5 py-12`}>
              <Heading
                kicker="RECOMMEND"
                title={c.recommend.heading}
                lead={c.recommend.lead}
              />
              <ul className="mt-8 flex flex-col gap-px overflow-hidden rounded-2xl bg-[var(--ink)]/10">
                {c.recommend.items.map((item, i) => (
                  <li
                    key={`${item}-${i}`}
                    className="flex items-center gap-3 bg-[var(--paper)] px-5 py-4"
                  >
                    <span
                      className="shrink-0 text-[15px] font-bold leading-none"
                      style={{ color: c.accent }}
                    >
                      ✓
                    </span>
                    <span className="text-[13.5px] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ── privilege（来館特典） ── */}
          <section className="px-5 py-12" style={{ background: band.bg, color: band.text }}>
            <div className="text-center">
              <span
                className="text-[11px] italic tracking-[0.2em]"
                style={{ fontFamily: playfair, color: band.accent }}
              >
                PRIVILEGE
              </span>
              <h2 className="mt-2 text-[21px] leading-snug" style={{ fontFamily: mincho }}>
                {c.privilege.heading}
              </h2>
              <p className="mt-3 text-[12.5px] leading-[1.9] opacity-75">{c.privilege.lead}</p>
            </div>
            {/* 特典は1枚ずつ白いカードに立てる。バンド地に白文字で流すと、
                金額が全部同じ重さになって「いくら分か」が読み取れない。 */}
            <div className="mt-8 flex flex-col gap-3">
              {c.privilege.items.map((p, i) => (
                <div
                  key={`${p.title}-${i}`}
                  className="rounded-[3px] border px-5 py-5"
                  style={{
                    background: "rgba(255,255,255,0.94)",
                    borderColor: `${c.accent}59`,
                    color: c.ink,
                  }}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="flex min-w-0 items-baseline gap-2.5">
                      <span
                        className="shrink-0 text-[12px] italic"
                        style={{ fontFamily: playfair, color: c.accent }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-[14.5px]" style={{ fontFamily: mincho }}>
                        {p.title}
                      </h3>
                    </div>
                    <span
                      className="shrink-0 text-[20px] font-bold"
                      style={{ fontFamily: mincho, color: goldOnWhite }}
                    >
                      {p.amount}
                    </span>
                  </div>
                  <p className="mt-2.5 text-[11.5px] leading-[1.85] opacity-60">{p.body}</p>
                </div>
              ))}
            </div>
            {/* 合計は生成り地＋太い金枠でカード群から一段持ち上げる。 */}
            <div
              className="mt-5 rounded-[3px] border-2 px-5 py-7 text-center"
              style={{ background: c.paper, borderColor: c.accent, color: c.ink }}
            >
              <p className="text-[11px] tracking-[0.3em]" style={{ fontFamily: playfair }}>
                TOTAL
              </p>
              <p
                className="mt-3 text-[28px] font-bold leading-none"
                style={{ fontFamily: mincho, color: goldOnWhite }}
              >
                {amountEmphasis(c.privilege.total, 40, 18)}
              </p>
            </div>
            {c.privilege.contract && (
              // 成約特典だけ濃色に反転させ、来館特典より一段上であることを見せる。
              <div
                className="mt-4 rounded-[3px] px-5 py-7 text-center"
                style={{ background: c.ink, color: "#F0DDB2" }}
              >
                <p className="text-[12px] font-bold tracking-[0.1em]">
                  {c.privilege.contract.label}
                </p>
                <span className="mx-auto mt-3 block h-px w-12" style={{ background: "#E2C892" }} />
                <p className="mt-3 text-[28px] font-bold leading-none" style={{ fontFamily: mincho }}>
                  {amountEmphasis(c.privilege.contract.amount, 44, 19)}
                </p>
              </div>
            )}
            <p className="mt-4 text-[11px] leading-[1.9] opacity-75">{c.privilege.totalNote}</p>
          </section>

          {/* ── gallery ── */}
          {c.gallery && (
            <section className={`${lightBg()} py-12`}>
              <div className="px-5">
                <Heading kicker="VENUE" title={c.gallery.heading} lead={c.gallery.lead} />
              </div>
              <div className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
                {c.gallery.photos.map((p, i) => (
                  <figure key={`${p.caption}-${i}`} className="w-[74%] shrink-0 snap-center">
                    <ImageSlot
                      src={p.src}
                      placeholder={p.placeholder}
                      objectPosition={p.position ?? "center"}
                      radius={12}
                      style={{ width: "100%", aspectRatio: "4 / 3" }}
                    />
                    <figcaption className="mt-2 text-[11.5px] tracking-wide opacity-60">
                      {p.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* ── reasons ── */}
          {c.reasons && (
            <section className={`${lightBg()} px-5 py-12`}>
              <Heading kicker="REASON" title={c.reasons.heading} />
              <div className="mt-9 flex flex-col gap-11">
                {c.reasons.items.map((r, i) => (
                  <div key={`${r.num}-${i}`}>
                    <ImageSlot
                      src={r.image.src}
                      placeholder={r.image.placeholder}
                      objectPosition={r.image.position ?? "center"}
                      radius={12}
                      style={{ width: "100%", aspectRatio: "3 / 2" }}
                    />
                    <div className="mt-4 flex items-baseline gap-3">
                      <span
                        className="text-[20px] italic leading-none text-[var(--accent)]"
                        style={{ fontFamily: playfair }}
                      >
                        {r.num}
                      </span>
                      <h3 className="text-[16.5px] leading-snug" style={{ fontFamily: mincho }}>
                        {r.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-[12.5px] leading-[1.95] opacity-70">{r.body}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── plan ── */}
          {c.plan && (
            <section className={`${lightBg()} px-5 py-12`}>
              <Heading kicker="PLAN" title={c.plan.heading} lead={c.plan.lead} />
              <div className="mt-8 flex flex-col gap-4">
                {c.plan.items.map((p, i) => (
                  <div
                    key={`${p.name}-${i}`}
                    className="rounded-2xl border border-[var(--ink)]/10 bg-[var(--paper)] px-5 py-6"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-[15px]" style={{ fontFamily: mincho }}>
                        {p.name}
                      </h3>
                      <span className="text-[11.5px] opacity-60">{p.guests}</span>
                    </div>
                    <div className="mt-3 flex items-baseline gap-2.5">
                      {p.was && (
                        <span className="text-[13px] line-through opacity-40">{p.was}</span>
                      )}
                      <span
                        className="text-[24px] leading-none text-[var(--accent)]"
                        style={{ fontFamily: mincho }}
                      >
                        {p.price}
                      </span>
                    </div>
                    <ul className="mt-4 flex flex-col gap-1.5 border-t border-[var(--ink)]/10 pt-4">
                      {p.includes.map((inc, j) => (
                        <li
                          key={`${inc}-${j}`}
                          className="flex items-start gap-2 text-[12px] opacity-70"
                        >
                          <span className="text-[var(--accent)]">・</span>
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[11px] leading-[1.9] opacity-55">{c.plan.note}</p>
            </section>
          )}

          {/* ── voices ── */}
          {c.voices && (
            <section className={`${lightBg()} py-12`}>
              <div className="px-5">
                <Heading kicker="VOICE" title={c.voices.heading} />
              </div>
              <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">
                {c.voices.items.map((v, i) => (
                  <div
                    key={`${v.name}-${i}`}
                    className="w-[78%] shrink-0 snap-center rounded-2xl bg-white p-4 shadow-[0_10px_28px_rgba(59,55,48,0.08)]"
                  >
                    <ImageSlot
                      src={v.image.src}
                      placeholder={v.image.placeholder}
                      objectPosition={v.image.position ?? "center"}
                      radius={10}
                      style={{ width: "100%", aspectRatio: "4 / 3" }}
                    />
                    <p className="mt-4 text-[12.5px] leading-[1.95] opacity-75">{v.body}</p>
                    <p className="mt-3 text-[11.5px] opacity-55">
                      {v.name}　{v.date}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── facility（施設紹介） ── */}
          {c.facility && (
            <section className={`${lightBg()} py-12`}>
              <div className="px-5">
                <Heading
                  kicker="FACILITY"
                  title={c.facility.heading}
                  lead={c.facility.lead}
                />
              </div>
              <Carousel items={c.facility.items} aspect={c.facility.aspect} />
            </section>
          )}

          {/* ── flow ── */}
          <section className={`${lightBg()} px-5 py-12`}>
            <Heading kicker="FLOW" title={c.flow.heading} lead={c.flow.lead} />
            <div className="mt-9 flex flex-col">
              {c.flow.steps.map((s, i) => {
                const last = i === c.flow.steps.length - 1;
                return (
                  <div key={`${s.num}-${i}`} className="flex gap-4">
                    <div className="flex flex-none flex-col items-center">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-full text-[13px] italic text-white"
                        style={{ background: c.accent, fontFamily: playfair }}
                      >
                        {s.num}
                      </span>
                      {!last && <span className="w-px flex-1 bg-[var(--ink)]/15" />}
                    </div>
                    <div className={last ? "pb-0" : "pb-8"}>
                      <div className="flex items-baseline gap-2.5">
                        <h3 className="text-[14.5px]" style={{ fontFamily: mincho }}>
                          {s.title}
                        </h3>
                        {s.time && <span className="text-[11px] opacity-50">{s.time}</span>}
                      </div>
                      <p className="mt-2 text-[12px] leading-[1.9] opacity-65">{s.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── faq ── */}
          {c.faq && (
            <section id="faq" className={`${lightBg()} px-5 py-12`}>
              <Heading kicker="FAQ" title={c.faq.heading} />
              <div className="mt-8">
                <FaqAccordion items={c.faq.items} ink={c.ink} accent={c.accent} />
              </div>
            </section>
          )}

          {/* ── access ── */}
          <section className={`${lightBg()} px-5 py-12`}>
            <Heading kicker="ACCESS" title={c.access.heading} />
            <div className="mt-8">
              <ImageSlot
                src={c.access.map.src}
                placeholder={c.access.map.placeholder}
                objectPosition={c.access.map.position ?? "center"}
                radius={12}
                style={{ width: "100%", aspectRatio: "16 / 9" }}
              />
              <h3 className="mt-5 text-[15px]" style={{ fontFamily: mincho }}>
                {c.access.venueName}
              </h3>
              <p className="mt-2 text-[12.5px] leading-[1.9] opacity-70">{c.access.address}</p>
              {c.access.routes.length > 0 && (
                <ul className="mt-3 flex flex-col gap-1">
                  {c.access.routes.map((r, i) => (
                    <li key={`${r}-${i}`} className="flex items-start gap-2 text-[12px] opacity-70">
                      <span className="text-[var(--accent)]">・</span>
                      {r}
                    </li>
                  ))}
                </ul>
              )}
              <TelLink
                clientSlug={c.slug}
                tel={c.access.tel}
                className="mt-5 flex items-center justify-center gap-2 rounded-full border py-4 text-[15px] tracking-wider"
                style={{ borderColor: `${c.accent}80`, color: c.ink, fontFamily: mincho }}
              >
                TEL {c.access.tel}
              </TelLink>
              <p className="mt-2 text-center text-[11px] opacity-55">{c.access.telNote}</p>
            </div>
          </section>

          {/* ── overview（予約概要） ── */}
          {c.overview && (
            <section className={`${lightBg()} px-5 py-12`}>
              <Heading kicker="OVERVIEW" title={c.overview.heading} />
              <dl className="mt-8 flex flex-col">
                {c.overview.items.map((o, i) => (
                  <div
                    key={`${o.label}-${i}`}
                    className="border-t border-[var(--ink)]/15 py-4 last:border-b"
                  >
                    <dt className="text-[11px] tracking-widest opacity-50">{o.label}</dt>
                    <dd className="mt-1.5 text-[13px] leading-[1.85]">{nl(o.value)}</dd>
                  </div>
                ))}
              </dl>
              {c.overview.note && (
                <p className="mt-4 text-[11px] leading-[1.9] opacity-55">{c.overview.note}</p>
              )}
            </section>
          )}

          {/* ── form ── */}
          <section
            id="form"
            className={
              formLight
                ? `${lightBg()} px-5 py-12`
                : "bg-[var(--ink)] px-5 py-12 text-[#F6F1E7]"
            }
          >
            {formLight ? (
              <Heading kicker="RESERVATION" title={c.form.heading} lead={c.form.lead} />
            ) : (
              <div className="text-center">
                <span
                  className="text-[11px] italic tracking-[0.2em] text-[var(--accent)]"
                  style={{ fontFamily: playfair }}
                >
                  RESERVATION
                </span>
                <h2 className="mt-2 text-[21px] leading-snug" style={{ fontFamily: mincho }}>
                  {c.form.heading}
                </h2>
                <p className="mt-3 text-[12.5px] leading-[1.9] text-[#F6F1E7]/70">
                  {nl(c.form.lead)}
                </p>
              </div>
            )}
            <div
              className={
                formLight
                  ? `mt-8 rounded-[3px] border ${oppositeLightBg()} px-4 py-6 text-[var(--ink)]`
                  : "mt-8 rounded-2xl bg-[var(--paper)] px-4 py-6 text-[var(--ink)]"
              }
              style={formLight ? { borderColor: `${c.accent}59` } : undefined}
            >
              <LPForm
                clientSlug={c.slug}
                accent={c.accent}
                fields={c.form.fields}
                submitLabel={c.form.submitLabel}
                errorMessage={c.form.errorMessage}
                disclaimer={nl(c.form.disclaimer)}
                submitStyle={{
                  background: goldGrad(c.accent),
                  boxShadow: `0 10px 26px ${c.accent}59`,
                }}
              />
            </div>
          </section>
        </div>
      </div>

      <StickyFooterCTA
        anchor={c.sticky.anchor}
        buttonText={c.sticky.buttonText}
        showAfter={c.sticky.showAfter}
        buttonGradient={goldGrad(c.accent)}
        shadowColor={`${c.accent}66`}
        borderColor={`${c.accent}59`}
        offers={[
          <span key="offer" className="text-[13px] font-bold" style={{ color: c.ink }}>
            {c.sticky.offerText}
          </span>,
        ]}
      />
    </LPShell>
  );
}
