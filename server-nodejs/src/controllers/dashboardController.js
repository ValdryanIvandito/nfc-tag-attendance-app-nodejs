// src/controllers/dashboardController.js
import DashboardService from "../services/dashboardService.js";
import response from "../utils/response.js";

class DashboardController {
  static async getDashboard(req, res, next) {
    try {
      const { datetime, timezone } = req.query;
      const data = await DashboardService.getDashboardData(datetime, timezone);
      return response(res, 200, "Dashboard data", data);
    } catch (error) {
      next(error);
    }
  }
}

export default DashboardController;
