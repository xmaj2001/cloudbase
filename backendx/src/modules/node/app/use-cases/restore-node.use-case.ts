import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { NodeRepository } from '../../domain/repo/node.repository';

@Injectable()
export class RestoreNodeUseCase {
  private readonly logger = new Logger(RestoreNodeUseCase.name);

  constructor(private readonly nodeRepository: NodeRepository) {}

  async execute(id: string, userId: string): Promise<void> {
    this.logger.log(`Restoring node ${id} for user ${userId}`);

    const node = await this.nodeRepository.findById(id);
    if (!node || node.userId !== userId) {
      this.logger.warn(`Node ${id} not found for restore`);
      throw new NotFoundException('Ficheiro/Pasta não encontrado.');
    }

    node.restoreFromTrash();
    await this.nodeRepository.save(node);
    this.logger.log(`Node ${id} restored from trash successfully`);
  }
}
