import { Module } from '@nestjs/common';
import { NodesService } from './services/nodes.service';
import { NodesController } from './controllers/nodes.controller';

@Module({
  controllers: [NodesController],
  providers: [NodesService],
})
export class NodesModule {}
