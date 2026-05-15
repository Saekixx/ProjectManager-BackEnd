import ModalCreateProyect from "@/components/Proyect/ModalCreateProyect";
import TitleCard from "@/components/public/TitleCard";
import { TableReusable } from "@/components/Table";
import { Button } from "@/components/ui/button";
import { useTableProject } from "@/hooks/useTableProject";
import type { Proyecto } from "@/types/proyect";

function ProyectosPage() {
  const { projects, users, handleCreateProject, handleUpdateProject } =
    useTableProject();

  const columns = [
    { key: "name", label: "Nombre" },
    { key: "description", label: "Descripción" },
    {
      key: "leader",
      label: "Líder",
      render: (row: Proyecto) => row.leaderId.fullname,
    },
    {
      key: "memberIds",
      label: "Miembros",
      render: (row: Proyecto) => row.memberIds.length,
    },
    {
      key: "acciones",
      label: "Acciones",
      render: (row: Proyecto) => (
        <>
          <ModalCreateProyect
            allUsuarios={users}
            onSubmitAction={(user) => handleUpdateProject(row.id, user)}
            project={row}
          />
          <Button
            variant="destructive"
            className="ml-2"
            onClick={() => alert("Eliminando Proyecto: " + row)}
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];
  return (
    <div className="space-y-6">
      <TitleCard title="Proyectos" />
      <div className="m-4">Mostrando los Proyectos del sistema</div>
      <div className="flex justify-end mx-4">
        <ModalCreateProyect
          allUsuarios={users}
          onSubmitAction={handleCreateProject}
        />
      </div>
      <div className="mx-4">
        <TableReusable<Proyecto> columns={columns} data={projects} />
      </div>
    </div>
  );
}

export default ProyectosPage;
