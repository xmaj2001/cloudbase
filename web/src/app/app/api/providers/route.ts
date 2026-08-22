import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/api/core/backend-fetch";

// GET /api/providers → Lista todos os providers do utilizador autenticado (sem credentials)
export async function GET(req: NextRequest) {
  try {
    const response = await backendFetch(req, "providers");

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao carregar lista de provedores" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[BFF GET /providers] Erro:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/providers → Regista/Conecta um novo provider de armazenamento
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await backendFetch(req, "providers", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error:
            (errorData as Record<string, string>)?.message ||
            "Erro ao registar provedor no backend",
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("[BFF POST /providers] Erro:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
