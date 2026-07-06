// Value Object para o espaço em cache
// null em totalSpace significa ilimitado (Telegram)

export class DriverSpace {
  readonly totalSpace: bigint | null; // null = ilimitado
  readonly usedSpace: bigint | null;
  readonly availableSpace: bigint | null;
  readonly cachedAt: Date;

  private constructor(
    totalSpace: bigint | null,
    usedSpace: bigint | null,
    availableSpace: bigint | null,
    cachedAt: Date,
  ) {
    this.totalSpace = totalSpace;
    this.usedSpace = usedSpace;
    this.availableSpace = availableSpace;
    this.cachedAt = cachedAt;
  }

  static create(
    totalSpace: bigint | null,
    usedSpace: bigint | null,
    availableSpace: bigint | null,
  ): DriverSpace {
    return new DriverSpace(totalSpace, usedSpace, availableSpace, new Date());
  }

  static unlimited(): DriverSpace {
    return new DriverSpace(null, null, null, new Date());
  }

  static empty(): DriverSpace {
    return new DriverSpace(null, null, null, new Date());
  }

  get isUnlimited(): boolean {
    return this.totalSpace === null;
  }

  // cache válido por 15 minutos
  get isCacheStale(): boolean {
    const fifteenMinutes = 15 * 60 * 1000;
    return Date.now() - this.cachedAt.getTime() > fifteenMinutes;
  }

  // espaço disponível em GB legível
  get availableGb(): string {
    if (this.isUnlimited) return 'ilimitado';
    if (!this.availableSpace) return 'desconhecido';
    const gb = Number(this.availableSpace) / 1024 ** 3;
    return `${gb.toFixed(1)} GB`;
  }
}
