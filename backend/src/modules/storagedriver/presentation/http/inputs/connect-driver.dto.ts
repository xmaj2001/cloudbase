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
import { ProviderType } from '../../../domain/enums/provider-type.enum';

export class GoogleDriveCredentialsDto {
  @ApiProperty({ example: 'ya29.a0...' })
  @IsString()
  accessToken: string;

  @ApiProperty({ example: '1//0g...' })
  @IsString()
  refreshToken: string;

  @ApiProperty({ example: '2026-12-31T00:00:00.000Z' })
  @IsDateString() // Adicionado para garantir o formato de data
  expiresAt: Date;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsString()
  accountEmail: string;

  @ApiProperty({ example: '1234567890' })
  @IsString()
  accountId: string;
}

export class CloudinaryCredentialsDto {
  @ApiProperty({ example: 'abc123key' })
  @IsString()
  apiKey: string;

  @ApiProperty({ example: 'secretValue' })
  @IsString()
  apiSecret: string;

  @ApiProperty({ example: 'my-cloudinary-cloud' })
  @IsString()
  cloudName: string;
}

export class TelegramCredentialsDto {
  @ApiProperty({ example: '123456:ABC-DEF...' })
  @IsString()
  botToken: string;

  @ApiProperty({ example: '-1001234567890' })
  @IsString()
  chatId: string;
}

export class MegaCredentialsDto {
  @ApiProperty({ example: 'mega_session_token...' })
  @IsString()
  sessionToken: string;

  @ApiProperty({ example: 'user@mega.io' })
  @IsString()
  accountEmail: string;
}

export class VpsCredentialsDto {
  @ApiProperty({ example: 'agent_token_here' })
  @IsString()
  agentToken: string;

  @ApiPropertyOptional({ example: '192.168.1.100' })
  @IsString()
  @IsOptional()
  host?: string;

  @ApiPropertyOptional({ example: 8080 })
  @IsInt()
  @IsOptional()
  port?: number;
}

export class DropboxCredentialsDto {
  @ApiProperty({ example: 'sl.abc123...' })
  @IsString()
  accessToken: string;

  @ApiProperty({ example: 'refresh_token_here' })
  @IsString()
  refreshToken: string;

  @ApiProperty({ example: '2026-12-31T00:00:00.000Z' })
  @IsDateString() // Adicionado para garantir o formato de data
  expiresAt: Date;

  @ApiProperty({ example: 'user@email.com' })
  @IsString()
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
export class ConnectDriverDto {
  @ApiProperty({
    enum: ProviderType,
    example: ProviderType.GOOGLE_DRIVE,
    description: 'Tipo de provider de armazenamento.',
  })
  @IsEnum(ProviderType, { message: 'Tipo de provider inválido.' })
  type: ProviderType;

  @ApiProperty({
    example: 'Meu Google Drive Pessoal',
    description: 'Nome de exibição para este driver.',
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome de exibição é obrigatório.' })
  displayName: string;

  @ApiProperty({
    description: 'Credenciais específicas do provider selecionado.',
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
    // Certifique-se de que os nomes das propriedades no switch batem EXATAMENTE
    // com os valores definidos no seu enum `ProviderType`
    switch (options?.object?.type) {
      case ProviderType.GOOGLE_DRIVE:
        return GoogleDriveCredentialsDto;
      case ProviderType.CLOUDINARY:
        return CloudinaryCredentialsDto;
      case ProviderType.TELEGRAM:
        return TelegramCredentialsDto;
      case ProviderType.MEGA:
        return MegaCredentialsDto;
      case ProviderType.VPS:
        return VpsCredentialsDto;
      case ProviderType.DROPBOX:
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
    description:
      'Prioridade no routing de uploads (0 = mais alta). Default: 0.',
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  priority?: number;
}