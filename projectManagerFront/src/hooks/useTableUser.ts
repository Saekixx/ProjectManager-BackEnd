import { getAllUsers } from "@/service/User/UserService";
import type { User } from "@/types/user";
import { useEffect, useState } from "react";

export function useTableUser() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const response = await getAllUsers();
        setUsers(response);
      };
      fetchUsers();
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  return { users };
}
