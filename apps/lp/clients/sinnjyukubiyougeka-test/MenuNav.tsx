"use client";

import { useState } from "react";

const ITEMS = [
  { href: "#plan", label: "イボ・ホクロ除去プラン" },
  { href: "#about", label: "施術について" },
  // { href: "#case", label: "症例写真" }, // 症例写真ブロック非表示中（page.tsx の SHOW_CASE）
  { href: "#treatment", label: "施術時間・注意点" },
  { href: "#price", label: "料金表" },
  { href: "#doctor", label: "医師紹介" },
  { href: "#clinic", label: "クリニック案内" },
  { href: "#faq", label: "よくある質問" },
];

/**
 * ヘッダー（ロゴ＋ハンバーガー）。参考LPと同じく、開くとページ内リンクの一覧が出る。
 * ロゴは顧客支給データ（public/clients/{slug}/logo.webp）。
 */
export default function MenuNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <a className="logo" href="#top" aria-label="新宿美容外科クリニック">
        <img className="logo-img" src="/clients/sinnjyukubiyougeka-test/logo.webp" alt="新宿美容外科クリニック" width={480} height={92} />
      </a>
      <button
        className="menu-btn"
        type="button"
        aria-label="メニュー"
        aria-expanded={open}
        aria-controls="gnav"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={open ? "gnav is-open" : "gnav"} id="gnav" aria-label="ページ内メニュー">
        <ul>
          {ITEMS.map((it) => (
            <li key={it.href}>
              <a href={it.href} onClick={() => setOpen(false)}>
                {it.label}
              </a>
            </li>
          ))}
          <li>
            <a className="btn-cta" href="#reserve" onClick={() => setOpen(false)}>
              カウンセリングを予約する
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
