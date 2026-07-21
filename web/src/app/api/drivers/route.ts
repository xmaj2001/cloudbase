import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/api/core/backend-fetch";

// GET /api/drivers -> Lista os drivers do utilizador logado
export async function GET(req: NextRequest) {
  try {
    // Nota: Como o NestJS já extrai o usuário através da Session/Cookie que enviamos,
    // não precisas mais de passar o ?userId= na URL do fetch interno. O Nest resolve na Session!
    const response = await backendFetch(req, "drivers");

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao carregar drivers do ecossistema NestJS" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[BFF GET /drivers] Erro catastrófico:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/drivers -> Cria/Conecta um novo driver
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const response = await backendFetch(req, "drivers", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData?.message || "Erro ao conectar driver no backend remoto" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[BFF POST /drivers] Erro catastrófico:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}