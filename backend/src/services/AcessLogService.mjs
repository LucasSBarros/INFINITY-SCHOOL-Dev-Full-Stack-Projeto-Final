import prisma from "../utils/prismaClient.mjs";
import AppError from "../exceptions/AppError.mjs";

export default class AccessLogService {
  static async create(data) {
    return prisma.accessLog.create({ data });
  }

  static async list() {
    return prisma.accessLog.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        area: true,
      },
    });
  }

  static async findById(id) {
    const log = await prisma.accessLog.findUnique({ where: { id } });
    if (!log) throw new AppError("Access log not found", 404);
    return log;
  }

  static async remove(id) {
    await prisma.accessLog.delete({ where: { id } });
  }
}
