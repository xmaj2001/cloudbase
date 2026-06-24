import { Injectable, NotFoundException } from '@nestjs/common';
import { NodeRepository } from '../../domain/repo/node.repository';

@Injectable()
export class DeleteNodeUseCase {
  constructor(private readonly nodeRepository: NodeRepository) {}

  async execute(id: string, userId: string): Promise<void> {
    const node = await this.nodeRepository.findById(id);
    if (!node || node.userId !== userId) {
      throw new NotFoundException('Ficheiro/Pasta não encontrado.');
    }

    node.deletePermanently();
    // NOTA: Nesta fase apenas marcamos como DELETED logicamente.
    // O delete do provider seria feito num listener/cron, ou podíamos chamar
    // a api do provider aqui se não quisermos delete assíncrono.
    // Para já mantemos o delete lógico no repository.
    await this.nodeRepository.save(node);
  }
}
