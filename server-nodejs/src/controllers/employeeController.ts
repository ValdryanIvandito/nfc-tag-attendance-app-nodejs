/** src/controllers/employeeController.ts */

import { Request, Response, NextFunction } from "express";

import EmployeeService from "../services/employeeService.js";
import response from "../utils/response.js";

class EmployeeController {
  static async createEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { uid, full_name, department, position } = req.body;

      if (!uid || !full_name || !department || !position) {
        return response(res, 400, "All fields are required");
      }

      const result = await EmployeeService.createEmployee({
        uid,
        full_name,
        department,
        position,
      });

      return response(res, 201, "Employee created successfully", result);
    } catch (error) {
      next(error);
    }
  }

  static async updateEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { employee_id, leave_status } = req.body;

      if (!employee_id) {
        return response(res, 400, "employee_id is required");
      }

      const result = await EmployeeService.updateEmployee({
        employee_id,
        leave_status,
      });

      return response(
        res,
        200,
        "Employee leave status updated successfully",
        result,
      );
    } catch (error) {
      next(error);
    }
  }

  static async deleteEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { employee_id } = req.body;

      if (!employee_id) {
        return response(res, 400, "employee_id is required");
      }

      const result = await EmployeeService.deleteEmployee({ employee_id });

      return response(res, 200, "Employee status updated successfully", result);
    } catch (error) {
      next(error);
    }
  }

  static async getEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        employee_id,
        uid,
        page = "1",
        limit = "10",
        search = "",
        department = "",
        leave_status = "",
        employee_status = "",
      } = req.query as Record<string, string>;

      if (employee_id) {
        const id = Number(employee_id);

        if (isNaN(id)) {
          return response(res, 400, "employee_id must be a number");
        }

        const employee = await EmployeeService.getEmployeeById(id);

        if (!employee) {
          return response(res, 404, "Employee not found");
        }

        return response(res, 200, "Success", employee);
      }

      if (uid) {
        const employee = await EmployeeService.getEmployeeByUid(uid);

        if (!employee) {
          return response(res, 404, "Employee not found");
        }

        return response(res, 200, "Success", employee);
      }

      const result = await EmployeeService.getEmployees({
        page: Number(page),
        limit: Number(limit),
        search,
        department,
        leave_status,
        employee_status,
      });

      return response(res, 200, "Success", result);
    } catch (error) {
      next(error);
    }
  }
}

export default EmployeeController;
