import { apiFetch } from "../../apiFetch";
import { ApiDriver, DriverCredentials } from "../types";

export interface ConnectDriverRequest {
    type: string;
    displayName: string;
    credentials: DriverCredentials;
    priority?: number;
}

export async function connectDriver(userId: string, data: ConnectDriverRequest): Promise<ApiDriver> {
    return await apiFetch<ApiDriver>(`/drivers?userId=${userId}`, {
        method: "POST",
        body: JSON.stringify(data)
    });
}