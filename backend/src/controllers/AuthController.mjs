import { authSchema } from "../schemas/AuthSchema.mjs";
import AuthService from "../services/AuthService.mjs";

export default class AuthController {
  async login(req, res) {
    const data = authSchema.parse(req.body);
    const token = await AuthService.authenticate(data);
    res.send({ token });
  }
}
