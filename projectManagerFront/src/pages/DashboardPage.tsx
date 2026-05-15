import { CardDashboard } from "@/components/CardDasboard";
import { ChartBarDefault } from "@/components/Charts/BarChart";
import { ChartLineMultiple } from "@/components/Charts/LineChart";
import TitleCard from "../components/public/TitleCard";

function DashboardPage() {
  return (
    <div className="space-y-6">
      <TitleCard title="Dashboard" />
      <div className="mx-4">
        <div className="grid grid-cols-3 gap-4 w-full items-start">
          <CardDashboard
            title="Proyectos"
            description="Cantidad total de proyectos"
            count={12}
          />
          <CardDashboard
            title="Usuarios"
            description="Usuarios activos en el sistema"
            count={48}
          />
          <CardDashboard
            title="Tareas"
            description="Tareas pendientes"
            count={27}
          />
        </div>
      </div>
      <div className="mx-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ChartLineMultiple />
          <ChartBarDefault />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
