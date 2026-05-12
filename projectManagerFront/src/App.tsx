import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ProyectosPage from "./pages/ProyectosPage";
import UsuariosPage from "./pages/UsuariosPage";
import Layout from "@/components/public/layout/Layout";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  return (
    <>
      <TooltipProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/proyectos" element={<ProyectosPage />} />
            <Route path="/usuarios" element={<UsuariosPage />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </>
  );
}

export default App;
