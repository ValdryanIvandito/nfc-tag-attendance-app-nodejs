// src/controllers/AttendanceController.js
import AttendanceService from "../services/attendanceService.js";
import response from "../utils/response.js";

class AttendanceController {
  static async createAttendance(req, res, next) {
    try {
      const { uid } = req.body;

      if (!uid) {
        return response(res, 400, "uid is required");
      }

      const result = await AttendanceService.createAttendance({
        uid,
      });

      return response(res, 201, "Attendance created successfully", result);
    } catch (error) {
      next(error);
    }
  }

  static async updateAttendance(req, res, next) {
    try {
      const { attendance_id } = req.body;

      if (!attendance_id) {
        return response(res, 400, "attendance_id is required");
      }

      const result = await AttendanceService.updateAttendance(attendance_id);

      return response(res, 200, "Attendance updated successfully", result);
    } catch (error) {
      next(error);
    }
  }

  static async getAttendance(req, res, next) {
    try {
      const {
        uid,
        datetime,
        timezone,

        page = 1,
        limit = 10,
        search = "",
        department = "",
        date = "",
      } = req.query;

      // === GET TODAY ATTENDANCE ===
      if (uid && datetime && timezone) {
        const attendance = await AttendanceService.getAttendanceToday(
          uid,
          datetime,
          timezone
        );

        return response(res, 200, "Success", attendance);
      }

      // === GET ALL (WITH PAGINATION + SEARCH + FILTER) ===
      const result = await AttendanceService.getAllAttendances({
        page: Number(page),
        limit: Number(limit),
        search,
        department,
        date,
        timezone,
      });

      return response(res, 200, "Success", result);
    } catch (error) {
      next(error);
    }
  }
}

export default AttendanceController;
