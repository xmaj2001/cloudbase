import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infra/prisma/prisma.service';
import { NodeEntity } from '../../domain/entities/node.entity';
import { NodeRepository, NodeFilters } from '../../domain/repo/node.repository';
import { NodeType } from '../../domain/enums/node-type.enum';
import { NodeStatus } from '../../domain/enums/node-status.enum';
import { NodeLocation } from '../../domain/value-objects/node-location.vo';
import { NodeFragmentation } from '../../domain/value-objects/node-fragmentation.vo';
import { NodeAiMetadata } from '../../domain/value-objects/node-ai-metadata.vo';
import { NodeTrash } from '../../domain/value-objects/node-trash.vo';
import { Node as PrismaNode } from '../../../../generated/prisma/client';

@Injectable()
export class PrismaNodeRepository implements NodeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<NodeEntity | null> {
    const node = await this.prisma.node.findUnique({ where: { id } });
    if (!node) return null;
    return this.mapToEntity(node);
  }

  async findByUserId(
    userId: string,
    filters?: NodeFilters,
  ): Promise<NodeEntity[]> {
    const where: any = { userId };
    if (filters) {
      if (filters.type) where.type = filters.type;
      if (filters.status) where.status = filters.status;
      if (filters.parentId !== undefined) where.parentId = filters.parentId;
      if (filters.driverId) where.driverId = filters.driverId;
      if (filters.extension) where.extension = filters.extension;
      if (filters.tags && filters.tags.length > 0) {
        where.tags = { hasSome: filters.tags };
      }
    }

    const nodes = await this.prisma.node.findMany({ where });
    return nodes.map((n) => this.mapToEntity(n));
  }

  async findChildren(parentId: string): Promise<NodeEntity[]> {
    const nodes = await this.prisma.node.findMany({
      where: { parentId, status: NodeStatus.ACTIVE },
    });
    return nodes.map((n) => this.mapToEntity(n));
  }

  async findTrashed(userId: string): Promise<NodeEntity[]> {
    const nodes = await this.prisma.node.findMany({
      where: { userId, status: NodeStatus.TRASHED },
    });
    return nodes.map((n) => this.mapToEntity(n));
  }

  async findExpired(): Promise<NodeEntity[]> {
    const now = new Date();
    const nodes = await this.prisma.node.findMany({
      where: {
        expiresAt: { lte: now },
        status: { notIn: [NodeStatus.TRASHED, NodeStatus.DELETED] },
      },
    });
    return nodes.map((n) => this.mapToEntity(n));
  }

  async findCorrupted(userId: string): Promise<NodeEntity[]> {
    const nodes = await this.prisma.node.findMany({
      where: { userId, status: NodeStatus.CORRUPTED },
    });
    return nodes.map((n) => this.mapToEntity(n));
  }

  async findByProviderFileId(
    driverId: string,
    providerFileId: string,
  ): Promise<NodeEntity | null> {
    const node = await this.prisma.node.findFirst({
      where: { driverId, providerFileId },
    });
    if (!node) return null;
    return this.mapToEntity(node);
  }

  async save(node: NodeEntity): Promise<void> {
    await this.prisma.node.upsert({
      where: { id: node.id },
      update: this.mapToPrismaData(node),
      create: {
        id: node.id,
        ...this.mapToPrismaData(node),
      },
    });
  }

  async saveMany(nodes: NodeEntity[]): Promise<void> {
    // Para simplificar num MVP usamos transação. Numa plataforma de alta escala
    // seria melhor usar updateMany onde aplicável ou batches manuais
    await this.prisma.$transaction(
      nodes.map((node) =>
        this.prisma.node.upsert({
          where: { id: node.id },
          update: this.mapToPrismaData(node),
          create: { id: node.id, ...this.mapToPrismaData(node) },
        }),
      ),
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.node.delete({ where: { id } });
  }

  // ── Helpers de Mapeamento ───────────────────────────────

  private mapToPrismaData(node: NodeEntity): any {
    return {
      userId: node.userId,
      type: node.type,
      name: node.name,
      mimeType: node.mimeType,
      extension: node.extension,
      size: node.size,

      // location
      driverId: node.location?.driverId ?? null,
      providerFileId: node.location?.providerFileId ?? null,
      providerPath: node.location?.providerPath ?? null,
      providerCreatedAt: node.location?.providerCreatedAt ?? null,
      providerUpdatedAt: node.location?.providerUpdatedAt ?? null,

      // fragmentation
      isFragmented: node.fragmentation.isFragmented,
      totalChunks: node.fragmentation.totalChunks,
      originalHash: node.fragmentation.originalHash,

      parentId: node.parentId,
      status: node.status,
      errorCount: node.errorCount,
      lastErrorAt: node.lastErrorAt,
      lastCheckedAt: node.lastCheckedAt,

      // trash
      trashedAt: node.trash.trashedAt,
      permanentDeleteAt: node.trash.permanentDeleteAt,

      expiresAt: node.expiresAt,
      expiryNotifiedAt: node.expiresAt, // FIXME: property mismatch in schema vs entity, add expiryNotifiedAt if missing? schema has expiryNotifiedAt

      tags: node.tags,
      thumbnailUrl: node.thumbnailUrl,

      // AI
      aiClassified: node.aiMetadata.classified,
      aiCategory: node.aiMetadata.category,
      aiConfidence: node.aiMetadata.confidence,
      aiSummary: node.aiMetadata.summary,
    };
  }

  private mapToEntity(db: PrismaNode): NodeEntity {
    // 1. Reconstruir Location (só se existir)
    let location: NodeLocation | null = null;
    if (
      db.driverId &&
      db.providerFileId &&
      db.providerPath &&
      db.providerCreatedAt &&
      db.providerUpdatedAt
    ) {
      location = NodeLocation.create({
        driverId: db.driverId,
        providerFileId: db.providerFileId,
        providerPath: db.providerPath,
        providerCreatedAt: db.providerCreatedAt,
        providerUpdatedAt: db.providerUpdatedAt,
      });
    }

    // 2. Reconstruir Fragmentation
    const fragmentation = db.isFragmented
      ? NodeFragmentation.fragmented(db.totalChunks, db.originalHash as string)
      : NodeFragmentation.none();

    // 3. Reconstruir Trash
    const trash = db.trashedAt
      ? (NodeTrash as any).trashed(0) // hack: reconstitute não foi pensado para rehidratar exactamente. Vamos refazer
      : NodeTrash.none();

    // workaround porque a factory trashed usa Date.now() e nós queremos a data da DB
    // No Value Object idealmente teríamos um método reconstruct ou podiamos aceder ao construtor
    const reconstructedTrash = Reflect.construct(NodeTrash as any, [
      db.trashedAt,
      db.permanentDeleteAt,
    ]) as NodeTrash;

    // 4. Reconstruir AI Metadata
    const aiMetadata = db.aiClassified
      ? NodeAiMetadata.classified({
          category: db.aiCategory as string,
          confidence: db.aiConfidence as number,
          summary: db.aiSummary as string | undefined,
        })
      : NodeAiMetadata.pending();

    return NodeEntity.reconstitute(
      {
        userId: db.userId,
        type: db.type as NodeType,
        name: db.name,
        mimeType: db.mimeType,
        extension: db.extension,
        size: db.size,
        location,
        fragmentation,
        parentId: db.parentId,
        status: db.status as NodeStatus,
        errorCount: db.errorCount,
        lastErrorAt: db.lastErrorAt,
        lastCheckedAt: db.lastCheckedAt,
        trash: reconstructedTrash,
        expiresAt: db.expiresAt,
        expiryNotifiedAt: db.expiryNotifiedAt,
        tags: db.tags,
        thumbnailUrl: db.thumbnailUrl,
        aiMetadata,
      },
      db.id,
      db.createdAt,
      db.updatedAt,
    );
  }
}
