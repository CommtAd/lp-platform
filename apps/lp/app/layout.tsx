import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LP Platform",
  description: "Landing page delivery platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;600;700&family=Zen+Kaku+Gothic+New:wght@400;500;700;800&family=Noto+Sans+JP:wght@400;500;700&family=Playfair+Display:ital,wght@1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
