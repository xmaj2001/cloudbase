import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'joao.silva@example.com',
    description: 'O endereço de email do utilizador. Deve ser único.',
  })
  @IsEmail({}, { message: 'Endereço de email inválido.' })
  email: string;

  @ApiProperty({
    example: 'João Silva',
    description: 'O nome completo do utilizador.',
  })
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @ApiPropertyOptional({
    example: 'https://example.com/avatar.png',
    description: 'URL do avatar/foto de perfil do utilizador.',
  })
  @IsString({ message: 'A URL do avatar deve ser uma string.' })
  @IsOptional()
  avatarUrl?: string;

  @ApiPropertyOptional({
    example: 'password123',
    description: 'Senha do utilizador (mínimo de 6 caracteres).',
    minLength: 6,
  })
  @IsString({ message: 'A senha deve ser uma string.' })
  @IsOptional()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  password?: string;

  @ApiPropertyOptional({
    example: '+351912345678',
    description: 'Número de telemóvel/WhatsApp do utilizador.',
  })
  @IsString({ message: 'O número de WhatsApp deve ser uma string.' })
  @IsOptional()
  whatsappNumber?: string;
}
