import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'João da Silva',
    description: 'O novo nome do utilizador.',
  })
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/new-avatar.png',
    description: 'URL do novo avatar/foto de perfil.',
  })
  @IsString({ message: 'A URL do avatar deve ser uma string.' })
  @IsOptional()
  avatarUrl?: string;

  @ApiPropertyOptional({
    example: '+351987654321',
    description: 'Novo número de WhatsApp.',
  })
  @IsString({ message: 'O número de WhatsApp deve ser uma string.' })
  @IsOptional()
  whatsappNumber?: string;
}
