import { apiFetch } from "@/api/core/api-fetch";
import type {
  ApiDriver,
  DriverSummary,
  ConnectDriverInput,
  UpdateDriverInput,
  DriverCredentials,
} from "./types";
import { driverMapper } from "./driver.mapper";
import { ApiEnvelope } from "../core/api.types";

export const driverService = {
  // GET /api/drivers (Traz a lista formatada em GB)
  getDrivers: async (): Promise<ApiDriver[]> => {
    const res = await apiFetch<ApiEnvelope<ApiDriver[]>>("drivers");
    return res.data.map(driverMapper.toApiDriver);
  },

  // GET /api/drivers/:id (Traz os detalhes de um driver específico)
  getDriverById: async (id: string): Promise<ApiDriver> => {
    const res = await apiFetch<ApiEnvelope<ApiDriver>>(`drivers/${id}`);
    return driverMapper.toApiDriver(res.data);
  },

  // GET /api/drivers/summary (Traz os KPIs agregados da DB)
  getSummary: async (): Promise<DriverSummary> => {
    const res = await apiFetch<ApiEnvelope<DriverSummary>>("drivers/summary");
    return res.data;
  },

  // GET /api/drivers/:id/credentials (Traz as credenciais de um driver específico)
  getCredentials: async (id: string): Promise<DriverCredentials> => {
    const res = await apiFetch<ApiEnvelope<DriverCredentials>>(`drivers/${id}/credentials`);
    return res.data;
  },

  // POST /api/drivers (Conecta um novo provedor)
  connectDriver: async (body: ConnectDriverInput): Promise<ApiDriver> => {
    const res = await apiFetch<ApiEnvelope<ApiDriver>>("drivers", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return driverMapper.toApiDriver(res.data);
  },

  // PATCH /api/drivers/:id (Atualiza displayName ou priority)
  updateDriver: async (
    id: string,
    body: UpdateDriverInput,
  ): Promise<ApiDriver> => {
    const res = await apiFetch<ApiEnvelope<ApiDriver>>(`drivers/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    return driverMapper.toApiDriver(res.data);
  },

  // PATCH /api/drivers/:id/sync (Força o refresh de espaço no provedor externo)
  syncDriver: async (id: string): Promise<ApiDriver> => {
    const res = await apiFetch<ApiEnvelope<ApiDriver>>(`drivers/${id}/sync`, {
      method: "PATCH",
    });
    return driverMapper.toApiDriver(res.data);
  },

  // DELETE /api/drivers/:id (Remove o driver do sistema)
  removeDriver: async (id: string): Promise<{ message: string }> => {
    const res = await apiFetch<ApiEnvelope<{ message: string }>>(`drivers/${id}`, {
      method: "DELETE",
    });
    return res.data;
  },
};
