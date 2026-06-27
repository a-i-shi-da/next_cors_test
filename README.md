# cors-demo

CORSの動作確認用 Next.js モノレポ（npm workspaces）

## 構成

```
cors-demo/
├── package.json          # ルート（ワークスペース定義）
└── apps/
    ├── app1/             # フロントエンド（port 3000）リクエストを送る側
    └── app2/             # APIサーバー（port 3001）CORSヘッダーを返す側
```

## セットアップ

```bash
# 依存関係のインストール（ルートで実行）
npm install
```

## 起動

ターミナルを2つ開いてそれぞれ実行してください。

```bash
# ターミナル1: app1 を起動（フロントエンド）
npm run dev:app1

# ターミナル2: app2 を起動（APIサーバー）
npm run dev:app2
```

ブラウザで http://localhost:3000 を開いてください。

## 確認シナリオ

| シナリオ | エンドポイント | 期待結果 |
|----------|---------------|----------|
| ✅ 正常系 GET | `/api/hello` | 200 レスポンス取得成功 |
| ❌ エラー系 GET | `/api/hello-no-cors` | ブラウザがCORSエラーでブロック |
| ✅ 正常系 GET（同一オリジンCORS設定なし） | `http://localhost:3000/api/hello` | 200 レスポンス取得成功 |
| 🔍 プリフライト POST | `/api/hello` (POST) | OPTIONSリクエストが先行して飛ぶ |
| 🍪 credentials付き | `/api/hello-credentials` | Cookie の送受信を確認 |

## 動作確認のポイント

- DevTools の **Network タブ** で `Access-Control-Allow-Origin` ヘッダーを確認
- CORSエラーは **Console タブ** にも表示される
- プリフライトは `OPTIONS` メソッドのリクエストとして確認できる
