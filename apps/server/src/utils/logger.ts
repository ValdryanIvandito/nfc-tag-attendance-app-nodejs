/** src/utils/logger.ts */

import winston from "winston";

const logger: winston.Logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({
      filename: "logs/error.log",
    }),
  ],
});

export default logger;
