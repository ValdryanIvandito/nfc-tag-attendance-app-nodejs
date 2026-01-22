/** src/controllers/dashboardController.ts */

import { Request, Response, NextFunction } from "express";

import DashboardModel from "../models/dashboardModel.js";
import response from "../utils/response.js";

class DashboardController {
  static async getDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const { datetime, timezone } = req.query as Record<string, string>;

      const data = await DashboardModel.getDashboardData(datetime, timezone);

      return response(res, 200, "Dashboard data", data);
    } catch (error) {
      next(error);
    }
  }
}

export default DashboardController;
