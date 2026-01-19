/* src/services/employeeService.ts */

import prisma from "../utils/prisma.js";
import {
  Prisma,
  Department,
  LeaveStatus,
  EmployeeStatus,
} from "../../generated/prisma/index.js";

type CreateEmployeePayload = Prisma.EmployeeCreateInput;

interface UpdateEmployeePayload {
  employee_id: number | string;
  leave_status?: LeaveStatus | null;
}

interface DeleteEmployeePayload {
  employee_id: number | string;
}

interface GetEmployeesParams {
  page: number;
  limit: number;
  search?: string;
  department?: string;
  leave_status?: string;
  employee_status?: string;
}

class EmployeeService {
  static async createEmployee(payload: CreateEmployeePayload) {
    return prisma.employee.create({
      data: payload,
    });
  }

  static async updateEmployee(payload: UpdateEmployeePayload) {
    return prisma.employee.update({
      where: { employee_id: Number(payload.employee_id) },
      data: { leave_status: payload.leave_status },
    });
  }

  static async deleteEmployee(payload: DeleteEmployeePayload) {
    return prisma.employee.update({
      where: { employee_id: Number(payload.employee_id) },
      data: { leave_status: null, employee_status: "INACTIVE" },
    });
  }

  static async getEmployees({
    page,
    limit,
    search,
    department,
    leave_status,
    employee_status,
  }: GetEmployeesParams) {
    const skip = (page - 1) * limit;

    const and: Prisma.EmployeeWhereInput[] = [];

    if (search) {
      and.push({
        OR: [
          { full_name: { contains: search, mode: "insensitive" } },
          { uid: { contains: search, mode: "insensitive" } },
        ],
      });
    }

    if (department && department in Department) {
      and.push({ department: department as Department });
    }

    if (leave_status && leave_status in LeaveStatus) {
      and.push({ leave_status: leave_status as LeaveStatus });
    }

    if (employee_status && employee_status in EmployeeStatus) {
      and.push({ employee_status: employee_status as EmployeeStatus });
    }

    const where: Prisma.EmployeeWhereInput = {
      AND: and,
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

  static async getEmployeeById(employee_id: number) {
    return prisma.employee.findUnique({
      where: { employee_id },
      include: { Attendance: true },
    });
  }

  static async getEmployeeByUid(uid: string) {
    return prisma.employee.findUnique({
      where: { uid },
      include: { Attendance: true },
    });
  }
}

export default EmployeeService;
