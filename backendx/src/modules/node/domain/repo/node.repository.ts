import { NodeEntity } from '../entities/node.entity';
import { NodeType } from '../enums/node-type.enum';
import { NodeStatus } from '../enums/node-status.enum';

export interface NodeFilters {
  type?: NodeType;
  status?: NodeStatus;
  parentId?: string | null;
  driverId?: string;
  tags?: string[];
  extension?: string;
}

export abstract class NodeRepository {
  abstract findById(id: string): Promise<NodeEntity | null>;
  abstract findByUserId(
    userId: string,
    filters?: NodeFilters,
  ): Promise<NodeEntity[]>;
  abstract findChildren(parentId: string): Promise<NodeEntity[]>;
  abstract findTrashed(userId: string): Promise<NodeEntity[]>;
  abstract findExpired(): Promise<NodeEntity[]>; // para o cron job
  abstract findCorrupted(userId: string): Promise<NodeEntity[]>;
  abstract findByProviderFileId(
    driverId: string,
    providerFileId: string,
  ): Promise<NodeEntity | null>;
  abstract save(node: NodeEntity): Promise<void>;
  abstract saveMany(nodes: NodeEntity[]): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
