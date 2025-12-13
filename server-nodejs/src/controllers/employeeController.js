// src/controllers/employeeController.js
import EmployeeService from "../services/employeeService.js";
import response from "../utils/response.js";

class EmployeeController {
  static async createEmployee(req, res, next) {
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
        status: "ACTIVE",
      });

      return response(res, 201, "Employee created successfully", result);
    } catch (error) {
      next(error);
    }
  }

  static async updateEmployee(req, res, next) {
    try {
      const { employee_id, status } = req.body;

      if (!employee_id) {
        return response(res, 400, "employee_id is required");
      }

      const result = await EmployeeService.updateEmployee({
        employee_id,
        status,
      });

      return response(res, 200, "Employee updated successfully", result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteEmployee(req, res, next) {
    try {
      const { employee_id } = req.body;

      if (!employee_id) {
        return response(res, 400, "employee_id is required");
      }

      const result = await EmployeeService.deleteEmployee({
        employee_id,
      });

      return response(res, 200, "Employee status is RESIGN", result);
    } catch (error) {
      next(error);
    }
  }

  static async getEmployee(req, res, next) {
    try {
      const { employee_id, uid } = req.query;

      // === GET BY ID ===
      if (employee_id) {
        const id = Number(employee_id);

        if (isNaN(id)) {
          return response(res, 400, "employee_id must be a number");
        }

        const employee = await EmployeeService.getEmployeeById(employee_id);

        if (!employee) {
          return response(res, 404, "Employee not found");
        }

        return response(res, 200, "Success", employee);
      }

      // === GET BY UID ===
      if (uid) {
        const employee = await EmployeeService.getEmployeeByUid(uid);

        if (!employee) {
          return response(res, 404, "Employee not found");
        }

        return response(res, 200, "Success", employee);
      }

      // === GET ALL (WITH PAGINATION + SEARCH + FILTER) ===
      const {
        page = 1,
        limit = 10,
        search = "",
        department = "",
        status = "",
      } = req.query;

      const result = await EmployeeService.getEmployees({
        page: Number(page),
        limit: Number(limit),
        search,
        department,
        status,
      });

      return response(res, 200, "Success", result);
    } catch (error) {
      next(error);
    }
  }
}

export default EmployeeController;
