import { Router } from "express"
import StudentController from "../controllers/students"

const router = Router()

router.get("/", StudentController.getStudents)

export default router
