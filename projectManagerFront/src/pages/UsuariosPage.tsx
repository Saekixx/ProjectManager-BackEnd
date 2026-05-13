import { TableReusable } from "@/components/Table";
import TitleCard from "@/components/public/TitleCard";
import ModalCreateUser from "@/components/User/ModalCreateUser";
import { Button } from "@/components/ui/button";
import { useTableUser } from "@/hooks/useTableUser";
import type { User } from "@/types/user";
import { useState } from "react";

const columns = [
  { key: "fullname", label: "Nombre Completo" },
  { key: "email", label: "Email" },
  { key: "rolId", label: "Rol", render: (row: User) => row.rol.name },
  {
    key: "acciones",
    label: "Acciones",
    render: () => (
      <>
        <Button className="bg-blue-600 hover:bg-blue-800">Editar</Button>
        <Button variant="destructive" className="ml-2">
          Eliminar
        </Button>
      </>
    ),
  },
];

export default function UsuariosPage() {
  const [selected, setSelected] = useState<number[]>([]);

  const { users, handleCreateUser } = useTableUser();

  return (
    <div className="space-y-6">
      <TitleCard title="Usuarios" />
      <div className="m-4">Mostrando los Usuarios del sistema</div>
      <div className="flex justify-end mx-4">
        <ModalCreateUser onCreate={handleCreateUser} />
      </div>
      <div className="mx-4">
        <TableReusable<User>
          columns={columns}
          data={users}
          selectableRows
          selectedRows={(row) => selected.includes(row.id)}
          onRowSelect={(row, checked) => {
            setSelected((sel) =>
              checked ? [...sel, row.id] : sel.filter((id) => id !== row.id),
            );
          }}
        />
      </div>
    </div>
  );
}
