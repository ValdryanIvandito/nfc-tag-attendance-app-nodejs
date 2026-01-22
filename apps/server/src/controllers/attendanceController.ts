/** src/controllers/attendanceController.ts */

import { Request, Response, NextFunction } from "express";

import AttendanceModel from "../models/attendanceModel.js";
import response from "../utils/response.js";

class AttendanceController {
  static async createAttendance(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { uid } = req.body;

      if (!uid) {
        return response(res, 400, "uid is required");
      }

      const result = await AttendanceModel.createAttendance({ uid });

      return response(res, 201, "Attendance created successfully", result);
    } catch (error) {
      next(error);
    }
  }

  static async updateAttendance(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { attendance_id } = req.body;

      if (!attendance_id) {
        return response(res, 400, "attendance_id is required");
      }

      const result = await AttendanceModel.updateAttendance(attendance_id);

      return response(res, 200, "Attendance updated successfully", result);
    } catch (error) {
      next(error);
    }
  }

  static async getAttendance(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        uid,
        datetime,
        timezone,
        page = "1",
        limit = "10",
        search = "",
        department = "",
        date = "",
      } = req.query as Record<string, string>;

      if (uid && datetime && timezone) {
        const attendance = await AttendanceModel.getAttendanceToday(
          uid,
          datetime,
          timezone,
        );

        return response(res, 200, "Success", attendance);
      }

      const result = await AttendanceModel.getAllAttendances({
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
