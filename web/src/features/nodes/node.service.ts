import { apiFetch } from "@/api/core/api-fetch";
import type { ApiEnvelope } from "@/api/core/api.types";
import type { ApiNode, ApiNodeDetail, CreateNodeInput } from "./types";
import { apiFetchServer } from "../core/api-fetch.server";

/**
 * Serviço da feature nodes.
 * Todas as chamadas passam pelo BFF do Next.js (/api/nodes/*).
 *
 * Rotas BFF disponíveis:
 *   GET    /api/nodes?parentId=...       → listChildren
 *   POST   /api/nodes                   → createNode
 *   GET    /api/nodes/:id               → getNode
 *   DELETE /api/nodes/:id               → deleteForever (eliminação permanente)
 *   PATCH  /api/nodes/:id/trash         → moveToTrash
 *   PATCH  /api/nodes/:id/restore       → restore
 *   PATCH  /api/nodes/:id/rename        → rename
 *   PATCH  /api/nodes/:id/move          → move
 */
export const nodeService = {
  /**
   * GET /api/nodes?parentId=...
   * Lista o conteúdo de um diretório.
   * `parentId = null` → raiz do utilizador.
   */
  listChildren: async (parentId?: string | null): Promise<ApiNode[]> => {
    const query = parentId ? `?parentId=${parentId}` : "";
    const res = await apiFetchServer<ApiEnvelope<ApiNode[]>>(`nodes${query}`);
    return res.data;
  },

  /**
   * GET /api/nodes/:id
   * Obtém detalhes completos de um node, incluindo chunks e provider.
   */
  getNode: async (id: string): Promise<ApiNodeDetail> => {
    const res = await apiFetchServer<ApiEnvelope<ApiNodeDetail>>(`nodes/${id}`);
    return res.data;
  },

  /**
   * POST /api/nodes
   * Cria um ficheiro ou pasta.
   * Para ficheiros fragmentados, incluir o array `chunks` no payload.
   */
  createNode: async (body: CreateNodeInput): Promise<ApiNode> => {
    const res = await apiFetchServer<ApiEnvelope<ApiNode>>("nodes", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return res.data;
  },

  /**
   * PATCH /api/nodes/:id/trash
   * Move o node para a reciclagem (soft delete — define `trashedAt`).
   */
  moveToTrash: async (id: string): Promise<ApiNode> => {
    const res = await apiFetchServer<ApiEnvelope<ApiNode>>(
      `nodes/${id}/trash`,
      {
        method: "PATCH",
      },
    );
    return res.data;
  },

  /**
   * PATCH /api/nodes/:id/restore
   * Restaura o node da reciclagem (limpa `trashedAt`).
   */
  restore: async (id: string): Promise<ApiNode> => {
    const res = await apiFetchServer<ApiEnvelope<ApiNode>>(
      `nodes/${id}/restore`,
      {
        method: "PATCH",
      },
    );
    return res.data;
  },

  /**
   * PATCH /api/nodes/:id/rename
   * Renomeia um ficheiro ou pasta.
   */
  rename: async (id: string, name: string): Promise<ApiNode> => {
    const res = await apiFetchServer<ApiEnvelope<ApiNode>>(
      `nodes/${id}/rename`,
      {
        method: "PATCH",
        body: JSON.stringify({ name }),
      },
    );
    return res.data;
  },

  /**
   * PATCH /api/nodes/:id/move
   * Move um ficheiro/pasta para outro diretório.
   * `parentId = null` → move para a raiz.
   */
  move: async (id: string, parentId: string | null): Promise<ApiNode> => {
    const res = await apiFetchServer<ApiEnvelope<ApiNode>>(`nodes/${id}/move`, {
      method: "PATCH",
      body: JSON.stringify({ parentId }),
    });
    return res.data;
  },

  /**
   * DELETE /api/nodes/:id
   * Elimina o node permanentemente (sem possibilidade de recuperação).
   */
  deleteForever: async (id: string): Promise<ApiNode> => {
    const res = await apiFetchServer<ApiEnvelope<ApiNode>>(`nodes/${id}`, {
      method: "DELETE",
    });
    return res.data;
  },
};
