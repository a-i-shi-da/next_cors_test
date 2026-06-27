import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "app1 - CORS Demo (Frontend)",
  description: "CORSの動作確認用フロントエンド",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
