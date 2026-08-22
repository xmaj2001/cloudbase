import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/api/core/backend-fetch";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/providers/:id/credentials → Credenciais de um provider específico
// IMPORTANTE: Apenas expõe as credenciais (sem outros campos do provider).
export async function GET(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const response = await backendFetch(req, `providers/${id}/credentials`);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Provider não encontrado ou sem permissão" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`[BFF GET /providers/${id}/credentials] Erro:`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
