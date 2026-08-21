import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PROVIDER_QUERY_KEYS } from "../cache.keys";
import { providerService } from "../provider.service";
import type { CreateProviderInput } from "../types";

// ── QUERIES (Consultas de Dados) ─────────────────────────────────────────────

/**
 * Lista todos os providers do utilizador autenticado.
 * Não inclui `credentials` — apenas metadados e informação de espaço.
 */
export const useProviders = () => {
  return useQuery({
    queryKey: PROVIDER_QUERY_KEYS.lists(),
    queryFn: providerService.getProviders,
  });
};

/**
 * Lista os tipos de providers suportados pelo CloudBase.
 * Útil para popular dropdowns no formulário de criação.
 */
export const useSupportedProviders = () => {
  return useQuery({
    queryKey: PROVIDER_QUERY_KEYS.supported(),
    queryFn: providerService.getSupportedProviders,
    staleTime: 1000 * 60 * 60, // Tipos suportados raramente mudam, cache por 1h
  });
};

/**
 * Devolve as credenciais de um provider específico.
 * Deve ser usado APENAS quando o utilizador pede explicitamente para ver/editar credenciais.
 * As credenciais são mantidas em cache por 5 minutos.
 */
export const useProviderCredentials = (id: string) => {
  return useQuery({
    queryKey: PROVIDER_QUERY_KEYS.credentials(id),
    queryFn: () => providerService.getCredentials(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // Credenciais em cache por 5 min
  });
};

// ── MUTATIONS (Ações e Modificações) ─────────────────────────────────────────

export const useProviderMutations = () => {
  const queryClient = useQueryClient();

  /** Invalida toda a cache do domínio "providers" (lista + detalhes). */
  const invalidateProviderCache = () => {
    void queryClient.invalidateQueries({ queryKey: PROVIDER_QUERY_KEYS.all });
  };

  /** Cria/Conecta um novo provider de armazenamento. */
  const create = useMutation({
    mutationFn: (data: CreateProviderInput) =>
      providerService.createProvider(data),
    onSuccess: () => invalidateProviderCache(),
  });

  return { create };
};
