// src/utils/response.js
const response = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    status: statusCode,
    message,
    data,
  });
};

export default response;
