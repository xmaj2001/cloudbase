import { Injectable, BadRequestException } from '@nestjs/common';
import { NodeRepository } from '../../domain/repo/node.repository';
import { NodeEntity } from '../../domain/entities/node.entity';
import { NodeLocation } from '../../domain/value-objects/node-location.vo';
import {
  CreateFileNodeDto,
  CreateFolderNodeDto,
  CreateGroupNodeDto,
} from '../../presentation/http/inputs/create-node.dto';

@Injectable()
export class CreateNodeUseCase {
  constructor(private readonly nodeRepository: NodeRepository) {}

  async executeFile(
    userId: string,
    dto: CreateFileNodeDto,
  ): Promise<NodeEntity> {
    if (dto.parentId) {
      await this.validateParent(dto.parentId, userId);
    }

    const location = NodeLocation.create(dto.location);
    const node = NodeEntity.createFile({
      userId,
      name: dto.name,
      mimeType: dto.mimeType ?? 'application/octet-stream',
      extension: dto.extension ?? '',
      size: BigInt(dto.size ?? 0),
      location,
      parentId: dto.parentId,
      tags: dto.tags,
    });

    await this.nodeRepository.save(node);
    return node;
  }

  async executeFolder(
    userId: string,
    dto: CreateFolderNodeDto,
  ): Promise<NodeEntity> {
    if (dto.parentId) {
      await this.validateParent(dto.parentId, userId);
    }

    const location = NodeLocation.create(dto.location);
    const node = NodeEntity.createFolder({
      userId,
      name: dto.name,
      location,
      parentId: dto.parentId,
    });

    await this.nodeRepository.save(node);
    return node;
  }

  async executeGroup(
    userId: string,
    dto: CreateGroupNodeDto,
  ): Promise<NodeEntity> {
    if (dto.parentId) {
      await this.validateParent(dto.parentId, userId);
    }

    const node = NodeEntity.createGroup({
      userId,
      name: dto.name,
      parentId: dto.parentId,
    });

    await this.nodeRepository.save(node);
    return node;
  }

  private async validateParent(
    parentId: string,
    userId: string,
  ): Promise<void> {
    const parent = await this.nodeRepository.findById(parentId);
    if (!parent || parent.userId !== userId) {
      throw new BadRequestException('Pasta/Grupo pai não encontrado.');
    }
    if (parent.isFile) {
      throw new BadRequestException('Ficheiros não podem conter filhos.');
    }
  }
}
