import { Injectable, NotFoundException } from '@nestjs/common';
import { NodeRepository } from '../../domain/repo/node.repository';

@Injectable()
export class TrashNodeUseCase {
  constructor(private readonly nodeRepository: NodeRepository) {}

  async execute(
    id: string,
    userId: string,
    trashTtlDays: number = 30,
  ): Promise<void> {
    const node = await this.nodeRepository.findById(id);
    if (!node || node.userId !== userId) {
      throw new NotFoundException('Ficheiro/Pasta não encontrado.');
    }

    // Se for FOLDER ou GROUP, logicamente todos os filhos também estão na lixeira
    // Num sistema complexo poderíamos iterar os filhos, mas a view já deve filtrar
    // pelo status do parent se necessário. Aqui apagamos apenas este nó por agora.
    node.moveToTrash(trashTtlDays);
    await this.nodeRepository.save(node);
  }
}
