import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarSeparator,
} from "../components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";

export type SideBarItem = {
  name: string;
  url: string;
  icon: React.ReactNode;
};

type SideBarProps = {
  items: SideBarItem[];
};

const SideBar: React.FC<SideBarProps> = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sidebar className="min-h-screen border-r bg-white dark:bg-background flex flex-col w-64">
      <SidebarHeader className="flex flex-col items-center py-6">
        <img
          src="/favicon.svg"
          alt="ProjectManager Logo"
          className="w-12 h-12 mb-2"
        />
        <span className="font-bold text-lg tracking-tight">ProjectManager</span>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="flex-1 flex flex-col">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                isActive={location?.pathname === item.url}
                onClick={() => navigate?.(item.url)}
                tooltip={item.name}
              >
                {item.icon}
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default SideBar;
