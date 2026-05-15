import { useAuth } from "@/hooks/useAuth";
import { DropdownMenuAvatar } from "../DropDownMenuAvatar";
import { SidebarTrigger } from "../ui/sidebar";

function Header() {
  const { handleLogout } = useAuth();
  return (
    <header className="flex h-16 shrink-0 items-center border-b px-3">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
      </div>
      <div className="ml-auto flex items-center">
        <DropdownMenuAvatar onLogout={handleLogout} />
      </div>
    </header>
  );
}

export default Header;
