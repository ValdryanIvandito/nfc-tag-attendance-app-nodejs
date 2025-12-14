// src/services/employeeService.js
import prisma from "../utils/prisma.js";

class EmployeeService {
  static async createEmployee(payload) {
    return prisma.employee.create({
      data: payload,
    });
  }

  static async updateEmployee(payload) {
    return prisma.employee.update({
      where: { employee_id: Number(payload.employee_id) },
      data: { status: payload.status },
    });
  }

  static async deleteEmployee(payload) {
    return prisma.employee.update({
      where: { employee_id: Number(payload.employee_id) },
      data: { status: "INACTIVE" },
    });
  }

  static async getEmployees({ page, limit, search, department, status }) {
    const skip = (page - 1) * limit;
    const where = {
      AND: [
        search
          ? {
              OR: [
                { full_name: { contains: search, mode: "insensitive" } },
                { uid: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        department
          ? { department: { equals: department, mode: "insensitive" } }
          : {},
        status ? { status } : {},
      ],
    };

    const [total, employees] = await Promise.all([
      prisma.employee.count({ where }),
      prisma.employee.findMany({
        where,
        skip,
        take: limit,
        orderBy: { employee_id: "desc" },
      }),
    ]);

    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: employees,
    };
  }

  static async getEmployeeById(employee_id) {
    return prisma.employee.findUnique({
      where: { employee_id: Number(employee_id) },
      include: { Attendance: true },
    });
  }

  static async getEmployeeByUid(uid) {
    return prisma.employee.findUnique({
      where: { uid: uid },
      include: { Attendance: true },
    });
  }
}

export default EmployeeService;
