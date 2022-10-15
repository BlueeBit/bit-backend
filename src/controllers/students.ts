import { NextFunction, Request, Response } from "express"
import { InternalError } from "../config/ApiError"
import { SuccessResponse } from "../config/ApiResponse"
import StudentDAO from "../dao/studentsDAO"

export default class StudentController {
  static async getStudents(req: Request, res: Response, next: NextFunction) {
    const { searchQuery, page, size } = req.params
    try {
      const students = await StudentDAO.getStudents({
        searchQuery,
        page: Number(page),
        size: Number(size),
      })
      return new SuccessResponse(students).send(res)
    } catch (error) {
      next(new InternalError("Couldn't get the students"))
    }
  }
}
