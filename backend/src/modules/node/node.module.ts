import { Module } from '@nestjs/common';
import { NodeController } from './presentation/http/node.controller';
import { NodeClientService } from './app/services/node-client.service';
import { NodeRepository } from './domain/repo/node.repository';
import { PrismaNodeRepository } from './infra/repo/prisma-node.repository';
import { CreateNodeUseCase } from './app/use-cases/create-node.use-case';
import { GetNodeByIdUseCase } from './app/use-cases/get-node-by-id.use-case';
import { GetNodesByParentUseCase } from './app/use-cases/get-nodes-by-parent.use-case';
import { UpdateNodeUseCase } from './app/use-cases/update-node.use-case';
import { TrashNodeUseCase } from './app/use-cases/trash-node.use-case';
import { RestoreNodeUseCase } from './app/use-cases/restore-node.use-case';
import { DeleteNodeUseCase } from './app/use-cases/delete-node.use-case';

@Module({
  controllers: [NodeController],
  providers: [
    NodeClientService,
    CreateNodeUseCase,
    GetNodeByIdUseCase,
    GetNodesByParentUseCase,
    UpdateNodeUseCase,
    TrashNodeUseCase,
    RestoreNodeUseCase,
    DeleteNodeUseCase,
    {
      provide: NodeRepository,
      useClass: PrismaNodeRepository,
    },
  ],
  exports: [NodeClientService],
})
export class NodeModule {}
