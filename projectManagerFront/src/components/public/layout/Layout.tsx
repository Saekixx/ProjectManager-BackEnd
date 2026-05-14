import { Outlet } from "react-router-dom";

import { SidebarProvider } from "../../ui/sidebar";
import SideBar from "../../SideBar";
import Header from "../Header";

const sideBarItems = [
  { name: "Dashboard", url: "/dashboard", icon: "🏠" },
  { name: "Proyectos", url: "/proyectos", icon: "📁" },
  { name: "Usuarios", url: "/usuarios", icon: "👥" },
];

function Layout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <SideBar items={sideBarItems} />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Layout;
