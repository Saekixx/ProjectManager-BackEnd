import { TableReusable } from "@/components/Table";
import TitleCard from "@/components/public/TitleCard";
import { Button } from "@/components/ui/button";
import { useTableUser } from "@/hooks/useTableUser";
import type { User } from "@/types/user";
import * as React from "react";

const columns = [
  { key: "fullname", label: "Nombre Completo" },
  { key: "email", label: "Email" },
  { key: "rol", label: "Rol", render: (row: User) => row.rol.name },
  {
    key: "acciones",
    label: "Acciones",
    render: () => (
      <>
        <Button variant="outline">Editar</Button>
        <Button variant="outline" className="ml-2">Eliminar</Button>
      </>
    ),
  },
];

export default function UsuariosPage() {
  const [selected, setSelected] = React.useState<number[]>([]);

  const { users } = useTableUser();

  return (
    <div className="space-y-6">
      <TitleCard title="Usuarios" />
      <div className="m-4">Mostrando los Usuarios del sistema</div>
      <div className="flex justify-end mx-4">
        <Button>Agregar Usuario</Button>
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
