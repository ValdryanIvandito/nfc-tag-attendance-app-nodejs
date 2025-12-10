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
      const { attendance_id, uid } = req.query;

      // === GET BY ID ===
      if (attendance_id) {
        const id = Number(attendance_id);

        if (isNaN(id)) {
          return response(res, 400, "attendance_id must be a number");
        }

        const attendance = await AttendanceService.getAttendanceById(
          attendance_id
        );

        if (!attendance) {
          return response(res, 404, "Attendance not found");
        }

        return response(res, 200, "Success", attendance);
      }

      // === GET BY UID ===
      if (uid) {
        const attendance = await AttendanceService.getAttendanceByDateNow(uid);

        if (!attendance) {
          return response(res, 404, "Attendance not found");
        }

        return response(res, 200, "Success", attendance);
      }

      // === GET ALL ===
      const Attendances = await AttendanceService.getAllAttendances();

      return response(res, 200, "Success", Attendances);
    } catch (error) {
      next(error);
    }
  }
}

export default AttendanceController;
