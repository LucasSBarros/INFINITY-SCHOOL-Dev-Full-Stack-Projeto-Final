import prisma from "../utils/prismaClient.mjs";
import AppError from "../exceptions/AppError.mjs";

export default class AreaService {
  static async create(data) {
    return prisma.area.create({ data });
  }

  static async list() {
    return prisma.area.findMany();
  }

  static async findById(id) {
    const area = await prisma.area.findUnique({ where: { id } });
    if (!area) throw new AppError("Area not found", 404);
    return area;
  }

  static async update(id, data) {
    await this.findById(id);
    return prisma.area.update({ where: { id }, data });
  }

  static async remove(id) {
    await prisma.area.delete({ where: { id } });
  }
}
