"use client";

import { useState } from "react";

const API_BASE = "http://localhost:3001";

type Result = {
  status: number | string;
  ok: boolean;
  body: unknown;
};

export default function Home() {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [scenario, setScenario] = useState<string>("");

  const fetchAPI = async (
    path: string,
    options?: RequestInit,
    label?: string,
  ) => {
    setLoading(true);
    setScenario(label ?? path);
    setResult(null);
    try {
      const res = await fetch(`${API_BASE}${path}`, options);
      const body = await res.json();
      setResult({ status: res.status, ok: res.ok, body });
    } catch (err) {
      setResult({ status: "Network Error", ok: false, body: String(err) });
    } finally {
      setLoading(false);
    }
  };

  const fetchAPISameOrigin = async (
    path: string,
    options?: RequestInit,
    label?: string,
  ) => {
    setLoading(true);
    setScenario(label ?? path);
    setResult(null);
    try {
      const res = await fetch(`${path}`, options);
      const body = await res.json();
      setResult({ status: res.status, ok: res.ok, body });
    } catch (err) {
      setResult({ status: "Network Error", ok: false, body: String(err) });
    } finally {
      setLoading(false);
    }
  };

  const scenarios = [
    {
      label: "✅ 正常系 GET（CORS許可あり）",
      action: () =>
        fetchAPI("/api/hello", undefined, "✅ 正常系 GET（CORS許可あり）"),
    },
    {
      label: "❌ エラー系 GET（CORS許可なし）",
      action: () =>
        fetchAPI(
          "/api/hello-no-cors",
          undefined,
          "❌ エラー系 GET（CORS許可なし）",
        ),
    },
    {
      label: "✅ 正常系 GET（同一オリジンCORS設定なし）",
      action: () =>
        fetchAPISameOrigin(
          "/api/hello",
          undefined,
          "✅ 正常系 GET（同一オリジンCORS設定なし）",
        ),
    },
    {
      label: "🔍 プリフライト POST（OPTIONS → POST）",
      action: () =>
        fetchAPI(
          "/api/hello",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "test" }),
          },
          "🔍 プリフライト POST（OPTIONS → POST）",
        ),
    },
    {
      label: "🍪 credentials 付き GET",
      action: () =>
        fetchAPI(
          "/api/hello-credentials",
          { credentials: "include" },
          "🍪 credentials 付き GET",
        ),
    },
  ];

  return (
    <main style={styles.main}>
      <h1 style={styles.h1}>CORS 動作確認 — app1 (port 3000)</h1>
      <p style={styles.subtitle}>
        app2 <code style={styles.code}>localhost:3001</code>{" "}
        への各シナリオを試してください
      </p>

      <div style={styles.grid}>
        {scenarios.map((s) => (
          <button
            key={s.label}
            style={styles.button}
            onClick={s.action}
            disabled={loading}
          >
            {s.label}
          </button>
        ))}
      </div>

      {loading && <p style={styles.loading}>リクエスト送信中...</p>}

      {result && (
        <div
          style={{
            ...styles.result,
            borderColor: result.ok ? "#22c55e" : "#ef4444",
          }}
        >
          <p style={styles.scenarioLabel}>{scenario}</p>
          <p>
            ステータス:{" "}
            <strong style={{ color: result.ok ? "#22c55e" : "#ef4444" }}>
              {result.status}
            </strong>
          </p>
          <pre style={styles.pre}>{JSON.stringify(result.body, null, 2)}</pre>
        </div>
      )}

      <section style={styles.guide}>
        <h2 style={styles.h2}>確認ポイント</h2>
        <ul style={styles.ul}>
          <li>
            DevTools の Network タブで{" "}
            <code style={styles.code}>Access-Control-Allow-Origin</code>{" "}
            ヘッダーを確認
          </li>
          <li>CORSエラーは Console タブにも表示されます</li>
          <li>
            プリフライトは <code style={styles.code}>OPTIONS</code>{" "}
            メソッドのリクエストとして確認できます
          </li>
        </ul>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    fontFamily: "'Segoe UI', sans-serif",
    maxWidth: 760,
    margin: "0 auto",
    padding: "2rem 1.5rem",
    color: "#1e293b",
  },
  h1: { fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.4rem" },
  h2: { fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.6rem" },
  subtitle: { color: "#64748b", marginBottom: "2rem" },
  code: {
    background: "#f1f5f9",
    borderRadius: 4,
    padding: "1px 6px",
    fontFamily: "monospace",
    fontSize: "0.9em",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.75rem",
    marginBottom: "1.5rem",
  },
  button: {
    padding: "0.75rem 1rem",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    background: "#f8fafc",
    cursor: "pointer",
    fontSize: "0.9rem",
    textAlign: "left",
    transition: "background 0.15s",
  },
  loading: { color: "#94a3b8", margin: "1rem 0" },
  result: {
    border: "2px solid",
    borderRadius: 8,
    padding: "1rem 1.25rem",
    margin: "1rem 0 2rem",
    background: "#f8fafc",
  },
  scenarioLabel: { fontWeight: 600, marginBottom: "0.5rem" },
  pre: {
    background: "#1e293b",
    color: "#e2e8f0",
    borderRadius: 6,
    padding: "0.75rem",
    overflowX: "auto",
    fontSize: "0.85rem",
    marginTop: "0.5rem",
  },
  guide: {
    background: "#f0f9ff",
    borderRadius: 8,
    padding: "1rem 1.25rem",
    borderLeft: "4px solid #38bdf8",
  },
  ul: { paddingLeft: "1.25rem", lineHeight: 2, color: "#334155" },
};
