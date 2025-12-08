// src/services/attendanceService.js
import prisma from "../utils/prisma.js";

class AttendanceService {
  static async createAttendance(payload) {
    return prisma.attendance.create({
      data: payload,
    });
  }

  static async updateAttendance(attendance_id) {
    return prisma.attendance.update({
      where: { attendance_id: Number(attendance_id) },
      data: { check_out_at: new Date() },
    });
  }

  static async getAllAttendances() {
    return prisma.attendance.findMany({
      orderBy: { attendance_id: "asc" },
    });
  }

  static async getAttendanceById(attendance_id) {
    return prisma.attendance.findUnique({
      where: { attendance_id: Number(attendance_id) },
      include: { Employee: true },
    });
  }
}

export default AttendanceService;
