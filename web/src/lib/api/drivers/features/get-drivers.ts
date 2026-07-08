import { apiFetch } from "../../apiFetch";
import { mapBackendDriverToApiDriver } from "../driver.mapper";
import { ApiDriver } from "../types";

export interface getDriversRequest {
    userId: string;
}

export async function getDrivers(request: getDriversRequest): Promise<ApiDriver[]> {
    const { userId } = request;
    
    // Fazemos o fetch tipado temporariamente como 'any' para receber o JSON puro do back
    const response = await apiFetch<any>(`/drivers?userId=${userId}`);
    
    // Desembrulha caso o teu apiFetch ainda não remova o envelope { success, data }
    const rawDrivers = Array.isArray(response) ? response : response?.data ?? [];
    
    // Arruma a lista toda de drivers
    return rawDrivers.map(mapBackendDriverToApiDriver);
}

export const getDriverById = async (id: string): Promise<ApiDriver> => {
    const response = await apiFetch<any>(`/drivers/${id}`);
    
    const rawDriver = response?.id ? response : response?.data;
    
    // Retorna o driver individual perfeitamente estruturado
    return mapBackendDriverToApiDriver(rawDriver);
};

export const getDriverCredentials = async (id: string): Promise<any> => {
    const response = await apiFetch<any>(`/drivers/${id}/credentials`);
    
    const rawCredentials = response;
    return rawCredentials;
}