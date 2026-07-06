import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { NodeRepository } from '../../domain/repo/node.repository';
import { NodeEntity } from '../../domain/entities/node.entity';
import { UpdateNodeDto } from '../../presentation/http/inputs/update-node.dto';
import { UserClientService } from '../../../user/app/services/user-client.service';

@Injectable()
export class UpdateNodeUseCase {
  private readonly logger = new Logger(UpdateNodeUseCase.name);

  constructor(
    private readonly nodeRepository: NodeRepository,
    private readonly userClientService: UserClientService,
  ) {}

  async execute(
    id: string,
    userId: string,
    dto: UpdateNodeDto,
  ): Promise<NodeEntity> {
    this.logger.log(`A atualizar o nó ${id} para o utilizador ${userId}`);

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

    if (dto.name !== undefined) {
      node.rename(dto.name);
    }
    if (dto.tags !== undefined) {
      // substituindo completamente as tags por agora, mas as operações add/remove existem
      node.removeTags(node.tags);
      node.addTags(dto.tags);
    }
    if (dto.thumbnailUrl !== undefined) {
      node.setThumbnail(dto.thumbnailUrl);
    }
    if (dto.expiresAt !== undefined) {
      if (dto.expiresAt === null) {
        node.clearExpiry();
      } else {
        node.setExpiry(new Date(dto.expiresAt));
      }
    }

    await this.nodeRepository.save(node);
    this.logger.log(`Nó ${id} atualizado com sucesso`);
    return node;
  }

  async move(
    id: string,
    userId: string,
    parentId: string | null,
  ): Promise<NodeEntity> {
    this.logger.log(`A mover o nó ${id} para o pai ${parentId ?? 'raiz'} (utilizador: ${userId})`);

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
      this.logger.warn(`Nó ${id} não encontrado para mover`);
      throw new NotFoundException('Ficheiro/Pasta não encontrado.');
    }

    if (parentId !== null) {
      const parent = await this.nodeRepository.findById(parentId);
      if (!parent || parent.userId !== userId) {
        this.logger.warn(`Nó pai ${parentId} não encontrado`);
        throw new BadRequestException('Pasta/Grupo pai não encontrado.');
      }
      if (parent.isFile) {
        this.logger.warn(`Tentativa de mover para dentro de um ficheiro (${parentId})`);
        throw new BadRequestException('Ficheiros não podem conter filhos.');
      }
    }

    node.moveTo(parentId);
    await this.nodeRepository.save(node);
    this.logger.log(`Nó ${id} movido com sucesso`);
    return node;
  }
}
