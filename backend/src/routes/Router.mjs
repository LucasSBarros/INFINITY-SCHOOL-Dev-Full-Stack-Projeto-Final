import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.mjs";

const publicRouter = Router();
const privateRouter = Router();

privateRouter.use(authMiddleware);

export { publicRouter, privateRouter };
