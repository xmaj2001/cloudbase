import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/api/core/backend-fetch";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const body = await req.json(); // { name: "novo-nome.mp4" }
    const response = await backendFetch(req, `nodes/${id}/rename`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Erro ao renomear o item" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`[BFF PATCH /nodes/${id}/rename] Erro:`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}