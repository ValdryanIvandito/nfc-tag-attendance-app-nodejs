/* src/middlewares/deviceAuth.ts */

import { Request, Response, NextFunction } from "express";

const allowedDevices = [
  "EMPLOYEE_REGISTER_DEVICE",
  "EMPLOYEE_ATTENDANCE_DEVICE",
];

export default function deviceAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const deviceId = req.headers["x-device-id"] as string;

  if (!deviceId) {
    return res.status(401).json({
      status: 401,
      message: "Device ID required",
    });
  }

  if (!allowedDevices.includes(deviceId)) {
    return res.status(403).json({
      status: 403,
      message: "Unauthorized terminal",
    });
  }

  next();
}
