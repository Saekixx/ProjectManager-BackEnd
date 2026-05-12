import { getConfig } from "../fetchConfig";

import type { User } from "@/types/user";

export async function getAllUsers(): Promise<User[]> {
  return getConfig<User[]>("users");
}
