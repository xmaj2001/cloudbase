import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/api/core/backend-fetch";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/nodes/:id -> Traz os detalhes de um arquivo ou pasta específico
export async function GET(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const response = await backendFetch(req, `nodes/${id}`);

    if (!response.ok) {
      return NextResponse.json({ error: "Ficheiro ou pasta não encontrado" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`[BFF GET /nodes/${id}] Erro:`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE /api/nodes/:id -> Destruição permanente do nó
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const response = await backendFetch(req, `nodes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Não foi possível eliminar o item permanentemente" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`[BFF DELETE /nodes/${id}] Erro:`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}