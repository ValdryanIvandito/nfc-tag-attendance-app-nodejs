// src/services/dashboardService.js
import prisma from "../utils/prisma.js";
// import eventBus from "../utils/eventBus.js";
import getDateRange from "../utils/getDateRange.js";

const LEAVE_STATUSES = [
  "SICK",
  "VACATION",
  "EMERGENCY",
  "MATERNITY",
];

class DashboardService {
  static async getDashboardData(datetime, timezone) {
    const { start, end } = getDateRange(datetime, timezone);

    const totalEmployee = await prisma.employee.count();

    const totalInactive = await prisma.employee.count({
      where: { status: "INACTIVE" },
    });

    const totalActive = await prisma.employee.count({
      where: { status: { not: "INACTIVE" } },
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
      by: ["status"],
      where: {
        status: {
          in: LEAVE_STATUSES,
        },
      },
      _count: {
        status: true,
      },
    });

    const leaveMap = {
      SICK: 0,
      VACATION: 0,
      EMERGENCY: 0,
      FUNERAL: 0,
      MATERNITY: 0,
    };

    leaveCounts.forEach((item) => {
      leaveMap[item.status] = item._count.status;
    });

    const totalLeave = Object.values(leaveMap).reduce(
      (sum, val) => sum + val,
      0
    );

    // 5. Final response
    return {
      totalEmployee,
      presentToday,
      notPresentToday,
      totalActive,
      totalInactive,
      totalLeave,
      totalSick: leaveMap.SICK,
      totalVacation: leaveMap.VACATION,
      totalEmergency: leaveMap.EMERGENCY,
      totalMaternity: leaveMap.MATERNITY,
    };
  }
}

export default DashboardService;
