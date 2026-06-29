import { apiFetch } from "../../apiFetch";
import { ApiDriver } from "../types";

export interface UpdateDriverRequest {
  displayName?: string;
  priority?: number;
}

export async function updateDriver(id: string, userId: string, data: UpdateDriverRequest): Promise<ApiDriver> {
  return await apiFetch<ApiDriver>(`/drivers/${id}?userId=${userId}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
}