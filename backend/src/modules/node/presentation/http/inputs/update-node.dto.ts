import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsDateString } from 'class-validator';

export class UpdateNodeDto {
  @ApiPropertyOptional({
    example: 'documento_renomeado.pdf',
    description: 'Novo nome do ficheiro ou pasta',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    type: [String],
    example: ['trabalho', 'importante'],
    description: 'Novas tags (substitui as existentes)',
  })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({
    example: 'https://exemplo.com/thumb.jpg',
    description: 'URL da thumbnail (para imagens, vídeos, etc)',
  })
  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @ApiPropertyOptional({
    example: '2026-12-31T00:00:00.000Z',
    description: 'Data de validade do ficheiro (null para remover validade)',
  })
  @IsDateString()
  @IsOptional()
  expiresAt?: Date | null;
}
