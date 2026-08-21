import { Module } from "@nestjs/common";
import { ProviderServices } from "./provider.service";
import { ProviderController } from "./provider.controller";

@Module({
  controllers: [ProviderController],
  providers: [ProviderServices],
  exports: [ProviderServices],
})
export class ProviderModule {}
