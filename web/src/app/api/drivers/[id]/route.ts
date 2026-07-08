import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/api/core/backend-fetch";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/drivers/:id -> Retorna um único driver
export async function GET(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const response = await backendFetch(req, `drivers/${id}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Driver não encontrado" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`[BFF GET /drivers/${id}] Erro:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// PATCH /api/drivers/:id -> Atualiza metadados do driver
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const body = await req.json();
    const response = await backendFetch(req, `drivers/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao atualizar metadados" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`[BFF PATCH /drivers/${id}] Erro:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// DELETE /api/drivers/:id -> Elimina o driver do ecossistema
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const response = await backendFetch(req, `drivers/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Não foi possível remover o driver" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`[BFF DELETE /drivers/${id}] Erro:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
