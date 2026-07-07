import { apiFetch } from "../../apiFetch";
import { ApiDriver, DriverCredentials } from "../types";

export interface ConnectDriverRequest {
    type: string;
    displayName: string;
    credentials: Omit<DriverCredentials, "type">; // Exclui o campo 'type' do union, pois já está presente no nível superior
    priority?: number;
}

export async function connectDriver(data: ConnectDriverRequest): Promise<ApiDriver> {
    return await apiFetch<ApiDriver>(`/drivers`, {
        method: "POST",
        body: JSON.stringify(data)
    });
}