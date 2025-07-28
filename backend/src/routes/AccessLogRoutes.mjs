import { privateRouter } from "./Router.mjs";
import AccessLogController from "../controllers/AccessLogController.mjs";

const controller = new AccessLogController();

privateRouter.get("/api/accesslogs", (req, res) => controller.list(req, res));
privateRouter.get("/api/accesslogs/:id", (req, res) =>
  controller.getOne(req, res)
);
privateRouter.post("/api/accesslogs", (req, res) =>
  controller.create(req, res)
);
privateRouter.delete("/api/accesslogs/:id", (req, res) =>
  controller.delete(req, res)
);
