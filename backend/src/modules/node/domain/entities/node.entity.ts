import { BaseDomain } from '../../../../shared/domain/base-domain.base';
import { NodeType } from '../enums/node-type.enum';
import { NodeStatus } from '../enums/node-status.enum';
import { NodeLocation } from '../value-objects/node-location.vo';
import { NodeFragmentation } from '../value-objects/node-fragmentation.vo';
import { NodeAiMetadata } from '../value-objects/node-ai-metadata.vo';
import { NodeTrash } from '../value-objects/node-trash.vo';

interface NodeProps {
  userId: string;
  type: NodeType;

  // metadados básicos
  name: string;
  mimeType: string | null; // só FILE
  extension: string | null; // só FILE
  size: bigint | null; // só FILE

  // localização no provider (só FILE e FOLDER)
  location: NodeLocation | null;

  // fragmentação (só FILE)
  fragmentation: NodeFragmentation;

  // hierarquia — parentId aponta para FOLDER ou GROUP
  parentId: string | null;

  // status e saúde
  status: NodeStatus;
  errorCount: number;
  lastErrorAt: Date | null;
  lastCheckedAt: Date | null;

  // lixeira
  trash: NodeTrash;

  // validade definida pelo utilizador
  expiresAt: Date | null;
  expiryNotifiedAt: Date | null;

  // tags para filtros e busca
  tags: string[];

  // thumbnail (imagens, PDFs, vídeos)
  thumbnailUrl: string | null;

  // metadados de IA
  aiMetadata: NodeAiMetadata;
}

// ── Props para criar FILE ────────────────────────────────
interface CreateFileProps {
  userId: string;
  name: string;
  mimeType: string;
  extension: string;
  size: bigint;
  location: NodeLocation;
  parentId?: string;
  tags?: string[];
}

// ── Props para criar FOLDER (pasta real no provider) ─────
interface CreateFolderProps {
  userId: string;
  name: string;
  location: NodeLocation;
  parentId?: string;
}

// ── Props para criar GROUP (abstracção CloudBase) ────────
interface CreateGroupProps {
  userId: string;
  name: string;
  parentId?: string;
}

export class NodeEntity extends BaseDomain {
  private props: NodeProps;

  private constructor(
    props: NodeProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
    this.props = props;
  }

  // ── Factories ─────────────────────────────────────────

  static createFile(data: CreateFileProps): NodeEntity {
    return new NodeEntity({
      userId: data.userId,
      type: NodeType.FILE,
      name: data.name,
      mimeType: data.mimeType,
      extension: data.extension,
      size: data.size,
      location: data.location,
      fragmentation: NodeFragmentation.none(),
      parentId: data.parentId ?? null,
      status: NodeStatus.UPLOADING,
      errorCount: 0,
      lastErrorAt: null,
      lastCheckedAt: null,
      trash: NodeTrash.none(),
      expiresAt: null,
      expiryNotifiedAt: null,
      tags: data.tags ?? [],
      thumbnailUrl: null,
      aiMetadata: NodeAiMetadata.pending(),
    });
  }

  static createFolder(data: CreateFolderProps): NodeEntity {
    return new NodeEntity({
      userId: data.userId,
      type: NodeType.FOLDER,
      name: data.name,
      mimeType: null,
      extension: null,
      size: null,
      location: data.location,
      fragmentation: NodeFragmentation.none(),
      parentId: data.parentId ?? null,
      status: NodeStatus.ACTIVE,
      errorCount: 0,
      lastErrorAt: null,
      lastCheckedAt: null,
      trash: NodeTrash.none(),
      expiresAt: null,
      expiryNotifiedAt: null,
      tags: [],
      thumbnailUrl: null,
      aiMetadata: NodeAiMetadata.pending(),
    });
  }

  static createGroup(data: CreateGroupProps): NodeEntity {
    return new NodeEntity({
      userId: data.userId,
      type: NodeType.GROUP,
      name: data.name,
      mimeType: null,
      extension: null,
      size: null,
      location: null, // GROUP não tem localização num provider
      fragmentation: NodeFragmentation.none(),
      parentId: data.parentId ?? null,
      status: NodeStatus.ACTIVE,
      errorCount: 0,
      lastErrorAt: null,
      lastCheckedAt: null,
      trash: NodeTrash.none(),
      expiresAt: null,
      expiryNotifiedAt: null,
      tags: [],
      thumbnailUrl: null,
      aiMetadata: NodeAiMetadata.pending(),
    });
  }

  static reconstitute(
    props: NodeProps,
    id: string,
    createdAt: Date,
    updatedAt: Date,
  ): NodeEntity {
    return new NodeEntity(props, id, createdAt, updatedAt);
  }

  // ── Getters básicos ───────────────────────────────────
  get userId(): string {
    return this.props.userId;
  }
  get type(): NodeType {
    return this.props.type;
  }
  get name(): string {
    return this.props.name;
  }
  get mimeType(): string | null {
    return this.props.mimeType;
  }
  get extension(): string | null {
    return this.props.extension;
  }
  get size(): bigint | null {
    return this.props.size;
  }
  get parentId(): string | null {
    return this.props.parentId;
  }
  get status(): NodeStatus {
    return this.props.status;
  }
  get errorCount(): number {
    return this.props.errorCount;
  }
  get tags(): string[] {
    return [...this.props.tags];
  }
  get thumbnailUrl(): string | null {
    return this.props.thumbnailUrl;
  }
  get expiresAt(): Date | null {
    return this.props.expiresAt;
  }
  get lastErrorAt(): Date | null {
    return this.props.lastErrorAt;
  }
  get lastCheckedAt(): Date | null {
    return this.props.lastCheckedAt;
  }

