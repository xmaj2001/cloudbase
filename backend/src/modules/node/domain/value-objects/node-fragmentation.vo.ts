// Informação de fragmentação do ficheiro
// Só relevante quando isFragmented = true

export class NodeFragmentation {
  readonly isFragmented: boolean;
  readonly totalChunks: number;
  readonly originalHash: string | null; // SHA-256 do ficheiro completo

  private constructor(
    isFragmented: boolean,
    totalChunks: number,
    originalHash: string | null,
  ) {
    this.isFragmented = isFragmented;
    this.totalChunks = totalChunks;
    this.originalHash = originalHash;
  }

  // ficheiro não fragmentado (caso normal)
  static none(): NodeFragmentation {
    return new NodeFragmentation(false, 1, null);
  }

  // ficheiro fragmentado em N chunks
  static fragmented(
    totalChunks: number,
    originalHash: string,
  ): NodeFragmentation {
    if (totalChunks < 2) {
      throw new Error('Ficheiro fragmentado precisa de pelo menos 2 chunks');
    }
    return new NodeFragmentation(true, totalChunks, originalHash);
  }
}
