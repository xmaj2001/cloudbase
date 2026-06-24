import { Injectable } from '@nestjs/common';
import { CreateNodeUseCase } from '../use-cases/create-node.use-case';
import { GetNodeByIdUseCase } from '../use-cases/get-node-by-id.use-case';
import { GetNodesByParentUseCase } from '../use-cases/get-nodes-by-parent.use-case';
import { UpdateNodeUseCase } from '../use-cases/update-node.use-case';
import { TrashNodeUseCase } from '../use-cases/trash-node.use-case';
import { RestoreNodeUseCase } from '../use-cases/restore-node.use-case';
import { DeleteNodeUseCase } from '../use-cases/delete-node.use-case';
import { NodeEntity } from '../../domain/entities/node.entity';
import {
  CreateFileNodeDto,
  CreateFolderNodeDto,
  CreateGroupNodeDto,
} from '../../presentation/http/inputs/create-node.dto';
import { UpdateNodeDto } from '../../presentation/http/inputs/update-node.dto';

@Injectable()
export class NodeClientService {
  constructor(
    private readonly createNodeUseCase: CreateNodeUseCase,
    private readonly getNodeByIdUseCase: GetNodeByIdUseCase,
    private readonly getNodesByParentUseCase: GetNodesByParentUseCase,
    private readonly updateNodeUseCase: UpdateNodeUseCase,
    private readonly trashNodeUseCase: TrashNodeUseCase,
    private readonly restoreNodeUseCase: RestoreNodeUseCase,
    private readonly deleteNodeUseCase: DeleteNodeUseCase,
  ) {}

  async createFile(
    userId: string,
    dto: CreateFileNodeDto,
  ): Promise<NodeEntity> {
    return this.createNodeUseCase.executeFile(userId, dto);
  }

  async createFolder(
    userId: string,
    dto: CreateFolderNodeDto,
  ): Promise<NodeEntity> {
    return this.createNodeUseCase.executeFolder(userId, dto);
  }

  async createGroup(
    userId: string,
    dto: CreateGroupNodeDto,
  ): Promise<NodeEntity> {
    return this.createNodeUseCase.executeGroup(userId, dto);
  }

  async getNodeById(id: string, userId: string): Promise<NodeEntity> {
    return this.getNodeByIdUseCase.execute(id, userId);
  }

  async getNodesByParent(
    userId: string,
    parentId: string | null,
  ): Promise<NodeEntity[]> {
    return this.getNodesByParentUseCase.execute(userId, parentId);
  }

  async updateNode(
    id: string,
    userId: string,
    dto: UpdateNodeDto,
  ): Promise<NodeEntity> {
    return this.updateNodeUseCase.execute(id, userId, dto);
  }

  async moveNode(
    id: string,
    userId: string,
    parentId: string | null,
  ): Promise<NodeEntity> {
    return this.updateNodeUseCase.move(id, userId, parentId);
  }

  async trashNode(id: string, userId: string): Promise<void> {
    return this.trashNodeUseCase.execute(id, userId);
  }

  async restoreNode(id: string, userId: string): Promise<void> {
    return this.restoreNodeUseCase.execute(id, userId);
  }

  async deleteNode(id: string, userId: string): Promise<void> {
    return this.deleteNodeUseCase.execute(id, userId);
  }
}
