import { getConfig, postConfig, putConfig } from "@/service/fetchConfig";
import type { ApiResponse } from "@/types/apiResponse";
import type { User, UserRequest } from "@/types/user";

export async function getAllUsers(): Promise<User[]> {
  const response = await getConfig<ApiResponse<User[]>>("users");
  return response.data;
}

export async function createUser(data: UserRequest): Promise<string> {
  const response = await postConfig<ApiResponse<string>, UserRequest>(
    "users/create",
    data,
  );
  return response.status === 201
    ? "Usuario creado exitosamente"
    : "Error al crear el usuario";
}

export async function updateUser(
  id: number,
  data: UserRequest,
): Promise<string> {
  const response = await putConfig<ApiResponse<string>, UserRequest>(
    `users/edit/${id}`,
    data,
  );
  return response.status === 200
    ? "Usuario actualizado exitosamente"
    : "Error al actualizar el usuario";
}
