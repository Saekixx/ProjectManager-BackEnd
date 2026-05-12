import TitleCard from "@/components/public/TitleCard";
import { Button } from "@/components/ui/button";

function UsuariosPage() {
  return (
    <div className="space-y-6">
      <TitleCard title="Usuarios" />
      <div className="m-4">Mostrando los Usuarios del sistema</div>
      <div className="flex justify-end mx-4">
        <Button>Agregar Usuario</Button>
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default UsuariosPage;
