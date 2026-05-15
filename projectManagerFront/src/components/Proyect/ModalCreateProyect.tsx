import type { ProyectoRequest, Proyecto } from "@/types/proyect";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@/types/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MultiSelectUsuarios } from "../MultiSelect";

const projectSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre del proyecto debe tener al menos 3 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  leaderId: z.number().int().min(1, "Selecciona un líder para el proyecto"),
  memberIds: z.array(
    z.number().int().min(1, "Selecciona al menos un miembro para el proyecto"),
  ),
});

interface ModalCreateProyectProps {
  project?: Proyecto | null;
  allUsuarios: User[];
  onSubmitAction: (data: ProyectoRequest) => Promise<void>;
}

function ModalCreateProyect({
  project,
  allUsuarios,
  onSubmitAction,
}: ModalCreateProyectProps) {
  const [open, setOpen] = useState(false);
  const isEditing = !!project;
  const form = useForm<ProyectoRequest>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      leaderId: 1,
      memberIds: [],
    },
  });

  const selectedLeaderId = form.watch("leaderId");
  const selectedMemberIds = form.watch("memberIds") || [];

  const posiblesLideres = allUsuarios
    .filter((u) => !selectedMemberIds.includes(u.id))
    .map((u) => ({ id: u.id, name: u.fullname }));

  const posiblesMiembros = allUsuarios
    .filter((u) => u.id !== selectedLeaderId) // Si es el líder, no puede ser miembro
    .map((u) => ({ id: u.id, name: u.fullname }));

  useEffect(() => {
    if (open) {
      if (isEditing && project) {
        form.reset({
          name: project.name,
          description: project.description,
          leaderId: project.leaderId.id,
          memberIds: project.memberIds.map((member) => member.id),
        });
      } else {
        form.reset({
          name: "",
          description: "",
          leaderId: 1,
          memberIds: [],
        });
      }
    }
  }, [open, project, isEditing, form]);

  async function onSubmit(data: ProyectoRequest) {
    try {
      await onSubmitAction(data);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={
            isEditing
              ? "bg-blue-800 hover:bg-blue-950 cursor-pointer"
              : "bg-black hover:bg-gray-600 cursor-pointer"
          }
        >
          {isEditing ? "Editar" : "Crear Proyecto"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Proyecto" : "Crear Proyecto"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifica los datos del proyecto seleccionado"
              : "Llena el formulario para crear un nuevo proyecto"}
          </DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 max-w-md mx-auto p-4"
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del proyecto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Descripción del proyecto"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Líder de Proyecto */}
              <FormField
                control={form.control}
                name="leaderId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Líder de Proyecto</FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(Number(val))}
                      value={field.value ? String(field.value) : ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un líder" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {posiblesLideres.map((user) => (
                          <SelectItem key={user.id} value={String(user.id)}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Miembros del Proyecto */}
              <FormField
                control={form.control}
                name="memberIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colaboradores</FormLabel>
                    <FormControl>
                      <MultiSelectUsuarios
                        usuarios={posiblesMiembros}
                        selectedIds={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {isEditing ? "Guardar Cambios" : "Crear Proyecto"}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ModalCreateProyect;
