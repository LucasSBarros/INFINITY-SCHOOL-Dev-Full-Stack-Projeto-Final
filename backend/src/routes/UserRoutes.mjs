import { privateRouter, publicRouter } from "./Router.mjs";
import UserController from "../controllers/UserController.mjs";

const controller = new UserController();

privateRouter.get("/api/users", (req, res) => controller.list(req, res));
privateRouter.get("/api/users/:id", (req, res) => controller.getOne(req, res));
publicRouter.post("/api/users", (req, res) => controller.create(req, res));
privateRouter.put("/api/users/:id", (req, res) => controller.update(req, res));
privateRouter.delete("/api/users/:id", (req, res) =>
  controller.delete(req, res)
);
