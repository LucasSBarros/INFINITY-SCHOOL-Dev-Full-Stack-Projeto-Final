import { privateRouter } from "./Router.mjs";
import ResourceController from "../controllers/ResourceController.mjs";

const controller = new ResourceController();

privateRouter.get("/api/resources", (req, res) => controller.list(req, res));
privateRouter.get("/api/resources/:id", (req, res) =>
  controller.getOne(req, res)
);
privateRouter.post("/api/resources", (req, res) => controller.create(req, res));
privateRouter.put("/api/resources/:id", (req, res) =>
  controller.update(req, res)
);
privateRouter.delete("/api/resources/:id", (req, res) =>
  controller.delete(req, res)
);
