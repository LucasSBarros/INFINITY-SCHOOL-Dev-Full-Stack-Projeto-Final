import { z } from "zod";

export const resourceSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1, "O nome do recurso é obrigatório!"),
  type: z.string().min(1, "O tipo do recurso é obrigatório!"),
  description: z.string().optional(),
  status: z.enum(["active", "inactive", "maintenance"]),
  location: z.string().min(1, "A localização é obrigatória!"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
