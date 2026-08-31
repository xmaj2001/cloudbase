import type { ApiEnvelope } from "@/api/core/api.types";
import type {
  ApiProvider,
  ProviderCredentials,
  CreateProviderInput,
  SupportedProvider,
} from "./types";
import { apiFetchServer } from "../core/api-fetch.server";
import { apiFetch } from "@/lib/api/client";

/**
 * Serviço da feature providers.
 * Todas as chamadas passam pelo BFF do Next.js (/api/providers/*).
 *
 * IMPORTANTE: A listagem (getProviders / getProviderById) NUNCA devolve `credentials`.
 * As credenciais só chegam via getCredentials() que bate em /api/providers/:id/credentials.
 */
export const providerService = {
  // GET /api/providers/supported → Tipos de provedores suportados
  getSupportedProviders: async (): Promise<SupportedProvider[]> => {
    const res = await apiFetchServer<ApiEnvelope<SupportedProvider[]>>(
      "providers/supported",
    );
    return res.data;
  },

  // GET /api/providers → Lista todos os providers do utilizador (sem credentials)
  getProviders: async (): Promise<ApiProvider[]> => {
    const res = await apiFetchServer<ApiEnvelope<ApiProvider[]>>("providers");
    return res.data;
  },

   getProvidersClient: async (): Promise<ApiProvider[]> => {
    const res = await apiFetch<ApiEnvelope<ApiProvider[]>>("providers");
    return res.data;
  },
  // GET /api/providers/:id → Detalhes de um provider específico
  getProviderById: async (id: string): Promise<ApiProvider> => {
    const res = await apiFetchServer<ApiEnvelope<ApiProvider>>(`providers/${id}`);
    return res.data;
  },

  // POST /api/providers → Cria/Conecta um novo provider
  createProvider: async (body: CreateProviderInput): Promise<ApiProvider> => {
    const res = await apiFetch<ApiEnvelope<ApiProvider>>("providers", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return res.data;
  },

  // GET /api/providers/:id/credentials → Credenciais de um provider específico
  // Só deve ser chamado quando o utilizador explicitamente solicita as credenciais.
  getCredentials: async (id: string): Promise<ProviderCredentials> => {
    const res = await apiFetch<ApiEnvelope<ProviderCredentials>>(
      `providers/${id}/credentials`,
    );
    return res.data;
  },
};
