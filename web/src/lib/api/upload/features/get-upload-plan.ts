import { UploadPlanRequest, UploadPlanResponse } from "@/lib/api/upload/types";

/**
 * Chama o BFF /api/upload/plan para obter o plano de distribuição/fragmentação.
 */
export async function getUploadPlan(
  request: UploadPlanRequest
): Promise<UploadPlanResponse> {
  const res = await fetch("/api/upload/plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      err?.error ?? `BFF /api/upload/plan respondeu com ${res.status}`
    );
  }

  return res.json() as Promise<UploadPlanResponse>;
}
