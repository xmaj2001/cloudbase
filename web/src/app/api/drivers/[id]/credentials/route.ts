import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const response = await fetch(`${BACKEND_URL}/drivers/${id}/credentials`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("Cookie") || "",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Não foi possível obter as credenciais do driver.",
        },
        { status: response.status },
      );
    }
    const res = await response.json();
    return NextResponse.json(res.data ?? res);
  } catch (error) {
    console.error("[BFF /sign] Erro:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
