import { Injectable, NotFoundException } from '@nestjs/common';
import { NodeRepository } from '../../domain/repo/node.repository';
import { NodeEntity } from '../../domain/entities/node.entity';

@Injectable()
export class GetNodeByIdUseCase {
  constructor(private readonly nodeRepository: NodeRepository) {}

  async execute(id: string, userId: string): Promise<NodeEntity> {
    const node = await this.nodeRepository.findById(id);
    if (!node || node.userId !== userId) {
      throw new NotFoundException('Ficheiro/Pasta não encontrado.');
    }
    return node;
  }
}
