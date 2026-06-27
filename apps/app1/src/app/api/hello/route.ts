// CORSヘッダーを意図的に返さないエンドポイント（ブラウザがブロックする）
export async function GET() {
  return Response.json({
    message: "Hello from app1! (CORSヘッダーなし)",
    cors: "not allowed",
  });
}
