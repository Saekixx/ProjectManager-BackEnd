import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ProyectosPage from "./pages/ProyectosPage";
import UsuariosPage from "./pages/UsuariosPage";
import Layout from "@/components/public/layout/Layout";
import { TooltipProvider } from "./components/ui/tooltip";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/proyectos" element={<ProyectosPage />} />
            <Route path="/usuarios" element={<UsuariosPage />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </>
  );
}

export default App;
