import {
  ApiProperty,
  ApiPropertyOptional,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { ProviderType } from '../domain/value-objects/driver-credentials';

/**
 * Credenciais do Google Drive
 */
export class GoogleDriveCredentialsDto {
  @ApiProperty({
    example: 'ya29.a0...',
    description: 'Token de acesso do Google Drive',
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({
    example: '1//0g...',
    description: 'Token de renovação',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @ApiProperty({
    example: '2026-12-31T00:00:00.000Z',
    description: 'Data de expiração do token',
  })
  @IsDateString()
  @IsNotEmpty()
  expiresAt: Date;

  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Email da conta Google Drive',
  })
  @IsString()
  @IsNotEmpty()
  accountEmail: string;

  @ApiProperty({
    example: '1234567890',
    description: 'ID da conta Google',
  })
  @IsString()
  @IsNotEmpty()
  accountId: string;
}

/**
 * Credenciais do Telegram
 */
export class TelegramCredentialsDto {
  @ApiProperty({
    example: '123456:ABC-DEF...',
    description: 'Token do bot Telegram',
  })
  @IsString()
  @IsNotEmpty()
  botToken: string;

  @ApiProperty({
    example: '-1001234567890',
    description: 'Chat ID do Telegram',
  })
  @IsString()
  @IsNotEmpty()
  chatId: string;
}

/**
 * Credenciais do Cloudinary
 */
export class CloudinaryCredentialsDto {
  @ApiProperty({
    example: 'abc123key',
    description: 'API Key do Cloudinary',
  })
  @IsString()
  @IsNotEmpty()
  apiKey: string;

  @ApiProperty({
    example: 'secretValue',
    description: 'API Secret do Cloudinary',
  })
  @IsString()
  @IsNotEmpty()
  apiSecret: string;

  @ApiProperty({
    example: 'my-cloudinary-cloud',
    description: 'Cloud Name do Cloudinary',
  })
  @IsString()
  @IsNotEmpty()
  cloudName: string;
}

/**
 * Credenciais do MEGA
 */
export class MegaCredentialsDto {
  @ApiProperty({
    example: 'mega_session_token...',
    description: 'Token de sessão do MEGA',
  })
  @IsString()
  @IsNotEmpty()
  sessionToken: string;

  @ApiProperty({
    example: 'user@mega.io',
    description: 'Email da conta MEGA',
  })
  @IsString()
  @IsNotEmpty()
  accountEmail: string;
}

/**
 * Credenciais da VPS
 */
export class VpsCredentialsDto {
  @ApiProperty({
    example: 'agent_token_here',
    description: 'Token do agente CloudBase',
  })
  @IsString()
  @IsNotEmpty()
  agentToken: string;

  @ApiPropertyOptional({
    example: '192.168.1.100',
    description: 'IP ou hostname da VPS',
  })
  @IsString()
  @IsOptional()
  host?: string;

  @ApiPropertyOptional({
    example: 8080,
    description: 'Porta da VPS',
  })
  @IsInt()
  @IsOptional()
  port?: number;
}

/**
 * Credenciais do Dropbox
 */
export class DropboxCredentialsDto {
  @ApiProperty({
    example: 'sl.abc123...',
    description: 'Token de acesso do Dropbox',
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({
    example: 'refresh_token_here',
    description: 'Token de renovação',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @ApiProperty({
    example: '2026-12-31T00:00:00.000Z',
    description: 'Data de expiração do token',
  })
  @IsDateString()
  @IsNotEmpty()
  expiresAt: Date;

  @ApiProperty({
    example: 'user@email.com',
    description: 'Email da conta Dropbox',
  })
  @IsString()
  @IsNotEmpty()
  accountEmail: string;
}

@ApiExtraModels(
  GoogleDriveCredentialsDto,
  CloudinaryCredentialsDto,
  TelegramCredentialsDto,
  MegaCredentialsDto,
  VpsCredentialsDto,
  DropboxCredentialsDto,
)
/**
 * DTO para criar novo Storage Driver com credenciais type-safe
 */
export class CreateDriverDto {
  @ApiProperty({
    enum: ProviderType,
    example: ProviderType.GOOGLE_DRIVE,
    description: 'Tipo de provedor de armazenamento',
  })
  @IsEnum(ProviderType)
  @IsNotEmpty()
  type: ProviderType;

  @ApiProperty({
    example: 'Meu Google Drive Pessoal',
    description: 'Nome de exibição para identificar este storage driver',
  })
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @ApiProperty({
    description: 'Credenciais específicas do provedor selecionado',
    oneOf: [
      { $ref: getSchemaPath(GoogleDriveCredentialsDto) },
      { $ref: getSchemaPath(CloudinaryCredentialsDto) },
      { $ref: getSchemaPath(TelegramCredentialsDto) },
      { $ref: getSchemaPath(MegaCredentialsDto) },
      { $ref: getSchemaPath(VpsCredentialsDto) },
      { $ref: getSchemaPath(DropboxCredentialsDto) },
    ],
  })
  @ValidateNested()
  @Type((options) => {
    switch (options?.object?.type) {
      case ProviderType.GOOGLE_DRIVE:
      case ProviderType.ONEDRIVE:
        return GoogleDriveCredentialsDto;
      case ProviderType.CLOUDINARY:
        return CloudinaryCredentialsDto;
      case ProviderType.TELEGRAM:
        return TelegramCredentialsDto;
      case ProviderType.MEGA:
        return MegaCredentialsDto;
      case ProviderType.VPS:
      case ProviderType.LOCAL_MACHINE:
        return VpsCredentialsDto;
      case ProviderType.DROPBOX:
      case ProviderType.BOX:
      case ProviderType.PCLOUD:
      case ProviderType.YANDEX:
        return DropboxCredentialsDto;
      default:
        return Object;
    }
  })
  credentials:
    | GoogleDriveCredentialsDto
    | CloudinaryCredentialsDto
    | TelegramCredentialsDto
    | MegaCredentialsDto
    | VpsCredentialsDto
    | DropboxCredentialsDto;

  @ApiPropertyOptional({
    example: 0,
    description: 'Prioridade relativa (maior = mais preferido)',
    default: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  priority?: number;
}
