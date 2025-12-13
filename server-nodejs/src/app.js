// src/app.js
import express from "express";
import cors from "cors";
import apiKey from "./middlewares/apiKey.js";
import router from "./routes/router.js";
import proxyRouter from "./routes/proxyRouter.js";
import eventStreamRouter from "./routes/eventStreamRouter.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/events", eventStreamRouter);
app.use("/proxy", proxyRouter);
// app.use(apiKey);
app.use("/",apiKey, router);
app.use(errorHandler);

export default app;
