import type { Proyecto, ProyectoRequest } from "@/types/proyect";
import { getConfig, postConfig } from "../fetchConfig";
import type { ApiResponse } from "@/types/apiResponse";

export async function getAllProyectos(): Promise<Proyecto[]> {
  const response = await getConfig<ApiResponse<Proyecto[]>>("projects");
  return response.data;
}

export async function createProject(data: ProyectoRequest): Promise<string> {
  const response = await postConfig<ApiResponse<string>, ProyectoRequest>(
    "projects/create",
    data,
  );
  return response.message;
}
