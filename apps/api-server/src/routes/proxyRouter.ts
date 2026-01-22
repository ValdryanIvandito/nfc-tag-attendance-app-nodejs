/* src/routes/proxyRouter.ts */

import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import AttendanceController from "../controllers/attendanceController.js";
import EmployeeController from "../controllers/employeeController.js";
import DashboardController from "../controllers/dashboardController.js";

dotenv.config();

const proxyRouter = express.Router();

/**
 * Allowed Web Origins (Allowlist)
 */
const webOrigins: string[] = process.env.WEB_ORIGINS
  ? process.env.WEB_ORIGINS.split(",").map((o) => o.trim())
  : [];

/**
 * PROXY SECURITY MIDDLEWARE
 * ------------------------------------
 * - Allow only trusted web origins
 * - No API key required for frontend
 * - Block unknown clients
 */
proxyRouter.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin as string | undefined;
  const referer = req.headers.referer as string | undefined;

  /**
   * Fallback strategy:
   * - Prefer Origin header (browser fetch)
   * - Fallback to Referer (some navigations)
   */
  let requestOrigin: string | undefined;

  if (origin) {
    requestOrigin = origin;
  } else if (referer) {
    try {
      requestOrigin = new URL(referer).origin;
    } catch {
      requestOrigin = undefined;
    }
  }

  /**
   * BLOCK if origin is missing or not allowed
   */
  if (!requestOrigin || !webOrigins.includes(requestOrigin)) {
    return res.status(403).json({
      status: 403,
      message: "Not Authorized: Origin not allowed",
    });
  }

  /**
   * CORS HEADERS
   */
  res.setHeader("Access-Control-Allow-Origin", requestOrigin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  /**
   * Handle Preflight
   */
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

/**
 * ==========================
 * API ROUTES
 * ==========================
 */

// Attendance
proxyRouter.get("/v1/attendance", AttendanceController.getAttendance);
proxyRouter.post("/v1/attendance", AttendanceController.createAttendance);
proxyRouter.patch("/v1/attendance", AttendanceController.updateAttendance);

// Employee
proxyRouter.get("/v1/employee", EmployeeController.getEmployee);
proxyRouter.post("/v1/employee", EmployeeController.createEmployee);
proxyRouter.patch("/v1/employee", EmployeeController.updateEmployee);
proxyRouter.delete("/v1/employee", EmployeeController.deleteEmployee);

// Dashboard
proxyRouter.get("/v1/dashboard", DashboardController.getDashboard);

export default proxyRouter;
