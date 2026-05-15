import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import type { User, UserRequest } from "@/types/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const userSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  fullname: z
    .string()
    .min(3, "El nombre completo debe tener al menos 3 caracteres"),
  rolId: z.preprocess(
    (val) => Number(val),
    z.number().int().min(1, "Selecciona un rol para el usuario"),
  ),
});

type UserFormValues = UserRequest;

interface ModalCreateUserProps {
  user?: User | null;
  onSubmitAction: (data: UserFormValues) => Promise<void>;
}

function ModalCreateUser({ user, onSubmitAction }: ModalCreateUserProps) {
  const [open, setOpen] = useState(false);
  const isEditing = !!user;
  const form = useForm<UserFormValues>({
    // @ts-expect-error: El tipo resolver no es compatible con el tipo esperado por useForm
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      fullname: "",
      rolId: 1,
    },
  });

  useEffect(() => {
    if (open) {
      if (isEditing && user) {
        form.reset({
          username: user.username,
          email: user.email,
          fullname: user.fullname,
          rolId: user.role.id,
          password: "",
        });
      } else {
        form.reset({
          username: "",
          email: "",
          password: "",
          fullname: "",
          rolId: 1,
        });
      }
    }
  }, [open, user, isEditing, form]);

  async function onSubmit(data: UserFormValues) {
    try {
      await onSubmitAction(data);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error creating user:", error);
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
          {isEditing ? "Editar" : "Crear Usuario"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Usuario" : "Crear Usuario"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifica los datos del usuario seleccionado"
              : "Llena el formulario para crear un nuevo usuario"}
          </DialogDescription>
          <Form {...form}>
            <form
              // @ts-expect-error: Handlesubmit
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 max-w-md mx-auto p-4"
            >
              {/* Username */}
              <FormField
                // @ts-expect-error: El tipo de control no es compatible con el tipo esperado por FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre de usuario" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Fullname */}
              <FormField
                // @ts-expect-error: El tipo de control no es compatible con el tipo esperado por FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese su nombre completo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                // @ts-expect-error: El tipo de control no es compatible con el tipo esperado por FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Ingrese su correo electrónico"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                // @ts-expect-error: El tipo de control no es compatible con el tipo esperado por FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rol (Select) */}
              <FormField
                // @ts-expect-error: El tipo de control no es compatible con el tipo esperado por FormField
                control={form.control}
                name="rolId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Rol</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={
                        typeof field.value === "number"
                          ? field.value.toString()
                          : "1"
                      }
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona un rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Administrador</SelectItem>
                        <SelectItem value="2">Colaborador</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Registrar Usuario
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ModalCreateUser;
