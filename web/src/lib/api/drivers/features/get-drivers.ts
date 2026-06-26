import { apiFetch } from "../../apiFetch";
import { ApiDriver } from "../types";

interface getDriversRequest {
    userId: string;
}

export async function getDrivers(request: getDriversRequest): Promise<ApiDriver[]> {
    const { userId } = request;
    const response = await apiFetch<ApiDriver[]>(`/drivers?userId=${userId}`);
    return response;
}


export const getDriverById = async (id: string) => {
    const response = await apiFetch<ApiDriver>(`/drivers/${id}`);
    return response;
}