export type StorageProvider = 'google_drive' | 'onedrive' | 'telegram' | 'cloudinary';
export type StorageItemType = 'file' | 'folder';

export interface StorageItemProps {
  id?: string;               // Opcional na criação, obrigatório após persistência
  userId: string;            // O UID do utilizador dono do item
  nome: string;              // Nome visível da pasta ou ficheiro
  tipo: StorageItemType;     // Se é 'file' ou 'folder'
  mimeType: string;          // ex: 'application/pdf', 'image/png', ou 'application/vnd.google-apps.folder'
  tamanhoBytes: number;      // Tamanho físico (pastas costumam ser 0)
  provider: StorageProvider; // De onde vem este mambo
  providerFileId: string;    // O ID real do item lá no servidor do provider (ex: Google)
  parentId: string;          // ID do item pai na nossa DB (padrão: 'root')
  createdAt?: string;        // Data de registo no sistema
}

export class StorageItem {
  private props: StorageItemProps;

  constructor(props: StorageItemProps) {
    // Aplicamos validações de negócio logo na instanciação
    this.validar(props);

    this.props = {
      ...props,
      id: props.id,
      parentId: props.parentId ?? 'root',
      createdAt: props.createdAt ?? new Date().toISOString(),
    };
  }

  // Regras de Negócio Fundamentais e Invariáveis
  private validar(props: StorageItemProps) {
    if (!props.userId) {
      throw new Error('⚠️ Erro de Domínio: Todo o item deve pertencer a um utilizador (userId em falta).');
    }
    if (!props.nome || props.nome.trim() === '') {
      throw new Error('⚠️ Erro de Domínio: O nome do ficheiro ou pasta não pode estar vazio.');
    }
    if (!props.providerFileId || props.providerFileId.trim() === '') {
      throw new Error('⚠️ Erro de Domínio: É obrigatório mapear o ID nativo do provider (providerFileId).');
    }
    if (props.tamanhoBytes < 0) {
      throw new Error('⚠️ Erro de Domínio: O tamanho do ficheiro não pode ser negativo.');
    }
  }

  // Getters para expor os dados com segurança sem permitir mutação direta
  public get id(): string | undefined { return this.props.id; }
  public get userId(): string { return this.props.userId; }
  public get nome(): string { return this.props.nome; }
  public get tipo(): StorageItemType { return this.props.tipo; }
  public get mimeType(): string { return this.props.mimeType; }
  public get tamanhoBytes(): number { return this.props.tamanhoBytes; }
  public get provider(): StorageProvider { return this.props.provider; }
  public get providerFileId(): string { return this.props.providerFileId; }
  public get parentId(): string { return this.props.parentId; }
  public get createdAt(): string | undefined { return this.props.createdAt; }

  /**
   * Converte a entidade de volta para um objeto JavaScript puro (ideal para salvar no Firestore)
   */
  public toDTO() {
    return {
      id: this.id,
      userId: this.userId,
      nome: this.nome,
      tipo: this.tipo,
      mimeType: this.mimeType,
      tamanhoBytes: this.tamanhoBytes,
      provider: this.provider,
      providerFileId: this.providerFileId,
      parentId: this.parentId,
      createdAt: this.createdAt,
    };
  }
}