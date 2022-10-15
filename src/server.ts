import "dotenv/config"
import logger from "./log/logger"
import users from "./routes/users"
import cookieParser from "cookie-parser"
import students from "./routes/students"
import express, { NextFunction } from "express"
import { NotFoundError } from "./config/ApiError"
import { errorHandler } from "./middlewares/errorHandler"

const app = express()

process.on("uncaughtException", (err: Error) => {
  logger.error("Uncaught Exception", err)
})

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/students", students)
app.use("/api/v1/users", users)
app.use("/*", (_, __, next: NextFunction) => next(new NotFoundError()))

app.use(errorHandler)

export default app
