/* src/models/attendanceModel.ts */

import prisma from "../utils/prisma.js";
import eventBus from "../utils/eventBus.js";
import getDateRange from "../utils/getDateRange.js";
import { Prisma, Department } from "../../generated/prisma/index.js";

interface CreateAttendancePayload {
  uid: string;
}

interface GetAllAttendancesParams {
  page: number;
  limit: number;
  search?: string;
  department?: string;
  date?: string;
  timezone?: string;
}

class AttendanceModel {
  static async createAttendance(payload: CreateAttendancePayload) {
    const attendance = await prisma.attendance.create({
      data: payload,
      include: {
        Employee: true,
      },
    });

    eventBus.emit("attendance:created", attendance);

    return attendance;
  }

  static async updateAttendance(attendance_id: number | string) {
    const attendance = await prisma.attendance.update({
      where: { attendance_id: Number(attendance_id) },
      data: { check_out_at: new Date() },
      include: {
        Employee: true,
      },
    });

    eventBus.emit("attendance:updated", attendance);

    return attendance;
  }

  static async getAllAttendances({
    page,
    limit,
    search,
    department,
    date,
    timezone = "utc",
  }: GetAllAttendancesParams) {
    const skip = (page - 1) * limit;

    const and: Prisma.AttendanceWhereInput[] = [];

    // Search by employee name
    if (search) {
      and.push({
        Employee: {
          full_name: {
            contains: search,
            mode: "insensitive",
          },
        },
      });
    }

    // Filter by department (ENUM)
    if (department && department in Department) {
      and.push({
        Employee: {
          department: department as Department,
        },
      });
    }

    // Filter by date range
    if (date) {
      const { start, end } = getDateRange(date, timezone);

      and.push({
        check_in_at: {
          gte: start,
          lte: end,
        },
      });
    }

    const where: Prisma.AttendanceWhereInput =
      and.length > 0 ? { AND: and } : {};

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

  static async getAttendanceToday(
    uid: string,
    datetime: string,
    timezone = "utc",
  ) {
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

export default AttendanceModel;
