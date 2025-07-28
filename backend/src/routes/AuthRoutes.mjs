import { publicRouter } from "./Router.mjs";
import AuthController from "../controllers/AuthController.mjs";

const controller = new AuthController();

publicRouter.post("/api/login", (req, res) => controller.login(req, res));
