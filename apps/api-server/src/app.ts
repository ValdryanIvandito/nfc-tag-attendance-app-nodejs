/* src/app.ts */

import express, { Application } from "express";
import cors from "cors";

import apiKey from "./middlewares/apiKey.js";
import errorHandler from "./middlewares/errorHandler.js";
import deviceAuth from "./middlewares/deviceAuth.js";

import router from "./routes/router.js";
import proxyRouter from "./routes/proxyRouter.js";
import eventStreamRouter from "./routes/eventStreamRouter.js";

const app: Application = express();

// Global middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
--------------------------------------------------------------------------
 Router Architecture Overview
--------------------------------------------------------------------------
 This application uses multiple router layers with different purposes:

 1. API Key Protected Router
    Used for securing REST API endpoints with API Key authentication.

 2. Device Auth Router (Terminal)
    Dedicated for Desktop Application (NFC Terminal) communication.
    Desktop App does NOT store API Key for security reasons.
    Authentication is handled using device identity instead.

 3. Proxy Router
    Acts as a communication bridge for allowed client-side requests.
    Useful for request forwarding, filtering, and future scalability.

 4. Event Stream (SSE) Router 
    Used for SSE (Server-Sent Events), a real-time streaming.
    Currently only broadcasts attendance events:
    - attendance:created
    - attendance:updated
*/

// Event Stream (SSE) Router
app.use("/events", eventStreamRouter);

// Proxy router
app.use("/proxy", proxyRouter);

// Device Auth Router (Terminal)
app.use("/terminal", deviceAuth, router);

// API Key Protected Router
app.use("/", apiKey, router);

// Global error handler
app.use(errorHandler);

export default app;
