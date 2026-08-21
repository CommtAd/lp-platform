import type { CSSProperties, ReactNode } from "react";
import LPShell from "@/components/LPShell";
import LPForm from "@/components/LPForm";
import FollowCTA from "./FollowCTA";
import { CTAButton, Crown, Laurel, Pillars, nl, MINCHO, GOTHIC } from "./ui";
import config from "./config";

const c = config;
const P = c.primary;

/* ── 小物 ───────────────────────────────────────────── */

function Img({ src, alt = "", style, radius = 0 }: { src: string; alt?: string; style?: CSSProperties; radius?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} style={{ width: "100%", display: "block", borderRadius: radius, ...style }} />;
}

/** オレンジの吹き出しピル（肩こり等）。 */
function Bubble({ text }: { text: string }) {
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        style={{
          display: "inline-block",
          background: P,
          color: "#fff",
          fontFamily: MINCHO,
          fontWeight: 700,
          fontSize: 20,
          padding: "10px 14px",
          borderRadius: 999,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>
      <span
        style={{
          position: "absolute",
          bottom: -7,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: `9px solid ${P}`,
        }}
      />
    </span>
  );
}

/** 見出しの上下の細い横線で挟むリード。 */
function RuledLead({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, color: "#7a736a" }}>
      <span style={{ height: 1, width: 34, background: "#b7ad9f" }} />
      <span style={{ fontFamily: MINCHO, fontSize: 20, letterSpacing: "0.04em" }}>{children}</span>
      <span style={{ height: 1, width: 34, background: "#b7ad9f" }} />
    </div>
  );
}

