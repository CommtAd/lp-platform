import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LP Platform ダッシュボード",
  description: "LP管理（顧客・タグ・公開）",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
