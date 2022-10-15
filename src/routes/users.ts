import { Router } from "express"
import UsersController from "../controllers/users"
import { validateToken } from "../middlewares/validateToken"

const router = Router()

router.post("/register", UsersController.register)
router.post("/login", UsersController.login)
router.get("/refreshToken", UsersController.refreshToken)
router.delete("/logout", UsersController.logout)
router.use(validateToken)

export default router
