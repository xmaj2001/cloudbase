import { driverService } from '@/lib/api/drivers/driver.service';
import { ConnectDriverRequest } from '@/lib/api/drivers/features/connect-driver';
import { UpdateDriverRequest } from '@/lib/api/drivers/features/mutations';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const DRIVER_QUERY_KEYS = {
    all: ['drivers'] as const,
    lists: () => [...DRIVER_QUERY_KEYS.all, 'list'] as const,
    list: (userId: string) => [...DRIVER_QUERY_KEYS.lists(), { userId }] as const,
    details: () => [...DRIVER_QUERY_KEYS.all, 'detail'] as const,
    detail: (id: string) => [...DRIVER_QUERY_KEYS.details(), id] as const,
};

// Hook para listar todos os drivers do utilizador
export const useDrivers = (userId: string) => {
    return useQuery({
        queryKey: DRIVER_QUERY_KEYS.list(userId),
        queryFn: () => driverService.getDrivers({ userId }),
        enabled: !!userId,
    });
};

// Hook para gerir as ações de modificação e conexão
export const useDriverMutations = (userId: string) => {
    const queryClient = useQueryClient();

    const invalidateList = () => {
        queryClient.invalidateQueries({ queryKey: DRIVER_QUERY_KEYS.list(userId) });
    };

    // Ligar/conectar um novo driver
    const connect = useMutation({
        mutationFn: (data: ConnectDriverRequest) =>
            driverService.connectDriver(userId, data),
        onSuccess: () => invalidateList(),
    });

    // Atualizar metadados de um driver existente (Nome ou prioridade)
    const update = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateDriverRequest }) =>
            driverService.updateDriver(id, userId, data),
        onSuccess: (updatedDriver) => {
            invalidateList();
            queryClient.setQueryData(DRIVER_QUERY_KEYS.detail(updatedDriver.id), updatedDriver);
        },
    });

    return { connect, update };
};