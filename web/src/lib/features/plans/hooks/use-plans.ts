import { useMutation } from "@tanstack/react-query";
import { planService } from "../plan.service";
import type { RequestPlanInput } from "../types";

// ── MUTATIONS ─────────────────────────────────────────────────────────────────

export const usePlanMutations = () => {
  /** Gera um plano de upload. */
  const createPlan = useMutation({
    mutationFn: (data: RequestPlanInput) => planService.createPlan(data),
  });

  return { createPlan };
};
