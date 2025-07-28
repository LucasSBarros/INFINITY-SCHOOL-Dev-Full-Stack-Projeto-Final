import { z } from "zod";

export const authSchema = z.object({
  email: z.email("E-mail inválido!"),
  password: z.string().min(1, "A senha é obrigatória!"),
});
