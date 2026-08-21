import { z } from "zod";

// ── CHUNK SCHEMA ──────────────────────────────────────────────────────────────

export const fileChunkSchema = z.object({
  chunkIndex: z.number().int().nonnegative(),
  size: z.union([z.string(), z.number()]),
  startByte: z.union([z.string(), z.number()]),
  endByte: z.union([z.string(), z.number()]),
  chunkHash: z.string().min(1, "O hash do chunk é obrigatório."),
  providerId: z.string().uuid("O providerId do chunk deve ser um UUID válido."),
  providerFileId: z.string().optional(),
  providerPath: z.string().optional(),
});

// ── NODE SCHEMA ───────────────────────────────────────────────────────────────

/**
 * Schema base para criação de um node.
 * Valida tanto FOLDERs como FILEs simples ou fragmentados.
 */
export const createNodeSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório.")
    .max(255, "O nome não pode exceder 255 caracteres."),
  type: z.enum(["FILE", "FOLDER"], {
    message: "O tipo deve ser FILE ou FOLDER.",
  }),
  mimeType: z.string().optional(),
  extension: z.string().optional(),
  size: z.union([z.string(), z.number()]).optional(),
  isFragmented: z.boolean().optional().default(false),
  totalChunks: z.number().int().min(1).optional().default(1),
  originalHash: z.string().optional(),
  providerId: z.string().uuid("O providerId deve ser um UUID válido."),
  providerFileId: z.string().optional(),
  providerPath: z.string().optional(),
  parentId: z.string().uuid().nullable().optional(),
  chunks: z.array(fileChunkSchema).optional(),
});

export type CreateNodeFormValues = z.infer<typeof createNodeSchema>;
export type FileChunkFormValues = z.infer<typeof fileChunkSchema>;
