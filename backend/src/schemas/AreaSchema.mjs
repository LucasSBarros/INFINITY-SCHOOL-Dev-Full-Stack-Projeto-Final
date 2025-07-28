import { z } from "zod";

export const areaSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "O nome da área é obrigatório!"),
  description: z.string().optional(),
  accessLevel: z
    .number()
    .int()
    .min(1, "O nível de acesso deve ser no mínimo 1"),
});
