import { apiFetch } from "../../apiFetch";
import { ApiDriver } from "../types";

export interface UpdateDriverRequest {
  displayName?: string;
  priority?: number;
  status?: "ACTIVE" | "INACTIVE" | string;
}

export async function updateDriver(id: string, data: UpdateDriverRequest): Promise<ApiDriver> {
  return await apiFetch<ApiDriver>(`/drivers/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
}

export async function syncDriver(id: string): Promise<ApiDriver> {
  return await apiFetch<ApiDriver>(`/drivers/${id}/sync`, {
    method: "PATCH"
  });
}