import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DRIVER_QUERY_KEYS } from "../cache.keys";
import { driverService } from "../driver.service";
import type { ConnectDriverInput, UpdateDriverInput } from "../types";

// ── QUERIES (Consultas de Dados) ─────────────────────────────────────

export const useDrivers = () => {
  return useQuery({
    queryKey: DRIVER_QUERY_KEYS.lists(),
    queryFn: driverService.getDrivers,
  });
};

export const useDriver = (id: string) => {
  return useQuery({
    queryKey: DRIVER_QUERY_KEYS.detail(id),
    queryFn: () => driverService.getDriverById(id),
    enabled: !!id, // Só dispara a query se o ID existir
  });
};

export const useDriverCredentials = (id: string) => {
  return useQuery({
    queryKey: [...DRIVER_QUERY_KEYS.detail(id), "credentials"] as const,
    queryFn: () => driverService.getCredentials(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // As credenciais expiram menos vezes, mantemos em cache por 5 min
  });
};

export const useDriversSummary = () => {
  return useQuery({
    queryKey: DRIVER_QUERY_KEYS.summary(),
    queryFn: driverService.getSummary,
  });
};

// ── MUTATIONS (Ações e Modificações) ──────────────────────────────────

export const useDriverMutations = () => {
  const queryClient = useQueryClient();

  // Função utilitária para invalidar todas as queries do domínio "drivers"
  // Garante que a UI atualiza os KPIs e a tabela ao mesmo tempo
  const invalidateDriverCache = () => {
    void queryClient.invalidateQueries({ queryKey: DRIVER_QUERY_KEYS.all });
  };

  const connect = useMutation({
    mutationFn: (data: ConnectDriverInput) => driverService.connectDriver(data),
    onSuccess: () => invalidateDriverCache(),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDriverInput }) =>
      driverService.updateDriver(id, data),
    onSuccess: (updatedDriver) => {
      invalidateDriverCache();
      // Otimização: atualiza logo o cache individual do detalhe, se existir
      queryClient.setQueryData(
        DRIVER_QUERY_KEYS.detail(updatedDriver.id),
        updatedDriver,
      );
    },
  });

  const sync = useMutation({
    mutationFn: (id: string) => driverService.syncDriver(id),
    onSuccess: (updatedDriver) => {
      invalidateDriverCache();
      queryClient.setQueryData(
        DRIVER_QUERY_KEYS.detail(updatedDriver.id),
        updatedDriver,
      );
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => driverService.removeDriver(id),
    onSuccess: () => invalidateDriverCache(),
  });

  return { connect, update, sync, remove };
};
