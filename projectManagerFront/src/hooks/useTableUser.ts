import { getAllUsers, createUser, updateUser } from "@/service/User/UserService";
import type { UserRequest, User } from "@/types/user";
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

  const handleCreateUser = async (userData: UserRequest) => {
    try {
      const message = await createUser(userData);
      alert(message);
      // Actualizamos la lista de usuario
      const response = await getAllUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleEditUser = async (id: number, userData: UserRequest) => {
    try {
      const message = await updateUser(id, userData);
      alert(message);
      const response = await getAllUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return { users, handleCreateUser, handleEditUser };
}
