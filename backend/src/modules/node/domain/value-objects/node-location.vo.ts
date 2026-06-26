// Localização do ficheiro/pasta num provider
// Só existe em nodes do tipo FILE e FOLDER

export class NodeLocation {
  readonly driverId: string;
  readonly providerName?: string;
  readonly providerFileId: string;
  readonly providerPath: string;
  readonly providerCreatedAt: Date;
  readonly providerUpdatedAt: Date;

  private constructor(
    driverId: string,
    providerFileId: string,
    providerPath: string,
    providerCreatedAt: Date,
    providerUpdatedAt: Date,
    providerName?: string,
  ) {
    this.driverId = driverId;
    this.providerName = providerName;
    this.providerFileId = providerFileId;
    this.providerPath = providerPath;
    this.providerCreatedAt = providerCreatedAt;
    this.providerUpdatedAt = providerUpdatedAt;
  }

  static create(data: {
    driverId: string;
    providerName?: string;
    providerFileId: string;
    providerPath: string;
    providerCreatedAt?: Date;
    providerUpdatedAt?: Date;
  }): NodeLocation {
    return new NodeLocation(
      data.driverId,
      data.providerFileId,
      data.providerPath,
      data.providerCreatedAt ?? new Date(),
      data.providerUpdatedAt ?? new Date(),
      data.providerName,
    );
  }

  // actualiza o path quando o ficheiro é movido no provider
  withUpdatedPath(newPath: string): NodeLocation {
    return new NodeLocation(
      this.driverId,
      this.providerFileId,
      newPath,
      this.providerCreatedAt,
      new Date(),
      this.providerName,
    );
  }
}
