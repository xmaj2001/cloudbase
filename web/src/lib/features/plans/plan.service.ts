import type { ApiEnvelope } from "@/api/core/api.types";
import type { RequestPlanInput, ApiUploadPlan } from "./types";
import { apiFetch } from "@/lib/api/client";

/**
 * Serviço da feature plans.
 * Responsável por obter o plano de distribuição de ficheiros pelos providers.
 *
 * Rotas BFF disponíveis:
 *   POST /api/plans → createPlan
 */
export const planService = {
  /**
   * POST /api/plans
   * Gera um plano de upload detalhado com os chunks alocados aos providers.
   * Devolve o plano raw da API (com strings BigInt) — usar plan.mapper.ts para converter.
   */
  createPlan: async (body: RequestPlanInput): Promise<ApiUploadPlan> => {
    const res = await apiFetch<ApiEnvelope<ApiUploadPlan>>("plans", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return res.data;
  },
};
