/* src/routes/router.ts */

import express from "express";

import AttendanceController from "../controllers/attendanceController.js";
import EmployeeController from "../controllers/employeeController.js";
import DashboardController from "../controllers/dashboardController.js";

const router = express.Router();

// Attendance
router.get("/v1/attendance", AttendanceController.getAttendance);
router.post("/v1/attendance", AttendanceController.createAttendance);
router.patch("/v1/attendance", AttendanceController.updateAttendance);

// Employee
router.get("/v1/employee", EmployeeController.getEmployee);
router.post("/v1/employee", EmployeeController.createEmployee);
router.patch("/v1/employee", EmployeeController.updateEmployee);
router.delete("/v1/employee", EmployeeController.deleteEmployee);

// Dashboard
router.get("/v1/dashboard", DashboardController.getDashboard);

export default router;
