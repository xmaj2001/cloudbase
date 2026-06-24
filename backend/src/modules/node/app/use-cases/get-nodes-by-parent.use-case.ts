import { Injectable, BadRequestException } from '@nestjs/common';
import { NodeRepository } from '../../domain/repo/node.repository';
import { NodeEntity } from '../../domain/entities/node.entity';

@Injectable()
export class GetNodesByParentUseCase {
  constructor(private readonly nodeRepository: NodeRepository) {}

  async execute(
    userId: string,
    parentId: string | null,
  ): Promise<NodeEntity[]> {
    if (parentId === null) {
      // Retornar nós na raiz (parentId = null) para o utilizador
      return this.nodeRepository.findByUserId(userId, { parentId: null });
    }

    // Verificar se a pasta pai existe e pertence ao user
    const parent = await this.nodeRepository.findById(parentId);
    if (!parent || parent.userId !== userId) {
      throw new BadRequestException('Pasta pai não encontrada.');
    }

    return this.nodeRepository.findChildren(parentId);
  }
}
