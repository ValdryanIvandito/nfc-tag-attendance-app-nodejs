/* src/services/dashboardService.ts */

import prisma from "../utils/prisma.js";
import getDateRange from "../utils/getDateRange.js";

type LeaveStatus =
  | "SICK"
  | "MATERNITY"
  | "PATERNITY"
  | "ANNUAL"
  | "BEREAVEMENT"
  | "MARRIAGE"
  | "PARENTAL"
  | "STUDY"
  | "RELIGIOUS";

const LEAVE_STATUSES: LeaveStatus[] = [
  "SICK",
  "MATERNITY",
  "PATERNITY",
  "ANNUAL",
  "BEREAVEMENT",
  "MARRIAGE",
  "PARENTAL",
  "STUDY",
  "RELIGIOUS",
];

interface LeaveMap {
  [key: string]: number;
}

class DashboardService {
  static async getDashboardData(
    datetime: string,
    timezone: string = "utc",
  ) {
    const { start, end } = getDateRange(datetime, timezone);

    const totalActive = await prisma.employee.count({
      where: { employee_status: "ACTIVE" },
    });

    const totalInactive = await prisma.employee.count({
      where: { employee_status: "INACTIVE" },
    });

    const attendanceToday = await prisma.attendance.findMany({
      where: {
        check_in_at: {
          gte: start,
          lte: end,
        },
      },
      select: {
        uid: true,
      },
      distinct: ["uid"],
    });

    const presentToday = attendanceToday.length;

    const notPresentToday = Math.max(totalActive - presentToday, 0);

    const leaveCounts = await prisma.employee.groupBy({
      by: ["leave_status"],
      where: {
        leave_status: {
          not: null,
          in: LEAVE_STATUSES,
        },
      },
      _count: {
        leave_status: true,
      },
    });

    const leaveMap: LeaveMap = {
      SICK: 0,
      MATERNITY: 0,
      PATERNITY: 0,
      ANNUAL: 0,
      BEREAVEMENT: 0,
      MARRIAGE: 0,
      PARENTAL: 0,
      STUDY: 0,
      RELIGIOUS: 0,
    };

    leaveCounts.forEach((item) => {
      if (item.leave_status) {
        leaveMap[item.leave_status] = item._count.leave_status;
      }
    });

    const totalLeave = Object.values(leaveMap).reduce(
      (sum, val) => sum + val,
      0,
    );

    return {
      presentToday,
      notPresentToday,
      totalActive,
      totalInactive,
      totalLeave,

      totalSick: leaveMap.SICK,
      totalMaternity: leaveMap.MATERNITY,
      totalPaternity: leaveMap.PATERNITY,
      totalAnnual: leaveMap.ANNUAL,
      totalBereavement: leaveMap.BEREAVEMENT,
      totalMarriage: leaveMap.MARRIAGE,
      totalParental: leaveMap.PARENTAL,
      totalStudy: leaveMap.STUDY,
      totalReligious: leaveMap.RELIGIOUS,
    };
  }
}

export default DashboardService;
