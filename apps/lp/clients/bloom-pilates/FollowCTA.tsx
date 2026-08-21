"use client";

import { useEffect, useState } from "react";
import { CTAButton } from "./ui";

/**
 * 追従CTA（元LPの #follow / setupFollowVisibility を再現）。
 * 1画面分スクロールしたら表示し、予約フォーム（#contact）が見えている間は隠す。
 */
export default function FollowCTA({
  label,
  anchor = "#contact",
  maxWidth = 620,
}: {
  label: string;
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
      setVisible(scrollTop >= window.innerHeight && !targetVisible);
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
        padding: "0 5% 10px",
        pointerEvents: "none",
      }}
    >
      <div style={{ width: "100%", maxWidth, pointerEvents: "auto" }}>
        <CTAButton label={label} small />
      </div>
    </div>
  );
}
