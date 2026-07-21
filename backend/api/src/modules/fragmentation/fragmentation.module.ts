import { Module } from '@nestjs/common';
import { FragmentationService } from './services/fragmentation.service';
import { CreatePlanUseCase } from './services/use-cases/create-plan.use-case';
import { ConfirmChunkUseCase } from './services/use-cases/confirm-chunk.use-case';
import { FragmentationController } from './controllers/fragmentation.controller';

@Module({
  controllers: [FragmentationController],
  providers: [CreatePlanUseCase, ConfirmChunkUseCase, FragmentationService],
})
export class FragmentationModule {}
