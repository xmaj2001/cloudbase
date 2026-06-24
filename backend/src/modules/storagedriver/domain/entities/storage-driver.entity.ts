import { BaseDomain } from '../../../../shared/domain/base-domain.base';
import { ProviderType } from '../enums/provider-type.enum';
import { DriverStatus } from '../enums/driver-status.enum';
import { DriverCredentials } from '../value-objects/driver-credentials.vo';
import { DriverSpace } from '../value-objects/driver-space.vo';

interface StorageDriverProps {
  userId: string;
  type: ProviderType;
  displayName: string;
  status: DriverStatus;
  priority: number;

  // credenciais específicas por provider
  credentials: DriverCredentials;

  // pasta raiz no provider (criada pelo CloudBase)
  rootFolderId?: string | null;
  rootFolderPath?: string | null;

  // pasta de fragmentos (⚠️ utilizador não deve eliminar)
  fragmentFolderId?: string | null;
  fragmentFolderPath?: string | null;

  // cache de espaço
  space: DriverSpace;

  lastSyncAt?: Date | null;
  syncError?: string | null;
}

interface CreateStorageDriverProps {
  userId: string;
  type: ProviderType;
  displayName: string;
  credentials: DriverCredentials;
  priority?: number;
}

export class StorageDriverEntity extends BaseDomain {
  private props: StorageDriverProps;

  private constructor(
    props: StorageDriverProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
    this.props = props;
  }

  // ── Factory — conectar novo driver ───────────────────
  static create(data: CreateStorageDriverProps): StorageDriverEntity {
    // Telegram começa como ilimitado logo de início
    const initialSpace =
      data.type === ProviderType.TELEGRAM
        ? DriverSpace.unlimited()
        : DriverSpace.empty();

    return new StorageDriverEntity({
      userId: data.userId,
      type: data.type,
      displayName: data.displayName,
      status: DriverStatus.ACTIVE,
      priority: data.priority ?? 0,
      credentials: data.credentials,
      rootFolderId: null,
      rootFolderPath: null,
      fragmentFolderId: null,
      fragmentFolderPath: null,
      space: initialSpace,
      lastSyncAt: null,
      syncError: null,
    });
  }

  // ── Factory — reconstituir do banco ──────────────────
  static reconstitute(
    props: StorageDriverProps,
    id: string,
    createdAt: Date,
    updatedAt: Date,
  ): StorageDriverEntity {
    return new StorageDriverEntity(props, id, createdAt, updatedAt);
  }

  // ── Getters ──────────────────────────────────────────
  get userId(): string {
    return this.props.userId;
  }

  get type(): ProviderType {
    return this.props.type;
  }

  get displayName(): string {
    return this.props.displayName;
  }

  get status(): DriverStatus {
    return this.props.status;
  }

  get priority(): number {
    return this.props.priority;
  }

  get credentials(): DriverCredentials {
    return this.props.credentials;
  }

  get space(): DriverSpace {
    return this.props.space;
  }

  get lastSyncAt(): Date | null {
    return this.props.lastSyncAt ?? null;
  }

  get syncError(): string | null {
    return this.props.syncError ?? null;
  }

  get isActive(): boolean {
    return this.props.status === DriverStatus.ACTIVE;
  }

  // pasta raiz
  get rootFolderId(): string | null {
    return this.props.rootFolderId ?? null;
  }

  get rootFolderPath(): string | null {
    return this.props.rootFolderPath ?? null;
  }

  // pasta de fragmentos
  get fragmentFolderId(): string | null {
    return this.props.fragmentFolderId ?? null;
  }

  get fragmentFolderPath(): string | null {
    return this.props.fragmentFolderPath ?? null;
  }

  // o espaço em cache está desactualizado?
  get needsSpaceRefresh(): boolean {
    if (this.props.type === ProviderType.TELEGRAM) return false; // ilimitado, nunca precisa
    return this.props.space.isCacheStale;
  }

  // ── Métodos de negócio ───────────────────────────────

  // chamado após criar as pastas no provider
  setRootFolder(folderId: string, folderPath: string): void {
    this.props.rootFolderId = folderId;
    this.props.rootFolderPath = folderPath;
    this.touch();
  }

  // chamado após criar a pasta de fragmentos no provider
  setFragmentFolder(folderId: string, folderPath: string): void {
    this.props.fragmentFolderId = folderId;
    this.props.fragmentFolderPath = folderPath;
    this.touch();
  }

  // actualiza as credenciais (ex: refresh do token)
  updateCredentials(credentials: DriverCredentials): void {
    this.props.credentials = credentials;
    this.props.status = DriverStatus.ACTIVE;
    this.props.syncError = null;
    this.touch();
  }

  // actualiza o cache de espaço após consultar o provider
  updateSpace(
    totalSpace: bigint | null,
    usedSpace: bigint | null,
    availableSpace: bigint | null,
  ): void {
    this.props.space = DriverSpace.create(
      totalSpace,
      usedSpace,
      availableSpace,
    );
    this.touch();
  }

  // regista sincronização bem sucedida
  markSyncSuccess(): void {
    this.props.lastSyncAt = new Date();
    this.props.syncError = null;
    this.props.status = DriverStatus.ACTIVE;
    this.touch();
  }

  // regista erro de sincronização
  markSyncError(error: string): void {
    this.props.lastSyncAt = new Date();
    this.props.syncError = error;
    this.props.status = DriverStatus.ERROR;
    this.touch();
  }

  // token expirou — utilizador precisa reconectar
  markTokenExpired(): void {
    this.props.status = DriverStatus.EXPIRED;
    this.touch();
  }

  // utilizador desactiva o driver
  deactivate(): void {
    this.props.status = DriverStatus.INACTIVE;
    this.touch();
  }

  // utilizador reactiva o driver
  activate(): void {
    this.props.status = DriverStatus.ACTIVE;
    this.props.syncError = null;
    this.touch();
  }

  // muda a prioridade no routing de upload
  setPriority(priority: number): void {
    this.props.priority = priority;
    this.touch();
  }

  updateDisplayName(name: string): void {
    this.props.displayName = name;
    this.touch();
  }
}
