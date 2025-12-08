// src/controllers/employeeController.js
import EmployeeService from "../services/employeeService.js";
import response from "../utils/response.js";

class EmployeeController {
  static async createEmployee(req, res) {
    try {
      const { uid, full_name, department, position, Status } = req.body;

      if (!uid || !full_name || !department || !position || !Status) {
        return response(res, 400, "All fields are required");
      }

      const result = await EmployeeService.createEmployee({
        uid,
        full_name,
        department,
        position,
        Status,
      });

      return response(res, 201, "Employee created successfully", result);
    } catch (error) {
      console.error(error);
      return response(res, 500, error);
    }
  }

  static async getEmployee(req, res) {
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

      // === GET ALL ===
      const employees = await EmployeeService.getAllEmployees();

      return response(res, 200, "Success", employees);
    } catch (error) {
      console.error("getEmployee error:", error);
      return response(res, 500, error);
    }
  }
}

export default EmployeeController;
