import { backendFetch } from "@/lib/features/core/backend-fetch";
import { NextRequest, NextResponse } from "next/server";

// GET /api/nodes -> Lista nós da raiz ou de uma pasta específica
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const parentId = searchParams.get("parentId");

    const endpoint = parentId ? `nodes?parentId=${parentId}` : "nodes";
    const response = await backendFetch(req, endpoint);

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "[BFF GET /nodes] Erro ao carregar ficheiros e pastas do servidor NestJS:",
        errorData,
      );
      return NextResponse.json(
        { error: "Erro ao carregar ficheiros e pastas do servidor NestJS" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[BFF GET /nodes] Erro catastrófico:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Payload validado pelo CreateNodeRequest no client

    const response = await backendFetch(req, "nodes", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error:
            errorData?.message || "Erro ao registar o nó no ecossistema NestJS",
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[BFF POST /nodes] Erro ao criar nó:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
