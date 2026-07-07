export interface StorageSpaceInfo {
  totalSpace: bigint | null; // null se for ilimitado (ex: Telegram)
  usedSpace: bigint;
  availableSpace: bigint | null;
}

export interface IStorageAdapter {
  /**
   * Consulta a API do provedor e extrai o uso de espaço atualizado
   */
  fetchSpaceInfo(credentials: any): Promise<StorageSpaceInfo>;
}
