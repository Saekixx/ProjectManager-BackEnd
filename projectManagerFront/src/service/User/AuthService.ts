import type { ApiResponse } from "@/types/apiResponse";
import { postConfig } from "../fetchConfig";

export async function login(email: string, password: string) {
  const response = await postConfig<
    ApiResponse<string>,
    { email: string; password: string }
  >("auth/login", { email, password });

  return response;
}
