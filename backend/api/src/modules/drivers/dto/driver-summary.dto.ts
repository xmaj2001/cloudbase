import { ApiProperty } from '@nestjs/swagger';

/**
 * Formato consumido diretamente pelo componente <DriversKpis /> no
 * frontend — os nomes dos campos aqui têm que bater 1:1 com
 * DriversKpisProps, pra não precisar de nenhum mapeamento no cliente.
 *
 * Chamado de "Summary" (resumo) em vez de "KPI" porque não é
 * exatamente um indicador de desempenho — é só a soma/contagem
 * agregada do estado atual dos drivers.
 */
export class DriverSummaryDto {
  @ApiProperty({
    description:
      'Soma do espaço total (derivado) de todos os drivers do utilizador, em GB',
    example: 27.5,
  })
  totalGb: number;

  @ApiProperty({
    description: 'Soma do espaço usado de todos os drivers do utilizador, em GB',
    example: 4.32,
  })
  usedGb: number;

  @ApiProperty({
    description: 'Número total de drivers registados pelo utilizador',
    example: 3,
  })
  driversCount: number;

  @ApiProperty({
    description: 'Número de drivers sem erro de sincronização (ACTIVE ou SYNCING)',
    example: 2,
  })
  activeCount: number;
}
