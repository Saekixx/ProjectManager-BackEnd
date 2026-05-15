import { useState, useEffect } from "react";
import type { Proyecto, ProyectoRequest } from "@/types/proyect";
import {
  createProject,
  getAllProyectos,
} from "@/service/Proyect/ProyectService";
import type { User } from "@/types/user";
import { getAllUsers } from "@/service/User/UserService";

export function useTableProject() {
  const [projects, setProjects] = useState<Proyecto[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    try {
      const fetchProjects = async () => {
        const response = await getAllProyectos();
        setProjects(response);
      };

      const fetchUsers = async () => {
        const response = await getAllUsers();
        setUsers(response);
      };

      fetchUsers();
      fetchProjects();
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }, []);

  const handleCreateProject = async (data: ProyectoRequest) => {
    try {
      const message = await createProject(data);
      alert(message);
      const response = await getAllProyectos();
      setProjects(response);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return { projects, users, handleCreateProject };
}
