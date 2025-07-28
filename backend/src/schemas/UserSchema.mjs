import { z } from "zod";

export const userSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1, "O nome é obrigatório!"),
  email: z.email("E-mail inválido!"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres!"),
  role: z.enum(["employee", "manager", "admin"]),
  isActive: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
