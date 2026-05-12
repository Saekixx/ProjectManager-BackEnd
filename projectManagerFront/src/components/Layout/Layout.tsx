import { Outlet } from "react-router-dom";

import { SidebarProvider } from "../ui/sidebar";
import SideBar from "../SideBar";

const sideBarItems = [
  { name: "Dashboard", url: "/", icon: "🏠" },
  { name: "Proyectos", url: "/proyectos", icon: "📁" },
  { name: "Usuarios", url: "/usuarios", icon: "👥" },
];

function Layout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <SideBar items={sideBarItems} />
        <div className="flex-1 flex flex-col">
          <header className="border-b">
            <div className="flex items-center justify-between p-4">
              <h1 className="text-xl font-bold">My App</h1>
            </div>
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Layout;
