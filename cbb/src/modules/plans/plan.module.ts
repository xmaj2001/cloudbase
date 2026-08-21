import { Module } from "@nestjs/common";
import { PlanController } from "./plan.controller";
import { PlanServices } from "./plan.service";
import { ProviderModule } from "../providers/provider.module";

@Module({
  imports: [ProviderModule],
  controllers: [PlanController],
  providers: [PlanServices],
  exports: [PlanServices],
})
export class PlanModule {}
