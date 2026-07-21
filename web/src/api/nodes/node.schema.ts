import { z } from "zod";
import { NodeType, NodeStatus } from "./types";

export const createNodeSchema = z.object({
  type: z.nativeEnum(NodeType, {
    error: () => ({
      message: "O tipo do nó deve ser FILE, FOLDER ou GROUP.",
    }),
  }),
  name: z
    .string()
    .min(1, "O nome do ficheiro ou pasta é obrigatório.")
    .max(255, "O nome não pode exceder 255 caracteres."),

  mimeType: z.string().optional(),
  extension: z.string().optional(),

  // Como o BigInt pode vir como string ou number no client, aceitamos ambos
  // e transformamos tudo para string para bater com a interface da API
  size: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .optional(),

  driverId: z.string().uuid("ID do driver inválido.").optional(),
  parentId: z
    .string()
    .uuid("ID da pasta pai inválido.")
    .nullable()
    .optional()
    .default(null),

  tags: z.array(z.string()).optional().default([]),

  status: z.nativeEnum(NodeStatus).optional().default(NodeStatus.ACTIVE),

  providerFileId: z.string().optional(),
  providerPath: z
    .string()
    .url("O caminho do provedor deve ser uma URL válida.")
    .optional()
    .or(z.string()), // Aceita URL ou string vazia
});

// Inferência do tipo exato a partir do Schema Zod para uso no Frontend/Inputs
export type CreateNodeRequest = z.infer<typeof createNodeSchema>;

// Schema auxiliar para atualização/renomeação parcial de um Node
export const updateNodeSchema = z.object({
  name: z.string().min(1, "O nome não pode ficar vazio.").max(255).optional(),
  parentId: z.string().uuid().nullable().optional(),
  status: z.nativeEnum(NodeStatus).optional(),
  tags: z.array(z.string()).optional(),
});

export type UpdateNodeRequest = z.infer<typeof updateNodeSchema>;
