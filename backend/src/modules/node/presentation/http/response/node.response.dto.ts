import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NodeEntity } from '../../../domain/entities/node.entity';
import { NodeType } from '../../../domain/enums/node-type.enum';
import { NodeStatus } from '../../../domain/enums/node-status.enum';

class NodeLocationDto {
  @ApiProperty({ example: 'a1b2c3d4-...' })
  driverId: string;

  @ApiProperty({ example: '1A2b3C4d5E6f...' })
  providerFileId: string;

  @ApiProperty({ example: 'CloudBase/document.pdf' })
  providerPath: string;

  @ApiProperty({ example: '2026-06-24T12:00:00.000Z' })
  providerCreatedAt: string;

  @ApiProperty({ example: '2026-06-24T12:00:00.000Z' })
  providerUpdatedAt: string;
}

class NodeFragmentationDto {
  @ApiProperty({ example: false })
  isFragmented: boolean;

  @ApiProperty({ example: 1 })
  totalChunks: number;

  @ApiPropertyOptional({
    example: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  })
  originalHash: string | null;
}

class NodeAiMetadataDto {
  @ApiProperty({ example: false })
  classified: boolean;

  @ApiPropertyOptional({ example: 'Documentos/Financeiro' })
  category: string | null;

  @ApiPropertyOptional({ example: 0.95 })
  confidence: number | null;

  @ApiPropertyOptional({ example: 'Fatura mensal de serviços...' })
  summary: string | null;
}

class NodeTrashDto {
  @ApiPropertyOptional({ example: '2026-06-24T12:00:00.000Z' })
  trashedAt: string | null;

  @ApiPropertyOptional({ example: '2026-07-24T12:00:00.000Z' })
  permanentDeleteAt: string | null;
}

export class NodeResponseDto {
  @ApiProperty({ example: 'node-uuid-1234' })
  id: string;

  @ApiProperty({ example: 'user-uuid-1234' })
  userId: string;

  @ApiProperty({ enum: NodeType, example: NodeType.FILE })
  type: NodeType;

  @ApiProperty({ example: 'document.pdf' })
  name: string;

  @ApiPropertyOptional({ example: 'application/pdf' })
  mimeType: string | null;

  @ApiPropertyOptional({ example: '.pdf' })
  extension: string | null;

  @ApiPropertyOptional({ example: '1048576' })
  size: string | null;

  @ApiPropertyOptional({ type: NodeLocationDto })
  location: NodeLocationDto | null;

  @ApiProperty({ type: NodeFragmentationDto })
  fragmentation: NodeFragmentationDto;

  @ApiPropertyOptional({ example: 'parent-uuid-1234' })
  parentId: string | null;

  @ApiProperty({ enum: NodeStatus, example: NodeStatus.ACTIVE })
  status: NodeStatus;

  @ApiProperty({ example: 0 })
  errorCount: number;

  @ApiPropertyOptional({ example: '2026-06-24T12:00:00.000Z' })
  lastErrorAt: string | null;

  @ApiPropertyOptional({ example: '2026-06-24T12:00:00.000Z' })
  lastCheckedAt: string | null;

  @ApiProperty({ type: NodeTrashDto })
  trash: NodeTrashDto;

  @ApiPropertyOptional({ example: '2026-12-31T00:00:00.000Z' })
  expiresAt: string | null;

  @ApiPropertyOptional({ type: [String], example: ['trabalho', 'finanças'] })
  tags: string[];

  @ApiPropertyOptional({ example: 'https://exemplo.com/thumb.jpg' })
  thumbnailUrl: string | null;

  @ApiProperty({ type: NodeAiMetadataDto })
  aiMetadata: NodeAiMetadataDto;

  @ApiProperty({ example: '2026-06-24T12:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2026-06-24T12:30:00.000Z' })
  updatedAt: string;

  static fromEntity(entity: NodeEntity): NodeResponseDto {
    const dto = new NodeResponseDto();
    dto.id = entity.id;
    dto.userId = entity.userId;
    dto.type = entity.type;
    dto.name = entity.name;
    dto.mimeType = entity.mimeType;
    dto.extension = entity.extension;
    // serialize bigint as string
    dto.size = entity.size ? entity.size.toString() : null;
    dto.parentId = entity.parentId;
    dto.status = entity.status;
    dto.errorCount = entity.errorCount;
    dto.lastErrorAt = entity.lastErrorAt?.toISOString() ?? null;
    dto.lastCheckedAt = entity.lastCheckedAt?.toISOString() ?? null;
    dto.expiresAt = entity.expiresAt?.toISOString() ?? null;
    dto.tags = entity.tags;
    dto.thumbnailUrl = entity.thumbnailUrl;
    dto.createdAt = entity.createdAt.toISOString();
    dto.updatedAt = entity.updatedAt.toISOString();

    if (entity.location) {
      dto.location = {
        driverId: entity.location.driverId,
        providerFileId: entity.location.providerFileId,
        providerPath: entity.location.providerPath,
        providerCreatedAt: entity.location.providerCreatedAt.toISOString(),
        providerUpdatedAt: entity.location.providerUpdatedAt.toISOString(),
      };
    } else {
      dto.location = null;
    }

    dto.fragmentation = {
      isFragmented: entity.fragmentation.isFragmented,
      totalChunks: entity.fragmentation.totalChunks,
      originalHash: entity.fragmentation.originalHash,
    };

    dto.aiMetadata = {
      classified: entity.aiMetadata.classified,
      category: entity.aiMetadata.category,
      confidence: entity.aiMetadata.confidence,
      summary: entity.aiMetadata.summary,
    };

    dto.trash = {
      trashedAt: entity.trash.trashedAt?.toISOString() ?? null,
      permanentDeleteAt: entity.trash.permanentDeleteAt?.toISOString() ?? null,
    };

    return dto;
  }
}
