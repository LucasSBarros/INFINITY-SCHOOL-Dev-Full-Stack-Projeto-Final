import { z } from "zod";

export const accessLogSchema = z.object({
  id: z.uuid().optional(),
  timestamp: z.date().optional(),
  status: z.enum(["autorizado", "negado"]),
  deniedReason: z.string().optional(),

  userId: z.uuid({ message: "ID de usuário inválido!" }),
  areaId: z.uuid({ message: "ID da área inválido!" }),
});
