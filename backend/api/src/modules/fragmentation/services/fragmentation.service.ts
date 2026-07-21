import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from '../dtos/create-plan.dto';
import { CreatePlanUseCase } from './use-cases/create-plan.use-case';
import { ConfirmChunkUseCase } from './use-cases/confirm-chunk.use-case';

@Injectable()
export class FragmentationService {
  constructor(
    private readonly create: CreatePlanUseCase,
    private readonly confirm: ConfirmChunkUseCase,
  ) {}

  async createPlan(userId: string, dto: CreatePlanDto) {
    return await this.create.execute(userId, dto);
  }

  async confirmChunk(
    chunkId: string,
    dto: { chunkHash: string; providerFileId: string },
  ) {
    return await this.confirm.execute(chunkId, dto);
  }
}
