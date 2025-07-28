import UserService from "./UserService.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../utils/env.mjs";
import AuthenticationError from "../exceptions/AuthenticationError.mjs";

export default class AuthService {
  static async authenticate({ email, password }) {
    const user = await UserService.findByEmail(email);
    if (!user) throw new AuthenticationError("User not found", 404);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new AuthenticationError("Invalid credentials", 401);

    delete user.password;
    const token = jwt.sign(user, env.JWT_SECRET);
    return token;
  }
}
