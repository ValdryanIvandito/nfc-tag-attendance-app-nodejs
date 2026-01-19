/** src/utils/response.ts */

import { Response } from "express";

interface ApiResponse {
  status: number;
  message: string;
  data: any;
}

const response = (
  res: Response,
  statusCode: number,
  message: string,
  data: any = null,
): Response<ApiResponse> => {
  return res.status(statusCode).json({
    status: statusCode,
    message,
    data,
  });
};

export default response;
