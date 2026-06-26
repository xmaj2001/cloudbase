import { ApiEnvelope } from "@/lib/api/api.types";
import { ApiNode } from "@/lib/api/node/types";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");
        if (!userId) {
            return NextResponse.json({ error: "Utilizador não encontrado" }, { status: 404 });
        }
        const body = await req.json();
        const response = await fetch(`${BACKEND_URL}/nodes/group?userId=${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            return NextResponse.json({ error: "Erro ao criar group no backend" }, { status: response.status });
        }
        const res = (await response.json()) as ApiEnvelope<ApiNode>;
        return NextResponse.json(res.data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to create group' }, { status: 500 });
    }
}   