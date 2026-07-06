import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { NodeRepository } from '../../domain/repo/node.repository';
import { NodeEntity } from '../../domain/entities/node.entity';

@Injectable()
export class GetNodeByIdUseCase {
  private readonly logger = new Logger(GetNodeByIdUseCase.name);

  constructor(private readonly nodeRepository: NodeRepository) {}

  async execute(id: string, userId: string): Promise<NodeEntity> {
    this.logger.log(`Fetching node ${id} for user ${userId}`);

    const node = await this.nodeRepository.findById(id);
    if (!node || node.userId !== userId) {
      this.logger.warn(`Node ${id} not found for user ${userId}`);
      throw new NotFoundException('Ficheiro/Pasta não encontrado.');
    }
    return node;
  }
}
