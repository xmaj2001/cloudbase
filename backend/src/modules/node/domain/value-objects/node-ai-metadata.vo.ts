// Metadados gerados pela IA após processamento do ficheiro

export class NodeAiMetadata {
  readonly classified: boolean;
  readonly category: string | null; // ex: "Documentos/Financeiro"
  readonly confidence: number | null; // 0.0 a 1.0
  readonly summary: string | null; // resumo do conteúdo

  private constructor(
    classified: boolean,
    category: string | null,
    confidence: number | null,
    summary: string | null,
  ) {
    this.classified = classified;
    this.category = category;
    this.confidence = confidence;
    this.summary = summary;
  }

  // estado inicial — ainda não processado pela IA
  static pending(): NodeAiMetadata {
    return new NodeAiMetadata(false, null, null, null);
  }

  // após a IA processar o ficheiro
  static classified(data: {
    category: string;
    confidence: number;
    summary?: string;
  }): NodeAiMetadata {
    if (data.confidence < 0 || data.confidence > 1) {
      throw new Error('Confidence tem de estar entre 0 e 1');
    }
    return new NodeAiMetadata(
      true,
      data.category,
      data.confidence,
      data.summary ?? null,
    );
  }

  get isHighConfidence(): boolean {
    return (this.confidence ?? 0) >= 0.8;
  }
}
