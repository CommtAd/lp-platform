"use client";

import { useEffect, useState } from "react";

/**
 * 追従CTA（元LPの #follow / setupFollowVisibility を再現）。
 * 1画面分スクロールしたら表示し、予約フォーム（#contact）が見えている間は隠す。
 * ボタンは元LPと同じ btn-follow.png 画像を使う。
 */
export default function FollowCTA({
  src,
  anchor = "#contact",
  maxWidth = 500,
}: {
  src: string;
  anchor?: string;
  maxWidth?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targetId = anchor.replace(/^#/, "");
    const target = document.getElementById(targetId);
    let targetVisible = false;

    const update = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      const threshold = window.innerWidth;
      setVisible(scrollTop >= threshold && !targetVisible);
    };

    let observer: IntersectionObserver | undefined;
    if (target && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          targetVisible = entries.some((e) => e.isIntersecting);
          update();
        },
        { root: null, threshold: 0 },
      );
      observer.observe(target);
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer?.disconnect();
    };
  }, [anchor]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <a
        href={anchor}
        style={{
          display: "block",
          width: "100%",
          maxWidth,
          padding: "0 5% 8px",
          pointerEvents: "auto",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="無料体験を予約する" style={{ width: "100%", display: "block" }} />
      </a>
    </div>
  );
}
