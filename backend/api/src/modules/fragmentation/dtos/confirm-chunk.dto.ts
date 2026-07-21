import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ConfirmChunkDto {
  @ApiProperty({
    example:
      'sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    description:
      'Hash de integridade (SHA-256 ou similar) gerado após o upload do chunk.',
  })
  @IsString()
  @IsNotEmpty()
  chunkHash: string;

  @ApiProperty({
    example: 'gdrive://15A_zXw4z9N-P6X9O8u8...',
    description:
      'ID ou URI único retornado pelo provider externo (Google Drive, Cloudinary, etc.) após o upload do fragmento.',
  })
  @IsString()
  @IsNotEmpty()
  providerFileId: string;
}
