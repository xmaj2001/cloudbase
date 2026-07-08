import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/api/core/backend-fetch";

// GET /api/drivers/summary -> Traz o resumo unificado e KPIs
export async function GET(req: NextRequest) {
  try {
    const response = await backendFetch(req, "drivers/summary");

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao obter o resumo consolidado da base de dados" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[BFF GET /drivers/summary] Erro:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
