import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/api/core/backend-fetch";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PATCH /api/drivers/:id/sync -> Força sincronismo de armazenamento externo
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const response = await backendFetch(req, `drivers/${id}/sync`, {
      method: "PATCH", // Batendo certinho com o @Patch(':id/sync') do teu NestJS Controller
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Falha na sincronização direta com o provedor cloud" },
        { status: response.status },
      );
    }

    const data = await response.json();
    console.log(`[BFF PATCH /drivers/${id}/sync] Sucesso:`, data);
    return NextResponse.json(data);
  } catch (error) {
    console.error(`[BFF PATCH /drivers/${id}/sync] Erro:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
