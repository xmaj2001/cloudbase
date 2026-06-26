import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { NodeRepository } from '../../domain/repo/node.repository';
import { NodeEntity } from '../../domain/entities/node.entity';
import { NodeLocation } from '../../domain/value-objects/node-location.vo';
import {
  CreateFileNodeDto,
  CreateFolderNodeDto,
  CreateGroupNodeDto,
} from '../../presentation/http/inputs/create-node.dto';
import { UserClientService } from '../../../user/app/services/user-client.service';
import { StorageDriverClientService } from '../../../storagedriver/app/services/storage-driver-client.service';

@Injectable()
export class CreateNodeUseCase {
  private readonly logger = new Logger(CreateNodeUseCase.name);

  constructor(
    private readonly nodeRepository: NodeRepository,
    private readonly userClientService: UserClientService,
    private readonly storageDriverClientService: StorageDriverClientService,
  ) { }

  // ── Criar Ficheiro ──────────────────────────────────────────────────────────

  async executeFile(
    userId: string,
    dto: CreateFileNodeDto,
  ): Promise<NodeEntity> {
    this.logger.log(`A criar ficheiro "${dto.name}" para o utilizador ${userId}`);

    // Verificar se o utilizador existe
    await this.validateUser(userId);

    // Verificar se o pai existe (se fornecido)
    if (dto.parentId) {
      await this.validateParent(dto.parentId, userId);
    }

    // Verificar se o driver existe e pertence ao utilizador
    await this.validateDriver(dto.location!.driverId, userId);

    const location = NodeLocation.create(dto.location!);
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
    this.logger.log(`Ficheiro "${dto.name}" criado com sucesso (id: ${node.id})`);
    return node;
  }

  // ── Criar Pasta ─────────────────────────────────────────────────────────────

  async executeFolder(
    userId: string,
    dto: CreateFolderNodeDto,
  ): Promise<NodeEntity> {
    this.logger.log(`A criar pasta "${dto.name}" para o utilizador ${userId}`);

    // Verificar se o utilizador existe
    await this.validateUser(userId);

    // Verificar se o pai existe (se fornecido)
    if (dto.parentId) {
      await this.validateParent(dto.parentId, userId);
    }

    // Verificar se o driver existe e pertence ao utilizador
    await this.validateDriver(dto.location!.driverId, userId);

    const location = NodeLocation.create(dto.location!);
    const node = NodeEntity.createFolder({
      userId,
      name: dto.name,
      location,
      parentId: dto.parentId,
    });

    await this.nodeRepository.save(node);
    this.logger.log(`Pasta "${dto.name}" criada com sucesso (id: ${node.id})`);
    return node;
  }

  // ── Criar Grupo ─────────────────────────────────────────────────────────────

  async executeGroup(
    userId: string,
    dto: CreateGroupNodeDto,
  ): Promise<NodeEntity> {
    this.logger.log(`A criar grupo "${dto.name}" para o utilizador ${userId}`);

    // Verificar se o utilizador existe
    await this.validateUser(userId);

    // Verificar se o pai existe (se fornecido)
    if (dto.parentId) {
      await this.validateParent(dto.parentId, userId);
    }

    const node = NodeEntity.createGroup({
      userId,
      name: dto.name,
      parentId: dto.parentId,
    });

    await this.nodeRepository.save(node);
    this.logger.log(`Grupo "${dto.name}" criado com sucesso (id: ${node.id})`);
    return node;
  }

  // ── Validações ──────────────────────────────────────────────────────────────

  private async validateUser(userId: string): Promise<void> {
    try {
      await this.userClientService.getUserById(userId);
    } catch {
      this.logger.error(`Utilizador ${userId} não encontrado`);
      throw new BadRequestException('Utilizador não encontrado.');
    }
  }

  private async validateDriver(driverId: string, userId: string): Promise<void> {
    try {
      await this.storageDriverClientService.getDriverById(driverId, userId);
    } catch {
      this.logger.error(`Driver ${driverId} não encontrado para o utilizador ${userId}`);
      throw new BadRequestException('Driver de armazenamento não encontrado.');
    }
  }

  private async validateParent(
    parentId: string,
    userId: string,
  ): Promise<void> {
    const parent = await this.nodeRepository.findById(parentId);
    if (!parent || parent.userId !== userId) {
      this.logger.warn(`Nó pai ${parentId} não encontrado para o utilizador ${userId}`);
      throw new BadRequestException('Pasta/Grupo pai não encontrado.');
    }
    if (parent.isFile) {
      this.logger.warn(`Tentativa de criar filho dentro de um ficheiro (${parentId})`);
      throw new BadRequestException('Ficheiros não podem conter filhos.');
    }
  }
}
