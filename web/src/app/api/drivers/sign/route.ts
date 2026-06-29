import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); // { userId, driverId, fileName, chunkIndex, isFragment }

        // Pede ao Backend as chaves temporárias de API do Driver alvo
        const response = await fetch(`${BACKEND_URL}/storage-drivers/${body.driverId}/sign-upload?userId=${body.userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            return NextResponse.json({ error: "Não foi possível assinar o upload para o driver de destino." }, { status: response.status });
        }

        const res = await response.json();
        return NextResponse.json(res.data ?? res);
    } catch (error) {
        console.error("[BFF /sign] Erro:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}