// src/routes/proxyRouter.js

import express from "express";
import dotenv from "dotenv";

import EmployeeController from "../controllers/employeeController.js";
import AttendanceController from "../controllers/attendanceController.js";

dotenv.config();

const proxyRouter = express.Router();

// ==================== CORS + API KEY ====================

// Ambil origin web frontend dari .env
const webOrigins = process.env.WEB_ORIGINS
  ? process.env.WEB_ORIGINS.split(",").map((origin) => origin.trim())
  : [];

proxyRouter.use((req, res, next) => {
  const origin = req.headers.origin;

  if (webOrigins.includes(origin)) {
    // Frontend web → pakai CORS
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PATCH,DELETE,OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") return res.sendStatus(204);
    return next();
  }

  // Aplikasi lain → cek API key
  const clientKey = req.headers["x-api-key"];
  if (!clientKey)
    return res.status(401).json({ status: 401, message: "Unauthorized" });
  if (clientKey !== process.env.API_KEY)
    return res.status(403).json({ status: 403, message: "Access denied" });

  next();
});

// ==================== EMPLOYEE ====================

proxyRouter.get("/v1/employee", EmployeeController.getEmployee);
proxyRouter.post("/v1/employee", EmployeeController.createEmployee);
proxyRouter.patch("/v1/employee", EmployeeController.updateEmployee);
proxyRouter.delete("/v1/employee", EmployeeController.deleteEmployee);

// ==================== ATTENDANCE ====================

proxyRouter.get("/v1/attendance", AttendanceController.getAttendance);
proxyRouter.post("/v1/attendance", AttendanceController.createAttendance);
proxyRouter.patch("/v1/attendance", AttendanceController.updateAttendance);

export default proxyRouter;