/** 92% ドーナツ。 */
function Donut() {
  const s = c.hero.stat;
  return (
    <div
      style={{
        position: "relative",
        width: 118,
        height: 118,
        flexShrink: 0,
        borderRadius: "50%",
        background: `conic-gradient(#6f4a24 0 ${s.num}%, #e6ddd0 ${s.num}% 100%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 14,
          borderRadius: "50%",
          background: "#fff",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
        }}
      >
        <span style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 44, color: "#6f4a24", lineHeight: 1 }}>{s.num}</span>
        <span style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 18, color: "#6f4a24" }}>{s.unit}</span>
      </div>
    </div>
  );
}

/** オレンジの矢羽根（入会金 通常20,000円 →）＋ 0円。 */
function PriceArrow({ label, was, now }: { label: string; was: string; now: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, width: "100%" }}>
      <div
        style={{
          flex: "1 1 0",
          minWidth: 0,
          overflow: "hidden",
          background: "linear-gradient(90deg,#fb8b4d,#fd7b43)",
          color: "#fff",
          padding: "13px 26px 13px 14px",
          clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)",
          display: "flex",
          alignItems: "baseline",
          gap: 6,
        }}
      >
        <span style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 18, whiteSpace: "nowrap" }}>{label}</span>
        <span style={{ fontFamily: MINCHO, fontSize: 12.5, whiteSpace: "nowrap" }}>{was}</span>
      </div>
      <span style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 42, color: P, lineHeight: 1, flexShrink: 0, width: 74, textAlign: "center" }}>
        {now}
      </span>
    </div>
  );
}

/** シンプルなライン系アイコン。 */
function Icon({ name, size = 34 }: { name: string; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "#8a8378", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, ReactNode> = {
    clipboard: (<><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4h6v2H9zM8 10h8M8 14h8M8 18h5" /></>),
    posture: (<><circle cx="12" cy="5" r="2" /><path d="M12 7v7M12 10l-4 2M12 10l4 2M12 14l-3 6M12 14l3 6" /></>),
    reformer: (<><path d="M3 15h18M5 15v3M19 15v3M7 12h10l1 3H6z" /><circle cx="8" cy="17.5" r="1.2" /><circle cx="16" cy="17.5" r="1.2" /></>),
    check2: (<><path d="M4 6l3 3 5-6" /><path d="M14 5h6M14 12h6M4 15l3 3 5-6M14 17h6" /></>),
    balance: (<><path d="M12 3v18M4 8h16M6 8l-2 6a3 3 0 006 0zM18 8l-2 6a3 3 0 006 0z" /></>),
    target: (<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></>),
  };
  return <svg {...common}>{paths[name] ?? paths.target}</svg>;
}

/** ブランド見出し（ritsu pilates ＋ 和文）。 */
function BrandKicker({ brand, tail, size = 22, color = "#4a453f" }: { brand: string; tail?: string; size?: number; color?: string }) {
  return (
    <span style={{ fontFamily: MINCHO, fontSize: size, fontWeight: 700, color, letterSpacing: "0.02em" }}>
      <span style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>{brand}</span>
      {tail}
    </span>
  );
}

/* ── ページ ─────────────────────────────────────────── */

export default function Page() {
  const rootStyle = {
    maxWidth: c.maxWidth,
    margin: "0 auto",
    background: "#fff",
    fontFamily: GOTHIC,
    color: c.ink,
  } as CSSProperties;

  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div style={{ background: "#fff" }}>
        <div style={rootStyle}>
          {/* ── ヘッダー ── */}
          <header style={{ background: c.headerBg, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 16px" }}>
            <Img src={c.logo} alt="ritsu pilates" style={{ width: "auto", height: 52 }} />
            <span style={{ display: "inline-flex", alignItems: "baseline", border: "1px solid #d9d6c8", background: "#fff", padding: "7px 13px", fontFamily: MINCHO, color: "#3a3a3a", fontSize: 15, whiteSpace: "nowrap" }}>
              {c.stationBadge.pre}
              <span style={{ color: P, fontWeight: 700, fontSize: 21, margin: "0 2px" }}>{c.stationBadge.num}</span>
              {c.stationBadge.post}
            </span>
          </header>

          {/* ── FV ── */}
          <div style={{ background: "#f6ef9d", textAlign: "center", padding: "10px 12px", fontFamily: MINCHO, fontSize: 19, fontWeight: 700, color: "#4a453f", letterSpacing: "0.02em" }}>
            {c.hero.newOpen}
          </div>
          <section style={{ background: "linear-gradient(180deg,#fdf4ef,#fff)" }}>
            <div style={{ position: "relative" }}>
              <Img src={c.hero.photo} alt="" />
              <div style={{ position: "absolute", top: 18, left: 14, display: "flex", flexDirection: "row-reverse", gap: 8 }}>
                {c.hero.catch.map((line, i) => (
                  <div key={i} style={{ writingMode: "vertical-rl", background: "rgba(255,255,255,0.94)", padding: "14px 9px", fontFamily: MINCHO, fontWeight: 700, fontSize: 22, letterSpacing: "0.12em", color: "#3f3a36", boxShadow: "0 2px 10px rgba(70,60,40,0.15)" }}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: "0 5%", marginTop: -14, position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
                {c.hero.bubbles.map((b) => <Bubble key={b} text={b} />)}
              </div>
              <div style={{ marginTop: 22 }}><RuledLead>{c.hero.lead}</RuledLead></div>
              <h1 style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 46, textAlign: "center", color: "#4a453f", letterSpacing: "0.04em", margin: "8px 0 4px" }}>
                {c.hero.headline}
              </h1>
              <div style={{ marginTop: 20 }}><Pillars items={c.pillars} primary={P} /></div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "26px 0 8px" }}>
                <Donut />
                <div style={{ fontFamily: MINCHO, fontSize: 20, lineHeight: 1.6, color: "#4a453f" }}>
                  {c.hero.stat.tail}
                  <br />
                  <span style={{ background: "linear-gradient(transparent 60%, #f6ef9d 60%)", fontWeight: 700 }}>{c.hero.stat.emph}</span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", paddingBottom: 26 }}>
                <span style={{ display: "inline-block", border: `1.5px solid ${P}`, color: P, borderRadius: 14, padding: "8px 16px", fontSize: 13, textAlign: "center", lineHeight: 1.5, position: "relative" }}>
                  {nl(c.hero.statNote)}
                </span>
              </div>
            </div>
          </section>

          {/* ── オファー（キャンペーン）── */}
          <section id="offer" style={{ background: "#fbf7ef", padding: "0 0 30px" }}>
            {/* バンド */}
            <div style={{ position: "relative", background: P, color: "#fff", padding: "18px 5% 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ flexShrink: 0, width: 72, height: 72, borderRadius: "50%", background: "#fdf6df", color: "#8a5a20", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontFamily: MINCHO, fontWeight: 700, fontSize: 15, lineHeight: 1.3 }}>
                  {nl(c.offer.band.badge)}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 27, letterSpacing: "0.02em", textShadow: "0 1px 2px rgba(0,0,0,0.12)" }}>
                    {c.offer.band.title}
                  </div>
                  <div style={{ marginTop: 6, background: "#fff", color: "#4a453f", borderRadius: 3, padding: "5px 8px", fontSize: 14, textAlign: "center", fontWeight: 700 }}>
                    <span style={{ color: P }}>{c.offer.band.note}</span>{c.offer.band.noteTail}
                  </div>
                </div>
              </div>
              <span style={{ position: "absolute", bottom: -13, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "14px solid transparent", borderRight: "14px solid transparent", borderTop: `14px solid ${P}` }} />
            </div>

            {/* トライアルカード */}
            <div style={{ margin: "26px 5% 0", background: "#fff", borderTop: "3px solid #e7d9a6", borderBottom: "3px solid #e7d9a6", padding: "26px 20px" }}>
              <div style={{ textAlign: "center", fontSize: 15, color: "#6a635a", letterSpacing: "0.04em" }}>{c.offer.trial.kicker}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 }}>
                <Laurel dir={-1} />
                <div style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 30, color: "#4a453f" }}>{c.offer.trial.title}</div>
                <Laurel dir={1} />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 16 }}>
                <div style={{ textAlign: "center", color: "#8a8378" }}>
                  <div style={{ fontSize: 14 }}>{c.offer.trial.wasLabel}</div>
                  <div style={{ fontSize: 22, textDecoration: "line-through", fontWeight: 700 }}>
                    {c.offer.trial.was}<span style={{ fontSize: 11 }}> {c.offer.trial.wasTax}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 8 }}>
                <span style={{ background: P, color: "#fff", fontFamily: MINCHO, fontWeight: 700, fontSize: 20, padding: "10px 26px 10px 16px", clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%)" }}>
                  {c.offer.trial.arrow}
                </span>
                <span style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 62, color: P, lineHeight: 1 }}>{c.offer.trial.now}</span>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                {c.offer.trial.badges.map((b) => (
                  <div key={b.label} style={{ flex: 1, aspectRatio: "1", borderRadius: "50%", background: "#faf7f0", border: "1px solid #eee6d6", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, textAlign: "center", boxShadow: "0 4px 10px rgba(120,90,40,0.06)" }}>
                    <Icon name={b.icon === "clipboard" ? "clipboard" : b.icon === "posture" ? "posture" : "reformer"} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#6a635a", lineHeight: 1.25 }}>{nl(b.label)}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
                {c.offer.trial.photos.map((p) => <Img key={p} src={p} radius={6} style={{ flex: 1, aspectRatio: "4/3", objectFit: "cover" as const }} />)}
              </div>
            </div>

            {/* さらに 入会特典 */}
            <div style={{ position: "relative", textAlign: "center", marginTop: 30 }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 78, height: 78, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%, #fdf6df, #ecdca0)", color: "#8a5a20", fontFamily: MINCHO, fontWeight: 700, fontSize: 20, boxShadow: "0 4px 10px rgba(150,110,40,0.2)" }}>
                {c.offer.join.divider}
              </span>
            </div>
            <div style={{ margin: "-6px 5% 0", background: "#fff", borderTop: "3px solid #e7d9a6", borderBottom: "3px solid #e7d9a6", padding: "26px 20px 30px" }}>
              <div style={{ textAlign: "center", fontFamily: MINCHO, fontSize: 22, fontWeight: 700, color: "#4a453f", letterSpacing: "0.04em" }}>
                {c.offer.join.heading}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
                {c.offer.join.rows.map((r) => <PriceArrow key={r.label} label={r.label} was={r.was} now={r.now} />)}
              </div>
              <div style={{ position: "relative", marginTop: 18, background: "#d80f16", borderRadius: 4, padding: "14px 14px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, overflow: "hidden" }}>
                <span style={{ flexShrink: 0, width: 42, height: 42, background: "#fff", color: "#d80f16", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MINCHO, fontWeight: 700, fontSize: 14, clipPath: "polygon(50% 0%,61% 12%,76% 6%,79% 22%,95% 24%,88% 39%,100% 50%,88% 61%,95% 76%,79% 78%,76% 94%,61% 88%,50% 100%,39% 88%,24% 94%,21% 78%,5% 76%,12% 61%,0% 50%,12% 39%,5% 24%,21% 22%,24% 6%,39% 12%)" }}>
                  {c.offer.join.redBadge}
                </span>
                <span style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 22, color: "#fff", whiteSpace: "nowrap" }}>{c.offer.join.redLabel}</span>
                <span style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 42, color: "#ffd94a", lineHeight: 1, textShadow: "0 2px 2px rgba(0,0,0,0.25)" }}>{c.offer.join.redNow}</span>
              </div>
            </div>

            <div style={{ margin: "26px 5% 0" }}><CTAButton label={c.cta.label} /></div>
          </section>

          {/* ── about ── */}
          <section style={{ background: "linear-gradient(180deg,#fdeee9,#fff)", padding: "40px 5%" }}>
            <div style={{ textAlign: "center", fontSize: 14, color: "#8a8378", letterSpacing: "0.04em" }}>{c.about.kicker}</div>
            <div style={{ textAlign: "center", marginTop: 4 }}><BrandKicker brand={c.about.brand} tail={c.about.brandTail} size={24} /></div>
            <h2 style={{ fontFamily: MINCHO, fontWeight: 700, textAlign: "center", color: "#4a453f", fontSize: 32, lineHeight: 1.35, margin: "18px 0 22px" }}>
              {c.about.headline.map((l, i) => <span key={i} style={{ display: "block" }}>{l}</span>)}
            </h2>
            <Pillars items={c.pillars} primary={P} />
            <div style={{ marginTop: 24 }}><Img src={c.about.photo} radius={10} /></div>
            <div style={{ marginTop: 22, textAlign: "center", fontFamily: MINCHO, fontSize: 16.5, fontWeight: 700, lineHeight: 2, color: "#4a453f" }}>
              {c.about.highlight.map((l, i) => (
                <span key={i} style={{ background: "linear-gradient(transparent 62%, #f6ef9d 62%)", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>{l}<br /></span>
              ))}
            </div>
          </section>

          {/* ── problem ── */}
          <section style={{ background: "linear-gradient(180deg,#efe7e0,#e7ddd4)", padding: "44px 5%" }}>
            <div style={{ position: "relative", background: "#fff", borderRadius: 20, padding: "34px 22px 26px", boxShadow: "0 14px 30px rgba(90,70,50,0.1)" }}>
              <span style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", width: 44, height: 44, borderRadius: "50%", background: "#fff", boxShadow: "0 6px 14px rgba(90,70,50,0.14)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MINCHO, fontWeight: 700, fontSize: 26, color: P }}>！</span>
              <h2 style={{ textAlign: "center", fontFamily: MINCHO, fontWeight: 700, color: "#4a453f", fontSize: 26, lineHeight: 1.4, margin: 0 }}>
                {c.problem.title[0]}<span style={{ fontSize: 34, color: P }}>{c.problem.title[1]}</span><br />{c.problem.title[2]}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 24 }}>
                {c.problem.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }} fill="none" stroke={P} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 12l3 3 5-6" /></svg>
                    <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.7, color: "#4a453f" }}>
                      {item.map(([t, hl], j) => hl ? <span key={j} style={{ color: P, fontWeight: 700 }}>{t}</span> : <span key={j}>{t}</span>)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: 34 }}>
              <div style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 26, color: "#4a453f", borderBottom: "1px solid #b7ad9f", display: "inline-block", paddingBottom: 6 }}>{c.problem.bridge}</div>
              <div style={{ color: "#a99", fontSize: 22, marginTop: 6 }}>≫</div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              {c.problem.concerns.map((cc) => (
                <div key={cc.caption} style={{ flex: 1 }}>
                  <div style={{ background: "linear-gradient(180deg,#fef3d0,#f7e6a8)", color: "#7a5a20", fontSize: 12, fontWeight: 700, textAlign: "center", borderRadius: 8, padding: "6px 4px", lineHeight: 1.3, marginBottom: 6 }}>{nl(cc.caption)}</div>
                  <Img src={cc.photo} radius={8} style={{ aspectRatio: "3/4", objectFit: "cover" as const }} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8, marginTop: 16 }}>
              {c.problem.conclusions.map((t, i) => (
                <div key={i} style={{ writingMode: "vertical-rl", background: "#fff", borderRadius: 8, padding: "16px 10px", fontFamily: MINCHO, fontWeight: 700, fontSize: 20, color: "#4a453f", boxShadow: "0 4px 10px rgba(90,70,50,0.1)", order: i === 0 ? 0 : 2 }}>{t}</div>
              ))}
              <Img src={c.problem.mainPhoto} radius={10} style={{ flex: 1, order: 1, aspectRatio: "3/4", objectFit: "cover" as const, maxWidth: 300 }} />
            </div>
          </section>

          {/* ── solution ── */}
          <section style={{ background: "linear-gradient(180deg,#fdeee6,#fff)" }}>
            <div style={{ background: P, color: "#fff", textAlign: "center", fontFamily: MINCHO, fontWeight: 700, fontSize: 20, padding: "12px 5%", letterSpacing: "0.04em" }}>{c.solution.band}</div>
            <div style={{ padding: "28px 5% 40px" }}>
              <h2 style={{ textAlign: "center", margin: 0 }}>
                <span style={{ display: "block" }}><BrandKicker brand={c.solution.brand} tail={c.solution.brandTail} size={22} /></span>
                <span style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 46, color: "#4a453f", letterSpacing: "0.04em" }}>{c.solution.headline}</span>
              </h2>
              <div style={{ position: "relative", marginTop: 18 }}>
                <Img src={c.solution.photo} radius={10} />
                <div style={{ position: "absolute", top: 16, left: 12, writingMode: "vertical-rl", fontFamily: MINCHO, fontWeight: 700, fontSize: 26, letterSpacing: "0.1em", color: "#4a453f", lineHeight: 1.6, background: "linear-gradient(90deg,transparent 30%, rgba(246,239,157,0.9) 30%)", padding: "6px 2px" }}>
                  {c.solution.verticalCatch}
                </div>
              </div>
              <div style={{ marginTop: 26 }}><Pillars items={c.pillars} primary={P} /></div>
              <p style={{ marginTop: 24, textAlign: "center", fontFamily: MINCHO, fontSize: 17, lineHeight: 2, color: "#4a453f" }}>{nl(c.solution.body)}</p>
            </div>
          </section>

          {/* ── method（feature）── */}
          <MethodSection />

          {/* ── invite（try）── */}
          <section style={{ background: "linear-gradient(180deg,#fff,#fdf5ea)", padding: "36px 5% 40px" }}>
            <div style={{ textAlign: "center", fontSize: 15, color: "#6a635a" }}>{c.invite.lead}</div>
            <div style={{ textAlign: "center", fontFamily: MINCHO, fontWeight: 700, fontSize: 40, color: "#4a453f", margin: "2px 0 18px" }}>
              {c.invite.catch[0]}{c.invite.catch[1]}<span style={{ color: "#f0b429" }}>{c.invite.catch[2]}✦</span>
            </div>
            <Img src={c.invite.photo} radius={10} />
            <div style={{ textAlign: "center", margin: "22px 0 6px" }}>
              <span style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 33, color: P, textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{c.invite.brand}</span>
            </div>
            <div style={{ textAlign: "center", fontFamily: MINCHO, fontWeight: 700, fontSize: 26, color: "#4a453f" }}>{c.invite.tail}</div>
            <div style={{ marginTop: 24 }}><Pillars items={c.pillars} primary={P} /></div>
          </section>

          {/* ── flow ── */}
          <section style={{ backgroundImage: `url('${c.asset}/bg-flow.jpg')`, backgroundSize: "cover", backgroundPosition: "center", padding: "36px 0 42px" }}>
            <h2 style={{ textAlign: "center", fontFamily: MINCHO, fontWeight: 700, fontSize: 32, color: "#fff", textShadow: "0 2px 6px rgba(120,80,30,0.35)", margin: "0 0 22px" }}>
              <span style={{ color: "#fff" }}>＼ </span>お試し体験の<span style={{ color: "#ffe08a" }}>流れ</span><span> ／</span>
            </h2>
            <div style={{ display: "flex", gap: 14, overflowX: "auto", scrollSnapType: "x mandatory", padding: "0 5%", WebkitOverflowScrolling: "touch" }}>
              {c.flow.steps.map((s) => (
                <div key={s.no} style={{ flex: "0 0 86%", maxWidth: 420, scrollSnapAlign: "center", background: "#fff", borderRadius: 20, padding: 18, boxShadow: "0 10px 24px rgba(90,70,40,0.14)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ flexShrink: 0, width: 62, height: 62, borderRadius: 14, background: P, color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em" }}>STEP</span>
                      <span style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 26 }}>{s.no}</span>
                    </span>
                    <span style={{ fontWeight: 800, fontSize: 24, color: "#4a453f" }}>{s.title}</span>
                  </div>
                  <Img src={s.photo} radius={10} style={{ marginTop: 14, aspectRatio: "16/10", objectFit: "cover" as const }} />
                  <p style={{ margin: "14px 2px 2px", fontSize: 14.5, lineHeight: 1.8, color: "#5a544c" }}>{s.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── オファー再掲CTA ── */}
          <div style={{ padding: "30px 5%", background: "#fbf7ef" }}><CTAButton label={c.cta.label} /></div>

          {/* ── access ── */}
          <section>
            <div style={{ background: "linear-gradient(180deg,#fdeee9,#fbf4ef)", textAlign: "center", padding: "26px 5% 22px" }}>
              <div style={{ letterSpacing: "0.12em", color: P, fontSize: 13, fontWeight: 700, textTransform: "uppercase" }}>{c.access.kicker}</div>
              <h2 style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 34, color: "#4a453f", margin: "4px 0 0" }}>{c.access.title}</h2>
            </div>
            <div style={{ padding: "26px 5% 40px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                {c.access.tags.map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 14, color: "#6a635a", fontFamily: MINCHO, fontSize: 19 }}>
                    <span style={{ color: "#d8b25f" }}>✦</span>{t}<span style={{ color: "#d8b25f" }}>✦</span>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <span style={{ display: "inline-block", background: P, color: "#fff", fontFamily: MINCHO, fontSize: 19, fontWeight: 700, borderRadius: 6, padding: "10px 26px" }}>{c.access.badge}</span>
              </div>
              <div style={{ width: "100%", aspectRatio: "16/10", marginTop: 20 }}>
                <iframe title="ritsu pilates アクセスマップ" src={c.mapEmbed} style={{ width: "100%", height: "100%", border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 18 }}>
                {c.access.rows.map((r) => (
                  <div key={r.label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{ flexShrink: 0, width: 96, textAlign: "center", background: P, color: "#fff", fontFamily: MINCHO, fontSize: 17, borderRadius: 4, padding: "4px 0", letterSpacing: "0.1em" }}>{r.label}</span>
                    <div style={{ fontFamily: MINCHO, fontSize: 19, lineHeight: 1.7, color: "#4a453f" }}>
                      {r.lines.map((l, i) => <div key={i}>{l}</div>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── フォーム ── */}
          <section id="contact" style={{ background: c.cream, padding: "44px 5% 52px" }}>
            <h2 style={{ textAlign: "center", fontFamily: MINCHO, fontWeight: 700, fontSize: 30, color: "#4a453f", margin: "0 0 24px" }}>
              {c.form.title}
            </h2>
            <LPForm
              clientSlug={c.slug}
              accent={P}
              fields={c.form.fields}
              submitLabel={c.form.submitLabel}
              submitStyle={{ background: P, boxShadow: `0 10px 22px ${P}66`, maxWidth: 240, margin: "0 auto" }}
            />
          </section>

          <footer style={{ background: "#4d4848", color: "#fff", padding: "10px 0", fontSize: 12, textAlign: "center" }}>© ritsu pilates</footer>
        </div>
      </div>

      <FollowCTA label={c.cta.label} />
    </LPShell>
  );
}

/* ── method（feature）セクション ─────────────────────── */
function MethodSection() {
  const m = c.method;
  return (
    <section style={{ background: "linear-gradient(180deg,#fdf3c9,#fff 22%)" }}>
      <div style={{ background: P, color: "#fff", textAlign: "center", padding: "22px 5% 26px", clipPath: "polygon(0 0,100% 0,100% 78%,50% 100%,0 78%)" }}>
        <div style={{ letterSpacing: "0.14em", fontSize: 13, fontWeight: 700, textTransform: "uppercase", opacity: 0.9 }}>{m.kicker}</div>
        <div style={{ fontFamily: MINCHO, fontSize: 20, marginTop: 6 }}>{m.lead}</div>
        <div style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 34 }}>{m.headline}</div>
      </div>

      {m.items.map((raw, idx) => {
        const it = raw as {
          no: string; eyebrow: string; title: string; sub: string; photo: string; body: string;
          highlight?: string[]; photo2?: string; body2?: string;
          karteQ?: string; karteA?: string; karteIcons?: string[];
        };
        return (
        <div key={it.no} style={{ padding: "20px 5% 34px" }}>
          <div style={{ background: P, color: "#fff", display: "inline-block", fontFamily: MINCHO, fontWeight: 700, letterSpacing: "0.1em", fontSize: 15, padding: "6px 18px", borderRadius: 3 }}>{it.no}</div>
          <div style={{ textAlign: "center", marginTop: 18 }}>
            <div style={{ letterSpacing: "0.1em", color: "#a99f90", fontSize: 12, fontWeight: 700, textTransform: "uppercase" }}>{it.eyebrow}</div>
            <h3 style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 32, color: "#4a453f", margin: "4px 0 0" }}>{it.title}</h3>
            <div style={{ display: "inline-block", marginTop: 10, fontFamily: MINCHO, fontSize: 15, color: "#4a453f", background: "linear-gradient(transparent 62%, #f6ef9d 62%)", fontWeight: 700 }}>{it.sub}</div>
          </div>
          <Img src={it.photo} radius={10} style={{ marginTop: 18, aspectRatio: "16/10", objectFit: "cover" as const }} />
          <p style={{ marginTop: 16, textAlign: "center", fontSize: 15, lineHeight: 1.95, color: "#5a544c" }}>{it.body}</p>

          {idx === 0 && (
            <>
              <div style={{ margin: "18px 0", textAlign: "center", fontFamily: MINCHO, fontWeight: 700, fontSize: 21, color: "#4a453f", lineHeight: 1.7 }}>
                {it.highlight!.map((l, i) => (
                  <span key={i} style={{ background: i === 1 ? "linear-gradient(transparent 60%,#f6ef9d 60%)" : undefined }}>{l}<br /></span>
                ))}
              </div>
              <Img src={it.photo2!} radius={10} style={{ aspectRatio: "16/10", objectFit: "cover" as const }} />
              <p style={{ marginTop: 16, textAlign: "center", fontSize: 15, lineHeight: 1.95, color: "#5a544c" }}>{it.body2}</p>
            </>
          )}

          {idx === 1 && (
            <>
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <span style={{ fontFamily: MINCHO, fontWeight: 700, fontSize: 24, color: "#4a453f", borderBottom: `2px solid ${P}`, paddingBottom: 4 }}>{it.karteQ}</span>
                <div style={{ color: "#c9a34f", fontSize: 22, marginTop: 8 }}>≫</div>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: "#5a544c", marginTop: 6 }}>{it.karteA}</p>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                {it.karteIcons!.map((label, i) => (
                  <div key={i} style={{ flex: 1, textAlign: "center", background: "#faf6ef", border: "1px solid #eee4d4", borderRadius: 12, padding: "16px 6px" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}><Icon name={["check2", "balance", "target"][i]} size={30} /></div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#6a635a", marginTop: 8, lineHeight: 1.35 }}>{nl(label)}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        );
      })}
    </section>
  );
}
