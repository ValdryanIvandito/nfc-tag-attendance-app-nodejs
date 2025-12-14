// src/services/attendanceService.js
import prisma from "../utils/prisma.js";
import eventBus from "../utils/eventBus.js";
import getDateRange from "..//utils/getDateRange.js";

class AttendanceService {
  static async createAttendance(payload) {
    const attendance = await prisma.attendance.create({
      data: payload,
      include: {
        Employee: true,
      },
    });

    eventBus.emit("attendance:created", attendance);
    return attendance;
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

  static async getAllAttendances({
    page,
    limit,
    search,
    department,
    date,
    timezone,
  }) {
    // const { start, end } = getDayDateRange(date);
    const { start, end } = getDateRange(date, timezone);
    const skip = (page - 1) * limit;
    const where = {
      AND: [
        ...(search
          ? [
              {
                Employee: {
                  full_name: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              },
            ]
          : []),

        ...(department
          ? [
              {
                Employee: {
                  department: {
                    equals: department,
                    mode: "insensitive",
                  },
                },
              },
            ]
          : []),

        ...(date
          ? [
              {
                check_in_at: {
                  gte: start,
                  lte: end,
                },
              },
            ]
          : []),
      ],
    };

    const [total, attendances] = await Promise.all([
      prisma.attendance.count({ where }),
      prisma.attendance.findMany({
        where,
        skip,
        take: limit,
        orderBy: { attendance_id: "desc" },
        include: { Employee: true },
      }),
    ]);

    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: attendances,
    };
  }

  static async getAttendanceToday(uid, datetime, timezone) {
    const { start, end } = getDateRange(datetime, timezone);

    return prisma.attendance.findFirst({
      where: {
        uid,
        check_in_at: {
          gte: start,
          lte: end,
        },
      },
      include: {
        Employee: true,
      },
      orderBy: {
        check_in_at: "desc",
      },
    });
  }
}

export default AttendanceService;
