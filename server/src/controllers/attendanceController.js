// src/controllers/AttendanceController.js
import AttendanceService from "../services/attendanceService.js";
import response from "../utils/response.js";

class AttendanceController {
  static async createAttendance(req, res) {
    try {
      const { employee_id } = req.body;

      if (!employee_id) {
        return response(res, 400, "employee_id is required");
      }

      const result = await AttendanceService.createAttendance({
        employee_id,
      });

      return response(res, 201, "Attendance created successfully", result);
    } catch (error) {
      console.error(error);
      return response(res, 500, error);
    }
  }

  static async updateAttendance(req, res) {
    try {
      const { attendance_id } = req.body;

      if (!attendance_id) {
        return response(res, 400, "attendance_id is required");
      }

      const result = await AttendanceService.updateAttendance(attendance_id);

      return response(res, 200, "Attendance updated successfully", result);
    } catch (error) {
      console.error("Update attendance error:", error);
      return response(res, 500, "Internal server error");
    }
  }

  static async getAttendance(req, res) {
    try {
      const { attendance_id, uid } = req.query;

      // === GET BY ID ===
      if (attendance_id) {
        const id = Number(attendance_id);

        if (isNaN(id)) {
          return response(res, 400, "Attendance_id must be a number");
        }

        const Attendance = await AttendanceService.getAttendanceById(
          attendance_id
        );

        if (!Attendance) {
          return response(res, 404, "Attendance not found");
        }

        return response(res, 200, "Success", Attendance);
      }

      // === GET ALL ===
      const Attendances = await AttendanceService.getAllAttendances();

      return response(res, 200, "Success", Attendances);
    } catch (error) {
      console.error("getAttendance error:", error);
      return response(res, 500, error);
    }
  }
}

export default AttendanceController;
