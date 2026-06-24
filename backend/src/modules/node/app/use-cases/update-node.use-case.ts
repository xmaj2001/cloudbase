import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { NodeRepository } from '../../domain/repo/node.repository';
import { NodeEntity } from '../../domain/entities/node.entity';
import { UpdateNodeDto } from '../../presentation/http/inputs/update-node.dto';

@Injectable()
export class UpdateNodeUseCase {
  constructor(private readonly nodeRepository: NodeRepository) {}

  async execute(
    id: string,
    userId: string,
    dto: UpdateNodeDto,
  ): Promise<NodeEntity> {
    const node = await this.nodeRepository.findById(id);
    if (!node || node.userId !== userId) {
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
    return node;
  }

  async move(
    id: string,
    userId: string,
    parentId: string | null,
  ): Promise<NodeEntity> {
    const node = await this.nodeRepository.findById(id);
    if (!node || node.userId !== userId) {
      throw new NotFoundException('Ficheiro/Pasta não encontrado.');
    }

    if (parentId !== null) {
      const parent = await this.nodeRepository.findById(parentId);
      if (!parent || parent.userId !== userId) {
        throw new BadRequestException('Pasta/Grupo pai não encontrado.');
      }
      if (parent.isFile) {
        throw new BadRequestException('Ficheiros não podem conter filhos.');
      }
      // TODO: verificar ciclo (ex: mover pasta A para dentro da pasta B, mas B já é filha de A)
    }

    node.moveTo(parentId);
    await this.nodeRepository.save(node);
    return node;
  }
}