  // ── Getters de value objects ──────────────────────────
  get location(): NodeLocation | null {
    return this.props.location;
  }
  get fragmentation(): NodeFragmentation {
    return this.props.fragmentation;
  }
  get trash(): NodeTrash {
    return this.props.trash;
  }
  get aiMetadata(): NodeAiMetadata {
    return this.props.aiMetadata;
  }

  // ── Getters de tipo ───────────────────────────────────
  get isFile(): boolean {
    return this.props.type === NodeType.FILE;
  }
  get isFolder(): boolean {
    return this.props.type === NodeType.FOLDER;
  }
  get isGroup(): boolean {
    return this.props.type === NodeType.GROUP;
  }

  // ── Getters de estado ─────────────────────────────────
  get isActive(): boolean {
    return this.props.status === NodeStatus.ACTIVE;
  }
  get isTrashed(): boolean {
    return this.props.trash.isTrashed;
  }
  get isFragmented(): boolean {
    return this.props.fragmentation.isFragmented;
  }
  get isDeleted(): boolean {
    return this.props.status === NodeStatus.DELETED;
  }
  get isCorrupted(): boolean {
    return this.props.status === NodeStatus.CORRUPTED;
  }

  get hasExpiry(): boolean {
    return this.props.expiresAt !== null;
  }

  get isExpired(): boolean {
    if (!this.props.expiresAt) return false;
    return new Date() > this.props.expiresAt;
  }

  // ── Métodos de negócio ───────────────────────────────

  rename(newName: string): void {
    this.props.name = newName;
    this.touch();
  }

  moveTo(parentId: string | null): void {
    this.props.parentId = parentId;
    this.touch();
  }

  addTags(tags: string[]): void {
    const unique = new Set([...this.props.tags, ...tags]);
    this.props.tags = Array.from(unique);
    this.touch();
  }

  removeTags(tags: string[]): void {
    this.props.tags = this.props.tags.filter((t) => !tags.includes(t));
    this.touch();
  }

  setThumbnail(url: string): void {
    this.props.thumbnailUrl = url;
    this.touch();
  }

  setExpiry(expiresAt: Date): void {
    if (expiresAt <= new Date()) {
      throw new Error('A data de validade tem de ser no futuro');
    }
    this.props.expiresAt = expiresAt;
    this.touch();
  }

  clearExpiry(): void {
    this.props.expiresAt = null;
    this.props.expiryNotifiedAt = null;
    this.touch();
  }

  markExpiryNotified(): void {
    this.props.expiryNotifiedAt = new Date();
    this.touch();
  }

  // upload concluído com sucesso
  markUploadComplete(): void {
    if (this.props.status !== NodeStatus.UPLOADING) return;
    this.props.status = NodeStatus.ACTIVE;
    this.touch();
  }

  // fragmentação iniciada
  markFragmenting(): void {
    this.props.status = NodeStatus.FRAGMENTING;
    this.touch();
  }

  // fragmentação concluída
  markFragmentationComplete(totalChunks: number, originalHash: string): void {
    this.props.fragmentation = NodeFragmentation.fragmented(
      totalChunks,
      originalHash,
    );
    this.props.status = NodeStatus.ACTIVE;
    this.touch();
  }

  // mover para lixeira
  moveToTrash(trashTtlDays: number = 30): void {
    this.props.trash = NodeTrash.trashed(trashTtlDays);
    this.props.status = NodeStatus.TRASHED;
    this.touch();
  }

  // restaurar da lixeira
  restoreFromTrash(): void {
    this.props.trash = NodeTrash.none();
    this.props.status = NodeStatus.ACTIVE;
    this.touch();
  }

  // eliminar permanentemente
  deletePermanently(): void {
    this.props.status = NodeStatus.DELETED;
    this.touch();
  }

  // validade expirou — move para lixeira automaticamente
  expireToTrash(trashTtlDays: number = 30): void {
    this.props.status = NodeStatus.EXPIRED;
    this.props.trash = NodeTrash.trashed(trashTtlDays);
    this.touch();
  }

  // falha ao aceder ao ficheiro no provider
  recordAccessError(): void {
    this.props.errorCount += 1;
    this.props.lastErrorAt = new Date();
    this.props.lastCheckedAt = new Date();

    // 3 falhas → corrompido
    if (this.props.errorCount >= 3) {
      this.props.status = NodeStatus.CORRUPTED;
    } else {
      this.props.status = NodeStatus.UNREACHABLE;
    }

    this.touch();
  }

  // acesso bem sucedido — reset de erros
  recordAccessSuccess(): void {
    this.props.errorCount = 0;
    this.props.lastErrorAt = null;
    this.props.lastCheckedAt = new Date();
    this.props.status = NodeStatus.ACTIVE;
    this.touch();
  }

  // IA classificou o ficheiro
  applyAiClassification(data: {
    category: string;
    confidence: number;
    summary?: string;
  }): void {
    this.props.aiMetadata = NodeAiMetadata.classified(data);
    this.touch();
  }

  // actualiza localização (quando ficheiro é movido no provider)
  updateLocation(newPath: string): void {
    if (!this.props.location) return;
    this.props.location = this.props.location.withUpdatedPath(newPath);
    this.touch();
  }
}
