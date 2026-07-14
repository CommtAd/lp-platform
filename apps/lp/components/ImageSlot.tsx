import type { CSSProperties } from "react";

export interface ImageSlotProps {
  /** Image path from config. When absent a styled placeholder is shown. */
  src?: string | null;
  alt?: string;
  /** Placeholder caption used until a real image is wired in. */
  placeholder?: string;
  radius?: number;
  /** Sizing / layout styles (height, aspectRatio, flex, position, ...). */
  style?: CSSProperties;
  /** CSS object-position for the cropped image. Default "center". */
  objectPosition?: string;
}

/**
 * Image container that always receives its media via `object-fit: cover`, so a
 * real photo can be dropped into any slot without breaking the layout. Renders a
 * neutral placeholder box while `src` is empty (docs/implementation-brief-01.md §4.4).
 */
export default function ImageSlot({
  src,
  alt = "",
  placeholder = "イメージ画像",
  radius = 0,
  style,
  objectPosition = "center",
}: ImageSlotProps) {
  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: radius,
        background: "#EDE8DE",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {src && /\.(mp4|webm|mov)$/i.test(src) ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition, display: "block" }}
        />
      ) : src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition, display: "block" }}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            color: "#B4AE9F",
            padding: 12,
            textAlign: "center",
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4.5" width="18" height="15" rx="2" />
            <circle cx="8.5" cy="10" r="1.6" />
            <path d="M4 18l5-5 4 3.5 3-2.5 4 4" />
          </svg>
          <span style={{ fontSize: 11, letterSpacing: "0.04em", lineHeight: 1.5 }}>
            {placeholder}
          </span>
        </div>
      )}
    </div>
  );
}
