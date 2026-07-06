import { apiFetch } from "../../apiFetch";
import { mapBackendNodeToApiNode } from "../node.mapper";
import { ApiNode, NodeType } from "../types";

// ── INTERFACES PLANAS (IDÊNTICAS AO DTO DO BACKEND) ──────────────────────────

interface CreateNodeRequest {
  userId: string;
  type: NodeType;
  name: string;
  mimeType?: string;
  extension?: string;
  size?: string | number;
  driverId?: string;
  parentId?: string | null;
  tags?: string[];
  status?: string;
  providerFileId?: string;
  providerPath?: string;
}



// ── FUNÇÕES DE CLIENTE ATUALIZADAS ──────────────────────────────────────────

export const createNode = async (
  data: CreateNodeRequest,
): Promise<ApiNode> => {
  // Enviamos o objeto 'data' completo porque ele já é plano e bate 100% com o DTO
  const response = await apiFetch<any>(`/nodes`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const rawNode = response?.id ? response : response?.data;
  return mapBackendNodeToApiNode(rawNode);
};

