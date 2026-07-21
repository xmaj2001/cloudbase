import { apiFetch } from "@/api/core/api-fetch";
import { nodeMapper } from "./node.mapper";
import type { ApiNode } from "./types";
import { CreateNodeRequest } from "./node.schema";
import { ApiEnvelope } from "../core/api.types";

export const nodeService = {
  // Lista ficheiros e pastas filtrados opcionalmente por uma pasta pai
  getNodes: async (parentId: string | null = null): Promise<ApiNode[]> => {
    const url = parentId ? `nodes?parentId=${parentId}` : "nodes";
    const res = await apiFetch<ApiEnvelope<ApiNode[]>>(url);
    return res.data.map(nodeMapper.toApiNode);
  },

  // Obtém um único nó envelopado pelo ID
  getNodeById: async (id: string): Promise<ApiNode> => {
    const res = await apiFetch<ApiEnvelope<any>>(`nodes/${id}`);
    return nodeMapper.toApiNode(res.data);
  },

  // Cria um nó e desempacota o payload do data
  createNode: async (body: CreateNodeRequest): Promise<ApiNode> => {
    const res = await apiFetch<ApiEnvelope<any>>("nodes", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return nodeMapper.toApiNode(res.data);
  },

  // Renomeia o nó acedendo ao dado envelopado
  renameNode: async (id: string, name: string): Promise<ApiNode> => {
    const res = await apiFetch<ApiEnvelope<any>>(`nodes/${id}/rename`, {
      method: "PATCH",
      body: JSON.stringify({ name }),
    });
    return nodeMapper.toApiNode(res.data);
  },

  // Move para a reciclagem
  moveNodeToTrash: async (id: string): Promise<ApiNode> => {
    const res = await apiFetch<ApiEnvelope<any>>(`nodes/${id}/trash`, {
      method: "PATCH",
    });
    return nodeMapper.toApiNode(res.data);
  },

  // Restaura da reciclagem
  restoreNodeFromTrash: async (id: string): Promise<ApiNode> => {
    const res = await apiFetch<ApiEnvelope<any>>(`nodes/${id}/restore`, {
      method: "PATCH",
    });
    return nodeMapper.toApiNode(res.data);
  },

  // Move fisicamente um nó de uma pasta para outra
  moveNode: async (
    id: string,
    targetParentId: string | null,
  ): Promise<ApiNode> => {
    const res = await apiFetch<ApiEnvelope<any>>(`nodes/${id}/move`, {
      method: "PATCH",
      body: JSON.stringify({ parentId: targetParentId }),
    });
    return nodeMapper.toApiNode(res.data);
  },

  // Eliminação definitiva (retorna o envelope direto de sucesso ou a resposta do boleano)
  permanentDeleteNode: async (id: string): Promise<{ success: boolean }> => {
    // Como a resposta aqui costuma ser o próprio status de sucesso nativo, mantemos sem o .data
    return apiFetch<{ success: boolean }>(`nodes/${id}`, {
      method: "DELETE",
    });
  },
};