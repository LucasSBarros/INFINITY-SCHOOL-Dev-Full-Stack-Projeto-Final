import { userSchema } from "../schemas/UserSchema.mjs";
import UserService from "../services/UserService.mjs";
import AppError from "../exceptions/AppError.mjs";

export default class UserController {
  async create(req, res) {
    const data = userSchema.parse(req.body);
    const user = await UserService.create(data);
    res.status(201).send(user);
  }

  async list(req, res) {
    const users = await UserService.list();
    res.send(users);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const user = await UserService.findById(id);
    res.send(user);
  }

  async update(req, res) {
    const { id } = req.params;
    const data = userSchema.parse(req.body);
    const updated = await UserService.update(id, data);
    res.send(updated);
  }

  async delete(req, res) {
    const { id } = req.params;
    await UserService.remove(id);
    res.send({ message: "User deleted" });
  }
}
