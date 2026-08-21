import type { UserSession } from "@thallesp/nestjs-better-auth";
import { PlanServices } from "./plan.service";
import { RequestPlanInputDto } from "./plan.inputs";
export declare class PlanController {
    private readonly planService;
    constructor(planService: PlanServices);
    createPlan(session: UserSession, body: RequestPlanInputDto): Promise<import("./plan.inputs").UploadPlan>;
}
