import { FilePlanSuccess, PlanVerificationResult } from "../upload.types";

export async function verifyPlan(payload: { userId: string; plan: FilePlanSuccess[] }): Promise<PlanVerificationResult> {
    const res = await fetch("/api/upload/plan/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error("Falha na verificação de espaço do plano.");
    }

    return res.json() as Promise<PlanVerificationResult>;
}