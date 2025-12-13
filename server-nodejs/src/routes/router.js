// src/routes/router.js
import express from "express";
import EmployeeController from "../controllers/employeeController.js";
import AttendanceController from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/v1/attendance", AttendanceController.getAttendance);
router.post("/v1/attendance", AttendanceController.createAttendance);
router.patch("/v1/attendance", AttendanceController.updateAttendance);

router.get("/v1/employee", EmployeeController.getEmployee);
router.post("/v1/employee", EmployeeController.createEmployee);
router.patch("/v1/employee", EmployeeController.updateEmployee);
router.delete("/v1/employee", EmployeeController.deleteEmployee);

export default router;
