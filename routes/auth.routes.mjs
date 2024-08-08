import express from "express"
import { loginUser, logout, registerUser } from "../controller/auth.controller.mjs"
const router = express.Router()
import { authHandler } from "../middleware/auth.handler.mjs"

router.post("/signup", registerUser)
router.post("/signin", loginUser)
router.get("/signout", authHandler, logout)

export default router