import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "express-async-errors";

import { publicRouter, privateRouter } from "./routes/Router.mjs";
import fallbackMiddleware from "./middlewares/fallbackMiddleware.mjs";

import "./routes/AuthRoutes.mjs";
import "./routes/UserRoutes.mjs";
import "./routes/ResourceRoutes.mjs";
import "./routes/AreaRoutes.mjs";
import "./routes/AccessLogRoutes.mjs";

const PORT = process.env.PORT || 3000;

const server = express();

server.use(helmet());
server.use(morgan("combined"));
server.use(cors());
server.use(express.json());

server.use(publicRouter);
server.use(privateRouter);

server.use(fallbackMiddleware);

server.use("*", (req, res) => {
  res.status(404).send({ message: "Route not found" });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
