import { ApiProperty } from '@nestjs/swagger';

class DriverSpaceDto {
  @ApiProperty({
    description:
      'Espaço total em GB. null quando o provedor não tem limite fixo (ex: Telegram) — o frontend deve renderizar isso como "ilimitado", não tratar como zero.',
    example: 15,
    nullable: true,
  })
  totalGb: number | null;

  @ApiProperty({ description: 'Espaço usado em GB', example: 2.2 })
  usedGb: number;
}

/**
 * Formato consumido pela tabela/dashboard de drivers e pelo card
 * "Distribuição" do StorageBar. Os nomes e o shape aqui têm que bater
 * com o type `Driver` usado no frontend.
 */
export class DriverListItemDto {
  @ApiProperty({ example: 'clx1a2b3c4d5e6f7g8h9i0j1' })
  id: string;

  @ApiProperty({
    example: 'GOOGLE_DRIVE',
    enum: [
      'GOOGLE_DRIVE',
      'ONEDRIVE',
      'TELEGRAM',
      'CLOUDINARY',
      'MEGA',
      'DROPBOX',
      'BOX',
      'PCLOUD',
      'YANDEX',
      'VPS',
      'LOCAL_MACHINE',
    ],
  })
  type: string;

  @ApiProperty({ example: 'Google Drive · Pessoal' })
  displayName: string;

  @ApiProperty({
    example: 'ACTIVE',
    enum: ['ACTIVE', 'SYNCING', 'ERROR'],
  })
  status: string;

  @ApiProperty({ type: DriverSpaceDto })
  space: DriverSpaceDto;
}
