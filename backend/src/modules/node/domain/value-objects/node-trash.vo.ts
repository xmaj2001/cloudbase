// Controlo da lixeira e validade do ficheiro

export class NodeTrash {
  readonly trashedAt: Date | null;
  readonly permanentDeleteAt: Date | null;

  private constructor(trashedAt: Date | null, permanentDeleteAt: Date | null) {
    this.trashedAt = trashedAt;
    this.permanentDeleteAt = permanentDeleteAt;
  }

  static none(): NodeTrash {
    return new NodeTrash(null, null);
  }

  // mover para lixeira com TTL em dias
  static trashed(trashTtlDays: number): NodeTrash {
    const trashedAt = new Date();
    const permanentDeleteAt = new Date(
      trashedAt.getTime() + trashTtlDays * 24 * 60 * 60 * 1000,
    );
    return new NodeTrash(trashedAt, permanentDeleteAt);
  }

  get isTrashed(): boolean {
    return this.trashedAt !== null;
  }

  // já passou o prazo de eliminação permanente?
  get isExpiredFromTrash(): boolean {
    if (!this.permanentDeleteAt) return false;
    return new Date() > this.permanentDeleteAt;
  }

  // quantos dias faltam para eliminação permanente
  get daysUntilPermanentDelete(): number | null {
    if (!this.permanentDeleteAt) return null;
    const diff = this.permanentDeleteAt.getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }
}
