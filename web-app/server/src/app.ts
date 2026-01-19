/** src/app.ts */

import express, { Application } from "express";
import cors from "cors";

import apiKey from "./middlewares/apiKey.js";
import errorHandler from "./middlewares/errorHandler.js";

import router from "./routes/router.js";
import proxyRouter from "./routes/proxyRouter.js";
import eventStreamRouter from "./routes/eventStreamRouter.js";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/events", eventStreamRouter);
app.use("/proxy", proxyRouter);

// Protected routes
app.use("/", apiKey, router);

app.use(errorHandler);

export default app;
