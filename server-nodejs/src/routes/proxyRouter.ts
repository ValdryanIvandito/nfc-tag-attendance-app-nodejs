/** src/routes/proxyRouter.ts */

import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import AttendanceController from "../controllers/attendanceController.js";
import EmployeeController from "../controllers/employeeController.js";
import DashboardController from "../controllers/dashboardController.js";

dotenv.config();

const proxyRouter = express.Router();

// WEB ORIGINS
const webOrigins: string[] = process.env.WEB_ORIGINS
  ? process.env.WEB_ORIGINS.split(",").map((o) => o.trim())
  : [];

proxyRouter.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin as string | undefined;

  if (origin && webOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PATCH,DELETE,OPTIONS",
    );
    res.setHeader("Access-Control-Allow-Headers", "*");

    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }

    return next();
  }

  const clientKey = req.headers["x-api-key"] as string | undefined;

  if (!clientKey)
    return res.status(401).json({ status: 401, message: "Unauthorized" });

  if (clientKey !== process.env.API_KEY)
    return res.status(403).json({ status: 403, message: "Access denied" });

  next();
});

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
