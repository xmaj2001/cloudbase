import { ApiEnvelope } from "@/lib/api/api.types";
import { ApiNode } from "@/lib/api/node/types";
import { NextRequest, NextResponse } from "next/server";


const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000"; // Ajusta para a tua API real

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const userId = req.nextUrl.searchParams.get('userId');
        const parentId = req.nextUrl.searchParams.get('parentid');
        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }
        const response = await fetch(`${BACKEND_URL}/nodes?userId=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) {
            return NextResponse.json({ error: "Erro ao carregar nodes do backend" }, { status: response.status });
        }

        const res = (await response.json()) as ApiEnvelope<ApiNode[]>;
        return NextResponse.json(res.data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch nodes' }, { status: 500 });
    }
}
