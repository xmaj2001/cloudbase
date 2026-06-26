import { ApiEnvelope } from "@/lib/api/api.types";
import { ApiDriver } from "@/lib/api/drivers/types";
import { NextRequest, NextResponse } from "next/server";


const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000"; // Ajusta para a tua API real

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const response = await fetch(`${BACKEND_URL}/storage-drivers?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Erro ao carregar drivers do backend" }, { status: response.status });
    }

    const res = (await response.json()) as ApiEnvelope<ApiDriver[]>;
    return NextResponse.json(res.data);

  } catch (error) {
    console.error("Erro no BFF /api/drivers:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

