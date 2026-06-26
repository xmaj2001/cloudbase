import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { NodeRepository } from '../../domain/repo/node.repository';
import { UserClientService } from '../../../user/app/services/user-client.service';

@Injectable()
export class DeleteNodeUseCase {
  private readonly logger = new Logger(DeleteNodeUseCase.name);

  constructor(
    private readonly nodeRepository: NodeRepository,
    private readonly userClientService: UserClientService,
  ) {}

  async execute(id: string, userId: string): Promise<void> {
    this.logger.log(`A eliminar permanentemente o nó ${id} para o utilizador ${userId}`);

    // Verificar se o utilizador existe
    try {
      await this.userClientService.getUserById(userId);
    } catch {
      this.logger.error(`Utilizador ${userId} não encontrado`);
      throw new NotFoundException('Utilizador não encontrado.');
    }

    // Verificar se o nó existe e pertence ao utilizador
    const node = await this.nodeRepository.findById(id);
    if (!node || node.userId !== userId) {
      this.logger.warn(`Nó ${id} não encontrado para o utilizador ${userId}`);
      throw new NotFoundException('Ficheiro/Pasta não encontrado.');
    }

    node.deletePermanently();
    // NOTA: Nesta fase apenas marcamos como DELETED logicamente.
    // O delete do provider seria feito num listener/cron, ou podíamos chamar
    // a api do provider aqui se não quisermos delete assíncrono.
    // Para já mantemos o delete lógico no repository.
    await this.nodeRepository.save(node);
    this.logger.log(`Nó ${id} eliminado permanentemente com sucesso`);
  }
}
