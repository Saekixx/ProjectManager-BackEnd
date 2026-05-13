import { TableReusable } from "@/components/Table";
import TitleCard from "@/components/public/TitleCard";
import ModalCreateUser from "@/components/User/ModalCreateUser";
import { Button } from "@/components/ui/button";
import { useTableUser } from "@/hooks/useTableUser";
import type { User } from "@/types/user";

export default function UsuariosPage() {
  const { users, handleCreateUser, handleEditUser } = useTableUser();

  const columns = [
    { key: "fullname", label: "Nombre Completo" },
    { key: "email", label: "Email" },
    { key: "rolId", label: "Rol", render: (row: User) => row.rol.name },
    {
      key: "acciones",
      label: "Acciones",
      render: (row: User) => (
        <>
          <ModalCreateUser
            onSubmitAction={(user) => handleEditUser(row.id, user)}
            user={row}
          />
          <Button
            variant="destructive"
            className="ml-2"
            onClick={() => alert("Eliminando Usuario: " + row)}
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <TitleCard title="Usuarios" />
      <div className="m-4">Mostrando los Usuarios del sistema</div>
      <div className="flex justify-end mx-4">
        <ModalCreateUser onSubmitAction={handleCreateUser} />
      </div>
      <div className="mx-4">
        <TableReusable<User> columns={columns} data={users} />
      </div>
    </div>
  );
}
