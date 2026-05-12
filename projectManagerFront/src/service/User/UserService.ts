import { getConfig } from "@/service/fetchConfig";
import type { User } from "@/types/user";

type ApiResponse<T> = { data: T };

export async function getAllUsers(): Promise<User[]> {
  const response = await getConfig<ApiResponse<User[]>>("users");
  return response.data;
}
