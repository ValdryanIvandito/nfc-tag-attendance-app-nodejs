// src/services/attendanceService.js
import prisma from "../utils/prisma.js";

class AttendanceService {
  static async createAttendance(payload) {
    return prisma.attendance.create({
      data: payload,
      include: {
        Employee: true,
      },
    });
  }

  static async updateAttendance(attendance_id) {
    return prisma.attendance.update({
      where: { attendance_id: Number(attendance_id) },
      data: { check_out_at: new Date() },
      include: {
        Employee: true,
      },
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

  static async getAttendanceByDateNow(uid) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return prisma.attendance.findFirst({
      where: {
        uid: uid,
        check_in_at: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        Employee: true,
      },
      orderBy: { check_in_at: "asc" },
    });
  }
}

export default AttendanceService;
