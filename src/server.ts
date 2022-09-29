import "dotenv/config"
import express, { NextFunction } from "express"
import students from "./routes/students"
import logger from "./log/logger"
import { errorHandler } from "./middlewares/errorHandler"
import { NotFoundError } from "./config/ApiError"

const app = express()

process.on("uncaughtException", (err: Error) => {
  logger.error("Uncaught Exception", err)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/students", students)
app.use("/*", (_, __, next: NextFunction) => next(new NotFoundError()))

app.use(errorHandler)

export default app
