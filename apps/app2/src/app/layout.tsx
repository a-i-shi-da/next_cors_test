import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "app2 - CORS Demo (API Server)",
  description: "CORSの動作確認用APIサーバー",
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
