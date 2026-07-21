import { FilePlanSuccess } from "@/lib/upload/upload.types";
import { NextRequest, NextResponse } from "next/server";


const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

export async function POST(req: NextRequest) {
    try {
        const { userId, plan } = (await req.json()) as { userId: string; plan: FilePlanSuccess[] };

        // Bate no teu backend real que valida o estado real dos drivers na base de dados
        const response = await fetch(`${BACKEND_URL}/upload/plan/verify?userId=${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ plan })
        });

        if (!response.ok) {
            return NextResponse.json({ isValid: false, invalidFiles: [{ fileName: "*", reason: "Erro ao comunicar com a validação." }], validFiles: [] }, { status: 422 });
        }

        const res = await response.json();
        // Se o teu backend real envelopar com .data, retorna res.data, caso contrário res
        return NextResponse.json(res.data ?? res);
    } catch (error) {
        console.error("[BFF /verify] Erro:", error);
        return NextResponse.json({ error: "Erro interno ao verificar plano" }, { status: 500 });
    }
}