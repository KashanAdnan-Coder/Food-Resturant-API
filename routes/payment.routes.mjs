import express from "express"
import handler from "../controller/payment.controller.mjs"
const router = express.Router()

router.post("/checkout_sessions", handler)

export default router       