import express from "express"
import { getAllUsers, getSingleUser, deleteUser, updateUser } from "../controller/user.controller.mjs"
const router = express.Router()
import { authHandler } from "../middleware/auth.handler.mjs"

router.get("/", getAllUsers)
router.get("/:id", authHandler, getSingleUser)
router.delete("/:id", authHandler, deleteUser)
router.put("/:id", authHandler, updateUser)

export default router