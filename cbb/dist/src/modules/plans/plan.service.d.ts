import { ProviderServices } from "../providers/provider.service";
import { UploadPlan, RequestPlanInput } from "./plan.inputs";
export declare class PlanServices {
    private readonly providers;
    constructor(providers: ProviderServices);
    createPlan(req: RequestPlanInput): Promise<UploadPlan>;
    private tryDirect;
    private tryFragmentation;
    private sortPool;
    private formatBytes;
}
