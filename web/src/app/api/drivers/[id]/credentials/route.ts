import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/api/core/backend-fetch";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const response = await backendFetch(req, `drivers/${id}/credentials`);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Não foi possível carregar as credenciais deste driver" },
        { status: response.status },
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`[BFF GET /drivers/${id}/credentials] Erro:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
