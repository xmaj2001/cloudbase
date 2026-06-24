export enum DriverStatus {
  ACTIVE = 'ACTIVE', // conectado e funcional
  INACTIVE = 'INACTIVE', // desactivado pelo utilizador
  SYNCING = 'SYNCING', // sincronização em curso
  ERROR = 'ERROR', // falha na última sincronização
  EXPIRED = 'EXPIRED', // token expirado — precisa reconectar
}
