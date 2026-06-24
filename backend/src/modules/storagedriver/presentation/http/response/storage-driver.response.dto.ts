import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProviderType } from '../../../domain/enums/provider-type.enum';
import { DriverStatus } from '../../../domain/enums/driver-status.enum';
import { StorageDriverEntity } from '../../../domain/entities/storage-driver.entity';

export class SpaceInfoDto {
  @ApiPropertyOptional({
    example: '107374182400',
    nullable: true,
    description: 'Espaço total em bytes. null = ilimitado.',
  })
  totalSpace: string | null;

  @ApiPropertyOptional({
    example: '53687091200',
    nullable: true,
    description: 'Espaço usado em bytes.',
  })
  usedSpace: string | null;

  @ApiPropertyOptional({
    example: '53687091200',
    nullable: true,
    description: 'Espaço disponível em bytes.',
  })
  availableSpace: string | null;

  @ApiProperty({
    example: '50.0 GB',
    description: 'Espaço disponível em formato legível.',
  })
  availableGb: string;

  @ApiProperty({
    example: '2026-06-24T12:00:00.000Z',
    description: 'Timestamp da última atualização do cache de espaço.',
  })
  cachedAt: string;
}

export class StorageDriverResponseDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'ID único do driver (UUID v4).',
  })
  id: string;

  @ApiProperty({
    example: 'e7136025-a13a-4467-93be-e28a8d11c75c',
    description: 'ID do utilizador dono deste driver.',
  })
  userId: string;

  @ApiProperty({
    enum: ProviderType,
    example: ProviderType.GOOGLE_DRIVE,
    description: 'Tipo de provider de armazenamento.',
  })
  type: ProviderType;

  @ApiProperty({
    example: 'Meu Google Drive Pessoal',
    description: 'Nome de exibição do driver.',
  })
  displayName: string;

  @ApiProperty({
    enum: DriverStatus,
    example: DriverStatus.ACTIVE,
    description: 'Estado atual da ligação ao provider.',
  })
  status: DriverStatus;

  @ApiProperty({
    example: 0,
    description: 'Prioridade no routing de uploads (0 = mais alta).',
  })
  priority: number;

  @ApiProperty({
    type: () => SpaceInfoDto,
    description: 'Informação de espaço em cache.',
  })
  space: SpaceInfoDto;

  @ApiPropertyOptional({
    example: 'CloudBase',
    nullable: true,
    description: 'ID da pasta raiz criada no provider.',
  })
  rootFolderId: string | null;

  @ApiPropertyOptional({
    example: 'CloudBase/',
    nullable: true,
    description: 'Caminho da pasta raiz no provider.',
  })
  rootFolderPath: string | null;

  @ApiPropertyOptional({
    example: '2026-06-24T12:00:00.000Z',
    nullable: true,
    description: 'Timestamp da última sincronização.',
  })
  lastSyncAt: string | null;

  @ApiPropertyOptional({
    example: null,
    nullable: true,
    description: 'Mensagem de erro da última sincronização.',
  })
  syncError: string | null;

  @ApiProperty({
    example: '2026-06-24T12:00:00.000Z',
    description: 'Data de criação do registo.',
  })
  createdAt: string;

  @ApiProperty({
    example: '2026-06-24T12:30:00.000Z',
    description: 'Data de última atualização do registo.',
  })
  updatedAt: string;

  static fromEntity(entity: StorageDriverEntity): StorageDriverResponseDto {
    const dto = new StorageDriverResponseDto();
    dto.id = entity.id;
    dto.userId = entity.userId;
    dto.type = entity.type;
    dto.displayName = entity.displayName;
    dto.status = entity.status;
    dto.priority = entity.priority;
    dto.rootFolderId = entity.rootFolderId;
    dto.rootFolderPath = entity.rootFolderPath;
    dto.lastSyncAt = entity.lastSyncAt?.toISOString() ?? null;
    dto.syncError = entity.syncError;
    dto.createdAt = entity.createdAt.toISOString();
    dto.updatedAt = entity.updatedAt.toISOString();

    const space = new SpaceInfoDto();
    space.totalSpace = entity.space.totalSpace?.toString() ?? null;
    space.usedSpace = entity.space.usedSpace?.toString() ?? null;
    space.availableSpace = entity.space.availableSpace?.toString() ?? null;
    space.availableGb = entity.space.availableGb;
    space.cachedAt = entity.space.cachedAt.toISOString();
    dto.space = space;

    return dto;
  }
}
