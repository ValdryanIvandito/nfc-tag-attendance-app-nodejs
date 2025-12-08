// src/routes/index.js
import express from "express";
import EmployeeController from "../controllers/employeeController.js";
import AttendanceController from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/attendance", AttendanceController.createAttendance);
router.patch("/attendance", AttendanceController.updateAttendance);
router.get("/attendance", AttendanceController.getAttendance)

router.post("/employee", EmployeeController.createEmployee);
router.get("/employee", EmployeeController.getEmployee);

export default router;
