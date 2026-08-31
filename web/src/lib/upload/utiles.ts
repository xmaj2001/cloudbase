import { createSHA256 } from "hash-wasm";

const DEFAULT_READ_CHUNK_SIZE = 4 * 1024 * 1024; // 4MB por leitura

/**
 * Calcula o SHA-256 de um Blob/File sem carregar tudo em memória de
 * uma vez — lê e alimenta o hasher em pedaços de `readChunkSize`.
 *
 * Usa-se tanto para o `originalHash` (ficheiro inteiro) como para o
 * `chunkHash` (um fragmento já fatiado via file.slice()).
 */
export async function hashBlobStream(
  blob: Blob,
  readChunkSize: number = DEFAULT_READ_CHUNK_SIZE,
): Promise<string> {
  const hasher = await createSHA256();
  hasher.init();

  let offset = 0;
  while (offset < blob.size) {
    const slice = blob.slice(offset, offset + readChunkSize);
    const buffer = await slice.arrayBuffer();
    hasher.update(new Uint8Array(buffer));
    offset += readChunkSize;
  }

  return hasher.digest("hex");
}
