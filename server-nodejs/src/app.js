// src/app.js

import express from "express";
import cors from "cors";
import apiKey from "./middlewares/apiKey.js";
import router from "./routes/index.js";
import proxyRouter from "./routes/proxyRouter.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/proxy", proxyRouter);
app.use(apiKey);
app.use("/", router);
app.use(errorHandler);

export default app;
