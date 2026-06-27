const ALLOWED_ORIGIN = "http://localhost:3000";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

// プリフライトリクエスト対応
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

// 正常系 GET
export async function GET() {
  return Response.json(
    { message: "Hello from app2!", method: "GET", cors: "allowed" },
    { headers: corsHeaders() }
  );
}

// プリフライト確認用 POST
export async function POST(request: Request) {
  const body = await request.json();
  return Response.json(
    { message: "Hello from app2!", method: "POST", received: body, cors: "allowed" },
    { headers: corsHeaders() }
  );
}
