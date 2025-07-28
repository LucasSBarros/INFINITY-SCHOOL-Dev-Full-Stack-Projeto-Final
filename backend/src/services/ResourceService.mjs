import prisma from "../utils/prismaClient.mjs";
import AppError from "../exceptions/AppError.mjs";

export default class ResourceService {
  static async create(data) {
    return prisma.resource.create({ data });
  }

  static async list() {
    return prisma.resource.findMany();
  }

  static async findById(id) {
    const resource = await prisma.resource.findUnique({ where: { id } });
    if (!resource) throw new AppError("Resource not found", 404);
    return resource;
  }

  static async update(id, data) {
    await this.findById(id);
    return prisma.resource.update({ where: { id }, data });
  }

  static async remove(id) {
    await prisma.resource.delete({ where: { id } });
  }
}
