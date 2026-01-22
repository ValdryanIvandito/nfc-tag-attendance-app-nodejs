/** src/routes/eventStreamRouter.ts */

import express from "express";

import EventStreamController from "../controllers/eventStreamController.js";

const router = express.Router();

router.get("/stream", EventStreamController.stream);

export default router;
