import { privateRouter } from "./Router.mjs";
import AreaController from "../controllers/AreaController.mjs";

const controller = new AreaController();

privateRouter.get("/api/areas", (req, res) => controller.list(req, res));
privateRouter.get("/api/areas/:id", (req, res) => controller.getOne(req, res));
privateRouter.post("/api/areas", (req, res) => controller.create(req, res));
privateRouter.put("/api/areas/:id", (req, res) => controller.update(req, res));
privateRouter.delete("/api/areas/:id", (req, res) =>
  controller.delete(req, res)
);
