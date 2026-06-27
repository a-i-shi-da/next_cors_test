const ALLOWED_ORIGIN = "http://localhost:3000";

// credentials: "include" を使う場合、Allow-Origin に * は使えない
function credentialsCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: credentialsCorsHeaders(),
  });
}

export async function GET(request: Request) {
  // リクエストのCookieを確認
  const cookie = request.headers.get("cookie") ?? "（なし）";

  return Response.json(
    {
      message: "Hello from app2! (credentials対応)",
      cors: "allowed with credentials",
      receivedCookie: cookie,
    },
    {
      headers: {
        ...credentialsCorsHeaders(),
        // レスポンスにCookieをセット
        "Set-Cookie": "session=demo-value; Path=/; SameSite=None; Secure",
      },
    }
  );
}
