import { Injectable, NotFoundException } from '@nestjs/common';
import { NodeRepository } from '../../domain/repo/node.repository';

@Injectable()
export class RestoreNodeUseCase {
  constructor(private readonly nodeRepository: NodeRepository) {}

  async execute(id: string, userId: string): Promise<void> {
    const node = await this.nodeRepository.findById(id);
    if (!node || node.userId !== userId) {
      throw new NotFoundException('Ficheiro/Pasta não encontrado.');
    }

    node.restoreFromTrash();
    await this.nodeRepository.save(node);
  }
}
