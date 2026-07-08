import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const response = await fetch(`${BACKEND_URL}/drivers/${id}/sync`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("Cookie") || "",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Não foi possível sincronizar o driver.",
        },
        { status: response.status },
      );
    }
    const res = await response.json();
    console.log("[BFF /drivers/:id/sync] Resposta do backend:", res);
    return NextResponse.json(res.data ?? res);
  } catch (error) {
    console.error("[BFF /sign] Erro:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
