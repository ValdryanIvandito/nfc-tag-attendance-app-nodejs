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
      data: { status: "RESIGN" },
    });
  }

  static async getAllEmployees() {
    return prisma.employee.findMany({
      orderBy: { employee_id: "asc" },
    });
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
