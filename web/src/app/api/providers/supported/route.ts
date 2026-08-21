import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/api/core/backend-fetch";

// GET /api/providers/supported → Encaminha para o NestJS: GET /v1/providers/supported
export async function GET(req: NextRequest) {
  try {
    const response = await backendFetch(req, "providers/supported");

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao carregar provedores suportados" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[BFF GET /providers/supported] Erro:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
