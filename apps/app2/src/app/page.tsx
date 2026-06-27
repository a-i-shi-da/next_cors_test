export default function Home() {
  return (
    <main style={{ fontFamily: "sans-serif", maxWidth: 600, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>app2 — API Server (port 3001)</h1>
      <p>このアプリはCORS確認用のAPIサーバーです。</p>
      <h2>エンドポイント一覧</h2>
      <ul>
        <li><code>/api/hello</code> — CORSヘッダーあり（GET / POST / OPTIONS）</li>
        <li><code>/api/hello-no-cors</code> — CORSヘッダーなし（エラー確認用）</li>
        <li><code>/api/hello-credentials</code> — credentials対応エンドポイント</li>
      </ul>
      <p>app1（localhost:3000）のUIからリクエストを送って動作を確認してください。</p>
    </main>
  );
}
