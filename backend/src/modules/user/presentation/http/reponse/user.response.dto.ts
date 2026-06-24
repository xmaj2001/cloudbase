import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserStatus } from '../../../domain/enuns/user-status.enum';
import { UserEntity } from '../../../domain/entities/user.entity';

export class UserResponseDto {
  @ApiProperty({
    example: 'e7136025-a13a-4467-93be-e28a8d11c75c',
    description: 'ID único do utilizador (UUID v4).',
  })
  id: string;

  @ApiProperty({
    example: 'joao.silva@example.com',
    description: 'Endereço de email do utilizador.',
  })
  email: string;

  @ApiProperty({
    example: 'João Silva',
    description: 'Nome do utilizador.',
  })
  name: string;

  @ApiPropertyOptional({
    example: 'https://example.com/avatar.png',
    nullable: true,
    description: 'URL do avatar/foto de perfil.',
  })
  avatarUrl: string | null;

  @ApiPropertyOptional({
    example: '+351912345678',
    nullable: true,
    description: 'Número de WhatsApp.',
  })
  whatsappNumber: string | null;

  @ApiProperty({
    enum: UserStatus,
    example: UserStatus.ACTIVE,
    description: 'Estado atual da conta do utilizador.',
  })
  status: UserStatus;

  @ApiProperty({
    example: 4.8,
    description: 'Pontuação de reputação no sistema de trocas.',
  })
  reputationScore: number;

  @ApiProperty({
    example: 25,
    description: 'Total de trocas iniciadas ou participadas.',
  })
  totalTrades: number;

  @ApiProperty({
    example: 24,
    description: 'Total de trocas concluídas com sucesso.',
  })
  completedTrades: number;

  @ApiProperty({
    example: 96.0,
    description: 'Taxa de conclusão de trocas em percentagem.',
  })
  tradeCompletionRate: number;

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

  static fromEntity(entity: UserEntity): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = entity.id;
    dto.email = entity.email;
    dto.name = entity.name;
    dto.avatarUrl = entity.avatarUrl;
    dto.whatsappNumber = entity.whatsappNumber;
    dto.status = entity.status;
    dto.reputationScore = entity.reputationScore;
    dto.totalTrades = entity.totalTrades;
    dto.completedTrades = entity.completedTrades;
    dto.tradeCompletionRate = entity.tradeCompletionRate;
    dto.createdAt = entity.createdAt.toISOString();
    dto.updatedAt = entity.updatedAt.toISOString();
    return dto;
  }
}
