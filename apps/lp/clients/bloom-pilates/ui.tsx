import type { CSSProperties, ReactNode } from "react";

/** "\n" 区切りを <br> に。 */
export function nl(text: string): ReactNode {
  const parts = text.split("\n");
  return parts.map((p, i) => (
    <span key={i}>
      {p}
      {i < parts.length - 1 && <br />}
    </span>
  ));
}

export const MINCHO = "'Shippori Mincho', 'Yu Mincho', 'Hiragino Mincho ProN', serif";
export const GOTHIC = "'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif";

/** 王冠（2本柱バッジの上に載る金の王冠）。 */
export function Crown({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.72} viewBox="0 0 40 29" fill="none" aria-hidden>
      <path
        d="M4 25.5h32l2.2-16.8-9.4 6.2L20 3.2 11.2 14.9 1.8 8.7 4 25.5Z"
        fill="#d8b25f"
        stroke="#c79f45"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle cx="1.8" cy="7" r="2.4" fill="#d8b25f" />
      <circle cx="38.2" cy="7" r="2.4" fill="#d8b25f" />
      <circle cx="20" cy="2.2" r="2.6" fill="#d8b25f" />
      <rect x="4" y="25" width="32" height="3" rx="1.5" fill="#c79f45" />
    </svg>
  );
}

/** 月桂樹の枝（「90分のお試し体験」の左右など）。dir=-1 で左向き。 */
export function Laurel({ dir = 1, size = 40 }: { dir?: 1 | -1; size?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 30 36"
      fill="none"
      style={{ transform: dir === -1 ? "scaleX(-1)" : undefined }}
      aria-hidden
    >
      <path d="M22 34C12 30 8 20 12 4" stroke="#c9a34f" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {[6, 11, 16, 21, 26].map((y, i) => (
        <path
          key={i}
          d={`M${18 - i * 0.6} ${y}c-6 -1 -9 -4 -9 -7c4 0 8 2 9 7Z`}
          fill="#d8b25f"
          opacity="0.92"
        />
      ))}
    </svg>
  );
}

/** マシンピラティス × 専用カルテ の2本柱バッジ。 */
export function Pillars({
  items,
  primary,
}: {
  items: { eyebrow: string; label: string }[];
  primary: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "stretch", justifyContent: "center", gap: 4 }}>
      {items.map((p, i) => (
        <span key={i} style={{ display: "contents" }}>
          {i > 0 && (
            <span style={{ color: primary, fontSize: 26, fontWeight: 300, flexShrink: 0, alignSelf: "center" }}>×</span>
          )}
          <div
            style={{
              position: "relative",
              flex: "1 1 0",
              minWidth: 0,
              minHeight: 108,
              border: `1.5px solid ${primary}55`,
              borderRadius: 999,
              background: "#fff",
              padding: "16px 8px 14px",
              textAlign: "center",
              boxShadow: "0 6px 16px rgba(120,90,40,0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)" }}>
              <Crown />
            </span>
            <div style={{ color: primary, fontSize: 11.5, fontWeight: 700, letterSpacing: "0.02em" }}>
              {p.eyebrow}
            </div>
            <div style={{ fontFamily: MINCHO, fontSize: 17, fontWeight: 700, lineHeight: 1.25, marginTop: 3, color: "#4a453f" }}>
              {nl(p.label)}
            </div>
          </div>
        </span>
      ))}
    </div>
  );
}

/** 緑のCTAボタン（元LP btn.png / btn-follow.png のぷっくり緑ピル）。 */
export function CTAButton({
  label,
  style,
  small = false,
}: {
  label: string;
  style?: CSSProperties;
  small?: boolean;
}) {
  return (
    <a
      href="#contact"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        width: "100%",
        height: small ? 58 : 68,
        borderRadius: 999,
        background: "linear-gradient(180deg,#a9d76a 0%,#8cc24e 52%,#7bb43e 100%)",
        border: "1px solid #6fa636",
        boxShadow: "0 8px 18px rgba(110,150,50,0.45), inset 0 2px 0 rgba(255,255,255,0.55), inset 0 -3px 6px rgba(90,130,40,0.35)",
        color: "#fff",
        textDecoration: "none",
        fontFamily: GOTHIC,
        fontSize: small ? 18 : 21,
        fontWeight: 800,
        letterSpacing: "0.02em",
        textShadow: "0 1px 2px rgba(80,110,40,0.55)",
        ...style,
      }}
    >
      <span>{label}</span>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.28)",
          fontSize: 15,
        }}
      >
        →
      </span>
    </a>
  );
}
