import {
  format,
  Logger,
  transports,
  createLogger,
  LoggerOptions,
} from "winston"
import "winston-daily-rotate-file"
import fs from "fs"
import path from "path"
import { environment, logDirectory } from "../config/config"
import { templateFunction } from "../lib/logger"

let dir = logDirectory
if (!dir) dir = path.resolve("logs")

// eslint-disable-next-line security/detect-non-literal-fs-filename
if (!fs.existsSync(dir)) {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.mkdirSync(dir)
}

const logLevel = environment === "development" ? "verbose" : "warn"

const loggerOptions: LoggerOptions = {
  level: logLevel,
  exitOnError: false,
  handleExceptions: true,
  transports: [
    new transports.DailyRotateFile({
      level: logLevel,
      filename: "%DATE%.log",
      datePattern: "DD-MM-YYYY",
      dirname: dir,
      maxSize: "20m",
      maxFiles: "14d",
      zippedArchive: true,
      handleExceptions: true,
      format: format.combine(
        format.errors({ stack: true }),
        format.printf(templateFunction)
      ),
    }),
  ],
}

const logger: Logger = createLogger(loggerOptions)

export default logger
