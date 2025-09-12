import { api } from "./auth/api";
import type { AircraftResponse } from "@/types/aircraft";

export const getAircraft = async (page: number = 1, limit: number = 10): Promise<AircraftResponse> => {
	try {
		const response = await api.get(`/aircraft?page=${page}&limit=${limit}`);
		return response.data;
	} catch (error) {
		console.log("Erro ao buscar aircraft");
		throw new Error("Failed to fetch aircraft data");
	}
};