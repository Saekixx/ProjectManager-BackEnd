import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CommandInput } from "cmdk";

interface User {
  id: number;
  name: string;
}

interface MultiSelectProps {
  usuarios: User[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
}

export function MultiSelectUsuarios({
  usuarios,
  selectedIds,
  onChange,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const selectedUsers = usuarios.filter((u) => selectedIds.includes(u.id));
  const availableUsers = usuarios.filter((u) => !selectedIds.includes(u.id));

  const handleUnselect = (id: number) => {
    onChange(selectedIds.filter((s) => s !== id));
  };

  return (
    <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <div className="flex flex-wrap gap-1">
        {selectedUsers.map((user) => (
          <Badge
            key={user.id}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {user.name}
            <button
              type="button"
              className="ml-1 rounded-full outline-none p-0.5 hover:bg-muted cursor-pointer"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleUnselect(user.id);
              }}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-red-500" />
            </button>
          </Badge>
        ))}

        <Command className="overflow-visible bg-transparent">
          <CommandInput
            placeholder="Buscar colaboradores..."
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 200)}
          />
          {open && availableUsers.length > 0 && (
            <div className="relative mt-2">
              <div className="absolute top-0 z-10 w-full rounded-md border bg-popover shadow-md outline-none animate-in">
                <CommandList>
                  <CommandGroup className="max-h-48 overflow-auto p-1">
                    {availableUsers.map((user) => (
                      <CommandItem
                        key={user.id}
                        onSelect={() => {
                          onChange([...selectedIds, user.id]);
                        }}
                        className="cursor-pointer"
                      >
                        {user.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </div>
            </div>
          )}
        </Command>
      </div>
    </div>
  );
}
