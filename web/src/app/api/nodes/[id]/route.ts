import { ApiEnvelope } from "@/lib/api/api.types";
import { ApiNode } from "@/lib/api/node/types";
import { NextRequest, NextResponse } from "next/server";


const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000"; // Ajusta para a tua API real

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: "O id do node é obrigatório." }, { status: 400 });
        }
        const userId = req.nextUrl.searchParams.get("userId")
        if (!userId) {
            return NextResponse.json({ error: "O id do utilizador é obrigatório." }, { status: 400 });
        }
        const response = await fetch(`${BACKEND_URL}/nodes/${id}?userId=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) {
            return NextResponse.json({ error: "Erro ao carregar node do backend" }, { status: response.status });
        }

        const res = (await response.json()) as ApiEnvelope<ApiNode>;
        return NextResponse.json(res.data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Erro ao carregar node do backend" }, { status: 500 });
    }
}