import prisma from "../utils/prismaClient.mjs";
import bcrypt from "bcrypt";
import AppError from "../exceptions/AppError.mjs";

export default class UserService {
  static async create(data) {
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing) throw new AppError("Email already registered", 400);

    const hashed = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: { ...data, password: hashed },
    });

    delete user.password;
    return user;
  }

  static async list() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  static async findById(id) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new AppError("User not found", 404);
    delete user.password;
    return user;
  }

  static async update(id, data) {
    await this.findById(id);
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  static async remove(id) {
    await prisma.user.delete({ where: { id } });
  }

  static async findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  }
}
