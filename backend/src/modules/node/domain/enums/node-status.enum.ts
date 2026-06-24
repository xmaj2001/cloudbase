export enum NodeStatus {
  ACTIVE = 'ACTIVE', // disponível e íntegro
  UPLOADING = 'UPLOADING', // upload em progresso
  FRAGMENTING = 'FRAGMENTING', // a ser fragmentado
  TRASHED = 'TRASHED', // na lixeira
  DELETED = 'DELETED', // eliminado permanentemente
  UNREACHABLE = 'UNREACHABLE', // falhou 1-2x ao aceder
  CORRUPTED = 'CORRUPTED', // falhou 3x+ — provável eliminação no provider
  EXPIRED = 'EXPIRED', // validade expirou — movido para lixeira
}
