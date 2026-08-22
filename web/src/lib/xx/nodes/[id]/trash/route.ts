import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/api/core/backend-fetch";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const response = await backendFetch(req, `nodes/${id}/trash`, {
      method: "PATCH",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Erro ao mover item para o lixo" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`[BFF PATCH /nodes/${id}/trash] Erro:`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}